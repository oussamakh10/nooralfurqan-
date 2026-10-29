from playwright.sync_api import sync_playwright
JS=r"""
(()=>{
 const n=s=>String(s||'').replace(/[ً-ْٰ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/\s+/g,' ').trim();
 const m={},conf=[],bad=[];
 const add=(src,q,c,w)=>{const k=n(q);(m[k]=m[k]||[]).push({src,c:Array.isArray(c)?c.join('|'):String(c),w})};
 ALL.forEach(l=>(l.qs||[]).forEach(q=>{if(q.t==='ord'||q.t==='match')return;if(q.c===undefined)return;add(l.id,q.q,q.c,q.w||[]);
   if(!Array.isArray(q.c)&&!q.t&&(q.w||[]).length!==3)bad.push(l.id+': '+q.q.slice(0,50)+' w='+(q.w||[]).length)}));
 Object.keys(B).forEach(f=>{if(f==='order')return;Object.keys(B[f]).forEach(l=>B[f][l].forEach(x=>add('B.'+f+'.'+l,x[0],x[1],x.slice(2,5))))});
 Object.keys(m).forEach(k=>{const a=m[k];const cs=[...new Set(a.map(x=>n(x.c)))];if(cs.length>1)conf.push(a[0].src+' | '+a.slice(1).map(x=>x.src).join(',')+' :: '+k.slice(0,60)+' => '+a.map(x=>x.c.slice(0,22)).join(' / '))});
 // wrong option equals correct of another question with same text (potential correct distractor)
 const pot=[];
 Object.keys(m).forEach(k=>{const a=m[k];const cs=new Set(a.map(x=>n(x.c)));a.forEach(x=>x.w.forEach(w=>{if(cs.has(n(w))&&n(w)!==n(x.c))pot.push(x.src+' :: '+k.slice(0,50)+' wrong="'+w+'" is correct elsewhere')}))});
 return {conf,bad,pot};
})()
"""
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page()
    pg.goto('http://localhost:8765/index.html');pg.wait_for_timeout(800)
    r=pg.evaluate(JS)
    for k in r: 
        print(k,len(r[k]));[print('  ',x) for x in r[k][:14]]
