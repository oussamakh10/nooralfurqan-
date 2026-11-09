/* ===== القراءة بالصفحات (قراءة صامتة): تُحتسب حسنات الصفحة عند إكمالها دون أي إزعاج ===== */
(function(){
  const _pr=pageRead;let PG=null,T0=0,CUR=0;
  const MIN_SEC=15;
  function build(){
    if(PG)return PG;
    let tot=0;Q.v.forEach(function(s){s.forEach(function(t){tot+=countLetters(t)})});
    const per=tot/604;PG=[];let cur=[],n=0;
    Q.v.forEach(function(s,i){s.forEach(function(t,k){
      if(k===0&&cur.length){PG.push(cur);cur=[];n=0}cur.push([i+1,k+1]);n+=countLetters(t);
      if(n>=per){PG.push(cur);cur=[];n=0}
    })});
    if(cur.length)PG.push(cur);
    return PG;
  }
  function fs(){return S.bkfs||1.6}
  function count(p){
    if(Date.now()-T0<MIN_SEC*1000)return 0;
    let sum=0;(PG[p]||[]).forEach(function(x){sum+=markRead(x[0],x[1],true)||0});return sum;
  }
  function show(p){
    PG=build();p=Math.max(0,Math.min(PG.length-1,p));CUR=p;S.bkp=p;save();T0=Date.now();
    const arr=PG[p];let h='',last=0;
    arr.forEach(function(x){
      const s=x[0],a=x[1];
      if(a===1&&s!==last){h+='<div class="bk-sur">'+g3(['سورة ','Surah ','Sourate '])+T(Q.ch[s-1][0])+'</div>';if(s!==1&&s!==9)h+='<div class="bk-bsm">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>'}
      last=s;
      let t=Q.v[s-1][a-1];
      if(a===1&&s===1)t=t;
      h+='<span class="bk-a">'+t+' <span class="bk-n">﴿'+N(a)+'﴾</span></span> ';
    });
    const first=arr[0],lastv=arr[arr.length-1];
    $('#page').innerHTML='<section class="sec bk" style="margin-top:12px">'+
      '<div class="rhead"><button class="iconbtn" data-bk="back" aria-label="رجوع"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>'+
      '<h2>'+g3(['صفحة ','Page ','Page '])+N(p+1)+' <small class="muted">'+g3(['من ','of ','sur '])+N(PG.length)+'</small></h2>'+
      '<span><button class="iconbtn" data-bk="fm" aria-label="تصغير الخط">أ−</button><button class="iconbtn" data-bk="fp" aria-label="تكبير الخط">أ+</button></span></div>'+
      '<p class="muted" style="text-align:center;font-size:.85rem">'+Q.ch[first[0]-1][0]+' '+N(first[1])+' – '+(lastv[0]!==first[0]?Q.ch[lastv[0]-1][0]+' ':'')+N(lastv[1])+'</p>'+
      '<div class="bk-pg" style="font-size:'+fs()+'rem">'+h+'</div>'+
      '<div class="opts2" style="justify-content:space-between;margin-top:12px"><button class="btn ghost" data-bk="prev" '+(p===0?'disabled':'')+'>'+g3(['الصفحة السابقة','Previous page','Page précédente'])+'</button><button class="btn gold" data-bk="next" '+(p>=PG.length-1?'disabled':'')+'>'+g3(['الصفحة التالية','Next page','Page suivante'])+'</button></div>'+
      '<div class="opts2" style="margin-top:10px;justify-content:center"><label class="muted" for="bkj">'+g3(['اذهب إلى صفحة','Go to page','Aller à la page'])+'</label><input id="bkj" type="number" min="1" max="'+PG.length+'" inputmode="numeric" style="width:90px"><button class="btn sm ghost" data-bk="go">'+g3(['اذهب','Go','Aller'])+'</button></div>'+
      '<p class="fine" style="margin-top:10px">'+g3(['قراءة هادئة: تُضاف حسنات الصفحة تلقائيًا عند الانتقال إلى التالية بعد قراءتها، دون أي تنبيه. تقسيم الصفحات تقريبي وليس كمصحف المدينة.','Calm reading: the page’s hasanat are added automatically when you move on after reading it, with no alert. Page division is approximate, not the Madinah mushaf.','Lecture calme : les hasanat de la page sont ajoutées automatiquement quand vous passez à la suivante après l’avoir lue, sans alerte. Découpage approximatif, pas celui du mushaf de Médine.'])+'</p></section>';
    window.scrollTo(0,0);
  }
  function open(p){RV.bk=1;loadQ().then(function(){show(p==null?(S.bkp||0):p)})}
  pageRead=function(){
    if(RV.bk){open(CUR||S.bkp||0);return}
    _pr();
    const sec=document.querySelector('#page section.sec');if(!sec||document.getElementById('bkcard'))return;
    const b=document.createElement('button');b.id='bkcard';b.className='card feat';b.style.textAlign='start';b.dataset.bk='open';
    b.innerHTML='<b>'+esc(g3(['القراءة بالصفحات','Read by pages','Lecture par pages']))+'</b><span>'+esc(g3(['قراءة هادئة بصفحات كالمصحف، وتُحتسب الحسنات تلقائيًا','A calm, mushaf-style page reading; hasanat are counted automatically','Lecture calme par pages ; les hasanat sont comptées automatiquement']))+(S.bkp?' · '+esc(g3(['تابع من صفحة ','Continue from page ','Reprendre à la page ']))+N(S.bkp+1):'')+'</span>';
    sec.insertBefore(b,sec.firstChild);
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-bk]');if(!b)return;
    const a=b.dataset.bk;
    if(a==='open'){open();return}
    if(a==='back'){count(CUR);RV.bk=0;renderPage();window.scrollTo(0,0);return}
    if(a==='next'){count(CUR);show(CUR+1);return}
    if(a==='prev'){show(CUR-1);return}
    if(a==='fp'||a==='fm'){S.bkfs=Math.max(1.2,Math.min(3,fs()+(a==='fp'?.2:-.2)));save();const el=document.querySelector('.bk-pg');if(el)el.style.fontSize=S.bkfs+'rem';return}
    if(a==='go'){const v=+document.getElementById('bkj').value;if(v>=1&&v<=PG.length){count(CUR);show(v-1)}return}
  });
  let sx=null;
  document.addEventListener('touchstart',function(e){if(RV.bk&&e.target.closest('.bk-pg'))sx=e.touches[0].clientX},{passive:true});
  document.addEventListener('touchend',function(e){
    if(sx==null||!RV.bk)return;const dx=e.changedTouches[0].clientX-sx;sx=null;
    if(Math.abs(dx)<70)return;
    if(dx>0){count(CUR);show(CUR+1)}else show(CUR-1);
  },{passive:true});
})();
