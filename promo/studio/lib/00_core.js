/* ===== STUDIO CORE: math, easing, timeline, text, UI cards, camera ===== */
const {E,setStyle,sparkle,glow,rr,circle,seg,clamp,ease,noise}=RIG;
E.W=1080;E.H=1920;E.vertical=true;E.fps=30;
const cv=document.getElementById('c'),g=cv.getContext('2d');g.direction='rtl';
const W_=1080,H_=1920;
const lerp=(a,b,k)=>a+(b-a)*k,sm=x=>x*x*(3-2*x),cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const P=(a,b,t)=>cl((t-a)/(b-a));                       // progress 0..1 of t within [a,b]
const eo=x=>1-Math.pow(1-x,3),eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const eb=x=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};   // easeOutBack
const spring=(t,z=.55,f=2.2)=>{if(t<=0)return 0;const w=2*Math.PI*f;if(z>=1)return 1-Math.exp(-w*t)*(1+w*t);const wd=w*Math.sqrt(1-z*z);return 1-Math.exp(-z*w*t)*(Math.cos(wd*t)+(z*w/wd)*Math.sin(wd*t))};
const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};      // deterministic 0..1
// keyframed number: kf(t,[[t0,v0],[t1,v1,'eo'|'eio'|'sm'|'hold'],...])
function kf(t,K){if(t<=K[0][0])return K[0][1];for(let i=1;i<K.length;i++){if(t<K[i][0]){const a=K[i-1],b=K[i],u=P(a[0],b[0],t),m=b[2];const k=m==='hold'?0:m==='eo'?eo(u):m==='eio'?eio(u):sm(u);return lerp(a[1],b[1],k)}}return K[K.length-1][1]}
const lgx=(x0,y0,x1,y1,st)=>{const q=g.createLinearGradient(x0,y0,x1,y1);st.forEach((c,i)=>q.addColorStop(i/(st.length-1),c));return q};
const WH='#fff6e3',GOLD='#f2c14a',RED='#ff4d5e',CYAN='#43e0ff',PINK='#ff8fe0',MINT='#7dffb0';

/* ---- global story config (stories override with CFG.x=...) ---- */
const CFG={dur:29.8,handle:'@NOOR_ALFURQUAN',bg:'night',GY:1290,
  mid:[18.2,21.2],midXY:[540,900],
  end:{t0:24.4,phone:'home',bio:true,pills:['أرسله لمن يهمه الأمر 🤍','احفظه لتجرب الموقع لاحقًا 🔖']},
  cam:null,shakes:[]};
const IM={};const load=n=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=n});
const SCRIPTS_READY=[];

/* ---- camera: CFG.cam=[[t,{z,x,y}]...] focus point (x,y) & zoom z; CFG.shakes=[[t,dur,amp]] ---- */
function camAt(t){const K=CFG.cam;let z=1,x=540,y=960;if(K){const kk=k=>kf(t,K.map(c=>[c[0],c[1][k]!=null?c[1][k]:({z:1,x:540,y:960})[k],c[2]]));z=kk('z');x=kk('x');y=kk('y')}
 let sx=0,sy=0;for(const s of CFG.shakes){const k=cl(1-(t-s[0])/s[1]);if(t>=s[0]&&k>0){sx+=noise(t*38,1)*s[2]*k*k;sy+=noise(t*38,7)*s[2]*k*k}}return{z,x,y,sx,sy}}
function camBegin(t){const c=camAt(t);g.save();g.translate(540+c.sx,960+c.sy);g.scale(c.z,c.z);g.translate(-c.x,-c.y);return c}
function camEnd(){g.restore()}

/* ---- text ---- */
function line(words,y,sz,font,al,gl){g.save();g.globalAlpha=al;g.font=`800 ${sz}px ${font}`;g.textAlign='left';const sp=sz*.28,ws=words.map(w=>g.measureText(w[0]).width);let tot=ws.reduce((a,b)=>a+b,0)+sp*(words.length-1);let x=540+tot/2;
 for(let i=0;i<words.length;i++){x-=ws[i];g.shadowColor=words[i][1];g.shadowBlur=gl;g.fillStyle=words[i][1];g.fillText(words[i][0],x,y);x-=sp}g.restore()}
// kinetic top text: lines = [ [['كلمة',color],...], ... ]
function kt(t,a,b,lines,y,sz,font='TJ',gl=9){if(t<a||t>=b)return;const k=eb(cl((t-a)/.35)),al=Math.min(1,k)*(1-cl((t-(b-.25))/.25));lines.forEach((ln,i)=>line(ln,y+i*sz*1.28+(1-Math.min(1,k))*30,sz,font,al,gl))}
// whole-sentence caption (one at a time, never word by word)
function caps(t){for(const c of (window.CAP||[])){if(t<c[0]||t>=c[1])continue;const k=eb(cl((t-c[0])/.22)),al=Math.min(1,k)*(1-cl((t-(c[1]-.12))/.12));g.save();g.globalAlpha=al;g.translate(540,1400);g.scale(.86+.14*Math.min(1,k),.86+.14*Math.min(1,k));g.font='800 84px TJ';g.textAlign='center';{const mw=g.measureText(c[2]).width,fs=Math.min(1,960/mw);g.scale(fs,fs)}const col=c[3]||WH;g.shadowColor=col;g.shadowBlur=22;g.fillStyle=col;g.fillText(c[2],0,0);g.restore()}}
function pill(t,a,b,txt,x,y,col=GOLD,sz=40,fill='rgba(6,16,26,.9)',tc=null){if(t<a||t>=b)return;const k=eb(cl((t-a)/.3)),al=Math.min(1,k)*(1-cl((t-(b-.25))/.25));g.save();g.globalAlpha=al;g.translate(x,y);g.scale(.85+.15*Math.min(1,k),.85+.15*Math.min(1,k));g.textAlign='center';g.font=`800 ${sz}px TJ`;const w=g.measureText(txt).width+sz*1.7;g.fillStyle=fill;g.strokeStyle=col;g.lineWidth=4;g.shadowColor=col;g.shadowBlur=20;rr(g,-w/2,-sz*.9,w,sz*1.8,sz*.9);g.fill();g.stroke();g.shadowColor='transparent';g.fillStyle=tc||col;g.fillText(txt,0,sz*.33);g.restore()}
// comic speech bubble from a point (tail points to tx,ty)
function bubble(t,a,b,txt,x,y,tx,ty,sz=54,col='#2a2238',bg='#fffdf6'){if(t<a||t>b)return;const ki=eb(P(a,a+.22,t)),ko=P(b-.15,b,t);const k=Math.min(ki,1-ko);
 g.save();g.translate(x,y);g.scale(k,k);g.font=`800 ${sz}px TJ`;g.textAlign='center';const lines=txt.split('\n');const w=Math.max(...lines.map(l=>g.measureText(l).width))+70,h=sz*1.3*lines.length+30;g.shadowColor='rgba(0,0,0,.4)';g.shadowBlur=16;g.shadowOffsetY=6;
 rr(g,-w/2,-h/2,w,h,36);g.fillStyle=bg;g.fill();g.beginPath();g.moveTo(-24,h/2-6);g.lineTo(tx-x,ty-y);g.lineTo(24,h/2-6);g.fill();g.shadowColor='transparent';g.textBaseline='middle';g.fillStyle=col;lines.forEach((l,i)=>g.fillText(l,0,(i-(lines.length-1)/2)*sz*1.3+3));g.restore()}
// thought bubble (cloud + dots to head)
function thought(t,a,b,txt,x,y,hx,hy,sz=54,col='#d9f6ff'){if(t<a||t>b)return;const ki=eb(P(a,a+.25,t)),ko=P(b-.15,b,t),k=Math.min(ki,1-ko);g.save();g.globalAlpha=Math.min(1,k*1.5);
 for(let i=0;i<3;i++){const u=(i+1)/4;g.fillStyle='rgba(20,40,60,.9)';g.strokeStyle=CYAN;g.lineWidth=3;g.beginPath();g.arc(lerp(hx,x,u),lerp(hy,y+60,u),8+i*5,0,7);g.fill();g.stroke()}
 g.translate(x,y);g.scale(k,k);g.font=`800 ${sz}px TJ`;g.textAlign='center';const w=g.measureText(txt).width+80;g.shadowColor=CYAN;g.shadowBlur=18;g.fillStyle='rgba(14,30,48,.95)';g.strokeStyle=CYAN;g.lineWidth=4;rr(g,-w/2,-sz*.9,w,sz*1.8,sz*.9);g.fill();g.stroke();g.shadowColor='transparent';g.fillStyle=col;g.fillText(txt,0,sz*.33);g.restore()}

/* ---- fx ---- */
function ripple(x,y,t0,t,col='255,255,255'){const k=(t-t0)/.55;if(k<0||k>1)return;g.save();g.strokeStyle=`rgba(${col},${.9*(1-k)})`;g.lineWidth=7;g.beginPath();g.arc(x,y,12+eo(k)*60,0,7);g.stroke();g.restore()}
function burst(x,y,t0,t,col=GOLD,n=14,r=170){const k=t-t0;if(k<0||k>.8)return;for(let i=0;i<n;i++){const a=i/n*6.283+.3,d=eo(k/.8)*r*(.6+.4*((i*7)%5)/4);sparkle(g,x+Math.cos(a)*d,y+Math.sin(a)*d,16*(1-k/.8)+4,col,1-k/.8)}}
function confetti(t0,t,dur=2.2,n=60){const k=t-t0;if(k<0||k>dur)return;g.save();for(let i=0;i<n;i++){const x=rnd(i)*1080,v=300+rnd(i+9)*500,y=-40+k*v+Math.sin(k*3+i)*20;g.globalAlpha=1-k/dur;g.fillStyle=[GOLD,CYAN,PINK,MINT][i%4];g.save();g.translate(x,y);g.rotate(k*4+i);g.fillRect(-7,-4,14,8);g.restore()}g.restore()}
function floatText(t,t0,txt,x,y,col=GOLD,sz=52,dur=1.2){const u=(t-t0)/dur;if(u<0||u>=1)return;g.save();g.globalAlpha=1-u;g.fillStyle=col;g.shadowColor=col;g.shadowBlur=14;g.font=`800 ${sz}px TJ`;g.textAlign='center';g.fillText(txt,x,y-u*90);g.restore()}
function heartPath(cx,cy,s){g.beginPath();g.moveTo(cx,cy+s);g.bezierCurveTo(cx-s*1.5,cy-s*.1,cx-s*.8,cy-s*1.1,cx,cy-s*.45);g.bezierCurveTo(cx+s*.8,cy-s*1.1,cx+s*1.5,cy-s*.1,cx,cy+s);g.closePath()}
function hoopoe(img,x,y,s,rot,sq=1){if(!img)return;g.save();g.translate(x,y);g.rotate(rot);g.scale(s*(2-sq),s*sq);g.shadowColor='rgba(242,193,74,.6)';g.shadowBlur=34;g.drawImage(img,-190,-190,380,380);g.restore()}
function hoopoeSide(t,a,b,x,y,mood=['hhappy']){if(t<a||t>=b)return;const k=eb(cl((t-a)/.5));hoopoe(IM[mood[Math.min(mood.length-1,Math.floor((t-a)/((b-a)/mood.length)))]],x,y+Math.sin(t*2.4)*10,.26*Math.min(1,k),Math.sin(t*3)*.08,1)}

/* ---- CTA cards (standing rules): mid like/follow card + end card ---- */
function midcta(t,cx=CFG.midXY[0],cy=CFG.midXY[1],a=CFG.mid[0],b=CFG.mid[1]){if(t<a||t>=b)return;const k=eb(cl((t-a)/.45)),al=Math.min(1,k)*(1-cl((t-(b-.35))/.35)),sc=.85+.15*Math.min(1,k);
 g.save();g.globalAlpha=al;g.translate(cx,cy);g.scale(sc,sc);g.textAlign='center';
 const W=600,H=220,gr=g.createLinearGradient(-W/2,0,W/2,0);gr.addColorStop(0,'#f2c14a');gr.addColorStop(1,'#ff8fa3');
 g.strokeStyle=gr;g.lineWidth=2.5;g.shadowColor='#ff8fa3';g.shadowBlur=16;g.fillStyle='rgba(30,14,22,.84)';rr(g,-W/2,-100,W,H,36);g.fill();g.stroke();g.shadowColor='transparent';
 g.font='700 30px TJ';g.fillStyle='#ffe9ee';g.fillText('إذا أعجبك الفيديو إلى الآن',0,-58);g.fillStyle='#f2c14a';g.fillText('اضغط لايك وتابع الصفحة',0,-20);
 const p1=cl((t-(a+1.0))/.5),p2=cl((t-(a+1.8))/.5),s1=1+.25*Math.sin(p1*Math.PI),s2=1+.18*Math.sin(p2*Math.PI);
 g.save();g.translate(-115,40);g.scale(s1,s1);const hg=g.createLinearGradient(0,-30,0,30);hg.addColorStop(0,'#ff8fa3');hg.addColorStop(1,'#ff3d6a');g.fillStyle=hg;g.shadowColor='#ff3d6a';g.shadowBlur=16;g.beginPath();g.arc(0,0,32,0,7);g.fill();g.shadowColor='transparent';g.fillStyle='#fff';g.font='800 32px TJ';g.fillText('❤',0,11);g.restore();
 g.save();g.translate(70,40);g.scale(s2,s2);const fg=g.createLinearGradient(-95,0,95,0);fg.addColorStop(0,'#f2c14a');fg.addColorStop(1,'#ffd98a');g.fillStyle=fg;g.shadowColor='#f2c14a';g.shadowBlur=14;rr(g,-95,-30,190,60,30);g.fill();g.shadowColor='transparent';g.fillStyle='#3a2208';g.font='800 30px TJ';g.fillText(p2>.5?'✓ تتابع':'➕ تابع',0,11);g.restore();
 g.font='600 24px TJ';g.fillStyle='rgba(255,233,238,.85)';g.fillText('للمزيد من هذه الفيديوهات ✨',0,100);
 if(p1>0&&p1<1){for(let i=0;i<5;i++){const u=p1,x=-115+Math.sin(i*2.1)*34,y=40-u*70-i*6;g.globalAlpha=al*(1-u);g.fillStyle='#ff6b8e';g.font='800 22px TJ';g.fillText('❤',x,y)}}
 g.restore()}
function endc(t){const T0=CFG.end.t0;if(t<T0)return;const a=cl((t-T0)/.35);g.save();g.globalAlpha=a;g.fillStyle='#07101a';g.fillRect(0,0,1080,1920);g.textAlign='center';
 const z=Math.max(.8,spring(t-T0-.2,.55,2.2));g.save();g.translate(540,360);g.scale(z,z);g.font='800 104px TJ';g.shadowColor=GOLD;g.shadowBlur=30;g.fillStyle=GOLD;g.fillText('نور الفرقان',0,0);g.restore();
 {const k=eb(cl((t-T0-.4)/.5));if(k>0){g.save();g.translate(540,665);g.scale(Math.min(1,k),Math.min(1,k));g.rotate(-.03);const pw=230,ph=460;g.shadowColor='rgba(242,193,74,.55)';g.shadowBlur=40;g.fillStyle='#111';rr(g,-pw/2-10,-ph/2-10,pw+20,ph+20,34);g.fill();g.shadowColor='transparent';g.save();rr(g,-pw/2,-ph/2,pw,ph,26);g.clip();if(IM[CFG.end.phone])g.drawImage(IM[CFG.end.phone],-pw/2,-ph/2,pw,ph);g.restore();g.restore();
  hoopoe(IM.hhappy,870,720,.3*Math.min(1,k),Math.sin(t*3)*.06,1)}}
 if(CFG.end.bio){const k=eb(cl((t-T0-1.1)/.5));if(k>0){const pu=1+.03*Math.sin(t*6);g.save();g.translate(540,1015);g.scale(Math.min(1,k)*pu,Math.min(1,k)*pu);const W=900,H=130;const gr=g.createLinearGradient(-W/2,0,W/2,0);gr.addColorStop(0,'#f2c14a');gr.addColorStop(1,'#ffe08a');g.shadowColor=GOLD;g.shadowBlur=28;g.fillStyle=gr;rr(g,-W/2,-H/2,W,H,65);g.fill();g.shadowColor='transparent';g.fillStyle='#2a1a05';g.font='800 50px TJ';g.fillText('جرّب الموقع الآن 🔗',0,-4);g.font='700 32px TJ';g.fillText('الرابط في البايو ☝️',0,40);g.restore()}}
 const z2=Math.max(.8,spring(t-T0-1.6,.6,2.2));g.save();g.translate(540,1160);g.scale(z2,z2);g.strokeStyle=GOLD;g.lineWidth=3;g.shadowColor=GOLD;g.shadowBlur=12;g.fillStyle='rgba(30,20,10,.7)';rr(g,-400,-62,800,130,34);g.fill();g.stroke();g.shadowColor='transparent';g.fillStyle='#fff3d0';g.font='800 36px TJ';g.fillText('التطبيق لم يكتمل بعد 🛠️',0,-8);g.fillStyle=GOLD;g.font='800 32px TJ';g.fillText('عندك فكرة؟ اكتب في التعليقات 💡',0,40);g.restore();
 const pl=(txt,y,ts)=>{const k=eb(cl((t-ts)/.4));if(k<=0)return;g.save();g.globalAlpha=Math.min(1,k);g.font='800 36px TJ';const w=g.measureText(txt).width+80;g.strokeStyle=GOLD;g.lineWidth=3;g.fillStyle='rgba(30,20,10,.7)';rr(g,540-w/2,y-40,w,80,40);g.fill();g.stroke();g.fillStyle='#fff3d0';g.fillText(txt,540,y+13);g.restore()};
 pl(CFG.end.pills[0],1285,T0+2.2);pl(CFG.end.pills[1],1370,T0+2.7);
 {const k=eb(cl((t-T0-3.3)/.5));if(k>0){g.save();g.globalAlpha=Math.min(1,k);g.translate(540,1450);const sc=.9+.1*Math.min(1,k);g.scale(sc,sc);g.font='700 30px TJ';const tx='تابع الصفحة ➕  واضغط ❤️ إن أعجبك';const w=g.measureText(tx).width+60;const gr=g.createLinearGradient(-w/2,0,w/2,0);gr.addColorStop(0,'#f2c14a');gr.addColorStop(1,'#ff8fa3');g.strokeStyle=gr;g.lineWidth=2.5;g.shadowColor='#ff8fa3';g.shadowBlur=14;g.fillStyle='rgba(30,14,22,.75)';rr(g,-w/2,-30,w,60,30);g.fill();g.stroke();g.shadowColor='transparent';g.fillStyle='#ffe9ee';g.fillText(tx,0,11);g.restore()}}
 g.restore()}
