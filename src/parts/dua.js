/* ===== دقيقة دعاء بعد الترحيب (مرة واحدة) ===== */
(function(){
  const SEC=60;let tm=null;
  function close(){clearInterval(tm);tm=null;const m=document.getElementById('duam');if(m)m.hidden=true;S.duaDone=1;save()}
  function show(){
    let m=document.getElementById('duam');
    if(!m){m=document.createElement('div');m.id='duam';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');document.body.appendChild(m)}
    m.innerHTML='<div class="bc-card"><div class="duamas">'+hoopoe('cheer',84)+'</div>'+
     '<div class="bc-t">'+esc(g3(['قبل أن نكمل…','Before we continue…','Avant de continuer…']))+'</div>'+
     '<p>'+esc(g3(['هل تستطيع أن تمنح دقيقة واحدة تدعو فيها بالرحمة للطفل حميد، أخي أسيل، الذي توفي في الأيام القليلة الماضية، وللمسلمين والمسلمات جميعًا؟','Could you spare one minute to pray for mercy for little Hamid, Aseel’s brother, who passed away in recent days, and for all Muslim men and women?','Pouvez-vous accorder une minute pour invoquer la miséricorde en faveur du petit Hamid, frère d’Aseel, décédé ces derniers jours, ainsi que pour tous les musulmans et musulmanes ?']))+'</p>'+
     '<div class="hpbtns"><button class="btn" data-dua="go">'+esc(g3(['نعم، أدعو الآن','Yes, I will pray now','Oui, je prie maintenant']))+'</button><button class="btn ghost" data-dua="no">'+esc(g3(['ليس الآن','Not now','Pas maintenant']))+'</button></div></div>';
    m.hidden=false;
  }
  function run(){
    const m=document.getElementById('duam');if(!m)return;let t=SEC;
    m.innerHTML='<div class="bc-card"><div class="duamas">'+hoopoe('cheer',72)+'</div>'+
     '<p class="duat">اللَّهُمَّ اغْفِرْ لِحَمِيدٍ وَارْحَمْهُ، وَأَسْكِنْهُ فَسِيحَ جَنَّاتِكَ، وَاجْعَلْهُ فَرَطًا وَذُخْرًا وَشَفِيعًا مُجَابًا لِوَالِدَيْهِ، وَأَلْهِمْ أَهْلَهُ الصَّبْرَ وَالسُّلْوَانَ.<br>اللَّهُمَّ اغْفِرْ لِأَحْيَائِنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا. اللَّهُمَّ اغْفِرْ لِلْمُسْلِمِينَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ، الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ.</p>'+
     '<div class="duac" id="duac">'+t+'</div><div class="hpbtns"><button class="btn ghost" data-dua="end">'+esc(g3(['أنهيت','Done','Terminé']))+'</button></div></div>';
    tm=setInterval(function(){t--;const c=document.getElementById('duac');if(c)c.textContent=t;if(t<=0){clearInterval(tm);tm=null;fin()}},1000);
  }
  function fin(){
    const m=document.getElementById('duam');if(!m)return;
    m.innerHTML='<div class="bc-card"><div class="duamas">'+hoopoe('cheer',72)+'</div><div class="bc-t">'+esc(g3(['تقبّل الله دعاءك','May Allah accept your prayer','Qu’Allah accepte votre invocation']))+'</div><p>'+esc(g3(['جزاك الله خيرًا، وجعله في ميزان حسناتك.','Jazāk Allāhu khayran.','Jazâk Allâhu khayran.']))+'</p><div class="hpbtns"><button class="btn" data-dua="end">'+esc(g3(['هيا نبدأ','Let’s begin','Commençons']))+'</button></div></div>';
  }
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-dua]');if(!b)return;
    const a=b.dataset.dua;if(a==='go')run();else if(a==='no'||a==='end')close();
  });
  const of=obFinish;
  obFinish=function(){
    const first=!S.duaDone;
    const r=of.apply(this,arguments);
    if(first)setTimeout(show,350);
    return r;
  };
})();
