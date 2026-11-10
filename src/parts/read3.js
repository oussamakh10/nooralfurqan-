/* ===== القراءة: هوية بصرية جديدة (مكتبة المصحف) دون حذف أي ميزة ===== */
(function(){
  const _pr=pageRead,_fl=fillList;
  function ring(p){
    const R=34,C=2*Math.PI*R;
    return '<svg class="r3-ring" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="'+R+'" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="7"/><circle cx="40" cy="40" r="'+R+'" fill="none" stroke="#e6c473" stroke-width="7" stroke-linecap="round" stroke-dasharray="'+(C*p).toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 40 40)"/><text x="40" y="46" text-anchor="middle" font-size="19" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">'+Math.round(p*100)+'%</text></svg>';
  }
  pageRead=function(){
    _pr();
    const pg=document.getElementById('page');if(!pg)return;
    pg.classList.toggle('r3s',!!RV.s);pg.classList.toggle('r3l',!RV.s);
    if(RV.s)return;
    try{
      const sec=pg.querySelector('section.rd2');if(!sec||sec.classList.contains('r3-done'))return;
      sec.classList.add('r3-done');
      const old=document.getElementById('bkcard');if(old)old.remove();
      const top=sec.querySelector('.rd-top'),wird=sec.querySelector('.rd-wird');
      const tgt=wirdTarget(),r=Math.min(readToday(),tgt);
      const hero=document.createElement('div');hero.className='r3-hero';
      hero.innerHTML='<div class="r3-ttl"><span aria-hidden="true">﴾</span><b>'+esc(g3(['المصحف الشريف','The Noble Quran','Le Saint Coran']))+'</b><span aria-hidden="true">﴿</span></div>'+
        '<div class="r3-row">'+ring(r/tgt)+'<div class="r3-wt"><small>'+esc(g3(['وردك اليوم','Today’s portion','Votre portion du jour']))+'</small><b>'+N(r)+' / '+N(tgt)+' '+esc(g3(['آية','verses','versets']))+'</b><small>'+esc(g3(['ختمة في ','Complete in ','Lecture complète en ']))+N(S.khat.days)+esc(g3([' يومًا · '+N(S.khat.n)+' ختمة',' days · '+N(S.khat.n)+' completed',' jours · '+N(S.khat.n)+' terminée(s)']))+'</small></div></div>';
      const cont=top&&top.querySelector('.rd-cont');
      if(cont)hero.appendChild(cont);
      const kb=wird&&wird.querySelector('[data-act="khat-set"]');
      if(kb){kb.classList.add('r3-khat');hero.querySelector('.r3-wt').appendChild(kb)}
      if(wird)wird.remove();if(top)top.remove();
      sec.insertBefore(hero,sec.firstChild);
      const seg=document.createElement('div');seg.className='r3-seg';seg.setAttribute('role','group');
      seg.innerHTML='<button aria-pressed="true">'+esc(g3(['بالسور والآيات','By surah & verse','Par sourate et verset']))+'</button><button data-bk="open" aria-pressed="false">'+esc(g3(['بالصفحات','By pages','Par pages']))+(S.bkp?' · '+N(S.bkp+1):'')+'</button>';
      hero.after(seg);
    }catch(e){try{console.warn('read3',e)}catch(x){}}
  };
  fillList=function(){
    _fl();
    document.querySelectorAll('#rlist .srow').forEach(function(r){
      const g=r.querySelector('.rd-go');if(g)g.remove();
      const n=+r.dataset.surah;if(typeof S.opened!=='undefined'&&S.opened&&S.opened[n])r.classList.add('seen');
      if(typeof surahDoneToday==='function'&&surahDoneToday(n))r.classList.add('fin');
    });
  };
})();

(function(){
  const _os3=openSurah;
  openSurah=function(i,jump){
    const r=_os3(i,jump);
    const pg=document.getElementById('page');if(pg){pg.classList.add('r3s');pg.classList.remove('r3l')}
    return r;
  };
})();
