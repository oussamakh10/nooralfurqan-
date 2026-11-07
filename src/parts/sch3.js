/* ===== المدرسية 3: واجهة الكتاب المدرسي + قارئ دروس معمّق ===== */
(function(){
  const STOP=['الذي','التي','الله','على','عليه','هذا','هذه','ذلك','وهو','وهي','كذلك','بين','عند','حيث','بعد','قبل','التي','الذين','منها','منه','فيها','فيه','يكون','تكون','أيضا','أيضًا','والتي','وذلك'];
  const mins=function(l){let w=0;l.sec.forEach(function(x){w+=x[0].split(' ').length;x[1].forEach(function(p){w+=p.split(' ').length})});(l.ev||[]).forEach(function(e){w+=String(e[1]).split(' ').length});return Math.max(2,Math.round(w/90))};
  const strip=function(w){return w.replace(/[«»"“”.,،:؛;()\[\]]/g,'')};
  function cloze(l,x){
    let best=null;
    x[1].forEach(function(p){
      if(p.length<28)return;const ws=p.split(' ');
      let bi=-1,bl=0;ws.forEach(function(w,i){const c=strip(w);if(i<1||c.length<5||STOP.indexOf(c)>=0||/[0-9a-zA-Z]/.test(c))return;if(c.length>bl){bl=c.length;bi=i}});
      if(bi>0&&(!best||p.length>best.p.length))best={p:p,ws:ws,i:bi};
    });
    if(!best)return '';
    const ans=strip(best.ws[best.i]);
    const parts=best.ws.map(function(w,i){return i===best.i?w.replace(ans,'<button class="sc3-cz" data-cz="'+esc(ans)+'" aria-label="كلمة مخفية، اضغط للكشف">••••••</button>'):esc(w)});
    return '<div class="sc3-chk"><b>تحقّق من فهمك</b><p>'+parts.join(' ')+'</p></div>';
  }
  function bullet(p){
    const m=p.match(/^([^:]{2,16}):\s*(.+)$/);
    return m?'<li><b class="sc3-lb">'+esc(m[1])+'</b> '+esc(m[2])+'</li>':'<li>'+esc(p)+'</li>';
  }
  /* ---------- القائمة ---------- */
  const _ps=pageSchool;
  pageSchool=function(){
    _ps();
    try{
      const root=document.getElementById('page');if(!root||root.querySelector('.sc3-hero')||root.querySelector('.sch-notice'))return;
      const s=schS(),tot=SCH.length,rd=SCH.filter(function(l){return s['r:'+l.id]}).length,pct=Math.round(rd/tot*100);
      const nxt=SCH.find(function(l){return !s['r:'+l.id]});
      const first=root.querySelector('section.sec');if(!first)return;
      const best=[s.bt1,s.bt2,s.bt3,s.bf].filter(function(v){return v!==undefined});
      const hero=document.createElement('section');hero.className='sc3-hero';
      hero.innerHTML='<div class="sc3-ht"><small>العلوم الإسلامية</small><h2>السنة الثالثة ثانوي</h2><p>جميع الشعب · '+N(tot)+' درسًا في 3 مقاطع</p></div>'+
        '<div class="sc3-ring" style="--p:'+pct+'"><b>'+N(pct)+'%</b></div>'+
        '<div class="sc3-st"><div><b>'+N(rd)+'</b><span>درسًا مقروءًا</span></div><div><b>'+N(tot-rd)+'</b><span>متبقٍّ</span></div><div><b>'+(best.length?N(Math.max.apply(null,best))+'/20':'—')+'</b><span>أفضل نتيجة</span></div></div>'+
        (nxt?'<button class="sc3-go" data-sc="open:'+nxt.id+'"><span><small>'+(rd?'تابع من حيث توقفت':'ابدأ أول درس')+'</small><b>'+esc(nxt.t)+'</b></span><i aria-hidden="true"></i></button>':'<p class="sc3-fin">ما شاء الله! قرأت كل الدروس. اختبر نفسك الآن.</p>');
      first.insertAdjacentElement('beforebegin',hero);
      /* تنظيف البطاقة القديمة */
      const h2=first.querySelector('h2');if(h2)h2.remove();
      const card=first.querySelector('.card');
      if(card){const b=card.querySelector('b'),bar=card.querySelector('[aria-hidden="true"]'),sm=card.querySelectorAll('small');if(b)b.remove();if(bar)bar.remove();if(sm[0])sm[0].remove()}
      first.classList.add('sc3-top');
      /* مقاطع الدروس */
      root.querySelectorAll('section.sec').forEach(function(sec){
        const its=sec.querySelectorAll(':scope > div > button.sch-it');
        if(!its.length||SCHTAB!=='les')return;
        const hd=sec.querySelector('h2');if(!hd)return;
        const tn=SCH.find(function(l){return its[0].dataset.sc==='open:'+l.id});if(!tn)return;
        const ls=schOf(tn.tri),r=schReadN(tn.tri);
        sec.classList.add('sc3-tri','t'+tn.tri);
        hd.innerHTML='<span class="sc3-tn">'+N(tn.tri)+'</span><span class="sc3-tt">'+esc(sg(SCHTRI[tn.tri-1].t))+'<small>'+N(r)+' من '+N(ls.length)+' دروس</small></span>';
        hd.insertAdjacentHTML('afterend','<div class="sc3-pb"><i style="width:'+Math.round(r/ls.length*100)+'%"></i></div>');
        its.forEach(function(b){
          const l=schLes(b.dataset.sc.slice(5));if(!l)return;
          const done=!!s['r:'+l.id];
          b.classList.add('sc3-row');
          const t=b.querySelector('.sch-t');
          if(t)t.innerHTML=esc(l.t)+'<small>'+N(l.sec.length)+' محاور · '+N((l.ev||[]).length)+' شواهد · نحو '+N(mins(l))+' د</small>';
          b.insertAdjacentHTML('beforeend','<span class="sc3-chip'+(done?' on':'')+'">'+(done?'مقروء':'اقرأ')+'</span>');
        });
      });
    }catch(e){console.error('sch3',e)}
  };
  /* ---------- القارئ ---------- */
  const _rl=renderSchLesson;
  renderSchLesson=function(id){
    _rl(id);
    try{
      const l=schLes(id);if(!l)return;
      const s=schS(),r=s['r:'+id],i=SCH.indexOf(l),nx=SCH[i+1],pv=SCH[i-1];
      const evq=(l.ev||[]).filter(function(e){return e[0]==='q'}),evh=(l.ev||[]).filter(function(e){return e[0]!=='q'});
      let h='<div class="ltop"><button class="xbtn" data-act="leave" aria-label="إغلاق">'+IC.x+'</button><div class="bar sc3-rb" role="progressbar" aria-label="تقدّمك في الدرس"><i style="width:0%"></i></div></div><div class="lmain sc3-main" id="schmain">';
      h+='<header class="sc3-lh t'+l.tri+'"><span class="sc3-lt">'+esc(sg(SCHTRI[l.tri-1].t))+'</span><div class="sc3-ln">'+N(i+1)+'</div><h1>'+esc(l.t)+'</h1><div class="sc3-lm"><span>📚 '+N(l.sec.length)+' محاور</span><span>📖 '+N((l.ev||[]).length)+' شواهد</span><span>⏱ نحو '+N(mins(l))+' د</span></div></header>';
      h+='<nav class="sc3-toc" aria-label="محاور الدرس"><b>محاور الدرس</b>'+l.sec.map(function(x,k){return '<button data-sc3go="s'+k+'"><i>'+N(k+1)+'</i>'+esc(x[0])+'</button>'}).join('')+(l.ev&&l.ev.length?'<button data-sc3go="ev"><i>✦</i>الأدلة والشواهد</button>':'')+'<button data-sc3go="es"><i>؟</i>سؤال مقالي</button></nav>';
      l.sec.forEach(function(x,k){
        h+='<section class="sc3-sec" id="sc3s'+k+'"><h3><span>'+N(k+1)+'</span>'+esc(x[0])+'</h3><ul>'+x[1].map(bullet).join('')+'</ul>'+cloze(l,x)+'</section>';
      });
      if(evq.length||evh.length){
        h+='<section class="sc3-sec" id="sc3ev"><h3><span>✦</span>الأدلة والشواهد</h3>'+
          (l.ev||[]).map(function(e){const q=e[0]==='q';return '<figure class="sc3-ev '+(q?'q':'h')+'"><span class="sc3-tag">'+(q?'آية':'حديث')+'</span><blockquote>'+esc(e[1])+'</blockquote><figcaption>'+esc(e[2])+'</figcaption></figure>'}).join('')+'</section>';
      }
      h+='<section class="sc3-sum"><h3>✦ خلاصة للحفظ</h3><ol>'+l.sec.map(function(x){return '<li><b>'+esc(x[0])+':</b> '+esc(String(x[1][0]).replace(/^[^:]{2,16}:\s*/,''))+'</li>'}).join('')+'</ol></section>';
      h+='<section class="sc3-sec" id="sc3es"><h3><span>؟</span>سؤال مقالي للتدرّب</h3><p class="sc3-eq">'+esc(l.es[0])+'</p><details class="sc3-ans"><summary>أظهر الإجابة النموذجية</summary><p>'+esc(l.es[1])+'</p></details></section>';
      h+='<p class="muted sc3-note">هذا ملخص للمراجعة؛ ارجع إلى كتابك المدرسي ومعلمك للتفصيل.</p>';
      h+='<div class="sc3-act"><button class="btn'+(r?' ghost':'')+'" data-sc="read:'+id+'">'+(r?'✓ تمت قراءته':'علّمه كمقروء')+'</button>'+
        (typeof BAC!=='undefined'&&BAC[id]?'<button class="btn gold" data-bx="start:'+id+'">تمارين على نمط الباكالوريا</button>':'')+
        '<button class="btn" data-sc="ex:'+id+'">اختبر نفسك في هذا الدرس</button>'+
        '<div class="sc3-pn">'+(pv?'<button class="btn ghost sm" data-sc="open:'+pv.id+'">→ السابق</button>':'<span></span>')+(nx?'<button class="btn ghost sm" data-sc="open:'+nx.id+'">التالي ←</button>':'')+'</div></div></div>';
      const el=document.getElementById('lesson');el.innerHTML=h;el.scrollTop=0;
      const m=document.getElementById('schmain'),bar=el.querySelector('.sc3-rb i');
      if(m&&bar)m.addEventListener('scroll',function(){const p=m.scrollTop/Math.max(1,m.scrollHeight-m.clientHeight);bar.style.width=Math.round(Math.min(1,p)*100)+'%'},{passive:true});
    }catch(e){}
  };
  document.addEventListener('click',function(e){
    const c=e.target.closest('[data-cz]');
    if(c){c.textContent=c.dataset.cz;c.classList.add('on');c.removeAttribute('data-cz');return}
    const g=e.target.closest('[data-sc3go]');
    if(g){const t=document.getElementById('sc3'+g.dataset.sc3go);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})}
  });
})();
