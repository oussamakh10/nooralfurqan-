/* 21: الهدهد يرشد المستخدم الجديد في حوار بفقاعات — إلزامي، ويتفرع حسب اختياره */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  var G={step:'hi',ans:{}};
  var TM=0;
  function done(){return !!S.guided}
  function bubble(txt,next){
    /* فقاعة تُكتب تدريجيًا بمؤقت واحد ويُلغى عند كل خطوة جديدة */
    var box=document.getElementById('gdTalk');if(!box)return;
    var el=document.createElement('p');el.className='gd-msg';box.appendChild(el);
    var i=0,ch=Array.from(txt);
    clearTimeout(TM);
    (function step(){
      el.textContent=ch.slice(0,i).join('');box.scrollTop=box.scrollHeight;
      if(i++<ch.length)TM=setTimeout(step,22);else if(next)next();
    })();
  }
  function opts(list){
    var box=document.getElementById('gdOpts');if(!box)return;
    box.innerHTML=list.map(function(o){return '<button class="tag gd-o" data-gd="'+o[0]+'">'+esc(o[1])+'</button>'}).join('');
  }
  function show(){
    var c=$('#cele');c.hidden=false;c.classList.add('gd-full');
    c.innerHTML='<div class="obx gd-wrap" id="gdwrap" role="dialog" aria-modal="true" aria-label="'+esc(tt(['جولة الهدهد','Hoopoe guide','Guide du Hudhud']))+'">'+
      '<div class="gd-lang" role="group" aria-label="Language" dir="ltr">'+[['ar','🇸🇦','ع'],['en','🇬🇧','EN'],['fr','🇫🇷','FR']].map(function(x){return '<button class="gd-l'+(LANG===x[0]?' on':'')+'" data-gl="'+x[0]+'" aria-pressed="'+(LANG===x[0])+'" aria-label="'+({ar:'العربية',en:'English',fr:'Français'})[x[0]]+'"><span aria-hidden="true">'+x[1]+'</span> '+x[2]+'</button>'}).join('')+'</div>'+
      '<div class="obtop"><div class="obowl" id="gdbird">'+hoopoe('wow',96)+'</div></div>'+
      '<div id="gdTalk" class="gd-talk" aria-live="polite"></div><div id="gdOpts" class="gd-opts"></div></div>';
    /* لا زر إغلاق: الجولة إلزامية */
  }
  function setBird(m){var b=document.getElementById('gdbird');if(b)b.innerHTML=hoopoe(m,96)}
  var S_STEP={
    hi:function(){
      setBird('wow');
      bubble(tt(['السلام عليكم! أنا الهدهد، رفيقك في هذا التطبيق.','Peace be upon you! I am the Hoopoe, your guide here.','Salam ! Je suis le Hudhud, votre guide ici.']),function(){
        bubble(tt(['سأريك المكان في دقيقة، ثم تبدأ أنت.','I will show you around in a minute, then you start.','Je vous montre les lieux en une minute, puis vous commencez.']),function(){
          opts([['go',tt(['هيا','Let’s go','Allons-y'])]]);
        });
      });
    },
    goal:function(){
      setBird('happy');
      bubble(tt(['ما الذي جئت من أجله اليوم؟','What brings you here today?','Qu’est-ce qui vous amène aujourd’hui ?']),function(){
        opts([['learn',tt(['أتعلّم أساسيات الدين','Learn the basics','Apprendre les bases'])],['read',tt(['أقرأ القرآن وأستمع','Read and listen to Qur’an','Lire et écouter le Coran'])],['sira',tt(['أعرف السيرة النبوية','Learn the Seerah','Découvrir la Sîra'])]]);
      });
    },
    nav:function(){
      var t=G.ans.goal||'learn';
      var lines={learn:['من هنا تبدأ: تعلّم يقدّم الدروس، وكل درس قصير.','Start here: Learn offers short lessons.','Commencez ici : Apprendre propose des leçons courtes.'],
        read:['هنا المصحف، ومعه الاستماع والتفسير.','Here is the Qur’an, with listening and tafsir.','Voici le Coran, avec l’écoute et le tafsir.'],
        sira:['قصص السيرة في تبويب «المزيد»، ومعها الخريطة.','Seerah stories are under “More”, with the map.','Les récits de la Sîra sont dans « Plus », avec la carte.']}[t];
      var target={learn:'learn',read:'read',sira:'more'}[t];
      setBird('cheer');
      bubble(tt(lines),function(){
        hi(target);
        bubble(tt(['وفي الأسفل خمسة أقسام: الرئيسية، تعلّم، القراءة، الاستماع، والمزيد.','Five sections are at the bottom: Home, Learn, Read, Listen and More.','Cinq sections en bas : Accueil, Apprendre, Lire, Écouter et Plus.']),function(){
          opts([['try',tt(['فهمت، هيا أجرّب','Got it, let me try','Compris, j’essaie'])]]);
        });
      });
    },
    try:function(){
      setBird('cheer');
      bubble(tt(['ممتاز! جرّب سؤالًا واحدًا الآن. أنا معك.','Great! Try one question now. I am with you.','Parfait ! Essayez une question maintenant. Je suis là.']),function(){
        opts([['finish',tt(['ابدأ أول درس','Start first lesson','Commencer la première leçon'])]]);
      });
    }
  };
  function hi(tab){
    document.querySelectorAll('.gd-hi').forEach(function(x){x.classList.remove('gd-hi')});
    var b=document.querySelector('#nav [data-go="'+tab+'"], [data-go="'+tab+'"]');
    if(b)b.classList.add('gd-hi');
  }
  function run(){
    S.gs=G.step;save();
    show();
    var f=S_STEP[G.step];if(f)f();
  }
  function finish(){
    S.guided=1;S.toured=1;S.gs='';save();
    document.querySelectorAll('.gd-hi').forEach(function(x){x.classList.remove('gd-hi')});
    var c=$('#cele');c.hidden=true;c.classList.remove('gd-full');
    try{go(G.ans.goal==='sira'?'more':G.ans.goal==='read'?'read':'learn')}catch(e){}
    var prev=openOnboardPrev;if(prev)setTimeout(function(){prev()},50);
  }
  var NEXT={hi:'goal',goal:'nav',nav:'try',try:'finish'};
  var openOnboardPrev=null;
  function start(){
    G={step:(S.gs&&S_STEP[S.gs])?S.gs:'hi',ans:{}};
    run();
  }
  document.addEventListener('click',function(e){
    var L=e.target.closest&&e.target.closest('[data-gl]');
    if(L&&document.getElementById('gdwrap')){setLang(L.dataset.gl);show();run();return}
    var b=e.target.closest&&e.target.closest('[data-gd]');if(!b)return;
    var v=b.dataset.gd;
    if(G.step==='goal'&&['learn','read','sira'].indexOf(v)>=0)G.ans.goal=v;
    if(v==='finish'){finish();return}
    var nx=NEXT[G.step];
    if(nx){G.step=nx;run()}
  });
  /* ربط بالبداية: الجولة الإلزامية تسبق الاستبيان */
  var wrap=function(){
    var prev=window.openOnboard;
    openOnboardPrev=prev;
    window.openOnboard=function(){
      if(!(S.prof&&S.prof.done)&&!S.guided){return start()}
      if(prev)return prev();
    };
  };
  wrap();

  var st=document.createElement('style');
  st.textContent='.gd-wrap{display:flex;flex-direction:column;gap:12px;padding:18px;min-height:100%;justify-content:flex-end}'+
   '.gd-talk{display:flex;flex-direction:column;gap:10px;max-height:44vh;overflow:auto}'+
   '.gd-msg{margin:0;background:var(--surface);border:1.5px solid var(--line);border-radius:18px 18px 18px 4px;padding:12px 16px;font-size:1.1rem;line-height:1.9;max-width:92%;align-self:flex-start}'+
   '#cele.gd-full{background:var(--bg);display:flex;align-items:stretch;justify-content:center}#cele.gd-full .obx{width:100%;max-width:560px;height:100%;background:transparent;box-shadow:none;border:0;margin:0}'+
   '.gd-lang{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}.gd-l{height:40px;padding:0 14px;border-radius:999px;border:1.5px solid var(--line);background:var(--surface);color:var(--fg);font-weight:700;display:inline-flex;align-items:center;gap:6px;cursor:pointer}.gd-l.on{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold)}'+
   '.gd-opts{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:52px}.gd-opts>*{flex:0 0 auto;width:auto!important;height:48px!important;min-height:0!important;padding:0 20px!important;border-radius:999px!important;line-height:1.2;aspect-ratio:auto!important;display:inline-flex;align-items:center}'+
   '.gd-hi{outline:3px solid var(--gold);outline-offset:3px;border-radius:14px;animation:gdp 1.4s ease-in-out infinite}'+
   '@keyframes gdp{50%{outline-color:transparent}}'+
   '@media (prefers-reduced-motion:reduce){.gd-hi{animation:none}}';
  document.head.appendChild(st);
})();
