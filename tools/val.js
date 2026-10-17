const fs=require('fs');
var DATA=[];
['lessons.js','lessons2.js','new_A.js','new_B.js','new_C.js','new_D.js'].forEach(f=>{let s=fs.readFileSync('parts/'+f,'utf8').replace(/^const DATA=/m,'DATA=DATA.concat(').replace(/\n\];?\s*$/,'\n]);');eval(f==='lessons.js'?s:s)});
