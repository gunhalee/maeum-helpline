// Source-only UI and sharing text absent from the prerendered route snapshots.
const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');
const dir = __dirname;
const inventory = JSON.parse(fs.readFileSync(path.join(dir, 'inventory.json'), 'utf8'));
inventory.units = inventory.units.filter(x => x.id !== 'T823'); // JavaScript directive, not copy.
const rewrites = JSON.parse(fs.readFileSync(path.join(dir, 'rewrites.json'), 'utf8'));
for (const [id, text] of Object.entries({T333:'10:00–13:00\n14:00–17:00',T452:'09:00–11:50\n13:00–17:50'})) {
  const unit = inventory.units.find(x => x.id === id);
  unit.original = text;
  unit.captureNote = 'DOM textContent가 생략한 block 줄바꿈을 복원했습니다. 실제 화면은 두 구간을 나누어 표시합니다.';
  delete rewrites[id];
}
let next = Math.max(...inventory.units.map(x => Number(x.id.slice(1)))) + 1;
const norm = s => s.replace(/\s+/g, ' ').trim();
function add(original, source, location, kind='ui') {
  original = norm(original);
  if (!original) return;
  const existing = inventory.units.find(x => norm(x.original) === original);
  if (existing) {
    if (!existing.sources.includes(source)) existing.sources.push(source);
    if (!existing.locations.includes(location)) existing.locations.push(location);
    return existing;
  }
  const item = {id:'T'+String(next++).padStart(3,'0'),lang:/[가-힣]/.test(original)?'ko':'en',kind,original,locations:[location],sources:[source]};
  inventory.units.push(item);
  return item;
}
const file = 'src/lib/i18n.ts';
const ast = ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
function visit(node) {
  if (ts.isFunctionDeclaration(node) && /^translate(?:SelectionLabel|GroupLabel|StatusNote)$/.test(node.name?.text || '')) {
    function props(n) {
      if (ts.isPropertyAssignment(n) && ts.isStringLiteral(n.initializer)) {
        const source=file+':'+(ast.getLineAndCharacterOfPosition(n.getStart()).line+1);
        add(n.name.text,source,'공통 UI / 상태·추천 그룹');
        add(n.initializer.text,source,'공통 UI / 상태·추천 그룹');
      }
      ts.forEachChild(n,props);
    }
    props(node);
  } else ts.forEachChild(node,visit);
}
visit(ast);
for (const file of ['src/app/opengraph-image.tsx','src/app/twitter-image.tsx']) {
  const ast=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  function visit(n) {
    if(ts.isJsxText(n) || (ts.isVariableDeclaration(n) && n.name.getText(ast)==='alt')) {
      const text=ts.isJsxText(n)?n.text:n.initializer.text;
      add(text,file+':'+(ast.getLineAndCharacterOfPosition(n.getStart()).line+1),'공유 이미지 / Open Graph·Twitter','social');
    }
    ts.forEachChild(n,visit);
  }
  visit(ast);
}
for (const [text,file] of [
  ['← Back','src/components/chatbot/SelectionScreen.tsx'],
  ['Multilingual','src/components/chatbot/ResultScreen.tsx'],
  ['EMS','src/components/chatbot/ChatbotBanner.tsx'],
  ['Police','src/components/chatbot/ChatbotBanner.tsx'],
  ['Website','src/components/ResultCard.tsx'],
  ['Call','src/components/ResultCard.tsx'],
  ['Call {name}','src/components/ResultCard.tsx'],
  ['{name} 전화 연결','src/components/ResultCard.tsx'],
  ['{name} website (opens in a new tab)','src/components/ResultCard.tsx'],
  ['{name} 사이트 (새 탭에서 열림)','src/components/ResultCard.tsx'],
  ['{names} 외 {count}곳','src/app/api/match/route.ts'],
  ['{names} and {count} more','src/lib/i18n.ts'],
]) add(text,file,'공통 UI / 동적 문구·접근성', text.includes('{')?'template':'ui');
inventory.scope = {
  included:['한·영 26개 경로의 정적 본문, 제목, 기관 정보, 가이드, 면책 고지','title, meta description 및 JSON-LD description','조건부 화면, 버튼, 오류·빈 목록, 상태·추천 그룹의 고정 문구','접근성 이름 템플릿, Open Graph·Twitter 공유 이미지 문구'],
  excluded:['내부 LLM 프롬프트·코드·로그·API 오류 식별자','SEO keywords/searchIntents 등 사용자에게 표시하지 않는 검색어 목록','외부 링크로 이동한 다른 기관의 페이지','미래에 추가되거나 변경될 외부 데이터'],
  dynamic:'추천 결과는 기관 원문과 고정 그룹·상태 문구를 조합합니다. 현재 소스의 템플릿을 검토했으며 모든 런타임 조합을 생성하지 않았습니다.',
  snapshot:'최신 로컬 프로덕션 빌드의 HTML과 현재 소스를 기준으로 수집했습니다. Notion의 이후 변경은 포함하지 않습니다.',
};
for (const route of inventory.routes) {
  const file='.next/server/app'+route+'.html';
  const html=fs.readFileSync(file,'utf8');
  for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const data=JSON.parse(match[1]);
    function walk(item) {
      if(Array.isArray(item)) return item.forEach(walk);
      if(!item || typeof item!=='object') return;
      if(typeof item.description==='string') add(item.description,file,route+' · JSON-LD'+(item.name?' · '+item.name:''),'metadata');
      Object.values(item).forEach(walk);
    }
    walk(data);
  }
}
fs.writeFileSync(path.join(dir,'inventory.json'),JSON.stringify(inventory,null,2)+'\n');
for (const id of Object.keys(rewrites)) if (rewrites[id] === inventory.units.find(x=>x.id===id)?.original) delete rewrites[id];
fs.writeFileSync(path.join(dir,'rewrites.json'),JSON.stringify(rewrites,null,2)+'\n');
console.log(inventory.units.filter(x=>Number(x.id.slice(1))>=878).map(x=>`${x.id}|${x.kind}|${x.original}`).join('\n'));
