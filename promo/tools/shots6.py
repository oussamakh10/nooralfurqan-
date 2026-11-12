import asyncio,sys
from playwright.async_api import async_playwright
RM="document.querySelectorAll('#splash,#lgm,#cele,#duam,#hoopoe,.hp-bub,.hpw').forEach(e=>e.remove())"
async def run(scheme,suf):
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':400,'height':860},device_scale_factor=3,color_scheme=scheme,locale='ar',timezone_id='Africa/Algiers')
        async def fresh():
            pg=await ctx.new_page(); await pg.route('**/fonts.g*/**',lambda r:r.abort())
            await pg.goto('http://localhost:8765/index.html'); await pg.wait_for_timeout(2500); await pg.evaluate(RM); return pg
        async def S(name,fn):
            pg=await fresh()
            try:
                await fn(pg); await pg.wait_for_timeout(800); await pg.evaluate(RM); await pg.screenshot(path=f'{name}_{suf}.png')
            except Exception as e: print(name,str(e)[:80])
            await pg.close()
        async def tile(t):
            async def f(pg): await pg.get_by_text(t,exact=True).first.click(force=True)
            return f
        async def nav(n):
            async def f(pg): await pg.click(f'#nav [data-go="{n}"]',force=True)
            return f
        await S('adh',await tile('الأذكار'))
        await S('ask',await tile('اسأل هدهد'))
        await S('mus',await tile('المصحف'))
        for n in ['learn','play','listen','read','ach']: await S(n,await nav(n))
        async def sil(pg):
            await pg.click('#nav [data-go="read"]',force=True); await pg.wait_for_timeout(600); await pg.evaluate(RM)
            await pg.get_by_text('القراءة الصامتة').first.click(force=True)
        await S('sil1',sil)
        async def sil2(pg):
            await sil(pg); await pg.wait_for_timeout(800); await pg.evaluate("window.bkShow(1)")
        await S('sil2',sil2)
        await b.close()
asyncio.run(run(sys.argv[1],sys.argv[2]))
