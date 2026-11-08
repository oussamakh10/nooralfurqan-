/* ===== المواقيت 2: بطاقة الصلاة القادمة + اختيار مدينة بنافذة التطبيق + بوصلة قبلة ===== */
(function(){
  const NM=[['fajr',['الفجر','Fajr','Fajr'],'🌌'],['sunrise',['الشروق','Sunrise','Lever du soleil'],'🌅'],['dhuhr',['الظهر','Dhuhr','Dhuhr'],'☀️'],['asr',['العصر','Asr','Asr'],'🌤️'],['maghrib',['المغرب','Maghrib','Maghrib'],'🌇'],['isha',['العشاء','Isha','Isha'],'🌙']];
  const PQ={on:false,h:null,hit:false};
  function headApply(){
    const i=document.querySelector('.pr-dial i'),r=document.querySelector('.pr-ring'),st=document.getElementById('prst');if(!i||PQ.h==null)return;
    const qb=+i.dataset.qb,rel=((qb-PQ.h)%360+360)%360;
    i.style.transform='rotate('+rel.toFixed(1)+'deg)';if(r)r.style.transform='rotate('+(-PQ.h).toFixed(1)+'deg)';
    const d=Math.min(rel,360-rel),hit=d<5;
    i.style.background=hit?'#d9b45a':'';
    if(st)st.textContent=hit?g3(['✓ الهاتف متجه نحو القبلة','✓ Your phone faces the Qibla','✓ Le téléphone est orienté vers la Qibla']):g3(['أدِر الهاتف حتى يشير السهم للأعلى','Turn your phone until the arrow points up','Tournez le téléphone jusqu’à ce que la flèche pointe vers le haut']);
    if(hit&&!PQ.hit&&navigator.vibrate)try{navigator.vibrate(40)}catch(x){}
    PQ.hit=hit;
  }
  function onOri(e){
    let h=null;
    if(typeof e.webkitCompassHeading==='number')h=e.webkitCompassHeading;
    else if(e.alpha!=null&&(e.absolute||e.type==='deviceorientationabsolute'))h=360-e.alpha;
    if(h==null)return;
    PQ.h=(h+360)%360;headApply();
  }
  function compassStop(){window.removeEventListener('deviceorientationabsolute',onOri,true);window.removeEventListener('deviceorientation',onOri,true);PQ.on=false;PQ.h=null;try{renderPrayer()}catch(x){}}
  function compassStart(){
    const go=function(){
      PQ.on=true;window.addEventListener('deviceorientationabsolute',onOri,true);window.addEventListener('deviceorientation',onOri,true);
      renderPrayer();
      setTimeout(function(){if(PQ.on&&PQ.h==null){const st=document.getElementById('prst');if(st)st.textContent=g3(['حسّاس الاتجاه غير متاح على هذا الجهاز أو المتصفح.','Orientation sensor not available on this device or browser.','Capteur d’orientation indisponible sur cet appareil ou navigateur.'])}},1800);
    };
    if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){
      DeviceOrientationEvent.requestPermission().then(function(r){if(r==='granted')go();else toast(g3(['لم يُمنح إذن الحسّاس','Sensor permission denied','Autorisation du capteur refusée']))}).catch(function(){toast(g3(['تعذّر تشغيل البوصلة','Could not start the compass','Impossible de démarrer la boussole']))});
    }else go();
  }
  function cn(x){return x==='الجزائر'?g3(['الجزائر','Algiers','Alger']):T(x)}
  function cd(h){const m=Math.max(0,Math.round(h*60)),a=Math.floor(m/60),b=m%60;
    return g3(['بعد ','in ','dans '])+(a?N(a)+g3([' س ',' h ',' h ']):'')+N(b)+g3([' د',' min',' min'])}
  function nearest(lat,lng){let b=null,bd=1e9;CITIES.forEach(function(c){const dl=rad(c[1]-lat),dg=rad(c[2]-lng),a=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(rad(lat))*Math.cos(rad(c[1]))*Math.sin(dg/2)*Math.sin(dg/2),d=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));if(d<bd){bd=d;b=c}});return b}
  renderPrayer=function(){
    const box=$('#ptbox');if(!box)return;
    const c=cityObj(),now=new Date(),tz=-now.getTimezoneOffset()/60,t=prayerTimes(c[1],c[2],now,tz,S.method);
    const nowH=now.getHours()+now.getMinutes()/60;
    let nx=NM.find(function(n){return t[n[0]]>nowH&&n[0]!=='sunrise'}),diff;
    if(nx)diff=t[nx[0]]-nowH;else{nx=NM[0];diff=t.fajr+24-nowH}
    const qb=qiblaBearing(c[1],c[2]);
    box.classList.add('pr2');
    box.innerHTML=
     '<button class="pr-city" data-pcity="open" aria-haspopup="dialog"><span class="pr-pin" aria-hidden="true">📍</span><span class="pr-cn"><small>'+esc(g3(['المدينة','City','Ville']))+'</small><b>'+esc(cn(c[0]))+'</b></span><span class="pr-chev" aria-hidden="true">⌄</span></button>'+
     '<div class="pr-next"><div class="pr-ni" aria-hidden="true">'+nx[2]+'</div><div class="pr-nt"><small>'+esc(g3(['الصلاة القادمة','Next prayer','Prochaine prière']))+'</small><b>'+esc(g3(nx[1]))+' · '+fmtT(t[nx[0]])+'</b><span>'+esc(cd(diff))+'</span></div></div>'+
     '<div class="pr-grid">'+NM.map(function(n){const on=n[0]===nx[0]&&(t[n[0]]>nowH||n[0]==='fajr'),past=t[n[0]]<=nowH&&!on;return '<div class="pr-t'+(on?' nx':'')+(past?' past':'')+'"><i aria-hidden="true">'+n[2]+'</i><span>'+esc(g3(n[1]))+'</span><b>'+fmtT(t[n[0]])+'</b></div>'}).join('')+'</div>'+
     '<div class="pr-q"><div class="pr-dial" aria-hidden="true"><div class="pr-ring"><em>N</em></div><i data-qb="'+qb.toFixed(1)+'" style="transform:rotate('+qb.toFixed(0)+'deg)"></i><u>🕋</u></div><div><b>'+esc(g3(['اتجاه القبلة','Qibla direction','Direction de la Qibla']))+' · '+N(Math.round(qb))+'°</b><p>'+esc(g3(['من الشمال الحقيقي باتجاه عقارب الساعة.','Clockwise from true north.','Dans le sens horaire depuis le nord vrai.']))+'</p><button class="pr-cbtn" data-pq="toggle">'+esc(PQ.on?g3(['إيقاف البوصلة','Stop compass','Arrêter la boussole']):g3(['تشغيل البوصلة الحية','Enable live compass','Activer la boussole en direct']))+'</button><p class="pr-st" id="prst" role="status" aria-live="polite"></p></div></div>'+
     '<p class="pr-note">ⓘ '+esc(g3(['الطريقة: ','Method: ','Méthode : ']))+esc(T(METH[S.method][0]))+' · '+esc(g3(['الأوقات حسابية بتوقيت جهازك، فتحقق منها مع مسجدك أو التقويم الرسمي.','Times are calculated using your device time zone; confirm with your mosque or the official calendar.','Horaires calculés selon le fuseau de votre appareil ; vérifiez auprès de votre mosquée ou du calendrier officiel.']))+'</p>';
    if(PQ.on)headApply();
  };
  function sheet(){
    let s=document.getElementById('prsheet');if(s)s.remove();
    s=document.createElement('div');s.id='prsheet';s.className='pr-ov';s.setAttribute('role','dialog');s.setAttribute('aria-modal','true');s.setAttribute('aria-label',g3(['اختر المدينة','Choose city','Choisir la ville']));
    s.innerHTML='<div class="pr-sh"><div class="pr-grab" aria-hidden="true"></div><div class="pr-sh-h"><h3>'+esc(g3(['اختر مدينتك','Choose your city','Choisissez votre ville']))+'</h3><button class="iconbtn sm" data-pcity="close" aria-label="'+esc(g3(['إغلاق','Close','Fermer']))+'">✕</button></div>'+
     '<input id="prq" type="search" placeholder="'+esc(g3(['ابحث عن مدينة…','Search a city…','Rechercher une ville…']))+'" autocomplete="off"><button class="pr-geo" data-pcity="geo">📡 '+esc(g3(['استخدم موقعي','Use my location','Utiliser ma position']))+'</button><div id="prl" class="pr-list" role="listbox"></div></div>';
    document.body.appendChild(s);list('');
    setTimeout(function(){const q=document.getElementById('prq');if(q&&!/Mobi|Android/i.test(navigator.userAgent))q.focus()},50);
  }
  function nrm(t){return String(t).replace(/[ً-ٰٟ]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').toLowerCase()}
  function list(q){
    const l=document.getElementById('prl');if(!l)return;q=nrm(q.trim());
    const cur=cityObj()[0],hs=CITIES.filter(function(c){return !q||nrm(c[0]).indexOf(q)>=0||nrm(cn(c[0])).indexOf(q)>=0});
    l.innerHTML=hs.length?hs.map(function(c){const on=c[0]===cur;return '<button role="option" aria-selected="'+on+'" class="pr-opt'+(on?' on':'')+'" data-pcity="pick" data-v="'+esc(c[0])+'"><span>'+esc(T(c[0]))+'</span><i aria-hidden="true">'+(on?'✓':'')+'</i></button>'}).join(''):'<p class="muted" style="text-align:center;padding:16px">'+esc(g3(['لا نتائج','No results','Aucun résultat']))+'</p>';
  }
  function close(){const s=document.getElementById('prsheet');if(s)s.remove()}
  document.addEventListener('click',function(e){
    const pq=e.target.closest('[data-pq]');if(pq){PQ.on?compassStop():compassStart();return}
    const b=e.target.closest('[data-pcity]');
    if(!b){if(e.target.id==='prsheet')close();return}
    const a=b.dataset.pcity;
    if(a==='open')sheet();
    else if(a==='close')close();
    else if(a==='pick'){S.city=b.dataset.v;save();close();renderPrayer()}
    else if(a==='geo'){
      if(!navigator.geolocation){toast(g3(['الموقع غير متاح','Location unavailable','Position indisponible']));return}
      navigator.geolocation.getCurrentPosition(function(p){const c=nearest(p.coords.latitude,p.coords.longitude);if(c){S.city=c[0];save();close();renderPrayer();toast(g3(['اخترنا أقرب مدينة: ','Nearest city selected: ','Ville la plus proche : '])+cn(c[0]))}},function(){toast(g3(['تعذّر تحديد الموقع','Could not get location','Position introuvable']))},{timeout:8000});
    }
  });
  document.addEventListener('input',function(e){if(e.target.id==='prq')list(e.target.value)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  try{if(document.getElementById('ptbox'))renderPrayer()}catch(e){}
  setInterval(function(){if(document.getElementById('ptbox')&&!document.getElementById('prsheet'))try{renderPrayer()}catch(e){}},60000);
})();
