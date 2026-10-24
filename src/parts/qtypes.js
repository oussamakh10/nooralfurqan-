/* ===== أنواع أسئلة جديدة: توصيل، ملء فراغ، متعدد، كتابة، تلميح، تحدي الوقت، بطاقات ===== */
function qtShow(q){
  if(q.t==='fill'){
    const sel=(L&&L.sel!=null&&q.opts)?q.opts[L.sel]:null,checked=L&&L.state==='checked';
    const w=checked?'<span class="blank '+(L.ok?'ok':'no')+'">'+(L.ok?q.c:(sel||'___'))+'</span>':'<span class="blank">'+(sel||'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')+'</span>';
    return String(q.q).replace('___',w);
  }
  return q.q;
}
function qtNorm(s){const f=(typeof aNorm==='function')?aNorm:function(x){return String(x)};return f(s).replace(/[^ء-ي0-9a-z ]+/gi,' ').replace(/\s+/g,' ').trim().replace(/^ال/,'').replace(/ ال/g,' ')}
function qtLev(a,b){if(a===b)return 0;const m=a.length,n=b.length;if(!m||!n)return Math.max(m,n);let p=[];for(let j=0;j<=n;j++)p[j]=j;for(let i=1;i<=m;i++){let c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
const QT={
 match:{
  hint:'اضغط عنصرًا من اليمين ثم ما يناسبه من اليسار.',
  body:function(q,checked){
    const st=q.st;
    const L1=q.pairs.map(function(p,i){
      const has=st.map[i]!=null;let c='mt';
      if(has)c+=' pc'+(i%4);if(st.sel===i)c+=' sel';
      if(checked)c+=(st.map[i]===q.pairs[i][1]?' right':' wrong');
      return '<button class="'+c+'" data-ml="'+i+'" '+(checked?'disabled':'')+'>'+(has?'<b class="mn">'+N(i+1)+'</b>':'')+p[0]+'</button>'}).join('');
    const R1=st.right.map(function(t,j){
      let at=-1;for(const k in st.map)if(st.map[k]===t)at=+k;
      return '<button class="mt'+(at>=0?' pc'+(at%4):'')+'" data-mr="'+j+'" '+(checked?'disabled':'')+'>'+(at>=0?'<b class="mn">'+N(at+1)+'</b>':'')+t+'</button>'}).join('');
    return '<div class="mtg"><div class="mtc">'+L1+'</div><div class="mtc">'+R1+'</div></div>';
  },
  ready:function(q){return Object.keys(q.st.map).length===q.pairs.length},
  check:function(q){return q.pairs.every(function(p,i){return q.st.map[i]===p[1]})},
  ans:function(q){return q.pairs.map(function(p){return p[0]+' ← '+p[1]}).join(' • ')}
 },
 multi:{
  hint:'اختر كل الإجابات الصحيحة (قد تكون أكثر من واحدة).',
  body:function(q,checked){
    L.ms=L.ms||[];
    return '<div class="opts">'+q.opts.map(function(o,i){
      const on=L.ms.indexOf(i)>=0;let c='';
      if(checked){if(q.c.indexOf(o)>=0)c=' right';else if(on)c=' wrong'}else if(on)c=' sel';
      return '<button class="opt'+c+'" data-mo="'+i+'" '+(checked?'disabled':'')+'><span class="k">'+(on?'✓':'')+'</span><span>'+o+'</span></button>'}).join('')+'</div>';
  },
  ready:function(q){return (L.ms||[]).length>0},
  check:function(q){const sel=(L.ms||[]).map(function(i){return q.opts[i]});return sel.length===q.c.length&&q.c.every(function(c){return sel.indexOf(c)>=0})},
  ans:function(q){return q.c.join('، ')}
 },
 type:{
  hint:'اكتب الإجابة بنفسك.',
  body:function(q,checked){
    return '<div class="tyw"><input type="text" id="qtin" class="tyin" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="اكتب إجابتك هنا" value="'+esc(L.tv||'')+'" '+(checked?'disabled':'')+'></div>';
  },
  ready:function(q){return (L.tv||'').trim().length>0},
  check:function(q){
    const v=qtNorm(L.tv||'');if(!v)return false;
    const all=[q.c].concat(q.alt||[]).map(qtNorm);
    return all.some(function(a){return a===v||(a.length>=4&&v.length>=4&&qtLev(a,v)<=1)});
  },
  ans:function(q){return q.c}
 },
 fill:null
};
/* ملء الفراغ يستعمل مسار الاختيار العادي (q.c نص وq.w مشتتات) */
document.addEventListener('click',function(e){
  if(!L)return;const t=e.target.closest&&e.target.closest('button');if(!t)return;
  const d=t.dataset;
  if(L.state==='ask'){
    const q=L.queue[0];
    if(d.ml!==undefined&&q.st){SND.tap();q.st.sel=(q.st.sel===+d.ml?null:+d.ml);return renderLesson()}
    if(d.mr!==undefined&&q.st){
      SND.tap();const txt=q.st.right[+d.mr];
      if(q.st.sel==null){for(const k in q.st.map)if(q.st.map[k]===txt)delete q.st.map[k];return renderLesson()}
      for(const k in q.st.map)if(q.st.map[k]===txt)delete q.st.map[k];
      q.st.map[q.st.sel]=txt;q.st.sel=null;return renderLesson();
    }
    if(d.mo!==undefined){SND.tap();L.ms=L.ms||[];const i=+d.mo,k=L.ms.indexOf(i);if(k>=0)L.ms.splice(k,1);else L.ms.push(i);return renderLesson()}
    if(d.hint!==undefined&&q.opts&&!q.hid){
      const wr=[];q.opts.forEach(function(o,i){if(o!==q.c&&i!==L.sel)wr.push(i)});
      q.hid=shuffle(wr).slice(0,2);L.gain=Math.max(0,L.gain-3);SND.tap();return renderLesson();
    }
  }
},true);
document.addEventListener('input',function(e){
  if(!L||e.target.id!=='qtin')return;L.tv=e.target.value;
  const b=document.querySelector('[data-act="check"]');if(b){const q=L.queue[0];b.disabled=!QT.type.ready(q)}
});
/* ---- تحدي الوقت ---- */
let QTI=null;
function qtStop(){if(QTI){clearInterval(QTI);QTI=null}}
function qtTick(){
  qtStop();
  if(!L||!S.tmode||L.state!=='ask'||L.confirm||L.placement)return;
  const q=L.queue[0];if(!q)return;
  const secs=(q.t==='match'||q.t==='multi'||q.t==='type'||q.t==='ord')?30:15;
  if(!q.dl)q.dl=Date.now()+secs*1000;
  const upd=function(){
    if(!L||L.state!=='ask'){qtStop();return}
    const left=q.dl-Date.now(),el=document.getElementById('tmb');
    if(el){el.style.width=Math.max(0,left/(secs*1000)*100)+'%';el.style.background=left<4000?'var(--wrong,#d33)':'var(--gold,#c8a24a)'}
    if(left<=0){qtStop();L.force=true;checkLesson()}
  };
  QTI=setInterval(upd,250);upd();
}
/* ---- تمارين متنوعة تُولَّد من بنك الأسئلة ---- */
function mixedSession(){
  const pool=[];
  ['quran','sunnah','seerah','sahaba','fiqh','aqeeda','anbiya','gharib'].forEach(function(k){
    ['e','m','h'].forEach(function(l){((B[k]||{})[l]||[]).forEach(function(x){if(x[0]&&x[1])pool.push({k:k,x:x})})})});
  const sh=shuffle(pool.slice()),qs=[];
  const short=sh.filter(function(p){return p.x[0].length<=58&&p.x[1].length<=26});
  for(let m=0;m<2;m++){
    const used={},pairs=[];
    for(let i=0;i<short.length&&pairs.length<4;i++){const p=short[(i+m*37)%short.length];if(used[p.x[1]])continue;used[p.x[1]]=1;pairs.push([p.x[0].replace(/[؟?]$/,''),p.x[1]])}
    if(pairs.length===4)qs.push({t:'match',q:'صِل كل سؤال بجوابه',pairs:pairs,n:'',f:null});
  }
  const ty=sh.filter(function(p){return p.x[1].split(' ').length<=2&&p.x[1].length<=16&&p.x[0].length<=80&&!/\d/.test(p.x[1])}).slice(0,3);
  ty.forEach(function(p){qs.push({t:'type',q:p.x[0]+' (اكتب الإجابة)',c:p.x[1],alt:[],n:'',f:p.k})});
  let i=0;while(qs.length<10&&i<sh.length){const p=sh[i++];qs.push({q:p.x[0],c:p.x[1],w:p.x.slice(2,5),n:'',f:p.k})}
  return shuffle(qs);
}
function startMixed(){
  const items=mixedSession();if(items.length<4){toast('تعذّر تجهيز التمارين.');return}
  L={lesson:{id:'_mix',title:'تمارين متنوعة'},review:true,queue:items.map(mkQ),total:items.length,solved:0,hearts:99,gain:0,wrongs:0,state:'ask',sel:null,ans:[],ms:[],tv:'',force:false,ok:false,confirm:false,mood:'happy',say:'',combo:0,best:0};
  openOverlay();renderLesson();
}
/* ---- بطاقات القلب ---- */
let CD=null;
function startCards(){
  const pool=[];
  ALL.forEach(function(l){if(S.done[l.id]||!Object.keys(S.done).length)l.qs.forEach(function(q){if(!q.t&&q.c)pool.push({q:q.q,c:q.c,n:q.n||''})})});
  if(pool.length<5)ALL.forEach(function(l){l.qs.forEach(function(q){if(!q.t&&q.c)pool.push({q:q.q,c:q.c,n:q.n||''})})});
  CD={cards:shuffle(pool).slice(0,12),i:0,flip:false,ok:0,no:[]};openOverlay();renderCards();
}
function renderCards(){
  if(!CD)return;
  if(CD.i>=CD.cards.length){
    $('#lesson').innerHTML='<div class="ltop"><button class="xbtn" data-act="cd-x" aria-label="إغلاق">'+IC.x+'</button></div><div class="lmain"><div class="center"><div class="mas">'+hoopoe('cheer',120)+'</div><h2>انتهت البطاقات</h2><p class="muted">عرفتَ '+N(CD.ok)+' من '+N(CD.cards.length)+'</p></div></div><div class="lfoot"><div class="in" style="display:grid;gap:8px"><button class="btn" data-act="cd-again">بطاقات جديدة</button><button class="btn ghost" data-act="cd-x">إغلاق</button></div></div>';return;
  }
  const c=CD.cards[CD.i];
  $('#lesson').innerHTML='<div class="ltop"><button class="xbtn" data-act="cd-x" aria-label="إغلاق">'+IC.x+'</button><div class="bar"><i style="width:'+(CD.i/CD.cards.length*100)+'%"></i></div></div>'+
   '<div class="lmain"><div class="fcard" data-act="cd-flip" role="button" tabindex="0"><div class="muted">'+(CD.flip?'الجواب':'السؤال')+' — اضغط للقلب</div><h2 style="margin:10px 0">'+(CD.flip?c.c:c.q)+'</h2>'+(CD.flip&&c.n?'<p class="muted">'+c.n+'</p>':'')+'</div></div>'+
   '<div class="lfoot"><div class="in" style="display:grid;gap:8px;grid-template-columns:1fr 1fr">'+(CD.flip?'<button class="btn ghost" data-act="cd-no">لم أعرفها</button><button class="btn" data-act="cd-yes">عرفتها</button>':'<button class="btn" style="grid-column:1/3" data-act="cd-flip">اقلب البطاقة</button>')+'</div></div>';
}
document.addEventListener('click',function(e){
  const t=e.target.closest&&e.target.closest('[data-act]');if(!t||!CD)return;
  const a=t.dataset.act;
  if(a==='cd-flip'){CD.flip=!CD.flip;renderCards()}
  else if(a==='cd-yes'){CD.ok++;CD.i++;CD.flip=false;SND.correct&&SND.correct();renderCards()}
  else if(a==='cd-no'){CD.no.push(CD.cards[CD.i]);CD.i++;CD.flip=false;renderCards()}
  else if(a==='cd-again'){startCards()}
  else if(a==='cd-x'){CD=null;closeOverlay()}
},true);
document.addEventListener('click',function(e){
  const b=e.target.closest&&e.target.closest('[data-tm]');if(!b)return;
  S.tmode=S.tmode?0:1;try{save()}catch(x){}go('learn');
});
document.addEventListener('click',function(e){
  const b=e.target.closest&&e.target.closest('[data-act="mixed"]');if(b)startMixed();
  const c=e.target.closest&&e.target.closest('[data-act="cards"]');if(c)startCards();
});
