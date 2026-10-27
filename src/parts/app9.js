/* ================= الأحداث ================= */
document.addEventListener('click',function(e){
  const t=e.target.closest('button,a');if(!t||t.tagName==='A')return;
  const d=t.dataset;
  if(!t.disabled&&!d.opt&&!d.gopt&&!d.bopt)SND.tap();
  if(d.go)return go(d.go);
  if(d.ltab){LTAB=d.ltab;HV=0;return pageLearn()}
  if(d.unit!==undefined){UO=UO||{};const k=+d.unit;if(UO[k])delete UO[k];else UO[k]=1;return pageLearn()}
  if(d.uopen){return openUnitByTitle(d.uopen)}
  if(d.uopen2){closeOverlay();return openUnitByTitle(d.uopen2)}
  if(d.ob!==undefined){const q=OB[OBI];OBD[q.k]=isNaN(+d.ob)?d.ob:+d.ob;obCollect();return obNext()}
  if(d.duopt!==undefined&&DU)return duelAnswer(+d.duopt);
  if(d.weak){GS.mode='solo';GS.fields=[d.weak];GS.levels=['m'];return go('play')}
  if(d.lang){const first=d.first;setLang(d.lang);if(first){$('#cele').hidden=true;setTimeout(function(){if(!S.prof&&$('#lesson').hidden)openOnboard()},300)}else{setTimeout(openSettings,60)}return}
  if(d.hpv){S.hpv=d.hpv;save();renderTop();renderNav();openSettings();return}
  if(d.qs!==undefined){S.qs=+d.qs;save();applyTheme();return openSettings()}
  if(d.hvoice){return loadQ().then(function(){voiceCheck(+d.hs2,+d.hvoice,t)})}
  if(d.lesson)return startLesson(d.lesson);
  if(d.restart)return startLesson(d.restart);
  /* قراءة */
  if(d.surah){RV.s=+d.surah;if(TAB!=='read'){TAB='read';renderNav()}openSurah(RV.s,d.jump?+d.jump:0);return}
  if(d.tf)return toggleTafsir(t);
  if(d.rd)return doRead(t);
  if(d.fin)return finishSurahRead(+d.fin);
  if(d.mark){S.last={s:RV.s,a:+d.mark};save();document.querySelectorAll('.ay.on').forEach(function(x){x.classList.remove('on')});t.closest('.ay').classList.add('on');toast('حُفظ موضع القراءة: آية '+N(+d.mark));return}
  if(d.pa){playAyah(RV.s,+d.pa);return}
  if(d.listen){LS={mode:'surah',s:+d.listen,a:1};go('listen');return}
  /* استماع */
  if(d.lmode){LS.mode=d.lmode;return pageListen()}
  if(d.rec){S.rec=d.rec;save();pageListen();return}
  if(d.pa2){playAyah(LS.s,+d.pa2);return}
  if(d.had!==undefined)return speak(+d.had);
  if(d.claim){
    const c=DQ.find(function(x){return x.k===d.claim}),ds=dayState();
    if(c&&!ds.c[c.k]&&(ds.p[c.k]||0)>=c.n){ds.c[c.k]=1;addXP(c.r);save();renderTop();SND.coin();pageAch();toast('أُضيفت '+N(c.r)+' نقطة إلى رصيدك')}
    return;
  }
  /* حفظ */
  if(d.hs){HV=+d.hs;HV_HIDE=false;return learnHifz()}
  if(d.hpa){return playAyah(+d.hs2,+d.hpa)}
  if(d.hmem)return hifzMem(+d.hs2,+d.hmem);
  if(d.hpeek!==undefined){const p=t.closest('.card').querySelector('[data-ht]');if(p)p.style.filter='none';return}
  /* أذكار */
  if(d.dk){DK.tab=d.dk;TSB=null;return renderDhikr()}
  if(d.adk!==undefined)return adkTap(+d.adk);
  /* إعدادات */
  if(d.set==='mute'){S.mute=!S.mute;save();return openSettings()}
  if(d.set==='kids'){S.kids=!S.kids;save();applyTheme();return openSettings()}
  if(d.theme!==undefined){S.theme=d.theme;save();applyTheme();return openSettings()}
  /* ألعاب */
  if(d.gmode){GS.mode=d.gmode;return pagePlay()}
  if(d.gf){const i=GS.fields.indexOf(d.gf);if(i>=0){if(GS.fields.length>1)GS.fields.splice(i,1)}else GS.fields.push(d.gf);return pagePlay()}
  if(d.gl){const i=GS.levels.indexOf(d.gl);if(i>=0){if(GS.levels.length>1)GS.levels.splice(i,1)}else GS.levels.push(d.gl);return pagePlay()}
  if(d.gc){GS.count=+d.gc;return pagePlay()}
  if(d.gt!==undefined){GS.timer=+d.gt;return pagePlay()}
  if(d.gopt!==undefined&&G)return answerGame(+d.gopt);
  if(d.bopt!==undefined&&G)return answerBlitz(+d.bopt);
  if(d.gadd!==undefined&&G&&G.state==='ask'){G.ans.push(d.gadd);return renderGame()}
  if(d.gun!==undefined&&G&&G.state==='ask'){G.ans.splice(+d.gun,1);return renderGame()}
  const a=d.act;
  if(a==='cclose'){$('#cele').hidden=true;return renderPage()}
  if(a==='ob-next')return obNext();
  if(a==='ob-skip'){obCollect();if(OBI<OB.length-1){OBI++;return renderOnboard()}return obFinish()}
  if(a==='ob-link'){return linkAccount().then(function(ok){const e=$('#obacct');if(e)e.textContent=ok?'تم الربط ✓':'لم يتم الربط'})}
  if(a==='prof-edit'){return openOnboard()}
  if(a==='acct-link'){return linkAccount().then(function(){openSettings()})}
  if(a==='rem-save'){const v=$('#remtime').value;if(v){S.rem=v;save();toast('سيظهر تنبيه في الرئيسية بعد '+toAr(v)+' إن لم تسجّل نشاطًا')}return}
  if(a==='rem-ics'){const v=($('#remtime').value||'20:00');S.rem=v;save();return dlSave('noor-alfurqan-reminder.ics',reminderICS(v),'text/calendar')}
  if(a==='guide-open')return openGuide();
  if(a==='shareapp')return shareApp();
  if(a==='share')return shareCard();
  if(a==='buyfreeze')return buyFreeze();
  if(a==='place')return startPlacement();
  if(a==='ask-open')return openAssistant();
  if(a==='ask-send')return askSend();
  if(a==='duel-open')return openDuel();
  if(a==='duel-close')return duelClose();
  if(a==='duel-new'){const al='abcdefghjkmnpqrstuvwxyz23456789';let c='';for(let i=0;i<5;i++)c+=al[Math.floor(Math.random()*al.length)];return duelJoin(c,true)}
  if(a==='duel-join'){const v=($('#ducode').value||'').trim().toLowerCase().replace(/[^a-z0-9]/g,'');if(v.length>=4)duelJoin(v,false);return}
  if(a==='duel-go')return duelHostStart();
  if(a==='duel-next')return duelNext();
  if(a==='circ-new')return newCircle();
  if(a==='circ-join')return joinCircle();
  if(a==='circ-leave'){S.circle='';save();syncBoard();return pageAch()}
  if(a==='settings')return openSettings();
  if(a==='reset'){if(confirm(T('هل تريد مسح كل تقدّمك؟'))){try{localStorage.removeItem(KEY)}catch(e){}location.reload()}return}
  if(a==='trtoggle'){S.tr=S.tr==='en'?'':'en';save();return openSurah(RV.s)}
  if(a==='khat-set'){const v=prompt(T('في كم يومًا تريد ختم المصحف؟ (من 1 إلى 365)'),S.khat.days);const n=parseInt(toLatin(v),10);if(n>=1&&n<=365){S.khat.days=n;save();renderPage()}return}
  if(a==='wkclaim'){const k=weekKey();if(!S.wkc[k]&&weekSum(S.xpd)>=WK_TARGET){S.wkc[k]=1;addXP(50);SND.bell();celebrate('أتممت تحدي الأسبوع','أضفت 50 نقطة إلى رصيدك.','cheer')}else if(S.wkc[k])toast('استلمتَ مكافأة هذا الأسبوع');else toast('أكمل نقاط تحدي الأسبوع أولًا');return}
  if(a==='review-go'){go('learn');LTAB='review';return startReviewSession()}
  if(a==='dhikr-open'){loadQ().then(function(){openDhikr('tasbih')}).catch(function(){openDhikr('tasbih')});return}
  if(a==='tsb')return dhikrTap();
  if(a==='tsreset'){TSB={p:0,c:0};return renderDhikr()}
  if(a==='hback'){HV=0;return learnHifz()}
  if(a==='hhide'){HV_HIDE=!HV_HIDE;return hifzSurah(HV)}
  if(a==='hquiz')return hifzQuiz(+d.hs2);
  if(a==='rback'){RV.s=0;pageRead();window.scrollTo(0,0);return}
  if(a==='play-surah')return playSurah(LS.s);
  if(a==='toggle'){if(AU.paused)AU.play().catch(function(){audioErr()});else AU.pause();return}
  if(a==='mclose')return stopAudio();
  if(a==='pa-prev'){if(AP&&AP.a>1)playAyah(AP.s,AP.a-1);return}
  if(a==='pa-next'){if(AP&&AP.a<AYC[AP.s-1])playAyah(AP.s,AP.a+1);return}
  if(a==='addp'){if(GS.players.length<4)GS.players.push('اللاعب '+N(GS.players.length+1));return pagePlay()}
  if(a==='remp'){if(GS.players.length>2)GS.players.pop();return pagePlay()}
  if(a==='gstart')return startGame();
  if(a==='gready'){G.state='ask';startTimer();return renderGame()}
  if(a==='gnext')return nextGame();
  if(a==='gcheck')return checkOrd();
  if(a==='gquit'){G.confirm=true;G.pausedAt=Date.now();if(G.timer){clearInterval(G.timer);G.timer=0}return renderGame()}
  if(a==='gstay'){
    G.confirm=false;
    if(G.blitz){G.t0+=Date.now()-G.pausedAt;runBlitz();return renderGame()}
    if(G.state==='ask'&&GS.timer){const keep=G.left;startTimer();G.t0=Date.now()-(GS.timer-keep)*1000;G.left=keep}
    return renderGame();
  }
  if(a==='gleave')return closeOverlay();
  if(a==='gagain'){closeOverlay();return startGame()}
  /* درس */
  if(a==='leave')return closeOverlay();
  if(!L)return;
  if(d.opt!==undefined&&L.state==='ask'){SND.tap();L.sel=+d.opt;return renderLesson()}
  if(d.add!==undefined&&L.state==='ask'){SND.tap();L.ans.push(d.add);return renderLesson()}
  if(d.un!==undefined&&L.state==='ask'){L.ans.splice(+d.un,1);return renderLesson()}
  if(a==='check')checkLesson();
  else if(a==='next')nextLesson();
  else if(a==='quit'){L.confirm=true;renderLesson()}
  else if(a==='stay'){L.confirm=false;renderLesson()}
  else if(a==='leave')closeOverlay();
});
function toLatin(s){return String(s==null?'':s).replace(/[0-9]/g,function(c){return c.charCodeAt(0)-1632})}
document.addEventListener('change',function(e){
  if(e.target.id==='lsurah'){LS.s=+e.target.value;LS.a=1;pageListen()}
  if(e.target.id==='citysel'){S.city=e.target.value;save();renderPrayer()}
  if(e.target.id==='methsel'){S.method=e.target.value;save()}
});
document.addEventListener('input',function(e){
  if(e.target.dataset&&e.target.dataset.pl!==undefined){GS.players[+e.target.dataset.pl]=e.target.value}
});
document.addEventListener('keydown',function(e){
  if(!L||e.key!=='Enter'||e.target.closest('button'))return;
  const b=document.querySelector('[data-act="check"]:not(:disabled), [data-act="next"]');if(b)b.click();
});

/* ---------- البداية ---------- */
(function(){
  let h='';try{h=location.hash.slice(1)}catch(e){}
  if(TABS.some(function(t){return t[0]===h}))TAB=h;
  applyTheme();applyFreeze();dayState();renderTop();renderNav();renderMini();renderPage();initBoard();
  if(!S.lang)setTimeout(openLangPicker,200);
  else if(!S.prof)setTimeout(function(){if(!S.prof&&$('#lesson').hidden)openOnboard()},700);
})();
