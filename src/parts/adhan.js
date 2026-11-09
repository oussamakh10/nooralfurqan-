/* ===== الأذان: تنبيه وقت الصلاة مع الأذان كاملًا + إعداداته ===== */
(function(){
  const K=[['fajr',['الفجر','Fajr','Fajr']],['dhuhr',['الظهر','Dhuhr','Dhuhr']],['asr',['العصر','Asr','Asr']],['maghrib',['المغرب','Maghrib','Maghrib']],['isha',['العشاء','Isha','Isha']]];
  const NMK={};K.forEach(function(k){NMK[k[0]]=k[1]});
  function A(){if(!S.adh)S.adh={on:1,p:{fajr:1,dhuhr:1,asr:1,maghrib:1,isha:1},vol:1};if(!S.adh.p)S.adh.p={fajr:1,dhuhr:1,asr:1,maghrib:1,isha:1};if(!S.adhF)S.adhF={};return S.adh}
  let AU=null,ON=null;
  function times(d){const c=cityObj(),tz=-d.getTimezoneOffset()/60;return prayerTimes(c[1],c[2],d,tz,S.method)}
  function ds(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
  function chime(){
    try{const C=window.AudioContext||window.webkitAudioContext,x=new C(),t=x.currentTime;
      [523,659,784,659,523].forEach(function(f,i){const o=x.createOscillator(),g=x.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t+i*.7);g.gain.linearRampToValueAtTime(.25*A().vol,t+i*.7+.1);g.gain.exponentialRampToValueAtTime(.001,t+i*.7+1.5);o.connect(g);g.connect(x.destination);o.start(t+i*.7);o.stop(t+i*.7+1.6)})}catch(e){}
  }
  function stop(){if(AU){try{AU.pause();AU.currentTime=0}catch(e){}AU=null}}
  function play(key,test){
    stop();
    const f=key==='fajr'?'adhan/fajr.mp3':'adhan/adhan.mp3';
    const a=new Audio(f);a.volume=Math.max(.1,Math.min(1,A().vol));AU=a;
    a.onended=function(){if(!test)closeOv()};
    a.onerror=function(){
      if(key==='fajr'){const b=new Audio('adhan/adhan.mp3');b.volume=a.volume;AU=b;b.onended=a.onended;b.onerror=function(){AU=null;chime();noteMissing()};b.play().catch(function(){});return}
      AU=null;chime();noteMissing()};
    a.play().catch(function(){});
  }
  function noteMissing(){const n=document.getElementById('adhnote');if(n)n.hidden=false}
  function closeOv(){stop();const o=document.getElementById('adhov');if(o)o.remove()}
  function showOv(key,test){
    closeOv();
    const c=cityObj(),t=times(new Date())[key],nm=g3(NMK[key]);
    const o=document.createElement('div');o.id='adhov';o.setAttribute('role','alertdialog');o.setAttribute('aria-label',nm);
    o.innerHTML='<div class="adh-card"><svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><path d="M40 10a22 22 0 1 0 12 40 18 18 0 1 1-12-40z" fill="none" stroke="#e6c473" stroke-width="3" stroke-linejoin="round"/><path d="M48 14l1.8 4.2 4.2 1.8-4.2 1.8L48 26l-1.8-4.2L42 20l4.2-1.8z" fill="#e6c473"/></svg>'+
      '<small>'+esc(g3(['حان الآن موعد الأذان','It is time for the call to prayer','C’est l’heure de l’appel à la prière']))+'</small>'+
      '<h2>'+esc(g3(['أذان ','Adhan · ','Adhan · '])+nm)+'</h2>'+
      '<p>'+esc(T(c[0])==='الجزائر'?g3(['الجزائر','Algiers','Alger']):T(c[0]))+' · '+esc(fmtT(t))+'</p>'+
      '<p class="adh-d">'+esc(g3(['اللهم اجعلنا من المحافظين على الصلاة','May God make us steadfast in prayer','Que Dieu nous rende assidus à la prière']))+'</p>'+
      '<div class="adh-b"><button class="btn gold" data-adh="stop">'+esc(g3(['إيقاف الصوت','Stop sound','Couper le son']))+'</button><button class="btn ghost" data-adh="close">'+esc(g3(['إغلاق','Close','Fermer']))+'</button></div></div>';
    document.body.appendChild(o);play(key,test);
  }
  function tick(){
    try{
      const a=A();if(!a.on)return;
      const d=new Date(),t=times(d),nowH=d.getHours()+d.getMinutes()/60+d.getSeconds()/3600;
      K.forEach(function(k){
        const key=k[0],v=t[key];if(isNaN(v)||!a.p[key])return;
        const id=ds(d)+key;if(a.f&&0)return;
        if(nowH>=v&&nowH<v+2/60&&!S.adhF[id]){S.adhF[id]=1;
          const ks=Object.keys(S.adhF);if(ks.length>40)ks.slice(0,ks.length-30).forEach(function(x){delete S.adhF[x]});
          save();showOv(key)}
      });
    }catch(e){}
  }
  function schedule(){
    try{
      const LN=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.LocalNotifications;if(!LN)return;
      const a=A();
      LN.getPending().then(function(p){return p.notifications&&p.notifications.length?LN.cancel({notifications:p.notifications.map(function(n){return {id:n.id}})}):null}).then(function(){
        if(!a.on)return;
        return LN.requestPermissions().then(function(r){
          if(r.display!=='granted')return;
          return LN.createChannel({id:'adhan',name:g3(['الأذان','Adhan','Adhan']),importance:5,sound:'adhan',vibration:true,visibility:1}).catch(function(){}).then(function(){
            const list=[],now=Date.now();
            for(let i=0;i<6;i++){const d=new Date();d.setDate(d.getDate()+i);const t=times(d);
              K.forEach(function(k,j){if(!a.p[k[0]]||isNaN(t[k[0]]))return;
                const at=new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0);at.setMinutes(Math.round(t[k[0]]*60));
                if(at.getTime()>now+5000)list.push({id:100+i*10+j,title:g3(['حان وقت صلاة ','Time for ','C’est l’heure de '])+g3(NMK[k[0]]),body:g3(['اللهم اجعلنا من المحافظين على الصلاة','May God make us steadfast in prayer','Que Dieu nous rende assidus à la prière']),channelId:'adhan',schedule:{at:at,allowWhileIdle:true},extra:{k:k[0]}})})}
            if(list.length)return LN.schedule({notifications:list})})
        })
      }).catch(function(){});
      if(!ON){ON=1;try{LN.addListener('localNotificationActionPerformed',function(e){const k=e&&e.notification&&e.notification.extra&&e.notification.extra.k;if(k)showOv(k)})}catch(e){}}
    }catch(e){}
  }
  const _rp=renderPrayer;
  renderPrayer=function(){
    _rp();
    try{
      const box=document.getElementById('ptbox');if(!box||box.querySelector('.adh-set'))return;
      const a=A(),note=box.querySelector('.pr-note');
      const d=document.createElement('div');d.className='adh-set';
      d.innerHTML='<div class="adh-h"><b>'+esc(g3(['الأذان والتنبيه','Adhan & alerts','Adhan et alertes']))+'</b>'+
        '<button class="adh-sw" role="switch" aria-checked="'+(a.on?'true':'false')+'" data-adh="tog" aria-label="'+esc(g3(['تفعيل الأذان','Enable adhan','Activer l’adhan']))+'"><i></i></button></div>'+
        '<div class="adh-ch">'+K.map(function(k){return '<button class="tag" data-adh="p" data-k="'+k[0]+'" aria-pressed="'+(a.p[k[0]]?'true':'false')+'">'+esc(g3(k[1]))+'</button>'}).join('')+'</div>'+
        '<label class="adh-v"><span>'+esc(g3(['مستوى الصوت','Volume','Volume']))+'</span><input type="range" min="10" max="100" value="'+Math.round(a.vol*100)+'" data-adh="vol" aria-label="'+esc(g3(['مستوى الصوت','Volume','Volume']))+'"></label>'+
        '<button class="btn sm ghost" data-adh="test">'+esc(g3(['تجربة الأذان','Test the adhan','Tester l’adhan']))+'</button>'+
        '<p class="pr-note" id="adhnote" hidden>'+esc(g3(['لم يُضَف ملف صوت الأذان بعد، فيُسمع نغم هادئ بدلًا منه.','The adhan audio file has not been added yet, so a soft chime plays instead.','Le fichier audio de l’adhan n’est pas encore ajouté ; une douce sonnerie est jouée à la place.']))+'</p>'+
        '<p class="pr-note">'+esc(g3(['يعمل التنبيه تلقائيًا عند حلول الوقت. في التطبيق المثبّت يصلك إشعار بصوت الأذان، وعند فتحه يُسمع الأذان كاملًا.','The alert plays automatically at prayer time. In the installed app you get a notification with the adhan, and opening it plays the full call.','L’alerte se déclenche à l’heure de la prière. Dans l’application installée, une notification avec l’adhan arrive, et l’ouvrir joue l’appel complet.']))+'</p>';
      if(note)note.parentNode.insertBefore(d,note);else box.appendChild(d);
    }catch(e){}
    schedule();
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-adh]');if(!b)return;const a=A(),k=b.dataset.adh;
    if(k==='stop'){stop();return}
    if(k==='close'){closeOv();return}
    if(k==='tog'){a.on=a.on?0:1;save();b.setAttribute('aria-checked',a.on?'true':'false');schedule();return}
    if(k==='p'){const q=b.dataset.k;a.p[q]=a.p[q]?0:1;save();b.setAttribute('aria-pressed',a.p[q]?'true':'false');schedule();return}
    if(k==='test'){showOv('dhuhr',true);return}
  });
  document.addEventListener('input',function(e){const b=e.target;if(b&&b.dataset&&b.dataset.adh==='vol'){A().vol=(+b.value)/100;if(AU)AU.volume=A().vol;save()}});
  setInterval(tick,15000);setTimeout(tick,3000);setTimeout(schedule,4000);
  try{if(document.getElementById('ptbox'))renderPrayer()}catch(e){}
})();
