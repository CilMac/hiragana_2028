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
  let documentSession = 0;
  let pdfDocument;
  let pageObserver;
  const pdfJsUrl = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/legacy/build/pdf.min.mjs';
  const pdfWorkerUrl = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/legacy/build/pdf.worker.min.mjs';
  let pdfJsPromise;
  function loadPdfJs() {
    pdfJsPromise ||= import(pdfJsUrl).then(pdfjs => {
      pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
      return pdfjs;
    });
    return pdfJsPromise;
  }
  async function renderPdf(source, title, session) {
    documentContent.innerHTML = '<p class="document-loading">Chargement du document…</p>';
    try {
      const pdfjs = await loadPdfJs();
      if (session !== documentSession) return;
      pdfDocument = await pdfjs.getDocument(source).promise;
      if (session !== documentSession) return;
      const pages = document.createElement('div');
      pages.className = 'pdf-pages';
      const placeholders = [];
      for (let number = 1; number <= pdfDocument.numPages; number++) {
        const figure = document.createElement('figure');
        figure.className = 'pdf-page';
        figure.dataset.page = number;
        figure.innerHTML = `<div class="pdf-page-placeholder">Page ${number}</div><figcaption>Page ${number} / ${pdfDocument.numPages}</figcaption>`;
        pages.append(figure);
        placeholders.push(figure);
      }
      documentContent.replaceChildren(pages);
      async function draw(figure) {
        if (figure.dataset.rendered || session !== documentSession) return;
        figure.dataset.rendered = 'true';
        const page = await pdfDocument.getPage(Number(figure.dataset.page));
        if (session !== documentSession) return;
        const natural = page.getViewport({scale:1});
        const width = Math.max(280, Math.min(pages.clientWidth - 16, 1000));
        const viewport = page.getViewport({scale:width / natural.width});
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        const context = canvas.getContext('2d');
        figure.querySelector('.pdf-page-placeholder').replaceWith(canvas);
        await page.render({canvasContext:context, viewport, transform:pixelRatio === 1 ? null : [pixelRatio,0,0,pixelRatio,0,0]}).promise;
      }
      pageObserver = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          pageObserver.unobserve(entry.target);
          draw(entry.target);
        }
      }, {root:documentContent, rootMargin:'700px 0px'});
      placeholders.forEach(page => pageObserver.observe(page));
    } catch (_) {
      if (session === documentSession) documentContent.innerHTML = `<div class="document-error"><p>Impossible de charger « ${title} ».</p><p>Vérifiez la connexion Internet puis réessayez.</p></div>`;
    }
  }
  for (const button of resources.querySelectorAll('[data-document]')) {
    button.onclick = () => {
      documentTrigger = button;
      const title = button.textContent;
      const source = button.dataset.document;
      document.getElementById('document-title').textContent = title;
      const session = ++documentSession;
      if (source.endsWith('.pdf')) renderPdf(source, title, session);
      else {
        const preview = document.createElement('img');
        preview.alt = title;
        preview.src = source;
        documentContent.replaceChildren(preview);
      }
      resources.close();
      documentDialog.showModal();
      documentContent.scrollTop = 0;
    };
  }
  document.getElementById('document-close').onclick = () => documentDialog.close();
  documentDialog.addEventListener('close', () => {
    documentSession++;
    pageObserver?.disconnect();
    pageObserver = null;
    pdfDocument?.destroy();
    pdfDocument = null;
    documentContent.replaceChildren();
    resources.showModal();
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
