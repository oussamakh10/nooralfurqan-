/* ===== عرض الوثائق القانونية داخل التطبيق (الخصوصية، الشروط، المصادر) ===== */
(function(){
  function close(){const o=document.getElementById('docov');if(o)o.remove()}
  function openDoc(h,title){
    close();
    const o=document.createElement('div');o.id='docov';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');
    o.style.cssText='position:fixed;inset:0;z-index:100000;display:flex;flex-direction:column;background:#10201d';
    o.innerHTML='<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#0f3b3a;color:#f1e8cc;border-bottom:2px solid #c8a24a"><b style="flex:1;font:700 1.05rem inherit">'+esc(title||'')+'</b><button data-docx="1" aria-label="'+esc(g3(['إغلاق','Close','Fermer']))+'" style="min-width:44px;min-height:44px;border-radius:12px;border:2px solid #c8a24a;background:transparent;color:#f1e8cc;font-size:1.2rem;cursor:pointer">✕</button></div><iframe title="'+esc(title||'')+'" style="flex:1;width:100%;border:0;background:#fbf3dc"></iframe>';
    document.body.appendChild(o);
    const f=o.querySelector('iframe'),li=LANG==='fr'?2:LANG==='en'?1:0;
    fetch(h).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){
      t=t.replace(/var L=\(function\(\)\{[^}]*\}\)\(\);/,'var L='+li+';').replace(/<a href="\.\/">[^<]*<\/a>/,'');
      f.srcdoc=t;
    }).catch(function(){
      f.srcdoc='<meta charset="utf-8"><body style="font:1.05rem/1.9 Tahoma,sans-serif;padding:24px;text-align:center;direction:'+(li?'ltr':'rtl')+'"><p>'+esc(g3(['تعذّر تحميل الوثيقة الآن. تتوفر على موقع التطبيق.','Could not load the document now. It is available on the app website.','Impossible de charger le document. Il est disponible sur le site de l’application.']))+'</p><p><a target="_blank" rel="noopener" href="'+h+'">'+esc(h)+'</a></p>';
    });
    const b=o.querySelector('[data-docx]');if(b)b.focus();
  }
  document.addEventListener('click',function(e){
    if(e.target.closest&&e.target.closest('[data-docx]')){close();return}
    const a=e.target.closest&&e.target.closest('a[href]');if(!a||a.closest('#docov'))return;
    const h=a.getAttribute('href');if(!/^(privacy|terms|sources|support|delete-account)\.html$/.test(h))return;
    e.preventDefault();e.stopPropagation();openDoc(h,a.textContent.trim());
  },true);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();
