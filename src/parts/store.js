/* ===== لمسات المتجر: شاشة بداية، اختصارات، حجم الخط، اهتزاز، خروج، روابط ===== */
(function(){
  const PLAY_URL='';/* ضع رابط التطبيق في Play Store هنا بعد النشر */
  const SITE_=(typeof SITE!=='undefined'&&SITE)||'https://nooralfurqan.netlify.app';
  /* شاشة البداية: دخول فخم هادئ */
  try{
    if(!sessionStorage.getItem('nfsp')){
      sessionStorage.setItem('nfsp','1');
      const d=document.createElement('div');d.id='splash';
      let st='';for(let i=0;i<34;i++){st+='<i style="left:'+((i*37+11)%100)+'%;top:'+((i*53+7)%100)+'%;animation-delay:'+((i%9)*0.5)+'s;width:'+(2+(i%3))+'px;height:'+(2+(i%3))+'px"></i>'}
      const star='<svg class="spor" viewBox="-200 -200 400 400" aria-hidden="true"><g fill="none" stroke="#e6c473" stroke-linejoin="round"><circle r="190" stroke-width="1.2" class="dr"/><circle r="172" stroke-width=".8" stroke-dasharray="2 7" opacity=".7"/><rect x="-120" y="-120" width="240" height="240" stroke-width="1.6" class="dr"/><rect x="-120" y="-120" width="240" height="240" stroke-width="1.6" transform="rotate(45)" class="dr"/><circle r="146" stroke-width=".8" opacity=".55"/><rect x="-84" y="-84" width="168" height="168" stroke-width="1" transform="rotate(22.5)" opacity=".5"/><rect x="-84" y="-84" width="168" height="168" stroke-width="1" transform="rotate(67.5)" opacity=".5"/></g></svg>';
      const corner='<svg class="spcn" viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="#e6c473" stroke-width="1.4"><path d="M6 74V30Q6 6 30 6H74" /><path d="M16 74V34Q16 16 34 16H74" opacity=".5"/><circle cx="30" cy="30" r="5"/><path d="M30 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#e6c473" stroke="none" opacity=".9"/></g></svg>';
      d.innerHTML='<div class="spst">'+st+'</div><div class="spglow"></div>'+
        '<div class="spcns"><span class="c1">'+corner+'</span><span class="c2">'+corner+'</span><span class="c3">'+corner+'</span><span class="c4">'+corner+'</span></div>'+
        '<div class="spc"><div class="sparch">'+star+'<div class="mas sph">'+hoopoe('happy',128)+'</div></div><h1><span>نور الفرقان</span></h1><div class="spdv"><b></b><em>✦</em><b></b></div><p class="spv">﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾</p><small>'+esc(g3(['رفيقك لتعلّم الدين خطوة خطوة','Learn your faith step by step','Apprenez votre foi pas à pas']))+'</small></div><div class="spbar"><b></b></div>';
      document.body.appendChild(d);
      const end=function(){if(!d.isConnected||d.classList.contains('out'))return;d.classList.add('out');setTimeout(function(){d.remove()},1000)};
      d.addEventListener('click',end);setTimeout(end,5200);
    }
  }catch(e){}
  /* اختصارات ?go= */
  try{const g=new URLSearchParams(location.search).get('go');if(g&&['learn','read','dhikr','home','ach','games','listen'].indexOf(g)>=0)setTimeout(function(){go(g)},400)}catch(e){}
  /* حجم الخط */
  function fs(){document.documentElement.style.fontSize=['100%','112%','125%'][S.fs||0]}
  fs();
  /* اهتزاز خفيف */
  function vib(p){try{if(!S.nov&&navigator.vibrate)navigator.vibrate(p)}catch(e){}}
  try{const c=SND.correct,w=SND.wrong;SND.correct=function(){vib(15);return c.apply(this,arguments)};SND.wrong=function(){vib([30,40,30]);return w.apply(this,arguments)}}catch(e){}
  /* إعدادات */
  const es=extraSettings;
  extraSettings=function(){
    let h=es();
    h+='<div class="setrow"><span>'+esc(g3(['حجم الخط','Text size','Taille du texte']))+'</span><span class="opts2">'+[0,1,2].map(function(i){return '<button class="tag" data-fs="'+i+'" aria-pressed="'+((S.fs||0)===i)+'" style="font-size:'+(0.9+i*0.15)+'rem">أ</button>'}).join('')+'</span></div>';
    h+='<div class="setrow"><span>'+esc(g3(['الاهتزاز','Vibration','Vibration']))+'</span><button class="btn sm ghost" data-act="vib-t">'+esc(S.nov?g3(['مُوقف','Off','Désactivée']):g3(['مُفعّل','On','Activée']))+'</button></div>';
    if(PLAY_URL)h+='<div class="setrow"><span>'+esc(g3(['قيّم التطبيق','Rate the app','Noter l’application']))+'</span><a class="btn sm ghost" href="'+PLAY_URL+'" target="_blank" rel="noopener">★</a></div>';
    return h;
  };
  document.addEventListener('click',function(e){
    const f=e.target.closest&&e.target.closest('[data-fs]');
    if(f){S.fs=+f.getAttribute('data-fs');save();fs();openSettings();return}
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
