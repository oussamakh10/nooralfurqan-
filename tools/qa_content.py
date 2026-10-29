import json
from playwright.sync_api import sync_playwright
JS=r"""
(()=>{
 const n=s=>String(s||'').replace(/[ً-ْٰ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/\s+/g,' ').trim();
 const out={dupQ:[],badOpts:[],cInW:[],dupOpt:[],empty:[],longest:0,total:0,ord:0,nowrong:[]};
 const seen={};
 const chk=(src,q)=>{
   out.total++;
   if(q.t==='ord'){out.ord++;if(!q.q||!q.items||q.items.length<2)out.empty.push(src+': '+q.q);return}
   if(q.t&&q.t!=='fill'&&q.t!=='mcq'&&!q.c){return}
   if(!q.q||q.c===undefined||q.c===''){out.empty.push(src+': '+(q.q||'').slice(0,40));return}
   const k=n(q.q);if(seen[k]&&seen[k]!==src+'|'+q.c)out.dupQ.push(src+' ~ '+seen[k]+' :: '+q.q.slice(0,50));else seen[k]=src+'|'+q.c;
   const w=q.w||[];
   if(Array.isArray(q.c))return;
   if(w.length!==3)out.badOpts.push(src+': '+q.q.slice(0,40)+' ('+w.length+' wrong)');
   const all=[q.c].concat(w).map(n);
   if(new Set(all).size!==all.length)out.dupOpt.push(src+': '+q.q.slice(0,50));
   if(w.some(x=>n(x)===n(q.c)))out.cInW.push(src+': '+q.q.slice(0,50));
   const lc=String(q.c).length;if(w.length&&w.every(x=>String(x).length<lc*0.6)&&lc>25)out.longest++;
 };
 (typeof ALL!=='undefined'?ALL:[]).forEach(l=>(l.qs||[]).forEach(q=>chk(l.id,q)));
 if(typeof B!=='undefined')Object.keys(B).forEach(f=>Object.keys(B[f]).forEach(l=>B[f][l].forEach(x=>{if(f==='order')return;chk('B.'+f+'.'+l,{q:x[0],c:x[1],w:x.slice(2,5)})})));
 return out;
})()
"""
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page()
    pg.goto('http://localhost:8765/index.html');pg.wait_for_timeout(800)
    r=pg.evaluate(JS)
    print('total',r['total'],'ord',r['ord'])
    for k in ['empty','badOpts','cInW','dupOpt','dupQ']:
        print(k,len(r[k]));[print('  ',x) for x in r[k][:6]]
    print('longest-answer-giveaway',r['longest'])
