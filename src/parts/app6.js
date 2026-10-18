/* ================= نور الفرقان: ملف شخصي، حساب، مزامنة، تذكير، مشاركة، مساعد، تحدي مباشر ================= */
const skel=function(t){return String(t).replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g,'').replace(/[^ء-ي ]/g,' ').replace(/[اأإآٱءؤئىيو]/g,'').replace(/ة/g,'ه')};
function fsRec(f,ok){if(!f)return;const e=S.fsd[f]||(S.fsd[f]={n:0,c:0});e.n++;if(ok)e.c++}

/* ---------- التاريخ الهجري والمواسم ---------- */
const HM=['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'];
function hijri(){
  try{
    const p=new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn',{day:'numeric',month:'numeric',year:'numeric'}).formatToParts(new Date());
    const g=function(t){return +p.find(function(x){return x.type===t}).value};
    return {d:g('day'),m:g('month'),y:g('year')};
  }catch(e){return null}
}
function seasonHtml(){
  const h=hijri();if(!h)return '';
  let t='',unit='',msg='';
  if(h.m===9){t='رمضان مبارك';msg='موسم القرآن والصيام. ابدأ وردك وراجع درس الصيام.';unit='الصيام والزكاة والحج'}
  else if(h.m===12&&h.d<=13){t='عشر ذي الحجة';msg='أيام فاضلة. تعرّف على الحج ويوم عرفة والأضحية.';unit='التقويم والمناسبات الإسلامية'}
  else if(h.m===1&&h.d<=12){t='شهر الله المحرم';msg='تعرّف على عاشوراء وبداية التقويم الهجري.';unit='التقويم والمناسبات الإسلامية'}
  else if(h.m===8){t='شعبان';msg='مرحلة التهيئة لرمضان. راجع أحكام الصيام.';unit='الصيام والزكاة والحج'}
  const date='<small class="muted">'+toAr(h.d)+' '+HM[h.m-1]+' '+toAr(h.y)+' هـ</small>';
  if(!t)return '<div class="card day">'+date+'</div>';
  return '<button class="card feat" style="text-align:start;border-color:var(--gold)" data-uopen="'+esc(unit)+'"><b>'+t+'</b><span>'+msg+'</span>'+date+'</button>';
}
function openUnitByTitle(title){
  const i=DATA.findIndex(function(u){return u.title===title});
  if(i<0)return;UO={};UO[i]=1;LTAB='path';go('learn');
}

/* ---------- الملف الشخصي والأسئلة الأولى ---------- */
const OB=[
 {k:'name',t:'ما اسمك؟',type:'text',ph:'اكتب اسمك'},
 {k:'age',t:'ما فئتك العمرية؟',opts:[['kid','أقل من 12 سنة'],['teen','12 إلى 17'],['adult','18 إلى 39'],['senior','40 فأكثر']]},
 {k:'lvl',t:'كيف تقيّم معرفتك بالدين؟',opts:[['b','مبتدئ'],['m','متوسط'],['a','متقدم']]},
 {k:'goal',t:'ما هدفك الأول؟',opts:[['learn','تعلّم الأساسيات'],['khatma','ختم القرآن'],['hifz','حفظ القرآن'],['review','مراجعة ما أعرفه'],['all','كل ذلك']]},
 {k:'mins',t:'كم دقيقة يوميًا تريد أن تخصص؟',opts:[[5,'5 دقائق'],[10,'10 دقائق'],[20,'20 دقيقة'],[30,'30 دقيقة أو أكثر']]},
 {k:'city',t:'في أي مدينة تعيش؟ (لمواقيت الصلاة)',type:'city'},
 {k:'rec',t:'من قارئك المفضل؟',type:'rec'},
 {k:'acct',t:'اربط حسابك لحفظ تقدّمك بين أجهزتك',type:'acct'}
];
let OBI=0,OBD={};
function openOnboard(){OBI=0;OBD=Object.assign({},S.prof||{});renderOnboard()}
function renderOnboard(){
  const c=$('#cele'),q=OB[OBI],last=OBI===OB.length-1;
  let h='<div class="card" style="max-height:92vh;overflow:auto;text-align:start;justify-items:stretch"><div style="display:grid;place-items:center">'+hoopoe(OBI%2?'happy':'cheer',84)+'</div>'+
   '<div class="pbar gold"><i style="width:'+((OBI+1)/OB.length*100)+'%"></i></div><small class="muted" style="text-align:center">السؤال '+N(OBI+1)+' من '+N(OB.length)+'</small><h2 style="text-align:center">'+q.t+'</h2>';
  if(q.type==='text')h+='<input type="text" id="obin" maxlength="24" placeholder="'+q.ph+'" value="'+esc(OBD.name||'')+'" aria-label="'+q.t+'">';
  else if(q.type==='city')h+='<select id="obin">'+CITIES.map(function(x){return '<option'+(x[0]===(OBD.city||S.city||CITIES[0][0])?' selected':'')+'>'+x[0]+'</option>'}).join('')+'</select>';
  else if(q.type==='rec')h+='<select id="obin">'+REC.map(function(x){return '<option value="'+x.id+'"'+(x.id===(OBD.rec||S.rec)?' selected':'')+'>'+x.n+'</option>'}).join('')+'</select>';
  else if(q.type==='acct')h+='<p class="muted" style="font-size:.92rem">الربط يتم عبر حسابك في claude.ai الذي فتحتَ منه الصفحة (يظهر بريدك إن سمحت المنصة). لا أستطيع تسجيل الدخول بحساب جوجل مباشرة.</p><button class="btn gold" data-act="ob-link">اربط حسابي</button><p class="muted" id="obacct" style="font-size:.9rem;text-align:center">'+(ACCT&&ACCT.id?'تم الربط ✓':'')+'</p>';
  else h+='<div class="opts">'+q.opts.map(function(o){return '<button class="opt'+(String(OBD[q.k])===String(o[0])?' sel':'')+'" data-ob="'+o[0]+'"><span>'+o[1]+'</span></button>'}).join('')+'</div>';
  h+='<button class="btn" data-act="ob-next">'+(last?'ابدأ الرحلة':'التالي')+'</button><button class="btn ghost" data-act="ob-skip">'+(last?'لاحقًا':'تخطَّ هذا السؤال')+'</button></div>';
  c.innerHTML=h;c.hidden=false;
}
function obCollect(){
  const q=OB[OBI],el=$('#obin');
  if(el&&q.k!=='acct')OBD[q.k]=el.value.trim();
}
function obNext(){
  obCollect();
  if(OBI<OB.length-1){OBI++;SND.nav();return renderOnboard()}
  obFinish();
}
function obFinish(){
  const p=OBD;
  S.prof={name:(p.name||'').slice(0,24),age:p.age||'',lvl:p.lvl||'',goal:p.goal||'',mins:p.mins||'',city:p.city||'',done:true};
  if(p.city&&CITIES.some(function(c){return c[0]===p.city}))S.city=p.city;
  if(p.rec)S.rec=p.rec;
  if(p.age==='kid'){S.kids=true;applyTheme()}
  if(p.goal==='khatma'||p.goal==='all')S.khat.days=p.mins>=20?30:60;
  if(p.goal==='hifz')LTAB='hifz';
  save();pushNow();renderTop();
  const nm=S.prof.name?(' يا '+esc(S.prof.name)):'';
  celebrate('أهلًا بك'+nm,(p.lvl==='a'?'بما أنك متقدم، جرّب «اختبار تحديد المستوى» من صفحة التعلّم.':'ابدأ من أول درس، وأنا معك خطوة بخطوة.'),'cheer');
  renderPage();
}

/* ---------- الحساب والمزامنة ---------- */
let ACCT=null,PUSHT=0,LASTPULL=0;
function schedulePush(){
  if(!DBH||!UID||!(S.acct&&S.acct.linked))return;
  clearTimeout(PUSHT);PUSHT=setTimeout(pushNow,4000);
}
function compactState(){
  const o=JSON.parse(JSON.stringify(S));
  const t=today();for(const k in o.ayd)if(o.ayd[k]!==t)delete o.ayd[k];
  delete o.acct;return o;
}
function pushNow(){
  if(!DBH||!UID||!(S.acct&&S.acct.linked))return Promise.resolve();
  try{return DBH.doc('data/users/'+UID+'/state').set({s:JSON.stringify(compactState()),t:Date.now()}).catch(function(){})}catch(e){return Promise.resolve()}
}
function mergeState(r){
  r=cleanData(r);if(!r||typeof r!=='object')return;
  Object.keys(r).forEach(function(k){
    const a=S[k],b=r[k];
    if(k==='acct'||!(k in S))return;
    if(typeof b==='number'){S[k]=Math.max(a||0,b);return}
    if(b&&typeof b==='object'&&!Array.isArray(b)){
      if(a&&typeof a==='object'&&!Array.isArray(a)){
        if(k==='has'){S.has.t=Math.max(a.t||0,b.t||0);for(const d in b.d)S.has.d[d]=Math.max(S.has.d[d]||0,b.d[d]);return}
        if(k==='khat'){S.khat.n=Math.max(a.n||0,b.n||0);S.khat.read=Math.max(a.read||0,b.read||0);S.khat.days=a.days||b.days;return}
        if(k==='daily'||k==='adk'||k==='prof'){if(k==='prof'&&!a)S[k]=b;return}
        for(const kk in b){
          if(a[kk]===undefined)a[kk]=b[kk];
          else if(typeof b[kk]==='number'&&typeof a[kk]==='number')a[kk]=Math.max(a[kk],b[kk]);
          else if(k==='fsd'&&b[kk]&&a[kk]){a[kk].n=Math.max(a[kk].n,b[kk].n);a[kk].c=Math.max(a[kk].c,b[kk].c)}
        }
      }else if(!a||(typeof a==='object'&&!Object.keys(a).length))S[k]=b;
    }else if((a===''||a===null||a===undefined||a===false)&&b)S[k]=b;
  });
  S.max=Math.max(S.max||0,r.max||0);
}
function pullState(){
  if(!DBH||!UID)return Promise.resolve();
  return DBH.doc('data/users/'+UID+'/state').get().then(function(d){
    const v=d&&(d.data?d.data():d);if(!v||!v.s)return;
    try{mergeState(JSON.parse(v.s));save();renderTop();if(!S.prof&&0)openOnboard()}catch(e){}
  }).catch(function(){});
}
function linkAccount(){
  if(!window.claude||!claude.use){toast('الربط يعمل عند فتح الصفحة من claude.ai');return Promise.resolve(false)}
  return Promise.all([claude.use('user'),claude.use('db')]).then(function(r){
    const U=r[0];DBH=r[1];if(!U||!DBH){toast('تعذّر الربط من هذا العرض. افتح الصفحة من حسابك في claude.ai.');return false}
    return U.me().then(function(me){
      if(!me||!me.id){toast('لا توجد هوية لحسابك في هذا العرض.');return false}
      UID=me.id;ACCT={id:me.id,name:me.name||'',email:me.email||''};
      S.acct={linked:true};
      if(!S.prof||!S.prof.name){if(me.name){S.prof=S.prof||{};S.prof.name=S.prof.name||me.name}}
      save();
      return pullState().then(function(){return pushNow()}).then(function(){syncBoard();toast('تم ربط حسابك وحُفظ تقدّمك');return true});
    });
  }).catch(function(){toast('تعذّر الربط الآن.');return false});
}
let DBH=null,UID=null,BOARD=[],CIRC=[];
function syncBoard(){
  if(!DBH||!UID)return;
  clearTimeout(syncBoard.t);
  syncBoard.t=setTimeout(function(){
    try{DBH.collection('board').doc(UID).set({wk:weekKey(),xp:weekSum(S.xpd),has:weekSum(S.has.d),upd:Date.now(),circle:S.circle||'',kh:S.khat.read,kn:S.khat.n}).catch(function(){})}catch(e){}
  },2500);
}
function initBoard(){
  try{
    if(!window.claude||!claude.use)return;
    Promise.all([claude.use('db'),claude.use('user')]).then(function(r){
      DBH=r[0];const U=r[1];if(!DBH||!U)return;
      return U.me().then(function(me){
        if(!me.id){DBH=null;return}
        UID=me.id;ACCT={id:me.id,name:me.name||'',email:me.email||''};
        if(S.acct&&S.acct.linked)pullState();
        DBH.collection('board').onSnapshot(function(snap){
          const rows=[];
          (snap.docs||snap).forEach(function(d){const v=d.data?d.data():d;if(v)rows.push({id:d.id,wk:v.wk,xp:v.xp||0,has:v.has||0,circle:v.circle||'',kh:v.kh||0,kn:v.kn||0})});
          BOARD=rows.filter(function(x){return x.wk===weekKey()}).sort(function(a,b){return b.xp-a.xp}).slice(0,10);
          CIRC=S.circle?rows.filter(function(x){return x.circle===S.circle}).sort(function(a,b){return (b.kn*6236+b.kh)-(a.kn*6236+a.kh)}).slice(0,12):[];
          const ids=BOARD.concat(CIRC).map(function(x){return x.id});
          U.profiles(ids).then(function(ps){
            BOARD.concat(CIRC).forEach(function(x){x.name=(ps&&ps[x.id]&&ps[x.id].name)||'مستخدم'});
            if(TAB==='ach')fillBoard();
          }).catch(function(){BOARD.concat(CIRC).forEach(function(x){x.name='مستخدم'});if(TAB==='ach')fillBoard()});
        });
        syncBoard();
      });
    }).catch(function(){});
  }catch(e){}
}
function fillBoard(){
  const el=$('#board');if(!el)return;
  if(!DBH){el.innerHTML='<p class="muted" style="font-size:.9rem">اللوحة الأسبوعية تعمل عندما تفتح الصفحة من حسابك في claude.ai، وبصلاحية المشاركة (Contributor) لتُسجَّل نقاطك.</p>'}
  else el.innerHTML=BOARD.length?'<div class="lb">'+BOARD.map(function(x,i){return '<div'+(x.id===UID?' class="me"':'')+'><span>'+N(i+1)+'</span><span>'+esc(x.name||'…')+(x.id===UID?' (أنت)':'')+'</span><span>'+N(x.xp)+' نقطة</span></div>'}).join('')+'</div>':'<p class="muted" style="font-size:.9rem">لا توجد نتائج لهذا الأسبوع بعد. اجمع نقاطًا لتظهر هنا.</p>';
  const ce=$('#circ');if(ce){
    if(!S.circle)ce.innerHTML='<p class="muted" style="font-size:.9rem">أنشئ دائرة عائلية أو انضم إلى واحدة برمز مشترك، فتتابعون ختماتكم معًا.</p><div class="opts2"><button class="btn sm gold" data-act="circ-new">إنشاء دائرة</button><button class="btn sm ghost" data-act="circ-join">انضمام برمز</button></div>';
    else ce.innerHTML='<p class="muted" style="font-size:.9rem">رمز الدائرة: <b dir="ltr">'+esc(S.circle)+'</b> · شاركه مع أهلك وأصدقائك</p>'+
      (DBH?(CIRC.length?'<div class="lb">'+CIRC.map(function(x){return '<div'+(x.id===UID?' class="me"':'')+'><span>'+esc(x.name||'…')+(x.id===UID?' (أنت)':'')+'</span><span>'+N(x.kn)+' ختمة · '+N(Math.round(x.kh/6236*100))+'%</span></div>'}).join('')+'</div>':'<p class="muted" style="font-size:.9rem">لا أعضاء ظاهرون بعد.</p>'):'<p class="muted" style="font-size:.9rem">متابعة الأعضاء تحتاج فتح الصفحة من حسابك في claude.ai.</p>')+
      '<button class="btn sm ghost" data-act="circ-leave">مغادرة الدائرة</button>';
  }
}
function newCircle(){const a='abcdefghjkmnpqrstuvwxyz23456789';let c='';for(let i=0;i<6;i++)c+=a[Math.floor(Math.random()*a.length)];S.circle=c;save();syncBoard();pageAch()}
function joinCircle(){
  const v=(prompt(T('اكتب رمز الدائرة'))||'').trim().toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,8);
  if(v.length>=4){S.circle=v;save();syncBoard();pageAch()}
}

/* ---------- التذكير اليومي (ملف تقويم) ---------- */
function dlSave(name,data,type){
  if(!window.claude||!claude.use){if(anchorSave(name,new Blob([data],{type:type})))toast('تم الحفظ');else toast('الحفظ غير متاح في هذا العرض');return Promise.resolve()}
  return claude.use('downloads').then(function(D){
    if(!D){toast('الحفظ غير متاح في هذا العرض');return}
    return D.save({filename:name,data:new Blob([data],{type:type})}).then(function(r){if(r&&r.status==='saved')toast('تم الحفظ')}).catch(function(){toast('لم يُحفظ الملف')});
  }).catch(function(){toast('الحفظ غير متاح')});
}
function reminderICS(hhmm){
  const d=new Date(),p=function(n){return pad(n,2)},hm=hhmm.split(':');
  const dt=d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'T'+p(+hm[0])+p(+hm[1])+'00';
  const now=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
  const L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Nur Al-Furqan//AR','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:nur-alfurqan-daily@local','DTSTAMP:'+now,'DTSTART:'+dt,'DURATION:PT10M','RRULE:FREQ=DAILY','SUMMARY:نور الفرقان: وقت وردك اليومي','DESCRIPTION:افتح نور الفرقان وأتمّ وردك ومراجعتك.','BEGIN:VALARM','TRIGGER:PT0M','ACTION:DISPLAY','DESCRIPTION:وقت وردك اليومي','END:VALARM','END:VEVENT','END:VCALENDAR'];
  return L.join('\r\n');
}
function reminderBanner(){
  if(!S.rem||S.days[today()])return '';
  const n=new Date(),hm=S.rem.split(':');
  if(n.getHours()*60+n.getMinutes()<(+hm[0])*60+(+hm[1]))return '';
  return '<button class="card feat" style="text-align:start;border-color:var(--gold)" data-go="read"><b>حان وقت وردك اليوم</b><span>لم تسجّل نشاطًا بعد اليوم. ابدأ ولو بآية.</span></button>';
}

/* ---------- تجميد السلسلة ---------- */
function applyFreeze(){
  const y=new Date();y.setDate(y.getDate()-1);const yy=ymd(y);
  const b=new Date();b.setDate(b.getDate()-2);
  if(!S.days[yy]&&S.days[ymd(b)]&&S.freeze>0&&!S.days[today()]){S.days[yy]=1;S.freeze--;save();setTimeout(function(){toast('استُخدم تجميد السلسلة لحفظ يوم أمس')},1200)}
}
function buyFreeze(){
  if(S.xp<50){toast('تحتاج 50 نقطة');return}
  if(S.freeze>=3){toast('لديك الحد الأقصى: 3');return}
  S.xp-=50;S.freeze++;save();SND.coin();renderTop();pageAch();
}

/* ---------- نقاط الضعف ---------- */
function weakHtml(){
  const rows=[];for(const f in S.fsd){const e=S.fsd[f];if(e.n>=4){const fo=F.find(function(x){return x.id===f});if(fo)rows.push({f:f,n:fo.n,p:Math.round(e.c/e.n*100),t:e.n})}}
  rows.sort(function(a,b){return a.p-b.p});
  if(!rows.length)return '<p class="muted" style="font-size:.9rem">أجب عن بعض الأسئلة والألعاب ليظهر لك أضعف مجالاتك.</p>';
  return rows.slice(0,3).map(function(r){return '<div class="card ch"><div class="row"><b>'+r.n+'</b><small class="muted">دقتك '+N(r.p)+'% في '+N(r.t)+' سؤالًا</small></div><div class="pbar"><i style="width:'+r.p+'%"></i></div><button class="btn sm ghost" data-weak="'+r.f+'">تدرّب عليه</button></div>'}).join('');
}

/* ---------- اختبار تحديد المستوى ---------- */
function startPlacement(){
  const out=[];
  [['e',3],['m',4],['h',3]].forEach(function(lv){
    let pool=[];F.forEach(function(f){if(f.id==='order'||f.id==='ayat'||f.id==='gharib')return;((B[f.id]||{})[lv[0]]||[]).forEach(function(x){pool.push(Object.assign(mkG(f.id,lv[0],x),{n:''}))})});
    shuffle(pool).slice(0,lv[1]).forEach(function(x){out.push(x)});
  });
  L={lesson:{id:'_place',title:'اختبار تحديد المستوى'},placement:true,queue:out.map(mkQ),total:out.length,solved:0,hearts:99,gain:0,wrongs:0,state:'ask',sel:null,ans:[],ok:false,confirm:false,mood:'happy',say:'',combo:0,best:0,pc:0};
  openOverlay();renderLesson();
}
function placementResult(){
  const s=L.pc,t=L.total;S.place={s:s,t:t,d:today()};addXP(10);act('lesson');save();
  let rec,unit;
  if(s<=3){rec='ابدأ من الأساسيات: أركان الإسلام والإيمان ثم أسماء الله الحسنى.';unit='أركان الإسلام والإيمان'}
  else if(s<=7){rec='أساسك جيد. تابع من وحدة «الصلاة بالتفصيل» ثم «السيرة».';unit='الصلاة بالتفصيل'}
  else{rec='مستواك متقدم. جرّب «علوم القرآن» و«الأربعون النووية» و«التجويد».';unit='علوم القرآن'}
  $('#lesson').innerHTML='<div class="lmain"><div class="center"><div class="mas">'+hoopoe(s>=6?'cheer':'happy',140)+'</div><h2>نتيجتك: '+N(s)+' من '+N(t)+'</h2><p class="muted" style="max-width:32ch">'+rec+'</p></div></div>'+
   '<div class="lfoot"><div class="in" style="display:grid;gap:10px"><button class="btn" data-uopen2="'+esc(unit)+'">اذهب إلى الوحدة المقترحة</button><button class="btn ghost" data-act="leave">إغلاق</button></div></div>';
  s>=6?SND.win():SND.correct();confetti();
}

/* ---------- بطاقة المشاركة ---------- */
function hpImage(mood,size){
  return new Promise(function(res){
    const cs=getComputedStyle(document.documentElement);
    let svg=hoopoe(mood,size).replace(/var\((--[\w-]+)\)/g,function(m,v){return (cs.getPropertyValue(v)||'#888').trim()});
    svg=svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');
    const im=new Image();im.onload=function(){res(im)};im.onerror=function(){res(null)};
    im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  });
}
function shareApp(){
  const txt='نور الفرقان — تعلّم دينك خطوة خطوة مع الهدهد';let url='';try{url=location.href}catch(e){}
  const copy=function(){try{navigator.clipboard.writeText(txt+(url?'\n'+url:'')).then(function(){toast('تم نسخ نص المشاركة')},function(){shareCard()})}catch(e){shareCard()}};
  if(navigator.share){navigator.share({title:'نور الفرقان',text:txt,url:url||undefined}).catch(function(e){if(e&&e.name!=='AbortError')copy()})}else copy();
}
function shareCard(){
  const cs=getComputedStyle(document.documentElement),g=function(v){return cs.getPropertyValue(v).trim()};
  hpImage('cheer',360).then(function(im){
    const c=document.createElement('canvas');c.width=1080;c.height=1350;const x=c.getContext('2d');
    x.fillStyle=g('--arch2')||'#0A4A30';x.fillRect(0,0,1080,1350);
    x.strokeStyle=g('--gold')||'#D9A21B';x.lineWidth=8;x.strokeRect(40,40,1000,1270);x.lineWidth=2;x.strokeRect(62,62,956,1226);
    x.textAlign='center';x.direction='rtl';
    x.fillStyle='#F6EFCB';x.font='700 84px "Baloo Bhaijaan 2",Tahoma,sans-serif';x.fillText('نور الفرقان',540,190);
    if(im)x.drawImage(im,360,230,360,360);
    const nm=(S.prof&&S.prof.name)?S.prof.name:'';
    x.fillStyle=g('--gold')||'#F2C14A';x.font='700 60px Tahoma,sans-serif';x.fillText(nm?('إنجازات '+nm):'إنجازاتي',540,690);
    const rows=[[N(S.has.t),'حسنة (تقدير تحفيزي)'],[N(streak()),'يومًا متتاليًا'],[N(doneN())+' / '+N(ALL.length),'درسًا مكتملًا'],[N(S.khat.n),'ختمة']];
    rows.forEach(function(r,i){
      const y=800+i*115;x.fillStyle='rgba(255,255,255,.08)';x.fillRect(120,y-70,840,96);
      x.fillStyle='#F6EFCB';x.font='800 56px Tahoma,sans-serif';x.textAlign='right';x.fillText(r[0],940,y);
      x.font='500 36px Tahoma,sans-serif';x.fillStyle='rgba(246,239,203,.8)';x.textAlign='left';x.fillText(r[1],140,y-2);
    });
    x.textAlign='center';x.fillStyle='rgba(246,239,203,.7)';x.font='500 32px Tahoma,sans-serif';x.fillText('تعلّم دينك خطوة خطوة',540,1275);
    c.toBlob(function(b){if(!b){toast('تعذّر إنشاء الصورة');return}
      if(!window.claude||!claude.use){toast('الحفظ غير متاح');return}
      claude.use('downloads').then(function(D){if(!D){toast('الحفظ غير متاح في هذا العرض');return}
        D.save({filename:'noor-alfurqan.png',data:b}).then(function(){toast('تم الحفظ')}).catch(function(){toast('لم تُحفظ الصورة')})}).catch(function(){toast('الحفظ غير متاح')});
    },'image/png');
  });
}

/* ---------- المساعد ---------- */
let AS=[];
function openAssistant(){openOverlay();renderAssistant()}
function renderAssistant(){
  $('#lesson').innerHTML='<div class="ltop"><button class="xbtn" data-act="leave" aria-label="إغلاق">'+IC.x+'</button><h2 style="flex:1;font-size:1.2rem">اسأل هدهد</h2></div><div class="lmain" id="aslog">'+
   '<div class="say"><div class="mas">'+hoopoe('happy',72)+'</div><div class="bubble"><p>اسألني عن آية أو سورة أو معلومة في الدين. أجيب باختصار، وفي الفتاوى والمسائل الخلافية أحيلك إلى أهل العلم.</p></div></div>'+
   AS.map(function(m){return '<div class="card" style="'+(m.r==='u'?'background:var(--accent-soft)':'')+'"><p style="white-space:pre-wrap">'+esc(m.t)+'</p></div>'}).join('')+'<div id="asa"></div></div>'+
   '<div class="lfoot"><div class="in" style="display:grid;gap:8px"><input type="text" id="asq" placeholder="اكتب سؤالك" maxlength="300" aria-label="سؤالك"><button class="btn" data-act="ask-send">أرسل</button></div></div>';
}
function askSend(){
  const inp=$('#asq'),q=(inp.value||'').trim();if(!q)return;
  if(!window.claude||!claude.use){toast('المساعد غير متاح في هذا العرض');return}
  inp.value='';AS.push({r:'u',t:q});renderAssistant();
  const out=$('#asa');out.innerHTML='<div class="card"><p class="muted">جارٍ التفكير…</p></div>';
  const hist=AS.slice(-7,-1).map(function(m){return (m.r==='u'?'السائل: ':'المساعد: ')+m.t}).join('\n');
  const prompt='أنت «هدهد»، مساعد تعليمي في تطبيق إسلامي. أجب بالعربية الفصحى المبسطة في خمس جمل أو أقل. اذكر الآيات والأحاديث فقط إن كنت متأكدًا من نصها ومصدرها، وإلا فاشرح المعنى دون اقتباس. لا تفتِ في المسائل الخلافية أو الشخصية، وقل إن الأولى سؤال عالم موثوق. إن لم تعرف فقل لا أعرف.\n\n'+(hist?'المحادثة السابقة:\n'+hist+'\n\n':'')+'السؤال: '+q;
  claude.use('sample').then(function(sm){
    if(!sm){out.innerHTML='<div class="card"><p>المساعد غير متاح في هذا العرض.</p></div>';return}
    return sm(prompt,{cache:false,modelTier:'default',onText:function(u){out.innerHTML='<div class="card"><p style="white-space:pre-wrap">'+esc(u.text)+'</p></div>'}}).then(function(r){
      AS.push({r:'a',t:r.text});renderAssistant();SND.coin();
    });
  }).catch(function(e){out.innerHTML='<div class="card"><p>تعذّر الحصول على إجابة'+(e&&e.code==='rate_limited'?' (كثرة الطلبات، حاول بعد قليل)':e&&e.code==='not_granted'?' (لم تُمنح الإذن)':'')+'.</p></div>'});
}

/* ---------- تحدٍّ مباشر بين جهازين ---------- */
let DU=null;
function duelName(){return (S.prof&&S.prof.name)||(ACCT&&ACCT.name)||'لاعب'}
function openDuel(){DU={room:null,code:'',qs:null,i:0,sc:0,state:'lobby',host:false,offs:[],sel:null};openOverlay();renderDuel()}
function duelClose(){if(DU){DU.offs.forEach(function(f){try{f()}catch(e){}});if(DU.room)DU.room.leave().catch(function(){});DU=null}closeOverlay()}
function duelJoin(code,host){
  if(!window.claude||!claude.use){toast('التحدي المباشر غير متاح في هذا العرض');return}
  claude.use('room').then(function(R){
    if(!R||!R.join){toast('التحدي المباشر غير متاح في هذا العرض');return}
    return R.join('nf-'+code).then(function(rm){
      DU.room=rm;DU.code=code;DU.host=host;DU.state='wait';
      rm.presence({n:duelName(),sc:0,dn:0}).catch(function(){});
      DU.offs.push(rm.onPeers(function(){renderDuel()}));
      DU.offs.push(rm.on('duel',function(m){if(DU&&DU.state==='wait'&&m.data&&m.data.qs){duelStart(m.data.qs)}}));
      renderDuel();
    });
  }).catch(function(){toast('تعذّر دخول الغرفة (قد لا يكون مسموحًا لك).')});
}
function duelValid(qs){
  if(!Array.isArray(qs)||!qs.length||qs.length>20)return null;
  const out=[];
  for(const x of qs){
    if(!x||typeof x.q!=='string'||typeof x.c!=='string'||!Array.isArray(x.o)||x.o.length<2||x.o.length>6)return null;
    if(x.o.some(function(o){return typeof o!=='string'||o.length>300})||x.q.length>400||x.c.length>300||x.o.indexOf(x.c)<0)return null;
    out.push({q:x.q,c:x.c,o:x.o.slice()});
  }
  return out;
}
function duelStart(qs){qs=duelValid(qs);if(!qs){toast('بيانات التحدي غير صالحة');return}DU.qs=qs;DU.i=0;DU.sc=0;DU.state='play';DU.sel=null;DU.room.presence({n:duelName(),sc:0,dn:0}).catch(function(){});SND.nav();renderDuel()}
function duelHostStart(){
  let pool=[];F.forEach(function(f){if(f.id==='order'||f.id==='ayat')return;['e','m'].forEach(function(l){((B[f.id]||{})[l]||[]).forEach(function(x){pool.push({q:x[0],c:x[1],o:shuffle(x.slice(1,5))})})})});
  const qs=shuffle(pool).slice(0,8);
  DU.room.emit('duel',{qs:qs}).catch(function(){});
  duelStart(qs);
}
function duelRank(){
  const r=DU.room.peers().map(function(p){return {n:(p.presence&&p.presence.n)||'لاعب',sc:(p.presence&&p.presence.sc)||0,dn:(p.presence&&p.presence.dn)||0,me:p.isMe}});
  return r.sort(function(a,b){return b.sc-a.sc});
}
function renderDuel(){
  if(!DU)return;
  let h='<div class="ltop"><button class="xbtn" data-act="duel-close" aria-label="إغلاق">'+IC.x+'</button><h2 style="flex:1;font-size:1.2rem">تحدٍّ مباشر</h2></div><div class="lmain">';
  if(DU.state==='lobby'){
    h+='<div class="say"><div class="mas">'+hoopoe('happy',80)+'</div><div class="bubble"><p>تنافس مع صديق على جهاز آخر في اللحظة نفسها. يحتاج كلاكما أن يفتح الصفحة من حساب claude.ai.</p></div></div>'+
     '<button class="btn" data-act="duel-new">إنشاء غرفة</button><div class="field"><label for="ducode">أو انضم برمز</label><input type="text" id="ducode" maxlength="8" dir="ltr" placeholder="الرمز"><button class="btn ghost" data-act="duel-join">انضم</button></div>';
  }else if(DU.state==='wait'){
    const rk=duelRank();
    h+='<div class="center"><h2>رمز الغرفة</h2><div class="bigs" dir="ltr">'+esc(DU.code)+'</div><p class="muted">أعطِ الرمز لصديقك. اللاعبون الآن:</p><div class="lb" style="width:100%">'+rk.map(function(p){return '<div'+(p.me?' class="me"':'')+'><span>'+esc(p.n)+(p.me?' (أنت)':'')+'</span></div>'}).join('')+'</div>'+
     (DU.host?'<button class="btn" data-act="duel-go" '+(rk.length<2?'disabled':'')+'>ابدأ التحدي</button>':'<p class="muted">بانتظار صاحب الغرفة ليبدأ…</p>')+'</div>';
  }else if(DU.state==='play'){
    const q=DU.qs[DU.i],ans=DU.sel!==null;
    h+='<div class="gmeta"><span class="pill">'+N(DU.i+1)+' / '+N(DU.qs.length)+'</span><span class="pill">نقاطك '+N(DU.sc)+'</span></div><h2 class="qtext">'+esc(q.q)+'</h2><div class="opts">'+q.o.map(function(o,i){let c='';if(ans){if(o===q.c)c=' right';else if(i===DU.sel)c=' wrong'}return '<button class="opt'+c+'" data-duopt="'+i+'" '+(ans?'disabled':'')+'><span class="k">'+N(i+1)+'</span><span>'+esc(o)+'</span></button>'}).join('')+'</div>';
    if(ans)h+='<button class="btn" style="margin-top:12px" data-act="duel-next">'+(DU.i+1>=DU.qs.length?'النتيجة':'التالي')+'</button>';
    h+='<div class="lb" style="margin-top:12px">'+duelRank().map(function(p){return '<div'+(p.me?' class="me"':'')+'><span>'+esc(p.n)+'</span><span>'+N(p.sc)+'</span></div>'}).join('')+'</div>';
  }else{
    const rk=duelRank();
    h+='<div class="center"><div class="mas">'+hoopoe(rk[0]&&rk[0].me?'cheer':'happy',120)+'</div><h2>'+(rk[0]&&rk[0].me?'فزت!':'انتهى التحدي')+'</h2><div class="rank" style="width:100%">'+rk.map(function(p,i){return '<div><span>'+N(i+1)+'</span><span>'+esc(p.n)+(p.me?' (أنت)':'')+(p.dn?'':' …')+'</span><span>'+N(p.sc)+' نقطة</span></div>'}).join('')+'</div><button class="btn ghost" data-act="duel-close">إغلاق</button></div>';
  }
  h+='</div>';$('#lesson').innerHTML=h;
}
function duelAnswer(i){
  const q=DU.qs[DU.i];if(DU.sel!==null)return;
  DU.sel=i;const ok=q.o[i]===q.c;
  if(ok){DU.sc+=10;SND.correct()}else SND.wrong();
  S.q++;if(ok)S.qc++;act('q');
  DU.room.presence({n:duelName(),sc:DU.sc,dn:0}).catch(function(){});
  renderDuel();
}
function duelNext(){
  DU.i++;DU.sel=null;
  if(DU.i>=DU.qs.length){DU.state='end';DU.room.presence({n:duelName(),sc:DU.sc,dn:1}).catch(function(){});act('game');S.games++;addXP(Math.round(DU.sc/2));SND.win();confetti()}
  renderDuel();
}

/* ---------- التلاوة بالصوت (تجريبي) ---------- */
function voiceCheck(s,a,btn){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){toast('متصفحك لا يدعم التعرّف على الصوت. جرّب Chrome.');return}
  const tx=Q.v[s-1][a-1],rec=new SR();rec.lang='ar-SA';rec.interimResults=false;rec.maxAlternatives=3;
  btn.textContent='أستمع إليك…';
  rec.onresult=function(e){
    const heard=skel(e.results[0][0].transcript).split(/\s+/).filter(Boolean),want=skel(tx).split(/\s+/).filter(Boolean);
    let hit=0;want.forEach(function(w){if(heard.indexOf(w)>=0)hit++});
    const p=want.length?Math.round(hit/want.length*100):0;
    btn.textContent='نطقي';
    toast('تطابق '+N(p)+'% '+(p>=85?'ممتاز، ما شاء الله':p>=50?'جيد، أعد المحاولة':'حاول مرة أخرى بوضوح')+' (تقدير آلي)');
    if(p>=85){SND.correct()}else SND.wrong();
  };
  rec.onerror=function(e){btn.textContent='نطقي';toast(e&&e.error==='not-allowed'?'لم يُسمح بالميكروفون في هذا العرض.':'تعذّر التعرّف على الصوت.')};
  rec.onend=function(){if(btn.textContent!=='نطقي')btn.textContent='نطقي'};
  try{rec.start()}catch(e){btn.textContent='نطقي'}
}
