import json
from playwright.sync_api import sync_playwright
JS=r"""
async()=>{
 const miss={},tot={n:0,miss:0};
 const norm=t=>t.trim().replace(/\d+(?:[.,]\d+)?/g,'§');
 const has=t=>{t=t.trim();if(!t||!AR_RE.test(t))return true;if(I18[t]!==undefined)return true;if(I18[norm(t)]!==undefined)return true;return false};
 const add=(k,s)=>{if(typeof s!=='string')return;tot.n++;if(!has(s)){tot.miss++;(miss[k]=miss[k]||[]).push(s)}};
 ALL.forEach(l=>{add('lessonTitle',l.title);(l.qs||[]).forEach(q=>{add('q',q.q);add('n',q.n);if(Array.isArray(q.c))q.c.forEach(x=>add('c',x));else add('c',q.c);(q.w||[]).forEach(x=>add('w',x));(q.items||[]).forEach(x=>add('items',x))})});
 Object.keys(B).forEach(f=>Object.keys(B[f]).forEach(l=>B[f][l].forEach(x=>x.forEach(s=>add('B',s)))));
 return {tot,counts:Object.fromEntries(Object.entries(miss).map(([k,v])=>[k,v.length])),sample:Object.fromEntries(Object.entries(miss).map(([k,v])=>[k,v.slice(0,3)]))};
}
"""
with sync_playwright() as p:
    b=p.chromium.launch()
    for lang in ['en','fr']:
        ctx=b.new_context();ctx.add_init_script("try{localStorage.setItem('hudhud-v2',JSON.stringify({xp:5,name:'t',lang:'%s',onb:1,intro:1,tour:1,prof:{name:'t'}}))}catch(e){}"%lang)
        pg=ctx.new_page()
        pg.goto('http://localhost:8765/index.html');pg.wait_for_timeout(2500)
        print(lang,'I18 loaded',pg.evaluate("!!I18 && Object.keys(I18).length"))
        r=pg.evaluate(JS)
        print(json.dumps(r,ensure_ascii=False,indent=1)[:1500])
