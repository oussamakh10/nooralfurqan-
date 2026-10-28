/* ===== لمسات: لوحات الألوان، شارة عدم الاتصال، الإبلاغ عند غياب الحساب ===== */
(function(){
  const PAL=[['green','#0F7A4C','أخضر','Green','Vert'],['gold','#A8730A','ذهبي','Gold','Or'],['ocean','#1C7E9E','أزرق','Blue','Bleu'],['rose','#B8456B','وردي','Rose','Rose'],['violet','#6F52C4','بنفسجي','Violet','Violet'],['crimson','#B83A33','قرمزي','Crimson','Cramoisi'],['teal','#118A8A','فيروزي','Teal','Turquoise'],['brown','#8A5A33','بنّي','Brown','Brun']];
  const es=extraSettings;
  extraSettings=function(){
    const cur=S.pal||'green';
    return es()+'<div class="setrow"><span>'+esc(g3(['لون التطبيق','App color','Couleur']))+'</span><span class="opts2">'+PAL.map(function(p){return '<button class="palb" data-pal="'+p[0]+'" style="background:'+p[1]+'" aria-label="'+esc(g3([p[2],p[3],p[4]]))+'" aria-pressed="'+(cur===p[0])+'"></button>'}).join('')+'</span></div>';
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('button[data-pal]');if(!b)return;
    S.pal=b.getAttribute('data-pal');save();applyTheme();openSettings();
  });
  /* شارة بلا إنترنت */
  const pill=document.createElement('div');pill.className='offp';pill.hidden=true;pill.setAttribute('role','status');
  pill.textContent=g3(['بلا إنترنت — يعمل التطبيق محليًا','Offline — the app works locally','Hors ligne — l’application fonctionne en local']);
  document.body.appendChild(pill);
  function upd(){pill.hidden=navigator.onLine!==false}
  window.addEventListener('online',upd);window.addEventListener('offline',upd);upd();
  /* الإبلاغ: إن لم يتوفر حساب نسخ البلاغ ليُلصق في رسالة */
  const sr=sendReport;
  sendReport=function(){
    const had=!!(typeof DBH!=='undefined'&&DBH&&typeof UID!=='undefined'&&UID);
    const note=(($('#repnote')||{}).value||'').trim();
    const q=(typeof RC!=='undefined'&&RC&&RC.q)||'';
    sr();
    if(!had){
      const txt='نور الفرقان — بلاغ\n'+(q?'السؤال: '+q+'\n':'')+(note?'الملاحظة: '+note:'');
      try{navigator.clipboard.writeText(txt).then(function(){toast(g3(['نُسخ البلاغ؛ الصقه في رسالة لنا','Report copied; paste it in a message to us','Signalement copié ; collez-le dans un message']))})}catch(x){}
    }
  };
})();
