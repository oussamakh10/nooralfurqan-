const fs=require('fs'),vm=require('vm');
const P='parts/';
let src='';for(const f of ['meta','lessons','lessons2','new_A','new_B','new_C','new_D','data'])src+=fs.readFileSync(P+f+'.js','utf8')+'\n';
src+='\n;globalThis.__x={DATA,SN,REC,HAD,F,LV,B};';
const ctx={console};vm.createContext(ctx);vm.runInContext(src,ctx);
const X=ctx.__x;
const AR=/[؀-ۿ]/;
const buckets={content:new Map(),other:new Map()};
function add(b,s){if(typeof s!=='string')return;const t=s.trim();if(!t||!AR.test(t))return;buckets[b].set(t,1)}
function walk(b,o){if(typeof o==='string')add(b,o);else if(Array.isArray(o))o.forEach(x=>walk(b,x));else if(o&&typeof o==='object')for(const k in o){if(k==='id'||k==='e'||k==='s'||k==='unit')continue;walk(b,o[k])}}
walk('content',X.DATA);
for(const k of ['SN','REC','HAD','F','LV','B'])walk('other',X[k]);
// static segments from app files
const segs=new Map();
for(const f of ['app1','app2','app3','app4','app5','app6','app9','snd','hoopoe']){
  const s=fs.readFileSync(P+f+'.js','utf8');
  const re=/[؀-ۿ][^<>'"`\\\n]*/g;let m;
  while((m=re.exec(s))){let t=m[0].replace(/\s+$/,'').trim();if(t&&AR.test(t))segs.set(t,1)}
}
// segs from data.js outside of structures too
const out={content:[...buckets.content.keys()],other:[...buckets.other.keys()],ui:[...segs.keys()].filter(t=>!buckets.content.has(t)&&!buckets.other.has(t))};
fs.writeFileSync('i18n/src.json',JSON.stringify(out,null,0));
console.log('content',out.content.length,'other',out.other.length,'ui',out.ui.length);
console.log('chars content',out.content.join('').length);
