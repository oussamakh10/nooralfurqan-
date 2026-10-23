/* ================= الأساسيات ================= */
document.documentElement.lang='ar';document.documentElement.dir='rtl';
const $=s=>document.querySelector(s);
const nf=new Intl.NumberFormat('en-US');const N=n=>nf.format(n);
const pad=(n,l)=>String(n).padStart(l,'0');
const toAr=s=>String(s);
function cnum(n){if(n>=1e6)return N(+(n/1e6).toFixed(1))+' م';if(n>=1e4)return N(+(n/1e3).toFixed(1))+' ألف';return N(n)}
function ymd(d){return d.getFullYear()+'-'+pad(d.getMonth()+1,2)+'-'+pad(d.getDate(),2)}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function pick(a){return a[Math.floor(Math.random()*a.length)]}

const ORDER=['أركان الإسلام والإيمان','أسماء الله الحسنى','تفصيل أركان الإيمان','الوضوء والصلاة','الطهارة','الصلاة بالتفصيل','الصيام والزكاة والحج','السيرة والأنبياء','السيرة: قبل البعثة','السيرة: العهد المكي','السيرة: الهجرة وبناء الدولة','السيرة: الغزوات والفتح','شمائل النبي ﷺ وأخلاقه','قصص الأنبياء في القرآن','قصص الصحابة','الخلفاء والعشرة المبشرون','القرآن والسنة','علوم القرآن','التجويد المبسّط','الأربعون النووية','الأذكار والأخلاق','الأخلاق والمعاملات','التقويم والمناسبات الإسلامية','العقيدة المتقدمة','أصول الفقه وقواعده','علوم الحديث','علوم القرآن والتفسير','التاريخ الإسلامي','أعلام الأمة ومؤلفاتهم'];
DATA.sort(function(a,b){const x=ORDER.indexOf(a.title),y=ORDER.indexOf(b.title);return (x<0?99:x)-(y<0?99:y)});
const ALL=[];DATA.forEach((u,ui)=>u.lessons.forEach(l=>{l.unit=ui;ALL.push(l)}));

/* ---------- الحالة والتخزين ---------- */
const KEY='hudhud-v2';
let S={xp:0,xpd:{},done:{},days:{},max:0,q:0,qc:0,games:0,wins:0,opened:{},listen:0,
  daily:{d:'',p:{},c:{}},best:0,last:null,rec:'afasy',
  has:{t:0,d:{}},ayd:{},khat:{days:30,read:0,n:0},
  sr:{},rev:0,hifz:{},hsur:112,
  mute:false,kids:false,tr:'',city:'',method:'mwl',tsd:{},adk:{d:'',m:0,e:0},wkc:{},
  prof:null,lvl:'',freeze:0,fsd:{},rem:'',qs:1,place:null,circle:'',acct:null,theme:''};
function cleanData(o,d){
  d=d||0;if(o===null)return null;const t=typeof o;
  if(t==='number')return isFinite(o)?o:0;if(t==='boolean')return o;
  if(t==='string')return o.length>400?o.slice(0,400):o;
  if(d>6)return undefined;
  if(Array.isArray(o))return o.slice(0,5000).map(function(x){return cleanData(x,d+1)});
  if(t==='object'){const r={};let n=0;for(const k of Object.keys(o)){if(k==='__proto__'||k==='constructor'||k==='prototype')continue;if(++n>20000)break;const v=cleanData(o[k],d+1);if(v!==undefined)r[k]=v}return r}
  return undefined;
}
function anchorSave(name,blob){
  try{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.rel='noopener';document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(u)},1500);return true}catch(e){return false}
}
try{
  const r=localStorage.getItem(KEY);
  if(r){const j=cleanData(JSON.parse(r));for(const k of Object.keys(j)){if(!(k in S)||typeof j[k]===typeof S[k]||S[k]===null||S[k]==='')S[k]=j[k]}}
  else{const o=localStorage.getItem('hudhud-v1');if(o){const j=JSON.parse(o);S.xp=j.xp||0;S.done=j.done||{};if(j.last)S.days[j.last]=1}}
}catch(e){}
(function(){const t=ymd(new Date());for(const k in S.ayd)if(S.ayd[k]!==t)delete S.ayd[k]})();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}if(typeof schedulePush==='function')schedulePush()}
function today(){return ymd(new Date())}
function dayState(){if(S.daily.d!==today())S.daily={d:today(),p:{},c:{}};return S.daily}
function streak(){const d=new Date();let c=0;if(!S.days[ymd(d)])d.setDate(d.getDate()-1);while(S.days[ymd(d)]){c++;d.setDate(d.getDate()-1)}return c}
function act(kind,n){const ds=dayState();ds.p[kind]=(ds.p[kind]||0)+(n||1);S.days[today()]=1;S.max=Math.max(S.max||0,streak());save();renderTop()}
function addXP(n){if(!n)return;S.xp+=n;S.xpd[today()]=(S.xpd[today()]||0)+n;save();if(typeof syncBoard==='function')syncBoard()}
function sumDays(map,n){let t=0;const d=new Date();for(let i=0;i<n;i++){t+=map[ymd(d)]||0;d.setDate(d.getDate()-1)}return t}
function doneN(){return ALL.filter(l=>S.done[l.id]).length}
function openedN(){return Object.keys(S.opened).length}
let tt=0;
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(function(){t.hidden=true},3200)}

/* ---------- الحسنات ---------- */
function countLetters(t){let n=0;for(const ch of String(t)){const c=ch.codePointAt(0);if((c>=0x621&&c<=0x64A)||c===0x671)n++}return n}
function addHasanat(letters,quiet){
  const h=letters*10;if(!h)return 0;
  S.has.t+=h;S.has.d[today()]=(S.has.d[today()]||0)+h;save();renderTop();if(!quiet)floatPlus(h);
  if(typeof syncBoard==='function')syncBoard();
  return h;
}
function floatPlus(h){
  const d=document.createElement('div');d.className='plus';
  d.innerHTML=hoopoe('cheer',34)+'<b>+'+N(h)+' حسنة</b>';
  document.body.appendChild(d);setTimeout(function(){d.remove()},1700);
}
function celebrate(title,msg,mood){
  const c=$('#cele');
  c.innerHTML='<div class="card"><div class="mas" style="display:grid;place-items:center">'+hoopoe(mood||'cheer',130)+'</div><h2>'+title+'</h2><p class="muted">'+msg+'</p><button class="btn" data-act="cclose">ما شاء الله</button></div>';
  c.hidden=false;confetti();
}

/* ---------- الرسوم ---------- */
const IC={
 flame:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-2.5 1.2-4 2.5-5.2.3 1.4 1 2.2 1.8 2.6C10 8 10.5 4.5 12 2z" fill="var(--flame)"/></svg>',
 flameW:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-2.5 1.2-4 2.5-5.2.3 1.4 1 2.2 1.8 2.6C10 8 10.5 4.5 12 2z" fill="currentColor"/></svg>',
 gem:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9z" fill="var(--gold)"/><path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6" fill="none" stroke="var(--gold-d)" stroke-width="1.4" stroke-linejoin="round"/></svg>',
 has:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.500l2.800 4.700 5.400-.4-.4 5.400 4.700 2.800-4.700 2.800.4 5.400-5.400-.4L12 22.500l-2.800-4.700-5.400.4.400-5.400L-.500 10.900l4.700-2.800-.4-5.400 5.400.4z" transform="translate(0 .5) scale(.95 .95) translate(.6 .3)" fill="var(--accent)"/><circle cx="12" cy="12" r="4.200" fill="var(--bg)" opacity=".85"/></svg>',
 heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C5 15.5 2 12.2 2 8.5A5 5 0 0 1 7 3.5c2 0 3.8 1 5 2.8 1.2-1.8 3-2.8 5-2.8a5 5 0 0 1 5 5c0 3.700-3 7-10 12.500z" fill="currentColor"/></svg>',
 star:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.500l2.900 6 6.600.9-4.800 4.600 1.200 6.500L12 17.300 6.100 20.500l1.200-6.500L2.500 9.400l6.600-.9z" fill="currentColor"/></svg>',
 check:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.500l5 5L20 6.500" fill="none" stroke="currentColor" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 lock:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.500" width="14" height="10" rx="3" fill="currentColor"/><path d="M8 10.500V8a4 4 0 0 1 8 0v2.500" fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round"/></svg>',
 x:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
 play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.500v15l13-7.500z"/></svg>',
 pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4.500v16H6zM13.500 4H18v16h-4.500z"/></svg>',
 next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 5v14h-2.500V5zM13.500 12L4 19V5z"/></svg>',
 prev:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14h2.500V5zM10.500 12L20 19V5z"/></svg>',
 back:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
 gear:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.200"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100"/></svg>',
 sound:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.500v5h3.500L12 18.500v-13L7.500 9.500zM15.500 9a4 4 0 0 1 0 6M18 6.500a7.500 7.500 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
const NAVI={
 home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 learn:'<path d="M12 3l2.600 5.600 6.100.8-4.500 4.200 1.100 6-5.300-3-5.300 3 1.100-6L3.300 9.400l6.100-.8z"/>',
 read:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13"/>',
 listen:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/>',
 ach:'<path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4a3 3 0 0 0 4 4M16 6h4a3 3 0 0 1-4 4M12 14v4M8 21h8M10 18h4"/>',
 play:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'
};

/* ---------- الخلفية الزخرفية ---------- */
(function(){
  $('#bg').innerHTML='<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><defs>'+
   '<pattern id="khatam" width="80" height="80" patternUnits="userSpaceOnUse">'+
   '<rect class="pl" x="20" y="20" width="40" height="40"/><rect class="pl" x="20" y="20" width="40" height="40" transform="rotate(45 40 40)"/>'+
   '<circle class="pl" cx="40" cy="40" r="11"/><path class="pl" d="M40 29 L51 40 L40 51 L29 40Z"/>'+
   '<path class="pl" d="M0 40 H11 M69 40 H80 M40 0 V11 M40 69 V80"/>'+
   '<path class="pg" d="M0 -6 L6 0 L0 6 L-6 0Z M80 -6 L86 0 L80 6 L74 0Z M0 74 L6 80 L0 86 L-6 80Z M80 74 L86 80 L80 86 L74 80Z"/>'+
   '<circle class="pg" cx="40" cy="40" r="2.600"/>'+
   '</pattern></defs><rect width="100%" height="100%" fill="url(#khatam)"/></svg>';
})();

/* ---------- الشريط العلوي والتنقل ---------- */
function renderTop(){
  $('#top').innerHTML='<div class="brand">'+hoopoe('happy',38)+'<span>نور الفرقان</span></div>'+
   '<div class="chips"><button class="sharebtn" data-act="shareapp" aria-label="مشاركة"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/></svg></button><div class="chip" title="أيام متتالية">'+IC.flame+'<span>'+N(streak())+'</span></div>'+
   '<div class="chip" title="الحسنات">'+IC.has+'<span>'+cnum(S.has.t)+'</span></div>'+
   '<div class="chip" title="نقاط">'+IC.gem+'<span>'+cnum(S.xp)+'</span></div>'+
   '<button class="iconbtn sm" data-act="settings" aria-label="الإعدادات"><svg viewBox="0 0 24 24" aria-hidden="true" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round">'+IC.gear.replace(/<svg[^>]*>|<\/svg>/g,'')+'</svg></button></div>';
}
const TABS=[['home','الرئيسية'],['learn','تعلّم'],['read','القراءة'],['listen','الاستماع'],['ach','إنجازاتي'],['play','الألعاب']];
let TAB='home';
function renderNav(){
  $('#nav').innerHTML=TABS.map(function(t){
    return '<button data-go="'+t[0]+'" '+(t[0]===TAB?'aria-current="page"':'')+'><svg viewBox="0 0 24 24" aria-hidden="true">'+NAVI[t[0]]+'</svg><span>'+t[1]+'</span></button>';
  }).join('');
}
let pageTimer=0;
function go(t){
  if(t!==TAB)SND.nav();
  TAB=t;try{history.replaceState(null,'','#'+t)}catch(e){}
  renderNav();renderPage();window.scrollTo(0,0);
}
function renderPage(){
  if(pageTimer){clearInterval(pageTimer);pageTimer=0}
  ({home:pageHome,learn:pageLearn,read:pageRead,listen:pageListen,ach:pageAch,play:pagePlay})[TAB]();
}
