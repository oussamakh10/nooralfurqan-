/* v3: fan crest from head centre, curved beak; v2: pointed orange crest with small black tips, long thin curved beak, smaller wings */
function hoopoe(mood,size){
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
