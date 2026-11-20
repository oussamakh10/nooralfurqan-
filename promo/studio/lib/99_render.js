/* ===== MASTER RENDER. A story defines (optional): S.world(t) [phones/props, inside camera], S.front(t), S.over(t) [UI above everything],
   arrays TOP (kinetic text) and CAP (sentence captions). ===== */
const S={};window.TOP=window.TOP||[];window.CAP=window.CAP||[];
function render(t){g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,1080,1920);g.textAlign='center';g.textBaseline='alphabetic';
 if(CFG.bgs){let i=0;CFG.bgs.forEach((b,k)=>{if(t>=b[0])i=k});const cur=CFG.bgs[i];if(i>0&&t<cur[0]+.5){BG[CFG.bgs[i-1][1]](t);g.save();g.globalAlpha=P(cur[0],cur[0]+.5,t);BG[cur[1]](t);g.restore()}else BG[cur[1]](t)}else (BG[CFG.bg]||BG.night)(t);camBegin(t);S.world&&S.world(t);drawChars(t);drawSays(t);S.front&&S.front(t);camEnd();
 for(const T of TOP)kt(t,T[0],T[1],T[2],T[3]||360,T[4]||66,T[5]||'TJ');
 S.over&&S.over(t);midcta(t);caps(t);
 g.save();g.globalAlpha=.4;g.fillStyle='#fff';g.font='600 26px TJ';g.textAlign='center';g.fillText(CFG.handle,540,1495);g.restore();endc(t)}
window.render=render;
