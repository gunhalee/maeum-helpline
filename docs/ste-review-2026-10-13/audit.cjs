const inventory=require('./inventory.json');
const rewrites=require('./rewrites.json');
const sentences=s=>s.split(/(?<=[.!?])\s+/).filter(Boolean);
const words=s=>(s.match(/[A-Za-z0-9]+(?:['’+/-][A-Za-z0-9]+)*/g)||[]).length;
const numbers=s=>(s.match(/\d+/g)||[]).sort().join(',');
const changes=inventory.units.filter(x=>rewrites[x.id]&&rewrites[x.id]!==x.original);
const numericChanges=changes.filter(x=>numbers(x.original)!==numbers(rewrites[x.id]));
console.log(JSON.stringify({total:inventory.units.length,changed:changes.length,longEnglishDrafts:changes.filter(x=>!/[가-힣]/.test(rewrites[x.id])).flatMap(x=>sentences(rewrites[x.id]).filter(s=>words(s)>25).map(s=>({id:x.id,words:words(s),text:s}))),numericChanges:numericChanges.map(x=>({id:x.id,original:x.original,proposed:rewrites[x.id]}))},null,2));
module.exports={sentences,words,numbers};
