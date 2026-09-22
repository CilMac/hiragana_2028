const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx={window:{}};
for(const file of ['solution-format.js','phrases_hiragana.js','mots_katakana.js'])vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx);
const format=ctx.window.KanaSolution.format;
test('Espaces pédagogiques : particules, petits kana et consonnes doubles',()=>{
 assert.equal(format('これはねこです','Kore wa neko desu'),'これ は ねこ です');
 assert.equal(format('きょうはがっこうへいきます','Kyou wa gakkou e ikimasu'),'きょう は がっこう へ いきます');
 assert.equal(format('きってをください','Kitte o kudasai'),'きって を ください');
 assert.equal(format('コーヒー','Koohii'),'コーヒー');
});
test('Toute la banque conserve ses kana et les limites de mots du rōmaji',()=>{
 for(const p of [...ctx.window.HIRAGANA,...ctx.window.KATAKANA]){
  const result=format(p.jp,p.romaji);
  assert.equal(result.replace(/ /g,''),p.jp,p.jp);
  assert.equal(result.split(' ').length,p.romaji.trim().split(/\s+/).length,p.jp+' / '+p.romaji);
 }
});
