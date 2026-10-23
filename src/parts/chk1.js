const fs=require('fs');
const src=fs.readFileSync(__dirname+'/adv_1.js','utf8')+';module.exports=ADV1;';
const m={exports:{}};new Function('module',src)(m);
let n=0,bad=[],longest=0;
m.exports.forEach(u=>u.lessons.forEach(l=>{
 if(l.qs.length!==10)bad.push(l.id+' count '+l.qs.length);
 l.qs.forEach((q,i)=>{n++;
  if(q.w.length!==3||new Set([...q.w,q.c]).size!==4)bad.push(l.id+'#'+(i+1)+' dup/len');
  if(q.c.length>Math.max(...q.w.map(x=>x.length)))longest++;
  if(/[٠-٩]/.test(JSON.stringify(q)))bad.push(l.id+'#'+(i+1)+' arabic digits');
 });}));
console.log(n,'questions; units',m.exports.length,'; correct-longest',longest,'; problems',bad);
