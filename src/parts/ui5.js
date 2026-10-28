/* ===== سلاسة: حركة دخول عند تبديل الصفحات ===== */
(function(){
  let tm=0;
  const _go=go;
  go=function(t){
    const same=(t===TAB);
    _go(t);
    if(same)return;
    const p=document.getElementById('page');if(!p)return;
    p.classList.remove('pgin');void p.offsetWidth;p.classList.add('pgin');
    clearTimeout(tm);tm=setTimeout(function(){p.classList.remove('pgin')},700);
  };
})();
/* وسم الصفحة الحالية لتفعيل الخلفيات المصمَّمة */
(function(){
  const _rp=renderPage;
  renderPage=function(){try{document.documentElement.setAttribute('data-tab',TAB)}catch(e){}return _rp.apply(this,arguments)};
  try{document.documentElement.setAttribute('data-tab',TAB)}catch(e){}
})();
