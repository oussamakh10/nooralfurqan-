/* ================= ربط Google عبر Firebase (للنسخة المنشورة خارج claude.ai) ================= */
let FBCFG=null,FBAUTH=null,FBINIT=null;
const FBV='10.12.2';
function onClaude(){return !!(window.claude&&claude.use)}
function fbScript(u){return new Promise(function(res,rej){const s=document.createElement('script');s.src=u;s.async=true;s.onload=res;s.onerror=rej;document.head.appendChild(s)})}
function fbConfig(){
  if(onClaude())return Promise.resolve(null);
  if(FBCFG)return Promise.resolve(FBCFG);
  return fetch('firebase-config.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){
    if(j&&typeof j.apiKey==='string'&&typeof j.projectId==='string'&&typeof j.authDomain==='string'&&!/^YOUR|^$/.test(j.apiKey)){FBCFG={apiKey:j.apiKey,authDomain:j.authDomain,projectId:j.projectId,appId:j.appId||'',storageBucket:j.storageBucket||'',messagingSenderId:j.messagingSenderId||''}}
    return FBCFG;
  }).catch(function(){return null});
}
function fbLoad(){
  if(FBINIT)return FBINIT;
  FBINIT=fbConfig().then(function(c){
    if(!c)return null;
    const b='https://www.gstatic.com/firebasejs/'+FBV+'/firebase-';
    return fbScript(b+'app-compat.js').then(function(){return Promise.all([fbScript(b+'auth-compat.js'),fbScript(b+'firestore-compat.js')])}).then(function(){
      if(!window.firebase)return null;
      if(!firebase.apps.length)firebase.initializeApp(c);
      FBAUTH=firebase.auth();
      return FBAUTH;
    });
  }).catch(function(){return null});
  return FBINIT;
}
function fbSetUser(u){
  UID=u.uid;ACCT={id:u.uid,name:u.displayName||'',email:u.email||''};
  DBH=firebase.firestore();
  S.acct={linked:true,fb:1};
  if(!S.prof||!S.prof.name){if(u.displayName){S.prof=S.prof||{};S.prof.name=(S.prof.name||u.displayName.split(' ')[0]).slice(0,24)}}
  save();
}
function fbBoard(){
  if(!DBH)return;
  try{
    DBH.collection('board').onSnapshot(function(snap){
      const rows=[];
      snap.docs.forEach(function(d){const v=d.data();if(v)rows.push({id:d.id,wk:v.wk,xp:+v.xp||0,has:+v.has||0,circle:v.circle||'',kh:+v.kh||0,kn:+v.kn||0,name:String(v.nm||'مستخدم').slice(0,24)})});
      BOARD=rows.filter(function(x){return x.wk===weekKey()}).sort(function(a,b){return b.xp-a.xp}).slice(0,10);
      CIRC=S.circle?rows.filter(function(x){return x.circle===S.circle}).sort(function(a,b){return (b.kn*6236+b.kh)-(a.kn*6236+a.kh)}).slice(0,12):[];
      if(typeof TAB!=='undefined'&&TAB==='ach')fillBoard();
    },function(){});
    syncBoard();
  }catch(e){}
}
function fbLink(){
  return fbLoad().then(function(auth){
    if(!auth){toast(g3(["ربط Google غير مفعّل بعد في هذه النسخة","Google sign-in isn’t enabled yet in this version","La connexion Google n’est pas encore activée dans cette version"]));return false}
    const pr=new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(pr).then(function(r){
      fbSetUser(r.user);
      return pullState().then(function(){return pushNow()}).then(function(){fbBoard();toast(g3(["تم ربط حسابك وحُفظ تقدّمك","Account linked — your progress is saved","Compte relié — votre progression est enregistrée"]));return true});
    }).catch(function(e){
      const c=e&&e.code;
      if(c==='auth/popup-blocked'||c==='auth/operation-not-supported-in-this-environment'){S.acct={linked:false,fb:1};save();return auth.signInWithRedirect(pr).then(function(){return false})}
      if(c==='auth/unauthorized-domain')toast(g3(["هذا النطاق غير مسموح في إعدادات Firebase","This domain isn’t authorised in Firebase","Ce domaine n’est pas autorisé dans Firebase"]));
      else if(c!=='auth/popup-closed-by-user'&&c!=='auth/cancelled-popup-request')toast(g3(["تعذّر الربط الآن","Couldn’t link right now","Impossible de relier pour le moment"]));
      return false;
    });
  });
}
function fbOut(del){
  if(!FBAUTH){S.acct=null;save();return Promise.resolve()}
  const uid=UID,db=DBH;
  const wipe=del&&db&&uid?Promise.all([db.doc('data/users/'+uid+'/state').delete(),db.doc('board/'+uid).delete(),db.doc('reports/'+uid).delete()].map(function(p){return p.catch(function(){})})):Promise.resolve();
  return wipe.then(function(){return FBAUTH.signOut()}).then(function(){UID=null;ACCT=null;DBH=null;BOARD=[];CIRC=[];S.acct=null;save()}).catch(function(){});
}
// تحويل linkAccount وinitBoard حسب البيئة
(function(){
  const la=linkAccount,ib=initBoard,sb=syncBoard;
  linkAccount=function(){
    if(onClaude())return la();
    if(S.acct&&S.acct.linked&&UID)return pullState().then(function(){return pushNow()}).then(function(){toast(g3(["تمت المزامنة","Synced","Synchronisé"]));return true});
    return fbLink();
  };
  initBoard=function(){
    if(onClaude())return ib();
    if(!(S.acct&&S.acct.fb))return;           // لا نحمّل Firebase إلا لمن ربط حسابه
    fbLoad().then(function(auth){
      if(!auth)return;
      auth.onAuthStateChanged(function(u){if(u&&!UID){fbSetUser(u);pullState();fbBoard()}else if(!u&&S.acct&&!S.acct.linked){S.acct=null;save()}});
    });
  };
  syncBoard=function(){sb.apply(this,arguments)};
  const es=extraSettings;
  extraSettings=function(){
    let h=es();
    if(!onClaude()&&S.acct&&S.acct.linked){
      h+='<div class="setrow"><span>'+esc(g3(["تسجيل الخروج","Sign out","Se déconnecter"]))+'</span><button class="btn sm ghost" data-act="fb-out">'+esc(g3(["خروج","Sign out","Quitter"]))+'</button></div>'+
         '<div class="setrow"><span>'+esc(g3(["حذف بياناتي من السحابة","Delete my cloud data","Supprimer mes données cloud"]))+'</span><button class="btn sm ghost" data-act="fb-del">'+esc(g3(["حذف","Delete","Supprimer"]))+'</button></div>';
    }
    return h;
  };
  document.addEventListener('click',function(e){
    const t=e.target.closest('button');if(!t||t.disabled)return;const a=t.dataset.act;
    if(a==='fb-out'){fbOut(false).then(function(){toast(g3(["تم تسجيل الخروج. تقدّمك محفوظ على هذا الجهاز.","Signed out. Your progress stays on this device.","Déconnecté. Votre progression reste sur cet appareil."]));openSettings()});return}
    if(a==='fb-del'){if(confirm(T('سيُحذف تقدّمك المحفوظ في السحابة نهائيًا (يبقى ما على جهازك). متأكد؟'))){fbOut(true).then(function(){toast(g3(["حُذفت بياناتك من السحابة","Your cloud data was deleted","Vos données cloud ont été supprimées"]));openSettings()})}return}
  });
})();
