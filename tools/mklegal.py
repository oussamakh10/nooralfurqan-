#!/usr/bin/env python3
# يولّد صفحات: privacy / terms / sources (ثلاث لغات) إلى pwa/ و public/
# قبل الإطلاق: ضع بريد التواصل الحقيقي في CONTACT ثم شغّل: python3 tools/mklegal.py
import json,re,os
CONTACT=os.environ.get('NF_CONTACT','')  # مثال: NF_CONTACT=contact@yourdomain.com
UPDATED='2026-10-29'
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src=open(os.path.join(root,'pwa/privacy.html'),encoding='utf8').read()
head=src[:src.index('<div class="dr"')]           # الترويسة والتنسيق والتنقل
head=head.replace('<a href="support.html">','<a href="sources.html">المصادر والتراخيص</a><a href="support.html">') if 'sources.html' not in head else head
def S(t,a,e,f):return [[t[0],t[1],t[2]],[a,e,f]]
PRIV=dict(t=["سياسة الخصوصية","Privacy Policy","Politique de confidentialité"],s=[
S(["من نحن","Who we are","Qui sommes-nous"],
 "«نور الفرقان» تطبيق تعليمي إسلامي مجاني، ناشره ومسؤول معالجة البيانات: خلوفي أسامة (الجزائر). التواصل: {MAIL}. تسري هذه السياسة على الموقع وتطبيق الويب المثبّت (PWA) وتطبيق أندرويد المبني منه. آخر تحديث: "+UPDATED+".",
 "“Nur al-Furqan” is a free Islamic learning app. The publisher and data controller is Khelloufi Oussama (Algeria). Contact: {MAIL}. This policy covers the website, the installed web app (PWA) and the Android app built from it. Last updated: "+UPDATED+".",
 "« Nur al-Furqan » est une application éducative islamique gratuite. L’éditeur et responsable du traitement est Khelloufi Oussama (Algérie). Contact : {MAIL}. Cette politique couvre le site, l’application web installée (PWA) et l’application Android qui en est issue. Dernière mise à jour : "+UPDATED+"."),
S(["مبدؤنا: أقل بيانات ممكنة","Our principle: minimum data","Notre principe : un minimum de données"],
 "لا نبيع بياناتك ولا نستعمل أدوات تحليل أو تتبّع أو إعلانات مخصّصة. التطبيق يعمل بدون حساب، وكل تقدّمك يبقى على جهازك افتراضيًا.",
 "We never sell your data and use no analytics, tracking or personalised advertising. The app works without an account and your progress stays on your device by default.",
 "Nous ne vendons jamais vos données et n’utilisons ni outil d’analyse, ni pistage, ni publicité personnalisée. L’application fonctionne sans compte et votre progression reste sur votre appareil par défaut."),
S(["ما نحفظه على جهازك","What is stored on your device","Ce qui est enregistré sur votre appareil"],
 "الاسم الذي تكتبه، وعمرك (رقم يحدد وضع الأطفال أو العادي)، والمدينة لأوقات الصلاة، والتقدّم والنقاط والإعدادات والمشتريات الافتراضية. يُحفظ في التخزين المحلي للمتصفح/الجهاز (localStorage) لأنه ضروري لعمل التطبيق، ولا يُرسل إلينا. تحذفه من الإعدادات أو بمسح بيانات التطبيق.",
 "The name you type, your age (a number that selects kids or standard mode), your city for prayer times, progress, points, settings and virtual purchases. It is kept in the browser/device local storage (localStorage), which is strictly necessary for the app to work, and is not sent to us. Delete it from Settings or by clearing the app data.",
 "Le prénom saisi, votre âge (un nombre qui choisit le mode enfant ou standard), votre ville pour les horaires de prière, la progression, les points, les réglages et les achats virtuels. Ces données sont conservées dans le stockage local (localStorage), strictement nécessaire au fonctionnement, et ne nous sont pas envoyées. Supprimez-les dans les Réglages ou en effaçant les données de l’application."),
S(["الحساب والمزامنة (اختياري، لمن بلغ 16 سنة فأكثر)","Account and sync (optional, age 16+)","Compte et synchronisation (facultatif, 16 ans et plus)"],
 "إن اخترت الدخول بحساب جوجل نحفظ على Firebase (Google LLC): معرّف الحساب، الاسم، البريد، التقدّم، وإدخالك في اللوحة الأسبوعية (الاسم والنقاط). الأساس القانوني: موافقتك، ويمكنك سحبها بتسجيل الخروج وحذف بياناتك. تُحفظ حتى تحذفها أنت، وإدخال اللوحة الأسبوعية يُستبدل كل أسبوع. قد تُعالَج البيانات على خوادم خارج الجزائر والاتحاد الأوروبي والمملكة المتحدة، وتعتمد Google ضمانات نقل قانونية (بنود تعاقدية نموذجية).",
 "If you choose to sign in with Google, Firebase (Google LLC) stores: account ID, name, email, progress and your weekly leaderboard entry (name and points). Legal basis: your consent, which you can withdraw by signing out and deleting your data. Data is kept until you delete it; the weekly leaderboard entry is replaced each week. Data may be processed on servers outside Algeria, the EU and the UK; Google relies on lawful transfer safeguards (standard contractual clauses).",
 "Si vous vous connectez avec Google, Firebase (Google LLC) enregistre : identifiant du compte, nom, e-mail, progression et votre entrée au classement hebdomadaire (nom et points). Base légale : votre consentement, que vous pouvez retirer en vous déconnectant et en supprimant vos données. Conservation jusqu’à suppression par vos soins ; l’entrée du classement est remplacée chaque semaine. Les données peuvent être traitées hors d’Algérie, de l’UE et du Royaume-Uni ; Google s’appuie sur des garanties de transfert licites (clauses contractuelles types)."),
S(["الأطفال","Children","Enfants"],
 "نطلب العمر في البداية. من هم دون 13 سنة يعملون بوضع الأطفال، ومن هم دون 16 سنة لا تُتاح لهم ميزات السحابة (تسجيل الدخول واللوحة الأسبوعية والتحدي المباشر)، فلا نجمع بياناتهم الشخصية على خوادمنا ولا نعرض لهم إعلانات مخصّصة. نشجّع ولي الأمر على مرافقة الطفل. إن علمت أن طفلًا أرسل بيانات دون إذن وليّه فراسلنا لنحذفها فورًا. نتبع روح قانون حماية البيانات الجزائري 18-07 واللائحة الأوروبية (المادة 8) والقانون الفرنسي (سن 15) ومدوّنة التصميم المناسب للعمر في بريطانيا.",
 "We ask for age at the start. Under-13s use kids mode, and under-16s do not get cloud features (sign-in, weekly leaderboard, live duels): we collect no personal data from them on our servers and show them no personalised ads. We encourage parents to accompany children. If you believe a child sent data without parental permission, contact us and we will delete it promptly. We follow Algerian data law 18-07, GDPR (Art. 8), French law (age 15) and the UK Age Appropriate Design Code.",
 "Nous demandons l’âge au départ. Les moins de 13 ans utilisent le mode enfant et les moins de 16 ans n’ont pas accès aux fonctions cloud (connexion, classement hebdomadaire, duels en direct) : nous ne collectons aucune donnée personnelle les concernant sur nos serveurs et n’affichons aucune publicité personnalisée. Nous encourageons l’accompagnement par un parent. Si un enfant a transmis des données sans accord parental, contactez-nous et nous les supprimerons rapidement. Nous suivons la loi algérienne 18-07, le RGPD (art. 8), la loi française (15 ans) et l’Age Appropriate Design Code britannique."),
S(["خدمات الأطراف الثالثة","Third-party services","Services tiers"],
 "عند استعمالك للميزات التالية يرى مزوّد الخدمة عنوان IP وبيانات الجهاز التقنية: (1) التلاوات من EveryAyah وMP3Quran. (2) ترجمة فرنسية للآيات من api.alquran.cloud عند طلبها. (3) خطوط Google Fonts عند فتح الموقع. (4) خدمة ntfy.sh لبدء التحدي المباشر بين جهازين (رمز مؤقت فقط، وهي معطّلة لمن هم دون 16). (5) Firebase إن سجّلت الدخول. لا نشارك معهم اسمك أو تقدّمك إلا ما ذُكر في (5). راجع سياساتهم الخاصة.",
 "When you use these features the provider sees your IP address and technical device data: (1) recitations from EveryAyah and MP3Quran; (2) French verse translation from api.alquran.cloud when requested; (3) Google Fonts when the site opens; (4) ntfy.sh to start a live duel between two devices (temporary code only; disabled for under-16s); (5) Firebase if you sign in. We share nothing else with them beyond (5). See their own policies.",
 "Lorsque vous utilisez ces fonctions, le prestataire voit votre adresse IP et des données techniques de l’appareil : (1) récitations d’EveryAyah et MP3Quran ; (2) traduction française des versets via api.alquran.cloud sur demande ; (3) Google Fonts à l’ouverture du site ; (4) ntfy.sh pour lancer un duel en direct entre deux appareils (code temporaire uniquement, désactivé pour les moins de 16 ans) ; (5) Firebase si vous vous connectez. Nous ne partageons rien d’autre avec eux, hormis (5). Voir leurs politiques."),
S(["الموقع والإشعارات والإعلانات","Location, notifications, ads","Localisation, notifications, publicités"],
 "الموقع التقريبي يُستعمل داخل جهازك فقط لأوقات الصلاة والقبلة بعد إذنك، ولا نخزّنه. الإشعارات اختيارية ويمكن إيقافها من الجهاز. لا توجد إعلانات حاليًا؛ وإن أضفنا إعلانات مكافِئة اختيارية فستكون غير مخصّصة ومعالَجة كموجّهة للأطفال حيث يلزم، وتُحدَّث هذه السياسة قبل ذلك.",
 "Approximate location is used on your device only, after your permission, for prayer times and qibla; we do not store it. Notifications are optional and can be turned off in your device. There are currently no ads; if we add optional rewarded ads they will be non-personalised and treated as child-directed where required, and this policy will be updated first.",
 "La localisation approximative est utilisée uniquement sur votre appareil, avec votre accord, pour les horaires de prière et la qibla ; nous ne la stockons pas. Les notifications sont facultatives et désactivables. Il n’y a actuellement aucune publicité ; si nous ajoutons des publicités récompensées facultatives, elles seront non personnalisées et traitées comme destinées aux enfants là où c’est requis, et cette politique sera mise à jour avant."),
S(["حقوقك","Your rights","Vos droits"],
 "لك الحق في الاطلاع على بياناتك وتصحيحها وحذفها وتقييد معالجتها وتسلّمها بصيغة قابلة للنقل والاعتراض وسحب الموافقة في أي وقت دون أثر رجعي. داخل التطبيق: الإعدادات ← نسخة احتياطية (تصدير)، «حذف بياناتي من السحابة»، وإعادة الضبط. أو راسلنا على {MAIL} ونردّ خلال 30 يومًا. لك الحق في الشكوى لدى السلطة المختصة: الجزائر: السلطة الوطنية لحماية المعطيات الشخصية (ANPDP)، فرنسا: CNIL، بريطانيا: ICO.",
 "You may access, correct, erase, restrict, port and object to the processing of your data and withdraw consent at any time without retroactive effect. In the app: Settings → Backup (export), “Delete my cloud data”, and reset. Or write to {MAIL}; we reply within 30 days. You may complain to your authority: Algeria: ANPDP (national authority for personal data protection); France: CNIL; UK: ICO.",
 "Vous pouvez accéder à vos données, les rectifier, les effacer, limiter leur traitement, les récupérer, vous opposer au traitement et retirer votre consentement à tout moment sans effet rétroactif. Dans l’application : Réglages → Sauvegarde (export), « Supprimer mes données cloud » et réinitialisation. Ou écrivez à {MAIL} ; réponse sous 30 jours. Vous pouvez saisir votre autorité : Algérie : ANPDP ; France : CNIL ; Royaume-Uni : ICO."),
S(["الأمان والتعديلات","Security and changes","Sécurité et modifications"],
 "نستعمل HTTPS وقواعد وصول صارمة في Firebase بحيث لا يقرأ أحد بياناتك الخاصة. لا يوجد نظام آمن بالكامل، ونُبلغ الجهات والمستخدمين المعنيين عند أي خرق وفق القانون. نعلن أي تغيير جوهري في هذه الصفحة وداخل التطبيق.",
 "We use HTTPS and strict Firebase access rules so nobody else can read your private data. No system is fully secure; we will notify authorities and affected users of any breach as the law requires. Material changes will be announced on this page and in the app.",
 "Nous utilisons HTTPS et des règles d’accès strictes sur Firebase afin que nul ne lise vos données privées. Aucun système n’est totalement sûr ; nous informerons les autorités et les utilisateurs concernés de toute violation comme la loi l’exige. Les changements importants seront annoncés sur cette page et dans l’application."),
])
TERMS=dict(t=["شروط الاستخدام","Terms of Use","Conditions d’utilisation"],s=[
S(["القبول والغرض","Acceptance and purpose","Acceptation et objet"],
 "باستعمالك «نور الفرقان» توافق على هذه الشروط وعلى سياسة الخصوصية. التطبيق مجاني وللتعلّم العام ولا يغني عن العلماء والمدارس والمساجد. من هم دون 18 سنة يستعملونه بمرافقة وليّ الأمر.",
 "By using “Nur al-Furqan” you accept these terms and the privacy policy. The app is free, for general learning, and does not replace scholars, schools or mosques. Users under 18 should use it with a parent or guardian.",
 "En utilisant « Nur al-Furqan », vous acceptez ces conditions et la politique de confidentialité. L’application est gratuite, destinée à l’apprentissage général, et ne remplace ni les savants, ni les écoles, ni les mosquées. Les moins de 18 ans l’utilisent avec un parent ou tuteur."),
S(["ليس فتوى","Not a fatwa","Pas une fatwa"],
 "المحتوى والمساعد تعليميّان. للمسائل الخاصة والخلافية راجع عالمًا موثوقًا أو جهة الإفتاء الرسمية في بلدك. نبذل جهدنا في الدقة ولا نضمن خلوّ المحتوى من الخطأ؛ وللإبلاغ عن خطأ استعمل صفحة الدعم وسنصحّحه.",
 "Content and the assistant are educational. For personal or disputed matters consult a trusted scholar or your country’s official fatwa authority. We strive for accuracy but cannot guarantee the content is error-free; report errors via the support page and we will correct them.",
 "Le contenu et l’assistant sont éducatifs. Pour les questions personnelles ou controversées, consultez un savant de confiance ou l’autorité officielle de fatwa de votre pays. Nous visons l’exactitude sans garantir l’absence d’erreurs ; signalez-les via la page d’assistance et nous les corrigerons."),
S(["القرآن والمحتوى والصوت","Quran, content and audio","Coran, contenus et audio"],
 "نص المصحف والتفاسير والترجمات والتلاوات ملك لأصحابها أو متاح بتراخيصه الموضحة في صفحة «المصادر والتراخيص»، ولا يجوز استعماله تجاريًا خارج تلك التراخيص. التلاوات تُبثّ من مواقع أصحابها ولا تُخزَّن هنا. تعليم الدروس والأسئلة وتصميم التطبيق محفوظ لمنشئه، ويجوز الاستعمال الشخصي والتعليمي غير التجاري. تُعامَل آيات القرآن بالتوقير: لا تُستعمل في ما يسيء إليها.",
 "The Quran text, commentaries, translations and recitations belong to their owners or are available under the licences listed on the “Sources and licences” page, and may not be used commercially outside them. Recitations are streamed from their owners’ sites and are not stored here. Lessons, questions and app design are reserved to the creator; personal and non-commercial educational use is welcome. Quranic verses must be treated with reverence.",
 "Le texte du Coran, les exégèses, traductions et récitations appartiennent à leurs ayants droit ou sont disponibles selon les licences indiquées sur la page « Sources et licences » ; tout usage commercial hors de ces licences est interdit. Les récitations sont diffusées depuis les sites de leurs propriétaires et ne sont pas stockées ici. Leçons, questions et conception de l’application sont réservées au créateur ; l’usage personnel et éducatif non commercial est bienvenu. Les versets coraniques doivent être traités avec respect."),
S(["النقاط والمتجر الافتراضي","Points and virtual shop","Points et boutique virtuelle"],
 "النقاط والقلوب والعناصر مكافآت افتراضية داخل التطبيق ولا قيمة نقدية لها ولا تُستبدل بمال، ولا يوجد شراء بمال حقيقي. قد نعدّل نظامها لتحسين التجربة.",
 "Points, hearts and items are virtual in-app rewards with no cash value, not exchangeable for money; there are no real-money purchases. We may adjust the system to improve the experience.",
 "Points, cœurs et objets sont des récompenses virtuelles sans valeur monétaire, non échangeables contre de l’argent ; il n’y a aucun achat en argent réel. Nous pouvons ajuster le système pour améliorer l’expérience."),
S(["الاستعمال المقبول","Acceptable use","Utilisation acceptable"],
 "يُمنع انتحال الآخرين، أو كتابة أسماء مسيئة في اللوحة، أو محاولة اختراق الخدمة أو التلاعب بالنقاط، أو استعمال التطبيق لإساءة أو كراهية. نحتفظ بحق إزالة المحتوى المخالف وإيقاف الوصول إلى ميزات السحابة.",
 "You must not impersonate others, use offensive names on the leaderboard, try to hack the service or cheat with points, or use the app for abuse or hate. We may remove offending content and suspend access to cloud features.",
 "Il est interdit d’usurper une identité, d’utiliser des noms offensants au classement, de tenter de pirater le service ou de tricher sur les points, ou d’utiliser l’application pour des abus ou de la haine. Nous pouvons retirer les contenus fautifs et suspendre l’accès aux fonctions cloud."),
S(["المسؤولية","Liability","Responsabilité"],
 "يُقدَّم التطبيق «كما هو» دون ضمانات، وفي الحدود التي يسمح بها القانون لا نتحمل مسؤولية أضرار غير مباشرة أو انقطاع الخدمة. لا يُقيَّد أي حق إلزامي تمنحه لك قوانين حماية المستهلك في بلدك.",
 "The app is provided “as is” without warranties and, to the extent the law permits, we are not liable for indirect damages or service interruptions. Nothing limits any mandatory right you have under consumer law in your country.",
 "L’application est fournie « en l’état » sans garantie et, dans les limites de la loi, nous déclinons toute responsabilité pour les dommages indirects ou interruptions. Rien ne limite les droits impératifs dont vous bénéficiez en droit de la consommation dans votre pays."),
S(["القانون والتواصل","Governing law and contact","Droit applicable et contact"],
 "تخضع هذه الشروط للقانون الجزائري، مع بقاء الحقوق الإلزامية للمقيمين في فرنسا والمملكة المتحدة وحقهم في اللجوء إلى محاكم بلدهم. لأي استفسار: {MAIL}. قد نعدّل الشروط وننبّه إلى ذلك في التطبيق.",
 "These terms are governed by Algerian law, without affecting mandatory rights of residents of France and the UK, including the right to go to their local courts. Questions: {MAIL}. We may update the terms and will notify you in the app.",
 "Ces conditions sont régies par le droit algérien, sans préjudice des droits impératifs des résidents de France et du Royaume-Uni, y compris la saisine des tribunaux de leur pays. Questions : {MAIL}. Nous pouvons modifier les conditions et vous en informerons dans l’application."),
])
SRC=dict(t=["المصادر والتراخيص","Sources and licences","Sources et licences"],s=[
S(["نص المصحف","Quran text","Texte coranique"],
 "الرسم العثماني من مشروع تنزيل (Tanzil.net)، عبر مستودع quran-json. يُستعمل وفق رخصة تنزيل التي تشترط نسخ النص دون تغيير وذكر المصدر وإبقاء الرابط tanzil.net.",
 "Uthmani text from the Tanzil project (Tanzil.net), via the quran-json repository, used under the Tanzil licence: text must be reproduced unchanged with attribution and a link to tanzil.net.",
 "Texte othmani du projet Tanzil (Tanzil.net), via le dépôt quran-json, utilisé selon la licence Tanzil : texte reproduit sans modification, avec attribution et lien vers tanzil.net."),
S(["التفاسير والترجمات","Commentaries and translations","Exégèses et traductions"],
 "التفسير الميسر (مجمع الملك فهد لطباعة المصحف الشريف) وتفسير الجلالين، من مستودع tafsir_api. الترجمة الإنجليزية: Pickthall. الترجمة الفرنسية: Hamidullah عبر api.alquran.cloud وتُجلب عند الطلب. حقوق كل منها لأصحابها؛ وجارٍ التحقق من شروط إعادة الاستعمال لكل مصدر قبل الإطلاق العام.",
 "Al-Muyassar (King Fahd Complex) and Tafsir al-Jalalayn, from the tafsir_api repository. English translation: Pickthall. French translation: Hamidullah via api.alquran.cloud, fetched on demand. Rights belong to their owners; reuse terms of each source are being verified before public launch.",
 "Al-Muyassar (Complexe du Roi Fahd) et Tafsir al-Jalalayn, depuis le dépôt tafsir_api. Traduction anglaise : Pickthall. Traduction française : Hamidullah via api.alquran.cloud, chargée à la demande. Les droits appartiennent à leurs ayants droit ; les conditions de réutilisation de chaque source sont en cours de vérification avant le lancement public."),
S(["التلاوات","Recitations","Récitations"],
 "تُبثّ مباشرة من EveryAyah.com وMP3Quran.net ولا تُنسخ ولا تُخزَّن على خوادمنا. الحقوق للقرّاء ومواقعهم؛ ونلتزم بإزالة أي قارئ بطلب منه أو من موقعه.",
 "Streamed directly from EveryAyah.com and MP3Quran.net; never copied or stored on our servers. Rights belong to the reciters and their sites; we will remove any reciter on request.",
 "Diffusées directement depuis EveryAyah.com et MP3Quran.net ; jamais copiées ni stockées sur nos serveurs. Les droits appartiennent aux récitateurs et à leurs sites ; nous retirerons tout récitateur sur demande."),
S(["الدروس والأسئلة","Lessons and questions","Leçons et questions"],
 "كتبها منشئ التطبيق من مبادئ متفق عليها وبعض المناهج العامة، وهي قيد المراجعة الشرعية على يد أهل العلم. المراجع المعتمدة: القرآن والسنة الصحيحة وكتب أهل العلم المعروفة.",
 "Written by the app’s creator from agreed fundamentals and general curricula, and under scholarly review. References: the Quran, authentic Sunnah and well-known works of scholars.",
 "Rédigées par le créateur à partir de principes consensuels et de programmes généraux, et en cours de relecture par des savants. Références : le Coran, la Sunna authentique et des ouvrages savants reconnus."),
S(["الخطوط والمكتبات","Fonts and libraries","Polices et bibliothèques"],
 "خطوط Amiri Quran وBaloo Bhaijaan 2 وReem Kufi وTajawal من Google Fonts (رخصة SIL OFL). Firebase JS SDK (رخصة Apache 2.0). لا نستعمل صورًا لأشخاص حقيقيين.",
 "Fonts Amiri Quran, Baloo Bhaijaan 2, Reem Kufi and Tajawal from Google Fonts (SIL OFL). Firebase JS SDK (Apache 2.0). We use no photos of real people.",
 "Polices Amiri Quran, Baloo Bhaijaan 2, Reem Kufi et Tajawal de Google Fonts (SIL OFL). SDK JS Firebase (Apache 2.0). Nous n’utilisons aucune photo de personnes réelles."),
])
def build(name,D):
    D=json.loads(json.dumps(D).replace('{MAIL}',CONTACT or '[contact email]'))
    data=json.dumps(D,ensure_ascii=False)
    mail_note='' if CONTACT else '<!-- TODO: set NF_CONTACT -->'
    tail='''<div class="dr" id="dr"></div><h1 id="h"></h1><div id="b"></div></main><script>
var L=(function(){var n=(navigator.language||'ar').slice(0,2);return n==='fr'?2:n==='en'?1:0})();
var D=%s;
function r(){document.documentElement.lang=['ar','en','fr'][L];document.documentElement.dir=L?'ltr':'rtl';document.title=D.t[L]+' — Nur al-Furqan';document.getElementById('h').textContent=D.t[L];
document.getElementById('dr').textContent=['آخر تحديث: %s — تنبيه: هذه الوثيقة لا تغني عن استشارة قانونية.','Last updated: %s — This document is not a substitute for legal advice.','Dernière mise à jour : %s — Ce document ne remplace pas un avis juridique.'][L];
document.getElementById('b').innerHTML=D.s.map(function(s){return '<h2>'+s[0][L]+'</h2><p>'+s[1][L]+'</p>'}).join('')}
document.querySelectorAll('nav button').forEach(function(b){b.onclick=function(){L=+b.dataset.l;r()}});r();
</script></body></html>'''%(data,UPDATED,UPDATED,UPDATED)
    for d in ('pwa','public'):
        open(os.path.join(root,d,name),'w',encoding='utf8').write(head+mail_note+tail)
build('privacy.html',PRIV);build('terms.html',TERMS);build('sources.html',SRC)
for d in ('pwa','public'):  # نضمن رابط المصادر في تنقّل الصفحات الأخرى
    for f in ('support.html','welcome.html','delete-account.html'):
        p=os.path.join(root,d,f)
        if os.path.exists(p):
            s=open(p,encoding='utf8').read()
            if 'sources.html' not in s and '<a href="support.html">' in s:
                open(p,'w',encoding='utf8').write(s.replace('<a href="support.html">','<a href="sources.html">المصادر والتراخيص</a><a href="support.html">',1))
print('ok')
