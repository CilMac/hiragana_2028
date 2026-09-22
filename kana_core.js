/* Moteur indépendant du DOM : une identité par occurrence, jamais par valeur. */
(function (root) {
  'use strict';
  class Exercise {
    constructor(jp, random = Math.random) {
      this.target = Array.from(jp.normalize('NFC'));
      this.tokens = this.target.map((char, id) => ({ id, char }));
      this.order = this.tokens.map(t => t.id);
      for (let i = this.order.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
      }
      this.slots = this.target.map(() => null);
      this.marks = this.target.map(() => '');
      this.history = [];
      this.locked = new Set();
    }
    charAt(i) { return this.slots[i] === null ? '' : this.tokens[this.slots[i]].char; }
    place(id) {
      const i = this.slots.indexOf(null);
      if (i < 0 || !this.tokens[id] || this.slots.includes(id)) return false;
      this.slots[i] = id; this.marks[i] = ''; this.history.push(id); return true;
    }
    remove(i) {
      const id = this.slots[i];
      if (id === null || id === undefined || this.locked.has(i)) return false;
      this.slots[i] = null; this.marks[i] = '';
      this.history = this.history.filter(x => x !== id); return true;
    }
    undo() { const id = [...this.history].reverse().find(id => !this.locked.has(this.slots.indexOf(id))); if (id !== undefined) this.remove(this.slots.indexOf(id)); }
    reset() { this.locked.clear(); this.slots.fill(null); this.marks.fill(''); this.history = []; }
    check() {
      this.marks = this.target.map((c, i) => this.charAt(i) === c ? 'correct' : 'incorrect');
      this.marks.forEach((m,i) => { if (m === 'correct') this.locked.add(i); });
      return this.marks.every(m => m === 'correct');
    }
    clearErrors() { this.marks.forEach((m, i) => { if (m === 'incorrect') this.remove(i); }); }
    hint() {
      const i = this.target.findIndex((c, p) => c !== this.charAt(p));
      if (i < 0) return false;
      // Prefer an unused occurrence; otherwise move one from an incorrect position.
      let token = this.tokens.find(t => t.char === this.target[i] && !this.slots.includes(t.id));
      if (!token) token = this.tokens.find(t => t.char === this.target[i] && this.target[this.slots.indexOf(t.id)] !== t.char);
      const from = this.slots.indexOf(token.id);
      if (from >= 0) this.remove(from);
      this.remove(i);
      this.slots[i] = token.id; this.history.push(token.id); this.marks[i] = 'correct';
      return true;
    }
    get complete() { return this.slots.every(x => x !== null); }
  }
  const defaults = () => ({ hints: 0, solutions: 0, errors: 0, successes: 0, manual: false, difficulty: 0 });
  const needsReview = s => Boolean(s && (s.manual || s.difficulty >= 2));
  function readProgress(storage) {
    const result = { version: 2, entries: {} };
    try {
      const saved = JSON.parse(storage.getItem('kana-v2-progress') || '{}');
      if (saved.version !== 2 || !saved.entries || typeof saved.entries !== 'object') return result;
      for (const [id, raw] of Object.entries(saved.entries)) {
        if (!/^[hk]-[a-z0-9-]+$/.test(id) || !raw || typeof raw !== 'object') continue;
        const s = defaults();
        for (const key of ['hints', 'solutions', 'errors', 'successes', 'difficulty'])
          s[key] = Number.isSafeInteger(raw[key]) && raw[key] >= 0 ? raw[key] : 0;
        s.manual = raw.manual === true; result.entries[id] = s;
      }
    } catch (_) { /* Storage disabled or malformed: continue in memory. */ }
    return result;
  }
  const api = { Exercise, defaults, needsReview, readProgress };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.KanaCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
