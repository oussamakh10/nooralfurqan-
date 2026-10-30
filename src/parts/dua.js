/* ===== دقيقة دعاء بعد الترحيب (مرة واحدة) ===== */
(function(){
  let tm=null;
  function close(){clearInterval(tm);tm=null;const m=document.getElementById('duam');if(m)m.hidden=true;S.duaDone=1;save()}
  function show(){
    let m=document.getElementById('duam');
    if(!m){m=document.createElement('div');m.id='duam';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');document.body.appendChild(m)}
    m.innerHTML='<div class="bc-card"><div class="duamas">'+hoopoe('cheer',84)+'</div>'+
     '<div class="bc-t">'+esc(g3(['قبل أن نكمل…','Before we continue…','Avant de continuer…']))+'</div>'+
     '<p>'+esc(g3(['هل تستطيع أن تدعو في دقيقة من وقتك بالرحمة للطفل حميد، أخي أسيل، الذي توفي في الأيام القليلة الماضية، وللمسلمين والمسلمات جميعًا؟','Could you take a minute to pray for mercy for little Hamid, Aseel’s brother, who passed away in recent days, and for all Muslim men and women?','Pouvez-vous prendre une minute pour invoquer la miséricorde en faveur du petit Hamid, frère d’Aseel, décédé ces derniers jours, ainsi que pour tous les musulmans et musulmanes ?']))+'</p>'+
     '<p class="duat">اللَّهُمَّ ارْحَمْ حَمِيدًا وَاغْفِرْ لَهُ، وَاغْفِرْ لِلْمُسْلِمِينَ وَالْمُسْلِمَاتِ الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ.</p>'+
     '<div class="hpbtns"><button class="btn" data-dua="end">'+esc(g3(['آمين','Amen','Amîn']))+'</button></div></div>';
    m.hidden=false;
  }
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-dua]');if(!b)return;
    const a=b.dataset.dua;if(a==='end')close();
  });
  const of=obFinish;
  obFinish=function(){
    const first=!S.duaDone;
    const r=of.apply(this,arguments);
    if(first)setTimeout(show,350);
    return r;
  };
})();
