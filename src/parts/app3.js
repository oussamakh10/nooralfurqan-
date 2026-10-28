/* ================= القراءة ================= */
let Q=null,TF={},RV={s:0,q:''};
function loadQ(){
  if(Q)return Promise.resolve(Q);
  return fetch('quran.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){Q=j;return j});
}
function loadTF(k){
  if(TF[k])return Promise.resolve(TF[k]);
  return fetch(k+'.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){TF[k]=j;return j});
}
function normAr(s){return String(s).replace(/[ً-ٰٟ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي')}
function fillList(){
  const q=normAr(RV.q.trim());let h='';
  SN.forEach(function(n,i){
    if(q&&!(normAr(n).includes(q)||String(i+1)===q))return;
    h+='<button class="srow" data-surah="'+(i+1)+'"><span class="num">'+N(i+1)+'</span><span><b>'+n+'</b><small>'+N(AYC[i])+' آية</small></span></button>';
  });
  $('#rlist').innerHTML=h||emptyBox('sad','لا توجد سورة بهذا الاسم','جرّب رقم السورة مثل 2، أو جزءًا من اسمها.');
}
let EN=null;
function loadEN(){
  if(EN)return Promise.resolve(EN);
  return fetch('en.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){EN=j;return j});
}
/* ترجمة الآيات: الإنجليزية (Pickthall) مضمّنة، والفرنسية تُجلب وقت الحاجة من خدمة خارجية وتُخزَّن في المتصفح */
let FRC={};
function trLang(){return LANG==='fr'?'fr':'en'}
function loadFR(n){
  if(FRC[n])return Promise.resolve(FRC[n]);
  try{const c=localStorage.getItem('nf-fr-'+n);if(c){FRC[n]=JSON.parse(c);return Promise.resolve(FRC[n])}}catch(e){}
  return fetch('https://api.alquran.cloud/v1/surah/'+n+'/fr.hamidullah').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){
    const arr=j.data.ayahs.map(function(x){return x.text});if(!arr.length)throw 0;FRC[n]=arr;try{localStorage.setItem('nf-fr-'+n,JSON.stringify(arr))}catch(e){}return arr});
}
function loadTR(n){return trLang()==='fr'?loadFR(n):loadEN()}
function trAyah(i,k){if(trLang()==='fr')return FRC[i]&&FRC[i][k];return EN&&EN[i-1]&&EN[i-1][k]}
/* ---------- الحسنات والورد ---------- */
function rdKey(s,a){return s+':'+a}
function readToday(){const t=today();let n=0;for(const k in S.ayd)if(S.ayd[k]===t)n++;return n}
function wirdTarget(){return Math.ceil(6236/Math.max(1,S.khat.days))}
function markRead(s,a,quiet){
  const k=rdKey(s,a),t=today();
  if(S.ayd[k]===t)return 0;
  S.ayd[k]=t;
  const h=addHasanat(countLetters(Q.v[s-1][a-1]),quiet);
  S.khat.read++;act('ayah');
  if(S.khat.read>=6236){S.khat.read=0;S.khat.n++;save();SND.surah();celebrate('ما شاء الله، ختمة كاملة!','أتممت قراءة المصحف كاملًا. تقبّل الله منك.','cheer')}
  if(!quiet)SND.ayah();
  const tgt=wirdTarget(),r=readToday();
  if(!quiet&&r===tgt){setTimeout(function(){toast('أتممت وردك اليوم! بارك الله فيك')},900)}
  return h;
}
function surahDoneToday(s){const t=today();for(let a=1;a<=AYC[s-1];a++)if(S.ayd[rdKey(s,a)]!==t)return false;return true}
function wirdCard(){
  const tgt=wirdTarget(),r=Math.min(readToday(),tgt);
  return '<div class="card wird"><div class="wrow"><b>وردك اليوم</b><small class="muted">'+N(r)+' من '+N(tgt)+' آية</small></div>'+
   '<div class="pbar gold"><i style="width:'+(r/tgt*100)+'%"></i></div>'+
   '<div class="wfoot"><small class="muted">ختمة في '+N(S.khat.days)+' يومًا · أتممت '+N(S.khat.n)+' ختمة · تقدّم الختمة '+N(Math.round(S.khat.read/6236*100))+'%</small><button class="btn sm ghost" data-act="khat-set">تغيير المدة</button></div></div>';
}
function pageRead(){
  if(RV.s){openSurah(RV.s);return}
  let h='<section class="sec" style="margin-top:16px"><h2>القراءة</h2>'+wirdCard();
  if(S.last)h+='<button class="card feat" style="text-align:start" data-surah="'+S.last.s+'" data-jump="'+S.last.a+'"><b>تابع من حيث توقفت</b><span>سورة '+SN[S.last.s-1]+'، آية '+N(S.last.a)+'</span></button>';
  h+='<input type="search" id="rsearch" placeholder="ابحث عن سورة بالاسم أو الرقم" aria-label="بحث عن سورة" value="'+esc(RV.q)+'"><div id="rlist" class="slist"></div></section>';
  $('#page').innerHTML=h;fillList();
}
function openSurah(i,jump){
  RV.s=i;const el=$('#page');
  el.innerHTML='<p class="muted" style="margin-top:30px;text-align:center">جارٍ تحميل السورة…</p>';
  Promise.all([loadQ(),S.tr==='en'?loadTR(i).catch(function(){toast('تعذّر تحميل الترجمة.');if(trLang()==='fr'){S.tr=''}return null}):Promise.resolve(null)]).then(function(){
    const c=Q.ch[i-1],vs=Q.v[i-1],t=today();
    if(!S.opened[i]){S.opened[i]=1}
    act('read');
    let h='<div class="rhead"><button class="iconbtn" data-act="rback" aria-label="رجوع إلى قائمة السور">'+IC.back+'</button><h2>سورة '+c[0]+'</h2>'+
      '<button class="iconbtn" data-listen="'+i+'" aria-label="استمع إلى السورة"><svg viewBox="0 0 24 24" aria-hidden="true">'+NAVI.listen+'</svg></button></div>'+
      '<p class="muted" style="text-align:center;margin-bottom:6px">'+(c[1]==='م'?'مكية':'مدنية')+' · '+N(c[2])+' آية</p>'+
      '<div class="opts2" style="justify-content:center;margin-bottom:8px"><button class="tag" data-act="trtoggle" aria-pressed="'+(S.tr==='en')+'">'+(trLang()==='fr'?'ترجمة فرنسية':'ترجمة إنجليزية')+'</button></div>'+wirdCard();
    if(i!==1&&i!==9)h+='<p class="bsm">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>';
    vs.forEach(function(tx,k){
      const a=k+1,got=S.ayd[rdKey(i,a)]===t,hs=countLetters(tx)*10;
      h+='<article class="ay" id="ay'+a+'" data-a="'+a+'"><p class="ayt">'+tx+'<button class="no" data-mark="'+a+'" title="علّم هذه الآية كآخر موضع قراءة" aria-label="الآية '+a+'">'+N(a)+'</button></p>'+
        (S.tr==='en'&&trAyah(i,k)?'<p class="trn" lang="'+trLang()+'" dir="ltr">'+esc(trAyah(i,k))+'</p>':'')+
        '<div class="acts"><button class="rd'+(got?' done':'')+'" data-rd="'+a+'" '+(got?'disabled':'')+'>'+(got?'قرأتها ✓':'قرأتها +'+N(hs))+'</button><button data-tf="muy" aria-pressed="false">التفسير الميسر</button><button data-tf="jal" aria-pressed="false">تفسير الجلالين</button><button data-pa="'+a+'">استماع</button></div>'+
        '<div class="tf" hidden></div></article>';
    });
    h+='<button class="btn gold" style="margin-top:8px" data-fin="'+i+'" '+(surahDoneToday(i)?'disabled':'')+'>'+(surahDoneToday(i)?'أتممت هذه السورة اليوم ✓':'أتممت قراءة السورة')+'</button>';
    if(i<114)h+='<button class="btn ghost" style="margin-top:8px" data-surah="'+(i+1)+'">السورة التالية: '+SN[i]+'</button>';
    h+='<p class="fine" style="margin-top:12px">الحسنات تقدير تحفيزي: عشر حسنات لكل حرف، تقبّل الله منك. تُحتسب كل آية مرة واحدة في اليوم.</p>';
    el.innerHTML=h;
    if(jump){const tg=document.getElementById('ay'+jump);if(tg){tg.classList.add('on');tg.scrollIntoView({block:'center'})}}
    else window.scrollTo(0,0);
  }).catch(function(){
    el.innerHTML='<div class="card" style="margin-top:20px"><p>تعذّر تحميل نص المصحف. تأكد من اتصالك ثم أعد المحاولة.</p><button class="btn" style="margin-top:10px" data-act="rback">رجوع</button></div>';
  });
}
function doRead(btn){
  const a=+btn.dataset.rd,h=markRead(RV.s,a);
  if(!h)return;
  btn.textContent='قرأتها ✓';btn.classList.add('done');btn.disabled=true;
  document.querySelectorAll('.card .pbar.gold i').forEach(function(x){});
  if(surahDoneToday(RV.s)){SND.surah();celebrate('أتممت سورة '+SN[RV.s-1],'جزاك الله خيرًا. استمر على وردك.','cheer');const f=document.querySelector('[data-fin]');if(f){f.disabled=true;f.textContent='أتممت هذه السورة اليوم ✓'}}
}
function finishSurahRead(s){
  let sum=0,n=0;
  for(let a=1;a<=AYC[s-1];a++){const h=markRead(s,a,true);if(h){sum+=h;n++}}
  document.querySelectorAll('.rd').forEach(function(b){b.textContent='قرأتها ✓';b.classList.add('done');b.disabled=true});
  const f=document.querySelector('[data-fin]');if(f){f.disabled=true;f.textContent='أتممت هذه السورة اليوم ✓'}
  SND.surah();
  celebrate('أتممت سورة '+SN[s-1],n?('أضفت '+N(sum)+' حسنة إلى رصيدك.'):'كنت قد قرأت آياتها اليوم.','cheer');
}
function toggleTafsir(btn){
  const art=btn.closest('.ay'),a=+art.dataset.a,k=btn.dataset.tf,box=art.querySelector('.tf');
  const same=box.dataset.k===k&&!box.hidden;
  art.querySelectorAll('[data-tf]').forEach(function(b){b.setAttribute('aria-pressed','false')});
  if(same){box.hidden=true;box.dataset.k='';return}
  btn.setAttribute('aria-pressed','true');box.hidden=false;box.dataset.k=k;box.innerHTML='<p class="muted">جارٍ التحميل…</p>';
  loadTF(k).then(function(T){
    if(box.dataset.k!==k)return;
    const t=(T[RV.s-1]||[])[a-1];
    box.innerHTML='<h4>'+(k==='muy'?'التفسير الميسر':'تفسير الجلالين')+'</h4><p>'+(t?esc(t):'لا يوجد شرح مستقل لهذه الآية في هذا التفسير، وغالبًا جاء مع الآية التي قبلها.')+'</p>';
    act('tafsir');
  }).catch(function(){box.innerHTML='<p>تعذّر تحميل التفسير.</p>'});
}

/* ================= الاستماع ================= */
const AU=new Audio();AU.preload='none';
let AP=null,LS={mode:'surah',s:1,a:1},SP=-1;
function recById(id){return REC.find(function(r){return r.id===id})||REC[0]}
function surahUrl(r,s){return r.s+pad(s,3)+'.mp3'}
function ayahUrl(r,s,a){if(!r.e)r=REC[0];return 'https://everyayah.com/data/'+r.e+'/'+pad(s,3)+pad(a,3)+'.mp3'}
function startAudio(url){
  AU.src=url;
  const p=AU.play();if(p&&p.catch)p.catch(function(){audioErr()});
}
function playSurah(s){
  const r=recById(S.rec);AP={mode:'surah',r:r,s:s,a:0,err:false,url:surahUrl(r,s)};
  S.listen++;act('listen');startAudio(AP.url);renderMini();
}
function playAyah(s,a){
  const r=recById(S.rec);
  if(!AP||AP.mode!=='ayah'||AP.s!==s){S.listen++;act('listen')}
  AP={mode:'ayah',r:r,s:s,a:a,err:false,url:ayahUrl(r,s,a)};
  startAudio(AP.url);renderMini();markAyah();
}
function audioErr(){
  if(!AP||AP.err)return;AP.err=true;renderMini();
  toast('تعذّر تشغيل الصوت داخل الصفحة. استخدم رابط فتح الملف.');
}
function stopAudio(){AU.pause();AU.removeAttribute('src');AU.load();AP=null;renderMini();markAyah()}
function renderMini(){
  const m=$('#mini');
  if(!AP){m.hidden=true;m.innerHTML='';return}
  m.hidden=false;
  const title='سورة '+SN[AP.s-1]+(AP.mode==='ayah'?' · آية '+N(AP.a):'');
  m.innerHTML='<div class="mini"><div class="r1"><div class="tt"><b>'+title+'</b><small>'+AP.r.n+'</small></div>'+
   (AP.mode==='ayah'?'<button data-act="pa-prev" aria-label="الآية السابقة">'+IC.next+'</button>':'')+
   '<button class="pp" data-act="toggle" aria-label="تشغيل أو إيقاف مؤقت" id="ppbtn">'+(AU.paused?IC.play:IC.pause)+'</button>'+
   (AP.mode==='ayah'?'<button data-act="pa-next" aria-label="الآية التالية">'+IC.prev+'</button>':'')+
   '<button data-act="mclose" aria-label="إغلاق المشغّل">'+IC.x+'</button></div>'+
   (AP.err?'<div class="err">لم يعمل التشغيل داخل الصفحة. <a href="'+esc(AP.url)+'" target="_blank" rel="noopener">افتح الملف في تبويب جديد</a></div>':
   '<input type="range" id="prog" min="0" max="1000" value="0" aria-label="موضع التشغيل">')+'</div>';
}
AU.addEventListener('timeupdate',function(){const p=$('#prog');if(p&&AU.duration&&!p.matches(':active'))p.value=Math.round(AU.currentTime/AU.duration*1000)});
AU.addEventListener('play',function(){const b=$('#ppbtn');if(b)b.innerHTML=IC.pause});
AU.addEventListener('pause',function(){const b=$('#ppbtn');if(b)b.innerHTML=IC.play});
AU.addEventListener('error',function(){if(AU.getAttribute('src'))audioErr()});
AU.addEventListener('ended',function(){
  if(!AP)return;
  if(AP.mode==='ayah'){
    if(AP.a<AYC[AP.s-1]){SND.ayah();playAyah(AP.s,AP.a+1)}
    else{SND.surah()}
  }else{SND.surah();toast('انتهت السورة. تقبّل الله منك')}
});
document.addEventListener('input',function(e){
  if(e.target.id==='prog'&&AU.duration)AU.currentTime=e.target.value/1000*AU.duration;
  if(e.target.id==='rsearch'){RV.q=e.target.value;fillList()}
});
function markAyah(){
  document.querySelectorAll('.lv button.on').forEach(function(b){b.classList.remove('on')});
  if(AP&&AP.mode==='ayah'){
    const b=document.querySelector('.lv button[data-pa2="'+AP.a+'"]');
    if(b){b.classList.add('on');b.scrollIntoView({block:'nearest'})}
  }
}
function pageListen(){
  const r=recById(S.rec);
  let h='<section class="sec" style="margin-top:16px"><h2>الاستماع</h2>'+
   '<div class="seg" role="group" aria-label="نوع الاستماع">'+
   [['surah','سورة كاملة'],['ayah','آية بآية'],['hadith','الأحاديث']].map(function(m){return '<button data-lmode="'+m[0]+'" aria-pressed="'+(LS.mode===m[0])+'">'+m[1]+'</button>'}).join('')+'</div>';
  if(LS.mode!=='hadith'){
    h+='<div class="field"><span class="lbl">القارئ</span><div class="rgrid">'+REC.map(function(x){
      return '<button class="rc" data-rec="'+x.id+'" aria-pressed="'+(x.id===S.rec)+'"><i>'+x.n.trim().split(' ')[0].charAt(0)+'</i><span>'+x.n+'</span></button>'}).join('')+'</div></div>'+
     '<div class="field"><label for="lsurah">السورة</label><select id="lsurah">'+SN.map(function(n,i){return '<option value="'+(i+1)+'"'+((i+1)===LS.s?' selected':'')+'>'+N(i+1)+'. '+n+'</option>'}).join('')+'</select></div>';
    if(LS.mode==='surah'){
      h+='<button class="btn" data-act="play-surah">استمع إلى سورة '+SN[LS.s-1]+' بصوت '+r.n+'</button>'+
         '<p class="muted" style="font-size:.88rem">يُشغَّل الملف من موقع MP3Quran. إن لم يعمل داخل الصفحة فسيظهر رابط لفتحه في تبويب جديد.</p>';
    }else{
      h+='<p class="muted" style="font-size:.9rem">اضغط على أي آية لتبدأ منها، وتنتقل التلاوة تلقائيًا إلى الآية التالية.</p><div class="lv" id="lv"><p class="muted">جارٍ تحميل النص…</p></div>';
    }
  }else{
    h+='<div class="card"><p class="muted" style="font-size:.92rem">هذه قراءة آلية بصوت جهازك، وليست بصوت شيخ. تحتاج صوتًا عربيًا مثبّتًا على الجهاز. لا توجد هنا تسجيلات للأحاديث بأصوات المشايخ.</p></div><div class="had">'+
     HAD.map(function(x,i){
      return '<div class="card"><p class="t">'+x.t+'</p><small>'+x.r+'</small><div style="margin-top:6px"><button class="btn sm" data-had="'+i+'" id="had'+i+'">'+(SP===i?'إيقاف':'استمع')+'</button></div></div>'}).join('')+'</div>';
  }
  h+='</section>';
  $('#page').innerHTML=h;
  if(LS.mode==='ayah'){
    loadQ().then(function(){
      const vs=Q.v[LS.s-1];
      $('#lv').innerHTML=vs.map(function(t,k){return '<button data-pa2="'+(k+1)+'">'+t+' <span class="no">'+N(k+1)+'</span></button>'}).join('');
      markAyah();
    }).catch(function(){$('#lv').innerHTML='<p>تعذّر تحميل النص.</p>'});
  }
}
function hadBtns(){document.querySelectorAll('[data-had]').forEach(function(b){b.textContent=(SP===+b.dataset.had)?'إيقاف':'استمع'})}
function speak(i){
  if(!('speechSynthesis' in window)){toast('جهازك لا يدعم القراءة الآلية.');return}
  const was=SP;speechSynthesis.cancel();SP=-1;
  if(was===i){hadBtns();return}
  if(AP)stopAudio();
  const u=new SpeechSynthesisUtterance(HAD[i].t);u.lang='ar-SA';
  const v=(speechSynthesis.getVoices()||[]).find(function(x){return /^ar/i.test(x.lang)});
  if(v)u.voice=v;else toast('لم أجد صوتًا عربيًا على جهازك، قد تُقرأ الجملة بلكنة غير سليمة.');
  u.onend=function(){SP=-1;hadBtns()};
  SP=i;speechSynthesis.speak(u);S.listen++;act('listen');hadBtns();
}
