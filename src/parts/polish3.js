/* ===== تنبيه الجلالين، سجلّ أسئلة المساعد ===== */
(function(){
  const NOTE={ar:'ملاحظة: الجلالين تفسير مختصر جدًا، يصلح للفهم الإجمالي. للتوسّع راجع التفسير الميسر أو تفاسير أهل العلم.',en:'Note: Jalalayn is very concise — good for a quick overview. For more depth see Al-Muyassar or detailed tafsirs.',fr:'Note : le Jalalayn est très concis, utile pour une vue d’ensemble. Pour approfondir, consultez Al-Muyassar ou des tafsirs détaillés.'};
  new MutationObserver(function(){
    document.querySelectorAll('h4').forEach(function(h){
      if(h.textContent==='تفسير الجلالين'&&!h.parentNode.querySelector('.jn')){
        const s=document.createElement('small');s.className='muted jn';s.style.display='block';s.textContent=NOTE[typeof LANG!=='undefined'?LANG:(S.lang||'ar')]||NOTE.ar;h.parentNode.appendChild(s);
      }
    });
  }).observe(document.body,{childList:true,subtree:true});
  const _as=askSend;
  askSend=function(t){
    try{const q=String(t||'').trim();if(q&&q.length<120){S.ah=[q].concat((S.ah||[]).filter(function(x){return x!==q})).slice(0,6);save()}}catch(e){}
    return _as.apply(this,arguments);
  };
  const _ra=renderAssistant;
  renderAssistant=function(){
    const r=_ra.apply(this,arguments);
    try{
      const c=document.querySelector('.ak-chips');
      if(c&&S.ah&&S.ah.length&&!c.parentNode.querySelector('.ak-hist')){
        const d=document.createElement('div');d.className='ak-chips ak-hist';
        d.innerHTML='<small class="muted" style="width:100%">'+esc(g3(['أسئلتك السابقة','Your recent questions','Vos questions récentes']))+'</small>'+S.ah.map(function(c){return '<button class="chip" data-act="ask-chip" data-q="'+esc(c)+'">'+esc(c)+'</button>'}).join('');
        c.after(d);
      }
    }catch(e){}
    return r;
  };
})();
