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
     'السلام عليكم ورحمة الله. قبل أن نبدأ رحلتنا، لي عندك رجاء صغير: فقد انتقل إلى رحمة الله في الأيام الماضية الطفل حميد، أخو أسيل. فهل تدعو له دعوة صادقة من قلبك، وتدعو لإخوتنا وأخواتنا المسلمين والمسلمات جميعًا؟ جزاك الله خيرًا.',
     'Peace be upon you. Before we begin our journey, I have one small request: little Hamid, Aseel’s brother, passed away to Allah’s mercy in recent days. Would you make a sincere prayer for him, and for all our Muslim brothers and sisters? Jazāk Allāhu khayran.',
     'Que la paix soit sur vous. Avant de commencer, j’ai une petite demande : le petit Hamid, frère d’Aseel, est retourné à la miséricorde d’Allah ces derniers jours. Voulez-vous faire pour lui une invocation sincère, ainsi que pour tous nos frères et sœurs musulmans ? Jazâk Allâhu khayran.']);
    let ic='';try{ic='<div class="duai">'+icoSvg('✦')+icoSvg('🌙')+icoSvg('✦')+'</div>'}catch(e){}
    m.innerHTML='<div class="duax"><div class="duamas">'+hoopoe('sad',112)+'</div>'+
     '<div class="duabub" aria-label="'+esc(msg)+'"><span id="duasay"></span></div>'+
     '<div class="duafade" id="duafade">'+ic+
     '<p class="duat">اللَّهُمَّ ارْحَمْ حَمِيدًا وَاجْعَلْهُ فَرَطًا وَذُخْرًا لِوَالِدَيْهِ، وَأَلْهِمْ أَهْلَهُ الصَّبْرَ وَالسُّلْوَانَ، وَاغْفِرْ لِلْمُسْلِمِينَ وَالْمُسْلِمَاتِ، الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ.</p>'+
     '<button class="btn" data-dua="end">'+esc(g3(['آمين','Amen','Amîn']))+'</button></div></div>';
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
