/* Integration tests execute the actual app in a minimal DOM, with controlled browser services.
   Real rendering and browser interactions are checked separately through the browser. */
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
class Element {
 constructor(){this.children=[];this.value='';this.hidden=false;this.checked=false;this.attributes={};this.dataset={};this.textContent='';this.disabled=false;}
 append(...c){this.children.push(...c)}
 replaceChildren(...c){this.children=[...c]}
 add(c){this.append(c)}
 setAttribute(k,v){this.attributes[k]=v}
 addEventListener(){}
 focus(){}
 showModal(){this.open=true}
 close(){this.open=false}
 querySelector(){return this.children.find(c=>!c.disabled)}
}
function hasStat(a,label,value){
 return a.$('stats').children.some(group=>group.children.some(row=>row.children[0]?.textContent===label && row.children[1]?.textContent===String(value)));
}
function app(options={}){
 const elements={},saved=options.saved||new Map(),spoken=[],sounds=[];let cancels=0;
 const document={addEventListener(){},getElementById:id=>elements[id]||=(new Element()),createElement:()=>new Element()};
 const storage={getItem:k=>saved.get(k),setItem:(k,v)=>{if(options.blocked)throw Error('blocked');saved.set(k,v)}};
 const synth={cancel:()=>cancels++,getVoices:()=>options.noVoice?[]:(options.voices||[{lang:'ja-JP',name:'test'}]),speak:u=>spoken.push(u)};
 const ctx={document,Option:class extends Element{constructor(t,v){super();this.textContent=t;this.value=v}},console};
 ctx.Audio=class{constructor(src){this.src=src}play(){sounds.push(this.src);return Promise.resolve()}pause(){}};
 ctx.window=ctx;ctx.localStorage=storage;ctx.speechSynthesis=synth;
 ctx.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};
 vm.createContext(ctx);
 for(const file of ['phrases_hiragana.js','mots_katakana.js','kana_core.js','kana_app.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
 const $=id=>elements[id];
 return {$,saved,spoken,sounds,ctx,click:id=>$(id).onclick(),progress:()=>JSON.parse(saved.get('kana-v2-progress'))};
}
test('Always-visible romaji persists across navigation and reload; Off clears the preference',()=>{
 const a=app();assert.equal(a.$('romaji-always').checked,false);
 a.$('romaji-always').checked=true;a.$('romaji-always').onchange();
 assert.equal(a.$('romaji').textContent,'Kore wa neko desu');
 a.click('next');assert.notEqual(a.$('romaji').textContent,'● ● ● ● ● ●');
 a.click('katakana');assert.equal(a.$('romaji').textContent,'Koohii');
 const b=app({saved:a.saved});assert.equal(b.$('romaji-always').checked,true);
 assert.equal(b.$('romaji').textContent,'Kore wa neko desu');
 b.click('romaji-toggle');assert.equal(b.$('romaji-always').checked,false);
 assert.equal(b.$('romaji').textContent,'● ● ● ● ● ●');
 assert.equal(app({saved:b.saved}).$('romaji-always').checked,false);
 const c=app({blocked:true});c.$('romaji-always').checked=true;c.$('romaji-always').onchange();c.click('next');
 assert.notEqual(c.$('romaji').textContent,'● ● ● ● ● ●');
});
test('Session counters reset independently of saved learning progress',()=>{
 const a=app();a.click('hint');a.click('solution');a.click('mark');
 const saved=JSON.stringify(a.progress());
 assert.ok(hasStat(a,'Indices utilisés pendant la session',1));
 a.click('stats-reset');
 assert.ok(hasStat(a,'Indices utilisés pendant la session',0));
 assert.equal(JSON.stringify(a.progress()),saved);
 assert.equal(a.$('mark').attributes['aria-pressed'],'true');
 a.click('hint');
 assert.ok(hasStat(a,'Indices utilisés pendant la session',1));
 const b=app({saved:a.saved});
 assert.ok(hasStat(b,'Indices utilisés pendant la session',0));
});
test('Session score penalizes hints and solutions even after success and resets',()=>{
 const a=app();assert.equal(a.$('session-score').textContent,'—');
 a.click('hint');assert.equal(a.$('session-score').textContent,'0 %');
 for(let id=1;id<7;id++)a.$('pool').children.find(b=>b.dataset.tokenId===id).onclick();
 a.click('check');assert.equal(a.$('session-score').textContent,'50 %');
 a.click('solution');assert.equal(a.$('session-score').textContent,'33 %');
 a.click('stats-reset');assert.equal(a.$('session-score').textContent,'—');
 const b=app();for(let id=0;id<7;id++)b.$('pool').children.find(t=>t.dataset.tokenId===id).onclick();
 b.click('check');assert.equal(b.$('session-score').textContent,'100 %');
});
test('No automatic audio; Japanese voice and slower speed only after click',()=>{
 const a=app();assert.equal(a.spoken.length,0);a.click('next');assert.equal(a.spoken.length,0);
 a.click('audio');assert.equal(a.spoken.length,1);assert.equal(a.spoken[0].lang,'ja-JP');assert.equal(a.spoken[0].rate,.85);
});
test('Original voice preference wins over the first Japanese voice, with fallback',()=>{
 const a=app({voices:[{lang:'en-US',name:'Kyoko'},{lang:'ja-JP',name:'Otoya'},{lang:'ja-JP',name:'Kyoko'}]});
 a.click('audio');assert.equal(a.spoken[0].voice.name,'Kyoko');assert.equal(a.spoken[0].voice.lang,'ja-JP');
 const b=app({voices:[{lang:'ja-JP',name:'Otoya'}]});b.click('audio');assert.equal(b.spoken[0].voice.name,'Otoya');
});
test('Unavailable voice and synthesis failure leave exercise usable',()=>{
 const a=app({noVoice:true});a.click('audio');assert.match(a.$('feedback').textContent,/Aucune voix/);a.click('hint');assert.match(a.$('feedback').textContent,/kana/);
 const b=app();b.click('audio');b.spoken[0].onerror({error:'synthesis-failed'});assert.match(b.$('feedback').textContent,/indisponible/);b.click('next');assert.ok(b.$('slots').children.length);
});
test('Blocked storage still allows hints, solution and navigation',()=>{
 const a=app({blocked:true});a.click('hint');assert.equal(a.$('storage-warning').hidden,false);a.click('solution');assert.equal(a.$('answer').textContent,'これはねこです');a.click('next');assert.ok(a.$('romaji').textContent);
});
test('Explicit solution only; repeated check does not inflate statistics',()=>{
 const a=app();a.$('pool').children[0].onclick();a.click('check');a.click('check');
 assert.equal(a.$('answer').hidden,true);let stat=Object.values(a.progress().entries)[0];assert.equal(stat.errors,1);
 a.click('solution');a.click('solution');stat=Object.values(a.progress().entries)[0];assert.equal(stat.solutions,1);assert.equal(a.$('answer').hidden,true);
});
test('Progress and manual review persist when app reloads',()=>{
 const a=app();a.click('hint');a.click('mark');a.click('solution');const b=app({saved:a.saved});
 assert.ok(hasStat(b,'Indices utilisés sur cette phrase',0));assert.equal(b.$('mark').attributes['aria-pressed'],'true');assert.equal(b.$('answer').hidden,true);
});
test('Filters can yield zero results and recover; katakana resets filters',()=>{
 const a=app();a.$('review-only').checked=true;a.$('review-only').onchange();assert.equal(a.$('exercise').hidden,true);assert.equal(a.$('mark').disabled,true);
 a.$('review-only').checked=false;a.$('review-only').onchange();assert.equal(a.$('exercise').hidden,false);
 a.$('theme').value='hôtel';a.$('level').value='3';a.$('theme').onchange();a.click('romaji-toggle');assert.match(a.$('romaji').textContent,/Choushoku/);
 a.click('katakana');assert.equal(a.$('romaji').textContent,'● ● ● ● ● ●');a.click('romaji-toggle');assert.equal(a.$('romaji').textContent,'Koohii');assert.equal(a.$('level').value,'');
});
test('Successful unaided review reduces automatic priority',()=>{
 const a=app();a.click('solution');a.click('next');a.click('previous');
 for(let id=0;id<7;id++)a.$('pool').children.find(b=>b.dataset.tokenId===id).onclick();
 a.click('check');a.click('check');let s=Object.values(a.progress().entries)[0];assert.equal(s.successes,1);assert.equal(s.difficulty,0);
 a.$('review-only').checked=true;a.$('review-only').onchange();assert.equal(a.$('exercise').hidden,true);
});
test('Table hides readings initially and reveals only the selected kana',()=>{
 const a=app();a.click('table-open');const grid=a.$('kana-table').children[1];
 assert.equal(grid.children[0].children[1].textContent,'·');assert.equal(a.spoken.length,0);
 grid.children[0].onclick();assert.equal(grid.children[0].children[1].textContent,'a');assert.equal(grid.children[1].children[1].textContent,'·');assert.equal(a.spoken.length,1);
});

test('Correct answer disables verification and plays victory once; validated slots remain locked',()=>{
 const a=app();assert.equal(a.sounds.length,0);
 a.$('pool').children.find(b=>b.dataset.tokenId===0).onclick();a.click('check');assert.equal(a.sounds.length,0);
 for(let id=1;id<7;id++)a.$('pool').children.find(b=>b.dataset.tokenId===id).onclick();
 a.click('check');assert.equal(a.$('check').disabled,true);assert.deepEqual(a.sounds,['success-soft.wav']);assert.equal(a.spoken.length,1);assert.equal(a.spoken[0].text,'これはねこです');
 a.click('check');assert.equal(a.sounds.length,1);assert.equal(a.spoken.length,1);
 a.$('slots').children[2].onclick();assert.equal(a.$('check').disabled,true);assert.equal(a.$('slots').children[2].disabled,true);a.click('undo');assert.equal(a.$('check').disabled,true);
 a.click('next');assert.equal(a.sounds.length,1);
});

test('Written Japanese appears only after success and is hidden on editing or navigation',()=>{
 const a=app();assert.equal(a.$('written-answer').hidden,true);
 a.click('solution');assert.equal(a.$('written-answer').hidden,true);
 a.$('pool').children.find(b=>b.dataset.tokenId===0).onclick();a.click('check');assert.equal(a.$('written-answer').hidden,true);
 for(let id=1;id<7;id++)a.$('pool').children.find(b=>b.dataset.tokenId===id).onclick();
 a.click('check');assert.equal(a.$('written-answer').textContent,'これは猫です');assert.equal(a.$('written-answer').hidden,false);
 assert.equal(a.$('romaji').textContent,'Kore wa neko desu');
 a.$('slots').children[0].onclick();assert.equal(a.$('written-answer').hidden,false);a.click('reset');assert.equal(a.$('written-answer').hidden,true);
 a.click('next');assert.equal(a.$('written-answer').hidden,true);
 for(const p of a.ctx.HIRAGANA){assert.ok(p.written);assert.ok(!/\s/.test(p.written));}
});
