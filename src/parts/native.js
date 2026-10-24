/* ===== إحساس التطبيق الأصلي: زر الرجوع، النوافذ السفلية ===== */
(function(){
  let pushed=0;
  function lessonOpen(){const l=document.getElementById('lesson');return l&&!l.hidden}
  function celeOpen(){const c=document.getElementById('cele');return c&&!c.hidden}
  function sync(){
    const open=lessonOpen()||celeOpen();
    if(open&&!pushed){try{history.pushState({ov:1},'')}catch(e){}pushed=1}
    if(!open&&pushed){pushed=0;try{if(history.state&&history.state.ov)history.back()}catch(e){}}
  }
  const mo=new MutationObserver(sync);
  ['lesson','cele'].forEach(function(id){const el=document.getElementById(id);if(el)mo.observe(el,{attributes:true,attributeFilter:['hidden']})});
  window.addEventListener('popstate',function(){
    if(!pushed)return;
    pushed=0;
    if(celeOpen()){document.getElementById('cele').hidden=true;if(lessonOpen())sync();return}
    if(lessonOpen()){
      if(typeof L!=='undefined'&&L&&L.queue&&L.state==='ask'&&!L.review){L.confirm=true;renderLesson();pushed=0;sync();return}
      if(typeof CD!=='undefined'&&CD){CD=null}
      closeOverlay();
    }
  });
})();
