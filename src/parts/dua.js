/* ===== دقيقة دعاء بعد الترحيب (مرة واحدة) ===== */
(function(){
  let tm=null;
  function close(){clearInterval(tm);tm=null;const m=document.getElementById('duam');if(m)m.hidden=true;S.duaDone=1;save()}
  let typer=0;
  function typeIn(el,text){
    clearInterval(typer);
    if(S.rm||!window.requestAnimationFrame){el.textContent=text;return}
    let i=0;el.textContent='';
    typer=setInterval(function(){i+=2;el.textContent=text.slice(0,i);if(i>=text.length)clearInterval(typer)},28);
  }
  function show(){
    let m=document.getElementById('duam');
    if(!m){m=document.createElement('div');m.id='duam';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');document.body.appendChild(m)}
    const msg=g3([
     'السلام عليكم ورحمة الله. قبل أن نبدأ، لي عندك طلب صغير من القلب: فقد انتقل إلى رحمة الله في الأيام الماضية الطفل حميد، أخو أسيل. ندعو الله أن يتغمده برحمته ويسكنه فسيح جناته، وأن يربط على قلوب أهله بالصبر والسلوان. فهل تدعو له معنا، وللمسلمين والمسلمات جميعًا، بما تيسّر من قلبك؟ جزاك الله خيرًا.',
     'Peace be upon you. Before we begin, I have a small request from the heart: little Hamid, Aseel’s brother, passed away to Allah’s mercy in recent days. We ask Allah to envelop him in His mercy, grant him the highest Paradise, and give his family patience and comfort. Will you pray for him with us, and for all Muslim men and women, with whatever your heart offers? Jazāk Allāhu khayran.',
     'Que la paix soit sur vous. Avant de commencer, j’ai une petite demande du fond du cœur : le petit Hamid, frère d’Aseel, est retourné à la miséricorde d’Allah ces derniers jours. Nous demandons à Allah de l’envelopper de Sa miséricorde, de l’accueillir au plus haut du Paradis et de donner patience et réconfort à sa famille. Voulez-vous prier pour lui avec nous, et pour tous les musulmans et musulmanes, comme votre cœur vous le dicte ? Jazâk Allâhu khayran.']);
    let ic='';try{ic='<div style="text-align:center;display:flex;gap:14px;justify-content:center;color:var(--accent)">'+icoSvg('🌙')+icoSvg('📖')+icoSvg('✦')+'</div>'}catch(e){}
    m.innerHTML='<div class="obx"><div class="obtop"><div class="obowl">'+hoopoe('sad',120)+'</div></div>'+
     '<div class="obbub" aria-label="'+esc(msg)+'"><span id="duasay"></span></div>'+
     '<div class="duafade" id="duafade">'+ic+
     '<p class="duat">اللَّهُمَّ ارْحَمْ حَمِيدًا وَاجْعَلْهُ فَرَطًا وَذُخْرًا لِوَالِدَيْهِ، وَأَلْهِمْ أَهْلَهُ الصَّبْرَ وَالسُّلْوَانَ، وَاغْفِرْ لِلْمُسْلِمِينَ وَالْمُسْلِمَاتِ، الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ.</p>'+
     '<div class="obfoot"><button class="btn" data-dua="end">'+esc(g3(['آمين','Amen','Amîn']))+'</button>'+
     '<button class="btn ghost" data-dua="end">'+esc(g3(['إغلاق','Close','Fermer']))+'</button></div></div></div>';
    m.hidden=false;
    typeIn(document.getElementById('duasay'),msg);
    setTimeout(function(){const f=document.getElementById('duafade');if(f)f.classList.add('on')},S.rm?0:Math.min(5200,msg.length*14+400));
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
  /* من أنهى الترحيب سابقًا: تظهر لمرة واحدة عند فتح التطبيق */
  if(!S.duaDone&&S.prof&&S.prof.done)setTimeout(function(){if(!S.duaDone)show()},1800);
})();
