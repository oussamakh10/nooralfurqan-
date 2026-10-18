# تفعيل ربط Google والمزامنة (Firebase) — من الهاتف

1. افتح https://console.firebase.google.com وسجّل بحساب Google، ثم **Add project** (اسمه مثلاً nur-alfurqan). يمكنك تعطيل Google Analytics.
2. **Build ← Authentication ← Get started ← Sign-in method ← Google ← Enable** (اختر بريد الدعم) ← Save.
3. **Authentication ← Settings ← Authorized domains ← Add domain**: أضف نطاق موقعك، مثل `nur-alfurqan-bw7d.netlify.app` (وأي نطاق آخر ستستخدمه).
4. **Build ← Firestore Database ← Create database** (Production mode، واختر أقرب منطقة).
5. في تبويب **Rules** الصق محتوى الملف `firestore.rules` ثم **Publish**.
6. **Project settings (أيقونة الترس) ← Your apps ← أيقونة الويب `</>` ← Register app** ← انسخ قيم `firebaseConfig` (apiKey, authDomain, projectId, appId).
   هذه المفاتيح عامة وليست أسراراً؛ أمانك في القواعد (الخطوة 5) والنطاقات (الخطوة 3).
7. أرسل القيم الأربع إلى Claude، فيضعها في ملف `firebase-config.json` وينشر التحديث. أو أنشئ الملف بنفسك بجانب `index.html` على نمط `firebase-config.example.json`.
