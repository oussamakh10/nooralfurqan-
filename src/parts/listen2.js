/* ===== صفحة الاستماع: مشغّل بمحراب ===== */
(function(){
  const _pl=pageListen;
  pageListen=function(){
    _pl();
    const pg=document.getElementById('page');if(!pg)return;
    try{
      const sec=pg.querySelector('section.sec');if(!sec||sec.classList.contains('ls2'))return;
      sec.classList.add('ls2');
      const h2=sec.querySelector('h2');if(h2)h2.remove();
      sec.insertAdjacentHTML('afterbegin','<div class="rd-ban"><span class="rd-o" aria-hidden="true">✦</span><b>الاستماع</b><small>تلاوات بأصوات القرّاء</small></div>');
      const play=sec.querySelector('[data-act="play-surah"]');
      if(play){
        const sel=sec.querySelector('#lsurah'),fld=sel&&sel.closest('.field'),dl=sec.querySelector('#dlbox');
        const rec=sec.querySelector('.rc[aria-pressed="true"]');
        const card=document.createElement('div');card.className='ls-card';
        card.innerHTML='<div class="ls-disc" aria-hidden="true"><span>'+(rec?rec.querySelector('i').textContent:'م')+'</span></div><div class="ls-info"><b>'+(sel?esc(sel.options[sel.selectedIndex].text.replace(/^\d+\.\s*/,'')):'')+'</b><small>'+(rec?esc(rec.querySelector('span').textContent):'')+'</small></div>';
        if(fld)card.appendChild(fld);
        card.appendChild(play);
        if(dl)card.appendChild(dl);
        const rg=sec.querySelector('.rgrid'),rf=rg&&rg.closest('.field');
        const seg=sec.querySelector('.seg');
        (seg||sec.firstChild).insertAdjacentElement('afterend',card);
        if(rf)rf.classList.add('ls-rec');
        card.after(rf||card);
        if(sel)sel.addEventListener('change',function(){const b=card.querySelector('.ls-info b');if(b)b.textContent=sel.options[sel.selectedIndex].text.replace(/^\d+\.\s*/,'')});
      }
    }catch(e){try{console.warn('listen2',e)}catch(x){}}
  };
})();
