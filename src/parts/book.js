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
    PG=build();p=Math.max(0,Math.min(PG.length-1,p));const dir=p<CUR?'back':'fwd';CUR=p;S.bkp=p;save();T0=Date.now();
    const arr=PG[p];let h='',last=0;
    arr.forEach(function(x){
      const s=x[0],a=x[1];
      if(a===1&&s!==last){const c=Q.ch[s-1];h+='<div class="bk3-sur"><i aria-hidden="true">✦</i><b>'+g3(['سورة ','Surah ','Sourate '])+esc(T(c[0]))+'</b><small>'+esc(c[1]==='م'?g3(['مكية','Meccan','Mecquoise']):g3(['مدنية','Medinan','Médinoise']))+' · '+N(c[2])+' '+g3(['آية','verses','versets'])+'</small></div>';if(s!==1&&s!==9)h+='<div class="bk3-bsm">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>'}
      last=s;
      h+='<span class="bk3-a">'+Q.v[s-1][a-1]+' <span class="bk3-n">'+N(a)+'</span></span> ';
    });
    const first=arr[0],juz=Math.min(30,Math.floor(p/PG.length*30)+1),L=function(a){return g3(a)};
    const th=S.bkth||'paper';
    const tb=function(k,l){return '<button class="bk3-th" data-th="'+k+'" aria-pressed="'+(th===k)+'">'+esc(l)+'</button>'};
    const chip=function(t,ic,l){return '<button class="bk3-chip" data-bk="pickto" data-to="'+t+'"><i aria-hidden="true">'+ic+'</i>'+esc(l)+'</button>'};
    $('#page').innerHTML='<section class="sec bk bk3 th-'+th+'">'+
      '<div class="bk3-head"><div class="bk3-ctl"><button class="bk3-ib" data-bk="back" aria-label="'+L(['رجوع','Back','Retour'])+'">›</button>'+
      '<button class="bk3-title" data-bk="pickto" data-to="sur"><b>'+esc(T(Q.ch[first[0]-1][0]))+'</b><small>'+L(['اضغط لتغيير السورة','Tap to change surah','Touchez pour changer'])+' ▾</small></button>'+
      '<button class="bk3-ib" data-bk="set" aria-label="'+L(['المظهر والخط','Appearance','Apparence'])+'">Aa</button></div>'+
      '<div class="bk3-chips">'+chip('sur','☰',L(['السور','Surahs','Sourates']))+chip('juz','◐',L(['الأجزاء','Juz','Juz']))+chip('pg','#',L(['رقم الصفحة','Page no.','N° de page']))+'</div>'+
      '<div id="bkset" class="bk3-set" hidden><div class="bk3-row"><span>'+L(['حجم الخط','Text size','Taille'])+'</span><span><button class="bk3-ib" data-bk="fm" aria-label="'+L(['تصغير','Smaller','Réduire'])+'">أ−</button><button class="bk3-ib" data-bk="fp" aria-label="'+L(['تكبير','Larger','Agrandir'])+'">أ+</button></span></div>'+
      '<div class="bk3-row"><span>'+L(['الخلفية','Background','Fond'])+'</span><span>'+tb('paper',L(['ورقي','Paper','Papier']))+tb('sepia',L(['سيبيا','Sepia','Sépia']))+tb('night',L(['ليلي','Night','Nuit']))+'</span></div>'+
      '<div class="bk3-row"><span>'+L(['وضع التركيز (إخفاء الأدوات)','Focus mode (hide tools)','Mode concentration'])+'</span><button class="bk3-th" data-bk="focus">'+L(['تفعيل','On','Activer'])+'</button></div>'+
      '<p>'+L(['اضغط على آية لتظليلها. تُضاف حسنات الصفحة تلقائيًا عند الانتقال إلى التالية بعد قراءتها، دون أي تنبيه. تقسيم الصفحات تقريبي وليس كمصحف المدينة.','Tap a verse to highlight it. Hasanat for a page are added automatically when you move on after reading it, with no alert. Page division is approximate, not the Madinah mushaf.','Touchez un verset pour le surligner. Les hasanat d’une page sont ajoutées automatiquement quand vous passez à la suivante, sans alerte. Découpage approximatif, pas celui du mushaf de Médine.'])+'</p></div></div>'+
      '<div id="bkpick" class="bk-pick" hidden></div>'+
      '<div class="bk3-scroll"><div class="bk3-rh"><span>'+esc(T(Q.ch[first[0]-1][0]))+'</span><span>'+L(['الجزء ','Juz ','Juz '])+N(juz)+'</span></div>'+
      '<div class="bk-pg bk3-txt bk3-'+dir+'" style="font-size:'+fs()+'rem">'+h+'</div><div class="bk3-pn"><span>'+N(p+1)+'</span></div></div>'+
      '<div class="bk3-dock"><button class="bk-nx" data-bk="prev" '+(p===0?'disabled':'')+' aria-label="'+L(['الصفحة السابقة','Previous page','Page précédente'])+'">›</button>'+
      '<div class="bk3-mid"><small>'+L(['صفحة ','Page ','Page '])+N(p+1)+' / '+N(PG.length)+' · '+L(['الجزء ','Juz ','Juz '])+N(juz)+'</small>'+
      '<input id="bksl" class="bk-sl" type="range" min="1" max="'+PG.length+'" value="'+(p+1)+'" aria-label="'+L(['اختر الصفحة','Choose page','Choisir la page'])+'" style="direction:rtl"></div>'+
      '<button class="bk-nx" data-bk="next" '+(p>=PG.length-1?'disabled':'')+' aria-label="'+L(['الصفحة التالية','Next page','Page suivante'])+'">‹</button></div>'+
      '<div class="bk3-prog" aria-hidden="true"><i style="width:'+((p+1)/PG.length*100).toFixed(1)+'%"></i></div></section>';
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
