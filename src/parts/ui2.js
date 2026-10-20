/* ===== واجهة 2: دخول ترحيبي بالهدهد + إعدادات مبسّطة ===== */
(function(){
  /* ---------- الإعدادات ---------- */
  const _os=openSettings;
  const GR=[
   ['look','🎨',['المظهر','Appearance','Apparence'],['data-theme=','data-hpv=','data-xhat=','data-set="kids"']],
   ['sound','🔊',['الصوت واللمس','Sound & touch','Son et vibrations'],['data-set="mute"','data-xvol','data-xhap']],
   ['read','📖',['القراءة والخط','Reading & text','Lecture et texte'],['data-qs=','data-xfs=','data-xset=']],
   ['pray','🕌',['الصلاة والتذكير','Prayer & reminders','Prière et rappels'],['methsel','remtime']],
   ['me','👤',['حسابي وبياناتي','My account & data','Mon compte et mes données'],['prof-edit','acct-link','fb-out','fb-del','prog-export','prog-import','data-act="reset"']],
   ['help','💡',['مساعدة ومعلومات','Help & info','Aide et infos'],['guide-open2','report-gen','inst-go','about-open']]
  ];
  openSettings=function(){
    _os();
    try{
      const c=$('#cele'),card=c.querySelector('.card');if(!card)return;
      const kids=[].slice.call(card.children),buckets={},prev={k:'help'};let lang=null,done=null;
      GR.forEach(function(g){buckets[g[0]]=[]});
      kids.forEach(function(el){
        if(el.tagName==='H2')return;
        const h=el.outerHTML;
        if(el.getAttribute('data-act')==='cclose'){done=el;return}
        if(h.indexOf('data-lang=')>=0){lang=el;return}
        if(el.tagName==='P'){buckets[prev.k].push(el);return}
        for(let i=0;i<GR.length;i++){if(GR[i][3].some(function(t){return h.indexOf(t)>=0})){prev.k=GR[i][0];buckets[prev.k].push(el);return}}
        prev.k='help';buckets.help.push(el);
      });
      const nm=S.prof&&S.prof.name;
      card.className='card setcard';card.textContent='';
      const hd=document.createElement('div');hd.className='sethd';
      hd.innerHTML=hoopoe('happy',52)+'<div><h2>'+esc(g3(['الإعدادات','Settings','Réglages']))+'</h2>'+(nm?'<small>'+esc(nm)+'</small>':'')+'</div>';
      card.appendChild(hd);
      if(lang){const ls=lang.querySelector('span');if(ls&&ls.nextElementSibling)ls.textContent='🌐';const w=document.createElement('div');w.className='langrow';w.appendChild(lang);card.appendChild(w)}
      GR.forEach(function(g,i){
        if(!buckets[g[0]].length)return;
        const d=document.createElement('details');d.className='sg';if(i===0||window.__sgopen===g[0])d.open=true;
        d.innerHTML='<summary><span class="ic">'+g[1]+'</span>'+esc(g3(g[2]))+'</summary>';
        const b=document.createElement('div');b.className='sgb';buckets[g[0]].forEach(function(e){
          if(e.matches&&e.matches('button[data-act="reset"]')){e.classList.add('dng');e.style.marginTop='8px'}
          b.appendChild(e)});
        d.appendChild(b);d.addEventListener('toggle',function(){if(d.open)window.__sgopen=g[0]});card.appendChild(d);
      });
      const f=document.createElement('div');f.className='setfoot';if(done)f.appendChild(done);card.appendChild(f);
    }catch(e){}
  };
  /* ---------- الدخول الترحيبي ---------- */
  const SAY={
   intro:['السلام عليكم ورحمة الله! أنا الهدهد، رفيقك في رحلة تعلّم القرآن والإسلام. هيا نتعارف في دقيقة واحدة.','Peace be upon you! I’m the Hoopoe, your companion on your journey with the Qur’an. Let’s get to know each other in one minute.','Que la paix soit sur vous ! Je suis la huppe, votre compagnon pour apprendre le Coran. Faisons connaissance en une minute.'],
   name:['أولًا، ما اسمك؟','First, what’s your name?','D’abord, quel est votre prénom ?'],
   age:['تشرّفتُ بك{n}! كم عمرك تقريبًا؟','Nice to meet you{n}! About how old are you?','Enchanté{n} ! Quel âge avez-vous environ ?'],
   lvl:['وكيف تقيّم معرفتك بالدين؟ لا تقلق، سنبدأ من حيث تكون.','How would you rate your knowledge of the religion? No worries, we start where you are.','Comment évaluez-vous vos connaissances ? Pas de souci, nous partons de votre niveau.'],
   goal:['ما الذي تتمنى أن تحققه معي؟','What would you like to achieve with me?','Que souhaitez-vous accomplir avec moi ?'],
   mins:['كم دقيقة تستطيع أن تخصص كل يوم؟ القليل المستمر خير من الكثير المنقطع.','How many minutes can you spare daily? A little, steady, is better than a lot, rarely.','Combien de minutes par jour ? Peu mais régulier vaut mieux que beaucoup par intermittence.'],
   city:['في أي مدينة تعيش؟ لأعرض لك مواقيت الصلاة.','Which city do you live in? For prayer times.','Dans quelle ville vivez-vous ? Pour les heures de prière.'],
   rec:['ومن قارئك المفضل؟','And your favorite reciter?','Et votre récitateur préféré ?'],
   acct:['اقتربنا! اربط حسابك إن أحببت لتحفظ تقدّمك بين أجهزتك.','Almost done! Link your account if you like, to keep your progress across devices.','Presque fini ! Liez votre compte pour garder votre progression.']
  };
  let typer=0;
  function typeInto(el,text){
    clearInterval(typer);
    if(S.rm||!window.requestAnimationFrame){el.textContent=text;return}
    let i=0;el.textContent='';el.classList.add('obcur');
    typer=setInterval(function(){i+=2;el.textContent=text.slice(0,i);if(i>=text.length){clearInterval(typer);el.classList.remove('obcur')}},28);
  }
  const _co=obCollect;
  obCollect=function(){if(OBI<0)return;_co()};
  const _oo=openOnboard;
  openOnboard=function(){_oo();OBI=(S.prof&&S.prof.done)?0:-1;renderOnboard()};
  renderOnboard=function(){
    const c=$('#cele'),intro=OBI<0,q=intro?null:OB[OBI],last=!intro&&OBI===OB.length-1,key=intro?'intro':q.k;
    const nm=OBD&&OBD.name?' '+OBD.name:'',line=g3(SAY[key]||SAY.name).replace('{n}',nm);
    const mood=intro?'cheer':(last?'wow':(OBI%2?'happy':'cheer'));
    let h='<div class="obx"><div class="obtop"><div class="obowl">'+hoopoe(mood,intro?120:96)+'</div>'+
      '<div class="obdots" aria-hidden="true">'+OB.map(function(_,i){return '<i class="'+(i===OBI?'on':'')+'"></i>'}).join('')+'</div></div>'+
      '<div class="obbub" aria-live="polite" aria-label="'+esc(line)+'"><span id="obsay"></span></div><div class="obbody">';
    if(intro){h+='<div style="text-align:center;font-size:2.6rem">🌙 📖 ✨</div>'}
    else if(q.type==='text')h+='<input type="text" id="obin" maxlength="24" autocomplete="given-name" placeholder="'+esc(g3(['اكتب اسمك هنا','Type your name here','Écrivez votre prénom']))+'" value="'+esc((OBD&&OBD.name)||'')+'" aria-label="'+esc(q.t)+'">';
    else if(q.type==='city')h+='<select id="obin">'+CITIES.map(function(x){return '<option'+(x[0]===(OBD.city||S.city||CITIES[0][0])?' selected':'')+'>'+x[0]+'</option>'}).join('')+'</select>';
    else if(q.type==='rec')h+='<select id="obin">'+REC.map(function(x){return '<option value="'+x.id+'"'+(x.id===(OBD.rec||S.rec)?' selected':'')+'>'+x.n+'</option>'}).join('')+'</select>';
    else if(q.type==='acct')h+=(onClaude()?'<p class="muted" style="font-size:.92rem;margin:0">الربط يتم عبر حسابك في claude.ai.</p>':'<p class="muted" style="font-size:.92rem;margin:0">'+esc(g3(['اضغط لربط حسابك بجوجل (اختياري).','Tap to link your Google account (optional).','Touchez pour lier votre compte Google (facultatif).']))+'</p>')+'<button class="btn gold" data-act="ob-link">'+esc(g3(['اربط حسابي','Link my account','Lier mon compte']))+'</button><p class="muted" id="obacct" style="font-size:.9rem;text-align:center;margin:0"></p>';
    else h+='<div class="opts">'+q.opts.map(function(o){return '<button class="opt'+(String(OBD[q.k])===String(o[0])?' sel':'')+'" data-ob="'+o[0]+'"><span>'+o[1]+'</span></button>'}).join('')+'</div>';
    h+='</div><div class="obfoot"><button class="btn" data-act="ob-next">'+esc(intro?g3(['هيا نبدأ','Let’s go','C’est parti']):(last?g3(['ابدأ الرحلة','Start the journey','Commencer']):g3(['التالي','Next','Suivant'])))+'</button>'+
      '<button class="btn ghost" data-act="'+(intro?'cclose':'ob-skip')+'">'+esc(intro?g3(['لاحقًا','Later','Plus tard']):(last?g3(['لاحقًا','Later','Plus tard']):g3(['تخطَّ هذا السؤال','Skip this question','Passer'])))+'</button></div></div>';
    c.innerHTML=h;c.hidden=false;
    typeInto($('#obsay'),line);
    const inp=$('#obin');if(inp&&inp.tagName==='INPUT'&&!intro)setTimeout(function(){try{inp.focus()}catch(e){}},600);
    if(inp&&inp.tagName==='INPUT')inp.addEventListener('keydown',function(e){if(e.key==='Enter')obNext()});
  };
})();
