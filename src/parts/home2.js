/* ===== إعادة ترتيب الصفحة الرئيسية: تخطيط جديد يعيد استخدام العناصر القديمة ===== */
(function(){
  const HMI={'🎮':'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5"/><circle cx="16" cy="11.5" r=".8"/><circle cx="18.5" cy="13.5" r=".8"/></svg>','🪶':'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 4c-8 0-13 4-13 11l-3 5M20 4c0 7-4 12-11 12M10 14h6"/></svg>','📖':'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14"/></svg>','🔁':'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2l4 4-4 4M3 11V9a3 3 0 013-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 01-3 3H3"/></svg>','🎧':'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15v-3a8 8 0 0116 0v3"/><rect x="3" y="14" width="4" height="7" rx="2"/><rect x="17" y="14" width="4" height="7" rx="2"/></svg>','🛍️':'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 016 0v2"/></svg>','📿':'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="1.6"/><circle cx="6" cy="9" r="1.6"/><circle cx="18" cy="9" r="1.6"/><circle cx="7" cy="16" r="1.6"/><circle cx="17" cy="16" r="1.6"/><circle cx="12" cy="19.5" r="1.6"/></svg>'};
  const _ph=pageHome;
  function sec(pg,t){return Array.prototype.find.call(pg.querySelectorAll(':scope > section.sec'),function(s){const h=s.querySelector('h2');return h&&h.textContent.trim()===t})}
  pageHome=function(){
    _ph();
    const pg=document.getElementById('page');if(!pg||pg.querySelector('.hm'))return;
    try{
      const mission=pg.querySelector('#mission'),search=pg.querySelector('#gsearch'),
        today=sec(pg,'اليوم'),prayer=sec(pg,'مواقيت الصلاة'),
        about=[sec(pg,'عن التطبيق'),sec(pg,'المميزات'),sec(pg,'مصادر المحتوى'),sec(pg,'المنشئ')],
        fine=pg.querySelector('p.fine'),oldHero=pg.querySelector('.hero');
      const alld=today?Array.prototype.slice.call(today.querySelectorAll('.card.day')):[],days=alld.filter(function(d){return d.querySelector('.pill')}),dateC=alld.filter(function(d){return !d.querySelector('.pill')})[0],dateT=dateC?dateC.textContent.trim():'';
      const guide=today&&today.querySelector('[data-act="guide-open"]');
      const nm=S.prof&&S.prof.name?esc(S.prof.name):'';
      const cur=(typeof ALL!=='undefined')&&ALL.find(function(l){return !S.done[l.id]});
      const dn=typeof doneN==='function'?doneN():0,tot=(typeof ALL!=='undefined'&&ALL.length)||1,pc=Math.round(dn*100/tot);
      const due=typeof srDue==='function'?srDue().length:0;
      const tile=function(attr,ic,t,s){return '<button class="hmt" '+attr+'><i aria-hidden="true">'+ic+'</i><b>'+t+'</b>'+(s?'<small>'+s+'</small>':'')+'</button>'};
      const hero=document.createElement('section');hero.className='hm';
      hero.innerHTML=
       '<div class="hm-hero"><div class="hm-hi"><span class="hm-sal">السلام عليكم'+(nm?' يا '+nm:'')+'</span><h1>نور الفرقان</h1><p>رفيقك لتعلّم الدين خطوة خطوة</p>'+(dateT?'<span class="hm-date">'+esc(dateT)+'</span>':'')+'</div><div class="hm-bird">'+hoopoe('happy',104)+'</div></div>'+
       '<button class="hm-go" data-go="learn"><span class="hm-gt"><small>'+(dn?'تابع من حيث توقفت':'ابدأ رحلتك')+'</small><b>'+(cur?esc(cur.title):'أحسنت! أتممت كل الدروس')+'</b></span><span class="hm-ring" style="--p:'+pc+'"><em>'+N(pc)+'%</em></span></button>'+
       '<div class="hm-quick">'+
        tile('data-go="play"',HMI['🎮'],'الألعاب','تحدَّ الهدهد')+
        tile('data-act="ask-open"',HMI['🪶'],'اسأل هدهد','مساعدك')+
        tile('data-go="read"',HMI['📖'],'المصحف','وتفسير')+
        tile(due?'data-act="review-go"':'data-go="listen"',due?HMI['🔁']:HMI['🎧'],due?'مراجعة':'استماع',due?N(due)+' أسئلة':'تلاوات')+
        tile('data-go="shop"',HMI['🛍️'],'المتجر','إكسسوارات')+
        tile('data-act="dhikr-open"',HMI['📿'],'الأذكار','وسبحة')+
       '</div>';
      const kids=[hero];
      if(mission)kids.push(mission);
      if(days.length){
        const sn=document.createElement('section');sn.className='sec hm-days';
        sn.innerHTML='<h2>اليوم</h2><div class="hm-snap"></div>';
        const rail=sn.querySelector('.hm-snap');days.forEach(function(d){rail.appendChild(d)});
        if(guide){guide.classList.add('hm-guide');rail.appendChild(guide)}
        kids.push(sn);
      }
      if(search)kids.push(search);
      if(prayer)kids.push(prayer);
      const det=document.createElement('details');det.className='hm-about';
      det.innerHTML='<summary>عن التطبيق والمصادر والمنشئ</summary>';
      about.forEach(function(s){if(s){const h=s.querySelector('h2');if(h)h.classList.add('hm-h3');det.appendChild(s)}});
      kids.push(det);
      if(fine)kids.push(fine);
      /* أزل ما تبقى من القديم (الهيرو، بطاقة المتجر، عن الموقع) */
      Array.prototype.slice.call(pg.children).forEach(function(c){if(kids.indexOf(c)<0&&!kids.some(function(k){return k.contains&&k.contains(c)}))c.remove()});
      kids.forEach(function(k){if(k!==hero&&k.parentNode===pg)pg.removeChild(k)});
      pg.innerHTML='';kids.forEach(function(k){pg.appendChild(k)});
    }catch(e){try{console.warn('home2',e)}catch(x){}}
  };
  try{if(typeof TAB!=='undefined'&&TAB==='home')renderPage()}catch(e){}
})();
