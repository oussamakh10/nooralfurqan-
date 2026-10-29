import json
from playwright.sync_api import sync_playwright
exec(open('qa_crawl.py').read().split("out={}")[0].split("from playwright.sync_api import sync_playwright")[1])
def summ(r,w):
    iss=[]
    if r['sw']>w+1:iss.append('hscroll %d'%r['sw'])
    if r['ovf']:iss.append('overflow %d %s'%(len(r['ovf']),r['ovf'][0]))
    if r['noname']:iss.append('noname %d %s'%(len(r['noname']),str(r['noname'][0])[:50]))
    return iss
out={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in [320,412]:
        pg=b.new_page(viewport={'width':w,'height':760})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:140]))
        pg.goto('http://localhost:8765/index.html')
        pg.evaluate("localStorage.setItem('hudhud-v2',JSON.stringify({xp:500,name:'t',lang:'ar',onb:1,intro:1,tour:1,prof:{name:'t'}}))")
        pg.reload();pg.wait_for_timeout(500)
        pg.evaluate("['splash','cele'].forEach(i=>{const e=document.getElementById(i);e&&e.remove()})")
        def chk(name):
            pg.wait_for_timeout(450)
            s=summ(pg.evaluate(CHK),w)
            if s:out[f'{w}/{name}']=s
        # lessons: first 6 lessons, 8 questions each through all types
        for li in range(0,6):
            pg.evaluate(f"closeOverlay&&(L||G)&&closeOverlay();startLesson(ALL[{li}].id)")
            for k in range(8):
                chk(f'lesson{li}.q{k}')
                pg.evaluate("(()=>{const q=L&&L.queue&&L.queue[0];if(!q)return;if(L.state==='ask'){const o=document.querySelector('[data-opt]');o&&o.click();const c=document.querySelector('[data-act=check]');c&&c.click()}else{const n=document.querySelector('[data-act=next]');n&&n.click()}})()")
                pg.wait_for_timeout(150)
                pg.evaluate("(()=>{const n=document.querySelector('[data-act=next]');n&&n.click()})()")
        pg.evaluate("(L||G)&&closeOverlay()")
        for g in ['match','order','blank','where','tf','race']:
            pg.evaluate("go('play')");pg.wait_for_timeout(200)
            pg.evaluate(f"document.querySelector('[data-mg=\"open:{g}\"]').click()");chk('mg-'+g)
            pg.evaluate("document.querySelector('[data-mg=quit]')&&document.querySelector('[data-mg=quit]').click()")
        pg.evaluate("go('shop')")
        for t in ['hoopoe','colors','screens','boost','mine']:
            pg.evaluate(f"document.querySelector('[data-shop=\"tab:{t}\"]').click()");chk('shop-'+t)
        pg.evaluate("S.hp=0;save();go('learn');startLesson(ALL[0].id)");chk('hearts-modal')
        pg.evaluate("document.getElementById('hpm').hidden=true;go('home')")
        pg.evaluate("document.querySelector('[data-act=settings],#setbtn,.top [aria-label]')&&0")
        if errs:out[f'{w}/pageerrors']=errs[:4]
        pg.close()
print(json.dumps(out,ensure_ascii=False,indent=1));print('issues',len(out))
