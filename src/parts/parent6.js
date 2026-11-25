/* 19: ركن الوالدين — قفل رقمي محلي + تقرير أسبوعي + مشاركته */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  function hp(s){var h=5381;s=String(s)+'nf';for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return String(h)}
  var buf='',mode='';
  function days7(){var a=[],d=new Date();for(var i=6;i>=0;i--){var x=new Date();x.setDate(d.getDate()-i);var y=ymd(x);a.push({y:y,xp:S.xpd[y]||0,on:!!S.days[y]})}return a}
  function report(){
    var d=days7(),act=d.filter(function(x){return x.on}).length,xp=d.reduce(function(a,x){return a+x.xp},0),acc=S.q?Math.round((S.qc||0)/S.q*100):0;
    return {d:d,act:act,xp:xp,acc:acc,lessons:doneN(),streak:streak()};
  }
  function text(r){
    return tt(['تقرير الأسبوع في «نور الفرقان»','Weekly report — Nur al-Furqan','Rapport hebdomadaire — Nur al-Furqan'])+'\n'+
     tt(['أيام النشاط','Active days','Jours actifs'])+': '+r.act+'/7\n'+tt(['النقاط','Points','Points'])+': '+r.xp+'\n'+tt(['الدروس المكتملة','Lessons done','Leçons terminées'])+': '+r.lessons+'\n'+tt(['نسبة الإجابات الصحيحة','Correct answers','Réponses correctes'])+': '+r.acc+'%\n'+tt(['أيام متتالية','Streak','Série'])+': '+r.streak;
  }
  function pad4(){var h='<div class="center"><div class="mas">'+hoopoe('think',70)+'</div><h2>'+esc(tt(['ركن الوالدين','Parents’ corner','Espace parents']))+'</h2><p class="muted">'+esc(mode==='set'?tt(['اختر رمزًا من 4 أرقام','Choose a 4-digit code','Choisissez un code à 4 chiffres']):tt(['أدخل الرمز','Enter the code','Entrez le code']))+'</p><div style="font-size:2rem;letter-spacing:.5em;direction:ltr;min-height:2.4rem" aria-live="polite">'+'●'.repeat(buf.length)+'○'.repeat(4-buf.length)+'</div><div style="display:grid;grid-template-columns:repeat(3,64px);gap:10px;justify-content:center;direction:ltr;margin-top:10px">';
    [1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].forEach(function(k){h+='<button class="tag" style="height:56px;font-size:1.3rem" data-act="par-k" data-k="'+k+'">'+k+'</button>'});
    return h+'</div></div>'}
  function shell(inner){return '<div class="ltop"><button class="xbtn" data-act="par-x" aria-label="'+esc(tt(['إغلاق','Close','Fermer']))+'">'+IC.x+'</button></div><div class="lmain">'+inner+'</div>'}
  function view(){
    var r=report(),mx=Math.max.apply(null,r.d.map(function(x){return x.xp}).concat([1])),bars='<div style="display:flex;gap:6px;align-items:flex-end;height:90px;direction:ltr;margin:10px 0">'+
     r.d.map(function(x){return '<div style="flex:1;text-align:center"><div style="height:'+Math.max(4,Math.round(x.xp/mx*70))+'px;background:'+(x.on?'var(--accent)':'var(--line)')+';border-radius:6px 6px 2px 2px"></div><small class="muted">'+x.y.slice(8)+'</small></div>'}).join('')+'</div>';
    function st(b,l){return '<div class="stat"><b>'+b+'</b><span>'+esc(l)+'</span></div>'}
    $('#lesson').innerHTML=shell('<h2 class="center">'+esc(tt(['تقرير الأسبوع','Weekly report','Rapport hebdomadaire']))+'</h2>'+bars+
     '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">'+st(N(r.act)+'/7',tt(['أيام النشاط','Active days','Jours actifs']))+st(N(r.xp),tt(['النقاط','Points','Points']))+st(N(r.lessons),tt(['الدروس المكتملة','Lessons done','Leçons terminées']))+st(N(r.acc)+'%',tt(['الإجابات الصحيحة','Correct answers','Réponses correctes']))+'</div>'+
     '<div class="card" style="margin:12px 0"><div class="setrow"><span>'+esc(tt(['وضع الأطفال','Kids mode','Mode enfants']))+'</span><button class="tag" data-act="par-kids" aria-pressed="'+(!!S.kids)+'">'+esc(S.kids?tt(['مُفعّل','On','Activé']):tt(['مُغلق','Off','Désactivé']))+'</button></div></div>'+
     '<button class="btn" data-act="par-share">'+esc(tt(['مشاركة التقرير','Share report','Partager le rapport']))+'</button> <button class="btn ghost" data-act="par-reset" style="margin-top:8px">'+esc(tt(['تغيير الرمز','Change code','Changer le code']))+'</button>');
  }
  function open(){var c=$('#cele');if(c)c.hidden=true;openOverlay();buf='';if(!S.ppin){mode='set'}else mode='ask';$('#lesson').innerHTML=shell(pad4())}
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act^="par-"]');if(!b)return;var a=b.dataset.act;
    if(a==='par-open')return open();
    if(a==='par-x')return closeOverlay();
    if(a==='par-k'){var k=b.dataset.k;
      if(k==='⌫')buf=buf.slice(0,-1);else if(k==='✓'){}else if(buf.length<4)buf+=k;
      if(buf.length===4){
        if(mode==='set'){S.ppin=hp(buf);save();view();return}
        if(hp(buf)===S.ppin){view();return}
        buf='';try{toast(tt(['الرمز غير صحيح','Wrong code','Code incorrect']))}catch(_){}
      }
      $('#lesson').innerHTML=shell(pad4());return}
    if(a==='par-kids'){S.kids=!S.kids;save();applyTheme();view();return}
    if(a==='par-reset'){S.ppin='';save();open();return}
    if(a==='par-share'){var t=text(report());if(navigator.share)navigator.share({text:t}).catch(function(){});else if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){toast(tt(['نُسخ التقرير','Report copied','Rapport copié']))}).catch(function(){});return}
  });
  /* صف في الإعدادات */
  new MutationObserver(function(){
    var c=document.getElementById('cele');if(!c||c.hidden||c.querySelector('[data-act="par-open"]'))return;
    var k=c.querySelector('[data-set="kids"]');if(!k)return;var row=k.closest('.setrow');if(!row)return;
    var d=document.createElement('div');d.className='setrow';d.innerHTML='<span>'+esc(tt(['ركن الوالدين (تقرير أسبوعي)','Parents’ corner (weekly report)','Espace parents (rapport)']))+'</span><button class="tag" data-act="par-open">'+esc(tt(['فتح','Open','Ouvrir']))+'</button>';
    row.parentNode.insertBefore(d,row.nextSibling);
  }).observe(document.body,{childList:true,subtree:true});
})();
