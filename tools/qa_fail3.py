from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    ctx=b.new_context(viewport={'width':390,'height':760});pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:120]))
    pg.goto('http://localhost:8765/index.html')
    pg.evaluate("localStorage.setItem('hudhud-v2',JSON.stringify({xp:77,name:'t',onb:1,intro:1,tour:1}))")
    pg.reload();pg.wait_for_timeout(600)
    print('bak',pg.evaluate("!!localStorage.getItem('hudhud-v2-bak')"))
    ctx2=b.new_context(viewport={'width':390,'height':760})
    bak=pg.evaluate("localStorage.getItem('hudhud-v2-bak')")
    p2=ctx2.new_page();errs2=[];p2.on('pageerror',lambda e:errs2.append(str(e)[:120]))
    p2.add_init_script("if(!localStorage.getItem('seeded')){localStorage.setItem('hudhud-v2','{bad json');localStorage.setItem('hudhud-v2-bak',%r);localStorage.setItem('seeded','1')}"%bak)
    p2.goto('http://localhost:8765/index.html');p2.wait_for_timeout(1000)
    print('restored xp',p2.evaluate("S.xp"),'corrupt kept',p2.evaluate("localStorage.getItem('hudhud-v2-corrupt')"),errs2)
    # retry flow
    ctx3=b.new_context(viewport={'width':390,'height':760});q=ctx3.new_page()
    state={'fail':True}
    q.route('**/quran.json',lambda r:r.abort() if state['fail'] else r.continue_())
    q.goto('http://localhost:8765/index.html')
    q.evaluate("localStorage.setItem('hudhud-v2',JSON.stringify({xp:5,name:'t',onb:1,intro:1,tour:1}))")
    q.reload();q.wait_for_timeout(500)
    q.evaluate("['splash','cele'].forEach(i=>{const e=document.getElementById(i);e&&e.remove()});go('read');openSurah(1)");q.wait_for_timeout(1200)
    print('retry btn',q.evaluate("!!document.querySelector('[data-act=rretry]')"))
    state['fail']=False
    q.click('[data-act=rretry]');q.wait_for_timeout(1500)
    print(repr(q.evaluate("document.getElementById('page').innerText.slice(0,120)")))
