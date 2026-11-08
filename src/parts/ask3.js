/* ===== هدهد: ردّ منطقي حين لا يجد جوابًا في المحتوى ===== */
(function(){
  const _lh=localHtml;
  function lastQ(){const u=AS.filter(function(m){return m.r==='u'}).slice(-1)[0];return u?String(u.t):''}
  function p(t){return '<p>'+esc(t)+'</p>'}
  function chips(a){return '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">'+a.join('')+'</div>'}
  function qchip(x){return '<button class="bchip" data-act="ask-chip" data-q="'+esc(x)+'">'+esc(T(x))+'</button>'}
  function related(q){
    const qt=aTok(q);if(!qt.length)return '';
    const sc=[];
    ALL.forEach(function(l){
      const t=aTok(typeof l.title==='string'?l.title:(l.title&&(l.title.ar||l.title[0]))||'');if(!t.length)return;
      let h=0;qt.forEach(function(w){if(t.some(function(x){return x===w||(x.length>3&&w.length>3&&(x.indexOf(w)>=0||w.indexOf(x)>=0))}))h++});
      if(h)sc.push([h,l]);
    });
    sc.sort(function(a,b){return b[0]-a[0]});
    const top=sc.slice(0,3);if(!top.length)return '';
    return p(g3(['ربما تفيدك هذه الدروس:','These lessons may help:','Ces leçons peuvent vous aider :']))+chips(top.map(function(x){return '<button class="bchip" data-lesson="'+esc(x[1].id)+'">'+esc(T(x[1].title))+'</button>'}));
  }
  function calc(q){
    let s=String(q).replace(/[٠-٩]/g,function(d){return d.charCodeAt(0)-1632}).replace(/[×xX]/g,'*').replace(/÷/g,'/').replace(/،/g,'.').replace(/(كم|يساوي|احسب|ناتج|حاصل|ما هو|ما|=|\?|؟)/g,' ').trim();
    if(!/^[0-9+\-*/(). ]{3,40}$/.test(s)||!/[0-9]\s*[+\-*/]\s*[0-9(]/.test(s))return null;
    try{const v=Function('"use strict";return ('+s+')')();if(typeof v==='number'&&isFinite(v))return s.replace(/\s+/g,'')+' = '+(Math.round(v*1e6)/1e6)}catch(e){}
    return null;
  }
  const BASE=[['أركان الإسلام'],['فضل الصدقة'],['تفسير آية الكرسي'],['أركان الصلاة']];
  const baseChips=function(){return chips(BASE.map(function(x){return qchip(x[0])}))};
  function smart(q){
    const nq=aNorm(q).replace(/\s+/g,' ').trim();
    const c=calc(q);if(c)return '<p style="font-size:1.2rem;font-weight:800;direction:ltr;text-align:center">'+esc(c)+'</p>'+p(g3(['حساب سريع. أما أسئلة الدين فهي تخصصي.','Quick math. Religion questions are my specialty.','Petit calcul. Les questions de religion sont ma spécialité.']));
    const lat=(q.match(/[A-Za-zÀ-ÿ]/g)||[]).length;
    if(lat>=3&&lat>q.replace(/\s/g,'').length*.5)return p(g3(['أفهم الأسئلة بالعربية أفضل داخل التطبيق.','I understand questions in Arabic best inside the app.','Dans l’application, je comprends mieux les questions en arabe.']))+p(g3(['اكتب سؤالك بالعربية، أو اختر موضوعًا:','Type your question in Arabic, or pick a topic:','Écrivez votre question en arabe, ou choisissez un sujet :']))+baseChips()+p(g3(['وعند تفعيل الذكاء الاصطناعي يمكنني الإجابة بلغتك.','When AI is enabled I can answer in your language.','Avec l’IA activée, je peux répondre dans votre langue.']));
    if(/(معني|ما هو|ما هي|من هو|من هي|ما المقصود|ما تعريف|عرف)\s/.test(nq+' ')){
      const m=nq.match(/(?:معني|ما هو|ما هي|من هو|من هي|ما المقصود ب|ما تعريف|عرف)\s+(.{2,40})$/);const w=m?m[1]:'';
      return p(g3(['لم أجد «','I couldn’t find “','Je n’ai pas trouvé « '])+w+g3(['» في محتوى التطبيق.','” in the app content.',' » dans le contenu de l’application.']))+p(g3(['تأكد من كتابة الكلمة، أو أضف سياقها (مثل: معنى الكلمة في سورة كذا، أو في أي باب فقهي).','Check the spelling, or add context (e.g. its meaning in a surah or a topic).','Vérifiez l’orthographe ou ajoutez du contexte (par ex. son sens dans une sourate ou un thème).']))+related(q);
    }
    if(typeof RULING!=='undefined'&&RULING.test(nq))return p(g3(['هذه مسألة فقهية، وجوابها يتوقف على تفاصيل الحالة والمذهب والمكان، ولا أريد أن أفتيك بغير علم.','This is a jurisprudence question; the answer depends on the exact case, school of thought and place, and I don’t want to give a ruling without knowledge.','C’est une question juridique ; la réponse dépend du cas précis, de l’école et du lieu, et je ne veux pas émettre d’avis sans savoir.']))+p(g3(['القاعدة العامة المعتبرة: الأصل في العبادات التوقيف، والأصل في المعاملات والعادات الإباحة ما لم يرد دليل بالمنع.','A widely accepted principle: acts of worship are by textual proof only, while everyday dealings are permitted unless a proof forbids them.','Un principe largement admis : les actes d’adoration reposent sur un texte, tandis que les usages courants sont permis sauf preuve contraire.']))+p(g3(['اسأل عالمًا موثوقًا أو دار الإفتاء في بلدك لحكم حالتك.','Ask a trusted scholar or your country’s fatwa authority about your case.','Demandez à un savant de confiance ou à l’autorité de fatwa de votre pays.']))+related(q);
    if(/(حزين|مكتئب|ضايق|قلق|خايف|خائف|تعبان|زهقان|ملل|وحيد|مهموم|مشكله|يائس)/.test(nq))return p(g3(['أسأل الله أن يفرّج همّك. مشاعرك مهمة، ومن المفيد أن تحدّث شخصًا تثق به وتبتعد قليلًا عمّا يرهقك.','I ask God to ease your worry. Your feelings matter; talking to someone you trust and taking a short break can help.','Je prie Dieu d’alléger votre peine. Vos sentiments comptent ; parler à une personne de confiance et faire une pause peut aider.']))+p(g3(['ردّد: حسبي الله لا إله إلا هو عليه توكلت. وإن استمر الضيق أو اشتد فاطلب مساعدة مختص أو شخص قريب منك.','Say: God is sufficient for me; there is no god but Him; in Him I trust. If it persists or worsens, seek help from a professional or someone close.','Dites : Dieu me suffit ; nul dieu que Lui ; en Lui je place ma confiance. Si cela persiste ou s’aggrave, demandez l’aide d’un professionnel ou d’un proche.']));
    if(/(ماذا تستطيع|ماذا تفعل|ما الذي تعرفه|كيف تساعدني|ما وظيفتك|ما عملك)/.test(nq))return p(g3(['أبحث لك في دروس التطبيق والأحاديث والأذكار والقرآن وتفسيره، وأشرح لك بإيجاز، وأقترح عليك دروسًا وألعابًا.','I search the app’s lessons, hadith, remembrances, and the Quran with its tafsir, explain briefly, and suggest lessons and games.','Je cherche dans les leçons, hadiths, invocations et le Coran avec son tafsir, j’explique brièvement et je propose leçons et jeux.']))+baseChips();
    if(/(متي القياميه|متي القيامه|ماذا سيحدث|المستقبل|هل ساربح|هل سانجح|هل سينجح|توقع|برج)/.test(nq))return p(g3(['علم الغيب عند الله وحده، فلا أستطيع التنبؤ بالمستقبل. الذي يبقى بيدك: الأخذ بالأسباب والتوكل على الله.','Knowledge of the unseen belongs to God alone, so I can’t predict the future. What remains in your hands is taking the means and trusting God.','La science de l’invisible n’appartient qu’à Dieu ; je ne peux donc pas prédire l’avenir. Il vous reste de prendre les moyens et de placer votre confiance en Dieu.']));
    if(/(مباراه|كاس العالم|يفوز|كره القدم|برمجه|سياسه|انتخابات|فيلم|مسلسل|اغنيه|بورصه|عملات|رياضيات|فيزياء|كيمياء|وصفه|سعر)/.test(nq))return p(g3(['هذا خارج تخصصي؛ أنا هدهد مختص بتعليم الدين بلطف، وقد لا تكون إجابتي عنه دقيقة.','That’s outside my specialty; I’m a hoopoe focused on teaching religion gently, so my answer might not be accurate.','C’est hors de ma spécialité ; je suis une huppe dédiée à l’enseignement de la religion, ma réponse pourrait manquer de précision.']))+p(g3(['يمكنني مساعدتك في ما يتعلق بالقرآن والسنة والسيرة والعقيدة والفقه والأخلاق.','I can help with the Quran, Sunnah, Seerah, creed, fiqh and ethics.','Je peux aider sur le Coran, la Sunna, la Sîra, le credo, le fiqh et la morale.']))+baseChips();
    if(nq.length<4)return p(g3(['لم أفهم سؤالك جيدًا. هل تكتب لي سؤالًا أوضح؟','I didn’t quite get that. Could you write a clearer question?','Je n’ai pas bien compris. Pouvez-vous écrire une question plus claire ?']))+baseChips();
    return p(g3(['لم أجد جوابًا وافيًا في محتوى التطبيق.','I couldn’t find a full answer in the app content.','Je n’ai pas trouvé de réponse complète dans le contenu de l’application.']))+p(g3(['جرّب أن تسأل بكلمات أبسط وتذكر الموضوع (صلاة، صيام، سيرة، آية…)، فكلما كان السؤال محددًا كان جوابي أدق.','Try simpler words and name the topic (prayer, fasting, Seerah, a verse…); the more specific the question, the better my answer.','Essayez des mots plus simples en nommant le thème (prière, jeûne, Sîra, verset…) ; plus la question est précise, meilleure est ma réponse.']))+related(q)+baseChips()+p(g3(['وإن كان سؤالك مهمًّا فاسأل عالمًا موثوقًا.','And if your question is important, ask a trusted scholar.','Et si votre question est importante, demandez à un savant de confiance.']));
  }
  const _al=askLocal;
  askLocal=function(q,m,b){return Promise.resolve(_al(q,m,b)).then(function(r){try{if(calc(q))return Object.assign({},r,{used:false,parts:[]})}catch(e){}return r})};
  localHtml=function(r){
    if(r&&r.used)return _lh(r);
    try{return smart(lastQ())}catch(e){return _lh(r)}
  };
  /* تحسين موجّه الذكاء الاصطناعي: لغة السائل + صدق عند عدم المعرفة */
  const _ap=aiPrompt;
  aiPrompt=function(q,r){
    return _ap(q,r)+'\nتعليمات إضافية: أجب بلغة السائل نفسها (عربية أو إنجليزية أو فرنسية). إن لم تجد الجواب في المقاطع فأجب بما تعرفه بثقة وبمنطق واضح، وإن لم تكن متأكدًا فقل ذلك بصراحة واقترح مرجعًا أو عالمًا بدل التخمين. السؤال الخارج عن الدين أجب عنه بإيجاز ثم أرجِع الحديث بلطف إلى تعلّم الدين.';
  };
})();
