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
    s.textContent+=
    '@keyframes hzin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@keyframes hzpulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--accent) 55%,transparent)}100%{box-shadow:0 0 0 14px transparent}}'+
    '#hifzbox>*{animation:hzin .28s ease both}'+
    '.hz-hero{position:relative;overflow:hidden;border-radius:28px;padding:16px;margin-bottom:12px;color:#fff;background:linear-gradient(135deg,#0f6b55 0%,#1f8a70 55%,#2aa88a 100%);box-shadow:0 14px 30px -16px rgba(15,107,85,.8)}'+
    '.hz-hero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 12% 0%,rgba(255,255,255,.22),transparent 45%),repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0 10px,transparent 10px 20px);pointer-events:none}'+
    '.hz-hero .in{position:relative;display:flex;align-items:center;gap:14px}.hz-hero h3{margin:0 0 2px;font:800 1.25rem var(--display);color:#fff}.hz-hero p{margin:0;font-size:.9rem;line-height:1.7;color:rgba(255,255,255,.9)}'+
    '.hz-ring{position:relative;flex:none;width:84px;height:84px}.hz-ring svg{width:100%;height:100%;transform:rotate(-90deg)}.hz-ring span{position:absolute;inset:0;display:grid;place-items:center;font:800 1.05rem var(--display)}'+
    '.hz-hero .hz-cta{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.hz-hero .hz-cta:has(button:only-child){grid-template-columns:1fr}'+
    '.hz-big{min-height:52px;border-radius:18px;border:2px solid rgba(255,255,255,.55);background:rgba(255,255,255,.14);color:#fff;font:800 1rem var(--display);cursor:pointer;padding:0 10px}.hz-big.pri{background:#fff;color:#0f6b55;border-color:#fff;box-shadow:0 6px 0 rgba(0,0,0,.18)}.hz-big:active{transform:translateY(3px);box-shadow:none}.hz-big[disabled]{opacity:.5;cursor:default}'+
    '.hz-chips{display:flex;gap:8px;margin:0 0 14px}.hz-chips div{flex:1;border-radius:18px;background:var(--surface);border:2px solid var(--line);padding:10px 6px;text-align:center}.hz-chips b{display:block;font:800 1.4rem var(--display);color:var(--accent)}.hz-chips span{font-size:.76rem;color:var(--muted)}'+
    '.hz-sgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:6px}.hz-sr{display:flex;align-items:center;gap:8px;border-radius:18px;border:2px solid var(--line);background:var(--surface);color:var(--fg);padding:8px 10px;cursor:pointer;box-shadow:0 3px 0 var(--line);text-align:start;min-width:0}.hz-sr:active{transform:translateY(2px);box-shadow:none}'+
    '.hz-sr .no{flex:none;width:26px;height:26px;border-radius:8px;border:0!important;box-shadow:none!important;display:grid;place-items:center;font:800 .78rem var(--display);background:var(--accent-soft,rgba(31,138,112,.15));color:var(--accent)}.hz-sr b{flex:1;min-width:0;font:800 .86rem/1.3 var(--display);overflow-wrap:anywhere}'+
    '.hz-sr .mr{flex:none;width:30px;height:30px;position:relative}.hz-sr .mr svg{width:100%;height:100%;transform:rotate(-90deg)}.hz-sr .mr span{position:absolute;inset:0;display:grid;place-items:center;font:800 .62rem var(--display);color:var(--muted)}.hz-sr.full{border-color:var(--accent)}.hz-sr.full .no{background:var(--accent);color:#fff}'+
    '.hz-sh{display:flex;align-items:center;gap:8px;margin:18px 4px 8px;font:800 1rem var(--display);color:var(--gold-t,#8a6d0b)}.hz-sh:after{content:"";flex:1;height:2px;background:linear-gradient(to left,transparent,var(--line))}'+
    '.hz-shead{display:flex;align-items:center;gap:14px;border-radius:26px;padding:14px;margin-bottom:14px;background:var(--surface);border:2px solid var(--line);box-shadow:0 4px 0 var(--line)}.hz-shead .nm{flex:1;min-width:0}.hz-shead .nm b{display:block;font:400 1.9rem/1.4 var(--quran);color:var(--accent)}.hz-shead .nm span{font-size:.85rem;color:var(--muted)}'+
    '.hz-ch{position:relative;box-shadow:0 3px 0 var(--line)}.hz-ch:not(:last-child):after{content:"";position:absolute;inset-inline-start:26px;top:100%;height:8px;width:3px;background:var(--line);border-radius:3px}'+
    '.hz-ch .n{width:40px;height:40px;font-size:1rem}.hz-ch .n.s-ok,.hz-ch .n.s-strong{background:var(--accent);color:#fff}.hz-ch .n.s-due{background:rgba(201,162,39,.25);color:var(--gold-t,#8a6d0b)}.hz-ch.cur{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,var(--surface))}.hz-ch.cur .n{animation:hzpulse 1.4s ease-out infinite}'+
    '.hz-steps{display:flex;gap:4px;margin:2px 0 14px}.hz-steps span{flex:1;text-align:center;min-width:0}.hz-steps i{display:grid;place-items:center;width:30px;height:30px;margin:0 auto 3px;border-radius:50%;font:800 .8rem var(--display);font-style:normal;background:var(--line);color:var(--muted)}.hz-steps b{display:block;font:700 .68rem var(--display);color:var(--muted);white-space:nowrap}.hz-steps .on i{background:var(--accent);color:#fff}.hz-steps .cur i{background:var(--gold,#c9a227);color:#fff;transform:scale(1.15);box-shadow:0 4px 12px -4px var(--gold,#c9a227)}.hz-steps .cur b{color:var(--fg)}'+
    '.hz-q{box-shadow:0 3px 0 var(--line),inset 0 0 0 5px var(--surface),inset 0 0 0 6px color-mix(in srgb,var(--gold,#c9a227) 45%,transparent)}.hz-ay{padding:0 6px}'+
    '.hz-cc{flex:none;width:74px;height:74px;border-radius:50%;border:0;cursor:pointer;position:relative;background:conic-gradient(var(--accent) calc(var(--p)*1%),var(--line) 0);color:var(--fg);font:800 .95rem var(--display);padding:0;display:grid;place-items:center}.hz-cc:before{content:"";position:absolute;inset:7px;border-radius:50%;background:var(--surface)}.hz-cc span{position:relative}.hz-cc:active{transform:scale(.94)}.hz-cc.done{background:var(--accent);color:#fff}.hz-cc.done:before{background:var(--accent)}'+
    '.hz-rr{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:6px}.hz-rr .sm{min-height:44px;border-radius:999px;border:2px solid var(--line);background:var(--surface);color:var(--fg);font:800 .88rem var(--display);padding:0 16px;cursor:pointer}'+
    '.hz-row.fix{position:sticky;bottom:92px;z-index:6;padding:16px 0 6px;margin-top:8px;background:linear-gradient(to top,var(--bg,#fbf3dc) 55%,transparent)}.hz-row.fix button.pri{min-width:60%;min-height:52px;box-shadow:0 5px 0 rgba(0,0,0,.2)}'+
    '.hz-opt{display:flex;align-items:center;justify-content:center;gap:10px;position:relative}.hz-opt i{position:absolute;inset-inline-start:12px;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font:800 .78rem var(--display);font-style:normal;background:var(--line);color:var(--muted)}';
    s.textContent+='.hz-audbox{position:sticky;bottom:96px;z-index:7;margin:10px 0;padding:10px 12px;border-radius:16px;background:var(--surface);border:2px solid var(--accent);box-shadow:0 8px 20px -10px rgba(0,0,0,.5);text-align:center}.hz-audbox a{color:var(--accent);font-weight:800}.hz-rr .sm.rec{background:#c0392b;border-color:#c0392b;color:#fff;animation:hzpulse 1s infinite}';
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
    Q&&Object.keys(S.hifz||{}).forEach(function(sk){const s=+sk;if(!(S.hifz[s]||[]).length||!Q.v[s-1])return;chunks(s).forEach(function(ch){const k=KEY(s,ch);if(!seen[k]&&!hz()[k]&&memHas(s,ch)){out.push({s:s,ch:ch,d:0})}})});
    out.sort(function(a,b){return a.d-b.d});return out;
  }
  function nextNew(pref){
    if(!Q)return null;
    const order=pref?[pref].concat(HS.filter(function(x){return x!==pref})):HS;
    for(let i=0;i<order.length;i++){const s=order[i];const cs=chunks(s);for(let j=0;j<cs.length;j++){if(status(s,cs[j])==='new')return {s:s,ch:cs[j],i:j}}}
    return null;
  }
  const ring=function(p,c){c=c||'var(--accent)';return '<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.9" fill="none" stroke="'+(c==='#fff'?'rgba(255,255,255,.28)':'var(--line)')+'" stroke-width="3.4"/><circle cx="18" cy="18" r="15.9" fill="none" stroke="'+c+'" stroke-width="3.4" stroke-linecap="round" pathLength="100" stroke-dasharray="'+Math.max(0,Math.min(100,p))+' 100"/></svg>'};
  const label=function(s,ch){return 'سورة '+SN[s-1]+' · '+(ch[0]===ch[1]?'الآية '+N(ch[0]):'الآيات '+N(ch[0])+'–'+N(ch[1]))};
  const prev=function(s,ch){const cs=chunks(s),i=cs.findIndex(function(c){return c[0]===ch[0]});return i>0?cs[i-1]:null};
  const ayText=function(s,a){return Q.v[s-1][a-1]};
  /* ---------- الصوت ---------- */
  let AQ=[],HZP=false,LASTURL='';
  const aud=function(h){const e=document.getElementById('hz-aud');if(!e)return;if(!h){e.hidden=true;e.innerHTML='';return}e.hidden=false;e.innerHTML=h};
  AU.addEventListener('ended',function(){if(HZP&&AQ.length){const n=AQ.shift();playOne(n[0],n[1])}else if(HZP){aud('')}});
  AU.addEventListener('error',function(){if(!HZP||!AU.getAttribute('src'))return;
    aud('تعذّر تشغيل الصوت داخل الصفحة. تأكد من الإنترنت وأن الصوت غير مكتوم. <a href="'+esc(LASTURL)+'" target="_blank" rel="noopener">افتح الملف الصوتي في تبويب جديد</a>')});
  AU.addEventListener('playing',function(){if(HZP)aud('')});
  function playOne(s,a){
    HZP=true;AP=null;try{renderMini()}catch(e){}
    LASTURL=ayahUrl(recById(S.rec),s,a);aud('جارٍ تحميل الصوت…');
    try{startAudio(LASTURL)}catch(e){aud('تعذّر تشغيل الصوت.')}
  }
  function playChunk(s,ch){AQ=[];for(let a=ch[0]+1;a<=ch[1];a++)AQ.push([s,a]);playOne(s,ch[0])}
  function stopA(){AQ=[];HZP=false;try{AU.pause()}catch(e){}aud('')}
  /* ---------- النطق: تعرّف على الصوت مع مقارنة مرنة ---------- */
  function fz(a,b){if(a===b)return true;if(Math.min(a.length,b.length)<3)return false;
    let i=0,j=0,d=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++}else{d++;if(d>1)return false;if(a.length>b.length)i++;else if(b.length>a.length)j++;else{i++;j++}}}return d+(a.length-i)+(b.length-j)<=1}
  function score(want,heard){
    const W2=want.map(skel).filter(Boolean),H2=heard.map(skel).filter(Boolean),n=W2.length,m=H2.length;
    const L=[];for(let i=0;i<=n;i++){L.push(new Array(m+1).fill(0))}
    for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)L[i][j]=fz(W2[i-1],H2[j-1])?L[i-1][j-1]+1:Math.max(L[i-1][j],L[i][j-1]);
    const miss=[];let i=n,j=m;const ok={};
    while(i>0&&j>0){if(fz(W2[i-1],H2[j-1])){ok[i-1]=1;i--;j--}else if(L[i-1][j]>=L[i][j-1])i--;else j--}
    W2.forEach(function(w,k){if(!ok[k])miss.push(k)});
    return {pct:n?Math.round(L[n][m]/n*100):0,miss:miss,W2:W2}}
  let REC1=null;
  function voice(s,a,btn){
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){aud('التعرّف على الصوت غير متاح في هذا المتصفح أو هذا العرض. جرّب فتح التطبيق في Chrome على جهازك، أو اقرأ بصوتك واكتفِ بخطوة «التلقين» للتأكد بنفسك.');return}
    if(REC1){try{REC1.stop()}catch(e){}REC1=null;return}
    stopA();const old=btn.textContent;btn.textContent='🎙 تكلّم الآن…';btn.classList.add('rec');
    const want=W(ayText(s,a)),rec=new SR();REC1=rec;rec.lang='ar-SA';rec.interimResults=false;rec.maxAlternatives=3;rec.continuous=false;
    let got=false;const done=function(){REC1=null;btn.textContent=old;btn.classList.remove('rec')};
    const to=setTimeout(function(){try{rec.stop()}catch(e){}},15000);
    rec.onresult=function(e){got=true;let best=null;
      for(let k=0;k<e.results[0].length;k++){const r=score(want,e.results[0][k].transcript.split(/\s+/).filter(Boolean));if(!best||r.pct>best.pct)best=r}
      const ws=want.filter(function(w){return skel(w)});const miss=best.miss.map(function(k){return ws[k]}).filter(Boolean);
      aud((best.pct>=85?'<b style="color:var(--accent)">ممتاز، ما شاء الله!</b> ':best.pct>=55?'<b>جيد، قريب!</b> ':'<b>حاول مرة أخرى بوضوح.</b> ')+'تطابق '+N(best.pct)+'%'+(miss.length&&best.pct<100?'<br>لم أسمع: <span style="font-family:var(--quran);font-size:1.15rem">'+esc(miss.slice(0,5).join(' · '))+'</span>':'')+'<br><small>(تقدير آلي قد يخطئ، والمرجع التلاوة على شيخ)</small>');
      if(best.pct>=85)SND.correct&&SND.correct();else SND.wrong&&SND.wrong()};
    rec.onerror=function(e){got=true;const er=e&&e.error;
      aud(er==='not-allowed'||er==='service-not-allowed'?'لم يُسمح بالميكروفون. فعّل إذن الميكروفون للتطبيق من إعدادات المتصفح ثم أعد المحاولة (قد لا يعمل داخل بعض العروض المضمّنة).':er==='no-speech'?'لم أسمع صوتًا. اقترب من الميكروفون وأعد المحاولة.':er==='audio-capture'?'لا يوجد ميكروفون متاح.':er==='network'?'التعرّف على الصوت يحتاج اتصالًا بالإنترنت.':'تعذّر التعرّف على الصوت ('+esc(er||'')+').')};
    rec.onend=function(){clearTimeout(to);if(!got)aud('لم أسمع شيئًا. أعد المحاولة وتكلّم بعد ظهور «تكلّم الآن».');done()};
    try{rec.start()}catch(e){done();aud('تعذّر بدء الميكروفون.')}
  }
  /* ---------- الشاشة الرئيسية ---------- */
  const box=function(){return document.getElementById('hifzbox')};
  function home(){
    css();const b=box();if(!b)return;
    if(!Q)loadQ().then(function(){if(box()&&!ST&&!HV)home()}).catch(function(){const n=document.getElementById('hz-net');if(n)n.hidden=false});
    (function(){
      const due=dueList(),nn=nextNew(S.hzl&&S.hzl.s),mk=Object.keys(hz()).length;
      let tot=0,done=0;HS.forEach(function(s){tot+=AYC[s-1];done+=hCount(s)});
      b.innerHTML=
       '<div class="hz-hero"><div class="in"><div class="hz-ring">'+ring(done/tot*100,'#fff')+'<span>'+N(Math.round(done/tot*100))+'%</span></div><div><h3>وردك اليوم</h3><p>'+(due.length?'عندك '+N(due.length)+' مقطع للمراجعة، راجعها أولًا ثم احفظ جديدًا.':(mk?'أحسنت! لا مراجعات الآن، ابدأ مقطعًا جديدًا بإذن الله.':'ابدأ أول مقطع لك. خطوات قصيرة وثابتة تصنع حفظًا راسخًا.'))+'</p><p style="margin-top:4px;font-size:.78rem;opacity:.85">'+N(done)+' من '+N(tot)+' آية</p></div></div>'+
       '<p id="hz-net" '+(Q?'hidden':'')+' style="position:relative;margin:10px 0 0;font-size:.82rem;background:rgba(0,0,0,.22);border-radius:12px;padding:6px 10px">'+(Q?'':'جارٍ تحميل نص القرآن… إن لم يظهر الزر فتحقّق من الاتصال ثم أعد فتح الصفحة.')+'</p>'+
       '<div class="hz-cta">'+(due.length?'<button class="hz-big pri" data-hz="rev">مراجعة ('+N(due.length)+')</button>':'')+'<button class="hz-big'+(due.length?'':' pri')+'" data-hz="new" '+(nn?'':'disabled')+'>'+(nn?'حفظ جديد · '+esc(SN[nn.s-1]):'أتممت كل المقاطع')+'</button></div></div>'+
       '<div class="hz-chips"><div><b>'+N(mk)+'</b><span>مقطع محفوظ</span></div><div><b>'+N(done)+'</b><span>آية محفوظة</span></div><div><b>'+N(due.length)+'</b><span>للمراجعة</span></div></div>'+
       HG.map(function(g){return '<div class="hz-sh">'+g[0]+'</div><div class="hz-sgrid">'+g[1].map(function(s){const c=hCount(s),t=AYC[s-1];return '<button class="hz-sr'+(c>=t?' full':'')+'" data-hs="'+s+'"><span class="no">'+N(s)+'</span><b>'+SN[s-1]+'</b><span class="mr">'+ring(c/t*100)+'<span>'+(c>=t?'✓':N(c))+'</span></span></button>'}).join('')+'</div>'}).join('')+
       '<p class="fine">الأصل في الحفظ المراجعة على شيخ متقن؛ هذه الصفحة تعينك على التكرار والمراجعة المتباعدة (غدًا، ثم 3 أيام، ثم أسبوع…).</p>';
    })();
  }
  /* ---------- صفحة السورة: قائمة المقاطع ---------- */
  function surah(s){
    css();const b=box();if(!b)return;
    if(!Q){b.innerHTML='<div class="hz-top"><button class="iconbtn" data-act="hback" aria-label="رجوع">'+IC.back+'</button><h2>حفظ سورة '+SN[s-1]+'</h2><span style="width:44px"></span></div><p class="hz-help">جارٍ تحميل نص القرآن…</p>'}
    loadQ().then(function(){
      const cs=chunks(s),nn=cs.findIndex(function(c){return status(s,c)==='new'});
      const cnt=hCount(s),tt=AYC[s-1];
      b.innerHTML='<div class="hz-top"><button class="iconbtn" data-act="hback" aria-label="رجوع">'+IC.back+'</button><h2>حفظ سورة '+SN[s-1]+'</h2><span style="width:44px"></span></div>'+
       '<div class="hz-shead"><div class="nm"><b>'+SN[s-1]+'</b><span>'+N(cs.length)+' مقاطع · '+N(tt)+' آية</span></div><div class="hz-ring" style="width:64px;height:64px;color:var(--accent)">'+ring(cnt/tt*100)+'<span style="font-size:.85rem">'+N(Math.round(cnt/tt*100))+'%</span></div></div>'+
       (nn>=0?'<div class="hz-row" style="margin-bottom:12px"><button class="pri" data-hz="learn" data-s="'+s+'" data-a="'+cs[nn][0]+'" data-b="'+cs[nn][1]+'">ابدأ حفظ المقطع '+N(nn+1)+'</button></div>':'<p class="hz-help"><b>ما شاء الله، أتممت مقاطع السورة.</b> حافظ على مراجعتها.</p>')+
       cs.map(function(ch,i){const st=status(s,ch),r=rec(s,ch),w=W(ayText(s,ch[0])).slice(0,5).join(' ');
        const pill=st==='new'?'<span class="hz-pill new">جديد</span>':st==='due'?'<span class="hz-pill due">راجِع</span>':st==='strong'?'<span class="hz-pill strong">متقن</span>':'<span class="hz-pill">المستوى '+N(r?r.l:1)+'</span>';
        return '<button class="hz-ch'+(i===nn?' cur':'')+'" data-hz="'+(st==='new'?'learn':'revone')+'" data-s="'+s+'" data-a="'+ch[0]+'" data-b="'+ch[1]+'"><span class="n s-'+st+'">'+(st==='ok'||st==='strong'?'✓':N(i+1))+'</span><span class="t"><b>'+(ch[0]===ch[1]?'الآية '+N(ch[0]):'الآيات '+N(ch[0])+'–'+N(ch[1]))+'</b><span>'+esc(w)+' …</span></span>'+pill+'</button>'}).join('');
    }).catch(function(){const bb=box();if(bb)bb.innerHTML='<div class="hz-top"><button class="iconbtn" data-act="hback" aria-label="رجوع">'+IC.back+'</button><h2>حفظ سورة '+SN[s-1]+'</h2><span style="width:44px"></span></div><p class="hz-help" style="color:#c0392b">تعذّر تحميل نص القرآن. تحقّق من الاتصال بالإنترنت ثم أعد المحاولة.</p><div class="hz-row"><button class="pri" data-hz="retry" data-s="'+s+'">إعادة المحاولة</button></div>'});
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
  function dots(){return '<div class="hz-steps">'+STEPS.map(function(n,i){return '<span class="'+(i<ST.step?'on':i===ST.step?'cur':'')+'"><i>'+(i<ST.step?'✓':N(i+1))+'</i><b>'+n+'</b></span>'}).join('')+'</div>'}
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
       '<div class="hz-row fix"><button class="pri" data-hz="go">تابع إلى المقطع الجديد</button></div>';
    }else if(ST.step===1){
      h+='<p class="hz-stepname">٢) استمع وتابع بعينيك</p><p class="hz-help">استمع إلى المقطع مرتين أو ثلاثًا وأنت تنظر في النص، دون أن تردّد بعد.</p><div class="hz-q">'+
       ayCards(s,ch,function(a){return '<div class="hz-ay">'+esc(ayText(s,a))+' <span class="no">'+N(a)+'</span></div>'})+
       '<div class="hz-row"><button class="pri" data-hz="playall">▶ استمع للمقطع</button><button data-hz="stopa">إيقاف</button></div></div>'+
       '<p class="hz-help" id="hz-heard">'+(ST.heard?'استمعت '+N(ST.heard)+' مرات':'')+'</p>'+
       '<div class="hz-row fix"><button class="pri" data-hz="go" '+(ST.heard>=1?'':'disabled')+'>تابع إلى التكرار</button></div>';
    }else if(ST.step===2){
      let all=true;
      h+='<p class="hz-stepname">٣) كرّر بصوت مسموع</p><p class="hz-help">انظر في النص وردّد كل آية '+N(REPS)+' مرات، واضغط الزر عند كل مرة.</p>'+
       ayCards(s,ch,function(a){const c=ST.rep[a]||0,d=c>=REPS;if(!d)all=false;
        return '<div class="hz-q"><div class="hz-ay">'+esc(ayText(s,a))+' <span class="no">'+N(a)+'</span></div>'+
         '<div class="hz-rr"><button class="sm" data-hz="play1" data-a="'+a+'">▶ استمع</button><button class="hz-cc'+(d?' done':'')+'" style="--p:'+Math.min(100,c/REPS*100)+'" data-hz="rep" data-a="'+a+'" aria-label="كرّرتها"><span>'+(d?'✓':N(c)+'/'+N(REPS))+'</span></button><button class="sm" data-hz="voice" data-a="'+a+'">🎙 نطقي</button></div></div>'}) +
       '<div class="hz-row fix"><button class="pri" data-hz="go" '+(all?'':'disabled')+'>تابع إلى التلقين</button></div>';
    }else if(ST.step===3){
      const t=['أخفينا ثلث الكلمات: أكمل الناقص من ذاكرتك ثم اضغط عليه للتأكد.','أخفينا معظم الكلمات: جرّب أن تقرأ الآيات وتتذكر الناقص.','أخفينا النص كله: اقرأ من ذاكرتك، واضغط على أي كلمة للتأكد منها. التلميح يُظهر الحرف الأول.'];
      h+='<p class="hz-stepname">٤) التلقين التدريجي ('+N(ST.rnd)+' من '+N(3)+')</p><p class="hz-help">'+t[ST.rnd-1]+'</p><div class="hz-q">'+
       ayCards(s,ch,function(a){return '<div class="hz-ay">'+words(s,a,ST.rnd,ST.rv,ST.hint)+'</div>'})+
       '<div class="hz-row"><button data-hz="hint">'+(ST.hint?'إخفاء التلميح':'تلميح: الحرف الأول')+'</button><button data-hz="reshow">أعد الإخفاء</button><button data-hz="play1" data-a="'+ch[0]+'">▶ استمع</button></div></div>'+
       '<div class="hz-row fix"><button class="pri" data-hz="go">'+(ST.rnd<3?'الجولة التالية':'إلى الاختبار')+'</button></div>';
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
    box().innerHTML=h+'<div id="hz-aud" class="hz-help hz-audbox" role="status" aria-live="polite" hidden></div>';
  }
  function qView(title){
    const q=ST.qs[ST.qi],a=ST.ans;
    return '<p class="hz-stepname">'+title+'</p><div class="hz-bar"><i style="width:'+(ST.qi/ST.qs.length*100)+'%"></i></div><div class="hz-q"><div class="hz-stem">'+(q.long?q.stem:q.stem)+'</div>'+
      q.opts.map(function(o,i){const cl=a==null?'':(o===q.ans?' ok':(i===a?' no':''));return '<button class="hz-opt'+cl+'" data-hz="opt" data-i="'+i+'" '+(a==null?'':'disabled')+'><i>'+'أبجد'.charAt(i)+'</i>'+esc(o)+'</button>'}).join('')+
      (a==null?'':'<div class="hz-fb '+(q.opts[a]===q.ans?'ok':'no')+'">'+(q.opts[a]===q.ans?'أحسنت!':'الصحيح هو المظلَّل')+'</div><div class="hz-row fix"><button class="pri" data-hz="qnext">التالي</button></div>')+'</div>';
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
    box().innerHTML='<div class="hz-done"><div>'+hoopoe('love',110)+'</div><h3>ثبّت الله حفظك</h3><p class="muted">'+esc(label(s,ch))+'<br>موعد مراجعته القادمة: <b>غدًا</b> بإذن الله، ثم بعد 3 أيام، ثم أسبوع.</p>'+
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
      h+='<p class="hz-help">أولًا: أكمل من ذاكرتك.</p><div class="hz-q"><div class="hz-stem">'+ST.q.stem+'</div>'+ST.q.opts.map(function(o,i){const a=ST.ans,cl=a==null?'':(o===ST.q.ans?' ok':(i===a?' no':''));return '<button class="hz-opt'+cl+'" data-hz="ropt" data-i="'+i+'" '+(a==null?'':'disabled')+'><i>'+'أبجد'.charAt(i)+'</i>'+esc(o)+'</button>'}).join('')+'</div>';
    }else{
      const ok=ST.q.opts[ST.ans]===ST.q.ans;
      h+='<p class="hz-help">'+(ok?'أحسنت! الآن اقرأ المقطع كاملًا من ذاكرتك، ثم أظهر النص وقيّم نفسك بصدق.':'الصحيح مظلَّل. اقرأ المقطع من ذاكرتك ثم أظهر النص وقيّم نفسك.')+'</p><div class="hz-q">'+
       ayCards(s,ch,function(a){return '<div class="hz-ay" style="'+(ST.shown?'':'filter:blur(9px)')+'">'+esc(ayText(s,a))+' <span class="no">'+N(a)+'</span></div>'})+
       '<div class="hz-row">'+(ST.shown?'<button data-hz="play1" data-a="'+ch[0]+'">▶ استمع</button>':'<button class="pri" data-hz="rshow">أظهر النص</button>')+'</div></div>'+
       (ST.shown?'<div class="hz-rate">'+(ok?'<button class="g" data-hz="rate" data-v="2">أتقنته بلا تردد</button>':'')+'<button data-hz="rate" data-v="1">تردّدت قليلًا</button><button class="r" data-hz="rate" data-v="0">نسيت أجزاء منه</button></div>':'');
    }
    b.innerHTML=h+'<div id="hz-aud" class="hz-help hz-audbox" role="status" aria-live="polite" hidden></div>';
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
    if(z==='retry'){HV=+d.s;surah(HV);return}
    if(z==='exit'){stopA();ST=null;if(HV)surah(HV);else home();return}
    if(!ST)return;
    if(z==='w'){ST.rv[d.k]=!ST.rv[d.k];view();return}
    if(z==='prevshow'){ST.prev&&ST.prev&&(ST.rv['p'+ST.prev[0]]=1,(function(){for(let a=ST.prev[0];a<=ST.prev[1];a++)ST.rv['p'+a]=1})());view();return}
    if(z==='playall'){playChunk(ST.s,ST.ch);ST.heard++;const el=document.getElementById('hz-heard');if(el)el.textContent='استمعت '+N(ST.heard)+' مرات';const g=document.querySelector('[data-hz="go"]');if(g)g.disabled=false;return}
    if(z==='stopa'){stopA();return}
    if(z==='voice'){voice(ST.s,+d.a,t);return}
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
