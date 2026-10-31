/* ================= إضافات: الإبلاغ عن خطأ، القراءة بصوت عالٍ، الشهادات، الوصول، إكسسوار الهدهد ================= */
let RC=null;
function openReport(ctx){
  RC=ctx||{kind:'general'};
  const c=$('#cele');
  c.innerHTML='<div class="card" style="text-align:start;justify-items:stretch;max-width:420px"><h2>'+esc(g3(["أبلغ عن خطأ أو اقتراح","Report a mistake or suggestion","Signaler une erreur ou une suggestion"]))+'</h2>'+
   (RC.q?'<p class="muted" style="font-size:.9rem;max-height:90px;overflow:auto">'+esc(T(RC.q))+'</p>':'')+
   '<textarea id="repnote" rows="4" maxlength="400" style="width:100%;font:inherit;padding:10px;border-radius:12px;border:2px solid var(--line);background:var(--surface);color:var(--fg)" placeholder="'+esc(g3(["اكتب ملاحظتك (اختياري)","Write your note (optional)","Écrivez votre remarque (facultatif)"]))+'" aria-label="'+esc(g3(["ملاحظتك","Your note","Votre remarque"]))+'"></textarea>'+
   '<button class="btn" data-act="rep-send">'+esc(g3(["إرسال","Send","Envoyer"]))+'</button><button class="btn ghost" data-act="rep-close">'+esc(g3(["إلغاء","Cancel","Annuler"]))+'</button></div>';
  c.hidden=false;
}
function sendReport(){
  const note=(($('#repnote')||{}).value||'').trim().slice(0,400);
  const it={k:RC.kind||'general',q:(RC.q||'').slice(0,300),l:RC.lid||'',n:note,t:Date.now(),lang:LANG};
  S.reports=(S.reports||[]).concat([it]).slice(-30);save();
  $('#cele').hidden=true;
  if(typeof DBH!=='undefined'&&DBH&&typeof UID!=='undefined'&&UID){
    try{DBH.doc('reports/'+UID).set({items:S.reports,upd:Date.now()}).then(function(){toast(g3(["وصل بلاغك، جزاك الله خيرًا","Your report was sent. Thank you!","Votre signalement a été envoyé. Merci !"]))}).catch(function(){toast(g3(["حُفظ البلاغ على جهازك","Saved on your device","Enregistré sur votre appareil"]))});return}catch(e){}
  }
  toast(g3(["حُفظ البلاغ على جهازك وسيُرسل عند توفر الاتصال بالحساب","Saved on your device; it will be sent when the account connection is available","Enregistré sur votre appareil ; il sera envoyé dès que la connexion au compte sera disponible"]));
}
/* القراءة بصوت عالٍ */
function speakNow(txt){
  try{
    const u=new SpeechSynthesisUtterance(txt);u.lang={ar:'ar-SA',en:'en-US',fr:'fr-FR'}[LANG]||'ar-SA';u.rate=S.kids?.85:1;
    speechSynthesis.cancel();speechSynthesis.speak(u);
  }catch(e){toast(g3(["القراءة الصوتية غير متاحة في هذا المتصفح","Read-aloud is not available in this browser","La lecture à voix haute n’est pas disponible dans ce navigateur"]))}
}
function speakQuestion(){
  const q=document.querySelector('#lesson .qtext');if(!q)return;
  const opts=[].map.call(document.querySelectorAll('#lesson .opt span:last-child'),function(x){return x.textContent});
  speakNow(q.textContent+(opts.length?'. '+opts.join('. '):''));
}
(function(){
  const _rl=renderLesson;
  renderLesson=function(){
    _rl();
    const q=document.querySelector('#lesson .qtext');
    if(q&&!q.querySelector('.spk')){
      const b=document.createElement('button');b.className='iconbtn sm spk';b.setAttribute('data-act','speak');b.setAttribute('aria-label',g3(["اقرأ السؤال بصوت عالٍ","Read the question aloud","Lire la question à voix haute"]));b.textContent='🔊';q.appendChild(b);
    }
    const m=document.querySelector('#lesson .lmain');
    if(m&&!m.querySelector('.repbtn')){
      const r=document.createElement('button');r.className='tag repbtn';r.setAttribute('data-act','report-q');r.textContent='⚑ '+g3(["أبلغ عن خطأ","Report a mistake","Signaler une erreur"]);r.style.cssText='margin-top:12px;font-size:.85rem';m.appendChild(r);
    }
    if(S.kids&&!S.mute&&L&&L.state!=='checked'){const key=L.lesson.id+':'+L.solved;if(L._sp!==key){L._sp=key;setTimeout(speakQuestion,350)}}
  };
})();
/* شهادة إتمام وحدة */
function certCard(ui){
  const u=DATA[ui];if(!u)return;
  const cs=getComputedStyle(document.documentElement),g=function(v,d){return (cs.getPropertyValue(v)||'').trim()||d};
  hpImage('cheer',300).then(function(im){
    const c=document.createElement('canvas');c.width=1400;c.height=990;const x=c.getContext('2d');
    x.fillStyle='#F6EAC0';x.fillRect(0,0,1400,990);
    x.strokeStyle='#0A5A37';x.lineWidth=18;x.strokeRect(36,36,1328,918);
    x.strokeStyle='#D9A21B';x.lineWidth=5;x.strokeRect(66,66,1268,858);
    x.textAlign='center';x.direction=LANG==='ar'?'rtl':'ltr';
    x.fillStyle='#0A4A30';x.font='700 76px "Tajawal",Tahoma,sans-serif';x.fillText(g3(["شهادة إتمام","Certificate of Completion","Certificat de réussite"]),700,200);
    if(im)x.drawImage(im,550,230,300,300);
    x.fillStyle='#10241B';x.font='500 40px Tahoma,sans-serif';
    const nm=(S.prof&&S.prof.name)?S.prof.name:g3(["صديقي","Friend","Cher ami"]);
    x.font='700 62px Tahoma,sans-serif';x.fillText(nm,700,610);
    x.font='500 38px Tahoma,sans-serif';x.fillStyle='#46563E';x.fillText(g3(["أتمّ جميع دروس الوحدة","has completed all lessons of the unit","a terminé toutes les leçons de l’unité"]),700,675);
    x.fillStyle='#0A5A37';x.font='700 56px Tahoma,sans-serif';x.fillText('« '+T(u.title)+' »',700,755);
    x.fillStyle='#46563E';x.font='500 32px Tahoma,sans-serif';
    let ds='';try{ds=new Date().toLocaleDateString(LANG==='ar'?'ar-DZ-u-nu-latn':LANG)}catch(e){ds=ymd(new Date())}
    x.fillText(ds+'  ·  '+T('نور الفرقان'),700,860);
    c.toBlob(function(b){if(!b){toast(g3(["تعذّر إنشاء الشهادة","Could not create the certificate","Impossible de créer le certificat"]));return}
      if(!window.claude||!claude.use){toast(g3(["الحفظ غير متاح","Saving is not available","L’enregistrement n’est pas disponible"]));return}
      claude.use('downloads').then(function(D){if(!D){toast(g3(["الحفظ غير متاح في هذا العرض","Saving is not available in this view","L’enregistrement n’est pas disponible ici"]));return}
        D.save({filename:'certificate-'+(ui+1)+'.png',data:b}).then(function(){toast(g3(["تم الحفظ","Saved","Enregistré"]))}).catch(function(){toast(g3(["لم تُحفظ الشهادة","Certificate not saved","Certificat non enregistré"]))})}).catch(function(){});
    },'image/png');
  });
}
(function(){
  const _pl=pageLearn;
  pageLearn=function(){
    _pl();
    document.querySelectorAll('#page .unit').forEach(function(sec,i){
      const u=DATA[i];if(!u||unitDone(u)<u.lessons.length||sec.querySelector('.certbtn'))return;
      const p=sec.querySelector('.path')||sec;const b=document.createElement('button');b.className='btn sm gold certbtn';b.setAttribute('data-cert',i);b.style.margin='10px auto';b.style.display='block';b.textContent='🎓 '+g3(["احصل على شهادة الوحدة","Get your unit certificate","Obtenir le certificat de l’unité"]);
      p.appendChild(b);
    });
  };
})();
/* الوصول والتخصيص */
function applyA11y(){const r=document.documentElement;r.classList.toggle('hc',!!S.hc);r.classList.toggle('rm',!!S.rm);r.style.fontSize=(S.fs||100)+'%'}
function extraSettings(){
  const o=function(attr,val,label,on,dis){return '<button class="tag" '+attr+'="'+val+'" aria-pressed="'+on+'"'+(dis?' disabled':'')+'>'+label+'</button>'};
  const hats=[['',g3(["بدون","None","Aucun"]),0],['fez',g3(["طربوش","Fez","Fez"]),0],['turban',g3(["عمامة","Turban","Turban"]),150],['crown',g3(["تاج","Crown","Couronne"]),400]];
  return '<div class="setrow"><span>'+esc(g3(["إكسسوار الهدهد","Hoopoe accessory","Accessoire de la huppe"]))+'</span><span class="opts2">'+hats.map(function(h){return o('data-xhat',h[0],esc(h[1]),(S.hat||'')===h[0],h[2]&&(S.xp||0)<h[2])}).join('')+'</span></div>'+
   '<div class="setrow"><span>'+esc(g3(["حجم الخط العام","Text size","Taille du texte"]))+'</span><span class="opts2">'+[[100,'A'],[115,'A+'],[130,'A++']].map(function(x){return o('data-xfs',x[0],x[1],(S.fs||100)===x[0])}).join('')+'</span></div>'+
   '<div class="setrow"><span>'+esc(g3(["تباين عالٍ","High contrast","Contraste élevé"]))+'</span>'+o('data-xset','hc',esc(S.hc?g3(["مُفعّل","On","Activé"]):g3(["مُغلق","Off","Désactivé"])),!!S.hc)+'</div>'+
   '<div class="setrow"><span>'+esc(g3(["تقليل الحركة","Reduce motion","Réduire les animations"]))+'</span>'+o('data-xset','rm',esc(S.rm?g3(["مُفعّل","On","Activé"]):g3(["مُغلق","Off","Désactivé"])),!!S.rm)+'</div>'+
   '<div class="setrow"><span>'+esc(g3(["دليل المبتدئين","Beginner’s guide","Guide du débutant"]))+'</span><button class="btn sm ghost" data-act="guide-open2">'+esc(g3(["فتح","Open","Ouvrir"]))+'</button></div>'+
   '<div class="setrow"><span>'+esc(g3(["أبلغ عن مشكلة أو اقتراح","Report a problem or suggestion","Signaler un problème ou une suggestion"]))+'</span><button class="btn sm ghost" data-act="report-gen">'+esc(g3(["إرسال","Send","Envoyer"]))+'</button></div>';
}
document.addEventListener('click',function(e){
  const t=e.target.closest('button');if(!t||t.disabled)return;const d=t.dataset,a=d.act;
  if(a==='speak'){speakQuestion();return}
  if(a==='report-q'){const q=L&&L.queue&&L.queue[0];openReport({kind:'q',q:q?(q.q||''):'',lid:L&&L.lesson?L.lesson.id:''});return}
  if(a==='report-gen'){openReport({kind:'general'});return}
  if(a==='rep-send'){sendReport();return}
  if(a==='rep-close'){$('#cele').hidden=true;return}
  if(a==='guide-open2'){$('#cele').hidden=true;openGuide();return}
  if(d.cert!==undefined){certCard(+d.cert);return}
  if(d.xhat!==undefined){S.hat=d.xhat;save();renderTop();renderPage();openSettings();return}
  if(d.xfs!==undefined){S.fs=+d.xfs;save();applyA11y();openSettings();return}
  if(d.xset){S[d.xset]=!S[d.xset];save();applyA11y();openSettings();return}
});
applyA11y();
