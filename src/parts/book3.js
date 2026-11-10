(function(){
  let tab='sur';window.bkTab=function(t){tab=t;render()};
  function info(){
    const P=window.bkPG(),L=P.length,first={};
    P.forEach(function(pg,i){pg.forEach(function(x){if(x[1]===1&&first[x[0]]==null)first[x[0]]=i})});
    return {P:P,L:L,first:first,juz:function(p){return Math.min(30,Math.floor(p/L*30)+1)},jstart:function(j){return Math.ceil((j-1)*L/30)}};
  }
  function render(){
    const el=document.getElementById('bkpick');if(!el||!window.bkPG)return;
    const I=info(),cur=window.bkCur(),g=g3;
    let h='<div class="bkp-tabs" role="tablist">'+
      [['sur',g(['السور','Surahs','Sourates'])],['juz',g(['الأجزاء','Juz','Juz'])],['pg',g(['رقم الصفحة','Page no.','N° de page'])]].map(function(t){return '<button role="tab" data-bt="'+t[0]+'" aria-selected="'+(tab===t[0])+'">'+esc(t[1])+'</button>'}).join('')+'</div>';
    h+='<p class="bkp-hint">'+esc(g(['أنت الآن في الصفحة ','You are on page ','Vous êtes à la page ']))+N(cur+1)+esc(g([' من ',' of ',' sur ']))+N(I.L)+' · '+esc(g(['الجزء ','Juz ','Juz ']))+N(I.juz(cur))+'</p>';
    if(tab==='sur'){
      h+='<div class="bkp-list">';
      for(let s=1;s<=114;s++){const p=I.first[s]||0;
        h+='<button class="bkp-row" data-bkp="'+p+'"><i>'+N(s)+'</i><span><b>'+esc(T(Q.ch[s-1][0]))+'</b><small>'+esc(g(['صفحة ','Page ','Page ']))+N(p+1)+' · '+esc(g(['الجزء ','Juz ','Juz ']))+N(I.juz(p))+' · '+esc(Q.ch[s-1][1]==='م'?g(['مكية','Meccan','Mecquoise']):g(['مدنية','Medinan','Médinoise']))+' · '+N(Q.v[s-1].length)+' '+esc(g(['آية','verses','versets']))+'</small></span><em aria-hidden="true">‹</em></button>'}
      h+='</div>';
    }else if(tab==='juz'){
      h+='<div class="bkp-juz">';
      for(let j=1;j<=30;j++){const p=I.jstart(j),f=I.P[p][0][0];
        h+='<button class="bkp-jt'+(I.juz(cur)===j?' on':'')+'" data-bkp="'+p+'"><b>'+N(j)+'</b><span>'+esc(g(['الجزء','Juz','Juz']))+'</span><small>'+esc(g(['صفحة ','p. ','p. ']))+N(p+1)+'</small><small>'+esc(T(Q.ch[f-1][0]))+'</small></button>'}
      h+='</div>';
    }else{
      h+='<div class="bkp-pgbox"><label for="bkj">'+esc(g(['اكتب رقم الصفحة (من 1 إلى '+620+')','Type a page number (1 to 620)','Saisissez un numéro de page (1 à 620)']))+'</label><div class="bk-gorow"><input id="bkj" type="number" min="1" max="'+I.L+'" inputmode="numeric" value="'+(cur+1)+'"><button class="btn gold" data-bk="go">'+esc(g(['ابدأ من هنا','Start here','Commencer ici']))+'</button></div></div>';
    }
    h+='<button class="btn sm ghost" data-bk="resume">'+esc(g(['العودة إلى آخر صفحة وصلت لها','Back to my last page','Retour à ma dernière page']))+'</button>';
    el.innerHTML=h;
    const on=el.querySelector('.bkp-jt.on');if(on&&on.scrollIntoView)try{on.scrollIntoView({block:'center'})}catch(e){}
  }
  document.addEventListener('click',function(e){
    const t=e.target.closest&&e.target.closest('[data-bk=pick],[data-bt],[data-bkp]');if(!t)return;
    if(t.dataset.bk==='pick'){setTimeout(function(){const p=document.getElementById('bkpick');if(p&&!p.hidden)render()},0)}
    else if(t.dataset.bt){tab=t.dataset.bt;render()}
    else if(t.dataset.bkp!=null&&window.bkShow)window.bkShow(+t.dataset.bkp);
  });
})();
