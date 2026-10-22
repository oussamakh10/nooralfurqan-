/* ================= التثبيت: نافذة موحّدة لأندرويد وآيفون وسطح المكتب ================= */
(function(){
  const SITE='https://nooralfurqan.netlify.app';
  const ua=navigator.userAgent;
  function env(){
    const ios=isIOS(),and=/android/i.test(ua);
    const inapp=/FBAN|FBAV|FB_IAB|Instagram|TikTok|musical_ly|Snapchat|Twitter|MicroMessenger|Telegram|WhatsApp|Line\/|Messenger|GSA\/|; wv\)/i.test(ua);
    const sam=/SamsungBrowser/i.test(ua),ff=/Firefox|FxiOS/i.test(ua),edge=/EdgA|EdgiOS|Edg\//i.test(ua),opr=/OPR\/|OPT\//i.test(ua);
    return {ios:ios,and:and,inapp:inapp,sam:sam,ff:ff,edge:edge,opr:opr,desk:!ios&&!and};
  }
  function step(n,t,d){return '<div class="card" style="display:flex;gap:12px;align-items:center;text-align:start"><div class="iosn"><span class="iosno">'+n+'</span></div><div style="flex:1"><b>'+esc(t)+'</b>'+(d?'<div class="muted" style="font-size:.9rem;line-height:1.6">'+esc(d)+'</div>':'')+'</div></div>'}
  function shell(title,body,foot){
    const c=$('#cele');
    c.innerHTML='<div class="obx"><div class="obtop"><div class="obowl">'+hoopoe('cheer',84)+'</div></div><div class="obbody"><h2 style="margin:0;text-align:center">'+esc(title)+'</h2>'+body+'</div><div class="obfoot">'+(foot||'')+'<button class="btn '+(foot?'ghost':'')+'" data-act="cclose">'+esc(g3(['إغلاق','Close','Fermer']))+'</button></div></div>';
    c.hidden=false;
  }
  window.openInstall=function(){
    if(window.__dip&&!DEFP)DEFP=window.__dip;
    const e=env();
    if(isStandalone()){shell(g3(['التطبيق مثبّت','Already installed','Déjà installée']),'<div class="card"><p>'+esc(g3(['أنت تستخدم التطبيق المثبّت الآن. بارك الله فيك!','You are using the installed app. Great!','Vous utilisez déjà l’application installée.']))+'</p></div>');return}
    if(!HOSTED){
      shell(g3(['التثبيت من الموقع','Install from the website','Installer depuis le site']),'<div class="card"><p>'+esc(g3(['أنت تتصفح النسخة المدمجة داخل Claude، ولا يمكن تثبيتها. افتح رابط الموقع نفسه في متصفح هاتفك ثم ثبّت من هناك.','You are viewing the preview inside Claude, which cannot be installed. Open the website link in your phone browser and install from there.','Vous voyez l’aperçu dans Claude, qui ne peut pas être installé. Ouvrez le lien du site dans le navigateur de votre téléphone.']))+'</p><div class="muted" dir="ltr">'+esc(SITE)+'</div></div>','<button class="btn gold" data-act="inst-copy" data-u="'+esc(SITE)+'">'+esc(g3(['نسخ رابط الموقع','Copy site link','Copier le lien']))+'</button>');
      return;
    }
    if(e.ios){openIosGuide();return}
    const link=location.href.split('#')[0].split('?')[0];
    if(e.inapp){
      const intent='intent://'+location.host+location.pathname+'#Intent;scheme=https;package=com.android.chrome;end';
      shell(g3(['افتح في المتصفح','Open in your browser','Ouvrir dans le navigateur']),'<div class="card"><p>'+esc(g3(['المتصفح الحالي (داخل تطبيق آخر) لا يدعم التثبيت. افتح الرابط في Chrome ثم اضغط «تثبيت».','This in-app browser cannot install apps. Open the link in Chrome, then tap “Install”.','Ce navigateur intégré ne permet pas l’installation. Ouvrez le lien dans Chrome.']))+'</p></div>',
        (e.and?'<a class="btn" style="text-decoration:none;text-align:center" href="'+esc(intent)+'">'+esc(g3(['فتح في Chrome','Open in Chrome','Ouvrir dans Chrome']))+'</a>':'')+'<button class="btn gold" data-act="inst-copy" data-u="'+esc(link)+'">'+esc(g3(['نسخ الرابط','Copy link','Copier le lien']))+'</button>');
      return;
    }
    if(DEFP){
      shell(g3(['ثبّت التطبيق','Install the app','Installer l’application']),'<div class="card"><p>'+esc(g3(['ثبّت «نور الفرقان» ليعمل بملء الشاشة ودون إنترنت وتجده بين تطبيقاتك.','Install “Nur al-Furqan” to use it full-screen and offline, right among your apps.','Installez « Nur al-Furqan » pour l’utiliser en plein écran et hors ligne.']))+'</p></div>','<button class="btn gold" data-act="inst-native">'+esc(g3(['تثبيت الآن','Install now','Installer maintenant']))+'</button>');
      return;
    }
    let st;
    if(e.sam)st=[[g3(['اضغط زر القائمة ☰ في أسفل المتصفح','Tap the ☰ menu at the bottom','Touchez le menu ☰ en bas']),''],[g3(['اختر «إضافة صفحة إلى» ثم «الشاشة الرئيسية»','Choose “Add page to” then “Home screen”','Choisissez « Ajouter la page à » puis « Écran d’accueil »']),''],[g3(['اضغط «إضافة»','Tap “Add”','Touchez « Ajouter »']),'']];
    else if(e.ff)st=[[g3(['اضغط ⋮ (القائمة)','Tap ⋮ (menu)','Touchez ⋮ (menu)']),''],[g3(['اختر «تثبيت»','Choose “Install”','Choisissez « Installer »']),g3(['أو «إضافة إلى الشاشة الرئيسية».','or “Add to Home screen”.','ou « Ajouter à l’écran d’accueil ».'])],[g3(['اضغط «إضافة»','Tap “Add”','Touchez « Ajouter »']),'']];
    else if(e.desk)st=[[g3(['ابحث عن أيقونة التثبيت ⊕ في شريط العنوان (يمين الشريط)','Look for the install icon ⊕ in the address bar','Cherchez l’icône d’installation ⊕ dans la barre d’adresse']),g3(['أو من القائمة ⋮ ← «حفظ ومشاركة» ← «تثبيت الصفحة كتطبيق».','Or menu ⋮ → “Save and share” → “Install page as app”.','Ou menu ⋮ → « Enregistrer et partager » → « Installer ».'])],[g3(['اضغط «تثبيت»','Click “Install”','Cliquez sur « Installer »']),'']];
    else st=[[g3(['اضغط ⋮ (القائمة) أعلى المتصفح','Tap the ⋮ menu at the top','Touchez le menu ⋮ en haut']),''],[g3(['اختر «تثبيت التطبيق»','Choose “Install app”','Choisissez « Installer l’application »']),g3(['وإن لم تجدها فاختر «إضافة إلى الشاشة الرئيسية».','If missing, choose “Add to Home screen”.','Sinon « Ajouter à l’écran d’accueil ».'])],[g3(['اضغط «تثبيت»','Tap “Install”','Touchez « Installer »']),g3(['ستجد أيقونة الهدهد بين تطبيقاتك.','The Hoopoe icon will appear among your apps.','L’icône de la huppe apparaîtra parmi vos applications.'])]];
    shell(g3(['ثبّت التطبيق','Install the app','Installer l’application']),st.map(function(s,i){return step(i+1,s[0],s[1])}).join('')+'<div class="card muted" style="font-size:.88rem;text-align:start">'+esc(g3(['إن لم يظهر الخيار: حدّث المتصفح، وأعد تحميل الصفحة، واستخدمها دقيقة ثم جرّب. ويظهر الخيار فقط في Chrome وSamsung Internet وEdge.','If the option is missing: update your browser, reload the page, use it for a minute and try again. It only appears in Chrome, Samsung Internet and Edge.','Si l’option manque : mettez à jour le navigateur, rechargez la page et réessayez.']))+'</div>','');
  };
  document.addEventListener('click',function(ev){
    const b=ev.target.closest&&ev.target.closest('button');if(!b)return;const a=b.dataset.act;
    if(a==='inst-native'&&DEFP){
      const d=DEFP;DEFP=null;window.__dip=null;
      try{d.prompt();d.userChoice.then(function(r){if(r&&r.outcome==='accepted'){S.instOk=1;save();const bar=document.getElementById('instbar');if(bar)bar.remove();$('#cele').hidden=true;toast(g3(['تم التثبيت!','Installed!','Installée !']))}else{toast(g3(['لم يكتمل التثبيت','Install cancelled','Installation annulée']))}}).catch(function(){})}catch(x){toast(g3(['تعذّر فتح نافذة التثبيت','Could not open the install dialog','Impossible d’ouvrir l’installation']))}
    }
    if(a==='inst-copy'){const u=b.dataset.u||location.href;try{navigator.clipboard.writeText(u).then(function(){toast(g3(['تم نسخ الرابط','Link copied','Lien copié']))},function(){toast(u)})}catch(x){toast(u)}}
  });
})();
