(async()=>{
 await new FontFace('TJ','url(/assets/fonts/tajawal-800.woff)',{weight:'800'}).load().then(f=>document.fonts.add(f));
 await new FontFace('SCH','url(/assets/fonts/ScheherazadeNew-Regular.ttf)').load().then(f=>document.fonts.add(f));
 for(const n of['home','learn','les1','q1','q2','q3'].concat(CFG.appImgs||[]))IM[n]=await load('/assets/app/'+n+'.png');
 IM.icon=await load('/assets/hoopoe/icon.png');
 for(const n of['happy','sad','wow','cheer'])IM['h'+n]=await load('/assets/hoopoe/hp_'+n+'.svg');
 window.DURATION=CFG.dur;window.ready=true;})();
