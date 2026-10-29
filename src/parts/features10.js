/* ===== ميزات: مهمة اليوم، بحث شامل، مشاركة الإنجاز، مواسم ===== */
(function(){
  /* ---- المواسم ---- */
  function hijri(d){
    try{
      const p=new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn',{day:'numeric',month:'numeric'}).formatToParts(d||new Date());
      let m=0,dd=0;p.forEach(function(x){if(x.type==='month')m=+x.value;if(x.type==='day')dd=+x.value});
      return {m:m,d:dd};
    }catch(e){return {m:0,d:0}}
  }
  function season(d){
    const dt=d||new Date(),h=hijri(dt);
    if(h.m===9)return 'ramadan';
    if((h.m===10&&h.d<=3)||(h.m===12&&h.d>=10&&h.d<=13))return 'eid';
    if(dt.getDay()===5)return 'jumua';
    return '';
  }
  const SEASON_TXT={ramadan:['رمضان مبارك','تقبّل الله صيامكم وقيامكم'],eid:['عيد مبارك','تقبّل الله منا ومنكم'],jumua:['جمعة مباركة','أكثروا من الصلاة على النبي ﷺ']};
  function applySeason(){
    const s=window.__season!==undefined?window.__season:season();
    if(s)document.documentElement.setAttribute('data-season',s);else document.documentElement.removeAttribute('data-season');
    return s;
  }
  window.nfSeason=applySeason;
  applySeason();

  /* ---- مهمة اليوم ---- */
  const MISSION=[['lesson','أتمم درسًا',1],['q','أجب عن 10 أسئلة',10],['game','العب لعبة واحدة',1]];
  function mProg(){const p=dayState().p;return MISSION.map(function(m){return {t:m[1],n:Math.min(m[2],p[m[0]]||0),max:m[2]}})}
  function mDone(){return mProg().every(function(x){return x.n>=x.max})}
  function checkMission(){
    try{
      if(S.mdone!==today()&&mDone()){S.mdone=today();save();addXP(10);try{SND.win()}catch(e){}toast('أتممت مهمة اليوم: +10 نقاط');}
    }catch(e){}
  }
  const _act=act;
  act=function(k,n){_act(k,n);checkMission()};
  function missionHtml(){
    const pr=mProg(),done=pr.filter(function(x){return x.n>=x.max}).length,all=done===pr.length;
    return '<section class="sec" id="mission"><h2>مهمة اليوم</h2><div class="card mission'+(all?' all':'')+'">'+
      '<ul class="mlist">'+pr.map(function(x){return '<li class="'+(x.n>=x.max?'ok':'')+'"><span class="mck" aria-hidden="true">'+(x.n>=x.max?'✓':'')+'</span><span>'+x.t+'</span><small>'+N(x.n)+'/'+N(x.max)+'</small></li>'}).join('')+'</ul>'+
      '<div class="bar" role="progressbar" aria-valuenow="'+Math.round(done/pr.length*100)+'"><i style="width:'+Math.round(done/pr.length*100)+'%"></i></div>'+
      '<p class="muted" style="margin:6px 0 0;font-size:.85rem">'+(all?'أتممت مهمة اليوم، تقبّل الله منك.':'أتمم الثلاث لتحصل على 10 نقاط إضافية.')+'</p>'+
      '<button class="btn sm ghost" data-f10="share" style="margin-top:8px">شارك إنجازك</button></div></section>';
  }

  /* ---- بحث شامل ---- */
  function norm(s){return typeof normAr==='function'?normAr(String(s||'')).toLowerCase():String(s||'').toLowerCase()}
  function searchRes(q){
    q=norm(q.trim());if(q.length<2)return [];
    const out=[];
    (typeof ALL!=='undefined'?ALL:[]).forEach(function(l){if(out.length<30&&norm(l.title).includes(q))out.push({k:'l',id:l.id,t:l.title,s:'درس'})});
    SN.forEach(function(n,i){if(norm(n).includes(q)||String(i+1)===q)out.push({k:'s',id:i+1,t:'سورة '+n,s:'المصحف'})});
    (typeof HAD!=='undefined'?HAD:[]).forEach(function(h,i){if(h.t&&norm(h.t).includes(q))out.push({k:'h',id:i,t:h.t.slice(0,60),s:'حديث'})});
    return out.slice(0,8);
  }
  function searchHtml(){
    return '<section class="sec" id="gsearch"><h2>بحث</h2><div class="card field"><input type="search" id="gsq" placeholder="ابحث عن درس أو سورة أو حديث" aria-label="بحث شامل" autocomplete="off"><div id="gsr" class="gsr"></div></div></section>';
  }
  document.addEventListener('input',function(e){
    const t=e.target;if(!t||t.id!=='gsq')return;
    const r=searchRes(t.value),box=document.getElementById('gsr');if(!box)return;
    box.innerHTML=r.length?r.map(function(x){return '<button class="gsrow" data-f10="go:'+x.k+':'+x.id+'"><span>'+esc(x.t)+'</span><small>'+x.s+'</small></button>'}).join(''):(t.value.trim().length>=2?'<p class="muted">لا نتائج</p>':'');
  });

  /* ---- بطاقة المشاركة ---- */
  function shareCard(){
    const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;
    const x=c.getContext('2d'),cs=getComputedStyle(document.documentElement);
    const a=(cs.getPropertyValue('--arch')||'#0F4F43').trim()||'#0F4F43',b=(cs.getPropertyValue('--arch2')||'#082B29').trim()||'#082B29';
    const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,a);g.addColorStop(1,b);x.fillStyle=g;x.fillRect(0,0,W,H);
    x.strokeStyle='rgba(255,215,120,.35)';x.lineWidth=6;x.strokeRect(40,40,W-80,H-80);
    x.textAlign='center';x.direction='rtl';x.fillStyle='#F3D88A';
    const F='Tajawal, Noto Sans Arabic, Arial, sans-serif';
    x.font='700 96px '+F;x.fillText('نور الفرقان',W/2,260);
    x.fillStyle='#fff';x.font='400 44px '+F;x.fillText('رفيقك لتعلّم الدين خطوة خطوة',W/2,340);
    const rows=[[N(streak()),'يوم متتالي'],[N(S.xp||0),'نقطة'],[N(doneN()),'درس مكتمل']];
    rows.forEach(function(r,i){
      const y=560+i*230;x.fillStyle='rgba(255,255,255,.10)';x.beginPath();x.roundRect?x.roundRect(140,y-120,W-280,190,36):x.rect(140,y-120,W-280,190);x.fill();
      x.fillStyle='#F3D88A';x.font='800 110px '+F;x.fillText(r[0],W/2,y+10);
      x.fillStyle='#fff';x.font='400 44px '+F;x.fillText(r[1],W/2,y+60);
    });
    x.fillStyle='rgba(255,255,255,.8)';x.font='400 40px '+F;x.fillText('تعلّم معنا على nur-alfurqan.netlify.app',W/2,H-110);
    return new Promise(function(res){c.toBlob(res,'image/png')});
  }
  function doShare(){
    shareCard().then(function(blob){
      if(!blob){toast('تعذّر إنشاء الصورة');return}
      const f=new File([blob],'nur-alfurqan.png',{type:'image/png'});
      if(navigator.canShare&&navigator.canShare({files:[f]})){
        navigator.share({files:[f],text:'نور الفرقان'}).catch(function(){});
      }else{
        const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='nur-alfurqan.png';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000);toast('تم تنزيل الصورة');
      }
    });
  }

  /* ---- ربط الصفحة الرئيسية ---- */
  const _ph=pageHome;
  pageHome=function(){
    _ph();
    const pg=$('#page'),hero=pg&&pg.querySelector('.hero');if(!pg)return;
    const s=applySeason();
    const frag=document.createElement('div');
    frag.innerHTML=(s?'<div class="seasonbar" role="status"><b>'+SEASON_TXT[s][0]+'</b><span>'+SEASON_TXT[s][1]+'</span></div>':'')+missionHtml()+searchHtml();
    const nodes=Array.prototype.slice.call(frag.children);
    let ref=hero;nodes.forEach(function(n){if(ref&&ref.after){ref.after(n);ref=n}else pg.insertBefore(n,pg.firstChild)});
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-f10]');if(!b)return;
    e.stopPropagation();
    const p=b.getAttribute('data-f10').split(':');
    if(p[0]==='share')return doShare();
    if(p[0]==='go'){
      if(p[1]==='l')return startLesson(p[2]);
      if(p[1]==='s'){go('read');return openSurah(+p[2])}
      if(p[1]==='h'){toast(HAD[+p[2]].t.slice(0,120));return}
    }
  },true);
})();
