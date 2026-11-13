/* ===== بطاقات الرئيسية: مراجعة اليوم + تابع امتحانك ===== */
(function(){
  const _ph=pageHome;
  pageHome=function(){
    _ph();
    const pg=document.getElementById('page');if(!pg||pg.querySelector('.ux1-c'))return;
    let h='';
    try{
      const r=S.bxr;
      if(r&&r.tasks&&r.id!=='mock'&&!(r.exam&&Date.now()>=r.exam.end))h+='<button class="card" data-bx="resume" style="text-align:start;display:grid;gap:2px"><small class="muted">تابع من حيث توقفت</small><b>'+esc(r.title)+'</b><small class="muted">السؤال '+(r.i+1)+' من '+r.tasks.length+'</small></button>';
      const due=srDue().length;
      if(due)h+='<button class="card" data-act="review-go" style="text-align:start;display:grid;gap:2px"><small class="muted">مراجعة اليوم</small><b>عندك '+due+' من الأسئلة تنتظر مراجعتك</b><small class="muted">دقيقتان تثبّتان ما تعلّمته</small></button>';
    }catch(e){}
    if(!h)return;
    const hero=pg.querySelector('.hm-go'),box='<div class="ux1-c" style="display:grid;gap:10px;margin:12px 0">'+h+'</div>';
    if(hero&&hero.parentElement)hero.parentElement.insertAdjacentHTML('afterend',box);else pg.insertAdjacentHTML('afterbegin',box);
  };
})();
