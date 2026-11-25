/* 16: خريطة السيرة التفاعلية — مواقع وخط زمني (تقريبي ومبسّط الرسم) */
(function(){
  function tt(a){try{return g3(a)}catch(e){return a[0]}}
  var EV=[
   {y:570,lat:21.42,lon:39.83,t:['مولد النبي ﷺ — مكة','Birth of the Prophet ﷺ — Makkah','Naissance du Prophète ﷺ — La Mecque'],n:['وُلد في مكة في عام الفيل، نحو سنة 570م.','Born in Makkah in the Year of the Elephant, around 570 CE.','Né à La Mecque l’Année de l’Éléphant, vers 570.']},
   {y:610,lat:21.46,lon:39.86,t:['بدء الوحي — غار حراء','First revelation — Cave of Hira','Première révélation — Grotte de Hira'],n:['نزل الوحي أول مرة في غار حراء قرب مكة، نحو 610م.','Revelation began in the Cave of Hira near Makkah, around 610 CE.','La révélation a commencé à la grotte de Hira, vers 610.']},
   {y:615,lat:14.1,lon:38.7,t:['الهجرة إلى الحبشة','Migration to Abyssinia','Émigration en Abyssinie'],n:['هاجر بعض المسلمين إلى الحبشة حيث ملك عادل، نحو 615م.','Some Muslims migrated to Abyssinia, ruled by a just king, around 615 CE.','Des musulmans ont émigré en Abyssinie, vers 615.']},
   {y:619,lat:21.27,lon:40.42,t:['الطائف','Ta’if','Ta’if'],n:['ذهب النبي ﷺ إلى الطائف يدعو أهلها، نحو 619م.','The Prophet ﷺ went to Ta’if to call its people, around 619 CE.','Le Prophète ﷺ est allé à Ta’if appeler ses habitants, vers 619.']},
   {y:622,lat:24.47,lon:39.61,t:['الهجرة إلى المدينة','Hijrah to Madinah','Hégire vers Médine'],n:['هاجر النبي ﷺ من مكة إلى المدينة سنة 622م، وهو بداية التقويم الهجري.','The Prophet ﷺ migrated from Makkah to Madinah in 622 CE, the start of the Hijri calendar.','Le Prophète ﷺ a émigré de La Mecque à Médine en 622, début du calendrier hégirien.']},
   {y:624,lat:23.78,lon:38.79,t:['غزوة بدر','Battle of Badr','Bataille de Badr'],n:['أول معركة كبرى للمسلمين، في رمضان سنة 2هـ (624م).','The first major battle of the Muslims, in Ramadan 2 AH (624 CE).','La première grande bataille des musulmans, au Ramadan 2 H (624).']},
   {y:625,lat:24.5,lon:39.62,t:['غزوة أحد','Battle of Uhud','Bataille d’Uhud'],n:['وقعت قرب المدينة سنة 3هـ (625م).','Fought near Madinah in 3 AH (625 CE).','Livrée près de Médine en 3 H (625).']},
   {y:627,lat:24.47,lon:39.6,t:['غزوة الخندق','Battle of the Trench','Bataille de la Tranchée'],n:['حُفر الخندق حول المدينة للدفاع عنها سنة 5هـ (627م).','A trench was dug around Madinah to defend it, in 5 AH (627 CE).','Une tranchée fut creusée autour de Médine, en 5 H (627).']},
   {y:628,lat:21.43,lon:39.66,t:['صلح الحديبية','Treaty of Hudaybiyyah','Traité de Hudaybiyya'],n:['صلح مع قريش قرب مكة سنة 6هـ (628م).','A treaty with Quraysh near Makkah in 6 AH (628 CE).','Un traité avec Quraych près de La Mecque, en 6 H (628).']},
   {y:629,lat:25.7,lon:39.3,t:['خيبر','Khaybar','Khaybar'],n:['غزوة خيبر في أول سنة 7هـ (نحو 628–629م).','The expedition to Khaybar in early 7 AH (around 628–629 CE).','L’expédition de Khaybar au début de 7 H (vers 628–629).']},
   {y:630,lat:21.42,lon:39.83,t:['فتح مكة','Conquest of Makkah','Conquête de La Mecque'],n:['دخل النبي ﷺ مكة سنة 8هـ (630م) وعفا عن أهلها.','The Prophet ﷺ entered Makkah in 8 AH (630 CE) and forgave its people.','Le Prophète ﷺ est entré à La Mecque en 8 H (630) et a pardonné à ses habitants.']},
   {y:631,lat:28.38,lon:36.57,t:['غزوة تبوك','Expedition of Tabuk','Expédition de Tabouk'],n:['آخر غزوات النبي ﷺ في شمال الجزيرة، سنة 9هـ (نحو 630–631م).','His last expedition, in the north of Arabia, in 9 AH (around 630–631 CE).','Sa dernière expédition, au nord de l’Arabie, en 9 H (vers 630–631).']},
   {y:632,lat:21.35,lon:39.98,t:['حجة الوداع — عرفة','Farewell Pilgrimage — Arafah','Pèlerinage d’adieu — Arafat'],n:['حجّ النبي ﷺ سنة 10هـ (632م) وخطب في الناس بعرفة.','The Prophet ﷺ performed Hajj in 10 AH (632 CE) and addressed the people at Arafah.','Le Prophète ﷺ a accompli le Hajj en 10 H (632) et s’est adressé aux gens à Arafat.']},
   {y:632.5,lat:24.47,lon:39.61,t:['وفاة النبي ﷺ — المدينة','Passing of the Prophet ﷺ — Madinah','Décès du Prophète ﷺ — Médine'],n:['توفي النبي ﷺ في المدينة سنة 11هـ (632م).','The Prophet ﷺ passed away in Madinah in 11 AH (632 CE).','Le Prophète ﷺ est décédé à Médine en 11 H (632).']}
  ];
  var K=30,X=function(lon){return (lon-34)*K},Y=function(lat){return (30.2-lat)*K};
  var AF=[[32.4,30.2],[32.6,29.6],[33.4,28.2],[33.8,27.2],[34.3,26],[34.9,25],[35.5,23.9],[36.2,22.2],[37.2,19.6],[38.2,18],[38.9,16.8],[39.45,15.6],[40.3,14.5],[41.2,13.6],[42.6,12.6],[43.3,12]];
  var AR=[[34.9,30.2],[34.9,29.6],[35.3,28.2],[35.7,27.3],[36.5,26.2],[37.2,25.1],[37.6,24.1],[38.4,23],[38.85,22.2],[39.15,21.5],[39.9,20.3],[41.07,19.1],[41.8,17.7],[42.55,16.9],[43.1,14.5],[43.35,12.6],[43.5,12]];
  var MT=[[38.0,25.6],[38.6,24.8],[38.2,24.2],[39.0,23.5],[39.4,22.6],[40.3,21.6],[40.9,20.4],[41.4,19.3],[41.9,18.2],[37.4,26.7]];
  var OFF={5:[10,0],1:[-10,-9],8:[-13,7],10:[11,10],12:[14,-4],6:[9,-9],7:[-10,-3],13:[3,11],4:[0,0]};
  function sm(a,mv){
    var p=a.map(function(q){return [X(q[0]),Y(q[1])]}),d=(mv?'M':'L')+p[0][0].toFixed(1)+' '+p[0][1].toFixed(1);
    for(var i=0;i<p.length-1;i++){var p0=p[i-1]||p[i],p1=p[i],p2=p[i+1],p3=p[i+2]||p2;
      d+='C'+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+' '+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)+' '+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+' '+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)+' '+p2[0].toFixed(1)+' '+p2[1].toFixed(1)}
    return d}
  var LAND_AF=sm(AF,1)+'L'+X(43.3)+' 560L0 560L0 '+Y(30.2)+'Z', LAND_AR=sm(AR,1)+'L'+X(43.5)+' 560L330 560L330 '+Y(30.2)+'Z';
  function pt(i){var v=EV[i],o=OFF[i]||[0,0];return [X(v.lon)+o[0],Y(v.lat)+o[1]]}
  var cur=0;
  function fmtY(y){return N(Math.floor(y))}
  function draw(){
    var e=EV[cur],L=function(a){return esc(tt(a))};
    var svg='<svg viewBox="0 0 330 560" width="100%" role="img" aria-label="'+L(['خريطة تقريبية لمواقع السيرة','Approximate map of Seerah locations','Carte approximative des lieux de la Sîra'])+'" style="direction:ltr;max-width:440px;display:block;margin:0 auto;border-radius:22px;box-shadow:0 8px 26px rgba(11,30,21,.28);border:3px solid #b79a4f;background:#2b7f93">'+
    '<defs><linearGradient id="mpS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fb4c4"/><stop offset="1" stop-color="#1f6d84"/></linearGradient>'+
    '<linearGradient id="mpL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0e0b0"/><stop offset="1" stop-color="#d9bf7c"/></linearGradient>'+
    '<linearGradient id="mpA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdd9a0"/><stop offset="1" stop-color="#a9b878"/></linearGradient>'+
    '<pattern id="mpW" width="22" height="14" patternUnits="userSpaceOnUse"><path d="M0 7q5.5-5 11 0t11 0" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="1"/></pattern>'+
    '<pattern id="mpD" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#a98a3c" fill-opacity=".35"/><circle cx="6.5" cy="6" r=".6" fill="#a98a3c" fill-opacity=".28"/></pattern>'+
    '<filter id="mpSh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1" stdDeviation="1.2" flood-color="#000" flood-opacity=".35"/></filter></defs>'+
    '<rect width="330" height="560" fill="url(#mpS)"/><rect width="330" height="560" fill="url(#mpW)"/>'+
    '<path d="'+LAND_AF+'" fill="none" stroke="#bfeaf0" stroke-opacity=".55" stroke-width="12" stroke-linejoin="round"/><path d="'+LAND_AR+'" fill="none" stroke="#bfeaf0" stroke-opacity=".55" stroke-width="12" stroke-linejoin="round"/>'+
    '<path d="'+LAND_AF+'" fill="url(#mpA)" stroke="#8d8650" stroke-width="1.2"/><path d="'+LAND_AR+'" fill="url(#mpL)" stroke="#a98a3c" stroke-width="1.4"/><path d="'+LAND_AR+'" fill="url(#mpD)"/>';
    MT.forEach(function(m){var x=X(m[0]),y=Y(m[1]);svg+='<path d="M'+(x-6)+' '+(y+4)+'L'+x+' '+(y-6)+'L'+(x+6)+' '+(y+4)+'Z" fill="#c2a259" stroke="#8c7230" stroke-width=".8"/><path d="M'+x+' '+(y-6)+'L'+(x+2.6)+' '+(y-1)+'L'+(x-1)+' '+(y+4)+'L'+(x-6)+' '+(y+4)+'Z" fill="#8c7230" fill-opacity=".35"/>'});
    svg+='<text x="'+X(37.45)+'" y="'+Y(20.6)+'" fill="#e9f7fa" fill-opacity=".85" font-size="12" font-weight="700" letter-spacing="1" text-anchor="middle" transform="rotate(-58 '+X(37.45)+' '+Y(20.6)+')">'+L(['البحر الأحمر','Red Sea','Mer Rouge'])+'</text>'+
     '<text x="'+X(36.9)+'" y="'+Y(26.9)+'" fill="#6b5a22" fill-opacity=".7" font-size="10" font-weight="700" text-anchor="middle">'+L(['الحجاز','Hijaz','Hedjaz'])+'</text>'+
     '<text x="'+X(41.9)+'" y="'+Y(23.3)+'" fill="#7a6628" fill-opacity=".55" font-size="12" font-weight="700" text-anchor="middle">'+L(['جزيرة العرب','Arabia','Arabie'])+'</text>'+
     '<text x="'+X(36.2)+'" y="'+Y(15.1)+'" fill="#4f5a30" fill-opacity=".6" font-size="9" text-anchor="middle">'+L(['أفريقيا','Africa','Afrique'])+'</text>';
    /* مسار الرحلة */
    for(var i=1;i<EV.length;i++){var a=pt(i-1),b=pt(i),mx=(a[0]+b[0])/2-(b[1]-a[1])*.18,my=(a[1]+b[1])/2+(b[0]-a[0])*.18,done=i<=cur;
      svg+='<path d="M'+a[0].toFixed(1)+' '+a[1].toFixed(1)+'Q'+mx.toFixed(1)+' '+my.toFixed(1)+' '+b[0].toFixed(1)+' '+b[1].toFixed(1)+'" fill="none" stroke="'+(done?'#0B6B43':'#fff')+'" stroke-opacity="'+(done?1:.55)+'" stroke-width="'+(done?2.2:1.2)+'" stroke-dasharray="'+(done?'5 3':'2 4')+'" stroke-linecap="round"'+(done?' style="animation:mpf 1.2s linear infinite"':'')+'/>'}
    /* أسماء الأماكن */
    var lab=[[21.42,39.83,'مكة','Makkah','La Mecque',-18,24,'end'],[24.47,39.61,'المدينة','Madinah','Médine',24,-2,'start'],[14.1,38.7,'الحبشة','Abyssinia','Abyssinie',0,-14,'middle'],[21.27,40.42,'الطائف','Ta’if','Ta’if',14,4,'start'],[25.7,39.3,'خيبر','Khaybar','Khaybar',12,4,'start'],[28.38,36.57,'تبوك','Tabuk','Tabouk',12,4,'start'],[23.78,38.79,'بدر','Badr','Badr',-14,4,'end']];
    lab.forEach(function(l){svg+='<text x="'+(X(l[1])+l[5])+'" y="'+(Y(l[0])+l[6])+'" font-size="11" font-weight="800" text-anchor="'+l[7]+'" fill="#0B1E15" stroke="#fff6d8" stroke-width="3" paint-order="stroke" stroke-linejoin="round">'+L([l[2],l[3],l[4]])+'</text>'});
    /* الدبابيس */
    EV.forEach(function(v,i){var p=pt(i),on=i===cur,vis=i<cur;
      svg+='<g data-act="map-go" data-i="'+i+'" style="cursor:pointer" tabindex="0" role="button" aria-label="'+L(v.t)+'">'+(on?'<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="9" fill="#D9A21B" fill-opacity=".4"><animate attributeName="r" values="9;19;9" dur="1.8s" repeatCount="indefinite"/><animate attributeName="fill-opacity" values=".5;0;.5" dur="1.8s" repeatCount="indefinite"/></circle>':'')+
       '<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+(on?10:7.5)+'" fill="'+(on?'#D9A21B':vis?'#0F7A4C':'#fffdf2')+'" stroke="'+(on?'#5b3f00':'#0B1E15')+'" stroke-width="'+(on?2.2:1.2)+'" filter="url(#mpSh)"/>'+
       '<text x="'+p[0].toFixed(1)+'" y="'+(p[1]+3.4).toFixed(1)+'" font-size="'+(on?10:8.5)+'" font-weight="800" text-anchor="middle" fill="'+(on?'#2a1c00':vis?'#fff':'#0B1E15')+'">'+(i+1)+'</text></g>'});
    /* بوصلة */
    svg+='<g transform="translate(296 40)"><circle r="19" fill="#fff6d8" fill-opacity=".85" stroke="#a98a3c"/><path d="M0-14L4 0L0 3L-4 0Z" fill="#B3261E"/><path d="M0 14L4 0L0-3L-4 0Z" fill="#0B1E15" fill-opacity=".7"/><text y="-21" font-size="8" font-weight="800" text-anchor="middle" fill="#0B1E15">N</text></g>';
    svg+='</svg>';
    var h='<div class="ltop"><button class="xbtn" data-act="map-x" aria-label="'+esc(tt(['إغلاق','Close','Fermer']))+'">'+IC.x+'</button><div class="bar"><i style="width:'+Math.round((cur+1)/EV.length*100)+'%"></i></div></div><div class="lmain"><h2 class="center">'+esc(tt(['خريطة السيرة','Seerah map','Carte de la Sîra']))+'</h2>'+svg+
     '<div class="card" style="margin:12px 0;text-align:center"><small class="muted">≈ '+fmtY(e.y)+' '+esc(tt(['م','CE','apr. J.-C.']))+'</small><h3>'+esc(tt(e.t))+'</h3><p>'+esc(tt(e.n))+'</p></div>'+
     '<input type="range" min="0" max="'+(EV.length-1)+'" value="'+cur+'" data-act="map-r" aria-label="'+esc(tt(['الخط الزمني','Timeline','Chronologie']))+'" style="width:100%">'+
     '<div style="display:flex;gap:8px;justify-content:center;margin-top:8px"><button class="tag" data-act="map-go" data-i="'+Math.max(0,cur-1)+'">'+esc(tt(['السابق','Previous','Précédent']))+'</button><button class="tag on" data-act="map-go" data-i="'+Math.min(EV.length-1,cur+1)+'">'+esc(tt(['التالي','Next','Suivant']))+'</button></div>'+
     '<p class="muted center" style="font-size:.8rem;margin-top:10px">'+esc(tt(['الرسم مبسّط والتواريخ تقريبية.','Simplified drawing; dates are approximate.','Dessin simplifié ; dates approximatives.']))+'</p></div>';
    $('#lesson').innerHTML=h;
  }
  function css(){if(document.getElementById('mpcss'))return;var st=document.createElement('style');st.id='mpcss';st.textContent='@keyframes mpf{to{stroke-dashoffset:-16}}@media (prefers-reduced-motion:reduce){[data-act=map-go] *{animation:none!important}}';document.head.appendChild(st)}
  function open(){css();cur=0;openOverlay();draw()}
  function addBtn(){
    var hero=document.querySelector('.sr-hero');if(!hero||document.querySelector('[data-act="map-open"]'))return;
    var b=document.createElement('button');b.className='card feat';b.style.cssText='text-align:start;margin:10px 0;width:100%';b.setAttribute('data-act','map-open');
    b.innerHTML='<b>'+esc(tt(['خريطة السيرة','Seerah map','Carte de la Sîra']))+'</b><span>'+esc(tt(['مواقع الأحداث على خط زمني.','Event locations on a timeline.','Lieux des événements sur une frise.']))+'</span>';
    hero.parentNode.insertBefore(b,hero.nextSibling);
  }
  var __r=0;new MutationObserver(function(){if(__r)return;__r=requestAnimationFrame(function(){__r=0;addBtn()})}).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act^="map-"]');if(!b)return;var a=b.dataset.act;
    if(a==='map-open')open();else if(a==='map-x')closeOverlay();else if(a==='map-go'){cur=+b.dataset.i;draw()}
  });
  document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.act==='map-r'){cur=+t.value;draw();var r=document.querySelector('[data-act="map-r"]');if(r)r.focus()}});
})();
