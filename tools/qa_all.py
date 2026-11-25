#!/usr/bin/env python3
"""فحص آلي شامل قبل النشر:  python3 -m http.server 8765 -d public &  ثم  python3 tools/qa_all.py
يفحص: أخطاء JS (window.__errs)، ضغط كل الأزرار في كل تبويب، نافذة «المزيد»، الأسماء الوصولية، h1،
وبقايا العربية في الإنجليزية/الفرنسية. يخرج بكود 1 عند أي فشل."""
import re,sys
from playwright.sync_api import sync_playwright
URL='http://localhost:8765/index.html'
TABS=['home','learn','read','listen','play','ach','shop']
ALLOW={'العربية','نور','الفرقان'}
fails=[]
def fail(m):print('FAIL',m);fails.append(m)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
    pg=b.new_context(viewport={'width':400,'height':860},locale='ar').new_page()
    pg.goto(URL);pg.wait_for_timeout(1500)
    pg.evaluate("()=>{S.prof={name:'x',age:30,mins:10};S.consent=1;S.duaV2=1;save()}");pg.reload();pg.wait_for_timeout(6500)
    hide="()=>document.querySelectorAll('#cele,#lgm,#adhov,#duam').forEach(c=>c.hidden=true)"
    pg.evaluate(hide)
    for lang in ('ar','en','fr'):
        pg.evaluate(f"setLang('{lang}')");pg.wait_for_timeout(800)
        for g in TABS:
            pg.evaluate(f"go('{g}')");pg.wait_for_timeout(600)
            r=pg.evaluate("""()=>{const bad=[];document.querySelectorAll('button,a[href],input,select').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||getComputedStyle(e).visibility==='hidden')return;
              const n=(e.getAttribute('aria-label')||e.textContent||e.title||e.placeholder||'').trim();if(!n&&!(e.labels&&e.labels.length))bad.push(e.outerHTML.slice(0,80))});
              return {bad,h1:document.querySelectorAll('h1').length,ov:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,txt:document.getElementById('page').innerText}}""")
            if r['bad']:fail(f'{lang}/{g} بلا اسم وصولي: {r["bad"][:2]}')
            if r['h1']!=1:fail(f'{lang}/{g} عدد h1={r["h1"]}')
            if r['ov']:fail(f'{lang}/{g} تمرير أفقي')
            if lang!='ar' and g not in ('read','listen'):
                left=[w for w in re.findall(r'[؀-ۿ]+',r['txt']) if w not in ALLOW]
                if left:fail(f'{lang}/{g} عربية متبقية: {left[:5]}')
        pg.evaluate("go('home')");pg.click('#nav [data-go="more"]');pg.wait_for_timeout(300)
        if not pg.evaluate("!!document.getElementById('moresheet')"):fail(f'{lang} نافذة المزيد لا تفتح')
        pg.evaluate("document.getElementById('moresheet')&&document.getElementById('moresheet').remove()")
    pg.evaluate("setLang('ar')");pg.wait_for_timeout(500)
    for g in TABS:
        pg.evaluate(f"go('{g}')");pg.wait_for_timeout(300)
        n=pg.evaluate("document.querySelectorAll('#page button').length")
        for i in range(min(n,40)):
            pg.evaluate(f"go('{g}')");pg.wait_for_timeout(200)
            pg.evaluate(f"()=>{{const b=document.querySelectorAll('#page button')[{i}];if(b)b.click()}}");pg.wait_for_timeout(250)
    errs=pg.evaluate('window.__errs||[]')
    for e in errs:fail('JS: '+e['m']+' | '+e['s'][:120].replace('\n',' '))
print('PASS' if not fails else f'{len(fails)} failures');sys.exit(1 if fails else 0)
