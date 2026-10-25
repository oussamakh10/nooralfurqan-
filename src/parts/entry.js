/* ===== بعد الدخول مباشرة: لغة ثم أسئلة التعارف، والجولة اختيارية ===== */
(function(){
  function afterSplash(fn){
    (function w(){if(document.getElementById('splash'))return setTimeout(w,120);fn()})();
  }
  const _lp=openLangPicker;
  openLangPicker=function(){const a=arguments,t=this;afterSplash(function(){_lp.apply(t,a)})};
  openOnboard=function(){
    if(!(S.prof&&S.prof.done)&&!S.toured){S.toured=1;try{save()}catch(e){}}
    const go=function(){OBI=(S.prof&&S.prof.done)?0:-1;OBD=Object.assign({},S.prof||{});renderOnboard()};
    if(document.getElementById('splash'))afterSplash(go);else go();
  };
})();
