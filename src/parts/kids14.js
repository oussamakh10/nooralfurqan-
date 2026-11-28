/* 14: وضع الأطفال 2 — جلسات قصيرة، ثلاثة خيارات، بلا مؤقّت ولا منافسة، استماع للخيارات والتغذية الراجعة، قفل للوالدين */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  var KQ=5;
  var st=document.createElement('style');
  st.textContent=
   '.kids .lb,.kids .gsm,.kids [data-gmode="friends"],.kids [data-gmode="blitz"],.kids .tmb{display:none!important}'+
   '.kids #lesson .opt{display:flex;align-items:center;gap:12px;min-height:64px}'+
   '.kids #lesson .opt>span:not(.k):not(.ospk){flex:1;text-align:start}'+
   '.kids #lesson .ospk{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;font-size:1.25rem;background:rgba(242,201,76,.16);border:1.5px solid rgba(242,201,76,.4);cursor:pointer;-webkit-tap-highlight-color:transparent}'+
   '.kids #lesson .ospk:active{transform:scale(.92)}';
  document.head.appendChild(st);

  /* قراءة السؤال والخيارات دون رمز السماعة */
  speakQuestion=function(){
    var q=document.querySelector('#lesson .qtext');if(!q)return;
    var c=q.cloneNode(true);[].forEach.call(c.querySelectorAll('.spk'),function(x){x.remove()});
    var opts=[].map.call(document.querySelectorAll('#lesson .opt:not(.gone)>span:not(.k):not(.ospk)'),function(x){return x.textContent.trim()});
    speakNow(c.textContent.replace(/\s+/g,' ').trim()+(opts.length?'. '+opts.join('. '):''));
  };
  function speakFeedback(){
    var fb=document.querySelector('#lesson .lfoot .fb');if(!fb)return;
    speakNow(fb.innerText.replace(/\s+/g,' ').trim().slice(0,260));
  }

  /* جلسة قصيرة: 5 أسئلة منتقاة من الدرس، بلا مؤقّت */
  var _sl=startLesson;
  startLesson=function(id){
    _sl.apply(this,arguments);
    if(!S.kids||!L||L.review||L.placement||!L.lesson||L.lesson.id!==id)return;
    S.tmode=0;
    if(L.queue.length>KQ){
      var keep=shuffle(L.queue.map(function(_,i){return i})).slice(0,KQ).sort(function(a,b){return a-b});
      L.queue=keep.map(function(i){return L.queue[i]});L.total=KQ;L._sp=null;renderLesson();
    }
  };

  /* ثلاثة خيارات بدل أربعة */
  var _pp=prep;
  prep=function(q){
    _pp.apply(this,arguments);
    if(S.kids&&(!q.t||q.t==='fill'||q.t==='mc')&&q.opts&&q.opts.length>3&&!q._k3){
      q._k3=1;
      var wr=q.opts.filter(function(o){return o!==q.c}),drop=wr[Math.floor(Math.random()*wr.length)];
      q.opts=q.opts.filter(function(o){return o!==drop});
    }
  };

  /* استماع لكل خيار + قراءة التغذية الراجعة */
  var _rl=renderLesson;
  renderLesson=function(){
    _rl.apply(this,arguments);
    if(!S.kids||!L)return;
    var ls=document.querySelectorAll('#lesson .li-stats b');
    if(ls.length>1&&L.total){ls[0].textContent=N(L.total);ls[1].textContent=N(Math.max(1,Math.round(L.total/2)))}
    var lab=tt(['اسمع هذا الخيار','Hear this option','Écouter ce choix']);
    [].forEach.call(document.querySelectorAll('#lesson .opt:not(.gone)'),function(o){
      if(o.querySelector('.ospk'))return;
      var s=document.createElement('span');s.className='ospk';s.setAttribute('data-ospk','1');s.setAttribute('aria-hidden','true');s.title=lab;s.textContent='🔊';o.appendChild(s);
    });
    if(L.state==='checked'&&!S.mute){
      var key=L.lesson.id+':'+L.solved+':f';
      if(L._fs!==key){L._fs=key;setTimeout(speakFeedback,300)}
    }
  };
  document.addEventListener('click',function(e){
    var s=e.target.closest&&e.target.closest('[data-ospk]');if(!s)return;
    e.stopPropagation();e.preventDefault();
    var o=s.closest('.opt'),t=o&&o.querySelector(':scope>span:not(.k):not(.ospk)');
    if(t)speakNow(t.textContent.trim());
  },true);

  /* بلا ألعاب جماعية ولا جولة ستين ثانية */
  var _rp=renderPage;
  renderPage=function(){
    try{if(S.kids&&typeof GS!=='undefined'&&GS.mode!=='solo')GS.mode='solo'}catch(e){}
    return _rp.apply(this,arguments);
  };

  /* قفل الوالدين عند إيقاف وضع الأطفال من الإعدادات */
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-set="kids"]');
    if(!b||!S.kids)return;
    e.stopPropagation();e.preventDefault();
    var a=6+Math.floor(Math.random()*5),c=4+Math.floor(Math.random()*5);
    nfPrompt(tt(['للوالدين فقط: كم ناتج '+a+' + '+c+' ؟','Parents only: what is '+a+' + '+c+'?','Réservé aux parents : combien font '+a+' + '+c+' ?']),'',function(v){
      if(+v===a+c){S.kids=false;save();applyTheme();openSettings()}
      else toast(tt(['إجابة غير صحيحة','Wrong answer','Réponse incorrecte']));
    },{num:true,title:tt(['وضع الأطفال','Kids mode','Mode enfants']),ok:tt(['تأكيد','Confirm','Confirmer']),cancel:tt(['إلغاء','Cancel','Annuler'])});
  },true);
})();
