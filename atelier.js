
/* =========================================================
   DONNÉES KANA
   ========================================================= */
const HIRA_BASIC = [
  ['a','あ','voyelles'],['i','い','voyelles'],['u','う','voyelles'],['e','え','voyelles'],['o','お','voyelles'],
  ['ka','か','K'],['ki','き','K'],['ku','く','K'],['ke','け','K'],['ko','こ','K'],
  ['sa','さ','S'],['shi','し','S'],['su','す','S'],['se','せ','S'],['so','そ','S'],
  ['ta','た','T'],['chi','ち','T'],['tsu','つ','T'],['te','て','T'],['to','と','T'],
  ['na','な','N'],['ni','に','N'],['nu','ぬ','N'],['ne','ね','N'],['no','の','N'],
  ['ha','は','H'],['hi','ひ','H'],['fu','ふ','H'],['he','へ','H'],['ho','ほ','H'],
  ['ma','ま','M'],['mi','み','M'],['mu','む','M'],['me','め','M'],['mo','も','M'],
  ['ya','や','Y'],['yu','ゆ','Y'],['yo','よ','Y'],
  ['ra','ら','R'],['ri','り','R'],['ru','る','R'],['re','れ','R'],['ro','ろ','R'],
  ['wa','わ','W'],['wo','を','W'],['n','ん','W']
];
const KATA_BASIC = [
  ['a','ア','voyelles'],['i','イ','voyelles'],['u','ウ','voyelles'],['e','エ','voyelles'],['o','オ','voyelles'],
  ['ka','カ','K'],['ki','キ','K'],['ku','ク','K'],['ke','ケ','K'],['ko','コ','K'],
  ['sa','サ','S'],['shi','シ','S'],['su','ス','S'],['se','セ','S'],['so','ソ','S'],
  ['ta','タ','T'],['chi','チ','T'],['tsu','ツ','T'],['te','テ','T'],['to','ト','T'],
  ['na','ナ','N'],['ni','ニ','N'],['nu','ヌ','N'],['ne','ネ','N'],['no','ノ','N'],
  ['ha','ハ','H'],['hi','ヒ','H'],['fu','フ','H'],['he','ヘ','H'],['ho','ホ','H'],
  ['ma','マ','M'],['mi','ミ','M'],['mu','ム','M'],['me','メ','M'],['mo','モ','M'],
  ['ya','ヤ','Y'],['yu','ユ','Y'],['yo','ヨ','Y'],
  ['ra','ラ','R'],['ri','リ','R'],['ru','ル','R'],['re','レ','R'],['ro','ロ','R'],
  ['wa','ワ','W'],['wo','ヲ','W'],['n','ン','W']
];
const HIRA_DAKUTEN = [
  ['ga','が','G'],['gi','ぎ','G'],['gu','ぐ','G'],['ge','げ','G'],['go','ご','G'],
  ['za','ざ','Z'],['ji','じ','Z'],['zu','ず','Z'],['ze','ぜ','Z'],['zo','ぞ','Z'],
  ['da','だ','D'],['ji','ぢ','D',['di']],['zu','づ','D',['du']],['de','で','D'],['do','ど','D'],
  ['ba','ば','B'],['bi','び','B'],['bu','ぶ','B'],['be','べ','B'],['bo','ぼ','B'],
  ['pa','ぱ','P'],['pi','ぴ','P'],['pu','ぷ','P'],['pe','ぺ','P'],['po','ぽ','P']
];
const KATA_DAKUTEN = [
  ['ga','ガ','G'],['gi','ギ','G'],['gu','グ','G'],['ge','ゲ','G'],['go','ゴ','G'],
  ['za','ザ','Z'],['ji','ジ','Z'],['zu','ズ','Z'],['ze','ゼ','Z'],['zo','ゾ','Z'],
  ['da','ダ','D'],['ji','ヂ','D',['di']],['zu','ヅ','D',['du']],['de','デ','D'],['do','ド','D'],
  ['ba','バ','B'],['bi','ビ','B'],['bu','ブ','B'],['be','ベ','B'],['bo','ボ','B'],
  ['pa','パ','P'],['pi','ピ','P'],['pu','プ','P'],['pe','ペ','P'],['po','ポ','P']
];
const HIRA_YOON = [
  ['kya','きゃ','KY'],['kyu','きゅ','KY'],['kyo','きょ','KY'],
  ['sha','しゃ','SH'],['shu','しゅ','SH'],['sho','しょ','SH'],
  ['cha','ちゃ','CH'],['chu','ちゅ','CH'],['cho','ちょ','CH'],
  ['nya','にゃ','NY'],['nyu','にゅ','NY'],['nyo','にょ','NY'],
  ['hya','ひゃ','HY'],['hyu','ひゅ','HY'],['hyo','ひょ','HY'],
  ['mya','みゃ','MY'],['myu','みゅ','MY'],['myo','みょ','MY'],
  ['rya','りゃ','RY'],['ryu','りゅ','RY'],['ryo','りょ','RY'],
  ['gya','ぎゃ','GY'],['gyu','ぎゅ','GY'],['gyo','ぎょ','GY'],
  ['ja','じゃ','J'],['ju','じゅ','J'],['jo','じょ','J'],
  ['bya','びゃ','BY'],['byu','びゅ','BY'],['byo','びょ','BY'],
  ['pya','ぴゃ','PY'],['pyu','ぴゅ','PY'],['pyo','ぴょ','PY']
];
const KATA_YOON = [
  ['kya','キャ','KY'],['kyu','キュ','KY'],['kyo','キョ','KY'],
  ['sha','シャ','SH'],['shu','シュ','SH'],['sho','ショ','SH'],
  ['cha','チャ','CH'],['chu','チュ','CH'],['cho','チョ','CH'],
  ['nya','ニャ','NY'],['nyu','ニュ','NY'],['nyo','ニョ','NY'],
  ['hya','ヒャ','HY'],['hyu','ヒュ','HY'],['hyo','ヒョ','HY'],
  ['mya','ミャ','MY'],['myu','ミュ','MY'],['myo','ミョ','MY'],
  ['rya','リャ','RY'],['ryu','リュ','RY'],['ryo','リョ','RY'],
  ['gya','ギャ','GY'],['gyu','ギュ','GY'],['gyo','ギョ','GY'],
  ['ja','ジャ','J'],['ju','ジュ','J'],['jo','ジョ','J'],
  ['bya','ビャ','BY'],['byu','ビュ','BY'],['byo','ビョ','BY'],
  ['pya','ピャ','PY'],['pyu','ピュ','PY'],['pyo','ピョ','PY']
];

function makeEntries(raw, script, set){
  return raw.map(([romaji,char,row,aliases=[]]) => ({
    romaji,char,row,aliases,script,set,
    key:`${script}:${char}`
  }));
}
const DATA = [
  ...makeEntries(HIRA_BASIC,'hiragana','basic'),
  ...makeEntries(HIRA_DAKUTEN,'hiragana','dakuten'),
  ...makeEntries(HIRA_YOON,'hiragana','yoon'),
  ...makeEntries(KATA_BASIC,'katakana','basic'),
  ...makeEntries(KATA_DAKUTEN,'katakana','dakuten'),
  ...makeEntries(KATA_YOON,'katakana','yoon')
];

const BASIC_ROW_ORDER = ['voyelles','K','S','T','N','H','M','Y','R','W'];
const ROW_LABELS = {
  voyelles:'Voyelles',K:'Série K',S:'Série S',T:'Série T',N:'Série N',H:'Série H',
  M:'Série M',Y:'Série Y',R:'Série R',W:'Série W + ん / ン',
  G:'Série G',Z:'Série Z',D:'Série D',B:'Série B',P:'Série P',
  KY:'Kya / Kyu / Kyo',SH:'Sha / Shu / Sho',CH:'Cha / Chu / Cho',NY:'Nya / Nyu / Nyo',
  HY:'Hya / Hyu / Hyo',MY:'Mya / Myu / Myo',RY:'Rya / Ryu / Ryo',
  GY:'Gya / Gyu / Gyo',J:'Ja / Ju / Jo',BY:'Bya / Byu / Byo',PY:'Pya / Pyu / Pyo'
};

/* =========================================================
   ÉTAT & STOCKAGE
   ========================================================= */
const STORAGE_KEY = 'kana-trainer-progress-v1';
const SETTINGS_KEY = 'kana-trainer-settings-v1';

let state = {
  script:'hiragana',
  mode:'learn',
  set:'basic',
  row:'all',
  direction:'char-romaji',
  quizType:'mcq',
  stats:{}
};

let settings = {
  autoAudio:true,
  progressive:false,
  progressiveStep:1,
  font:'serif'
};

let flashDeck=[], flashIndex=0, flashFlipped=false;
let quizDeck=[], quizIndex=0, quizAnswered=false, quizCurrent=null;

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if(saved.stats && typeof saved.stats==='object') {
      for(const item of DATA) {
        const raw=saved.stats[item.key];
        if(raw && ['seen','correct','wrong'].every(k=>Number.isSafeInteger(raw[k]) && raw[k]>=0) && raw.seen===raw.correct+raw.wrong) state.stats[item.key]=raw;
      }
    }
  }catch(e){}
  try{
    const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    if(typeof savedSettings.autoAudio==='boolean') settings.autoAudio=savedSettings.autoAudio;
    settings.progressive=savedSettings.progressive===true;
    if(Number.isInteger(savedSettings.progressiveStep) && savedSettings.progressiveStep>=1 && savedSettings.progressiveStep<=10) settings.progressiveStep=savedSettings.progressiveStep;
    if(['serif','rounded'].includes(savedSettings.font)) settings.font=savedSettings.font;
  }catch(e){}
}
function saveProgress(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({stats:state.stats})); }
  catch (_) { toast('Progression conservée pour cette visite seulement.'); }
}
function saveSettings(){
  settings.autoAudio = document.getElementById('auto-audio').checked;
  try { localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings)); }
  catch (_) { toast('Réglages conservés pour cette visite seulement.'); }
}
function getStat(item){
  return state.stats[item.key] || {seen:0,correct:0,wrong:0};
}
function updateStat(item, correct){
  const s = getStat(item);
  s.seen += 1;
  if(correct) s.correct += 1; else s.wrong += 1;
  state.stats[item.key] = s;
  saveProgress();
  refreshMastery();
}
function masteryState(item){
  const s = getStat(item);
  if(!s.seen) return 'new';
  const acc = s.correct / s.seen;
  if(s.wrong >= 2 && acc < .7) return 'weak';
  if(s.seen >= 4 && acc >= .85) return 'mastered';
  return 'learning';
}
function masteryPct(item){
  const s = getStat(item);
  if(!s.seen) return 0;
  return Math.round((s.correct/s.seen)*100);
}

/* =========================================================
   FILTRES
   ========================================================= */
function baseItemsForScript(){
  return DATA.filter(x => x.script === state.script && x.set === 'basic');
}
function scriptItems(){
  return DATA.filter(x => x.script === state.script);
}
function progressiveAllowed(item){
  if(!settings.progressive || state.set !== 'basic') return true;
  const idx = BASIC_ROW_ORDER.indexOf(item.row);
  return idx >= 0 && idx < settings.progressiveStep;
}
function selectedItems(){
  let items = scriptItems();
  if(state.set !== 'all') items = items.filter(x => x.set === state.set);
  if(settings.progressive && state.set === 'basic') items = items.filter(progressiveAllowed);
  if(state.row !== 'all') items = items.filter(x => x.row === state.row);
  return items;
}
function weakItems(){
  return scriptItems()
    .filter(x => {
      const s = getStat(x);
      if(!s.seen) return false;
      const acc = s.correct/s.seen;
      return s.wrong > 0 && (acc < .85 || s.wrong >= 2);
    })
    .sort((a,b)=>{
      const sa=getStat(a), sb=getStat(b);
      const aa=sa.correct/sa.seen, ab=sb.correct/sb.seen;
      if(aa !== ab) return aa-ab;
      return sb.wrong-sa.wrong;
    });
}
function shuffle(a){
  const arr=a.slice();
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

/* =========================================================
   NAVIGATION
   ========================================================= */
function setScript(script){
  state.script=script;
  state.row='all';
  document.getElementById('script-hira').classList.toggle('active',script==='hiragana');
  document.getElementById('script-kata').classList.toggle('active',script==='katakana');
  buildRowSelect();
  rebuildCurrentMode();
}
function setMode(mode){
  state.mode=mode;
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('mode-'+mode).classList.add('active');
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('panel-'+mode).classList.add('active');

  document.getElementById('direction-control').style.display = ['cards','quiz'].includes(mode) ? '' : 'none';
  document.getElementById('quiz-type-control').style.display = mode==='quiz' ? '' : 'none';

  rebuildCurrentMode();
}
function setContentSet(v){
  state.set=v;
  state.row='all';
  buildRowSelect();
  rebuildCurrentMode();
}
function setRow(v){
  state.row=v;
  rebuildCurrentMode();
}
function setDirection(v){
  state.direction=v;
  if(state.mode==='cards') buildFlashDeck();
  if(state.mode==='quiz') restartQuiz();
}
function setQuizType(v){
  state.quizType=v;
  restartQuiz();
}
function rebuildCurrentMode(){
  updateSelectionCount();
  if(state.mode==='learn') renderLearn();
  if(state.mode==='cards') buildFlashDeck();
  if(state.mode==='quiz') restartQuiz();
  if(state.mode==='review') renderReview();
  refreshMastery();
}
function buildRowSelect(){
  const sel=document.getElementById('row-select');
  const rows=[...new Set(scriptItems()
    .filter(x=> state.set==='all' || x.set===state.set)
    .filter(x=>!settings.progressive || state.set!=='basic' || progressiveAllowed(x))
    .map(x=>x.row))];
  sel.innerHTML='<option value="all">Toutes les séries</option>';
  rows.forEach(r=>{
    const o=document.createElement('option');
    o.value=r;o.textContent=ROW_LABELS[r]||r;
    sel.appendChild(o);
  });
  sel.value='all';
  state.row='all';
}
function updateSelectionCount(){
  document.getElementById('selection-count').textContent=selectedItems().length;
}

/* =========================================================
   MODE APPRENDRE
   ========================================================= */
function renderLearn(){
  const root=document.getElementById('kana-groups');
  const items=selectedItems();
  root.innerHTML='';
  if(!items.length){
    root.innerHTML='<div class="empty-state"><p>Aucun kana dans cette sélection.</p></div>';
    return;
  }
  const rows=[...new Set(items.map(x=>x.row))];
  rows.forEach(row=>{
    const arr=items.filter(x=>x.row===row);
    const group=document.createElement('div');
    group.className='kana-group';
    const mastered=arr.filter(x=>masteryState(x)==='mastered').length;
    group.innerHTML=`
      <div class="kana-group-head">
        <div class="kana-group-name">${ROW_LABELS[row]||row}</div>
        <div class="kana-group-score">${mastered} / ${arr.length} acquis</div>
      </div>
      <div class="kana-grid"></div>`;
    const grid=group.querySelector('.kana-grid');
    arr.forEach(item=>{
      const tile=document.createElement('button');
      const m=masteryState(item);
      tile.className='kana-tile '+(m==='new'?'':m);
      tile.title=`${item.char} · cliquer pour révéler et écouter`;
      tile.setAttribute('aria-label',`${item.char}, révéler la lecture`);
      tile.innerHTML=`
        <span class="mastery-dot"></span>
        <span class="kana-char">${item.char}</span>
        <span class="kana-romaji">${item.romaji}</span>
        <span class="audio-mark">♪ écouter</span>`;
      tile.onclick=()=>{
        tile.classList.add('revealed');
        window.KanaStrokes?.open(item.char,item.romaji);
        tile.setAttribute('aria-label',`${item.char}, ${item.romaji}`);
        speak(item.char);
      };
      grid.appendChild(tile);
    });
    root.appendChild(group);
  });
}

/* =========================================================
   MODE CARTES
   ========================================================= */
function buildFlashDeck(items=null){
  flashDeck=shuffle(items || selectedItems());
  flashIndex=0;
  flashFlipped=false;
  showFlashCard();
}
function showFlashCard(){
  const front=document.getElementById('card-front');
  const back=document.getElementById('card-back');
  const card=document.getElementById('flash-card');
  const actions=document.getElementById('answer-actions');

  if(!flashDeck.length){
    front.innerHTML='<div class="empty-state"><p>Aucun kana dans cette sélection.</p></div>';
    back.innerHTML='';
    card.classList.remove('flipped');flashFlipped=false;
    front.setAttribute('aria-hidden','false');back.setAttribute('aria-hidden','true');
    actions.style.display='none';
    return;
  }
  if(flashIndex>=flashDeck.length) flashIndex=0;
  const item=flashDeck[flashIndex];
  const m=masteryState(item);
  const label=state.script==='hiragana'?'Hiragana':'Katakana';

  card.classList.remove('flipped');
  flashFlipped=false;
  front.setAttribute('aria-hidden','false');back.setAttribute('aria-hidden','true');
  actions.style.display='none';
  document.getElementById('card-hint').textContent='Clique pour retourner';

  if(state.direction==='char-romaji'){
    front.innerHTML=`
      <span class="card-script">${label}</span>
      <span class="card-state">${stateLabel(m)}</span>
      <div class="card-big">${item.char}</div>
      <button class="icon-btn card-audio" onclick="event.stopPropagation();speak('${item.char}')">♪</button>`;
    back.innerHTML=`
      <span class="card-script">${label}</span>
      <div class="card-romaji-big">${item.romaji}</div>
      <div class="card-sub">${item.char} — ${item.romaji}</div>
      <button class="icon-btn card-audio" onclick="event.stopPropagation();speak('${item.char}')">♪</button>`;
  }else{
    front.innerHTML=`
      <span class="card-script">${label}</span>
      <span class="card-state">${stateLabel(m)}</span>
      <div class="card-romaji-big">${item.romaji}</div>`;
    back.innerHTML=`
      <span class="card-script">${label}</span>
      <div class="card-big">${item.char}</div>
      <div class="card-sub">${item.char} — ${item.romaji}</div>
      <button class="icon-btn card-audio" onclick="event.stopPropagation();speak('${item.char}')">♪</button>`;
  }

  const pct=Math.round((flashIndex/flashDeck.length)*100);
  document.getElementById('card-progress').style.width=pct+'%';
  document.getElementById('card-count').textContent=`${flashIndex+1} / ${flashDeck.length}`;
  document.getElementById('prev-card').disabled=flashIndex===0;
  document.getElementById('next-card').textContent=flashIndex===flashDeck.length-1?'↺ Recommencer':'Suivant →';
}
function flipCard(){
  if(!flashDeck.length) return;
  flashFlipped=!flashFlipped;
  document.getElementById('card-front').setAttribute('aria-hidden',String(flashFlipped));
  document.getElementById('card-back').setAttribute('aria-hidden',String(!flashFlipped));
  document.getElementById('flash-card').classList.toggle('flipped',flashFlipped);
  document.getElementById('answer-actions').style.display=flashFlipped?'flex':'none';
  document.getElementById('card-hint').textContent=flashFlipped?'Tu te souvenais ?':'Clique pour retourner';
  if(flashFlipped && settings.autoAudio) speak(flashDeck[flashIndex].char);
}
function rateCard(correct){
  if(!flashDeck.length || !flashFlipped) return;
  updateStat(flashDeck[flashIndex],correct);
  if(flashIndex<flashDeck.length-1){
    flashIndex++;
    showFlashCard();
  }else{
    toast('Séance terminée — les résultats sont enregistrés.');
    flashDeck=shuffle(flashDeck);
    flashIndex=0;
    showFlashCard();
  }
}
function prevCard(){
  if(flashIndex>0){flashIndex--;showFlashCard()}
}
function nextCard(){
  if(!flashDeck.length) return;
  if(flashIndex<flashDeck.length-1){flashIndex++;showFlashCard()}
  else {flashDeck=shuffle(flashDeck);flashIndex=0;showFlashCard();toast('Nouveau mélange');}
}
function randomCard(){
  if(!flashDeck.length) return;
  flashIndex=Math.floor(Math.random()*flashDeck.length);
  showFlashCard();
}
function stateLabel(m){
  return m==='mastered'?'Acquis':m==='weak'?'À revoir':m==='learning'?'En cours':'Nouveau';
}

/* =========================================================
   QUIZ
   ========================================================= */
function restartQuiz(customItems=null){
  const pool=customItems || selectedItems();
  const count=Math.min(20,pool.length);
  quizDeck=shuffle(pool).slice(0,count);
  quizIndex=0;
  quizAnswered=false;
  showQuiz();
}
function showQuiz(){
  const q=document.getElementById('quiz-question');
  const opts=document.getElementById('quiz-options');
  const typeWrap=document.getElementById('type-wrap');
  const feedback=document.getElementById('quiz-feedback');
  const input=document.getElementById('type-input');

  feedback.innerHTML='';
  input.value='';
  input.className='type-input';
  quizAnswered=false;quizCurrent=null;
  document.getElementById('next-quiz').textContent='Passer';
  document.getElementById('next-quiz').disabled=false;

  if(!quizDeck.length){
    q.innerHTML='<div class="empty-state"><p>Aucun kana dans cette sélection.</p></div>';
    opts.innerHTML='';
    typeWrap.style.display='none';
    return;
  }
  if(quizIndex>=quizDeck.length){
    showQuizDone();
    return;
  }
  quizCurrent=quizDeck[quizIndex];
  const pct=Math.round((quizIndex/quizDeck.length)*100);
  document.getElementById('quiz-progress').style.width=pct+'%';
  document.getElementById('quiz-count').textContent=`${quizIndex+1} / ${quizDeck.length}`;

  opts.innerHTML='';
  typeWrap.style.display='none';

  if(state.quizType==='audio'){
    q.innerHTML=`
      <button class="audio-question-btn" onclick="speak('${quizCurrent.char}')" title="Écouter">♪</button>
      <div class="quiz-prompt">Clique sur ♪ pour écouter, puis choisis le bon kana</div>`;
    renderMcqOptions(true);
    return;
  }

  if(state.quizType==='typing'){
    if(state.direction==='char-romaji'){
      q.innerHTML=`<div class="quiz-kana">${quizCurrent.char}</div><div class="quiz-prompt">Tape le rōmaji correspondant</div>`;
    }else{
      q.innerHTML=`<div class="quiz-romaji-q">${quizCurrent.romaji}</div><div class="quiz-prompt">Tape ou colle le kana correspondant</div>`;
    }
    typeWrap.style.display='flex';
    setTimeout(()=>input.focus(),50);
    return;
  }

  if(state.direction==='char-romaji'){
    q.innerHTML=`<div class="quiz-kana">${quizCurrent.char}</div><div class="quiz-prompt">Quel est ce kana ?</div>`;
  }else{
    q.innerHTML=`<div class="quiz-romaji-q">${quizCurrent.romaji}</div><div class="quiz-prompt">Quel kana correspond ?</div>`;
  }
  renderMcqOptions(false);
}
function renderMcqOptions(audioMode){
  const container=document.getElementById('quiz-options');
  const all=selectedItems();
  const usedReadings=new Set([quizCurrent.romaji]);
  const distractors=shuffle(all.filter(x=>x.key!==quizCurrent.key)).filter(x=>{
    if(usedReadings.has(x.romaji)) return false;
    usedReadings.add(x.romaji);return true;
  }).slice(0,3);
  const choices=shuffle([quizCurrent,...distractors]);
  choices.forEach(item=>{
    const b=document.createElement('button');
    b.className='quiz-option';
    b.dataset.correct=item.key===quizCurrent.key?'1':'0';
    if(audioMode || state.direction==='romaji-char'){
      b.innerHTML=`<span class="jp">${item.char}</span>`;
    }else{
      b.innerHTML=`<span class="ro" style="font-size:1.35rem">${item.romaji}</span>`;
    }
    b.onclick=()=>chooseOption(b,item.key===quizCurrent.key);
    container.appendChild(b);
  });
}
function chooseOption(btn,correct){
  if(quizAnswered) return;
  quizAnswered=true;
  document.querySelectorAll('.quiz-option').forEach(b=>{
    b.disabled=true;
    if(b.dataset.correct==='1') b.classList.add('correct');
  });
  if(!correct) btn.classList.add('wrong');
  updateStat(quizCurrent,correct);
  document.getElementById('quiz-feedback').innerHTML = correct
    ? `<strong>Correct.</strong> ${quizCurrent.char} — ${quizCurrent.romaji}`
    : `<strong>À revoir.</strong> ${quizCurrent.char} — ${quizCurrent.romaji}`;
  speak(quizCurrent.char);
  document.getElementById('next-quiz').textContent='Suivant →';
}
function typingKey(e){
  if(e.key==='Enter') submitTyping();
}
function normalizeInput(s){
  return s.trim().toLowerCase().replace(/\s+/g,'');
}
function submitTyping(){
  if(quizAnswered || !quizCurrent) return;
  const input=document.getElementById('type-input');
  const raw=normalizeInput(input.value);
  if(!raw) return;
  let correct=false;
  if(state.direction==='char-romaji'){
    const accepted=[quizCurrent.romaji,...(quizCurrent.aliases||[])].map(normalizeInput);
    correct=accepted.includes(raw);
  }else{
    correct=input.value.trim()===quizCurrent.char;
  }
  quizAnswered=true;
  input.classList.add(correct?'correct':'wrong');
  updateStat(quizCurrent,correct);
  document.getElementById('quiz-feedback').innerHTML = correct
    ? `<strong>Correct.</strong> ${quizCurrent.char} — ${quizCurrent.romaji}`
    : `<strong>Réponse :</strong> ${quizCurrent.char} — ${quizCurrent.romaji}`;
  speak(quizCurrent.char);
  document.getElementById('next-quiz').textContent='Suivant →';
}
function nextQuiz(){
  quizIndex++;
  showQuiz();
}
function skipQuiz(){
  if(!quizDeck.length || !quizCurrent) return;
  if(quizCurrent && !quizAnswered) updateStat(quizCurrent,false);
  quizIndex++;
  showQuiz();
}
function showQuizDone(){
  quizCurrent=null;quizAnswered=true;
  document.getElementById('next-quiz').disabled=true;
  document.getElementById('quiz-progress').style.width='100%';
  document.getElementById('quiz-question').innerHTML=`
    <div class="empty-state" style="border:0;padding:20px">
      <div class="empty-jp">おつかれさま！</div>
      <div class="empty-romaji">otsukaresama !</div>
      <p>Quiz terminé. Tes erreurs sont déjà ajoutées à « À revoir ».</p>
      <button class="cta-btn" onclick="restartQuiz()">Rejouer</button>
    </div>`;
  document.getElementById('quiz-options').innerHTML='';
  document.getElementById('type-wrap').style.display='none';
  document.getElementById('quiz-feedback').innerHTML='';
}
function skipQuizFromReview(){}

/* =========================================================
   RÉVISION
   ========================================================= */
function renderReview(){
  const root=document.getElementById('review-content');
  const items=scriptItems();
  const mastered=items.filter(x=>masteryState(x)==='mastered').length;
  const weak=weakItems();
  const learning=items.filter(x=>masteryState(x)==='learning').length;

  document.getElementById('metric-mastered').textContent=mastered;
  document.getElementById('metric-learning').textContent=learning;
  document.getElementById('metric-weak').textContent=weak.length;

  if(!weak.length){
    root.innerHTML=`
      <div class="empty-state">
        <div class="empty-jp">いいですね</div>
        <div class="empty-romaji">ii desu ne</div>
        <p>Aucun kana difficile pour l’instant.<br>Fais quelques cartes ou un quiz pour construire ta progression.</p>
        <button class="cta-btn" onclick="setMode('quiz')">Lancer un quiz</button>
      </div>`;
    return;
  }

  const top=weak.slice(0,20);
  root.innerHTML=`
    <div class="weak-list" id="weak-list"></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
      <button class="cta-btn" onclick="startWeakCards()">Réviser en cartes</button>
      <button class="cta-btn" onclick="startWeakQuiz()">Faire un quiz ciblé</button>
    </div>`;
  const list=document.getElementById('weak-list');
  top.forEach(item=>{
    const s=getStat(item);
    const div=document.createElement('div');
    div.className='weak-item';
    div.innerHTML=`
      <div class="weak-char">${item.char}</div>
      <div class="weak-meta">
        <b>${item.romaji}</b>
        <small>${s.correct} juste${s.correct>1?'s':''} · ${s.wrong} erreur${s.wrong>1?'s':''}</small>
      </div>`;
    div.onclick=()=>speak(item.char);
    div.style.cursor='pointer';
    list.appendChild(div);
  });
}
function startWeakCards(){
  const items=weakItems();
  if(!items.length) return;
  setMode('cards');
  flashDeck=shuffle(items);
  flashIndex=0;
  showFlashCard();
}
function startWeakQuiz(){
  const items=weakItems();
  if(!items.length) return;
  setMode('quiz');
  restartQuiz(items);
}

/* =========================================================
   AUDIO
   ========================================================= */
function speak(text){
  if(!('speechSynthesis' in window)) {
    toast('Synthèse vocale non disponible dans ce navigateur.');
    return;
  }
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='ja-JP';
  u.rate=.85;
  u.pitch=1;
  const voices=speechSynthesis.getVoices();
  const jp=voices.filter(v=>v.lang && v.lang.toLowerCase().startsWith('ja'));
  const pref=/(kyoko|mizuki|nanami|sayaka|haruka|hikari|tsukasa|kana|yui|female|woman)/i;
  const voice=jp.find(v=>pref.test(v.name)) || jp[0];
  if(!voice) {toast('Aucune voix japonaise disponible.');return;}
  u.voice=voice;
  u.onerror=e=>{if(!['canceled','interrupted'].includes(e.error)) toast('La lecture audio est indisponible.');};
  speechSynthesis.speak(u);
}
if('speechSynthesis' in window){
  speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged=()=>speechSynthesis.getVoices();
}

/* =========================================================
   PROGRESSION GLOBALE
   ========================================================= */
function refreshMastery(){
  const items=baseItemsForScript();
  const mastered=items.filter(x=>masteryState(x)==='mastered').length;
  document.getElementById('mastery-text').textContent=`${mastered} / ${items.length} acquis`;
  document.getElementById('mastery-fill').style.width=(mastered/items.length*100)+'%';
  if(state.mode==='learn') renderLearn();
  if(state.mode==='review') renderReview();
}

/* =========================================================
   RÉGLAGES / MODALES
   ========================================================= */
let modalOrigin=null;
function openOverlay(id){
  modalOrigin=document.activeElement;
  const overlay=document.getElementById(id);overlay.classList.add('open');
  overlay.querySelector('button').focus();
}
function closeOverlay(id){
  const overlay=document.getElementById(id);
  if(!overlay.classList.contains('open'))return;
  overlay.classList.remove('open');modalOrigin?.focus();
}
function openSettings(){openOverlay('settings-overlay')}
function closeSettings(){closeOverlay('settings-overlay')}
function openInfo(){openOverlay('info-overlay')}
function closeInfo(){closeOverlay('info-overlay')}
function overlayClose(e,id){if(e.target.id===id)closeOverlay(id)}
function applySettingsToUI(){
  document.getElementById('auto-audio').checked=settings.autoAudio;
  document.getElementById('progressive').checked=settings.progressive;
  document.getElementById('progressive-step').value=String(settings.progressiveStep);
  document.getElementById('font-choice').value=settings.font;
  applyFont();
}
function toggleProgressive(){
  settings.progressive=document.getElementById('progressive').checked;
  saveSettings();
  state.set='basic';
  document.getElementById('set-select').value='basic';
  buildRowSelect();
  rebuildCurrentMode();
}
function progressiveStepChanged(){
  settings.progressiveStep=parseInt(document.getElementById('progressive-step').value,10);
  saveSettings();
  if(settings.progressive){
    buildRowSelect();
    rebuildCurrentMode();
  }
}
function changeFont(v){
  settings.font=v;
  try { if (window.parent !== window && window.parent.setKanaFont) window.parent.setKanaFont(v); } catch (_) {}
  saveSettings();
  applyFont();
}
function applyFont(){
  const font=settings.font==='rounded'
    ? "'Hiragino Sans','Hiragino Kaku Gothic ProN','Yu Gothic',Meiryo,sans-serif"
    : "'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif";
  document.documentElement.style.setProperty('--font-jp',font);
}
function resetProgress(){
  if(!confirm('Effacer la progression de l’atelier kana ? Les résultats de l’exercice de phrases seront conservés.')) return;
  state.stats={};
  saveProgress();
  rebuildCurrentMode();
  toast('Progression effacée');
}

/* =========================================================
   DIVERS
   ========================================================= */
function toast(msg){
  const el=document.getElementById('toast');
  el.textContent=msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t=setTimeout(()=>el.classList.remove('show'),1800);
}
function pauseAtelier(){
  if('speechSynthesis' in window) speechSynthesis.cancel();
}
document.addEventListener('keydown',e=>{
  const modal=document.querySelector('.overlay.open');
  if(modal) {
    if(e.key==='Tab') {
      const controls=[...modal.querySelectorAll('button,input,select')].filter(el=>!el.disabled);
      const first=controls[0], last=controls.at(-1);
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    }
    if(e.key==='Escape'){
      closeSettings();closeInfo();
    }
    return;
  }
  if(e.target.closest('input,select,textarea,button,a'))return;
  if(state.mode==='cards'){
    if(e.key===' '){e.preventDefault();flipCard()}
    else if(e.key==='ArrowRight') nextCard();
    else if(e.key==='ArrowLeft') prevCard();
    else if(e.key.toLowerCase()==='v' && flashFlipped) rateCard(true);
    else if(e.key.toLowerCase()==='x' && flashFlipped) rateCard(false);
  }
  if(state.mode==='quiz' && state.quizType==='mcq' && ['1','2','3','4'].includes(e.key)){
    const b=document.querySelectorAll('.quiz-option')[parseInt(e.key)-1];
    if(b && !b.disabled) b.click();
  }
});

/* =========================================================
   INIT
   ========================================================= */
function init(){
  loadState();
  applySettingsToUI();
  buildRowSelect();
  updateSelectionCount();
  renderLearn();
  refreshMastery();
}
init();

// Synchronisation depuis le réglage commun, sans reconstruire les exercices.
window.syncKanaFont = function(value) {
  settings.font = value === 'rounded' ? 'rounded' : 'serif';
  document.getElementById('font-choice').value = settings.font;
  applyFont();
};
try {
  if (window.parent !== window && window.parent.getKanaFont) window.syncKanaFont(window.parent.getKanaFont());
} catch (_) {}
