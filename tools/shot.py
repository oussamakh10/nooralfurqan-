import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
        for lang in sys.argv[1:]:
            ctx=await b.new_context(viewport={'width':400,'height':860});pg=await ctx.new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
            await pg.route('**/fonts.g*/**',lambda r:r.abort())
            await pg.add_init_script("localStorage.setItem('hudhud-v2',JSON.stringify({lang:'%s',prof:{name:'Sami',done:true},xp:60}))"%lang)
            await pg.goto('http://localhost:8765/index.html');await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'i18n/s_{lang}_home.png')
            await pg.evaluate("go('learn')");await pg.wait_for_timeout(400);await pg.screenshot(path=f'i18n/s_{lang}_learn.png')
            print(lang,errs)
        await b.close()
asyncio.run(main())
