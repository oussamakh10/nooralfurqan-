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
  var AF=[[32.5,29.9],[33.8,27.2],[34.9,25],[35.5,23.9],[37.2,19.6],[38.5,17.5],[39.45,15.6],[41,13.5],[43,12.2]];
  var AR=[[34.9,29.6],[35.7,27.3],[36.5,26.2],[37.2,25],[37.6,24.1],[38.4,23],[39.05,22],[39.15,21.5],[40.0,20.2],[41.07,19.1],[41.8,17.7],[42.55,16.9],[43.1,13.5],[43.3,12.2]];
  function poly(a,close){return a.map(function(p){return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1)}).join(' ')+' '+close}
  var cur=0;
  function fmtY(y){return N(Math.floor(y))}
  function draw(){
    var e=EV[cur],svg='<svg viewBox="0 0 330 560" width="100%" role="img" aria-label="'+esc(tt(['خريطة تقريبية لمواقع السيرة','Approximate map of Seerah locations','Carte approximative des lieux de la Sîra']))+'" style="max-width:420px;display:block;margin:0 auto;border-radius:18px;background:#9fd0d8">'+
     '<polygon points="'+poly(AF,'0,'+Y(12.2).toFixed(1)+' 0,'+Y(29.9).toFixed(1))+'" fill="#e6d3a0" stroke="#b79a4f"/>'+
     '<polygon points="'+poly(AR,'330,'+Y(12.2).toFixed(1)+' 330,'+Y(29.8).toFixed(1))+'" fill="#e6d3a0" stroke="#b79a4f"/>'+
     '<text x="'+X(37.8)+'" y="'+Y(19)+'" fill="#2b6a76" font-size="11" text-anchor="middle" transform="rotate(-62 '+X(37.8)+' '+Y(19)+')">'+esc(tt(['البحر الأحمر','Red Sea','Mer Rouge']))+'</text>';
    var path=EV.slice(0,cur+1).map(function(v){return X(v.lon).toFixed(1)+','+Y(v.lat).toFixed(1)}).join(' ');
    svg+='<polyline points="'+path+'" fill="none" stroke="#0F7A4C" stroke-width="1.5" stroke-dasharray="4 3"/>';
    EV.forEach(function(v,i){var on=i===cur;svg+='<g data-act="map-go" data-i="'+i+'" style="cursor:pointer"><circle cx="'+X(v.lon).toFixed(1)+'" cy="'+Y(v.lat).toFixed(1)+'" r="'+(on?9:i<cur?5:4)+'" fill="'+(on?'#D9A21B':i<cur?'#0F7A4C':'#fff')+'" stroke="#0B1E15" stroke-width="'+(on?2:1)+'"/></g>'});
    var lab=[[21.42,39.83,'مكة','Makkah','La Mecque',-6,16],[24.47,39.61,'المدينة','Madinah','Médine',8,-10],[14.1,38.7,'الحبشة','Abyssinia','Abyssinie',6,-8]];
    lab.forEach(function(l){svg+='<text x="'+(X(l[1])+l[5])+'" y="'+(Y(l[0])+l[6])+'" font-size="10" fill="#0B1E15" font-weight="700">'+esc(tt([l[2],l[3],l[4]]))+'</text>'});
    svg+='</svg>';
    var h='<div class="ltop"><button class="xbtn" data-act="map-x" aria-label="'+esc(tt(['إغلاق','Close','Fermer']))+'">'+IC.x+'</button><div class="bar"><i style="width:'+Math.round((cur+1)/EV.length*100)+'%"></i></div></div><div class="lmain"><h2 class="center">'+esc(tt(['خريطة السيرة','Seerah map','Carte de la Sîra']))+'</h2>'+svg+
     '<div class="card" style="margin:12px 0;text-align:center"><small class="muted">≈ '+fmtY(e.y)+' '+esc(tt(['م','CE','apr. J.-C.']))+'</small><h3>'+esc(tt(e.t))+'</h3><p>'+esc(tt(e.n))+'</p></div>'+
     '<input type="range" min="0" max="'+(EV.length-1)+'" value="'+cur+'" data-act="map-r" aria-label="'+esc(tt(['الخط الزمني','Timeline','Chronologie']))+'" style="width:100%">'+
     '<div style="display:flex;gap:8px;justify-content:center;margin-top:8px"><button class="tag" data-act="map-go" data-i="'+Math.max(0,cur-1)+'">'+esc(tt(['السابق','Previous','Précédent']))+'</button><button class="tag on" data-act="map-go" data-i="'+Math.min(EV.length-1,cur+1)+'">'+esc(tt(['التالي','Next','Suivant']))+'</button></div>'+
     '<p class="muted center" style="font-size:.8rem;margin-top:10px">'+esc(tt(['الرسم مبسّط والتواريخ تقريبية.','Simplified drawing; dates are approximate.','Dessin simplifié ; dates approximatives.']))+'</p></div>';
    $('#lesson').innerHTML=h;
  }
  function open(){cur=0;openOverlay();draw()}
  function addBtn(){
    var hero=document.querySelector('.sr-hero');if(!hero||document.querySelector('[data-act="map-open"]'))return;
    var b=document.createElement('button');b.className='card feat';b.style.cssText='text-align:start;margin:10px 0;width:100%';b.setAttribute('data-act','map-open');
    b.innerHTML='<b>'+esc(tt(['خريطة السيرة','Seerah map','Carte de la Sîra']))+'</b><span>'+esc(tt(['مواقع الأحداث على خط زمني.','Event locations on a timeline.','Lieux des événements sur une frise.']))+'</span>';
    hero.parentNode.insertBefore(b,hero.nextSibling);
  }
  new MutationObserver(addBtn).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act^="map-"]');if(!b)return;var a=b.dataset.act;
    if(a==='map-open')open();else if(a==='map-x')closeOverlay();else if(a==='map-go'){cur=+b.dataset.i;draw()}
  });
  document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.act==='map-r'){cur=+t.value;draw();var r=document.querySelector('[data-act="map-r"]');if(r)r.focus()}});
})();
