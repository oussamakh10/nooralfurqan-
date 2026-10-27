/* ================= لمسات احترافية: شاشة البداية، التثبيت، التحديث، عن التطبيق والخصوصية ================= */
const APPVER='36';
function isStandalone(){try{return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}catch(e){return false}}
function isIOS(){return (/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))&&!window.MSStream}
const HOSTED=!(window.claude&&claude.use)&&/^https?:$/.test(location.protocol);

/* ---- شاشة البداية (للتطبيق المثبَّت فقط) ---- */
(function(){
  if(!isStandalone())return;
  const d=document.createElement('div');d.id='splash';
  d.innerHTML='<div class="sp-in">'+hoopoe('happy',150)+'<h1>نور الفرقان</h1></div>';
  document.body.appendChild(d);
  setTimeout(function(){d.classList.add('out');setTimeout(function(){d.remove()},500)},1100);
})();

/* ---- زر التثبيت ---- */
let DEFP=null;
if(window.__dip)DEFP=window.__dip;
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();DEFP=e;window.__dip=e;showInstBar()});
window.addEventListener('appinstalled',function(){DEFP=null;S.instOk=1;save();const b=document.getElementById('instbar');if(b)b.remove()});
function showInstBar(){
  if(!HOSTED||isStandalone()||S.instOk||document.getElementById('instbar'))return;
  if(S.instDis&&Date.now()-S.instDis<3*864e5)return;
  const b=document.createElement('div');b.id='instbar';b.setAttribute('role','region');
  b.innerHTML='<span>'+esc(g3(["ثبّت التطبيق على هاتفك للوصول السريع ودون إنترنت","Install the app for quick, offline access","Installez l’application pour un accès rapide, même hors ligne"]))+'</span>'+
    '<button class="btn sm" data-act="inst-go">'+esc(g3(["تثبيت","Install","Installer"]))+'</button>'+
    '<button class="iconbtn" data-act="inst-x" aria-label="'+esc(g3(["إغلاق","Close","Fermer"]))+'">'+IC.x+'</button>';
  document.body.appendChild(b);
}
function doInstall(){openInstall()}
setTimeout(showInstBar,4000);

/* ---- إشعار التحديث ---- */
if(HOSTED&&'serviceWorker' in navigator){
  const had=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange',function(){
    if(!had)return;
    toast(g3(["صدر تحديث جديد. أعد فتح التطبيق للاستفادة منه.","A new update is available. Reopen the app to use it.","Une mise à jour est disponible. Rouvrez l’application pour en profiter."]));
  });
}

/* ---- اختصارات الأيقونة (?go=...) ---- */
setTimeout(function(){
  try{
    const g=new URLSearchParams(location.search).get('go');
    if(!g||$('#lesson').hidden===false)return;
    if(g==='dhikr'){loadQ().then(function(){openDhikr('tasbih')}).catch(function(){openDhikr('tasbih')})}
    else if(TABS.some(function(t){return t[0]===g}))go(g);
  }catch(e){}
},900);

/* ---- عن التطبيق والخصوصية ---- */
const ABOUT=[
 {t:["عن التطبيق","About the app","À propos"],p:[
  ["«نور الفرقان» تطبيق مجاني لتعلّم الإسلام والقرآن بطريقة ممتعة، يرافقك فيه الهدهد. أعدّه خلوفي أسامة.","“Nur al-Furqan” is a free app for learning Islam and the Qur’an in a fun way, with the Hoopoe as your companion. Created by Khelloufi Oussama.","« Nur al-Furqan » est une application gratuite pour apprendre l’islam et le Coran de façon ludique, avec la Huppe pour compagnon. Créée par Khelloufi Oussama."]]},
 {t:["المصادر","Sources","Sources"],p:[
  ["نص المصحف، والتفسير الميسر وتفسير الجلالين، وترجمة معاني القرآن إلى الإنجليزية (Pickthall) والفرنسية (Hamidullah)، والتلاوات من mp3quran.net وEveryAyah.","The Qur’an text, Al-Muyassar and Al-Jalalayn tafsirs, English (Pickthall) and French (Hamidullah) translations, and recitations from mp3quran.net and EveryAyah.","Le texte coranique, les tafsirs Al-Muyassar et Al-Jalalayn, les traductions anglaise (Pickthall) et française (Hamidullah), et les récitations de mp3quran.net et EveryAyah."],
  ["الدروس والأسئلة معدّة للتعليم العام ولم تخضع بعدُ لمراجعة شرعية رسمية، فقد تحتوي أخطاءً. إن وجدتَ خطأً فاستعمل «أبلغ عن خطأ». وللفتوى الخاصة راجع عالمًا موثوقًا.","Lessons and questions are for general education and have not yet had a formal scholarly review, so they may contain mistakes. If you find one, use “Report a mistake”. For personal rulings, consult a trusted scholar.","Les leçons et questions sont destinées à l’éducation générale et n’ont pas encore fait l’objet d’une relecture savante officielle ; elles peuvent contenir des erreurs. Si vous en trouvez une, utilisez « Signaler une erreur ». Pour un avis personnel, consultez un savant de confiance."]]},
 {t:["الخصوصية","Privacy","Confidentialité"],p:[
  ["تقدّمك محفوظ على جهازك فقط ما لم تربط حسابك. لا توجد إعلانات ولا أدوات تتبّع.","Your progress is stored on your device only unless you link an account. There are no ads and no trackers.","Votre progression est enregistrée uniquement sur votre appareil, sauf si vous reliez un compte. Il n’y a ni publicité ni traceur."],
  ["عند ربط Google (اختياري): يُحفظ تقدّمك والاسم الذي اخترتَه للّوحة الأسبوعية في خدمة Google Firebase، ويحتفظ المزوّد بمعرّف حسابك وبريدك لتسجيل الدخول. لا يظهر بريدك لغيرك. يمكنك حذف بياناتك من السحابة في أي وقت من الإعدادات.","If you link Google (optional): your progress and the display name you chose for the weekly board are stored in Google Firebase, and the provider keeps your account ID and email for sign-in. Your email is not shown to others. You can delete your cloud data at any time in Settings.","Si vous reliez Google (facultatif) : votre progression et le nom d’affichage choisi pour le classement hebdomadaire sont stockés dans Google Firebase, qui conserve votre identifiant et votre e-mail pour la connexion. Votre e-mail n’est pas visible par les autres. Vous pouvez supprimer vos données cloud à tout moment dans les Réglages."],
  ["الأصوات والترجمات الفرنسية تُحمَّل من خوادم خارجية (mp3quran وEveryAyah وalquran.cloud)، وقد ترى هذه الخوادم عنوان الإنترنت الخاص بك كأي موقع.","Audio and French translations are loaded from external servers (mp3quran, EveryAyah, alquran.cloud), which may see your IP address like any website.","Les audios et les traductions françaises sont chargés depuis des serveurs externes (mp3quran, EveryAyah, alquran.cloud), qui peuvent voir votre adresse IP comme tout site web."],
  ["نوصي بأن يستعين الأطفال بوليّ أمرهم قبل ربط أي حساب.","We recommend that children ask a parent or guardian before linking any account.","Nous recommandons que les enfants demandent l’accord d’un parent avant de relier un compte."]]},
 {t:["التواصل","Contact","Contact"],p:[
  ["اقتراحاتك وملاحظاتك تصلنا من «أبلغ عن مشكلة أو اقتراح» في الإعدادات.","Your suggestions reach us through “Report a problem or suggestion” in Settings.","Vos suggestions nous parviennent via « Signaler un problème ou une suggestion » dans les Réglages."]]}
];
function openAbout(){
  openOverlay();
  $('#lesson').innerHTML='<div class="ltop"><button class="xbtn" data-act="leave" aria-label="'+esc(g3(["إغلاق","Close","Fermer"]))+'">'+IC.x+'</button><h2 style="flex:1;font-size:1.2rem">'+esc(g3(["عن التطبيق والخصوصية","About & privacy","À propos et confidentialité"]))+'</h2></div>'+
   '<div class="lmain"><div class="center" style="margin-bottom:8px"><div class="mas">'+hoopoe('happy',96)+'</div><b>نور الفرقان</b><span class="muted" style="font-size:.85rem">'+esc(g3(["الإصدار","Version","Version"]))+' '+APPVER+'</span></div>'+
   ABOUT.map(function(s){return '<div class="card gd"><b>'+esc(g3(s.t))+'</b>'+s.p.map(function(x){return '<p class="gdp">'+esc(g3(x))+'</p>'}).join('')+'</div>'}).join('')+'</div>';
}
(function(){
  const es=extraSettings;
  extraSettings=function(){
    let h=es();
    if(!isStandalone())h+='<div class="setrow"><span>'+esc(g3(["تثبيت التطبيق","Install the app","Installer l’application"]))+'</span><button class="btn sm ghost" data-act="inst-go">'+esc(g3(["تثبيت","Install","Installer"]))+'</button></div>';
    return h+'<div class="setrow"><span>'+esc(g3(["عن التطبيق والخصوصية","About & privacy","À propos et confidentialité"]))+'</span><button class="btn sm ghost" data-act="about-open">'+esc(g3(["فتح","Open","Ouvrir"]))+'</button></div>';
  };
  document.addEventListener('click',function(e){
    const t=e.target.closest('button');if(!t||t.disabled)return;const a=t.dataset.act;
    if(a==='inst-go'){doInstall();return}
    if(a==='inst-x'){S.instDis=Date.now();save();const b=document.getElementById('instbar');if(b)b.remove();return}
    if(a==='about-open'){$('#cele').hidden=true;openAbout();return}
  });
})();
