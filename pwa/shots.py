from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    ctx=b.new_context(viewport={'width':360,'height':780},device_scale_factor=1.5)
    pg=ctx.new_page()
    pg.add_init_script("localStorage.setItem('hudhud-v2',JSON.stringify({lang:'ar',prof:{name:'أحمد',done:true},xp:120,theme:'light'}));")
    pg.goto('http://localhost:8765/index.html');pg.wait_for_timeout(1500)
    for i,t in enumerate(['home','learn','read']):
        pg.evaluate("t=>go(t)",t);pg.wait_for_timeout(800);pg.screenshot(path='pwa/shot-%d.png'%(i+1))
