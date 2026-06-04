const DEFAULT_BASE_URL = 'http://localhost:3001'

const baseUrl = (process.argv[2] || process.env.SEO_CHECK_BASE_URL || DEFAULT_BASE_URL).replace(
  /\/$/,
  ''
)
const expectedSiteUrl = (process.env.SEO_EXPECTED_SITE_URL || 'https://helpline.or.kr').replace(
  /\/$/,
  ''
)

const langs = ['ko', 'en']
const paths = [
  '/',
  '/about',
  '/guide',
  '/notice',
  '/crisis',
  '/depression',
  '/women',
  '/youth',
  '/queer',
  '/migrant',
  '/addiction',
  '/elder',
  '/legal',
]

function localizedPath(lang, path) {
  return path === '/' ? `/${lang}` : `/${lang}${path}`
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function matchTag(html, pattern) {
  const match = html.match(pattern)
  return match ? decodeHtml(match[1].trim()) : null
}

function getTitle(html) {
  return matchTag(html, /<title>([^<]*)<\/title>/i)
}

function getMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return matchTag(
    html,
    new RegExp(
      `<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']*)["'][^>]*>`,
      'i'
    )
  )
}

function getLink(html, rel, hreflang) {
  const relPart = `rel=["']${rel}["']`
  const hreflangPart = hreflang ? `hreflang=["']${hreflang}["']` : ''
  const patterns = hreflang
    ? [
        new RegExp(
          `<link[^>]+${relPart}[^>]+${hreflangPart}[^>]+href=["']([^"']*)["'][^>]*>`,
          'i'
        ),
        new RegExp(
          `<link[^>]+${hreflangPart}[^>]+${relPart}[^>]+href=["']([^"']*)["'][^>]*>`,
          'i'
        ),
      ]
    : [
        new RegExp(
          `<link[^>]+${relPart}[^>]+href=["']([^"']*)["'][^>]*>`,
          'i'
        ),
      ]

  for (const pattern of patterns) {
    const value = matchTag(html, pattern)
    if (value) return value
  }

  return null
}

function countMatches(html, pattern) {
  return html.match(pattern)?.length ?? 0
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message)
}

async function fetchText(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }
  return response.text()
}

async function checkPage(lang, path) {
  const urlPath = localizedPath(lang, path)
  const url = `${baseUrl}${urlPath}`
  const html = await fetchText(url)
  const title = getTitle(html)
  const description = getMeta(html, 'description')
  const ogTitle = getMeta(html, 'og:title')
  const ogDescription = getMeta(html, 'og:description')
  const canonical = getLink(html, 'canonical')
  const koAlternate = getLink(html, 'alternate', 'ko')
  const enAlternate = getLink(html, 'alternate', 'en')
  const xDefaultAlternate = getLink(html, 'alternate', 'x-default')
  const h1Count = countMatches(html, /<h1\b/gi)
  const jsonLdCount = countMatches(html, /type=["']application\/ld\+json["']/gi)
  const failures = []

  assert(title, `${urlPath}: missing title`, failures)
  assert(description, `${urlPath}: missing meta description`, failures)
  assert(ogTitle, `${urlPath}: missing og:title`, failures)
  assert(ogDescription, `${urlPath}: missing og:description`, failures)
  assert(canonical === `${expectedSiteUrl}${urlPath}`, `${urlPath}: canonical mismatch`, failures)
  assert(
    koAlternate?.startsWith(`${expectedSiteUrl}/ko`),
    `${urlPath}: missing ko hreflang`,
    failures
  )
  assert(
    enAlternate?.startsWith(`${expectedSiteUrl}/en`),
    `${urlPath}: missing en hreflang`,
    failures
  )
  assert(
    xDefaultAlternate?.startsWith(`${expectedSiteUrl}/ko`),
    `${urlPath}: missing x-default hreflang`,
    failures
  )
  assert(h1Count === 1, `${urlPath}: expected exactly one h1, found ${h1Count}`, failures)
  assert(jsonLdCount >= 1, `${urlPath}: missing JSON-LD`, failures)

  if (title) {
    assert(title.length <= 75, `${urlPath}: title is long (${title.length})`, failures)
  }

  if (description) {
    assert(
      description.length >= 35 && description.length <= 220,
      `${urlPath}: description length is ${description.length}`,
      failures
    )
  }

  return {
    urlPath,
    title,
    description,
    failures,
  }
}

async function checkRobotsAndSitemap() {
  const failures = []
  const robots = await fetchText(`${baseUrl}/robots.txt`)
  const sitemap = await fetchText(`${baseUrl}/sitemap.xml`)
  const normalizedRobots = robots.toLowerCase()

  assert(normalizedRobots.includes('user-agent: yeti'), 'robots.txt: missing Yeti rule', failures)
  assert(
    robots.includes(`Sitemap: ${expectedSiteUrl}/sitemap.xml`),
    'robots.txt: missing sitemap URL',
    failures
  )

  for (const lang of langs) {
    for (const path of paths) {
      const url = `${expectedSiteUrl}${localizedPath(lang, path)}`
      assert(sitemap.includes(`<loc>${url}</loc>`), `sitemap.xml: missing ${url}`, failures)
    }
  }

  return failures
}

async function main() {
  const pageResults = []
  const allFailures = []

  for (const lang of langs) {
    for (const path of paths) {
      const result = await checkPage(lang, path)
      pageResults.push(result)
      allFailures.push(...result.failures)
    }
  }

  allFailures.push(...(await checkRobotsAndSitemap()))

  const titles = new Map()
  const descriptions = new Map()

  for (const result of pageResults) {
    if (result.title) {
      const key = `${result.title}`
      titles.set(key, [...(titles.get(key) ?? []), result.urlPath])
    }
    if (result.description) {
      const key = `${result.description}`
      descriptions.set(key, [...(descriptions.get(key) ?? []), result.urlPath])
    }
  }

  for (const [title, routes] of titles) {
    if (routes.length > 1) {
      allFailures.push(`duplicate title "${title}" on ${routes.join(', ')}`)
    }
  }

  for (const [description, routes] of descriptions) {
    if (routes.length > 1) {
      allFailures.push(`duplicate description "${description}" on ${routes.join(', ')}`)
    }
  }

  if (allFailures.length > 0) {
    console.error(`SEO check failed for ${baseUrl}`)
    for (const failure of allFailures) {
      console.error(`- ${failure}`)
    }
    process.exit(1)
  }

  console.log(`SEO check passed for ${pageResults.length} pages at ${baseUrl}`)
}

main().catch((error) => {
  console.error(`SEO check could not run against ${baseUrl}`)
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
