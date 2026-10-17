const fs=require('fs');var DATA=[];
eval(fs.readFileSync('parts/lessons.js','utf8').replace('const DATA=','DATA='));
['lessons2.js','new_A.js','new_B.js','new_C.js','new_D.js'].forEach(f=>eval(fs.readFileSync('parts/'+f,'utf8')));
const Q=JSON.parse(fs.readFileSync('site/quran.json','utf8'));
const sk=t=>t.replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g,'').replace(/[^ء-ي ]/g,' ').replace(/[اأإآٱءؤئىيو]/g,'').replace(/ة/g,'ه').replace(/\s+/g,'');
const all=sk(Q.v.map(v=>v.join(' ')).join(' '));
let bad=[],total=0;
DATA.forEach(u=>u.lessons.forEach(x=>x.qs.forEach(q=>{
 const parts=[['q',q.q],['c',q.c],['n',q.n]].concat((q.items||[]).map(i=>['i',i]));
 parts.forEach(([k,txt])=>{if(!txt)return;(txt.match(/﴿[^﴾]*﴾/g)||[]).forEach(m=>{total++;m.replace(/[﴿﴾]/g,'').split(/\.\.\.|…|،؟/).forEach(p=>{const s=sk(p);if(s.length>=6&&!all.includes(s))bad.push(x.id+' ['+k+'] '+m)})})})
})));
console.log('checked',total,'bad',bad.length);bad.forEach(b=>console.log(b));
