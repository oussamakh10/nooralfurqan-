/* ===== المدرسية: دروس السنة الثالثة ثانوي (العلوم الإسلامية) + الاختبارات ===== */
const SCH=[].concat(SCH1,SCH2,SCH3);
const SCHTRI=[
  {n:1,t:g3x(['المقطع الأول (الفصل الأول)','Term 1','Trimestre 1'])},
  {n:2,t:g3x(['المقطع الثاني (الفصل الثاني)','Term 2','Trimestre 2'])},
  {n:3,t:g3x(['المقطع الثالث (الفصل الثالث)','Term 3','Trimestre 3'])}
];
function g3x(a){return a}
function sg(a){return g3(a)}
let SCHTAB='les',SX=null;
function schS(){if(!S.sch||typeof S.sch!=='object')S.sch={};return S.sch}
function schLes(id){return SCH.find(function(l){return l.id===id})}
function schOf(n){return SCH.filter(function(l){return l.tri===n})}
function schReadN(n){const s=schS();return schOf(n).filter(function(l){return s['r:'+l.id]}).length}
function schQs(l){
  return l.q.map(function(x,i){return{q:x[0],c:x[1],w:x.slice(2,5),n:x[5]||'',l:l.id,i:i}});
}
function schMk(q){return{q:q.q,opts:q.o?q.o.slice():shuffle([q.c].concat(q.w)),c:q.c,n:q.n,l:q.l,i:q.i}}
function schScore(ok,tot){return tot?Math.round(ok/tot*40)/2:0}
function schFmt(x){return String(x).replace(/\.0$/,'')}

function pageSchool(){
  const s=schS(),tot=SCH.length,rd=SCH.filter(function(l){return s['r:'+l.id]}).length;
  let h='<section class="sec" style="margin-top:16px"><h2>'+esc(sg(['المدرسية','School','Section scolaire']))+'</h2>'+
   '<div class="card" style="display:grid;gap:6px"><b>'+esc(sg(['السنة الثالثة ثانوي — العلوم الإسلامية (جميع الشعب)','3rd year secondary — Islamic sciences (all streams)','3e année secondaire — Sciences islamiques (toutes filières)']))+'</b>'+
   '<div style="height:10px;border-radius:6px;background:var(--line);overflow:hidden" aria-hidden="true"><i style="display:block;height:100%;width:'+Math.round(rd/tot*100)+'%;background:var(--accent)"></i></div>'+
   '<small class="muted">'+esc(sg(['أتممت قراءة','Lessons read:','Leçons lues :']))+' '+rd+' / '+tot+'</small>'+
   '<small class="muted">'+esc(sg(['المحتوى بالعربية، وهو مساعد للمراجعة ولا يغني عن الكتاب المدرسي وأستاذك.','Content is in Arabic. It is a study aid and does not replace your textbook and teacher.','Contenu en arabe. C’est une aide à la révision qui ne remplace pas le manuel ni votre enseignant.']))+'</small></div></section>'+
   '<div class="seg" role="group" style="margin-top:12px">'+[['les',sg(['الدروس','Lessons','Leçons'])],['exm',sg(['الاختبارات','Exams','Examens'])]].map(function(x){
     return '<button data-sc="tab:'+x[0]+'" aria-pressed="'+(SCHTAB===x[0])+'">'+x[1]+'</button>'}).join('')+'</div>';
  if(SCHTAB==='les'){
    SCHTRI.forEach(function(T){
      const ls=schOf(T.n);
      h+='<section class="sec"><h2>'+esc(sg(T.t))+' <small class="muted" style="font-size:.8rem">'+schReadN(T.n)+'/'+ls.length+'</small></h2><div style="display:grid;gap:8px">'+
       ls.map(function(l,i){
         const r=s['r:'+l.id];
         return '<button class="card sch-it" data-sc="open:'+l.id+'"><span class="sch-n'+(r?' on':'')+'">'+(r?'✓':(i+1))+'</span><span class="sch-t">'+esc(l.t)+'</span></button>'}).join('')+'</div></section>';
    });
  }else{
    h+='<section class="sec"><h2>'+esc(sg(['الاختبار الشامل للسنة','Final exam of the year','Examen final de l’année']))+'</h2>'+
     '<div class="card" style="display:grid;gap:8px"><p class="muted" style="margin:0">'+esc(sg(['40 سؤالًا من جميع دروس السنة، المدة 45 دقيقة، والنتيجة من 20.','40 questions from all lessons, 45 minutes, scored out of 20.','40 questions sur toutes les leçons, 45 minutes, note sur 20.']))+'</p>'+
     (s.bf!==undefined?'<small>'+esc(sg(['أفضل نتيجة','Best score','Meilleure note']))+': <b>'+schFmt(s.bf)+'/20</b></small>':'')+
     '<button class="btn" data-sc="ex:f">'+esc(sg(['ابدأ الاختبار الشامل','Start final exam','Commencer l’examen final']))+'</button></div></section>';
    SCHTRI.forEach(function(T){
      const ls=schOf(T.n),bk='bt'+T.n;
      h+='<section class="sec"><h2>'+esc(sg(T.t))+'</h2><div class="card" style="display:grid;gap:8px">'+
       '<b>'+esc(sg(['اختبار الفصل','Term exam','Examen du trimestre']))+'</b><p class="muted" style="margin:0">'+esc(sg(['20 سؤالًا من دروس هذا الفصل، المدة 20 دقيقة.','20 questions from this term, 20 minutes.','20 questions de ce trimestre, 20 minutes.']))+'</p>'+
       (s[bk]!==undefined?'<small>'+esc(sg(['أفضل نتيجة','Best score','Meilleure note']))+': <b>'+schFmt(s[bk])+'/20</b></small>':'')+
       '<button class="btn" data-sc="ex:t'+T.n+'">'+esc(sg(['ابدأ اختبار الفصل','Start term exam','Commencer l’examen']))+'</button></div>'+
       '<div style="display:grid;gap:8px;margin-top:8px">'+ls.map(function(l){
         const b=s['b:'+l.id];
         return '<button class="card sch-it" data-sc="ex:'+l.id+'"><span class="sch-n'+(b!==undefined&&b>=10?' on':'')+'">'+(b!==undefined?schFmt(b):'؟')+'</span><span class="sch-t">'+esc(l.t)+'</span></button>'}).join('')+'</div></section>';
    });
  }
  $('#page').innerHTML=h;
}

/* ---------- قارئ الدرس ---------- */
function openSchLesson(id){openOverlay();renderSchLesson(id)}
function renderSchLesson(id){
  const l=schLes(id);if(!l)return;
  const s=schS(),r=s['r:'+id],i=SCH.indexOf(l),nx=SCH[i+1];
  let h='<div class="ltop"><button class="xbtn" data-act="leave" aria-label="'+esc(sg(['إغلاق','Close','Fermer']))+'">'+IC.x+'</button><h2 style="flex:1;font-size:1.05rem">'+esc(l.t)+'</h2></div><div class="lmain" id="schmain">'+
   '<small class="muted">'+esc(SCHTRI[l.tri-1].t[0])+'</small>';
  l.sec.forEach(function(x){
    h+='<div class="card sch-sec"><h3>'+esc(x[0])+'</h3><ul>'+x[1].map(function(p){return '<li>'+esc(p)+'</li>'}).join('')+'</ul></div>';
  });
  if(l.ev&&l.ev.length)h+='<div class="card sch-sec"><h3>'+esc(sg(['الأدلة والشواهد','Evidence','Preuves']))+'</h3>'+
    l.ev.map(function(e){return '<p class="sch-ev '+(e[0]==='q'?'q':'h')+'">'+esc(e[1])+' <small class="muted">['+esc(e[2])+']</small></p>'}).join('')+'</div>';
  h+='<details class="card sch-sec"><summary><b>'+esc(sg(['سؤال مقالي للتدرب','Practice essay question','Question rédactionnelle']))+'</b></summary><p><b>'+esc(l.es[0])+'</b></p>'+
   '<details><summary>'+esc(sg(['أظهر الإجابة النموذجية','Show model answer','Voir la réponse modèle']))+'</summary><p>'+esc(l.es[1])+'</p></details></details>'+
   '<p class="muted" style="font-size:.8rem;text-align:center">'+esc(sg(['هذا ملخص للمراجعة؛ ارجع إلى كتابك المدرسي ومعلمك للتفصيل.','A revision summary; refer to your textbook and teacher for details.','Résumé de révision ; reportez-vous au manuel et à votre enseignant.']))+'</p>'+
   '<div style="display:grid;gap:8px;margin:12px 0 90px">'+
   '<button class="btn'+(r?' ghost':'')+'" data-sc="read:'+id+'">'+(r?'✓ '+esc(sg(['تمت قراءته','Marked as read','Lu'])):esc(sg(['علّمه كمقروء','Mark as read','Marquer comme lu'])))+'</button>'+
   '<button class="btn" data-sc="ex:'+id+'">'+esc(sg(['اختبر نفسك في هذا الدرس','Test yourself on this lesson','Testez-vous sur cette leçon']))+'</button>'+
   (nx?'<button class="btn ghost" data-sc="open:'+nx.id+'">'+esc(sg(['الدرس التالي','Next lesson','Leçon suivante']))+': '+esc(nx.t)+'</button>':'')+'</div></div>';
  $('#lesson').innerHTML=h;$('#lesson').scrollTop=0;
}

/* ---------- محرك الاختبار ---------- */
function schStart(kind){
  let qs=[],limit=0,title='';
  if(kind==='f'){
    qs=shuffle([].concat.apply([],SCH.map(schQs))).slice(0,40);limit=45*60;title=sg(['الاختبار الشامل للسنة','Final exam of the year','Examen final']);
  }else if(/^t[123]$/.test(kind)){
    const n=+kind[1];qs=shuffle([].concat.apply([],schOf(n).map(schQs))).slice(0,20);limit=20*60;title=sg(['اختبار','Exam','Examen'])+' — '+SCHTRI[n-1].t[0];
  }else if(kind==='rv'){
    qs=schReview();if(!qs.length){toast(sg(['لا أخطاء مسجلة بعد، ابدأ باختبار أولًا.','No mistakes recorded yet.','Aucune erreur enregistrée.']));return}title=sg(['مراجعة أخطائي','My mistakes review','Révision de mes erreurs']);
  }else{
    const l=schLes(kind);if(!l)return;qs=shuffle(schQs(l));title=l.t;
  }
  SX={kind:kind,title:title,qs:qs.map(schMk),i:0,sel:null,checked:false,ok:0,wrong:[],limit:limit,left:limit,done:false,timer:0};
  if(limit){SX.timer=setInterval(function(){
    if(!SX||SX.done){clearInterval(SX&&SX.timer);return}
    SX.left--;const el=$('#sxclock');if(el)el.textContent=schClock(SX.left);
    if(SX.left<=0)schFinish();
  },1000)}
  openOverlay();renderSchQ();
}
function schClock(t){t=Math.max(0,t);return Math.floor(t/60)+':'+('0'+(t%60)).slice(-2)}
function renderSchQ(){
  const x=SX,q=x.qs[x.i],pct=Math.round(x.i/x.qs.length*100);
  let h='<div class="ltop"><button class="xbtn" data-sc="quit" aria-label="'+esc(sg(['خروج','Exit','Quitter']))+'">'+IC.x+'</button>'+
   '<div class="bar" role="progressbar" aria-valuenow="'+pct+'"><i style="width:'+pct+'%"></i></div>'+
   (x.limit?'<div class="chip" style="min-width:64px;justify-content:center"><span id="sxclock">'+schClock(x.left)+'</span></div>':'<div class="chip"><span>'+(x.i+1)+'/'+x.qs.length+'</span></div>')+'</div>'+
   '<div class="lmain"><small class="muted">'+esc(x.title)+' — '+(x.i+1)+'/'+x.qs.length+'</small><h2 class="qtext">'+esc(q.q)+'</h2><div class="opts">'+
   q.opts.map(function(o,i){
     let c='';
     if(x.checked){if(o===q.c)c=' right';else if(i===x.sel)c=' wrong'}else if(i===x.sel)c=' sel';
     return '<button class="opt'+c+'" data-sc="opt:'+i+'" '+(x.checked?'disabled':'')+'><span class="k">'+(i+1)+'</span><span>'+esc(o)+'</span></button>'}).join('')+'</div></div>';
  if(!x.checked)h+='<div class="lfoot"><div class="in"><button class="btn" data-sc="check" '+(x.sel===null?'disabled':'')+'>'+esc(sg(['تحقق','Check','Vérifier']))+'</button></div></div>';
  else{
    const ok=q.opts[x.sel]===q.c;
    h+='<div class="lfoot '+(ok?'ok':'bad')+'" aria-live="polite"><div class="in"><div class="fb">'+(ok?'<h3>'+esc(sg(['إجابة صحيحة','Correct','Correct']))+'</h3>':'<h3>'+esc(sg(['الإجابة الصحيحة','Correct answer','Bonne réponse']))+'</h3><p><b>'+esc(q.c)+'</b></p>')+(q.n?'<p>'+esc(q.n)+'</p>':'')+'</div>'+
     '<button class="btn '+(ok?'':'bad')+'" data-sc="next">'+(x.i+1>=x.qs.length?esc(sg(['النتيجة','Result','Résultat'])):esc(sg(['متابعة','Next','Suivant'])))+'</button></div></div>';
  }
  $('#lesson').innerHTML=h;
}
function schFinish(){
  const x=SX;if(!x||x.done)return;x.done=true;if(x.timer)clearInterval(x.timer);
  const answered=x.i+(x.checked?1:0),tot=x.qs.length;
  const sc=schScore(x.ok,tot),s=schS();
  const key=x.kind==='f'?'bf':(/^t[123]$/.test(x.kind)?'bt'+x.kind[1]:'b:'+x.kind);
  if(s[key]===undefined||sc>s[key])s[key]=sc;
  try{save()}catch(e){}
  try{SND[sc>=10?'correct':'wrong']()}catch(e){}
  const mood=sc>=16?'wow':(sc>=10?'cheer':'sad');
  const lab=sc>=16?sg(['ممتاز، ما شاء الله!','Excellent!','Excellent !']):sc>=14?sg(['جيد جدًا','Very good','Très bien']):sc>=10?sg(['مقبول، واصل المراجعة','Pass — keep revising','Passable, continuez']):sg(['تحتاج إلى مراجعة','Needs revision','À réviser']);
  const wl={};x.wrong.forEach(function(w){wl[w.l]=1});
  let es=[];
  if(x.kind==='f')es=shuffle(SCH).slice(0,4);else if(/^t[123]$/.test(x.kind))es=shuffle(schOf(+x.kind[1])).slice(0,3);else{const l=schLes(x.kind);if(l)es=[l]}
  let h='<div class="ltop"><button class="xbtn" data-act="leave" aria-label="'+esc(sg(['إغلاق','Close','Fermer']))+'">'+IC.x+'</button><h2 style="flex:1;font-size:1.1rem">'+esc(x.title)+'</h2></div><div class="lmain">'+
   '<div class="card" style="text-align:center;display:grid;gap:6px"><div style="display:grid;place-items:center">'+hoopoe(mood,84)+'</div>'+
   '<div class="bigs">'+schFmt(sc)+' / 20</div><b>'+esc(lab)+'</b><small class="muted">'+esc(sg(['إجابات صحيحة','Correct answers','Bonnes réponses']))+': '+x.ok+' / '+tot+(answered<tot?' ('+esc(sg(['لم تُجب عن الباقي','unanswered left blank','sans réponse']))+')':'')+'</small></div>';
  if(x.wrong.length){
    h+='<section class="sec"><h2>'+esc(sg(['أخطاؤك','Your mistakes','Vos erreurs']))+'</h2>'+x.wrong.map(function(w){
      return '<div class="card sch-sec"><p><b>'+esc(w.q)+'</b></p><p class="sch-bad">✗ '+esc(w.a)+'</p><p class="sch-good">✓ '+esc(w.c)+'</p>'+(w.n?'<p class="muted">'+esc(w.n)+'</p>':'')+'</div>'}).join('')+
     '<h3 style="margin:10px 0 4px">'+esc(sg(['راجع هذه الدروس','Review these lessons','Révisez ces leçons']))+'</h3><div style="display:grid;gap:8px">'+Object.keys(wl).map(function(id){const l=schLes(id);return '<button class="card sch-it" data-sc="open:'+id+'"><span class="sch-n">↺</span><span class="sch-t">'+esc(l.t)+'</span></button>'}).join('')+'</div></section>';
  }
  if(es.length)h+='<section class="sec"><h2>'+esc(sg(['أسئلة مقالية للتدرب','Essay practice','Questions rédactionnelles']))+'</h2>'+es.map(function(l){
    return '<details class="card sch-sec"><summary><b>'+esc(l.es[0])+'</b></summary><p>'+esc(l.es[1])+'</p></details>'}).join('')+'</section>';
  h+='<div style="display:grid;gap:8px;margin:12px 0 90px"><button class="btn" data-sc="again">'+esc(sg(['أعد الاختبار','Retake','Recommencer']))+'</button><button class="btn ghost" data-act="leave">'+esc(sg(['العودة إلى المدرسية','Back to School','Retour']))+'</button></div></div>';
  $('#lesson').innerHTML=h;
}

(function(){
  const _cl=closeOverlay;
  closeOverlay=function(){if(SX){if(SX.timer)clearInterval(SX.timer);SX=null}_cl()};
  const _rp=renderPage;
  renderPage=function(){
    if(TAB==='school'){if(pageTimer){clearInterval(pageTimer);pageTimer=0}return pageSchool()}
    return _rp();
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-sc]');if(!b||b.disabled)return;
    const v=b.dataset.sc,k=v.split(':'),a=k[0],p=k.slice(1).join(':');
    if(a==='tab'){SCHTAB=p;return pageSchool()}
    if(a==='open'){if($('#lesson').hidden)openOverlay();SX=null;return renderSchLesson(p)}
    if(a==='read'){const s=schS();if(s['r:'+p])delete s['r:'+p];else s['r:'+p]=1;save();return renderSchLesson(p)}
    if(a==='ex'){if(SX&&SX.timer)clearInterval(SX.timer);return schStart(p)}
    if(a==='again'&&SX)return schStart(SX.kind);
    if(!SX||SX.done)return;
    if(a==='opt'){if(SX.checked)return;SX.sel=+p;return renderSchQ()}
    if(a==='check'){
      const q=SX.qs[SX.i];SX.checked=true;
      try{schRec(q,q.opts[SX.sel]===q.c)}catch(e){}
      if(q.opts[SX.sel]===q.c){SX.ok++;try{SND.correct()}catch(e){}}
      else{SX.wrong.push({q:q.q,a:q.opts[SX.sel],c:q.c,n:q.n,l:q.l});try{SND.wrong()}catch(e){}}
      return renderSchQ();
    }
    if(a==='next'){
      if(SX.i+1>=SX.qs.length){SX.i=SX.qs.length-1;return schFinish()}
      SX.i++;SX.sel=null;SX.checked=false;return renderSchQ();
    }
    if(a==='quit'){
      if(confirm(sg(['هل تريد إنهاء الاختبار؟ ستُحسب النتيجة بما أجبت.','End the exam? Your score will count what you answered.','Terminer l’examen ? La note comptera vos réponses.'])))return schFinish();
    }
  });
})();
TABS.push(['school','المدرسية']);
NAVI.school='<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.500 3 3 6 3s6-1.500 6-3v-5"/><path d="M22 9v6"/>';
