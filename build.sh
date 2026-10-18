#!/bin/bash
# يجمع src/parts إلى public/index.html
set -e
cd "$(dirname "$0")"
P=src/parts
{ echo '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'
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
for f in meta lessons lessons2 new_A new_B new_C new_D data hoopoe app1 i18n snd app2 app3 app5 app6 guide extra safe app4 app9; do cat $P/$f.js; echo; done
echo '</script></body></html>'; } > public/index.html
node --check <(sed -n '/<script>$/,$p' public/index.html | sed '1d;$d') 2>/dev/null || true
wc -c public/index.html
