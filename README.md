# Hiragana 2028

Application Web d’apprentissage des hiragana et katakana.

L’écran principal permet de reconstruire des phrases japonaises à partir de kana mélangés. L’atelier complémentaire propose une table interactive, des cartes, des quiz, l’audio, l’ordre des traits et des révisions ciblées.

Le site fonctionne directement dans le navigateur, sans compte ni serveur applicatif. La progression reste enregistrée localement dans le navigateur.

## Développement local

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Ouvrir ensuite <http://localhost:8765/>.

## Vérification

```sh
python3 donnees/construire.py
node --test tests/*.test.cjs
node tests/linguistique.cjs
```

Les dessins d’ordre des traits placés dans `kana-traits/` proviennent de KanjiVG, par Ulrich Apel et les contributeurs, sous licence CC BY-SA 3.0. Voir `kana-traits/COPYING`.

— CilMac, 21 sept. 2026 - légèrement assisté par ChatGPT-6 Astra 😁
