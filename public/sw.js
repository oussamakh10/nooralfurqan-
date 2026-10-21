/* نور الفرقان — عمل دون إنترنت: يخزّن ملفات التطبيق والبيانات بعد أول زيارة */
const V='nf-v19';
const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','quran.json','muy.json','jal.json','en.json','i18n_en.json','i18n_fr.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(CORE.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;   // الصوتيات والترجمات الخارجية تمرّ كما هي
  // الصفحة: الشبكة أولًا (لتصل التحديثات) ثم النسخة المخزنة
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put('index.html',c));return x}).catch(()=>caches.match('index.html')));
    return;
  }
  // الأيقونات وملف التثبيت: الشبكة أولًا حتى تظهر التغييرات فورًا
  if(/manifest\.json$|\.png$/.test(u.pathname)){
    e.respondWith(fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x}).catch(()=>caches.match(r)));
    return;
  }
  // بقية الملفات: المخزن أولًا ثم الشبكة
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x})));
});
