# النشر السريع
## موقع
مجلد `public/` جاهز بالكامل (PWA: manifest + sw + أيقونات + ملفات البيانات + الصفحات القانونية).
- Netlify: اسحب مجلد `public` إلى netlify.com/drop (أو اربط المستودع؛ `netlify.toml` جاهز، وتضمّ `netlify/functions/hoopoe.js`).
- الذكاء الاصطناعي الحقيقي: أضف متغير البيئة `ANTHROPIC_API_KEY` في Netlify (انظر docs/ai-setup.md).
- Firebase Hosting: `firebase deploy` (انظر FIREBASE_SETUP.md، وانسخ firebase-config.example.json إلى public/firebase-config.json بعد تعبئته).
## تطبيق أندرويد (Google Play)
بعد رفع الموقع على HTTPS: ادخل pwabuilder.com بالرابط، أو استعمل store/twa-manifest.json مع Bubblewrap. التفاصيل في docs/PWABUILDER.md وdocs/PLAY-STORE.md؛ وضع بصمة التوقيع في pwa/assetlinks.json.
مواد المتجر: مجلد store/ (أيقونة، لقطات، وصف).
## التعديل
عدّل `src/parts/*` ثم ./build.sh (لا تعدّل index.html مباشرة). قبل الإطلاق: مراجعة شرعية (docs/sharia_review.md) وخصوصية الأطفال والحقوق (docs/legal_review.md).
