/* ===== المواقيت 2: بطاقة الصلاة القادمة + اختيار مدينة بنافذة التطبيق + بوصلة قبلة ===== */
(function(){
  const NM=[['fajr',['الفجر','Fajr','Fajr'],'fajr'],['sunrise',['الشروق','Sunrise','Lever du soleil'],'sunrise'],['dhuhr',['الظهر','Dhuhr','Dhuhr'],'dhuhr'],['asr',['العصر','Asr','Asr'],'asr'],['maghrib',['المغرب','Maghrib','Maghrib'],'maghrib'],['isha',['العشاء','Isha','Isha'],'isha']];
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
  const IC2={"fajr": "<svg viewBox=\"0 0 24 24\" width=\"__W__\" height=\"__W__\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 18h18\"/><path d=\"M7 18a5 5 0 0 1 10 0\"/><path d=\"M12 8v2M5.6 11.6l1.4 1.4M18.4 11.6 17 13\"/><path d=\"M5 5l.6 1.3L7 7l-1.4.7L5 9l-.6-1.3L3 7l1.4-.7zM18 3l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z\" fill=\"currentColor\" stroke-width=\"1\"/></svg>", "sunrise": "<svg viewBox=\"0 0 24 24\" width=\"__W__\" height=\"__W__\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 19h18\"/><path d=\"M6.5 19a5.5 5.5 0 0 1 11 0\"/><path d=\"M12 4v5M9.5 6.5 12 4l2.5 2.5\"/><path d=\"M4.2 12.2l1.5 1.5M19.8 12.2l-1.5 1.5\"/></svg>", "dhuhr": "<svg viewBox=\"0 0 24 24\" width=\"__W__\" height=\"__W__\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4.2\"/><path d=\"M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6\"/></svg>", "asr": "<svg viewBox=\"0 0 24 24\" width=\"__W__\" height=\"__W__\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"9\" cy=\"9\" r=\"3.4\"/><path d=\"M9 2.5v1.6M2.5 9h1.6M4.4 4.4l1.1 1.1M13.6 4.4l-1.1 1.1\"/><path d=\"M9.5 20h9a3.2 3.2 0 0 0 .3-6.4 4.6 4.6 0 0 0-8.7 1.2A2.8 2.8 0 0 0 9.5 20z\"/></svg>", "maghrib": "<svg viewBox=\"0 0 24 24\" width=\"__W__\" height=\"__W__\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 19h18\"/><path d=\"M6.5 19a5.5 5.5 0 0 1 11 0\"/><path d=\"M12 3.5v6M9.5 7 12 9.5 14.5 7\"/><path d=\"M4.2 12.2l1.5 1.5M19.8 12.2l-1.5 1.5\"/></svg>", "isha": "<svg viewBox=\"0 0 24 24\" width=\"__W__\" height=\"__W__\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z\"/><path d=\"M17 4l.6 1.4L19 6l-1.4.6L17 8l-.6-1.4L15 6l1.4-.6z\" fill=\"currentColor\" stroke-width=\"1\"/></svg>", "pin": "<svg viewBox=\"0 0 24 24\" width=\"__W__\" height=\"__W__\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z\"/><circle cx=\"12\" cy=\"10\" r=\"2.3\"/></svg>", "geo": "<svg viewBox=\"0 0 24 24\" width=\"__W__\" height=\"__W__\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"6.5\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\" fill=\"currentColor\"/><path d=\"M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3\"/></svg>", "kaaba": "<svg viewBox=\"0 0 24 24\" width=\"__W__\" height=\"__W__\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 8l8-3.5L20 8v10.5l-8 2.5-8-2.5z\" fill=\"#111\" stroke=\"currentColor\"/><path d=\"M4 11.5 12 9l8 2.5\" /><path d=\"M12 9v12\" stroke-width=\"1.2\"/><rect x=\"13.6\" y=\"13.5\" width=\"3\" height=\"4.6\" rx=\".6\" stroke=\"#d9b45a\" fill=\"none\"/></svg>"};
  function ic(k,w){return IC2[k].split('__W__').join(w)}
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
     '<button class="pr-city" data-pcity="open" aria-haspopup="dialog"><span class="pr-pin" aria-hidden="true">'+ic('pin',24)+'</span><span class="pr-cn"><small>'+esc(g3(['المدينة','City','Ville']))+'</small><b>'+esc(cn(c[0]))+'</b></span><span class="pr-chev" aria-hidden="true">⌄</span></button>'+
     '<div class="pr-next"><div class="pr-ni" aria-hidden="true">'+ic(nx[2],44)+'</div><div class="pr-nt"><small>'+esc(g3(['الصلاة القادمة','Next prayer','Prochaine prière']))+'</small><b>'+esc(g3(nx[1]))+' · '+fmtT(t[nx[0]])+'</b><span>'+esc(cd(diff))+'</span></div></div>'+
     '<div class="pr-grid">'+NM.map(function(n){const on=n[0]===nx[0]&&(t[n[0]]>nowH||n[0]==='fajr'),past=t[n[0]]<=nowH&&!on;return '<div class="pr-t'+(on?' nx':'')+(past?' past':'')+'"><i aria-hidden="true">'+ic(n[2],26)+'</i><span>'+esc(g3(n[1]))+'</span><b>'+fmtT(t[n[0]])+'</b></div>'}).join('')+'</div>'+
     '<div class="pr-q"><div class="pr-dial" aria-hidden="true"><div class="pr-ring"><em>N</em></div><i data-qb="'+qb.toFixed(1)+'" style="transform:rotate('+qb.toFixed(0)+'deg)"></i><u>'+ic('kaaba',18)+'</u></div><div><b>'+esc(g3(['اتجاه القبلة','Qibla direction','Direction de la Qibla']))+' · '+N(Math.round(qb))+'°</b><p>'+esc(g3(['من الشمال الحقيقي باتجاه عقارب الساعة.','Clockwise from true north.','Dans le sens horaire depuis le nord vrai.']))+'</p><button class="pr-cbtn" data-pq="toggle">'+esc(PQ.on?g3(['إيقاف البوصلة','Stop compass','Arrêter la boussole']):g3(['تشغيل البوصلة الحية','Enable live compass','Activer la boussole en direct']))+'</button><p class="pr-st" id="prst" role="status" aria-live="polite"></p></div></div>'+
     '<p class="pr-note">ⓘ '+esc(g3(['الطريقة: ','Method: ','Méthode : ']))+esc(T(METH[S.method][0]))+' · '+esc(g3(['الأوقات حسابية بتوقيت جهازك، فتحقق منها مع مسجدك أو التقويم الرسمي.','Times are calculated using your device time zone; confirm with your mosque or the official calendar.','Horaires calculés selon le fuseau de votre appareil ; vérifiez auprès de votre mosquée ou du calendrier officiel.']))+'</p>';
    if(PQ.on)headApply();
  };
  function sheet(){
    let s=document.getElementById('prsheet');if(s)s.remove();
    s=document.createElement('div');s.id='prsheet';s.className='pr-ov';s.setAttribute('role','dialog');s.setAttribute('aria-modal','true');s.setAttribute('aria-label',g3(['اختر المدينة','Choose city','Choisir la ville']));
    s.innerHTML='<div class="pr-sh"><div class="pr-grab" aria-hidden="true"></div><div class="pr-sh-h"><h3>'+esc(g3(['اختر مدينتك','Choose your city','Choisissez votre ville']))+'</h3><button class="iconbtn sm" data-pcity="close" aria-label="'+esc(g3(['إغلاق','Close','Fermer']))+'">✕</button></div>'+
     '<input id="prq" type="search" placeholder="'+esc(g3(['ابحث عن مدينة…','Search a city…','Rechercher une ville…']))+'" autocomplete="off"><button class="pr-geo" data-pcity="geo">'+ic('geo',18)+' '+esc(g3(['استخدم موقعي','Use my location','Utiliser ma position']))+'</button><div id="prl" class="pr-list" role="listbox"></div></div>';
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
