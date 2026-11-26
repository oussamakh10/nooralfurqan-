/* 22: رحلة البداية الموحّدة — ترحيب + موافقة + أسئلة + ملخص، بقيادة الهدهد وبتصميم واحد */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  var STEPS=['hi','name','age','goal','lvl','mins','end'];
  var W={step:'hi',a:{},edit:false,hist:[]};
  var TM=0,BT=0;
  function rm(){try{return !!S.rm||matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}}
  function ico(n){try{return icoSvg(n)}catch(e){return ''}}
  function isNew(){return !(S.prof&&S.prof.done)&&!S.welcomed}
  function running(){return !!document.getElementById('wl')}

  var Q={
    name:{say:['ما اسمك؟ أحبّ أن أناديك به.','What is your name? I would love to call you by it.','Comment vous appelez-vous ? J’aimerais vous appeler par votre prénom.']},
    age:{say:['كم عمرك؟ أضبط لك الواجهة المناسبة، وللصغار وضع آمن خاص.','How old are you? I set the right look for you, with a safe mode for kids.','Quel âge avez-vous ? J’adapte l’interface, avec un mode sûr pour les enfants.']},
    goal:{say:['ما هدفك الأول؟ يمكنك تغييره لاحقًا.','What is your first goal? You can change it later.','Quel est votre premier objectif ? Vous pourrez le changer.'],
      o:[['learn','🎓',['أتعلّم الأساسيات','Learn the basics','Apprendre les bases'],['دروس قصيرة خطوة بخطوة','Short step-by-step lessons','Leçons courtes pas à pas']],
         ['khatma','📖',['أختم القرآن','Complete the Qur’an','Terminer le Coran'],['ورد يومي يوصلك للختم','A daily portion to the end','Un passage par jour']],
         ['hifz','🌟',['أحفظ القرآن','Memorise the Qur’an','Mémoriser le Coran'],['تكرار ومراجعة منتظمة','Repetition and review','Répétition et révision']],
         ['review','✅',['أراجع ما أعرفه','Review what I know','Réviser mes acquis'],['أسئلة ذكية تعيد لك ما نسيت','Smart questions bring back what you forgot','Des questions qui rappellent ce qui s’oublie']],
         ['all','🎯',['كل ذلك','A bit of everything','Un peu de tout'],['مزيج متوازن','A balanced mix','Un mélange équilibré']]]},
    lvl:{say:['كيف تقيّم معرفتك بالدين؟ لا حرج، سنبدأ من حيث أنت.','How would you rate your knowledge? No worries, we start where you are.','Comment évaluez-vous vos connaissances ? Pas de souci, on part de votre niveau.'],
      o:[['b','🌙',['مبتدئ','Beginner','Débutant'],['أبدأ من الصفر','Starting from zero','Je pars de zéro']],
         ['m','📖',['متوسط','Intermediate','Intermédiaire'],['أعرف الأساسيات','I know the basics','Je connais les bases']],
         ['a','🎓',['متقدم','Advanced','Avancé'],['أريد التعمّق','I want to go deeper','Je veux approfondir']]]},
    mins:{say:['كم تريد أن تخصّص كل يوم؟ القليل المنتظم خير من الكثير المنقطع.','How much time each day? A little, regularly, beats a lot, rarely.','Combien de temps par jour ? Peu mais régulier vaut mieux que beaucoup et rarement.'],
      o:[[5,'⚡',['5 دقائق','5 minutes','5 minutes'],['بداية خفيفة','A light start','Un début léger']],
         [10,'🌟',['10 دقائق','10 minutes','10 minutes'],['إيقاع مريح','A comfortable pace','Un rythme confortable']],
         [20,'🔥',['20 دقيقة','20 minutes','20 minutes'],['تقدّم أسرع','Faster progress','Progression plus rapide']],
         [30,'🎯',['30 دقيقة أو أكثر','30 minutes or more','30 minutes ou plus'],['لمن يريد التفرّغ','For the dedicated','Pour les motivés']]]}
  };

  function typeInto(el,text,done){
    clearInterval(TM);clearTimeout(BT);
    if(rm()){el.textContent=text;if(done)done();return}
    el.innerHTML='<span class="wl-dots" aria-hidden="true"><i></i><i></i><i></i></span>';
    BT=setTimeout(function(){
      var ch=Array.from(text),i=0;el.textContent='';
      TM=setInterval(function(){i+=2;el.textContent=ch.slice(0,i).join('');if(i>=ch.length){clearInterval(TM);if(done)done()}},20);
    },420);
  }
  function arch(big){
    return '<span class="wl-rays" aria-hidden="true"></span><span class="wl-sp s1" aria-hidden="true">✦</span><span class="wl-sp s2" aria-hidden="true">✦</span><span class="wl-sp s3" aria-hidden="true">✦</span><svg class="wl-arch" viewBox="0 0 200 224" aria-hidden="true"><defs><linearGradient id="wlg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e29a"/><stop offset="1" stop-color="#b9862c"/></linearGradient><radialGradient id="wlr" cx="50%" cy="88%" r="75%"><stop offset="0" stop-color="#e6c473" stop-opacity=".4"/><stop offset="1" stop-color="#e6c473" stop-opacity="0"/></radialGradient></defs>'+
      '<path d="M14 216V112C14 62 72 40 100 6c28 34 86 56 86 106v104z" fill="rgba(0,0,0,.28)"/><path d="M14 216V112C14 62 72 40 100 6c28 34 86 56 86 106v104z" fill="url(#wlr)"/>'+
      '<path d="M14 216V112C14 62 72 40 100 6c28 34 86 56 86 106v104z" fill="none" stroke="url(#wlg)" stroke-width="5" stroke-linejoin="round" pathLength="1" class="wl-edge"/>'+
      '<path d="M26 216V114C26 70 76 50 100 22c24 28 74 48 74 92v102" fill="none" stroke="#e6c473" stroke-opacity=".35" stroke-width="1.5"/>'+
      '<g transform="translate(100 24)" fill="#f6e29a"><path d="M0-9l2.4 6.6L9 0l-6.6 2.4L0 9l-2.4-6.6L-9 0l6.6-2.4z"/></g></svg>';
  }
  function stars(){var o='';for(var i=0;i<26;i++){o+='<i style="left:'+((i*37+11)%100)+'%;top:'+((i*53+7)%70)+'%;width:'+(2+(i%3))+'px;height:'+(2+(i%3))+'px;animation-delay:'+((i%9)*.45)+'s"></i>'}return o}
  var FIRST=true;
  function langs(){
    return '<div class="wl-lang" role="group" aria-label="Language" dir="ltr">'+[['ar','ع'],['en','EN'],['fr','FR']].map(function(x){
      return '<button class="wl-l'+(LANG===x[0]?' on':'')+'" data-wl-lang="'+x[0]+'" aria-pressed="'+(LANG===x[0])+'" aria-label="'+({ar:'العربية',en:'English',fr:'Français'})[x[0]]+'">'+x[1]+'</button>'}).join('')+'</div>';
  }
  function qIndex(){return ['name','age','goal','lvl','mins'].indexOf(W.step)}
  function top(){
    var qi=qIndex(),n=5,h='<div class="wl-top">';
    h+=(W.hist.length&&W.step!=='hi'?'<button class="wl-back" data-wl="back" aria-label="'+esc(tt(['رجوع','Back','Retour']))+'"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>':'<span class="wl-back ph"></span>');
    h+=(qi>=0?'<div class="wl-prog" role="progressbar" aria-valuemin="0" aria-valuemax="'+n+'" aria-valuenow="'+(qi+1)+'"><i style="width:'+((qi+1)/n*100)+'%"></i></div>':'<span class="wl-prog ph"></span>');
    return h+langs()+'</div>';
  }
  function nm(){return (W.a.name||'').trim()}
  function sayFor(step){
    if(step==='hi')return tt(['السلام عليكم! أنا الهدهد، رفيقك في هذه الرحلة. سأرافقك خطوة بخطوة.','Peace be upon you! I am the Hoopoe, your companion on this journey. I will be with you every step.','Salam ! Je suis le Hudhud, votre compagnon de route. Je serai là à chaque pas.']);
    if(step==='end'){var n=nm();return tt(['رائع'+(n?' يا '+n:'')+'! جهّزتُ لك مسارك، وهذا ملخّصه.','Wonderful'+(n?', '+n:'')+'! Your path is ready, here is the summary.','Magnifique'+(n?', '+n:'')+' ! Votre parcours est prêt, voici le résumé.'])}
    return tt(Q[step].say);
  }
  function optsHtml(step){
    return '<div class="wl-opts" role="radiogroup">'+Q[step].o.map(function(o){
      var on=String(W.a[step])===String(o[0]);
      return '<button class="wl-o'+(on?' on':'')+'" role="radio" aria-checked="'+on+'" data-wl-opt="'+o[0]+'"><span class="wl-oi">'+ico(o[1])+'</span><span class="wl-ot"><b>'+esc(tt(o[2]))+'</b><small>'+esc(tt(o[3]))+'</small></span><span class="wl-ck" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span></button>'}).join('')+'</div>';
  }
  function summary(){
    function lab(step,v){var o=Q[step].o.filter(function(x){return String(x[0])===String(v)})[0];return o?tt(o[2]):''}
    var rows=[['goal','🎯',tt(['هدفك','Your goal','Votre objectif']),lab('goal',W.a.goal)],
      ['mins','⚡',tt(['وردك اليومي','Daily time','Temps quotidien']),lab('mins',W.a.mins)],
      ['lvl','🌙',tt(['مستواك','Your level','Votre niveau']),lab('lvl',W.a.lvl)]].filter(function(r){return r[3]});
    if(!rows.length)rows=[['x','🌟',tt(['مسارك','Your path','Votre parcours']),tt(['جاهز للبدء','Ready to begin','Prêt à commencer'])]];
    return '<div class="wl-sum">'+rows.map(function(r,i){return '<div class="wl-sr" style="animation-delay:'+(.5+i*.35)+'s"><span class="wl-oi">'+ico(r[1])+'</span><span class="wl-ot"><small>'+esc(r[2])+'</small><b>'+esc(r[3])+'</b></span><span class="wl-ck on" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span></div>'}).join('')+'</div>';
  }
  function ctaEnd(){
    var g=W.a.goal;
    if(g==='khatma'||g==='hifz')return tt(['افتح المصحف','Open the Qur’an','Ouvrir le Coran']);
    return tt(['ابدأ أول درس','Start the first lesson','Commencer la première leçon']);
  }
  function render(){
    var c=$('#cele'),s=W.step,hi=s==='hi',end=s==='end',q=!hi&&!end;
    var mood=hi?'wow':end?'love':(qIndex()%2?'happy':'cheer');
    var body='',foot='';
    if(hi){
      body='<div class="wl-title"><div class="wl-h" role="heading" aria-level="2">'+esc(tt(['نور الفرقان','Nur al-Furqan','Nûr al-Furqân']))+'</div><p>'+esc(tt(['رفيقك لتعلّم الدين خطوة خطوة','Learn your faith step by step','Apprenez votre foi pas à pas']))+'</p></div>';
      foot='<button class="wl-cta" data-wl="next">'+esc(tt(['ابدأ','Begin','Commencer']))+'</button>'+
        '<p class="wl-legal">'+esc(tt(['بالمتابعة توافق على','By continuing you accept the','En continuant vous acceptez la']))+' <a href="privacy.html" target="_blank" rel="noopener">'+esc(tt(['سياسة الخصوصية','Privacy policy','politique de confidentialité']))+'</a> '+esc(tt(['و','and','et']))+' <a href="terms.html" target="_blank" rel="noopener">'+esc(tt(['شروط الاستخدام','Terms','conditions']))+'</a></p>'+
        '<div class="wl-pills" aria-hidden="true"><span>'+ico('🔒')+esc(tt(['تقدّمك على جهازك','Stays on your device','Reste sur votre appareil']))+'</span><span>'+ico('✅')+esc(tt(['بلا إعلانات','No ads','Sans pub']))+'</span><span>'+ico('🌟')+esc(tt(['وضع آمن للأطفال','Safe kids mode','Mode enfants']))+'</span></div>';
    }else if(end){
      body=summary();
      foot='<button class="wl-cta" data-wl="finish">'+esc(ctaEnd())+'</button><button class="wl-sec" data-wl="explore">'+esc(tt(['أستكشف التطبيق أولًا','Explore the app first','Explorer d’abord']))+'</button>';
    }else{
      if(s==='name')body='<input class="wl-in" type="text" id="wlin" maxlength="24" autocomplete="given-name" placeholder="'+esc(tt(['اكتب اسمك هنا','Type your name here','Écrivez votre prénom']))+'" value="'+esc(W.a.name||'')+'" aria-label="'+esc(tt(Q.name.say))+'">';
      else if(s==='age')body='<input class="wl-in" type="number" inputmode="numeric" min="3" max="99" id="wlin" autocomplete="off" placeholder="'+esc(tt(['اكتب عمرك بالأرقام','Type your age','Saisissez votre âge']))+'" value="'+esc(W.a.age||'')+'" aria-label="'+esc(tt(Q.age.say))+'"><p class="wl-note">'+esc(tt(['دون 13 سنة: وضع الأطفال دون أي بيانات سحابية.','Under 13: kids mode with no cloud data.','Moins de 13 ans : mode enfants sans données en ligne.']))+'</p>';
      else body=optsHtml(s);
      var last=s==='mins',txt=W.edit&&last?tt(['حفظ','Save','Enregistrer']):tt(['التالي','Next','Suivant']);
      var need=(s==='goal'||s==='lvl'||s==='mins');
      foot='<button class="wl-cta" data-wl="next"'+(need&&W.a[s]==null?' disabled':'')+'>'+esc(txt)+'</button>'+
        (need?'':'<button class="wl-sec" data-wl="skip">'+esc(tt(['تخطَّ هذا السؤال','Skip this question','Passer']))+'</button>');
    }
    c.className='wl-full';
    c.innerHTML='<div class="wl'+(LANG==='ar'?'':' wl-ltr')+'" id="wl" role="dialog" aria-modal="true" aria-label="'+esc(tt(['رحلة البداية','Getting started','Pour commencer']))+'"><div class="wl-sky" aria-hidden="true">'+stars()+'</div>'+top()+
      '<div class="wl-hero'+(hi?' big':'')+'" id="wlhero">'+arch()+'<div class="wl-bird '+(FIRST?'fly':'hop')+'" id="wlbird">'+hoopoe(mood,hi?140:92)+'</div></div>'+
      '<div class="wl-main"><div class="wl-bub" aria-live="polite"><span id="wlsay"></span></div>'+(body?'<div class="wl-body" key="'+s+'">'+body+'</div>':'')+'</div>'+
      '<div class="wl-foot">'+foot+'</div></div>';
    c.hidden=false;
    var line=sayFor(s),say=document.getElementById('wlsay');
    if(say){say.setAttribute('aria-label',line);typeInto(say,line)}
    var inp=document.getElementById('wlin');
    if(inp){inp.addEventListener('keydown',function(e){if(e.key==='Enter')next()});if(!rm())setTimeout(function(){try{inp.focus({preventScroll:true})}catch(e){}},700)}
    if(end){try{confetti()}catch(e){}}
    FIRST=false;
    if(!W.edit){S.ws=s;S.wa=W.a;try{save()}catch(e){}}
  }
  function collect(){
    var inp=document.getElementById('wlin');if(!inp)return true;
    var v=inp.value.trim();
    if(W.step==='name'){W.a.name=v.slice(0,24)}
    else if(W.step==='age'){
      if(v===''){W.a.age='';return true}
      var a=obAge(v);if(!a){toast(tt(['اكتب عمرك بالأرقام (من 3 إلى 99)','Type your age in numbers (3 to 99)','Saisissez votre âge en chiffres (3 à 99)']));return false}
      W.a.age=a;
    }
    return true;
  }
  function go(step){W.hist.push(W.step);W.step=step;render()}
  function after(step){
    var i=STEPS.indexOf(step);
    if(W.edit&&step==='mins')return 'save';
    return STEPS[i+1];
  }
  function next(){
    if(W.step==='hi'){
      S.consent=S.consent||{v:1,t:Date.now()};try{save()}catch(e){}
      var m=document.getElementById('lgm');if(m)m.hidden=true;
    }
    if(!collect())return;
    var n=after(W.step);
    if(n==='save')return commit(true);
    try{SND.nav()}catch(e){}
    go(n);
  }
  function back(){
    var p=W.hist.pop();if(!p)return;
    collect();W.step=p;render();
  }
  function commit(edit){
    OBD=Object.assign({},S.prof||{},W.a);
    var _c=window.celebrate;window.celebrate=function(){};
    try{obFinish()}catch(e){}finally{window.celebrate=_c}
    S.welcomed=1;S.guided=1;S.toured=1;S.gs='';S.ws='';S.wa=null;
    try{save()}catch(e){}
    close();
    if(edit){try{toast(tt(['تم الحفظ','Saved','Enregistré']))}catch(e){}}
  }
  function close(){
    var c=$('#cele');c.hidden=true;c.className='';c.innerHTML='';
    clearInterval(TM);clearTimeout(BT);
  }
  function finish(explore){
    commit(false);
    var g=W.a.goal;
    try{
      if(explore){go2('home');return}
      if(g==='khatma'||g==='hifz'){go2(g==='hifz'?'learn':'read');return}
      go2('learn');
      var l=ALL.find(function(x){return !S.done[x.id]&&!unitLocked(x.unit)});
      if(l)setTimeout(function(){startLesson(l.id)},350);
    }catch(e){}
  }
  function go2(t){try{window.go?window.go(t):0}catch(e){}}

  document.addEventListener('click',function(e){
    if(!running())return;
    var L=e.target.closest('[data-wl-lang]');
    if(L){var l=L.dataset.wlLang;if(l!==LANG){collect();setLang(l);render()}return}
    var o=e.target.closest('[data-wl-opt]');
    if(o){
      var v=o.dataset.wlOpt;if(/^\d+$/.test(v))v=+v;W.a[W.step]=v;
      document.querySelectorAll('.wl-o').forEach(function(b){var on=b===o;b.classList.toggle('on',on);b.setAttribute('aria-checked',on)});
      var cta=document.querySelector('.wl-cta');if(cta)cta.disabled=false;
      try{SND.tap&&SND.tap()}catch(x){}
      return;
    }
    var b=e.target.closest('[data-wl]');if(!b)return;
    var a=b.dataset.wl;
    if(a==='next')next();
    else if(a==='skip'){collect();var n=after(W.step);if(n==='save')commit(true);else go(n)}
    else if(a==='back')back();
    else if(a==='finish')finish(false);
    else if(a==='explore')finish(true);
  });

  function start(edit){
    if(running())return;
    var res=!edit&&S.ws&&STEPS.indexOf(S.ws)>0&&S.ws!=='end';
    W={step:edit?'name':(res?S.ws:'hi'),a:edit?Object.assign({},S.prof||{}):Object.assign({},res&&S.wa?S.wa:{}),edit:!!edit,hist:[]};
    if(edit)W.a={name:(S.prof&&S.prof.name)||'',age:(S.prof&&S.prof.age)||'',goal:S.prof&&S.prof.goal||null,lvl:S.prof&&S.prof.lvl||null,mins:S.prof&&S.prof.mins||null};
    if(res)W.hist=['hi'];
    render();
  }
  /* ربط: الدخول الأول وتعديل الملف الشخصي */
  var prevOO=window.openOnboard;
  window.openOnboard=function(){
    if(running())return;
    if(isNew()){return start(false)}
    return start(true);
  };
  try{openOnboard=window.openOnboard}catch(e){}
  /* لا نافذة موافقة منفصلة للمستخدم الجديد: الموافقة داخل الترحيب */
  (function boot(){
    if(!isNew())return;
    var w=function(){if(document.getElementById('splash'))return setTimeout(w,120);var m=document.getElementById('lgm');if(m)m.hidden=true;start(false)};
    setTimeout(w,60);
  })();

  var st=document.createElement('style');
  st.textContent=[
   '#cele.wl-full{background:#06231f;display:block;padding:0;overflow:hidden;z-index:70}',
   '#cele.wl-full[hidden]{display:none}',
   '.wl{--g:#e6c473;--cr:#f3e6c0;position:relative;height:100%;max-width:520px;margin:0 auto;display:flex;flex-direction:column;color:var(--cr);padding:max(12px,env(safe-area-inset-top,0px)) max(18px,env(safe-area-inset-right,0px)) max(14px,env(safe-area-inset-bottom,0px)) max(18px,env(safe-area-inset-left,0px));font-family:inherit}',
   '.wl-sky{position:fixed;inset:0;z-index:-1;background:radial-gradient(120% 70% at 50% 16%,#0b4036 0%,#062a24 42%,#020d0b 100%)}',
   '.wl-sky:after{content:"";position:absolute;inset:0;opacity:.045;background-image:url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2764%27 height=%2764%27><g fill=%27none%27 stroke=%27%23e6c473%27 stroke-width=%271%27><rect x=%2714%27 y=%2714%27 width=%2736%27 height=%2736%27/><rect x=%2714%27 y=%2714%27 width=%2736%27 height=%2736%27 transform=%27rotate(45 32 32)%27/></g></svg>")}',
   '.wl-top{display:flex;align-items:center;gap:10px;min-height:44px}',
   '.wl-back{width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(230,196,115,.35);background:rgba(255,255,255,.06);color:var(--g);display:grid;place-items:center;cursor:pointer;flex:0 0 auto}.wl-back.ph{visibility:hidden}',
   '.wl-back svg{transition:transform .2s}[dir=ltr] .wl-back svg,.wl-ltr .wl-back svg{transform:scaleX(-1)}','.wl-prog{flex:1;height:10px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden}.wl-prog.ph{visibility:hidden}',
   '.wl-prog i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#b9862c,#f6e29a);transition:width .5s cubic-bezier(.2,.8,.2,1)}',
   '.wl-lang{display:flex;gap:4px;padding:3px;border-radius:99px;background:rgba(0,0,0,.3);border:1px solid rgba(230,196,115,.25);flex:0 0 auto}',
   '.wl-l{min-width:38px;height:32px;padding:0 10px;border-radius:99px;border:0;background:transparent;color:var(--cr);font-weight:700;font-size:.85rem;font-family:inherit;cursor:pointer}',
   '.wl-l.on{background:linear-gradient(180deg,#f6e29a,#d9a93f);color:#3a2a06}',
   '.wl-hero{--hh:min(22vh,150px);position:relative;display:grid;place-items:end center;height:var(--hh);margin-top:6px;flex:0 0 auto;transition:height .3s}',
   '.wl-bird svg{height:calc(var(--hh)*.5)!important;width:auto!important}',
   '.wl-hero.big{--hh:min(34vh,240px)}',
   '.wl-main>*{flex-shrink:0}',
   '.wl-arch{position:absolute;bottom:0;height:100%;width:auto;filter:drop-shadow(0 6px 18px rgba(0,0,0,.35))}',
   '.wl-bird{position:relative;margin-bottom:6px;animation:wlbob 3.2s ease-in-out infinite}',
   '@keyframes wlbob{50%{transform:translateY(-5px)}}',
   '.wl-bird.fly{animation:wlfly 1.1s .25s cubic-bezier(.25,1.4,.4,1) both,wlbob 3.6s 1.4s ease-in-out infinite}',
   '.wl-bird.hop{animation:wlhop .55s cubic-bezier(.3,1.5,.5,1) both,wlbob 3.6s .6s ease-in-out infinite}',
   '@keyframes wlfly{0%{opacity:0;transform:translate(-60px,40px) rotate(-14deg) scale(.5)}60%{opacity:1;transform:translate(6px,-8px) rotate(4deg) scale(1.08)}100%{opacity:1;transform:none}}',
   '@keyframes wlhop{0%{transform:translateY(10px) scale(.88)}60%{transform:translateY(-8px) scale(1.06)}100%{transform:none}}',
   '@keyframes wlbob{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-4px) rotate(1.5deg)}}',
   '.wl-edge{stroke-dasharray:1;stroke-dashoffset:1;animation:wldraw 1.3s .1s ease-out forwards}',
   '@keyframes wldraw{to{stroke-dashoffset:0}}',
   '.wl-rays{position:absolute;left:50%;bottom:-10%;width:130%;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(230,196,115,.16) 0 5deg,transparent 5deg 15deg);-webkit-mask:radial-gradient(circle,#000 0%,transparent 62%);mask:radial-gradient(circle,#000 0%,transparent 62%);animation:wlrot 90s linear infinite;pointer-events:none}',
   '@keyframes wlrot{to{transform:translateX(-50%) rotate(360deg)}}',
   '.wl-sp{position:absolute;color:#f6e29a;font-size:.8rem;opacity:0;animation:wlsp 3.2s ease-in-out infinite}',
   '.wl-sp.s1{left:22%;top:34%}.wl-sp.s2{right:20%;top:46%;animation-delay:1.1s}.wl-sp.s3{left:30%;bottom:14%;animation-delay:2s}',
   '@keyframes wlsp{0%,100%{opacity:0;transform:translateY(6px) scale(.5)}50%{opacity:.95;transform:translateY(-6px) scale(1.1)}}',
   '.wl-sky i{position:absolute;border-radius:50%;background:#f3e6c0;opacity:.1;animation:wltw 3.6s ease-in-out infinite}',
   '@keyframes wltw{50%{opacity:.7}}',
   '.wl-o{animation:wlin .45s cubic-bezier(.2,.8,.2,1) both}.wl-o:nth-child(2){animation-delay:.06s}.wl-o:nth-child(3){animation-delay:.12s}.wl-o:nth-child(4){animation-delay:.18s}.wl-o:nth-child(5){animation-delay:.24s}',
   '.wl-o.on{animation:wlsel .35s cubic-bezier(.3,1.6,.5,1)}',
   '@keyframes wlsel{0%{transform:scale(.97)}60%{transform:scale(1.025)}100%{transform:scale(1)}}',
   '.wl-o.on .wl-ck svg{animation:wlck .35s .05s cubic-bezier(.3,1.6,.5,1) both}',
   '@keyframes wlck{from{transform:scale(0) rotate(-40deg)}}',
   '.wl-cta:not(:disabled){animation:wlcta 2.8s 1.6s ease-in-out infinite}',
   '@keyframes wlcta{0%,100%{filter:brightness(1)}50%{filter:brightness(1.12)}}',
   '',
   '.wl-main{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:12px;padding:10px 2px 6px;-webkit-overflow-scrolling:touch}',
   '.wl-title{text-align:center}.wl-title .wl-h{margin:0;font-weight:800;font-size:2.2rem;line-height:1.3;color:var(--g);text-shadow:0 2px 14px rgba(230,196,115,.35)}.wl-title p{margin:2px 0 0;opacity:.85}',
   '.wl-bub{position:relative;align-self:stretch;margin:0 4px;background:rgba(0,0,0,.34);border:1.5px solid rgba(230,196,115,.3);border-radius:20px;padding:12px 16px;font-size:1.08rem;line-height:1.85;min-height:3.4em;text-align:start;backdrop-filter:blur(4px)}',
   '.wl-bub:before{content:"";position:absolute;top:-8px;left:50%;width:14px;height:14px;background:inherit;border-top:1.5px solid rgba(230,196,115,.35);border-left:1.5px solid rgba(230,196,115,.35);transform:translateX(-50%) rotate(45deg);border-radius:3px 0 0 0}',
   '.wl-dots{display:inline-flex;gap:5px;align-items:center;height:1.8em}.wl-dots i{width:8px;height:8px;border-radius:50%;background:var(--g);opacity:.4;animation:wld 1s infinite}.wl-dots i:nth-child(2){animation-delay:.15s}.wl-dots i:nth-child(3){animation-delay:.3s}@keyframes wld{50%{opacity:1;transform:translateY(-3px)}}',
   '.wl-body{display:flex;flex-direction:column;gap:10px;animation:wlin .4s cubic-bezier(.2,.8,.2,1) both}@keyframes wlin{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}',
   '.wl-opts{display:flex;flex-direction:column;gap:9px}',
   '.wl-o{display:flex;align-items:center;gap:12px;width:100%;min-height:64px;padding:10px 14px;border-radius:18px;border:2px solid rgba(230,196,115,.2);background:rgba(0,0,0,.3);color:var(--cr);text-align:start;cursor:pointer;font-family:inherit;transition:transform .12s,border-color .15s,background .15s}',
   '.wl-o:active{transform:scale(.98)}.wl-o.on{border-color:var(--g);background:rgba(230,196,115,.16);box-shadow:0 0 0 3px rgba(230,196,115,.15)}',
   '.wl-oi{flex:0 0 auto;width:42px;height:42px;border-radius:14px;display:grid;place-items:center;background:rgba(230,196,115,.14);color:var(--g)}',
   '.wl-ot{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}.wl-ot b{font-size:1.06rem;font-weight:800}.wl-ot small{font-size:.86rem;opacity:.75;line-height:1.5}',
   '.wl-ck{flex:0 0 auto;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;border:2px solid rgba(230,196,115,.3);color:transparent}',
   '.wl-o.on .wl-ck,.wl-ck.on{background:var(--g);border-color:var(--g);color:#3a2a06}',
   '#cele .wl-in{width:100%;height:58px;border-radius:18px;border:2px solid rgba(230,196,115,.4)!important;background:rgba(0,0,0,.35)!important;color:var(--cr)!important;-webkit-text-fill-color:var(--cr);box-shadow:none;font-weight:700;font-size:1.25rem;font-family:inherit;padding:0 16px;text-align:center}.wl-in::-webkit-inner-spin-button,.wl-in::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.wl-in[type=number]{-moz-appearance:textfield}#cele .wl-in:focus{outline:0;border-color:var(--g)!important;box-shadow:0 0 0 4px rgba(230,196,115,.2)}.wl-in::placeholder{color:rgba(255,244,214,.5);-webkit-text-fill-color:rgba(255,244,214,.5);font-weight:400}',
   '.wl-note{margin:0;text-align:center;font-size:.88rem;opacity:.75}',
   '.wl-sum{display:flex;flex-direction:column;gap:9px}.wl-sr{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:18px;border:2px solid rgba(230,196,115,.28);background:rgba(0,0,0,.3);opacity:0;animation:wlin .5s cubic-bezier(.2,.8,.2,1) forwards}.wl-sr .wl-ot small{font-size:.82rem}',
   '.wl-foot{flex:0 0 auto;display:flex;flex-direction:column;gap:8px;padding-top:8px}',
   '.wl-cta{height:56px;border-radius:999px;border:0;background:linear-gradient(180deg,#f6e29a,#d9a93f);color:#3a2a06;font-weight:800;font-size:1.15rem;font-family:inherit;cursor:pointer;box-shadow:0 5px 0 #9a6f1d,0 10px 24px rgba(0,0,0,.3);transition:transform .1s,box-shadow .1s}',
   '.wl-cta:active:not(:disabled){transform:translateY(3px);box-shadow:0 2px 0 #9a6f1d}.wl-cta:disabled{background:rgba(255,255,255,.14);color:rgba(255,244,214,.45);box-shadow:none;cursor:not-allowed}',
   '.wl-sec{height:44px;border-radius:999px;border:0;background:transparent;color:var(--cr);opacity:.8;font-weight:700;font-size:.98rem;font-family:inherit;cursor:pointer;text-decoration:underline;text-underline-offset:4px}',
   '.wl-legal{margin:2px 0 0;text-align:center;font-size:.82rem;opacity:.8;line-height:1.7}.wl-legal a{color:var(--g)}',
   '.wl-pills{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}.wl-pills span{display:inline-flex;align-items:center;gap:5px;font-size:.78rem;padding:4px 10px;border-radius:99px;background:rgba(0,0,0,.3);border:1px solid rgba(230,196,115,.22)}.wl-pills svg{width:15px;height:15px;color:var(--g)}',
   '@media (max-height:700px){.wl-hero{--hh:min(19vh,120px)}.wl-hero.big{--hh:min(28vh,180px)}}',
   '@media (max-height:640px){.wl-hero,.wl-hero.big{--hh:min(20vh,124px)}.wl-title .wl-h{font-size:1.8rem}.wl-pills{display:none}}',
   '@media (max-height:520px){.wl-hero,.wl-hero.big{display:none}}',
   '@media (prefers-reduced-motion:reduce){.wl-bird,.wl-bird.fly,.wl-bird.hop,.wl-dots i,.wl-rays,.wl-sp,.wl-sky i,.wl-o,.wl-cta{animation:none!important}.wl-edge{animation:none;stroke-dashoffset:0}.wl-bird{opacity:1}.wl-body,.wl-sr{animation:none;opacity:1}.wl-prog i{transition:none}}'
  ].join('');
  document.head.appendChild(st);
})();
