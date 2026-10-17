import json
D=json.load(open('merged.json'))
X=json.load(open('extras.json'))
en={k:v[0] for k,v in D.items()};fr={k:v[1] for k,v in D.items()}
for k,v in X.items(): en[k]=v[0];fr[k]=v[1]
json.dump(en,open('../public/i18n_en.json','w'),ensure_ascii=False,separators=(',',':'))
json.dump(fr,open('../public/i18n_fr.json','w'),ensure_ascii=False,separators=(',',':'))
print(len(en))
