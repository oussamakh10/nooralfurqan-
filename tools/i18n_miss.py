import sys,json
from playwright.sync_api import sync_playwright
lang=sys.argv[1] if len(sys.argv)>1 else 'en'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--no-sandbox'])
    pg=b.new_context(viewport={'width':400,'height':860}).new_page()
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8765/index.html');pg.wait_for_timeout(1200)
    pg.evaluate("""()=>{S.prof={name:'خلوفي أسامة',age:30,mins:10};S.consent=1;S.kids=false;save();const c=document.querySelector('#cele');if(c)c.hidden=true}""")
    pg.evaluate(f"setLang('{lang}')");pg.wait_for_timeout(1200)
    def step(js,w=500):
        try:pg.evaluate(js)
        except Exception as e:errs.append('ERR '+js[:40]+str(e)[:80])
        pg.wait_for_timeout(w)
    step("go('learn')")
    step("document.querySelectorAll('.ln-card,.uh').forEach(x=>x.click())")
    # lesson intro / flow / result
    step("startLesson(ALL[0].id)",800)
    step("document.querySelector('[data-lbegin]')&&document.querySelector('[data-lbegin]').click()",600)
    step("document.querySelectorAll('#splash,#lgm').forEach(e=>e.remove())",100)
    step("finishLesson()",900)
    for i in range(0):
        step("{const o=document.querySelector('#lesson .opt:not([disabled])');if(o)o.click();const c=document.querySelector('#lesson [data-act=check]');if(c)c.click();const n=document.querySelector('#lesson [data-act=next]');if(n)n.click()}",120)
    pg.screenshot(path='/tmp/m1.png')
    step("document.querySelector('[data-act=leave]')&&document.querySelector('[data-act=leave]').click()")
    # certificates
    step("typeof lessonCert==='function'&&lessonCert(ALL[0].id)",800)
    step("document.querySelector('#cele').hidden=true")
    step("certCard(0)",800);step("document.querySelector('#cele').hidden=true")
    # school
    step("go('school')",600)
    for t in ['les','ex','bac']:
        step(f"SCHTAB='{t}';renderPage()",500)
    step("SCHTAB='les';renderPage()")
    step("document.querySelector('[data-sc^=\"open:\"]').click()",800)
    step("document.querySelectorAll('[data-sc3go]').forEach(b=>b.click());document.querySelectorAll('.sc3-ans').forEach(d=>d.open=true)")
    step("document.querySelector('[data-sc3m]')&&document.querySelector('[data-sc3m]').click()")
    step("document.querySelector('[data-act=leave]')&&document.querySelector('[data-act=leave]').click()")
    # games
    step("go('play')",600)
    step("document.querySelectorAll('#page [data-gm],#page .gf-md').forEach(b=>b.click())")
    step("renderAssistant&&renderAssistant()",600)
    step("document.querySelectorAll('#splash,#lgm').forEach(e=>e.remove())",50)
    for q in ['السلام عليكم','انا غاضب','كم عدد أركان الإسلام']:
        step("askSend('"+q+"')",1200)
    # settings
    step("openSettings()",600);step("document.querySelector('#cele').hidden=true")
    miss=pg.evaluate("[...MISS]")
    json.dump(miss,open(f'/tmp/miss_{lang}.json','w'),ensure_ascii=False,indent=0)
    print(len(miss),errs[:5])
