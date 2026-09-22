/* Espacement pédagogique aligné sur les mots du rōmaji éditorial. */
(function(root) {
const map={};
for(const [kana,roma] of [
 ['あいうえお','a i u e o'],['かきくけこ','ka ki ku ke ko'],['さしすせそ','sa shi su se so'],['たちつてと','ta chi tsu te to'],['なにぬねの','na ni nu ne no'],['はひふへほ','ha hi fu he ho'],['まみむめも','ma mi mu me mo'],['やゆよ','ya yu yo'],['らりるれろ','ra ri ru re ro'],['わをん','wa o n'],['がぎぐげご','ga gi gu ge go'],['ざじずぜぞ','za ji zu ze zo'],['だぢづでど','da ji zu de do'],['ばびぶべぼ','ba bi bu be bo'],['ぱぴぷぺぽ','pa pi pu pe po'],['ぁぃぅぇぉ','a i u e o']])
 Array.from(kana).forEach((c,i)=>map[c]=[roma.split(' ')[i]]);
map['は']=['ha','wa'];map['へ']=['he','e'];
const combos={};
for(const [c,r] of Object.entries({'き':'ky','ぎ':'gy','し':'sh','じ':'j','ち':'ch','に':'ny','ひ':'hy','び':'by','ぴ':'py','み':'my','り':'ry'}))
 for(const [k,v] of [['ゃ','a'],['ゅ','u'],['ょ','o']])combos[c+k]=r+v;
Object.assign(combos,{'ふぁ':'fa','ふぃ':'fi','ふぇ':'fe','ふぉ':'fo','ちぇ':'che','しぇ':'she','じぇ':'je','てぃ':'ti','でぃ':'di','うぃ':'wi','うぇ':'we','うぉ':'wo'});

function format(japanese, romaji) {
 const jp=Array.from(japanese).map(c=>c>='ァ'&&c<='ヶ'?String.fromCharCode(c.charCodeAt(0)-0x60):c).join('');
 const words=romaji.toLowerCase().split(/\s+/).map(w=>w.replace(/['’?.-]/g,'')).filter(Boolean);
 const wanted=words.join('');
 const boundaries=new Set();let total=0;
 for(const word of words.slice(0,-1)){total+=word.length;boundaries.add(total);}
 const failed=new Set();
 function go(i,j){
  if(i===jp.length)return j===wanted.length?[]:null;
  const key=i+':'+j;if(failed.has(key))return null;
  const options=[];const pair=jp.slice(i,i+2);
  if(combos[pair])options.push([2,combos[pair]]);
  if(jp[i]==='っ' && /[bcdfghjklmnpqrstvwxyz]/.test(wanted[j]||''))options.push([1,wanted[j]]);
  if(jp[i]==='ー' && /[aeiou]/.test(wanted[j-1]||''))options.push([1,wanted[j-1]]);
  for(const value of map[jp[i]]||[])options.push([1,value]);
  for(const [length,value] of options){
   if(!wanted.startsWith(value,j))continue;
   if([...boundaries].some(b=>b>j&&b<j+value.length))continue;
   const rest=go(i+length,j+value.length);
   if(rest!==null)return [japanese.slice(i,i+length)+(boundaries.has(j+value.length)?' ':''),...rest];
  }
  failed.add(key);return null;
 }
 return go(0,0)?.join('') ?? japanese;
}
root.KanaSolution={format};
})(typeof window==='undefined'?globalThis:window);
