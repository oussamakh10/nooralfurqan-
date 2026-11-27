/* 26: شاشة الأسئلة بألوان التطبيق: أخضر غامق وذهبي وأصفر (مثل شاشة الترحيب) */
(function(){
  var st=document.createElement('style');
  st.textContent=
  '#lesson,#lesson *{--bg:#081F16;--surface:#12392A;--fg:#FAF1CC;--muted:#D3C591;--line:#42704F;--accent:#F2C94C;--accent-d:#B88A16;--accent-soft:#1F4D37;--on-accent:#1C1503;--gold:#F2C94C;--gold-d:#B88A16;--gold-t:#F7DE7A;--accent-t:#F7DE7A;--focus:#F7DE7A;--ok-bg:#1D5237;--ok-fg:#A6F0C6;--bad-bg:#4E2523;--bad-fg:#FFB8B2;--bad:#FF7A72;--bad-d:#B8423D;--lock:#1C3B2C;--lock-d:#2B5240;--pat:rgba(242,201,76,.08);--pat2:rgba(242,201,76,.12);color-scheme:dark}'+
  '#lesson{color:var(--fg);background:radial-gradient(circle at 50% 0,rgba(242,201,76,.20),transparent 60%),repeating-linear-gradient(45deg,transparent 0 22px,rgba(242,201,76,.045) 22px 23px),repeating-linear-gradient(-45deg,transparent 0 22px,rgba(242,201,76,.045) 22px 23px),#081F16}'+
  '#lesson::before{background:radial-gradient(120% 45% at 50% 100%,rgba(31,120,80,.35),transparent 70%)}'+
  '#lesson .opt{background:linear-gradient(180deg,#154431,#103526);border-color:#42704F;color:var(--fg)}'+
  '#lesson .opt.sel,#lesson .opt[aria-pressed="true"],#lesson .opt.on{background:linear-gradient(180deg,#5A4C14,#3F3510);border-color:#F2C94C}'+
  '#lesson .opt.right{background:var(--ok-bg);border-color:#5FD394}'+
  '#lesson .opt.wrong{background:var(--bad-bg);border-color:var(--bad)}'+
  '#lesson .btn:not(.ghost):not(.bad){background:linear-gradient(180deg,#F8DD76,#E2B531);color:#1C1503;border-bottom-color:#9B7410}'+
  '#lesson .btn.ghost{background:rgba(255,255,255,.04);color:var(--fg);border-color:#42704F}'+
  '#lesson .lfoot{background:#0A2A1D;border-top-color:rgba(242,201,76,.28)}'+
  '#lesson .lfoot.ok{background:var(--ok-bg)}#lesson .lfoot.bad{background:var(--bad-bg)}'+
  '#lesson .bar{background:#16402F}#lesson .bar i{background:linear-gradient(90deg,#E2B531,#F8DD76)}'+
  '#lesson .xbtn{color:#F2C94C;border-color:#F2C94C;background:transparent}'+
  '#lesson .bubble{background:#12392A;border-color:#42704F;color:var(--fg)}'+
  '#lesson .stat,#lesson .card{background:#12392A;border-color:#42704F;color:var(--fg)}';
  document.head.appendChild(st);
})();
