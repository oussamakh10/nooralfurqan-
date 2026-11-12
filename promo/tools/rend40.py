import sys
from playwright.sync_api import sync_playwright
a,b_=int(sys.argv[1]),int(sys.argv[2])
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
    pg=b.new_context(viewport={'width':540,'height':960},device_scale_factor=2).new_page()
    pg.goto('file:///tmp/vid/v40.html');pg.wait_for_timeout(1200)
    for i in range(a,b_):
        pg.evaluate(f'render({i/60})')
        pg.screenshot(path=f'/tmp/vid/fr40/{i:04d}.jpg',type='jpeg',quality=93)
