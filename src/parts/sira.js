/* ===== السيرة النبوية: تبويب جديد — قصص مبسّطة مرتّبة بفصول (مختصرة بتصرف من سيرة ابن هشام وكتب السيرة) =====
   ملاحظة: النصوص كُتبت اختصارًا للأحداث المشهورة، وتحتاج مراجعة شرعية (docs/sharia_review.md) قبل الإطلاق العام.
   لا تُصوَّر شخصية النبي ﷺ ولا الصحابة بالرسم. */
(function(){
  const CH=[
    {id:1,t:'قبل البعثة',d:'المولد والنشأة',ic:'🌙',c:'#7c5cbf'},
    {id:2,t:'بدء الوحي',d:'غار حراء وأوائل المؤمنين',ic:'📖',c:'#1f8a70'},
    {id:3,t:'الصبر في مكة',d:'الدعوة والأذى والحبشة',ic:'⛰️',c:'#c2703d'},
    {id:4,t:'الهجرة إلى المدينة',d:'العقبة وغار ثور',ic:'🐪',c:'#b8892b'},
    {id:5,t:'بناء المجتمع',d:'المسجد والمؤاخاة وبدر',ic:'🕌',c:'#2f7fb5'},
    {id:6,t:'الفتح والوداع',d:'العفو وحجة الوداع',ic:'🌅',c:'#d0566b'}];
  const ST=[
   {id:1,ch:1,t:'عام الفيل ومولد النبي ﷺ',s:'ولد في مكة في عام جاء فيه جيش الفيل.',
    p:['وُلد النبي محمد ﷺ في مكة المكرمة في العام الذي عُرف بعام الفيل، وهو العام الذي جاء فيه أبرهة بجيشه وفيله ليهدم الكعبة، فردّه الله وجيشه.',
       'توفي أبوه عبد الله قبل ولادته، وكانت أمه آمنة بنت وهب. وكانت العادة عند أشراف العرب أن يُرسلوا أطفالهم إلى البادية لتقوى أجسامهم ويتعلموا الفصاحة، فأُرضع ﷺ عند حليمة السعدية في بني سعد.'],
    f:['الله يحفظ بيته وهو القادر على كل شيء.','بدأت حياته ﷺ باليُتم، وكان في ذلك تهيئة لقلبه ليكون رحيمًا بالضعفاء.'],
    q:{q:'في أي مدينة وُلد النبي ﷺ؟',c:'مكة المكرمة',w:['المدينة المنورة','الطائف','القدس'],n:'وُلد ﷺ في مكة، وهاجر منها إلى المدينة بعد البعثة.'}},
   {id:2,ch:1,t:'الأمين وحجر الكعبة',s:'لُقّب بالصادق الأمين، وحلّ خلافًا كبيرًا بحكمته.',
    p:['ماتت أمه وهو صغير، فكفله جدّه عبد المطلب، ثم بعد وفاة جدّه كفله عمّه أبو طالب. ونشأ ﷺ معروفًا بين قومه بالصدق والأمانة حتى لقّبوه «الصادق الأمين».',
       'ولما أعادت قريش بناء الكعبة وصلوا إلى موضع الحجر الأسود، فتنازعوا: كل قبيلة تريد شرف وضعه! فاتفقوا أن يحكم بينهم أول داخل عليهم، فكان محمدًا ﷺ. فوضع الحجر على ثوب، وطلب من رؤساء القبائل أن يحملوا أطرافه جميعًا، ثم وضعه بيده الشريفة في مكانه، فرضي الجميع.'],
    f:['الصدق والأمانة تكسبان ثقة الناس قبل أي منصب.','الحكمة تحلّ الخلاف دون صراع.'],
    q:{q:'بماذا لُقّب النبي ﷺ قبل البعثة؟',c:'الصادق الأمين',w:['الفاروق','ذو النورين','سيف الله'],n:'عرفه قومه بالصدق والأمانة قبل أن يأتيه الوحي.'}},
   {id:3,ch:2,t:'غار حراء ونزول الوحي',s:'أول ما نزل من القرآن: «اقرأ».',
    p:['كان النبي ﷺ يخلو للتعبّد والتفكّر في غار حراء قرب مكة. وفي شهر رمضان جاءه جبريل عليه السلام بأول الوحي، وكان أول ما نزل أول آيات من سورة العلق: «اقرأ باسم ربك الذي خلق».',
       'رجع ﷺ إلى بيته خائفًا مرتجفًا، فطمأنته زوجته خديجة رضي الله عنها وذكّرته بأخلاقه: أنه يصل الرحم، ويصدق الحديث، ويُعين المحتاجين، ويُكرم الضيف، وأن الله لن يُخزيه أبدًا.'],
    f:['أول كلمة في الوحي كانت «اقرأ»: العلم أول الطريق.','الكلمة الطيبة والسند القريب يُثبّتان القلب وقت الخوف.'],
    q:{q:'ما أول ما نزل من القرآن؟',c:'أول آيات سورة العلق «اقرأ»',w:['سورة الفاتحة كاملة','سورة الإخلاص','سورة الكوثر'],n:'أول ما نزل من القرآن أول آيات سورة العلق.'}},
   {id:4,ch:2,t:'أوائل المؤمنين',s:'من هم أول من صدّق النبي ﷺ؟',
    p:['كانت خديجة بنت خويلد رضي الله عنها أول من آمن به من النساء، وصدّقته وآزرته بمالها ونفسها. وآمن بعدها صاحبه أبو بكر الصديق، وابن عمه الصغير علي بن أبي طالب، ومولاه زيد بن حارثة رضي الله عنهم.',
       'وكانت الدعوة في بدايتها سرّية بين الأهل والأصحاب، ثم دخل في الإسلام آخرون منهم مستضعفون كبلال بن رباح، فوجد الجميع في الإسلام عزّة وكرامة.'],
    f:['التصديق وقت الشدة له قدر عظيم.','الإسلام يرفع الناس بالإيمان لا بالنسب ولا بالمال.'],
    q:{q:'من أول من آمن بالنبي ﷺ من النساء؟',c:'خديجة بنت خويلد',w:['عائشة بنت أبي بكر','فاطمة الزهراء','حفصة بنت عمر'],n:'خديجة رضي الله عنها أول من آمن به من النساء.'}},
   {id:5,ch:3,t:'الجهر بالدعوة على الصفا',s:'نادى قومه من أعلى الصفا فشهدوا بصدقه.',
    p:['بعد فترة من الدعوة السرّية، أمر الله نبيّه ﷺ أن يجهر بالدعوة. فصعد جبل الصفا ونادى قريشًا، فاجتمعوا إليه، فقال: أرأيتم لو أخبرتكم أن خيلًا بسفح هذا الجبل تريد أن تغير عليكم أكنتم مصدّقيّ؟ قالوا: نعم، ما جرّبنا عليك إلا صدقًا.',
       'فأخبرهم أنه نذير لهم من عذاب شديد، فاشتدّ عليه بعضهم، وبدأ الأذى لمن آمن. وصبر النبي ﷺ وأصحابه وثبتوا على دينهم.'],
    f:['الصدق في الصغائر يصنع الثقة التي تُصدَّق بها الكبائر.','الثبات على الحق مع الأذى من أعظم الصبر.'],
    q:{q:'على أي جبل نادى النبي ﷺ قومه حين جهر بالدعوة؟',c:'الصفا',w:['أُحد','ثور','عرفة'],n:'نادى ﷺ قريشًا من على جبل الصفا في مكة.'}},
   {id:6,ch:3,t:'الهجرة إلى الحبشة',s:'ملك عادل يحمي المسلمين المستضعفين.',
    p:['لمّا اشتدّ أذى قريش، أذن النبي ﷺ لبعض أصحابه بالهجرة إلى الحبشة وقال إن بها ملكًا لا يُظلم عنده أحد، وهو النجاشي. فخرج جماعة من المسلمين وعاشوا هناك بأمان.',
       'وأرسلت قريش وفدًا يطلب إعادتهم، فسأل النجاشي المسلمين عن دينهم، فتكلم جعفر بن أبي طالب رضي الله عنه عن الإسلام، وتلا شيئًا من سورة مريم، فتأثّر النجاشي ورفض تسليمهم.'],
    f:['البحث عن مكان آمن للدين من الحكمة عند الشدة.','كلمة الحق الهادئة تُقنع القلوب.'],
    q:{q:'إلى أي بلد هاجر المسلمون الهجرة الأولى؟',c:'الحبشة',w:['المدينة','الشام','اليمن'],n:'هاجر بعض المسلمين أولًا إلى الحبشة حيث ملك عادل.'}},
   {id:7,ch:4,t:'بيعة العقبة',s:'قلوب من المدينة تفتح أبوابها للإسلام.',
    p:['في مواسم الحج كان النبي ﷺ يعرض الإسلام على القبائل. فلقي نفرًا من أهل يثرب (المدينة) من الأوس والخزرج، فآمنوا، ثم عادوا إلى قومهم يدعونهم. وفي العام التالي ثم الذي بعده جاءوا وبايعوه عند العقبة بمنى على نصرته.',
       'وأرسل معهم الصحابي مصعب بن عمير ليُعلّمهم القرآن والدين، فلم يبقَ بيت في المدينة إلا وفيه من يعرف الإسلام. وتهيّأت المدينة لتكون دار الهجرة.'],
    f:['التعليم الصبور يفتح مدينة كاملة.','لكل جهد أثر وإن تأخّر.'],
    q:{q:'من الصحابي الذي أُرسل ليعلّم أهل المدينة القرآن؟',c:'مصعب بن عمير',w:['بلال بن رباح','عمر بن الخطاب','خالد بن الوليد'],n:'أرسل النبي ﷺ مصعب بن عمير معلمًا لأهل يثرب.'}},
   {id:8,ch:4,t:'غار ثور والهجرة',s:'«لا تحزن إن الله معنا».',
    p:['حين أذن الله لنبيه بالهجرة، خرج ﷺ ليلًا مع صاحبه أبي بكر الصديق، واختبآ في غار ثور ثلاثة أيام حتى هدأ الطلب.',
       'وقف المشركون قرب الغار، فخاف أبو بكر على النبي، فقال له ﷺ مطمئنًا: «لا تحزن إن الله معنا». ثم أكملا الطريق إلى المدينة، واستقبلهم أهلها بفرحٍ عظيم.'],
    f:['اليقين بمعيّة الله يطرد الخوف.','الأخذ بالأسباب (الاختباء والتخطيط) مع التوكل على الله.'],
    q:{q:'في أي غار اختبأ النبي ﷺ وأبو بكر أثناء الهجرة؟',c:'غار ثور',w:['غار حراء','غار أُحد','غار عرفة'],n:'اختبآ في غار ثور جنوب مكة ثلاثة أيام.'}},
   {id:9,ch:5,t:'المسجد النبوي والمؤاخاة',s:'مجتمع جديد قائم على الأخوّة.',
    p:['كان أول عمل للنبي ﷺ في المدينة بناء المسجد، فشارك الصحابة بأيديهم في البناء، وكان المسجد مكان العبادة والتعلّم والاجتماع.',
       'ثم آخى ﷺ بين المهاجرين الذين تركوا أموالهم في مكة وبين الأنصار أهل المدينة، فاقتسم الأنصار مع إخوانهم بيوتهم وأموالهم بحب وكرم. فتكوّن مجتمع قوي تجمعه الإيمان والأخوّة.'],
    f:['المسجد قلب المجتمع المسلم.','الأخوّة تعني العطاء والإيثار.'],
    q:{q:'ماذا فعل النبي ﷺ بين المهاجرين والأنصار؟',c:'آخى بينهم',w:['فرّقهم في المدن','جعلهم قبائل منفصلة','أمرهم بالعودة إلى مكة'],n:'المؤاخاة جمعت المهاجرين والأنصار على المحبة والتعاون.'}},
   {id:10,ch:5,t:'غزوة بدر',s:'نصر عظيم لعدد قليل ثابت.',
    p:['في شهر رمضان من السنة الثانية للهجرة، التقى المسلمون وهم نحو ثلاثمئة وبضعة عشر رجلًا بجيش قريش الذي كان نحو ألف مقاتل عند آبار بدر.',
       'بات النبي ﷺ يدعو ربه ويستنصره، وثبت الصحابة وصدقوا القتال، فنصرهم الله نصرًا عظيمًا. وتعلّم المسلمون أن النصر من عند الله مع الأخذ بالأسباب والصبر.'],
    f:['العدد الكثير لا يضمن النصر وحده.','الدعاء والعمل معًا طريق النصر.'],
    q:{q:'في أي شهر وقعت غزوة بدر؟',c:'رمضان',w:['شوال','ذو الحجة','محرم'],n:'وقعت غزوة بدر في السابع عشر من رمضان في السنة الثانية للهجرة.'}},
   {id:11,ch:6,t:'فتح مكة والعفو',s:'قوة عظيمة ورحمة أعظم.',
    p:['في السنة الثامنة للهجرة دخل النبي ﷺ مكة بجيش كبير، وهو متواضع يطأطئ رأسه شكرًا لله. وكان أهل مكة قد آذوه وأصحابه سنين طويلة، فتوقّعوا الانتقام.',
       'لكنه عفا عنهم وقال لهم: «اذهبوا فأنتم الطلقاء». وطُهّرت الكعبة من الأصنام، ودخل الناس في دين الله أفواجًا. فكان الفتح فتح رحمة وعفو قبل أن يكون فتح سلاح.'],
    f:['العفو عند المقدرة من أعلى الأخلاق.','القوة مع التواضع تُكسب القلوب.'],
    q:{q:'ماذا فعل النبي ﷺ مع أهل مكة عند الفتح؟',c:'عفا عنهم',w:['انتقم منهم','أخرجهم من ديارهم','فرض عليهم الجزية فورًا'],n:'عفا النبي ﷺ عن أهل مكة عفوًا عامًّا.'}},
   {id:12,ch:6,t:'حجة الوداع والرحيل',s:'وصايا الخطبة الأخيرة.',
    p:['في السنة العاشرة للهجرة حجّ النبي ﷺ مع آلاف الصحابة، وخطب في الناس يوم عرفة. أوصاهم بالتمسك بكتاب الله وسنّته، وبحفظ دماء الناس وأموالهم وأعراضهم، وبحسن معاملة النساء، وبالعدل بين الناس.',
       'وبعد ذلك بأشهر مرض ﷺ، وتوفي في المدينة المنورة في شهر ربيع الأول من السنة الحادية عشرة للهجرة، وعمره نحو ثلاث وستين سنة، وترك أمّته على المحجّة البيضاء.'],
    f:['خطبة الوداع تجمع حقوق الإنسان قبل قرون طويلة.','أعظم وصية: التمسك بكتاب الله وسنّة نبيه ﷺ.'],
    q:{q:'في أي مدينة توفي النبي ﷺ؟',c:'المدينة المنورة',w:['مكة المكرمة','الطائف','القدس'],n:'توفي ﷺ في المدينة المنورة ودُفن في حجرة عائشة رضي الله عنها.'}}
  ];
  const LS='sr-';let VIEW=0,ANS={};
  function stt(){if(!S.sira)S.sira={r:{},q:{}};return S.sira}
  function isRead(id){return !!stt().r[id]}
  function totalRead(){return ST.filter(function(x){return isRead(x.id)}).length}
  function nextUnread(){return ST.find(function(x){return !isRead(x.id)})}
  function shuf(a,seed){a=a.slice();let s=seed*9301+49297;for(let i=a.length-1;i>0;i--){s=(s*9301+49297)%233280;const j=Math.floor(s/233280*(i+1));const t=a[i];a[i]=a[j];a[j]=t}return a}
  function mins(x){const w=x.p.join(' ').split(/\s+/).length;return Math.max(1,Math.round(w/110))}

  function css(){if(document.getElementById('sira-css'))return;const s=document.createElement('style');s.id='sira-css';s.textContent=
   '.sr-wrap{padding-bottom:24px;animation:srin .35s ease both}@keyframes srin{from{opacity:.0;transform:translateY(8px)}to{opacity:1;transform:none}}'+
   '.sr-hero{position:relative;overflow:hidden;display:flex;align-items:center;gap:16px;background:radial-gradient(circle at 12% 120%,rgba(255,255,255,.16) 0 22%,transparent 23%),radial-gradient(circle at 92% -10%,rgba(255,255,255,.14) 0 26%,transparent 27%),linear-gradient(135deg,var(--accent-d),var(--accent));color:var(--on-accent);border-radius:26px;padding:20px 18px;margin-top:6px;box-shadow:0 8px 22px rgba(0,0,0,.16)}'+
   '.sr-hero:after{content:"☪";position:absolute;inset-inline-start:-6px;bottom:-26px;font-size:7rem;opacity:.08;line-height:1}'+
   '.sr-ring{--p:0;flex:none;width:84px;height:84px;border-radius:50%;background:conic-gradient(var(--gold) calc(var(--p)*1%),rgba(255,255,255,.25) 0);display:grid;place-items:center;position:relative;z-index:1}'+
   '.sr-ring b{width:64px;height:64px;border-radius:50%;background:var(--accent-d);display:grid;place-items:center;font:800 1.1rem var(--display)}'+
   '.sr-ht{position:relative;z-index:1;min-width:0}.sr-ht h2{font-size:1.45rem;margin:0}.sr-ht p{margin:2px 0 0;font-size:.95rem;opacity:.92}'+
   '.sr-cont{margin-top:10px;max-width:100%;background:var(--gold);color:#2a1a05;border:0;border-radius:999px;padding:9px 16px;font:800 .92rem var(--display);cursor:pointer;box-shadow:0 3px 0 rgba(0,0,0,.2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
   '.sr-cont:active{transform:translateY(2px);box-shadow:none}'+
   '.sr-note{margin:12px 2px 0;font-size:.82rem;color:var(--muted);line-height:1.7}'+
   '.sr-ch{--c:#1f8a70;margin-top:26px}'+
   '.sr-chh{display:flex;align-items:center;gap:12px;margin-bottom:12px;padding:12px 14px;border-radius:20px;background:color-mix(in srgb,var(--c) 14%,var(--surface));border:2px solid color-mix(in srgb,var(--c) 30%,transparent)}'+
   '.sr-chh i{font-style:normal;flex:none;width:46px;height:46px;border-radius:15px;background:var(--c);display:grid;place-items:center;font-size:1.5rem;box-shadow:0 3px 0 color-mix(in srgb,var(--c) 55%,#000)}'+
   '.sr-chh div{min-width:0}.sr-chh h3{margin:0;font-size:1.15rem}.sr-chh small{display:block;color:var(--muted);font-size:.84rem;margin-top:1px}'+
   '.sr-chh em{margin-inline-start:auto;flex:none;font-style:normal;font:800 .82rem var(--display);color:var(--fg);background:var(--surface);border-radius:999px;padding:3px 10px}'+
   '.sr-list{position:relative;display:grid;gap:12px;padding-inline-start:26px}'+
   '.sr-list:before{content:"";position:absolute;inset-block:18px;inset-inline-start:10px;width:4px;border-radius:4px;background:repeating-linear-gradient(to bottom,color-mix(in srgb,var(--c) 45%,transparent) 0 8px,transparent 8px 14px)}'+
   '.sr-card{position:relative;display:flex;align-items:center;gap:12px;text-align:start;width:100%;background:var(--surface);border:2px solid var(--line);border-radius:20px;padding:14px;cursor:pointer;color:var(--fg);font:inherit;box-shadow:0 3px 0 var(--line);transition:transform .15s,border-color .15s}'+
   '.sr-card:before{content:"";position:absolute;inset-inline-start:-23px;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;background:var(--bg,#fff);border:4px solid var(--c)}'+
   '.sr-card.done:before{background:var(--c)}'+
   '.sr-card:hover{border-color:var(--c);transform:translateY(-2px)}.sr-card:active{transform:translateY(1px);box-shadow:none}'+
   '.sr-card.done{border-color:color-mix(in srgb,var(--c) 55%,transparent)}'+
   '.sr-n{flex:none;width:42px;height:42px;border-radius:14px;background:color-mix(in srgb,var(--c) 16%,var(--surface));color:var(--c);display:grid;place-items:center;font:800 1.05rem var(--display)}'+
   '.sr-card.done .sr-n{background:var(--c);color:#fff}'+
   '.sr-ct{flex:1;min-width:0}.sr-ct b{display:block;font:800 1.05rem/1.5 var(--display)}.sr-ct span{display:block;color:var(--muted);font-size:.86rem;line-height:1.6}'+
   '.sr-m{flex:none;font:700 .76rem var(--display);color:var(--muted);background:var(--accent-soft);border-radius:999px;padding:3px 9px}'+
   '.sr-rd{--c:#1f8a70;animation:srin .35s ease both}'+
   '.sr-bar{position:sticky;top:0;z-index:5;height:5px;background:var(--line);border-radius:5px;margin-bottom:8px;overflow:hidden}.sr-bar i{display:block;height:100%;width:0;background:var(--c);transition:width .1s}'+
   '.sr-back{background:none;border:0;color:var(--accent-t);font:800 1rem var(--display);cursor:pointer;padding:6px 0}'+
   '.sr-banner{position:relative;overflow:hidden;border-radius:26px;padding:22px 18px;margin-top:4px;color:#fff;background:radial-gradient(circle at 90% 10%,rgba(255,255,255,.22) 0 18%,transparent 19%),linear-gradient(145deg,color-mix(in srgb,var(--c) 70%,#000),var(--c));box-shadow:0 8px 22px color-mix(in srgb,var(--c) 40%,transparent)}'+
   '.sr-banner .big{position:absolute;inset-inline-end:10px;bottom:-14px;font-size:6.2rem;opacity:.22;line-height:1}'+
   '.sr-badge{display:inline-block;background:rgba(255,255,255,.2);color:#fff;border-radius:999px;padding:3px 12px;font:700 .82rem var(--display)}'+
   '.sr-banner h2{position:relative;font-size:1.6rem;line-height:1.5;margin:10px 0 4px}.sr-meta{position:relative;font-size:.85rem;opacity:.9}'+
   '.sr-body{margin-top:16px;background:var(--surface);border:2px solid var(--line);border-radius:22px;padding:6px 18px 10px}'+
   '.sr-body p{font-size:1.14rem;line-height:2.15;margin:14px 0;color:var(--fg)}'+
   '.sr-body p:first-child:first-letter{float:inline-start;font:800 3.1rem/1 var(--display);color:var(--c);margin-inline-end:8px;margin-top:6px}'+
   '.sr-body p+p{border-top:1px dashed var(--line);padding-top:14px}'+
   '.sr-fa{background:color-mix(in srgb,var(--gold) 14%,var(--surface));border:2px solid color-mix(in srgb,var(--gold) 45%,transparent);border-radius:22px;padding:14px 18px;margin-top:16px}'+
   '.sr-fa h4{margin:0 0 8px;font:800 1.08rem var(--display);color:var(--gold-t)}.sr-fa ul{margin:0;padding:0;list-style:none}.sr-fa li{position:relative;margin:8px 0;padding-inline-start:26px;line-height:1.9}.sr-fa li:before{content:"✦";position:absolute;inset-inline-start:0;color:var(--gold-t)}'+
   '.sr-qz{margin-top:18px;background:var(--surface);border:2px solid var(--line);border-radius:22px;padding:14px 16px}.sr-qz h4{margin:0 0 8px;font:800 1.08rem/1.7 var(--display)}'+
   '.sr-o{display:block;width:100%;text-align:start;margin:9px 0;background:var(--bg,var(--surface));border:2px solid var(--line);border-radius:16px;padding:12px 14px;font:700 1rem var(--text);color:var(--fg);cursor:pointer;box-shadow:0 3px 0 var(--line)}'+
   '.sr-o:active:not(:disabled){transform:translateY(2px);box-shadow:none}'+
   '.sr-o.ok{border-color:var(--accent);background:var(--accent-soft);box-shadow:0 3px 0 var(--accent)}.sr-o.no{border-color:#c0392b;background:rgba(192,57,43,.12);box-shadow:0 3px 0 #c0392b}'+
   '.sr-ex{margin-top:8px;color:var(--muted);font-size:.95rem;line-height:1.8}'+
   '.sr-done{margin-top:18px;width:100%;background:var(--accent);color:var(--on-accent);border:0;border-radius:999px;padding:14px;font:800 1.05rem var(--display);cursor:pointer;box-shadow:0 4px 0 var(--accent-d)}.sr-done:active{transform:translateY(3px);box-shadow:none}'+
   '.sr-src{margin-top:14px;font-size:.78rem;color:var(--muted);line-height:1.7}'+
   '@media (prefers-reduced-motion:reduce){.sr-wrap,.sr-rd{animation:none}.sr-card{transition:none}}';
   document.head.appendChild(s)}

  function list(){
    const n=totalRead(),pct=Math.round(n/ST.length*100),nx=nextUnread();
    let h='<section class="sr-hero"><div class="sr-ring" style="--p:'+pct+'"><b>'+N(pct)+'%</b></div><div class="sr-ht"><h2>السيرة النبوية</h2><p>قرأت '+N(n)+' من '+N(ST.length)+' قصة</p>'+
      (nx?'<button class="sr-cont" data-sira="open" data-id="'+nx.id+'">'+(n?'تابع: ':'ابدأ: ')+esc(nx.t)+'</button>':'<button class="sr-cont" data-sira="open" data-id="1">أعد القراءة من البداية</button>')+'</div></section>'+
      '<p class="sr-note">قصص مبسّطة ومختصرة من سيرة ابن هشام وكتب السيرة. للتوسّع ارجع إلى كتب السيرة وأهل العلم.</p>';
    CH.forEach(function(c){
      const sts=ST.filter(function(x){return x.ch===c.id}),dn=sts.filter(function(x){return isRead(x.id)}).length;
      h+='<section class="sr-ch" style="--c:'+c.c+'"><div class="sr-chh"><i aria-hidden="true">'+c.ic+'</i><div><h3>'+N(c.id)+'. '+esc(c.t)+'</h3><small>'+esc(c.d)+'</small></div><em>'+N(dn)+'/'+N(sts.length)+'</em></div><div class="sr-list">';
      sts.forEach(function(x){h+='<button class="sr-card'+(isRead(x.id)?' done':'')+'" data-sira="open" data-id="'+x.id+'"><span class="sr-n">'+(isRead(x.id)?'✓':N(x.id))+'</span><span class="sr-ct"><b>'+esc(x.t)+'</b><span>'+esc(x.s)+'</span></span><span class="sr-m">'+N(mins(x))+' د</span></button>'});
      h+='</div></section>'});
    return '<div class="sr-wrap">'+h+'</div>'}

  function story(id){
    const x=ST.find(function(y){return y.id===id});if(!x)return list();
    const c=CH.find(function(y){return y.id===x.ch}),opts=shuf([x.q.c].concat(x.q.w),id),a=ANS[id];
    let h='<div class="sr-rd" style="--c:'+c.c+'"><div class="sr-bar"><i id="sr-pb"></i></div><button class="sr-back" data-sira="back">› رجوع للقصص</button><div class="sr-banner"><span class="big" aria-hidden="true">'+c.ic+'</span><span class="sr-badge">'+esc(c.ic+' '+c.t)+'</span><h2>'+esc(x.t)+'</h2><div class="sr-meta">قصة '+N(id)+' من '+N(ST.length)+' · '+N(mins(x))+' د قراءة</div></div><div class="sr-body">';
    x.p.forEach(function(p){h+='<p>'+esc(p)+'</p>'});h+='</div>';
    h+='<div class="sr-fa"><h4>فوائد من القصة</h4><ul>'+x.f.map(function(f){return '<li>'+esc(f)+'</li>'}).join('')+'</ul></div>';
    h+='<div class="sr-qz"><h4>اختبر نفسك: '+esc(x.q.q)+'</h4>';
    opts.forEach(function(o){const cls=a==null?'':(o===x.q.c?' ok':(o===a?' no':''));h+='<button class="sr-o'+cls+'" data-sira="ans" data-id="'+id+'" data-o="'+esc(o)+'"'+(a!=null?' disabled':'')+'>'+esc(o)+'</button>'});
    if(a!=null)h+='<div class="sr-ex">'+(a===x.q.c?'أحسنت! ':'الإجابة الصحيحة: '+esc(x.q.c)+'. ')+esc(x.q.n)+'</div>';
    h+='</div><button class="sr-done" data-sira="done" data-id="'+id+'">'+(isRead(id)?'قرأتها ✓ — القصة التالية':'أتممت القصة ✓')+'</button>'+
       '<div class="sr-src">المصدر: مختصر بتصرف من سيرة ابن هشام وكتب السيرة. النص مبسّط وبحاجة إلى مراجعة أهل العلم.</div></div>';
    return h}

  window.pageSira=function(){css();const pg=document.getElementById('page');if(!pg)return;pg.innerHTML=VIEW?story(VIEW):list()};
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-sira]');if(!b||typeof TAB==='undefined'||TAB!=='sira')return;
    const a=b.dataset.sira,id=+b.dataset.id;
    if(a==='open'){VIEW=id;pageSira();window.scrollTo(0,0)}
    else if(a==='back'){VIEW=0;pageSira();window.scrollTo(0,0)}
    else if(a==='ans'){const x=ST.find(function(y){return y.id===id});if(!x||ANS[id]!=null)return;ANS[id]=b.dataset.o;
      if(b.dataset.o===x.q.c&&!stt().q[id]){stt().q[id]=1;addXP(5);try{SND.ok&&SND.ok()}catch(_){}save()}
      pageSira()}
    else if(a==='done'){if(!isRead(id)){stt().r[id]=1;addXP(10);save();toast('أحسنت! +'+N(10)+' نقاط')}
      const nx=ST.find(function(y){return y.id>id&&!isRead(y.id)})||ST.find(function(y){return y.id===id+1});VIEW=nx&&nx.id!==id?nx.id:0;pageSira();window.scrollTo(0,0)}});
  window.addEventListener('scroll',function(){const b=document.getElementById('sr-pb');if(!b)return;const d=document.documentElement,m=d.scrollHeight-d.clientHeight;b.style.width=(m>0?Math.min(100,d.scrollTop/m*100):0)+'%'},{passive:true});
  /* تسجيل التبويب */
  TABS.splice(2,0,['sira','السيرة']);
  NAVI.sira='<path d="M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3zM5 18a3 3 0 0 1 3-3h11M9 7h6M9 10h4"/>';
  const _rp=renderPage;
  renderPage=function(){if(TAB!=='sira'){VIEW=0;return _rp()}
    if(pageTimer){clearInterval(pageTimer);pageTimer=0}try{document.body.dataset.tab=TAB}catch(e){}pageSira()};
  try{if(location.hash.slice(1)==='sira')TAB='sira'}catch(e){}
  renderNav();if(TAB==='sira')renderPage();
})();
