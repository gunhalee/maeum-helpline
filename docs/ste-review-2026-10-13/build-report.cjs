// Run from the repository root: node docs/ste-review-2026-10-13/build-report.cjs
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const dir=__dirname;
const inventory=require('./inventory.json');
const rewrites=require('./rewrites.json');
const units=inventory.units;
const sentenceParts=s=>s.split(/(?<=[.!?])\s+/).filter(Boolean);
const wordCount=s=>(s.match(/[A-Za-z0-9]+(?:['’+/-][A-Za-z0-9]+)*/g)||[]).length;
function language(text) {
  const content=text.replace(/\|\s*긴급상담 헬프라인$/,'');
  return /[가-힣]/.test(content)?'ko':/[A-Za-z]/.test(content)?'en':'neutral';
}
function metrics(text,lang) {
  const sentences=sentenceParts(text);
  const sizes=sentences.map(s=>lang==='en'?wordCount(s):s.replace(/\s/g,'').length);
  return {characters:text.length,sentenceSegments:sentences.length,maxSentence:Math.max(0,...sizes),totalSentenceLength:sizes.reduce((a,b)=>a+b,0)};
}
const specific={
  T004:'두 질문 안내를 요청과 결과 설명으로 분리합니다. T853·T855와 함께 적용해야 합니다.',
  T015:'현재 화면은 버튼 선택 방식입니다. 기능을 직접 설명하는 이름으로 바꿉니다. 메뉴 폭도 함께 확인해야 합니다.',
  T052:'긴급 조건을 질문으로 나눈 안입니다. 실제 긴급 안내에 적용하기 전 조건의 범위와 말투를 검토하세요.',
  T085:'원문의 “가장 빠른”은 단정적입니다. 이번 문장 변환에서는 유지했으며, 영어판의 “may be faster”와 강도가 다릅니다.',
  T115:'“기본적으로”를 유지합니다. 절대적인 비밀 보장을 새로 약속하지 않습니다.',
  T191:'같은 가이드에 있는 전체 번호 1577-1389로 통일합니다. 숫자 추가는 의도적이며 STE 문장 규칙과 별개의 정합성 수정입니다.',
  T205:'생략된 행동 주체를 노인보호전문기관으로 명시한 안입니다. 실제 절차와 주체를 확인한 뒤 적용하세요.',
  T218:'법적 결과를 보장하지 않는다는 제한과 치료·재활 안내를 분리합니다.',
  T270:'원문의 119 전환 안내는 유지했습니다. 단순 연결 지연과 긴급 위험의 관계는 문장 단순화만으로 검증할 수 없습니다.',
  T274:'제3자를 쉬운 말로 풀었습니다. 숫자 3의 삭제는 전화번호 변경이 아닙니다.',
  T291:'8회·대상 증빙·나이/소득 신청 제한·본인부담금 조건을 각각 남깁니다. 짧아진 문장만 읽고 무조건 지원으로 오해하지 않는지 확인하세요.',
  T318:'조건을 질문으로 분리했습니다. “급박하지 않음”과 “안전하게 통화할 시간”이 모두 드러나야 합니다.',
  T333:'화면은 두 시간 구간을 줄로 나눕니다. 수집 도구가 없앤 줄바꿈을 복원했으며 문구 변경 대상이 아닙니다.',
  T340:'기본 비밀보장과 안전을 위한 예외, 가능한 범위의 설명을 모두 남깁니다.',
  T440:'본문과 같은 전체 번호 1577-1389로 통일하는 별도 정합성 제안입니다.',
  T452:'화면은 두 시간 구간을 줄로 나눕니다. 수집 과정의 문자열 합침을 표시 오류로 간주하지 않습니다.',
  T459:'위기 선별 질문입니다. “스스로 안전을 지킬 수 있는가”의 뜻을 보존한 후보이며 이용자의 이해와 응답에 미치는 영향은 검증하지 않았습니다.',
  T567:'“by default”를 “normally”로 바꿨습니다. 기본 비밀보장이라는 한정은 유지하되 실제 방침과 맞는지 확인하세요.',
  T568:'상담원이 다른 지원에 연락한다는 주체를 보완했습니다. 생명·안전 위험이 큰 경우라는 조건과 may를 유지합니다.',
  T643:'같은 가이드의 전체 번호 1577-1389로 통일합니다. 의도적인 숫자 변경입니다.',
  T668:'원문의 “described as”를 유지했습니다. 비밀보장을 확정하는 문장으로 강화하지 않았습니다.',
  T682:'원문의 “described as free”라는 출처 의존 표현을 유지했습니다.',
  T721:'원문의 119 전환 안내를 보존했습니다. 연락 경로의 적절성은 별도의 콘텐츠 검토가 필요합니다.',
  T734:'8회·자격 서류·연령/소득 제한 없음·본인부담금 조건을 보존합니다. may/can을 대상 요건 삭제로 바꾸지 않습니다.',
  T752:'“round-the-clock”을 “24-hour”로 풀었습니다. 숫자 24 추가는 운영시간 변경이 아닙니다. 긴 기관 명칭은 설명에 두고 전화 행동을 별도 문장으로 분리했습니다.',
  T776:'queer-friendly를 LGBTQ+ friendly로 통일한 후보입니다. 집단의 선호 명칭과 기존 문구의 의미를 함께 검토하세요.',
  T778:'기관마다 수준이 다르다는 한정을 유지합니다. LGBTQ+ friendly와 queer-affirming의 의미 차이는 별도 검토 대상입니다.',
  T840:'“연결할 수 있다”는 단정 대신 연락 대상이라는 의미를 드러냅니다. 실제 응답을 보장하지 않도록 운영 상태와 함께 확인하세요.',
  T841:'기관이 응답한다고 보장하는 문구가 되지 않는지 운영 상태 표시와 함께 검토하세요.',
  T852:'T854와 한 문단을 구성하는 조각입니다. 전체 문장 T458과 수정 방향을 맞춰야 합니다.',
  T853:'T855와 결합되는 조각입니다. T004와 동일한 전체 문장으로 적용하세요.',
  T854:'단독으로 쓰지 않고 T852와 결합합니다. 전체 문장 T458과 동시에 바꿔야 합니다.',
  T855:'T853과 함께 한 문단을 구성합니다. 전체 문장 T004와 함께 바꿔야 합니다.',
  T875:'이용자가 수행할 수 없는 Notion 관리 지시를 제거합니다. 가이드로 이동할 링크를 함께 제공하는 UI 변경이 필요합니다.',
  T876:'일반 이용자에게 데이터베이스 수정을 요구하지 않습니다. 가이드 링크를 함께 제공하는 UI 변경이 필요합니다.',
  T916:'현재 데이터에서 해소된 충돌 문구도 소스에 남아 있습니다. 조건부 템플릿 검토에 포함했으며 현재 기관에 시간 충돌이 있다는 뜻은 아닙니다.',
  T917:'소스에 남은 조건부 템플릿입니다. 현재 제공기관의 시간표가 충돌한다는 새 사실을 주장하지 않습니다.',
  T925:'원문의 trusted를 보존했습니다. 신뢰도 판단의 근거를 새로 검증한 것은 아닙니다.',
  T949:'검색용 설명의 대상 요건은 본문의 “분만 후 6개월 미만”보다 덜 구체적입니다. 이번 안은 원문 변환이며 자격을 새로 확장하지 않습니다.',
  T960:'검색용 설명의 지원 대상과 본문 표현이 다릅니다. 문장 단순화와 별개로 기관의 공식 대상 범위를 대조해야 합니다.',
};
const numericExceptions={T191:'1389 → 1577-1389: 같은 문서의 전체 번호와 통일',T440:'1389 → 1577-1389: 본문의 전체 번호와 통일',T643:'1389 → 1577-1389: 같은 문서의 전체 번호와 통일',T274:'제3자 → 다른 사람: 숫자가 포함된 일반어 풀이',T752:'round-the-clock → 24-hour: 같은 운영시간 표현'};
const rows=units.map(u=>{
  const proposed=rewrites[u.id]??u.original;
  const lang=language(u.original);
  const changed=proposed!==u.original;
  const before=metrics(u.original,lang),after=metrics(proposed,lang);
  const reasons=[];
  if(!changed) {
    if(/^“/.test(u.original)||/울거나 말이 멈춰도|괜찮아요|괜찮습니다|환영합니다|Welcome\./.test(u.original)) reasons.push('공감·첫마디 예시 유지');
    else if(['hours','label','template','social'].includes(u.kind)||u.original.length<35) reasons.push('짧은 표기·이름·사실 정보 유지');
    else reasons.push('현재 문장 구조 유지');
  } else {
    if(after.sentenceSegments>before.sentenceSegments)reasons.push('한 문장에 한 내용');
    if(/상담원|기관|구급대|counselor|responders|agency|center/.test(proposed)&&!/^“/.test(proposed))reasons.push('행동·주체 명확화');
    if(/^(If|Before|For|When)|(?:면|전에)/.test(proposed))reasons.push('조건·순서 명확화');
    if(!reasons.length)reasons.push('쉬운 말·용어 정리');
  }
  const sensitive=/비밀|보장|신고|위험|지원.*요건|증빙|본인부담|자살|자해|약물|confiden|privacy|suicid|self-harm|eligib|copayment|punish|report|safety|safe with/.test(u.original);
  let note=specific[u.id] || (changed?'정보와 조건은 유지하면서 표현을 바꾼 후보입니다.':'이미 짧거나 의미가 명확하여 표현을 유지합니다.');
  if(lang==='en')note+=' 영어 사전의 승인 어휘·품사·의미를 전수 대조하지 않았습니다.';
  if(changed&&sensitive&&!specific[u.id])note+=' 비밀보장·안전·자격 또는 신고 조건의 의미가 달라지지 않는지 적용 전에 검토하세요.';
  if(/^“/.test(u.original))note+=' 이용자가 말할 예시는 자연스러운 말투를 우선하며 절차 지시문처럼 강제로 바꾸지 않습니다.';
  const routes=[...new Set(u.locations.filter(x=>x.startsWith('/')).map(x=>x.split(' · ')[0]))];
  return {...u,reviewLanguage:lang,proposed,status:changed?'changed':'retained',reasons,note,sensitive,requiresReview:changed&&(sensitive||!!specific[u.id]),routes,before,after};
});
function summarize(lang){
  const prose=rows.filter(x=>x.reviewLanguage===lang&&['body','metadata'].includes(x.kind)&&sentenceParts(x.original).some(s=>/[.!?]$/.test(s)));
  const sum=(phase,key)=>prose.reduce((n,x)=>n+x[phase][key],0);
  const long=(phase)=>prose.flatMap(x=>sentenceParts(x[phase==='before'?'original':'proposed'])).filter(s=>lang==='en'?wordCount(s)>25:s.replace(/\s/g,'').length>60).length;
  return {units:prose.length,beforeMean: +(sum('before','totalSentenceLength')/sum('before','sentenceSegments')).toFixed(1),afterMean:+(sum('after','totalSentenceLength')/sum('after','sentenceSegments')).toFixed(1),beforeLong:long('before'),afterLong:long('after'),measure:lang==='en'?'문장당 영문 단어(근사)':'문장당 공백 제외 글자',longThreshold:lang==='en'?'25단어 초과':'60글자 초과(이 보고서의 관찰 기준; STE 규칙 아님)'};
}
const numberSignature=s=>(s.match(/\d+/g)||[]).sort().join(',');
const numericChanges=rows.filter(x=>numberSignature(x.original)!==numberSignature(x.proposed));
for(const row of numericChanges)assert(numericExceptions[row.id],`Unreviewed numeric change: ${row.id}`);
assert.equal(new Set(rows.map(x=>x.id)).size,rows.length);
for(const id of Object.keys(rewrites))assert(rows.some(x=>x.id===id),`Unknown ID: ${id}`);
for(const row of rows){assert(row.original&&row.proposed&&row.note);assert.deepEqual((row.original.match(/\{[^}]+\}/g)||[]).sort(),(row.proposed.match(/\{[^}]+\}/g)||[]).sort(),`Changed placeholders: ${row.id}`);}
const report={
  date:inventory.date,commit:inventory.commit,scope:inventory.scope,
  counts:{total:rows.length,changed:rows.filter(x=>x.status==='changed').length,retained:rows.filter(x=>x.status==='retained').length,byLanguage:Object.fromEntries(['ko','en','neutral'].map(l=>[l,rows.filter(x=>x.reviewLanguage===l).length]))},
  metrics:{ko:summarize('ko'),en:summarize('en')},
  verification:{uniqueIds:true,allRowsHaveOriginalAndProposal:true,placeholdersPreserved:true,numericChanges:numericChanges.map(x=>({id:x.id,explanation:numericExceptions[x.id]})),dictionaryValidation:false,comprehensionTest:false,liveCopyChanged:false},
  sources:[{title:'ASD-STE100 공식 FAQ',url:'https://www.asd-ste100.org/STE_faq.html'},{title:'Issue 9 공식 문서',url:'https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf'},{title:'공식 다운로드·AI 안내',url:'https://www.asd-ste100.org/STE_downloads.html'}],
  glossary:[['helpline','상담전화','일반 설명의 hotline과 혼용을 줄입니다. 공식 기관명은 그대로 둡니다.'],['counselor','상담원','실제 행동 주체가 확인될 때만 명시합니다.'],['contact hours','연락 가능 시간','실제 상담시간·접수시간·휴무를 구분합니다.'],['eligible applicants','대상 요건에 해당하는 신청자','누구나 지원받는다는 뜻으로 줄이지 않습니다.'],['copayment','본인부담금','무료·지원금과 혼동하지 않습니다.'],['confidential / normally','비밀로 다룸 / 기본적으로','예외나 한정을 지우지 않습니다.'],['outing / coming out','아웃팅 / 커밍아웃','당사자의 동의 여부가 다른 개념이므로 합치지 않습니다.'],['LGBTQ+ friendly','성소수자 친화','queer-affirming과의 의미 차이 및 선호 명칭을 검토합니다.']],
  rows,
};
fs.writeFileSync(path.join(dir,'comparison.json'),JSON.stringify(report,null,2)+'\n');
const json=JSON.stringify(report).replace(/</g,'\\u003c');
const template=fs.readFileSync(path.join(dir,'report-template.html'),'utf8');
fs.writeFileSync(path.join(dir,'index.html'),template.replace('/*REPORT_DATA*/',json));
console.log(JSON.stringify({counts:report.counts,metrics:report.metrics,verification:report.verification},null,2));
