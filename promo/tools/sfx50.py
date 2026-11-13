import numpy as np, wave
sr=44100;D=30;N=sr*D;L=np.zeros(N);R=np.zeros(N);rng=np.random.default_rng(11)
B=.6;E=.3;S=.15
def add(t,x,g=1,pan=0):
    i=int(t*sr)
    if i>=N or i<0:return
    x=x[:N-i]*g;L[i:i+len(x)]+=x*(1-max(pan,0));R[i:i+len(x)]+=x*(1+min(pan,0))
def tone(f,dur,a=.005,dec=5):
    t=np.arange(int(dur*sr))/sr;return np.sin(2*np.pi*f*t)*np.minimum(1,t/a)*np.exp(-dec*t)
def noise(n):return rng.standard_normal(n)
def bp(x,lo,hi):  # crude band-pass via two one-pole filters
    y=np.zeros_like(x);s=0;a=min(.99,2*np.pi*hi/sr)
    for i in range(len(x)):s+=a*(x[i]-s);y[i]=s
    z=np.zeros_like(y);s=0;a=min(.99,2*np.pi*lo/sr)
    for i in range(len(y)):s+=a*(y[i]-s);z[i]=y[i]-s
    return z
# prebuilt drum hits
def mk_dum():
    n=int(.35*sr);t=np.arange(n)/sr;f=75+85*np.exp(-t*28);ph=2*np.pi*np.cumsum(f)/sr
    return (np.sin(ph)*np.exp(-t*9)+.25*noise(n)*np.exp(-t*60)*.4)
def mk_tak(f=2400,dec=45):
    n=int(.12*sr);t=np.arange(n)/sr;x=bp(noise(n),900,f)*np.exp(-t*dec);return x/np.abs(x).max()*.9+np.sin(2*np.pi*820*t)*np.exp(-t*60)*.3
def mk_tek():
    n=int(.08*sr);t=np.arange(n)/sr;x=bp(noise(n),1500,5200)*np.exp(-t*70);return x/np.abs(x).max()*.7
def mk_shk():
    n=int(.06*sr);t=np.arange(n)/sr;x=noise(n)*np.exp(-t*90);y=np.diff(x,prepend=0);return y/np.abs(y).max()
DUM,TAK,TEK,SHK=mk_dum(),mk_tak(),mk_tek(),mk_shk()
def dum(t,g=.5):add(t,DUM,g)
def tak(t,g=.3,p=0):add(t,TAK,g,p)
def tek(t,g=.2,p=0):add(t,TEK,g,p)
def shk(t,g=.05):add(t,SHK,g,rng.uniform(-.3,.3))
def pop(t,f=520,g=.3):add(t,tone(f,.18,.003,22)*g+tone(f*2,.18,.003,30)*g*.3)
def tick(t,g=.15,f=1900):add(t,tone(f,.05,.001,70)*g)
def sweep(t,dur,g,up=True):
    n=int(dur*sr);x=noise(n);y=np.zeros(n);s=0
    a=np.linspace(.02,.5,n)**1.5 if up else np.linspace(.5,.02,n)**1.5
    for i in range(n):s+=a[i]*(x[i]-s);y[i]=s
    e=(np.linspace(0,1,n)**2) if up else np.sin(np.pi*np.arange(n)/n)**2
    add(t,y*e*g*4)
def chime(t,f=880,g=.2):
    for k,m in enumerate([1,1.5,2,3]):add(t,tone(f*m,1.6,.004,2.5+k*2)*g/(k+1))
def spark(t,g=.1):
    for k,f in enumerate([2093,2637,3136]):add(t+k*.05,tone(f,.5,.002,9)*g)
def chirp(t,f0,f1,dur=.09,g=.09):
    n=int(dur*sr);tt=np.arange(n)/sr;f=f0+(f1-f0)*np.sin(np.pi*tt/dur);ph=2*np.pi*np.cumsum(f)/sr
    add(t,np.sin(ph)*np.sin(np.pi*tt/dur)**2*g,pan=rng.uniform(-.6,.6))
def cricket(t,g=.04):
    for k in range(3):
        n=int(.05*sr);tt=np.arange(n)/sr;add(t+k*.07,np.sin(2*np.pi*4300*tt)*np.sin(np.pi*tt/.05)**2*g)
# ---------- groove ----------
def bar(t0,lvl=1.0,style='full'):
    # maqsum: D T . T D . T .   (eighths)
    pat={0:'D',1:'T',3:'T',4:'D',6:'T'}
    for k,v in pat.items():
        t=t0+k*E
        if style=='dums':
            if v=='D':dum(t,.42*lvl)
            elif k==6:tak(t,.18*lvl)
        elif style=='soft':
            if v=='D':dum(t,.45*lvl)
            elif k!=3:tak(t,.22*lvl)
        else:
            if v=='D':dum(t,.5*lvl)
            else:tak(t,.3*lvl)
    for k in range(8):
        if k not in pat:tek(t0+k*E+E/2,.07*lvl)   # ghost notes
    for k in range(16):shk(t0+k*S,.045*lvl*(1.3 if k%4==0 else 1))
# intro heartbeat
for i in range(8):dum(i*B,.18+.03*i)           # 0..4.8
for i in range(4,8):tak(i*B+E,.12)
# moments (bars are 2.4s; sections start on bar-aligned beats)
def section(a,b,lvl,style):
    t=a
    while t<b-1e-6:
        bar(t,lvl,style);t+=4*B
section(4.8,9.0,.8,'soft')      # intro of phone + dawn
section(9.0,12.6,1.0,'full')    # noon lesson
section(12.6,16.2,.85,'soft')   # asr reading
section(16.2,19.8,1.15,'full')  # maghrib games (energetic)
for t in np.arange(16.2,19.8,S):
    if int(round((t-16.2)/S))%4 in (2,3):tek(t,.08)
section(19.8,23.4,.9,'dums')    # isha calm
section(23.4,27.0,1.1,'full')   # stats build
for t in np.arange(25.8,27.0,S):tak(t,.12+.1*(t-25.8)/1.2)   # roll
# drone pad (soft, non-melodic): D2 A2 D3
tt=np.arange(N)/sr
env=np.clip((tt-4.8)/1.5,0,1)*np.clip((D-tt)/1.8,0,1)*(.7+.3*np.clip((tt-23.4)/2,0,1))
pad=(np.sin(2*np.pi*73.42*tt)+.6*np.sin(2*np.pi*110*tt)+.35*np.sin(2*np.pi*146.84*tt+.5*np.sin(2*np.pi*.2*tt)))*env*.035
L+=pad;R+=pad
# ---------- accents / sfx on the beat grid ----------
for t in [5.4,9.0,12.6,16.2,19.8]:
    sweep(t-.6,.6,.12);dum(t,.7);chime(t,880,.16)
sweep(4.2,.6,.12);dum(4.8,.7);sweep(4.8,.5,.1,False)
sweep(26.4,.6,.15);dum(27.0,.9);chime(27.0,1046,.26);sweep(27.0,.5,.12,False)
# hook
pop(0,600,.25)
for i in range(3):tick(i*.3+.02,.12)
pop(1.2,330,.4);dum(1.2,.7)
sweep(2.4,.4,.1,False)
for i,t in enumerate([2.4,2.7,3.0,3.3]):tick(t+.02,.15,1700);
pop(2.7,700,.25)
for i in range(7):tick(4.0+i*.12,.1,1700)
# moments
for t in [5.7,6.0,6.15,6.9,7.5,8.1,8.25]:chirp(t,rng.uniform(2800,3400),rng.uniform(3800,4600))
for k,t in enumerate([6.6,7.2,7.8]):tick(t+.04,.28,1500);pop(t+.08,420+k*60,.1)
tick(10.2,.3,1500);pop(10.3,560,.22);tick(11.4,.3,1500);chime(11.5,988,.2);spark(11.55,.12)
tick(14.4,.25,1500);sweep(14.4,.3,.08,False)
for t in [13.2,14.4,15.6]:spark(t,.09)
tick(17.4,.3,1500);pop(18.0,640,.28);pop(18.3,780,.22)
tick(20.4,.3,1500);chime(20.5,660,.12)
for t in np.arange(20.1,23.1,.6):cricket(t+.3)
# stats
sweep(23.1,.4,.1)
for i in range(44):tick(24.1+i*.035,.08,2200+i*20)
for t0 in [24.0,24.3,24.6,24.9]:pop(t0,480,.18)
# CTA
pop(27.0,520,.35);pop(27.6,700,.2);pop(28.2,640,.2);pop(28.8,640,.3);chime(28.8,1318,.18);spark(29.4,.12)
# final
dum(28.8,.6);dum(29.4,.5)
# airy bed
n=N;x=noise(n);y=np.zeros(n);s_=0
for i in range(n):s_+=.004*(x[i]-s_);y[i]=s_
bed=y*np.minimum(1,np.arange(n)/sr/1.5)*np.minimum(1,(n-np.arange(n))/sr/2)*5
L+=bed*.4;R+=bed*.4
# soft limit + fade
def lim(a):return np.tanh(a*1.3)/1.3
L,R=lim(L),lim(R)
fade=np.clip((D-tt)/1.5,0,1);L*=fade;R*=fade
m=max(abs(L).max(),abs(R).max());st=np.stack([L,R],1)/(m*1.08)
w=wave.open('sfx50.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((st*32767).astype(np.int16).tobytes());w.close()
print('done')
