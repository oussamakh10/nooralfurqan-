/* ================= اللغات: عربي / English / Français =================
   النصوص الأصلية عربية دائمًا (مفاتيح التقدّم لا تتغيّر). تُترجم عناصر الصفحة وقت العرض بقاموس يُحمَّل عند الحاجة. */
const LANGS=[['ar','العربية'],['en','English'],['fr','Français']];
let LANG='ar',I18=null;
const LST=new WeakMap();
function detectLang(){let l='';try{l=(navigator.language||'').slice(0,2).toLowerCase()}catch(e){}return l==='ar'?'ar':(l==='fr'?'fr':'en')}
(function(){
  if(S.lang)LANG=S.lang;
  else{const used=S.prof||S.xp>0||Object.keys(S.done||{}).length;if(used){S.lang='ar'}else LANG=detectLang()}
  if(LANG!=='ar'&&LANG!=='en'&&LANG!=='fr')LANG='ar';
})();
const AR_RE=/[؀-ۿ]/;
const MISS=new Set();
function tr(s){
  if(LANG==='ar'||!I18)return null;
  const t=s.trim();if(!t||!AR_RE.test(t))return null;
  let v=I18[t];
  if(v===undefined){
    const nums=[];const k=t.replace(/\d+(?:[.,]\d+)?/g,function(m){nums.push(m);return '§'});
    if(nums.length){v=I18[k];if(v!==undefined){let i=0;v=v.replace(/§(\d)?/g,function(m,d){const x=nums[d?d-1:i++];return x===undefined?m:x})}}
  }
  if(v===undefined){
    const nm=S.prof&&S.prof.name;
    if(nm&&nm.length>1&&t.indexOf(nm)>=0){
      const t2=t.split(nm).join('¤');
      let v2=I18[t2];
      if(v2===undefined){const nums2=[];const k2=t2.replace(/\d+(?:[.,]\d+)?/g,function(m){nums2.push(m);return '§'});if(nums2.length){v2=I18[k2];if(v2!==undefined){let i=0;v2=v2.replace(/§(\d)?/g,function(m,d){const x=nums2[d?d-1:i++];return x===undefined?m:x})}}}
      if(v2!==undefined)v=v2.split('¤').join(nm);
    }
  }
  if(v===undefined){v=wordsFB(t);}
  if(v===undefined||v===null){MISS.add(t.replace(/\d+(?:[.,]\d+)?/g,'§'));return null}
  return s.slice(0,s.indexOf(t))+v+s.slice(s.indexOf(t)+t.length);
}

/* ترجمة تركيبية للجمل القصيرة: كل كلمة أو عبارة لها ترجمة في القاموس، وإلا تبقى الجملة كما هي */
function wordsFB(t){
  if(t.length>140)return undefined;
  const nm=(S.prof&&S.prof.name)||'';
  const toks=t.split(/(\s+|[:·،؛؟.,!()«»\-–—+×%°\n•]|§|\d+(?:[.,]\d+)?)/).filter(function(x){return x!==''});
  const out=[];let i=0,any=false;
  const isW=function(x){return AR_RE.test(x)};
  const punct={'،':',','؟':'?','؛':';'};
  while(i<toks.length){
    const x=toks[i];
    if(!isW(x)){out.push(punct[x]!==undefined?punct[x]:x);i++;continue}
    if(nm&&x===nm){out.push(x);i++;continue}
    let k=i,ws=[],idx=[];
    while(k<toks.length&&k<i+14){if(isW(toks[k])){ws.push(toks[k]);idx.push(k)}else if(!/^\s$/.test(toks[k])||(k+1<toks.length&&!isW(toks[k+1])))break;k++}
    let done=false;
    for(let n=Math.min(ws.length,6);n>=1&&!done;n--){
      const ph=ws.slice(0,n).join(' '),v=I18[ph];
      if(v!==undefined){out.push(v);i=idx[n-1]+1;done=true;any=true}
    }
    if(!done)return undefined;
  }
  return any?out.join('').replace(/\s+/g,' ').replace(/ ([,.:;!?])/g,'$1'):undefined;
}
function T(s){const v=tr(String(s));return v==null?s:v}
const TATTR=['aria-label','title','placeholder','alt'];
function xText(n){
  const cur=n.nodeValue;if(LST.get(n)===cur)return;
  const p=n.parentNode;if(p&&(p.nodeName==='SCRIPT'||p.nodeName==='STYLE'))return;
  const v=tr(cur);
  if(v!=null&&v!==cur){
    if(p&&p.nodeName==='OPTION'&&!p.hasAttribute('value'))p.setAttribute('value',cur.trim());
    LST.set(n,v);n.nodeValue=v;
  }else if(LANG!=='ar'&&p&&p.childNodes.length===1&&p.nodeType===1&&!p.hasAttribute('dir')){
    const m=cur.match(/[؀-ۿ]/g);if(m&&m.length>cur.trim().length*.5)p.setAttribute('dir','rtl');
  }
}
function xEl(e){
  if(e.nodeName==='OPTION'&&!e.hasAttribute('value')&&LANG!=='ar')e.setAttribute('value',e.textContent.trim());
  for(let i=0;i<TATTR.length;i++){const a=TATTR[i];if(e.hasAttribute(a)){const cur=e.getAttribute(a);if(e.__tr&&e.__tr[a]===cur)continue;const v=tr(cur);if(v!=null){(e.__tr=e.__tr||{})[a]=v;e.setAttribute(a,v)}}}
}
function xTree(root){
  if(LANG==='ar'||!I18)return;
  if(root.nodeType===3){xText(root);return}
  if(root.nodeType!==1)return;
  xEl(root);
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let n;
  while((n=w.nextNode())){if(n.nodeType===3)xText(n);else xEl(n)}
}
let OBS=null,qd=0,qn=[];
function obsStart(){if(OBS)OBS.observe(document.body,{childList:true,subtree:true,characterData:true})}
function flushX(){
  qd=0;if(!OBS)return;OBS.disconnect();
  const l=qn;qn=[];
  try{l.forEach(function(n){if(n.isConnected)xTree(n)})}catch(e){}
  obsStart();
}
OBS=new MutationObserver(function(ms){
  for(let i=0;i<ms.length;i++){const m=ms[i];
    if(m.type==='characterData')qn.push(m.target);
    else m.addedNodes.forEach(function(n){qn.push(n)});
  }
  if(!qd){qd=1;requestAnimationFrame(flushX)}
});
function applyLang(){
  const rtl=LANG==='ar';
  const de=document.documentElement;de.lang=LANG;de.dir=rtl?'rtl':'ltr';de.dataset.ui=LANG;
  ['#page','#lesson','#cele','#mini'].forEach(function(s){const e=$(s);if(e){e.dir=rtl?'rtl':'ltr';e.lang=LANG}});
  const ti=I18&&I18['نور الفرقان'];document.title=(LANG==='ar'||!ti)?'نور الفرقان':ti;
}
function loadPack(){
  if(LANG==='ar'){I18=null;return Promise.resolve()}
  const want=LANG;
  return fetch('i18n_'+want+'.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){if(LANG===want)I18=j}).catch(function(){I18=null});
}
function rerenderAll(){
  applyLang();
  try{renderTop();renderNav();renderMini();renderPage()}catch(e){}
  if(!$('#cele').hidden&&typeof openSettings==='function'&&$('#cele').querySelector('[data-lang]'))openSettings();
  xTree(document.body);
}
function setLang(l){
  if(l===LANG&&S.lang===l&&(I18||l==='ar'))return;
  LANG=l;S.lang=l;if(l!=='ar'&&!S.trAuto){S.tr='en';S.trAuto=1}save();
  loadPack().then(function(){rerenderAll()});
}
function langBtns(){return '<span class="opts2">'+LANGS.map(function(x){return '<button class="tag" data-lang="'+x[0]+'" aria-pressed="'+(LANG===x[0])+'" dir="auto" lang="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</span>'}
function openLangPicker(){
  const c=$('#cele');
  c.innerHTML='<div class="card" style="text-align:center;justify-items:center;max-width:380px" dir="ltr"><div style="display:grid;place-items:center">'+hoopoe('cheer',96)+'</div>'+
   '<h2 dir="auto">نور الفرقان</h2><p class="muted" style="margin:0;display:grid;gap:2px"><span dir="rtl" lang="ar">ما هي لغتك الأم؟</span><span dir="ltr" lang="en">What is your native language?</span><span dir="ltr" lang="fr">Quelle est votre langue maternelle ?</span></p>'+
   '<div class="opts" style="width:100%">'+LANGS.map(function(x){return '<button class="opt" data-lang="'+x[0]+'" data-first="1" lang="'+x[0]+'"><span>'+x[1]+'</span></button>'}).join('')+'</div></div>';
  c.hidden=false;
}
(function(){
  applyLang();
  if(LANG!=='ar')loadPack().then(function(){applyLang();rerenderAll()});
  obsStart();
})();
