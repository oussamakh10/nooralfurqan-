# Reel Studio — نور الفرقان (instagram reels, 1080x1920, 30fps, ≤29.8s)

Free tools only: Playwright canvas (deterministic `render(t)`), ffmpeg, numpy audio. No network, no installs.

## Quick start
```
cd promo/studio
python3 build.py new my_story            # scaffold stories/my_story/{story.js,audio.py,notes.md}
python3 build.py shot my_story 0.1 2 5 9 14 19.5 22.5 25   # -> out/my_story_sheet.png  (LOOK at it, fix, repeat)
python3 build.py render my_story         # ~50s: 2 parallel chunks + audio + mux + QA  -> out/my_story.mp4
python3 tools/snap_app.py "ask:اسأل هدهد" "lesson:تعلّم>الدرس التالي"   # new real app screenshots -> assets/app/
```
Then deliver with SendUserFile, brief Arabic report (idea, caption+2-3 hashtags, honest QA, verses/hadith to verify).

## Layout
- `lib/00_core.js` math/easing/`kf` keyframes, camera (`CFG.cam`, `CFG.shakes`), text (`kt` kinetic, `caps` sentence captions, `pill`, `bubble`, `thought`), fx (`burst`,`confetti`,`ripple`,`floatText`), **midcta** (like/follow card) and **endc** (end card: bio-link button, dev card, pills, follow badge) — all driven by `CFG`.
- `lib/10_chars.js` neon stick figures: `char(id,{x,y,face,keys,path,expr,talk,prop})`. Cast: omar(cap) sara(hijab) kid(small,spiky) dad(kufi+beard) teacher(glasses+beard) granny student(headphones) friend. Same body, accessories/colours differ. Poses: idle point cheer think sad shy talk shrug hold wave walk (auto walk cycle when `path` moves). Expressions: smile open sad wow flat think. Props: phone book tasbih cup. `say()` `think()` bubbles anchored to head.
- `lib/20_bg.js` backgrounds `CFG.bg`: night mosque city desert rain room dawn orbit space (all animated, neon floor at `CFG.GY`). Add new ones as `BG.name=t=>{...}`.
- `lib/30_phone.js` `phone()` mock with real screenshots (crossfade screens, taps, highlights) + `arrowUp()`.
- `lib/99_render.js` master order: BG → camera{ S.world, chars, bubbles, S.front } → TOP → S.over → midcta → caps → handle → endc.
- `audiolib.py` synth helpers + `music('calm'|'pulse'|'epic')`, `branch(t)`, `ding`, `tap`, `correct`, `wrong`, `midcta_cues`, `endcard_cues`, `sfx(file,t)`, `bed(name,t0,t1,v)` (ambient: breeze rain desert-wind crickets…), `finish('a.wav')`.
- `assets/` fonts (Tajawal 800 `TJ`, Scheherazade `SCH` for ayat), `app/` screenshots, `hoopoe/` mascot svgs, `sfx/` ogg/wav + beds.
- `build.py` CLI; `CATALOG.md` list of every video made (story+method) — **check before choosing a new idea**.

## Standing rules (from the user)
Hook in frame 1 with motion (a question) · whole-sentence captions one after another (never word by word) · all text y 300–1500 · new background + new story AND method each video (avoid door/arch/rays) · neon stick figures, no running in calm stories, same-body characters told apart by accessories · mid-video like/follow card (18.2–21.2, keep scene empty there) · end card with bio-link button «جرّب الموقع الآن — الرابط في البايو», dev card «التطبيق لم يكتمل بعد 🛠️ / عندك فكرة؟ اكتب في التعليقات 💡», small «تابع الصفحة ➕ واضغط ❤️» badge, only «أرسله…» «احفظه…» pills (NO «اكتب في التعليقات» pill) · "what-if" opening for app ads (likely / best / surprise / no-regret action) · Arabic text, Western digits · reply to the user in brief Arabic.
Honest QA every time (what was looked at / not watched / not listened). Flag any verse/hadith written from memory; recommend sharia review. App facts: use numbers shown in the real app screenshots (currently 31 units / 183 lessons), not CLAUDE.md. Posting only via Metricool after explicit confirmation + public file URL (best 10:00 & 18:00 Africa/Algiers).

## Story checklist (content-principles)
One viewer in mind · open a curiosity loop in frame 1 · sentences < 9 words · each line sells the next · second loop at ~60–70% · save/share trigger · loop-friendly ending.

## Known limits / next upgrades (see HANDOFF below)
No voice-over (no TTS offline) · faces are simple · 2 CPU cores (render ≈ 50s).
