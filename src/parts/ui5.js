/* ===== سلاسة: حركة دخول عند تبديل الصفحات ===== */
(function(){
  let tm=0;
  const _go=go;
  go=function(t){
    const same=(t===TAB);
    _go(t);
    if(same)return;
    const p=document.getElementById('page');if(!p)return;
    p.classList.remove('pgin');void p.offsetWidth;p.classList.add('pgin');
    clearTimeout(tm);tm=setTimeout(function(){p.classList.remove('pgin')},700);
  };
})();
/* وسم الصفحة الحالية لتفعيل الخلفيات المصمَّمة */
(function(){
  const _rp=renderPage;
  renderPage=function(){try{document.documentElement.setAttribute('data-tab',TAB)}catch(e){}return _rp.apply(this,arguments)};
  try{document.documentElement.setAttribute('data-tab',TAB)}catch(e){}
})();
/* استبدال الإيموجي النصية في واجهة التطبيق بأيقونات خطية (لعقد النص فقط، لا السمات) */
(function(){
  const RX=/(🎓|📖|❄|🎯|⚡|🌟|🔥|🔒|✅|🌙|🔊|🎲|💡|🧭|⚑|📤|⬇)/g;
  let raf=0;
  function fix(root){
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      const p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA|SVG)$/i.test(p.nodeName)||p.closest&&p.closest('svg'))return NodeFilter.FILTER_REJECT;
      return RX.test(n.nodeValue)?(RX.lastIndex=0,NodeFilter.FILTER_ACCEPT):NodeFilter.FILTER_REJECT}});
    const list=[];while(w.nextNode())list.push(w.currentNode);
    list.forEach(function(n){
      RX.lastIndex=0;const parts=n.nodeValue.split(RX);const frag=document.createDocumentFragment();
      parts.forEach(function(t,i){
        if(i%2===1){const sp=document.createElement('span');sp.className='emico';sp.innerHTML=icoSvg(t);frag.appendChild(sp)}
        else if(t)frag.appendChild(document.createTextNode(t));
      });
      n.parentNode.replaceChild(frag,n);
    });
  }
  function run(){raf=0;['#top','#page','#lesson','#cele','#nav','#mini','#toast'].forEach(function(s){const e=document.querySelector(s);if(e)fix(e)})}
  const mo=new MutationObserver(function(){if(!raf)raf=requestAnimationFrame(run)});
  function start(){mo.observe(document.body,{childList:true,subtree:true,characterData:true});run()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();

/* عدّاد النقاط: يرتفع تدريجيًا ونبضة عند الزيادة */
(function(){
  let shown=null;
  const _rt=renderTop;
  renderTop=function(){
    _rt.apply(this,arguments);
    try{
      const ch=document.querySelector('#top .chip[title="نقاط"] span');if(!ch)return;
      const target=S.xp||0;
      if(shown===null){shown=target;ch.textContent=cnum(target);return}
      if(target===shown){ch.textContent=cnum(target);return}
      const from=shown,dur=600,t0=performance.now();
      const chip=ch.parentNode;chip.classList.remove('tick');void chip.offsetWidth;chip.classList.add('tick');
      (function step(now){
        const k=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-k,3);
        ch.textContent=cnum(Math.round(from+(target-from)*e));
        if(k<1)requestAnimationFrame(step);else shown=target;
      })(t0);
    }catch(e){}
  };
})();
