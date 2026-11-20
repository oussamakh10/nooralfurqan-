/* ===== CHARACTERS: neon stick figures — same body, different accessories/colors/scales =====
   const omar=char('omar',{x:200,y:CFG.GY,face:1,
      keys:[[0,'idle'],[2,'point',.5],[5,'cheer']],      // pose timeline (name | pose object | fn(t,c))
      path:[[0,-100],[2,200,'eo']],                        // x over time (auto walk cycle while moving)
      expr:[[0,'smile'],[3,'open']],                       // face: smile|open|sad|wow|flat|think
      talk:[[1,2.4]],                                       // mouth moves in these windows
      prop:[[0,null],[2,'phone']]})                        // prop in front hand: phone|book|tasbih|cup
   Draw all with drawChars(t). Speech/thought bubbles: say(omar,a,b,'نص'), think(omar,a,b,'نص'). */
const CAST=[],SAYS=[];
const STYLES={
 omar:{col:'#43e0ff',shirt:'#1d6f8a',acc:['cap']},
 sara:{col:'#ff8fe0',shirt:'#8a2d6e',acc:['hijab']},
 kid:{col:'#ffd23f',shirt:'#8a6a10',acc:['spiky'],sc:.68},
 dad:{col:'#7dffb0',shirt:'#1d7a52',acc:['kufi','beard']},
 teacher:{col:'#c9a2ff',shirt:'#5a3a8a',acc:['glasses','beard']},
 granny:{col:'#ffb07a',shirt:'#8a4a22',acc:['hijab','glasses'],sc:.9},
 student:{col:'#8fd8ff',shirt:'#2a4a7a',acc:['headphones']},
 friend:{col:'#ff7a8a',shirt:'#8a2a3a',acc:['glasses']}};
// joint offsets (x forward, y up negative). H head,N neck,P pelvis,E elbow,W wrist,K knee,F foot. 1=back limb 2=front limb
const J=(H,N,P,E1,W1,E2,W2,K1,F1,K2,F2)=>({H,N,P,E1,W1,E2,W2,K1,F1,K2,F2});
const LEG=[[8,-118],[10,0],[-8,-118],[-10,0]];
const mk=(H,N,P,e1,w1,e2,w2,l=LEG)=>J(H,N,P,e1,w1,e2,w2,l[0],l[1],l[2],l[3]);
const POSE={
 idle:mk([0,-404],[0,-366],[0,-222],[-12,-296],[-16,-232],[10,-296],[14,-232]),
 point:mk([8,-404],[0,-366],[0,-222],[-12,-296],[-16,-232],[56,-318],[112,-336]),
 cheer:mk([0,-410],[0,-366],[0,-222],[-40,-330],[-70,-430],[40,-330],[70,-430]),
 think:mk([6,-400],[0,-366],[0,-222],[-12,-296],[-16,-232],[26,-300],[26,-376]),
 sad:mk([14,-380],[6,-350],[0,-222],[-4,-290],[0,-236],[10,-286],[10,-232]),
 fidget:(t)=>mk([16,-388],[6,-356],[0,-222],[0,-290],[24+Math.sin(t*7)*4,-262],[14,-288],[30+Math.sin(t*7+1)*5,-260]),
 shy:mk([16,-388],[6,-356],[0,-222],[0,-290],[26,-262],[14,-288],[30,-260]),
 talk:mk([4,-404],[0,-366],[0,-222],[-12,-296],[-16,-232],[40,-310],[70,-290]),
 shrug:mk([0,-400],[0,-366],[0,-222],[-30,-320],[-52,-300],[30,-320],[52,-300]),
 hold:mk([4,-404],[0,-366],[0,-222],[-12,-296],[-16,-232],[34,-300],[58,-340]),   // holding something at chest height
 wave:(t)=>mk([0,-404],[0,-366],[0,-222],[-12,-296],[-16,-232],[44,-340],[70+Math.sin(t*9)*22,-420]),
 walk:(t,c)=>{const ph=(c&&c._ph)||0,s=Math.sin(ph),co=Math.cos(ph);return J([0,-404],[0,-366],[0,-222],[-12+s*22,-296],[-16+s*44,-236],[10-s*22,-296],[14-s*44,-236],
    [8+s*26,-118],[10+s*54,-Math.max(0,-co)*26],[-8-s*26,-118],[-10-s*54,-Math.max(0,co)*26])}};
const JK=['H','N','P','E1','W1','E2','W2','K1','F1','K2','F2'];
const mixP=(a,b,k)=>{const o={};for(const j of JK)o[j]=[lerp(a[j][0],b[j][0],k),lerp(a[j][1],b[j][1],k)];return o};
function char(id,o={}){const st=STYLES[id]||{};const c=Object.assign({id,x:540,y:CFG.GY,s:st.sc||1,face:1,col:st.col||CYAN,shirt:st.shirt||'#1d6f8a',acc:st.acc||[],keys:[[0,'idle']],path:null,expr:[[0,'smile']],talk:[],prop:[[0,null]],alpha:null,_ph:0,_x:null},o);if(!o.s&&st.sc)c.s=st.sc;CAST.push(c);return c}
function stepVal(t,K){let v=K[0][1];for(const k of K){if(t>=k[0])v=k[1];else break}return v}
function posX(c,t){return c.path?kf(t,c.path):c.x}
function poseOf(c,t){const K=c.keys;let i=0;for(let j=0;j<K.length;j++)if(t>=K[j][0])i=j;
 const val=(v)=>typeof v==='string'?POSE[v]:v,res=(v)=>{const p=val(v);return typeof p==='function'?p(t,c):p};
 const cur=res(K[i][1]),prev=i>0?res(K[i-1][1]):cur,d=K[i][2]!=null?K[i][2]:.5;let p=mixP(prev,cur,sm(cl((t-K[i][0])/d)));
 if(c.path){const dx=(posX(c,t+.05)-posX(c,t-.05))/.1,mv=cl(Math.abs(dx)/40);if(mv>0){c._ph=(c._ph||0)+0;c._ph=posX(c,t)*.045*Math.sign(1);p=mixP(p,POSE.walk(t,c),sm(mv))}}
 const r={};for(const j of JK)r[j]=[p[j][0],p[j][1]];r.H[1]+=Math.sin(t*2+c.x)*2;r.H[0]+=Math.sin(t*1.3)*1.5;return r}
function drawChar(c,t){const x=posX(c,t),y=c.y,f=c.face,s=c.s;let al=c.alpha?kf(t,c.alpha):1;if(al<=0)return;const p=poseOf(c,t);
 const gx=lx=>lx,L=(a,b,cc)=>{g.beginPath();g.moveTo(p[a][0],p[a][1]);g.lineTo(p[b][0],p[b][1]);if(cc)g.lineTo(p[cc][0],p[cc][1]);g.stroke()};
 g.save();g.globalAlpha=al;g.translate(x,y);
 g.save();g.scale(1,.18);g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.arc(0,0,70*s,0,7);g.fill();g.restore();       // ground shadow
 g.scale(f*s,s);g.lineCap='round';g.lineJoin='round';const lw=1/s;
 const neon=(w,body)=>{g.shadowColor=c.col;g.shadowBlur=12;g.strokeStyle=c.col;g.lineWidth=w;body();g.shadowBlur=0;g.strokeStyle='#effcff';g.lineWidth=Math.max(2,w*.32);body()};
 if(c.acc.includes('backpack')){g.fillStyle=c.shirt;g.strokeStyle=c.col;g.lineWidth=5;rr(g,-62,-362,48,110,14);g.fill();g.stroke()}
 neon(11,()=>{L('N','E1','W1')});
 neon(12,()=>{L('P','K2','F2');L('P','K1','F1')});
 g.save();g.globalAlpha=al*.55;g.strokeStyle=c.shirt;g.lineWidth=34;g.shadowColor=c.shirt;g.shadowBlur=10;g.beginPath();g.moveTo(p.N[0],p.N[1]+6);g.lineTo(p.P[0],p.P[1]-10);g.stroke();g.restore();   // shirt body
 neon(12,()=>{L('N','P')});
 neon(11,()=>{L('N','E2','W2')});
 // hands
 for(const k of['W1','W2']){g.fillStyle='#effcff';g.beginPath();g.arc(p[k][0],p[k][1],7,0,7);g.fill()}
 // prop in front hand
 const pr=stepVal(t,c.prop);if(pr){g.save();g.translate(p.W2[0],p.W2[1]);g.rotate(-.2);if(pr==='phone'){g.fillStyle='#111';g.strokeStyle='#8fd8ff';g.lineWidth=4;rr(g,-14,-34,28,50,6);g.fill();g.stroke();g.fillStyle='rgba(143,216,255,.5)';rr(g,-10,-30,20,38,3);g.fill()}
  else if(pr==='book'){g.fillStyle='#1d5a3a';g.strokeStyle='#7dffb0';g.lineWidth=4;rr(g,-26,-30,52,40,5);g.fill();g.stroke();g.beginPath();g.moveTo(0,-30);g.lineTo(0,10);g.stroke()}
  else if(pr==='tasbih'){g.strokeStyle='#f2c14a';g.fillStyle='#f2c14a';g.lineWidth=3;for(let i=0;i<9;i++){g.beginPath();g.arc(Math.sin(i*.55)*14,6+i*7,4,0,7);g.fill()}}
  else if(pr==='cup'){g.fillStyle='#2a1a05';g.strokeStyle=GOLD;g.lineWidth=4;rr(g,-14,-24,28,32,6);g.fill();g.stroke()}g.restore()}
 // head
 const hx=p.H[0],hy=p.H[1];g.shadowColor=c.col;g.shadowBlur=10;g.fillStyle=c.skin||'#f6dcc2';g.strokeStyle=c.col;g.lineWidth=8;g.beginPath();g.arc(hx,hy,44,0,7);g.fill();g.stroke();g.shadowBlur=0;g.strokeStyle='#effcff';g.lineWidth=3;g.beginPath();g.arc(hx,hy,44,0,7);g.stroke();
 // accessories
 g.lineWidth=7;g.strokeStyle=c.col;g.fillStyle=c.shirt;
 for(const a of c.acc){
  if(a==='cap'){g.shadowColor=c.col;g.shadowBlur=14;g.beginPath();g.arc(hx,hy-6,46,Math.PI*1.02,Math.PI*1.98);g.closePath();g.fillStyle=c.shirt;g.fill();g.stroke();g.beginPath();g.moveTo(hx+20,hy-14);g.lineTo(hx+70,hy-10);g.stroke();g.shadowBlur=0}
  if(a==='hijab'){g.shadowColor=c.col;g.shadowBlur=14;g.fillStyle=c.shirt;g.beginPath();g.ellipse(hx-4,hy+8,56,62,0,Math.PI*.12,Math.PI*1.9);g.lineTo(hx+16,hy+80);g.quadraticCurveTo(hx-30,hy+110,hx-62,hy+70);g.closePath();g.globalAlpha=al*.9;g.fill();g.stroke();g.globalAlpha=al;g.shadowBlur=0;g.fillStyle=c.skin||'#f6dcc2';g.beginPath();g.ellipse(hx+10,hy+8,30,34,0,0,7);g.fill();g.lineWidth=4;g.stroke()}
  if(a==='kufi'){g.shadowColor='#fff';g.shadowBlur=10;g.fillStyle='#e9fff3';g.beginPath();g.ellipse(hx,hy-38,32,14,0,0,7);g.fill();g.strokeStyle=c.col;g.lineWidth=3;g.stroke();g.shadowBlur=0}
  if(a==='beard'){g.strokeStyle=c.col;g.fillStyle=c.shirt;g.lineWidth=5;g.beginPath();g.arc(hx+4,hy+10,40,Math.PI*.15,Math.PI*.85);g.lineTo(hx+4,hy+40);g.closePath();g.fill();g.stroke()}
  if(a==='spiky'){g.strokeStyle=c.col;g.lineWidth=7;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(hx+i*14,hy-40);g.lineTo(hx+i*18+6,hy-70-(i%2?0:10));g.stroke()}}
  if(a==='headphones'){g.strokeStyle=c.col;g.lineWidth=8;g.shadowColor=c.col;g.shadowBlur=12;g.beginPath();g.arc(hx,hy-6,54,Math.PI*1.05,Math.PI*1.95);g.stroke();g.fillStyle=c.shirt;rr(g,hx-62,hy-12,20,38,8);g.fill();g.stroke();rr(g,hx+42,hy-12,20,38,8);g.fill();g.stroke();g.shadowBlur=0}
 }
// face (warm skin, dark eyes with highlight, brows, blush, tears)
 const ex=stepVal(t,c.expr),blink=(Math.floor(t*10)%33===0)?.15:1,tk=c.talk.some(w=>t>=w[0]&&t<w[1]),op=tk?(.5+.5*Math.sin(t*20)):0;
 const e1=[hx+4,hy-6],e2=[hx+27,hy-6],DK='#2b1d1d';g.shadowBlur=0;
 g.fillStyle='rgba(255,120,130,.35)';g.beginPath();g.arc(hx+2,hy+12,8,0,7);g.fill();g.beginPath();g.arc(hx+32,hy+12,8,0,7);g.fill();
 for(const e of[e1,e2]){g.fillStyle=DK;g.beginPath();g.ellipse(e[0],e[1],8,9*blink,0,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(e[0]+3,e[1]-3,3,0,7);g.fill()}
 g.strokeStyle=DK;g.lineWidth=4.5;
 const brow=(a1,a2,y=-17)=>{g.beginPath();g.moveTo(e1[0]-9,e1[1]+y+a1);g.lineTo(e1[0]+9,e1[1]+y+a2);g.stroke();g.beginPath();g.moveTo(e2[0]-9,e2[1]+y+a2);g.lineTo(e2[0]+9,e2[1]+y+a1);g.stroke()};
 if(ex==='sad'||ex==='cry')brow(4,-4);else if(ex==='worry'||ex==='shy')brow(5,-5,-18);else if(ex==='wow')brow(-4,-4,-22);else if(ex==='think')brow(2,-5);else if(ex==='happy')brow(-2,-2,-20);else brow(0,0);
 if(ex==='cry'||ex==='sad'){const u=((t*1.6+c.x*.01)%1);g.fillStyle='rgba(120,200,255,.85)';for(const e of[e1,e2]){g.beginPath();g.ellipse(e[0]+(ex==='cry'?-2:0),e[1]+12+u*30,4,6,0,0,7);g.fill()}}
 const mx=hx+17,my=hy+22;g.strokeStyle='#7a2e2e';g.lineWidth=4.5;g.beginPath();
 if(tk||ex==='open'||ex==='wow'){g.fillStyle='#b5434f';g.ellipse(mx,my,9,5+(ex==='wow'?7:0)+op*8,0,0,7);g.fill()}
 else if(ex==='happy'){g.fillStyle='#b5434f';g.arc(mx,my-4,13,0.05*Math.PI,.95*Math.PI);g.closePath();g.fill()}
 else if(ex==='sad'||ex==='cry'||ex==='worry'){g.arc(mx,my+10,11,Math.PI*1.12,Math.PI*1.88);g.stroke()}
 else if(ex==='flat'||ex==='think'||ex==='shy'){g.moveTo(mx-8,my+2);g.lineTo(mx+8,my+2+(ex==='think'?-3:0));g.stroke()}
 else{g.arc(mx,my-3,12,Math.PI*.12,Math.PI*.88);g.stroke()}
 g.restore()}
function headPos(c,t){const p=poseOf(c,t),x=posX(c,t);return[x+p.H[0]*c.face*c.s,c.y+p.H[1]*c.s]}
function drawChars(t,order){const L=(order||CAST).slice().sort((a,b)=>a.y-b.y);for(const c of L)drawChar(c,t)}
function say(c,a,b,txt,o={}){SAYS.push({c,a,b,txt,o,kind:'say'});c.talk.push([a,Math.min(b,a+Math.max(.8,txt.length*.09))])}
function think(c,a,b,txt,o={}){SAYS.push({c,a,b,txt,o,kind:'think'})}
function drawSays(t){for(const s of SAYS){if(t<s.a||t>s.b)continue;const [hx,hy]=headPos(s.c,t),dx=s.o.dx||0,dy=s.o.dy||-170,sz=s.o.sz||50;
 if(s.kind==='say')bubble(t,s.a,s.b,s.txt,hx+dx,hy+dy,hx,hy-52,sz,s.o.col,s.o.bg);else thought(t,s.a,s.b,s.txt,hx+dx,hy+dy-30,hx,hy-52,sz)}}
