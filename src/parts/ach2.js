/* ===== صفحة الإنجازات: ملخص حيّ وتبويبات ===== */
(function(){
  const _pa=pageAch;let ATAB='ov';
  const GROUPS={ov:['حسناتي','إنجازاتي'],ch:['تحدي الأسبوع','تحديات اليوم','تحديات طويلة'],bd:['الأوسمة','نقاط الضعف'],ac:['حسابي']};
  const TABS=[['ov','نظرة عامة'],['ch','التحديات'],['bd','الأوسمة'],['ac','حسابي']];
  function apply(pg){
    pg.querySelectorAll(':scope > section.sec').forEach(function(s){
      const h=s.querySelector('h2'),t=h?h.textContent.trim():'';
      let g='ov';for(const k in GROUPS)if(GROUPS[k].indexOf(t)>=0)g=k;
      s.setAttribute('data-ag',g);s.hidden=g!==ATAB;
    });
    pg.querySelectorAll('.ac-tabs button').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-atab')===ATAB?'true':'false')});
  }
  pageAch=function(){
    _pa();
    const pg=document.getElementById('page');if(!pg||pg.querySelector('.ac-hero')||!pg.querySelector('section.sec'))return;
    try{
      const AR=['ح','ن','ث','ر','خ','ج','س'];let wk='';
      for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);wk+='<span class="'+(S.days[ymd(d)]?'on':'')+(i===0?' now':'')+'"><i aria-hidden="true"></i><b>'+AR[d.getDay()]+'</b></span>'}
      const st=streak(),dn=doneN(),tot=ALL.length||1,pc=Math.round(dn*100/tot),acc=S.q?Math.round(S.qc/S.q*100):0;
      const hero=document.createElement('div');hero.className='ac-hero';
      hero.innerHTML='<div class="ac-fl" aria-hidden="true"><svg viewBox="0 0 24 24" width="54" height="54"><path d="M12 2c1 4 5 6 5 11a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z" fill="#ff9a3c" stroke="#ffd37a" stroke-width="1"/></svg></div>'+
        '<div class="ac-st"><b>'+N(st)+'</b><span>'+(st===1?'يوم متتالٍ':'أيام متتالية')+'</span></div>'+
        '<div class="ac-wk" role="img" aria-label="نشاط آخر سبعة أيام">'+wk+'</div>'+
        '<div class="ac-row"><div><b>'+N(S.xp)+'</b><span>نقطة</span></div><div class="ac-ring" style="--p:'+pc+'"><em>'+N(pc)+'%</em></div><div><b>'+N(acc)+'%</b><span>دقة الإجابات</span></div></div>'+
        '<small class="ac-sub">أتممتَ '+N(dn)+' من '+N(tot)+' درسًا</small>';
      const tabs=document.createElement('div');tabs.className='ac-tabs';tabs.setAttribute('role','group');tabs.setAttribute('aria-label','أقسام الإنجازات');
      tabs.innerHTML=TABS.map(function(t){return '<button data-atab="'+t[0]+'" aria-pressed="false">'+t[1]+'</button>'}).join('');
      pg.insertBefore(tabs,pg.firstChild);pg.insertBefore(hero,pg.firstChild);
      apply(pg);
    }catch(e){try{console.warn('ach2',e)}catch(x){}}
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-atab]');if(!b)return;
    ATAB=b.getAttribute('data-atab');apply(document.getElementById('page'));window.scrollTo({top:0});
  });
})();
