/* 15: قراءة صوتية للقصص + اختيار الصوت (قارئ ثانٍ) — صوت الجهاز الآلي */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  function voices(){try{return (speechSynthesis.getVoices()||[]).filter(function(v){return /^ar/i.test(v.lang)})}catch(e){return []}}
  var base=window.speakNow;
  window.speakNow=function(txt){
    try{
      var u=new SpeechSynthesisUtterance(txt);u.lang={ar:'ar-SA',en:'en-US',fr:'fr-FR'}[LANG]||'ar-SA';
      var vx=S.vx|0,vs=LANG==='ar'||!LANG?voices():[];
      if(vs.length)u.voice=vs[vx%vs.length];
      /* قارئ ثانٍ: إن لم يوجد صوت ثانٍ نغيّر طبقة الصوت لتمييزه */
      u.rate=S.kids?.85:(vx%2?.92:1);u.pitch=(vs.length<2&&vx%2)?.7:1;
      speechSynthesis.cancel();speechSynthesis.speak(u);
    }catch(e){if(base)base(txt)}
  };
  function addBtns(){
    var top=document.querySelector('.sr-top');if(!top||top.querySelector('.vx-b'))return;
    var s=document.createElement('button');s.className='sr-x vx-b';s.setAttribute('data-act','story-speak');
    s.setAttribute('aria-label',tt(['اقرأ الصفحة بصوت عالٍ','Read this page aloud','Lire la page à voix haute']));
    s.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14"/></svg>';
    var v=document.createElement('button');v.className='sr-x vx-b';v.setAttribute('data-act','voice-next');
    v.setAttribute('aria-label',tt(['قارئ آخر','Another voice','Autre voix']));v.textContent=(S.vx|0)%2?'2':'1';
    top.appendChild(s);top.appendChild(v);
  }
  new MutationObserver(function(){addBtns()}).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act="story-speak"],[data-act="voice-next"]');if(!b)return;
    if(b.dataset.act==='voice-next'){S.vx=((S.vx|0)+1)%2;save();b.textContent=S.vx%2?'2':'1';window.speakNow(tt(['تم تغيير القارئ','Voice changed','Voix changée']));return}
    var sl=document.getElementById('sr-slide');if(sl)window.speakNow(sl.innerText.replace(/\s+/g,' ').trim());
  });
  try{speechSynthesis.getVoices()}catch(e){}
})();
