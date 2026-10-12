// Applies only the reviewed public service fields recorded in a refresh manifest.
// Usage: node scripts/refresh-notion-content.mjs docs/content-refresh-YYYY-MM-DD.json [--apply]
import fs from 'node:fs';
import nextEnv from '@next/env';
import { Client } from '@notionhq/client';

const { loadEnvConfig } = nextEnv;

function readValue(property) {
  if (!property) return null;
  const type = property.type;
  if (type === 'title' || type === 'rich_text') return property[type].map(item => item.plain_text).join('');
  if (type === 'multi_select') return property.multi_select.map(item => item.name);
  if (type === 'select') return property.select?.name ?? null;
  if (type === 'date') return property.date?.start ?? null;
  return property[type];
}

function equal(actual, expected) {
  if (Array.isArray(actual) && Array.isArray(expected)) {
    return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
  }
  return actual === expected;
}

function writeValue(type, value) {
  if (type === 'title' || type === 'rich_text') {
    return { [type]: value ? [{ type: 'text', text: { content: value } }] : [] };
  }
  if (type === 'multi_select') return { multi_select: value.map(name => ({ name })) };
  if (type === 'select') return { select: value ? { name: value } : null };
  if (type === 'date') return { date: value ? { start: value } : null };
  if (type === 'checkbox' || type === 'url') return { [type]: value };
  throw new Error(`Unsupported property type: ${type}`);
}

async function main() {
  const manifestPath = process.argv[2];
  if (!manifestPath) throw new Error('Provide a reviewed refresh JSON manifest.');
  const apply = process.argv.includes('--apply');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  loadEnvConfig(process.cwd());
  const client = new Client({ auth: process.env.NOTION_API_KEY, notionVersion: '2022-06-28' });
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) throw new Error('Notion environment is not configured.');
  const databaseId = process.env.NOTION_DATABASE_ID.replaceAll('-', '');
  const save = () => fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  for (const entry of manifest.entries) {
    const page = await client.request({ path: `pages/${entry.pageId}`, method: 'get' });
    if (page.parent?.database_id?.replaceAll('-', '') !== databaseId) throw new Error(`Database mismatch: ${entry.name}`);
    const properties = {};
    for (const [key, expected] of Object.entries(entry.after)) {
      const property = page.properties[key];
      if (!property) throw new Error(`Missing property: ${entry.name}.${key}`);
      const current = readValue(property);
      if (equal(current, expected)) continue;
      if (!Object.hasOwn(entry.before, key) || !equal(current, entry.before[key])) {
        throw new Error(`Concurrent change detected: ${entry.name}.${key}. Refresh the manifest before retrying.`);
      }
      properties[key] = writeValue(property.type, expected);
    }
    console.log(`${apply ? 'Apply' : 'Preview'}: ${entry.name} (${Object.keys(properties).length} fields)`);
    if (!apply) continue;
    if (Object.keys(properties).length) {
      await client.request({ path: `pages/${entry.pageId}`, method: 'patch', body: { properties } });
    }
    const verified = await client.request({ path: `pages/${entry.pageId}`, method: 'get' });
    for (const [key, expected] of Object.entries(entry.after)) {
      if (!equal(readValue(verified.properties[key]), expected)) throw new Error(`Readback mismatch: ${entry.name}.${key}`);
    }
    entry.appliedAt ??= new Date().toISOString();
    entry.readbackVerified = true;
    save();
  }
  if (apply) {
    manifest.status = 'applied';
    manifest.appliedAt = new Date().toISOString();
    save();
  }
}

main().catch(error => {
  console.error(error.code || error.name, error.message);
  process.exitCode = 1;
});
