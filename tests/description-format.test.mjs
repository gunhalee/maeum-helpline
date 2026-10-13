import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getDescriptionDetails, translateInformationLabel } from '../src/lib/description-format.ts'
import { SERVICE_DESCRIPTION_LAYOUTS } from '../src/lib/service-description-layouts.ts'

test('updated or unreviewed descriptions keep the new source visible', () => {
  const original = SERVICE_DESCRIPTION_LAYOUTS.find(({ source }) => source.startsWith('1345에서'))
  assert.ok(getDescriptionDetails(original.source, SERVICE_DESCRIPTION_LAYOUTS))
  assert.equal(getDescriptionDetails(original.source.replace('20개 언어', '21개 언어'), SERVICE_DESCRIPTION_LAYOUTS), null)
  assert.equal(getDescriptionDetails(`${original.source} 예약이 필요합니다.`, SERVICE_DESCRIPTION_LAYOUTS), null)
  assert.equal(getDescriptionDetails('새로운 기관의 안내입니다.', SERVICE_DESCRIPTION_LAYOUTS), null)
})

test('whitespace and time-range typography do not discard a reviewed layout', () => {
  const original = SERVICE_DESCRIPTION_LAYOUTS.find(({ source }) => source.startsWith('1345에서'))
  for (const separator of ['~', '-', '–', '—', '～', '〜']) {
    const rendered = `  ${original.source.replace('09:00–22:00', `09:00 ${separator} 22:00`).replaceAll('. ', '.\n')}  `
    assert.equal(getDescriptionDetails(rendered, SERVICE_DESCRIPTION_LAYOUTS), original.details)
  }
})

test('reviewed layouts are unambiguous and their labels have English equivalents', () => {
  assert.equal(new Set(SERVICE_DESCRIPTION_LAYOUTS.map(({ source }) => source)).size, SERVICE_DESCRIPTION_LAYOUTS.length)
  for (const { details } of SERVICE_DESCRIPTION_LAYOUTS) {
    for (const { label, text } of details) {
      assert.ok(text.trim())
      assert.notEqual(translateInformationLabel(label, 'en'), label)
    }
  }
})

test('formatting preserves scoped availability, reservation, and fee limitations', () => {
  const rowsFor = (prefix) => {
    const layout = SERVICE_DESCRIPTION_LAYOUTS.find(({ source }) => source.startsWith(prefix))
    assert.ok(layout, prefix)
    return layout.details.map(({ label, text }) => `${label}: ${text}`)
  }
  assert.ok(rowsFor('1345에서').some((row) => /18:00 이후 한국어·영어·중국어/.test(row)))
  assert.ok(rowsFor('1336에서').some((row) => /야간:.*다음 날 09:00 이후.*예약/.test(row)))
  assert.ok(rowsFor('강력범죄 피해자').some((row) => /등록면담·심리치료: 평일 09:00–18:00/.test(row)))
  assert.ok(rowsFor('청소년 성소수자의').some((row) => /정규 상담.*카카오톡.*신청.*일정 조율/.test(row)))
  assert.ok(rowsFor('132에서').some((row) => /통화료는 발신자 부담/.test(row)))
  assert.ok(rowsFor('132에서').some((row) => /소송구조.*대상 요건·비용 별도 확인/.test(row)))
  assert.ok(rowsFor('개인이 공개 자료를').some((row) => /직접 상담은 제공하지 않음/.test(row)))
})
