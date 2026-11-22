/* ===== صفحة الاستماع: تصميم جديد (بطاقة السورة + شبكة السور + تنقّل سابق/تالٍ) ===== */
(function(){
  const _prev=pageListen;
  let QS='';
  function css(){
    if(document.getElementById('l3-css'))return;
    const s=document.createElement('style');s.id='l3-css';
    s.textContent=
    '.l3{margin-top:14px;display:grid;gap:16px}'+
    '.l3 .seg{border-radius:999px!important}'+
    '.l3-hero{position:relative;overflow:hidden;border-radius:30px;padding:18px 16px 16px;color:#f6e3a6;background:radial-gradient(circle at 85% -10%,rgba(246,227,166,.18),transparent 45%),linear-gradient(165deg,#14574f,#0b2a28);border:2px solid rgba(217,180,90,.55);box-shadow:0 14px 34px -16px rgba(0,0,0,.6);display:grid;gap:14px;justify-items:center;text-align:center}'+
    '.l3-hero:before{content:"";position:absolute;inset:0;opacity:.08;background:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 4l7 19 19 7-19 7-7 19-7-19-19-7 19-7z\' fill=\'none\' stroke=\'%23f6e3a6\' stroke-width=\'1.5\'/%3E%3C/svg%3E") center/60px;pointer-events:none}'+
    '.l3-hero>*{position:relative;z-index:1}'+
    '.l3-top{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px}'+
    '.l3-no{font:800 .85rem var(--display);background:rgba(246,227,166,.14);border:1px solid rgba(246,227,166,.35);border-radius:999px;padding:6px 14px;color:#f6e3a6;white-space:nowrap}'+
    '.l3-rec{display:flex;align-items:center;gap:8px;min-width:0;max-width:62%;border:1px solid rgba(246,227,166,.35);background:rgba(0,0,0,.22);color:#f6e3a6;border-radius:999px;padding:4px 12px 4px 6px;font:700 .85rem var(--display);cursor:pointer}'+
    '.l3-rec i{font-style:normal;flex:none;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#d9b45a;color:#0b2a28;font:800 1rem/1 var(--display);padding-bottom:3px;box-sizing:border-box}'+
    '.l3-rec span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
    '.l3-rec em{font-style:normal;opacity:.75;font-size:.78rem;flex:none}'+
    '.l3-name:before,.l3-name:after{content:none!important;display:none!important}.l3-name{font:700 clamp(2.1rem,9vw,2.9rem)/1.4 var(--quran);margin:2px 0 0;color:#f9ecbd;text-shadow:0 2px 14px rgba(0,0,0,.4)}'+
    '.l3-meta{margin:-8px 0 0;font-size:.9rem;opacity:.85;min-height:1.4em}'+
    '.l3-bars{display:flex;align-items:center;justify-content:center;gap:4px;height:34px}'+
    '.l3-bars i{width:4px;border-radius:4px;background:#d9b45a;opacity:.55}'+
    '.l3-ctl{display:flex;align-items:center;justify-content:center;gap:18px;width:100%}'+
    '.l3-nav{width:48px;height:48px;border-radius:50%;border:1.5px solid rgba(246,227,166,.4);background:rgba(0,0,0,.2);color:#f6e3a6;display:grid;place-items:center;cursor:pointer;padding:0}'+
    '.l3-nav[disabled]{opacity:.3;cursor:default}'+
    '.l3-nav svg{width:22px;height:22px}'+
    '.l3-play{flex:none;width:78px;height:78px;border-radius:50%;border:0;display:grid;place-items:center;cursor:pointer;background:linear-gradient(180deg,#f2d27a,#c8a24a);color:#0b2a28;box-shadow:0 5px 0 #8e6f23,0 12px 22px -8px rgba(0,0,0,.55);padding:0}'+
    '.l3-play:active{transform:translateY(3px);box-shadow:0 2px 0 #8e6f23}'+
    '.l3-play svg{width:34px;height:34px}'+
    '.l3-lbl{font:700 .85rem var(--display);opacity:.9;margin-top:-6px}'+
    '.l3 #dlbox{margin:0!important;width:100%;display:grid;justify-items:center}'+
    '.l3 #dlbox .btn{min-height:44px;border-radius:999px;background:rgba(246,227,166,.1);color:#f6e3a6;border:1.5px solid rgba(246,227,166,.4);box-shadow:none;padding:0 18px;font-size:.9rem}'+
    '.l3 #dlbox p{margin:0 0 6px;color:#f6e3a6;opacity:.85}'+
    '.l3-foot{font-size:.78rem;color:var(--muted);text-align:center;margin:-6px 4px 0;line-height:1.7}'+
    '.l3-pk{display:grid;gap:10px}'+
    '.l3-pkh{display:flex;align-items:center;justify-content:space-between;gap:10px}'+
    '.l3-pkh b{font:800 1.1rem var(--display)}'+
    '.l3-q{flex:1;min-width:0;max-width:200px;min-height:42px;border-radius:999px;border:2px solid var(--line);background:var(--surface);color:var(--fg);padding:0 14px;font:inherit}'+
    '.l3-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px;max-height:340px;overflow-y:auto;padding:4px 2px 8px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}'+
    '.l3-t{display:grid;justify-items:center;gap:2px;padding:10px 4px;border-radius:16px;border:2px solid var(--line);background:var(--surface);color:var(--fg);cursor:pointer;font:600 .92rem var(--display);line-height:1.4}'+
    '.l3-t small{font:700 .72rem var(--display);color:var(--muted)}'+
    '.l3-t[aria-pressed="true"]{border-color:var(--accent);background:var(--accent-soft,rgba(31,138,112,.14));box-shadow:0 3px 0 var(--accent)}'+
    '.l3-t[aria-pressed="true"] small{color:var(--accent-t,var(--accent))}'+
    '.l3-t[hidden]{display:none}'+
    '.l3-empty{padding:18px;text-align:center;color:var(--muted)}'+
    '.l3-avs{display:grid;gap:8px}';
    document.head.appendChild(s);
  }
  const ICON={
    play:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    next:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    prev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
  };
  function bars(){const H=[10,18,26,14,30,20,12,28,16,24,10,22,30,14,20,26,12,18,28,16,10,24,18,12];return '<div class="l3-bars" aria-hidden="true">'+H.map(function(h){return '<i style="height:'+h+'px"></i>'}).join('')+'</div>'}
  function render(){
    css();
    const r=recById(S.rec),L=r.n.trim().split(' ')[0].charAt(0),ay=LS.mode==='ayah';
    window.__RECS=REC.map(function(x){return {id:x.id,n:x.n,l:x.n.trim().split(' ')[0].charAt(0),on:x.id===S.rec}});
    let h='<section class="sec l3"><div class="rd-ban"><span class="rd-o" aria-hidden="true">✦</span><b>الاستماع</b><small>تلاوات بأصوات القرّاء</small></div>'+
     '<div class="seg" role="group" aria-label="نوع الاستماع">'+[['surah','سورة كاملة'],['ayah','آية بآية'],['hadith','الأحاديث']].map(function(m){return '<button data-lmode="'+m[0]+'" aria-pressed="'+(LS.mode===m[0])+'">'+m[1]+'</button>'}).join('')+'</div>'+
     '<div class="l3-hero"><div class="l3-top"><button class="l3-rec" data-recopen="1" aria-haspopup="dialog" aria-label="تغيير القارئ"><i aria-hidden="true">'+esc(L)+'</i><span>'+esc(r.n)+'</span><em>تغيير</em></button><span class="l3-no">سورة رقم '+N(LS.s)+'</span></div>'+
     '<h3 class="l3-name">'+esc(SN[LS.s-1])+'</h3><p class="l3-meta" id="l3meta"></p>'+bars();
    if(ay){
      h+='<p class="l3-lbl">اضغط على أي آية في الأسفل لتبدأ منها</p>';
    }else{
      h+='<div class="l3-ctl"><button class="l3-nav" data-l3s="'+(LS.s-1)+'" aria-label="السورة السابقة"'+(LS.s<=1?' disabled':'')+'>'+ICON.prev+'</button>'+
         '<button class="l3-play" data-act="play-surah" aria-label="تشغيل سورة '+esc(SN[LS.s-1])+'">'+ICON.play+'</button>'+
         '<button class="l3-nav" data-l3s="'+(LS.s+1)+'" aria-label="السورة التالية"'+(LS.s>=114?' disabled':'')+'>'+ICON.next+'</button></div><p class="l3-lbl">تشغيل بصوت '+esc(r.n)+'</p><div id="dlbox"></div>';
    }
    h+='</div>';
    if(ay)h+='<div class="l3-avs lv" id="lv"><p class="muted">جارٍ تحميل النص…</p></div>';
    h+='<div class="l3-pk"><div class="l3-pkh"><b>اختر السورة</b><input class="l3-q" id="l3q" type="search" inputmode="search" placeholder="ابحث بالاسم أو الرقم" aria-label="ابحث عن سورة" value="'+esc(QS)+'"></div>'+
     '<div class="l3-grid" id="l3grid" role="group" aria-label="السور">'+SN.map(function(n,i){return '<button class="l3-t" data-l3s="'+(i+1)+'" aria-pressed="'+((i+1)===LS.s)+'" data-n="'+esc(aNorm(n))+'"><small>'+N(i+1)+'</small><span>'+esc(n)+'</span></button>'}).join('')+'</div><div class="l3-empty" id="l3none" hidden>لا توجد سورة بهذا الاسم</div></div>';
    if(!ay)h+='<p class="l3-foot">يُشغَّل الملف من موقع MP3Quran. إن لم يعمل داخل الصفحة فسيظهر رابط لفتحه في تبويب جديد.</p>';
    h+='</section>';
    $('#page').innerHTML=h;
    if(!ay)setTimeout(dlBox,0);
    filt();
    const cur=document.querySelector('.l3-t[aria-pressed="true"]'),g=document.getElementById('l3grid');
    if(cur&&g&&!QS){const top=cur.offsetTop-g.offsetTop-g.clientHeight/2+cur.clientHeight/2;g.scrollTop=Math.max(0,top)}
    loadQ().then(function(){
      const c=Q.ch&&Q.ch[LS.s-1],m=document.getElementById('l3meta');
      if(c&&m)m.textContent=(c[1]==='م'?'سورة مكية':'سورة مدنية')+' · '+N(c[2])+' آية';
      if(ay){
        const vs=Q.v[LS.s-1],lv=document.getElementById('lv');
        if(lv){lv.innerHTML=vs.map(function(t,k){return '<button data-pa2="'+(k+1)+'">'+t+' <span class="no">'+N(k+1)+'</span></button>'}).join('');markAyah()}
      }
    }).catch(function(){const lv=document.getElementById('lv');if(lv)lv.innerHTML='<p>تعذّر تحميل النص.</p>'});
  }
  function filt(){
    const q=aNorm(QS||'').trim(),qn=toLatin(QS||'').trim();let n=0;
    document.querySelectorAll('.l3-t').forEach(function(b){
      const ok=!q||b.dataset.n.indexOf(q)>-1||(qn&&b.querySelector('small').textContent.trim()===qn)||(/^\d+$/.test(qn)&&String(+b.dataset.l3s).indexOf(qn)===0);
      b.hidden=!ok;if(ok)n++;
    });
    const e=document.getElementById('l3none');if(e)e.hidden=n>0;
  }
  pageListen=function(){
    if(LS.mode==='hadith')return _prev();
    try{render()}catch(e){try{console.warn('listen3',e)}catch(x){}_prev()}
  };
  document.addEventListener('input',function(e){if(e.target&&e.target.id==='l3q'){QS=e.target.value;filt()}});
  document.addEventListener('click',function(e){
    const t=e.target.closest&&e.target.closest('[data-l3s]');if(!t||t.disabled)return;
    const n=+t.dataset.l3s;if(!(n>=1&&n<=114))return;
    LS.s=n;LS.a=1;pageListen();
    if(t.classList.contains('l3-nav'))window.scrollTo({top:0,behavior:'smooth'});
  });
})();
