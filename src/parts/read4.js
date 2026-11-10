/* ===== قائمة السور: صفوف غنية بالمعلومات (نوع السورة، الصفحة، تقدّم القراءة) ===== */
(function(){
  const _fl=fillList;
  fillList=function(){
    _fl();
    const fp={};try{const P=window.bkPG&&Q&&Q.v?window.bkPG():[];P.forEach(function(pg,i){pg.forEach(function(x){if(x[1]===1&&fp[x[0]]==null)fp[x[0]]=i})})}catch(e){}
    document.querySelectorAll('#rlist .srow').forEach(function(r){
      if(r.dataset.r4)return;r.dataset.r4=1;
      const s=+r.dataset.surah;if(!s||!Q||!Q.ch)return;
      const c=Q.ch[s-1],n=AYC[s-1];let done=0;
      for(let a=1;a<=n;a++)if(S.ayd[rdKey(s,a)])done++;
      const mk=c[1]==='م';
      const sm=r.querySelector('small');
      if(sm)sm.textContent=(mk?g3(['مكية','Meccan','Mecquoise']):g3(['مدنية','Medinan','Médinoise']))+' · '+N(n)+' '+g3(['آية','verses','versets']);
      r.insertAdjacentHTML('beforeend','<em class="r4-end '+(mk?'mk':'md')+'">'+(done>=n?'✓':g3(['ص ','p. ','p. '])+N((fp[s]||0)+1))+'</em><i class="r4-bar" aria-hidden="true"><u style="width:'+Math.round(done/n*100)+'%"></u></i>');
      r.classList.toggle('r4-done',done>=n);
    });
  };
})();
