/* ===== الشهادات: رسم موحّد + معاينة قبل الحفظ ===== */
function certArt(o){
  const W=1400,H=990,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  const G='#c9a24a',GL='#e8cf8a',GR='#0e6b47',GD='#0a3d2b',INK='#2b2414',F='"Tajawal","Amiri",Tahoma,serif';
  x.textAlign='center';x.direction=(typeof LANG!=='undefined'&&LANG!=='ar')?'ltr':'rtl';x.textBaseline='alphabetic';
  /* الورق */
  const bg=x.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#fbf3dc');bg.addColorStop(1,'#f3e4b8');x.fillStyle=bg;x.fillRect(0,0,W,H);
  /* نجوم ثمانية خافتة */
  x.save();x.globalAlpha=.07;x.strokeStyle=GR;x.lineWidth=2;
  for(let i=0;i<W;i+=140)for(let j=0;j<H;j+=140){x.save();x.translate(i+70,j+70);for(let k=0;k<2;k++){x.rotate(Math.PI/4);x.strokeRect(-30,-30,60,60)}x.restore()}
  x.restore();
  /* الإطارات */
  x.strokeStyle=GR;x.lineWidth=16;x.strokeRect(30,30,W-60,H-60);
  x.strokeStyle=G;x.lineWidth=4;x.strokeRect(58,58,W-116,H-116);
  x.strokeStyle=GL;x.lineWidth=2;x.strokeRect(70,70,W-140,H-140);
  /* زوايا */
  [[58,58,1,1],[W-58,58,-1,1],[58,H-58,1,-1],[W-58,H-58,-1,-1]].forEach(function(p){
    x.save();x.translate(p[0],p[1]);x.scale(p[2],p[3]);x.strokeStyle=G;x.lineWidth=4;
    x.beginPath();x.arc(0,0,64,0,Math.PI/2);x.stroke();x.beginPath();x.arc(0,0,44,0,Math.PI/2);x.stroke();
    x.fillStyle=G;x.beginPath();x.arc(26,26,7,0,7);x.fill();x.restore()});
  /* قوس المحراب أعلى الشهادة */
  x.save();x.translate(W/2,150);x.strokeStyle=G;x.lineWidth=4;
  x.beginPath();x.moveTo(-230,60);x.lineTo(-230,0);x.quadraticCurveTo(-230,-60,0,-85);x.quadraticCurveTo(230,-60,230,0);x.lineTo(230,60);x.stroke();
  x.restore();
  x.fillStyle=GR;{let bf=34,bt=T('بسم الله الرحمن الرحيم');x.font='700 '+bf+'px '+F;while(x.measureText(bt).width>440&&bf>18){bf-=2;x.font='700 '+bf+'px '+F}x.fillText(bt,W/2,160)}
  /* العنوان */
  x.fillStyle=GD;x.font='900 92px '+F;x.fillText(T(o.title),W/2,290);
  /* فاصل */
  x.strokeStyle=G;x.lineWidth=3;x.beginPath();x.moveTo(W/2-260,322);x.lineTo(W/2-30,322);x.moveTo(W/2+30,322);x.lineTo(W/2+260,322);x.stroke();
  x.fillStyle=G;x.font='700 34px '+F;x.fillText('✦',W/2,334);
  /* النص */
  x.fillStyle='#5a4a1c';x.font='500 38px '+F;x.fillText(T(o.pre),W/2,410);
  x.fillStyle=GD;x.font='900 96px '+F;
  let nm=o.name,fs=96;while(x.measureText(nm).width>1000&&fs>48){fs-=4;x.font='900 '+fs+'px '+F}
  x.fillText(nm,W/2,520);
  x.strokeStyle=GL;x.lineWidth=3;x.beginPath();x.moveTo(W/2-330,548);x.lineTo(W/2+330,548);x.stroke();
  x.fillStyle='#5a4a1c';x.font='500 38px '+F;x.fillText(T(o.mid),W/2,616);
  x.fillStyle=GR;x.font='800 60px '+F;
  let mn=T(o.main).replace(/^«\s*|\s*»$/g,function(m){return m.indexOf('«')>=0?'« ':' »'});fs=60;while(x.measureText(mn).width>1050&&fs>36){fs-=3;x.font='800 '+fs+'px '+F}
  x.fillText(mn,W/2,700);
  if(o.sub){x.fillStyle=INK;x.font='600 40px '+F;x.fillText(T(o.sub),W/2,765)}
  /* الختم */
  const sx=W/2,sy=850;
  x.save();x.translate(sx,sy);
  x.fillStyle=G;x.beginPath();for(let i=0;i<32;i++){const a=i*Math.PI/16,r=i%2?58:68;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.closePath();x.fill();
  x.fillStyle=GR;x.beginPath();x.arc(0,0,48,0,7);x.fill();x.strokeStyle=GL;x.lineWidth=3;x.beginPath();x.arc(0,0,40,0,7);x.stroke();
  x.fillStyle=GL;x.beginPath();for(let i=0;i<16;i++){const a=i*Math.PI/8-Math.PI/2,r=i%2?12:30;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.closePath();x.fill();
  x.restore();
  /* التوقيعات */
  x.fillStyle='#5a4a1c';x.font='500 30px '+F;
  x.fillText(o.date,300,885);x.strokeStyle=G;x.lineWidth=2;x.beginPath();x.moveTo(170,850);x.lineTo(430,850);x.stroke();
  {let cf=30,ct=T('خلوفي أسامة · نور الفرقان');x.font='500 '+cf+'px '+F;while(x.measureText(ct).width>230&&cf>16){cf-=2;x.font='500 '+cf+'px '+F}x.fillText(ct,1100,885)}x.beginPath();x.moveTo(970,850);x.lineTo(1230,850);x.stroke();
  x.font='400 24px '+F;x.fillStyle='#8a7a4c';x.fillText(T('التاريخ'),300,914);x.fillText(T('المنشئ'),1100,914);
  return c;
}
function certDate(){try{return new Date().toLocaleDateString('ar-DZ-u-nu-latn',{year:'numeric',month:'long',day:'numeric'})}catch(e){return new Date().toLocaleDateString('en-GB')}}
function certShow(c,file){
  const old=document.getElementById('certov');if(old)old.remove();
  const d=document.createElement('div');d.id='certov';d.className='cv-ov';d.setAttribute('role','dialog');d.setAttribute('aria-label','الشهادة');
  d.innerHTML='<div class="cv-box"><img alt="الشهادة" src="'+c.toDataURL('image/png')+'"><div class="cv-act"><button class="btn" data-cvs="1">حفظ الشهادة</button><button class="btn ghost" data-cvx="1">إغلاق</button></div></div>';
  document.body.appendChild(d);
  d.addEventListener('click',function(e){
    if(e.target===d||e.target.closest('[data-cvx]'))return d.remove();
    if(e.target.closest('[data-cvs]'))c.toBlob(function(b){if(b)dlSave(file,b,'image/png')},'image/png');
  });
}
function certName(){return (S.prof&&S.prof.name)||'الطالب المجتهد'}
/* شهادة الوحدة */
certCard=function(ui){
  const u=DATA[ui];if(!u)return;
  const c=certArt({title:'شهادة إتمام الوحدة',pre:'تشهد منصة «نور الفرقان» بأن',name:certName(),mid:'قد أتمّ بنجاح جميع دروس الوحدة',main:'« '+u.title+' »',sub:u.lessons.length+' دروس · '+(u.sub||''),date:certDate()});
  certShow(c,'certificate-unit-'+(ui+1)+'.png');
};
/* شهادة الدرس */
function lessonCert(id){
  const l=ALL.find(function(z){return z.id===id});if(!l)return;
  const u=DATA[l.unit]||{title:''},acc=(window.__lacc||{})[id];
  const c=certArt({title:'شهادة إتمام الدرس',pre:'تشهد منصة «نور الفرقان» بأن',name:certName(),mid:'قد أتمّ بنجاح درس',main:'« '+T(l.title)+' »',sub:T('من وحدة')+' «'+T(u.title)+'»'+(acc!=null?' · '+T('الدقة')+' '+acc+'%':''),date:certDate()});
  certShow(c,'certificate-lesson-'+id+'.png');
}
document.addEventListener('click',function(e){const b=e.target.closest('[data-lcert]');if(b)lessonCert(b.dataset.lcert)});
