// A mechanical correspondence check, complemented by the human-readable editorial audit.
// Particle readings are accepted as alternatives here; their grammatical role is reviewed separately.
const fs=require('node:fs'),vm=require('node:vm');const ctx={window:{}};
for(const f of ['phrases_hiragana.js','mots_katakana.js'])vm.runInNewContext(fs.readFileSync(f,'utf8'),ctx);
const map={};
for(const [kana,roma] of [
 ['あいうえお','a i u e o'],['かきくけこ','ka ki ku ke ko'],['さしすせそ','sa shi su se so'],['たちつてと','ta chi tsu te to'],['なにぬねの','na ni nu ne no'],['はひふへほ','ha hi fu he ho'],['まみむめも','ma mi mu me mo'],['やゆよ','ya yu yo'],['らりるれろ','ra ri ru re ro'],['わをん','wa o n'],['がぎぐげご','ga gi gu ge go'],['ざじずぜぞ','za ji zu ze zo'],['だぢづでど','da ji zu de do'],['ばびぶべぼ','ba bi bu be bo'],['ぱぴぷぺぽ','pa pi pu pe po'],['ぁぃぅぇぉ','a i u e o']])
 Array.from(kana).forEach((c,i)=>map[c]=[roma.split(' ')[i]]);
map['は']=['ha','wa'];map['へ']=['he','e'];
const combos={};
for(const [c,r] of Object.entries({'き':'ky','ぎ':'gy','し':'sh','じ':'j','ち':'ch','に':'ny','ひ':'hy','び':'by','ぴ':'py','み':'my','り':'ry'}))
 for(const [k,v] of [['ゃ','a'],['ゅ','u'],['ょ','o']])combos[c+k]=r+v;
Object.assign(combos,{'ふぁ':'fa','ふぃ':'fi','ふぇ':'fe','ふぉ':'fo','ちぇ':'che','しぇ':'she','じぇ':'je','てぃ':'ti','でぃ':'di','うぃ':'wi','うぇ':'we','うぉ':'wo'});
function corresponds(jp,roma){
 jp=Array.from(jp).map(c=>c>='ァ'&&c<='ヶ'?String.fromCharCode(c.charCodeAt(0)-0x60):c).join('');
 const wanted=roma.toLowerCase().replace(/[\s'’?.-]/g,'');
 const memo=new Set();
 function go(i,done){
  if(!wanted.startsWith(done))return false;
  if(i===jp.length)return done===wanted;
  const key=i+':'+done;if(memo.has(key))return false;memo.add(key);
  const pair=jp.slice(i,i+2);
  if(combos[pair]&&go(i+2,done+combos[pair]))return true;
  if(jp[i]==='っ')return go(i+1,done+wanted[done.length]);
  if(jp[i]==='ー')return /[aeiou]$/.test(done)&&go(i+1,done+done.at(-1));
  for(const s of map[jp[i]]||[])if(go(i+1,done+s))return true;
  return false;
 }
 return go(0,'');
}
const errors=[];
for(const p of [...ctx.window.HIRAGANA,...ctx.window.KATAKANA]){
 if(!corresponds(p.jp,p.romaji))errors.push(p);
}
console.log(JSON.stringify({checked:ctx.window.HIRAGANA.length+ctx.window.KATAKANA.length,errors},null,2));
if(errors.length)process.exitCode=1;
