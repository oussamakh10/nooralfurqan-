document.addEventListener('click',function(e){
  const b=e.target.closest&&e.target.closest('[data-lvf]');if(!b)return;
  S.lvf=+b.getAttribute('data-lvf');try{save()}catch(x){}
  UO=null;go('learn');
});
