const {test} = require('node:test');
const assert = require('node:assert/strict');
const {Exercise, defaults, needsReview, readProgress} = require('../kana_core.js');
const fs = require('node:fs'), vm = require('node:vm');
const data={window:{}};
vm.runInNewContext(fs.readFileSync('phrases_hiragana.js','utf8'),data);
vm.runInNewContext(fs.readFileSync('mots_katakana.js','utf8'),data);
function invariant(e) {
 const used=e.slots.filter(x=>x!==null);
 assert.equal(new Set(used).size,used.length);
 assert.equal(e.history.length,used.length);
 assert.deepEqual([...e.history].sort((a,b)=>a-b),[...used].sort((a,b)=>a-b));
 assert.equal(e.tokens.length,e.target.length);
}
test('Repeated kana remain distinct and release the exact occurrence',()=>{
 const e=new Exercise('ここです');e.place(1);e.place(0);
 assert.deepEqual(e.slots,[1,0,null,null]);assert.equal(e.place(1),false);
 e.remove(0);assert.deepEqual(e.slots,[null,0,null,null]);
 e.place(2);e.undo();assert.deepEqual(e.slots,[null,0,null,null]);invariant(e);
});
test('Undo uses placement order, including a gap in the middle',()=>{
 const e=new Exercise('これはねこです');[0,1,2,3].forEach(i=>e.place(i));e.remove(1);e.place(4);e.undo();
 assert.deepEqual(e.slots,[0,null,2,3,null,null,null]);invariant(e);
});
test('Small kana and voiced kana have separate NFC character slots',()=>{
 for(const [jp,chars] of [['きって',['き','っ','て']],['きょう',['き','ょ','う']],['が',['が']],['ぱ',['ぱ']],['か\u3099',['が']]]){
 const e=new Exercise(jp);assert.deepEqual(e.target,chars);for(const t of e.tokens)e.place(t.id);assert.equal(e.check(),true);
 }
});
test('Partial verification and clearing errors preserve correct positions',()=>{
 const e=new Exercise('これはねこです');[0,2,1,3,4,5,6].forEach(i=>e.place(i));
 assert.equal(e.check(),false);assert.deepEqual(e.marks,['correct','incorrect','incorrect','correct','correct','correct','correct']);
 e.clearErrors();assert.deepEqual(e.slots,[0,null,null,3,4,5,6]);invariant(e);
});
test('Hint moves a misplaced occurrence without disturbing correct ones',()=>{
 const e=new Exercise('ここです');[2,0,1,3].forEach(i=>e.place(i));e.check();
 assert.equal(e.hint(),true);assert.equal(e.charAt(0),'こ');assert.equal(e.charAt(1),'こ');assert.equal(e.charAt(3),'す');invariant(e);
 e.hint();assert.equal(e.check(),true);assert.equal(e.hint(),false);invariant(e);
});
test('Reset releases all tokens and clears correction and history',()=>{
 const e=new Exercise('きって');e.place(2);e.check();e.reset();
 assert.deepEqual(e.slots,[null,null,null]);assert.deepEqual(e.marks,['','','']);assert.deepEqual(e.history,[]);
});
test('Review priority can recover and manual marking persists',()=>{
 const s=defaults();assert.equal(needsReview(s),false);s.difficulty=2;assert.equal(needsReview(s),true);
 s.difficulty=0;s.manual=true;assert.equal(needsReview(s),true);s.manual=false;assert.equal(needsReview(s),false);
});
test('Storage handles valid, malformed, unavailable and hostile values',()=>{
 assert.deepEqual(readProgress({getItem:()=>'{bad'}),{version:2,entries:{}});
 assert.deepEqual(readProgress({getItem:()=>{throw Error()}}),{version:2,entries:{}});
 const s=defaults();s.hints=3;s.manual=true;
 const result=readProgress({getItem:()=>JSON.stringify({version:2,entries:{'h-abc':s,'bad':s,'k-def':{hints:-1,successes:'7'}}})});
 assert.deepEqual(result.entries['h-abc'],s);assert.equal(result.entries.bad,undefined);
 assert.equal(result.entries['k-def'].hints,0);assert.equal(result.entries['k-def'].successes,0);
});
test('All authored entries: schema, unique IDs, scripts, levels, no duplicates',()=>{
 assert.ok(data.window.HIRAGANA.length>=350);assert.ok(data.window.KATAKANA.length>=100);
 for(const [name,pattern] of [['HIRAGANA',/^[ぁ-ゖ]+$/u],['KATAKANA',/^[ァ-ヶー]+$/u]]){
  const rows=data.window[name], ids=new Set(), texts=new Set();
  for(const p of rows){assert.match(p.jp,pattern,p.jp);assert.ok([1,2,3].includes(p.level));assert.ok(p.fr&&p.theme&&p.romaji);ids.add(p.id);texts.add(p.jp);assert.equal(p.jp.normalize('NFC'),p.jp);}
  assert.equal(ids.size,rows.length);assert.equal(texts.size,rows.length);
 }
});
test('All 489 entries survive shuffled fill, correction, hints and resets',()=>{
 for(const p of [...data.window.HIRAGANA,...data.window.KATAKANA]) {
  const e=new Exercise(p.jp);e.order.forEach(id=>e.place(id));invariant(e);e.check();
  let count=0;while(e.hint()){invariant(e);assert.ok(++count<=p.jp.length);}
  assert.equal(e.check(),true,p.jp);e.reset();invariant(e);
 }
});
test('Deterministic fuzz: repeated insert/remove/undo/hint/check/reset',()=>{
 let seed=713;const rand=()=>((seed=(seed*1664525+1013904223)>>>0)/2**32);
 for(const jp of ['ここです','これはねこです','きって','きょう','がっこうへいきます','ぱんをください']){
  const e=new Exercise(jp,rand);
  for(let n=0;n<2500;n++){
   const i=Math.floor(rand()*e.tokens.length);
   [()=>e.place(i),()=>e.remove(i),()=>e.undo(),()=>e.hint(),()=>e.check(),()=>e.clearErrors(),()=>e.reset()][Math.floor(rand()*7)]();invariant(e);
  }
 }
});

test('Verified positions resist removal and undo; reset unlocks them',()=>{
 const e=new Exercise('ここです');
 e.place(0);e.place(2);e.place(1);e.place(3);e.check();
 assert.equal(e.remove(0),false);assert.equal(e.remove(3),false);
 e.undo();assert.equal(e.charAt(2),'');assert.equal(e.charAt(3),'す');
 e.clearErrors();assert.equal(e.charAt(0),'こ');
 e.hint();assert.equal(e.charAt(1),'こ');
 e.reset();assert.equal(e.locked.size,0);assert.ok(e.slots.every(x=>x===null));
 e.place(0);assert.equal(e.remove(0),true);
});
