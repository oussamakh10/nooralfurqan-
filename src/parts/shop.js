/* ===== المتجر: شراء عناصر بالنقاط + مكافآت الإعلانات (واجهة جاهزة للربط) ===== */
(function(){
  /* ---- إعداد الإعلانات المكافِئة ----
     لربط مزوّد حقيقي عرِّف قبل تحميل الصفحة:
       window.NF_ADS={ ready:function(place){return true}, show:function(place){return Promise.resolve({rewarded:true})} }
     وجرّب الواجهة بدون مزوّد بإضافة ?adtest=1 إلى الرابط. */
  const ADS_CFG={reward:25,dailyCap:5,cooldown:90,place:'shop_reward'};
  const ITEMS=[
    {id:'freeze',sec:'مساعدات',t:'تجميد السلسلة',d:'يحفظ سلسلتك إن فاتك يوم (حتى 3)',p:50,k:'cons',ic:'❄'},
    {id:'boost',sec:'مساعدات',t:'مضاعف النقاط ×2',d:'ضعف النقاط لمدة ساعة (يتراكم)',p:150,k:'cons',ic:'⚡'},
    {id:'hp:full',sec:'مساعدات',t:'تعبئة القلوب',d:'يملأ قلوبك الخمسة فورًا لتكمل بلا انتظار',p:70,k:'cons',ic:'♥'},
    {id:'bundle:starter',sec:'مساعدات',t:'حزمة الانطلاقة',d:'تجميدان للسلسلة + مضاعف ×2 لساعة (وفّر 50 نقطة)',p:200,k:'cons',ic:'🎯'},
    {id:'hat:fez',sec:'الهدهد',t:'طربوش',d:'إكسسوار للهدهد',p:100,k:'own',ic:'🎩',eq:'hat',v:'fez'},
    {id:'hat:turban',sec:'الهدهد',t:'عمامة',d:'غطاء رأس للهدهد',p:150,k:'own',ic:'🧕',eq:'hat',v:'turban'},
    {id:'hat:cap',sec:'الهدهد',t:'قبعة التخرج',d:'غطاء رأس للهدهد',p:300,k:'own',ic:'🎓',eq:'hat',v:'cap'},
    {id:'hat:crown',sec:'الهدهد',t:'تاج',d:'غطاء رأس للهدهد',p:400,k:'own',ic:'👑',eq:'hat',v:'crown'},
    {id:'face:glasses',sec:'الهدهد',t:'نظارة',d:'للوجه، تُلبس مع أي غطاء رأس',p:200,k:'own',ic:'👓',eq:'face',v:'glasses'},
    {id:'hat:kufi',sec:'الهدهد',t:'طاقية',d:'طاقية بيضاء للهدهد',p:120,k:'own',ic:'🧢',eq:'hat',v:'kufi'},
    {id:'neck:bow',sec:'الهدهد',t:'ربطة عنق',d:'للعنق، تُلبس مع الباقي',p:130,k:'own',ic:'🎀',eq:'neck',v:'bow'},
    {id:'neck:scarf',sec:'الهدهد',t:'وشاح أخضر',d:'للعنق، يُلبس مع الباقي',p:150,k:'own',ic:'🧣',eq:'neck',v:'scarf'},
    {id:'pal:gold',sec:'ألوان التطبيق',t:'ذهبي',d:'لون التطبيق',p:120,k:'own',col:'#A8730A',eq:'pal',v:'gold'},
    {id:'pal:ocean',sec:'ألوان التطبيق',t:'أزرق',d:'لون التطبيق',p:120,k:'own',col:'#1C7E9E',eq:'pal',v:'ocean'},
    {id:'pal:rose',sec:'ألوان التطبيق',t:'وردي',d:'لون التطبيق',p:120,k:'own',col:'#B8456B',eq:'pal',v:'rose'},
    {id:'pal:violet',sec:'ألوان التطبيق',t:'بنفسجي',d:'لون التطبيق',p:150,k:'own',col:'#6F52C4',eq:'pal',v:'violet'},
    {id:'pal:crimson',sec:'ألوان التطبيق',t:'قرمزي',d:'لون التطبيق',p:150,k:'own',col:'#B83A33',eq:'pal',v:'crimson'},
    {id:'pal:teal',sec:'ألوان التطبيق',t:'فيروزي',d:'لون التطبيق',p:150,k:'own',col:'#118A8A',eq:'pal',v:'teal'},
    {id:'pal:brown',sec:'ألوان التطبيق',t:'بنّي ترابي',d:'لون التطبيق',p:150,k:'own',col:'#8A5A33',eq:'pal',v:'brown'},
    {id:'title:talib',sec:'الألقاب',t:'طالب علم',d:'لقب يظهر تحت اسمك',p:80,k:'own',eq:'title',v:'talib'},
    {id:'title:mujtahid',sec:'الألقاب',t:'مجتهد',d:'لقب يظهر تحت اسمك',p:120,k:'own',eq:'title',v:'mujtahid'},
    {id:'title:quran',sec:'الألقاب',t:'محبّ القرآن',d:'لقب يظهر تحت اسمك',p:200,k:'own',eq:'title',v:'quran'},
    {id:'title:dhikr',sec:'الألقاب',t:'ملازم الأذكار',d:'لقب يظهر تحت اسمك',p:250,k:'own',eq:'title',v:'dhikr'},
    {id:'title:nour',sec:'الألقاب',t:'نور الفرقان',d:'أرفع الألقاب',p:400,k:'own',eq:'title',v:'nour'},
    {id:'qbg:night',sec:'خلفيات الأسئلة',t:'ليل هادئ',d:'خلفية شاشة الأسئلة',p:100,k:'own',col:'#0B1B3A',eq:'qbg',v:'night'},
    {id:'qbg:plum',sec:'خلفيات الأسئلة',t:'بنفسجي ملكي',d:'خلفية شاشة الأسئلة',p:100,k:'own',col:'#2B1240',eq:'qbg',v:'plum'},
    {id:'qbg:sand',sec:'خلفيات الأسئلة',t:'رمل دافئ',d:'خلفية شاشة الأسئلة',p:120,k:'own',col:'#2A1D0E',eq:'qbg',v:'sand'},
    {id:'qbg:sea',sec:'خلفيات الأسئلة',t:'بحر عميق',d:'خلفية شاشة الأسئلة',p:120,k:'own',col:'#07303A',eq:'qbg',v:'sea'},
    {id:'qbg:ink',sec:'خلفيات الأسئلة',t:'فحمي',d:'خلفية شاشة الأسئلة',p:120,k:'own',col:'#141414',eq:'qbg',v:'ink'},
    {id:'spv:a',sec:'شاشة الدخول',t:'الزخرفية',d:'شاشة افتتاح مزخرفة',p:100,k:'own',ic:'✦',eq:'spv',v:'a'},
    {id:'spv:c',sec:'شاشة الدخول',t:'المصحف',d:'شاشة افتتاح بالمصحف',p:100,k:'own',ic:'📖',eq:'spv',v:'c'}
  ];
  function own(){if(!S.own||typeof S.own!=='object')S.own={};return S.own}
  function owned(id){return !!own()[id]}
  function isOwned(it){return it.k==='own'&&owned(it.id)}
  /* ترحيل: ما يستعمله المستخدم الآن يُعدّ مملوكًا */
  function migrate(){
    const o=own();
    if(S.pal&&S.pal!=='green')o['pal:'+S.pal]=1;
    if(S.hat)o['hat:'+S.hat]=1;
    if(S.face)o['face:'+S.face]=1;
    if(S.neck)o['neck:'+S.neck]=1;
    if(S.spv&&S.spv!=='b')o['spv:'+S.spv]=1;
    if(S.title)o['title:'+S.title]=1;
    if(S.qbg)o['qbg:'+S.qbg]=1;
  }
  function boostLeft(){return Math.max(0,(S.boost||0)-Date.now())}
  /* مضاعف النقاط */
  const _ax=addXP;
  addXP=function(n){if(n>0&&boostLeft()>0)n=n*2;return _ax(n)};
  /* ---- الإعلانات ---- */
  function adS(){if(!S.ads||typeof S.ads!=='object')S.ads={};const a=S.ads,d=today();if(a.d!==d){a.d=d;a.n=0}return a}
  function adTest(){try{return /[?&]adtest=1/.test(location.search)||localStorage.getItem('nf-adtest')==='1'}catch(e){return false}}
  function adReady(){
    if(window.NF_ADS&&typeof window.NF_ADS.show==='function'){try{return window.NF_ADS.ready?!!window.NF_ADS.ready(ADS_CFG.place):true}catch(e){return false}}
    return adTest();
  }
  function adOK(){return !S.kids&&adReady()}
  function adWait(){const a=adS();return Math.max(0,((a.t||0)+ADS_CFG.cooldown*1000-Date.now())/1000)}
  function runAd(){
    if(window.NF_ADS&&typeof window.NF_ADS.show==='function')return window.NF_ADS.show(ADS_CFG.place);
    return new Promise(function(res){/* إعلان تجريبي */
      const o=document.createElement('div');o.className='adsim';let s=3;
      o.innerHTML='<div><b>إعلان تجريبي</b><p>سينتهي خلال <span id="adsn">3</span> ثوانٍ…</p></div>';document.body.appendChild(o);
      const iv=setInterval(function(){s--;const e=document.getElementById('adsn');if(e)e.textContent=s;if(s<=0){clearInterval(iv);o.remove();res({rewarded:true})}},1000);
    });
  }
  function watchAd(kind){
    const a=adS();
    if(S.kids){toast('الإعلانات غير متاحة في وضع الأطفال');return}
    if(!adReady()){toast('الإعلانات غير متاحة حاليًا');return}
    if(kind==='freeze'){if(a.fz){toast('أخذتَ تجميد اليوم');return}if((S.freeze||0)>=3){toast('لديك الحد الأقصى: 3');return}}
    if(kind==='boost'&&a.bs){toast('أخذتَ مضاعف اليوم');return}
    if(a.n>=ADS_CFG.dailyCap){toast('بلغتَ حدّ اليوم من الإعلانات');return}
    if(adWait()>0){toast('انتظر قليلًا قبل الإعلان التالي');return}
    Promise.resolve().then(runAd).then(function(r){
      if(r&&r.rewarded){const x=adS();x.n++;x.t=Date.now();let m;
        if(kind==='freeze'){x.fz=1;S.freeze=(S.freeze||0)+1;m='حصلتَ على تجميد سلسلة مجاني'}
        else if(kind==='boost'){x.bs=1;S.boost=Math.max(Date.now(),S.boost||0)+1800*1000;m='مضاعف ×2 لمدة 30 دقيقة'}
        else{S.xp+=ADS_CFG.reward;m='+'+ADS_CFG.reward+' نقطة، شكرًا لك'}
        save();try{SND.coin()}catch(e){}renderTop();toast(m);renderShop()}
      else toast('لم تُكمل الإعلان، لا مكافأة');
    }).catch(function(){toast('تعذّر عرض الإعلان')});
  }
  /* ---- الشراء والاستخدام ---- */
  let bundleBefore=null,hpBefore=5;
  function buy(id){
    const it=ITEMS.find(function(x){return x.id===id});if(!it)return;
    if(it.k==='own'&&owned(id))return;
    const PR=priceOf(it);if(S.xp<PR){toast('ينقصك '+N(PR-S.xp)+' نقطة');return}
    if(id==='freeze'&&(S.freeze||0)>=3){toast('لديك الحد الأقصى: 3');return}
    if(id==='hp:full'&&hpNow()>=5){toast('قلوبك ممتلئة');return}
    if(id==='bundle:starter'&&(S.freeze||0)>=3){toast('لديك الحد الأقصى من التجميد');return}
    askBuy(it,function(){
      const PR=priceOf(it);if(S.xp<PR){toast('ينقصك '+N(PR-S.xp)+' نقطة');return}
      if(it.k==='own'&&owned(id))return;
      S.xp-=PR;
      if(id==='freeze')S.freeze=(S.freeze||0)+1;
      else if(id==='boost')S.boost=Math.max(Date.now(),S.boost||0)+3600*1000;
      else if(id==='bundle:starter'){bundleBefore={f:S.freeze||0,b:S.boost||0};S.freeze=Math.min(3,(S.freeze||0)+2);S.boost=Math.max(Date.now(),S.boost||0)+3600*1000}
      else if(id==='hp:full'){hpBefore=hpNow();hpSet(5)}
      else own()[id]=1;
      save();try{SND.coin()}catch(e){}renderTop();toast('تم الشراء');renderShop();
      showUndo('اشتريت «'+it.t+'»',function(){
        S.xp+=PR;
        if(id==='freeze')S.freeze=Math.max(0,(S.freeze||0)-1);
        else if(id==='boost')S.boost=Math.max(Date.now(),(S.boost||0)-3600*1000);
        else if(id==='bundle:starter'&&bundleBefore){S.freeze=bundleBefore.f;S.boost=bundleBefore.b}
        else if(id==='hp:full'){hpSet(hpBefore)}
        else{delete own()[id];if(it.eq==='title'&&S.title===it.v)S.title='';if(it.eq==='qbg'&&S.qbg===it.v)S.qbg='';if(it.eq==='hat'&&S.hat===it.v)S.hat='';if(it.eq==='face'&&S.face===it.v)S.face='';if(it.eq==='neck'&&S.neck===it.v)S.neck=''}
        save();renderTop();toast('أُعيدت '+N(PR)+' نقطة');renderShop();
      });
    });
  }
  /* نافذة تأكيد داخل التطبيق (confirm() قد تُحجب في الغلاف) */
  function askBuy(it,ok,price){
    let m=document.getElementById('buyconf');
    if(!m){m=document.createElement('div');m.id='buyconf';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');document.body.appendChild(m)}
    m.innerHTML='<div class="bc-card"><div class="bc-t">تأكيد الشراء</div><p>شراء «'+esc(it.t)+'» مقابل '+N(price||priceOf(it))+' نقطة؟</p><div class="bc-b"><button class="btn ghost sm" data-bc="no">إلغاء</button><button class="btn sm" data-bc="yes">شراء</button></div></div>';
    m.hidden=false;
    m.onclick=function(e){
      const b=e.target.closest('button[data-bc]');if(!b)return;
      m.hidden=true;if(b.dataset.bc==='yes')ok();
    };
  }
  function equip(id){
    const it=ITEMS.find(function(x){return x.id===id});if(!it||!isOwned(it))return;
    if(it.eq==='hat'){S.hat=(S.hat===it.v)?'':it.v;save();renderTop()}
    else if(it.eq==='face'){S.face=(S.face===it.v)?'':it.v;save();renderTop()}
    else if(it.eq==='neck'){S.neck=(S.neck===it.v)?'':it.v;save();renderTop()}
    else if(it.eq==='title'){S.title=(S.title===it.v)?'':it.v;save()}
    else if(it.eq==='qbg'){S.qbg=(S.qbg===it.v)?'':it.v;save()}
    else if(it.eq==='pal'){S.pal=it.v;save();applyTheme()}
    else if(it.eq==='spv'){S.spv=it.v;save();try{showSplash(it.v)}catch(e){}}
    renderShop();
  }
  function equipped(it){
    if(it.eq==='hat')return (S.hat||'')===it.v;
    if(it.eq==='face')return (S.face||'')===it.v;
    if(it.eq==='neck')return (S.neck||'')===it.v;
    if(it.eq==='title')return (S.title||'')===it.v;
    if(it.eq==='qbg')return (S.qbg||'')===it.v;
    if(it.eq==='pal')return (S.pal||'green')===it.v;
    if(it.eq==='spv')return (S.spv||'b')===it.v;
    return false;
  }
  /* ---- الواجهة ---- */
  function preview(it){
    const keep={hat:S.hat,face:S.face,neck:S.neck};
    S.hat='';S.face='';S.neck='';
    if(it.eq==='hat')S.hat=it.v;else if(it.eq==='face')S.face=it.v;else if(it.eq==='neck')S.neck=it.v;
    let h='';try{h=hoopoe('happy',60)}catch(e){h=it.ic||''}
    S.hat=keep.hat;S.face=keep.face;S.neck=keep.neck;
    return h;
  }
  /* ---- متجر v2: تبويبات + عرض اليوم + غرفة تجربة ---- */
  let SHOPTAB='all',TRY=null;
  const TABS=[['all','الكل'],['boost','مساعدات'],['hoopoe','الهدهد'],['titles','ألقاب'],['colors','الألوان'],['qbg','خلفيات'],['screens','الشاشات'],['mine','مقتنياتي']];
  function tabOf(it){return it.sec==='الهدهد'?'hoopoe':it.sec==='ألوان التطبيق'?'colors':it.sec==='شاشة الدخول'?'screens':it.sec==='الألقاب'?'titles':it.sec==='خلفيات الأسئلة'?'qbg':'boost'}
  function dealItem(){
    const pool=ITEMS.filter(function(i){return i.k==='own'});
    let h=0;const d=today();for(let k=0;k<d.length;k++)h=(h*31+d.charCodeAt(k))>>>0;
    const it=pool[h%pool.length];return isOwned(it)?null:it;
  }
  function priceOf(it){const d=dealItem();return (d&&d.id===it.id)?Math.max(5,Math.round(it.p*0.7/5)*5):it.p}
  function outfitSvg(size){
    const keep={hat:S.hat,face:S.face,neck:S.neck};
    if(TRY){const t=ITEMS.find(function(x){return x.id===TRY});
      if(t){if(t.eq==='hat')S.hat=t.v;else if(t.eq==='face')S.face=t.v;else if(t.eq==='neck')S.neck=t.v}}
    let h='';try{h=hoopoe('happy',size)}catch(e){h=''}
    S.hat=keep.hat;S.face=keep.face;S.neck=keep.neck;return h;
  }
  function tickets(it){
    const b=[];const d=dealItem();
    if(d&&d.id===it.id)b.push('<span class="sbadge deal">عرض اليوم −30%</span>');
    if(isOwned(it))b.push('<span class="sbadge own">'+(equipped(it)?'مُستخدَم':'مملوك')+'</span>');
    return b.join('');
  }
  function rar(it){return it.p<=100?['عادي','r1']:it.p<=150?['مميّز','r2']:it.p<=250?['نادر','r3']:['ملكي','r4']}
  function art(it){
    if(it.eq==='qbg')return '<div class="shi big sw qb" style="--sw:radial-gradient(circle at 50% 0,rgba(242,201,76,.3),transparent 65%),'+it.col+';background:'+it.col+'"><i></i><i></i></div>';
    if(it.col)return '<div class="shi big sw" style="--sw:'+it.col+';background:'+it.col+'"></div>';
    if(it.eq==='title')return '<div class="shi big ttl"><span>'+esc(it.t)+'</span></div>';
    if(it.eq==='hat'||it.eq==='face'||it.eq==='neck')return '<div class="shi big">'+preview(it)+'</div>';
    if(it.id==='hp:full')return '<div class="shi big hp">'+IC.heart+'</div>';
    return '<div class="shi big">'+icoSvg(it.ic)+'</div>';
  }
  function card(it){
    let btn,tryb='';
    const own_=it.k==='own'&&isOwned(it),rr=rar(it);
    if(own_)btn=equipped(it)?(it.eq==='pal'||it.eq==='spv'?'<button class="btn sm ghost" disabled>مُستخدَم</button>':'<button class="btn sm ghost" data-shop="eq:'+it.id+'">إزالة</button>'):'<button class="btn sm gold" data-shop="eq:'+it.id+'">استخدم</button>';
    else{
      const pr=priceOf(it),lack=S.xp<pr,d=dealItem();
      btn='<button class="btn sm price'+(lack?' ghost':'')+'" data-shop="buy:'+it.id+'">'+IC.gem+((d&&d.id===it.id)?'<s class="old">'+N(it.p)+'</s>':'')+'<b>'+N(pr)+'</b></button>';
      if(it.eq==='hat'||it.eq==='face'||it.eq==='neck')tryb='<button class="btn sm ghost" data-shop="try:'+it.id+'" aria-pressed="'+(TRY===it.id)+'">'+(TRY===it.id?'إيقاف التجربة':'جرّب')+'</button>';
    }
    let st='';
    if(it.id==='freeze')st='<small class="muted">لديك: '+N(S.freeze||0)+' / 3</small>';
    if(it.id==='boost'&&boostLeft()>0)st='<small class="muted">فعّال: '+N(Math.ceil(boostLeft()/60000))+' دقيقة</small>';
    if(it.id==='hp:full')st='<small class="muted">قلوبك: '+N(hpNow())+' / 5</small>';
    return '<div class="card shopit v2 '+rr[1]+(own_?' owned':'')+'">'+tickets(it)+(it.k==='own'&&!own_?'<span class="rar">'+rr[0]+'</span>':'')+art(it)+'<b class="sname">'+esc(it.t)+'</b><small class="sdesc">'+esc(it.d)+'</small>'+st+'<div class="sact">'+tryb+btn+'</div></div>';
  }
  /* ---- هدفك القادم + استرجاع السلسلة + تراجع الشراء ---- */
  const RESTORE_COST=100;
  function nextGoal(){
    const l=ITEMS.filter(function(i){return i.k==='own'&&!isOwned(i)}).sort(function(a,b){return priceOf(a)-priceOf(b)});
    return l[0]||null;
  }
  function goalHtml(){
    const it=nextGoal();if(!it)return '';
    const pr=priceOf(it),can=S.xp>=pr,pc=Math.min(100,Math.round(S.xp/pr*100));
    return '<section class="sec"><div class="card goalcard'+(can?' can':'')+'"><div class="gl-h"><small>هدفك القادم</small><b>'+esc(it.t)+'</b></div>'+
      '<div class="pbar gold"><i style="width:'+pc+'%"></i></div>'+
      '<div class="gl-f"><span class="muted">'+(can?'يمكنك شراؤه الآن!':'باقٍ لك '+N(pr-S.xp)+' نقطة')+'</span>'+
      (can?'<button class="btn sm gold" data-shop="buy:'+it.id+'">اشترِه</button>':'<button class="btn sm" data-go="learn">تعلّم لتكسب</button>')+'</div></div></section>';
  }
  function lostStreak(){
    if(S.rsD===today())return 0;
    const d=new Date();d.setDate(d.getDate()-1);
    if(S.days[ymd(d)])return 0;
    let c=0;d.setDate(d.getDate()-1);
    while(S.days[ymd(d)]){c++;d.setDate(d.getDate()-1)}
    return c>=2?c:0;
  }
  function restoreHtml(){
    const n=lostStreak();if(!n)return '';
    const can=S.xp>=RESTORE_COST;
    return '<section class="sec" id="rscard"><div class="card restorecard"><div class="gl-h"><small>انقطعت سلسلتك أمس</small><b>استرجع سلسلة '+N(n)+' يومًا</b></div>'+
      '<p class="muted" style="margin:0;font-size:.9rem">متاح اليوم فقط. تُحتسب أمس كيوم نشاط وتتصل سلسلتك من جديد.</p>'+
      '<button class="btn sm'+(can?' gold':' ghost')+'" data-shop="restore">'+(can?'استرجع مقابل '+N(RESTORE_COST)+' نقطة':'ينقصك '+N(RESTORE_COST-S.xp)+' نقطة')+'</button></div></section>';
  }
  function doRestore(){
    const n=lostStreak();if(!n)return;
    if(S.xp<RESTORE_COST){toast('ينقصك '+N(RESTORE_COST-S.xp)+' نقطة');return}
    askBuy({t:'استرجاع سلسلة '+n+' يومًا'},function(){
      if(S.xp<RESTORE_COST||!lostStreak())return;
      const d=new Date();d.setDate(d.getDate()-1);
      S.xp-=RESTORE_COST;S.days[ymd(d)]=1;S.rsD=today();S.max=Math.max(S.max||0,streak());
      save();try{SND.win()}catch(e){}renderTop();toast('عادت سلسلتك: '+N(streak())+' يومًا');
      if(TAB==='shop')renderShop();else if(TAB==='home'){try{renderPage()}catch(e){}}
    },RESTORE_COST);
  }
  let UNDO=null,undoT=0;
  const _sl=startLesson;startLesson=function(){const b=document.getElementById('buyundo');if(b)b.hidden=true;UNDO=null;return _sl.apply(this,arguments)};
  function showUndo(label,fn){
    UNDO=fn;clearTimeout(undoT);
    let b=document.getElementById('buyundo');
    if(!b){b=document.createElement('div');b.id='buyundo';b.setAttribute('role','status');document.body.appendChild(b)}
    b.innerHTML='<span>'+esc(label)+'</span><button data-undo="1">تراجع</button>';b.hidden=false;
    undoT=setTimeout(function(){b.hidden=true;UNDO=null},10000);
  }
  function titleText(){const it=ITEMS.find(function(x){return x.id==='title:'+(S.title||'_')});return it?it.t:''}
  window.nfTitle=titleText;
  function giftState(){const n=Math.min(40,10+streak()*2);return {can:S.gift!==today(),n:n}}
  function claimGift(){
    const g=giftState();if(!g.can){toast('استلمتَ هدية اليوم');return}
    S.gift=today();S.xp+=g.n;save();try{SND.coin()}catch(e){}renderTop();toast('+'+N(g.n)+' نقطة، هدية اليوم');renderShop();
  }
  function dealLeft(){const n=new Date(),m=new Date(n);m.setHours(24,0,0,0);const t=Math.max(0,Math.floor((m-n)/60000));return N(Math.floor(t/60))+'س '+N(t%60)+'د'}
  function pageShop(){
    migrate();
    const a=adS(),ready=adOK(),left=ADS_CFG.dailyCap-a.n,deal=dealItem();
    const tryIt=TRY&&ITEMS.find(function(x){return x.id===TRY});
    const tl=titleText(),gift=giftState();
    function chip(ic,v,l){return '<span class="hch" title="'+l+'">'+ic+'<b>'+v+'</b></span>'}
    let h='<section class="sec" style="margin-top:16px"><div class="shp-hero"><div class="hr-art"><div class="fr-glow"></div>'+outfitSvg(112)+'</div>'+
      '<div class="hr-main"><small>رصيدك</small><div class="hr-bal">'+IC.gem+'<b>'+N(S.xp)+'</b><span>نقطة</span></div>'+
      (tl?'<span class="hr-title">'+esc(tl)+'</span>':'')+
      '<div class="hr-chips">'+chip(icoSvg('🔥'),N(streak()),'السلسلة')+chip(icoSvg('❄'),N(S.freeze||0)+'/3','تجميد السلسلة')+chip(IC.heart,N(hpNow())+'/5','القلوب')+(boostLeft()>0?chip(icoSvg('⚡'),'×2 '+N(Math.ceil(boostLeft()/60000))+'د','المضاعف'):'')+'</div></div>'+
      '<div class="hr-note">'+(tryIt?'تجرّب الآن: '+esc(tryIt.t)+' (للمعاينة فقط)':'اضغط «جرّب» على أي إكسسوار لتراه على هدهدك')+'</div>'+
      '<button class="hr-gift'+(gift.can?'':' done')+'" data-shop="gift"'+(gift.can?'':' disabled')+'>'+(gift.can?'🎁 هديتك اليوم: +'+N(gift.n)+' نقطة · استلمها':'تم استلام هدية اليوم · عُد غدًا')+'</button></div></section>';
    h+=restoreHtml()+goalHtml();
    h+='<div class="seg shoptabs" role="tablist">'+TABS.map(function(t){return '<button role="tab" aria-selected="'+(SHOPTAB===t[0])+'" class="'+(SHOPTAB===t[0]?'on':'')+'" data-shop="tab:'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div>';
    if(SHOPTAB==='all'&&deal){
      h+='<section class="sec"><h2>عرض اليوم</h2><div class="dealbox"><div class="dealtag">خصم 30% · ينتهي خلال '+dealLeft()+'</div>'+card(deal)+'</div></section>';
    }
    if(SHOPTAB==='all'||SHOPTAB==='boost'){
      h+='<section class="sec"><h2>اكسب نقاطًا</h2><div style="display:grid;gap:10px"><div class="card shopit"><div class="shi">▶</div><div class="shd"><b>شاهد إعلانًا قصيرًا</b><small>+'+ADS_CFG.reward+' نقطة'+(ready?' · المتبقي اليوم: '+N(Math.max(0,left))+'':'')+'</small></div>'+
        (ready?'<button class="btn sm gold" data-shop="ad">شاهد</button>':'<button class="btn sm ghost" disabled>'+(S.kids?'للكبار':'قريبًا')+'</button>')+'</div>'+
        (ready?'<div class="card shopit"><div class="shi">❄</div><div class="shd"><b>تجميد سلسلة مجاني</b><small>مرة كل يوم'+(a.fz?' · أُخذ اليوم':'')+'</small></div><button class="btn sm gold" data-shop="ad:freeze" '+(a.fz?'disabled':'')+'>شاهد</button></div><div class="card shopit"><div class="shi">⚡</div><div class="shd"><b>مضاعف ×2 لنصف ساعة</b><small>مرة كل يوم'+(a.bs?' · أُخذ اليوم':'')+'</small></div><button class="btn sm gold" data-shop="ad:boost" '+(a.bs?'disabled':'')+'>شاهد</button></div>':'')+
        '<button class="card shopit" data-go="learn"><div class="shi">★</div><div class="shd"><b>تعلّم لتكسب</b><small>كل مرحلة تُتمّها تمنحك 15 نقطة</small></div><span class="btn sm">ابدأ</span></button></div></section>';
    }
    if(SHOPTAB==='mine'){
      const mine=ITEMS.filter(function(i){return isOwned(i)});
      h+='<section class="sec"><h2>مقتنياتي</h2>'+(mine.length?'<div class="shopgrid">'+mine.map(card).join('')+'</div>':
        (typeof emptyBox==='function'?emptyBox('happy','لا مقتنيات بعد','اشترِ أول إكسسوار للهدهد من تبويب «الهدهد»، وسيظهر هنا.'):'<p class="muted">لا مقتنيات بعد.</p>'))+
        '<div class="card" style="margin-top:12px;display:grid;gap:4px"><b>رصيد المساعدات</b><small class="muted">تجميد السلسلة: '+N(S.freeze||0)+' / 3 · المضاعف: '+(boostLeft()>0?N(Math.ceil(boostLeft()/60000))+' دقيقة':'غير فعّال')+'</small></div></section>';
    }else{
      const groups=[['مساعدات','boost'],['الهدهد','hoopoe'],['ألقاب','titles'],['ألوان التطبيق','colors'],['خلفيات الأسئلة','qbg'],['شاشة الدخول','screens']];
      groups.forEach(function(g){
        if(SHOPTAB!=='all'&&SHOPTAB!==g[1])return;
        const list=ITEMS.filter(function(i){return tabOf(i)===g[1]});if(!list.length)return;
        h+='<section class="sec"><h2>'+esc(g[0])+'</h2><div class="shopgrid">'+list.map(card).join('')+'</div></section>';
      });
    }
    h+='<p class="muted" style="font-size:.85rem;margin:14px 4px 90px">جميع المشتريات بالنقاط فقط ولا تتطلب مالًا، وتُحفظ على جهازك. تتجدد هدية اليوم وعرض اليوم كل يوم.</p>';
    $('#page').innerHTML='<h1 class="sr">المتجر</h1><div class="shp">'+h+'</div>';
  }
  function renderShop(){if(TAB==='shop')pageShop()}
  const _rp=renderPage;
  renderPage=function(){
    if(TAB==='shop'){if(pageTimer){clearInterval(pageTimer);pageTimer=0}return pageShop()}
    return _rp();
  };
  /* بطاقة المتجر في الرئيسية + زر حقيبة في الشريط العلوي */
  const _ph=pageHome;
  pageHome=function(){
    _ph();
    const pg=document.getElementById('page');if(!pg||document.getElementById('shopcard'))return;
    const sec=document.createElement('section');sec.className='sec';sec.id='shopcard';
    sec.innerHTML='<button class="card shopit" data-go="shop"><div class="shi"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg></div><div class="shd"><b>المتجر</b><small>اشترِ إكسسوارات للهدهد وألوانًا بنقاطك: '+N(S.xp)+' نقطة</small></div><span class="btn sm gold">افتح</span></button>';
    const first=pg.querySelector('section.sec');
    if(first)pg.insertBefore(sec,first);else pg.appendChild(sec);
  };
  /* زر النقاط في الشريط العلوي يفتح المتجر */
  const _rt=renderTop;
  renderTop=function(){
    _rt();
    const c=document.querySelector('#top .chip[title="نقاط"]');
    if(c){const b=document.createElement('button');b.className='chip shopchip';b.setAttribute('data-go','shop');b.setAttribute('aria-label','المتجر');b.innerHTML=c.innerHTML+'<span aria-hidden="true" style="margin-inline-start:4px;display:inline-flex"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg></span>';c.replaceWith(b)}
  };
  /* قفل العناصر غير المملوكة في الإعدادات + أزرار المتجر (مرحلة الالتقاط ليسبق المعالجات القديمة) */
  document.addEventListener('click',function(e){
    const t=e.target;if(!t||!t.closest)return;
    const p=t.closest('button[data-pal]');
    if(p){const v=p.getAttribute('data-pal');if(v!=='green'&&!owned('pal:'+v)){e.stopImmediatePropagation();e.preventDefault();toast('اشترِ هذا اللون من المتجر');return}}
    const s=t.closest('button[data-spv]');
    if(s){const v=s.getAttribute('data-spv');if(v!=='b'&&!owned('spv:'+v)){e.stopImmediatePropagation();e.preventDefault();toast('اشترِ هذه الشاشة من المتجر');return}}
    const h=t.closest('button[data-xhat]');
    if(h){const v=h.getAttribute('data-xhat');if(v&&!owned('hat:'+v)){e.stopImmediatePropagation();e.preventDefault();toast('اشترِ هذا الإكسسوار من المتجر');return}}
    const u=t.closest('button[data-undo]');if(u){e.stopImmediatePropagation();const f=UNDO;UNDO=null;clearTimeout(undoT);const bx=document.getElementById('buyundo');if(bx)bx.hidden=true;if(f)f();return}
    const b=t.closest('button[data-shop]');if(!b)return;
    const v=b.dataset.shop,a=v.split(':')[0],id=v.split(':').slice(1).join(':');
    if(a==='tab'){SHOPTAB=id;return renderShop()}
    if(a==='try'){TRY=(TRY===id)?null:id;return renderShop()}
    if(a==='ad')return watchAd(id);
    if(a==='buy')return buy(id);
    if(a==='restore')return doRestore();
    if(a==='gift')return claimGift();
    if(a==='eq')return equip(id);
  },true);
  /* إكسسوارات الإعدادات القديمة: القفل بالملكية لا بالرصيد */
  const _es=extraSettings;
  extraSettings=function(){
    migrate();
    return _es().replace(/(<button class="tag" data-xhat="[^"]*" aria-pressed="[^"]*") disabled>/g,'$1>');
  };

  const st=document.createElement('style');
  st.textContent='.goalcard,.restorecard{display:grid;gap:8px;border-color:var(--gold)}.gl-h{display:grid;gap:2px}.gl-h small{color:var(--muted);font-size:.8rem}.gl-h b{font:700 1.1rem var(--display)}.gl-f{display:flex;align-items:center;justify-content:space-between;gap:10px}.goalcard.can{background:color-mix(in srgb,var(--gold) 14%,var(--surface))}'+
   '#buyundo{position:fixed;inset-inline:12px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:80;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 14px;border-radius:16px;background:#0B2A1E;color:#FAF1CC;border:2px solid #F2C94C;box-shadow:0 8px 24px rgba(0,0,0,.35);font:700 .95rem var(--text)}#buyundo[hidden]{display:none}#buyundo button{border:0;border-radius:99px;padding:6px 16px;background:#F2C94C;color:#1C1503;font:800 .9rem var(--text)}';
  document.head.appendChild(st);

  const st2=document.createElement('style');
  st2.textContent='.shp-hero{position:relative;display:grid;grid-template-columns:auto 1fr;gap:6px 14px;align-items:center;padding:16px;border-radius:26px;color:#FAF1CC;border:2px solid #E2B94E;background:radial-gradient(90% 120% at 100% 0,rgba(242,201,76,.22),transparent 60%),linear-gradient(160deg,#0F3B3A,#0A2A22);box-shadow:0 10px 26px rgba(8,31,22,.28)}'+
   '.shp-hero .hr-art{position:relative;width:112px;height:112px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.06);border:2px solid rgba(226,185,78,.55)}.shp-hero .fr-glow{opacity:.6}'+
   '.hr-main{display:grid;gap:6px;min-width:0}.hr-main small{color:#D8C98F;font-size:.82rem}.hr-bal{display:flex;align-items:center;gap:8px;font:800 2rem/1 var(--display)}.hr-bal svg{width:26px;height:26px;color:#F2C94C}.hr-bal span{font-size:.95rem;font-weight:600;color:#D8C98F}'+
   '.hr-title{justify-self:start;padding:2px 12px;border-radius:99px;background:#F2C94C;color:#1C1503;font:800 .8rem var(--display)}'+
   '.hr-chips{display:flex;flex-wrap:wrap;gap:6px}.hch{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:99px;background:rgba(255,255,255,.09);border:1px solid rgba(226,185,78,.35);font-size:.82rem}.hch svg{width:15px;height:15px;color:#F2C94C}.hch b{font-variant-numeric:tabular-nums}'+
   '.hr-note{grid-column:1/-1;font-size:.82rem;color:#CFC38E;text-align:center}'+
   '.hr-gift{grid-column:1/-1;border:0;border-radius:16px;padding:11px 14px;font:800 .98rem var(--display);color:#1C1503;background:linear-gradient(180deg,#F8DD76,#E2B531);box-shadow:0 4px 0 #9B7410;cursor:pointer}.hr-gift.done{background:rgba(255,255,255,.1);color:#CFC38E;box-shadow:none;cursor:default}'+
   '.shp .shoptabs{position:sticky;top:calc(env(safe-area-inset-top,0px) + 4px);z-index:5;scroll-snap-type:x proximity;box-shadow:0 6px 12px -8px rgba(0,0,0,.35)}.shp .shoptabs button{scroll-snap-align:center}'+
   '.shp .sec h2{display:flex;align-items:center;gap:8px}'+
   '.shp .shopit.v2{position:relative;border-width:2px}.shp .shopit.v2.r2{border-color:color-mix(in srgb,#3FBF8A 55%,var(--line))}.shp .shopit.v2.r3{border-color:color-mix(in srgb,var(--gold) 70%,var(--line))}.shp .shopit.v2.r4{border-color:var(--gold);box-shadow:0 0 0 2px color-mix(in srgb,var(--gold) 30%,transparent),0 8px 22px color-mix(in srgb,var(--gold) 24%,transparent);background:linear-gradient(180deg,color-mix(in srgb,var(--gold) 12%,var(--surface)),var(--surface))}'+
   '.shp .shopit.v2.owned{opacity:.96}.rar{position:absolute;top:8px;inset-inline-end:8px;font:800 .66rem var(--display);padding:2px 8px;border-radius:99px;border:1px solid currentColor;color:var(--muted);background:var(--surface)}.r2 .rar{color:#1E8A5E}.r3 .rar{color:var(--gold-d,#8A5A00)}.r4 .rar{color:#fff;background:linear-gradient(135deg,#C8921B,#8A5A00);border-color:transparent}'+
   '.btn.price{display:inline-flex;align-items:center;justify-content:center;gap:6px}.btn.price svg{width:16px;height:16px}.btn.price .old{opacity:.65;font-size:.8em}'+
   '.shp .shopit.v2 .shi.ttl{width:100%;max-width:150px;display:grid;place-items:center;background:linear-gradient(135deg,#0F3B3A,#0A2A22)!important;color:#F2C94C;border:2px solid #E2B94E;font:800 .95rem var(--display);padding:0 10px;text-align:center}'+
   '.shp .shopit.v2 .shi.qb{position:relative;overflow:hidden;border:2px solid var(--line)}.shi.qb i{position:absolute;inset-inline:14%;height:12px;border-radius:99px;background:rgba(242,201,76,.5)}.shi.qb i:first-child{bottom:30%}.shi.qb i:last-child{bottom:12%;inset-inline:30%;background:rgba(255,255,255,.25)}'+
   '.shi.hp{color:#E0453A;display:grid;place-items:center}.shi.hp svg{width:42px;height:42px}'+
   '.dealbox .dealtag{font-variant-numeric:tabular-nums}';
  document.head.appendChild(st2);
  migrate();
  try{if(location.hash==='#shop'){TAB='shop';renderNav();renderPage()}}catch(e){}
  try{renderTop()}catch(e){}
  window.NF_SHOP={watchAd:watchAd,items:ITEMS,cfg:ADS_CFG,restoreCard:restoreHtml};
})();
/* أيقونات خطية موحّدة بدل الإيموجي */
function icoSvg(e){
  const P={
    '⚡':'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    '✦':'<rect x="5" y="5" width="14" height="14" rx="1"/><rect x="5" y="5" width="14" height="14" rx="1" transform="rotate(45 12 12)"/>',
    '❄':'<path d="M12 2v20M4 6l16 12M20 6 4 18"/>',
    '🎓':'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
    '📖':'<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
    '🌟':'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    '🔥':'<path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-8-2 2-3 3-4 5-1-3-1-5 1-7-4 2-7 6-7 10 0 4 3 7 6 7z"/>',
    '🔒':'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    '✅':'<path d="M20 6 9 17l-5-5"/>',
    '🌙':'<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',
    '🎯':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    '🔊':'<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
    '🎲':'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.2"/><circle cx="16" cy="16" r="1.2"/><circle cx="12" cy="12" r="1.2"/>',
    '💡':'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
    '🧭':'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11z"/>',
    '⚑':'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    '📤':'<path d="M12 15V3M7 8l5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
    '⬇':'<path d="M12 4v12M6 11l6 6 6-6"/><path d="M4 20h16"/>',
    '❄':'<path d="M12 2v20M4 6l16 12M20 6 4 18"/>'
  };
  if(!P[e])return e;
  return '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[e]+'</svg>';
}
