/* 24: الهدهد يستقبل العائد بعد غياب (يومان فأكثر) بدرس دقيقة واحدة */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  function gap(){
    var ks=Object.keys(S.days||{});if(!ks.length)return 0;
    ks.sort();var last=new Date(ks[ks.length-1]+'T00:00:00'),now=new Date(today()+'T00:00:00');
    var d=Math.round((now-last)/864e5);return isFinite(d)?d:0;
  }
  function busy(){
    var c=document.getElementById('cele'),l=document.getElementById('lesson'),m=document.getElementById('lgm');
    return !!(document.getElementById('splash')||(c&&!c.hidden)||(l&&!l.hidden)||(m&&!m.hidden)||document.getElementById('wl'));
  }
  function show(){
    var nm=(S.prof&&S.prof.name)||'';
    var c=document.getElementById('cele');c.className='';
    c.innerHTML='<div class="card cbcard" role="dialog" aria-modal="true" aria-label="'+esc(tt(['أهلًا بعودتك','Welcome back','Bon retour']))+'" style="max-width:380px;text-align:center;gap:10px">'+
      '<div class="cb-bird" style="display:grid;place-items:center">'+hoopoe('love',96)+'</div>'+
      '<h2 style="font-size:1.4rem">'+esc(tt(['اشتقتُ إليك'+(nm?' يا '+nm:'')+'!','I missed you'+(nm?', '+nm:'')+'!','Vous m’avez manqué'+(nm?', '+nm:'')+' !']))+'</h2>'+
      '<p class="muted" style="margin:0;line-height:1.8">'+esc(tt(['لا بأس بالغياب، المهم أنك عدت. نبدأ بدرس واحد مدّته دقيقة فقط؟','No worries about the break, what matters is you are back. Shall we start with a one-minute lesson?','Aucun souci pour l’absence, l’essentiel est que vous soyez de retour. On commence par une leçon d’une minute ?']))+'</p>'+
      '<button class="btn" data-act="cb-go">'+esc(tt(['ابدأ درس الدقيقة','Start the one-minute lesson','Commencer la leçon d’une minute']))+'</button>'+
      '<button class="btn ghost" data-act="cb-x">'+esc(tt(['لاحقًا','Later','Plus tard']))+'</button></div>';
    c.hidden=false;
  }
  function close(){var c=document.getElementById('cele');c.hidden=true;c.innerHTML=''}
  function minute(){
    var qs=srDue().slice(0,4);
    if(!qs.length){
      var pool=[];ALL.forEach(function(l){if(S.done&&S.done[l.id])l.qs.forEach(function(q){pool.push(q)})});
      if(!pool.length&&ALL[0])pool=ALL[0].qs.slice();
      qs=shuffle(pool).slice(0,4);
    }
    if(!qs.length)return;
    L={lesson:{id:'_review',title:tt(['درس الدقيقة','One-minute lesson','Leçon d’une minute'])},review:true,queue:qs.map(mkQ),total:qs.length,solved:0,hearts:99,gain:0,wrongs:0,state:'ask',sel:null,ans:[],ok:false,confirm:false,mood:'happy',say:'',combo:0,best:0};
    openOverlay();renderLesson();
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act^="cb-"]');if(!b)return;
    close();if(b.dataset.act==='cb-go')minute();
  });
  var tries=0;
  function attempt(){
    if(!(S.prof&&S.prof.done)||S.cbd===today())return;
    if(gap()<2)return;
    if(busy()){if(++tries<8)setTimeout(attempt,2500);return}
    S.cbd=today();try{save()}catch(e){}
    show();
  }
  setTimeout(attempt,2200);
  window.nfComeback={gap:gap,show:show,minute:minute};
})();
