/* ================= المراجعة المتباعدة ================= */
const SRI=[0,1,3,7,14,30];
function hash(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return 'q'+(h>>>0).toString(36)}
function addDays(n){const d=new Date();d.setDate(d.getDate()+n);return ymd(d)}
function srUpdate(q,ok){
  const k=hash(q.q),e=S.sr[k];
  if(!ok){S.sr[k]={b:0,d:addDays(1),q:{q:q.q,c:q.c,w:q.w,n:q.n||''}};save();return}
  if(e){e.b++;if(e.b>=SRI.length)delete S.sr[k];else e.d=addDays(SRI[e.b]);save()}
}
function srDue(){
  const t=today(),r=[];
  for(const k in S.sr){const e=S.sr[k];if(e.d<=t)r.push(e.q)}
  return r;
}
function learnReview(){
  const due=srDue().length,all=Object.keys(S.sr).length;
  return '<div class="say"><div class="mas">'+hoopoe(due?'happy':'cheer',88)+'</div><div class="bubble"><p>'+(due?'عندك '+N(due)+' من الأسئلة تحتاج مراجعة اليوم.':(all?'لا شيء للمراجعة اليوم. سأذكّرك بالأسئلة في موعدها.':'لا توجد أسئلة للمراجعة بعد. الأسئلة التي تخطئ فيها تأتي هنا تلقائيًا.'))+'</p></div></div>'+
   '<div class="card" style="display:grid;gap:8px"><p class="muted" style="font-size:.92rem">المراجعة المتباعدة: السؤال الذي تخطئ فيه يعود بعد يوم، ثم 3 أيام، ثم أسبوع، ثم أسبوعين، ثم شهر، كلما أجبت عنه صحيحًا.</p>'+
   '<div class="stats"><div class="stat"><b>'+N(due)+'</b><span>مستحقة الآن</span></div><div class="stat"><b>'+N(all)+'</b><span>قيد المتابعة</span></div><div class="stat"><b>'+N(S.rev||0)+'</b><span>جلسات مراجعة</span></div></div>'+
   '<button class="btn" data-act="review-go" '+(due?'':'disabled')+'>ابدأ المراجعة</button></div>';
}

/* ================= أسئلة «أكمل الآية» (تُولَّد من نص المصحف) ================= */
function genAyat(level,n,surahs){
  const pool=surahs&&surahs.length?surahs:(level==='e'?range(78,114):level==='m'?range(50,114):range(2,114));
  const out=[];let guard=0;
  while(out.length<n&&guard++<n*40){
    const s=pick(pool),vs=Q.v[s-1],a=Math.floor(Math.random()*vs.length),w=vs[a].split(' ');
    const tail=Math.min(level==='h'?4:3,w.length-2);
    if(tail<1||w.length<3)continue;
    const c=w.slice(-tail).join(' '),head=w.slice(0,-tail).join(' ');
    const others=[];
    vs.forEach(function(v,i){if(i===a)return;const x=v.split(' ');if(x.length>=tail+1){const t=x.slice(-tail).join(' ');if(t!==c&&!others.includes(t))others.push(t)}});
    let tries=0;
    while(others.length<3&&tries++<60){const s2=1+Math.floor(Math.random()*114),v2=Q.v[s2-1],x=v2[Math.floor(Math.random()*v2.length)].split(' ');if(x.length>=tail+1){const t=x.slice(-tail).join(' ');if(t!==c&&!others.includes(t))others.push(t)}}
    if(others.length<3)continue;
    const q='أكمل الآية من سورة '+SN[s-1]+': ﴿'+head+' …﴾';
    if(out.some(function(o){return o.q===q}))continue;
    out.push({f:'ayat',l:level,q:q,c:c,w:shuffle(others).slice(0,3),n:'الآية '+N(a+1)+' من سورة '+SN[s-1]+'.'});
  }
  return out;
}
function range(a,b){const r=[];for(let i=a;i<=b;i++)r.push(i);return r}

/* ================= الحفظ ================= */
const HG=[['الفاتحة',[1]],['جزء عمّ',range(78,114).reverse()],['جزء تبارك',range(67,77).reverse()],['جزء قد سمع',range(58,66).reverse()],['من الحديد إلى البقرة',range(2,57).reverse()]];
const HS=[].concat.apply([],HG.map(function(g){return g[1]}));
function hCount(s){return (S.hifz[s]||[]).length}
let HV=0;
function learnHifz(){
  const box=$('#hifzbox');if(!box)return;
  if(HV)return hifzSurah(HV);
  let tot=0,done=0;HS.forEach(function(s){tot+=AYC[s-1];done+=hCount(s)});
  box.innerHTML='<div class="say"><div class="mas">'+hoopoe('happy',88)+'</div><div class="bubble"><p>مسار الحفظ يشمل كل سور القرآن: يبدأ بالفاتحة ثم قصار السور من الناس صعودًا حتى البقرة. استمع إلى الآية، كرّرها، ثم اختبر نفسك.</p></div></div>'+
   '<div class="card" style="margin-bottom:10px"><div class="row" style="display:flex;justify-content:space-between"><b>تقدّمك في الحفظ</b><small class="muted">'+N(done)+' من '+N(tot)+' آية</small></div><div class="pbar gold" style="margin-top:6px"><i style="width:'+(done/tot*100)+'%"></i></div></div>'+
   HG.map(function(g){return '<h3 class="hgh">'+g[0]+'</h3><div class="hifz">'+g[1].map(function(s){const c=hCount(s),t=AYC[s-1];return '<button class="hrow" data-hs="'+s+'"><b>'+SN[s-1]+'</b><div class="pbar"><i style="width:'+(c/t*100)+'%"></i></div><small class="muted">'+N(c)+'/'+N(t)+'</small></button>'}).join('')+'</div>'}).join('')+
   '<p class="fine">كل سور المصحف مرتبة للحفظ: الفاتحة، ثم من الناس صعودًا إلى البقرة. مراجعة الحفظ على شيخ متقن تبقى الأصل.</p>';
}
function hifzSurah(s){
  const box=$('#hifzbox');
  loadQ().then(function(){
    const vs=Q.v[s-1],mem=S.hifz[s]||[];
    box.innerHTML='<div class="rhead"><button class="iconbtn" data-act="hback" aria-label="رجوع">'+IC.back+'</button><h2>حفظ سورة '+SN[s-1]+'</h2><span></span></div>'+
     '<div class="opts2" style="margin:6px 0"><button class="tag" data-act="hhide" aria-pressed="'+(!!HV_HIDE)+'">إخفاء النص (اختبر نفسك)</button></div>'+
     '<div class="hifz">'+vs.map(function(t,k){const a=k+1,m=mem.includes(a);
       return '<div class="card day"><p class="ayt'+(HV_HIDE&&!m?' hid':'')+'" style="font:400 1.45rem/2.1 var(--quran)'+(HV_HIDE?';filter:blur(7px)':'')+'" data-ht>'+t+' <span class="no" style="cursor:default">'+N(a)+'</span></p>'+
       '<div class="acts"><button data-hpa="'+a+'" data-hs2="'+s+'">استمع</button><button data-hvoice="'+a+'" data-hs2="'+s+'">نطقي</button>'+(HV_HIDE?'<button data-hpeek>أظهر</button>':'')+'<button class="rd'+(m?' done':'')+'" data-hmem="'+a+'" data-hs2="'+s+'">'+(m?'حفظتها ✓':'حفظتها')+'</button></div></div>'}).join('')+'</div>'+
     '<button class="btn gold" style="margin-top:10px" data-act="hquiz" data-hs2="'+s+'">اختبرني في هذه السورة</button>';
  });
}
let HV_HIDE=false;
function hifzMem(s,a){
  const m=S.hifz[s]||(S.hifz[s]=[]),i=m.indexOf(a);
  if(i>=0)m.splice(i,1);else{m.push(a);addXP(3);SND.coin();if(m.length===AYC[s-1]){SND.surah();celebrate('ما شاء الله، حفظت سورة '+SN[s-1],'ثبّتك الله. راجعها كل يوم.','cheer')}}
  save();renderTop();hifzSurah(s);
}
function hifzQuiz(s){
  loadQ().then(function(){
    const qs=genAyat('m',Math.min(5,AYC[s-1]),[s]);
    if(qs.length<2){toast('هذه السورة قصيرة جدًا للاختبار. جرّب سورة أطول.');return}
    L={lesson:{id:'_hifz',title:'اختبار حفظ: '+SN[s-1]},hifzTest:true,queue:qs.map(mkQ),total:qs.length,solved:0,hearts:99,gain:0,wrongs:0,state:'ask',sel:null,ans:[],ok:false,confirm:false,mood:'happy',say:'',combo:0,best:0};
    openOverlay();renderLesson();
  });
}

/* ================= مواقيت الصلاة والقبلة ================= */
const CITIES=[
 ['الجزائر',36.7538,3.0588],['وهران',35.6969,-0.6331],['قسنطينة',36.365,6.6147],['عنابة',36.9,7.7667],['سطيف',36.1898,5.4108],['تلمسان',34.8828,-1.3167],['غرداية',32.4909,3.6735],['ورقلة',31.9539,5.3248],
 ['مكة المكرمة',21.4225,39.8262],['المدينة المنورة',24.4672,39.6111],['الرياض',24.7136,46.6753],['القاهرة',30.0444,31.2357],['الدار البيضاء',33.5731,-7.5898],['تونس',36.8065,10.1815],['طرابلس',32.8872,13.1913],['إسطنبول',41.0082,28.9784],['دبي',25.2048,55.2708],['عمّان',31.9454,35.9284],['جاكرتا',-6.2088,106.8456],['لندن',51.5072,-0.1276],['باريس',48.8566,2.3522],['نيويورك',40.7128,-74.006]
];
const METH={mwl:['رابطة العالم الإسلامي',18,17],egypt:['الهيئة المصرية',19.5,17.5],makkah:['أم القرى',18.5,'90'],isna:['أمريكا الشمالية',15,15],karachi:['كراتشي',18,18]};
const rad=function(x){return x*Math.PI/180},deg=function(x){return x*180/Math.PI};
const fa=function(x){return ((x%360)+360)%360},fh=function(x){return ((x%24)+24)%24};
function prayerTimes(lat,lng,date,tz,mk){
  const jd=Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),12)/864e5+2440587.5,d=jd-2451545.0;
  const g=fa(357.529+0.98560028*d),q=fa(280.459+0.98564736*d),Ls=fa(q+1.915*Math.sin(rad(g))+0.02*Math.sin(rad(2*g)));
  const e=23.439-0.00000036*d,RA=fh(deg(Math.atan2(Math.cos(rad(e))*Math.sin(rad(Ls)),Math.cos(rad(Ls))))/15),eq=q/15-RA;
  const decl=deg(Math.asin(Math.sin(rad(e))*Math.sin(rad(Ls))));
  const noon=fh(12+tz-lng/15-(((eq+12)%24)-12));
  function T(ang){const x=(-Math.sin(rad(ang))-Math.sin(rad(lat))*Math.sin(rad(decl)))/(Math.cos(rad(lat))*Math.cos(rad(decl)));if(x>1||x<-1)return NaN;return deg(Math.acos(x))/15}
  function A(f){const a=-deg(Math.atan(1/(f+Math.tan(rad(Math.abs(lat-decl))))));return T(a)}
  const m=METH[mk]||METH.mwl,fj=m[1],is=m[2];
  const mag=noon+T(0.833);
  return {fajr:noon-T(fj),sunrise:noon-T(0.833),dhuhr:noon+1/60,asr:noon+A(1),maghrib:mag,isha:is==='90'?mag+1.5:noon+T(is)};
}
function fmtT(h){if(isNaN(h))return '—';h=fh(h+0.5/60);const hh=Math.floor(h),mm=Math.floor((h-hh)*60);return toAr(pad(hh,2)+':'+pad(mm,2))}
function qiblaBearing(lat,lng){
  const k1=rad(21.4225),k2=rad(39.8262),p=rad(lat),l=rad(lng),dl=k2-l;
  return fa(deg(Math.atan2(Math.sin(dl),Math.cos(p)*Math.tan(k1)-Math.sin(p)*Math.cos(dl))));
}
function cityObj(){return CITIES.find(function(c){return c[0]===S.city})||CITIES[0]}
function renderPrayer(){
  const box=$('#ptbox');if(!box)return;
  const c=cityObj(),tz=-new Date().getTimezoneOffset()/60,t=prayerTimes(c[1],c[2],new Date(),tz,S.method);
  const names=[['fajr','الفجر'],['sunrise','الشروق'],['dhuhr','الظهر'],['asr','العصر'],['maghrib','المغرب'],['isha','العشاء']];
  const nowH=new Date().getHours()+new Date().getMinutes()/60;
  let nx=names.find(function(n){return t[n[0]]>nowH&&n[0]!=='sunrise'});
  const qb=qiblaBearing(c[1],c[2]);
  box.innerHTML='<div class="field"><label for="citysel">المدينة</label><select id="citysel">'+CITIES.map(function(x){return '<option'+(x[0]===c[0]?' selected':'')+'>'+x[0]+'</option>'}).join('')+'</select></div>'+
   '<div class="ptimes" style="margin-top:10px">'+names.map(function(n){return '<div'+(nx&&nx[0]===n[0]?' class="nx"':'')+'><span>'+n[1]+'</span><b>'+fmtT(t[n[0]])+'</b></div>'}).join('')+'</div>'+
   '<p class="muted" style="font-size:.85rem;margin-top:8px">'+(nx?'الصلاة القادمة: '+nx[1]+'. ':'')+'الطريقة: '+METH[S.method][0]+'. الأوقات حسابية بتوقيت جهازك (المنطقة الزمنية الحالية)، فتحقق منها مع مسجدك أو التقويم الرسمي.</p>'+
   '<div class="qibla" style="margin-top:8px"><div class="dial" aria-hidden="true"><i style="transform:rotate('+qb.toFixed(1)+'deg)"></i></div><div><b>اتجاه القبلة: '+N(Math.round(qb))+'° من الشمال</b><p class="muted" style="font-size:.85rem">باتجاه عقارب الساعة بدءًا من الشمال الحقيقي. استعن ببوصلة هاتفك.</p></div></div>';
}

/* ================= السبحة والأذكار ================= */
let TSB=null;
const TPH=[['سبحان الله',33],['الحمد لله',33],['الله أكبر',34]];
const ADK=[
 {t:'آية الكرسي',s:[2,255],n:1},
 {t:'سورة الإخلاص',sur:112,n:3},{t:'سورة الفلق',sur:113,n:3},{t:'سورة الناس',sur:114,n:3},
 {t:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',e:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',n:1},
 {t:'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',e:'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',n:1},
 {t:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',n:1},
 {t:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',n:3},
 {t:'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا',n:3},
 {t:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',n:100},
 {t:'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',n:1},
 {t:'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ',n:3},
 {t:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ',n:3},
 {t:'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',n:7},
 {t:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',n:1},
 {t:'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',n:100},
 {t:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',n:10},
 {t:'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',n:10},
 {t:'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',n:100},
 {t:'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',n:1},
 {t:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',n:3},
 {t:'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',n:7},
 {t:'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',n:1},
 {t:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',n:1},
 {t:'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',n:3},
 {t:'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',n:1},
 {t:'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ',n:1},
 {t:'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',n:1},
 {t:'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ',n:1},
 {t:'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',n:1},
 {t:'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',n:1},
 {t:'اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ، وَارْحَمْهُمْ',n:1},
 {t:'اللَّهُمَّ بَارِكْ لَنَا فِيهِ، وَزِدْنَا مِنْهُ',n:1},
 {t:'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',n:1},
 {t:'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',n:1},
 {t:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ',n:1},
 {t:'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',n:1},
 {t:'بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',n:1},
 {t:'غُفْرَانَكَ',n:1},
 {t:'اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',n:1},
 {t:'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',n:1},
 {t:'مِثْلَ مَا يَقُولُ الْمُؤَذِّنُ',n:1},
 {t:'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',n:1},
 {t:'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',n:1},
 {t:'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي، وَخَطَأِي، وَجَهْلِي، وَإِسْرَافِي فِي أَمْرِي، وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي',n:1},
 {t:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',n:3},
 {t:'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',n:1},
 {t:'اللَّهُ اللَّهُ رَبِّي، لَا أُشْرِكُ بِهِ شَيْئًا',n:7},
 {t:'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',n:1},
 {t:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ',n:3},
 {t:'اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',n:7},
 {t:'بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ',n:3},
 {t:'أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ',n:7},
 {t:'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَاجْعَلْ فِي سَمْعِي نُورًا، وَاجْعَلْ فِي بَصَرِي نُورًا، وَاجْعَلْ مِنْ خَلْفِي نُورًا، وَمِنْ أَمَامِي نُورًا، وَاجْعَلْ مِنْ فَوْقِي نُورًا، وَمِنْ تَحْتِي نُورًا، اللَّهُمَّ أَعْطِنِي نُورًا',n:1},
 {t:'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',n:1},
 {t:'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى',n:1},
 {t:'اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا، وَاطْوِ عَنَّا بُعْدَهُ',n:1},
 {t:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ',n:1},
 {t:'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',n:1},
 {t:'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي',n:1},
 {t:'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ',n:1},
 {t:'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',n:1},
 {t:'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',n:1},
 {t:'رَبِّ زِدْنِي عِلْمًا',n:1},
 {t:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',n:1},
 {t:'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي، رَبَّنَا وَتَقَبَّلْ دُعَاءِ',n:1},
 {t:'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',n:1},
 {t:'رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي، يَفْقَهُوا قَوْلِي',n:1},
 {t:'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ، وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ',n:1},
 {t:'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا، وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً، إِنَّكَ أَنْتَ الْوَهَّابُ',n:1},
 {t:'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',n:1},
 {t:'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',n:3}
];
let DK={tab:'tasbih',kind:'m',left:{}};
function openDhikr(tab){
  DK.tab=tab||DK.tab;openOverlay();renderDhikr();
}
function renderDhikr(){
  let h='<div class="ltop"><button class="xbtn" data-act="leave" aria-label="إغلاق">'+IC.x+'</button><div class="seg" style="flex:1">'+[['tasbih','السبحة'],['m','أذكار الصباح'],['e','أذكار المساء'],['du','الأدعية']].map(function(x){return '<button data-dk="'+x[0]+'" aria-pressed="'+(DK.tab===x[0])+'">'+x[1]+'</button>'}).join('')+'</div></div><div class="lmain">';
  if(DK.tab==='tasbih'){
    if(!TSB)TSB={p:0,c:0};
    const ph=TPH[TSB.p];
    h+='<div class="center"><div class="mas">'+hoopoe('happy',100)+'</div><h2>'+ph[0]+'</h2><button class="tsb" data-act="tsb" aria-label="سبّح">'+N(TSB.c)+'</button><p class="muted">من '+N(ph[1])+' · تسبيحك اليوم: '+N(S.tsd[today()]||0)+'</p><button class="btn sm ghost" data-act="tsreset">إعادة</button></div>';
  }else if(DK.tab==='du'){h+=duaTabHtml()}else{
    const k=DK.tab,dn=S.adk.d===today()&&S.adk[k];
    h+='<p class="muted" style="font-size:.9rem">اضغط على الذكر كلما كرّرته. الأذكار من السنة الصحيحة، ويُستحسن مراجعتها على كتاب موثوق.</p>'+(dn?'<div class="card" style="border-color:var(--gold)"><b>أتممت أذكار '+(k==='m'?'الصباح':'المساء')+' اليوم ✓</b></div>':'')+'<div class="hifz" style="margin-top:8px" id="adk">'+ADK.map(function(x,i){
      const id=k+i,left=(DK.left[id]===undefined?x.n:DK.left[id]);
      let tx=x.t;if(k==='e'&&x.e)tx=x.e;
      if(x.s&&Q)tx='<span style="font-family:var(--quran);font-size:1.25rem">'+Q.v[x.s[0]-1][x.s[1]-1]+'</span>';
      if(x.sur&&Q)tx='<span style="font-family:var(--quran);font-size:1.25rem">'+Q.v[x.sur-1].join(' ')+'</span>';
      return '<button class="card" data-adk="'+i+'" style="text-align:start;'+(left===0?'opacity:.55':'')+'" '+(left===0?'disabled':'')+'><p style="font:400 1.1rem/2 var(--quran)">'+(x.s||x.sur?'<b style="font-family:var(--display)">'+x.t+'</b><br>':'')+tx+'</p><small class="muted">'+(left===0?'تم ✓':'المتبقي: '+N(left)+' من '+N(x.n))+'</small></button>'}).join('')+'</div>';
  }
  h+='</div>';
  $('#lesson').innerHTML=h;
}
function dhikrTap(){
  TSB.c++;S.tsd[today()]=(S.tsd[today()]||0)+1;save();
  if(navigator.vibrate)try{navigator.vibrate(12)}catch(e){}
  const ph=TPH[TSB.p];
  if(TSB.c>=ph[1]){TSB.c=0;TSB.p=(TSB.p+1)%3;SND.ayah();if(TSB.p===0){addXP(5);SND.surah();toast('أتممت تسبيح الصلاة. تقبّل الله')}}
  else SND.tick();
  renderDhikr();
}
function adkTap(i){
  const k=DK.tab,id=k+i,x=ADK[i];
  let left=(DK.left[id]===undefined?x.n:DK.left[id]);if(left<=0)return;
  DK.left[id]=--left;SND.tick();
  if(left===0)SND.coin();
  if(ADK.every(function(y,j){return (DK.left[k+j]===undefined?y.n:DK.left[k+j])===0})&&!(S.adk.d===today()&&S.adk[k])){
    if(S.adk.d!==today())S.adk={d:today(),m:0,e:0};
    S.adk[k]=1;addXP(10);act('adhkar');save();SND.bell();celebrate('أتممت أذكار '+(k==='m'?'الصباح':'المساء'),'حفظك الله ورعاك.','cheer');
  }
  renderDhikr();
}

/* ================= الإعدادات ================= */
function applyTheme(){
  const r=document.documentElement;
  var th=S.theme;
  if(th==='night'){try{const c=cityObj(),tz=-new Date().getTimezoneOffset()/60,n=new Date(),t=prayerTimes(c[1],c[2],n,tz,S.method),h=n.getHours()+n.getMinutes()/60;th=(h>=t.maghrib||h<t.fajr)?'dark':'light'}catch(e){th='light'}}
  if(th==='dark'||th==='light')r.setAttribute('data-theme',th);else r.removeAttribute('data-theme');
  if(S.pal&&S.pal!=='green')r.setAttribute('data-pal',S.pal);else r.removeAttribute('data-pal');
  document.body.classList.toggle('kids',!!S.kids);r.style.setProperty('--qs',S.qs||1);
}
function openSettings(){
  const c=$('#cele');
  c.innerHTML='<div class="card" style="max-height:90vh;overflow:auto;text-align:start;justify-items:stretch"><h2>الإعدادات</h2>'+
   '<div class="setrow"><span>الأصوات</span><button class="tag" data-set="mute" aria-pressed="'+(!S.mute)+'">'+(S.mute?'مُغلقة':'مُفعّلة')+'</button></div>'+
   '<div class="setrow"><span>وضع الأطفال (خط أكبر وقلوب بلا نفاد)</span><button class="tag" data-set="kids" aria-pressed="'+(!!S.kids)+'">'+(S.kids?'مُفعّل':'مُغلق')+'</button></div>'+
   '<div class="setrow"><span>المظهر</span><span class="opts2">'+[['','تلقائي'],['night','بعد المغرب'],['light','فاتح'],['dark','داكن']].map(function(x){return '<button class="tag" data-theme="'+x[0]+'" aria-pressed="'+((S.theme||'')===x[0])+'">'+x[1]+'</button>'}).join('')+'</span></div>'+
   '<div class="setrow"><span>حجم خط المصحف</span><span class="opts2">'+[[0.85,'صغير'],[1,'متوسط'],[1.2,'كبير'],[1.45,'أكبر']].map(function(x){return '<button class="tag" data-qs="'+x[0]+'" aria-pressed="'+(S.qs===x[0])+'">'+x[1]+'</button>'}).join('')+'</span></div>'+
   '<div class="setrow"><span>شكل الهدهد</span><span class="opts2"><button class="tag" data-hpv="new" aria-pressed="'+(S.hpv!=='old')+'">الجديد</button><button class="tag" data-hpv="old" aria-pressed="'+(S.hpv==='old')+'">السابق</button></span></div>'+
   '<div class="field"><label for="methsel">طريقة حساب المواقيت</label><select id="methsel">'+Object.keys(METH).map(function(k){return '<option value="'+k+'"'+(S.method===k?' selected':'')+'>'+METH[k][0]+'</option>'}).join('')+'</select></div>'+
   '<div class="field"><label for="remtime">تذكير يومي</label><div class="opts2"><input type="time" id="remtime" value="'+esc(S.rem||'20:00')+'" style="width:auto"><button class="btn sm ghost" data-act="rem-save">تفعيل التنبيه داخل الصفحة</button><button class="btn sm ghost" data-act="rem-ics">حمّل تذكيرًا لتقويم هاتفك</button></div><small class="muted">لا أستطيع إرسال إشعارات والصفحة مغلقة. ملف التقويم يجعل هاتفك يذكّرك يوميًا.</small></div>'+
   extraSettings()+
   '<div class="setrow"><span>ملفي الشخصي'+(S.prof&&S.prof.name?': '+esc(S.prof.name):'')+'</span><button class="btn sm ghost" data-act="prof-edit">تعديل</button></div>'+
   '<div class="setrow"><span>الحساب: '+(S.acct&&S.acct.linked?(ACCT&&ACCT.email?esc(ACCT.email):'مرتبط'):'غير مرتبط')+'</span><button class="btn sm ghost" data-act="acct-link">'+(S.acct&&S.acct.linked?'مزامنة الآن':'ربط الحساب')+'</button></div>'+
   '<p class="muted" style="font-size:.85rem">الربط عبر حسابك في التطبيق (وليس تسجيل دخول جوجل مباشرًا). يحفظ تقدّمك في مساحتك الخاصة لتفتحه من أي جهاز.</p>'+
   '<div class="setrow"><span>اللغة · Language · Langue</span>'+langBtns()+'</div>'+
   '<button class="btn ghost" data-act="reset" style="margin-top:6px">مسح كل تقدّمي</button>'+
   '<button class="btn" data-act="cclose">تم</button></div>';
  c.hidden=false;
}

/* ================= الأسبوع واللوحة (يتطلب حسابًا) ================= */

function weekKey(){const d=new Date();d.setDate(d.getDate()-((d.getDay()+1)%7));return ymd(d)}/* يبدأ الأسبوع يوم السبت */
function weekSum(map){const k=weekKey();let t=0;const d=new Date();for(let i=0;i<7;i++){const y=ymd(d);if(y>=k)t+=map[y]||0;d.setDate(d.getDate()-1)}return t}
const WK_TARGET=300;

setInterval(function(){if(S.theme==='night')applyTheme()},300000);
