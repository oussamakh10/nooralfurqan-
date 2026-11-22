/* ===== نوافذ التأكيد والإدخال بتصميم التطبيق (بدل confirm() و prompt() الأصليين) ===== */
(function(){
  function css(){
    if(document.getElementById('dlg-css'))return;
    const s=document.createElement('style');s.id='dlg-css';
    s.textContent=
    '#nfdlg{position:fixed;inset:0;z-index:100001;display:grid;place-items:center;padding:20px;background:rgba(5,16,14,.62);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);animation:nfdin .18s ease both}'+
    '@keyframes nfdin{from{opacity:0}to{opacity:1}}@keyframes nfdup{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}'+
    '#nfdlg .nfd-c{width:min(92vw,360px);background:var(--surface,#fbf3dc);color:var(--fg,#1b2a22);border:2px solid var(--line,#e4d6aa);border-radius:26px;padding:22px 20px 18px;text-align:center;box-shadow:0 24px 60px -18px rgba(0,0,0,.65);animation:nfdup .22s ease both}'+
    '#nfdlg .nfd-i{width:58px;height:58px;margin:-6px auto 10px;border-radius:50%;display:grid;place-items:center;background:var(--accent-soft,rgba(31,138,112,.16));color:var(--accent,#1f8a70)}'+
    '#nfdlg .nfd-c.nfd-dg .nfd-i{background:rgba(192,57,43,.14);color:#c0392b}'+
    '#nfdlg .nfd-i svg{width:30px;height:30px}'+
    '#nfdlg .nfd-t{font:800 1.25rem var(--display);margin:0 0 6px}'+
    '#nfdlg .nfd-m{margin:0 0 6px;line-height:1.8;font-size:1rem}'+
    '#nfdlg .nfd-n{margin:0 0 4px;line-height:1.7;font-size:.86rem;color:var(--muted,#6b6f63)}'+
    '#nfdlg .nfd-in{width:100%;box-sizing:border-box;min-height:50px;margin:10px 0 2px;border-radius:16px;border:2px solid var(--line,#e4d6aa);background:var(--bg,#fff);color:var(--fg,#1b2a22);text-align:center;font:700 1.15rem var(--display)}'+
    '#nfdlg .nfd-in:focus{outline:none;border-color:var(--accent,#1f8a70);box-shadow:0 0 0 3px var(--accent-soft,rgba(31,138,112,.2))}'+
    '#nfdlg .nfd-b{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}'+
    '#nfdlg .nfd-b button{min-height:50px;border-radius:16px;font:800 1rem var(--display);cursor:pointer;border:2px solid var(--line,#e4d6aa);background:var(--surface,#fff);color:var(--fg,#1b2a22);box-shadow:0 3px 0 var(--line,#e4d6aa)}'+
    '#nfdlg .nfd-b button:active{transform:translateY(3px);box-shadow:none}'+
    '#nfdlg .nfd-b .nfd-ok{background:var(--accent,#1f8a70);border-color:var(--accent,#1f8a70);color:#fff;box-shadow:0 3px 0 rgba(0,0,0,.25)}'+
    '#nfdlg .nfd-dg .nfd-ok{background:#c0392b;border-color:#c0392b;box-shadow:0 3px 0 #8e2a20}';
    document.head.appendChild(s);
  }
  const ICO={
    warn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18.5v.01"/></svg>',
    ask:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 1 1 3.6 2.4c-.7.4-1.1.9-1.1 1.8M12 17v.01"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>'
  };
  const L=function(a,f,e){try{return g3([a,e||a,f||a])}catch(x){return a}};
  let prevFocus=null;
  function close(){const o=document.getElementById('nfdlg');if(o)o.remove();document.removeEventListener('keydown',onKey,true);if(prevFocus&&prevFocus.focus){try{prevFocus.focus()}catch(e){}}prevFocus=null}
  let cur=null;
  function onKey(e){
    if(!cur)return;
    if(e.key==='Escape'){e.preventDefault();e.stopPropagation();const c=cur;cur=null;close();if(c.no)c.no()}
    else if(e.key==='Enter'&&cur.input){e.preventDefault();cur.go()}
  }
  function open(o){
    css();close();prevFocus=document.activeElement;
    const d=document.createElement('div');d.id='nfdlg';d.setAttribute('role','alertdialog');d.setAttribute('aria-modal','true');d.dir='rtl';
    d.innerHTML='<div class="nfd-c'+(o.danger?' nfd-dg':'')+'"><div class="nfd-i">'+(o.input?ICO.edit:o.danger?ICO.warn:ICO.ask)+'</div>'+
      (o.title?'<h3 class="nfd-t" id="nfdt">'+esc(o.title)+'</h3>':'')+
      '<p class="nfd-m" id="nfdm">'+esc(o.msg)+'</p>'+(o.note?'<p class="nfd-n">'+esc(o.note)+'</p>':'')+
      (o.input?'<input class="nfd-in" id="nfdin" type="'+(o.num?'number':'text')+'" '+(o.num?'inputmode="numeric" min="1" max="365"':'')+' autocomplete="off" value="'+esc(String(o.def==null?'':o.def))+'" aria-labelledby="nfdm">':'')+
      '<div class="nfd-b"><button type="button" class="nfd-no" data-nfd="no">'+esc(o.cancel)+'</button><button type="button" class="nfd-ok" data-nfd="ok">'+esc(o.ok)+'</button></div></div>';
    document.body.appendChild(d);
    const inp=d.querySelector('#nfdin');
    cur={input:!!inp,no:o.onNo,go:function(){const v=inp?inp.value:'';const c=cur;cur=null;close();o.onOk(v)}};
    d.addEventListener('click',function(e){
      const b=e.target.closest('[data-nfd]');
      if(b&&b.dataset.nfd==='ok'){cur.go();return}
      if((b&&b.dataset.nfd==='no')||e.target===d){const c=cur;cur=null;close();if(c&&c.no)c.no()}
    });
    document.addEventListener('keydown',onKey,true);
    setTimeout(function(){const t=inp||d.querySelector(o.danger?'.nfd-no':'.nfd-ok');if(t){t.focus();if(inp)inp.select()}},30);
  }
  window.nfConfirm=function(msg,onOk,o){
    o=o||{};
    open({msg:msg,note:o.note,title:o.title,danger:o.danger,ok:o.ok||L('تأكيد','Confirmer','Confirm'),cancel:o.cancel||L('إلغاء','Annuler','Cancel'),onOk:function(){onOk&&onOk()},onNo:o.onNo});
  };
  window.nfPrompt=function(msg,def,onOk,o){
    o=o||{};
    open({msg:msg,def:def,input:1,num:o.num,title:o.title,note:o.note,ok:o.ok||L('حفظ','Enregistrer','Save'),cancel:o.cancel||L('إلغاء','Annuler','Cancel'),onOk:function(v){onOk&&onOk(v)},onNo:o.onNo});
  };
})();
