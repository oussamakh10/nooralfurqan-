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
    {id:'hat:fez',sec:'الهدهد',t:'طربوش',d:'إكسسوار للهدهد',p:100,k:'own',ic:'🎩',eq:'hat',v:'fez'},
    {id:'hat:turban',sec:'الهدهد',t:'عمامة',d:'غطاء رأس للهدهد',p:150,k:'own',ic:'🧕',eq:'hat',v:'turban'},
    {id:'hat:cap',sec:'الهدهد',t:'قبعة التخرج',d:'غطاء رأس للهدهد',p:300,k:'own',ic:'🎓',eq:'hat',v:'cap'},
    {id:'hat:crown',sec:'الهدهد',t:'تاج',d:'غطاء رأس للهدهد',p:400,k:'own',ic:'👑',eq:'hat',v:'crown'},
    {id:'face:glasses',sec:'الهدهد',t:'نظارة',d:'للوجه، تُلبس مع أي غطاء رأس',p:200,k:'own',ic:'👓',eq:'face',v:'glasses'},
    {id:'neck:scarf',sec:'الهدهد',t:'وشاح أخضر',d:'للعنق، يُلبس مع الباقي',p:150,k:'own',ic:'🧣',eq:'neck',v:'scarf'},
    {id:'pal:gold',sec:'ألوان التطبيق',t:'ذهبي',d:'لون التطبيق',p:120,k:'own',col:'#A8730A',eq:'pal',v:'gold'},
    {id:'pal:ocean',sec:'ألوان التطبيق',t:'أزرق',d:'لون التطبيق',p:120,k:'own',col:'#1C7E9E',eq:'pal',v:'ocean'},
    {id:'pal:rose',sec:'ألوان التطبيق',t:'وردي',d:'لون التطبيق',p:120,k:'own',col:'#B8456B',eq:'pal',v:'rose'},
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
  function adWait(){const a=adS();return Math.max(0,((a.t||0)+ADS_CFG.cooldown*1000-Date.now())/1000)}
  function runAd(){
    if(window.NF_ADS&&typeof window.NF_ADS.show==='function')return window.NF_ADS.show(ADS_CFG.place);
    return new Promise(function(res){/* إعلان تجريبي */
      const o=document.createElement('div');o.className='adsim';let s=3;
      o.innerHTML='<div><b>إعلان تجريبي</b><p>سينتهي خلال <span id="adsn">3</span> ثوانٍ…</p></div>';document.body.appendChild(o);
      const iv=setInterval(function(){s--;const e=document.getElementById('adsn');if(e)e.textContent=s;if(s<=0){clearInterval(iv);o.remove();res({rewarded:true})}},1000);
    });
  }
  function watchAd(){
    const a=adS();
    if(!adReady()){toast('الإعلانات غير متاحة حاليًا');return}
    if(a.n>=ADS_CFG.dailyCap){toast('بلغتَ حدّ اليوم من الإعلانات');return}
    if(adWait()>0){toast('انتظر قليلًا قبل الإعلان التالي');return}
    Promise.resolve().then(runAd).then(function(r){
      if(r&&r.rewarded){const x=adS();x.n++;x.t=Date.now();S.xp+=ADS_CFG.reward;save();try{SND.coin()}catch(e){}renderTop();toast('+'+ADS_CFG.reward+' نقطة، شكرًا لك');renderShop()}
      else toast('لم تُكمل الإعلان، لا مكافأة');
    }).catch(function(){toast('تعذّر عرض الإعلان')});
  }
  /* ---- الشراء والاستخدام ---- */
  function buy(id){
    const it=ITEMS.find(function(x){return x.id===id});if(!it)return;
    if(it.k==='own'&&owned(id))return;
    if(S.xp<it.p){toast('ينقصك '+N(it.p-S.xp)+' نقطة');return}
    if(id==='freeze'&&(S.freeze||0)>=3){toast('لديك الحد الأقصى: 3');return}
    askBuy(it,function(){
      if(S.xp<it.p){toast('ينقصك '+N(it.p-S.xp)+' نقطة');return}
      if(it.k==='own'&&owned(id))return;
      S.xp-=it.p;
      if(id==='freeze')S.freeze=(S.freeze||0)+1;
      else if(id==='boost')S.boost=Math.max(Date.now(),S.boost||0)+3600*1000;
      else own()[id]=1;
      save();try{SND.coin()}catch(e){}renderTop();toast('تم الشراء');renderShop();
    });
  }
  /* نافذة تأكيد داخل التطبيق (confirm() قد تُحجب في الغلاف) */
  function askBuy(it,ok){
    let m=document.getElementById('buyconf');
    if(!m){m=document.createElement('div');m.id='buyconf';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');document.body.appendChild(m)}
    m.innerHTML='<div class="bc-card"><div class="bc-t">تأكيد الشراء</div><p>شراء «'+esc(it.t)+'» مقابل '+N(it.p)+' نقطة؟</p><div class="bc-b"><button class="btn ghost sm" data-bc="no">إلغاء</button><button class="btn sm" data-bc="yes">شراء</button></div></div>';
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
    else if(it.eq==='pal'){S.pal=it.v;save();applyTheme()}
    else if(it.eq==='spv'){S.spv=it.v;save();try{showSplash(it.v)}catch(e){}}
    renderShop();
  }
  function equipped(it){
    if(it.eq==='hat')return (S.hat||'')===it.v;
    if(it.eq==='face')return (S.face||'')===it.v;
    if(it.eq==='neck')return (S.neck||'')===it.v;
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
  function card(it){
    let btn;
    if(it.k==='own'&&isOwned(it))btn=equipped(it)?(it.eq==='pal'||it.eq==='spv'?'<button class="btn sm ghost" disabled>مُستخدَم ✓</button>':'<button class="btn sm ghost" data-shop="eq:'+it.id+'">إزالة ✓</button>'):'<button class="btn sm gold" data-shop="eq:'+it.id+'">استخدم</button>';
    else{
      const lack=S.xp<it.p;
      btn='<button class="btn sm'+(lack?' ghost':'')+'" data-shop="buy:'+it.id+'">'+N(it.p)+' نقطة</button>';
    }
    let st='';
    if(it.id==='freeze')st='<small class="muted">لديك: '+N(S.freeze||0)+' / 3</small>';
    if(it.id==='boost'&&boostLeft()>0)st='<small class="muted">فعّال: '+N(Math.ceil(boostLeft()/60000))+' دقيقة</small>';
    return '<div class="card shopit"><div class="shi" '+(it.col?'style="background:'+it.col+'"':'')+'>'+(it.col?'':((it.eq==='hat'||it.eq==='face'||it.eq==='neck')?preview(it):it.ic))+'</div><div class="shd"><b>'+esc(it.t)+'</b><small>'+esc(it.d)+'</small>'+st+'</div>'+btn+'</div>';
  }
  function pageShop(){
    migrate();
    const a=adS(),ready=adReady(),left=ADS_CFG.dailyCap-a.n;
    let h='<section class="sec" style="margin-top:16px"><div class="card shopbal"><div>'+IC.gem+'</div><div><b>'+N(S.xp)+' نقطة</b><small class="muted">تجمعها من الإجابة الصحيحة في دروس تعلّم والألعاب</small><small class="muted">كل مرحلة تُتمّها في «تعلّم» تمنحك +15 نقطة إضافية</small>'+
      (boostLeft()>0?'<small class="sch-good">مضاعف ×2 فعّال: '+N(Math.ceil(boostLeft()/60000))+' دقيقة</small>':'')+'</div></div></section>'+
      '<section class="sec"><h2>اكسب نقاطًا</h2><div style="display:grid;gap:10px"><div class="card shopit"><div class="shi">▶</div><div class="shd"><b>شاهد إعلانًا قصيرًا</b><small>+'+ADS_CFG.reward+' نقطة'+(ready?' · المتبقي اليوم: '+N(Math.max(0,left)):'')+'</small></div>'+
      (ready?'<button class="btn sm gold" data-shop="ad">شاهد</button>':'<button class="btn sm ghost" disabled>قريبًا</button>')+'</div>'+
      '<button class="card shopit" data-go="learn"><div class="shi">★</div><div class="shd"><b>تعلّم لتكسب</b><small>كل إجابة صحيحة تمنحك نقاطًا</small></div><span class="btn sm">ابدأ</span></button></div></section>';
    const secs=[];ITEMS.forEach(function(it){if(secs.indexOf(it.sec)<0)secs.push(it.sec)});
    secs.forEach(function(s){h+='<section class="sec"><h2>'+esc(s)+'</h2><div style="display:grid;gap:10px">'+ITEMS.filter(function(i){return i.sec===s}).map(card).join('')+'</div></section>'});
    h+='<p class="muted" style="font-size:.85rem;margin:14px 4px 90px">المشتريات بالنقاط فقط ولا تتطلب مالًا، وتُحفظ في جهازك.</p>';
    $('#page').innerHTML=h;
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
    const b=t.closest('button[data-shop]');if(!b)return;
    const v=b.dataset.shop,a=v.split(':')[0],id=v.split(':').slice(1).join(':');
    if(a==='ad')return watchAd();
    if(a==='buy')return buy(id);
    if(a==='eq')return equip(id);
  },true);
  /* إكسسوارات الإعدادات القديمة: القفل بالملكية لا بالرصيد */
  const _es=extraSettings;
  extraSettings=function(){
    migrate();
    return _es().replace(/(<button class="tag" data-xhat="[^"]*" aria-pressed="[^"]*") disabled>/g,'$1>');
  };
  migrate();
  try{if(location.hash==='#shop'){TAB='shop';renderNav();renderPage()}}catch(e){}
  try{renderTop()}catch(e){}
  window.NF_SHOP={watchAd:watchAd,items:ITEMS,cfg:ADS_CFG};
})();
