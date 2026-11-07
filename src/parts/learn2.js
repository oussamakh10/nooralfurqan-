/* ===== الدروس: منهج مدرسي — القائمة، المقدّمة، الأسئلة، بطاقة النتيجة ===== */
(function(){
  const strip=function(s){return String(s==null?'':s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim()};
  const LET=['أ','ب','ج','د','هـ','و'];
  const mins=function(n){return Math.max(1,Math.round(n*0.5))};
  function lessonPos(l){const u=DATA[l.unit];const i=u?u.lessons.findIndex(function(x){return x.id===l.id}):-1;return {u:u,ui:l.unit,i:i,n:u?u.lessons.length:0}}

  /* ---------- قائمة الدروس ---------- */
  const _pl=pageLearn;
  pageLearn=function(){
    _pl();
    if(typeof LTAB!=='undefined'&&LTAB!=='path')return;
    const pg=document.getElementById('page');if(!pg||pg.querySelector('.ln-hero'))return;
    try{
      const dn=doneN(),tot=ALL.length,cur=ALL.find(function(l){return !S.done[l.id]});
      const pct=Math.round(dn/tot*100);
      const tools=pg.querySelectorAll('.lgrid button');
      const tl=document.createElement('div');tl.className='ln-tools';
      tools.forEach(function(b){if(b.dataset.lesson)return;b.className='ln-tool';tl.appendChild(b)});
      const hero=document.createElement('section');hero.className='ln-hero';
      hero.innerHTML='<div class="ln-ring" style="--p:'+pct+'"><b>'+N(pct)+'%</b></div>'+
        '<div class="ln-ht"><h2>المنهج الدراسي</h2><p>أتممت '+N(dn)+' من '+N(tot)+' درسًا في '+N(DATA.length)+' وحدة</p></div>'+
        (cur?'<button class="ln-go" data-lesson="'+cur.id+'"><span><small>الدرس التالي</small><b>'+cur.title+'</b></span><i class="ln-pi" aria-hidden="true"></i></button>':'<p class="ln-done">ما شاء الله! أتممت كل الدروس.</p>');
      const seg=pg.querySelector('.lvseg');
      ['.say','.pbar','.lgrid'].forEach(function(s){pg.querySelectorAll(s).forEach(function(x){x.remove()})});
      const ref=pg.querySelector('.lvseg');
      (ref||pg.querySelector('section.unit')||pg.firstChild).insertAdjacentElement('beforebegin',hero);
      hero.insertAdjacentElement('afterend',tl);
      /* الوحدات */
      pg.querySelectorAll('section.unit').forEach(function(sec){
        const hb=sec.querySelector('.uh');if(!hb)return;
        const ui=+hb.getAttribute('data-unit'),u=DATA[ui];if(!u)return;
        const dd=unitDone(u),lk=unitLocked(ui);
        const ut=hb.querySelector('.ut');
        if(ut&&!ut.querySelector('.ln-pb'))ut.insertAdjacentHTML('beforeend','<span class="ln-pb"><i style="width:'+Math.round(dd/u.lessons.length*100)+'%"></i></span>');
        const un=hb.querySelector('.un');if(un)un.innerHTML='<small>الوحدة</small>'+N(ui+1);
        const path=sec.querySelector('.path');
        if(path){
          let h='<ol class="ln-ls">';
          u.lessons.forEach(function(l,li){
            const done=!!S.done[l.id],lock=!done&&li>0&&!S.done[u.lessons[li-1].id],isCur=!done&&!lock;
            const c=done?'done':isCur?'cur':'lock',nq=(l.qs||[]).length;
            h+='<li><button class="ln-row '+c+'" '+(lock?'disabled aria-label="'+l.title+' (مغلق)"':'data-lesson="'+l.id+'"')+'><span class="ln-no">'+(done?IC.check:N(li+1))+'</span><span class="ln-tt"><b>'+l.title+'</b><small>'+N(nq)+' سؤالًا · نحو '+N(mins(nq))+' د</small></span><span class="ln-st">'+(done?'مكتمل':isCur?'ابدأ':IC.lock)+'</span></button></li>';
          });
          path.outerHTML=h+'</ol>'+(dd===u.lessons.length?'<button class="ln-cert" data-cert="'+ui+'">🎓 شهادة الوحدة</button>':'');
        }
      });
    }catch(e){}
  };

  /* ---------- مقدّمة الدرس ---------- */
  const _rl=renderLesson;
  renderLesson=function(){
    if(L&&L.lesson&&!L._intro&&!L.review&&!L.placement&&!L.hifzTest&&L.solved===0&&ALL.indexOf(L.lesson)>=0){return renderIntro()}
    _rl();enhanceQ();
  };
  function renderIntro(){
    const l=L.lesson,p=lessonPos(l),qs=l.qs||[];
    const pts=[],seen={};
    qs.forEach(function(q){const t=strip(q.n);if(t&&!seen[t]&&pts.length<4){seen[t]=1;pts.push(t.length>130?t.slice(0,127)+'…':t)}});
    if(!pts.length)qs.slice(0,3).forEach(function(q){pts.push(strip(q.q))});
    const types={};qs.forEach(function(q){types[q.t||'mc']=1});
    $('#lesson').innerHTML='<div class="ltop"><button class="xbtn" data-act="leave" aria-label="رجوع">'+IC.x+'</button><div class="lt-t">'+(p.u?p.u.title:'')+'</div></div>'+
      '<div class="lmain li-main"><div class="li-hero"><div class="li-no"><small>الدرس</small>'+N(p.i+1)+'</div><h2>'+l.title+'</h2><p class="muted">من '+N(p.n)+' دروس في «'+(p.u?p.u.title:'')+'»</p></div>'+
      '<div class="li-stats"><div><b>'+N(qs.length)+'</b><span>سؤال</span></div><div><b>'+N(mins(qs.length))+'</b><span>دقائق</span></div><div><b>'+N(S.kids?99:5)+'</b><span>قلوب</span></div></div>'+
      '<h3 class="li-h">ما ستتعلّمه</h3><ul class="li-pts">'+pts.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul>'+
      '<h3 class="li-h">كيف يسير الدرس</h3><ol class="li-how"><li>تجيب عن الأسئلة واحدًا واحدًا.</li><li>بعد كل إجابة يظهر شرح مختصر.</li><li>الأسئلة الخاطئة تعود إليك في آخر الدرس.</li></ol></div>'+
      '<div class="lfoot"><div class="in"><button class="btn" data-lbegin="1">ابدأ الدرس</button></div></div>';
  }
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-lbegin]');if(!b||!L)return;
    L._intro=1;renderLesson();
  });

  /* ---------- شاشة السؤال ---------- */
  function enhanceQ(){
    try{
      const root=document.getElementById('lesson');if(!root||!L||L.review||L.placement)return;
      const q=root.querySelector('.qtext');
      if(q&&!root.querySelector('.lq-meta')&&L.lesson){
        const m=document.createElement('div');m.className='lq-meta';
        m.innerHTML='<span>'+L.lesson.title+'</span><span>سؤال '+N(Math.min(L.solved+1,L.total))+' من '+N(L.total)+'</span>';
        q.insertAdjacentElement('beforebegin',m);
      }
      root.querySelectorAll('.opt .k').forEach(function(k,i){k.textContent=LET[i]||k.textContent});
    }catch(e){}
  }

  /* ---------- بطاقة النتيجة ---------- */
  const _fl=finishLesson;
  finishLesson=function(){
    _fl();
    try{
      if(!L||L.review||L.hifzTest||!L.lesson)return;
      const acc=Math.max(0,Math.round((L.total/(L.total+L.wrongs))*100));
      const g=acc>=90?['ممتاز',3]:acc>=75?['جيد جدًا',2]:acc>=60?['جيد',1]:['مقبول',1];
      const nx=ALL.find(function(l){return !S.done[l.id]});window.__lacc=window.__lacc||{};window.__lacc[L.lesson.id]=acc;
      let st='';for(let i=1;i<=3;i++)st+='<span class="lr-s'+(i<=g[1]?' on':'')+'" style="animation-delay:'+(.15*i)+'s">★</span>';
      $('#lesson').innerHTML='<div class="lmain lr-main"><div class="mas">'+hoopoe('cheer',120)+'</div><p class="lr-k">تقرير الدرس</p><h2>'+L.lesson.title+'</h2>'+
        '<div class="lr-stars" aria-hidden="true">'+st+'</div><div class="lr-grade">التقدير: <b>'+g[0]+'</b></div>'+
        '<div class="lr-grid"><div><b>'+N(acc)+'%</b><span>دقة الإجابات</span></div><div><b>'+N(L.total)+'</b><span>سؤال</span></div><div><b>'+N(L.wrongs)+'</b><span>أخطاء</span></div><div><b>'+N(L.best)+'</b><span>أطول تتابع</span></div></div>'+
        '<p class="lr-pts">+'+N(L.gain)+' نقطة</p></div>'+
        '<div class="lfoot"><div class="in" style="display:grid;gap:8px">'+(nx?'<button class="btn" data-lesson="'+nx.id+'">الدرس التالي: '+nx.title+'</button>':'')+'<button class="btn ghost" data-lcert="'+L.lesson.id+'">🎓 شهادة الدرس</button><button class="btn ghost" data-act="leave">العودة إلى الدروس</button>'+'</div></div>';
    }catch(e){}
  };
})();
