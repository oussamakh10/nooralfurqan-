/* ===== الامتثال القانوني: موافقة أولى، تقييد السحابة بالعمر، روابط الوثائق ===== */
(function(){
  const CLOUD_AGE=16;
  function ageNum(){const a=S.prof&&S.prof.age;if(typeof a==='number')return a;if(a==='adult'||a==='senior')return 99;return 0}
  window.cloudOK=function(){return !S.kids&&ageNum()>=CLOUD_AGE&&!!S.consent};
  function why(){
    if(S.kids||(ageNum()&&ageNum()<CLOUD_AGE))return g3(['هذه الميزة لمن بلغ 16 سنة فأكثر حفاظًا على خصوصية الصغار.','This feature is for ages 16+ to protect children’s privacy.','Cette fonction est réservée aux 16 ans et plus pour protéger la vie privée des enfants.']);
    if(!S.consent)return g3(['وافق أولًا على سياسة الخصوصية من الإعدادات.','Please accept the privacy policy in Settings first.','Acceptez d’abord la politique de confidentialité dans les Réglages.']);
    return g3(['أدخل عمرك من «حسابي وبياناتي» لتفعيل هذه الميزة.','Enter your age under “My account & data” to enable this.','Indiquez votre âge dans « Mon compte et mes données » pour activer cela.']);
  }
  function gate(name,fallback){
    const f=window[name];if(typeof f!=='function')return;
    window[name]=function(){if(!cloudOK()){toast(why());return fallback}return f.apply(this,arguments)};
  }
  gate('linkAccount',false);gate('fbLink',false);gate('duelJoin');
  /* لا نحمّل Firebase ولا نزامن اللوحة لمن لا تسمح له السن */
  ['initBoard','syncBoard'].forEach(function(n){const f=window[n];if(typeof f!=='function')return;window[n]=function(){if(!cloudOK())return;return f.apply(this,arguments)}});

  function links(){return [['privacy.html',g3(['سياسة الخصوصية','Privacy policy','Confidentialité'])],['terms.html',g3(['شروط الاستخدام','Terms of use','Conditions'])],['sources.html',g3(['المصادر والتراخيص','Sources & licences','Sources et licences'])]].map(function(x){return '<a href="'+x[0]+'" target="_blank" rel="noopener" style="color:var(--accent)">'+esc(x[1])+'</a>'}).join(' · ')}
  function consent(){
    let m=document.getElementById('lgm');
    if(!m){m=document.createElement('div');m.id='lgm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');document.body.appendChild(m)}
    m.innerHTML='<div class="bc-card"><div class="bc-t">'+esc(g3(['خصوصيتك أولًا','Your privacy first','Votre vie privée d’abord']))+'</div>'+
      '<p>'+esc(g3(['تقدّمك يُحفظ على جهازك فقط، بلا تتبّع ولا إعلانات مخصّصة. الدخول بجوجل والمتصدرون اختياريان لمن بلغ 16 سنة. الأطفال دون 13 سنة يستعملون وضع الأطفال دون أي بيانات سحابية. بالمتابعة تقرّ بقراءة الوثائق التالية:','Your progress stays on your device only, with no tracking or personalised ads. Google sign-in and leaderboards are optional for ages 16+. Under-13s use kids mode with no cloud data. By continuing you confirm you have read:','Votre progression reste sur votre appareil, sans pistage ni publicité personnalisée. La connexion Google et les classements sont facultatifs dès 16 ans. Les moins de 13 ans utilisent le mode enfant sans données cloud. En continuant, vous confirmez avoir lu :']))+'</p>'+
      '<p style="font-size:.9rem">'+links()+'</p>'+
      '<div class="hpbtns"><button class="btn" data-lg="ok">'+esc(g3(['أوافق وأتابع','I agree and continue','J’accepte et je continue']))+'</button></div></div>';
    m.hidden=false;
  }
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-lg]');if(!b)return;
    if(b.dataset.lg==='ok'){S.consent={v:1,t:Date.now()};save();const m=document.getElementById('lgm');if(m)m.hidden=true}
    if(b.dataset.lg==='open'){consent()}
    if(b.dataset.lg==='revoke'){
      if(!confirm(T('سحب الموافقة يوقف ميزات السحابة ويسجّل خروجك. متأكد؟')))return;
      const done=function(){S.consent=null;save();toast(g3(['تم سحب الموافقة','Consent withdrawn','Consentement retiré']));try{openSettings()}catch(x){}};
      if(typeof fbOut==='function'&&S.acct)fbOut(true).then(done);else done();
    }
  });
  function row(){
    return '<div class="setrow" style="flex-direction:column;align-items:flex-start;gap:6px"><span>'+esc(g3(['الخصوصية والقانون','Privacy & legal','Confidentialité et légal']))+'</span><span style="font-size:.88rem">'+links()+'</span>'+
       '<span style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm ghost" data-lg="open">'+esc(g3(['ملخص الخصوصية','Privacy summary','Résumé confidentialité']))+'</button>'+
       (S.consent?'<button class="btn sm ghost" data-lg="revoke">'+esc(g3(['سحب الموافقة','Withdraw consent','Retirer le consentement']))+'</button>':'')+'</span></div>';
  }
  const _os=openSettings;
  openSettings=function(){
    _os.apply(this,arguments);
    try{
      const c=document.querySelector('#cele .setcard');if(!c||c.querySelector('.lgrow'))return;
      const me=[].slice.call(c.querySelectorAll('.sg')).find(function(d){return d.querySelector('[data-act="prof-edit"]')});
      const box=(me&&me.querySelector('.sgb'))||c.querySelector('.sg .sgb')||c;
      const w=document.createElement('div');w.className='lgrow';w.innerHTML=row();box.appendChild(w);
    }catch(e){}
  };
  if(!S.consent)setTimeout(consent,1300);
})();
