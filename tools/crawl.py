import asyncio,json,sys
from playwright.async_api import async_playwright
LANG=sys.argv[1] if len(sys.argv)>1 else 'en'
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':400,'height':860})
        pg=await ctx.new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.on('dialog',lambda d:asyncio.ensure_future(d.dismiss()))
        await pg.route('**/fonts.g*/**',lambda r:r.abort())
        await pg.add_init_script("try{localStorage.setItem('hudhud-v2',JSON.stringify({lang:'%s',prof:{name:'سامي',lvl:'b',done:true},xp:60,has:{t:120,d:{}}}))}catch(e){}"%LANG)
        await pg.goto('http://localhost:8765/index.html');await pg.wait_for_timeout(1500)
        async def reset():
            await pg.evaluate("try{closeOverlay()}catch(e){};try{$('#cele').hidden=true;$('#mini').hidden=true}catch(e){}")
        async def go(t):
            await reset();await pg.evaluate(f"go('{t}')");await pg.wait_for_timeout(250)
        async def tryclick(sel,idx=0):
            try:
                await pg.locator(sel).nth(idx).click(timeout=800);await pg.wait_for_timeout(180);return True
            except Exception as e: return False
        # 1. sweep every button on each tab
        for t in ['home','learn','read','listen','ach','play']:
            await go(t)
            n=await pg.locator('#page button').count()
            for i in range(min(n,70)):
                await go(t)
                if i>=await pg.locator('#page button').count():break
                await tryclick('#page button',i)
                # inside overlays: answer a few things
                for _ in range(14):
                    if await pg.evaluate("!$('#lesson').hidden && typeof L!=='undefined' && L"):
                        try:
                            q=await pg.evaluate("L.queue[0]")
                            if q and q.get('t')=='ord':
                                for it in q['items']: await tryclick(f'[data-add="{it}"]')
                            else:
                                idx=await pg.evaluate("(()=>{const q=L.queue[0];prep(q);return (_=>Math.random()<.5?q.opts.indexOf(q.c):0)()})()")
                                await tryclick(f'[data-opt="{idx}"]')
                            await tryclick('[data-act="check"]');await tryclick('[data-act="next"]')
                        except Exception as e: break
                    else:break
            print(t,'done',n,len(await pg.evaluate("[...MISS]")))
        # 2. settings & onboarding & misc overlays
        for js in ["openSettings()","openOnboard()","openAssistant()","openDuel&&openDuel()","S.kids=true;save();go('home')","S.kids=false;save();go('ach')"]:
            try:
                await reset();await pg.evaluate(js);await pg.wait_for_timeout(250)
                for _ in range(10):
                    if not await tryclick('#cele [data-act="ob-next"]'):break
            except Exception as e: print('x',js,str(e)[:60])
        for s in ['dhikr-open','ask-open','duel-open','prof-edit','settings']:
            await go('home');await tryclick(f'[data-act="{s}"]');await tryclick('[data-act="duel-new"]');
        miss=await pg.evaluate("[...MISS]")
        json.dump(miss,open(f'i18n/miss_{LANG}.json','w'),ensure_ascii=False,indent=0)
        print('MISS',len(miss),'errs',errs[:5])
        await b.close()
asyncio.run(main())
