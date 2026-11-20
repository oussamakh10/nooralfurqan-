"""Studio audio lib. In a story's audio.py:  from audiolib import *  ... then finish('a.wav')
Helpers: add(t,x,pan,v) tone chime pluck rhodes whoosh kick hat click thud tick sweep sfx(name,t,v) bed(name,t0,t1,v)
Macros: music(style,t0,t1) | branch(t) | ding(t) | tap(t) | correct(t) | wrong(t) | midcta_cues() | endcard_cues(t0)"""
import numpy as np,wave
from numpy.fft import rfft,irfft
import os
sr=44100;T=29.8;n=int(sr*T);L=np.zeros(n);R=np.zeros(n)  # stereo buffers
rng=np.random.default_rng(7)
class W(np.ndarray):
    def __add__(a,b):
        m=max(len(a),len(b));x=np.zeros(m);x[:len(a)]+=np.asarray(a);x[:len(b)]+=np.asarray(b);return x.view(W)
    __radd__=__add__
w_=lambda x:np.asarray(x).view(W)
def add(t,x,pan=0.0,v=1.0):
    i=int(t*sr)
    if i<0 or i>=n:return
    x=np.asarray(x)[:n-i];L[i:i+len(x)]+=x*v*(1-pan);R[i:i+len(x)]+=x*v*(1+pan)
def T_(d):return np.arange(int(sr*d))/sr
def tone(f,d,v=.3,dec=8,harm=(1,)):
    t=T_(d);y=sum(a*np.sin(2*np.pi*f*(k+1)*t) for k,a in enumerate(harm))
    return w_(v*y*np.exp(-dec*t)*np.minimum(1,t*400))
def sweep(f0,f1,d,v=.3,dec=3):
    t=T_(d);f=f0*(f1/f0)**(t/d);ph=2*np.pi*np.cumsum(f)/sr;return w_(v*np.sin(ph)*np.exp(-dec*t))
def lp(x,a):
    y=np.zeros_like(x);s=0
    for i in range(len(x)):s+=a*(x[i]-s);y[i]=s
    return y
def whoosh(d,up=True,v=.3):
    t=T_(d);nz=rng.standard_normal(len(t));out=np.zeros(len(t));K=12
    for k,a in enumerate(np.linspace(.02,.5,K) if up else np.linspace(.5,.02,K)):
        s0,s1=k*len(t)//K,(k+1)*len(t)//K;out[s0:s1]=lp(nz[s0:s1],a)*(1+4*a)
    env=np.sin(np.pi*t/d)**1.5
    return w_(v*out*env/np.abs(out).max())
def kick(v=.5):
    t=T_(.25);f=45+110*np.exp(-t*30);return w_(v*np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-t*12))
def hat(v=.08):
    t=T_(.05);return w_(v*rng.standard_normal(len(t))*np.exp(-t*90))
def click(v=.25):
    t=T_(.04);return w_(v*np.sin(2*np.pi*1800*t)*np.exp(-t*120))
def chime(f,v=.25,d=1.2):return tone(f,d,v,3.5,(1,.3,.1))
def pluck(f,v=.18,d=.35):return tone(f,d,v,10,(1,.5,.25))
N=lambda m:440*2**((m-69)/12)
def thud(v=.3,f=70):
    t=T_(.14);return w_(v*np.sin(2*np.pi*(f-200*t)*t)*np.exp(-t*26))
def rhodes(f,d=1.6,v=.12):
    t=T_(d);y=np.sin(2*np.pi*f*t)+.4*np.sin(2*np.pi*f*2*t)*np.exp(-t*3)+.1*np.sin(2*np.pi*f*4*t)*np.exp(-t*8)
    return w_(v*y*np.exp(-t*1.8)*(1+.15*np.sin(2*np.pi*5*t))*np.minimum(1,t*200))
def tick(v=.15):
    t=T_(.03);return w_(v*np.sin(2*np.pi*2200*t)*np.exp(-t*140))
def knock(v=.4):
    t=T_(.09);return w_(v*np.sin(2*np.pi*320*t)*np.exp(-t*50)+v*.3*np.sin(2*np.pi*900*t)*np.exp(-t*80))
def chirp(t0,v=.2):
    for k,(f0,f1) in enumerate([(2200,3200),(2600,3500),(2400,3000)]):add(t0+k*.11,sweep(f0,f1,.09,v,8),.4)
def engine(d,f0=48,v=.18,rise=0.0):
    t=T_(d);ph=2*np.pi*np.cumsum(f0*(1+rise*t/d)*(1+.03*np.sin(2*np.pi*7*t)))/sr
    y=np.sign(np.sin(ph))*.5+np.sin(2*ph)*.5;return w_(v*lp(y,.05)*3)
import subprocess
X=os.path.join(os.path.dirname(os.path.abspath(__file__)),'assets','sfx')+'/'
def ld(p):
    raw=subprocess.run(['ffmpeg','-v','error','-i',p,'-f','f32le','-ac','1','-ar',str(sr),'-'],capture_output=True).stdout
    return w_(np.frombuffer(raw,dtype=np.float32).astype(float))
def bed(name,t0,t1,v,fi=.6,fo_=.8):
    b=ld(X+'beds/'+name+'.m4a');d=int((t1-t0)*sr);b=np.tile(b,d//len(b)+1)[:d].copy()
    e=np.ones(d);a=int(fi*sr);o=int(fo_*sr);e[:a]=np.linspace(0,1,a);e[-o:]=np.linspace(1,0,o);add(t0,w_(b*e),0,v)
def sfx(name,t,v=.5,pan=0,mx=None):
    x=ld(X+name)
    if mx:x=x[:int(mx*sr)]
    add(t,x,pan,v)











def music(style='calm',t0=0,t1=24.4,v=1.0,key=0):
    """Generated underscore. styles: calm (pad+chimes) | pulse (soft beat+bass+arp) | epic (pad+swell+chimes)"""
    chords=[[50,57,62,66],[47,54,59,62],[43,50,55,59],[45,52,57,61]]
    bar={'calm':3.5,'pulse':2.0,'epic':3.0}[style];k=0;t=t0
    while t<t1-.3:
        ch=chords[k%4]
        for j,m in enumerate(ch):add(t,rhodes(N(m+key),bar+1,.09*v),(j-1.5)*.25)
        if style=='calm':
            for q,m in enumerate([76,79,83,79]):add(t+q*bar/4,chime(N(m+key),.07*v,2.0),(q%2)*.5-.25)
        if style=='pulse':
            for q in range(4):
                add(t+q*bar/4,kick(.28*v),0);add(t+q*bar/4+bar/8,hat(.06*v),.3)
                add(t+q*bar/4,tone(N(ch[0]-12+key),bar/4,.12*v,3),0)
            for q,m in enumerate([ch[2]+12,ch[3]+12,ch[1]+24,ch[3]+12,ch[2]+12,ch[1]+12,ch[3]+12,ch[2]+24]):add(t+q*bar/8,pluck(N(m+key),.07*v,.3),(q%2)*.6-.3)
        if style=='epic':
            add(t,whoosh(bar*.9,True,.12*v),0);add(t+bar*.9,thud(.35*v,55),0)
            for q,m in enumerate([ch[3]+24,ch[2]+24,ch[3]+12]):add(t+q*bar/3,chime(N(m+key),.09*v,2.2),.3)
        t+=bar;k+=1
def branch(t):  # scene change: whoosh + thud + chime
    add(t,whoosh(.45,True,.2),0);add(t+.3,thud(.3,80),0);add(t+.3,chime(N(86),.12,1.2),.2)
def ding(t,m=88):add(t,chime(N(m),.16,1.2),.2);add(t+.1,chime(N(m+7),.12,1.4),-.2)
def tap(t):add(t,click(.3),0);add(t+.05,tone(1500,.1,.15,10),0)
def correct(t):ding(t,88)
def wrong(t):add(t,tone(180,.35,.2,5),0);add(t,tone(190,.35,.15,5),.2)
def midcta_cues(a=18.2):
    add(a+1.1,chime(N(91),.14,.8),.2);add(a+1.15,click(.2),0);add(a+1.9,chime(N(95),.14,.8),.2);add(a+1.95,click(.2),0)
def endcard_cues(t0=24.4):
    sfx('card-slide-1.ogg',t0+.1,.6)
    for j,m in enumerate([62,66,69,74]):add(t0+.3+j*.05,rhodes(N(m),3.5,.16),(j-1.5)*.25)
    sfx('impactBell_heavy_000.ogg',t0+.4,.5,mx=3.0)
    for k,m in enumerate([86,90,93,90]):add(t0+.8+k*.35,chime(N(m),.11,1.4),.3*(k%2*2-1))
    add(t0+1.1,chime(N(95),.14,1.0),.2)
    for q in (1.7,2.2,2.7):add(t0+q,tone(900 if q<2.6 else 1100,.1,.2,10),0)
    add(t0+3.3,chime(N(79),.13,1.2),.2);add(t0+4.0,pluck(N(84),.13,.8),0)
def finish(path='a.wav'):
    global L,R
    ir=np.exp(-np.arange(int(sr*.35))/sr*14)*rng.standard_normal(int(sr*.35))*.02
    def rev(x):
        m=len(x)+len(ir);return irfft(rfft(x,m)*rfft(ir,m),m)[:len(x)]
    L=L+rev(L)*.6;R=R+rev(R)*.6
    fo=np.ones(n);m=int(sr*.5);fo[-m:]=np.linspace(1,0,m);L*=fo;R*=fo
    mx=max(np.abs(L).max(),np.abs(R).max());L=L/mx*.85;R=R/mx*.85
    st=np.stack([L,R],1)
    w=wave.open(path,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((st*32767).astype('int16').tobytes());w.close();print('audio ok',path)
