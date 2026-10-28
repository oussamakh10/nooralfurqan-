# تحويل «نور الفرقان» إلى APK و AAB عبر PWABuilder

## 0) قبل البدء (مرة واحدة)
1. ارفع آخر `nur-alfurqan-site.zip` إلى Netlify (سحب وإفلات في Deploys).
2. تأكد أن الموقع يفتح على رابط https ثابت، وأن حماية الدخول (SSO/Password) معطّلة.
3. المضيف في هذا الدليل: `nooralfurqan.netlify.app`. إن كان رابطك مختلفًا فبدّله في كل مكان.

## 1) فحص الموقع
1. افتح https://www.pwabuilder.com والصق رابط موقعك ثم **Start**.
2. المطلوب: Manifest ✔، Service Worker ✔، Security ✔. (جاهزة في الملف.)
3. اضغط **Package for stores** ثم بطاقة **Android**.

## 2) القيم التي تُدخلها في نموذج Android
| الحقل | القيمة |
|---|---|
| Package ID | `com.nooralfurqan.app` (لا يتغير بعد النشر) |
| App name | نور الفرقان |
| Short name / Launcher name | نور الفرقان |
| App version | `1.0.0.0` |
| Version code | `1` (يزيد بواحد مع كل تحديث) |
| Host | `nooralfurqan.netlify.app` |
| Start URL | `/index.html` |
| Display mode | Standalone |
| Orientation | Portrait |
| Status bar color | `#0f3b3a` |
| Navigation bar color | `#0f3b3a` |
| Background color | `#0b3330` |
| Splash screen fade out | 300 |
| Icon URL | `https://nooralfurqan.netlify.app/icon-512.png` |
| Maskable icon URL | `https://nooralfurqan.netlify.app/icon-maskable-512.png` |
| Monochrome icon | اتركه فارغًا |
| Fallback behavior | Custom Tabs |
| Enable notification delegation | إيقاف (حتى يُربط FCM) |
| Enable location delegation | **تشغيل** (أوقات الصلاة والقبلة) |
| Google Play Billing | إيقاف |
| Include app shortcuts | تشغيل |
| Signing key | **Create new** |

عند **Create new** أدخل: Key alias = `nooralfurqan`، وكلمة سر قوية للمفتاح وللملف. 

## 3) التنزيل
اضغط **Generate** ثم **Download**. الملف المضغوط يحتوي:
- `*.apk` : للتثبيت المباشر على هاتفك وتجربته (فعّل «تثبيت من مصادر غير معروفة»).
- `*.aab` : للرفع إلى Google Play.
- `signing.keystore` و `signing-key-info.txt` : **احتفظ بهما في مكان آمن ونسخة احتياطية.** فقدانهما يمنعك من تحديث التطبيق.
- `assetlinks.json` : فيه بصمة SHA-256 جاهزة.

## 4) ربط الموقع بالتطبيق (يخفي شريط المتصفح)
1. افتح `assetlinks.json` الذي نزّلته وانسخ بصمة SHA-256 منه.
2. افتح في مشروعك الملف `pwa/assetlinks.json` وضع البصمة مكان `ضع_بصمة_SHA256_من_PWABuilder_هنا`.
3. عند رفع الـ AAB في Play Console (مع Play App Signing) ستجد بصمة ثانية في **App integrity ← App signing key certificate**؛ ضعها مكان السطر الثاني.
4. أعد بناء الحزمة (`bash mkdeploy.sh`) وارفعها إلى Netlify.
5. تحقق أن الرابط يعمل: `https://nooralfurqan.netlify.app/.well-known/assetlinks.json`
6. إن ظهر شريط المتصفح أعلى التطبيق فالبصمة غير مطابقة.

## 5) النشر في Google Play
1. حساب مطوّر (25$ مرة واحدة): https://play.google.com/console
2. تطبيق جديد ← ارفع `*.aab` في **Internal testing** أولًا، وجرّبه على هاتفك.
3. أكمل: سياسة الخصوصية (`/privacy.html`)، أمان البيانات، تصنيف المحتوى، الفئة: Education.
4. النصوص والصور: `docs/PLAY-STORE.md` و`store/`.

## ملاحظات
- التطبيق الآن يحوي إعلانات مكافأة (قلوب ونقاط). في نسخة TWA لا يعمل الإعلان الحقيقي إلا بربط AdMob، وإلا يبقى معطّلًا ويظهر «الإعلانات غير متاحة». صفحة Play يجب ألا تقول «بلا إعلانات» عند تفعيلها.
- قبل الإطلاق العام: مراجعة شرعية، خصوصية الأطفال، حقوق مصادر الصوت، وبريد الدعم في صفحات السياسات.
- كل تحديث لمحتوى الموقع يصل المستخدمين تلقائيًا دون إعادة بناء الـ APK؛ تعيد البناء فقط عند تغيير الأيقونة أو الاسم أو الإعدادات.
