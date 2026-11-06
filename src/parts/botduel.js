/* اللعب ضد الحاسوب — يعمل دون إنترنت */
const BOT_LV={e:{n:'سهل',p:.45,a:6000,b:5000},m:{n:'متوسط',p:.7,a:4000,b:4000},h:{n:'صعب',p:.9,a:2000,b:3000}};
function botTypes(){const t=[['mix','منوّع'],['tf','صح أو خطأ']];F.forEach(function(f){if(f.id!=='order'&&f.id!=='ayat')t.push([f.id,f.n])});return t}
function pk(a){return a[Math.floor(Math.random()*a.length)]}
let BM={m:'happy',t:'الهدهد يفكّر…'};
function BotRoom(lv){
  const cfg=BOT_LV[lv]||BOT_LV.m;let me={n:duelName(),sc:0,dn:0},form=(Math.random()-.5)*.36,bot={n:'الهدهد',sc:0,dn:0},bi=0,due=0,cbs=[],tm=null;
  function ans(live){const ok=Math.random()<Math.max(.1,Math.min(.97,cfg.p+form+(Math.random()-.5)*.2));if(ok)bot.sc+=10;if(live)BM=ok?{m:'cheer',t:pk(['أجبتُ قبلك!','هذا سهل عليّ','أصبتُ، وأنت؟'])}:{m:'sad',t:pk(['آه، أخطأتُ!','سؤال صعب عليّ…','تسرّعتُ قليلًا'])}}
  function fire(){cbs.slice().forEach(function(f){try{f()}catch(e){}})}
  function step(){
    if(!DU||DU.room!==rm||!DU.qs){return}
    const n=DU.qs.length;let ch=false;
    if(DU.state==='end'){while(bi<n){bi++;ans(0);ch=true}if(!bot.dn){bot.dn=1;ch=true}}
    else if(DU.state==='play'){
      while(bi<DU.i){bi++;ans(0);ch=true}
      if(bi===DU.i&&bi<n){
        if(!due)due=Date.now()+cfg.a*(.6+Math.random()*.8)*(.7+.3*(1))+Math.random()*cfg.b*.3;
        if(Date.now()>=due){bi++;due=0;ans(1);ch=true;if(bi>=n)bot.dn=1}
      }
    }
    if(ch){fire();if(DU&&DU.room===rm)renderDuel()}
  }
  const rm={
    presence:function(p){me=p;return Promise.resolve()},
    emit:function(){return Promise.resolve()},
    on:function(){return function(){}},
    onPeers:function(f){cbs.push(f);return function(){cbs=cbs.filter(function(x){return x!==f})}},
    peers:function(){return [{id:'me',presence:me,isMe:true},{id:'bot',presence:bot,isMe:false}]},
    leave:function(){clearInterval(tm);cbs=[];return Promise.resolve()}
  };
  tm=setInterval(step,250);
  return rm;
}
function botQs(t,lv){
  const mk=function(x){return {q:x[0],c:x[1],o:shuffle(x.slice(1,5))}};
  const cat=function(id){const b=(B[id]||{});let a=(b[lv]||[]).slice();['m','e','h'].forEach(function(l){if(a.length<8&&l!==lv)a=a.concat(b[l]||[])});return a.map(mk)};
  let pool=[];
  if(t==='tf'){pool=(window.MGTFB||[]).map(function(x){return {q:x[0],c:x[1]?'صح':'خطأ',o:['صح','خطأ']}})}
  else if(t==='mix'){F.forEach(function(f){if(f.id==='order'||f.id==='ayat')return;pool=pool.concat(shuffle(cat(f.id)).slice(0,3))})}
  else pool=cat(t);
  return shuffle(pool).slice(0,8);
}
function duelBot(){
  const s=DU.bs,qs=botQs(s.t,s.l);
  if(qs.length<3){toast('لا أسئلة كافية لهذا النوع');return}
  if(DU.room)DU.room.leave().catch(function(){});
  DU.room=BotRoom(s.l);DU.code='bot';DU.host=true;DU.bot=true;
  duelStart(qs);
}
function botLobbyHTML(){
  const s=DU.bs;
  const b=function(act,on,txt){return '<button class="bchip" aria-pressed="'+on+'" data-act="'+act+'">'+esc(txt)+'</button>'};
  return '<h3 class="gh3">تحدَّ الهدهد <small class="muted">(دون إنترنت)</small></h3><div class="bsec"><span class="lbl">نوع الأسئلة</span><div class="bchips">'+botTypes().map(function(t){return b('bot-t:'+t[0],s.t===t[0],t[1])}).join('')+'</div></div><div class="bsec"><span class="lbl">مستوى الهدهد</span><div class="bchips lv">'+Object.keys(BOT_LV).map(function(k){return b('bot-l:'+k,s.l===k,BOT_LV[k].n)}).join('')+'</div></div><button class="btn" data-act="bot-go">ابدأ ضد الهدهد</button>';
}

(function(){
  const _r=renderDuel,_a=duelAnswer,_n=duelNext;
  renderDuel=function(){
    _r();
    if(!DU||!DU.bot)return;
    const m=document.querySelector('#lesson .lmain'),t=document.querySelector('#lesson .ltop h2');if(!m)return;
    if(t)t.textContent='تحدٍّ مع الهدهد';
    if(DU.state==='play'){
      const rk=duelRank(),b=rk.filter(function(p){return !p.me})[0]||{sc:0};
      m.insertAdjacentHTML('afterbegin','<div class="say" style="align-items:center"><div class="mas">'+hoopoe(BM.m,64)+'</div><div class="bubble" style="flex:1"><p><b>الهدهد</b> · '+N(b.sc)+' نقطة<br>'+esc(BM.t)+'</p></div></div>');
    }else if(DU.state==='end'){
      const rk=duelRank(),me=rk.filter(function(p){return p.me})[0],b=rk.filter(function(p){return !p.me})[0]||{sc:0},d=me.sc-b.sc;
      const t2=d>0?'غلبتني! أحسنت، سأتدرّب وأعود.':d<0?'فزتُ هذه المرة! أعطني فرصة أخرى؟':'تعادلنا! أنت خصم قوي.';
      const c=document.querySelector('#lesson .center');if(c)c.insertAdjacentHTML('afterbegin','<div class="bubble"><p><b>الهدهد:</b> '+t2+'</p></div>');
    }
  };
  duelAnswer=function(i){
    const q=DU&&DU.qs&&DU.qs[DU.i];const was=DU&&DU.sel;_a(i);
    if(DU&&DU.bot&&q&&was===null&&DU.sel!==null){const ok=q.o[i]===q.c;BM=ok?{m:'wow',t:pk(['أحسنت! إجابة صحيحة','ما شاء الله، أصبت','سريع البديهة!'])}:{m:'cheer',t:pk(['هذه المرة لي!','الجواب غير هذا','لا بأس، حاول في التالي'])};renderDuel()}
  };
  duelNext=function(){BM={m:'happy',t:'الهدهد يفكّر…'};_n();if(DU&&DU.bot&&DU.state==='end'){const r=duelRank(),me=r.filter(function(p){return p.me})[0],b=r.filter(function(p){return !p.me})[0];if(me&&b&&me.sc>b.sc){S.hwin=(S.hwin||0)+1;save();toast('وسام جديد: غلبتُ الهدهد')}}};
  const _db=duelBot;duelBot=function(){BM={m:'happy',t:'هيا نتنافس!'};_db()};
})();
