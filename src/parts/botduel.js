/* اللعب ضد الحاسوب — يعمل دون إنترنت */
const BOT_LV={e:{n:'سهل',p:.45,a:6000,b:5000},m:{n:'متوسط',p:.7,a:4000,b:4000},h:{n:'صعب',p:.9,a:2000,b:3000}};
function botTypes(){const t=[['mix','منوّع'],['tf','صح أو خطأ']];F.forEach(function(f){if(f.id!=='order'&&f.id!=='ayat')t.push([f.id,f.n])});return t}
function BotRoom(lv){
  const cfg=BOT_LV[lv]||BOT_LV.m;let me={n:duelName(),sc:0,dn:0},bot={n:'الحاسوب',sc:0,dn:0},bi=0,due=0,cbs=[],tm=null;
  function fire(){cbs.slice().forEach(function(f){try{f()}catch(e){}})}
  function step(){
    if(!DU||DU.room!==rm||!DU.qs){return}
    const n=DU.qs.length;let ch=false;
    if(DU.state==='end'){while(bi<n){bi++;if(Math.random()<cfg.p)bot.sc+=10;ch=true}if(!bot.dn){bot.dn=1;ch=true}}
    else if(DU.state==='play'){
      while(bi<DU.i){bi++;if(Math.random()<cfg.p)bot.sc+=10;ch=true}
      if(bi===DU.i&&bi<n){
        if(!due)due=Date.now()+cfg.a*(.6+Math.random()*.8)*(.7+.3*(1))+Math.random()*cfg.b*.3;
        if(Date.now()>=due){bi++;due=0;if(Math.random()<cfg.p)bot.sc+=10;ch=true;if(bi>=n)bot.dn=1}
      }
    }
    if(ch)fire();
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
  const b=function(act,on,txt){return '<button class="btn'+(on?'':' ghost')+'" style="padding:6px 12px;min-height:0;width:auto;margin:3px" aria-pressed="'+on+'" data-act="'+act+'">'+esc(txt)+'</button>'};
  return '<div class="field" style="margin-top:14px"><label>العب ضد الحاسوب (دون إنترنت)</label><div>'+botTypes().map(function(t){return b('bot-t:'+t[0],s.t===t[0],t[1])}).join('')+'</div><div>'+Object.keys(BOT_LV).map(function(k){return b('bot-l:'+k,s.l===k,BOT_LV[k].n)}).join('')+'</div><button class="btn" data-act="bot-go">ابدأ ضد الحاسوب</button></div>';
}
