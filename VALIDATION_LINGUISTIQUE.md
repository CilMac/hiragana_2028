# Validation linguistique — 20 septembre 2026

La banque livrée contient 374 phrases/formules hiragana et 115 mots ou expressions katakana. Les niveaux sont pédagogiques et ne constituent pas une certification JLPT.

## Méthode effectivement appliquée

1. Lecture des 97 entrées d’origine, avec comparaison kana / rōmaji / traduction.
2. Conservation de 91 entrées, parfois corrigées ; exclusion de six entrées de la nouvelle banque. Le JSON original reste intact.
3. Rédaction de 283 entrées nouvelles, réparties en 22 thèmes, avec fonctions de communication variées.
4. Deuxième lecture de la banque finale, regroupée par thème, pour vérifier le sens français et le naturel des formulations, les niveaux, les registres et les contextes.
5. Contrôle automatique des 489 correspondances kana / rōmaji : aucune discordance signalée. Ce contrôle accepte は = ha/wa et へ = he/e ; leur rôle grammatical est donc vérifié par la relecture, pas prouvé par l’automate.
6. Vérification technique de l’absence de kanji, de caractères katakana en mode hiragana, de caractères combinants non normalisés, de doublons et d’identifiants dupliqués.

Cette relecture est celle de l’assistant ; aucune validation indépendante par un enseignant ou locuteur natif n’est revendiquée. La vérification automatique ne certifie ni la grammaire ni le naturel d’une phrase.

## Corrections et décisions

- Ancienne entrée 10 : `でんしや` corrigé en `でんしゃ`, avec un petit ゃ.
- Ancienne entrée 14 : `Gomen nasai` corrigé en `Gomennasai`, en accord avec ごめんなさい.
- Ancienne entrée 11 : `juuniji`, « douze heures », au lieu d’imposer « midi » alors que le japonais ne le précise pas.
- Ancienne entrée 15 : いただきます expliqué comme une formule de reconnaissance avant de manger, et non comme une invitation française « bon appétit » adressée aux autres.
- Ancienne entrée 52 : おなまえは développé en おなまえはなんですか, pour un exemple complet.
- Ancienne entrée 70 : exemple en écriture mixte remplacé par でんしけっさいはできますか, « Peut-on payer par voie électronique ? ».
- Ancienne entrée 71 : mot étranger transcrit en hiragana dans かあどはつかえますか. L’écriture usuelle クレジットカード figure dans le mode katakana.
- Noms étrangers de la banque hiragana transcrits en hiragana : ふらんす, ぱり ; indication pédagogique dans l’aide.
- Anciennes entrées 33 et 50 avec `~` exclues de l’exercice : pas de caractère fictif à reconstruire.
- Anciennes entrées 75, 78, 79, 80 écartées : impératif abrupt, demande d’hébergement maladroite, ambiguïté autour de la carte d’assurance et demande de prêt d’argent peu adaptée. Les originaux sont conservés.
- Plusieurs anciennes phrases longues ou constructions plus avancées reclassées au niveau 3 ; la longueur seule ne détermine pas toute la difficulté.
- Les formules familières nouvellement ajoutées sont signalées : またね, ありがとう, いろいろおしえてくれてありがとう.
- これはむすめです et これはむすこです sont explicitement situés dans le contexte d’une photo, pour éviter de désigner ainsi une personne présente.
- ごちそうさま est la formule courte conservée de l’ancien site ; la forme plus polie est ごちそうさまでした.

## Points particuliers contrôlés

| Point | Exemples livrés / testés | Convention |
|---|---|---|
| は particule | これはねこです → Kore wa neko desu | wa |
| は dans un mot | はじめまして → Hajimemashite | ha |
| Salutations | こんにちは / こんばんは | Konnichiwa / Konbanwa |
| へ particule | くうこうへいきます → Kuukou e ikimasu | e |
| へ dans un mot | へや → heya | he |
| を | みずをください → Mizu o kudasai | o |
| Petit っ | きって, きっぷ, いっぱく | consonne doublée |
| Petits ゃ / ゅ / ょ | でんしゃ, きゅうきゅうしゃ, きょう | chaque caractère occupe une case |
| Dakuten | が, ぎ, ぐ ; でんしゃ | caractères NFC précomposés |
| Handakuten | ぱ, ぱり, いっぱく, パスポート | caractères NFC précomposés |
| Voyelles longues | きょう → kyou ; コーヒー → koohii | ou / uu ou voyelle doublée, sans macrons |
| Petit kana katakana | チェックイン, ソファ | che, fa ; caractères séparés |
| Nasale avant voyelle | きんえんせき → kin'enseki | apostrophe de séparation |

Le rōmaji est une aide de prononciation suivant une convention cohérente pour débutants ; il ne note pas l’accent de hauteur ni toutes les réalisations phonétiques (dévoisement de certaines voyelles, par exemple).

## Références consultées

- [Japan Foundation — tableau des kana Irodori](https://www2.jpfbj.cn/irodori/resources/pdf/X_Hiragana_All.pdf) : lectures des séries de base et kana voisés.
- [Japan Foundation — ressources Irodori](https://www.irodori.jpf.go.jp/en/resources.html) : ressources kana et communication quotidienne.
- [Maison de la culture du Japon à Paris — Irodori](https://www.mcjp.fr/fr/langue-japonaise/irodori/irodori) : progression débutante fondée sur les situations de vie, avec version française et rōmaji.

Ces références servent de points de contrôle pédagogiques. La banque n’est pas présentée comme une reproduction ou une validation officielle d’Irodori.

## Reproduire le contrôle

```sh
python3 donnees/construire.py
node tests/linguistique.cjs
```

Les sources des nouvelles entrées se trouvent dans `donnees/ajouts_hiragana.txt` et `donnees/katakana.txt`. Les adaptations des anciennes entrées sont explicites dans `donnees/construire.py`.
