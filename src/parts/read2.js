/* ===== صفحة القراءة: تخطيط جديد ===== */
(function(){
  const _pr=pageRead,_fl=fillList,_os=openSurah;
  pageRead=function(){
    _pr();
    const pg=document.getElementById('page');if(!pg||RV.s)return;
    try{
      const sec=pg.querySelector('section.sec');if(!sec||sec.classList.contains('rd2'))return;
      sec.classList.add('rd2');
      const h2=sec.querySelector('h2');if(h2)h2.remove();
      const last=sec.querySelector('[data-surah][data-jump]');
      const wird=sec.querySelector('.card.wird');
      const top=document.createElement('div');top.className='rd-top';
      top.innerHTML='<div class="rd-ban"><span class="rd-o" aria-hidden="true">✦</span><b>المصحف الشريف</b><small>114 سورة · 6236 آية</small></div>'+
        (last?'<button class="rd-cont" data-surah="'+last.getAttribute('data-surah')+'" data-jump="'+last.getAttribute('data-jump')+'"><span><small>تابع من حيث توقفت</small><b>'+last.querySelector('span').textContent+'</b></span><i aria-hidden="true">‹</i></button>':
          '<button class="rd-cont" data-surah="1"><span><small>ابدأ القراءة</small><b>سورة الفاتحة</b></span><i aria-hidden="true">‹</i></button>');
      sec.insertBefore(top,sec.firstChild);
      if(last)last.remove();
      if(wird)wird.classList.add('rd-wird');
      const ch=sec.querySelector('.rgch');if(ch)ch.classList.add('rd-chips');
    }catch(e){try{console.warn('read2',e)}catch(x){}}
  };
  fillList=function(){
    _fl();
    document.querySelectorAll('#rlist .srow').forEach(function(r){
      if(r.querySelector('.rd-go'))return;
      r.insertAdjacentHTML('beforeend','<i class="rd-go" aria-hidden="true">‹</i>');
    });
  };
  openSurah=function(i,jump){
    _os(i,jump);
    let n=0;const t=setInterval(function(){
      n++;const pg=document.getElementById('page'),hd=pg&&pg.querySelector('.rhead');
      if(hd||n>40){clearInterval(t)}
      if(!hd||hd.classList.contains('rd-done'))return;
      try{
        hd.classList.add('rd-done');
        const meta=hd.nextElementSibling;
        const ban=document.createElement('div');ban.className='rd-sban';
        const mt=meta&&meta.classList.contains('muted')?meta.textContent:'';
        if(meta&&meta.classList.contains('muted'))meta.remove();
        hd.parentNode.insertBefore(ban,hd);ban.appendChild(hd);
        if(mt)ban.insertAdjacentHTML('beforeend','<span class="rd-meta">'+esc(mt)+'</span>');
        const pn=pg.querySelectorAll('.ay').length;
        if(pn)ban.insertAdjacentHTML('beforeend','<div class="rd-nav" aria-hidden="true"><span style="width:0"></span></div>');
      }catch(e){}
    },60);
  };
})();
