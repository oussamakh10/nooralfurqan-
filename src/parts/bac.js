/* ===== تمارين على نمط الباكالوريا: أكمل النص، تفسير الآية، وضعية إدماجية، توصيل، ترتيب ===== */
(function(){
  let BX=null,TM=null;
  const AR09={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'};
  function N(s){
    return String(s||'').replace(/[٠-٩]/g,function(c){return AR09[c]}).replace(/[ً-ٰٟۖ-ۭـ]/g,'')
      .replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/ء/g,'')
      .replace(/[^ء-ي0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  }
  const STOP={};('من في على الى عن ان ان ما لا لم لن قد كل هذا هذه ذلك التي الذي الذين اللذين هو هي هم هن انه انها كان كانت يكون ثم او بل حتي اذا اذ اي ايها يا ولا وما ومن وان وقد فان فيه فيها منه منها له لها لهم عليه عليها عليهم الله ربك ربكم ربهم انما الا الي فيهم بين بعد قبل عند مع غير ولم ولن بها به بهم وهو وهي ولهم'.split(' ')).forEach(function(w){STOP[w]=1});
  function stem(w){w=w.replace(/^(وال|بال|فال|كال|لل|ال)/,'');return w.length>4?w.slice(0,4):w}
  function lev(a,b){if(Math.abs(a.length-b.length)>1)return 9;const m=[];for(let i=0;i<=a.length;i++){m[i]=[i]}for(let j=1;j<=b.length;j++)m[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length]}
  function near(a,b){a=a.replace(/^(وال|بال|فال|كال|لل|ال)/,'');b=b.replace(/^(وال|بال|فال|كال|لل|ال)/,'');if(!a||!b)return false;if(a===b)return true;if(a.length>=4&&b.length>=4&&(a.indexOf(b)>=0||b.indexOf(a)>=0))return true;const k=Math.min(a.length,b.length,4);if(k>=3&&a.slice(0,k)===b.slice(0,k)&&Math.abs(a.length-b.length)<=3)return true;return a.length>=4&&lev(a,b)<=1}
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
  const VERBS=[['استخرج','انقل من النص دون تغيير ما طُلب'],['اشرح / فسّر','وضّح المعنى بأسلوبك'],['علّل','اذكر السبب أو الحكمة'],['استنتج','توصّل إلى حكم أو فائدة من المعطيات'],['بيّن','أظهر الفكرة مع دليلها'],['عرّف','حدّد المفهوم بإيجاز'],['قارن','أبرز أوجه الشبه والاختلاف'],['ناقش','اعرض الرأي وما يقابله ثم رجّح بدليل'],['وظّف','استعمل معارفك في حلّ الوضعية']];
  const CRIT='<p class="muted" style="font-size:.85rem;margin:8px 0 0">سلّم تنقيط الوضعية: صحة المعارف وتوظيفها (5/8) • انسجام الإجابة ومنهجيتها (1.5) • سلامة اللغة (1) • الإخراج والترتيب (0.5). قارن إجابتك بالنموذج وقيّمها بنفسك.</p>';
  function SA(t,f){
    if(f.sa)return '<p class="muted" style="margin:8px 0 0;font-size:.85rem">✓ اعتُمد تقييمك الذاتي.</p>';
    let o='';for(let v=0;v<=t.w;v+=.5)o+='<option value="'+v+'"'+(Math.abs(v-Math.round(f.s*t.w*2)/2)<.01?' selected':'')+'>'+v+'</option>';
    return '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px"><span>قيّم نفسك من '+t.w+':</span><select id="bxsa" aria-label="علامتك الذاتية">'+o+'</select><button class="btn ghost" data-bx="sa">اعتمد</button></div>';
  }
  const TY={cl:'إكمال النصوص',tf:'تفسير الآيات',w:'الوضعيات الإدماجية',mt:'التوصيل بين المفاهيم',ord:'الترتيب'};
  function weak(){
    const H=(schS().xe||[]).slice(-10),a={};H.forEach(function(h){for(const k in (h.k||{})){a[k]=a[k]||[0,0];a[k][0]+=h.k[k][0];a[k][1]+=h.k[k][1]}});
    let m=null;for(const k in a){if(a[k][1]<2)continue;const p=a[k][0]/a[k][1];if(!m||p<m.p)m={k:k,p:p}}return m;
  }
  function drill(k){
    const ls=shuffle(SCH.filter(function(l){return BAC[l.id]})).slice(0,5);
    Promise.all(ls.map(function(l){return prepare(l.id)})).then(function(arr){
      const tasks=[];arr.forEach(function(ts,i){(ts||[]).forEach(function(t){if(t.k===k){const c=Object.assign({},t);c.ex=ls[i].t+' — '+t.ex;tasks.push(c)}})});
      if(!tasks.length){toast('لا تمارين من هذا النوع');return}
      BX={id:'drill',title:'تدريب على نقطة ضعفك: '+TY[k],tasks:tasks.slice(0,5),i:0,earned:0,max:0,res:[],checked:false,fb:null,ord:[]};BX.max=BX.tasks.reduce(function(a,t){return a+t.w},0);
      openOverlay();render();
    });
  }
  function resume(){
    const r=S.bxr;if(!r||!r.tasks)return;BX=r;
    if(BX.exam){if(Date.now()>=BX.exam.end){openOverlay();return finish()}if(TM)clearInterval(TM);TM=setInterval(tick,1000)}
    openOverlay();render();tick();
  }
  function startExam(n){
    const ls=shuffle(SCH.filter(function(l){return BAC[l.id]&&BAC[l.id].sit})),A=ls[0],B=ls[1];if(!A||!B)return;
    Promise.all([prepare(A.id),prepare(B.id)]).then(function(r){
      const p1=(r[0]||[]).filter(function(t){return t.k!=='w'}),w=(r[1]||[]).filter(function(t){return t.k==='w'})[0];
      if(!p1.length||!w){toast('تعذّر إنشاء الموضوع، حاول مجددًا.');return}
      const tot=p1.reduce(function(a,t){return a+t.w},0),P1='الجزء الأول (12 نقطة) — الوقت المقترح 50 د',P2='الجزء الثاني: الوضعية الإدماجية (8 نقاط) — الوقت المقترح 40 د',tasks=[];
      p1.forEach(function(t){const c=Object.assign({},t);c.w=Math.round(t.w/tot*12*100)/100;c.ex=P1;tasks.push(c)});
      const c=Object.assign({},w);c.w=8;c.ex=P2;tasks.push(c);
      BX={id:'exam',exam:{end:Date.now()+90*60000},title:'نموذج امتحان بكالوريا — الموضوع '+(n===2?'الثاني':'الأول')+' ('+A.t+' / '+B.t+')',tasks:tasks,i:0,earned:0,max:20,res:[],checked:false,fb:null,ord:[]};
      if(TM)clearInterval(TM);TM=setInterval(tick,1000);
      openOverlay();render();tick();
    });
  }
  function tick(){
    if(!BX||!BX.exam){if(TM){clearInterval(TM);TM=null}return}
    const r=Math.max(0,Math.round((BX.exam.end-Date.now())/1000)),el=document.getElementById('bxtm');
    if(el){el.textContent=String(Math.floor(r/60)).padStart(2,'0')+':'+String(r%60).padStart(2,'0');el.style.color=r<600?'var(--bad,#c0392b)':''}
    if(r<=0){toast('انتهى وقت الامتحان');finish()}
  }
  function examBox(){
    const H=(schS().xe||[]),avg=H.length?Math.round(H.reduce(function(a,h){return a+h.s},0)/H.length*10)/10:null,last=H.slice(-5).reverse();
    return '<section class="sec"><h2>'+esc(g3(['نموذج امتحان بكالوريا','Bac mock exam','Examen blanc du Bac']))+'</h2><div class="card" style="display:grid;gap:8px">'+
      '<p class="muted" style="margin:0">موضوعان للاختيار، مدة 1س30د بمؤقّت: الجزء الأول (12 نقطة) نصوص شرعية وأسئلة مفاهيم، والجزء الثاني (8 نقاط) وضعية إدماجية. تُحتسب العلامة من 20 وتُحفظ في سجلّك.</p>'+
      (S.bxr&&S.bxr.tasks&&S.bxr.id!=='mock'&&!(S.bxr.exam&&Date.now()>=S.bxr.exam.end)?'<button class="btn" data-bx="resume">تابع من حيث توقفت: '+esc(S.bxr.title)+'</button>':'')+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button class="btn gold" data-bx="exam:1">الموضوع الأول</button><button class="btn gold" data-bx="exam:2">الموضوع الثاني</button></div>'+
      (avg!==null?'<div class="muted" style="font-size:.9rem">المعدّل: <b>'+String(avg).replace(/\.0$/,'')+' / 20</b> في '+H.length+' محاولة — آخر النتائج: '+last.map(function(h){return String(h.s).replace(/\.0$/,'')}).join(' • ')+'</div>':'')+
      (function(){const w=weak();return w?'<div class="card" style="display:grid;gap:6px"><span>نقطة ضعفك في آخر امتحاناتك: <b>'+esc(TY[w.k])+'</b> ('+Math.round(w.p*100)+'%)</span><button class="btn ghost" data-bx="drill:'+w.k+'">تدرّب عليها الآن</button></div>':''})()+
      '<details><summary><b>معجم أفعال الأمر في الأسئلة</b></summary><ul style="margin:8px 0 0;padding-inline-start:18px;line-height:1.9">'+VERBS.map(function(v){return '<li><b>'+esc(v[0])+'</b>: '+esc(v[1])+'</li>'}).join('')+'</ul></details>'+
      '<details><summary><b>نصائح للتعامل مع الورقة</b></summary><ul style="margin:8px 0 0;padding-inline-start:18px;line-height:1.9"><li>اقرأ الموضوعين وابدأ بما تتقنه.</li><li>وزّع الوقت: 50 د للجزء الأول و40 د للوضعية.</li><li>اكتب الآيات والأحاديث بدقة ثم علّق عليها.</li><li>في الوضعية: افهم المعطيات، استحضر المعارف، ثم اربط بينها في فقرة مترابطة.</li><li>خصّص 10 د للمراجعة والإخراج.</li></ul></details></div></section>';
  }
  function lines(a){return a.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')}
  function render(){
    const x=BX;if(!x)return;if(x.i>=x.tasks.length)return finish();
    const t=x.tasks[x.i],pct=Math.round(x.i/x.tasks.length*100);
    let h='<div class="ltop"><button class="xbtn" data-bx="quit" aria-label="إغلاق">'+IC.x+'</button><div class="bar" role="progressbar" aria-valuenow="'+pct+'"><i style="width:'+pct+'%"></i></div><div class="chip"><span>'+(x.i+1)+'/'+x.tasks.length+'</span>'+(x.exam?'<span id="bxtm" role="timer" aria-label="الوقت المتبقي" style="margin-inline-start:8px;font-variant-numeric:tabular-nums"></span>':'')+'</div></div><div class="lmain">'+
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
      h+='<div class="card bxfb '+(f.s>=.99?'ok':f.s>0?'part':'bad')+'"><b>'+(f.s>=.99?'أحسنت':f.s>0?'إجابة جزئية':'تحتاج إلى مراجعة')+' — '+(Math.round(f.s*t.w*10)/10)+' / '+t.w+'</b>'+f.html+(t.k==='w'?(x.exam?CRIT:'')+SA(t,f):'')+'</div>';
    }
    h+='</div><div class="lfoot"><div class="in">'+(x.checked?'<button class="btn" data-bx="next">'+(x.i+1>=x.tasks.length?'النتيجة':'متابعة')+'</button>':'<button class="btn" data-bx="check">تحقق</button>')+'</div></div>';
    $('#lesson').innerHTML=h;
    const el=$('#bxin');if(el&&!x.checked&&x.dr&&x.dr[x.i]&&!el.value)el.value=x.dr[x.i];
    try{S.bxr=JSON.parse(JSON.stringify(x));save()}catch(e){}
    if(el&&!x.checked)setTimeout(function(){try{el.focus()}catch(e){}},50);
  }
  function check(){
    const x=BX,t=x.tasks[x.i];if(x.checked)return;let s=0,html='',val='',rows;
    if(t.k==='cl'){
      val=($('#bxin').value||'').trim();if(!val){toast('اكتب إجابتك أولًا');return}
      s=N(val)===N(t.ans)?1:(near(N(val),N(t.ans))?1:0);html='<p>الكلمة الصحيحة: <b>'+esc(t.ans)+'</b></p>';
    }else if(t.k==='tf'||t.k==='w'){
      val=($('#bxin').value||'').trim();if(!val){toast('اكتب إجابتك أولًا');return}
      if(t.k==='tf'){
        const uw=toks(val);
        const hit=t.kw.filter(function(k){return uw.some(function(w){return near(stem(w),k)||near(w,k)})}),need=Math.max(2,Math.ceil(t.kw.length*.28));
        s=uw.length<4?0:Math.min(1,hit.length/need);if(uw.length>=4&&hit.length>=2&&s<.5)s=.5;
        html='<p>غطّيتَ <b>'+hit.length+'</b> من أصل <b>'+t.kw.length+'</b> كلمة مفتاحية من التفسير.'+(toks(val).length<4?' (الإجابة قصيرة جدًا)':'')+'</p><p class="muted" style="font-size:.85rem">الفحص آلي بالكلمات؛ قد تكون إجابتك صحيحة بصياغة أخرى.</p><details open><summary><b>التفسير الميسر (النموذج)</b></summary><p>'+esc(t.model)+'</p></details>';
      }else{
        const na=N(val),ua=na.split(' ').filter(Boolean),hits=t.pts.map(function(p){return p[0].split('|').some(function(k){k=N(k);return k&&(na.indexOf(k)>=0||k.split(' ').every(function(kw){return ua.some(function(w){return near(w,kw)})}))})}),n=hits.filter(Boolean).length,need=Math.max(2,Math.ceil(t.pts.length*.6));
        s=Math.min(1,n/need);if(n>=1&&ua.length>=8&&s<.5)s=.5;
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
    x.checked=true;x.fb={s:s,html:html,val:val,rows:rows};x.earned+=s*t.w;x.res.push({ex:t.ex,w:t.w,e:s*t.w,k:t.k});
    if(t.k==='cl'&&s<1){try{const ws=clean(t.text).split(' ').filter(function(w){return N(w).length>=3&&w!=='_____'&&N(w)!==N(t.ans)}).filter(function(w,i,a){return a.indexOf(w)===i});['الصلاة','الإيمان','التقوى','الصبر'].forEach(function(w){if(ws.length<3)ws.push(w)});const q={q:'أكمل: '+t.text.replace('_____','…'),c:t.ans,w:shuffle(ws).slice(0,3),n:t.ref};S.sr[hash(q.q)]={b:0,d:addDays(1),q:q}}catch(e){}}
    try{SND[s>=.5?'correct':'wrong']()}catch(e){}
    try{if(s>=.5)act('q')}catch(e){}
    render();
  }
  function finish(){
    const x=BX;if(!x)return;
    if(TM){clearInterval(TM);TM=null}
    const sc=Math.round(x.earned/x.max*40)/2,sch=schS();
    if(x.exam){const H=(sch.xe=sch.xe||[]),kk={};x.res.forEach(function(r){kk[r.k]=kk[r.k]||[0,0];kk[r.k][0]+=r.e;kk[r.k][1]+=r.w});H.push({d:Date.now(),s:sc,k:kk});if(H.length>20)H.shift()}else if(x.id!=='mock'){const k='x:'+x.id;if(sch[k]===undefined||sc>sch[k])sch[k]=sc}
    delete S.bxr;try{save()}catch(e){}
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
    return examBox()+'<section class="sec"><h2>تمارين على نمط الباكالوريا</h2><div class="card" style="display:grid;gap:8px"><p class="muted" style="margin:0">لكل درس: أكمل الآية والحديث، فسّر الآية بأسلوبك، حلّ وضعية إدماجية، وصل وارتّب. الفحص آلي بالكلمات المفتاحية مع نموذج للإجابة.</p><button class="btn gold" data-bx="mock">ورقة تجريبية (3 دروس عشوائية)</button></div></section>'+
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
  closeOverlay=function(){BX=null;if(TM){clearInterval(TM);TM=null}_cl()};
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-bx]');if(!b||b.disabled)return;
    const v=b.dataset.bx,a=v.split(':')[0],p=v.split(':').slice(1).join(':');
    if(a==='start')return start(p);
    if(a==='mock')return startMock();
    if(a==='exam')return startExam(+p);
    if(a==='resume')return resume();
    if(a==='drill')return drill(p);
    if(!BX)return;
    if(a==='check')return check();
    if(a==='next'){BX.i++;BX.checked=false;BX.fb=null;BX.ord=[];return render()}
    if(a==='o'){if(!BX.checked){BX.ord.push(+p);render()}return}
    if(a==='sa'){const t=BX.tasks[BX.i],v=+($('#bxsa')||{}).value,f=BX.fb,old=f.s*t.w;BX.earned+=v-old;BX.res[BX.res.length-1].e=v;f.s=v/t.w;f.sa=1;return render()}
    if(a==='oreset'){BX.ord=[];return render()}
    if(a==='again'){return BX.exam?startExam(1):BX.id==='drill'?drill(BX.tasks[0].k):BX.id==='mock'?startMock():start(BX.id)}
    if(a==='quit'){if(confirm('هل تريد إنهاء التمرين؟ ستُحتسب النتيجة بما أنجزت.'))return finish()}
  });
  document.addEventListener('input',function(e){if(BX&&e.target&&e.target.id==='bxin'){(BX.dr=BX.dr||{})[BX.i]=e.target.value;try{S.bxr=JSON.parse(JSON.stringify(BX));save()}catch(x){}}});
  document.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&BX&&e.target&&e.target.id==='bxin'&&e.target.tagName==='INPUT'){e.preventDefault();check()}
  });
})();
