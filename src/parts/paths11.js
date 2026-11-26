/* 23: مسارات قصيرة بحسب الهدف — تُختار من الدروس الحالية دون تكرار المحتوى */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  function ico(n){try{return icoSvg(n)}catch(e){return ''}}
  var P=[
    {id:'iman',i:'🌙',u:[0,1,2],t:['أسس الإيمان','Foundations of faith','Les bases de la foi'],d:['أركان الإسلام والإيمان وأسماء الله الحسنى','Pillars of Islam and faith, and the Names of Allah','Les piliers de l’islam et de la foi, et les Noms d’Allah']},
    {id:'salah',i:'🌟',u:[3,4,5],t:['أصلّي بخشوع','I pray with focus','Je prie avec concentration'],d:['الوضوء والطهارة والصلاة بالتفصيل','Ablution, purity and prayer in detail','Ablutions, pureté et prière en détail']},
    {id:'quran',i:'📖',u:[18,19,20],t:['أحسن تلاوتي','Improve my recitation','Améliorer ma récitation'],d:['القرآن والسنة وعلوم القرآن والتجويد المبسّط','The Qur’an and Sunnah, its sciences and simple Tajweed','Coran et Sunna, sciences du Coran et tajwid simplifié']},
    {id:'sira',i:'🎯',u:[8,9,10,11],t:['أفهم سيرة نبيّي','Understand my Prophet’s life','Comprendre la vie de mon Prophète'],d:['من قبل البعثة إلى الهجرة والغزوات والفتح','From before the revelation to the Hijrah and the conquest','De l’avant-révélation à l’Hégire et à la conquête']},
    {id:'anbiya',i:'✦',u:[13],t:['قصص الأنبياء','Stories of the Prophets','Histoires des prophètes'],d:['اثنا عشر درسًا من قصص الأنبياء في القرآن','Twelve lessons from the Qur’anic stories of the Prophets','Douze leçons sur les récits des prophètes dans le Coran']},
    {id:'akhlaq',i:'✅',u:[22,23],t:['أخلاقي وأذكاري','My character and remembrance','Mon caractère et mes invocations'],d:['الأذكار والأخلاق والمعاملات اليومية','Daily remembrance, manners and dealings','Invocations, bonnes manières et relations quotidiennes']}
  ];
  function lessons(p){var o=[];p.u.forEach(function(ui){var u=DATA[ui];if(u)u.lessons.forEach(function(l){o.push(l)})});return o}
  function prog(p){var ls=lessons(p),d=ls.filter(function(l){return S.done&&S.done[l.id]}).length;return {done:d,total:ls.length,next:ls.find(function(l){return !(S.done&&S.done[l.id])})}}
  function byId(id){return P.filter(function(p){return p.id===id})[0]}
  window.nfPathForGoal=function(g){return g==='learn'?'iman':(g==='khatma'||g==='hifz')?'quran':null};
  window.nfPathNext=function(){var p=byId(S.path);if(!p)return null;var n=prog(p).next;return n?n.id:null};
  /* بدء درس من مسار دون التقيّد بقفل الوحدات: المسار اختيار صريح من المستخدم */
  window.nfStartPathLesson=function(id){
    var u=window.unitLocked;window.unitLocked=function(){return false};
    try{startLesson(id)}finally{window.unitLocked=u}
  };

  function card(){
    var p=byId(S.path),h;
    if(p){
      var g=prog(p),pc=g.total?Math.round(g.done/g.total*100):0;
      h='<div class="pt-h"><span class="pt-i">'+ico(p.i)+'</span><div class="pt-t"><small>'+esc(tt(['مسارك القصير','Your short path','Votre parcours court']))+'</small><b>'+esc(tt(p.t))+'</b></div><button class="pt-chg" data-act="pt-open" aria-label="'+esc(tt(['تغيير المسار','Change path','Changer de parcours']))+'">'+esc(tt(['تغيير','Change','Changer']))+'</button></div>'+
        '<div class="pbar gold"><i style="width:'+pc+'%"></i></div><div class="pt-m">'+esc(tt([g.done+' من '+g.total+' دروس',''+g.done+' of '+g.total+' lessons',''+g.done+' sur '+g.total+' leçons']))+'</div>'+
        (g.next?'<button class="btn sm" data-act="pt-go" data-l="'+g.next.id+'">'+esc(tt(['تابع: ','Continue: ','Continuer : ']))+esc(g.next.title)+'</button>':'<p class="pt-m">'+esc(tt(['ما شاء الله! أتممتَ هذا المسار.','Wonderful! You completed this path.','Magnifique ! Vous avez terminé ce parcours.']))+'</p><button class="btn sm ghost" data-act="pt-open">'+esc(tt(['اختر مسارًا آخر','Pick another path','Choisir un autre parcours']))+'</button>');
    }else{
      h='<div class="pt-h"><span class="pt-i">'+ico('🎯')+'</span><div class="pt-t"><small>'+esc(tt(['مسارات قصيرة','Short paths','Parcours courts']))+'</small><b>'+esc(tt(['ماذا تريد أن تتعلّم أولًا؟','What do you want to learn first?','Que voulez-vous apprendre d’abord ?']))+'</b></div></div><button class="btn sm" data-act="pt-open">'+esc(tt(['اختر مسارًا','Pick a path','Choisir un parcours']))+'</button>';
    }
    return '<div class="card ptcard" id="ptcard">'+h+'</div>';
  }
  function put(){
    if(!(S.prof&&S.prof.done)||document.getElementById('ptcard'))return;
    var host=null,after=true;
    if(TAB==='home')host=document.querySelector('.hm-hero');
    else if(TAB==='learn'&&(typeof LTAB==='undefined'||LTAB==='path'))host=document.querySelector('#page .seg');
    if(!host||!host.parentNode)return;
    var d=document.createElement('div');d.innerHTML=card();var n=d.firstChild;n.style.margin='12px 0';
    host.parentNode.insertBefore(n,host.nextSibling);
  }
  function refresh(){var o=document.getElementById('ptcard');if(o)o.remove();put()}

  function picker(){
    var c=$('#cele');
    c.className='';
    c.innerHTML='<div class="card ptpick" role="dialog" aria-modal="true" aria-label="'+esc(tt(['اختر مسارك','Pick your path','Choisissez votre parcours']))+'" style="max-width:420px;max-height:88vh;overflow:auto;text-align:start"><div class="pt-ph"><b>'+esc(tt(['اختر مسارك القصير','Pick your short path','Choisissez votre parcours court']))+'</b><button class="iconbtn sm" data-act="pt-x" aria-label="'+esc(tt(['إغلاق','Close','Fermer']))+'">✕</button></div><p class="muted" style="margin:0 0 6px;font-size:.92rem">'+esc(tt(['مسار قصير مختار من الدروس، تبدأ منه فورًا. يمكنك تغييره متى شئت.','A short path picked from the lessons; start right away and switch anytime.','Un parcours court choisi parmi les leçons ; commencez tout de suite et changez quand vous voulez.']))+'</p>'+
      P.map(function(p){var g=prog(p),on=S.path===p.id;return '<button class="pt-o'+(on?' on':'')+'" data-act="pt-set" data-p="'+p.id+'"><span class="pt-i">'+ico(p.i)+'</span><span class="pt-ot"><b>'+esc(tt(p.t))+'</b><small>'+esc(tt(p.d))+'</small><span class="pbar gold"><i style="width:'+(g.total?Math.round(g.done/g.total*100):0)+'%"></i></span></span><span class="pt-n">'+g.done+'/'+g.total+'</span></button>'}).join('')+'</div>';
    c.hidden=false;
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act^="pt-"]');if(!b)return;
    var a=b.dataset.act;
    if(a==='pt-open')picker();
    else if(a==='pt-x'){var c=$('#cele');c.hidden=true;c.innerHTML=''}
    else if(a==='pt-set'){S.path=b.dataset.p;try{save()}catch(x){}var c=$('#cele');c.hidden=true;c.innerHTML='';refresh();try{toast(tt(['تم اختيار المسار','Path selected','Parcours choisi']))}catch(x){}}
    else if(a==='pt-go'){window.nfStartPathLesson(b.dataset.l)}
  });
  var r=0;new MutationObserver(function(){if(r)return;r=requestAnimationFrame(function(){r=0;put()})}).observe(document.body,{childList:true,subtree:true});

  var st=document.createElement('style');
  st.textContent='.ptcard{display:grid;gap:8px;border-color:var(--gold)}.pt-h{display:flex;align-items:center;gap:10px}.pt-i{flex:0 0 auto;width:40px;height:40px;border-radius:13px;display:grid;place-items:center;background:color-mix(in srgb,var(--gold) 18%,transparent);color:var(--gold-t)}.pt-t{flex:1;min-width:0;display:grid}.pt-t small{color:var(--muted);font-size:.8rem}.pt-t b{font:700 1.08rem var(--display)}.pt-m{margin:0;color:var(--muted);font-size:.88rem}'+
   '.pt-chg{border:2px solid var(--line);background:var(--surface);color:var(--fg);border-radius:99px;padding:0 12px;font:700 .85rem/2 var(--text)}'+
   '.pt-ph{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font:700 1.15rem var(--display)}'+
   '.pt-o{display:flex;align-items:center;gap:12px;width:100%;margin-top:8px;padding:10px 12px;border-radius:16px;border:2px solid var(--line);background:var(--surface);color:var(--fg);text-align:start}.pt-o.on{border-color:var(--gold);background:color-mix(in srgb,var(--gold) 14%,var(--surface))}'+
   '.pt-ot{flex:1;min-width:0;display:grid;gap:3px}.pt-ot b{font:700 1.02rem var(--display)}.pt-ot small{color:var(--muted);font-size:.82rem;line-height:1.5}.pt-n{flex:0 0 auto;color:var(--muted);font-variant-numeric:tabular-nums;font-size:.85rem}';
  document.head.appendChild(st);
})();
