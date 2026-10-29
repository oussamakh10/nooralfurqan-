/* ===== نظام القلوب: 5 كحد أقصى، قلب كل 15 دقيقة ===== */
(function(){
  const MAX=5,REGEN=15*60*1000,PRICE1=15,PRICEALL=100,AD_GAIN=2,AD_CAP=5;
  function init(){if(typeof S.hp!=='number'||isNaN(S.hp)){S.hp=MAX;S.hpt=Date.now()}}
  function tick(){
    init();
    if(S.hp>=MAX){S.hp=MAX;S.hpt=Date.now();return}
    const n=Math.floor((Date.now()-(S.hpt||Date.now()))/REGEN);
    if(n>0){S.hp=Math.min(MAX,S.hp+n);S.hpt=S.hp>=MAX?Date.now():(S.hpt+n*REGEN);save()}
  }
  window.hpNow=function(){tick();return S.hp};
  window.hpSet=function(n){
    tick();
    if(S.hp>=MAX&&n<MAX)S.hpt=Date.now();
    S.hp=Math.max(0,Math.min(MAX,n));save();refresh();
  };
  function left(){tick();return S.hp>=MAX?0:Math.max(0,REGEN-(Date.now()-S.hpt))}
  function mmss(ms){const t=Math.ceil(ms/1000),m=Math.floor(t/60),s=t%60;return N(m)+':'+(s<10?'0':'')+N(s)}
  function adsLeft(){const a=S.hpAds&&S.hpAds.d===today()?S.hpAds:{d:today(),n:0};return AD_CAP-a.n}
  function addHp(n){tick();const was=S.hp;S.hp=Math.min(MAX,S.hp+n);if(was<MAX&&S.hp>=MAX)S.hpt=Date.now();save();refresh();try{renderTop()}catch(e){}}
  function buy(all){
    tick();
    if(S.hp>=MAX){toast('قلوبك ممتلئة');return}
    const pr=all?PRICEALL:PRICE1;
    if(S.xp<pr){toast('ينقصك '+N(pr-S.xp)+' نقطة');return}
    S.xp-=pr;addHp(all?MAX:1);try{SND.coin()}catch(e){}toast(all?'تم ملء القلوب':'تمت إضافة قلب');
  }
  function watch(){
    tick();
    if(S.hp>=MAX){toast('قلوبك ممتلئة');return}
    if(adsLeft()<=0){toast('بلغتَ حدّ إعلانات اليوم');return}
    const ads=window.NF_ADS;
    if(!ads||typeof ads.show!=='function'){toast('الإعلانات غير متاحة حاليًا');return}
    try{if(ads.ready&&!ads.ready('hearts_reward')){toast('الإعلانات غير متاحة حاليًا');return}}catch(e){toast('الإعلانات غير متاحة حاليًا');return}
    Promise.resolve(ads.show('hearts_reward')).then(function(r){
      if(r&&r.rewarded){
        const a=(S.hpAds&&S.hpAds.d===today())?S.hpAds:(S.hpAds={d:today(),n:0});a.n++;S.hpAds=a;
        addHp(AD_GAIN);toast('+'+N(AD_GAIN)+' قلب، شكرًا لك');
      }else toast('لم تُكمل الإعلان، لا مكافأة');
    }).catch(function(){toast('تعذّر عرض الإعلان')});
  }
  function row(){
    let h='';for(let i=0;i<MAX;i++)h+='<span class="hpi'+(i<S.hp?'':' off')+'">'+IC.heart+'</span>';
    return h;
  }
  function inner(){
    tick();
    const full=S.hp>=MAX,t=left();
    return '<div class="hprow" aria-label="القلوب">'+row()+'</div>'+
      '<p class="hpinfo">'+(full?'قلوبك ممتلئة':N(S.hp)+' من '+N(MAX)+' · القلب التالي بعد <b id="hptimer">'+mmss(t)+'</b>')+'</p>'+
      '<div class="hpbtns"><button class="btn sm" data-hp="b1"'+(full?' disabled':'')+'>قلب واحد · '+N(PRICE1)+' نقطة</button>'+
      '<button class="btn sm" data-hp="ball"'+(full?' disabled':'')+'>املأ الكل · '+N(PRICEALL)+' نقطة</button>'+
      '<button class="btn sm gold" data-hp="ad"'+(full?' disabled':'')+'>شاهد إعلانًا · +'+N(AD_GAIN)+' قلب</button></div>';
  }
  function refresh(){
    const c=document.getElementById('hpcard');if(c)c.innerHTML=inner();
    const m=document.getElementById('hpm');if(m&&!m.hidden){const b=m.querySelector('.hpbody');if(b)b.innerHTML=inner();if(S.hp>0){m.hidden=true}}
  }
  function modal(){
    let m=document.getElementById('hpm');
    if(!m){m=document.createElement('div');m.id='hpm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');document.body.appendChild(m)}
    m.innerHTML='<div class="bc-card"><div class="bc-t">نفدت قلوبك</div><p>انتظر قلبًا جديدًا كل 15 دقيقة، أو احصل على قلوب الآن.</p><div class="hpbody">'+inner()+'</div><button class="btn ghost sm" data-hp="close" style="margin-top:10px;width:100%">إغلاق</button></div>';
    m.hidden=false;
  }
  /* منع بدء الدرس عند نفاد القلوب */
  const sl=startLesson;
  startLesson=function(id){
    if(!S.kids){
      if(hpNow()<=0){modal();return}
    }
    sl(id);
    if(!S.kids&&L&&L.lesson&&!L.review&&!L.placement&&!L.hifzTest&&L.lesson.id!=='_review'&&String(L.lesson.id).charAt(0)!=='_'){L.main=1;L.hearts=hpNow()}
  };
  /* بطاقة القلوب أعلى صفحة التعلّم */
  const _pl=pageLearn;
  pageLearn=function(){
    _pl();
    if(S.kids)return;
    const pg=$('#page');if(!pg)return;
    const c=document.createElement('div');c.className='card hpcard';c.id='hpcard';c.innerHTML=inner();
    pg.insertBefore(c,pg.firstChild);
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest('button[data-hp]');if(!b)return;
    e.stopPropagation();
    const a=b.getAttribute('data-hp');
    if(a==='b1')buy(false);else if(a==='ball')buy(true);else if(a==='ad')watch();
    else if(a==='close'){const m=document.getElementById('hpm');if(m)m.hidden=true}
  },true);
  /* مؤقت العدّاد */
  setInterval(function(){
    try{
      tick();
      const t=document.getElementById('hptimer');
      if(t){t.textContent=mmss(left())}
      const c=document.getElementById('hpcard');
      if(c){const full=c.querySelector('[data-hp="b1"]').disabled,nowFull=S.hp>=MAX;if(full!==nowFull||c.querySelectorAll('.hpi:not(.off)').length!==S.hp)refresh()}
    }catch(e){}
  },1000);
})();
