/* ===== ألعاب مصغّرة: 6 ألعاب تعليمية ===== */
(function(){
  const MG_LIST=[
    ['match','تطابق الأدلة','صِل كل دليل بما يناسبه'],
    ['order','رتّب الآية','أعد ترتيب كلمات الآية'],
    ['blank','أكمل الفراغ','اختر الكلمة الناقصة'],
    ['where','من أين الآية؟','حدّد السورة'],
    ['tf','صح أم خطأ','حسم سريع بالوقت'],
    ['race','سباق الحسنات','أسئلة تتسارع وثلاث فرص']
  ];
  const HAD=[
    ['«إنما الأعمال بالنيات»','النية'],
    ['«الدين النصيحة»','النصيحة'],
    ['«فليقل خيرًا أو ليصمت»','حفظ اللسان'],
    ['«لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه»','الأخوّة'],
    ['«الطهور شطر الإيمان»','الطهارة'],
    ['«بُني الإسلام على خمس»','أركان الإسلام'],
    ['«تبسمك في وجه أخيك صدقة»','الصدقة'],
    ['«خيركم من تعلّم القرآن وعلّمه»','فضل القرآن'],
    ['«الحياء من الإيمان»','الحياء'],
    ['«المسلم من سلم المسلمون من لسانه ويده»','صفة المسلم']
  ];
  const TFB=[
    ['عدد أركان الإسلام خمسة',1,'بُني الإسلام على خمس.'],
    ['عدد أركان الإيمان ستة',1,'الإيمان بالله وملائكته وكتبه ورسله واليوم الآخر والقدر.'],
    ['الصلوات المفروضة في اليوم والليلة خمس',1,'الفجر والظهر والعصر والمغرب والعشاء.'],
    ['صيام رمضان من أركان الإسلام',1,'هو الركن الرابع.'],
    ['الحج واجب على كل مسلم في كل عام',0,'يجب مرة واحدة في العمر لمن استطاع.'],
    ['الزكاة تُصرف في ثمانية أصناف',1,'ذكرها الله في سورة التوبة.'],
    ['سورة الفاتحة تُسمّى أم الكتاب',1,'ومن أسمائها السبع المثاني.'],
    ['سورة الإخلاص تبدأ بـ «تبّت يدا»',0,'تلك سورة المسد، وسورة الإخلاص تبدأ بـ «قل هو الله أحد».'],
    ['عدد سور القرآن 114 سورة',1,'أولها الفاتحة وآخرها الناس.'],
    ['أطول سورة في القرآن هي البقرة',1,'وعدد آياتها 286.'],
    ['أقصر سورة في القرآن هي الكوثر',1,'وآياتها ثلاث.'],
    ['نزل القرآن أول مرة في شهر شعبان',0,'نزل في رمضان، في ليلة القدر.'],
    ['أول ما نزل من القرآن «اقرأ باسم ربك الذي خلق»',1,'من سورة العلق.'],
    ['الوضوء يبطله خروج شيء من السبيلين',1,'وهو من نواقض الوضوء.'],
    ['المغرب ثلاث ركعات',1,'والفجر ركعتان.'],
    ['صلاة الظهر خمس ركعات',0,'الظهر أربع ركعات.'],
    ['الفجر أربع ركعات',0,'الفجر ركعتان.'],
    ['الكعبة المشرّفة في المدينة المنورة',0,'في مكة المكرمة.'],
    ['المسجد النبوي في المدينة المنورة',1,'بناه النبي ﷺ بعد الهجرة.'],
    ['هاجر النبي ﷺ من مكة إلى المدينة',1,'وهي الهجرة النبوية.'],
    ['أبو بكر الصديق هو أول الخلفاء الراشدين',1,'ثم عمر ثم عثمان ثم علي رضي الله عنهم.'],
    ['الملك الموكّل بالوحي هو جبريل عليه السلام',1,'وهو الروح الأمين.'],
    ['نبي الله موسى عليه السلام أُرسل بالإنجيل',0,'الإنجيل لعيسى، وموسى أُنزلت عليه التوراة.'],
    ['أُنزلت الزبور على داود عليه السلام',1,'وهو من الكتب المنزلة.'],
    ['الحجر الأسود في الكعبة',1,'يبدأ منه الطواف.'],
    ['الأذان يُرفع لإعلام دخول وقت الصلاة',1,'وهو من شعائر الإسلام.'],
    ['صلاة الجمعة تُصلّى ركعتين بعد خطبتين',1,'تُصلّى في وقت الظهر يوم الجمعة.'],
    ['ليلة القدر خير من ألف شهر',1,'كما في سورة القدر.'],
    ['يجوز الأكل في نهار رمضان لغير عذر',0,'الصيام فرض على المسلم القادر المقيم.'],
    ['الصدقة تُطفئ الخطيئة كما يُطفئ الماء النار',1,'جاء في الحديث الشريف.']
  ];
  let M=null,QQ=null;
  window.MGS=function(){return M};
  function rnd(n){return Math.floor(Math.random()*n)}
  function words(v){return String(v).split(' ').filter(Boolean)}
  /* فهرس الآيات المتفرّدة (لتفادي آيات مكرّرة بين سور) */
  let UNIQ=null;
  function uniq(){
    if(UNIQ)return UNIQ;
    const c={};
    QQ.v.forEach(function(vs){vs.forEach(function(t){c[t]=(c[t]||0)+1})});
    UNIQ=c;return c;
  }
  function randVerse(minS,maxS,minW,maxW){
    const u=uniq();
    for(let g=0;g<400;g++){
      const s=minS+rnd(maxS-minS+1),vs=QQ.v[s-1],a=rnd(vs.length),w=words(vs[a]);
      if(w.length>=minW&&w.length<=maxW&&u[vs[a]]===1)return {s:s,a:a,w:w,t:vs[a]};
    }
    return null;
  }
  function pct15(ok,total){return Math.max(0,Math.round(15*ok/Math.max(1,total)))}
  function open(kind){
    loadQ().then(function(q){
      QQ=q;
      M={kind:kind,i:0,ok:0,bad:0,total:0,lock:false,timer:0,state:'play'};
      openOverlay();
      ({match:startMatch,order:startOrder,blank:startBlank,where:startWhere,tf:startTF,race:startRace})[kind]();
    }).catch(function(){toast('تعذّر تحميل المصحف')});
  }
  function frame(inner,prog,extra){
    $('#lesson').innerHTML='<div class="ltop mgtop"><button class="xbtn" data-mg="quit" aria-label="خروج">'+IC.x+'</button><div class="bar'+(M.kind==='tf'||M.kind==='race'?' tm':'')+'" role="progressbar"><i id="mgbar" style="width:'+prog+'%"></i></div>'+(extra||'')+'</div><div class="lmain mgmain">'+inner+'</div>';
  }
  function say(mood){return '<div class="say" style="margin:0"><div class="mas">'+hoopoe(mood||'happy',56)+'</div></div>'}
  function clearT(){if(M&&M.timer){clearInterval(M.timer);M.timer=0}}
  function finish(title){
    clearT();
    const pts=M.kind==='race'?Math.min(30,M.ok*2):pct15(M.ok,M.total||M.rounds||1);
    addXP(pts);S.games=(S.games||0)+1;act('game');save();
    const good=M.kind==='race'?M.ok>=5:M.ok/(M.total||1)>=.5;
    good?SND.win():SND.lose();
    $('#lesson').innerHTML='<div class="lmain"><div class="center"><div class="mas">'+hoopoe(good?'cheer':'sad',140)+'</div><h2>'+title+'</h2><div class="statr"><div class="stat"><b>'+N(M.ok)+(M.kind==='race'?'':'/'+N(M.total))+'</b><span>إجابات صحيحة</span></div><div class="stat"><b>+'+N(pts)+'</b><span>نقاط الحساب</span></div></div></div></div>'+
      '<div class="lfoot"><div class="in" style="display:grid;gap:10px"><button class="btn" data-mg="again">العب مرة أخرى</button><button class="btn ghost" data-mg="quit">العودة إلى الألعاب</button></div></div>';
    try{confetti()}catch(e){}
    M.state='done';
  }
  function next(delay,fn){M.lock=true;setTimeout(function(){if(M&&M.state==='play'){M.lock=false;fn()}},delay)}
  function optBtns(opts,done,sel,corr){
    return '<div class="opts">'+opts.map(function(o,i){
      let c='';if(done){if(i===corr)c=' right';else if(i===sel)c=' wrong'}
      return '<button class="opt'+c+'" data-mg="o:'+i+'"'+(done?' disabled':'')+'><span class="k">'+N(i+1)+'</span><span>'+o+'</span></button>'}).join('')+'</div>';
  }

  /* 1) تطابق الأدلة */
  function startMatch(){
    M.total=5;M.pairs=[];
    if(Math.random()<.5){
      const used=[];let g=0;
      while(M.pairs.length<5&&g++<80){
        const s=78+rnd(37),v=randVerse(s,s,3,7);
        if(!v||used.includes(s)||M.pairs.some(function(p){return p[0]===v.t}))continue;
        used.push(s);M.pairs.push(['﴿'+v.t+'﴾','سورة '+SN[s-1]]);
      }
    }
    if(M.pairs.length<5)M.pairs=shuffle(HAD).slice(0,5);
    M.L=shuffle(M.pairs.map(function(p,i){return {i:i,t:p[0]}}));
    M.R=shuffle(M.pairs.map(function(p,i){return {i:i,t:p[1]}}));
    M.sel=-1;M.done={};M.mis=0;
    renderMatch();
  }
  function renderMatch(){
    const n=Object.keys(M.done).length;
    const col=function(arr,side){return '<div class="mgcol">'+arr.map(function(x){
      const d=M.done[x.i],s=(side==='l'&&M.sel===x.i);
      return '<button class="mgm'+(d?' ok':'')+(s?' on':'')+'" data-mg="m:'+side+':'+x.i+'"'+(d?' disabled':'')+'>'+x.t+'</button>'}).join('')+'</div>'};
    frame('<h2 class="qtext">صِل كل دليل بما يناسبه</h2>'+say(M.mood)+'<div class="mgcols">'+col(M.L,'l')+col(M.R,'r')+'</div><p class="muted" style="text-align:center">أخطأت '+N(M.mis)+' مرة</p>',Math.round(n/5*100));
  }
  function tapMatch(side,i){
    if(M.lock||M.done[i])return;
    if(side==='l'){M.sel=(M.sel===i)?-1:i;SND.tap();return renderMatch()}
    if(M.sel<0){toast('اختر الدليل أولًا');return}
    if(M.sel===i){M.done[i]=1;M.sel=-1;M.mood='happy';SND.correct();if(Object.keys(M.done).length===5){M.ok=Math.max(0,5-M.mis);renderMatch();setTimeout(function(){finish('أحسنت!')},500);return}}
    else{M.mis++;M.mood='sad';SND.wrong();M.sel=-1}
    renderMatch();
  }

  /* 2) رتّب الآية */
  function startOrder(){M.rounds=6;M.total=6;M.i=0;nextOrder()}
  function nextOrder(){
    if(M.i>=M.rounds)return finish('انتهت الجولة!');
    const v=randVerse(78,114,4,7);if(!v){toast('تعذّر إيجاد آية');return finish('انتهت الجولة')}
    M.v=v;M.pos=0;M.hit=true;M.chips=shuffle(v.w.map(function(w,i){return {w:w,i:i}}));M.placed=[];
    renderOrder();
  }
  function renderOrder(){
    const placed=M.placed.map(function(i){return '<span class="chipw ok">'+M.v.w[i]+'</span>'}).join('');
    const chips=M.chips.map(function(c){const used=M.placed.includes(c.i);return '<button class="chipw'+(used?' used':'')+'" data-mg="c:'+c.i+'"'+(used?' disabled':'')+'>'+c.w+'</button>'}).join('');
    frame('<h2 class="qtext">رتّب كلمات الآية<small class="muted" style="display:block;font-size:.8rem">من سورة '+SN[M.v.s-1]+'</small></h2>'+say(M.mood)+'<div class="mgans">'+(placed||'<span class="muted">اضغط الكلمات بالترتيب</span>')+'</div><div class="mgchips">'+chips+'</div>',Math.round(M.i/M.rounds*100),'<div class="chip"><span>'+N(M.i+1)+'/'+N(M.rounds)+'</span></div>');
  }
  function tapChip(i){
    if(M.lock)return;
    if(i===M.pos){M.placed.push(i);M.pos++;M.mood='happy';SND.tap();
      if(M.pos===M.v.w.length){if(M.hit)M.ok++;SND.correct();renderOrder();M.i++;return next(900,nextOrder)}}
    else{M.hit=false;M.mood='sad';SND.wrong();toast('ليست الكلمة التالية')}
    renderOrder();
  }

  /* 3) أكمل الفراغ */
  function startBlank(){M.rounds=8;M.total=8;M.i=0;nextBlank()}
  function nextBlank(){
    if(M.i>=M.rounds)return finish('انتهت الجولة!');
    const v=randVerse(50,114,5,11);if(!v)return finish('انتهت الجولة');
    const cand=[];v.w.forEach(function(w,i){if(i>0&&i<v.w.length-1&&w.length>=3)cand.push(i)});
    if(!cand.length)return nextBlank();
    const k=pick(cand),c=v.w[k],ws=[];
    QQ.v[v.s-1].forEach(function(t){words(t).forEach(function(x){if(x!==c&&x.length>=3&&!ws.includes(x))ws.push(x)})});
    const w3=shuffle(ws).slice(0,3);if(w3.length<3)return nextBlank();
    M.v=v;M.k=k;M.c=c;M.opts=shuffle([c].concat(w3));M.sel=-1;M.hint=false;M.answered=false;
    renderBlank();
  }
  function renderBlank(){
    const sh=M.v.w.map(function(w,i){return i===M.k?'<span class="blk">____</span>':w}).join(' ');
    const corr=M.opts.indexOf(M.c);
    frame('<h2 class="qtext">أكمل الآية<small class="muted" style="display:block;font-size:.8rem">من سورة '+SN[M.v.s-1]+'</small></h2>'+say(M.mood)+'<div class="mgverse">﴿ '+sh+' ﴾</div>'+optBtns(M.opts,M.answered,M.sel,corr)+
      (M.answered?'':'<button class="btn ghost sm" data-mg="hint"'+(M.hint?' disabled':'')+'>تلميح: احذف خيارًا</button>'),Math.round(M.i/M.rounds*100),'<div class="chip"><span>'+N(M.i+1)+'/'+N(M.rounds)+'</span></div>');
  }
  function answerBlank(i){
    if(M.lock||M.answered)return;
    M.answered=true;M.sel=i;const ok=M.opts[i]===M.c;
    if(ok){M.ok++;M.mood='happy';SND.correct()}else{M.mood='sad';SND.wrong()}
    renderBlank();M.i++;next(1100,nextBlank);
  }
  function hintBlank(){
    if(M.hint||M.answered)return;M.hint=true;
    const wrong=M.opts.map(function(o,i){return i}).filter(function(i){return M.opts[i]!==M.c});
    const rm=pick(wrong);M.opts[rm]='—';renderBlank();
  }

  /* 4) من أين الآية؟ */
  function startWhere(){M.rounds=8;M.total=8;M.i=0;nextWhere()}
  function nextWhere(){
    if(M.i>=M.rounds)return finish('انتهت الجولة!');
    const v=randVerse(50,114,4,10);if(!v)return finish('انتهت الجولة');
    const s=[v.s];let g=0;while(s.length<4&&g++<60){const x=50+rnd(65);if(!s.includes(x))s.push(x)}
    M.v=v;M.opts=shuffle(s.map(function(x){return 'سورة '+SN[x-1]}));M.c='سورة '+SN[v.s-1];M.sel=-1;M.answered=false;
    renderWhere();
  }
  function renderWhere(){
    frame('<h2 class="qtext">من أي سورة هذه الآية؟</h2>'+say(M.mood)+'<div class="mgverse">﴿ '+M.v.t+' ﴾</div>'+optBtns(M.opts,M.answered,M.sel,M.opts.indexOf(M.c))+(M.answered?'<p class="muted" style="text-align:center">'+M.c+'، الآية رقم '+N(M.v.a+1)+'</p>':''),Math.round(M.i/M.rounds*100),'<div class="chip"><span>'+N(M.i+1)+'/'+N(M.rounds)+'</span></div>');
  }
  function answerWhere(i){
    if(M.lock||M.answered)return;
    M.answered=true;M.sel=i;const ok=M.opts[i]===M.c;
    if(ok){M.ok++;M.mood='happy';SND.correct()}else{M.mood='sad';SND.wrong()}
    renderWhere();M.i++;next(1500,nextWhere);
  }

  /* 5) صح أم خطأ */
  function startTF(){M.rounds=10;M.total=10;M.i=0;M.qs=shuffle(TFB).slice(0,10);nextTF()}
  function nextTF(){
    if(M.i>=M.rounds)return finish('انتهت الجولة!');
    M.cur=M.qs[M.i];M.answered=false;M.sel=-1;M.t0=Date.now();M.left=8;
    renderTF();clearT();
    M.timer=setInterval(function(){
      M.left=Math.max(0,8-(Date.now()-M.t0)/1000);
      const b=$('#mgbar');if(b)b.style.width=(M.left/8*100)+'%';
      if(M.left<=0){clearT();answerTF(-1)}
    },100);
  }
  function renderTF(){
    const q=M.cur,a=M.answered;
    frame('<h2 class="qtext">'+q[0]+'</h2>'+say(M.mood)+'<div class="mgtf"><button class="opt'+(a&&q[1]===1?' right':'')+(a&&M.sel===1&&q[1]!==1?' wrong':'')+'" data-mg="t:1"'+(a?' disabled':'')+'>صح</button><button class="opt'+(a&&q[1]===0?' right':'')+(a&&M.sel===0&&q[1]!==0?' wrong':'')+'" data-mg="t:0"'+(a?' disabled':'')+'>خطأ</button></div>'+(a?'<p class="mgnote">'+esc(q[2])+'</p>':''),100,'<div class="chip"><span>'+N(M.i+1)+'/'+N(M.rounds)+'</span></div>');
    const b=$('#mgbar');if(b)b.style.width=(M.left/8*100)+'%';
  }
  function answerTF(v){
    if(M.answered)return;clearT();M.answered=true;M.sel=v;
    if(v===M.cur[1]){M.ok++;M.mood='happy';SND.correct()}else{M.mood='sad';SND.wrong()}
    renderTF();M.i++;next(1500,nextTF);
  }

  /* 6) سباق الحسنات */
  function startRace(){
    const pool=[];
    Object.keys(B).forEach(function(f){if(f==='order')return;Object.keys(B[f]).forEach(function(l){(B[f][l]||[]).forEach(function(x){pool.push(mkG(f,l,x))})})});
    M.pool=shuffle(pool);M.i=0;M.lives=3;M.dur=15;M.total=0;nextRace();
  }
  function nextRace(){
    if(M.lives<=0||M.i>=M.pool.length)return finish('انتهى السباق!');
    const q=prepG(M.pool[M.i]);M.cur=q;M.answered=false;M.sel=-1;M.t0=Date.now();M.left=M.dur;
    renderRace();clearT();
    M.timer=setInterval(function(){
      M.left=Math.max(0,M.dur-(Date.now()-M.t0)/1000);
      const b=$('#mgbar');if(b)b.style.width=(M.left/M.dur*100)+'%';
      const s=$('#mgsec');if(s)s.textContent=N(Math.ceil(M.left));
      if(M.left<=0){clearT();answerRace(-1)}
    },100);
  }
  function renderRace(){
    const q=M.cur,a=M.answered;
    let hearts='';for(let i=0;i<3;i++)hearts+='<span class="mgh'+(i<M.lives?'':' off')+'">'+IC.gem+'</span>';
    frame('<div class="gmeta"><span class="pill"><span id="mgsec">'+N(Math.ceil(M.left))+'</span> ثانية</span><span class="pill">'+N(M.ok)+' صحيحة</span><span class="pill mgls">'+hearts+'</span></div><h2 class="qtext">'+q.q+'</h2>'+say(M.mood)+optBtns(q.opts,a,M.sel,q.opts.indexOf(q.c)),100);
    const b=$('#mgbar');if(b)b.style.width=(M.left/M.dur*100)+'%';
  }
  function answerRace(i){
    if(M.answered)return;clearT();M.answered=true;M.sel=i;M.total++;
    const q=M.cur;
    if(i>=0&&q.opts[i]===q.c){M.ok++;M.mood='happy';SND.correct();M.dur=Math.max(6,M.dur-.5)}
    else{M.lives--;M.mood='sad';SND.wrong()}
    renderRace();M.i++;next(1100,nextRace);
  }

  /* ---- ربط الأحداث ---- */
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-mg]');if(!b)return;
    const v=b.getAttribute('data-mg'),p=v.split(':');
    if(v.indexOf('open:')===0){e.stopPropagation();return open(p[1])}
    if(!M)return;
    e.stopPropagation();
    if(v==='quit'){clearT();const k=M.kind;M=null;closeOverlay();return}
    if(v==='again'){const k=M.kind;clearT();return open(k)}
    if(v==='hint')return hintBlank();
    if(p[0]==='o'){const i=+p[1];return M.kind==='blank'?answerBlank(i):M.kind==='where'?answerWhere(i):answerRace(i)}
    if(p[0]==='t')return answerTF(+p[1]);
    if(p[0]==='c')return tapChip(+p[1]);
    if(p[0]==='m')return tapMatch(p[1],+p[2]);
  },true);

  /* بطاقات الألعاب في صفحة الألعاب */
  const _pp=pagePlay;
  pagePlay=function(){
    _pp();
    const pg=$('#page');if(!pg)return;
    const sec=document.createElement('section');sec.className='sec';sec.style.marginTop='20px';
    sec.innerHTML='<h2>ألعاب مصغّرة</h2><div class="mggrid">'+MG_LIST.map(function(g){
      return '<button class="mgcard" data-mg="open:'+g[0]+'"><b>'+g[1]+'</b><small>'+g[2]+'</small></button>'}).join('')+'</div>';
    pg.insertBefore(sec,pg.firstChild);
  };
})();
