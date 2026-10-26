/* ===== لمسات المتجر: شاشة بداية، اختصارات، حجم الخط، اهتزاز، خروج، روابط ===== */
(function(){
  const PLAY_URL='';/* ضع رابط التطبيق في Play Store هنا بعد النشر */
  const SITE_=(typeof SITE!=='undefined'&&SITE)||'https://nooralfurqan.netlify.app';
  /* اختصارات ?go= */
  try{const g=new URLSearchParams(location.search).get('go');if(g&&['learn','read','dhikr','home','ach','games','listen'].indexOf(g)>=0)setTimeout(function(){go(g)},400)}catch(e){}
  /* حجم الخط */
  /* اهتزاز خفيف */
  function vib(p){try{if(!S.nov&&navigator.vibrate)navigator.vibrate(p)}catch(e){}}
  try{const c=SND.correct,w=SND.wrong;SND.correct=function(){vib(15);return c.apply(this,arguments)};SND.wrong=function(){vib([30,40,30]);return w.apply(this,arguments)}}catch(e){}
  /* إعدادات */
  const es=extraSettings;
  extraSettings=function(){
    let h=es();
    h+='<div class="setrow"><span>'+esc(g3(['الاهتزاز','Vibration','Vibration']))+'</span><button class="btn sm ghost" data-act="vib-t">'+esc(S.nov?g3(['مُوقف','Off','Désactivée']):g3(['مُفعّل','On','Activée']))+'</button></div>';
    if(PLAY_URL)h+='<div class="setrow"><span>'+esc(g3(['قيّم التطبيق','Rate the app','Noter l’application']))+'</span><a class="btn sm ghost" href="'+PLAY_URL+'" target="_blank" rel="noopener">★</a></div>';
    return h;
  };
  document.addEventListener('click',function(e){
    const t=e.target.closest&&e.target.closest('[data-act="vib-t"]');
    if(t){S.nov=!S.nov;save();if(!S.nov)vib(20);openSettings()}
  });
  /* روابط الخصوصية في «عن التطبيق» */
  const oa=openAbout;
  openAbout=function(){
    oa();
    const m=document.querySelector('#lesson .lmain');if(!m)return;
    const c=document.createElement('div');c.className='card';c.style.cssText='display:flex;gap:8px;flex-wrap:wrap;justify-content:center';
    c.innerHTML=[['privacy.html',['سياسة الخصوصية','Privacy policy','Confidentialité']],['terms.html',['شروط الاستخدام','Terms of use','Conditions']],['support.html',['الدعم','Support','Assistance']]].map(function(x){return '<a class="btn sm ghost" href="'+x[0]+'" target="_blank" rel="noopener">'+esc(g3(x[1]))+'</a>'}).join('');
    m.appendChild(c);
  };
  /* خروج بضغطتين من الرئيسية */
  try{
    if(isStandalone()){
      let last=0;history.pushState({home:1},'');
      window.addEventListener('popstate',function(){
        const l=document.getElementById('lesson'),c=document.getElementById('cele');
        if((l&&!l.hidden)||(c&&!c.hidden))return;
        if(history.state&&history.state.ov)return;
        if(Date.now()-last<2000){history.back();return}
        last=Date.now();history.pushState({home:1},'');
        toast(g3(['اضغط مرة أخرى للخروج','Press back again to exit','Appuyez encore pour quitter']));
      });
    }
  }catch(e){}
})();
