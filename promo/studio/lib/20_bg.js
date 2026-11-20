/* ===== BACKGROUNDS: CFG.bg = 'night'|'mosque'|'city'|'desert'|'rain'|'room'|'dawn'|'orbit'|'space'
   All animate (parallax drift, twinkle, rain, flicker) and end with a neon floor line at CFG.GY. ===== */
const GYf=()=>CFG.GY;
function floorLine(col='67,224,255',fill='#030b12'){const y=GYf()+6;g.fillStyle=fill;g.fillRect(0,y,1080,1920-y);g.save();g.strokeStyle=`rgba(${col},.5)`;g.lineWidth=4;g.shadowColor=`rgb(${col})`;g.shadowBlur=14;g.beginPath();g.moveTo(0,y);g.lineTo(1080,y);g.stroke();
 g.shadowBlur=0;g.strokeStyle=`rgba(${col},.08)`;g.lineWidth=2;for(let i=1;i<9;i++){const yy=y+i*i*9;g.beginPath();g.moveTo(0,yy);g.lineTo(1080,yy);g.stroke()}g.restore()}
function starsLayer(t,n=60,ymax=900,tw=1){for(let i=0;i<n;i++){const x=rnd(i)*1080,y=rnd(i+50)*ymax,a=.25+.6*(.5+.5*Math.sin(t*(1+rnd(i+9)*2)*tw+i));g.fillStyle=`rgba(255,244,214,${a})`;g.beginPath();g.arc(x,y,1.2+rnd(i+3)*2,0,7);g.fill()}}
function moon(x,y,r,t){g.save();const gl=g.createRadialGradient(x,y,r*.4,x,y,r*3.2);gl.addColorStop(0,'rgba(255,240,200,.35)');gl.addColorStop(1,'rgba(255,240,200,0)');g.fillStyle=gl;g.fillRect(x-r*3.2,y-r*3.2,r*6.4,r*6.4);
 g.beginPath();g.rect(x-r*2,y-r*2,r*4,r*4);g.arc(x+r*.42,y-r*.1,r*.88,0,7);g.clip('evenodd');g.fillStyle='#f6edc8';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.restore()}
function mosqueShape(cx,base,s,col){g.fillStyle=col;g.beginPath();g.moveTo(cx-120*s,base);g.lineTo(cx-120*s,base-70*s);g.arc(cx,base-70*s,120*s,Math.PI,0);g.lineTo(cx+120*s,base);g.fill();
 g.fillRect(cx-6*s,base-250*s,12*s,40*s);g.beginPath();g.arc(cx,base-258*s,10*s,0,7);g.fill();
 for(const m of[-1,1]){const mx=cx+m*170*s;g.fillRect(mx-16*s,base-260*s,32*s,260*s);g.fillRect(mx-26*s,base-170*s,52*s,12*s);g.beginPath();g.moveTo(mx-20*s,base-260*s);g.lineTo(mx,base-330*s);g.lineTo(mx+20*s,base-260*s);g.fill()}}
function layerWrap(t,speed,sp,fn){const off=(t*speed)%sp;for(let i=-1;i<Math.ceil(1080/sp)+1;i++)fn(i*sp-off,i)}
const BG={
 night(t){g.fillStyle=lgx(0,0,0,1920,['#04121c','#0a1f3a','#120a2e']);g.fillRect(0,0,1080,1920);starsLayer(t,70,1000);moon(880,300,60,t);floorLine()},
 space(t){g.fillStyle=lgx(0,0,0,1920,['#02030c','#0a0828','#1a0a3a']);g.fillRect(0,0,1080,1920);starsLayer(t,140,1700,1.5);
  for(let i=0;i<3;i++){const x=(rnd(i+20)*1400-100+t*(8+i*5))%1300-110,y=300+i*420;const gl=g.createRadialGradient(x,y,10,x,y,200);gl.addColorStop(0,['rgba(120,80,255,.25)','rgba(60,180,255,.2)','rgba(255,120,200,.18)'][i]);gl.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gl;g.fillRect(x-200,y-200,400,400)}floorLine('160,120,255')},
 mosque(t){g.fillStyle=lgx(0,0,0,CFG.GY,['#070b24','#16204a','#3a3a6a']);g.fillRect(0,0,1080,1920);starsLayer(t,60,700);moon(820,330,64,t);
  g.save();layerWrap(t,6,520,(x,i)=>{if(i%2===0)mosqueShape(x+260,GYf()-30,.8,'#18204a');else{g.fillStyle='#18204a';for(let k=0;k<5;k++)g.fillRect(x+k*90,GYf()-120-rnd(i*7+k)*150,70,260)}});
  layerWrap(t,16,620,(x,i)=>{mosqueShape(x+300,GYf()+6,1.05+(i%2)*.15,'#0b1030')});g.restore();
  const gl=g.createLinearGradient(0,GYf()-200,0,GYf());gl.addColorStop(0,'rgba(243,193,74,0)');gl.addColorStop(1,'rgba(243,193,74,.12)');g.fillStyle=gl;g.fillRect(0,GYf()-200,1080,200);floorLine('242,193,74','#04060f')},
 city(t){g.fillStyle=lgx(0,0,0,CFG.GY,['#0a0620','#241044','#5a2a6a']);g.fillRect(0,0,1080,1920);starsLayer(t,40,500);
  const lay=(sp,col,hmin,hmax,wmin,wlit)=>{layerWrap(t,sp,1080/3*3,(x0,i)=>{let x=x0;for(let k=0;k<9;k++){const w=wmin+rnd(i*31+k)*60,h=hmin+rnd(i*17+k+4)*(hmax-hmin);g.fillStyle=col;g.fillRect(x,GYf()+6-h,w,h);if(wlit){for(let yy=GYf()-h+20;yy<GYf()-10;yy+=34)for(let xx=x+8;xx<x+w-14;xx+=24){if(rnd(xx*.13+yy*.07+i)>.55){g.fillStyle=`rgba(255,220,120,${.3+.4*(.5+.5*Math.sin(t*.8+xx+yy))})`;g.fillRect(xx,yy,10,14)}}}x+=w+4}})};
  lay(8,'#150a30',220,520,70,false);lay(22,'#0b0620',140,360,80,true);floorLine('255,143,224','#05030f')},
 desert(t){g.fillStyle=lgx(0,0,0,CFG.GY,['#1a0f3a','#6a3a5a','#e0905a']);g.fillRect(0,0,1080,1920);starsLayer(t,40,500);
  g.fillStyle='#ffe0a0';g.shadowColor='#ffb060';g.shadowBlur=60;g.beginPath();g.arc(760,GYf()-260,70,0,7);g.fill();g.shadowBlur=0;
  [['#6a3a4a',.6,190,.004,5],['#4a2a3a',1.0,120,.006,12],['#2a1a2a',1.5,60,.008,22]].forEach(([col,amp,h,fr,sp],i)=>{g.fillStyle=col;g.beginPath();g.moveTo(0,GYf()+10);for(let x=0;x<=1080;x+=20)g.lineTo(x,GYf()-h-Math.sin((x+t*sp)*fr*6+i*2)*amp*40-Math.sin((x+t*sp)*fr*13)*amp*10);g.lineTo(1080,GYf()+10);g.fill()});
  for(let i=0;i<30;i++){const x=(rnd(i)*1500+t*(60+rnd(i+3)*60))%1200-60,y=GYf()-30-rnd(i+7)*220;g.fillStyle='rgba(255,220,170,.25)';g.fillRect(x,y,14+rnd(i)*20,2)}floorLine('255,176,110','#150a10')},
 rain(t){g.fillStyle=lgx(0,0,0,CFG.GY,['#070d18','#14263a','#1f3a52']);g.fillRect(0,0,1080,1920);
  g.save();g.strokeStyle='rgba(170,210,255,.35)';g.lineWidth=2.5;for(let i=0;i<150;i++){const sp=900+rnd(i)*500,x=(rnd(i+1)*1300-120+t*sp*.25)%1300-100,y=((rnd(i+2)*2000+t*sp)%2000)-60;g.beginPath();g.moveTo(x,y);g.lineTo(x-14,y+46);g.stroke()}g.restore();floorLine('143,200,255','#04080e');
  for(let i=0;i<8;i++){const u=((t*1.5+rnd(i)*3)%1),x=rnd(i+8)*1080,y=GYf()+30+rnd(i+4)*200;g.strokeStyle=`rgba(170,210,255,${.4*(1-u)})`;g.lineWidth=3;g.beginPath();g.ellipse(x,y,10+u*50,3+u*12,0,0,7);g.stroke()}},
 room(t){g.fillStyle=lgx(0,0,0,CFG.GY,['#1a1030','#2a1a44','#3a2450']);g.fillRect(0,0,1080,1920);
  g.fillStyle='#0a1030';g.strokeStyle='#f2c14a';g.lineWidth=8;rr(g,700,420,260,340,14);g.fill();g.stroke();g.save();rr(g,700,420,260,340,14);g.clip();starsLayer(t,14,760,1);for(let i=0;i<14;i++){}g.restore();moon(850,520,34,t);g.strokeStyle='#f2c14a';g.lineWidth=6;g.beginPath();g.moveTo(830,420);g.lineTo(830,760);g.moveTo(700,590);g.lineTo(960,590);g.stroke();
  g.fillStyle='#2a1a3a';g.strokeStyle='rgba(242,193,74,.6)';g.lineWidth=4;rr(g,90,560,420,22,6);g.fill();g.stroke();for(let i=0;i<5;i++){g.fillStyle=['#1d6f8a','#8a2d6e','#1d7a52','#8a6a10','#5a3a8a'][i];g.fillRect(110+i*52,500,40,60-(i%2)*14)}
  const lg=g.createRadialGradient(300,300,10,300,300,420);lg.addColorStop(0,`rgba(255,220,140,${.28+.04*Math.sin(t*2)})`);lg.addColorStop(1,'rgba(255,220,140,0)');g.fillStyle=lg;g.fillRect(0,0,1080,900);
  floorLine('242,193,74','#150a1e')},
 dawn(t){const k=P(0,CFG.dur,t);const top=[Math.round(lerp(8,70,k)),Math.round(lerp(10,120,k)),Math.round(lerp(40,190,k))],bot=[Math.round(lerp(30,255,k)),Math.round(lerp(20,170,k)),Math.round(lerp(60,110,k))];
  g.fillStyle=lgx(0,0,0,CFG.GY,[`rgb(${top})`,`rgb(${bot})`]);g.fillRect(0,0,1080,1920);starsLayer(t,60*(1-k),700);
  const sy=lerp(GYf()+120,GYf()-300,sm(k));g.fillStyle='#fff0c0';g.shadowColor='#ffd070';g.shadowBlur=80;g.beginPath();g.arc(540,sy,90,0,7);g.fill();g.shadowBlur=0;
  g.fillStyle='#0b1030';layerWrap(t,4,700,(x,i)=>mosqueShape(x+350,GYf()+6,1.1,'#0b1030'));floorLine('255,200,120','#0a0a18')},
 orbit(t){g.fillStyle=lgx(0,0,0,1920,['#04121c','#0a1f3a','#120a2e']);g.fillRect(0,0,1080,1920);const [cx,cy]=CFG.orbit||[540,960];
  g.save();g.lineWidth=3;for(let i=0;i<4;i++){const r=330+i*130+Math.sin(t*.8+i)*14;g.strokeStyle=`rgba(67,224,255,${.10-.015*i})`;g.beginPath();g.arc(cx,cy,r,0,7);g.stroke();const a=t*(.25+.1*i)*(i%2?-1:1)+i;g.fillStyle='rgba(143,216,255,.7)';g.shadowColor='#43e0ff';g.shadowBlur=14;g.beginPath();g.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,7,0,7);g.fill();g.shadowBlur=0}
  g.font='800 90px TJ';g.textAlign='center';for(let i=0;i<9;i++){const w=((t*.05+i*.113)%1),x=(i*197+60)%1080,y=1500-w*1250;g.globalAlpha=Math.sin(w*Math.PI)*.22;g.fillStyle=i%2?'#43e0ff':'#f2c14a';g.fillText(CFG.glyph||'؟',x,y)}g.restore();floorLine()}};
