// Preview: node scripts/apply-service-translations.mjs docs/service-translations-en-YYYY-MM-DD.json
// Apply: append --apply. Only the three English rich-text properties can be written.
import fs from 'node:fs';
import nextEnv from '@next/env';
import { Client } from '@notionhq/client';

const FIELDS = ['name_en', 'description_en', 'hours_detail_en'];
const SOURCE_FIELDS = ['name', 'description', 'hours_detail', 'operating_hours', 'phone'];
const readText = property => (property?.rich_text || property?.title || []).map(item => item.plain_text ?? '').join('');
const normalizeId = id => id?.replaceAll('-', '');
const richText = content => ({ rich_text: [{ type: 'text', text: { content } }] });

async function main() {
  const file = process.argv[2];
  if (!file) throw new Error('Provide a reviewed translation manifest.');
  const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
  const apply = process.argv.includes('--apply');
  nextEnv.loadEnvConfig(process.cwd());
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!process.env.NOTION_API_KEY || !databaseId) throw new Error('Notion environment is not configured.');
  if (normalizeId(manifest.databaseId) !== normalizeId(databaseId)) throw new Error('Manifest database does not match the app database.');
  const client = new Client({ auth: process.env.NOTION_API_KEY, notionVersion: '2022-06-28' });
  const request = (path, method = 'get', body) => client.request({ path, method, ...(body ? { body } : {}) });
  const save = () => fs.writeFileSync(file, JSON.stringify(manifest, null, 2) + '\n');
  const database = await request(`databases/${databaseId}`);
  const missingFields = FIELDS.filter(field => !database.properties[field]);
  for (const field of FIELDS) {
    if (database.properties[field] && database.properties[field].type !== 'rich_text') throw new Error(`Wrong column type: ${field}`);
  }
  if (!manifest.entries.length || new Set(manifest.entries.map(e => e.pageId)).size !== manifest.entries.length) throw new Error('Empty or duplicate entries.');

  function validate(page, entry) {
    if (normalizeId(page.parent?.database_id) !== normalizeId(databaseId)) throw new Error(`Wrong parent: ${entry.name}`);
    if (!page.properties.is_active?.checkbox) throw new Error(`Inactive service: ${entry.name}`);
    for (const field of SOURCE_FIELDS) {
      if (readText(page.properties[field]) !== entry.source[field]) throw new Error(`Source changed: ${entry.name}.${field}`);
    }
    if (Object.keys(entry.after).some(key => !FIELDS.includes(key))) throw new Error('Only English translation fields may be changed.');
    for (const field of FIELDS) {
      const value = entry.after[field];
      if (typeof value !== 'string' || !value.trim() || value.length > 2000 || /[가-힣]/.test(value)) throw new Error(`Invalid translation: ${entry.name}.${field}`);
      const current = readText(page.properties[field]);
      if (current !== value && current !== entry.before[field]) throw new Error(`Translation changed: ${entry.name}.${field}`);
    }
  }

  // Read all rows before changing the schema or any content.
  for (const entry of manifest.entries) validate(await request(`pages/${entry.pageId}`), entry);
  console.log(JSON.stringify({ mode: apply ? 'apply' : 'preview', rows: manifest.entries.length, addColumns: missingFields, fieldsPerRow: FIELDS.length }));
  if (!apply) return;
  if (missingFields.length) {
    await request(`databases/${databaseId}`, 'patch', { properties: Object.fromEntries(missingFields.map(field => [field, { rich_text: {} }])) });
    const updated = await request(`databases/${databaseId}`);
    if (FIELDS.some(field => updated.properties[field]?.type !== 'rich_text')) throw new Error('Schema readback failed.');
  }

  for (const [index, entry] of manifest.entries.entries()) {
    const page = await request(`pages/${entry.pageId}`);
    validate(page, entry);
    const changed = FIELDS.filter(field => readText(page.properties[field]) !== entry.after[field]);
    if (changed.length) await request(`pages/${entry.pageId}`, 'patch', { properties: Object.fromEntries(changed.map(field => [field, richText(entry.after[field])])) });
    const readback = await request(`pages/${entry.pageId}`);
    validate(readback, entry);
    if (FIELDS.some(field => readText(readback.properties[field]) !== entry.after[field])) throw new Error(`Readback failed: ${entry.name}`);
    entry.appliedAt ??= new Date().toISOString();
    entry.readbackVerified = true;
    save();
    if ((index + 1) % 5 === 0 || index + 1 === manifest.entries.length) console.log(`Verified ${index + 1}/${manifest.entries.length} rows`);
  }
  manifest.status = 'applied';
  manifest.appliedAt = new Date().toISOString();
  save();
}

main().catch(error => { console.error(error.code || error.name, error.message); process.exitCode = 1; });
