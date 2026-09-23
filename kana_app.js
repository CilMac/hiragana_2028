/* Interface statique, utilisable aussi en ouvrant index.html directement. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const { Exercise, defaults, needsReview, readProgress } = KanaCore;
  let storage;
  try { storage = window.localStorage; } catch (_) { $('storage-warning').hidden = false; }
  const progress = readProgress(storage);
  let mode = 'hiragana', current = null, exercise = null, filtered = [];
  let assisted = false, successCounted = false, lastChecked = null;
  let validated = false;
  let session = { started:Date.now(), entries:{} };
  const sessionEntry = () => session.entries[current.id] ||= { hints:0, solutions:0, successes:0, unaided:0, errors:0 };
  let verifiedPositions = new Set();
  let victoryAudio;
  function playVictory() {
    try {
      victoryAudio ||= new Audio('success-soft.wav');
      victoryAudio.currentTime = 0;
      const playback = victoryAudio.play();
      if (playback) playback.catch(() => {});
    } catch (_) { /* A blocked sound must not interrupt the exercise. */ }
  }
  document.addEventListener('kana-screen-change', () => {
    if (victoryAudio) victoryAudio.pause();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  });
  const bank = () => mode === 'hiragana' ? window.HIRAGANA : window.KATAKANA;
  const stat = () => progress.entries[current.id] ||= defaults();
  function save() {
    try { storage.setItem('kana-v2-progress', JSON.stringify(progress)); }
    catch (_) { $('storage-warning').hidden = false; }
  }
  function message(text) { $('feedback').textContent = text; }
  let romajiVisible = false;
  let romajiAlways = false;
  function syncRomajiChoice() {
    const choice = $('romaji-choice');
    if (choice) choice.value = romajiAlways ? 'always' : (romajiVisible ? 'current' : 'hidden');
  }
  try { romajiAlways = storage.getItem('kana-v2-romaji-always') === 'true'; } catch (_) {}
  $('romaji-always').checked = romajiAlways;
  function rememberRomaji(always) {
    romajiAlways = always;
    $('romaji-always').checked = always;
    syncRomajiChoice();
    try { storage.setItem('kana-v2-romaji-always', String(always)); }
    catch (_) { $('storage-warning').hidden = false; }
  }
  function setRomajiVisible(visible) {
    romajiVisible = visible;
    $('romaji').textContent = visible && current ? current.romaji : '● ● ● ● ● ●';
    $('romaji').setAttribute('data-blurred', String(!visible));
    $('romaji').setAttribute('aria-label', visible ? `Rōmaji : ${current?.romaji || ''}` : 'Afficher le rōmaji');
    $('romaji').title = visible ? 'Rōmaji affiché' : 'Cliquer pour afficher le rōmaji';
    $('romaji-toggle').setAttribute('aria-checked', String(visible));
    $('romaji-toggle').setAttribute('aria-label', visible ? 'Masquer le rōmaji' : 'Afficher le rōmaji');
    $('romaji-toggle-state').textContent = visible ? 'On' : 'Off';
    syncRomajiChoice();
  }
  $('romaji-toggle').onclick = () => {
    if (romajiVisible && romajiAlways) rememberRomaji(false);
    setRomajiVisible(!romajiVisible);
  };
  $('romaji-always').onchange = () => {
    rememberRomaji($('romaji-always').checked);
    if (romajiAlways) setRomajiVisible(true);
  };
  $('romaji-choice').onchange = () => {
    const value = $('romaji-choice').value;
    rememberRomaji(value === 'always');
    setRomajiVisible(value !== 'hidden');
  };
  $('romaji').onclick = () => {
    if (!romajiVisible) setRomajiVisible(true);
  };
  function hideSolution() {
    $('answer').hidden = true; $('answer').textContent = '';
    $('solution').setAttribute('aria-expanded', 'false');
    $('solution').setAttribute('aria-label', 'Afficher la solution');
  }
  function refreshFilters() {
    filtered = bank().filter(p => (!$('theme').value || p.theme === $('theme').value)
      && (!$('level').value || p.level === Number($('level').value))
      && (!$('review-only').checked || needsReview(progress.entries[p.id])));
  }
  function load(entry) {
    validated = false;
    $('written-answer').hidden = true; $('written-answer').textContent = '';
    if (victoryAudio) victoryAudio.pause();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    current = entry || null;
    $('exercise').hidden = !current; $('empty').hidden = !!current; $('mark').disabled = !current;
    hideSolution(); message(''); setRomajiVisible(romajiAlways);
    if (current) {
      sessionEntry();
      verifiedPositions.clear();
      exercise = new Exercise(current.jp); assisted = false; successCounted = false; lastChecked = null;
      $('translation').textContent = current.fr;
      renderTiles();
    } else exercise = null;
    renderStats();
  }
  function applyFilters() { refreshFilters(); load(filtered[0]); }
  function themes() {
    $('theme').replaceChildren(new Option('Tous les thèmes', ''));
    $('theme').value = '';
    [...new Set(bank().map(p => p.theme))].sort((a,b) => a.localeCompare(b,'fr')).forEach(t => {
      $('theme').add(new Option(t.charAt(0).toUpperCase()+t.slice(1), t));
    });
  }
  function changeMode(next) {
    if (mode === next) { $('script-choice').value = mode; return; }
    mode = next;
    $('script-choice').value = mode;
    $('hiragana').setAttribute('aria-pressed', String(mode === 'hiragana'));
    $('katakana').setAttribute('aria-pressed', String(mode === 'katakana'));
    $('level').value = ''; $('review-only').checked = false; $('review-choice').value = 'all';
    themes(); applyFilters();
  }
  function edit(action) {
    validated = false;
    $('written-answer').hidden = true;
    action(); verifiedPositions = new Set([...verifiedPositions].filter(i => exercise.marks[i] === 'correct')); lastChecked = null; hideSolution(); message(''); renderTiles();
  }
  function renderTiles() {
    $('slots').replaceChildren(); $('pool').replaceChildren();
    exercise.slots.forEach((id, i) => {
      const b = document.createElement('button'), char = exercise.charAt(i), mark = exercise.marks[i];
      b.className = 'tile slot ' + mark; b.textContent = char; b.lang = 'ja';
      if (mark === 'correct' && verifiedPositions.has(i)) {
        const label = document.createElement('span');
        label.className = 'slot-reading'; label.lang = 'fr';
        label.textContent = slotReading(char, i);
        b.append(label);
      }
      b.disabled = exercise.locked.has(i);
      const status = mark === 'correct' ? ', correct' : mark === 'incorrect' ? ', à corriger' : '';
      b.setAttribute('aria-label', `Case ${i+1}${char ? ', '+char+(b.disabled ? ', verrouillée' : ', retirer') : ', vide'}${status}`);
      b.onclick = () => { if (b.disabled) return; edit(() => exercise.remove(i)); $('slots').children[i].focus(); };
      $('slots').append(b);
    });
    for (const id of exercise.order) {
      const t = exercise.tokens[id], b = document.createElement('button');
      b.className = 'tile'; b.textContent = t.char; b.lang = 'ja'; b.dataset.tokenId = id;
      b.setAttribute('aria-label', `${t.char}, tuile ${id+1}`);
      b.disabled = exercise.slots.includes(id);
      b.onclick = () => {
        edit(() => exercise.place(id));
        const available = $('pool').querySelector('button:not(:disabled)');
        (available || $('check')).focus();
      };
      $('pool').append(b);
    }
    const any = exercise.slots.some(x => x !== null);
    $('check').disabled = !any || validated; $('reset').disabled = !any; $('undo').disabled = !exercise.slots.some((id,i) => id !== null && !exercise.locked.has(i));
    $('hint').disabled = exercise.target.every((c,i) => exercise.charAt(i) === c);
    $('clear-errors').hidden = !exercise.marks.includes('incorrect');
  }
  function renderStats() {
    const all = Object.values(session.entries), sum = key => all.reduce((n,s) => n+s[key],0);
    const local = current ? sessionEntry() : defaults();
    const successes = sum('successes');
    const penalties = sum('errors') + sum('hints') + sum('solutions');
    const total = successes + penalties;
    // Arrondir vers le bas : une aide ne peut jamais être masquée par un arrondi à 100 %.
    $('session-score').textContent = total ? `${Math.floor(100 * successes / total)} %` : '—';
    $('session-score-detail').textContent = total
      ? `${successes} réussite(s) · ${sum('errors')} erreur(s) · ${sum('hints')} indice(s) · ${sum('solutions')} solution(s)`
      : 'Commencez un exercice pour obtenir votre score.';
    const pos = current ? filtered.findIndex(p => p.id === current.id)+1 : 0;
    $('counter').textContent = `${mode === 'hiragana' ? 'Phrase' : 'Mot'} ${pos} / ${filtered.length}`
      + (filtered.length !== bank().length ? ` · ${bank().length} au total` : '');
    $('stats').replaceChildren();
    const timing=document.createElement('p'); timing.className='stats-timing';
    timing.textContent=`Depuis ${new Date(session.started).toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'})} · ${Math.floor((Date.now()-session.started)/60000)} min, pauses comprises`;
    $('stats').append(timing);
    function group(title, tone, rows) {
      const section=document.createElement('section'); section.className='stats-group '+tone;
      const heading=document.createElement('h3');heading.textContent=title;section.append(heading);
      for(const [label,value] of rows) {
        const row=document.createElement('p');row.className='stats-row';
        const name=document.createElement('span');name.textContent=label;
        const number=document.createElement('strong');number.textContent=String(value);
        row.append(name,number);section.append(row);
      }
      $('stats').append(section);
    }
    group('Bilan de la session','stats-results',[
      ['Exercices visités',all.length],['Exercices réussis distincts',all.filter(s=>s.successes>0).length],
      ['Réussites',sum('successes')],['Dont sans indice ni solution',sum('unaided')],
      ['Vérifications incorrectes',sum('errors')]
    ]);
    group('Aides et difficultés','stats-help',[
      ['Indices utilisés pendant la session',sum('hints')],['Solutions consultées',sum('solutions')],
      ['Exercices avec erreurs ou aides',all.filter(s=>s.errors||s.hints||s.solutions).length]
    ]);
    group('Phrase en cours','stats-current',[
      ['Réussites',local.successes],['Vérifications incorrectes',local.errors],
      ['Indices utilisés sur cette phrase',local.hints],['Solutions consultées',local.solutions]
    ]);
    const manual = current ? stat().manual : false;
    $('mark').setAttribute('aria-pressed', String(manual));
    $('mark').textContent = manual ? '★' : '☆';
    $('mark').setAttribute('aria-label', manual ? 'Retirer cette phrase des révisions' : 'Marquer cette phrase à revoir');
    $('mark').title = manual ? 'Retirer des révisions' : 'Marquer à revoir';
  }
  $('stats-open').onclick = () => { renderStats(); $('stats-dialog').showModal(); };
  $('stats-close').onclick = () => $('stats-dialog').close();
  $('stats-dialog').addEventListener('close', () => $('stats-open').focus());
  $('stats-reset').onclick = () => {
    session = { started:Date.now(), entries:{} };
    renderStats();
    $('stats-reset-status').textContent = 'Les statistiques de session ont été remises à zéro.';
  };
  $('check').onclick = () => {
    if (!exercise || $('check').disabled) return;
    const signature = JSON.stringify(exercise.slots), correct = exercise.check();
    verifiedPositions = new Set(exercise.marks.flatMap((mark,i)=>mark === 'correct' ? [i] : []));
    validated = correct;
    $('written-answer').textContent = correct ? (current.written || current.jp) : '';
    $('written-answer').hidden = !correct;
    if (correct) setRomajiVisible(true);
    if (correct) playVictory();
    if (signature !== lastChecked) {
      if (correct) { sessionEntry().successes++; if (!assisted) sessionEntry().unaided++; }
      else sessionEntry().errors++;
      if (correct && !successCounted) {
        stat().successes++; successCounted = true;
        if (!assisted) stat().difficulty = Math.max(0,stat().difficulty-2);
      } else if (!correct) { stat().errors++; stat().difficulty++; }
      lastChecked = signature; save();
    }
    message(correct ? (assisted ? 'Bien joué !' : 'Bravo, sans aide !') : 'Quelques cases à corriger.');
    if (correct) speak(current.jp, text => {
      if (text) message('Bien joué ! ' + text);
    });
    renderTiles(); renderStats();
  };
  $('reset').onclick = () => edit(() => exercise.reset());
  $('undo').onclick = () => { if (!$('undo').disabled) edit(() => exercise.undo()); };
  $('clear-errors').onclick = () => edit(() => exercise.clearErrors());
  $('hint').onclick = () => {
    if (!exercise.hint()) return;
    assisted = true; stat().hints++; sessionEntry().hints++; stat().difficulty++; lastChecked = null;
    hideSolution(); message('Un kana bien placé.'); save(); renderTiles(); renderStats();
  };
  $('solution').onclick = () => {
    if (!$('answer').hidden) { hideSolution(); return; }
    assisted = true; stat().solutions++; sessionEntry().solutions++; stat().difficulty += 2;
    $('answer').textContent = window.KanaSolution ? window.KanaSolution.format(current.jp,current.romaji).replace(/ /g, "\u3000") : current.jp; $('answer').hidden = false;
    $('solution').setAttribute('aria-expanded','true'); $('solution').setAttribute('aria-label','Masquer la solution');
    save(); renderStats();
  };
  function navigate(direction) {
    const old = current?.id;
    refreshFilters();
    if (!filtered.length) { load(null); return; }
    const index = filtered.findIndex(p => p.id === old);
    let next;
    if (direction === 'random') {
      const choices = filtered.filter(p => p.id !== old);
      next = choices.length ? choices[Math.floor(Math.random()*choices.length)] : filtered[0];
    } else next = filtered[index < 0 ? 0 : (index+direction+filtered.length)%filtered.length];
    load(next);
  }
  $('previous').onclick = () => navigate(-1); $('next').onclick = () => navigate(1);
  $('random').onclick = () => navigate('random');
  $('hiragana').onclick = () => changeMode('hiragana'); $('katakana').onclick = () => changeMode('katakana');
  $('script-choice').onchange = () => changeMode($('script-choice').value);
  $('review-choice').onchange = () => {
    if ($('review-choice').value === 'reset') {
      $('review-choice').value = $('review-only').checked ? 'review' : 'all';
      $('review-reset-count').textContent = String(Object.values(progress.entries).filter(needsReview).length);
      $('review-reset-dialog').showModal();
      return;
    }
    $('review-only').checked = $('review-choice').value === 'review';
    applyFilters();
  };
  $('review-reset-cancel').onclick = () => $('review-reset-dialog').close();
  $('review-reset-confirm').onclick = () => {
    for (const entry of Object.values(progress.entries)) {
      entry.manual = false;
      entry.difficulty = 0;
    }
    save();
    $('review-only').checked = false;
    $('review-choice').value = 'all';
    $('review-reset-dialog').close();
    applyFilters();
    message('La liste « À revoir » a été remise à zéro.');
  };
  $('review-reset-dialog').addEventListener('close', () => $('review-choice').focus());
  for (const id of ['theme','level','review-only']) $(id).onchange = applyFilters;
  $('mark').onclick = () => { stat().manual = !stat().manual; save(); renderStats(); };
  function speak(text, report) {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      report('Audio indisponible dans ce navigateur.'); return;
    }
    const synth = window.speechSynthesis;
    const japaneseVoices = synth.getVoices().filter(v => /^ja(?:-|_|$)/i.test(v.lang));
    // Preserve the original site's default voice preference, regardless of list order.
    const originalVoiceNames = /(kyoko|mizuki|nanami|sayaka|haruka|hikari|tsukasa|kana|yui|female|woman)/i;
    const voice = japaneseVoices.find(v => originalVoiceNames.test(v.name)) || japaneseVoices[0];
    if (!voice) { report('Aucune voix japonaise disponible. Vous pouvez continuer l’exercice.'); return; }
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; utterance.voice = voice; utterance.rate = .85;
    utterance.onerror = e => { if (!['canceled','interrupted'].includes(e.error)) report('La lecture audio est indisponible.'); };
    report(''); synth.speak(utterance);
  }
  $('audio').onclick = () => speak(current.jp, message);
  const basic = [
    ['あ','a'],['い','i'],['う','u'],['え','e'],['お','o'],
    ['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko'],
    ['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so'],
    ['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to'],
    ['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no'],
    ['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho'],
    ['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo'],
    ['や','ya'],null,['ゆ','yu'],null,['よ','yo'],
    ['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro'],
    ['わ','wa'],null,null,null,['を','o'],['ん','n']
  ];
  const voiced = [
    ['が','ga'],['ぎ','gi'],['ぐ','gu'],['げ','ge'],['ご','go'],
    ['ざ','za'],['じ','ji'],['ず','zu'],['ぜ','ze'],['ぞ','zo'],
    ['だ','da'],['ぢ','ji'],['づ','zu'],['で','de'],['ど','do'],
    ['ば','ba'],['び','bi'],['ぶ','bu'],['べ','be'],['ぼ','bo'],
    ['ぱ','pa'],['ぴ','pi'],['ぷ','pu'],['ぺ','pe'],['ぽ','po']
  ];
  function slotReading(char, index) {
    const h = char >= 'ァ' && char <= 'ヶ' ? String.fromCharCode(char.charCodeAt(0)-0x60) : char;
    // Les particules suivent la prononciation du rōmaji de la phrase.
    if (window.KanaSolution) {
      const words = window.KanaSolution.format(current.jp,current.romaji).split(' ');
      const readings = current.romaji.toLowerCase().split(/\s+/);
      let start = 0;
      for (let w=0;w<words.length;w++) {
        if(start===index && words[w].length===1 && ['は','へ','を'].includes(h)) return readings[w];
        start += words[w].length;
      }
    }
    const small = {'ゃ':'ya','ゅ':'yu','ょ':'yo','っ':'pause','ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o','ゔ':'vu','ー':'long'};
    return small[h] || [...basic,...voiced].find(item=>item && item[0]===h)?.[1] || '';
  }
  function openTable() {
    $('table-title').textContent = mode === 'hiragana' ? 'Table des hiragana' : 'Table des katakana';
    $('kana-table').replaceChildren(); $('table-audio-status').textContent = '';
    const small = [['ゃ','ya petit'],['ゅ','yu petit'],['ょ','yo petit'],['っ','pause'],['ぁ','a petit'],['ぃ','i petit'],['ぅ','u petit'],['ぇ','e petit'],['ぉ','o petit']];
    const groups = [['Kana de base',basic],['Dakuten et handakuten',voiced],['Petits kana',small]];
    if (mode === 'katakana') groups.push(['Voyelle prolongée',[['ー','prolongation']]]);
    for (const [title, entries] of groups) {
      const heading = document.createElement('h3'); heading.textContent=title;
      const grid = document.createElement('div');grid.className='kana-grid';
      for (const entry of entries) {
        if (!entry) { const blank=document.createElement('span');blank.className='blank';grid.append(blank);continue; }
        const [h,reading] = entry;
        const char = mode === 'katakana' && h !== 'ー' ? String.fromCharCode(h.charCodeAt(0)+0x60) : h;
        const b=document.createElement('button'), kana=document.createElement('span'), romaji=document.createElement('small');
        kana.textContent=char;kana.lang='ja';romaji.textContent='·';b.setAttribute('aria-label',`${char}, révéler la lecture`);
        b.append(kana,romaji); b.onclick=()=>{
          romaji.textContent=reading;b.setAttribute('aria-label',`${char}, ${reading}`);
          window.KanaStrokes?.open(char,reading);
          if (!['っ','ー'].includes(h)) speak(char,t=>$('table-audio-status').textContent=t);
          else $('table-audio-status').textContent = h === 'っ' ? 'Le petit っ marque une pause avant la consonne suivante.' : 'ー prolonge la voyelle précédente.';
        };grid.append(b);
      }
      $('kana-table').append(heading,grid);
    }
    $('kana-dialog').showModal();
  }
  $('table-open').onclick=openTable;
  $('table-close').onclick=()=> $('kana-dialog').close();
  $('kana-dialog').addEventListener('close',()=>{
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    $('table-open').focus();
  });
  themes(); applyFilters();
})();
