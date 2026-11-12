import asyncio
from playwright.async_api import async_playwright
RM="document.querySelectorAll('#splash,#lgm,#cele,#duam,#hoopoe,.hp-bub,.hpw').forEach(e=>e.remove())"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
        async def fresh(scheme):
            ctx=await b.new_context(viewport={'width':400,'height':860},device_scale_factor=3,color_scheme=scheme,locale='ar',timezone_id='Africa/Algiers')
            pg=await ctx.new_page(); await pg.route('**/fonts.g*/**',lambda r:r.abort())
            await pg.goto('http://localhost:8765/index.html'); await pg.wait_for_timeout(2500); await pg.evaluate(RM); return pg
        pg=await fresh('dark')
        await pg.get_by_text('الأذكار',exact=True).first.click(force=True); await pg.wait_for_timeout(900); await pg.evaluate(RM)
        for i in range(4):
            await pg.screenshot(path=f'tas{i}.png')
            await pg.mouse.click(200,389); await pg.wait_for_timeout(500); await pg.evaluate(RM)
        pg=await fresh('light')
        await pg.click('#nav [data-go="learn"]',force=True); await pg.wait_for_timeout(600); await pg.evaluate(RM)
        await pg.get_by_text('ابدأ',exact=True).first.click(force=True); await pg.wait_for_timeout(800); await pg.evaluate(RM)
        await pg.get_by_text('ابدأ الدرس').first.click(force=True); await pg.wait_for_timeout(900); await pg.evaluate(RM)
        await pg.screenshot(path='q0.png')
        await pg.get_by_text('خمسة',exact=True).first.click(force=True); await pg.wait_for_timeout(500); await pg.evaluate(RM); await pg.screenshot(path='q1.png')
        await pg.get_by_text('تحقق',exact=True).first.click(force=True); await pg.wait_for_timeout(800); await pg.evaluate(RM); await pg.screenshot(path='q2.png')
        await b.close()
asyncio.run(main())
