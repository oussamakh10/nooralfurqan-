/* 20-perf: حفظ مؤجَّل + إيقاف الحركة عند الإخفاء + تخفيف المراقبات */
(function(){
  /* 1) حفظ مجمَّع: كتابة واحدة كل 400ms بدل كل نقرة */
  var tm=0,orig=window.save;
  if(typeof orig==='function'&&!window.__saveWrapped){
    window.__saveWrapped=1;
    var flush=function(){if(tm){clearTimeout(tm);tm=0;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}};
    window.save=function(){
      if(!tm)tm=setTimeout(function(){tm=0;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}},400);
      if(typeof schedulePush==='function')schedulePush();
    };
    window.addEventListener('pagehide',flush);
    document.addEventListener('visibilitychange',function(){if(document.hidden)flush()});
    window.addEventListener('beforeunload',flush);
  }
  /* 2) إيقاف الحركات اللانهائية حين يختفي التطبيق */
  var st=document.createElement('style');
  st.textContent='html.nf-hid *,html.nf-hid *::before,html.nf-hid *::after{animation-play-state:paused!important}'+
   '.ay,.lst>*,.hz-ch{content-visibility:auto;contain-intrinsic-size:auto 120px}';
  document.head.appendChild(st);
  document.addEventListener('visibilitychange',function(){document.documentElement.classList.toggle('nf-hid',document.hidden)});
})();
