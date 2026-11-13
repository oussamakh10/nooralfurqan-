import sys,io
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright
a,b_=int(sys.argv[1]),int(sys.argv[2])
OFF=[-1/240,0,1/240]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
    pg=b.new_context(viewport={'width':540,'height':960},device_scale_factor=2).new_page()
    pg.on('pageerror',lambda e:print('ERR',e))
    pg.goto('file:///tmp/vid/v60.html');pg.wait_for_timeout(1200)
    for i in range(a,b_):
        import os
        if len(sys.argv)<4 and os.path.exists(f"/tmp/vid/fr60/{i:04d}.jpg") and i<b_-1: continue
        acc=None
        for o in OFF:
            pg.evaluate(f'render({max(0,i/60+o)})')
            im=np.asarray(Image.open(io.BytesIO(pg.screenshot(type='jpeg',quality=95))).convert('RGB'),dtype=np.float32)
            acc=im if acc is None else acc+im
        Image.fromarray((acc/len(OFF)).astype(np.uint8)).save(f'/tmp/vid/fr60/{i:04d}.jpg',quality=93)
