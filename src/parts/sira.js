/* ===== السيرة النبوية: تبويب جديد — قصص مبسّطة مرتّبة بفصول (مختصرة بتصرف من سيرة ابن هشام وكتب السيرة) =====
   ملاحظة: النصوص كُتبت اختصارًا للأحداث المشهورة، وتحتاج مراجعة شرعية (docs/sharia_review.md) قبل الإطلاق العام.
   لا تُصوَّر شخصية النبي ﷺ ولا الصحابة بالرسم. */
(function(){
  const CH=[
    {id:1,t:'قبل البعثة',d:'المولد والنشأة',ic:'moon',c:'#7c5cbf'},
    {id:2,t:'بدء الوحي',d:'غار حراء وأوائل المؤمنين',ic:'book',c:'#1f8a70'},
    {id:3,t:'الصبر في مكة',d:'الدعوة والأذى والحبشة',ic:'mount',c:'#c2703d'},
    {id:4,t:'الهجرة إلى المدينة',d:'العقبة وغار ثور',ic:'route',c:'#b8892b'},
    {id:5,t:'بناء المجتمع',d:'المسجد والمؤاخاة وبدر',ic:'mosque',c:'#2f7fb5'},
    {id:6,t:'الفتح والوداع',d:'العفو وحجة الوداع',ic:'sun',c:'#d0566b'}];
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

  const EX={
   1:{p:['جاء أبرهة الحبشي، حاكم اليمن، بجيش ضخم فيه فيل ليهدم الكعبة، بعدما بنى كنيسة في صنعاء وأراد أن يصرف الناس إليها. فلما اقترب من مكة أهلكه الله وجيشه بطير أبابيل ترميهم بحجارة من سجّيل، وفي ذلك نزلت سورة الفيل.','وبعد سنوات في البادية عاد إلى أمه آمنة، وتوفيت وهو في نحو السادسة في طريق عودتها من المدينة عند مكان يسمى الأبواء. فكفله جدّه عبد المطلب، فعاش يتيم الأب والأم صغيرًا.'],
     q:[{q:'ماذا حدث لجيش أبرهة؟',c:'أهلكهم الله بطير أبابيل',w:['انتصروا وهدموا الكعبة','عادوا دون أي قتال','هزمتهم قريش بالسيوف'],n:'ذكر الله قصتهم في سورة الفيل.'},{q:'عند من أُرضع النبي ﷺ في البادية؟',c:'حليمة السعدية',w:['أم أيمن','أسماء بنت أبي بكر','صفية بنت عبد المطلب'],n:'أُرضع ﷺ عند حليمة السعدية من بني سعد.'}]},
   2:{p:['وفي شبابه رعى الغنم لأهل مكة، وقال ﷺ إنه ما من نبي إلا رعى الغنم. ثم عمل بالتجارة، فسافر إلى الشام في تجارة خديجة رضي الله عنها ومعه غلامها ميسرة، وعاد بربح وفير، فأعجبت خديجة بأمانته وحسن خلقه.','فتزوجها ﷺ وهو في الخامسة والعشرين وكانت أكبر منه، وكانت له سندًا وعونًا، ورُزق منها أولاده عدا إبراهيم. وشهد قبل البعثة حلف الفضول، وهو عهد بين رجال من قريش على نصرة المظلوم، وقال بعد الإسلام إنه لو دُعي إلى مثله لأجاب.'],
     q:[{q:'كيف حلّ النبي ﷺ خلاف قريش في وضع الحجر الأسود؟',c:'وضعه على ثوب وحملت القبائل أطرافه',w:['أخذه بيده وحده مباشرة','ترك الحجر دون وضع','أعطاه لقبيلته فقط'],n:'شارك الجميع في حمله، ثم وضعه هو بيده.'},{q:'لصالح من سافر النبي ﷺ بالتجارة إلى الشام؟',c:'خديجة بنت خويلد',w:['أبي بكر الصديق','عثمان بن عفان','العباس بن عبد المطلب'],n:'سافر في تجارة خديجة ثم تزوجها.'}]},
   3:{p:['وذهبت به خديجة إلى ابن عمها ورقة بن نوفل، وكان قد قرأ الكتب السابقة، فأخبره ﷺ بما رأى، فقال ورقة إن هذا هو الناموس الذي نزل على موسى، وتمنى لو كان حيًّا حين يُخرجه قومه.','ثم فتر الوحي مدة، وبعدها نزل جبريل عليه السلام بقوله تعالى: «يا أيها المدثر قم فأنذر». فبدأ ﷺ مرحلة الدعوة، وكان أول من يدعوهم أهله وأقرب الناس إليه.'],
     q:[{q:'من الملَك الذي جاء النبي ﷺ بالوحي؟',c:'جبريل عليه السلام',w:['ميكائيل عليه السلام','إسرافيل عليه السلام','مالك خازن النار'],n:'جبريل عليه السلام هو الذي نزل بالوحي.'},{q:'من ورقة بن نوفل؟',c:'ابن عم خديجة وقد قرأ الكتب السابقة',w:['عمّ النبي ﷺ','ملك الحبشة','قائد جيش قريش'],n:'ذهبت إليه خديجة رضي الله عنها لتسأله عمّا رآه النبي ﷺ.'}]},
   4:{p:['ومن أوائل المؤمنين عثمان بن عفان وعبد الرحمن بن عوف وسعد بن أبي وقاص وطلحة والزبير رضي الله عنهم، دعاهم أبو بكر فأسلموا. وكان النبي ﷺ يجتمع بالمؤمنين سرًّا في دار الأرقم بن أبي الأرقم عند الصفا ويعلّمهم القرآن.','وحين علمت قريش بأمرهم تعرّض المستضعفون للأذى. فكان بلال يُعذَّب في الرمال الحارة وهو يقول «أحد أحد»، فاشتراه أبو بكر وأعتقه. وصبرت أسرة ياسر وسمية وابنهما عمّار، وسمية أول شهيدة في الإسلام.'],
     q:[{q:'أين كان النبي ﷺ يجتمع بأصحابه سرًّا في بداية الدعوة؟',c:'دار الأرقم',w:['دار الندوة','بيت أبي جهل','المسجد النبوي'],n:'كانت دار الأرقم بن أبي الأرقم عند الصفا.'},{q:'من الذي اشترى بلالًا رضي الله عنه وأعتقه؟',c:'أبو بكر الصديق',w:['عمر بن الخطاب','علي بن أبي طالب','خالد بن الوليد'],n:'اشتراه أبو بكر وأعتقه في سبيل الله.'}]},
   5:{p:['وكان ممن ردّ عليه عمه أبو لهب فقال: «تبًّا لك، ألهذا جمعتنا؟». فنزلت سورة المسد. وأمّا عمه أبو طالب فلم يُسلم، لكنه بقي يحميه من أذى قريش.','وحاولت قريش إيقاف الدعوة، فعرضوا على أبي طالب أن يكفّ ابن أخيه. وتروي كتب السيرة أنه ﷺ أجابه بأنه لن يترك هذا الأمر ولو وضعوا الشمس في يمينه والقمر في يساره، حتى يُظهره الله أو يهلك دونه.'],
     q:[{q:'ماذا سألهم النبي ﷺ ليُثبت صدقهم معه قبل الدعوة؟',c:'هل يصدّقونه لو أخبرهم بخيل خلف الجبل',w:['هل يعطونه مالًا','هل يتبعونه إلى المدينة','هل يعرفون اسم جدّه'],n:'شهدوا بصدقه أولًا ثم أخبرهم برسالته.'},{q:'من عمّه الذي آذاه ونزلت فيه سورة المسد؟',c:'أبو لهب',w:['أبو طالب','حمزة','العباس'],n:'نزلت سورة المسد في أبي لهب.'}]},
   6:{p:['وكان من أوائل المهاجرين إلى الحبشة عثمان بن عفان وزوجته رقية بنت النبي ﷺ. وأرسلت قريش وفدًا بهدايا للنجاشي وبطارقته، وكان فيه عمرو بن العاص قبل أن يُسلم.','فسأل النجاشي المسلمين عن هذا الدين، فشرح جعفر بن أبي طالب أنهم كانوا أهل جاهلية يعبدون الأصنام ويأكل القويّ منهم الضعيف، فبعث الله فيهم نبيًّا يأمرهم بالصدق والأمانة وصلة الرحم. فبكى النجاشي وقال إن هذا والذي جاء به عيسى يخرج من مشكاة واحدة.'],
     q:[{q:'من الملك الذي حمى المسلمين في الحبشة؟',c:'النجاشي',w:['أبرهة','كسرى','هرقل'],n:'كان النجاشي ملكًا عادلًا.'},{q:'من الصحابي الذي تحدّث باسم المسلمين أمام النجاشي؟',c:'جعفر بن أبي طالب',w:['علي بن أبي طالب','عمر بن الخطاب','الزبير بن العوام'],n:'تحدث جعفر رضي الله عنه وتلا من سورة مريم.'}]},
   7:{p:['وفي العقبة الثانية جاء نحو ثلاثة وسبعين رجلًا وامرأتين من أهل المدينة، فبايعوا النبي ﷺ على السمع والطاعة ونصرته وحمايته كما يحمون نساءهم وأبناءهم، واختار منهم اثني عشر نقيبًا يقودون قومهم.','وكان ذلك سرًّا في ظلام الليل بعيدًا عن أعين قريش. وعاد الأنصار إلى المدينة، وبدأ المسلمون في مكة يهاجرون إليها فرادى وجماعات.'],
     q:[{q:'ما القبيلتان الكبيرتان في المدينة اللتان آمنتا؟',c:'الأوس والخزرج',w:['قريش وثقيف','هوازن وغطفان','أسلم وغفار'],n:'هما أصل الأنصار.'},{q:'كم نقيبًا اختار النبي ﷺ في بيعة العقبة الثانية؟',c:'اثني عشر',w:['سبعة','عشرة','سبعين'],n:'اختار اثني عشر نقيبًا من الأنصار.'}]},
   8:{p:['وكان أبو بكر قد أعدّ راحلتين واستأجر عبد الله بن أريقط دليلًا ماهرًا. وكان عبد الله بن أبي بكر ينقل لهما أخبار قريش ليلًا، وأسماء بنت أبي بكر تحمل لهما الطعام، وعامر بن فهيرة يمحو آثار الأقدام بغنمه.','وجعلت قريش مئة ناقة لمن يأتي بهما. ثم وصل ﷺ إلى قباء وأقام فيها أيامًا وبنى مسجدها، ثم دخل المدينة، وتُركت ناقته تسير حتى بركت في الموضع الذي بُني فيه المسجد النبوي.'],
     q:[{q:'من الصحابية التي حملت الطعام للنبي ﷺ وأبي بكر في الغار؟',c:'أسماء بنت أبي بكر',w:['أم سلمة','فاطمة الزهراء','حفصة بنت عمر'],n:'سُمّيت «ذات النطاقين».'},{q:'أي موضع وصله النبي ﷺ أولًا قبل دخول المدينة؟',c:'قباء',w:['أُحد','بدر','الطائف'],n:'بنى فيها مسجد قباء.'}]},
   9:{p:['وبُني المسجد من اللبن وجذوع النخل وسُقف بالجريد، وكانت بجواره بيوت النبي ﷺ، وخُصّص ركن منه للفقراء الذين لا مأوى لهم وهم أهل الصفة. وشُرع الأذان وكان بلال أول مؤذن.','وفي المدينة كُتبت وثيقة تنظّم العلاقة بين المسلمين وغيرهم من سكان المدينة، وتقوم على التعاون والدفاع المشترك وحفظ الحقوق.'],
     q:[{q:'من كان أول مؤذن في الإسلام؟',c:'بلال بن رباح',w:['مصعب بن عمير','أبو بكر الصديق','سلمان الفارسي'],n:'كان صوته ندِيًّا فاختاره النبي ﷺ.'},{q:'ما اسم الفقراء الذين سكنوا ركنًا في المسجد النبوي؟',c:'أهل الصفة',w:['أهل بدر','أهل العقبة','أهل الحديبية'],n:'كان الصحابة يتصدقون عليهم.'}]},
   10:{p:['وكان سبب الخروج قافلة أبي سفيان القادمة من الشام. فنجت القافلة لكن قريشًا خرجت بجيشها. فاستشار النبي ﷺ أصحابه، فقال المقداد بن عمرو إنهم لن يقولوا كما قال قوم موسى «اذهب أنت وربك فقاتلا»، ولكن يقاتلون عن يمينه وشماله. وأيّده سعد بن معاذ من الأنصار.','وانتهت المعركة بنصر المسلمين، وقُتل من كبار قريش جماعة منهم أبو جهل، وأُسر نحو سبعين. وعومل الأسرى معاملة حسنة، وكان فداء بعضهم تعليم أبناء المدينة القراءة والكتابة.'],
     q:[{q:'كم كان عدد المسلمين تقريبًا في بدر؟',c:'ثلاثمئة وبضعة عشر',w:['ألف','ثلاثة آلاف','مئة'],n:'كانوا قلة أمام نحو ألف مقاتل.'},{q:'ما كان فداء بعض الأسرى في بدر؟',c:'تعليم أبناء المدينة القراءة والكتابة',w:['القتل','مئة ناقة','الخروج من مكة'],n:'دليل على قيمة العلم في الإسلام.'}]},
   11:{p:['وكان سبب الفتح أن قريشًا وحلفاءها نقضوا صلح الحديبية بالاعتداء على خزاعة حليفة المسلمين، فخرج النبي ﷺ في نحو عشرة آلاف من أصحابه، ودخلوا مكة بلا قتال يُذكر في معظم جهاتها.','ثم دخل المسجد الحرام وطاف بالكعبة وأزال الأصنام وهو يقرأ: «جاء الحق وزهق الباطل إن الباطل كان زهوقًا». وأمّن الناس فقال: من دخل دار أبي سفيان فهو آمن، ومن أغلق بابه فهو آمن، ومن دخل المسجد فهو آمن.'],
     q:[{q:'كم كان عدد جيش المسلمين في فتح مكة تقريبًا؟',c:'عشرة آلاف',w:['ثلاثمئة','ألف','مئة ألف'],n:'كان أكبر جيش للمسلمين حتى ذلك الوقت.'},{q:'ماذا فعل النبي ﷺ بالأصنام حول الكعبة؟',c:'أزالها وكسرها',w:['تركها كما هي','نقلها إلى المدينة','أخفاها'],n:'طُهّرت الكعبة وعادت لعبادة الله وحده.'}]},
   12:{p:['ومن وصاياه ﷺ في الخطبة: «أيها الناس إن ربكم واحد وإن أباكم واحد، كلكم لآدم وآدم من تراب، لا فضل لعربي على أعجمي ولا لعجمي على عربي إلا بالتقوى». ونزل في عرفة قوله تعالى: «اليوم أكملت لكم دينكم وأتممت عليكم نعمتي ورضيت لكم الإسلام دينًا».','وقال ﷺ: «ليبلّغ الشاهد الغائب»، فحمل الصحابة الرسالة إلى من بعدهم. وسُمّيت حجة الوداع لأنه ودّع فيها الناس.'],
     q:[{q:'ما المعيار الذي ذكره النبي ﷺ للتفاضل بين الناس؟',c:'التقوى',w:['النسب','المال','اللون'],n:'«لا فضل لعربي على أعجمي إلا بالتقوى».'},{q:'ماذا أوصى ﷺ الحاضرين أن يفعلوا بما سمعوا؟',c:'يبلّغ الشاهد الغائب',w:['يكتموه','يحتفظوا به لأنفسهم','يؤجلوه للعام القادم'],n:'أمرهم بالتبليغ.'}]}
  };
  ST.forEach(function(x){const e=EX[x.id];x.p=x.p.concat(e.p);x.qs=[x.q].concat(e.q)});
  const IC={moon:'<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/><path d="M17 4v3M15.5 5.5h3"/>',book:'<path d="M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3zM5 18a3 3 0 0 1 3-3h11M9 7h6M9 10h4"/>',mount:'<path d="M2 20l6.5-11 4 6.5 3-4.5L22 20z"/><path d="M16 5a2 2 0 1 0 .01 0"/>',route:'<circle cx="5" cy="19" r="2"/><path d="M7 19h6a4 4 0 0 0 0-8h-2a4 4 0 0 1 0-8h5"/><path d="M19 3l2 2-2 2"/>',mosque:'<path d="M4 21V12h16v9M6 12a6 6 0 0 1 12 0M12 3v3M2 21h20M10 21v-4a2 2 0 0 1 4 0v4"/>',sun:'<path d="M3 19h18M6 19a6 6 0 0 1 12 0M12 6v3M4.6 10.6l2 2M19.4 10.6l-2 2"/>',check:'<path d="M5 12.5l4.5 4.5L19 7"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',star:'<path d="M12 2l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 16.5 6.1 20.1l1.7-6.7L2.5 8.9l6.9-.5z"/>'};
  function svg(k,w,cls){return '<svg class="'+(cls||'')+'" viewBox="0 0 24 24" width="'+(w||24)+'" height="'+(w||24)+'" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+'</svg>'}
  const LS='sr-';let VIEW=0,MODE='story',QI=0,ANS={};
  function stt(){if(!S.sira)S.sira={r:{},q:{}};return S.sira}
  function isRead(id){return !!stt().r[id]}
  function totalRead(){return ST.filter(function(x){return isRead(x.id)}).length}
  function nextUnread(){return ST.find(function(x){return !isRead(x.id)})}
  function shuf(a,seed){a=a.slice();let s=seed*9301+49297;for(let i=a.length-1;i>0;i--){s=(s*9301+49297)%233280;const j=Math.floor(s/233280*(i+1));const t=a[i];a[i]=a[j];a[j]=t}return a}
  function mins(x){const w=x.p.join(' ').split(/\s+/).length;return Math.max(1,Math.round(w/110))}

  function css(){if(document.getElementById('sira-css'))return;const s=document.createElement('style');s.id='sira-css';s.textContent=
   '.sr-wrap{padding-bottom:24px;animation:srin .35s ease both}@keyframes srin{from{opacity:.0;transform:translateY(8px)}to{opacity:1;transform:none}}'+
   '.sr-hero{position:relative;overflow:hidden;display:flex;align-items:center;gap:16px;background:radial-gradient(circle at 12% 120%,rgba(255,255,255,.16) 0 22%,transparent 23%),radial-gradient(circle at 92% -10%,rgba(255,255,255,.14) 0 26%,transparent 27%),linear-gradient(135deg,var(--accent-d),var(--accent));color:var(--on-accent);border-radius:26px;padding:20px 18px;margin-top:6px;box-shadow:0 8px 22px rgba(0,0,0,.16)}'+
   
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
   '.sr-body p+p{border-top:1px dashed var(--line);padding-top:14px}'+
   '.sr-fa{background:color-mix(in srgb,var(--gold) 14%,var(--surface));border:2px solid color-mix(in srgb,var(--gold) 45%,transparent);border-radius:22px;padding:14px 18px;margin-top:16px}'+
   '.sr-fa h4{margin:0 0 8px;font:800 1.08rem var(--display);color:var(--gold-t)}.sr-fa ul{margin:0;padding:0;list-style:none}.sr-fa li{position:relative;margin:8px 0;padding-inline-start:26px;line-height:1.9}.sr-fa li:before{content:"";position:absolute;inset-inline-start:4px;top:.75em;width:9px;height:9px;background:var(--gold-t);transform:rotate(45deg);border-radius:2px}'+
   '.sr-qz{margin-top:18px;background:var(--surface);border:2px solid var(--line);border-radius:22px;padding:14px 16px}.sr-qz h4{margin:0 0 8px;font:800 1.08rem/1.7 var(--display)}'+
   '.sr-o{display:block;width:100%;text-align:start;margin:9px 0;background:var(--bg,var(--surface));border:2px solid var(--line);border-radius:16px;padding:12px 14px;font:700 1rem var(--text);color:var(--fg);cursor:pointer;box-shadow:0 3px 0 var(--line)}'+
   '.sr-o:active:not(:disabled){transform:translateY(2px);box-shadow:none}'+
   '.sr-o.sr-ok{border-color:var(--accent);background:var(--accent-soft);box-shadow:0 3px 0 var(--accent)}.sr-o.sr-no{border-color:#c0392b;background:rgba(192,57,43,.12);box-shadow:0 3px 0 #c0392b}'+
   '.sr-ex{margin-top:8px;color:var(--muted);font-size:.95rem;line-height:1.8}'+
   '.sr-done{margin-top:18px;width:100%;background:var(--accent);color:var(--on-accent);border:0;border-radius:999px;padding:14px;font:800 1.05rem var(--display);cursor:pointer;box-shadow:0 4px 0 var(--accent-d)}.sr-done:active{transform:translateY(3px);box-shadow:none}'+
   '.sr-src{margin-top:14px;font-size:.78rem;color:var(--muted);line-height:1.7}'+
   '.sr-hero .moon{position:absolute;inset-inline-start:-14px;bottom:-30px;width:120px;height:120px;opacity:.1;color:#fff}'+
   '.sr-chh i svg{color:#fff}.sr-n svg{display:block}'+
   '.sr-banner .big{width:110px;height:110px;color:#fff;font-size:0}.sr-badge{display:inline-flex;align-items:center;gap:6px}'+
   '.sr-qh{display:flex;align-items:center;gap:6px;margin:10px 0 4px}.sr-dot{flex:1;height:8px;border-radius:8px;background:var(--line)}.sr-dot.on{background:var(--c)}.sr-dot.sr-ok{background:var(--accent)}.sr-dot.sr-no{background:#c0392b}'+
   '.sr-qn{font:700 .85rem var(--display);color:var(--muted);margin:8px 0 2px}.sr-qq{font:800 1.25rem/1.8 var(--display);margin:4px 0 10px}'+
   '.sr-res{text-align:center;padding:22px 14px}.sr-score{width:110px;height:110px;border-radius:50%;margin:6px auto 12px;display:grid;place-items:center;background:var(--c);color:#fff;font:800 2.2rem var(--display);box-shadow:0 6px 0 color-mix(in srgb,var(--c) 55%,#000)}'+
   '.sr-rl{list-style:none;margin:12px 0 0;padding:0;text-align:start}.sr-rl li{display:flex;gap:10px;align-items:flex-start;margin:8px 0;line-height:1.7}.sr-rl svg{flex:none;margin-top:3px}.sr-rl .g{color:var(--accent)}.sr-rl .b{color:#c0392b}'+
   '.sr-sec{background:var(--accent-soft);color:var(--accent-t);box-shadow:0 3px 0 var(--line)}'+
   '@media (prefers-reduced-motion:reduce){.sr-wrap,.sr-rd{animation:none}.sr-card{transition:none}}';
   document.head.appendChild(s)}

  function list(){
    const n=totalRead(),pct=Math.round(n/ST.length*100),nx=nextUnread();
    let h='<section class="sr-hero">'+svg('moon',120,'moon')+'<div class="sr-ring" style="--p:'+pct+'"><b>'+N(pct)+'%</b></div><div class="sr-ht"><h2>السيرة النبوية</h2><p>قرأت '+N(n)+' من '+N(ST.length)+' قصة</p>'+
      (nx?'<button class="sr-cont" data-sira="open" data-id="'+nx.id+'">'+(n?'تابع: ':'ابدأ: ')+esc(nx.t)+'</button>':'<button class="sr-cont" data-sira="open" data-id="1">أعد القراءة من البداية</button>')+'</div></section>'+
      '<p class="sr-note">قصص مبسّطة ومختصرة من سيرة ابن هشام وكتب السيرة. للتوسّع ارجع إلى كتب السيرة وأهل العلم.</p>';
    CH.forEach(function(c){
      const sts=ST.filter(function(x){return x.ch===c.id}),dn=sts.filter(function(x){return isRead(x.id)}).length;
      h+='<section class="sr-ch" style="--c:'+c.c+'"><div class="sr-chh"><i aria-hidden="true">'+svg(c.ic,26)+'</i><div><h3>'+N(c.id)+'. '+esc(c.t)+'</h3><small>'+esc(c.d)+'</small></div><em>'+N(dn)+'/'+N(sts.length)+'</em></div><div class="sr-list">';
      sts.forEach(function(x){h+='<button class="sr-card'+(isRead(x.id)?' done':'')+'" data-sira="open" data-id="'+x.id+'"><span class="sr-n">'+(isRead(x.id)?svg('check',22):N(x.id))+'</span><span class="sr-ct"><b>'+esc(x.t)+'</b><span>'+esc(x.s)+'</span></span><span class="sr-m">'+N(mins(x))+' د</span></button>'});
      h+='</div></section>'});
    return '<div class="sr-wrap">'+h+'</div>'}

  function head(x,c,sub){return '<div class="sr-banner"><span class="big" aria-hidden="true">'+svg(c.ic,110)+'</span><span class="sr-badge">'+svg(c.ic,16)+esc(c.t)+'</span><h2>'+esc(x.t)+'</h2><div class="sr-meta">'+sub+'</div></div>'}
  function story(id){
    const x=ST.find(function(y){return y.id===id});if(!x)return list();
    const c=CH.find(function(y){return y.id===x.ch});
    let h='<div class="sr-rd" style="--c:'+c.c+'"><div class="sr-bar"><i id="sr-pb"></i></div><button class="sr-back" data-sira="back">› رجوع للقصص</button>'+head(x,c,'قصة '+N(id)+' من '+N(ST.length)+' · '+N(mins(x))+' د قراءة')+'<div class="sr-body">';
    x.p.forEach(function(p){h+='<p>'+esc(p)+'</p>'});h+='</div>';
    h+='<div class="sr-fa"><h4>فوائد من القصة</h4><ul>'+x.f.map(function(f){return '<li>'+esc(f)+'</li>'}).join('')+'</ul></div>';
    h+='<button class="sr-done" data-sira="quiz" data-id="'+id+'">ابدأ الاختبار ('+N(x.qs.length)+' أسئلة)</button>'+
       '<div class="sr-src">المصدر: مختصر بتصرف من سيرة ابن هشام وكتب السيرة. النص مبسّط وبحاجة إلى مراجعة أهل العلم.</div></div>';
    return h}
  function quiz(id){
    const x=ST.find(function(y){return y.id===id}),c=CH.find(function(y){return y.id===x.ch}),a=ANS[id]||(ANS[id]=[]),n=x.qs.length;
    let h='<div class="sr-rd" style="--c:'+c.c+'"><button class="sr-back" data-sira="story" data-id="'+id+'">› رجوع للقصة</button>';
    if(QI>=n){
      const sc=x.qs.filter(function(q,i){return a[i]===q.c}).length;
      h+='<div class="sr-qz sr-res"><div class="sr-score">'+N(sc)+'/'+N(n)+'</div><h4>'+(sc===n?'ممتاز! أتقنت القصة':sc>=2?'أحسنت! أنت قريب من الإتقان':'حاول مرة أخرى بعد قراءة القصة')+'</h4><ul class="sr-rl">'+
        x.qs.map(function(q,i){const ok=a[i]===q.c;return '<li class="'+(ok?'g':'b')+'">'+svg(ok?'check':'x',18)+'<span style="color:var(--fg)">'+esc(q.q)+' <b>'+esc(q.c)+'</b></span></li>'}).join('')+'</ul></div>'+
        '<button class="sr-done" data-sira="done" data-id="'+id+'">'+(id<ST.length?'القصة التالية':'إنهاء')+'</button><button class="sr-o sr-sec" data-sira="retry" data-id="'+id+'" style="text-align:center">أعد الاختبار</button></div>';
      return h}
    const q=x.qs[QI],opts=shuf([q.c].concat(q.w),id*10+QI),p=a[QI];
    h+='<div class="sr-qh">'+x.qs.map(function(z,i){return '<span class="sr-dot'+(i<QI||(i===QI&&p!=null)?(a[i]===z.c?' sr-ok':' sr-no'):(i===QI?' on':''))+'"></span>'}).join('')+'</div>'+
       '<div class="sr-qz"><div class="sr-qn">سؤال '+N(QI+1)+' من '+N(n)+' · '+esc(x.t)+'</div><div class="sr-qq">'+esc(q.q)+'</div>';
    opts.forEach(function(o){const cls=p==null?'':(o===q.c?' sr-ok':(o===p?' sr-no':''));h+='<button class="sr-o'+cls+'" data-sira="ans" data-id="'+id+'" data-o="'+esc(o)+'"'+(p!=null?' disabled':'')+'>'+esc(o)+'</button>'});
    if(p!=null)h+='<div class="sr-ex">'+(p===q.c?'أحسنت! ':'الإجابة الصحيحة: '+esc(q.c)+'. ')+esc(q.n)+'</div><button class="sr-done" data-sira="next" data-id="'+id+'">'+(QI+1<n?'السؤال التالي':'عرض النتيجة')+'</button>';
    return h+'</div></div>'}

  window.pageSira=function(){css();const pg=document.getElementById('page');if(!pg)return;pg.innerHTML=VIEW?(MODE==='quiz'?quiz(VIEW):story(VIEW)):list()};
  document.addEventListener('click',function(e){
    const b=e.target.closest&&e.target.closest('[data-sira]');if(!b||typeof TAB==='undefined'||TAB!=='sira')return;
    const a=b.dataset.sira,id=+b.dataset.id,x=ST.find(function(y){return y.id===id});
    if(a==='open'){VIEW=id;MODE='story';pageSira();window.scrollTo(0,0)}
    else if(a==='back'){VIEW=0;MODE='story';pageSira();window.scrollTo(0,0)}
    else if(a==='story'){MODE='story';pageSira();window.scrollTo(0,0)}
    else if(a==='quiz'){MODE='quiz';ANS[id]=[];QI=0;pageSira();window.scrollTo(0,0)}
    else if(a==='retry'){ANS[id]=[];QI=0;pageSira();window.scrollTo(0,0)}
    else if(a==='ans'){const q=x&&x.qs[QI];if(!q||ANS[id][QI]!=null)return;ANS[id][QI]=b.dataset.o;
      if(b.dataset.o===q.c&&!stt().q[id+'_'+QI]){stt().q[id+'_'+QI]=1;addXP(5);try{SND.ok&&SND.ok()}catch(_){}save()}
      pageSira()}
    else if(a==='next'){QI++;pageSira();window.scrollTo(0,0)}
    else if(a==='done'){if(!isRead(id)){stt().r[id]=1;addXP(10);save();toast('أحسنت! +'+N(10)+' نقاط')}
      const nx=ST.find(function(y){return y.id>id&&!isRead(y.id)})||ST.find(function(y){return y.id===id+1});VIEW=nx&&nx.id!==id?nx.id:0;MODE='story';pageSira();window.scrollTo(0,0)}});
  window.addEventListener('scroll',function(){const b=document.getElementById('sr-pb');if(!b)return;const d=document.documentElement,m=d.scrollHeight-d.clientHeight;b.style.width=(m>0?Math.min(100,d.scrollTop/m*100):0)+'%'},{passive:true});
  /* تسجيل التبويب */
  TABS.splice(2,0,['sira','السيرة']);
  NAVI.sira='<path d="M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3zM5 18a3 3 0 0 1 3-3h11M9 7h6M9 10h4"/>';
  const _rp=renderPage;
  renderPage=function(){if(TAB!=='sira'){VIEW=0;MODE='story';return _rp()}
    if(pageTimer){clearInterval(pageTimer);pageTimer=0}try{document.body.dataset.tab=TAB}catch(e){}pageSira()};
  try{if(location.hash.slice(1)==='sira')TAB='sira'}catch(e){}
  renderNav();if(TAB==='sira')renderPage();
})();
