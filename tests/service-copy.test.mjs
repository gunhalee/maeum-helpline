import assert from 'node:assert/strict'
import fs from 'node:fs'
import { test } from 'node:test'
import { getServiceCopy } from '../src/lib/service-copy.ts'
import { parseEnglishDescription } from '../src/lib/description-format.ts'
import { getServiceHoursStatus } from '../src/lib/service-hours.ts'

const manifest = JSON.parse(fs.readFileSync(new URL('../docs/service-translations-en-2026-10-13.json', import.meta.url), 'utf8'))
const service = {
  name: '상담기관', nameEn: 'Counseling service',
  description: '한국어 설명', descriptionEn: 'Support: Counseling and referrals',
  hoursDetail: '평일 09:00~18:00', operatingHours: '평일 09:00~18:00',
  hoursDetailEn: 'Weekdays 09:00–18:00 KST', hoursType: 'weekday', tags: [],
}

test('use stored translations without changing Korean content or availability inputs', () => {
  const before = structuredClone(service)
  assert.deepEqual(getServiceCopy(service, 'en'), { name: service.nameEn, description: service.descriptionEn, hoursDetail: service.hoursDetailEn })
  assert.deepEqual(getServiceCopy(service, 'ko'), { name: service.name, description: service.description, hoursDetail: service.hoursDetail })
  assert.deepEqual(service, before)
  const date = new Date('2026-10-13T01:00:00Z')
  assert.deepEqual(getServiceHoursStatus(service, date, () => false), getServiceHoursStatus({ ...service, hoursDetailEn: 'Appointment only' }, date, () => false))
})

test('missing or blank translations retain each original field independently', () => {
  assert.deepEqual(getServiceCopy({ ...service, nameEn: ' ', descriptionEn: undefined }, 'en'), { name: service.name, description: service.description, hoursDetail: service.hoursDetailEn })
  assert.equal(getServiceCopy({ ...service, hoursDetailEn: '', hoursDetail: '' }, 'en').hoursDetail, service.operatingHours)
})

test('all 34 stored translations parse as readable rows with no untranslated text', () => {
  assert.equal(manifest.entries.length, 34)
  for (const entry of manifest.entries) {
    assert.equal(Object.keys(entry.after).length, 3)
    assert(!/[가-힣]/.test(Object.values(entry.after).join(' ')), entry.name)
    const rows = parseEnglishDescription(entry.after.description_en)
    assert(rows?.length > 0, entry.name)
    assert.equal(rows.map(row => `${row.label}: ${row.text}`).join('\n'), entry.after.description_en)
    assert(entry.after.name_en && entry.after.hours_detail_en, entry.name)
  }
})

test('ordinary prose and unfamiliar edits remain intact instead of losing content', () => {
  assert.equal(parseEnglishDescription('Contact the center for an appointment.'), null)
  assert.equal(parseEnglishDescription('Support: Counseling\nA new important condition.'), null)
  assert.equal(parseEnglishDescription('Unknown label: Important content'), null)
  assert.equal(parseEnglishDescription('Support: '), null)
  assert.equal(parseEnglishDescription(''), null)
  assert.deepEqual(parseEnglishDescription('Hours: Weekdays 09:00–18:00 KST\r\n\r\nCosts: Call charges apply'), [
    { label: 'Hours', text: 'Weekdays 09:00–18:00 KST' }, { label: 'Costs', text: 'Call charges apply' },
  ])
})

test('translation retains conditions that affect access, cost, time and eligibility', () => {
  const copy = name => manifest.entries.find(entry => entry.name === name).after.description_en
  assert.match(copy('대한법률구조공단'), /You pay the phone call charges/)
  assert.match(copy('대한법률구조공단'), /Eligibility and costs.*separately/)
  assert.match(copy('도박 중독 헬프라인'), /after 09:00 KST the next day/)
  assert.match(copy('스마일센터'), /Intake appointments and therapy: weekdays 09:00–18:00/)
  assert.match(copy('청소년 성소수자 지원센터 띵동'), /02-924-1224/)
  assert.match(copy('청소년 성소수자 지원센터 띵동'), /KakaoTalk.*appointment/)
  assert.match(copy('위기임산부 상담전화'), /less than 6 months/)
  assert.match(copy('청소년·청년근로권익센터'), /aged 15–34/)
  assert.match(copy('정신건강 심리상담 바우처사업'), /8 sessions/)
  assert.match(copy('한국레즈비언상담소'), /wait may be several months/)
  assert.match(copy('퀴어건강 정보 모음'), /does not provide counseling/)
})
