# نشر «نور الفرقان» على Google Play (TWA عبر PWABuilder)

## قبل البدء (عليك)
1. دومين ثابت يعمل بـ HTTPS (مثل nooralfurqan.com) مرتبط بـ Netlify، وحماية SSO معطّلة.
2. حساب مطوّر Google Play (25$ مرة واحدة): https://play.google.com/console
3. ضع بريد الدعم في `pwa/privacy.html` و`terms.html` و`support.html` (ابحث عن `[ضع بريد الدعم هنا]`) أو عدّل `store/mkpages.py` وشغّله.
4. مراجعة شرعية وقانونية، وإكمال نموذج «أمان البيانات» و«تصنيف المحتوى» في Play Console.

## الخطوات
1. افتح https://www.pwabuilder.com وأدخل رابط الموقع، تأكد أن الفحص ناجح (Manifest + Service Worker + Icons).
2. اختر Android ← Google Play. أدخل:
   - Package ID: `com.nooralfurqan.app` (لا يتغير بعد النشر)
   - App name: نور الفرقان | Launcher name: نور الفرقان
   - Version: 1 | Display: standalone | Signing key: «New» واحفظ ملف الـ keystore وكلمة السر في مكان آمن (فقدانه يمنع التحديث).
3. نزّل الحزمة: تحتوي `.aab` للرفع، و`assetlinks.json`.
4. ضع `assetlinks.json` في الموقع على المسار `/.well-known/assetlinks.json` (انظر القالب أدناه، وبصمة SHA-256 تأخذها من Play Console ← App integrity أو من PWABuilder).
5. ارفع الـ `.aab` في Play Console كاختبار داخلي أولًا، جرّبه على هاتفك، ثم الإنتاج.

## قالب assetlinks.json
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.nooralfurqan.app",
    "sha256_cert_fingerprints": ["ضع_بصمة_SHA256_هنا"]
  }
}]
```
على Netlify أضف في `_headers`: `/.well-known/assetlinks.json` مع `Content-Type: application/json`.

## نصوص صفحة المتجر
**الاسم:** نور الفرقان — تعلّم الإسلام بمتعة
**وصف قصير (80):** تعلّم القرآن والعقيدة والفقه بالألعاب مع الهدهد، مجانًا وبدون إنترنت.
**وصف كامل:**
نور الفرقان تطبيق تعليمي إسلامي على طريقة الألعاب. دروس قصيرة تتدرج من الأساسيات، وأكثر من ألف سؤال، ومصحف كامل مع التفسير الميسر والجلالين وترجمة لمعاني الآيات، وتلاوات بأصوات قرّاء متعددين، وأذكار وسبحة وأوقات صلاة، و«المدرسية» لمراجعة العلوم الإسلامية للسنة الثالثة ثانوي مع اختبارات وشهادات، ومساعد «هدهد» يجيب من محتوى التطبيق. بثلاث لغات: العربية والإنجليزية والفرنسية. مجاني (يحوي إعلانات مكافأة اختيارية). المحتوى تعليمي وليس فتوى.
**Short:** Learn Quran, creed and fiqh with games and Hoopoe. Free, works offline.
**Court (FR):** Apprenez le Coran et l’islam en jouant avec la huppe. Gratuit, hors ligne.
**التصنيف:** تعليم (Education) | الفئة العمرية: للجميع (مع مراجعة نموذج المحتوى).
**روابط:** الخصوصية `/privacy.html` — الدعم `/support.html`.
**الصور:** `shot-1..3.png` (540x1170) تصلح كبداية؛ تحتاج Play أيضًا صورة ميزة 1024x500 وأيقونة 512 (`icon-512.png`).

## ملاحظة App Store
آبل ترفض عادة التطبيقات التي هي موقع ملفوف فقط. الأفضل تأجيله، وتشجيع مستخدمي الآيفون على «إضافة إلى الشاشة الرئيسية» (دليل التثبيت داخل التطبيق).
