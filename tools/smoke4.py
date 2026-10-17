import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':400,'height':860},color_scheme='light',timezone_id='Africa/Algiers')
        pg=await ctx.new_page()
        errs=[]
        pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e)))
        pg.on('console',lambda m:errs.append('CONSOLE '+m.text) if m.type=='error' and 'fonts' not in m.text and 'ERR_' not in m.text and 'Failed to load resource' not in m.text else None)
        pg.on('dialog',lambda d:asyncio.ensure_future(d.accept('abc123')))
        await pg.route('**/fonts.g*/**',lambda r:r.abort())
        await pg.goto('http://localhost:8765/index.html'); await pg.wait_for_timeout(1500)
        print('onboard shown:',await pg.locator('#cele:not([hidden]) h2').inner_text())
        await pg.screenshot(path='u_ob.png')
        await pg.fill('#obin','خلوفي أسامة'); await pg.click('[data-act="ob-next"]')
        for i in range(3):
            await pg.click('[data-ob]>> nth=1'); await pg.wait_for_timeout(100)
        await pg.click('[data-ob]>> nth=0'); await pg.wait_for_timeout(100)   # mins
        await pg.click('[data-act="ob-next"]'); await pg.wait_for_timeout(100) # city
        await pg.click('[data-act="ob-next"]'); await pg.wait_for_timeout(100) # rec
        print('step:',await pg.evaluate('OBI'))
        await pg.click('[data-act="ob-link"]'); await pg.wait_for_timeout(300)
        print('acct text:',await pg.inner_text('#obacct'))
        await pg.click('[data-act="ob-next"]'); await pg.wait_for_timeout(400)
        print('prof:',await pg.evaluate('JSON.stringify(S.prof)'))
        await pg.click('#cele [data-act="cclose"]')
        print('home lead:',(await pg.inner_text('.lead'))[:40])
        print('season:',await pg.evaluate('seasonHtml().replace(/<[^>]+>/g," ")'))
        await pg.screenshot(path='u_home.png')
        # learn
        await pg.click('#nav [data-go="learn"]'); await pg.wait_for_timeout(300)
        print('units',await pg.locator('.uh').count(), 'lessons',await pg.evaluate('ALL.length'))
        await pg.screenshot(path='u_learn.png')
        await pg.click('.uh >> nth=5'); await pg.wait_for_timeout(200)
        print('unit5 open nodes',await pg.locator('.node').count())
        # lesson in a new unit: pick first lesson of unit 'السيرة: العهد المكي'
        await pg.evaluate("UO={};UO[DATA.findIndex(u=>u.title==='السيرة: العهد المكي')]=1;pageLearn()")
        await pg.click('.node.cur'); await pg.wait_for_timeout(200)
        for i in range(40):
            if await pg.locator('#lesson .center h2').count(): break
            if await pg.locator('[data-act="check"]').count():
                q=await pg.evaluate('L.queue[0]')
                if q.get('t')=='ord':
                    for t in q['items']: await pg.click(f'[data-add="{t}"]')
                else:
                    idx=await pg.evaluate('(()=>{const q=L.queue[0];prep(q);return q.opts.indexOf(q.c)})()')
                    await pg.click(f'[data-opt="{idx}"]')
                await pg.click('[data-act="check"]')
            if await pg.locator('[data-act="next"]').count(): await pg.click('[data-act="next"]')
        print('lesson finished:',(await pg.inner_text('#lesson .center h2')),await pg.evaluate('S.xp'))
        await pg.click('[data-act="leave"]')
        # placement
        await pg.click('[data-act="place"]'); await pg.wait_for_timeout(200)
        for i in range(10):
            idx=await pg.evaluate('(()=>{const q=L.queue[0];prep(q);return q.opts.indexOf(q.c)})()')
            await pg.click(f'[data-opt="{idx}"]'); await pg.click('[data-act="check"]'); await pg.click('[data-act="next"]')
        print('placement:',(await pg.inner_text('#lesson .center h2')))
        await pg.screenshot(path='u_place.png')
        await pg.click('[data-uopen2]'); await pg.wait_for_timeout(300)
        print('after place tab',await pg.evaluate('TAB'),await pg.evaluate('JSON.stringify(S.place)'))
        # ach
        await pg.click('#nav [data-go="ach"]'); await pg.wait_for_timeout(300)
        print('weak:',(await pg.inner_text('.sec:last-of-type'))[:100].replace('\n',' '))
        await pg.click('[data-act="circ-new"]'); await pg.wait_for_timeout(200)
        print('circle',await pg.evaluate('S.circle'))
        await pg.evaluate("S.xp=200;buyFreeze()"); print('freeze',await pg.evaluate('S.freeze'))
        await pg.click('[data-act="share"]'); await pg.wait_for_timeout(800)
        await pg.screenshot(path='u_ach.png',full_page=True)
        # settings
        await pg.click('[data-act="settings"]'); await pg.wait_for_timeout(200)
        await pg.screenshot(path='u_set.png')
        await pg.click('[data-qs="1.45"]'); print('qs',await pg.evaluate('document.documentElement.style.getPropertyValue("--qs")'))
        await pg.click('[data-act="rem-save"]')
        await pg.click('[data-act="rem-ics"]'); await pg.wait_for_timeout(300)
        print('ics sample:',(await pg.evaluate('reminderICS("20:00")'))[:120].replace('\r\n','|'))
        await pg.click('[data-act="cclose"]')
        # home buttons
        await pg.click('#nav [data-go="home"]')
        await pg.click('[data-act="ask-open"]'); await pg.wait_for_timeout(200)
        await pg.fill('#asq','ما هي أركان الإسلام؟'); await pg.click('[data-act="ask-send"]'); await pg.wait_for_timeout(300)
        print('assistant toast:',await pg.inner_text('#toast'))
        await pg.click('[data-act="leave"]')
        await pg.click('[data-act="duel-open"]'); await pg.wait_for_timeout(200)
        await pg.click('[data-act="duel-new"]'); await pg.wait_for_timeout(400)
        print('duel toast:',await pg.inner_text('#toast'))
        await pg.click('[data-act="duel-close"]')
        print('hijri',await pg.evaluate('JSON.stringify(hijri())'))
        print('ERRS',errs)
        await b.close()
asyncio.run(main())
