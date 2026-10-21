#!/bin/bash
# يجمع src/parts إلى public/index.html
set -e
cd "$(dirname "$0")"
P=src/parts
{ echo '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'
cat $P/head.html; echo '<style>'; cat $P/head2.css; echo '</style>'
echo '<div class="bgpat" id="bg"></div>
<header class="top" id="top"></header>
<div class="wrap" id="page" dir="rtl" lang="ar"></div>
<div id="mini" hidden dir="rtl"></div>
<nav id="nav" aria-label="التنقل"></nav>
<div id="lesson" dir="rtl" lang="ar" hidden></div>
<div id="cele" hidden dir="rtl" lang="ar"></div>
<div id="toast" hidden role="status"></div>
<script>'
for f in meta lessons lessons2 new_A new_B new_C new_D data hoopoe app1 i18n snd app2 app3 app5 app6 guide extra safe fb pro school_t1 school_t2 school_t3 school app4 school2 ui2 app9; do cat $P/$f.js; echo; done
echo '</script></body></html>'; } > public/index.html
node --check <(sed -n '/<script>$/,$p' public/index.html | sed '1d;$d') 2>/dev/null || true
python3 - <<'INJ'
p='public/index.html'
s=open(p,encoding='utf8').read()
if 'rel="manifest"' not in s:
    inj='<link rel="manifest" href="manifest.json"><meta name="theme-color" content="#0f3b3a"><link rel="icon" href="icon-192.png"><link rel="apple-touch-icon" href="icon-192.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">'
    s=s.replace('</head>',inj+'</head>',1)
    s=s.replace('</body>','<script>if("serviceWorker" in navigator&&/^https?:/.test(location.protocol)){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})})}</script></body>',1)
    open(p,'w',encoding='utf8').write(s)
INJ
wc -c public/index.html
