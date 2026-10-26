/* ===== شاشة المتابعة: السورة والآية التي يقرؤها القارئ الآن ===== */
(function(){
  const BK='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13"/></svg>';
  let FW=null,cur=0,key='';
  function el(){let e=document.getElementById('follow');if(!e){e=document.createElement('div');e.id='follow';e.hidden=true;e.dir='rtl';e.lang='ar';document.body.appendChild(e)}return e}
  function estimate(){
    if(!AP)return 0;
    if(AP.mode==='ayah')return AP.a;
    const v=Q&&Q.v[AP.s-1];if(!v||!AU.duration)return 0;
    let tot=0;const w=v.map(function(t){const x=t.length+10;tot+=x;return x});
    const target=AU.currentTime/AU.duration*tot;let acc=0;
    for(let i=0;i<w.length;i++){acc+=w[i];if(target<acc)return i+1}
    return w.length;
  }
  function build(){
    const e=el(),v=Q.v[AP.s-1];
    key=AP.s+':'+AP.mode;
    e.innerHTML='<div class="fw-top"><button data-fw="close" aria-label="إغلاق">'+IC.x+'</button><div class="fw-t"><b>سورة '+esc(SN[AP.s-1])+'</b><small id="fwn"></small></div>'+
      '<button class="pp" data-fw="toggle" id="fwpp" aria-label="تشغيل أو إيقاف">'+(AU.paused?IC.play:IC.pause)+'</button></div>'+
      '<div class="fw-body" id="fwb">'+(AP.s!==1&&AP.s!==9?'<p class="fw-bsm">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>':'')+
      v.map(function(t,i){return '<span class="fw-a" data-i="'+(i+1)+'">'+t+' <i class="no">'+N(i+1)+'</i></span> '}).join('')+'</div>'+
      '<small class="fw-hint" id="fwh"></small>';
    cur=0;
  }
  function upd(){
    if(!FW||!AP)return;
    if(!Q){return}
    if(key!==AP.s+':'+AP.mode)build();
    const a=estimate();
    const pp=document.getElementById('fwpp');if(pp)pp.innerHTML=AU.paused?IC.play:IC.pause;
    const n=document.getElementById('fwn');if(n)n.textContent=a?'الآية '+N(a)+' من '+N(AYC[AP.s-1]):'';
    const h=document.getElementById('fwh');if(h)h.textContent=AP.mode==='surah'?'تحديد الآية تقريبي لأن التلاوة سورة كاملة':'';
    if(a&&a!==cur){
      const o=document.querySelector('#fwb .fw-a.on');if(o)o.classList.remove('on');
      const t=document.querySelector('#fwb .fw-a[data-i="'+a+'"]');
      if(t){t.classList.add('on');try{t.scrollIntoView({block:'center',behavior:'smooth'})}catch(x){}}
      cur=a;
    }
  }
  function open(){
    if(!AP){toast('شغّل تلاوة أولًا');return}
    loadQ().then(function(){FW=true;key='';el().hidden=false;document.documentElement.classList.add('lock');upd()}).catch(function(){toast('تعذّر تحميل النص')});
  }
  function close(){FW=null;const e=el();e.hidden=true;e.innerHTML='';document.documentElement.classList.remove('lock')}
  const _rm=renderMini;
  renderMini=function(){
    _rm();
    if(!AP){if(FW)close();return}
    const r=document.querySelector('#mini .r1'),x=r&&r.querySelector('[data-act="mclose"]');
    if(x)x.insertAdjacentHTML('beforebegin','<button data-fw="open" aria-label="عرض الآية الجارية" title="عرض الآية">'+BK+'</button>');
    upd();
  };
  AU.addEventListener('timeupdate',function(){if(FW)upd()});
  AU.addEventListener('play',function(){if(FW)upd()});
  AU.addEventListener('pause',function(){if(FW)upd()});
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('button[data-fw]');if(!b)return;
    const a=b.dataset.fw;
    if(a==='open')return open();
    if(a==='close')return close();
    if(a==='toggle'){if(AU.paused)AU.play().catch(function(){});else AU.pause()}
  });
})();
