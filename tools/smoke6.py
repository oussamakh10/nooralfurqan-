"""اختبار انحدار: التبويبات، القراءة، درس، الإعدادات، اللغة. التشغيل: python3 smoke6.py (الخادم على 8765)"""
import json,sys
from playwright.sync_api import sync_playwright
URL='http://localhost:8765/index.html'
seed=json.dumps({"lang":"ar","prof":{"age":20,"name":"x"},"consent":{"v":1,"t":1},"duaV2":1,"welcomed":1,"ob":1})
R=[]
def chk(name,ok):R.append((name,bool(ok)));print(('PASS ' if ok else 'FAIL ')+name)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':390,'height':780})
    ctx.add_init_script('try{if(!localStorage.getItem("hudhud-v2"))localStorage.setItem("hudhud-v2",%s)}catch(e){}'%json.dumps(seed))
    pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(URL);pg.wait_for_timeout(3000);pg.add_style_tag(content='#duam{display:none!important}')
    n=pg.locator('#nav button');chk('7 تبويبات',n.count()==7)
    for i in range(n.count()):
        n.nth(i).click();pg.wait_for_timeout(500)
        ow=pg.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth")
        chk(f'تبويب {i} بلا تمرير أفقي',ow and pg.locator('#page').inner_text().strip()!='')
    n.nth(2).click();pg.wait_for_timeout(500)
    chk('قائمة 114 سورة',pg.locator('.srow').count()==114)
    pg.locator('[data-rg="1"]').click();pg.wait_for_timeout(300);chk('تصفية جزء عمّ',pg.locator('.srow').count()==37)
    pg.fill('#rsearch','الفلق');pg.wait_for_timeout(300);chk('بحث الفلق',pg.locator('.srow').count()==1)
    pg.locator('.srow').first.click();pg.wait_for_timeout(1500);chk('فتح سورة',pg.locator('.rhead').count()==1)
    n.nth(1).click();pg.wait_for_timeout(600)
    st=pg.locator('[data-lesson]').first;chk('زر درس موجود',st.count()>0)
    if st.count():
        st.click();pg.wait_for_timeout(1200);chk('نافذة الدرس تفتح',pg.locator('#lesson:not([hidden])').count()==1)
        o=pg.locator('[data-opt]');
        if o.count():
            o.first.click();pg.locator('[data-act="check"]').click();pg.wait_for_timeout(500)
            chk('تظهر نتيجة الإجابة',pg.locator('[data-act="next"]').count()>0)
        pg.keyboard.press('Escape')
    pg.goto(URL);pg.wait_for_timeout(3000);pg.add_style_tag(content='#duam{display:none!important}')
    pg.locator('[data-act="settings"]').first.click();pg.wait_for_timeout(500);chk('الإعدادات تفتح',pg.locator('.setrow').count()>0)
    chk('لا أخطاء JS',not errs)
    if errs:print(errs[:3])
    b.close()
bad=[n for n,o in R if not o];print('\nالنتيجة: %d/%d'%(len(R)-len(bad),len(R)));sys.exit(1 if bad else 0)
