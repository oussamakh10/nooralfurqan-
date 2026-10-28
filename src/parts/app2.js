/* ================= الرئيسية ================= */
function ficon(p){return '<span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg></span>'}
const VOD=[[2,255],[2,286],[94,5],[94,6],[13,28],[65,3],[2,152],[39,53],[3,139],[93,3],[2,186],[40,60],[55,13],[14,7],[2,153],[16,128],[11,115],[49,13]];
function dayNo(){return Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5)}
function pageHome(){
  const feats=[
   [NAVI.learn,'دروس ومراجعة ذكية','ثلاث وعشرون وحدة وأكثر من مئة درس، ومراجعة متباعدة تعيد إليك الأسئلة التي أخطأت فيها في الوقت المناسب.'],
   [NAVI.read,'المصحف مع تفسيرين وترجمة','التفسير الميسر والجلالين تحت كل آية، وترجمة إنجليزية اختيارية، وعدّاد حسنات وورد يومي.'],
   [NAVI.listen,'خمسة عشر قارئًا','السورة كاملة أو آية بآية مع تتبّع النص، وأحاديث بقراءة آلية.'],
   [NAVI.ach,'حسناتك وإنجازاتك','حسنات اليوم والأسبوع والشهر والمسيرة كلها، وتحديات وأوسمة.'],
   [NAVI.play,'ألعاب تنافسية','مع نفسك أو أصدقائك: أسئلة، أكمل الآية، غريب القرآن، ترتيب، وجولة ستين ثانية.'],
   [NAVI.learn,'حفظ وأذكار ومواقيت','مسار حفظ، سبحة وأذكار الصباح والمساء، ومواقيت الصلاة واتجاه القبلة.']
  ];
  const due=srDue().length,nx=S.has.t;
  $('#page').innerHTML=
  '<section class="hero"><div class="arch"><div class="mas">'+hoopoe('happy',150)+'</div><h1>نور الفرقان</h1><p>رفيقك لتعلّم الدين خطوة خطوة</p></div>'+
   '<p class="lead">'+(S.prof&&S.prof.name?'السلام عليكم يا '+esc(S.prof.name)+'. ':'')+'دروس قصيرة، ومصحف مفسَّر، وتلاوات، وتحديات وألعاب. كل شيء في مكان واحد.</p>'+
   '<div class="cta"><button class="btn" data-go="learn">ابدأ التعلّم</button><button class="btn gold" data-go="read">افتح المصحف</button></div></section>'+
  '<section class="sec"><h2>اليوم</h2>'+'<button class="card feat" style="text-align:start" data-act="guide-open"><b>'+g3(["جديد على الإسلام أو زائر؟ دليل المبتدئين","New here? Beginner’s guide","Nouveau ici ? Guide du débutant"])+'</b><span>'+g3(["أساسيات الإسلام والوضوء والصلاة ومصطلحات مفيدة وأسئلة شائعة.","Islam basics, wudu, prayer, useful terms and common questions.","Bases de l’islam, ablutions, prière, termes utiles et questions fréquentes."])+'</span></button>'+reminderBanner()+seasonHtml()+
   '<div class="card day"><span class="pill" style="justify-self:start">آية اليوم</span><div id="vod"><p class="muted">جارٍ التحميل…</p></div></div>'+
   '<div class="card day"><span class="pill" style="justify-self:start">حديث اليوم</span><p class="q" style="font:400 1.2rem/2 var(--quran)">'+HAD[dayNo()%HAD.length].t+'</p><small class="muted">'+HAD[dayNo()%HAD.length].r+'</small></div>'+
   (due?'<button class="card feat" style="text-align:start" data-act="review-go"><b>مراجعة اليوم: '+N(due)+' '+(due===1?'سؤال':'أسئلة')+'</b><span>راجع ما أخطأت فيه لتثبت المعلومة.</span></button>':'')+
   '<div class="grid2"><button class="card feat" style="text-align:start" data-act="ask-open"><b>اسأل هدهد</b><span>مساعد يجيب عن أسئلتك الدينية باختصار.</span></button><button class="card feat" style="text-align:start" data-act="duel-open"><b>تحدٍّ مباشر مع صديق</b><span>على جهازين في اللحظة نفسها.</span></button><button class="card feat" style="text-align:start" data-act="dhikr-open"><b>السبحة والأذكار</b><span>'+(S.adk.d===today()&&S.adk.m?'أذكار الصباح تمت ✓':'عدّاد تسبيح وأذكار الصباح والمساء')+'</span></button>'+
   '<button class="card feat" style="text-align:start" data-go="ach"><b>حسناتك: '+cnum(nx)+'</b><span>اقرأ لتزيد حسناتك.</span></button></div>'+
  '</section>'+
  '<section class="sec"><h2>مواقيت الصلاة</h2><div id="ptbox" class="card"></div></section>'+
  '<section class="sec"><h2>عن التطبيق</h2><div class="card"><p>نور الفرقان موقع تعليمي لأساسيات الدين الإسلامي، مبني على فكرة الدروس القصيرة والتكرار والتحفيز اليومي. يناسب المبتدئ والمسلم الجديد والطالب وكل من يريد أن يراجع ما تعلّمه. ومرشدك في كل صفحة هدهد، الطائر الذي ذُكر في سورة النمل.</p></div></section>'+
  '<section class="sec"><h2>عن الموقع</h2><div class="grid2">'+
   [['learn','تعلّم','مسار الدروس والمراجعة والحفظ'],['read','القراءة','المصحف الكامل والتفاسير والحسنات'],['listen','الاستماع','تلاوات وأحاديث مختارة'],['ach','إنجازاتي','الحسنات والتحديات والأوسمة'],['play','الألعاب','تحدَّ نفسك أو أصدقاءك']].map(function(x){
     return '<button class="card feat" style="text-align:start" data-go="'+x[0]+'"><b>'+x[1]+'</b><span>'+x[2]+'</span></button>'}).join('')+'</div></section>'+
  '<section class="sec"><h2>المميزات</h2><div class="grid2">'+feats.map(function(f){return '<div class="card feat">'+ficon(f[0])+'<b>'+f[1]+'</b><span>'+f[2]+'</span></div>'}).join('')+'</div></section>'+
  '<section class="sec"><h2>مصادر المحتوى</h2><div class="card"><ul class="src">'+
   '<li>نص المصحف بالرسم العثماني من مشروع تنزيل (Tanzil)، عبر مستودع quran-json.</li>'+
   '<li>التفسير الميسر (مجمع الملك فهد) وتفسير الجلالين، من مستودع tafsir_api. الترجمة الإنجليزية: بيكثال (ملك عام).</li>'+
   '<li>التلاوات مربوطة من موقعي EveryAyah وMP3Quran، ولا تُحفظ على هذا الموقع.</li>'+
   '<li>الدروس وبنك الأسئلة كتبها منشئ الموقع من مبادئ متفق عليها، وتُستحسن مراجعتها على يد أهل العلم.</li></ul></div></section>'+
  '<section class="sec"><h2>المنشئ</h2><div class="card creator"><div class="mas">'+hoopoe('cheer',64)+'</div><div><div class="nm">خلوفي أسامة</div><p class="muted">منشئ موقع نور الفرقان</p><p class="muted" style="margin-top:6px;font-size:.85rem;font-weight:700;color:var(--ink,inherit)">'+esc(g3(['مساعدة في الحماية والأمان: مصعب شكري','Security & safety assistance: Mosaab Chokri','Aide en protection et sécurité : Mosaab Chokri']))+'</p></div></div></section>'+
  '<p class="fine">المحتوى للتعلّم والمراجعة. للفتوى والمسائل الخلافية راجع أهل العلم الموثوقين.</p>';
  loadVod();renderPrayer();
}
function loadVod(){
  const v=VOD[dayNo()%VOD.length];
  loadQ().then(function(){
    const el=$('#vod');if(!el)return;
    el.innerHTML='<p class="q" style="font:400 1.35rem/2 var(--quran)">'+Q.v[v[0]-1][v[1]-1]+' <span class="no" style="cursor:default">'+N(v[1])+'</span></p><small class="muted">سورة '+SN[v[0]-1]+'، آية '+N(v[1])+'</small><div><button class="btn sm ghost" data-surah="'+v[0]+'" data-jump="'+v[1]+'">افتحها في المصحف</button></div>';
  }).catch(function(){const el=$('#vod');if(el)el.innerHTML='<p class="muted">تعذّر تحميل الآية.</p>'});
}

/* ================= تعلّم ================= */
let LTAB='path',UO=null;
function lvf(){return S.lvf||0}
function unitDone(u){let d=0;u.lessons.forEach(function(l){if(S.done[l.id])d++});return d}
function pageLearn(){
  const due=srDue().length;
  let h='<div class="seg" style="margin-top:16px" role="group" aria-label="أقسام التعلّم">'+[['path','المسار'],['review','مراجعة'+(due?' ('+N(due)+')':'')],['hifz','حفظ']].map(function(x){return '<button data-ltab="'+x[0]+'" aria-pressed="'+(LTAB===x[0])+'">'+x[1]+'</button>'}).join('')+'</div>';
  if(LTAB==='review'){$('#page').innerHTML=h+learnReview();return}
  if(LTAB==='hifz'){$('#page').innerHTML=h+'<div id="hifzbox"></div>';learnHifz();return}
  const cur=ALL.find(function(l){return !S.done[l.id]}),dn=doneN();
  let msg,mood='happy';
  if(dn===0)msg='مرحبًا'+(S.prof&&S.prof.name?' يا '+esc(S.prof.name):'')+'! أنا هدهد. اختر وحدة وابدأ، أو جرّب اختبار تحديد المستوى.';
  else if(!cur){msg='ما شاء الله! أتممت كل الدروس. كرّر ما شئت ليثبت العلم.';mood='cheer'}
  else msg='أحسنت! درسك التالي: '+cur.title+'.';
  if(!UO){UO={};if(cur)UO[cur.unit]=1}
  h+='<div class="say"><div class="mas">'+hoopoe(mood,88)+'</div><div class="bubble"><p>'+msg+'</p><p class="muted" style="font-size:.9rem">أتممت '+N(dn)+' من '+N(ALL.length)+' درسًا في '+N(DATA.length)+' وحدة</p></div></div>'+
   '<div class="pbar gold" style="margin-bottom:10px"><i style="width:'+(dn/ALL.length*100)+'%"></i></div>'+
   '<div class="opts2" style="margin-bottom:6px">'+(cur?'<button class="btn sm" data-lesson="'+cur.id+'">تابع: '+cur.title+'</button>':'')+'<button class="btn sm ghost" data-act="place">اختبار تحديد المستوى</button></div>'+
   '<div class="opts2" style="margin:6px 0"><button class="btn sm ghost" data-act="mixed">🎲 تمارين متنوعة</button><button class="btn sm ghost" data-act="cards">🃏 بطاقات</button><button class="btn sm ghost" data-tm="1" aria-pressed="'+(!!S.tmode)+'">⏱ تحدي الوقت: '+(S.tmode?'يعمل':'متوقف')+'</button></div>'+
   '<div class="seg lvseg" role="group" aria-label="المستوى">'+[[0,'كل المستويات'],[1,'أساسي'],[2,'متقدّم 🎓']].map(function(x){return '<button data-lvf="'+x[0]+'" aria-pressed="'+(lvf()===x[0])+'">'+x[1]+'</button>'}).join('')+'</div>';
  DATA.forEach(function(u,ui){
    if((lvf()===1&&u.lv==='a')||(lvf()===2&&u.lv!=='a'))return;
    const dd=unitDone(u),open=!!UO[ui];
    h+='<section class="unit u'+((ui%4)+1)+'"><button class="uh" data-unit="'+ui+'" aria-expanded="'+open+'"><span class="un">'+N(ui+1)+'</span><span class="ut"><b>'+u.title+(u.lv==='a'?' <span class="advtag">متقدّم</span>':'')+'</b><small>'+u.sub+'</small></span><span class="pill">'+N(dd)+'/'+N(u.lessons.length)+'</span><i class="chev'+(open?' up':'')+'" aria-hidden="true"></i></button>';
    if(open){
      h+='<div class="path">';
      u.lessons.forEach(function(l,li){
        const done=!!S.done[l.id],lock=!done&&li>0&&!S.done[u.lessons[li-1].id],isCur=!done&&!lock;
        const off=(li%2===0?-34:34),cls=done?'done':isCur?'cur':'lock';
        h+='<div class="step" style="--off:'+off+'px">'+(isCur?'<span class="start">ابدأ</span>':'')+
          '<button class="node '+cls+'" '+(lock?'disabled aria-label="'+l.title+' (مغلق)"':'data-lesson="'+l.id+'" aria-label="'+l.title+'"')+'>'+(done?IC.check:lock?IC.lock:IC.star)+'</button>'+
          '<div class="nlabel">'+l.title+'</div></div>';
      });
      h+='</div>';
    }
    h+='</section>';
  });
  h+='<p class="fine">المحتوى مبسّط للتعلّم الأوّلي ومتفق عليه بين المسلمين. يُستحسن عرضه على أهل العلم.</p>';
  $('#page').innerHTML=h;
}

/* ================= محرّك الدرس ================= */
let L=null,G=null;
const PRAISE=['أحسنت!','ممتاز!','بارك الله فيك!','رائع!','ما شاء الله!'];
const OKSAY=['ما شاء الله، إجابة صحيحة!','ممتاز، أنت تتقدم!','بارك الله فيك!','هكذا يكون العلم!'];
const NOSAY=['لا بأس، نتعلّم من الخطأ.','قريبة! سنعيدها بعد قليل.','الخطأ أول خطوات التعلّم.'];
function openOverlay(){$('#lesson').hidden=false;document.documentElement.classList.add('lock')}
function closeOverlay(){
  if(G&&G.timer)clearInterval(G.timer);
  if(typeof TSB!=='undefined')TSB=null;
  $('#lesson').hidden=true;document.documentElement.classList.remove('lock');L=null;G=null;
  renderTop();renderPage();
}
function mkQ(q){return Object.assign({},q,{missed:false,opts:null,pool:null,st:null,hid:null,dl:null})}
function startLesson(id){
  const lesson=ALL.find(function(l){return l.id===id});
  L={lesson:lesson,queue:lesson.qs.map(mkQ),total:lesson.qs.length,solved:0,hearts:S.kids?99:5,gain:0,wrongs:0,state:'ask',sel:null,ans:[],ok:false,confirm:false,mood:'happy',say:'',combo:0,best:0};
  openOverlay();renderLesson();
}
function startReviewSession(){
  const items=srDue().slice(0,10);if(!items.length){toast('لا توجد أسئلة للمراجعة الآن.');return}
  L={lesson:{id:'_review',title:'مراجعة ذكية'},review:true,queue:items.map(mkQ),total:items.length,solved:0,hearts:99,gain:0,wrongs:0,state:'ask',sel:null,ans:[],ok:false,confirm:false,mood:'happy',say:'',combo:0,best:0};
  openOverlay();renderLesson();
}
function prep(q){
  if(q.t==='ord'){if(!q.pool){let p;do{p=shuffle(q.items)}while(p.join('|')===q.items.join('|')&&q.items.length>1);q.pool=p}}
  else if(q.t==='match'){if(!q.st)q.st={right:shuffle(q.pairs.map(function(p){return p[1]})),sel:null,map:{}}}
  else if(q.t==='type'){}
  else if(q.t==='multi'){if(!q.opts)q.opts=shuffle(q.c.concat(q.w))}
  else if(!q.opts){q.opts=shuffle([q.c].concat(q.w))}
}
function renderLesson(){
  const q=L.queue[0];prep(q);
  const pct=Math.round(L.solved/L.total*100),checked=L.state==='checked';
  const hint=checked?L.say:(q.t==='ord'?'اضغط على العناصر لترتيبها.':(QT[q.t]?QT[q.t].hint:'اختر الإجابة الصحيحة.'));
  let h='<div class="ltop"><button class="xbtn" data-act="quit" aria-label="خروج من الدرس">'+IC.x+'</button>'+
    '<div class="bar" role="progressbar" aria-valuenow="'+pct+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+pct+'%"></i></div>'+
    '<div class="hearts" aria-label="القلوب المتبقية">'+IC.heart+'<span>'+(L.hearts>9?'∞':N(L.hearts))+'</span></div></div>';
  h+=(S.tmode&&!checked?'<div class="tmb"><i id="tmb"></i></div>':'')+'<div class="lmain"><h2 class="qtext">'+qtShow(q)+'</h2>'+
    '<div class="say" style="margin:0"><div class="mas '+L.mood+'">'+hoopoe(L.mood,72)+'</div><div class="bubble"><p>'+hint+'</p>'+(L.combo>=2?'<span class="combo">'+IC.flame.replace('<svg','<svg width="16" height="16"')+' تتابع ×'+N(L.combo)+'</span>':'')+'</div></div>';
  if(q.t==='ord'){
    h+='<div class="ans" aria-label="الترتيب الحالي">'+L.ans.map(function(t,i){return '<button class="tile" data-un="'+i+'" '+(checked?'disabled':'')+'>'+t+'</button>'}).join('')+'</div>'+
       '<div class="pool">'+q.pool.filter(function(t){return !L.ans.includes(t)}).map(function(t){return '<button class="tile" data-add="'+esc(t)+'" '+(checked?'disabled':'')+'>'+t+'</button>'}).join('')+'</div>';
  }else if(QT[q.t]){
    h+=QT[q.t].body(q,checked);
  }else{
    h+='<div class="opts">'+q.opts.map(function(o,i){
      let c='';if(q.hid&&q.hid.indexOf(i)>=0)c=' gone';
      if(checked){if(o===q.c)c=' right';else if(i===L.sel)c=' wrong'}
      else if(i===L.sel)c=' sel';
      return '<button class="opt'+c+'" data-opt="'+i+'" '+(checked?'disabled':'')+'><span class="k">'+N(i+1)+'</span><span>'+o+'</span></button>'}).join('')+'</div>';
  }
  h+='</div>';
  if(!checked){
    const ready=q.t==='ord'?L.ans.length===q.items.length:(QT[q.t]?QT[q.t].ready(q):L.sel!==null);
    const canHint=(!q.t||q.t==='fill')&&!q.hid&&q.opts&&q.opts.length>=4;
    h+='<div class="lfoot"><div class="in" style="display:grid;gap:8px">'+(canHint?'<button class="btn ghost sm" data-hint="1">💡 تلميح</button>':'')+'<button class="btn" data-act="check" '+(ready?'':'disabled')+'>تحقق</button></div></div>';
  }else{
    const ans=q.t==='ord'?q.items.join(' ثم '):(QT[q.t]?QT[q.t].ans(q):q.c);
    h+='<div class="lfoot '+(L.ok?'ok':'bad')+'" aria-live="polite"><div class="in"><div class="fb">'+
      (L.ok?'<h3>'+pick(PRAISE)+'</h3>':'<h3>الإجابة الصحيحة</h3><p><b>'+ans+'</b></p>')+
      (q.n?'<p>'+q.n+'</p>':'')+'</div><button class="btn '+(L.ok?'':'bad')+'" data-act="next">متابعة</button></div></div>';
  }
  if(L.confirm)h+='<div class="modal"><div class="card"><div class="mas" style="display:grid;place-items:center">'+hoopoe('sad',84)+'</div><h3>هل تريد الخروج؟</h3><p class="muted">ستفقد تقدمك في هذا الدرس.</p><button class="btn" data-act="stay">أكمل الدرس</button><button class="btn ghost" data-act="leave">اخرج</button></div></div>';
  $('#lesson').innerHTML=h;
  qtTick();
}
function checkLesson(){
  const q=L.queue[0];let ok;
  if(L.force)ok=false;
  else if(q.t==='ord')ok=L.ans.join('|')===q.items.join('|');
  else if(QT[q.t])ok=QT[q.t].check(q);
  else ok=q.opts[L.sel]===q.c;
  L.force=false;qtStop();
  L.ok=ok;L.state='checked';S.q++;
  if(!q.missed){if(q.f)fsRec(q.f,ok);if(L.placement&&ok)L.pc++}
  if((!q.t||q.t==='fill')&&!q.missed&&!L.placement)srUpdate(q,ok);
  if(ok){
    S.qc++;if(!q.missed)L.combo++;L.best=Math.max(L.best,L.combo);
    if(L.combo>=3){L.mood='wow';L.say='تتابع ×'+N(L.combo)+'! ما شاء الله!';SND.combo(L.combo)}
    else{L.mood='cheer';L.say=pick(OKSAY);SND.correct()}
  }else{
    L.hearts--;if(L.main&&typeof hpSet==='function')hpSet(L.hearts);L.wrongs++;L.combo=0;L.mood='sad';L.say=pick(NOSAY);SND.wrong();
  }
  act('q');renderLesson();
}
function nextLesson(){
  const q=L.queue[0];
  if(L.placement){L.queue.shift();L.solved++;if(L.queue.length===0)return placementResult();L.state='ask';L.sel=null;L.ans=[];L.ms=[];L.tv='';L.force=false;L.mood='happy';return renderLesson()}
  if(L.ok){L.solved++;L.queue.shift()}
  else{q.missed=true;q.opts=null;q.pool=null;q.st=null;q.hid=null;q.dl=null;L.queue.push(L.queue.shift())}
  if(L.hearts<=0&&!L.ok)return failLesson();
  if(L.queue.length===0)return finishLesson();
  L.state='ask';L.sel=null;L.ans=[];L.ms=[];L.tv='';L.force=false;L.mood='happy';renderLesson();
}
function confetti(){
  const cols=['var(--gold)','var(--accent)','var(--c2)','var(--c4)','var(--flame)'];let h='';
  for(let i=0;i<26;i++)h+='<span class="conf" style="left:'+(Math.random()*100)+'vw;background:'+cols[i%5]+';animation-delay:'+(Math.random()*.6)+'s"></span>';
  const d=document.createElement('div');d.innerHTML=h;document.body.appendChild(d);setTimeout(function(){d.remove()},3500);
}
function finishLesson(){
  const rev=L.review||L.hifzTest;
  const bonus=rev?20:15;
  L.gain=bonus;
  addXP(bonus);
  if(rev){S.rev=(S.rev||0)+1}else S.done[L.lesson.id]=true;
  act(rev?'review':'lesson');save();
  const acc=Math.max(0,Math.round((L.total/(L.total+L.wrongs))*100));
  $('#lesson').innerHTML='<div class="lmain"><div class="center"><div class="mas">'+hoopoe('cheer',150)+'</div><h2>'+(rev?'أتممت المراجعة!':'أتممت الدرس!')+'</h2><p class="muted">'+L.lesson.title+'</p>'+
   (bonus?'<p class="sch-good" style="font-weight:800">+'+N(bonus)+' نقطة مكافأة إتمام المرحلة</p>':'')+
   '<div class="statr"><div class="stat"><b>'+N(L.gain)+'</b><span>نقطة</span></div><div class="stat"><b>'+N(acc)+'%</b><span>دقة الإجابات</span></div><div class="stat"><b>'+N(streak())+'</b><span>أيام متتالية</span></div></div></div></div>'+
   '<div class="lfoot"><div class="in"><button class="btn" data-act="leave">متابعة</button></div></div>';
  confetti();SND.win();
}
function failLesson(){
  const id=L.lesson.id;SND.lose();
  $('#lesson').innerHTML='<div class="lmain"><div class="center"><div class="mas">'+hoopoe('sad',150)+'</div><h2>نفدت القلوب</h2><p class="muted" style="max-width:30ch">لا بأس، التعلّم يحتاج إلى تكرار. راجع الدرس وحاول من جديد.</p></div></div>'+
   '<div class="lfoot"><div class="in" style="display:grid;gap:10px"><button class="btn" data-restart="'+id+'">حاول مرة أخرى</button><button class="btn ghost" data-act="leave">العودة إلى المسار</button></div></div>';
}
