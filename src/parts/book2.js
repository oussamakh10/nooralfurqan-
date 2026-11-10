(function(){
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-bk=pick],[data-bk=resume]');if(!b)return;
    if(b.dataset.bk==='pick'){const p=document.getElementById('bkpick');if(p){p.hidden=!p.hidden;b.setAttribute('aria-expanded',String(!p.hidden))}}
    else if(window.bkShow)window.bkShow(S.bkp||0);
  });
  document.addEventListener('input',function(e){
    if(e.target.id==='bksl'){const j=document.getElementById('bkj');if(j)j.value=e.target.value}
  });
  document.addEventListener('change',function(e){
    const t=e.target,P=window.bkPG&&window.bkPG();if(!P||!window.bkShow)return;
    if(t.id==='bksl')window.bkShow(+t.value-1);
    else if(t.id==='bksur'){const s=+t.value;for(let i=0;i<P.length;i++){if(P[i].some(function(x){return x[0]===s&&x[1]===1})){window.bkShow(i);break}}}
    else if(t.id==='bkjz')window.bkShow(Math.round((+t.value-1)*P.length/30));
  });
})();
