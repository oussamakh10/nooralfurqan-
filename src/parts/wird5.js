/* 13: المسار اليومي — ورد الخمس دقائق (آية، حديث، ذكر، مراجعة) */
(function(){
  var REFS=[[2,255],[13,28],[94,5],[65,3],[2,152],[39,53],[2,186],[3,139],[29,69],[20,114],[2,286],[112,1],[59,22],[94,6]];
  var DHK=['سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ','لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ','أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ','لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ','اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ'];
  function day(){return Math.floor(Date.now()/864e5)}
  function st(){if(!S.w5||S.w5.d!==today())S.w5={d:today(),s:[0,0,0,0],x:0};return S.w5}
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  function render(Qd){
    var w=st(),i=day(),r=REFS[i%REFS.length],ay='',nm='';
    try{ay=Qd.v[r[0]-1][r[1]-1];nm=Qd.ch[r[0]-1][0]}catch(e){}
    var hd=(typeof HADS!=='undefined'&&HADS.length)?HADS[i%HADS.length]:{t:'الدِّينُ النَّصِيحَةُ',r:'رواه مسلم'};
    var dh=DHK[i%DHK.length],done=w.s.filter(Boolean).length;
    var steps=[
     [tt(['آية اليوم','Verse of the day','Verset du jour']),'<p class="quran" style="font-size:1.5rem;line-height:2.1">'+esc(ay)+'</p><small class="muted">'+esc(nm)+' ﴿'+N(r[1])+'﴾</small>'],
     [tt(['حديث','Hadith','Hadith']),'<p style="font-size:1.25rem;line-height:2">'+esc(hd.t)+'</p><small class="muted">'+esc(hd.r||'')+'</small>'],
     [tt(['ذكر','Dhikr','Dhikr']),'<p style="font-size:1.25rem;line-height:2">'+esc(dh)+'</p><small class="muted">×3</small>'],
     [tt(['مراجعة','Review','Révision']),'<p class="muted">'+esc(tt(['راجع أسئلتك المؤجَّلة ثم عُد لتختم وردك.','Review your due questions, then come back to finish.','Révisez vos questions puis revenez terminer.']))+'</p><button class="btn" data-act="w5-rev">'+esc(tt(['ابدأ المراجعة','Start review','Réviser']))+'</button>']
    ];
    var h='<div class="ltop"><button class="xbtn" data-act="w5-x" aria-label="'+esc(tt(['إغلاق','Close','Fermer']))+'">'+IC.x+'</button><div class="bar"><i style="width:'+(done*25)+'%"></i></div></div><div class="lmain"><div class="center"><div class="mas">'+hoopoe(done===4?'love':'happy',84)+'</div><h2>'+esc(tt(['وردك اليوم — 5 دقائق','Daily wird — 5 minutes','Wird du jour — 5 min']))+'</h2></div>';
    steps.forEach(function(s,k){h+='<div class="card" style="margin:10px 0;text-align:center"><h3>'+(w.s[k]?'✓ ':'')+s[0]+'</h3>'+s[1]+'<div style="margin-top:10px"><button class="tag'+(w.s[k]?' on':'')+'" data-act="w5-d" data-k="'+k+'">'+esc(w.s[k]?tt(['تم','Done','Fait']):tt(['أتممت','Mark done','Terminé']))+'</button></div></div>'});
    if(done===4)h+='<p class="center" style="font-weight:700">'+esc(tt(['تقبّل الله منك! ختمتَ وردك اليوم.','Well done! Daily wird complete.','Bravo ! Wird terminé.']))+'</p>';
    $('#lesson').innerHTML=h+'</div>';
  }
  function open(){openOverlay();loadQ().then(render).catch(function(){render({v:[],ch:[]})})}
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act^="w5"]');if(!b)return;
    var a=b.dataset.act;
    if(a==='w5-open'){open();return}
    if(a==='w5-x'){closeOverlay();return}
    if(a==='w5-d'){var w=st(),k=+b.dataset.k;w.s[k]=w.s[k]?0:1;if(w.s.every(Boolean)&&!w.x){w.x=1;addXP(10);try{toast(tt(['تقبّل الله منك! +10','Complete! +10','Terminé ! +10']))}catch(_){}}save();open();return}
    if(a==='w5-rev'){closeOverlay();var r=document.querySelector('[data-act="review-go"]');if(r)r.click();else toast(tt(['لا مراجعات اليوم','No reviews due','Aucune révision']));return}
  });
})();
