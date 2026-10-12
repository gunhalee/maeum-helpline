import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatServiceHours } from '../src/lib/service-hours-display.ts'
import { translateStatusNote } from '../src/lib/i18n.ts'

test('weekday and weekend hours have separate rows in both languages', () => {
  const note = '평일 08:00~22:00, 주말·공휴일 09:00~18:00'
  assert.deepEqual(formatServiceHours(note), {
    rows: [{ label: '평일', periods: ['08:00~22:00'] }, { label: '주말·공휴일', periods: ['09:00~18:00'] }],
    notes: [], timeZone: null,
  })
  assert.deepEqual(formatServiceHours(translateStatusNote(note, 'en')), {
    rows: [{ label: 'Weekdays', periods: ['08:00–22:00'] }, { label: 'weekends and public holidays', periods: ['09:00–18:00'] }],
    notes: [], timeZone: 'KST',
  })
})

test('split morning and afternoon hours stay under the same weekday', () => {
  for (const lang of ['ko', 'en']) {
    const result = formatServiceHours(translateStatusNote('평일 09:00~11:50, 13:00~17:50', lang))
    assert.equal(result.rows.length, 1)
    assert.equal(result.rows[0].periods.length, 2)
    assert.match(result.rows[0].periods[1], /^13:00.17:50$/)
    assert.deepEqual(result.notes, [])
  }
})

test('weekday lunch stays scoped to weekdays; Saturday and closures are preserved', () => {
  const note = '평일 09:00~20:00 (점심시간 12:00~13:00), 토요일 09:00~13:00, 일요일·공휴일 휴무'
  assert.deepEqual(formatServiceHours(note), {
    rows: [
      { label: '평일', periods: ['09:00~20:00'], detail: '점심시간 12:00~13:00' },
      { label: '토요일', periods: ['09:00~13:00'] },
    ], notes: ['일요일·공휴일 휴무'], timeZone: null,
  })
  const en = formatServiceHours(translateStatusNote(note, 'en'))
  assert.equal(en.rows[0].detail, 'break 12:00–13:00')
  assert.equal(en.rows[1].label, 'Sat')
  assert.equal(en.rows[1].detail, undefined)
  assert.deepEqual(en.notes, ['closed Sun and public holidays'])
})

test('English closure day lists retain their commas and all days', () => {
  const result = formatServiceHours('Tue–Sat 11:00–21:00 KST; closed Sun, Mon and public holidays')
  assert.equal(result.rows.length, 1)
  assert.deepEqual(result.notes, ['closed Sun, Mon and public holidays'])
})

test('general and emergency support remain distinct; 24/7 does not replace the weekday schedule', () => {
  const note = '일반상담 평일 09:00~18:00 · 긴급지원상담 24시간'
  for (const lang of ['ko', 'en']) {
    const result = formatServiceHours(translateStatusNote(note, lang))
    assert.equal(result.rows.length, 2)
    assert.match(result.rows[0].periods[0], /^09:00.18:00$/)
    assert.equal(result.rows[1].periods[0], lang === 'ko' ? '24시간' : '24/7')
  }
})

test('appointment instructions, missing hours and unfamiliar qualifiers remain intact', () => {
  for (const note of [
    '신청서 접수 후 상담 일정 조율', '공식 시간표가 서로 달라 사전 확인 필요',
    '평일 09:00~18:00 예약 필수', 'Weekdays 09:00–18:00 KST (appointment required)',
    'Directory; check counseling hours with each provider', '상담, 예약 · 기관별 확인',
  ]) {
    assert.deepEqual(formatServiceHours(note), { rows: [], notes: [note], timeZone: null })
  }
  assert.deepEqual(formatServiceHours('  '), { rows: [], notes: [], timeZone: null })
})

test('unrecognized time qualifiers are never silently dropped from a mixed schedule', () => {
  const note = '평일 09:00~18:00, 토요일 10:00~12:00 예약 필수'
  const result = formatServiceHours(note)
  assert.equal(result.rows.length, 1)
  assert.deepEqual(result.notes, ['토요일 10:00~12:00 예약 필수'])
})
