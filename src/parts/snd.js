/* ================= الأصوات (مولَّدة بالمتصفح، بلا ملفات) ================= */
let AC=null;
function ac(){try{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C()}if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}}
function tone(f,t0,d,type,vol,f2){
  if(S.mute)return;const c=ac();if(!c)return;
  try{
    const t=c.currentTime+t0,o=c.createOscillator(),g=c.createGain();
    o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||.2,t+.012);g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.03);
  }catch(e){}
}
const SND={
  tap(){tone(520,0,.05,'square',.05)},
  nav(){tone(620,0,.07,'sine',.12);tone(930,.05,.09,'sine',.1)},
  correct(){tone(523.25,0,.14,'triangle',.22);tone(659.25,.09,.14,'triangle',.22);tone(783.99,.18,.34,'triangle',.24);tone(1567.98,.2,.2,'sine',.05)},
  wrong(){tone(233,0,.16,'sawtooth',.14,160);tone(155,.15,.36,'sawtooth',.14,110)},
  combo(n){const b=523.25*Math.pow(1.122,Math.min(n,6));tone(b,0,.1,'triangle',.2);tone(b*1.5,.08,.1,'triangle',.2);tone(b*2,.16,.26,'triangle',.22)},
  ayah(){tone(880,0,.55,'sine',.18);tone(1320,0,.5,'sine',.07);tone(1760,.04,.4,'sine',.04)},
  surah(){[523.25,659.25,783.99,1046.5].forEach(function(f,i){tone(f,i*.12,.4,'triangle',.2)});tone(2093,.5,.7,'sine',.06);tone(1568,.55,.7,'sine',.06)},
  win(){[523.25,659.25,783.99,659.25,783.99,1046.5].forEach(function(f,i){tone(f,i*.11,i>4?.6:.16,'triangle',.22)})},
  lose(){[392,349.23,311.13,261.63].forEach(function(f,i){tone(f,i*.16,.3,'sine',.18)})},
  coin(){tone(988,0,.07,'square',.07);tone(1319,.07,.2,'square',.07)},
  hoop(){[0,.16,.32].forEach(function(t){tone(430,t,.13,'sine',.22,360)})},
  bell(){tone(1046.5,0,.9,'sine',.16);tone(2093,0,.7,'sine',.06);tone(1568,.02,.8,'sine',.05)},
  tick(){tone(900,0,.03,'square',.04)}
};
['pointerdown','keydown'].forEach(function(ev){document.addEventListener(ev,function(){ac()},{once:true,passive:true})});
