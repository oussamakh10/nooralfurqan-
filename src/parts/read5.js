/* ===== القارئ الصامت (تفاعل) + صفحة القراءة كفهرس ===== */
(function(){
  document.addEventListener('click',function(e){
    const root=document.querySelector('.bk3');if(!root)return;
    const pk=document.getElementById('bkpick'),st=document.getElementById('bkset');let closed=false;
    if(pk&&!pk.hidden&&!e.target.closest('#bkpick,[data-bk=pick],[data-bk=pickto]')){pk.hidden=true;closed=true}
    if(st&&!st.hidden&&!e.target.closest('#bkset,[data-bk=set]')){st.hidden=true;closed=true}
    if(closed)return;
    const pt=e.target.closest('[data-bk=pickto]');
    if(pt){if(pk){pk.hidden=false;if(st)st.hidden=true;if(window.bkTab)window.bkTab(pt.dataset.to)}return}
    const fc=e.target.closest('[data-bk=focus]');
    if(fc){root.classList.add('focus');if(st)st.hidden=true;return}
    const set=e.target.closest('[data-bk=set]');
    if(set){if(st)st.hidden=!st.hidden;if(pk)pk.hidden=true;return}
    const th=e.target.closest('[data-th]');
    if(th){S.bkth=th.dataset.th;save();root.className=root.className.replace(/th-\w+/,'th-'+S.bkth);
      root.querySelectorAll('[data-th]').forEach(function(b){b.setAttribute('aria-pressed',String(b===th))});return}
    if(e.target.closest('.bk3-scroll')&&!e.target.closest('button,input,select,a')){
      const x=e.clientX/window.innerWidth;
      const go=function(a){const b=root.querySelector('[data-bk='+a+']');if(b)b.click()};
      const va=e.target.closest('.bk3-a');
      if(x<.22)go('next');else if(x>.78)go('prev');
      else if(va)va.classList.toggle('hl');
      else root.classList.toggle('focus');
    }
  });
  document.addEventListener('click',function(e){const t=e.target.closest&&e.target.closest('[data-r5=list]');if(!t||e.target.closest('button'))return;const l=document.getElementById('rlist');if(l)l.scrollIntoView({behavior:'smooth',block:'start'})});
  const _pr=pageRead;
  pageRead=function(){
    _pr();
    if(RV.s||RV.bk)return;
    const sec=document.querySelector('#page section.rd2');
    if(!sec||sec.classList.contains('r5-done'))return;
    const hero=sec.querySelector('.r3-hero'),seg=sec.querySelector('.r3-seg');if(!hero)return;
    try{
      sec.classList.add('r5-done');
      const cont=hero.querySelector('.rd-cont'),kb=hero.querySelector('.r3-khat');
      const tgt=wirdTarget(),r=Math.min(readToday(),tgt),pc=Math.round(r/tgt*100);
      const head=document.createElement('div');head.className='r5-head';
      head.innerHTML='<b>'+esc(g3(['القرآن الكريم','The Noble Quran','Le Saint Coran']))+'</b><p>'+N(114)+' '+esc(g3(['سورة','surahs','sourates']))+' · '+N(30)+' '+esc(g3(['جزءًا','juz','juz']))+' · '+N(6236)+' '+esc(g3(['آية','verses','versets']))+'</p>';
      const tiles=document.createElement('div');tiles.className='r5-tiles';
      tiles.innerHTML='<button class="r5-tile" data-bk="open"><small>'+esc(g3(['النوع الأول','Mode 1','Mode 1']))+'</small><b>'+esc(g3(['القراءة الصامتة','Silent reading','Lecture silencieuse']))+'</b><span>'+esc(g3(['بصفحات المصحف · صفحة ','By mushaf pages · page ','Par pages · page ']))+N((S.bkp||0)+1)+esc(g3([' · حسناتك تُحسب بصمت',' · hasanat counted silently',' · hasanat comptées en silence']))+'</span></button>'+
        '<div class="r5-tile r5-w on" data-r5="list"><small>'+esc(g3(['النوع الثاني','Mode 2','Mode 2']))+'</small><b>'+esc(g3(['القراءة بعداد الحسنات','Reading with hasanat counter','Lecture avec compteur']))+'</b><span>'+esc(g3(['وردك اليوم ','Today’s portion ','Portion du jour ']))+N(r)+' / '+N(tgt)+'</span><i class="r5-pb"><u style="width:'+pc+'%"></u></i></div>';
      if(kb){kb.classList.remove('r3-khat');kb.classList.add('r5-khat');tiles.querySelector('.r5-w').appendChild(kb)}
      hero.remove();if(seg)seg.remove();
      sec.insertBefore(tiles,sec.firstChild);
      if(cont)sec.insertBefore(cont,tiles);
      sec.insertBefore(head,sec.firstChild);
    }catch(e){try{console.warn('read5',e)}catch(x){}}
  };
})();
