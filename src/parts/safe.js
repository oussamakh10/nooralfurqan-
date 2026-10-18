/* ================= حماية البيانات + نسخ التقدم احتياطيًا ================= */
(function(){
  // اطلب تخزينًا دائمًا حتى لا يمسح المتصفح التقدم عند ضيق المساحة
  try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()}catch(e){}
})();
function exportProgress(){
  const fn='nur-alfurqan-progress-'+today()+'.json';
  const blob=new Blob([JSON.stringify({app:'nur-alfurqan',v:2,t:Date.now(),data:S})],{type:'application/json'});
  const ok=g3(["تم الحفظ","Saved","Enregistré"]),no=g3(["لم يُحفظ الملف","File not saved","Fichier non enregistré"]);
  if(window.claude&&claude.use){
    claude.use('downloads').then(function(D){
      if(!D){if(anchorSave(fn,blob))toast(ok);else toast(no);return}
      return D.save({filename:fn,data:blob}).then(function(){toast(ok)}).catch(function(){toast(no)});
    }).catch(function(){toast(no)});
  }else{toast(anchorSave(fn,blob)?ok:no)}
}
function importProgress(file){
  const bad=g3(["الملف غير صالح","Invalid file","Fichier invalide"]);
  if(!file||file.size>2e6){toast(bad);return}
  const r=new FileReader();
  r.onload=function(){
    try{
      const j=JSON.parse(String(r.result));
      if(!j||j.app!=='nur-alfurqan'||!j.data||typeof j.data!=='object'){toast(bad);return}
      const before=S.xp;
      mergeState(j.data);          // دمج آمن: لا ينقص أي تقدم موجود
      save();renderTop();renderPage();
      toast(g3(["تم استيراد التقدم","Progress imported","Progression importée"]));
    }catch(e){toast(bad)}
  };
  r.onerror=function(){toast(bad)};
  r.readAsText(file);
}
(function(){
  const base=extraSettings;
  extraSettings=function(){
    return base()+
     '<div class="setrow"><span>'+esc(g3(["مستوى الصوت","Volume","Volume"]))+'</span><span class="opts2">'+[[30,g3(["منخفض","Low","Bas"])],[60,g3(["متوسط","Medium","Moyen"])],[100,g3(["عالٍ","High","Fort"])]].map(function(x){return '<button class="tag" data-xvol="'+x[0]+'" aria-pressed="'+((S.vol==null?100:S.vol)===x[0])+'">'+esc(x[1])+'</button>'}).join('')+'</span></div>'+
     '<div class="setrow"><span>'+esc(g3(["الاهتزاز عند الإجابة","Vibration feedback","Vibrations"]))+'</span><button class="tag" data-xhap="1" aria-pressed="'+(S.hap!==0)+'">'+esc(S.hap!==0?g3(["مُفعّل","On","Activé"]):g3(["مُغلق","Off","Désactivé"]))+'</button></div>'+
     '<div class="setrow"><span>'+esc(g3(["نسخة احتياطية من تقدمي","Back up my progress","Sauvegarder ma progression"]))+'</span><button class="btn sm ghost" data-act="prog-export">'+esc(g3(["تصدير","Export","Exporter"]))+'</button></div>'+
     '<div class="setrow"><span>'+esc(g3(["استعادة التقدم من ملف","Restore progress from a file","Restaurer depuis un fichier"]))+'</span><button class="btn sm ghost" data-act="prog-import">'+esc(g3(["استيراد","Import","Importer"]))+'</button></div>';
  };
  document.addEventListener('click',function(e){
    const t=e.target.closest('button');if(!t||t.disabled)return;const a=t.dataset.act;
    if(t.dataset.xvol!==undefined){setVol(+t.dataset.xvol);SND.correct();openSettings();return}
    if(t.dataset.xhap!==undefined){S.hap=S.hap===0?1:0;save();buzz(30);openSettings();return}
    if(a==='prog-export'){exportProgress();return}
    if(a==='prog-import'){
      let inp=document.getElementById('progfile');
      if(!inp){inp=document.createElement('input');inp.type='file';inp.id='progfile';inp.accept='application/json,.json';inp.hidden=true;
        inp.addEventListener('change',function(){const f=inp.files&&inp.files[0];inp.value='';importProgress(f)});document.body.appendChild(inp)}
      inp.click();
    }
  });
})();
