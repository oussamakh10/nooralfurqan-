/* ===== بطاقة المنشئ أسفل الواجهة (نفس بطاقة الإعدادات) ===== */
(function(){
  const _ph=pageHome;
  pageHome=function(){
    _ph();
    const pg=document.getElementById('page');if(!pg||pg.querySelector('.crd-ft'))return;
    pg.insertAdjacentHTML('beforeend','<div class="crd-ft" style="margin-bottom:96px"><section class="sec"><h2>المنشئ</h2><div class="card creator"><div class="mas">'+hoopoe('cheer',64)+'</div><div><div class="nm">خلوفي أسامة</div><p class="muted">منشئ تطبيق نور الفرقان</p><p class="muted" style="margin-top:6px;font-size:.85rem;font-weight:700;color:var(--ink,inherit)">'+esc(g3(['مساعدة في الحماية والأمان: مصعب شكري','Security & safety assistance: Mosaab Chokri','Aide en protection et sécurité : Mosaab Chokri']))+'</p><p class="muted" style="margin-top:2px;font-size:.85rem;font-weight:700;color:var(--ink,inherit)">'+esc(g3(['مساعدة في التصميم: أسيل','Design assistance: Aseel','Aide en design : Aseel']))+'</p></div></div></section></div>');
  };
})();
