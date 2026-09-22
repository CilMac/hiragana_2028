/* Préférence commune ; conserve les réglages existants de l’atelier. */
(() => {
  const key = 'kana-trainer-settings-v1';
  let value = 'serif';
  try { if (JSON.parse(localStorage.getItem(key) || '{}').font === 'rounded') value = 'rounded'; } catch (_) {}
  const select = document.getElementById('shared-font-choice');
  const frame = document.getElementById('atelier-frame');
  const dialog = document.getElementById('font-settings-dialog');
  function apply() {
    document.documentElement.style.setProperty('--font-jp', value === 'rounded'
      ? "'Hiragino Sans','Hiragino Kaku Gothic ProN','Yu Gothic',Meiryo,sans-serif"
      : "'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif");
    select.value = value;
    try { frame.contentWindow?.syncKanaFont?.(value); } catch (_) {}
  }
  window.getKanaFont = () => value;
  window.setKanaFont = next => {
    value = next === 'rounded' ? 'rounded' : 'serif';
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '{}');
      localStorage.setItem(key, JSON.stringify({...saved, font:value}));
    } catch (_) {}
    apply();
  };
  document.getElementById('font-settings-open').onclick = () => dialog.showModal();
  document.getElementById('font-settings-close').onclick = () => dialog.close();
  select.onchange = () => window.setKanaFont(select.value);
  window.addEventListener('storage', event => {
    if (event.key !== key) return;
    try { value = JSON.parse(event.newValue || '{}').font === 'rounded' ? 'rounded' : 'serif'; apply(); } catch (_) {}
  });
  apply();
})();
