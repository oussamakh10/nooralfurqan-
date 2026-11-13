/* ===== بطاقة المنشئ أسفل الواجهة ===== */
(function(){
  const _ph=pageHome;
  pageHome=function(){
    _ph();
    const pg=document.getElementById('page');if(!pg||pg.querySelector('.crd-ft'))return;
    pg.insertAdjacentHTML('beforeend','<footer class="crd-ft" style="margin:22px 0 96px;padding:14px 16px;text-align:center;border-radius:18px;border:1.5px solid var(--gold,#c9a84c);background:rgba(255,255,255,.45)"><small style="display:block;opacity:.75">'+esc(g3(['المنشئ','Created by','Créé par']))+'</small><b style="display:block;font-size:1.3rem;margin-top:2px">'+esc(g3(['خلوفي أسامة','Oussama Khelloufi','Oussama Khelloufi']))+'</b><small style="display:block;opacity:.75;margin-top:2px">'+esc(g3(['نور الفرقان','Nur al-Furqan','Nur al-Furqan']))+'</small></footer>');
  };
})();
