# نور الفرقان — تعليمات للمتابعة

موقع إسلامي تعليمي على طريقة دولينجو، RTL عربي، ملف HTML واحد مبني من `src/parts/`.
- البناء: `./build.sh` ينتج `public/index.html`. لا تعدّل index.html مباشرة.
- ملفات البيانات: `public/quran.json` و`muy.json` (الميسر) و`jal.json` (الجلالين) و`en.json` (Pickthall).
- المنشئ: «خلوفي أسامة». الأرقام لاتينية (0-9) والنص عربي.
- ترتيب دمج الملفات في build.sh مهم.
- الهدهد: `src/parts/hoopoe.js` يحوي الشكل الجديد (hoopoeNew) والقديم (hoopoeOld)؛ المستخدم يبدّل من الإعدادات (`S.hpv`).
  الشكل القديم محفوظ أيضًا في `archive/hoopoe_old_owl.js`.
- المحتوى: 23 وحدة، 109 درس، نحو 1013 سؤالًا (`lessons*.js`, `new_*.js`). صيغة السؤال: `{q,c,w:[3],n}` أو `{t:'ord',q,items,n}`.
- المنصة السابقة (claude.ai Artifact) كانت توفر `claude.use("db"|"user"|"room"|"sample"|"downloads")`؛ في الاستضافة الحقيقية
  يجب استبدالها بـ Firebase (Auth بجوجل، Firestore للتقدم/المتصدرين، FCM للتنبيهات) — الكود يتعامل معها بحيث تكون `null` عند الغياب.
- قبل الإطلاق العام: مراجعة شرعية للمحتوى، وخصوصية الأطفال (<13/<16)، وحقوق مصادر الصوت.
- اختبار: `python3 -m http.server 8765 -d public` ثم `tools/smoke4.py` (Playwright).
