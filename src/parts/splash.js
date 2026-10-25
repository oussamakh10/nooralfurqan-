/* ===== شاشات الدخول: a = الزخرفية (الأولى)، b = الفجر (الجديدة). التبديل من الإعدادات أو S.spv ===== */
(function(){
  function stars(n,dl){let st='';for(let i=0;i<n;i++){st+='<i style="left:'+((i*37+11)%100)+'%;top:'+((i*53+7)%(dl||100))+'%;animation-delay:'+((i%9)*0.5)+'s;width:'+(2+(i%3))+'px;height:'+(2+(i%3))+'px"></i>'}return st}
  function slogan(){return esc(g3(['رفيقك لتعلّم الدين خطوة خطوة','Learn your faith step by step','Apprenez votre foi pas à pas']))}
  function buildA(d){
    const star='<svg class="spor" viewBox="-200 -200 400 400" aria-hidden="true"><g fill="none" stroke="#e6c473" stroke-linejoin="round"><circle r="190" stroke-width="1.2" class="dr"/><circle r="172" stroke-width=".8" stroke-dasharray="2 7" opacity=".7"/><rect x="-120" y="-120" width="240" height="240" stroke-width="1.6" class="dr"/><rect x="-120" y="-120" width="240" height="240" stroke-width="1.6" transform="rotate(45)" class="dr"/><circle r="146" stroke-width=".8" opacity=".55"/><rect x="-84" y="-84" width="168" height="168" stroke-width="1" transform="rotate(22.5)" opacity=".5"/><rect x="-84" y="-84" width="168" height="168" stroke-width="1" transform="rotate(67.5)" opacity=".5"/></g></svg>';
    const corner='<svg class="spcn" viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="#e6c473" stroke-width="1.4"><path d="M6 74V30Q6 6 30 6H74" /><path d="M16 74V34Q16 16 34 16H74" opacity=".5"/><circle cx="30" cy="30" r="5"/><path d="M30 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#e6c473" stroke="none" opacity=".9"/></g></svg>';
    d.className='va';
    d.innerHTML='<div class="spst">'+stars(34)+'</div><div class="spglow"></div>'+
      '<div class="spcns"><span class="c1">'+corner+'</span><span class="c2">'+corner+'</span><span class="c3">'+corner+'</span><span class="c4">'+corner+'</span></div>'+
      '<div class="spc"><div class="sparch">'+star+'<div class="mas sph">'+hoopoe('happy',128)+'</div></div><h1><span>نور الفرقان</span></h1><div class="spdv"><b></b><em>✦</em><b></b></div><p class="spv">﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾</p><small>'+slogan()+'</small></div><div class="spbar"><b></b></div>';
    return 5200;
  }
  function buildB(d){
    const sky='<svg class="dbsk" viewBox="0 0 400 130" preserveAspectRatio="xMidYMax slice" aria-hidden="true">'+
      '<g fill="#0c3a4a" opacity=".55"><path d="M0 130V96h30V84a14 14 0 0 1 28 0v12h40V80h8V62l6-14 6 14v18h8v16h54V90a30 30 0 0 1 60 0v6h60V80h8V62l6-14 6 14v18h8v16h30V84a14 14 0 0 1 28 0v12h22v34z"/></g>'+
      '<g fill="#061c26"><path d="M0 130V108h46V98a18 18 0 0 1 36 0v10h30V70h10V50l7-18 7 18v20h10v38h30v-14a50 50 0 0 1 100 0v14h30V70h10V50l7-18 7 18v20h10v38h32V98a18 18 0 0 1 36 0v10h42v22z"/><rect x="199" y="26" width="2" height="22"/><circle cx="200" cy="24" r="3"/></g></svg>';
    d.className='vb';
    d.innerHTML='<div class="dbst">'+stars(40,60)+'</div><div class="dbsun"></div><div class="dbmoon"></div>'+
      '<div class="dbm">'+sky+'</div>'+
      '<div class="dbc"><div class="dbh">'+hoopoe('happy',120)+'</div><div class="dbt"><span>نور الفرقان</span></div><div class="dbl"></div><p class="dbv">﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾</p><div class="dbs">'+slogan()+'</div></div><div class="dbbar"><b></b></div>';
    return 5600;
  }
  function buildC(d){
    const tile='<svg class="dcpat" aria-hidden="true"><defs><pattern id="dcp" width="64" height="64" patternUnits="userSpaceOnUse"><g fill="none" stroke="#b8892e" stroke-width="1"><rect x="14" y="14" width="36" height="36"/><rect x="14" y="14" width="36" height="36" transform="rotate(45 32 32)"/><circle cx="32" cy="32" r="6"/></g></pattern></defs><rect width="100%" height="100%" fill="url(#dcp)"/></svg>';
    const book='<svg class="dcbk" viewBox="0 0 240 150" aria-hidden="true"><path d="M8 132Q120 154 232 132V112Q120 132 8 112Z" fill="#0f5c52"/><path d="M8 132Q120 154 232 132" fill="none" stroke="#d9b45a" stroke-width="2"/><g class="pgl"><path d="M120 126Q70 106 12 113V30Q70 22 120 42Z" fill="#fffaf0" stroke="#c9a14a" stroke-width="1.5"/><g stroke="#b8892e" stroke-width="1.4" opacity=".6" fill="none"><path d="M30 52Q70 46 108 58M30 66Q70 60 108 72M30 80Q70 74 108 86M30 94Q70 88 108 100"/></g></g><g class="pgr"><path d="M120 126Q170 106 228 113V30Q170 22 120 42Z" fill="#fffaf0" stroke="#c9a14a" stroke-width="1.5"/><g stroke="#b8892e" stroke-width="1.4" opacity=".6" fill="none"><path d="M132 58Q170 46 210 52M132 72Q170 60 210 66M132 86Q170 74 210 80M132 100Q170 88 210 94"/></g></g></svg>';
    let pr='';for(let i=0;i<18;i++){pr+='<i style="left:'+(30+((i*29)%46))+'%;animation-delay:'+(1.4+(i%9)*0.32)+'s;animation-duration:'+(3.2+(i%4)*0.5)+'s;width:'+(3+(i%3))+'px;height:'+(3+(i%3))+'px"></i>'}
    d.className='vc';
    d.innerHTML=tile+'<div class="dcray"></div><div class="dcpt">'+pr+'</div><div class="dcc"><div class="dch">'+hoopoe('happy',112)+'</div><div class="dcb">'+book+'</div><div class="dct"><span>نور الفرقان</span></div><div class="dcl"><b></b><em>✦</em><b></b></div><p class="dcv">﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾</p><div class="dcs">'+slogan()+'</div></div><div class="dcdots"><i></i><i></i><i></i></div>';
    return 5600;
  }
  window.showSplash=function(kind){
    try{
      const old=document.getElementById('splash');if(old)old.remove();
      const d=document.createElement('div');d.id='splash';
      const ms=(kind==='a'?buildA:kind==='c'?buildC:buildB)(d);
      document.body.appendChild(d);
      const end=function(){if(!d.isConnected||d.classList.contains('out'))return;d.classList.add('out');setTimeout(function(){d.remove()},1000)};
      d.addEventListener('click',end);setTimeout(end,ms);
    }catch(e){}
  };
  try{if(!sessionStorage.getItem('nfsp')){sessionStorage.setItem('nfsp','1');showSplash(S.spv||'b')}}catch(e){}
  const es=extraSettings;
  extraSettings=function(){
    const k=S.spv||'b';
    return es()+'<div class="setrow"><span>'+esc(g3(['شاشة الدخول','Intro screen','Écran d’accueil']))+'</span><span class="opts2"><button class="tag" data-spv="b" aria-pressed="'+(k==='b')+'">'+esc(g3(['الفجر','Dawn','Aube']))+'</button><button class="tag" data-spv="a" aria-pressed="'+(k==='a')+'">'+esc(g3(['الزخرفية','Ornate','Ornée']))+'</button><button class="tag" data-spv="c" aria-pressed="'+(k==='c')+'">'+esc(g3(['المصحف','Mushaf','Mushaf']))+'</button></span></div>';
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-spv]');if(!b)return;
    S.spv=b.getAttribute('data-spv');save();openSettings();showSplash(S.spv);
  });
})();
