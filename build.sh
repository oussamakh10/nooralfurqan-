set -e
P=parts
{ cat $P/head.html; echo '<style>'; cat $P/head2.css; echo '</style>'
echo '<div class="bgpat" id="bg"></div>
<header class="top" id="top"></header>
<div class="wrap" id="page" dir="rtl" lang="ar"></div>
<div id="mini" hidden dir="rtl"></div>
<nav id="nav" aria-label="التنقل"></nav>
<div id="lesson" dir="rtl" lang="ar" hidden></div>
<div id="cele" hidden dir="rtl" lang="ar"></div>
<div id="toast" hidden role="status"></div>
<script>'
for f in meta lessons lessons2 new_A new_B new_C new_D adv_1 adv_2 adv_3 adv pro_1 pro_2 pro_3 prq data hoopoe app1 i18n snd app2 app3 app5 app6 guide extra safe fb pro school_t1 school_t2 school_t3 school app4 school2 bac_data bac ui2 ui3 qtypes ask install adv2 native polish polish2 polish3 splash store entry app9 follow shop ui5 duelp2p; do cat $P/$f.js; echo; done
echo '</script>'; } > hudhud.html
# syntax check of the concatenated script
python3 - <<'PY'
import re
s=open('hudhud.html',encoding='utf8').read()
i=s.rindex('<script>')+8;j=s.rindex('</script>')
open('chk_all.js','w',encoding='utf8').write(s[i:j])
PY
node --check chk_all.js
{ echo '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'; cat hudhud.html; echo '</body></html>'; } > site/index.html
wc -c hudhud.html
