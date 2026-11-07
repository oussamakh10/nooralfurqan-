/* ===== التحدي: أنواع أسئلة متعددة (اختيار، ترتيب، كتابة، توصيل، صح/خطأ) ===== */
(function(){
  const _dv=duelValid,_bq=botQs,_bt=botTypes;
  duelValid=function(qs){
    if(Array.isArray(qs)&&qs.some(function(x){return x&&x.t})){
      const out=[];
      for(let k=0;k<qs.length;k++){
        const x=qs[k];
        if(!x||typeof x.q!=='string'||x.q.length>400)return null;
        if(!x.t){const v=_dv([x]);if(!v)return null;out.push(v[0]);continue}
        const ok=function(s,n){return typeof s==='string'&&s.length<=n};
        if(x.t==='ord'&&Array.isArray(x.items)&&x.items.length>=2&&x.items.length<=8&&x.items.every(function(s){return ok(s,140)}))out.push({t:'ord',q:x.q,c:'',o:[],items:x.items.slice()});
        else if(x.t==='type'&&ok(x.c,60))out.push({t:'type',q:x.q,c:x.c,o:[],alt:Array.isArray(x.alt)?x.alt.filter(function(s){return ok(s,60)}).slice(0,4):[]});
        else if(x.t==='match'&&Array.isArray(x.pairs)&&x.pairs.length>=3&&x.pairs.length<=5&&x.pairs.every(function(p){return Array.isArray(p)&&ok(p[0],140)&&ok(p[1],60)}))out.push({t:'match',q:x.q,c:'',o:[],pairs:x.pairs.map(function(p){return [p[0],p[1]]})});
        else return null;
      }
      return out.length&&out.length<=20?out:null;
    }
    return _dv(qs);
  };
  function bank(){const a=[];['quran','sunnah','seerah','sahaba','fiqh','aqeeda','anbiya','gharib'].forEach(function(k){['e','m','h'].forEach(function(l){((B[k]||{})[l]||[]).forEach(function(x){if(x[0]&&x[1])a.push(x)})})});return shuffle(a)}
  function ords(n){const a=[];ALL.forEach(function(l){(l.qs||[]).forEach(function(q){if(q.t==='ord'&&q.items&&q.items.length>=3&&q.items.length<=6&&q.q.length<=200)a.push({t:'ord',q:q.q,items:q.items.slice()})})});return shuffle(a).slice(0,n)}
  function types(n){return bank().filter(function(x){return x[1].split(' ').length<=2&&x[1].length<=16&&x[0].length<=80&&!/\d/.test(x[1])}).slice(0,n).map(function(x){return {t:'type',q:x[0]+' (اكتب الإجابة)',c:x[1],alt:[]}})}
  function matches(n){const out=[],sh=bank().filter(function(x){return x[0].length<=58&&x[1].length<=26});for(let m=0;m<n;m++){const used={},pairs=[];for(let i=0;i<sh.length&&pairs.length<4;i++){const p=sh[(i+m*41)%sh.length];if(used[p[1]])continue;used[p[1]]=1;pairs.push([p[0].replace(/[؟?]$/,''),p[1]])}if(pairs.length===4)out.push({t:'match',q:'صِل كل سؤال بجوابه',pairs:pairs})}return out}
  botTypes=function(){const t=_bt();t.splice(2,0,['ord','ترتيب'],['type','كتابة'],['match','توصيل']);return t};
  botQs=function(t,lv){
    if(t==='ord')return ords(6);
    if(t==='type')return types(8);
    if(t==='match')return matches(4);
    if(t==='mix')return shuffle(_bq('mix',lv).slice(0,4).concat(_bq('tf',lv).slice(0,2),ords(2),types(2),matches(1)));
    return _bq(t,lv);
  };
  const nrm=function(s){return aNorm(String(s||'').replace(/[ً-ٟ]/g,'')).replace(/[^ء-ي0-9 ]+/g,' ').replace(/\s+/g,' ').trim()};
  function st(){const q=DU.qs[DU.i];if(!DU.ts||DU.ts.i!==DU.i){DU.ts={i:DU.i,pick:[],val:'',sel:-1,map:{},bad:0,pool:null,right:null,focus:false};
    if(q.t==='ord'){let p;do{p=shuffle(q.items.map(function(x,i){return i}))}while(p.join()===q.items.map(function(x,i){return i}).join()&&q.items.length>1);DU.ts.pool=p}
    if(q.t==='match')DU.ts.right=shuffle(q.pairs.map(function(p){return p[1]}))}
    return DU.ts}
  function resolve(ok){
    if(!DU||DU.sel!==null)return;
    DU.sel=ok?1:0;DU.ts.ok=ok;
    if(ok){DU.sc+=10;SND.correct()}else SND.wrong();
    S.q++;if(ok)S.qc++;act('q');
    DU.room.presence({n:duelName(),sc:DU.sc,dn:0}).catch(function(){});
    if(DU.bot){BM=ok?{m:'wow',t:pk(['أحسنت! إجابة صحيحة','ما شاء الله، أصبت','سريع البديهة!'])}:{m:'cheer',t:pk(['هذه المرة لي!','لا بأس، حاول في التالي','الجواب غير هذا'])}}
    renderDuel();
  }
  const _r=renderDuel;
  renderDuel=function(){
    _r();
    if(!DU||DU.state!=='play'||!DU.qs)return;
    const q=DU.qs[DU.i];if(!q||!q.t)return;
    const box=document.querySelector('#lesson .opts');if(!box)return;
    const s=st(),done=DU.sel!==null;let h='';
    if(q.t==='ord'){
      h+='<div class="dq-seq" aria-live="polite">'+(s.pick.length?s.pick.map(function(i,k){return '<span class="dq-chip"><b>'+N(k+1)+'</b>'+esc(q.items[i])+'</span>'}).join(''):'<span class="dq-hint">اضغط العناصر بالترتيب الصحيح</span>')+'</div>';
      if(!done){h+='<div class="dq-pool">'+s.pool.filter(function(i){return s.pick.indexOf(i)<0}).map(function(i){return '<button class="dq-it" data-dq="o:'+i+'">'+esc(q.items[i])+'</button>'}).join('')+'</div>'+(s.pick.length?'<button class="btn ghost sm" data-dq="undo">تراجع</button>':'')}
      else h+='<p class="dq-fb '+(s.ok?'ok':'bad')+'">'+(s.ok?'✔ ترتيب صحيح':'✖ الترتيب الصحيح:')+'</p>'+(s.ok?'':'<ol class="dq-ol">'+q.items.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ol>');
    }else if(q.t==='type'){
      h+='<input id="dqin" class="dq-in" type="text" autocomplete="off" '+(done?'disabled ':'')+'placeholder="اكتب الإجابة" value="'+esc(s.val)+'">'+(done?'<p class="dq-fb '+(s.ok?'ok':'bad')+'">'+(s.ok?'✔ إجابة صحيحة':'✖ الجواب الصحيح: '+esc(q.c))+'</p>':'<button class="btn" data-dq="chk">تحقّق</button>');
    }else if(q.t==='match'){
      h+='<div class="dq-mt"><div class="dq-col">'+q.pairs.map(function(p,k){const m=s.map[k]!==undefined;return '<button class="dq-it'+(m?' right':'')+(s.sel===k?' on':'')+'" data-dq="l:'+k+'" '+(m||done?'disabled':'')+'>'+esc(p[0])+(m?'<small>'+esc(s.map[k])+'</small>':'')+'</button>'}).join('')+'</div><div class="dq-col">'+s.right.map(function(a,k){const used=Object.keys(s.map).some(function(i){return s.map[i]===a});return '<button class="dq-it'+(used?' right':'')+'" data-dq="r:'+k+'" '+(used||done?'disabled':'')+'>'+esc(a)+'</button>'}).join('')+'</div></div>'+(s.bad?'<p class="dq-hint">أخطاء: '+N(s.bad)+'</p>':'')+(done?'<p class="dq-fb '+(s.ok?'ok':'bad')+'">'+(s.ok?'✔ أحسنت':'✖ أخطأت في أكثر من توصيل')+'</p>':'');
    }
    box.className='dq';box.innerHTML=h;
    const inp=document.getElementById('dqin');if(inp&&s.focus&&!done){inp.focus();try{inp.setSelectionRange(inp.value.length,inp.value.length)}catch(e){}}
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-dq]');if(!b||!DU||DU.state!=='play'||DU.sel!==null)return;
    const q=DU.qs[DU.i],s=st(),d=b.getAttribute('data-dq').split(':');
    if(d[0]==='o'){s.pick.push(+d[1]);if(s.pick.length===q.items.length){const ok=s.pick.every(function(i,k){return q.items[i]===q.items[k]});return resolve(ok)}SND.nav&&SND.nav();return renderDuel()}
    if(d[0]==='undo'){s.pick.pop();return renderDuel()}
    if(d[0]==='chk'){const v=nrm(s.val),ok=!!v&&[q.c].concat(q.alt||[]).some(function(x){return nrm(x)===v});return resolve(ok)}
    if(d[0]==='l'){s.sel=+d[1];return renderDuel()}
    if(d[0]==='r'){
      if(s.sel<0){toast('اختر السؤال أولًا');return}
      const a=s.right[+d[1]];
      if(q.pairs[s.sel][1]===a){s.map[s.sel]=a;s.sel=-1;if(Object.keys(s.map).length===q.pairs.length)return resolve(s.bad<=1)}
      else{s.bad++;SND.wrong&&SND.wrong();s.sel=-1}
      return renderDuel();
    }
  });
  document.addEventListener('input',function(e){if(e.target&&e.target.id==='dqin'&&DU&&DU.ts)DU.ts.val=e.target.value});
  document.addEventListener('focusin',function(e){if(e.target&&e.target.id==='dqin'&&DU&&DU.ts)DU.ts.focus=true});
  document.addEventListener('focusout',function(e){if(e.target&&e.target.id==='dqin'&&DU&&DU.ts)DU.ts.focus=false});
  document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.id==='dqin'&&DU&&DU.state==='play'&&DU.sel===null){e.preventDefault();const q=DU.qs[DU.i],v=nrm(DU.ts.val);resolve(!!v&&[q.c].concat(q.alt||[]).some(function(x){return nrm(x)===v}))}});
})();

/* ===== بوابة العمر داخل التحدي: بدل إشعار مخفي، نافذة واضحة ===== */
(function(){
  const _dj=duelJoin;
  function dlg(cont){
    let m=document.getElementById('dqage');if(m)m.remove();
    const A=typeof cloudAge==='function'?cloudAge():13;
    m=document.createElement('div');m.id='dqage';m.className='dqage';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
    m.innerHTML='<div class="dqage-bg" data-dqa="x"></div><div class="dqage-c"><b>قبل أن ننشئ الغرفة</b><p>التحدي المباشر مع الأصدقاء يتطلّب اتصالًا بالإنترنت، ويُتاح لمن بلغ '+N(A)+' سنة فأكثر حفاظًا على خصوصية الصغار. كم عمرك؟</p><button class="btn" data-dqa="ok">'+N(A)+' سنة فأكثر</button><button class="btn ghost" data-dqa="no">أقل من '+N(A)+' سنة</button><small>بالمتابعة توافق على <a href="privacy.html" target="_blank" rel="noopener">سياسة الخصوصية</a>. العب ضد الهدهد بلا إنترنت متاح للجميع.</small></div>';
    document.body.appendChild(m);
    m.addEventListener('click',function(e){
      const b=e.target.closest('[data-dqa]');if(!b)return;const v=b.getAttribute('data-dqa');
      if(v==='ok'){S.prof=S.prof||{};S.prof.age=A;S.consent=S.consent||{v:1,t:Date.now()};save();m.remove();cont()}
      else if(v==='no'){S.prof=S.prof||{};S.prof.age=A-1;save();m.remove();toast('جرّب اللعب ضد الهدهد، فهو متاح لك دون إنترنت.')}
      else m.remove();
    });
  }
  duelJoin=function(code,host){
    if(S.kids||(typeof cloudOK==='function'&&!cloudOK()&&!(S.prof&&S.prof.age&&S.prof.age<cloudAge()))){
      if(S.kids){toast('التحدي المباشر غير متاح في وضع الأطفال. جرّب اللعب ضد الهدهد.');return}
      const self=this;return dlg(function(){duelJoin.call(self,code,host)})}
    if(S.prof&&S.prof.age&&S.prof.age<cloudAge()&&!S.prof.age>=99){toast('التحدي المباشر لمن بلغ '+N(cloudAge())+' سنة فأكثر. جرّب اللعب ضد الهدهد.');return}
    return _dj.apply(this,arguments);
  };
})();
