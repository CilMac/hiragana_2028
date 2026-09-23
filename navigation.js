/* Deux écrans persistants : changer d’onglet ne reconstruit aucun exercice. */
(() => {
  const phrases = document.getElementById('phrases-screen');
  const atelier = document.getElementById('atelier-screen');
  const frame = document.getElementById('atelier-frame');
  const phrasesButton = document.getElementById('screen-phrases');
  const atelierButton = document.getElementById('screen-atelier');
  const header = document.getElementById('site-header');
  const info = document.getElementById('site-info-dialog');
  const infoButton = document.getElementById('site-info-open');
  infoButton.onclick = () => { info.showModal(); info.scrollTop = 0; };
  document.getElementById('site-info-close').onclick = () => info.close();
  info.addEventListener('close', () => infoButton.focus());
  const resources = document.getElementById('resources-dialog');
  const resourcesButton = document.getElementById('resources-open');
  resourcesButton.onclick = () => resources.showModal();
  document.getElementById('resources-close').onclick = () => resources.close();
  resources.addEventListener('close', () => resourcesButton.focus());
  const documentDialog = document.getElementById('document-dialog');
  const documentContent = document.getElementById('document-content');
  let documentTrigger;
  for (const button of resources.querySelectorAll('[data-document]')) {
    button.onclick = () => {
      documentTrigger = button;
      const title = button.textContent;
      const source = button.dataset.document;
      document.getElementById('document-title').textContent = title;
      const preview = document.createElement(source.endsWith('.pdf') ? 'iframe' : 'img');
      if (preview.tagName === 'IFRAME') preview.title = title;
      else preview.alt = title;
      preview.src = source;
      documentContent.replaceChildren(preview);
      documentDialog.showModal();
      documentContent.scrollTop = 0;
    };
  }
  document.getElementById('document-close').onclick = () => documentDialog.close();
  documentDialog.addEventListener('close', () => {
    documentContent.replaceChildren();
    documentTrigger?.focus();
  });
  let loaded = false;
  let phrasesScroll = 0;
  function resize() {
    document.documentElement.style.setProperty('--shell-height', `${header.getBoundingClientRect().height}px`);
  }
  function showAtelier(show) {
    if (show === !atelier.hidden) return;
    if (show) phrasesScroll = window.scrollY;
    document.dispatchEvent(new Event('kana-screen-change'));
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    // Same-origin frame; also works without this optional bridge on file: URLs.
    try { frame.contentWindow?.pauseAtelier?.(); } catch (_) {}
    phrases.hidden = show;
    atelier.hidden = !show;
    document.body.classList.toggle('atelier-active', show);
    phrasesButton.setAttribute('aria-pressed', String(!show));
    atelierButton.setAttribute('aria-pressed', String(show));
    if (show && !loaded) { frame.src = frame.dataset.src; loaded = true; }
    resize();
    window.scrollTo({top: show ? 0 : phrasesScroll, behavior:'instant'});
  }
  phrasesButton.onclick = () => showAtelier(false);
  atelierButton.onclick = () => showAtelier(true);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(header);
  window.addEventListener('resize',resize);
  resize();
})();
