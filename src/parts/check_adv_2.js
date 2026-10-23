const fs=require('fs');
eval(fs.readFileSync(process.argv[2],'utf8')+';globalThis.A=ADV2');
let n=0;
A.forEach(u=>{console.log(u.title,u.lessons.length);u.lessons.forEach(l=>{
 if(l.qs.length!==10)console.log('BAD count',l.id,l.qs.length);
 l.qs.forEach((q,i)=>{n++;
  if(!q.q||!q.c||!q.n)console.log('missing',l.id,i);
  if(q.w.length!==3||new Set(q.w).size!==3||q.w.includes(q.c))console.log('BAD w',l.id,i);
  const L=[q.c,...q.w].map(s=>s.length);
  if(L[0]===Math.max(...L))console.log('c longest',l.id,i);
 });
});});
console.log(n);
