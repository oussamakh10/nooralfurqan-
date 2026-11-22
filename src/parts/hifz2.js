/* ===== الحفظ: طريقة تعلّم حقيقية (مقاطع صغيرة + استماع + تكرار + تلقين تدريجي + اختبار + مراجعة متباعدة) ===== */
(function(){
  const DAY=864e5,INT=[0,1,3,7,14,30,60,120],TARGET=14,REPS=5;
  const hz=function(){return S.hz||(S.hz={})};
  const W=function(t){return String(t).trim().split(/\s+/).filter(Boolean)};
  const KEY=function(s,c){return s+':'+c[0]+'-'+c[1]};
  const parse=function(k){const m=k.match(/^(\d+):(\d+)-(\d+)$/);return m?{s:+m[1],ch:[+m[2],+m[3]]}:null};
  const sh=function(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a};
  let ST=null;/* حالة الجلسة */
  function css(){
    if(document.getElementById('hz-css'))return;
    const s=document.createElement('style');s.id='hz-css';
    s.textContent=
    '.hz-top{display:flex;align-items:center;gap:10px;margin-bottom:8px}.hz-top h2{flex:1;margin:0;font:800 1.15rem var(--display);text-align:center}'+
    '.hz-dots{display:flex;gap:6px;justify-content:center;margin:4px 0 12px}.hz-dots i{width:34px;height:7px;border-radius:9px;background:var(--line)}.hz-dots i.on{background:var(--accent)}.hz-dots i.cur{background:var(--gold,#c9a227)}'+
    '.hz-stepname{text-align:center;font:800 1.05rem var(--display);margin:0 0 4px}.hz-help{text-align:center;color:var(--muted);font-size:.9rem;line-height:1.8;margin:0 6px 12px}'+
    '.hz-q{background:var(--surface);border:2px solid var(--line);border-radius:22px;padding:14px 14px 12px;margin-bottom:10px;box-shadow:0 3px 0 var(--line)}'+
    '.hz-ay{font:400 1.55rem/2.35 var(--quran);text-align:center;margin:2px 0 8px}.hz-ay .no{font:700 .8rem var(--display);color:var(--muted);margin-inline-start:4px}'+
    '.hz-w{display:inline-block;padding:0 4px;border-radius:8px;cursor:pointer}.hz-w.hid{background:color-mix(in srgb,var(--accent) 16%,transparent);color:transparent;text-shadow:none;min-width:2.1em;border-bottom:2px dashed var(--accent);user-select:none}'+
    '.hz-w.hid.hint::first-letter{color:var(--accent)}.hz-w.hid.hint{color:transparent}.hz-w.hid.hint:before{content:attr(data-f);color:var(--accent);position:absolute;margin-inline-start:0}'+
    '.hz-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:6px}.hz-row button{min-height:44px;border-radius:999px;border:2px solid var(--line);background:var(--surface);color:var(--fg);font:800 .92rem var(--display);padding:0 16px;cursor:pointer}'+
    '.hz-row button.pri{background:var(--accent);border-color:var(--accent);color:#fff}.hz-row button[disabled]{opacity:.45;cursor:default}'+
    '.hz-cnt{min-width:150px;min-height:54px!important;font-size:1.05rem!important}.hz-cnt.done{background:var(--accent);color:#fff;border-color:var(--accent)}'+
    '.hz-bar{height:9px;border-radius:9px;background:var(--line);overflow:hidden;margin:6px 0}.hz-bar i{display:block;height:100%;background:var(--accent);border-radius:9px;transition:width .25s}'+
    '.hz-opt{display:block;width:100%;text-align:center;margin:8px 0;min-height:52px;border-radius:16px;border:2px solid var(--line);background:var(--surface);color:var(--fg);font:400 1.3rem/1.9 var(--quran);cursor:pointer;padding:6px 10px;box-shadow:0 3px 0 var(--line)}'+
    '.hz-opt.ok{background:rgba(31,138,112,.18);border-color:var(--accent)}.hz-opt.no{background:rgba(192,57,43,.14);border-color:#c0392b}'+
    '.hz-fb{margin:8px 0;text-align:center;font-weight:700;line-height:1.8}.hz-fb.ok{color:var(--accent)}.hz-fb.no{color:#c0392b}'+
    '.hz-stem{font:400 1.45rem/2.3 var(--quran);text-align:center;margin:4px 0 8px}.hz-stem u{text-decoration:none;border-bottom:3px dashed var(--accent);padding:0 .9em;color:var(--accent)}'+
    '.hz-ch{display:flex;align-items:center;gap:10px;width:100%;text-align:start;border:2px solid var(--line);border-radius:18px;background:var(--surface);color:var(--fg);padding:10px 12px;margin-bottom:8px;cursor:pointer;box-shadow:0 2px 0 var(--line)}'+
    '.hz-ch .n{flex:none;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:var(--accent-soft,rgba(31,138,112,.15));color:var(--accent);font:800 .95rem var(--display)}'+
    '.hz-ch .t{flex:1;min-width:0}.hz-ch .t b{display:block;font:800 .95rem var(--display)}.hz-ch .t span{display:block;font:400 1.1rem/1.9 var(--quran);color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
    '.hz-pill{flex:none;font:800 .75rem var(--display);border-radius:999px;padding:3px 10px;background:var(--line);color:var(--fg)}.hz-pill.new{background:var(--accent-soft,rgba(31,138,112,.15));color:var(--accent)}.hz-pill.due{background:rgba(201,162,39,.22);color:var(--gold-t,#8a6d0b)}.hz-pill.strong{background:var(--accent);color:#fff}'+
    '.hz-today{background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 14%,var(--surface)),var(--surface));border:2px solid var(--line);border-radius:24px;padding:14px;margin-bottom:12px}.hz-today h3{margin:0 0 4px;font:800 1.1rem var(--display)}'+
    '.hz-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}.hz-stats div{background:var(--surface);border:2px solid var(--line);border-radius:16px;text-align:center;padding:8px 4px}.hz-stats b{display:block;font:800 1.35rem var(--display);color:var(--accent)}.hz-stats span{font-size:.78rem;color:var(--muted)}'+
    '.hz-rate{display:grid;gap:8px;margin-top:10px}.hz-rate button{min-height:50px;border-radius:16px;border:2px solid var(--line);background:var(--surface);color:var(--fg);font:800 .98rem var(--display);cursor:pointer}.hz-rate .g{background:var(--accent);border-color:var(--accent);color:#fff}.hz-rate .r{border-color:#c0392b;color:#c0392b}'+
    '.hz-done{text-align:center;padding:10px 6px}.hz-done h3{font:800 1.4rem var(--display);margin:8px 0 4px}';
    document.head.appendChild(s);
  }
  /* ---------- تقسيم السورة إلى مقاطع صغيرة ---------- */
  function chunks(s){
    const vs=Q.v[s-1]||[],out=[];let st=1,acc=0;
    for(let a=1;a<=vs.length;a++){
      acc+=W(vs[a-1]).length;
      if(acc>=TARGET||a-st>=3||a===vs.length){out.push([st,a]);st=a+1;acc=0}
    }
    return out;
  }
  function memHas(s,ch){const m=S.hifz[s]||[];for(let a=ch[0];a<=ch[1];a++)if(m.indexOf(a)<0)return false;return true}
  function rec(s,ch){return hz()[KEY(s,ch)]||null}
  function status(s,ch){
    const r=rec(s,ch),now=Date.now();
    if(r)return r.d<=now?'due':(r.l>=6?'strong':'ok');
    if(memHas(s,ch))return 'due';
    return 'new';
  }
  function dueList(){
    const now=Date.now(),out=[],seen={};
    Object.keys(hz()).forEach(function(k){const r=hz()[k],p=parse(k);if(p&&r.d<=now){out.push({s:p.s,ch:p.ch,d:r.d});seen[k]=1}});
    Object.keys(S.hifz||{}).forEach(function(sk){const s=+sk;if(!(S.hifz[s]||[]).length||!Q.v[s-1])return;chunks(s).forEach(function(ch){const k=KEY(s,ch);if(!seen[k]&&!hz()[k]&&memHas(s,ch)){out.push({s:s,ch:ch,d:0})}})});
    out.sort(function(a,b){return a.d-b.d});return out;
  }
  function nextNew(pref){
    const order=pref?[pref].concat(HS.filter(function(x){return x!==pref})):HS;
    for(let i=0;i<order.length;i++){const s=order[i];const cs=chunks(s);for(let j=0;j<cs.length;j++){if(status(s,cs[j])==='new')return {s:s,ch:cs[j],i:j}}}
    return null;
  }
  const label=function(s,ch){return 'سورة '+SN[s-1]+' · '+(ch[0]===ch[1]?'الآية '+N(ch[0]):'الآيات '+N(ch[0])+'–'+N(ch[1]))};
  const prev=function(s,ch){const cs=chunks(s),i=cs.findIndex(function(c){return c[0]===ch[0]});return i>0?cs[i-1]:null};
  const ayText=function(s,a){return Q.v[s-1][a-1]};
  /* ---------- الصوت ---------- */
  const A=new Audio();let AQ=[];
  A.addEventListener('ended',function(){if(AQ.length){const n=AQ.shift();playOne(n[0],n[1])}});
  function playOne(s,a){try{if(typeof AU!=='undefined')AU.pause()}catch(e){}A.src=ayahUrl(recById(S.rec),s,a);const p=A.play();if(p&&p.catch)p.catch(function(){toast('تعذّر تشغيل الصوت. تحقّق من الاتصال.')})}
  function playChunk(s,ch){AQ=[];for(let a=ch[0]+1;a<=ch[1];a++)AQ.push([s,a]);playOne(s,ch[0])}
  function stopA(){AQ=[];try{A.pause()}catch(e){}}
  /* ---------- الشاشة الرئيسية ---------- */
  const box=function(){return document.getElementById('hifzbox')};
  function home(){
    css();const b=box();if(!b)return;
    loadQ().then(function(){
      const due=dueList(),nn=nextNew(S.hzl&&S.hzl.s),mk=Object.keys(hz()).length;
      let tot=0,done=0;HS.forEach(function(s){tot+=AYC[s-1];done+=hCount(s)});
      b.innerHTML=
       '<div class="say"><div class="mas">'+hoopoe('happy',88)+'</div><div class="bubble"><p>الحفظ الثابت يأتي من مقطع صغير كل يوم ومراجعة ما قبله. سنمشي معًا بخطوات: استمع، كرّر، أخفِ تدريجيًّا، ثم اختبر نفسك.</p></div></div>'+
       '<div class="hz-today"><h3>وردك اليوم</h3><p class="muted" style="margin:0 0 8px;font-size:.9rem">'+(due.length?'عندك '+N(due.length)+' مقطع للمراجعة، راجعها قبل أن تحفظ جديدًا.':'لا مراجعات مستحقة الآن. ابدأ حفظًا جديدًا بإذن الله.')+'</p>'+
       '<div class="hz-row"><button class="pri" data-hz="rev" '+(due.length?'':'disabled')+'>مراجعة ('+N(due.length)+')</button><button class="'+(due.length?'':'pri')+'" data-hz="new" '+(nn?'':'disabled')+'>'+(nn?'حفظ جديد: '+esc(SN[nn.s-1]):'أتممت كل المقاطع')+'</button></div></div>'+
       '<div class="hz-stats"><div><b>'+N(mk)+'</b><span>مقطع محفوظ</span></div><div><b>'+N(done)+'</b><span>آية</span></div><div><b>'+N(due.length)+'</b><span>للمراجعة</span></div></div>'+
       '<div class="card" style="margin-bottom:10px"><div class="row" style="display:flex;justify-content:space-between"><b>تقدّمك في الحفظ</b><small class="muted">'+N(done)+' من '+N(tot)+' آية</small></div><div class="pbar gold" style="margin-top:6px"><i style="width:'+(done/tot*100)+'%"></i></div></div>'+
       HG.map(function(g){return '<h3 class="hgh">'+g[0]+'</h3><div class="hifz">'+g[1].map(function(s){const c=hCount(s),t=AYC[s-1];return '<button class="hrow" data-hs="'+s+'"><b>'+SN[s-1]+'</b><div class="pbar"><i style="width:'+(c/t*100)+'%"></i></div><small class="muted">'+N(c)+'/'+N(t)+'</small></button>'}).join('')+'</div>'}).join('')+
       '<p class="fine">الأصل في الحفظ المراجعة على شيخ متقن؛ هذه الصفحة تعينك على التكرار والمراجعة المتباعدة (غدًا، ثم 3 أيام، ثم أسبوع…).</p>';
    });
  }
  /* ---------- صفحة السورة: قائمة المقاطع ---------- */
  function surah(s){
    css();const b=box();if(!b)return;
    loadQ().then(function(){
      const cs=chunks(s),nn=cs.findIndex(function(c){return status(s,c)==='new'});
      b.innerHTML='<div class="hz-top"><button class="iconbtn" data-act="hback" aria-label="رجوع">'+IC.back+'</button><h2>حفظ سورة '+SN[s-1]+'</h2><span style="width:44px"></span></div>'+
       '<p class="hz-help">كل مقطع من '+N(1)+' إلى '+N(4)+' آيات. احفظ مقطعًا واحدًا ثم راجعه في موعده.</p>'+
       (nn>=0?'<div class="hz-row" style="margin-bottom:12px"><button class="pri" data-hz="learn" data-s="'+s+'" data-a="'+cs[nn][0]+'" data-b="'+cs[nn][1]+'">ابدأ حفظ المقطع '+N(nn+1)+'</button></div>':'<p class="hz-help"><b>ما شاء الله، أتممت مقاطع السورة.</b> حافظ على مراجعتها.</p>')+
       cs.map(function(ch,i){const st=status(s,ch),r=rec(s,ch),w=W(ayText(s,ch[0])).slice(0,5).join(' ');
        const pill=st==='new'?'<span class="hz-pill new">جديد</span>':st==='due'?'<span class="hz-pill due">راجِع</span>':st==='strong'?'<span class="hz-pill strong">متقن</span>':'<span class="hz-pill">المستوى '+N(r?r.l:1)+'</span>';
        return '<button class="hz-ch" data-hz="'+(st==='new'?'learn':'revone')+'" data-s="'+s+'" data-a="'+ch[0]+'" data-b="'+ch[1]+'"><span class="n">'+N(i+1)+'</span><span class="t"><b>'+(ch[0]===ch[1]?'الآية '+N(ch[0]):'الآيات '+N(ch[0])+'–'+N(ch[1]))+'</b><span>'+esc(w)+' …</span></span>'+pill+'</button>'}).join('');
    });
  }
  /* ---------- أسئلة الاختبار ---------- */
  function lastW(t){const w=W(t);return w[w.length-1]}
  function pool(s,ex,len){
    const seen={},out=[];[s].concat(sh(HS)).forEach(function(x){(Q.v[x-1]||[]).forEach(function(t){W(t).forEach(function(w){const k=aNorm(w);if(k&&!seen[k]&&k!==aNorm(ex)&&Math.abs(k.length-aNorm(ex).length)<=2){seen[k]=1;out.push(w)}})});});
    return sh(out.slice(0,400)).slice(0,3);
  }
  function qEnd(s,a){const w=W(ayText(s,a)),ans=w[w.length-1];return {stem:w.slice(0,-1).join(' ')+' <u>&nbsp;</u>',ans:ans,opts:sh([ans].concat(pool(s,ans)))}}
  function qMid(s,a){const w=W(ayText(s,a));if(w.length<4)return qEnd(s,a);const i=1+Math.floor(Math.random()*(w.length-2)),ans=w[i],st=w.slice();st[i]='<u>&nbsp;</u>';return {stem:st.join(' '),ans:ans,opts:sh([ans].concat(pool(s,ans)))}}
  function qNext(s,a,ch){const nx=ayText(s,a+1),o=[nx];const others=sh((Q.v[s-1]||[]).map(function(t,i){return i+1}).filter(function(x){return x!==a+1&&x!==a}));others.slice(0,3).forEach(function(x){o.push(ayText(s,x))});return {stem:'ما الآية التي بعد:<br>'+esc(ayText(s,a)),ans:nx,opts:sh(o),long:1}}
  function buildQs(s,ch){
    const as=[];for(let a=ch[0];a<=ch[1];a++)as.push(a);const q=[];
    for(let i=0;i<4;i++){const a=as[i%as.length];let x;
      if(i===2&&as.length>=2&&ch[1]>a&&a<ch[1])x=qNext(s,a,ch);else x=(i%2===0)?qEnd(s,a):qMid(s,a);
      if(x.opts.length<2)x=qEnd(s,a);q.push(x)}
    return q;
  }
  /* ---------- جلسة حفظ جديد ---------- */
  const STEPS=['ربط','استماع','تكرار','تلقين','اختبار'];
  function startLearn(s,ch){
    stopA();const p=prev(s,ch);
    ST={mode:'new',s:s,ch:ch,step:(p&&status(s,p)!=='new')?0:1,prev:p&&status(s,p)!=='new'?p:null,rep:{},rnd:1,rv:{},hint:false,heard:0,qs:null,qi:0,score:0,ans:null};
    S.hzl={s:s,a:ch[0]};save();view();
  }
  function dots(){return '<div class="hz-dots">'+STEPS.map(function(n,i){return '<i class="'+(i<ST.step?'on':i===ST.step?'cur':'')+'" title="'+n+'"></i>'}).join('')+'</div>'}
  function ayCards(s,ch,fn){let h='';for(let a=ch[0];a<=ch[1];a++)h+=fn(a);return h}
  function hideSet(rnd,n){/* أي الكلمات تُخفى في كل جولة */
    const h={};for(let i=0;i<n;i++){if(rnd===1&&i%3===2)h[i]=1;else if(rnd===2&&i%3!==0)h[i]=1;else if(rnd===3)h[i]=1}return h}
  function words(s,a,rnd,rv,hint){
    const w=W(ayText(s,a)),hd=hideSet(rnd,w.length);
    return w.map(function(t,i){const k=a+'_'+i,hid=hd[i]&&!rv[k];return '<span class="hz-w'+(hid?' hid'+(hint?' hint':''):'')+'" data-hz="w" data-k="'+k+'" data-f="'+esc(t.charAt(0))+'">'+esc(t)+'</span>'}).join(' ')+' <span class="no">'+N(a)+'</span>';
  }
  function view(){
    css();const b=box();if(!b||!ST)return;
    if(ST.mode==='rev')return viewRev();
    const s=ST.s,ch=ST.ch,top='<div class="hz-top"><button class="iconbtn" data-hz="exit" aria-label="خروج">'+IC.back+'</button><h2>'+esc(label(s,ch))+'</h2><span style="width:44px"></span></div>'+dots();
    let h=top;
    if(ST.step===0){
      const p=ST.prev;h+='<p class="hz-stepname">١) الربط بما قبله</p><p class="hz-help">قبل الجديد، اقرأ من ذاكرتك آخر مقطع حفظته. هذا يربط المحفوظ ببعضه.</p>'+
       '<div class="hz-q"><b style="display:block;text-align:center">'+esc(label(s,p))+'</b>'+ayCards(s,p,function(a){const k='p'+a;return '<div class="hz-ay" style="'+(ST.rv[k]?'':'filter:blur(8px)')+'">'+esc(ayText(s,a))+' <span class="no">'+N(a)+'</span></div>'})+
       '<div class="hz-row"><button data-hz="prevshow">أظهر للتأكد</button></div></div>'+
       '<div class="hz-row"><button class="pri" data-hz="go">تابع إلى المقطع الجديد</button></div>';
    }else if(ST.step===1){
      h+='<p class="hz-stepname">٢) استمع وتابع بعينيك</p><p class="hz-help">استمع إلى المقطع مرتين أو ثلاثًا وأنت تنظر في النص، دون أن تردّد بعد.</p><div class="hz-q">'+
       ayCards(s,ch,function(a){return '<div class="hz-ay">'+esc(ayText(s,a))+' <span class="no">'+N(a)+'</span></div>'})+
       '<div class="hz-row"><button class="pri" data-hz="playall">▶ استمع للمقطع</button><button data-hz="stopa">إيقاف</button></div></div>'+
       '<p class="hz-help" id="hz-heard">'+(ST.heard?'استمعت '+N(ST.heard)+' مرات':'')+'</p>'+
       '<div class="hz-row"><button class="pri" data-hz="go" '+(ST.heard>=1?'':'disabled')+'>تابع إلى التكرار</button></div>';
    }else if(ST.step===2){
      let all=true;
      h+='<p class="hz-stepname">٣) كرّر بصوت مسموع</p><p class="hz-help">انظر في النص وردّد كل آية '+N(REPS)+' مرات، واضغط الزر عند كل مرة.</p>'+
       ayCards(s,ch,function(a){const c=ST.rep[a]||0,d=c>=REPS;if(!d)all=false;
        return '<div class="hz-q"><div class="hz-ay">'+esc(ayText(s,a))+' <span class="no">'+N(a)+'</span></div><div class="hz-bar"><i style="width:'+Math.min(100,c/REPS*100)+'%"></i></div>'+
         '<div class="hz-row"><button data-hz="play1" data-a="'+a+'">▶ استمع</button><button class="hz-cnt'+(d?' done':'')+'" data-hz="rep" data-a="'+a+'">'+(d?'تمّت ✓':'كرّرتها ('+N(c)+'/'+N(REPS)+')')+'</button><button data-hvoice="'+a+'" data-hs2="'+s+'">نطقي</button></div></div>'}) +
       '<div class="hz-row"><button class="pri" data-hz="go" '+(all?'':'disabled')+'>تابع إلى التلقين</button></div>';
    }else if(ST.step===3){
      const t=['أخفينا ثلث الكلمات: أكمل الناقص من ذاكرتك ثم اضغط عليه للتأكد.','أخفينا معظم الكلمات: جرّب أن تقرأ الآيات وتتذكر الناقص.','أخفينا النص كله: اقرأ من ذاكرتك، واضغط على أي كلمة للتأكد منها. التلميح يُظهر الحرف الأول.'];
      h+='<p class="hz-stepname">٤) التلقين التدريجي ('+N(ST.rnd)+' من '+N(3)+')</p><p class="hz-help">'+t[ST.rnd-1]+'</p><div class="hz-q">'+
       ayCards(s,ch,function(a){return '<div class="hz-ay">'+words(s,a,ST.rnd,ST.rv,ST.hint)+'</div>'})+
       '<div class="hz-row"><button data-hz="hint">'+(ST.hint?'إخفاء التلميح':'تلميح: الحرف الأول')+'</button><button data-hz="reshow">أعد الإخفاء</button><button data-hz="play1" data-a="'+ch[0]+'">▶ استمع</button></div></div>'+
       '<div class="hz-row"><button class="pri" data-hz="go">'+(ST.rnd<3?'الجولة التالية':'إلى الاختبار')+'</button></div>';
    }else if(ST.step===4){
      if(!ST.qs){ST.qs=buildQs(s,ch);ST.qi=0;ST.score=0;ST.ans=null}
      if(ST.qi>=ST.qs.length){
        const ok=ST.score>=3;
        h+='<div class="hz-done"><div>'+hoopoe(ok?'cheer':'sad',96)+'</div><h3>'+(ok?'ما شاء الله!':'قريب جدًا')+'</h3><p class="muted">أجبت '+N(ST.score)+' من '+N(ST.qs.length)+' إجابات صحيحة.</p>'+
          (ok?'<div class="hz-row"><button class="pri" data-hz="master">تثبيت الحفظ</button></div>':'<p class="hz-help">ارجع إلى التلقين وراجع المقطع مرة أخرى، ثم أعد الاختبار.</p><div class="hz-row"><button class="pri" data-hz="back3">العودة إلى التلقين</button></div>')+'</div>';
      }else{
        h+=qView('٥) اختبر نفسك');
      }
    }
    box().innerHTML=h;
  }
  function qView(title){
    const q=ST.qs[ST.qi],a=ST.ans;
    return '<p class="hz-stepname">'+title+'</p><div class="hz-bar"><i style="width:'+(ST.qi/ST.qs.length*100)+'%"></i></div><div class="hz-q"><div class="hz-stem">'+(q.long?q.stem:q.stem)+'</div>'+
      q.opts.map(function(o,i){const cl=a==null?'':(o===q.ans?' ok':(i===a?' no':''));return '<button class="hz-opt'+cl+'" data-hz="opt" data-i="'+i+'" '+(a==null?'':'disabled')+'>'+esc(o)+'</button>'}).join('')+
      (a==null?'':'<div class="hz-fb '+(q.opts[a]===q.ans?'ok':'no')+'">'+(q.opts[a]===q.ans?'أحسنت!':'الصحيح هو المظلَّل')+'</div><div class="hz-row"><button class="pri" data-hz="qnext">التالي</button></div>')+'</div>';
  }
  /* ---------- تثبيت المقطع ---------- */
  function master(){
    const s=ST.s,ch=ST.ch,k=KEY(s,ch),now=Date.now();
    hz()[k]={l:1,d:now+INT[1]*DAY,n:0,f:0,t:now};
    const m=S.hifz[s]||(S.hifz[s]=[]);for(let a=ch[0];a<=ch[1];a++)if(m.indexOf(a)<0)m.push(a);
    addXP(10);SND.coin();
    const full=m.length===AYC[s-1];
    if(full){SND.surah();celebrate('ما شاء الله، حفظت سورة '+SN[s-1],'ثبّتك الله. راجعها كل يوم.','cheer')}
    save();renderTop();
    const nx=nextNew(s);
    box().innerHTML='<div class="hz-done"><div>'+hoopoe('cheer',110)+'</div><h3>ثبّت الله حفظك</h3><p class="muted">'+esc(label(s,ch))+'<br>موعد مراجعته القادمة: <b>غدًا</b> بإذن الله، ثم بعد 3 أيام، ثم أسبوع.</p>'+
      '<div class="hz-row">'+(nx?'<button class="pri" data-hz="learn" data-s="'+nx.s+'" data-a="'+nx.ch[0]+'" data-b="'+nx.ch[1]+'">المقطع التالي</button>':'')+'<button data-hz="exit">إنهاء</button></div>'+
      '<p class="fine">نصيحة: لا تُكثر في اليوم الواحد؛ مقطع جديد وراجع ما قبله أفضل من حفظ كثير ينساه صاحبه.</p></div>';
    ST=null;
  }
  /* ---------- جلسة المراجعة ---------- */
  function startRev(list){
    stopA();
    ST={mode:'rev',queue:list.slice(0,6),qi:0,done:0,good:0,phase:'q',q:null,ans:null,shown:false};
    viewRev();
  }
  function viewRev(){
    css();const b=box();if(!b||!ST)return;
    if(ST.qi>=ST.queue.length){
      const n=ST.queue.length;addXP(2*n);save();renderTop();
      b.innerHTML='<div class="hz-done"><div>'+hoopoe('cheer',100)+'</div><h3>تقبّل الله منك</h3><p class="muted">راجعت '+N(n)+' مقطعًا، منها '+N(ST.good)+' بإتقان.</p><div class="hz-row"><button class="pri" data-hz="exit">إنهاء</button></div></div>';
      ST=null;return;
    }
    const it=ST.queue[ST.qi],s=it.s,ch=it.ch;
    if(!ST.q){const a=ch[0]+Math.floor(Math.random()*(ch[1]-ch[0]+1));ST.q=Math.random()<.5?qEnd(s,a):qMid(s,a);ST.a0=a}
    let h='<div class="hz-top"><button class="iconbtn" data-hz="exit" aria-label="خروج">'+IC.back+'</button><h2>مراجعة '+N(ST.qi+1)+' من '+N(ST.queue.length)+'</h2><span style="width:44px"></span></div>'+
     '<div class="hz-bar"><i style="width:'+(ST.qi/ST.queue.length*100)+'%"></i></div><p class="hz-stepname">'+esc(label(s,ch))+'</p>';
    if(ST.phase==='q'){
      h+='<p class="hz-help">أولًا: أكمل من ذاكرتك.</p><div class="hz-q"><div class="hz-stem">'+ST.q.stem+'</div>'+ST.q.opts.map(function(o,i){const a=ST.ans,cl=a==null?'':(o===ST.q.ans?' ok':(i===a?' no':''));return '<button class="hz-opt'+cl+'" data-hz="ropt" data-i="'+i+'" '+(a==null?'':'disabled')+'>'+esc(o)+'</button>'}).join('')+'</div>';
    }else{
      const ok=ST.q.opts[ST.ans]===ST.q.ans;
      h+='<p class="hz-help">'+(ok?'أحسنت! الآن اقرأ المقطع كاملًا من ذاكرتك، ثم أظهر النص وقيّم نفسك بصدق.':'الصحيح مظلَّل. اقرأ المقطع من ذاكرتك ثم أظهر النص وقيّم نفسك.')+'</p><div class="hz-q">'+
       ayCards(s,ch,function(a){return '<div class="hz-ay" style="'+(ST.shown?'':'filter:blur(9px)')+'">'+esc(ayText(s,a))+' <span class="no">'+N(a)+'</span></div>'})+
       '<div class="hz-row">'+(ST.shown?'<button data-hz="play1" data-a="'+ch[0]+'">▶ استمع</button>':'<button class="pri" data-hz="rshow">أظهر النص</button>')+'</div></div>'+
       (ST.shown?'<div class="hz-rate">'+(ok?'<button class="g" data-hz="rate" data-v="2">أتقنته بلا تردد</button>':'')+'<button data-hz="rate" data-v="1">تردّدت قليلًا</button><button class="r" data-hz="rate" data-v="0">نسيت أجزاء منه</button></div>':'');
    }
    b.innerHTML=h;
  }
  function rate(v){
    const it=ST.queue[ST.qi],k=KEY(it.s,it.ch),now=Date.now();
    const r=hz()[k]||{l:1,d:0,n:0,f:0,t:now};
    r.n++;
    if(v===2){r.l=Math.min(7,r.l+1);r.d=now+INT[r.l]*DAY;ST.good++}
    else if(v===1){r.d=now+INT[Math.max(1,r.l-0)]*DAY*.5;if(r.d<now+DAY*.5)r.d=now+DAY*.5}
    else{r.f++;r.l=Math.max(1,r.l-2);r.d=now+DAY*.25}
    hz()[k]=r;
    const m=S.hifz[it.s]||(S.hifz[it.s]=[]);for(let a=it.ch[0];a<=it.ch[1];a++)if(m.indexOf(a)<0)m.push(a);
    SND[v===2?'correct':'ayah']&&SND[v===2?'correct':'ayah']();
    save();ST.qi++;ST.q=null;ST.ans=null;ST.shown=false;ST.phase='q';viewRev();
  }
  /* ---------- الأحداث ---------- */
  document.addEventListener('click',function(e){
    const t=e.target.closest&&e.target.closest('[data-hz]');if(!t||t.disabled)return;
    const z=t.dataset.hz,d=t.dataset;
    if(z==='new'){loadQ().then(function(){const nn=nextNew(S.hzl&&S.hzl.s);if(nn)startLearn(nn.s,nn.ch)});return}
    if(z==='rev'){loadQ().then(function(){const l=dueList();if(l.length)startRev(l)});return}
    if(z==='learn'){loadQ().then(function(){startLearn(+d.s,[+d.a,+d.b])});return}
    if(z==='revone'){loadQ().then(function(){startRev([{s:+d.s,ch:[+d.a,+d.b],d:0}])});return}
    if(z==='exit'){stopA();ST=null;if(HV)surah(HV);else home();return}
    if(!ST)return;
    if(z==='w'){ST.rv[d.k]=!ST.rv[d.k];view();return}
    if(z==='prevshow'){ST.prev&&ST.prev&&(ST.rv['p'+ST.prev[0]]=1,(function(){for(let a=ST.prev[0];a<=ST.prev[1];a++)ST.rv['p'+a]=1})());view();return}
    if(z==='playall'){playChunk(ST.s,ST.ch);ST.heard++;const el=document.getElementById('hz-heard');if(el)el.textContent='استمعت '+N(ST.heard)+' مرات';const g=document.querySelector('[data-hz="go"]');if(g)g.disabled=false;return}
    if(z==='stopa'){stopA();return}
    if(z==='play1'){AQ=[];playOne(ST.mode==='rev'?ST.queue[ST.qi].s:ST.s,+d.a);return}
    if(z==='rep'){const a=+d.a;ST.rep[a]=Math.min(REPS,(ST.rep[a]||0)+1);SND.coin&&0;view();return}
    if(z==='hint'){ST.hint=!ST.hint;view();return}
    if(z==='reshow'){ST.rv={};view();return}
    if(z==='go'){stopA();if(ST.step===3&&ST.rnd<3){ST.rnd++;ST.rv={};ST.hint=false;view();return}ST.step++;if(ST.step===3){ST.rnd=1;ST.rv={}}view();window.scrollTo({top:0});return}
    if(z==='back3'){ST.step=3;ST.rnd=1;ST.rv={};ST.qs=null;view();return}
    if(z==='opt'){if(ST.ans!=null)return;ST.ans=+d.i;const q=ST.qs[ST.qi];if(q.opts[ST.ans]===q.ans){ST.score++;SND.correct&&SND.correct()}else SND.wrong&&SND.wrong();view();return}
    if(z==='qnext'){ST.qi++;ST.ans=null;view();return}
    if(z==='master'){master();return}
    if(z==='ropt'){if(ST.ans!=null)return;ST.ans=+d.i;ST.phase='r';ST.shown=false;if(ST.q.opts[ST.ans]===ST.q.ans)SND.correct&&SND.correct();else SND.wrong&&SND.wrong();viewRev();return}
    if(z==='rshow'){ST.shown=true;viewRev();return}
    if(z==='rate'){rate(+d.v);return}
  });
  /* ---------- ربط بالصفحة ---------- */
  learnHifz=function(){ST=null;stopA();css();if(HV)surah(HV);else home()};
  hifzSurah=function(s){HV=s;surah(s)};
})();
