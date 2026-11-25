/* 17: تلاوة تفاعلية — تلوين الكلمة الجارية أثناء استماع الآية (توقيت تقريبي حسب طول الكلمات) */
(function(){
  if(typeof AU==='undefined')return;
  var W=null;
  function clean(s){return s.replace(/[ً-ٰٟۖ-ۭـ]/g,'')}
  function prep(){
    W=null;
    document.querySelectorAll('.ayt .wd.on').forEach(function(x){x.classList.remove('on')});
    if(!AP||AP.mode!=='ayah')return;
    var p=document.querySelector('#ay'+AP.a+' .ayt');if(!p)return;
    if(!p.querySelector('.wd')){
      var n=p.firstChild;if(!n||n.nodeType!==3)return;
      var parts=n.nodeValue.split(/\s+/).filter(Boolean),fr=document.createDocumentFragment();
      parts.forEach(function(t,i){var s=document.createElement('span');s.className='wd';s.textContent=t;fr.appendChild(s);fr.appendChild(document.createTextNode(' '))});
      p.replaceChild(fr,n);
    }
    var ws=[].slice.call(p.querySelectorAll('.wd')),w=ws.map(function(x){return Math.max(2,clean(x.textContent).length)+1}),tot=w.reduce(function(a,b){return a+b},0),acc=0;
    W={els:ws,cum:w.map(function(x){acc+=x;return acc/tot})};
  }
  AU.addEventListener('playing',prep);
  AU.addEventListener('timeupdate',function(){
    if(!W||!AU.duration||!isFinite(AU.duration))return;
    var f=AU.currentTime/AU.duration,i=0;while(i<W.cum.length-1&&f>W.cum[i])i++;
    W.els.forEach(function(x,k){x.classList.toggle('on',k===i)});
  });
  AU.addEventListener('ended',function(){document.querySelectorAll('.ayt .wd.on').forEach(function(x){x.classList.remove('on')})});
  var st=document.createElement('style');st.textContent='.ayt .wd{border-radius:7px;transition:background .15s,color .15s;padding:0 2px}.ayt .wd.on{background:var(--accent-soft);color:var(--accent);box-shadow:0 0 0 2px var(--accent-soft)}';
  document.head.appendChild(st);
})();
