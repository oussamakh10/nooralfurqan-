/* w1: real-hoopoe anatomy: 7-feather fan crest with black tips + white band, long down-curved bill, zebra wings, striped tail */
function hoopoeNew(mood,size){
  mood=mood||'happy';
  var uid='h'+Math.floor(Math.random()*1e6);
  /* crest: 7 feathers fanned from the crown */
  var fan=[[-68,28],[-46,37],[-23,45],[0,50],[23,45],[46,37],[68,28]];
  var lift=mood==='wow'?1.12:(mood==='sad'?.7:1), spread=mood==='sad'?.7:1;
  var crest='',cdefs='';
  fan.map(function(f,i){return [f[0],f[1],i]}).sort(function(a,b){return Math.abs(b[0])-Math.abs(a[0])}).forEach(function(f){
    var L=f[1]*lift,a=f[0]*spread,w=7.6,cx=60,cy=47,top=cy-L,i=f[2];
    var p='M'+(cx-w)+' '+cy+' C'+(cx-w-1.5)+' '+(cy-L*.5)+' '+(cx-w+2)+' '+(top+7)+' '+cx+' '+top+' C'+(cx+w-2)+' '+(top+7)+' '+(cx+w+1.5)+' '+(cy-L*.5)+' '+(cx+w)+' '+cy+'Z';
    var y1=top+L*.25,y2=top+L*.34;
    cdefs='<clipPath id="'+uid+'a'+i+'"><rect x="0" y="'+(top-2)+'" width="120" height="'+(y1-top+2)+'"/></clipPath><clipPath id="'+uid+'c'+i+'"><rect x="0" y="'+y1+'" width="120" height="'+(y2-y1)+'"/></clipPath>';
    crest+='<g transform="rotate('+a+' '+cx+' '+(cy+8)+')">'+
      '<path d="'+p+'" fill="var(--hp-body)"/><path d="'+p+'" fill="#fff" clip-path="url(#'+uid+'c'+i+')"/><path d="'+p+'" fill="var(--hp-dark)" clip-path="url(#'+uid+'a'+i+')"/>'+
      '<path d="'+p+'" fill="none" stroke="var(--hp-line)" stroke-width="1.2" stroke-linejoin="round"/></g>';
  });
  /* eyes */
  var eyes;
  if(mood==='cheer'){
    eyes='<path d="M36 56 Q46 44 56 56" fill="none" stroke="var(--hp-dark)" stroke-width="4.6" stroke-linecap="round"/><path d="M64 56 Q74 44 84 56" fill="none" stroke="var(--hp-dark)" stroke-width="4.6" stroke-linecap="round"/>';
  }else{
    var pr=mood==='wow'?4.4:6.4;
    eyes='<circle cx="46" cy="55" r="10.5" fill="#fff" stroke="var(--hp-line)" stroke-width="1.4"/><circle cx="74" cy="55" r="10.5" fill="#fff" stroke="var(--hp-line)" stroke-width="1.4"/>'+
     '<circle cx="47" cy="56.5" r="'+pr+'" fill="var(--hp-dark)"/><circle cx="73" cy="56.5" r="'+pr+'" fill="var(--hp-dark)"/>'+
     '<circle cx="49.600" cy="53.500" r="2.500" fill="#fff"/><circle cx="75.600" cy="53.500" r="2.500" fill="#fff"/><circle cx="45" cy="59.500" r="1.200" fill="#fff" opacity=".85"/><circle cx="71" cy="59.500" r="1.200" fill="#fff" opacity=".85"/>';
    if(mood==='wow')eyes+='<path d="M35 41 Q46 33 56 41" fill="none" stroke="var(--hp-dark)" stroke-width="3.200" stroke-linecap="round"/><path d="M64 41 Q74 33 85 41" fill="none" stroke="var(--hp-dark)" stroke-width="3.200" stroke-linecap="round"/>';
    if(mood==='sad')eyes+='<path d="M34 46 L55 40" stroke="var(--hp-dark)" stroke-width="3.600" stroke-linecap="round"/><path d="M86 46 L65 40" stroke="var(--hp-dark)" stroke-width="3.600" stroke-linecap="round"/><path d="M37 68 q-4 6.500 0 9.500 q4 -3 0 -9.500z" fill="#6EC1F0"/>';
  }
  var wr=mood==='cheer'?'rotate(40 36 84)':(mood==='sad'?'rotate(-6 36 84)':'rotate(0)');
  var spark=mood==='cheer'?'<g fill="var(--gold)" stroke="#fff" stroke-width="1"><path d="M10 34 l2.500 6 6 2.500 -6 2.500 -2.500 6 -2.500 -6 -6 -2.500 6 -2.500z"/><path d="M110 26 l2 4.500 4.500 2 -4.500 2 -2 4.500 -2 -4.500 -4.500 -2 4.500 -2z"/><path d="M106 70 l1.500 3.500 3.500 1.500 -3.500 1.500 -1.500 3.500 -1.500 -3.500 -3.500 -1.500 3.500 -1.500z"/></g>':'';
  /* zebra wing */
  var wingP='M36 77 C26 80 21 96 27 110 C33 114 42 107 44 92 C45 84 42 78 36 77Z';
  var wing='<path d="M36 77 C26 80 21 96 27 110 C33 114 42 107 44 92 C45 84 42 78 36 77Z" fill="var(--hp-dark)" stroke="var(--hp-dark)" stroke-width="1.200" stroke-linejoin="round"/>'+
    '<g clip-path="url(#'+uid+'w)"><path d="M18 90 Q34 85 50 87.500 M16 97.500 Q33 92 50 94.500 M18 105 Q33 100.500 48 103" stroke="#fff" stroke-width="3" fill="none"/><path d="M22 112.500 Q32 109.500 42 112.500" stroke="#fff" stroke-width="2.600" fill="none"/></g>';
  return '<svg class="hp hp-'+mood+'" width="'+size+'" height="'+size+'" viewBox="-4 -10 128 128" aria-hidden="true"><defs>'+
   '<radialGradient id="'+uid+'g" cx=".4" cy=".25" r=".9"><stop offset="0" style="stop-color:#F2A460"/><stop offset=".55" style="stop-color:var(--hp-body)"/><stop offset="1" style="stop-color:var(--hp-shade)"/></radialGradient>'+
   '<clipPath id="'+uid+'w"><path d="'+wingP+'"/></clipPath>'+'<radialGradient id="'+uid+'t" cx=".5" cy=".4" r=".75"><stop offset="0" stop-color="#2A8C92"/><stop offset="1" stop-color="#0B3F4A"/></radialGradient>'+cdefs+
   '<linearGradient id="'+uid+'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:#C9A08C"/><stop offset=".3" style="stop-color:#6B5148"/><stop offset="1" style="stop-color:var(--hp-beak)"/></linearGradient></defs>'+
   (size>=60?'<circle cx="60" cy="57" r="60" fill="url(#'+uid+'t)" stroke="var(--gold)" stroke-width="3"/><circle cx="60" cy="57" r="55.500" fill="none" stroke="#F6E7B4" stroke-opacity=".35" stroke-width="1"/>':'<ellipse cx="60" cy="116.500" rx="28" ry="3.200" fill="#000" opacity=".12"/>')+
   /* tail peeks under body */
   '<path d="M48 104 L44 117 L52 114 L56 118 L60 114 L64 118 L68 114 L76 117 L72 104Z" fill="var(--hp-dark)"/><path d="M45.500 112 L74.500 112" stroke="#fff" stroke-width="2.600" stroke-linecap="round"/>'+
   '<g fill="#B9AFA8" stroke="#8A7F78" stroke-width="1"><ellipse cx="50" cy="115.500" rx="7" ry="2.800"/><ellipse cx="70" cy="115.500" rx="7" ry="2.800"/></g>'+
   '<path d="M60 70 C40 72 32 88 36 102 C40 110 80 110 84 102 C88 88 80 72 60 70Z" fill="url(#'+uid+'g)" stroke="var(--hp-line)" stroke-width="1.800" stroke-linejoin="round"/>'+
   '<path d="M60 76 C48 78 44 90 47 101 C52 106 68 106 73 101 C76 90 72 78 60 76Z" fill="var(--hp-belly)"/>'+
   '<path d="M50 88 l-1.500 4 M54 94 l-1 4.500 M70 88 l1.500 4 M66 94 l1 4.500 M60 98 l0 4" stroke="#B87A57" stroke-width="1.800" stroke-linecap="round" opacity=".75"/>'+
   '<g transform="'+wr+'">'+wing+'</g><g transform="translate(120 0) scale(-1 1)"><g transform="'+wr+'">'+wing+'</g></g>'+
   '<g class="crest">'+crest+'</g>'+
   '<ellipse cx="60" cy="58" rx="30" ry="26" fill="url(#'+uid+'g)" stroke="var(--hp-line)" stroke-width="1.800"/>'+
   (size>=48&&S.hat==='fez'?'<g><path d="M47 34 L73 34 L69.500 15 L50.500 15Z" fill="#B3261E" stroke="#5E0F0B" stroke-width="1.500" stroke-linejoin="round"/><path d="M48 31 L72 31" stroke="#E8B923" stroke-width="2.200"/><path d="M60 15 Q73 11 75 25" stroke="#1b1b1b" stroke-width="1.600" fill="none" stroke-linecap="round"/><circle cx="75" cy="26" r="2.200" fill="#1b1b1b"/></g>':'')+
   (size>=48&&S.hat==='cap'?'<g><path d="M60 13 L86 23.500 L60 34 L34 23.500Z" fill="#222" stroke="#000" stroke-width="1.200" stroke-linejoin="round"/><path d="M47 29.500 L47 38 Q60 43 73 38 L73 29.500" fill="#333" stroke="#000" stroke-width="1"/><path d="M86 23.500 L86 37" stroke="#E8B923" stroke-width="1.800"/><circle cx="86" cy="38" r="2.400" fill="#E8B923"/></g>':'')+
   (size>=48&&S.hat==='turban'?'<g><ellipse cx="60" cy="27" rx="24" ry="13" fill="#F4F0E6" stroke="#9B8F72" stroke-width="1.400"/><path d="M38 30 Q60 40 82 30 M41 24 Q60 33 79 24 M46 18 Q60 25 74 18" stroke="#B9AE92" stroke-width="1.400" fill="none"/><circle cx="60" cy="24" r="3.200" fill="#C8A24A" stroke="#7A5A12" stroke-width=".8"/></g>':'')+
   (size>=48&&S.hat==='crown'?'<g><path d="M40 34 L42 14 L51 24 L60 10 L69 24 L78 14 L80 34Z" fill="#E8B923" stroke="#7A5A12" stroke-width="1.500" stroke-linejoin="round"/><path d="M40 30 L80 30" stroke="#7A5A12" stroke-width="1.200"/><circle cx="60" cy="22" r="2.600" fill="#B3261E"/><circle cx="48" cy="26" r="1.800" fill="#2A8C92"/><circle cx="72" cy="26" r="1.800" fill="#2A8C92"/></g>':'')+
   '<ellipse cx="60" cy="67" rx="21" ry="13" fill="var(--hp-belly)" opacity=".95"/>'+
   (size>=48&&S.neck==='scarf'?'<g><path d="M33 80 Q60 98 87 80 L85 90 Q60 108 35 90Z" fill="#0F7A4C" stroke="#07422a" stroke-width="1.400" stroke-linejoin="round"/><path d="M42 86 L40 95 M52 91 L51 100 M64 92 L65 101 M75 89 L77 97" stroke="#E8B923" stroke-width="2" stroke-linecap="round"/></g>':'')+
   '<circle cx="34" cy="66" r="'+(mood==='cheer'?6.5:5)+'" fill="var(--hp-blush)" opacity=".6"/><circle cx="86" cy="66" r="'+(mood==='cheer'?6.5:5)+'" fill="var(--hp-blush)" opacity=".6"/>'+
   '<path d="M38 41 Q45 34 53 34" stroke="#fff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round" fill="none"/>'+
   '<g class="eyes">'+eyes+'</g>'+
   (size>=48&&S.face==='glasses'?'<g fill="#ffffff22" stroke="#2b2b2b" stroke-width="2.600"><circle cx="46" cy="55" r="13"/><circle cx="74" cy="55" r="13"/><path d="M59 55 L61 55" stroke-linecap="round"/><path d="M33 52 L26 48 M87 52 L94 48" stroke-linecap="round"/></g>':'')+
   /* long down-curved bill */
   '<path d="M56.500 63.500 Q60 60.500 63.500 63.500 C63.500 78 64 93 68 107 C59 95 56.500 80 56.500 63.500Z" fill="url(#'+uid+'b)" stroke="#3A2C26" stroke-width="1" stroke-linejoin="round"/>'+
   '<path d="M58.500 66 Q59 82 63 99" stroke="#fff" stroke-opacity=".3" stroke-width="1.500" stroke-linecap="round" fill="none"/>'+spark+'</svg>';
}

/* v3: fan crest from head centre, curved beak; v2: pointed orange crest with small black tips, long thin curved beak, smaller wings */
function hoopoeOld(mood,size){
  mood=mood||'happy';
  var crest='';
  [[-46,41],[-23,49],[0,55],[23,49],[46,41]].forEach(function(f,i){
    var L=f[1],t=58-L,w=9;
    var p='M'+(60-w)+' 58 C'+(60-w-1)+' '+(t+20)+' '+(60-w+3)+' '+(t+4)+' 60 '+t+' C'+(60+w-3)+' '+(t+4)+' '+(60+w+1)+' '+(t+20)+' '+(60+w)+' 58Z';
    crest+='<g transform="rotate('+f[0]+' 60 58)"><defs><clipPath id="hc'+i+'a"><rect x="40" y="'+(t-2)+'" width="40" height="'+(14)+'"/></clipPath><clipPath id="hc'+i+'b"><rect x="40" y="'+(t+12)+'" width="40" height="4.500"/></clipPath></defs>'+
      '<path d="'+p+'" fill="var(--hp-body)"/><path d="'+p+'" fill="#fff" clip-path="url(#hc'+i+'b)"/><path d="'+p+'" fill="var(--hp-dark)" clip-path="url(#hc'+i+'a)"/>'+
      '<path d="'+p+'" fill="none" stroke="var(--hp-line)" stroke-width="1.400" stroke-linejoin="round"/></g>';
  });
  var eyes;
  if(mood==='cheer'){
    eyes='<path d="M32 56 Q45 40 58 56" fill="none" stroke="var(--hp-dark)" stroke-width="5" stroke-linecap="round"/>'+
         '<path d="M62 56 Q75 40 88 56" fill="none" stroke="var(--hp-dark)" stroke-width="5" stroke-linecap="round"/>';
  }else{
    eyes='<circle cx="46" cy="54" r="12.500" fill="#fff" stroke="var(--hp-line)" stroke-width="1.500"/><circle cx="74" cy="54" r="12.500" fill="#fff" stroke="var(--hp-line)" stroke-width="1.500"/>'+
         '<circle cx="47.500" cy="56" r="7" fill="var(--hp-dark)"/><circle cx="72.500" cy="56" r="7" fill="var(--hp-dark)"/>'+
         '<circle cx="50" cy="53" r="2.600" fill="#fff"/><circle cx="75" cy="53" r="2.600" fill="#fff"/><circle cx="45.500" cy="59.500" r="1.300" fill="#fff" opacity=".8"/><circle cx="70.500" cy="59.500" r="1.300" fill="#fff" opacity=".8"/>';
    if(mood==='wow'){eyes=eyes.replace(/r="7"/g,'r="4.600"')+'<path d="M34 38 Q46 30 57 38" fill="none" stroke="var(--hp-dark)" stroke-width="3.600" stroke-linecap="round"/><path d="M63 38 Q74 30 86 38" fill="none" stroke="var(--hp-dark)" stroke-width="3.600" stroke-linecap="round"/>'}
    if(mood==='sad')eyes+='<path d="M31 45 L55 36.500" stroke="var(--hp-dark)" stroke-width="4" stroke-linecap="round"/><path d="M89 45 L65 36.500" stroke="var(--hp-dark)" stroke-width="4" stroke-linecap="round"/><path d="M35 69 q-4.500 7 0 10 q4.500 -3 0 -10z" fill="#6EC1F0"/>';
  }
  var wr=mood==='cheer'?'rotate(38 38 80)':(mood==='sad'?'rotate(-8 38 80)':'rotate(0)');
  var spark=mood==='cheer'?'<g fill="var(--gold)" stroke="#fff" stroke-width="1"><path d="M12 30 l2.500 6 6 2.500 -6 2.500 -2.500 6 -2.500 -6 -6 -2.500 6 -2.500z"/><path d="M108 22 l2 4.500 4.500 2 -4.500 2 -2 4.500 -2 -4.500 -4.500 -2 4.500 -2z"/><path d="M104 64 l1.500 3.500 3.500 1.500 -3.500 1.500 -1.500 3.500 -1.500 -3.500 -3.500 -1.500 3.500 -1.500z"/></g>':'';
  var wing='<path d="M33 78 C21 86 20 102 31 110 C41 108 47 96 44 82Z" fill="var(--hp-dark)" stroke="var(--hp-dark)" stroke-width="1.500" stroke-linejoin="round"/><path d="M24 90 L43 88 M23.500 97.500 L45 95.500 M27 104.500 L43 102.500" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>';
  return '<svg class="hp hp-'+mood+'" width="'+size+'" height="'+size+'" viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="hpg" cx=".38" cy=".28" r=".85"><stop offset="0" style="stop-color:#F6C08A"/><stop offset=".5" style="stop-color:var(--hp-body)"/><stop offset="1" style="stop-color:var(--hp-shade)"/></radialGradient></defs>'+
    '<ellipse cx="60" cy="116.500" rx="28" ry="3.200" fill="#000" opacity=".12"/>'+
    '<g fill="var(--hp-feet)" stroke="var(--hp-line)" stroke-width="1"><ellipse cx="48" cy="114.500" rx="9" ry="3.600"/><ellipse cx="72" cy="114.500" rx="9" ry="3.600"/></g>'+
    '<path d="M42 115 L41 117.500 M48 116 L48 118 M54 115 L55 117.500 M66 115 L65 117.500 M72 116 L72 118 M78 115 L79 117.500" stroke="var(--hp-line)" stroke-width="1.600" stroke-linecap="round"/>'+
    '<ellipse cx="60" cy="92" rx="28" ry="23" fill="url(#hpg)" stroke="var(--hp-line)" stroke-width="1.800"/>'+
    '<g transform="'+wr+'">'+wing+'</g><g transform="translate(120 0) scale(-1 1)"><g transform="'+wr+'">'+wing+'</g></g>'+
    '<ellipse cx="60" cy="99" rx="15" ry="13" fill="var(--hp-belly)"/>'+
    '<path d="M50 96 l-2 5 M54 101 l-1.500 5 M70 96 l2 5 M66 101 l1.500 5" stroke="#C98F6A" stroke-width="1.800" stroke-linecap="round" opacity=".7"/>'+
    '<ellipse cx="60" cy="87" rx="24" ry="6" fill="var(--hp-shade)" opacity=".3"/>'+
    '<g class="crest">'+crest+'</g>'+
    '<ellipse cx="60" cy="58" rx="35" ry="30" fill="url(#hpg)" stroke="var(--hp-line)" stroke-width="1.800"/>'+
    '<ellipse cx="60" cy="70" rx="22" ry="14" fill="var(--hp-belly)" opacity=".92"/>'+
    '<circle cx="32" cy="68" r="'+(mood==='cheer'?7:5.5)+'" fill="var(--hp-blush)" opacity=".6"/><circle cx="88" cy="68" r="'+(mood==='cheer'?7:5.5)+'" fill="var(--hp-blush)" opacity=".6"/>'+
    '<path d="M36 40 Q44 31 54 31" stroke="#fff" stroke-opacity=".38" stroke-width="3.200" stroke-linecap="round" fill="none"/>'+
    '<g class="eyes">'+eyes+'</g>'+
    '<defs><linearGradient id="hpb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:#B98F7D"/><stop offset=".45" style="stop-color:#6B5148"/><stop offset="1" style="stop-color:var(--hp-beak)"/></linearGradient></defs><path d="M55.500 63 L64.500 63 C64.400 80 63.400 94 62.600 102.500 L61.200 104 C59 93 56.500 78 55.500 63Z" fill="url(#hpb)"/>'+
    '<path d="M59.500 67 Q59.800 80 60.200 92" stroke="#fff" stroke-opacity=".28" stroke-width="1.600" stroke-linecap="round" fill="none"/><path d="M58.200 67 l1.200 -.6 M61.800 67 l-1.200 -.6" stroke="#fff" stroke-opacity=".35" stroke-width="1" stroke-linecap="round"/>'+spark+'</svg>';
}

function hoopoe(mood,size){var old=false;try{old=S.hpv==='old'}catch(e){}return (old?hoopoeOld:hoopoeNew)(mood,size)}
