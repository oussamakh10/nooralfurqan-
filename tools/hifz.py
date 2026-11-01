import json
from playwright.sync_api import sync_playwright
seed=json.dumps({"lang":"ar","prof":{"age":20,"name":"x"},"consent":{"v":1,"t":1},"duaV2":1,"welcomed":1,"ob":1})
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':390,'height':800});ctx.add_init_script('try{localStorage.setItem("hudhud-v2",%s)}catch(e){}'%json.dumps(seed))
    pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8765/index.html');pg.wait_for_timeout(2500)
    pg.evaluate("document.querySelector('#nav [data-go=\"learn\"]').click()");pg.wait_for_timeout(400)
    pg.evaluate("LTAB='hifz';renderPage()") if False else None
    pg.click('[data-ltab="hifz"]');pg.wait_for_timeout(600)
    print('rows',pg.locator('.hrow').count(),'groups',pg.locator('.hgh').count(),[t for t in pg.locator('.hgh').all_inner_texts()])
    print('first/last',pg.locator('.hrow b').first.inner_text(),'|',pg.locator('.hrow b').last.inner_text())
    pg.screenshot(path='fx/hifz.png')
    # open Baqarah (last row) and Al-Mulk
    pg.locator('.hrow').last.click();pg.wait_for_timeout(1500)
    print('baqarah ayat cards',pg.locator('#hifzbox .card.day').count())
    pg.evaluate("document.querySelector('[data-act=hback]').click()");pg.wait_for_timeout(300)
    pg.locator('.hrow',has_text='الملك').first.click();pg.wait_for_timeout(1200)
    print('mulk cards',pg.locator('#hifzbox .card.day').count())
    pg.click('[data-hmem="1"]');pg.wait_for_timeout(300)
    print('mem',pg.evaluate("JSON.stringify(S.hifz)"))
    pg.click('[data-act=hquiz]');pg.wait_for_timeout(800);print('quiz open',pg.evaluate("!document.getElementById('lesson').hidden"))
    print('errs',errs)
    b.close()
