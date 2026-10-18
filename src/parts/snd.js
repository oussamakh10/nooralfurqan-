/* ================= الأصوات (مولَّدة بالمتصفح، بلا ملفات) ================= */
let AC=null,MG=null;
function ac(){try{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C();
  // سلسلة ماستر: ضاغط يمنع التشويه + فلتر ناعم + مستوى صوت قابل للضبط
  const cp=AC.createDynamicsCompressor();cp.threshold.value=-18;cp.ratio.value=6;cp.attack.value=.003;cp.release.value=.2;
  const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=7000;lp.Q.value=.4;
  MG=AC.createGain();MG.connect(lp);lp.connect(cp);cp.connect(AC.destination)}
  MG.gain.value=volLevel();
  if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}}
function volLevel(){const v=(typeof S!=='undefined'&&S.vol!=null)?S.vol:100;return Math.max(0,Math.min(100,+v||0))/100}
function setVol(v){S.vol=v;save();if(MG)MG.gain.value=volLevel()}
function buzz(p){try{if(!S.mute&&S.hap!==0&&navigator.vibrate)navigator.vibrate(p)}catch(e){}}
function tone(f,t0,d,type,vol,f2){
  if(S.mute)return;const c=ac();if(!c)return;
  try{
    const t=c.currentTime+t0,g=c.createGain();
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||.2,t+.012);g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    g.connect(MG||c.destination);
    // مذبذبان بانحراف طفيف لصوت أدفأ وأغنى
    [-4,4].forEach(function(dt){
      const o=c.createOscillator();o.type=type||'sine';o.detune.value=dt;o.frequency.setValueAtTime(f,t);
      if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
      const h=c.createGain();h.gain.value=.5;o.connect(h);h.connect(g);o.start(t);o.stop(t+d+.03);
    });
  }catch(e){}
}
const SND={
  tap(){tone(520,0,.05,'square',.05)},
  nav(){tone(620,0,.07,'sine',.12);tone(930,.05,.09,'sine',.1)},
  correct(){buzz(25);tone(523.25,0,.14,'triangle',.22);tone(659.25,.09,.14,'triangle',.22);tone(783.99,.18,.34,'triangle',.24);tone(1567.98,.2,.2,'sine',.05)},
  wrong(){buzz([40,40,60]);tone(233,0,.16,'sawtooth',.14,160);tone(155,.15,.36,'sawtooth',.14,110)},
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
