#!/usr/bin/env python3
"""Capture real app screenshots (390x780 @2x -> assets/app/NAME.png) for the phone mock.
  python3 tools/snap_app.py "home" "learn:تعلّم" "lesson:تعلّم>الدرس التالي" "ask:اسأل هدهد"
Each arg = NAME[:click1>click2>...] (texts clicked in order from the fresh home screen). Serves ../../public itself."""
import sys,os,threading,http.server,socketserver,functools
from playwright.sync_api import sync_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));PUB=os.path.abspath(os.path.join(ROOT,'..','..','public'))
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
socketserver.TCPServer.allow_reuse_address=True
s=socketserver.ThreadingTCPServer(('127.0.0.1',0),functools.partial(Q,directory=PUB));threading.Thread(target=s.serve_forever,daemon=True).start();port=s.server_address[1]
CLR="document.querySelectorAll('#duam,#cele').forEach(e=>e.remove())"   # test-browser only: removes the dua dialog/celebration overlays
def fresh(b):
    c=b.new_context(viewport={'width':390,'height':780},device_scale_factor=2,locale='ar');pg=c.new_page();pg.goto(f'http://127.0.0.1:{port}/index.html');pg.wait_for_timeout(6000)
    for t in['أوافق وأتابع','لاحقًا']:
        try:pg.get_by_text(t,exact=True).first.click(timeout=3000)
        except Exception:pass
        pg.wait_for_timeout(700)
    pg.wait_for_timeout(2500);pg.evaluate(CLR);return pg
with sync_playwright() as p:
    b=p.chromium.launch()
    for spec in sys.argv[1:]:
        name,_,chain=spec.partition(':');pg=fresh(b)
        for step in [x for x in chain.split('>') if x]:
            pg.get_by_text(step,exact=False).last.click(timeout=8000);pg.wait_for_timeout(2500);pg.evaluate(CLR)
        pg.wait_for_timeout(500);out=os.path.join(ROOT,'assets','app',name+'.png');pg.screenshot(path=out);print('saved',out)
    b.close()
