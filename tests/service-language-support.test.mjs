import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  SERVICE_LANGUAGE_PROFILES,
  formatLanguageSupport,
  getServiceLanguageDisplay,
  getEnglishContactPoints,
} from '../src/lib/service-language-support.ts'

const ids = {
  police: '3751f6c7-527d-8158-8ae0-eb02ed7b5102',
  ambulance: '3751f6c7-527d-81e7-af81-ca2a5b848b68',
  women: '3751f6c7-527d-8150-9748-ffaf2f81689c',
  youth: '3751f6c7-527d-81c9-a628-faf66f7f5a65',
  danuri: '3751f6c7-527d-81c7-9cf8-e838548a7aa7',
  immigration: '3751f6c7-527d-8195-9a80-c2f09ef0c5c2',
  humanRights: '3751f6c7-527d-81e2-9f85-d1c179dbee61',
}
const base = {
  '@type': 'ContactPoint', contactType: 'Counseling', telephone: '1388',
  url: 'https://example.org/phone', areaServed: 'KR',
  hoursAvailable: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday'], opens: '00:00', closes: '23:59' }],
}

test('unknown language support never becomes Korean-only or a multilingual tag', () => {
  assert.deepEqual(getServiceLanguageDisplay('new-unreviewed-id'), { label: 'Not confirmed' })
  assert.deepEqual(getServiceLanguageDisplay('1388'), { label: 'Not confirmed' })
  const unknown = Object.values(SERVICE_LANGUAGE_PROFILES).find((p) => p.status === 'unconfirmed')
  assert.deepEqual(formatLanguageSupport({ ...unknown, languages: ['English'] }), { label: 'Not confirmed' })
  assert.equal(formatLanguageSupport({ ...unknown, status: 'korean_only', languages: ['Korean'] }).label, 'Korean only')
  assert.equal(getServiceLanguageDisplay(ids.women).label, 'Korean')
})

test('list up to five distinct languages, including Korean; summarize six or more', () => {
  const profile = SERVICE_LANGUAGE_PROFILES[ids.youth]
  const five = ['Korean', 'English', 'Japanese', 'Chinese', 'Thai']
  assert.equal(formatLanguageSupport({ ...profile, languages: [...five, 'Korean'] }).label, five.join(', '))
  assert.equal(formatLanguageSupport({ ...profile, languages: [...five, 'Arabic'] }).label, 'Multilingual support')
  for (const id of [ids.police, ids.ambulance]) {
    assert.equal(getServiceLanguageDisplay(id).label, 'Multilingual support')
    assert.match(getServiceLanguageDisplay(id).qualifier, /interpreter/)
    assert.ok(SERVICE_LANGUAGE_PROFILES[id].multilingualBasis)
  }
})

test('reviewed records cover all 34 services with sources and scoped routes', () => {
  const profiles = Object.values(SERVICE_LANGUAGE_PROFILES)
  assert.equal(profiles.length, 34)
  assert.equal(profiles.filter((p) => p.status === 'unconfirmed').length, 26)
  assert.equal(profiles.filter((p) => p.status === 'korean_only').length, 0)
  for (const p of profiles) {
    assert.ok(p.sources.length > 0, p.name)
    assert.equal(new Set(p.languages).size, p.languages.length, p.name)
    if (p.status === 'unconfirmed') continue
    assert.ok(p.sourceUrl && p.routes.length, p.name)
    for (const route of p.routes) {
      assert.ok(route.languages.every((language) => p.languages.includes(language)), p.name)
    }
  }
  assert.equal(SERVICE_LANGUAGE_PROFILES[ids.danuri].languages.length, 15)
  assert.equal(SERVICE_LANGUAGE_PROFILES[ids.immigration].languages.length, 20)
})

test('separate and written English support does not inherit telephone or 24/7 hours', () => {
  for (const id of [ids.youth, ids.humanRights]) {
    const points = getEnglishContactPoints(id, base)
    assert.deepEqual(points[0].availableLanguage, ['Korean'])
    const english = points.find((p) => p.availableLanguage.includes('English'))
    assert.ok(english.url)
    assert.equal(english.telephone, undefined)
    assert.equal(english.hoursAvailable, undefined)
    assert.notEqual(english.url, base.url)
  }
  assert.match(getServiceLanguageDisplay(ids.youth).qualifier, /separate counseling/)
  assert.match(getServiceLanguageDisplay(ids.humanRights).qualifier, /email or post/)
})

test('1366 refers callers to Danuri without claiming Danuri languages on its own phone', () => {
  assert.equal(getServiceLanguageDisplay(ids.women).referral.phone, '1577-1366')
  const points = getEnglishContactPoints(ids.women, { ...base, telephone: '1366' })
  assert.equal(points.length, 1)
  assert.deepEqual(points[0].availableLanguage, ['Korean'])
  assert.equal(points[0].telephone, '1366')
})

test('1345 has separate daytime and evening language availability', () => {
  const [day, evening] = getEnglishContactPoints(ids.immigration, { ...base, telephone: '1345' })
  assert.equal(day.availableLanguage.length, 20)
  assert.equal(day.hoursAvailable[0].opens, '09:00')
  assert.equal(day.hoursAvailable[0].closes, '18:00')
  assert.deepEqual(evening.availableLanguage, ['Korean', 'English', 'Chinese'])
  assert.equal(evening.hoursAvailable[0].opens, '18:00')
  assert.equal(evening.hoursAvailable[0].closes, '22:00')
  assert.equal(evening.hoursAvailable[0].dayOfWeek.length, 5)
})

test('unknown schema omits languages, and partner lists are not assigned to emergency phones', () => {
  assert.equal(getEnglishContactPoints('unreviewed', base)[0].availableLanguage, undefined)
  const points = getEnglishContactPoints(ids.ambulance, { ...base, telephone: '119' })
  const interpretation = points.find((p) => p.availableLanguage.includes('English'))
  assert.deepEqual(interpretation.availableLanguage, ['English'])
  assert.equal(interpretation.hoursAvailable, undefined)
})
