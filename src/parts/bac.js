/* ===== تمارين على نمط الباكالوريا: أكمل النص، تفسير الآية، وضعية إدماجية، توصيل، ترتيب ===== */
(function(){
  let BX=null;
  const AR09={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'};
  function N(s){
    return String(s||'').replace(/[٠-٩]/g,function(c){return AR09[c]}).replace(/[ً-ٰٟۖ-ۭـ]/g,'')
      .replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/ء/g,'')
      .replace(/[^ء-ي0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  }
  const STOP={};('من في على الى عن ان ان ما لا لم لن قد كل هذا هذه ذلك التي الذي الذين اللذين هو هي هم هن انه انها كان كانت يكون ثم او بل حتي اذا اذ اي ايها يا ولا وما ومن وان وقد فان فيه فيها منه منها له لها لهم عليه عليها عليهم الله ربك ربكم ربهم انما الا الي فيهم بين بعد قبل عند مع غير ولم ولن بها به بهم وهو وهي ولهم'.split(' ')).forEach(function(w){STOP[w]=1});
  function stem(w){w=w.replace(/^(وال|بال|فال|كال|لل|ال)/,'');return w.length>4?w.slice(0,4):w}
  function toks(s){return N(s).split(' ').filter(Boolean)}
  function clean(t){return String(t).replace(/[﴿﴾«»]/g,'').replace(/[ۖ-ۜ۟-ۨ]/g,'').replace(/\s+/g,' ').trim()}
  function surahNo(name){const n=N(name);for(let i=0;i<SN.length;i++){if(N(SN[i])===n)return i+1}return 0}
  function parseRef(r){const m=String(r).match(/^(.+?)\s+(\d+)$/);if(!m)return null;const s=surahNo(m[1]);return s?{s:s,a:+m[2]}:null}
  function mkCloze(text){
    const words=clean(text).split(' ');if(words.length<4)return null;
    let best=-1,len=0;
    for(let i=Math.floor(words.length/3);i<words.length;i++){
      const nw=N(words[i]);if(nw.length>=4&&!STOP[nw]&&nw.length>len){len=nw.length;best=i}
    }
    if(best<0){for(let i=0;i<words.length;i++){const nw=N(words[i]);if(nw.length>=4&&!STOP[nw]){best=i;break}}}
    if(best<0)return null;
    const ans=words[best];words[best]='_____';
    return{text:words.join(' '),ans:ans};
  }
  function kwFromTafsir(t){
    const cnt={},order=[];toks(t).forEach(function(w){if(w.length<4||STOP[w])return;const s=stem(w);if(s.length<3)return;if(!cnt[s]){cnt[s]=0;order.push(s)}cnt[s]++});
    return order.sort(function(a,b){return cnt[b]-cnt[a]||order.indexOf(a)-order.indexOf(b)}).slice(0,14);
  }
  function lessonBac(id){return BAC[id]||null}
  function prepare(id){
    const l=schLes(id),b=lessonBac(id);if(!l||!b)return Promise.resolve(null);
    const ev=l.ev||[],vs=ev.filter(function(e){return e[0]==='q'&&e[1].indexOf('…')<0&&e[1].indexOf('...')<0}),hs=ev.filter(function(e){return e[0]!=='q'&&e[1].indexOf('…')<0&&e[1].indexOf('...')<0&&!/^حديث/.test(e[1])});
    return loadTF('muy').catch(function(){return null}).then(function(T){
      const tasks=[],E1='التمرين الأول: النصوص الشرعية',E2='التمرين الثاني: المفاهيم',E3='الوضعية الإدماجية';
      function tafsir(e){
        if(!T)return;const r=parseRef(e[2]);if(!r)return;const tx=(T[r.s-1]||[])[r.a-1];if(!tx)return;
        tasks.push({ex:E1,k:'tf',w:2,quote:clean(e[1]),ref:e[2],model:tx,kw:kwFromTafsir(tx),q:'فسّر الآية بأسلوبك مبيّنًا معناها الإجمالي.'});
      }
      if(vs[0]){const c=mkCloze(vs[0][1]);if(c)tasks.push({ex:E1,k:'cl',w:1,text:c.text,ans:c.ans,ref:vs[0][2],q:'أكمل الآية بالكلمة الناقصة.'});tafsir(vs[0])}
      if(hs[0]){const c=mkCloze(hs[0][1]);if(c)tasks.push({ex:E1,k:'cl',w:1,text:c.text,ans:c.ans,ref:hs[0][2],q:'أكمل الحديث بالكلمة الناقصة.'})}
      if(vs[1])tafsir(vs[1]);
      if(b.mt)tasks.push({ex:E2,k:'mt',w:2,q:b.mt[0],pairs:b.mt[1]});
      if(b.ord)tasks.push({ex:E2,k:'ord',w:1,q:b.ord[0],items:b.ord[1]});
      if(b.sit)tasks.push({ex:E3,k:'w',w:5,ctx:b.sit[0],q:b.sit[1],pts:b.sit[2],model:b.sit[3]});
      return tasks;
    });
  }
  function start(id){
    prepare(id).then(function(tasks){
      if(!tasks||!tasks.length){toast('لا تمارين لهذا الدرس بعد.');return}
      BX={id:id,title:schLes(id).t,tasks:tasks,i:0,earned:0,max:tasks.reduce(function(a,t){return a+t.w},0),res:[],checked:false,fb:null,ord:[]};
      openOverlay();render();
    });
  }
  function startMock(){
    const ls=shuffle(SCH.filter(function(l){return BAC[l.id]})).slice(0,3);
    Promise.all(ls.map(function(l){return prepare(l.id)})).then(function(arr){
      const tasks=[];arr.forEach(function(ts,i){(ts||[]).forEach(function(t){if(t.k==='mt'||t.k==='w'){const c=Object.assign({},t);c.ex=ls[i].t+' — '+t.ex;tasks.push(c)}})});
      BX={id:'mock',title:'ورقة تجريبية على نمط الباكالوريا',tasks:tasks,i:0,earned:0,max:tasks.reduce(function(a,t){return a+t.w},0),res:[],checked:false,fb:null,ord:[]};
      openOverlay();render();
    });
  }
  function lines(a){return a.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')}
  function render(){
    const x=BX;if(!x)return;if(x.i>=x.tasks.length)return finish();
    const t=x.tasks[x.i],pct=Math.round(x.i/x.tasks.length*100);
    let h='<div class="ltop"><button class="xbtn" data-bx="quit" aria-label="إغلاق">'+IC.x+'</button><div class="bar" role="progressbar" aria-valuenow="'+pct+'"><i style="width:'+pct+'%"></i></div><div class="chip"><span>'+(x.i+1)+'/'+x.tasks.length+'</span></div></div><div class="lmain">'+
      '<small class="muted">'+esc(x.title)+'</small><h3 class="bxex">'+esc(t.ex)+'</h3>';
    if(t.k==='cl'){
      h+='<div class="card"><p class="bxq">'+esc(t.text)+'</p><small class="muted">['+esc(t.ref)+']</small></div><p><b>'+esc(t.q)+'</b></p>'+
        '<input id="bxin" class="bxin" autocomplete="off" placeholder="'+esc(g3(['اكتب الكلمة الناقصة','Type the missing word','Écrivez le mot manquant']))+'" '+(x.checked?'disabled value="'+esc(x.fb.val)+'"':'')+'>';
    }else if(t.k==='tf'){
      h+='<div class="card"><p class="bxq">'+esc(t.quote)+'</p><small class="muted">['+esc(t.ref)+']</small></div><p><b>'+esc(t.q)+'</b></p>'+
        '<textarea id="bxin" class="bxin" rows="5" placeholder="'+esc(g3(['اكتب تفسيرك هنا…','Write your explanation…','Écrivez votre explication…']))+'" '+(x.checked?'disabled':'')+'>'+(x.checked?esc(x.fb.val):'')+'</textarea>';
    }else if(t.k==='w'){
      h+='<div class="card"><small class="muted">الوضعية</small><p class="bxq" style="margin:4px 0 0">'+esc(t.ctx)+'</p></div><p><b>'+esc(t.q)+'</b></p>'+
        '<textarea id="bxin" class="bxin" rows="7" placeholder="'+esc(g3(['اكتب إجابتك مرتبة في نقاط أو فقرة…','Write your answer…','Rédigez votre réponse…']))+'" '+(x.checked?'disabled':'')+'>'+(x.checked?esc(x.fb.val):'')+'</textarea>';
    }else if(t.k==='mt'){
      if(!t.opts)t.opts=shuffle(t.pairs.map(function(p){return p[1]}));
      h+='<p><b>'+esc(t.q)+'</b></p><div style="display:grid;gap:10px">'+t.pairs.map(function(p,i){
        const f=x.checked&&x.fb.rows[i];
        return '<div class="card bxmt"><b>'+esc(p[0])+'</b><select id="bxs'+i+'" '+(x.checked?'disabled':'')+'><option value="">— اختر —</option>'+t.opts.map(function(o){return '<option value="'+esc(o)+'"'+(f&&f.v===o?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>'+(f?'<small class="'+(f.ok?'sch-good':'sch-bad')+'">'+(f.ok?'✓':'✗ '+esc(p[1]))+'</small>':'')+'</div>'}).join('')+'</div>';
    }else if(t.k==='ord'){
      if(!t.shuf)t.shuf=shuffle(t.items.map(function(s,i){return{s:s,i:i}}));
      h+='<p><b>'+esc(t.q)+'</b></p><div class="card" style="min-height:56px"><ol class="bxol">'+x.ord.map(function(i){return '<li>'+esc(t.items[i])+'</li>'}).join('')+'</ol>'+(x.ord.length?'':'<small class="muted">اضغط على العناصر بالترتيب الصحيح</small>')+'</div>'+
        '<div style="display:grid;gap:8px;margin-top:8px">'+t.shuf.filter(function(o){return x.ord.indexOf(o.i)<0}).map(function(o){return '<button class="opt" data-bx="o:'+o.i+'" '+(x.checked?'disabled':'')+'><span>'+esc(o.s)+'</span></button>'}).join('')+'</div>'+
        (x.ord.length&&!x.checked?'<button class="btn ghost" style="margin-top:8px" data-bx="oreset">مسح الترتيب</button>':'');
    }
    if(x.checked){
      const f=x.fb;
      h+='<div class="card bxfb '+(f.s>=.99?'ok':f.s>0?'part':'bad')+'"><b>'+(f.s>=.99?'أحسنت':f.s>0?'إجابة جزئية':'تحتاج إلى مراجعة')+' — '+(Math.round(f.s*t.w*10)/10)+' / '+t.w+'</b>'+f.html+'</div>';
    }
    h+='</div><div class="lfoot"><div class="in">'+(x.checked?'<button class="btn" data-bx="next">'+(x.i+1>=x.tasks.length?'النتيجة':'متابعة')+'</button>':'<button class="btn" data-bx="check">تحقق</button>')+'</div></div>';
    $('#lesson').innerHTML=h;
    const el=$('#bxin');if(el&&!x.checked)setTimeout(function(){try{el.focus()}catch(e){}},50);
  }
  function check(){
    const x=BX,t=x.tasks[x.i];if(x.checked)return;let s=0,html='',val='',rows;
    if(t.k==='cl'){
      val=($('#bxin').value||'').trim();if(!val){toast('اكتب إجابتك أولًا');return}
      s=N(val)===N(t.ans)?1:0;html='<p>الكلمة الصحيحة: <b>'+esc(t.ans)+'</b></p>';
    }else if(t.k==='tf'||t.k==='w'){
      val=($('#bxin').value||'').trim();if(!val){toast('اكتب إجابتك أولًا');return}
      if(t.k==='tf'){
        const ut={};toks(val).forEach(function(w){ut[stem(w)]=1});
        const hit=t.kw.filter(function(k){return ut[k]}),need=Math.max(3,Math.ceil(t.kw.length*.35));
        s=toks(val).length<4?0:Math.min(1,hit.length/need);
        html='<p>غطّيتَ <b>'+hit.length+'</b> من أصل <b>'+t.kw.length+'</b> كلمة مفتاحية من التفسير.'+(toks(val).length<4?' (الإجابة قصيرة جدًا)':'')+'</p><p class="muted" style="font-size:.85rem">الفحص آلي بالكلمات؛ قد تكون إجابتك صحيحة بصياغة أخرى.</p><details open><summary><b>التفسير الميسر (النموذج)</b></summary><p>'+esc(t.model)+'</p></details>';
      }else{
        const na=N(val),hits=t.pts.map(function(p){return p[0].split('|').some(function(k){k=N(k);return k&&na.indexOf(k)>=0})}),n=hits.filter(Boolean).length,need=Math.max(2,Math.ceil(t.pts.length*.75));
        s=Math.min(1,n/need);
        html='<ul class="bxpts">'+t.pts.map(function(p,i){return '<li class="'+(hits[i]?'sch-good':'sch-bad')+'">'+(hits[i]?'✓ ':'✗ ')+esc(p[1])+'</li>'}).join('')+'</ul><p class="muted" style="font-size:.85rem">الفحص آلي بالكلمات المفتاحية؛ قارن إجابتك بالنموذج.</p><details open><summary><b>الإجابة النموذجية</b></summary><p>'+esc(t.model)+'</p></details>';
      }
    }else if(t.k==='mt'){
      rows=t.pairs.map(function(p,i){const v=($('#bxs'+i)||{}).value||'';return{v:v,ok:v===p[1]}});
      if(rows.some(function(r){return!r.v})){toast('أكمل جميع الأزواج');return}
      s=rows.filter(function(r){return r.ok}).length/t.pairs.length;html='';
    }else if(t.k==='ord'){
      if(x.ord.length<t.items.length){toast('رتّب كل العناصر');return}
      const okn=x.ord.filter(function(i,p){return i===p}).length;s=okn===t.items.length?1:okn/t.items.length*0.5;
      html='<p>الترتيب الصحيح:</p><ol class="bxol">'+t.items.map(function(i){return '<li>'+esc(i)+'</li>'}).join('')+'</ol>';
    }
    x.checked=true;x.fb={s:s,html:html,val:val,rows:rows};x.earned+=s*t.w;x.res.push({ex:t.ex,w:t.w,e:s*t.w});
    try{SND[s>=.5?'correct':'wrong']()}catch(e){}
    try{if(s>=.5)act('q')}catch(e){}
    render();
  }
  function finish(){
    const x=BX;if(!x)return;
    const sc=Math.round(x.earned/x.max*40)/2,sch=schS();
    if(x.id!=='mock'){const k='x:'+x.id;if(sch[k]===undefined||sc>sch[k])sch[k]=sc}
    try{save()}catch(e){}
    const mood=sc>=16?'wow':sc>=10?'cheer':'sad',lab=sc>=16?'ممتاز، ما شاء الله!':sc>=14?'جيد جدًا':sc>=10?'مقبول، واصل التدرب':'تحتاج إلى مراجعة الدرس';
    const by={};x.res.forEach(function(r){by[r.ex]=by[r.ex]||{e:0,w:0};by[r.ex].e+=r.e;by[r.ex].w+=r.w});
    $('#lesson').innerHTML='<div class="ltop"><button class="xbtn" data-act="leave" aria-label="إغلاق">'+IC.x+'</button><h2 style="flex:1;font-size:1.05rem">'+esc(x.title)+'</h2></div><div class="lmain">'+
      '<div class="card" style="text-align:center;display:grid;gap:6px"><div style="display:grid;place-items:center">'+hoopoe(mood,84)+'</div><div class="bigs">'+String(sc).replace(/\.0$/,'')+' / 20</div><b>'+lab+'</b></div>'+
      '<section class="sec"><h2>تفصيل النقاط</h2>'+Object.keys(by).map(function(k){return '<div class="card" style="display:flex;justify-content:space-between;gap:8px"><span>'+esc(k)+'</span><b>'+(Math.round(by[k].e*10)/10)+' / '+by[k].w+'</b></div>'}).join('')+'</section>'+
      '<div style="display:grid;gap:8px;margin:12px 0 90px"><button class="btn" data-bx="again">أعد التمرين</button><button class="btn ghost" data-act="leave">رجوع</button></div></div>';
    try{SND[sc>=10?'correct':'wrong']()}catch(e){}
  }
  /* ---- صفحة تمارين الباك داخل المدرسية ---- */
  function bacPage(){
    const s=schS();
    return '<section class="sec"><h2>تمارين على نمط الباكالوريا</h2><div class="card" style="display:grid;gap:8px"><p class="muted" style="margin:0">لكل درس: أكمل الآية والحديث، فسّر الآية بأسلوبك، حلّ وضعية إدماجية، وصل وارتّب. الفحص آلي بالكلمات المفتاحية مع نموذج للإجابة.</p><button class="btn gold" data-bx="mock">ورقة تجريبية (3 دروس عشوائية)</button></div></section>'+
      SCHTRI.map(function(T){return '<section class="sec"><h2>'+esc(T.t[0])+'</h2><div style="display:grid;gap:8px">'+schOf(T.n).filter(function(l){return BAC[l.id]}).map(function(l){const b=s['x:'+l.id];
        return '<button class="card sch-it" data-bx="start:'+l.id+'"><span class="sch-n'+(b!==undefined&&b>=10?' on':'')+'">'+(b!==undefined?String(b).replace(/\.0$/,''):'؟')+'</span><span class="sch-t">'+esc(l.t)+'</span></button>'}).join('')+'</div></section>'}).join('');
  }
  const _ps=pageSchool;
  pageSchool=function(){
    const t=SCHTAB;if(t==='bac')SCHTAB='les';
    try{_ps()}finally{SCHTAB=t}
    const seg=document.querySelector('#page .seg');if(!seg)return;
    seg.insertAdjacentHTML('beforeend','<button data-sc="tab:bac" aria-pressed="'+(t==='bac')+'">'+esc(g3(['تمارين الباك','Bac practice','Exercices Bac']))+'</button>');
    if(t==='bac'){
      seg.querySelectorAll('button').forEach(function(b){if(b.dataset.sc!=='tab:bac')b.setAttribute('aria-pressed','false')});
      while(seg.nextSibling)seg.nextSibling.remove();
      seg.insertAdjacentHTML('afterend',bacPage());
    }
  };
  const _rl=renderSchLesson;
  renderSchLesson=function(id){
    _rl(id);
    if(!BAC[id])return;
    const b=document.querySelector('#lesson [data-sc="ex:'+id+'"]');
    if(b)b.insertAdjacentHTML('beforebegin','<button class="btn gold" data-bx="start:'+id+'">'+esc(g3(['تمارين على نمط الباكالوريا','Bac-style exercises','Exercices type Bac']))+'</button>');
  };
  const _cl=closeOverlay;
  closeOverlay=function(){BX=null;_cl()};
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-bx]');if(!b||b.disabled)return;
    const v=b.dataset.bx,a=v.split(':')[0],p=v.split(':').slice(1).join(':');
    if(a==='start')return start(p);
    if(a==='mock')return startMock();
    if(!BX)return;
    if(a==='check')return check();
    if(a==='next'){BX.i++;BX.checked=false;BX.fb=null;BX.ord=[];return render()}
    if(a==='o'){if(!BX.checked){BX.ord.push(+p);render()}return}
    if(a==='oreset'){BX.ord=[];return render()}
    if(a==='again'){return BX.id==='mock'?startMock():start(BX.id)}
    if(a==='quit'){if(confirm('هل تريد إنهاء التمرين؟ ستُحتسب النتيجة بما أنجزت.'))return finish()}
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&BX&&e.target&&e.target.id==='bxin'&&e.target.tagName==='INPUT'){e.preventDefault();check()}
  });
})();
