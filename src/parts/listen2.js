/* ===== صفحة الاستماع: مشغّل بمحراب ===== */
(function(){
  const _pl=pageListen;
  pageListen=function(){
    _pl();
    const pg=document.getElementById('page');if(!pg)return;
    try{
      const sec=pg.querySelector('section.sec');if(!sec||sec.classList.contains('ls2'))return;
      sec.classList.add('ls2');
      const h2=sec.querySelector('h2');if(h2)h2.remove();
      sec.insertAdjacentHTML('afterbegin','<div class="rd-ban"><span class="rd-o" aria-hidden="true">✦</span><b>الاستماع</b><small>تلاوات بأصوات القرّاء</small></div>');
      const play=sec.querySelector('[data-act="play-surah"]');
      if(play){
        const sel=sec.querySelector('#lsurah'),fld=sel&&sel.closest('.field'),dl=sec.querySelector('#dlbox');
        const rec=sec.querySelector('.rc[aria-pressed="true"]');
        const card=document.createElement('div');card.className='ls-card';
        card.innerHTML='<div class="ls-disc" aria-hidden="true"><span>'+(rec?rec.querySelector('i').textContent:'م')+'</span></div><div class="ls-info"><b>'+(sel?esc(sel.options[sel.selectedIndex].text.replace(/^\d+\.\s*/,'')):'')+'</b><small>'+(rec?esc(rec.querySelector('span').textContent):'')+'</small></div>';
        if(fld)card.appendChild(fld);
        card.appendChild(play);
        if(dl)card.appendChild(dl);
        const rg=sec.querySelector('.rgrid'),rf=rg&&rg.closest('.field');
        const seg=sec.querySelector('.seg');
        (seg||sec.firstChild).insertAdjacentElement('afterend',card);
        if(rf)rf.classList.add('ls-rec');
        card.after(rf||card);
        if(sel)sel.addEventListener('change',function(){const b=card.querySelector('.ls-info b');if(b)b.textContent=sel.options[sel.selectedIndex].text.replace(/^\d+\.\s*/,'')});
      }

      /* زر اختيار القارئ بدل الشريط (سورة/آية) */
      const rg2=sec.querySelector('.rgrid');
      if(rg2){
        const f=rg2.closest('.field'),cur=rg2.querySelector('.rc[aria-pressed="true"]');
        const btn=document.createElement('button');btn.className='ls-recbtn';btn.setAttribute('data-recopen','1');btn.setAttribute('aria-haspopup','dialog');
        btn.innerHTML='<i aria-hidden="true">'+(cur?cur.querySelector('i').textContent:'م')+'</i><span><small>القارئ</small><b>'+(cur?esc(cur.querySelector('span').textContent):'')+'</b></span><em aria-hidden="true">تغيير</em>';
        window.__RECS=Array.prototype.map.call(rg2.querySelectorAll('.rc'),function(r){return {id:r.getAttribute('data-rec'),n:r.querySelector('span').textContent,l:r.querySelector('i').textContent,on:r.getAttribute('aria-pressed')==='true'}});
        f.innerHTML='';f.appendChild(btn);f.classList.add('ls-rec');
      }
      /* الأحاديث بمواضيعها */
      const hd=sec.querySelector('.had');
      if(hd&&typeof HAD!=='undefined'){
        const note=hd.previousElementSibling;if(note&&note.classList.contains('card'))note.classList.add('ls-note');
        const CATS=[['all','الكل'],['iman','الإيمان والإخلاص'],['ibada','العبادات والأذكار'],['ilm','العلم والقرآن'],['khuluq','الأخلاق والآداب'],['ukhuwa','الأخوّة والرحمة'],['usra','الأسرة والجوار'],['dunya','الدنيا والرزق والصبر']];
        const RX=[['ilm',/علما|القران|يفقهه|دال علي الخير|دل علي خير|علم ينتفع/],['ibada',/الصلوات|صليت|صام|رمضان|الطهور|ساجد|الدعاء|الذكر|كلمتان|السواك|ركعتا|البردين|ليله القدر|لا اله الا الله|المكتوبات/],['iman',/بني الاسلام|نيات|ظن عبدي|احدث في امرنا|الدين النصيحه|الايمان بضع|قل لي في الاسلام|لا ينظر الي اجسامكم|يتبع المسلم/],['usra',/لاهله|الوالد|امك|قاطع|فليصل رحمه|بالجار/],['khuluq',/حياء|تستح|تغضب|الغضب|الطيبه|حسن الخلق|احسنهم خلقا|احسنكم اخلاقا|حسن اسلام|لسانه|غشنا|الظن|نمام|المنافق|الرفق|تواضع|كبر|اتق الله|لا تحقرن|تبسمك|يريبك|سمحا|لا يشكر|البر حسن/],['ukhuwa',/يومن احدكم|للمومن|توادهم|رحم|الراحمون|اخاك|اخيك|المرء مع من احب|تحابوا|مراه المومن|حق المسلم|صدقه|معروف|صغيرنا|نفس عن مومن|الظلم|مظلوم|اتقوا النار|اليتيم|الارمله|ليس منا/]];
        window.HCAT=window.HCAT||'all';
        const catOf=function(t){const n=aNorm(t);for(let i=0;i<RX.length;i++)if(RX[i][1].test(n))return RX[i][0];return 'dunya'};
        const cnt={all:HAD.length};HAD.forEach(function(x){const c=catOf(x.t);cnt[c]=(cnt[c]||0)+1});
        const chips='<div class="hd-chips" role="group" aria-label="مواضيع الأحاديث">'+CATS.filter(function(c){return cnt[c[0]]}).map(function(c){return '<button class="tag" data-hcat="'+c[0]+'" aria-pressed="'+(window.HCAT===c[0])+'">'+c[1]+' <small>'+N(cnt[c[0]])+'</small></button>'}).join('')+'</div>';
        let k=0;
        const list=HAD.map(function(x,i){const c=catOf(x.t);if(window.HCAT!=='all'&&c!==window.HCAT)return '';k++;
          return '<article class="hd"><span class="hd-n" aria-hidden="true">'+N(k)+'</span><p class="hd-t">'+x.t+'</p><footer><span class="hd-r">'+x.r+'</span><button class="btn sm" data-had="'+i+'" id="had'+i+'">'+(SP===i?'إيقاف':'استمع')+'</button></footer></article>'}).join('');
        hd.className='hd-list';hd.innerHTML=list;
        hd.insertAdjacentHTML('beforebegin',chips);
      }
    }catch(e){try{console.warn('listen2',e)}catch(x){}}
  };
  document.addEventListener('click',function(e){
    const t=e.target.closest&&e.target.closest('[data-hcat]');
    if(t){window.HCAT=t.getAttribute('data-hcat');pageListen();return}
    const o=e.target.closest&&e.target.closest('[data-recopen]');
    if(o){
      const sh=document.createElement('div');sh.className='rc-sheet';sh.setAttribute('role','dialog');sh.setAttribute('aria-modal','true');sh.setAttribute('aria-label','اختر القارئ');
      sh.innerHTML='<div class="rc-bg" data-rcclose="1"></div><div class="rc-pan"><div class="rc-grip"></div><b>اختر القارئ</b><div class="rc-list">'+(window.__RECS||[]).map(function(r){return '<button class="rc-it" data-rec="'+r.id+'" aria-pressed="'+r.on+'"><i>'+r.l+'</i><span>'+r.n+'</span><em aria-hidden="true">'+(r.on?'✓':'')+'</em></button>'}).join('')+'</div></div>';
      document.body.appendChild(sh);return}
    if(e.target.closest&&(e.target.closest('[data-rcclose]')||e.target.closest('.rc-it'))){setTimeout(function(){const s=document.querySelector('.rc-sheet');if(s)s.remove()},0)}
  });
})();
