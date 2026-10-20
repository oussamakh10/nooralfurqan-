/* ===== المدرسية 2: أسئلة إضافية، مراجعة الأخطاء، بحث، أوسمة، شهادة، ملخصات ===== */
(function(){
  const _qs=schQs;
  function words(t){return t.replace(/[﴿﴾]/g,'').trim().split(/\s+/).filter(Boolean)}
  function fillQ(l,others){
    const vs=(l.ev||[]).filter(function(e){return e[0]==='q'&&words(e[1]).length>=4});
    if(!vs.length)return null;
    const e=vs[Math.floor(Math.random()*vs.length)],w=words(e[1]),k=w.length>=6?2:1;
    const ans=w.slice(-k).join(' '),pre=w.slice(0,-k).join(' ');
    const pool=[];others.forEach(function(o){(o.ev||[]).forEach(function(x){if(x[0]==='q'){const ww=words(x[1]);if(ww.length>=4){const t=ww.slice(-k).join(' ');if(t!==ans&&pool.indexOf(t)<0)pool.push(t)}}})});
    if(pool.length<3)return null;
    return{q:'أكمل الآية ('+e[2]+'): ﴿ '+pre+' … ﴾',c:ans,w:shuffle(pool).slice(0,3),n:'الآية: '+w.join(' '),l:l.id,i:-1};
  }
  function tfQ(base){
    const useC=Math.random()<.5,ans=useC?base.c:base.w[Math.floor(Math.random()*3)];
    return{q:'صح أم خطأ — '+base.q+' «'+ans+'»',c:useC?'صحيح':'خطأ',w:[useC?'خطأ':'صحيح'],o:['صحيح','خطأ'],n:(useC?'':'الصحيح: '+base.c+'. ')+base.n,l:base.l,i:-1};
  }
  schQs=function(l){
    const b=_qs(l),out=b.slice();
    shuffle(b).slice(0,2).forEach(function(x){out.push(tfQ(x))});
    const f=fillQ(l,SCH.filter(function(o){return o.id!==l.id}));if(f)out.push(f);
    return out;
  };
  window.schRec=function(q,ok){
    if(q.i===undefined||q.i<0)return;
    const s=schS(),k='w:'+q.l+':'+q.i;
    if(!ok)s[k]=(s[k]||0)+1;else if(SX&&SX.kind==='rv'&&s[k])s[k]=Math.max(0,s[k]-1);
    save();
  };
  window.schReview=function(){
    const s=schS(),pool=[];
    SCH.forEach(function(l){l.q.forEach(function(x,i){const w=s['w:'+l.id+':'+i];if(w>0)pool.push({q:x[0],c:x[1],w:x.slice(2,5),n:x[5]||'',l:l.id,i:i,k:w})})});
    pool.sort(function(a,b){return b.k-a.k||Math.random()-.5});
    return shuffle(pool.slice(0,10));
  };
  /* أوسمة */
  function anyScore(f){const s=schS();return Object.keys(s).some(function(k){return(k==='bf'||k==='bt1'||k==='bt2'||k==='bt3'||k.slice(0,2)==='b:')&&f(s[k])})}
  BADGES.push(
   {t:'طالب المدرسية',d:'اقرأ 5 دروس في المدرسية',ok:function(){return SCH.filter(function(l){return schS()['r:'+l.id]}).length>=5}},
   {t:'ختم الفصل',d:'اقرأ كل دروس فصل كامل',ok:function(){return[1,2,3].some(function(n){return schReadN(n)===schOf(n).length})}},
   {t:'عشرون على عشرين',d:'احصل على 20/20 في اختبار',ok:function(){return anyScore(function(v){return v>=20})}},
   {t:'ناجح بتفوق',d:'احصل على 16/20 أو أكثر',ok:function(){return anyScore(function(v){return v>=16})}},
   {t:'خريج السنة',d:'انجح في الاختبار الشامل',ok:function(){return schS().bf>=10}}
  );
  /* البحث + الشهادات + المراجعة */
  const _pg=pageSchool;
  function norm(t){return String(t).replace(/[ً-ٰٟۖ-ۭ]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه')}
  pageSchool=function(){
    _pg();
    const root=$('#page');
    if(SCHTAB==='les'){
      const sec=root.querySelector('.seg');
      const box=document.createElement('div');
      box.innerHTML='<input id="schq" type="search" placeholder="'+esc(sg(['ابحث في الدروس: الربا، الإجماع، الميراث…','Search lessons…','Rechercher dans les leçons…']))+'" style="width:100%;margin-top:12px;padding:12px 14px;border-radius:14px;border:2px solid var(--line);background:var(--surface);color:inherit;font:inherit"><div id="schres" style="display:grid;gap:8px;margin-top:8px"></div>';
      sec.insertAdjacentElement('afterend',box);
    }else{
      const s=schS();let h='<section class="sec"><h2>'+esc(sg(['مراجعة الأخطاء','Mistakes review','Révision des erreurs']))+'</h2><div class="card" style="display:grid;gap:8px"><p class="muted" style="margin:0">'+esc(sg(['10 أسئلة من التي أخطأت فيها أكثر.','10 questions you missed the most.','10 questions où vous avez le plus échoué.']))+'</p><button class="btn" data-sc="ex:rv">'+esc(sg(['ابدأ المراجعة السريعة','Start quick review','Commencer']))+'</button></div></section>';
      const cs=[];
      [1,2,3].forEach(function(n){if(s['bt'+n]>=10)cs.push(['t'+n,SCHTRI[n-1].t[0]])});
      if(s.bf>=10)cs.push(['f','السنة الدراسية كاملة']);
      h+='<section class="sec"><h2>'+esc(sg(['الشهادات','Certificates','Certificats']))+'</h2><div class="card" style="display:grid;gap:8px">'+(cs.length?cs.map(function(c){return '<button class="btn ghost" data-sc2="cert:'+c[0]+'">🎓 '+esc(sg(['شهادة','Certificate','Certificat']))+' — '+esc(c[1])+'</button>'}).join(''):'<p class="muted" style="margin:0">'+esc(sg(['انجح (10/20 فأكثر) في اختبار فصل أو في الاختبار الشامل لتحصل على شهادة.','Score 10/20 or more in a term or the final exam to earn a certificate.','Obtenez 10/20 ou plus à un examen de trimestre ou final pour un certificat.']))+'</p>')+'</div></section>';
      if(!onClaude()){h+='<section class="sec"><h2>'+esc(sg(['ملخصات PDF','PDF summaries','Résumés PDF']))+'</h2><div class="card" style="display:grid;gap:8px">'+[1,2,3].map(function(n){return '<a class="btn ghost" style="text-align:center;text-decoration:none" href="pdf/school-t'+n+'.pdf" target="_blank" rel="noopener">'+esc(SCHTRI[n-1].t[0])+' — PDF</a>'}).join('')+'</div></section>'}
      root.insertAdjacentHTML('beforeend',h);
    }
  };
  document.addEventListener('input',function(e){
    if(e.target.id!=='schq')return;
    const q=norm(e.target.value.trim()),r=$('#schres');if(!r)return;
    if(q.length<2){r.innerHTML='';return}
    const hits=[];
    SCH.forEach(function(l){
      let sn=null;
      if(norm(l.t).indexOf(q)>=0)sn=l.t;
      l.sec.forEach(function(x){if(sn)return;if(norm(x[0]).indexOf(q)>=0)sn=x[0];x[1].forEach(function(p){if(!sn&&norm(p).indexOf(q)>=0)sn=p})});
      (l.ev||[]).forEach(function(x){if(!sn&&norm(x[1]).indexOf(q)>=0)sn=x[1]});
      if(sn)hits.push([l,sn]);
    });
    r.innerHTML=hits.length?hits.map(function(h){return '<button class="card sch-it" data-sc="open:'+h[0].id+'"><span class="sch-n">'+h[0].id.slice(1)+'</span><span class="sch-t">'+esc(h[0].t)+'<br><small class="muted" style="font-weight:400">'+esc(h[1].slice(0,90))+'</small></span></button>'}).join(''):'<p class="muted">'+esc(sg(['لا نتائج.','No results.','Aucun résultat.']))+'</p>';
  });
  /* احتفال */
  const _fin=schFinish;
  schFinish=function(){
    const was=SX&&SX.done;_fin();
    if(!was&&SX&&SX.done){const sc=schScore(SX.ok,SX.qs.length);if(sc>=16){try{confetti();SND.win()}catch(e){}}}
  };
  /* شهادة */
  function drawCert(kind){
    const c=document.createElement('canvas');c.width=1400;c.height=990;const x=c.getContext('2d');
    x.fillStyle='#fbf3dc';x.fillRect(0,0,1400,990);
    x.strokeStyle='#0e7a53';x.lineWidth=14;x.strokeRect(30,30,1340,930);x.strokeStyle='#c8a24a';x.lineWidth=4;x.strokeRect(58,58,1284,874);
    x.textAlign='center';x.direction='rtl';
    const s=schS(),nm=(S.prof&&S.prof.name)||'الطالب',n=kind==='f'?null:+kind[1];
    const sc=kind==='f'?s.bf:s['bt'+n],what=kind==='f'?'السنة الدراسية كاملة':SCHTRI[n-1].t[0];
    x.fillStyle='#0e7a53';x.font='700 70px serif';x.fillText('شهادة إتمام',700,190);
    x.fillStyle='#5a4a1c';x.font='36px serif';x.fillText('تشهد منصة «نور الفرقان» بأن',700,290);
    x.fillStyle='#0b3d2e';x.font='700 88px serif';x.fillText(nm,700,420);
    x.fillStyle='#5a4a1c';x.font='38px serif';x.fillText('قد اجتاز بنجاح اختبار',700,520);
    x.fillStyle='#0e7a53';x.font='700 54px serif';x.fillText('العلوم الإسلامية — السنة الثالثة ثانوي',700,610);
    x.fillText(what,700,690);
    x.fillStyle='#5a4a1c';x.font='40px serif';x.fillText('بنتيجة '+schFmt(sc)+' / 20',700,780);
    x.font='28px serif';x.fillText(new Date().toLocaleDateString('en-GB'),300,900);x.fillText('نور الفرقان — خلوفي أسامة',1050,900);
    return c;
  }
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-sc2]');if(!b)return;
    const k=b.dataset.sc2.split(':');
    if(k[0]==='cert'){
      if(!S.prof||!S.prof.name){toast(sg(['أضف اسمك في الإعدادات أولًا لتظهر على الشهادة.','Add your name in Settings first.','Ajoutez votre nom dans les réglages.']))}
      drawCert(k[1]).toBlob(function(bl){dlSave('certificate-'+k[1]+'.png',bl,'image/png')},'image/png');
    }
  });
})();
