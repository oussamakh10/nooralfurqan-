/* عرض تذكير يومي لطيف مرة واحدة بعد أول يوم نشاط */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  function show(){
    if(S.rem||S.remAsk||!S.days||!S.days[today()]||document.getElementById('nudgeRem'))return;
    var host=document.querySelector('.hm-hero');if(!host||!host.parentNode)return;
    var d=document.createElement('div');d.id='nudgeRem';d.className='card';d.style.cssText='margin:10px 0;text-align:center';
    d.innerHTML='<b>'+esc(tt(['هل أذكّرك بوردك كل يوم؟','Shall I remind you daily?','Un petit rappel chaque jour ?']))+'</b><p class="muted" style="margin:4px 0 10px">'+esc(tt(['إشعار لطيف واحد في الثامنة مساءً. يمكنك تغيير الوقت من الإعدادات.','One gentle notification at 8 pm. Change the time in Settings.','Une notification douce à 20 h. Modifiable dans les réglages.']))+'</p><button class="tag on" data-act="nr-yes">'+esc(tt(['نعم','Yes','Oui']))+'</button> <button class="tag" data-act="nr-no">'+esc(tt(['لاحقًا','Later','Plus tard']))+'</button>';
    host.parentNode.insertBefore(d,host.nextSibling);
  }
  var r=0;new MutationObserver(function(){if(r)return;r=requestAnimationFrame(function(){r=0;show()})}).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act^="nr-"]');if(!b)return;
    S.remAsk=1;if(b.dataset.act==='nr-yes'){S.rem='20:00';S.remd=null;try{if('Notification' in window&&Notification.permission==='default')Notification.requestPermission()}catch(_){}}
    save();var n=document.getElementById('nudgeRem');if(n)n.remove();
  });
})();
