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
      if(a===1&&s!==last){h+='<div class="bk-sur"><i aria-hidden="true">✦</i>'+g3(['سورة ','Surah ','Sourate '])+T(Q.ch[s-1][0])+'<i aria-hidden="true">✦</i></div>';if(s!==1&&s!==9)h+='<div class="bk-bsm">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>'}
      last=s;
      h+='<span class="bk-a">'+Q.v[s-1][a-1]+' <span class="bk-n">'+N(a)+'</span></span> ';
    });
    const first=arr[0],lastv=arr[arr.length-1],juz=Math.min(30,Math.floor(p/PG.length*30)+1);
    const lbl=function(a){return g3(a)};
    let opts='';for(let i=1;i<=114;i++)opts+='<option value="'+i+'"'+(i===first[0]?' selected':'')+'>'+N(i)+' · '+esc(T(Q.ch[i-1][0]))+'</option>';
    let jo='';for(let j=1;j<=30;j++)jo+='<option value="'+j+'"'+(j===juz?' selected':'')+'>'+lbl(['الجزء ','Juz ','Juz '])+N(j)+'</option>';
    $('#page').innerHTML='<section class="sec bk bk2">'+
      '<div class="bk-top"><button class="bk-ib" data-bk="back" aria-label="'+lbl(['رجوع','Back','Retour'])+'"><svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>'+
      '<button class="bk-title" data-bk="pick" aria-expanded="false"><b>'+esc(T(Q.ch[first[0]-1][0]))+'</b><small>'+lbl(['الجزء ','Juz ','Juz '])+N(juz)+' · '+lbl(['صفحة ','Page ','Page '])+N(p+1)+' / '+N(PG.length)+' ▾</small></button>'+
      '<span class="bk-fz"><button class="bk-ib" data-bk="fm" aria-label="'+lbl(['تصغير الخط','Smaller text','Réduire'])+'">أ−</button><button class="bk-ib" data-bk="fp" aria-label="'+lbl(['تكبير الخط','Larger text','Agrandir'])+'">أ+</button></span></div>'+
      '<div id="bkpick" class="bk-pick" hidden><b>'+lbl(['ابدأ القراءة من…','Start reading from…','Commencer la lecture à…'])+'</b>'+
        '<label>'+lbl(['السورة','Surah','Sourate'])+'<select id="bksur">'+opts+'</select></label>'+
        '<label>'+lbl(['الجزء','Juz','Juz'])+'<select id="bkjz">'+jo+'</select></label>'+
        '<label>'+lbl(['رقم الصفحة','Page number','Numéro de page'])+'<span class="bk-gorow"><input id="bkj" type="number" min="1" max="'+PG.length+'" inputmode="numeric" value="'+(p+1)+'"><button class="btn sm gold" data-bk="go">'+lbl(['ابدأ','Start','Aller'])+'</button></span></label>'+
        '<button class="btn sm ghost" data-bk="resume">'+lbl(['العودة إلى آخر صفحة وصلت لها','Back to my last page','Retour à ma dernière page'])+'</button></div>'+
      '<div class="bk-sheet"><div class="bk-pg" style="font-size:'+fs()+'rem"><div class="bk-hd"><span>'+esc(T(Q.ch[first[0]-1][0]))+'</span><span>'+lbl(['الجزء ','Juz ','Juz '])+N(juz)+'</span></div>'+h+'<div class="bk-ft"><span>'+N(p+1)+'</span></div></div></div>'+
      '<div class="bk-bar"><button class="bk-nx" data-bk="prev" '+(p===0?'disabled':'')+' aria-label="'+lbl(['الصفحة السابقة','Previous page','Page précédente'])+'">›</button>'+
      '<input id="bksl" class="bk-sl" type="range" min="1" max="'+PG.length+'" value="'+(p+1)+'" aria-label="'+lbl(['اختر الصفحة','Choose page','Choisir la page'])+'" style="direction:rtl">'+
      '<button class="bk-nx" data-bk="next" '+(p>=PG.length-1?'disabled':'')+' aria-label="'+lbl(['الصفحة التالية','Next page','Page suivante'])+'">‹</button></div>'+
      '<p class="fine">'+lbl(['قراءة هادئة: تُضاف حسنات الصفحة تلقائيًا عند الانتقال إلى التالية بعد قراءتها، دون أي تنبيه. تقسيم الصفحات تقريبي وليس كمصحف المدينة.','Calm reading: the page’s hasanat are added automatically when you move on after reading it, with no alert. Page division is approximate, not the Madinah mushaf.','Lecture calme : les hasanat de la page sont ajoutées automatiquement quand vous passez à la suivante après l’avoir lue, sans alerte. Découpage approximatif, pas celui du mushaf de Médine.'])+'</p></section>';
    window.scrollTo(0,0);
  }
  window.bkShow=function(p){count(CUR);show(p)};window.bkPG=function(){return build()};window.bkCur=function(){return CUR};
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
