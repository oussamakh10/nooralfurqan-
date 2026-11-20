#!/usr/bin/env python3
"""Reel Studio CLI (نور الفرقان).  Run from promo/studio:
  python3 build.py new NAME            scaffold stories/NAME/{story.js,audio.py,notes.md}
  python3 build.py shot NAME t1 t2 ..  render key frames -> out/NAME_sheet.png  (LOOK at them before a full render)
  python3 build.py render NAME         full render (2 parallel chunks) + audio + mux -> out/NAME.mp4 + QA report
  python3 build.py qa NAME             QA only (duration, loudness, black frames, first-frame motion)
  python3 build.py list                list stories
Requires: python3, playwright(chromium), ffmpeg, numpy, PIL.  No network needed."""
import sys,os,re,subprocess,threading,http.server,socketserver,functools,json,shutil,time
ROOT=os.path.dirname(os.path.abspath(__file__));os.chdir(ROOT)
LIBS=['lib/rig.js','lib/00_core.js','lib/10_chars.js','lib/20_bg.js','lib/30_phone.js','lib/99_render.js']
HEAD='<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#000}canvas{display:block}</style></head><body><canvas id="c" width="1080" height="1920"></canvas><script>\n'
TAIL='\n</script></body></html>'
FPS=30

def assemble(name):
    sp=f'stories/{name}/story.js'
    if not os.path.exists(sp):sys.exit(f'no story {name}')
    parts=[open(p).read().replace('</script','<\\/script') for p in LIBS]+[open(sp).read(),open('lib/zz_boot.js').read()]
    os.makedirs('_build',exist_ok=True);out=f'_build/{name}.html';open(out,'w').write(HEAD+'\n'.join(parts)+TAIL);return out

class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
def serve():
    h=functools.partial(Q,directory=ROOT);socketserver.TCPServer.allow_reuse_address=True
    s=socketserver.ThreadingTCPServer(('127.0.0.1',0),h);threading.Thread(target=s.serve_forever,daemon=True).start();return s,s.server_address[1]

def open_page(p,port,name):
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.on('console',lambda m:print('C',m.text) if m.type in('error','warning') else None);pg.on('pageerror',lambda e:print('PAGE ERROR',e))
    pg.goto(f'http://127.0.0.1:{port}/_build/{name}.html');pg.wait_for_function('window.ready',timeout=40000);return b,pg

def shot(name,ts):
    from playwright.sync_api import sync_playwright
    from PIL import Image,ImageDraw
    assemble(name);s,port=serve();os.makedirs('out',exist_ok=True);ims=[]
    with sync_playwright() as p:
        b,pg=open_page(p,port,name)
        for t in ts:
            pg.evaluate(f'render({t})');f=f'out/_f{t}.png';pg.screenshot(path=f);im=Image.open(f).resize((360,640));ImageDraw.Draw(im).text((8,8),f'{t}s',fill=(255,255,0));ims.append(im);os.remove(f)
        b.close()
    cols=min(5,len(ims));rows=(len(ims)+cols-1)//cols;sh=Image.new('RGB',(360*cols,640*rows))
    for i,m in enumerate(ims):sh.paste(m,((i%cols)*360,(i//cols)*640))
    o=f'out/{name}_sheet.png';sh.save(o);print('sheet',os.path.abspath(o));s.shutdown()

def chunk(name,a,b,out):
    from playwright.sync_api import sync_playwright
    s,port=serve()
    ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p',out+'.tmp.mp4'],stdin=subprocess.PIPE)
    with sync_playwright() as p:
        bw,pg=open_page(p,port,name)
        for i in range(a,b):pg.evaluate(f'render({i/FPS})');ff.stdin.write(pg.screenshot(type='jpeg',quality=92))
        ff.stdin.close();ff.wait();bw.close()
    os.rename(out+'.tmp.mp4',out)

def dur_of(name):
    m=re.search(r'CFG\.dur\s*=\s*([\d.]+)',open(f'stories/{name}/story.js').read());return float(m.group(1)) if m else 29.8

def render(name):
    t0=time.time();assemble(name);D=dur_of(name);N=int(D*FPS);os.makedirs('out',exist_ok=True);h=N//2
    outs=[f'_build/{name}_c0.mp4',f'_build/{name}_c1.mp4']
    ps=[subprocess.Popen([sys.executable,__file__,'_chunk',name,str(a),str(b),o]) for (a,b),o in zip([(0,h),(h,N)],outs)]
    au=subprocess.Popen([sys.executable,'audio.py'],cwd=f'stories/{name}')
    for p in ps:
        if p.wait():sys.exit('chunk failed')
    au.wait()
    open(f'_build/{name}_list.txt','w').write(''.join(f"file '{os.path.abspath(o)}'\n" for o in outs))
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',f'_build/{name}_list.txt','-c','copy',f'_build/{name}_v.mp4'])
    wav=f'stories/{name}/a.wav';final=f'out/{name}.mp4'
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-i',f'_build/{name}_v.mp4','-i',wav,'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-shortest',final])
    print(f'rendered {final} in {time.time()-t0:.0f}s');qa(name)

def qa(name):
    f=f'out/{name}.mp4';rep=[]
    d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]).decode());rep.append(('duration',f'{d:.2f}s','OK' if d<=29.9 else 'TOO LONG (>29.8)'))
    v=subprocess.run(['ffmpeg','-i',f,'-af','volumedetect','-f','null','-'],capture_output=True,text=True).stderr
    mean=float(re.search(r'mean_volume: (-?[\d.]+)',v).group(1));mx=float(re.search(r'max_volume: (-?[\d.]+)',v).group(1));rep.append(('audio',f'mean {mean}dB max {mx}dB','OK' if -35<mean<-14 and mx<=0 else 'CHECK LEVELS'))
    bd=subprocess.run(['ffmpeg','-i',f,'-vf','blackdetect=d=0.3:pix_th=0.05','-an','-f','null','-'],capture_output=True,text=True).stderr
    rep.append(('black frames','none' if 'black_start' not in bd else 'FOUND','OK' if 'black_start' not in bd else 'CHECK'))
    raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-f','f32le','-ac','1','-ar','8000','-'],capture_output=True).stdout
    import numpy as np
    x=np.frombuffer(raw,dtype=np.float32);rms=[20*np.log10(np.sqrt((x[i*8000:(i+1)*8000]**2).mean())+1e-9) for i in range(len(x)//8000)]
    qs=[i for i,r in enumerate(rms) if r<-30];rep.append(('quiet seconds (<-30dB)',str(qs) if qs else 'none','OK' if not qs else 'DEAD AIR - add music/sfx there'))
    sd=subprocess.run(['ffmpeg','-i',f,'-af','silencedetect=n=-45dB:d=1.5','-f','null','-'],capture_output=True,text=True).stderr
    rep.append(('silence >1.5s','none' if 'silence_start' not in sd else 'FOUND','OK' if 'silence_start' not in sd else 'CHECK (dead air)'))
    try:
        from PIL import Image,ImageChops
        for i,t in enumerate((0,.35)):subprocess.check_call(['ffmpeg','-y','-loglevel','error','-ss',str(t),'-i',f,'-frames:v','1',f'_build/_m{i}.png'])
        df=ImageChops.difference(Image.open('_build/_m0.png').convert('L'),Image.open('_build/_m1.png').convert('L'));px=sum(1 for x in df.getdata() if x>24)/ (1080*1920)*100
        rep.append(('first-frame motion',f'{px:.1f}% pixels change in 0.35s','OK' if px>.5 else 'STATIC HOOK - add motion'))
    except Exception as e:rep.append(('first-frame motion',str(e),'SKIP'))
    print('\nQA — '+name);[print(f'  {a:20s} {b:42s} {c}') for a,b,c in rep]
    print('  NOT automated: read key frames (shot), watch motion, listen, verify verses/hadith, sharia review.')

TEMPLATE_STORY='''/* story: __NAME__ — idea / hook / method / what differs from previous videos: (fill in) */
CFG.dur=29.8;CFG.bg='mosque';           // night|mosque|city|desert|rain|room|dawn|orbit|space
CFG.mid=[18.2,21.2];                    // like/follow card window (keep scenes empty around it)
CFG.end.t0=24.4;CFG.end.phone='home';CFG.end.pills=['أرسله لمن يهمه الأمر 🤍','احفظه لتجرب الموقع لاحقًا 🔖'];
// camera (optional): CFG.cam=[[0,{z:1}],[4,{z:1.25,x:300,y:1100},'eio'],[8,{z:1}]]; CFG.shakes.push([5,.5,14]);
const omar=char('omar',{x:240,keys:[[0,'idle'],[1.2,'point',.5],[4,'cheer',.4]],expr:[[0,'smile'],[1.2,'open']]});
const sara=char('sara',{x:860,face:-1,keys:[[0,'idle'],[3,'talk',.5]]});
say(omar,.3,2.6,'ماذا لو…؟');say(sara,2.8,5.2,'جرّب أولًا!');
TOP.push([0,2.5,[[['ماذا لو',GOLD],['بدأت',WH]],[['اليوم؟',GOLD]]],360,76]);
CAP.push([.2,2.4,'ماذا لو بدأت اليوم؟']);
S.world=t=>{phone(t,{cx:540,cy:960,w:300,h:600,in:0,vis:[[0,1],[17.6,1],[18.4,0],[21.4,0],[22,1],[24.2,1],[24.4,0]],screens:[[0,6,'home'],[6,12,'learn'],[21.4,24.5,'home']]})};
S.over=t=>{pill(t,2.6,6,'① السيناريو الأرجح',540,548,CYAN);arrowUp(t,21.7,24.3,540,820,'🔗 الرابط في البايو')};
'''
TEMPLATE_AUDIO='''import sys;sys.path.insert(0,'../..')
from audiolib import *
music('calm',0,24.4)                      # calm | pulse | epic (always continuous)\nauto_cues('story.js')                     # tick+whoosh locked to every caption/TOP start
add(0.05,whoosh(.5,False,.25),0)
for t in [2.6,6.3,10.4,14.3]:branch(t)    # one per scene change

finish('a.wav')
'''
def new(name):
    d=f'stories/{name}'
    if os.path.exists(d):sys.exit('exists')
    os.makedirs(d);open(d+'/story.js','w').write(TEMPLATE_STORY.replace('__NAME__',name));open(d+'/audio.py','w').write(TEMPLATE_AUDIO);open(d+'/notes.md','w').write(f'# {name}\n- idea:\n- hook:\n- verses/hadith (verify on mushaf / sources):\n- caption + 2-3 hashtags:\n- QA done / not done:\n');print('created',d)

if __name__=='__main__':
    a=sys.argv[1:]
    if not a:print(__doc__)
    elif a[0]=='new':new(a[1])
    elif a[0]=='shot':shot(a[1],[float(x) for x in a[2:]])
    elif a[0]=='render':render(a[1])
    elif a[0]=='qa':qa(a[1])
    elif a[0]=='_chunk':chunk(a[1],int(a[2]),int(a[3]),a[4])
    elif a[0]=='list':print('\n'.join(sorted(os.listdir('stories'))))
    else:print(__doc__)
