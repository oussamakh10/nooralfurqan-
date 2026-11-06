# تفعيل الهدهد الذكي (Claude)

1. أنشئ مفتاحًا من console.anthropic.com (API Keys) وضع رصيدًا صغيرًا.
2. في Netlify: Site configuration ← Environment variables:
   - `ANTHROPIC_API_KEY` = المفتاح (سرّي)
   - `NF_MODEL` = اختياري (الافتراضي claude-haiku-5-5)
   - `NF_ORIGIN` = اختياري، رابط موقعك لتقييد الأصل
3. انشر عبر ربط المستودع بـ Netlify (أو `netlify deploy --prod` بعد `npm i -g netlify-cli`).
   السحب والإفلات للمجلد لا ينشر الدوال.
4. الدالة: `netlify/functions/hoopoe.js` → `/.netlify/functions/hoopoe`، حدّ 12 طلبًا/دقيقة لكل عنوان.
5. الأطفال (<13) لا يستعملون الذكاء الاصطناعي ولا يُرسل لهم شيء؛ والتطبيق يعود للبحث المحلي عند الفشل أو انقطاع الإنترنت.
6. حدّث سياسة الخصوصية: نصوص أسئلة البالغين تُرسل إلى Anthropic لتوليد الرد.
