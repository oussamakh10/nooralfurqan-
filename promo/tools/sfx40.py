import numpy as np, wave
sr=44100;N=sr*30;L=np.zeros(N);R=np.zeros(N);rng=np.random.default_rng(5)
def add(t,x,g=1,pan=0):
    i=int(t*sr)
    if i>=N:return
    x=x[:N-i]*g;L[i:i+len(x)]+=x*(1-max(pan,0));R[i:i+len(x)]+=x*(1+min(pan,0))
def tone(f,dur,a=.005,dec=5):
    t=np.arange(int(dur*sr))/sr;return np.sin(2*np.pi*f*t)*np.minimum(1,t/a)*np.exp(-dec*t)
def pop(t,f=520,g=.35):add(t,tone(f,.18,.003,22)*g+tone(f*2,.18,.003,30)*g*.3)
def tick(t,g=.18,f=1900):add(t,tone(f,.05,.001,70)*g)
def whoosh(t,dur=.55,g=.3):
    n=int(dur*sr);x=rng.standard_normal(n);y=np.zeros(n);a=np.linspace(.02,.5,n)**1.5;s=0
    for i in range(n):s+=a[i]*(x[i]-s);y[i]=s
    add(t,y*np.sin(np.pi*np.arange(n)/n)**2*g*4)
def chime(t,f=880,g=.3):
    for k,m in enumerate([1,1.5,2,3]):add(t,tone(f*m,1.6,.004,2.5+k*2)*g/(k+1))
def thud(t,g=.4):add(t,tone(70,.4,.002,10)*g)
def chirp(t,f0=3000,f1=4200,dur=.09,g=.12):
    n=int(dur*sr);tt=np.arange(n)/sr;f=f0+(f1-f0)*np.sin(np.pi*tt/dur);ph=2*np.pi*np.cumsum(f)/sr
    add(t,np.sin(ph)*np.sin(np.pi*tt/dur)**2*g,pan=rng.uniform(-.6,.6))
def cricket(t,g=.05):
    for k in range(3):
        n=int(.05*sr);tt=np.arange(n)/sr;add(t+k*.07,np.sin(2*np.pi*4300*tt)*np.sin(np.pi*tt/.05)**2*g)
def spark(t,g=.12):
    for k,f in enumerate([2093,2637,3136]):add(t+k*.05,tone(f,.5,.002,9)*g)
# hook
pop(0,600,.3)
for i in range(3):tick(.12+i*.17)
pop(.95,330,.5);thud(.95,.5);whoosh(1.95,.4,.2)
for i in range(4):tick(2.4+i*.3,.15,1800)
pop(2.5,700,.3);whoosh(3.8,.4,.2)
for i in range(7):tick(4.05+i*.14,.12,1700)
whoosh(4.9,.5,.25)
# moments
for t in [5.4,9.0,12.6,16.2,19.8]:chime(t,880,.2);whoosh(t-.2,.5,.2)
whoosh(5.1,.6,.28)
# M1 dawn birds + taps
for t in [5.7,6.0,6.15,6.9,7.6,8.2,8.35]:chirp(t,rng.uniform(2800,3400),rng.uniform(3800,4600),.09,.1)
for t in [6.95,7.45,7.95]:tick(t+.05,.3,1500);pop(t+.1,420+(t-6.95)*60,.12)
# M2 quiz
tick(10.6,.3,1500);pop(10.7,560,.25);tick(11.4,.3,1500);chime(11.5,988,.22);spark(11.55,.14)
# M3 reading
whoosh(14.4,.3,.12);tick(14.4,.25,1500)
for t in [13.3,14.6,15.4]:spark(t,.1)
# M4 games
tick(17.65,.3,1500);pop(17.9,640,.3);pop(18.2,780,.25)
# M5 listen + crickets
tick(20.95,.3,1500);chime(21.1,660,.14)
for t in np.arange(20.5,23.2,.55):cricket(t)
# stats
whoosh(23.2,.5,.25)
for i in range(40):tick(24.15+i*.035,.1,2200+i*20)
for t0 in [24.0,24.15,24.3,24.45]:pop(t0,480,.2)
whoosh(26.0,.5,.25)
# CTA
pop(26.8,520,.4);chime(26.85,1046,.3);pop(27.5,700,.2);pop(28.1,640,.35);chime(28.2,1318,.2);spark(28.4,.14)
# airy bed + gentle low pad (soft, non-melodic)
n=N;x=rng.standard_normal(n);y=np.zeros(n);s=0
for i in range(n):s+=.004*(x[i]-s);y[i]=s
bed=y*np.minimum(1,np.arange(n)/sr/1.5)*np.minimum(1,(n-np.arange(n))/sr/2)*6
L+=bed*.5;R+=bed*.5
m=max(abs(L).max(),abs(R).max());st=np.stack([L,R],1)/(m*1.12)
w=wave.open('sfx40.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((st*32767).astype(np.int16).tobytes());w.close()
