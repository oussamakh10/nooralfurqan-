/* ================= الإنجازات والتحديات ================= */
const DQ=[
 {k:'q',n:10,t:'أجب عن 10 أسئلة',r:20},
 {k:'lesson',n:1,t:'أتمّ درسًا واحدًا',r:15},
 {k:'ayah',n:10,t:'اقرأ 10 آيات وسجّلها',r:20},
 {k:'tafsir',n:3,t:'اقرأ تفسير 3 آيات',r:15},
 {k:'listen',n:1,t:'استمع إلى سورة أو آية أو حديث',r:10},
 {k:'game',n:1,t:'العب جولة في صفحة الألعاب',r:20},
 {k:'review',n:1,t:'أتمّ جلسة مراجعة',r:15},
 {k:'adhkar',n:1,t:'أتمّ أذكار الصباح أو المساء',r:15}
];
function todays(){const d=dayNo();return [0,3,5].map(function(o){return DQ[(d+o)%DQ.length]})}
const LT=[
 {t:'أجب عن 50 سؤالًا',n:50,cur:function(){return S.q}},
 {t:'7 أيام متتالية',n:7,cur:function(){return S.max}},
 {t:'أكمل جميع الدروس',n:ALL.length,cur:doneN},
 {t:'افتح 10 سور مختلفة',n:10,cur:openedN},
 {t:'استمع 10 مرات',n:10,cur:function(){return S.listen}},
 {t:'فُز على أصدقائك 3 مرات',n:3,cur:function(){return S.wins}},
 {t:'اجمع 500 نقطة',n:500,cur:function(){return S.xp}},
 {t:'اجمع 10,000 حسنة',n:10000,cur:function(){return S.has.t}},
 {t:'أتمّ ختمة كاملة',n:1,cur:function(){return S.khat.n}}
];
const BADGES=[
 {t:'الخطوة الأولى',d:'أتمم أول درس',ok:function(){return doneN()>=1}},
 {t:'ثلاثة أيام',d:'3 أيام متتالية',ok:function(){return S.max>=3}},
 {t:'أسبوع كامل',d:'7 أيام متتالية',ok:function(){return S.max>=7}},
 {t:'مئة نقطة',d:'اجمع 100 نقطة',ok:function(){return S.xp>=100}},
 {t:'قارئ',d:'افتح 5 سور',ok:function(){return openedN()>=5}},
 {t:'مستمع',d:'استمع 5 مرات',ok:function(){return S.listen>=5}},
 {t:'متعلّم',d:'أجب 50 سؤالًا',ok:function(){return S.q>=50}},
 {t:'بطل التحدي',d:'فُز على صديق 3 مرات',ok:function(){return S.wins>=3}},
 {t:'ألف حسنة',d:'اجمع 1000 حسنة',ok:function(){return S.has.t>=1000}},
 {t:'حافظ صغير',d:'احفظ 10 آيات',ok:function(){let n=0;for(const k in S.hifz)n+=S.hifz[k].length;return n>=10}},
 {t:'مراجع',d:'أتمم 5 جلسات مراجعة',ok:function(){return (S.rev||0)>=5}},
 {t:'سريع',d:'اجمع 100 نقطة في جولة 60 ثانية',ok:function(){return (S.bestB||0)>=100}}
];
function hasSum(n){return sumDays(S.has.d,n)}
function pageAch(){
  if(!doneN()){$('#page').innerHTML='<div class="wrap-pad">'+emptyBox('happy','إنجازاتك تبدأ من هنا','أكمل أول مرحلة في التعلّم لتبدأ سلسلتك ويُسجَّل أول إنجاز. كل خطوة تُحسب.','<button class="btn gold sm" data-go="learn">ابدأ التعلّم</button>')+'</div>'+accountSec().replace('style="margin-top:16px"','');return}
  const ds=dayState(),acc=S.q?Math.round(S.qc/S.q*100):0;
  const AR=['ح','ن','ث','ر','خ','ج','س'];
  let wk='',bars='',mx=1;const vals=[];
  for(let i=6;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);
    wk+='<div class="'+(S.days[ymd(d)]?'on':'')+(i===0?' now':'')+'"><i>'+IC.flameW+'</i><span>'+AR[d.getDay()]+'</span></div>';
    const v=S.has.d[ymd(d)]||0;vals.push([v,AR[d.getDay()]]);mx=Math.max(mx,v);
  }
  bars=vals.map(function(x){return '<div title="'+N(x[0])+'"><i style="height:'+Math.max(3,Math.round(x[0]/mx*88))+'px"></i><span>'+x[1]+'</span></div>'}).join('');
  const wx=weekSum(S.xpd),wkd=S.wkc[weekKey()];
  let h=accountSec()+'<section class="sec"><h2>حسناتي</h2>'+
   '<div class="card" style="text-align:center;display:grid;gap:4px"><div style="display:grid;place-items:center">'+hoopoe(S.has.t?'cheer':'happy',70)+'</div><div class="bigs">'+N(S.has.t)+'</div><small class="muted">مجموع حسناتك منذ بدأت المسيرة</small></div>'+
   '<div class="stats"><div class="stat"><b>'+N(hasSum(1))+'</b><span>اليوم</span></div><div class="stat"><b>'+N(hasSum(7))+'</b><span>آخر 7 أيام</span></div>'+
   '<div class="stat"><b>'+N(hasSum(30))+'</b><span>آخر 30 يومًا</span></div><div class="stat"><b>'+N(S.has.t)+'</b><span>المسيرة كلها</span></div></div>'+
   '<div class="card"><div class="lbl">حسناتك في آخر 7 أيام</div><div class="bars">'+bars+'</div></div>'+
   '<p class="muted" style="font-size:.85rem">الحسنات هنا تقدير للتحفيز، لا حساب فعلي: عشر حسنات لكل حرف، مأخوذ من حديث «الحسنة بعشر أمثالها». الله وحده يعلم الجزاء.</p></section>'+
  '<section class="sec"><h2>إنجازاتي</h2><h3 class="sub">أرقامي</h3><div class="opts2"><button class="btn sm gold" data-act="share">شارك إنجازي كصورة</button><button class="btn sm ghost" data-act="buyfreeze">تجميد السلسلة ❄ ×'+N(S.freeze)+' (50 نقطة)</button></div><div class="stats">'+
   '<div class="stat"><b>'+N(S.xp)+'</b><span>نقطة</span></div><div class="stat"><b>'+N(streak())+'</b><span>أيام متتالية</span></div>'+
   '<div class="stat"><b>'+N(doneN())+'/'+N(ALL.length)+'</b><span>دروس مكتملة</span></div><div class="stat"><b>'+N(acc)+'%</b><span>دقة الإجابات</span></div></div>'+
   '<h3 class="sub">نشاطي</h3><div class="card"><div class="lbl" style="margin-bottom:8px">آخر 7 أيام</div><div class="week">'+wk+'</div></div></section>'+
  '<section class="sec"><h2>تحدي الأسبوع</h2><div class="card ch"><div class="row"><b>اجمع '+N(WK_TARGET)+' نقطة هذا الأسبوع</b><span class="pill">+50 نقطة</span></div><div class="pbar gold"><i style="width:'+Math.min(100,wx/WK_TARGET*100)+'%"></i></div>'+
   '<div class="row"><small class="muted">'+N(Math.min(wx,WK_TARGET))+' من '+N(WK_TARGET)+' · يتجدد كل سبت</small>'+(wkd?'<span class="pill">تم استلام النقاط</span>':'<button class="btn sm gold" data-act="wkclaim" '+(wx>=WK_TARGET?'':'disabled')+'>استلم</button>')+'</div></div>'+
   '<div class="card"><div class="lbl" style="margin-bottom:6px">لوحة الأسبوع (الأصدقاء)</div><div id="board"></div></div>'+
   '<div class="card"><div class="lbl" style="margin-bottom:6px">دائرتي (ختمة مشتركة)</div><div id="circ"></div></div></section>'+
  '<section class="sec"><h2>نقاط الضعف</h2>'+weakHtml()+'</section>';
  h+='<section class="sec"><h2>تحديات اليوم</h2>'+todays().map(function(c){
    const cur=Math.min(ds.p[c.k]||0,c.n),done=cur>=c.n,got=!!ds.c[c.k];
    return '<div class="card ch"><div class="row"><b>'+c.t+'</b><span class="pill">+'+N(c.r)+' نقطة</span></div>'+
      '<div class="pbar gold"><i style="width:'+(cur/c.n*100)+'%"></i></div>'+
      '<div class="row"><small class="muted">'+N(cur)+' من '+N(c.n)+'</small>'+
      (got?'<span class="pill">تم استلام النقاط</span>':'<button class="btn sm gold" data-claim="'+c.k+'" '+(done?'':'disabled')+'>استلم</button>')+'</div></div>';
  }).join('')+'<p class="muted" style="font-size:.88rem">تتجدد التحديات كل يوم.</p></section>';
  h+='<section class="sec"><h2>تحديات طويلة</h2>'+LT.map(function(c){
    const cur=Math.min(c.cur(),c.n);
    return '<div class="card ch"><div class="row"><b>'+c.t+'</b>'+(cur>=c.n?'<span class="pill">مكتمل</span>':'<small class="muted">'+N(cur)+' / '+N(c.n)+'</small>')+'</div>'+
      '<div class="pbar"><i style="width:'+(cur/c.n*100)+'%"></i></div></div>';
  }).join('')+'</section>';
  h+='<section class="sec"><h2>الأوسمة</h2><div class="badges">'+BADGES.map(function(b){
    const on=b.ok();
    return '<div class="bd'+(on?'':' off')+'"><div class="med">'+(on?IC.star:IC.lock)+'</div><b>'+b.t+'</b><small>'+b.d+'</small></div>';
  }).join('')+'</div></section>';
  $('#page').innerHTML=h;fillBoard();
}

/* ================= الألعاب ================= */
const BASE={e:10,m:15,h:20};
let GS={fields:F.map(function(f){return f.id}).filter(function(x){return x!=='order'&&x!=='ayat'}).concat(['ayat']),levels:['m'],count:10,timer:0,mode:'solo',players:['اللاعب 1','اللاعب 2']};
function mkG(f,l,x){
  if(f==='order')return {f:f,l:l,t:'ord',q:x[0],items:x.slice(1)};
  return {f:f,l:l,q:x[0],c:x[1],w:x.slice(2,5)};
}
function poolOf(blitz){
  const p=[];
  GS.fields.forEach(function(f){
    if(f==='ayat')return;
    if(blitz&&f==='order')return;
    GS.levels.forEach(function(l){(B[f]&&B[f][l]||[]).forEach(function(x){p.push(mkG(f,l,x))})});
  });
  return p;
}
function hasAyat(){return GS.fields.includes('ayat')}
function maxCount(){
  const n=poolOf().length+(hasAyat()?30:0);
  return GS.mode==='friends'?Math.floor(n/GS.players.length)*GS.players.length:n;
}
function pagePlay(){
  const pool=poolOf(GS.mode==='blitz').length,mc=maxCount(),bz=GS.mode==='blitz';
  const cnts=[5,10,15,20].filter(function(c){return c<=mc});
  if(!cnts.includes(GS.count))GS.count=cnts.length?cnts[Math.min(1,cnts.length-1)]:mc;
  const eff=Math.min(GS.count,mc);
  let h='<section class="sec" style="margin-top:16px"><h2>الألعاب</h2>'+
   '<div class="seg" role="group" aria-label="نوع اللعب"><button data-gmode="solo" aria-pressed="'+(GS.mode==='solo')+'">مع نفسي</button><button data-gmode="friends" aria-pressed="'+(GS.mode==='friends')+'">مع الأصدقاء</button><button data-gmode="blitz" aria-pressed="'+bz+'">60 ثانية</button></div>';
  if(bz)h+='<div class="card"><p class="muted" style="font-size:.92rem">أجب عن أكبر عدد من الأسئلة في ستين ثانية. كل إجابة صحيحة 10 نقاط، والتتابع يزيد المكافأة.</p></div>';
  if(GS.mode==='friends'){
    h+='<div class="card field"><span class="lbl">اللاعبون (على جهاز واحد، بالتناوب)</span>'+
     GS.players.map(function(n,i){return '<input type="text" maxlength="14" id="pl'+i+'" data-pl="'+i+'" value="'+esc(n)+'" aria-label="اسم اللاعب '+(i+1)+'">'}).join('')+
     '<div class="opts2">'+(GS.players.length<4?'<button class="btn sm ghost" data-act="addp">إضافة لاعب</button>':'')+(GS.players.length>2?'<button class="btn sm ghost" data-act="remp">حذف لاعب</button>':'')+'</div></div>';
  }
  h+='<div class="field"><span class="lbl">الميدان</span><div class="opts2">'+F.filter(function(f){return !(bz&&f.id==='order')}).map(function(f){return '<button class="tag" data-gf="'+f.id+'" aria-pressed="'+GS.fields.includes(f.id)+'">'+f.n+'</button>'}).join('')+'</div></div>'+
   '<div class="field"><span class="lbl">المستوى</span><div class="opts2">'+Object.keys(LV).map(function(l){return '<button class="tag" data-gl="'+l+'" aria-pressed="'+GS.levels.includes(l)+'">'+LV[l]+'</button>'}).join('')+'</div></div>';
  if(!bz)h+='<div class="field"><span class="lbl">عدد الأسئلة</span><div class="opts2">'+(cnts.length?cnts:[mc]).map(function(c){return '<button class="tag" data-gc="'+c+'" aria-pressed="'+(c===eff)+'">'+N(c)+'</button>'}).join('')+'</div></div>'+
   '<div class="field"><span class="lbl">الوقت لكل سؤال</span><div class="opts2">'+[[0,'بلا وقت'],[15,'15 ثانية'],[30,'30 ثانية']].map(function(t){return '<button class="tag" data-gt="'+t[0]+'" aria-pressed="'+(GS.timer===t[0])+'">'+t[1]+'</button>'}).join('')+'</div></div>';
  h+='<p class="muted" style="font-size:.9rem">الأسئلة الجاهزة بهذا الاختيار: '+N(pool)+(hasAyat()?' + أسئلة «أكمل الآية» تُولَّد من المصحف':'')+(GS.mode==='friends'?'. يُوزَّع العدد بالتساوي بين اللاعبين.':'.')+'</p>'+
   '<button class="btn" data-act="gstart" '+((mc<GS.players.length&&GS.mode==='friends')||!mc?'disabled':'')+'>ابدأ اللعب</button>';
  if(S.best)h+='<p class="muted" style="text-align:center">أفضل نتيجة فردية: '+N(S.best)+' نقطة'+(S.bestB?' · أفضل جولة 60 ثانية: '+N(S.bestB):'')+'</p>';
  h+='</section>';
  $('#page').innerHTML=h;
}
function buildPool(blitz,total){
  let p=poolOf(blitz);
  if(hasAyat()){
    return loadQ().then(function(){
      GS.levels.forEach(function(l){p=p.concat(genAyat(l,blitz?25:Math.max(10,total),null))});
      return shuffle(p);
    });
  }
  return Promise.resolve(shuffle(p));
}
function prepG(x){return x.t==='ord'?Object.assign({},x,{pool:shuffle(x.items)}):Object.assign({},x,{opts:shuffle([x.c].concat(x.w))})}
function startGame(){
  if(GS.mode==='blitz')return startBlitz();
  const np=GS.mode==='friends'?GS.players.length:1;
  let total=Math.min(GS.count,maxCount());total=Math.max(np,Math.floor(total/np)*np);
  buildPool(false,total).then(function(p){
    total=Math.min(total,Math.floor(p.length/np)*np);if(total<np){toast('لا توجد أسئلة كافية لهذا الاختيار.');return}
    const qs=p.slice(0,total).map(prepG);
    G={qs:qs,i:0,np:np,players:(np>1?GS.players:['أنت']).map(function(n){return {n:(n||'لاعب').trim()||'لاعب',score:0,right:0,n_q:0}}),
       state:np>1?'ready':'ask',sel:null,ok:false,left:GS.timer,timer:0,confirm:false,got:0,ans:[],mood:'happy',combo:0};
    openOverlay();
    if(G.state==='ask')startTimer();
    renderGame();
  });
}
function startTimer(){
  if(G.timer)clearInterval(G.timer);
  G.left=GS.timer;
  if(!GS.timer)return;
  G.t0=Date.now();
  G.timer=setInterval(function(){
    const was=Math.ceil(G.left);
    G.left=Math.max(0,GS.timer-(Date.now()-G.t0)/1000);
    const b=$('#gtime');if(b)b.style.width=(G.left/GS.timer*100)+'%';
    if(G.left>0&&G.left<=5&&Math.ceil(G.left)<was)SND.tick();
    if(G.left<=0){clearInterval(G.timer);G.timer=0;answerGame(-1)}
  },200);
}
const GMODAL='<div class="modal"><div class="card"><div class="mas" style="display:grid;place-items:center">'+hoopoe('sad',84)+'</div><h3>هل تريد إنهاء اللعبة؟</h3><button class="btn" data-act="gstay">أكمل اللعب</button><button class="btn ghost" data-act="gleave">أنهِ اللعبة</button></div></div>';
function optsHtml(q,ans,sel,attr){
  return '<div class="opts">'+q.opts.map(function(o,i){
    let c='';
    if(ans){if(o===q.c)c=' right';else if(i===sel)c=' wrong'}
    return '<button class="opt'+c+'" '+attr+'="'+i+'" '+(ans?'disabled':'')+'><span class="k">'+N(i+1)+'</span><span>'+o+'</span></button>'}).join('')+'</div>';
}
function renderGame(){
  if(G.blitz)return renderBlitz();
  const q=G.qs[G.i],cur=G.players[G.i%G.np],pct=Math.round(G.i/G.qs.length*100);
  let h='<div class="ltop"><button class="xbtn" data-act="gquit" aria-label="خروج من اللعبة">'+IC.x+'</button>'+
   '<div class="bar" role="progressbar" aria-valuenow="'+pct+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+pct+'%"></i></div>'+
   '<div class="hearts" style="color:var(--gold-d)" aria-label="النقاط">'+IC.gem+'<span>'+N(G.players[G.i%G.np].score)+'</span></div></div>';
  if(G.state==='ready'){
    h+='<div class="lmain"><div class="center"><div class="mas">'+hoopoe('happy',130)+'</div><h2>دور '+esc(cur.n)+'</h2><p class="muted">سلّم الجهاز إليه، ثم اضغط «ابدأ».</p>'+
     '<div class="score">'+G.players.map(function(p,i){return '<span class="'+(i===G.i%G.np?'me':'')+'">'+esc(p.n)+': '+N(p.score)+'</span>'}).join('')+'</div></div></div>'+
     '<div class="lfoot"><div class="in"><button class="btn" data-act="gready">ابدأ</button></div></div>';
    if(G.confirm)h+=GMODAL;
    $('#lesson').innerHTML=h;return;
  }
  const ans=G.state==='ans',ord=q.t==='ord';
  const say=ans?(G.ok?pick(OKSAY):(G.sel===-1?'انتهى الوقت! حاول في السؤال القادم.':pick(NOSAY))):(ord?'رتّب العناصر بالضغط عليها.':'اختر الإجابة الصحيحة.');
  h+='<div class="lmain">'+(GS.timer?'<div class="bar tm" style="margin-bottom:12px"><i id="gtime" style="width:'+(G.left/GS.timer*100)+'%"></i></div>':'')+
   (G.np>1?'<div class="score">'+G.players.map(function(p,i){return '<span class="'+(i===G.i%G.np?'me':'')+'">'+esc(p.n)+': '+N(p.score)+'</span>'}).join('')+'</div>':'')+
   '<div class="gmeta"><span class="pill">'+F.find(function(f){return f.id===q.f}).n+'</span><span class="pill">'+LV[q.l]+'</span><span class="pill">'+N(G.i+1)+' / '+N(G.qs.length)+'</span>'+(G.combo>=2?'<span class="combo">تتابع ×'+N(G.combo)+'</span>':'')+'</div>'+
   '<h2 class="qtext">'+q.q+'</h2>'+
   '<div class="say" style="margin:0"><div class="mas">'+hoopoe(G.mood,64)+'</div><div class="bubble"><p>'+say+'</p></div></div>';
  if(ord){
    h+='<div class="ans">'+G.ans.map(function(t,i){return '<button class="tile" data-gun="'+i+'" '+(ans?'disabled':'')+'>'+t+'</button>'}).join('')+'</div>'+
       '<div class="pool">'+q.pool.filter(function(t){return !G.ans.includes(t)}).map(function(t){return '<button class="tile" data-gadd="'+esc(t)+'" '+(ans?'disabled':'')+'>'+t+'</button>'}).join('')+'</div>';
  }else h+=optsHtml(q,ans,G.sel,'data-gopt');
  h+='</div>';
  if(!ans&&ord)h+='<div class="lfoot"><div class="in"><button class="btn" data-act="gcheck" '+(G.ans.length===q.items.length?'':'disabled')+'>تحقق</button></div></div>';
  if(ans){
    h+='<div class="lfoot '+(G.ok?'ok':'bad')+'" aria-live="polite"><div class="in"><div class="fb"><h3>'+(G.ok?'إجابة صحيحة! +'+N(G.got):(G.sel===-1?'انتهى الوقت':'إجابة خاطئة'))+'</h3>'+(G.ok?'':'<p>الصحيح: <b>'+(ord?q.items.join(' ثم '):q.c)+'</b></p>')+(q.n?'<p>'+q.n+'</p>':'')+'</div>'+
     '<button class="btn '+(G.ok?'':'bad')+'" data-act="gnext">'+(G.i+1>=G.qs.length?'عرض النتيجة':'التالي')+'</button></div></div>';
  }
  if(G.confirm)h+=GMODAL;
  $('#lesson').innerHTML=h;
}
function gDone(idx,ok){
  if(G.timer){clearInterval(G.timer);G.timer=0}
  const q=G.qs[G.i],p=G.players[G.i%G.np];
  G.sel=idx;G.ok=ok;G.state='ans';p.n_q++;
  if(ok){G.combo++;G.got=BASE[q.l]+(GS.timer?Math.ceil(5*G.left/GS.timer):0)+(G.combo>=3?2:0);p.score+=G.got;p.right++;G.mood=G.combo>=3?'wow':'cheer';G.combo>=3?SND.combo(G.combo):SND.correct()}
  else{G.got=0;G.combo=0;G.mood='sad';SND.wrong()}
  fsRec(q.f,ok);
  if(G.np===1){S.q++;if(ok)S.qc++;act('q')}
  renderGame();
}
function answerGame(idx){
  if(G.state!=='ask')return;
  const q=G.qs[G.i];
  gDone(idx,idx>=0&&q.opts[idx]===q.c);
}
function checkOrd(){
  if(G.state!=='ask')return;const q=G.qs[G.i];
  gDone(0,G.ans.join('|')===q.items.join('|'));
}
function nextGame(){
  G.i++;
  if(G.i>=G.qs.length)return finishGame();
  G.sel=null;G.ans=[];G.mood='happy';G.state=G.np>1?'ready':'ask';
  if(G.state==='ask')startTimer();
  renderGame();
}
/* ---- جولة 60 ثانية ---- */
function startBlitz(){
  buildPool(true,25).then(function(p){
    if(!p.length){toast('اختر ميدانًا ومستوى.');return}
    G={blitz:true,qs:p.map(prepG),i:0,np:1,players:[{n:'أنت',score:0,right:0,n_q:0}],state:'ask',sel:null,combo:0,mood:'happy',left:60,t0:Date.now(),timer:0,confirm:false,lock:false,wrong:0};
    runBlitz();
    openOverlay();renderBlitz();
  });
}
function runBlitz(){
  G.timer=setInterval(function(){
    G.left=Math.max(0,60-(Date.now()-G.t0)/1000);
    const b=$('#gtime');if(b){b.style.width=(G.left/60*100)+'%'}
    const tx=$('#gsec');if(tx)tx.textContent=N(Math.ceil(G.left));
    if(G.left>0&&G.left<=5&&Math.ceil(G.left)!==G.lastTick){G.lastTick=Math.ceil(G.left);SND.tick()}
    if(G.left<=0){clearInterval(G.timer);G.timer=0;finishGame()}
  },200);
}
function renderBlitz(){
  const q=G.qs[G.i%G.qs.length],p=G.players[0];
  let h='<div class="ltop"><button class="xbtn" data-act="gquit" aria-label="خروج">'+IC.x+'</button><div class="bar tm"><i id="gtime" style="width:'+(G.left/60*100)+'%"></i></div><div class="hearts" style="color:var(--gold-d)">'+IC.gem+'<span>'+N(p.score)+'</span></div></div>'+
   '<div class="lmain"><div class="gmeta"><span class="pill"><span id="gsec">'+N(Math.ceil(G.left))+'</span> ثانية</span><span class="pill">'+N(p.right)+' صحيحة</span>'+(G.combo>=2?'<span class="combo">تتابع ×'+N(G.combo)+'</span>':'')+'</div>'+
   '<h2 class="qtext">'+q.q+'</h2><div class="say" style="margin:0"><div class="mas">'+hoopoe(G.mood,56)+'</div></div>'+optsHtml(q,G.state==='ans',G.sel,'data-bopt')+'</div>';
  if(G.confirm)h+=GMODAL;
  $('#lesson').innerHTML=h;
}
function answerBlitz(i){
  if(G.state!=='ask')return;
  const q=G.qs[G.i%G.qs.length],ok=q.opts[i]===q.c,p=G.players[0];
  G.sel=i;G.state='ans';p.n_q++;S.q++;if(ok)S.qc++;fsRec(q.f,ok);
  if(ok){G.combo++;p.score+=10+Math.min(10,Math.max(0,G.combo-2)*2);p.right++;G.mood=G.combo>=3?'wow':'cheer';G.combo>=3?SND.combo(G.combo):SND.correct()}
  else{G.combo=0;G.wrong++;G.mood='sad';SND.wrong()}
  renderBlitz();
  setTimeout(function(){if(!G||!G.blitz||G.left<=0)return;G.i++;G.sel=null;G.state='ask';G.mood='happy';renderBlitz()},ok?450:900);
}
function finishGame(){
  if(G.timer)clearInterval(G.timer);
  S.games++;act('game');
  const rank=G.players.slice().sort(function(a,b){return b.score-a.score});
  let h='<div class="lmain"><div class="center">';
  if(G.np===1){
    const p=G.players[0],xp=G.blitz?Math.round(p.score/5):p.right*2;
    addXP(xp);
    if(G.blitz){if(p.score>(S.bestB||0))S.bestB=p.score}else if(p.score>S.best)S.best=p.score;
    save();
    const good=p.n_q?p.right/p.n_q>=.5:false;
    h+='<div class="mas">'+hoopoe(good?'cheer':'sad',140)+'</div><h2>'+(G.blitz?'انتهى الوقت!':'انتهت الجولة!')+'</h2><div class="statr"><div class="stat"><b>'+N(p.score)+'</b><span>نقطة</span></div><div class="stat"><b>'+N(p.right)+'/'+N(p.n_q)+'</b><span>إجابات صحيحة</span></div><div class="stat"><b>+'+N(xp)+'</b><span>نقاط الحساب</span></div></div>';
    good?SND.win():SND.lose();
  }else{
    const tie=rank.length>1&&rank[0].score===rank[1].score,win=!tie;
    addXP(5+(win?10:0));if(win)S.wins++;save();
    h+='<div class="mas">'+hoopoe('cheer',140)+'</div><h2>'+(tie?'تعادل!':'الفائز: '+esc(rank[0].n))+'</h2><div class="rank">'+rank.map(function(p,i){return '<div><span>'+N(i+1)+'</span><span>'+esc(p.n)+'</span><span>'+N(p.score)+' نقطة</span></div>'}).join('')+'</div>';
    SND.win();
  }
  h+='</div></div><div class="lfoot"><div class="in" style="display:grid;gap:10px"><button class="btn" data-act="gagain">جولة جديدة</button><button class="btn ghost" data-act="gleave">العودة إلى الألعاب</button></div></div>';
  $('#lesson').innerHTML=h;confetti();
}

/* قسم حسابي: من المعلومات التي أدخلتها */
function accountSec(){
  const p=S.prof||{},L={b:'مبتدئ',m:'متوسط',a:'متقدم'},G={learn:'تعلّم الأساسيات',khatma:'ختم القرآن',hifz:'حفظ القرآن',review:'مراجعة ما أعرفه',all:'كل ذلك'};
  const linked=!!(S.acct&&S.acct.linked);
  const acc=linked?((typeof ACCT!=='undefined'&&ACCT&&ACCT.email)?ACCT.email:'مرتبط'):'غير مرتبط';
  const row=function(k,v){return '<div class="arow"><span>'+k+'</span><b>'+v+'</b></div>'};
  return '<section class="sec" style="margin-top:16px"><h2>حسابي</h2><div class="card acard">'+
   '<div class="ahead"><div class="aav" aria-hidden="true">'+esc((p.name||'?').trim().charAt(0))+'</div><div><b class="aname">'+esc(p.name||'بدون اسم')+'</b><small class="muted">'+esc(L[p.lvl]||'لم يُحدَّد المستوى')+'</small></div></div>'+
   row('العمر',p.age?(typeof p.age==='number'?N(p.age):({kid:'أقل من 12',teen:'12 إلى 17',adult:'18 إلى 39',senior:'40 فأكثر'}[p.age]||'—')):'—')+row('الهدف',esc(G[p.goal]||'—'))+row('المدينة',esc(p.city||'—'))+row('الحساب',esc(acc))+
   '<div class="aact"><button class="btn sm ghost" data-act="prof-edit">تعديل المعلومات</button><button class="btn sm ghost" data-act="acct-link">'+(linked?'مزامنة الآن':'ربط الحساب')+'</button></div></div></section>';
}

/* حالة فارغة مصمّمة مع الهدهد */
function emptyBox(mood,title,text,action){
  return '<div class="emptybox" role="status"><div class="emp-ico">'+hoopoe(mood||'happy',96)+'</div><b>'+esc(title)+'</b><p>'+esc(text)+'</p>'+(action||'')+'</div>';
}
