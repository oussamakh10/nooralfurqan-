from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page();pg.goto('http://localhost:8765/index.html');pg.wait_for_timeout(1000)
    svg=pg.evaluate("hoopoe('happy',400)")
    pg.close()
    for size,pad,name in [(512,36,'icon-512.png'),(192,14,'icon-192.png'),(512,96,'icon-maskable-512.png')]:
        inner=size-2*pad
        h='<html><body style="margin:0;width:%dpx;height:%dpx;background:radial-gradient(circle at 50%% 38%%,#1f7a7a,#0f3b3a 72%%);display:flex;align-items:center;justify-content:center;overflow:hidden"><div style="width:%dpx;height:%dpx">%s</div></body></html>'%(size,size,inner,inner,svg.replace('<svg','<svg style="width:100%;height:100%"',1))
        q=b.new_page(viewport={'width':size,'height':size});q.set_content(h);q.wait_for_timeout(200);q.screenshot(path='pwa/'+name);q.close()
