#!/bin/bash
# يبني مجلد deploy/ الجاهز للنشر مع PWA وترويسات الحماية
set -e
cd "$(dirname "$0")"
rm -rf deploy && mkdir deploy
cp site/quran.json site/muy.json site/jal.json site/en.json site/i18n_en.json site/i18n_fr.json deploy/
[ -f pwa/firebase-config.json ] && cp pwa/firebase-config.json deploy/ || true
cp pwa/shot-*.png deploy/; cp pwa/welcome.html pwa/privacy.html pwa/terms.html pwa/support.html pwa/delete-account.html deploy/; mkdir -p deploy/pdf; cp pdf/*.pdf deploy/pdf/; cp pwa/manifest.json pwa/sw.js pwa/icon-192.png pwa/icon-512.png pwa/icon-maskable-512.png pwa/apple-touch-icon.png pwa/favicon-32.png deploy/
python3 - <<'PY'
s=open('site/index.html',encoding='utf8').read()
inj='<link rel="manifest" href="manifest.json"><meta name="theme-color" content="#0f3b3a"><link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png"><link rel="apple-touch-icon" href="apple-touch-icon.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><script>window.__dip=null;addEventListener("beforeinstallprompt",function(e){e.preventDefault();window.__dip=e});</script>'
s=s.replace('width=device-width,initial-scale=1"','width=device-width,initial-scale=1,viewport-fit=cover"',1)
s=s.replace('</head>',inj+'</head>',1)
s=s.replace('</body>','<script>if("serviceWorker" in navigator&&/^https?:/.test(location.protocol)){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})})}</script></body>',1)
open('deploy/index.html','w',encoding='utf8').write(s)
PY
cat > deploy/_headers <<'H'
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=(self), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; media-src 'self' blob: data: https://*.mp3quran.net https://everyayah.com https://archive.org https://*.archive.org; connect-src 'self' https://api.alquran.cloud https://api.quran.com https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; frame-src https://*.firebaseapp.com https://accounts.google.com; worker-src 'self'; manifest-src 'self'
/sw.js
  Cache-Control: no-cache
H
rm -f nur-alfurqan-site.zip
(cd deploy && python3 -c "
import zipfile,os
z=zipfile.ZipFile('../nur-alfurqan-site.zip','w',zipfile.ZIP_DEFLATED)
for r,d,fs in os.walk('.'):
  for f in sorted(fs):z.write(os.path.join(r,f)[2:])
z.close()")
ls deploy
