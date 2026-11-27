/* 25: حلقة الاستمرار على طريقة دولينجو — نجمات الإتقان، مهام اليوم مع صندوق، حماية السلسلة (بانر + إشعار محلي) */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  function ico(n){try{return icoSvg(n)}catch(e){return ''}}
  function ready(){return S.prof&&S.prof.done}

  /* ---------- 1) نجمات الإتقان ---------- */
  function starsFor(acc){return acc>=90?3:acc>=75?2:1}
  S.stars=S.stars||{};
  var _fl=finishLesson;
  finishLesson=function(){
    _fl.apply(this,arguments);
    try{
      if(!L||L.review||L.hifzTest||L.placement||!L.lesson||ALL.indexOf(L.lesson)<0)return;
      var acc=Math.max(0,Math.round((L.total/(L.total+L.wrongs))*100)),st=starsFor(acc),id=L.lesson.id;
      S.stars=S.stars||{};var old=S.stars[id]||0,up=st>old;
      if(up){S.stars[id]=st;try{save()}catch(e){}}
      var foot=document.querySelector('#lesson .lfoot .in');
      if(foot){
        var note=document.createElement('p');note.className='lp-note';
        note.textContent=up&&old?tt(['نجوم جديدة! ارتفع تقييمك لهذا الدرس.','New stars! Your rating for this lesson went up.','Nouvelles étoiles ! Votre note a progressé.']):'';
        if(note.textContent)foot.insertBefore(note,foot.firstChild);
        if(st<3){
          var b=document.createElement('button');b.className='btn ghost';b.setAttribute('data-lesson',id);
          b.textContent=tt(['أعد الدرس لتنال 3 نجوم ★★★','Retry for 3 stars ★★★','Refaire pour 3 étoiles ★★★']);
          foot.insertBefore(b,foot.querySelector('[data-lcert]')||null);
        }
      }
    }catch(e){}
  };
  function paintStars(){
    document.querySelectorAll('#page .ln-row[data-lesson]').forEach(function(n){
      var id=n.getAttribute('data-lesson'),st=(S.stars||{})[id];
      var holder=n.querySelector('.ln-tt');if(!holder)return;
      var cur=holder.querySelector('.nstars');
      if(!(S.done&&S.done[id])||!st){if(cur)cur.remove();return}
      var html='★'.repeat(st)+'<i>'+'★'.repeat(3-st)+'</i>';
      if(cur){if(cur.dataset.s!==String(st)){cur.dataset.s=st;cur.innerHTML=html}return}
      var s=document.createElement('span');s.className='nstars';s.dataset.s=st;s.setAttribute('aria-label',st+'/3');s.innerHTML=html;
      holder.appendChild(s);
    });
  }

  /* ---------- 2) مهام اليوم على الرئيسية + صندوق ---------- */
  function dqCard(){
    var ds=dayState(),qs=todays(),all=qs.every(function(c){return ds.c[c.k]});
    var opened=S.dchest===today(),claimable=qs.filter(function(c){return !ds.c[c.k]&&(ds.p[c.k]||0)>=c.n}).length;
    var rows=qs.map(function(c){
      var cur=Math.min(ds.p[c.k]||0,c.n),done=cur>=c.n,got=!!ds.c[c.k],pc=Math.round(cur/c.n*100);
      return '<div class="dq-r'+(got?' got':'')+'"><span class="dq-ring" style="--p:'+pc+'">'+(got?'✓':done?'!':N(cur)+'/'+N(c.n))+'</span><span class="dq-t"><b>'+esc(c.t)+'</b><small>+'+N(c.r)+' '+esc(tt(['نقطة','pts','pts']))+'</small></span>'+
        (got?'':'<button class="btn sm gold" data-claim="'+c.k+'" '+(done?'':'disabled')+'>'+esc(tt(['استلم','Claim','Réclamer']))+'</button>')+'</div>';
    }).join('');
    var chest=all?(opened?'<div class="dq-ch done">'+esc(tt(['فتحتَ صندوق اليوم، أحسنت!','You opened today’s chest, well done!','Coffre du jour ouvert, bravo !']))+'</div>':'<button class="btn gold" data-act="dq-chest">🎁 '+esc(tt(['افتح صندوق المكافأة','Open the reward chest','Ouvrir le coffre']))+'</button>'):
      '<div class="dq-ch">🎁 '+esc(tt(['أتمّ المهام الثلاث لتفتح صندوقًا','Finish all three to open a chest','Terminez les trois pour ouvrir un coffre']))+'</div>';
    return '<div class="card dqcard" id="dqcard"><div class="dq-h"><b>'+esc(tt(['مهام اليوم','Today’s quests','Quêtes du jour']))+'</b>'+(claimable?'<span class="pill">'+N(claimable)+' '+esc(tt(['جاهزة','ready','prêtes']))+'</span>':'')+'</div>'+rows+chest+'</div>';
  }
  /* ---------- 3) حماية السلسلة: بانر ---------- */
  function atRisk(){
    var n=streak();return ready()&&n>=1&&!S.days[today()]&&new Date().getHours()>=16;
  }
  function banner(){
    var n=streak(),f=S.freeze||0;
    return '<div class="card skcard" id="skcard"><div class="sk-i">'+ico('🔥')+'</div><div class="sk-t"><b>'+esc(tt(['سلسلتك '+n+' يوم في خطر!','Your '+n+'-day streak is at risk!','Votre série de '+n+' jours est en danger !']))+'</b><small>'+esc(tt(['درس واحد من دقيقة يحفظها'+(f?' (لديك '+f+' تجميد احتياطي)':''),'A one-minute lesson saves it'+(f?' ('+f+' freeze in reserve)':''),'Une leçon d’une minute la sauve'+(f?' ('+f+' gel en réserve)':'')]))+'</small></div><button class="btn sm" data-act="sk-go">'+esc(tt(['ابدأ','Start','Go']))+'</button></div>';
  }
  function put(){
    if(!ready()||TAB!=='home'){paintStars();return}
    var hero=document.querySelector('.hm-hero');if(!hero)return;
    var risk=atRisk(),sk=document.getElementById('skcard');
    if(risk&&!sk){var d=document.createElement('div');d.innerHTML=banner();d.firstChild.style.margin='12px 0';hero.after(d.firstChild)}
    else if(!risk&&sk)sk.remove();
    if(!document.getElementById('dqcard')){
      var e=document.createElement('div');e.innerHTML=dqCard();var n=e.firstChild;n.style.margin='12px 0';
      var pt=document.getElementById('ptcard');if(pt)pt.before(n);else (document.getElementById('skcard')||hero).after(n);
    }
  }
  function refreshDq(){var o=document.getElementById('dqcard');if(!o)return;var e=document.createElement('div');e.innerHTML=dqCard();o.replaceWith(e.firstChild)}
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act^="dq-"],[data-act^="sk-"],[data-claim]');if(!b)return;
    if(b.hasAttribute('data-claim')){
      if(!b.closest('#dqcard'))return;
      e.stopImmediatePropagation();
      var k=b.dataset.claim,c=DQ.find(function(x){return x.k===k}),ds=dayState();
      if(c&&!ds.c[k]&&(ds.p[k]||0)>=c.n){ds.c[k]=1;addXP(c.r);save();try{renderTop();SND.coin()}catch(x){}toast(tt(['أُضيفت '+c.r+' نقطة إلى رصيدك','+'+c.r+' points added','+'+c.r+' points ajoutés']))}
      refreshDq();return;
    }
    var a=b.dataset.act;
    if(a==='dq-chest'){
      if(S.dchest===today())return;
      S.dchest=today();var bonus=30+Math.min(20,streak()*2);addXP(bonus);try{SND.win()}catch(x){}try{confetti()}catch(x){}
      toast(tt(['🎁 حصلتَ على '+bonus+' نقطة!','🎁 You got '+bonus+' points!','🎁 Vous avez gagné '+bonus+' points !']));refreshDq();try{renderTop()}catch(x){}
    }else if(a==='sk-go'){try{window.nfComeback.minute()}catch(x){}}
  },true);
  var r=0;new MutationObserver(function(){if(r)return;r=requestAnimationFrame(function(){r=0;put()})}).observe(document.body,{childList:true,subtree:true});

  /* ---------- 4) إشعار محلي لحماية السلسلة (تطبيق أندرويد فقط، لمن فعّل التذكير) ---------- */
  var LNp=function(){return window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.LocalNotifications};
  function textFor(i,n){
    var tones=[
      ['الهدهد يهمس: درس من دقيقة يكفي اليوم','The Hoopoe whispers: one minute is enough today','Le Hudhud murmure : une minute suffit aujourd’hui'],
      ['نتعلّم قليلًا كل يوم؟ بقي القليل لتحافظ على سلسلتك','A little each day? Just a little left to keep your streak','Un peu chaque jour ? Il reste peu pour garder votre série'],
      ['اشتقتُ إليك! لنُنهِ درسًا صغيرًا معًا','I miss you! Let us finish a small lesson together','Vous me manquez ! Faisons une petite leçon ensemble']
    ];
    var body=(i===0&&n>=2)?tt(['سلسلتك '+n+' يوم، لا تدعها تنطفئ الليلة 🔥','Your '+n+'-day streak, do not let it go out tonight 🔥','Votre série de '+n+' jours, ne la laissez pas s’éteindre ce soir 🔥']):tt(tones[i%3]);
    return {title:tt(['نور الفرقان','Nur al-Furqan','Nûr al-Furqân']),body:body};
  }
  function schedule(){
    try{
      var LN=LNp();if(!LN)return;
      LN.cancel({notifications:[0,1,2,3,4].map(function(i){return {id:900+i}})}).catch(function(){}).then(function(){
        if(!S.rem||!ready())return;
        return LN.requestPermissions().then(function(p){
          if(p.display!=='granted')return;
          var hm=String(S.rem||'20:00').split(':'),h=+hm[0]||20,m=+hm[1]||0,n=streak(),list=[],now=Date.now();
          for(var i=0;i<5;i++){
            var d=new Date();d.setDate(d.getDate()+i);var at=new Date(d.getFullYear(),d.getMonth(),d.getDate(),h,m,0);
            if(at.getTime()<=now+5000)continue;
            if(i===0&&S.days[today()])continue;
            var t=textFor(i,n);list.push({id:900+i,title:t.title,body:t.body,schedule:{at:at}});
          }
          if(list.length)return LN.schedule({notifications:list});
        });
      }).catch(function(){});
    }catch(e){}
  }
  var _act=act;
  act=function(){var r=_act.apply(this,arguments);try{var LN=LNp();if(LN&&S.days[today()])LN.cancel({notifications:[{id:900}]}).catch(function(){})}catch(e){}return r};
  setTimeout(schedule,6000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)setTimeout(schedule,1500)});

  var st=document.createElement('style');
  st.textContent='.nstars{display:block;font-size:.8rem;line-height:1;color:var(--gold);letter-spacing:1px;margin-top:3px}.nstars i{font-style:normal;color:var(--lock-d);opacity:.7}'+
   '.lp-note{margin:0;text-align:center;font-weight:700;color:var(--gold-t)}'+
   '.dqcard{display:grid;gap:8px;border-color:var(--gold)}.dq-h{display:flex;align-items:center;justify-content:space-between;font:700 1.08rem var(--display)}'+
   '.dq-r{display:flex;align-items:center;gap:10px}.dq-ring{flex:0 0 auto;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font:800 .78rem var(--display);font-variant-numeric:tabular-nums;background:conic-gradient(var(--gold) calc(var(--p)*1%),var(--lock) 0);position:relative}.dq-ring:before{content:"";position:absolute;inset:5px;border-radius:50%;background:var(--surface)}.dq-ring{isolation:isolate}'+
   '.dq-ring{color:var(--fg)}.dq-ring>*{position:relative}.dq-r.got .dq-ring{background:var(--accent);color:var(--on-accent)}.dq-r.got .dq-ring:before{background:var(--accent)}'+
   '.dq-t{flex:1;min-width:0;display:grid}.dq-t b{font:700 .98rem/1.4 var(--display)}.dq-t small{color:var(--muted)}.dq-r.got .dq-t{opacity:.65}'+
   '.dq-ch{text-align:center;color:var(--muted);font-size:.9rem;padding-top:2px}.dq-ch.done{color:var(--accent-d);font-weight:700}'+
   '.skcard{display:flex;align-items:center;gap:10px;border-color:var(--flame);background:color-mix(in srgb,var(--flame) 12%,var(--surface))}.sk-i{flex:0 0 auto;width:40px;height:40px;border-radius:13px;display:grid;place-items:center;background:color-mix(in srgb,var(--flame) 22%,transparent);color:var(--flame)}.sk-t{flex:1;min-width:0;display:grid}.sk-t b{font:700 1rem/1.4 var(--display)}.sk-t small{color:var(--muted);line-height:1.5}.skcard .btn{width:auto}';
  document.head.appendChild(st);
})();
