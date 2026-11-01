import json,re
from playwright.sync_api import sync_playwright
seed={"hudhud-v2":json.dumps({"lang":"ar","prof":{"age":20,"name":"x"},"consent":{"v":1,"t":1},"duaV2":1,"welcomed":1,"ob":1})}
def lum(c):
    r,g,b=[x/255 for x in c]
    f=lambda v:v/12.92 if v<=.03928 else ((v+.055)/1.055)**2.4
    return .2126*f(r)+.7152*f(g)+.0722*f(b)
def cr(a,b):
    la,lb=lum(a),lum(b);la,lb=max(la,lb),min(la,lb);return (la+.05)/(lb+.05)
JS="""()=>{
const out=[];
function parse(c){const m=c.match(/rgba?\\(([^)]+)\\)/);if(!m)return null;const p=m[1].split(',').map(Number);return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}}
function bg(e){let el=e;while(el){const p=parse(getComputedStyle(el).backgroundColor);if(p&&p.a>0.9)return [p.r,p.g,p.b];el=el.parentElement}return [255,255,255]}
const seen=new Set();
document.querySelectorAll('body *').forEach(e=>{
 if(!e.childNodes.length)return;const t=[...e.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).map(n=>n.textContent.trim()).join(' ');
 if(!t)return;const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity<0.2)return;
 const fg=parse(cs.color);if(!fg)return;const k=cs.color+bg(e)+cs.fontSize;if(seen.has(k))return;seen.add(k);
 out.push({t:t.slice(0,30),fg:[fg.r,fg.g,fg.b],bg:bg(e),fs:parseFloat(cs.fontSize),fw:cs.fontWeight,cls:e.className&&e.className.toString().slice(0,30),tag:e.tagName})});
const small=[];document.querySelectorAll('button,a,[role=button],select,input').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.height&&(r.width<44||r.height<44)&&getComputedStyle(e).visibility!=='hidden')small.push({t:(e.getAttribute('aria-label')||e.textContent||e.id).trim().slice(0,24),w:Math.round(r.width),h:Math.round(r.height)})});
return {text:out,small}}"""
with sync_playwright() as p:
    b=p.chromium.launch()
    for theme in ('light','dark'):
        ctx=b.new_context(viewport={'width':390,'height':800},color_scheme=theme)
        ctx.add_init_script('try{localStorage.setItem("hudhud-v2",%s)}catch(e){}'%json.dumps(seed['hudhud-v2']));pg=ctx.new_page();pg.goto('http://localhost:8765/index.html');pg.wait_for_timeout(2500)
        pg.evaluate("document.getElementById('splash')&&document.getElementById('splash').remove()")
        for tab in ('home','learn'):
            try: pg.evaluate("t=>{const b=document.querySelector('#nav [data-go=\"'+t+'\"]');b&&b.click()}",tab);pg.wait_for_timeout(500)
            except Exception: pass
            d=pg.evaluate(JS)
            bad=[]
            for x in d['text']:
                ratio=cr(x['fg'],x['bg']);large=x['fs']>=24 or (x['fs']>=18.66 and int(x['fw'])>=700)
                if ratio<(3 if large else 4.5): bad.append((round(ratio,2),x['t'],x['cls'],x['fs']))
            print(theme,tab,'text checked',len(d['text']),'contrast fails',len(bad),'small targets',len(d['small']))
            for r in sorted(bad)[:8]:print('  C',r)
            for s in d['small'][:8]:print('  T',s)
        # 200% zoom / reflow: width 195
        pg.set_viewport_size({'width':195,'height':400});pg.wait_for_timeout(400)
        print(theme,'horizontal overflow @195px:',pg.evaluate("document.documentElement.scrollWidth>document.documentElement.clientWidth+2"))
        ctx.close()
    b.close()
