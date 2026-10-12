import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getServiceHoursStatus, isServiceAlwaysOpen } from '../src/lib/service-hours.ts'

const service = (hoursDetail, hoursType = 'custom', extra = {}) => ({ hoursDetail, hoursType, tags: [], ...extra })
const ordinaryDay = () => false
const at = (date, time) => new Date(`${date}T${time}:00+09:00`)
const open = (record, date, time, calendar = ordinaryDay) => getServiceHoursStatus(record, at(date, time), calendar).isOpen

test('missing or unrecognized hours never invent a 09–18 schedule', () => {
  for (const record of [service('', 'weekday'), service('기관별 상이'), service('예약 후 상담'), service('09:00~18:00')]) {
    assert.equal(open(record, '2026-10-13', '12:00'), null)
  }
  assert.equal(getServiceHoursStatus(service('', 'weekday'), at('2026-10-13', '12:00')).note, '운영시간 확인 필요')
})

for (const separator of ['~', '-', '–', '—', '～', '〜']) {
  test(`daily interval with ${separator}: inclusive opening, exclusive closing`, () => {
    const record = service(`매일 09:00${separator}18:00`)
    assert.equal(open(record, '2026-10-11', '08:59'), false)
    assert.equal(open(record, '2026-10-11', '09:00'), true)
    assert.equal(open(record, '2026-10-11', '17:59'), true)
    assert.equal(open(record, '2026-10-11', '18:00'), false)
  })
}

test('weekday and weekend/public holiday hours remain separate', () => {
  const record = service('평일 08:00~22:00, 주말·공휴일 09:00~18:00')
  assert.equal(open(record, '2026-10-13', '20:00'), true)
  assert.equal(open(record, '2026-10-17', '20:00'), false)
  assert.equal(open(record, '2026-10-17', '09:00'), true)
  assert.equal(open(record, '2026-10-13', '20:00', () => true), false)
  assert.equal(open(record, '2026-10-13', '08:30', () => undefined), null)
  assert.equal(open(record, '2026-10-13', '15:00', () => undefined), true)
  assert.equal(open(record, '2026-10-13', '23:00', () => undefined), false)
})

test('Tuesday–Saturday opening and explicit closures override a stale weekday type', () => {
  const record = service('화요일~토요일 11:00~21:00 (일요일·월요일·공휴일 휴무)', 'weekday')
  assert.equal(open(record, '2026-10-12', '15:00'), false)
  assert.equal(open(record, '2026-10-13', '10:59'), false)
  assert.equal(open(record, '2026-10-13', '11:00'), true)
  assert.equal(open(record, '2026-10-17', '20:59'), true)
  assert.equal(open(record, '2026-10-17', '21:00'), false)
  assert.equal(open(record, '2026-10-13', '12:00', () => true), false)
  assert.equal(open(record, '2026-10-13', '12:00', () => undefined), null)
})

test('lunch closures, Saturday hours and holiday exclusions', () => {
  const record = service('평일 09:00~20:00 (점심시간 12:00~13:00), 토요일 09:00~13:00, 일요일·공휴일 휴무')
  assert.equal(open(record, '2026-10-13', '11:59'), true)
  assert.equal(open(record, '2026-10-13', '12:00'), false)
  assert.equal(open(record, '2026-10-13', '13:00'), true)
  assert.equal(open(record, '2026-10-17', '12:30'), true)
  assert.equal(open(record, '2026-10-18', '10:00'), false)
})

test('multiple intervals on one day and explicit day lists', () => {
  const record = service('월·수·금 09:00~12:00, 13:00~18:00')
  assert.equal(open(record, '2026-10-14', '12:30'), false)
  assert.equal(open(record, '2026-10-14', '13:00'), true)
  assert.equal(open(record, '2026-10-13', '10:00'), false)
})

test('overnight hours use the starting weekday and previous holiday status', () => {
  const record = service('금요일 22:00~06:00')
  assert.equal(open(record, '2026-10-16', '23:00'), true)
  assert.equal(open(record, '2026-10-17', '05:59'), true)
  assert.equal(open(record, '2026-10-17', '06:00'), false)
  assert.equal(open(record, '2026-10-16', '05:00'), false)
  const weekday = service('평일 22:00~06:00')
  assert.equal(open(weekday, '2026-10-17', '01:00', (date) => date === '2026-10-16'), false)
  assert.equal(open(weekday, '2026-10-17', '01:00', () => undefined), null)
})

test('Korean AM/PM notation and midnight end', () => {
  assert.equal(open(service('매일 오전 9시~오후 6시'), '2026-10-13', '17:30'), true)
  assert.equal(open(service('매일 09:00~24:00'), '2026-10-13', '23:59'), true)
  assert.equal(open(service('매일 09:00~24:00'), '2026-10-14', '00:00'), false)
})

test('invalid times or unknown service-specific qualifiers stay unknown', () => {
  for (const detail of ['매일 25:00~26:00', '매일 09:90~18:00', '매일 09:00~09:00', '매일 24:00~06:00', '매일 09:00~18:00 예약 필수', '일반상담 평일 09:00~18:00, 긴급상담 24시간']) {
    assert.equal(open(service(detail), '2026-10-13', '12:00'), null, detail)
    assert.equal(isServiceAlwaysOpen(service(detail, '24h')), false, detail)
  }
})

test('24h requires an unrestricted schedule; detail wins over stale type and tags', () => {
  for (const detail of ['24시간', '365일 24시간', '연중무휴 24시간', '매일 24시간 운영', '24/7']) {
    assert.equal(isServiceAlwaysOpen(service(detail)), true, detail)
    assert.equal(open(service(detail), '2026-10-13', '03:00'), true, detail)
  }
  assert.equal(isServiceAlwaysOpen(service('', '24h')), true)
  assert.equal(isServiceAlwaysOpen(service('', '', { tags: ['24시간'] })), true)
  const limited = service('매일 09:00~18:00', '24h', { tags: ['24시간'] })
  assert.equal(isServiceAlwaysOpen(limited), false)
  assert.equal(open(limited, '2026-10-13', '03:00'), false)
  assert.equal(isServiceAlwaysOpen(service('운영시간 외에는 1366(24시간) 이용', '24h')), false)
})

test('blank detail falls back to operating_hours', () => {
  assert.equal(open(service(' ', 'custom', { operatingHours: '매일 09:00~18:00' }), '2026-10-13', '10:00'), true)
})

test('KST day and time are independent of the server timezone', () => {
  const previousTimezone = process.env.TZ
  try {
    for (const timezone of ['UTC', 'America/New_York', 'Asia/Seoul']) {
      process.env.TZ = timezone
      const result = getServiceHoursStatus(service('화요일 00:00~01:00'), new Date('2026-10-12T15:30:00Z'), ordinaryDay)
      assert.equal(result.isOpen, true, timezone)
    }
  } finally {
    if (previousTimezone === undefined) delete process.env.TZ
    else process.env.TZ = previousTimezone
  }
})

test('invalid reference time does not produce an open/closed assertion', () => {
  assert.equal(getServiceHoursStatus(service('매일 09:00~18:00'), new Date('invalid')).isOpen, null)
})
