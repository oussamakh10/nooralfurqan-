/* ===== صفحة الألعاب: تحسين الأوضاع الثلاثة ===== */
(function(){
  const _pp=pagePlay;
  const DESC={solo:['🎯','تدرّب بمفردك واكسب النقاط'],friends:['👥','بالتناوب على جهاز واحد'],blitz:['⚡','سباق مع الوقت: ستون ثانية فقط']};
  const FICO={quran:'📖',sunna:'📜',seera:'🕌',sahaba:'⭐',fiqh:'⚖️',aqeeda:'💡',prophets:'🌙',gharib:'🔤',ayat:'✍️',order:'🔢'};
  pagePlay=function(){
    _pp();
    const pg=document.getElementById('page');if(!pg)return;
    const form=pg.querySelector('section.sec:not(.gh)');
    if(!form||form.classList.contains('gf'))return;
    try{
      form.classList.add('gf');
      const mode=(form.querySelector('.seg [aria-pressed="true"]')||{}).getAttribute&&form.querySelector('.seg [aria-pressed="true"]').getAttribute('data-gmode')||'solo';
      form.setAttribute('data-mode',mode);
      const seg=form.querySelector('.seg');
      if(seg){
        const d=DESC[mode]||DESC.solo,p=document.createElement('p');p.className='gf-md';
        p.innerHTML='<span aria-hidden="true">'+d[0]+'</span>'+d[1];
        seg.insertAdjacentElement('afterend',p);
      }
      /* بطاقة وضع 60 ثانية */
      const bz=form.querySelector(':scope > .card:not(.field)');
      if(bz){
        bz.className='gf-bz';
        bz.innerHTML='<div class="gf-bzt"><b>60</b><span>ثانية</span></div><div class="gf-bzl"><p>أجب عن أكبر عدد من الأسئلة قبل انتهاء الوقت.</p><div><i>✓ +10 نقاط</i><i>🔥 تتابع يزيد المكافأة</i></div></div>';
      }
      /* اللاعبون */
      form.querySelectorAll('input[data-pl]').forEach(function(inp,i){
        const l=document.createElement('label');l.className='gf-pl';
        l.innerHTML='<i aria-hidden="true">'+(i+1)+'</i>';
        inp.parentNode.insertBefore(l,inp);l.appendChild(inp);
        inp.placeholder='اسم اللاعب '+(i+1);
      });
      form.querySelectorAll('.field').forEach(function(f){f.classList.add('gf-f')});
      form.querySelectorAll('[data-gf]').forEach(function(b){
        const id=b.getAttribute('data-gf');if(FICO[id]&&!b.querySelector('.gf-e')){const e=document.createElement('span');e.className='gf-e';e.setAttribute('aria-hidden','true');e.textContent=FICO[id];b.insertBefore(e,b.firstChild)}
      });
      /* ملخّص العدد */
      const sum=Array.prototype.find.call(form.querySelectorAll(':scope > p.muted'),function(p){return p.textContent.indexOf('الأسئلة الجاهزة')===0});
      if(sum){
        const t=sum.textContent,m=t.match(/:\s*([0-9,٠-٩]+)/),ay=t.indexOf('أكمل الآية')>=0,fr=t.indexOf('يُوزَّع')>=0;
        const s=document.createElement('div');s.className='gf-sum';s.setAttribute('role','status');
        s.innerHTML='<b>'+(m?m[1]:'0')+'</b><span>سؤال جاهز بهذا الاختيار</span>'+(ay||fr?'<small>'+(ay?'+ أسئلة «أكمل الآية» تُولَّد من المصحف. ':'')+(fr?'يُوزَّع العدد بالتساوي بين اللاعبين.':'')+'</small>':'');
        sum.replaceWith(s);
      }
      const go=form.querySelector('[data-act="gstart"]');
      if(go){go.classList.add('gf-go');go.innerHTML='<span class="gf-pi" aria-hidden="true"></span>ابدأ اللعب'}
      const bst=form.querySelector(':scope > p.muted:last-child');
      if(bst&&bst.textContent.indexOf('أفضل')===0)bst.className='gf-best';
    }catch(e){}
  };
  /* تحديث الوصف عند تبديل الوضع لا يلزم: الصفحة تُعاد رسمها */
})();
