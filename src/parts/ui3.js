/* ===== واجهة 3: جولة التعريف بالتطبيق، شاشة التحميل الداخلية، رابط الدعوة ===== */
(function(){
  /* ---------- جولة التعريف ---------- */
  const SL=[
   ['🌟','cheer',['تعلّم بمتعة','Learn with joy','Apprenez avec plaisir'],['مسار من 23 وحدة وأكثر من مئة درس، أسئلة قصيرة كاللعبة، ومراجعة ذكية تعيد لك ما نسيته.','A path of 23 units and 100+ lessons, game-like short questions, and smart review that brings back what you forgot.','Un parcours de 23 unités et plus de 100 leçons, des questions courtes façon jeu et une révision intelligente.']],
   ['📖','happy',['المصحف والتفسير','The Qur’an & tafsir','Le Coran et le tafsir'],['اقرأ واستمع، مع تفسيرين تحت كل آية وترجمة إنجليزية وفرنسية، وعدّاد حسنات وورد يومي.','Read and listen, with two tafsirs under each verse, English and French translations, a good-deeds counter and a daily wird.','Lisez et écoutez, avec deux tafsirs sous chaque verset, des traductions anglaise et française et un wird quotidien.']],
   ['🎓','cheer',['المدرسية للبكالوريا','School section for the Bac','Section scolaire pour le Bac'],['25 درسًا من العلوم الإسلامية للسنة الثالثة ثانوي، مع اختبار لكل درس وفصل وللسنة وشهادة نجاح.','25 Islamic-sciences lessons for the 3rd year, with an exam per lesson, term and year, and a certificate.','25 leçons de sciences islamiques de 3e année, avec un examen par leçon, trimestre et année, et un certificat.']],
   ['🔥','wow',['حافظ على عادتك','Keep your streak','Gardez votre rythme'],['أيام متتالية وأوسمة وتحدٍّ مع الأصدقاء، وسبحة وأذكار ومواقيت صلاة وقبلة.','Streaks, badges, challenges with friends, tasbih, adhkar, prayer times and qibla.','Séries, badges, défis entre amis, chapelet, adhkar, heures de prière et qibla.']],
   ['🔒','happy',['خصوصيتك وراحتك','Private and offline','Privé et hors ligne'],['يعمل دون إنترنت، وتقدّمك محفوظ على جهازك، وتستطيع ربط حسابك لاحقًا.','Works offline, your progress stays on your device, and you can link your account later.','Fonctionne hors ligne, votre progression reste sur votre appareil, et vous pouvez lier votre compte plus tard.']]
  ];
  let TI=0,TREPLAY=false;
  window.startTour=function(replay){TI=0;TREPLAY=!!replay;renderTour()};
  function endTour(){
    S.toured=1;try{save()}catch(e){}
    if(TREPLAY){OBD=Object.assign({},S.prof||{});OBI=-1;renderOnboard()}
    else openOnboard();
  }
  function renderTour(){
    const c=$('#cele'),s=SL[TI],last=TI===SL.length-1;
    c.innerHTML='<div class="obx" id="tourbox" '+(TI?'style="animation:none"':'')+'><div class="obtop"><div class="obowl" '+(TI?'style="animation:bob 3s ease-in-out infinite"':'')+'>'+hoopoe(s[1],104)+'</div><div class="obdots" aria-hidden="true">'+SL.map(function(_,i){return '<i class="'+(i===TI?'on':'')+'"></i>'}).join('')+'</div></div>'+
     '<div class="obbody" style="text-align:center;padding-top:18px"><div style="font-size:2.6rem;line-height:1" class="tourico">'+icoSvg(s[0])+'</div><h2 style="margin:4px 0 0">'+esc(g3(s[2]))+'</h2><p style="margin:0;line-height:1.9;min-height:96px">'+esc(g3(s[3]))+'</p></div>'+
     '<div class="obfoot"><button class="btn" data-tr="next">'+esc(last?g3(['هيا نتعارف','Let’s get started','Faisons connaissance']):g3(['التالي','Next','Suivant']))+'</button>'+
     '<button class="btn ghost" data-tr="skip">'+esc(g3(['تخطَّ الجولة','Skip tour','Passer la visite']))+'</button></div></div>';
    c.hidden=false;
    const b=$('#tourbox'),sx={x:0};
    b.addEventListener('touchstart',function(e){sx.x=e.touches[0].clientX},{passive:true});
    b.addEventListener('touchend',function(e){const dx=e.changedTouches[0].clientX-sx.x;if(Math.abs(dx)<50)return;
      if(dx<0&&TI<SL.length-1){TI++;renderTour()}else if(dx>0&&TI>0){TI--;renderTour()}},{passive:true});
  }
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-tr]');if(!b)return;
    const a=b.dataset.tr;
    if(a==='next'){if(TI<SL.length-1){TI++;try{SND.nav()}catch(x){}renderTour()}else endTour()}
    else if(a==='skip')endTour();
  });
  const _oo=openOnboard;
  openOnboard=function(){
    if(!(S.prof&&S.prof.done)&&!S.toured){return startTour(false)}
    _oo();
  };

  /* ---------- شاشة التحميل الداخلية ---------- */
  const TIPS=[
   ['هل تعلم؟ القليل المستمر خير من الكثير المنقطع.','Did you know? A little, steady, beats a lot, rarely.','Le saviez-vous ? Peu mais régulier vaut mieux que beaucoup par à-coups.'],
   ['جرّب «مراجعة الأخطاء» في المدرسية قبل الامتحان.','Try “Mistakes review” in School before the exam.','Essayez « Révision des erreurs » avant l’examen.'],
   ['اربط حسابك لتحفظ تقدمك بين أجهزتك.','Link your account to keep your progress across devices.','Liez votre compte pour garder votre progression.'],
   ['يعمل التطبيق دون إنترنت بعد أول فتح.','The app works offline after the first launch.','L’application fonctionne hors ligne après la première ouverture.'],
   ['ادعُ صديقًا من الإعدادات وتحدّاه.','Invite a friend from Settings and challenge them.','Invitez un ami depuis les réglages et défiez-le.']
  ];
  let ldrT=0,ldrN=0,tipT=0;
  window.showLoader=function(msg){
    if(ldrN++>0)return;
    let d=document.getElementById('ldr');
    if(!d){d=document.createElement('div');d.id='ldr';d.setAttribute('role','status');document.body.appendChild(d)}
    d.innerHTML='<div class="ldr-in"><div class="obowl">'+hoopoe('happy',84)+'</div><b>'+esc(msg||g3(['جارٍ التحميل…','Loading…','Chargement…']))+'</b><div class="ldr-bar"><i></i></div><small id="ldrtip">'+esc(g3(TIPS[Math.floor(Math.random()*TIPS.length)]))+'</small></div>';
    d.hidden=false;
    let i=Math.floor(Math.random()*TIPS.length);
    tipT=setInterval(function(){i=(i+1)%TIPS.length;const t=document.getElementById('ldrtip');if(t)t.textContent=g3(TIPS[i])},2600);
  };
  window.hideLoader=function(){
    if(ldrN>0)ldrN--;if(ldrN>0)return;
    clearInterval(tipT);const d=document.getElementById('ldr');if(d)d.hidden=true;
  };
  const _lq=loadQ;
  loadQ=function(){
    if(Q)return _lq();
    const p=_lq();let shown=false;const t=setTimeout(function(){shown=true;showLoader(g3(['جارٍ تحميل المصحف…','Loading the Qur’an…','Chargement du Coran…']))},300);
    const done=function(){clearTimeout(t);if(shown)hideLoader()};p.then(done,done);return p;
  };

  /* ---------- رابط الدعوة ---------- */
  try{
    const u=new URL(location.href),v=u.searchParams.get('inv');
    if(v&&!(S.prof&&S.prof.done)&&!S.inv){S.inv=v.replace(/[<>"&]/g,'').slice(0,24);save()}
  }catch(e){}
  shareApp=function(){
    let base='';try{const u=new URL(location.href);u.search='';u.hash='';base=u.href}catch(e){}
    const nm=(S.prof&&S.prof.name)||'';
    const url=base&&!onClaude()?base+(nm?'?inv='+encodeURIComponent(nm):''):base;
    const txt=nm?g3([nm+' يدعوك إلى «نور الفرقان»: تعلّم دينك خطوة خطوة مع الهدهد.',nm+' invites you to “Nur al-Furqan”: learn your faith step by step with the Hoopoe.',nm+' vous invite sur « Nur al-Furqan » : apprenez votre foi pas à pas avec la huppe.']):g3(['نور الفرقان — تعلّم دينك خطوة خطوة مع الهدهد','Nur al-Furqan — learn your faith step by step with the Hoopoe','Nur al-Furqan — apprenez votre foi pas à pas avec la huppe']);
    const copy=function(){try{navigator.clipboard.writeText(txt+(url?'\n'+url:'')).then(function(){toast(g3(['تم نسخ رابط الدعوة','Invite link copied','Lien d’invitation copié']))},function(){shareCard()})}catch(e){shareCard()}};
    if(navigator.share){navigator.share({title:'نور الفرقان',text:txt,url:url||undefined}).catch(function(e){if(e&&e.name!=='AbortError')copy()})}else copy();
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest('button');if(b&&b.dataset.act==='invite')shareApp();
  });
  /* صف الدعوة في الإعدادات */
  const _os=openSettings;
  openSettings=function(){
    _os();
    try{
      const card=document.querySelector('#cele .setcard .sgb');
      const first=document.querySelector('#cele .setcard .sg .sgb');
      const meDet=[].slice.call(document.querySelectorAll('#cele .setcard .sg')).find(function(d){return d.querySelector('[data-act="prof-edit"]')});
      const box=(meDet&&meDet.querySelector('.sgb'))||first;
      if(box){const r=document.createElement('div');r.className='setrow';r.innerHTML='<span>'+esc(g3(['ادعُ صديقًا','Invite a friend','Inviter un ami']))+'</span><button class="btn sm ghost" data-act="invite">'+esc(g3(['دعوة','Invite','Inviter']))+'</button>';box.insertBefore(r,box.firstChild)}
    }catch(e){}
  };
})();

/* ===== دليل التثبيت على آيفون وآيباد ===== */
(function(){
  const ua=navigator.userAgent;
  const INAPP=/FBAN|FBAV|Instagram|Line\/|TikTok|musical_ly|Snapchat|MicroMessenger|GSA\/|Twitter|LinkedInApp/i.test(ua);
  const SHARE='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3M8 7l4-4 4 4"/><path d="M6 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1"/></svg>';
  const PLUS='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>';
  window.openIosGuide=function(){
    const pad=/ipad/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    const c=$('#cele');
    let steps;
    if(INAPP){
      steps=[[ '🧭',g3(['افتح الرابط في Safari','Open this link in Safari','Ouvrez ce lien dans Safari']),g3(['المتصفح الذي تستعمله الآن (داخل تطبيق آخر) لا يسمح بالتثبيت. انسخ الرابط وافتحه في Safari.','This in-app browser cannot install apps. Copy the link and open it in Safari.','Ce navigateur intégré ne permet pas l’installation. Copiez le lien et ouvrez-le dans Safari.'])]];
    }else{
      steps=[
       [SHARE,g3(['اضغط زر المشاركة','Tap the Share button','Touchez le bouton Partager']),g3([pad?'في أعلى الشاشة بجانب شريط العنوان.':'في أسفل شاشة Safari (مربع بسهم للأعلى).','At the '+(pad?'top next to the address bar.':'bottom of Safari (a square with an up arrow).'),(pad?'En haut, près de la barre d’adresse.':'En bas de Safari (un carré avec une flèche vers le haut).')])],
       [PLUS,g3(['اختر «إضافة إلى الشاشة الرئيسية»','Choose “Add to Home Screen”','Choisissez « Sur l’écran d’accueil »']),g3(['مرّر القائمة للأسفل إن لم تجدها.','Scroll the menu down if you don’t see it.','Faites défiler le menu si vous ne la voyez pas.'])],
       ['✅',g3(['اضغط «إضافة»','Tap “Add”','Touchez « Ajouter »']),g3(['ستجد أيقونة الهدهد على شاشتك الرئيسية، افتحها كأي تطبيق.','The Hoopoe icon will appear on your home screen. Open it like any app.','L’icône de la huppe apparaît sur l’écran d’accueil. Ouvrez-la comme une application.'])]
      ];
    }
    c.innerHTML='<div class="obx"><div class="obtop"><div class="obowl">'+hoopoe('cheer',84)+'</div></div><div class="obbody"><h2 style="margin:0;text-align:center">'+esc(g3(['ثبّت التطبيق على آيفون','Install on iPhone','Installer sur iPhone']))+'</h2>'+
     steps.map(function(s,i){return '<div class="card" style="display:flex;gap:12px;align-items:center"><div class="iosn">'+(INAPP?s[0]:'<span class="iosno">'+(i+1)+'</span>')+'</div><div style="flex:1"><b>'+esc(s[1])+'</b><div class="muted" style="font-size:.9rem;line-height:1.6">'+esc(s[2])+'</div></div>'+(INAPP?'':'<div class="iosic">'+s[0]+'</div>')+'</div>'}).join('')+
     (INAPP?'<button class="btn gold" data-act="ios-copy">'+esc(g3(['نسخ الرابط','Copy link','Copier le lien']))+'</button>':'')+
     '</div><div class="obfoot"><button class="btn" data-act="cclose">'+esc(g3(['فهمت','Got it','Compris']))+'</button></div></div>'+
     (!INAPP&&!pad?'<div class="iosarrow" aria-hidden="true">⬇</div>':'');
    c.hidden=false;
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.act==='ios-copy'){try{navigator.clipboard.writeText(location.href.split('#')[0]).then(function(){toast(g3(['تم نسخ الرابط','Link copied','Lien copié']))})}catch(x){}}
  });
})();
