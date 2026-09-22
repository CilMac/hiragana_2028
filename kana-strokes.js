/* Dessins locaux KanjiVG, © Ulrich Apel, CC BY-SA 3.0. */
(() => {
  let dialog, drawings, title, previousFocus;
  function createDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'stroke-dialog';
    dialog.setAttribute('aria-labelledby', 'stroke-title');
    dialog.innerHTML = `<div class="stroke-heading"><h2 id="stroke-title"></h2><button type="button" class="stroke-close">Fermer</button></div>
      <p>Suivez les numéros pour tracer les traits dans l’ordre.</p>
      <div class="stroke-drawings"></div>
      <p class="stroke-credit">Dessins : <a href="https://kanjivg.tagaini.net/" target="_blank" rel="noopener">KanjiVG</a> · Ulrich Apel · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a></p>`;
    document.body.append(dialog);
    title = dialog.querySelector('h2');
    drawings = dialog.querySelector('.stroke-drawings');
    dialog.querySelector('button').onclick = () => dialog.close();
    dialog.addEventListener('close', () => previousFocus?.focus());
    // Escape closes this dialog only, preserving the table underneath.
    dialog.addEventListener('keydown', event => { if (event.key === 'Escape') event.stopPropagation(); });
  }
  window.KanaStrokes = {
    open(kana, reading) {
      if (!dialog) createDialog();
      previousFocus = document.activeElement;
      title.textContent = `${kana} · ${reading} — Ordre des traits`;
      drawings.replaceChildren();
      for (const char of Array.from(kana.normalize('NFC'))) {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = `kana-traits/${char.codePointAt(0).toString(16).padStart(5,'0')}.svg`;
        img.alt = `Ordre des traits numérotés du kana ${char}`;
        img.width = 300; img.height = 300;
        const caption = document.createElement('figcaption');
        caption.textContent = char; caption.lang = 'ja';
        img.onerror = () => { img.hidden = true; caption.textContent = `${char} — dessin indisponible`; };
        figure.append(img,caption); drawings.append(figure);
      }
      dialog.showModal();
    }
  };
})();
