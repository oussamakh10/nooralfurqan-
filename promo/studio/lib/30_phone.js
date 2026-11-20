/* ===== APP PHONE MOCK with real screenshots (assets/app/*.png). 
   phone(t,{cx,cy,w,h, in:0, vis:[[t,v]...], screens:[[a,b,'home'],...], taps:[[t,x,y]...], hl:[[a,b,x,y,w,h]...]})
   x,y of taps/hl are relative to the phone centre. Aspect of screenshots = 1:2 -> keep h=2w. ===== */
function phone(t,o){const cx=o.cx||610,cy=o.cy||960,PW=o.w||380,PH=o.h||760;let vis=o.vis?kf(t,o.vis):1;if(vis<=.001)return;const dy0=(1-vis)*160;
 let z=1,rot=0,dy=dy0;if(o.in!=null&&t<o.in+1.2){const s=spring(t-o.in+.22,.45,1.6);z=.6+.4*s;rot=(1-s)*-.35;dy+=(1-s)*-180}
 g.save();g.globalAlpha=vis;g.translate(cx,cy+dy);g.rotate(rot+Math.sin(t*1.3)*.008);g.scale(z,z);
 g.shadowColor='rgba(67,224,255,.55)';g.shadowBlur=46;g.fillStyle='#0b0f14';rr(g,-PW/2-14,-PH/2-14,PW+28,PH+28,46);g.fill();g.shadowColor='transparent';
 g.save();rr(g,-PW/2,-PH/2,PW,PH,34);g.clip();g.fillStyle='#e9d8a0';g.fillRect(-PW/2,-PH/2,PW,PH);
 const f=.25;for(const s of o.screens||[]){let a=0;if(t>=s[0]&&t<s[1])a=1;if(t>=s[0]-f&&t<s[0])a=Math.max(a,(t-(s[0]-f))/f);if(t>=s[1]&&t<s[1]+f)a=Math.max(a,1-(t-s[1])/f);if(a>0&&IM[s[2]]){g.globalAlpha=vis*Math.min(1,a);g.drawImage(IM[s[2]],-PW/2,-PH/2,PW,PH)}}
 g.globalAlpha=vis;for(const k of o.taps||[]){const u=(t-k[0])/.55;if(u<0||u>1)continue;g.strokeStyle=`rgba(255,255,255,${.9*(1-u)})`;g.lineWidth=7;g.beginPath();g.arc(k[1],k[2],12+eo(u)*60,0,7);g.stroke();g.fillStyle=`rgba(67,224,255,${.5*(1-u)})`;g.beginPath();g.arc(k[1],k[2],22,0,7);g.fill()}
 for(const h of o.hl||[]){if(t<h[0]||t>=h[1])continue;const k=.5+.5*Math.sin(t*5);g.strokeStyle=`rgba(242,193,74,${.5+.4*k})`;g.lineWidth=6;g.shadowColor=GOLD;g.shadowBlur=18;rr(g,h[2],h[3],h[4],h[5],22);g.stroke()}
 g.restore();g.restore()}
// pointing arrow (bobbing) e.g. «الرابط في البايو»
function arrowUp(t,a,b,x,y,label){if(t<a||t>=b)return;const k=cl((t-a)/.4),al=Math.min(1,k)*(1-cl((t-(b-.3))/.3)),bo=Math.sin(t*6)*14;g.save();g.globalAlpha=al;g.translate(x,y+bo);g.fillStyle=GOLD;g.shadowColor=GOLD;g.shadowBlur=26;g.beginPath();g.moveTo(0,-90);g.lineTo(80,10);g.lineTo(32,10);g.lineTo(32,90);g.lineTo(-32,90);g.lineTo(-32,10);g.lineTo(-80,10);g.closePath();g.fill();g.restore();
 if(label)pill(t,a,b,label,x,y+150+bo*.3,GOLD,46,'rgba(30,22,6,.94)','#fff3d0')}
