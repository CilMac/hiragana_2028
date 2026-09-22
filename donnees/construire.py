"""Build browser data without dependencies. Authored source rows remain reviewable."""
from pathlib import Path
import json, hashlib
ROOT = Path(__file__).resolve().parent.parent

def parse(file, prefix):
    rows, theme = [], ''
    for line in (ROOT / 'donnees' / file).read_text().splitlines():
        if line.startswith('# '): theme = line[2:]; continue
        if not line.strip(): continue
        level,jp,romaji,fr = line.split('|')
        rows.append(dict(jp=jp,romaji=romaji,fr=fr,theme=theme,level=int(level)))
    return rows

old = json.loads((ROOT/'phrases_100.json').read_text())
themes = {
'base':[1,2,3,6,7,24,55,57,59,67,73,89],
'salutations':[4,5,13,14,15,16,17,18,19,31,32,53,54,56],
'présentation':[8,9,34,35,37,38,39,52],
'conversation':[12,21,22,23,40,41,42,58,81],
'quotidien':[20,43,44,51], 'questions':[26,60],
'transport':[10,49,74,95], 'horaires':[11,36,45],
'orientation':[25,46,47,48,72,76,77,87],
'shopping':[27,28,70,71,88], 'nourriture':[29,64,92],
'boissons':[65,96], 'santé':[30,61,62,63,66,85,86],
'voyage':[68,69,90,91,93,94], 'météo':[82,83,84], 'goûts':[97]}
reverse={n:k for k,nums in themes.items() for n in nums}
# Exclude placeholders, an abrupt imperative, and awkward/unhelpful old examples.
skip={33,50,75,78,79,80}
rows=[]
for i,x in enumerate(old,1):
    if i in skip: continue
    jp=''.join(x['kana'].split())
    jp=''.join(chr(ord(c)-0x60) if 'ァ'<=c<='ヶ' else c for c in jp)
    r=x['romaji']; fr=x['fr']
    if i==10: jp='でんしゃはここです'
    if i==11: r='Ima wa juuniji desu';fr='Il est douze heures.'
    if i==14: r='Gomennasai'
    if i==15: fr='Merci pour ce repas. (formule dite avant de manger)'
    if i==52: jp='おなまえはなんですか';r='Onamae wa nan desu ka';fr='Quel est votre nom ?'
    if i==70: jp='でんしけっさいはできますか';r='Denshi kessai wa dekimasu ka';fr='Peut-on payer par voie électronique ?'
    if i==71: jp='かあどはつかえますか';r='Kaado wa tsukaemasu ka'
    if i==87: fr='Les toilettes sont ici.'
    if i==7: fr='Là-bas, c’est une chaise.'
    level=1 if len(jp)<=10 else 2 if len(jp)<=17 else 3
    if i in {49,63,70,71,76,90,94,97}: level=3
    rows.append(dict(jp=jp,romaji=r.rstrip('?'),fr=fr,theme=reverse[i],level=level))
rows+=parse('ajouts_hiragana.txt','h')
written=json.loads((ROOT/'donnees/ecriture_japonaise.json').read_text())
for row in rows:
    row['written']=written[row['jp']]


def output(rows,prefix,file,var):
    seen=set()
    for x in rows:
        assert x['jp'] not in seen, x
        seen.add(x['jp'])
        x['id']=prefix+'-'+hashlib.sha256(x['jp'].encode()).hexdigest()[:12]
    (ROOT/file).write_text('// Données générées par donnees/construire.py ; modifier les sources dans donnees/.\nwindow.'+var+' = '+json.dumps(rows,ensure_ascii=False,indent=2)+';\n')
    return len(rows)
print('Hiragana:',output(rows,'h','phrases_hiragana.js','HIRAGANA'))
print('Katakana:',output(parse('katakana.txt','k'),'k','mots_katakana.js','KATAKANA'))
