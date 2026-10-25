/* ===== هدف يومي، وتدريب على الأخطاء ===== */
(function(){
  const _ph=pageHome;
  pageHome=function(){
    _ph();
    try{
      const sec=document.querySelector('#page section.sec');if(!sec||sec.querySelector('.dg'))return;
      const g=S.dg||10,n=Math.min(g,dayState().p.q||0),pc=Math.round(n/g*100),done=n>=g;
      const h=document.createElement('div');h.className='card dg';
      h.innerHTML='<div class="ring" style="--p:'+pc+'%"><b>'+N(n)+'/'+N(g)+'</b></div><div class="dgt"><b>'+esc(g3(['هدفك اليومي','Daily goal','Objectif du jour']))+(done?' ✓':'')+'</b><small class="muted">'+esc(done?g3(['ما شاء الله! أنجزت هدف اليوم','Done for today!','Objectif atteint !']):g3(['أجب عن '+N(g)+' سؤالًا اليوم','Answer '+g+' questions today','Répondez à '+g+' questions aujourd’hui']))+'</small><span class="opts2">'+[5,10,20].map(function(x){return '<button class="tag" data-dg="'+x+'" aria-pressed="'+(g===x)+'">'+N(x)+'</button>'}).join('')+'</span></div>';
      const h2=sec.querySelector('h2');if(h2)h2.after(h);else sec.prepend(h);
    }catch(e){}
  };
  const _act=act;
  act=function(kind,n){
    const before=dayState().p.q||0;_act(kind,n);
    if(kind==='q'){
      const g=S.dg||10;S.dgd=S.dgd||{};
      if(before<g&&(dayState().p.q||0)>=g&&!S.dgd[today()]){S.dgd[today()]=1;save();toast(g3(['🎯 أنجزت هدفك اليومي!','🎯 Daily goal reached!','🎯 Objectif du jour atteint !']));try{confetti();SND.win()}catch(e){}}
    }
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-dg]');if(!b)return;
    S.dg=+b.getAttribute('data-dg');save();if(TAB==='home')renderPage();
  });
  /* تدريب على كل الأخطاء */
  const _lr=learnReview;
  learnReview=function(){
    const all=Object.keys(S.sr||{}).length;
    return _lr()+(all?'<div class="card" style="display:grid;gap:8px"><p class="muted" style="font-size:.92rem">'+esc(g3(['تدرّب الآن على الأسئلة التي أخطأت فيها، حتى لو لم يحن موعدها.','Practice the questions you missed, even if not due yet.','Entraînez-vous sur vos erreurs, même si elles ne sont pas encore dues.']))+'</p><button class="btn gold" data-act="mist-go">'+esc(g3(['تدرّب على أخطائي','Practice my mistakes','Travailler mes erreurs']))+' ('+N(all)+')</button></div>':'');
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-act="mist-go"]');if(!b)return;
    const items=shuffle(Object.keys(S.sr||{}).map(function(k){return S.sr[k].q})).slice(0,10);
    if(!items.length){toast(g3(['لا أخطاء بعد، أحسنت!','No mistakes yet!','Aucune erreur !']));return}
    L={lesson:{id:'_mist',title:g3(['تدريب الأخطاء','Mistakes practice','Travail des erreurs'])},review:true,queue:items.map(mkQ),total:items.length,solved:0,hearts:99,gain:0,wrongs:0,state:'ask',sel:null,ans:[],ms:[],tv:'',force:false,ok:false,confirm:false,mood:'happy',say:'',combo:0,best:0};
    openOverlay();renderLesson();
  });
})();
/* ===== مشاركة آية/حديث اليوم كصورة ===== */
(function(){
  const _ph2=pageHome;
  pageHome=function(){
    _ph2();
    document.querySelectorAll('.card.day').forEach(function(c){if(!c.querySelector('.pill')||!(c.querySelector('p.q')||c.querySelector('#vod')))return;
      if(c.querySelector('[data-dshare]'))return;
      const b=document.createElement('button');b.className='tag';b.setAttribute('data-dshare','1');b.textContent='📤 '+g3(['مشاركة','Share','Partager']);b.style.justifySelf='start';c.appendChild(b);
    });
  };
  function wrap(ctx,t,w){const ws=t.split(/\s+/),ls=[];let l='';ws.forEach(function(x){const m=l?l+' '+x:x;if(ctx.measureText(m).width>w&&l){ls.push(l);l=x}else l=m});if(l)ls.push(l);return ls}
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-dshare]');if(!b)return;
    const c=b.closest('.card.day');const title=c.querySelector('.pill').textContent;
    const body=(c.querySelector('p.q')||c.querySelector('#vod p')||{}).textContent||'';
    const src=(c.querySelector('small')||{}).textContent||'';
    const cv=document.createElement('canvas');cv.width=1080;cv.height=1350;const x=cv.getContext('2d');
    const g=x.createLinearGradient(0,0,0,1350);g.addColorStop(0,'#0f3b3a');g.addColorStop(1,'#0b2a28');x.fillStyle=g;x.fillRect(0,0,1080,1350);
    x.strokeStyle='#d9b45a';x.lineWidth=6;x.strokeRect(40,40,1000,1270);
    x.fillStyle='#d9b45a';x.textAlign='center';x.direction='rtl';x.font='700 54px sans-serif';x.fillText(title,540,160);
    x.fillStyle='#fff';x.font='400 52px serif';let ls=wrap(x,body,880),sz=52;
    while(ls.length*sz*1.9>880&&sz>28){sz-=4;x.font='400 '+sz+'px serif';ls=wrap(x,body,880)}
    let y=330;ls.forEach(function(l){x.fillText(l,540,y);y+=sz*1.9});
    x.fillStyle='#d9b45a';x.font='400 38px sans-serif';x.fillText(src,540,Math.min(y+60,1130));
    x.fillStyle='#ffffffaa';x.font='400 34px sans-serif';x.fillText('نور الفرقان',540,1250);
    cv.toBlob(function(bl){
      const f=new File([bl],'nur-alfurqan.png',{type:'image/png'});
      try{if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:body+'\n'+src}).catch(function(){});return}}catch(er){}
      dlSave('nur-alfurqan.png',bl,'image/png');
    },'image/png');
  });
})();
