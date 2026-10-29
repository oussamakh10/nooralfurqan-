import json,sys
from playwright.sync_api import sync_playwright
CHK=r"""
(()=>{
 const W=innerWidth,res={ovf:[],noname:[],small:0,imgs:0,sw:document.documentElement.scrollWidth};
 document.querySelectorAll('#page *, #top *, #nav *, #lesson *').forEach(e=>{
   const r=e.getBoundingClientRect();if(!r.width||!r.height)return;
   const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')return;
   if(r.right>W+2||r.left<-2){if(!e.closest('.shoptabs,.seg,.opts2,.hscroll,[style*="overflow"]')&&e.children.length===0&&!e.closest('svg'))res.ovf.push((e.className||e.tagName)+'|'+Math.round(r.left)+'-'+Math.round(r.right))}
   if(e.tagName==='BUTTON'||e.tagName==='A'){
     const t=(e.innerText||'').trim(),a=e.getAttribute('aria-label')||e.getAttribute('title')||'';
     if(!t&&!a)res.noname.push(e.className||e.outerHTML.slice(0,60));
     if((r.width<30||r.height<30)&&r.width*r.height>0)res.small++;
   }
   if(e.tagName==='IMG'&&!e.alt)res.imgs++;
 });
 return res;
})()
"""
out={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for lang in ['ar','en','fr']:
      for w in [320,360,412]:
        ctx=b.new_context(viewport={'width':w,'height':760});pg=ctx.new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:140]))
        pg.goto('http://localhost:8765/index.html')
        pg.evaluate("l=>localStorage.setItem('hudhud-v2',JSON.stringify({xp:200,name:'t',lang:l,onb:1,intro:1,tour:1,prof:{name:'t'}}))",lang)
        pg.reload();pg.wait_for_timeout(500)
        pg.evaluate("['splash','cele','langpick'].forEach(i=>{const e=document.getElementById(i);e&&e.remove()})")
        for tab in ['home','learn','read','listen','ach','play','school','shop']:
            try:
                pg.evaluate(f"go('{tab}')");pg.wait_for_timeout(350)
                r=pg.evaluate(CHK)
                key=f'{lang}/{w}/{tab}'
                issues=[]
                if r['sw']>w+1:issues.append('hscroll '+str(r['sw']))
                if r['ovf']:issues.append('overflow '+str(len(r['ovf']))+' '+r['ovf'][0])
                if r['noname']:issues.append('noname '+str(len(r['noname']))+' '+str(r['noname'][0])[:50])
                if r['imgs']:issues.append('img-no-alt '+str(r['imgs']))
                if issues:out[key]=issues
            except Exception as e:
                out[f'{lang}/{w}/{tab}']=['ERR '+str(e)[:80]]
        if errs:out[f'{lang}/{w}/pageerrors']=errs[:3]
        ctx.close()
print(json.dumps(out,ensure_ascii=False,indent=1))
print('combos with issues',len(out))
