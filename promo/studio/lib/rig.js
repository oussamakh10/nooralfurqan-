// Free from @barakahraaz on Instagram. Not for sale.
// stick-rig.js: rim-lit stick figures, moods and 2D effects on a canvas, for /mg-reel pages.
// Ported 2026-10-30 from the aiTrends 2D Studio plugin (engine/styles.js, core.js, rig2d.js, fx2d.js), unchanged
// except module wrapping and one added option: drawFigure({faceless: true}) draws no face (companions). Its music generator, renderer and UI are not included. No licence came with it:
// fine for our own reels, ask the author before putting it in a kit that is sold.
// Use: <script src="stick-rig.js"></script>, then const { E, setStyle, drawFigure, POSES, ... } = RIG.
// Added (all opt-in, defaults unchanged): walkAcross (planted feet that never slide), hand 'nub'|'mitten'|'glove' + glove() close-up that can grip an object, faceAt (expression on a word, seeded 3-frame blinks every 3.5 to 4 s), ease.eback (hard-stop gesture ease).
// Set RIG.E.W/H (1080x1920 for reels), RIG.E.vertical = true and call RIG.setStyle('dusk') before drawing.
(function () {
const RIG = window.RIG = {};

// ---- styles.js ----
Object.assign(RIG, (function () {
// engine/styles.js: colour moods + switchable visual styles.
// A MOOD is the lighting situation of a location (day, dusk, night, storm, interiors, void).
// A STYLE re-grades every mood (palette overrides + a lift/gamma/gain colour grade on the final frame + post settings).
// grade: contrast (around mid-grey), sat (saturation), lift/gamma/gain per RGB channel (lift tints shadows, gain tints highlights).
// Scenes must take colours from mood()/S() so a style switch re-themes the whole video.

const BASE_MOODS = {
  day:          { sky: ['#8fb0d8', '#cfdcea', '#efe3d2'], ambient: '#6f7d96', key: '#fff3dc', rim: '#fff1d6', wall: '#8d8496', floor: '#5f5866', dark: '#2f2a36', practical: '#ffe2a8', grass: '#4f8a55', road: '#5d5a66', fog: '#dfe4f0' },
  golden:       { sky: ['#6b5a8e', '#e89a6a', '#f9d49c'], ambient: '#4a3a50', key: '#ffcf8f', rim: '#ffc68a', wall: '#5a3a34', floor: '#45302a', dark: '#2a1814', practical: '#ffe7b0', grass: '#4d6b3c', road: '#4a3c40', fog: '#f0c49a' },
  dusk:         { sky: ['#3d3360', '#8a5a86', '#e8956b', '#f7cf98'], ambient: '#3b2b3d', key: '#ffc68a', rim: '#ffc68a', wall: '#4a3646', floor: '#3d2c38', dark: '#231a27', practical: '#ffd59a', grass: '#3d5a48', road: '#3a3040', fog: '#c08a8a' },
  night:        { sky: ['#0b1028', '#1d2550', '#3a3570'], ambient: '#1e2444', key: '#c9d4ff', rim: '#a9b8ff', wall: '#262a46', floor: '#1b1e33', dark: '#0f1122', practical: '#ffb860', grass: '#22433a', road: '#24263a', fog: '#3a4270' },
  storm:        { sky: ['#141a33', '#2a3358', '#3d4670'], ambient: '#232a48', key: '#dfe6ff', rim: '#cfd9ff', wall: '#2b3150', floor: '#1c2238', dark: '#0d1020', practical: '#bcd0ff', grass: '#25483e', road: '#232838', fog: '#4a5580' },
  interiorWarm: { sky: ['#c98a74', '#f2b585', '#f7cf98'], ambient: '#4a3646', key: '#ffd59a', rim: '#ffcf8f', wall: '#4f3a40', floor: '#3a2a2e', dark: '#21171c', practical: '#ffd28a', grass: '#3d5a48', road: '#3a3040', fog: '#a87a70' },
  interiorCool: { sky: ['#2a3560', '#5a6aa0'], ambient: '#2a2c48', key: '#cbd6ff', rim: '#b8c6ff', wall: '#2e3150', floor: '#22243a', dark: '#121426', practical: '#9fe0ff', grass: '#22433a', road: '#24263a', fog: '#4a5080' },
  void:         { sky: ['#0a0e1a', '#121a2e'], ambient: '#151c30', key: '#ffffff', rim: '#8fb8e8', wall: '#121a2e', floor: '#0d1322', dark: '#070a12', practical: '#ffd47e', grass: '#1d3a33', road: '#151a28', fog: '#1d2740' },
};

const UI = { card: 'rgba(18,28,48,.94)', cardLine: 'rgba(150,180,230,.25)', text: '#9fb6d8', sub: '#6f84a6', accent: '#ff6f61', gold: '#ffd47e', cream: '#fff1dc', blueprint: '#8fb8e8', bpBg: '#0b1324', good: '#5fd39a' };

const STYLES = {
  dusk: {
    name: 'Cinematic Dusk', desc: 'Reference look: mauve-purple shadows, amber key light, cream rim light, soft grain, 2:1 letterbox.',
    ink: '#0e0b12', inkFar: '#2b2333', feature: '#f4efe6', rimWidth: 4, ui: UI,
    grade: { contrast: 1.0, sat: 1.0, lift: [0, 0, 0], gamma: [1, 1, 1], gain: [1, 1, 1], vignette: 0.55, grain: 0.055, bloom: 0.55 },
    moods: {},
  },
  midnight: {
    name: 'Midnight Blue', desc: 'Cold navy world, blue-white rim light, sodium-orange practical lights, rain-friendly, higher contrast.',
    ink: '#0a0c16', inkFar: '#232a40', feature: '#eef3ff', rimWidth: 4, ui: { ...UI, accent: '#ff8a5c', gold: '#ffc66e' },
    grade: { contrast: 1.06, sat: 0.8, lift: [0.0, 0.025, 0.09], gamma: [0.92, 0.98, 1.08], gain: [0.84, 0.95, 1.15], vignette: 0.65, grain: 0.06, bloom: 0.7 },
    moods: { dusk: { sky: ['#141a3a', '#2c3470', '#5a5aa0', '#c08aa0'], key: '#d8dcff', rim: '#b8c8ff', wall: '#2a2c4a', floor: '#1e2036' }, golden: { rim: '#ffd6a8' }, interiorWarm: { wall: '#3a3448', sky: ['#5a5a90', '#c09ab0'] } },
  },
  golden: {
    name: 'Golden Hour', desc: 'Warm orange-and-teal daylight, big sun glows, brighter mid-tones, warm cream rim light.',
    ink: '#120c0a', inkFar: '#3a2a26', feature: '#fff6e6', rimWidth: 4.5, ui: { ...UI, card: 'rgba(30,26,40,.92)', accent: '#ff7a4a' },
    grade: { contrast: 1.04, sat: 1.18, lift: [0.035, 0.015, 0.0], gamma: [1.1, 1.04, 0.94], gain: [1.12, 1.02, 0.8], vignette: 0.45, grain: 0.045, bloom: 0.75 },
    moods: { night: { sky: ['#14183a', '#2e2c5a', '#6a4a6a'], rim: '#ffcf9a' }, dusk: { sky: ['#4a3a6a', '#d0786a', '#f2a46a', '#fbd8a0'] } },
  },
  neon: {
    name: 'Neon Noir', desc: 'Deep blacks, magenta + teal two-tone rim lights, glowing signage, strong bloom, cool shadows.',
    ink: '#07060c', inkFar: '#1e1830', feature: '#f6f0ff', rimWidth: 4, ui: { ...UI, card: 'rgba(14,10,28,.94)', cardLine: 'rgba(200,120,255,.3)', text: '#c9a8ff', accent: '#ff4fa3', gold: '#5ff2e8', blueprint: '#7fe8ff' },
    grade: { contrast: 1.15, sat: 1.4, lift: [0.01, 0.0, 0.04], gamma: [1.0, 0.9, 1.06], gain: [1.12, 0.86, 1.18], vignette: 0.7, grain: 0.06, bloom: 0.9 },
    moods: { dusk: { sky: ['#120a2a', '#3a1a5a', '#a03a8a', '#ff7a9a'], rim: '#ff6ac8', key: '#ff8ad0', practical: '#5ff2e8' }, night: { sky: ['#06061a', '#140f3a', '#2a1a5a'], rim: '#5ff2e8', practical: '#ff4fa3' }, interiorWarm: { rim: '#ff7ab8', practical: '#5ff2e8', wall: '#2a1e3a' }, day: { rim: '#7ff0ff' } },
  },
  storybook: {
    name: 'Soft Storybook', desc: 'Lighter pastel palette, lower contrast, lavender shadows, gentle paper grain: friendlier, family tone.',
    ink: '#1a1622', inkFar: '#4a4258', feature: '#fffaf0', rimWidth: 5, ui: { ...UI, card: 'rgba(40,36,60,.9)', accent: '#ff8a7a', gold: '#ffd98a' },
    grade: { contrast: 0.92, sat: 0.92, lift: [0.07, 0.055, 0.085], gamma: [1.12, 1.1, 1.06], gain: [1.06, 1.03, 0.98], vignette: 0.3, grain: 0.07, bloom: 0.45 },
    moods: { night: { sky: ['#2a2f5a', '#4a4f80', '#6a6aa0'], wall: '#3e4266' }, dusk: { sky: ['#6a5a90', '#c08aa8', '#f2b0a0', '#fbe0b8'] } },
  },
};
const STYLE_IDS = Object.keys(STYLES);

return { BASE_MOODS, STYLES, STYLE_IDS };
})());

// ---- core.js ----
Object.assign(RIG, (function () {
// engine/core.js: shared runtime for every shot. All drawing is in LOGICAL units:
// 16:9 stage = 1920x1080, 9:16 stage = 1080x1920. The player scales to output pixels.
const { STYLES, BASE_MOODS } = RIG;

const E = { W: 1920, H: 1080, PX: 1, fps: 24, vertical: false, style: null, styleId: 'dusk', cfg: {}, words: [], shots: [] };
const V = (h, v) => (E.vertical ? v : h);           // pick a value by aspect: V(landscape, vertical)

// ---------- math / timing ----------
const clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const ease = {
  linear: x => clamp(x),
  in: x => (x = clamp(x)) ** 3,
  out: x => 1 - (1 - clamp(x)) ** 3,
  inOut: x => ((x = clamp(x)) < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2),
  sine: x => -(Math.cos(Math.PI * clamp(x)) - 1) / 2,
  eback: x => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2; },   // hard-stop gesture ease: overshoots a little then stops dead
  outBack: x => { x = clamp(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2; },
  outElastic: x => { x = clamp(x); return x === 0 || x === 1 ? x : 2 ** (-10 * x) * Math.sin((x * 10 - 0.75) * (2 * Math.PI) / 3) + 1; },
};
// keyframes: key(t, [[0, 1], [2, 1.2], [4, 1]], ease.inOut) -> number | array | object of numbers
function key(t, frames, fn = ease.inOut) {
  if (t <= frames[0][0]) return frames[0][1];
  for (let i = 1; i < frames.length; i++) {
    const [t1, v1] = frames[i];
    if (t <= t1) { const [t0, v0] = frames[i - 1]; return mixVal(v0, v1, (frames[i][2] || fn)((t - t0) / (t1 - t0))); }
  }
  return frames[frames.length - 1][1];
}
function mixVal(a, b, k) {
  if (typeof a === 'number') return lerp(a, b, k);
  if (Array.isArray(a)) return a.map((v, i) => mixVal(v, b[i], k));
  const o = {}; for (const kk in a) o[kk] = typeof a[kk] === 'number' || Array.isArray(a[kk]) ? mixVal(a[kk], b[kk] ?? a[kk], k) : (k < 0.5 ? a[kk] : b[kk] ?? a[kk]); return o;
}
function rng(seed = 1) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
function noise(x, seed = 0) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i + seed * 57), hash(i + 1 + seed * 57), u) * 2 - 1; }
const shake = (t, amp = 4, freq = 1.3, seed = 3) => [noise(t * freq, seed) * amp, noise(t * freq, seed + 9) * amp];
// talking mouth amount (0..1) driven by the real word timings when available
function talkAmount(globalT, from = -1, to = 1e9) {
  if (globalT < from || globalT > to) return 0;
  const w = E.words.find(w => globalT >= w.start && globalT <= w.end);
  if (!w && E.words.length) return 0;
  return clamp(0.25 + 0.75 * Math.abs(Math.sin(globalT * 17)) * (0.6 + 0.4 * Math.sin(globalT * 5.3)));
}

// time (global seconds) when a word is spoken: wordTime('brain', 40) -> 43.78 (null if not found)
function wordTime(match, after = 0) {
  const m = match.toLowerCase().replace(/[^\w']/g, '');
  const w = E.words.find(w => w.start >= after - 0.05 && w.word.toLowerCase().replace(/[^\w']/g, '').startsWith(m));
  return w ? w.start : null;
}

// ---------- colour ----------
function rgb(c) {
  if (Array.isArray(c)) return c;
  if (c.startsWith('rgb')) { const m = c.match(/[\d.]+/g).map(Number); return [m[0], m[1], m[2], m[3] ?? 1]; }
  let h = c.slice(1); if (h.length === 3) h = [...h].map(x => x + x).join('');
  const n = parseInt(h.slice(0, 6), 16); return [n >> 16, (n >> 8) & 255, n & 255, h.length > 6 ? parseInt(h.slice(6), 16) / 255 : 1];
}
const css = ([r, g, b, a = 1]) => `rgba(${r | 0},${g | 0},${b | 0},${+a.toFixed(3)})`;
const mix = (c1, c2, k) => { const a = rgb(c1), b = rgb(c2); return css(a.map((v, i) => lerp(v, b[i] ?? 1, k))); };
const alpha = (c, a) => { const x = rgb(c); return css([x[0], x[1], x[2], a]); };
const shade = (c, k) => (k < 0 ? mix(c, '#000000', -k) : mix(c, '#ffffff', k));

// ---------- style / moods ----------
function setStyle(id) { E.styleId = STYLES[id] ? id : 'dusk'; E.style = STYLES[E.styleId]; }
// mood('night') -> { sky:[...], ambient, key, rim, wall, floor, dark, practical, fog }
function mood(name = 'dusk') { const base = BASE_MOODS[name] || BASE_MOODS.dusk; return { ...base, ...(E.style.moods?.[name] || {}) }; }
const S = () => E.style;   // current style tokens (ink, feature, ui colours, grade)

// ---------- drawing primitives (logical units) ----------
function rr(g, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function seg(g, pts, w, col, cap = 'round') { g.strokeStyle = col; g.lineWidth = w; g.lineCap = cap; g.lineJoin = 'round'; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.stroke(); }
function poly(g, pts, fill) { g.fillStyle = fill; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.closePath(); g.fill(); }
function circle(g, x, y, r, fill) { g.fillStyle = fill; g.beginPath(); g.arc(x, y, Math.max(0, r), 0, Math.PI * 2); g.fill(); }
function ring(g, x, y, r, w, col) { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.arc(x, y, Math.max(0, r), 0, Math.PI * 2); g.stroke(); }
function linGrad(g, x0, y0, x1, y1, stops) { const gr = g.createLinearGradient(x0, y0, x1, y1); stops.forEach((c, i) => Array.isArray(c) ? gr.addColorStop(c[0], c[1]) : gr.addColorStop(i / Math.max(1, stops.length - 1), c)); return gr; }
function radGrad(g, x, y, r0, r1, stops) { const gr = g.createRadialGradient(x, y, r0, x, y, r1); stops.forEach((c, i) => Array.isArray(c) ? gr.addColorStop(c[0], c[1]) : gr.addColorStop(i / Math.max(1, stops.length - 1), c)); return gr; }
function glow(g, x, y, r, col, a = 1) { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, x, y, 0, r, [alpha(col, a), alpha(col, a * 0.35), alpha(col, 0)]); g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.restore(); }
// darken / tint the whole stage (e.g. after a blurred background so the subject pops)
function veil(g, color = '#000', a = 0.3, op = 'source-over') { g.save(); g.globalCompositeOperation = op; g.fillStyle = alpha(color, a); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore(); }
function fillRect(g, x, y, w, h, fill) { g.fillStyle = fill; g.fillRect(x, y, w, h); }
// sky / backdrop gradient over the whole stage (works under any camera)
function backdrop(g, colors, area = [-E.W, -E.H, E.W * 3, E.H * 3]) { g.fillStyle = linGrad(g, 0, 0, 0, E.H, colors); g.fillRect(...area); }

// ---------- text ----------
const FONTS = { title: 'Fredoka', ui: 'Nunito', serif: 'Playfair Display' };
function text(g, str, x, y, o = {}) {
  const { size = 48, font = FONTS.title, weight = 700, color = '#fff', align = 'center', base = 'middle', glow: gl = 0, glowColor = 'rgba(255,140,60,.8)', spacing = 0, alpha: a = 1, stroke = 0, strokeColor = '#000', italic = false } = o;
  g.save(); g.globalAlpha *= a; g.font = `${italic ? 'italic ' : ''}${weight} ${size}px "${font}"`; g.textAlign = align; g.textBaseline = base;
  if ('letterSpacing' in g) g.letterSpacing = `${spacing}px`;
  if (stroke) { g.lineJoin = 'round'; g.lineWidth = stroke; g.strokeStyle = strokeColor; g.strokeText(str, x, y); }
  if (gl) { g.shadowColor = glowColor; g.shadowBlur = gl; }
  g.fillStyle = color; g.fillText(str, x, y); g.restore();
}
function measure(g, str, size, font = FONTS.title, weight = 700) { g.save(); g.font = `${weight} ${size}px "${font}"`; const w = g.measureText(str).width; g.restore(); return w; }

// ---------- camera & parallax ----------
// cam = {x, y, z (zoom), r (roll, radians)}; depth 1 = character plane, <1 farther, >1 foreground
function layer(g, cam, depth, fn) {
  g.save(); const z = 1 + ((cam.z ?? 1) - 1) * depth;
  g.translate(E.W / 2, E.H / 2); if (cam.r) g.rotate(cam.r * Math.min(1, depth)); g.scale(z, z);
  g.translate(-E.W / 2 - (cam.x || 0) * depth, -E.H / 2 - (cam.y || 0) * depth); fn(g); g.restore();
}
// cheap depth-of-field: draw into a small canvas and upscale (optionally extra blur)
const _blurPool = [];
function blurLayer(g, amount, fn, cam = null, depth = 1) {
  if (amount <= 0.3) { cam ? layer(g, cam, depth, fn) : fn(g); return; }
  const k = clamp(1 / (1 + amount / 3), 0.06, 1);
  const w = Math.max(8, Math.round(E.W * E.PX * k)), h = Math.max(8, Math.round(E.H * E.PX * k));
  let c = _blurPool.find(b => !b.busy && b.width === w && b.height === h);
  if (!c) { c = document.createElement('canvas'); c.width = w; c.height = h; _blurPool.push(c); }
  c.busy = true; const x = c.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, w, h);
  x.setTransform(w / E.W, 0, 0, h / E.H, 0, 0); cam ? layer(x, cam, depth, fn) : fn(x);
  // blur at the small size (fast), then upscale smoothly
  if (!c.b) { c.b = document.createElement('canvas'); }
  if (c.b.width !== w || c.b.height !== h) { c.b.width = w; c.b.height = h; }
  const bx = c.b.getContext('2d'); bx.setTransform(1, 0, 0, 1, 0, 0); bx.clearRect(0, 0, w, h);
  bx.filter = `blur(${Math.max(0.4, amount * E.PX * k)}px)`; bx.drawImage(c, 0, 0); bx.filter = 'none';
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
  g.drawImage(c.b, 0, 0, E.W * E.PX, E.H * E.PX); g.restore(); c.busy = false;
}

// ---------- shot registry ----------
const SHOTS = {};
// registerShot('s012', { kind: '2d' | '3d', draw(g, t, info), init?(T, info), overlay?(g, t, info) })
function registerShot(id, def) { SHOTS[id] = { kind: '2d', ...def }; }
const getShot = id => SHOTS[id];
const allShots = () => SHOTS;

return { E, V, clamp, lerp, prog, ease, key, mixVal, rng, noise, shake, talkAmount, wordTime, rgb, css, mix, alpha, shade, setStyle, mood, S, rr, seg, poly, circle, ring, linGrad, radGrad, glow, veil, fillRect, backdrop, FONTS, text, measure, layer, blurLayer, registerShot, getShot, allShots };
})());

// ---- rig2d.js ----
Object.assign(RIG, (function () {
// engine/rig2d.js: the stick-figure character rig (2D canvas).
// Local space: feet on y=0, up is -y, the figure faces +x. Base height ≈ 240 units (s = 1).
// Points: head, sh (neck/shoulder), hip, eF/hF = near elbow/hand, eB/hB = far elbow/hand,
//         kF/fF = near knee/foot, kB/fB = far knee/foot.
const { E, S, clamp, lerp, mixVal, seg, circle, ring, alpha, shade, mix, rr, poly, ease } = RIG;

const P = (o) => o;
const POSES = {
  stand:      P({ head: [3, -208], sh: [0, -174], hip: [0, -100], eF: [9, -137], hF: [13, -101], eB: [-7, -136], hB: [-9, -100], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  relaxed:    P({ head: [4, -207], sh: [1, -173], hip: [0, -100], eF: [12, -138], hF: [20, -106], eB: [-8, -137], hB: [-14, -104], kF: [8, -50], fF: [10, 0], kB: [-4, -50], fB: [-12, 0] }),
  talk:       P({ head: [5, -208], sh: [1, -174], hip: [0, -100], eF: [22, -132], hF: [42, -146], eB: [-7, -136], hB: [-9, -100], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  explain:    P({ head: [5, -208], sh: [1, -174], hip: [0, -100], eF: [24, -136], hF: [46, -156], eB: [16, -134], hB: [34, -148], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  point:      P({ head: [5, -208], sh: [1, -174], hip: [0, -100], eF: [34, -170], hF: [68, -172], eB: [-7, -136], hB: [-9, -100], kF: [6, -50], fF: [6, 0], kB: [-6, -50], fB: [-12, 0] }),
  pointUp:    P({ head: [4, -209], sh: [1, -174], hip: [0, -100], eF: [18, -206], hF: [22, -246], eB: [-7, -136], hB: [-9, -100], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  wave:       P({ head: [4, -209], sh: [1, -174], hip: [0, -100], eF: [28, -196], hF: [36, -236], eB: [-7, -136], hB: [-9, -100], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  cheer:      P({ head: [3, -212], sh: [0, -176], hip: [0, -100], eF: [22, -206], hF: [36, -246], eB: [-20, -206], hB: [-32, -246], kF: [10, -50], fF: [16, 0], kB: [-10, -50], fB: [-16, 0] }),
  handsOnHead:P({ head: [3, -208], sh: [0, -174], hip: [0, -100], eF: [32, -196], hF: [12, -230], eB: [-28, -196], hB: [-8, -232], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  crossArms:  P({ head: [2, -208], sh: [0, -174], hip: [0, -100], eF: [16, -142], hF: [-8, -150], eB: [10, -144], hB: [14, -152], kF: [6, -50], fF: [6, 0], kB: [-6, -50], fB: [-12, 0] }),
  think:      P({ head: [6, -206], sh: [1, -173], hip: [0, -100], eF: [24, -148], hF: [16, -192], eB: [16, -134], hB: [6, -140], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  shrug:      P({ head: [3, -206], sh: [0, -172], hip: [0, -100], eF: [26, -156], hF: [40, -176], eB: [-24, -156], hB: [-38, -176], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  holdFront:  P({ head: [5, -207], sh: [1, -173], hip: [0, -100], eF: [22, -140], hF: [36, -152], eB: [16, -142], hB: [30, -154], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  phone:      P({ head: [6, -204], sh: [1, -172], hip: [0, -100], eF: [20, -138], hF: [28, -166], eB: [-7, -136], hB: [-9, -100], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  reach:      P({ head: [8, -206], sh: [4, -172], hip: [0, -100], eF: [34, -186], hF: [62, -204], eB: [-6, -136], hB: [-10, -102], kF: [10, -50], fF: [12, 0], kB: [-6, -50], fB: [-18, 0] }),
  sad:        P({ head: [12, -192], sh: [6, -166], hip: [0, -100], eF: [10, -132], hF: [12, -98], eB: [-2, -132], hB: [-2, -98], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  facepalm:   P({ head: [8, -200], sh: [2, -170], hip: [0, -100], eF: [28, -160], hF: [26, -200], eB: [-7, -136], hB: [-9, -100], kF: [6, -50], fF: [3, 0], kB: [-6, -50], fB: [-11, 0] }),
  ready:      P({ head: [12, -182], sh: [6, -148], hip: [0, -80], eF: [34, -132], hF: [56, -146], eB: [-26, -132], hB: [-46, -146], kF: [26, -44], fF: [22, 0], kB: [-24, -44], fB: [-24, 0] }),
  crouch:     P({ head: [16, -150], sh: [8, -118], hip: [0, -58], eF: [28, -88], hF: [38, -60], eB: [18, -86], hB: [26, -58], kF: [34, -54], fF: [20, 0], kB: [20, -50], fB: [-8, 0] }),
  sit:        P({ head: [4, -180], sh: [1, -146], hip: [0, -72], eF: [16, -110], hF: [38, -84], eB: [10, -110], hB: [30, -84], kF: [44, -74], fF: [46, 0], kB: [40, -72], fB: [38, 0] }),
  sitBack:    P({ head: [-8, -176], sh: [-6, -144], hip: [0, -72], eF: [2, -108], hF: [26, -86], eB: [-14, -110], hB: [-24, -80], kF: [44, -78], fF: [54, -2], kB: [40, -76], fB: [44, 0] }),
  kneel:      P({ head: [10, -168], sh: [5, -134], hip: [0, -62], eF: [24, -100], hF: [38, -76], eB: [-4, -100], hB: [-6, -66], kF: [36, -46], fF: [36, 0], kB: [-6, -4], fB: [-48, 0] }),
  lie:        P({ head: [3, -208], sh: [0, -174], hip: [0, -100], eF: [14, -136], hF: [18, -100], eB: [-12, -138], hB: [-20, -104], kF: [4, -50], fF: [2, 0], kB: [-4, -50], fB: [-6, 0] }), // use with rot: ±Math.PI/2
  dive:       P({ head: [4, -212], sh: [0, -176], hip: [0, -100], eF: [8, -218], hF: [12, -256], eB: [-6, -218], hB: [-4, -254], kF: [8, -52], fF: [10, -2], kB: [-6, -54], fB: [-14, -8] }), // with rot
  kick:       P({ head: [-4, -206], sh: [-6, -172], hip: [0, -100], eF: [8, -140], hF: [24, -124], eB: [-24, -140], hB: [-42, -128], kF: [36, -78], fF: [66, -70], kB: [-4, -50], fB: [-8, 0] }),
  jump:       P({ head: [4, -232], sh: [1, -198], hip: [0, -124], eF: [24, -226], hF: [32, -266], eB: [-18, -226], hB: [-26, -266], kF: [16, -82], fF: [6, -48], kB: [-12, -84], fB: [-22, -50] }),
  fall:       P({ head: [-10, -196], sh: [-8, -164], hip: [0, -100], eF: [24, -196], hF: [44, -222], eB: [-34, -186], hB: [-58, -204], kF: [24, -58], fF: [44, -28], kB: [-10, -54], fB: [-6, -8] }),
};

// ---------- pose helpers ----------
const pose = (name) => POSES[name] || POSES.stand;
const blendPose = (a, b, k) => mixVal(typeof a === 'string' ? pose(a) : a, typeof b === 'string' ? pose(b) : b, ease.inOut(k));
// posesAt(t, [[0,'stand'],[1.2,'talk'],[3,'point']], 0.35) -> holds each pose, blends over `blend` s
function posesAt(t, keys, blend = 0.35) {
  let cur = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [ti, pi] = keys[i];
    if (t < ti) break;
    const k = clamp((t - ti) / blend); cur = k >= 1 ? pi : blendPose(cur, pi, k);
    if (k < 1) return cur;
  }
  return typeof cur === 'string' ? pose(cur) : cur;
}
// small idle life: breathing + sway, applied on top of any pose
function breathe(p, t, amt = 1, seed = 0) {
  const b = Math.sin(t * 2.1 + seed) * 1.6 * amt, s = Math.sin(t * 0.9 + seed * 2) * 1.2 * amt;
  const q = { ...p }; for (const k of ['head', 'sh', 'eF', 'hF', 'eB', 'hB']) q[k] = [p[k][0] + s * (k === 'head' ? 1.2 : 0.6), p[k][1] + b]; return q;
}
function ik(a, b, L1, L2, dir = 1) {
  const dx = b[0] - a[0], dy = b[1] - a[1]; let d = Math.hypot(dx, dy); d = Math.min(d, L1 + L2 - 0.01);
  const ang = Math.atan2(dy, dx) - dir * Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  return [a[0] + Math.cos(ang) * L1, a[1] + Math.sin(ang) * L1];
}
// walk / run cycles. phase advances ~ 2π per step pair: phase = t * speed * 2π
function walkPose(phase, o = {}) {
  const { stride = 26, lift = 12, bob = 3, arm = 16, lean = 2, run = false } = o;
  const st = run ? 46 : stride, li = run ? 34 : lift, bb = run ? 7 : bob, ar = run ? 30 : arm, le = run ? 14 : lean;
  const hipY = -100 + (run ? 6 : 0) - bb * (1 - Math.abs(Math.sin(phase))) + bb * 0.5;
  const hip = [0, hipY], sh = [le, hipY - 74], head = [le + 4, hipY - 108];
  const foot = (ph) => [st * Math.sin(ph), -li * Math.max(0, Math.cos(ph))];
  const fF = foot(phase), fB = foot(phase + Math.PI);
  const kF = ik(hip, fF, 52, 52, 1), kB = ik(hip, fB, 52, 52, 1);
  const hand = (ph) => run ? [le + ar * Math.sin(ph) * 0.9 + 6, hipY - 46 - Math.cos(ph) * 10] : [le * 0.5 - ar * Math.sin(ph) + 4, hipY - 2];
  const hF = hand(phase + Math.PI), hB = hand(phase);
  const elbow = (h) => run ? [lerp(sh[0], h[0], 0.5) - 14, lerp(sh[1], h[1], 0.5) + 6] : [lerp(sh[0], h[0], 0.5) - 3, sh[1] + 38];
  return { head, sh, hip, eF: elbow(hF), hF, eB: elbow(hB), hB, kF, fF, kB, fB };
}

// walkAcross(t, {from, to, t0, t1, stepFrames = 5, s = 1, lift = 12, bob = 3, arm = 16, lean = 2, fps}) -> {x, pose, dir, moving, feet:[far, near]}
// Walks the figure from x=from to x=to between t0 and t1 on whole steps (stepFrames per step, 5 = brisk at 24 fps). The planted foot stays fixed in world x
// for its whole step, so feet never slide; the other foot swings and lifts. Draw: drawFigure(g, { x: w.x, y: groundY, s, facing: w.dir, pose: w.pose }) with the same s.
// Keep the stride (speed * stepFrames / fps) under about 60 units or the legs overreach. Before t0 and after t1 the figure stands.
function walkAcross(t, o = {}) {
  const { from = 0, to = 0, t0 = 0, t1 = 1, stepFrames = 5, s = 1, lift = 12, bob = 3, arm = 16, lean = 2 } = o;
  const stepT = stepFrames / (o.fps || E.fps), dir = to >= from ? 1 : -1, g = 8 * s;
  const n = Math.max(1, Math.floor((t1 - t0) / stepT)), tStop = n * stepT, L = Math.abs(to - from) / n;
  const X = (tt) => from + dir * (L / stepT) * tt, Xend = X(tStop);
  const plant = (k) => (k <= 0 ? from + dir * (k < 0 ? -g : g) : k >= n ? Xend + dir * g : X(k * stepT) + dir * L / 2);
  const tw = clamp(t - t0, 0, tStop + stepT - 1e-9);
  const k = Math.min(Math.floor(tw / stepT), n), f = k >= n ? clamp((tw - tStop) / stepT) : tw / stepT - k;
  const sm = f * f * (3 - 2 * f), moving = t >= t0 && tw < tStop + stepT - 1e-6;
  const stance = plant(k), a = plant(k - 1), b = k >= n ? Xend - dir * g : plant(k + 1);
  const x = X(clamp(tw, 0, tStop));
  const feet = []; feet[k % 2] = [stance, 0]; feet[(k + 1) % 2] = [lerp(a, b, sm), moving ? -lift * Math.sin(Math.PI * f) : 0];
  const hipY = -98 - (moving && k < n ? bob * Math.sin(Math.PI * f) : 0), hip = [0, hipY], sh = [lean, hipY - 74], head = [lean + 4, hipY - 108];
  const loc = (ft) => [(ft[0] - x) * dir / s, ft[1]];
  const fB = loc(feet[0]), fF = loc(feet[1]);
  const kB = ik(hip, fB, 52, 52, 1), kF = ik(hip, fF, 52, 52, 1);
  const hand = (opp) => [lean * 0.5 + 4 + 0.55 * opp[0], hipY - 2];
  const hF = hand(fB), hB = hand(fF), elbow = (h) => [lerp(sh[0], h[0], 0.5) - 3, sh[1] + 38];
  return { x, dir, moving, feet: [feet[0][0], feet[1][0]], pose: { head, sh, hip, eF: elbow(hF), hF, eB: elbow(hB), hB, kF, fF, kB, fB } };
}

// ---------- faces ----------
const EXPR = {
  neutral: { eyes: 'dot', brows: null, mouth: 'smallSmile' }, happy: { eyes: 'happy', brows: null, mouth: 'grin' }, joy: { eyes: 'happy', brows: 'raised', mouth: 'grin' },
  smile: { eyes: 'dot', brows: null, mouth: 'smile' }, surprised: { eyes: 'ring', brows: 'raised', mouth: 'o' }, shocked: { eyes: 'wide', brows: 'raised', mouth: 'oBig' },
  scared: { eyes: 'ring', brows: 'worried', mouth: 'wavy' }, worried: { eyes: 'dot', brows: 'worried', mouth: 'wavy' }, nervous: { eyes: 'dot', brows: 'worried', mouth: 'flat', sweat: true },
  angry: { eyes: 'dot', brows: 'angry', mouth: 'flat' }, determined: { eyes: 'dot', brows: 'angry', mouth: 'smallFlat' }, sad: { eyes: 'dot', brows: 'worried', mouth: 'frown' },
  cry: { eyes: 'closed', brows: 'worried', mouth: 'frown', tears: true }, smirk: { eyes: 'dot', brows: null, mouth: 'smirk' }, sleepy: { eyes: 'closed', brows: null, mouth: 'flat' },
  thinking: { eyes: 'dot', brows: 'raised', mouth: 'smallFlat', look: [0.5, -0.6] }, confused: { eyes: 'dot', brows: 'confused', mouth: 'wavy' }, awe: { eyes: 'wide', brows: 'raised', mouth: 'o' },
};
// face(g, headX, headY, r, {expr, talk, blink, look:[x,y], front, color, facing}): also used for giant close-ups
function face(g, hx, hy, r, o = {}) {
  const ex = { ...(EXPR[o.expr] || EXPR.neutral), ...(o.override || {}) };
  const col = o.color || S().feature, ink = S().ink;
  const fx = hx + (o.front ? 0 : r * 0.34), fy = hy - r * 0.08;
  const look = o.look || ex.look || [0, 0];
  const eyeX = o.front ? [fx - r * 0.34, fx + r * 0.34] : [fx - r * 0.26, fx + r * 0.32];
  const ey = fy - r * 0.08;
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  eyeX.forEach((x, i) => {
    const s = o.front ? 1 : i === 0 ? 0.88 : 1;
    if (o.blink || ex.eyes === 'closed') { seg(g, [[x - r * 0.12 * s, ey], [x + r * 0.12 * s, ey]], r * 0.08, col); return; }
    switch (ex.eyes) {
      case 'happy': g.strokeStyle = col; g.lineWidth = r * 0.09; g.beginPath(); g.arc(x, ey + r * 0.05, r * 0.13 * s, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); break;
      case 'ring': ring(g, x, ey, r * 0.2 * s, r * 0.085, col); circle(g, x + look[0] * r * 0.06, ey + look[1] * r * 0.06, r * 0.075 * s, col); break;
      case 'wide': circle(g, x, ey, r * 0.2 * s, col); circle(g, x + look[0] * r * 0.08, ey + look[1] * r * 0.08, r * 0.085 * s, ink); break;
      default: circle(g, x + look[0] * r * 0.05, ey + look[1] * r * 0.05, r * 0.125 * s, col);
    }
  });
  const by = ey - r * 0.3, bw = r * 0.15;
  const brow = (x, a) => seg(g, [[x - bw, by + a], [x + bw, by - a]], r * 0.075, col);
  if (ex.brows === 'worried') { brow(eyeX[0], -r * 0.06); brow(eyeX[1], r * 0.06); }
  if (ex.brows === 'angry') { brow(eyeX[0], r * 0.08); brow(eyeX[1], -r * 0.08); }
  if (ex.brows === 'raised') eyeX.forEach(x => { g.strokeStyle = col; g.lineWidth = r * 0.07; g.beginPath(); g.arc(x, by + r * 0.12, r * 0.15, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); });
  if (ex.brows === 'confused') { brow(eyeX[0], r * 0.07); g.strokeStyle = col; g.lineWidth = r * 0.07; g.beginPath(); g.arc(eyeX[1], by + r * 0.08, r * 0.15, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); }
  const mx = fx + (o.front ? 0 : r * 0.04), my = fy + r * 0.42;
  const talk = o.talk || 0;
  if (talk > 0.05) { g.fillStyle = col; g.beginPath(); g.ellipse(mx, my, r * 0.16, r * (0.05 + 0.2 * talk), 0, 0, Math.PI * 2); g.fill(); }
  else switch (ex.mouth) {
    case 'grin': g.fillStyle = col; g.beginPath(); g.moveTo(mx - r * 0.3, my - r * 0.06); g.quadraticCurveTo(mx, my + r * 0.42, mx + r * 0.3, my - r * 0.06); g.closePath(); g.fill(); break;
    case 'smile': g.strokeStyle = col; g.lineWidth = r * 0.09; g.beginPath(); g.arc(mx, my - r * 0.2, r * 0.27, 0.35, Math.PI - 0.35); g.stroke(); break;
    case 'smallSmile': g.strokeStyle = col; g.lineWidth = r * 0.085; g.beginPath(); g.arc(mx, my - r * 0.14, r * 0.18, 0.4, Math.PI - 0.4); g.stroke(); break;
    case 'o': g.fillStyle = col; g.beginPath(); g.ellipse(mx, my, r * 0.11, r * 0.15, 0, 0, Math.PI * 2); g.fill(); break;
    case 'oBig': ring(g, mx, my + r * 0.04, r * 0.15, r * 0.08, col); break;
    case 'flat': seg(g, [[mx - r * 0.2, my], [mx + r * 0.2, my]], r * 0.085, col); break;
    case 'smallFlat': seg(g, [[mx - r * 0.12, my], [mx + r * 0.12, my]], r * 0.085, col); break;
    case 'frown': g.strokeStyle = col; g.lineWidth = r * 0.085; g.beginPath(); g.arc(mx, my + r * 0.2, r * 0.2, Math.PI + 0.5, Math.PI * 2 - 0.5); g.stroke(); break;
    case 'smirk': g.strokeStyle = col; g.lineWidth = r * 0.085; g.beginPath(); g.moveTo(mx - r * 0.16, my); g.quadraticCurveTo(mx + r * 0.05, my + r * 0.06, mx + r * 0.22, my - r * 0.1); g.stroke(); break;
    case 'wavy': { g.strokeStyle = col; g.lineWidth = r * 0.085; g.beginPath(); for (let i = 0; i <= 16; i++) { const u = i / 16; const x = mx - r * 0.24 + u * r * 0.48, y = my + Math.sin(u * Math.PI * 2) * r * 0.06; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); break; }
  }
  if (ex.tears) { g.fillStyle = '#8fd0ff'; for (const x of eyeX) { g.beginPath(); g.ellipse(x, ey + r * 0.3, r * 0.05, r * 0.1, 0, 0, Math.PI * 2); g.fill(); } }
  if (ex.sweat) { g.fillStyle = '#9fd8ff'; g.beginPath(); g.ellipse(hx - r * 0.6, hy - r * 0.45, r * 0.08, r * 0.13, 0, 0, Math.PI * 2); g.fill(); }
  g.restore();
}

// faceAt(t, keys, {after, seed, expr, blink, fps}) -> {expr, blink}: spread it into drawFigure/face. keys = [[time | 'word', 'expr'], ...]; a word key uses wordTime(word, after).
// Blinks are seeded and depend only on t: 3 frames closed every 3.5 to 4 s (different offset per seed). blink:false turns them off.
function faceAt(t, keys, o = {}) {
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const ks = keys.map(([k, ex]) => [typeof k === 'string' ? RIG.wordTime(k, o.after || 0) : k, ex]).filter(k => k[0] != null).sort((a, b) => a[0] - b[0]);
  let expr = o.expr || 'neutral'; for (const [tk, ex] of ks) if (t >= tk - 1e-6) expr = ex;
  const fps = o.fps || E.fps, seed = o.seed || 0, per = 3.5 + hash(seed) * 0.5, tf = Math.round(t * fps) / fps;
  const ph = (((tf + hash(seed + 3) * per) % per) + per) % per;
  return { expr, blink: o.blink !== false && ph < 3 / fps - 1e-6 };
}

// ---------- outfits ----------
// Modesty: a woman is drawn only fully covered, a loose garment to the feet and the head covered,
// no body outline. 'dress' (knee length, bare legs) and bare 'bun' / 'ponytail' heads are never used for a woman.
// outfit = { top: 'hoodie'|'labcoat'|'trench'|'jersey'|'tshirt'|'suit'|'dress'|'tracksuit'|'abaya'|'thobe'|'none', color, color2 (the khimar colour for a woman),
//            legs: colour (trousers) | null, head: 'cap'|'capBack'|'beanie'|'fedora'|'headband'|'visor'|'hood'|'ponytail'|'bun'|'curly'|'spiky'|'khimar'|'kufi'|'turban'|'none',
//            ('thobe' = a man's ankle-length robe, 'kufi' / 'turban' use color2 or headColor; 'abaya' + 'khimar' = the fully covered woman: loose garment shoulders to ankles, head and chest covered, only face, hands and feet show)
//            headColor, face: 'glasses'|'sunglasses'|null, gloves: colour|null, number: '1', kid: bool }
function drawHeadwear(g, o, hx, hy, r, pass) {
  const c = o.headColor || '#f2c21a', dark = shade(c, -0.25), hi = shade(c, 0.35);
  const sil = pass === 'sil';
  const fill = (col) => (sil ? o._sil : col);
  switch (o.head) {
    case 'cap': case 'capBack': {
      const back = o.head === 'capBack' ? -1 : 1;
      g.fillStyle = fill(c); g.beginPath(); g.ellipse(hx - 1, hy - r * 0.32, r * 1.04, r * 0.82, 0, Math.PI, Math.PI * 2); g.fill();
      seg(g, [[hx + back * r * 0.25, hy - r * 0.34], [hx + back * r * 1.55, hy - r * 0.26]], r * 0.26, fill(dark));
      if (!sil) { g.strokeStyle = alpha(hi, 0.8); g.lineWidth = r * 0.08; g.beginPath(); g.ellipse(hx - r * 0.1, hy - r * 0.5, r * 0.6, r * 0.42, 0, Math.PI * 1.15, Math.PI * 1.55); g.stroke(); }
      break; }
    case 'visor': seg(g, [[hx - r * 0.95, hy - r * 0.42], [hx + r * 0.9, hy - r * 0.42]], r * 0.22, fill(c)); seg(g, [[hx + r * 0.3, hy - r * 0.4], [hx + r * 1.5, hy - r * 0.3]], r * 0.22, fill(dark)); break;
    case 'beanie': {
      g.fillStyle = fill(c); g.beginPath(); g.ellipse(hx - 1, hy - r * 0.18, r * 1.06, r * 1.0, 0, Math.PI, Math.PI * 2); g.fill();
      rr(g, hx - r * 1.08, hy - r * 0.34, r * 2.16, r * 0.34, r * 0.14); g.fillStyle = fill(dark); g.fill();
      circle(g, hx - r * 0.1, hy - r * 1.2, r * 0.3, fill(hi)); break; }
    case 'fedora': {
      g.fillStyle = fill(c); g.beginPath(); g.ellipse(hx, hy - r * 0.55, r * 1.8, r * 0.3, 0, 0, Math.PI * 2); g.fill();
      rr(g, hx - r * 0.78, hy - r * 1.45, r * 1.56, r * 0.95, r * 0.25); g.fill();
      if (!sil) { g.fillStyle = dark; g.fillRect(hx - r * 0.78, hy - r * 0.78, r * 1.56, r * 0.2); g.strokeStyle = alpha(hi, 0.6); g.lineWidth = r * 0.06; g.beginPath(); g.ellipse(hx, hy - r * 0.55, r * 1.8, r * 0.3, 0, Math.PI * 1.05, Math.PI * 1.6); g.stroke(); }
      break; }
    case 'headband': {
      g.save(); g.beginPath(); g.arc(hx, hy, r * 1.04, 0, Math.PI * 2); g.clip(); g.fillStyle = fill(c); g.fillRect(hx - r * 1.2, hy - r * 0.62, r * 2.4, r * 0.3); g.restore();
      seg(g, [[hx - r * 0.95, hy - r * 0.48], [hx - r * 1.5, hy - r * 0.2], [hx - r * 1.7, hy + r * 0.1]], r * 0.16, fill(c)); break; }
    case 'ponytail': { g.strokeStyle = fill(o._ink); g.lineWidth = r * 0.42; g.lineCap = 'round'; g.beginPath(); g.moveTo(hx - r * 0.7, hy - r * 0.55); g.quadraticCurveTo(hx - r * 1.7, hy - r * 0.4, hx - r * 1.45, hy + r * 0.75); g.stroke();
      if (o.headColor && !sil) seg(g, [[hx - r * 0.9, hy - r * 0.75], [hx - r * 0.8, hy - r * 0.35]], r * 0.22, o.headColor); break; }
    case 'kufi': case 'turban': {
      const col = o.color2 || o.headColor || '#f4f1ea', dk = shade(col, -0.25), turb = o.head === 'turban', top = turb ? 1.5 : 1.2;
      g.save(); g.beginPath();
      if (!turb) g.arc(hx, hy, r * 1.06, 0, Math.PI * 2); else g.rect(hx - r * 2, hy - r * 2, r * 4, r * 4);
      g.clip();
      const edge = () => { g.beginPath(); g.moveTo(hx - r * 1.3, hy - r * top - 8); g.lineTo(hx + r * 1.3, hy - r * top - 8); g.lineTo(hx + r * 1.3, hy - r * 0.62); g.quadraticCurveTo(hx, hy - r * 0.38, hx - r * 1.3, hy - r * 0.62); g.closePath(); };
      edge(); g.clip();
      g.fillStyle = fill(col); g.beginPath();
      if (turb) g.ellipse(hx, hy - r * 0.72, r * 1.14, r * 0.8, 0, 0, Math.PI * 2); else g.arc(hx, hy, r * 1.06, 0, Math.PI * 2);
      g.fill();
      if (!sil) {
        g.strokeStyle = dk; g.lineWidth = r * 0.07; g.lineCap = 'round';
        if (turb) { g.beginPath(); g.ellipse(hx, hy - r * 0.72, r * 1.14, r * 0.8, 0, 0, Math.PI * 2); g.clip(); }
        if (turb) for (let i = 0; i < 3; i++) { const y0 = hy - r * (0.62 + i * 0.3); g.beginPath(); g.moveTo(hx - r * 1.2, y0 + r * 0.18); g.quadraticCurveTo(hx, y0 - r * 0.2, hx + r * 1.2, y0 - r * 0.02); g.stroke(); }
        else { g.beginPath(); g.moveTo(hx - r * 1.3, hy - r * 0.62); g.quadraticCurveTo(hx, hy - r * 0.38, hx + r * 1.3, hy - r * 0.62); g.stroke(); }
      }
      g.restore(); break; }
    case 'bun': circle(g, hx - r * 0.55, hy - r * 0.95, r * 0.45, fill(o._ink)); break;
    case 'curly': for (let i = 0; i < 7; i++) { const a = Math.PI * (1.05 + i * 0.13); circle(g, hx + Math.cos(a) * r * 0.92, hy + Math.sin(a) * r * 0.92, r * 0.34, fill(o._ink)); } break;
    case 'spiky': g.fillStyle = fill(o._ink); g.beginPath(); for (let i = 0; i <= 6; i++) { const a = Math.PI * (1.05 + i * 0.15); const rr2 = i % 2 ? r * 1.45 : r * 0.95; g.lineTo(hx + Math.cos(a) * rr2, hy + Math.sin(a) * rr2); } g.closePath(); g.fill(); break;
  }
}
function torsoWear(g, o, p, pass) {
  const sil = pass === 'sil', c = sil ? o._sil : o.color || '#d64a33', d = sil ? o._sil : shade(o.color || '#d64a33', -0.22);
  const [sx, sy] = p.sh, [hx, hy] = p.hip;
  switch (o.top) {
    case 'hoodie': case 'tracksuit': case 'jersey': case 'tshirt': case 'suit': case 'dress': {
      const col = o.top === 'suit' ? (sil ? o._sil : o.color || '#2a2833') : c;
      const top = sy - 7, bot = hy + (o.top === 'jersey' || o.top === 'tshirt' ? 4 : 12);
      g.fillStyle = col; g.beginPath(); g.moveTo(sx - 15, top + 6); g.quadraticCurveTo(sx, top - 4, sx + 15, top + 6); g.lineTo(hx + 15, bot); g.lineTo(hx - 15, bot); g.closePath(); g.fill();
      if (o.top === 'dress') poly(g, [[hx - 14, hy - 8], [hx + 14, hy - 8], [hx + 34, hy + 50], [hx - 34, hy + 50]], col);
      if (!sil && o.top === 'hoodie') { g.fillStyle = d; g.fillRect(hx - 15, bot - 7, 30, 7); seg(g, [[sx + 6, sy - 2], [sx + 7, sy + 18]], 2, shade(c, 0.4)); }
      if (!sil && o.top === 'suit') { poly(g, [[sx - 1, sy - 4], [sx + 4, sy - 4], [sx + 5, sy + 40], [sx + 1, sy + 46]], o.color2 || '#c0392b'); }
      if (!sil && o.top === 'jersey' && o.number) { g.fillStyle = o.color2 || '#fff'; g.font = '700 24px Nunito'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(o.number, (sx + hx) / 2 + 2, (sy + hy) / 2); }
      if (!sil && o.top === 'tracksuit') seg(g, [[sx + 12, sy + 2], [hx + 12, hy]], 3, o.color2 || '#ffffff');
      break; }
    case 'labcoat': case 'trench': {
      const col = sil ? o._sil : o.top === 'labcoat' ? '#ebe7f0' : o.color || '#2c2833';
      g.fillStyle = col; g.beginPath(); g.moveTo(sx - 15, sy - 5); g.lineTo(sx + 15, sy - 5); g.lineTo(hx + 25, hy + 44); g.lineTo(hx - 23, hy + 44); g.closePath(); g.fill();
      if (!sil) { seg(g, [[sx + 3, sy], [hx + 4, hy + 42]], 2, o.top === 'labcoat' ? '#a9a2b5' : shade(col, 0.25)); seg(g, [[sx - 6, sy - 3], [sx + 2, sy + 22], [sx + 10, sy - 3]], 2.2, o.top === 'labcoat' ? '#c9c2d4' : shade(col, 0.3));
        if (o.top === 'trench') g.fillStyle = shade(col, -0.3), g.fillRect(hx - 18, hy - 6, 38, 6); }
      break; }
  }
}
// ---------- covered woman: abaya + khimar ----------
// abaya: one loose A-line garment from the shoulders to the ankles, no waist. Its lower part is the convex hull of hips, knees and feet, so it drapes over the
// knees as one shape in every pose and the hem follows the feet (it widens and lifts with the stride). Feet are redrawn over the hem, loose sleeves end before the hands.
// khimar: wraps the head except an oval face opening and falls over the shoulders and chest to a rounded edge at elbow height; three layers (back, cape, head).
const abayaCol = (of) => of.color || (of.top === 'thobe' ? '#e6dcc4' : '#2e3347');   // also the thobe colour
const khimarCol = (of) => { if (of.color2) return of.color2; const c = abayaCol(of), [r, g, b] = RIG.rgb(c); return shade(c, (0.3 * r + 0.59 * g + 0.11 * b) / 255 < 0.4 ? 0.32 : -0.32); };
function hull(pts) {
  pts = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]), half = (list) => { const h = []; for (const q of list) { while (h.length > 1 && cr(h[h.length - 2], h[h.length - 1], q) <= 0) h.pop(); h.push(q); } h.pop(); return h; };
  return half(pts).concat(half(pts.slice().reverse()));
}
function abayaBody(g, of, p, sil, grow) {
  const col = sil ? of._sil : abayaCol(of), [sx, sy] = p.sh, [hx, hy] = p.hip, low = Math.max(p.fF[1], p.fB[1]);
  const th = of.top === 'thobe', ws = th ? 14 : 16, wh = th ? 16 : 21, wk = th ? 14 : 19, wf = th ? 12 : 15, wb = th ? 21 : 28;   // thobe: a straighter, narrower column
  const pts = [[sx - ws, sy - 4], [sx + ws, sy - 4], [hx - wh, hy], [hx + wh, hy]];
  for (const k of [p.kF, p.kB]) pts.push([k[0] - wk, k[1]], [k[0] + wk, k[1]]);
  for (const f of [p.fF, p.fB]) pts.push([f[0] - wf, f[1] - 6], [f[0] + wf, f[1] - 6]);
  if (low - hy >= 84) { const cx = hx + 0.3 * ((p.fF[0] + p.fB[0]) / 2 - hx); pts.push([cx - wb, low - 6], [cx + wb, low - 6]); }
  const h = hull(pts);
  g.beginPath(); h.forEach((q, i) => (i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]))); g.closePath();
  g.fillStyle = col; g.fill(); g.strokeStyle = col; g.lineWidth = 8 + grow * 2; g.lineJoin = 'round'; g.stroke();
  if (!sil) seg(g, [[hx + 4, hy + 8], [(p.fF[0] + p.fB[0]) / 2 + 4, low - 10]], 1.6, shade(col, -0.2));
  if (!sil && th) { seg(g, [[sx + 4, sy - 2], [sx + 5, sy + 38]], 2, shade(col, -0.3)); seg(g, [[sx - 6, sy - 3], [sx + 10, sy - 3]], 3, shade(col, -0.3)); }   // collar and placket
  const foot = (f, c) => seg(g, [f, [f[0] + 12, f[1]]], 11.5 + grow, c);
  foot(p.fB, sil ? of._sil : of._far); foot(p.fF, sil ? of._sil : of._ink);
}
function abayaSleeve(g, of, a, e, h, far, grow, sil) {
  const col = sil ? of._sil : far ? shade(abayaCol(of), of.top === 'thobe' ? -0.12 : -0.3) : abayaCol(of), m = (u) => [lerp(e[0], h[0], u), lerp(e[1], h[1], u)];
  const th = of.top === 'thobe';
  if (th && !sil) { seg(g, [a, e, m(0.8)], 19.5, shade(col, -0.2)); seg(g, [m(0.5), m(0.82)], 22.5, shade(col, -0.2)); }   // thin edge so a thobe sleeve reads on the thobe
  seg(g, [a, e, m(0.8)], (th ? 17 : 21) + grow, col); seg(g, [m(0.5), m(0.82)], (th ? 20 : 25) + grow, col);
}
function bellPath(g, p, r, full) {
  const [hx, hy] = p.head, [sx, sy] = p.sh, hem = sy + 0.5 * (p.hip[1] - sy), w = r * 1.1;   // a thin band: head outline + 10%, drape no wider than the shoulders
  g.beginPath(); g.moveTo(hx + w, hy); g.ellipse(hx, hy, w, w, 0, 0, Math.PI, true);
  g.bezierCurveTo(hx - w, hy + r * 0.5, sx - 24, sy - 6, sx - 22, sy + 6);
  if (full) { g.bezierCurveTo(sx - 24, sy + 22, sx - 21, hem - 14, sx - 19, hem - 6); g.quadraticCurveTo(sx - 17, hem + 5, sx, hem + 5); g.quadraticCurveTo(sx + 17, hem + 5, sx + 19, hem - 6); g.bezierCurveTo(sx + 21, hem - 14, sx + 24, sy + 22, sx + 22, sy + 6); }
  else g.quadraticCurveTo(sx, sy + 16, sx + 22, sy + 6);
  g.bezierCurveTo(sx + 24, sy - 6, hx + w, hy + r * 0.5, hx + w, hy); g.closePath();
  return hem;
}
// layer: 'back' (behind torso, darker) | 'cape' (over the abaya, under the arms) | 'head' (over the head circle, face oval left open)
function khimar(g, of, p, r, layer, sil, grow, o) {
  const c = khimarCol(of), [hx, hy] = p.head, [sx, sy] = p.sh, col = sil ? of._sil : layer === 'back' ? shade(c, -0.25) : c;
  const hem = bellPath(g, p, r, layer !== 'head');
  if (!sil && layer === 'cape') { g.save(); g.strokeStyle = 'rgba(0,0,0,.28)'; g.lineWidth = 3; g.beginPath(); g.moveTo(sx + 19, hem - 3); g.quadraticCurveTo(sx + 17, hem + 8, sx, hem + 8); g.quadraticCurveTo(sx - 17, hem + 8, sx - 19, hem - 3); g.stroke(); g.restore(); bellPath(g, p, r, true); }
  g.fillStyle = col;
  if (layer === 'head' && !sil) { g.moveTo(hx + r * 0.96, hy + r * 0.02); g.ellipse(hx + r * 0.22, hy + r * 0.02, r * 0.74, r * 0.9, 0, 0, Math.PI * 2); g.fill('evenodd'); } else g.fill();
  if (sil) { if (grow) { g.strokeStyle = col; g.lineWidth = grow * 2; g.lineJoin = 'round'; g.stroke(); } return; }
  if (layer !== 'back') {                                      // rim light catches the outer edge of the cloth
    const rd = o.rim === false ? null : { dir: [-0.8, -0.5], color: '#ffc68a', ...(o.rim || {}) };
    if (rd) {
      const f = o.facing ?? 1, dx = rd.dir[0] * f, dy = rd.dir[1], cx = sx, cy = (hy + hem) / 2;
      g.save(); if (layer === 'head') { g.beginPath(); g.rect(hx - 120, hy - 120, 240, sy - 2 - (hy - 120)); g.clip(); bellPath(g, p, r, false); }
      g.strokeStyle = linGradP(g, cx + dx * 60, cy + dy * 90, cx - dx * 60, cy - dy * 90, alpha(rd.color, 0.9)); g.lineWidth = 2.4; g.lineJoin = 'round'; g.stroke(); g.restore();
    }
  }
}
const linGradP = (g, x0, y0, x1, y1, c) => { const gr = g.createLinearGradient(x0, y0, x1, y1); gr.addColorStop(0, c); gr.addColorStop(0.6, alpha(c, 0)); return gr; };
function sleeve(o) { if (['hoodie', 'tracksuit', 'labcoat', 'trench', 'suit'].includes(o.top)) return 'long'; if (['jersey', 'tshirt'].includes(o.top)) return 'short'; return null; }
function sleeveColor(o, far) { const c = o.top === 'labcoat' ? '#f3f0f6' : o.top === 'trench' ? o.color || '#2c2833' : o.top === 'suit' ? o.color || '#2a2833' : o.color || '#d64a33'; return far ? shade(c, -0.3) : c; }

// ---------- main draw ----------
// drawFigure(g, { x, y, s, facing, pose, rot, outfit, expr, talk, blink, look, rim:{dir:[x,y], color, w}, dim, alpha, prop, shadow, hand })
// hand (optional): 'nub' (wide shots) | 'mitten' (medium) | 'glove' (small five-finger hand); leave unset for the plain round limb end. faceless:true draws no face.
function drawFigure(g, o) {
  const st = S(), ink = o.ink || st.ink, far = o.inkFar || st.inkFar;
  const p = o.pose || POSES.stand, s = (o.s ?? 1) * (o.outfit?.kid ? 0.72 : 1), f = o.facing ?? 1;
  const of = { ...(o.outfit || {}), _ink: ink };
  const rim = o.rim === false ? null : { dir: [-0.8, -0.5], w: st.rimWidth, color: '#ffc68a', ...(o.rim || {}) };
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha;
  if (o.shadow !== false && !o.rot) { g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(o.x, o.y + 2, 34 * s, 6 * s, 0, 0, Math.PI * 2); g.fill(); }
  if (o.trail) { const { count = 4, dx = -40, dy = 0, a = 0.22 } = o.trail; for (let i = count; i >= 1; i--) { g.save(); g.globalAlpha *= a * (1 - i / (count + 1)); body(g, { ...o, x: o.x + dx * i, y: o.y + dy * i, trail: null }, p, s, f, of, ink, far, null, alpha(rim?.color || '#fff', 1)); g.restore(); } }
  body(g, o, p, s, f, of, ink, far, rim);
  g.restore();
}
function body(g, o, p, s, f, of, ink, far, rim, flat) {
  const tf = (dx = 0, dy = 0) => { g.translate(o.x + dx, o.y + dy); g.scale(f * s, s); if (o.rot) { g.translate(p.hip[0], p.hip[1]); g.rotate(o.rot); g.translate(-p.hip[0], -p.hip[1]); } };
  if (flat) { g.save(); tf(); parts(g, o, p, { ...of, _sil: flat }, flat, flat, 'sil'); g.restore(); return; }
  if (rim) { g.save(); tf(rim.dir[0] * rim.w, rim.dir[1] * rim.w); parts(g, o, p, { ...of, _sil: rim.color }, rim.color, rim.color, 'sil', 1.6); g.restore(); }
  g.save(); tf(); parts(g, o, p, of, o.dim ? mix(ink, far, 0.6) : ink, far, 'main'); g.restore();
}
function parts(g, o, p, of, ink, far, pass, grow = 0) {
  const sil = pass === 'sil', L = 12.5 + grow, A = 11 + grow, T = 15 + grow, HR = 26 + grow * 0.6;
  const sl = sleeve(of);
  // far leg + far arm
  seg(g, [p.hip, p.kB, p.fB, [p.fB[0] + 12, p.fB[1]]], L - 1, sil ? ink : of.legs ? shade(of.legs, -0.35) : far);
  const aba = of.top === 'abaya' || of.top === 'thobe', kh = of.head === 'khimar'; of._ink = ink; of._far = far;
  const farArm = () => {
    seg(g, [p.sh, p.eB, p.hB], A - 1, sil ? ink : far);
    if (aba) abayaSleeve(g, of, p.sh, p.eB, p.hB, true, grow, sil);
    else if (!sil && sl) seg(g, sl === 'long' ? [p.sh, p.eB, [lerp(p.eB[0], p.hB[0], 0.7), lerp(p.eB[1], p.hB[1], 0.7)]] : [p.sh, [lerp(p.sh[0], p.eB[0], 0.75), lerp(p.sh[1], p.eB[1], 0.75)]], 16, sleeveColor(of, true));
    if (of.gloves) circle(g, p.hB[0], p.hB[1], 8.5 + grow, sil ? ink : shade(of.gloves, -0.2));
    hand(g, o, p.eB, p.hB, sil ? ink : far, grow);
  };
  if (!aba) farArm();
  // hair / hood behind head
  if (of.top === 'hoodie' && of.head !== 'hood') { g.fillStyle = sil ? ink : shade(of.color || '#d64a33', -0.28); g.beginPath(); g.ellipse(p.sh[0] - 9, p.sh[1] - 6, 15 + grow, 11 + grow, -0.3, 0, Math.PI * 2); g.fill(); }
  if (of.head === 'hood') { const c = of.headColor || of.color || '#d64a33'; circle(g, p.head[0] - 6, p.head[1] + 2, HR * 1.22, sil ? ink : shade(c, -0.12)); }
  if (['ponytail', 'bun'].includes(of.head)) drawHeadwear(g, of, p.head[0], p.head[1], HR, pass);
  if (kh) khimar(g, of, p, HR, 'back', sil, grow, o);
  // torso
  seg(g, [p.sh, p.hip], T, ink);
  if (of.top && of.top !== 'none') torsoWear(g, of, p, pass);
  // near leg
  seg(g, [p.hip, p.kF, p.fF, [p.fF[0] + 13, p.fF[1]]], L, sil ? ink : of.legs || ink);
  if (!sil && ['labcoat', 'trench'].includes(of.top)) { const c = of.top === 'labcoat' ? '#ebe7f0' : of.color || '#2c2833'; poly(g, [[p.sh[0] - 4, p.sh[1] + 40], [p.hip[0] + 25, p.hip[1] + 44], [p.hip[0] - 23, p.hip[1] + 44]], c); }
  if (aba) { abayaBody(g, of, p, sil, grow); if (kh) khimar(g, of, p, HR, 'cape', sil, grow, o); farArm(); }
  // near arm
  seg(g, [p.sh, p.eF, p.hF], A, ink);
  if (!sil && sl) seg(g, sl === 'long' ? [p.sh, p.eF, [lerp(p.eF[0], p.hF[0], 0.72), lerp(p.eF[1], p.hF[1], 0.72)]] : [p.sh, [lerp(p.sh[0], p.eF[0], 0.75), lerp(p.sh[1], p.eF[1], 0.75)]], 16.5, sleeveColor(of, false));
  if (aba) abayaSleeve(g, of, p.sh, p.eF, p.hF, false, grow, sil);
  if (of.gloves) circle(g, p.hF[0], p.hF[1], 9 + grow, sil ? ink : of.gloves);
  hand(g, o, p.eF, p.hF, ink, grow);
  // head
  circle(g, p.head[0], p.head[1], HR, ink);
  if (!['ponytail', 'bun', 'hood', 'khimar', 'none', undefined].includes(of.head)) drawHeadwear(g, of, p.head[0], p.head[1], HR, pass);
  if (kh) khimar(g, of, p, HR, 'head', sil, grow, o);
  if (aba && kh) { farArm(); seg(g, [p.sh, p.eF, p.hF], A, ink); abayaSleeve(g, of, p.sh, p.eF, p.hF, false, grow, sil); hand(g, o, p.eF, p.hF, ink, grow); }   // arms stay in front of the head cloth when raised
  if (sil) return;
  if (!o.faceless) face(g, p.head[0], p.head[1], HR, { expr: o.expr, talk: o.talk, blink: o.blink, look: o.look, override: o.face });
  if (of.face === 'glasses') { const c = S().feature; g.strokeStyle = c; g.lineWidth = 2.4; for (const dx of [-6.5, 10]) { g.beginPath(); g.arc(p.head[0] + 9 + dx, p.head[1] - 4, 7, 0, Math.PI * 2); g.stroke(); } seg(g, [[p.head[0] + 9.5, p.head[1] - 4], [p.head[0] + 12.5, p.head[1] - 4]], 2, c); }
  if (of.face === 'sunglasses') { g.fillStyle = '#05060a'; rr(g, p.head[0] - 1, p.head[1] - 10, 16, 11, 4); g.fill(); rr(g, p.head[0] + 17, p.head[1] - 10, 15, 11, 4); g.fill(); seg(g, [[p.head[0] - 4, p.head[1] - 7], [p.head[0] + 33, p.head[1] - 7]], 2.5, '#05060a'); g.fillStyle = '#9fe8ff'; g.fillRect(p.head[0] + 2, p.head[1] - 8, 4, 2); g.fillRect(p.head[0] + 20, p.head[1] - 8, 4, 2); }
  if (of.head === 'hood') { g.strokeStyle = shade(of.headColor || of.color || '#d64a33', 0.15); g.lineWidth = 5; g.beginPath(); g.arc(p.head[0] - 6, p.head[1] + 2, HR * 1.18, Math.PI * 0.9, Math.PI * 1.75); g.stroke(); }
  if (o.prop) drawProp(g, o.prop, p, ink);
}
function soccerBall(g, x, y, r, rot = 0, light = '#f2efe8') {
  g.save(); g.translate(x, y); g.rotate(rot); circle(g, 0, 0, r, light);
  g.fillStyle = '#16131c'; const pent = (cx, cy, rr2) => { g.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5; g.lineTo(cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2); } g.closePath(); g.fill(); };
  pent(0, 0, r * 0.32); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5 + Math.PI / 5; g.save(); g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.clip(); pent(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.85, r * 0.28); g.restore(); }
  g.fillStyle = 'rgba(0,0,0,.18)'; g.beginPath(); g.arc(r * 0.15, r * 0.15, r, 0, Math.PI * 2); g.arc(0, 0, r, 0, Math.PI * 2, true); g.fill(); g.restore();
}
function drawProp(g, prop, p, ink) {
  const t = typeof prop === 'string' ? { type: prop } : prop; const h = t.hand === 'B' ? p.hB : p.hF;
  switch (t.type) {
    case 'phone': rr(g, h[0] - 2, h[1] - 22, 14, 24, 3); g.fillStyle = ink; g.fill(); g.fillStyle = t.glow || '#9fd8ff'; g.fillRect(h[0], h[1] - 20, 10, 18); break;
    case 'ball': soccerBall(g, h[0] + 10, h[1] - 6, 14, t.rot || 0); break;
    case 'paper': g.fillStyle = '#f2e6c8'; g.fillRect(h[0] - 4, h[1] - 30, 30, 36); g.strokeStyle = '#b8a888'; g.lineWidth = 1.5; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(h[0], h[1] - 22 + i * 7); g.lineTo(h[0] + 20, h[1] - 22 + i * 7); g.stroke(); } break;
    case 'cup': g.fillStyle = '#f2efe8'; g.fillRect(h[0] - 2, h[1] - 18, 14, 18); seg(g, [[h[0] + 12, h[1] - 14], [h[0] + 17, h[1] - 9], [h[0] + 12, h[1] - 4]], 2.5, '#f2efe8'); break;
    case 'paddle': circle(g, h[0] + 12, h[1] - 6, 11, t.color || '#b2382a'); break;
    case 'pointer': seg(g, [h, [h[0] + 70, h[1] - 50]], 2.5, '#d8d0c0'); break;
    case 'tablet': rr(g, h[0] - 6, h[1] - 34, 40, 30, 4); g.fillStyle = ink; g.fill(); g.fillStyle = t.glow || '#7fd0d6'; g.fillRect(h[0] - 2, h[1] - 30, 32, 22); break;
    case 'flashlight': seg(g, [h, [h[0] + 14, h[1] - 4]], 6, '#3a3a44'); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = 'rgba(255,240,200,.14)'; g.beginPath(); g.moveTo(h[0] + 14, h[1] - 4); g.lineTo(h[0] + 260, h[1] - 70); g.lineTo(h[0] + 260, h[1] + 60); g.closePath(); g.fill(); g.restore(); break;
  }
}
// hand(g, o, elbow, hand, colour, grow): the drawFigure 'hand' option; nothing when o.hand is unset
function hand(g, o, e, h, col, grow) {
  if (!o.hand) return;
  const ang = Math.atan2(h[1] - e[1], h[0] - e[0]);
  if (o.hand === 'glove') return glove(g, h[0], h[1], 0.1, ang, 0.35, { sleeve: null, col, hi: col });
  circle(g, h[0], h[1], (o.hand === 'mitten' ? 8.4 : 7.2) + grow, col);
  if (o.hand === 'mitten') circle(g, h[0] + Math.cos(ang - 1.6) * 7, h[1] + Math.sin(ang - 1.6) * 7, 3.6 + grow * 0.5, col);
}
// glove(g, x, y, s, angle, curl, {col, hi, sleeve, cuff, grip}): close-up five-finger hand, wrist at (x, y), fingers along angle, curl 0 open to 1 fist (about 240 units long at s = 1).
// sleeve: colour of the forearm (null for none). grip: 'cup' | fn(g) drawing an object in the hand's local space (fingers point +x, object centre near x = 100): the object sits behind the
// palm and the fingers wrap in front of it, so the hand grips it. Colours default to the style ink.
function glove(g, x, y, s, ang = 0, curl = 0.4, o = {}) {
  const col = o.col || S().ink, hi = o.hi || shade(col, 0.18), sl = o.sleeve === undefined ? '#d64a33' : o.sleeve, grip = o.grip;
  g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s * (o.flip ? -1 : 1));
  if (sl) { g.fillStyle = sl; g.beginPath(); g.moveTo(-260, -70); g.lineTo(-40, -62); g.lineTo(-40, 62); g.lineTo(-260, 70); g.closePath(); g.fill(); g.fillStyle = o.cuff || shade(sl, 0.15); g.fillRect(-70, -64, 32, 128); }
  if (grip === 'cup') {
    g.fillStyle = '#f2efe8'; g.beginPath(); g.moveTo(48, -78); g.lineTo(152, -78); g.lineTo(138, 70); g.lineTo(62, 70); g.closePath(); g.fill();
    g.fillStyle = '#c9c2b4'; g.fillRect(52, -78, 100, 12);
    g.strokeStyle = '#f2efe8'; g.lineWidth = 14; g.beginPath(); g.arc(150, -4, 28, -Math.PI / 2, Math.PI / 2); g.stroke();
  } else if (typeof grip === 'function') grip(g);
  g.fillStyle = col; g.beginPath(); g.moveTo(-42, -52); g.quadraticCurveTo(40, -66, 70, -40); g.lineTo(78, 42); g.quadraticCurveTo(30, 66, -42, 50); g.closePath(); g.fill();
  if (grip) {
    g.fillStyle = hi; g.beginPath(); g.roundRect(8, -76, 96, 28, 14); g.fill();                      // thumb over the rim
    [[-36, 24], [-10, 25], [16, 24], [42, 21]].forEach(([fy, w], i) => {                           // fingers wrap across the front
      g.fillStyle = i % 2 ? hi : col; g.beginPath(); g.roundRect(56, fy - w / 2, 92, w, w / 2); g.fill();
    });
    g.restore(); return;
  }
  [[-38, 62, 26], [-14, 78, 24], [10, 74, 23], [32, 58, 20]].forEach(([fy, len, w], i) => {
    const bend = curl * (1.3 + i * 0.1);
    g.save(); g.translate(70, fy * 0.95); g.rotate(bend * 0.55);
    g.fillStyle = i % 2 ? hi : col; g.beginPath(); g.roundRect(0, -w / 2, len * 0.55, w, w / 2); g.fill();
    g.translate(len * 0.5, 0); g.rotate(bend * 0.6); g.fillStyle = col; g.beginPath(); g.roundRect(0, -w / 2 * 0.95, len * 0.5, w * 0.95, w / 2); g.fill();
    g.restore();
  });
  g.save(); g.translate(10, 46); g.rotate(0.9 - curl * 0.9); g.fillStyle = hi; g.beginPath(); g.roundRect(0, -14, 70, 28, 14); g.fill(); g.restore();
  g.restore();
}
// world position of the head centre (for rings, labels, speech bubbles)
function headPos(o) { const p = o.pose || POSES.stand, s = (o.s ?? 1) * (o.outfit?.kid ? 0.72 : 1), f = o.facing ?? 1; let [x, y] = p.head; if (o.rot) { const [hx, hy] = p.hip; const c = Math.cos(o.rot), sn = Math.sin(o.rot); [x, y] = [hx + (x - hx) * c - (y - hy) * sn, hy + (x - hx) * sn + (y - hy) * c]; } return [o.x + x * f * s, o.y + y * s, 26 * s]; }

// ---------- giant close-up head (fills the frame) ----------
// bigFace(g, cx, cy, r, { outfit, expr, talk, blink, look, rimColor, rimSide:-1|1, tilt })
function bigFace(g, cx, cy, r, o = {}) {
  const st = S(), ink = st.ink, of = o.outfit || {}, rc = o.rimColor || '#ffc68a', side = o.rimSide ?? -1;
  g.save(); g.translate(cx, cy); if (o.tilt) g.rotate(o.tilt);
  // shoulders / clothing at the bottom
  const top = of.top || 'none', cc = top === 'labcoat' ? '#ebe7f0' : (top === 'abaya' || top === 'thobe') ? abayaCol(of) : of.color || ink;
  g.fillStyle = top === 'none' ? ink : cc; g.beginPath(); g.ellipse(0, r * 1.65, r * 1.25, r * 0.85, 0, Math.PI, Math.PI * 2); g.fill();
  if (of.head === 'khimar') { const kc = khimarCol(of); g.fillStyle = kc; g.beginPath(); g.ellipse(0, r * 1.7, r * 1.26, r * 1.0, 0, Math.PI, Math.PI * 2); g.fill(); circle(g, 0, r * 0.02, r * 1.1, shade(kc, -0.2)); }
  if (of.head === 'hood') { const hc = of.headColor || of.color || '#d64a33'; circle(g, side * -r * 0.04, r * 0.06, r * 1.2, shade(hc, -0.15)); g.strokeStyle = alpha(shade(hc, 0.4), 0.7); g.lineWidth = r * 0.05; g.beginPath(); g.arc(-r * 0.05, 0, r * 1.12, Math.PI * 1.1, Math.PI * 1.5); g.stroke(); }
  // rim crescent on the lit side
  g.save(); g.beginPath(); g.arc(0, 0, r + r * 0.06, 0, Math.PI * 2); g.arc(side * r * 0.07, r * 0.02, r, 0, Math.PI * 2, true); g.fillStyle = rc; g.fill('evenodd'); g.restore();
  circle(g, 0, 0, r, ink);
  if (of.head === 'khimar') { g.fillStyle = khimarCol(of); g.beginPath(); g.ellipse(0, r * 0.02, r * 1.1, r * 1.1, 0, 0, Math.PI * 2); g.moveTo(r * 0.74, r * 0.02); g.ellipse(0, r * 0.02, r * 0.74, r * 0.9, 0, 0, Math.PI * 2); g.fill('evenodd'); }
  if (of.head && !['hood', 'khimar', 'none'].includes(of.head)) drawHeadwear(g, { ...of, _ink: ink }, 0, 0, r, 'main');
  face(g, 0, 0, r, { expr: o.expr, talk: o.talk, blink: o.blink, look: o.look, front: true, override: o.face });
  if (of.face === 'glasses') { g.strokeStyle = st.feature; g.lineWidth = r * 0.06; for (const dx of [-0.34, 0.34]) { g.beginPath(); g.arc(dx * r, -r * 0.16, r * 0.26, 0, Math.PI * 2); g.stroke(); } }
  if (of.face === 'sunglasses') { g.fillStyle = '#05060a'; rr(g, -r * 0.66, -r * 0.34, r * 0.6, r * 0.4, r * 0.12); g.fill(); rr(g, r * 0.06, -r * 0.34, r * 0.6, r * 0.4, r * 0.12); g.fill(); g.fillStyle = 'rgba(160,230,255,.6)'; g.fillRect(-r * 0.55, -r * 0.28, r * 0.12, r * 0.05); }
  g.restore();
}

return { POSES, pose, blendPose, posesAt, breathe, walkPose, walkAcross, faceAt, glove, EXPR, face, drawFigure, soccerBall, headPos, bigFace };
})());

// ---- fx2d.js ----
Object.assign(RIG, (function () {
// engine/fx2d.js: atmosphere, light and set-dressing helpers (2D canvas, logical units).
const { E, rng, clamp, lerp, alpha, shade, mix, seg, circle, ring, rr, poly, linGrad, radGrad, glow, noise } = RIG;

// ---------- atmosphere ----------
function rain(g, t, o = {}) {
  const { seed = 1, count = 260, angle = 0.14, speed = 2200, len = 46, color = '#b8c8ff', a = 0.32, w = 1.3, area = [-100, -100, E.W + 200, E.H + 200], timeScale = 1 } = o;
  const r = rng(seed); g.save(); g.strokeStyle = alpha(color, a); g.lineWidth = w; g.lineCap = 'round'; g.beginPath();
  const [ax, ay, aw, ah] = area, dx = Math.sin(angle), dy = Math.cos(angle);
  for (let i = 0; i < count; i++) {
    const x0 = ax + r() * aw, y0 = r() * ah, sp = speed * (0.7 + r() * 0.6), L = len * (0.6 + r() * 0.8);
    const y = ay + ((y0 + t * timeScale * sp) % ah), x = x0 + (y - ay) * dx;
    g.moveTo(x, y); g.lineTo(x + dx * L, y + dy * L);
  }
  g.stroke(); g.restore();
}
// frozen raindrops / bubbles hanging in the air (time-stop moments)
function drops(g, t, o = {}) {
  const { seed = 2, count = 70, area = [0, 0, E.W, E.H], rMin = 3, rMax = 14, color = '#cfe0ff', drift = 4 } = o;
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const x = area[0] + r() * area[2] + Math.sin(t * 0.4 + i) * drift, y = area[1] + r() * area[3] + Math.cos(t * 0.3 + i) * drift, rad = rMin + r() ** 2 * (rMax - rMin);
    g.fillStyle = radGrad(g, x - rad * 0.3, y - rad * 0.3, 0, rad, [alpha(color, 0.05), alpha(color, 0.12), alpha(color, 0.45)]);
    g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2); g.fill(); ring(g, x, y, rad, Math.max(0.8, rad * 0.08), alpha(color, 0.55));
    circle(g, x - rad * 0.35, y - rad * 0.35, rad * 0.22, alpha('#ffffff', 0.85));
  }
}
function dust(g, t, o = {}) {
  const { seed = 3, count = 50, color = '#ffe9d2', area = [0, 0, E.W, E.H], size = 2.2, speed = 14, a = 0.5 } = o;
  const r = rng(seed); g.save(); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < count; i++) {
    const s = 0.4 + r() * 1.2, ph = r() * 6.28, rad = (0.5 + r()) * size;
    const x = area[0] + ((r() * area[2] + Math.sin(t * 0.5 + ph) * 18) % area[2]), y = area[1] + (((r() * area[3] - t * speed * s) % area[3]) + area[3]) % area[3];
    const al = a * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.7 + ph)));
    g.fillStyle = radGrad(g, x, y, 0, rad * 3, [alpha(color, al), alpha(color, 0)]); g.beginPath(); g.arc(x, y, rad * 3, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}
function snow(g, t, o = {}) { const { seed = 4, count = 160, color = '#ffffff', speed = 60 } = o; const r = rng(seed); for (let i = 0; i < count; i++) { const s = 0.5 + r(), x = (r() * E.W + Math.sin(t * s + i) * 30) % E.W, y = ((r() * E.H + t * speed * s) % (E.H + 20)) - 10; circle(g, x, y, 1.5 + s * 2, alpha(color, 0.75)); } }
function stars(g, t = 0, o = {}) { const { seed = 5, count = 140, area = [0, 0, E.W, E.H * 0.6], color = '#ffffff' } = o; const r = rng(seed); for (let i = 0; i < count; i++) { const x = area[0] + r() * area[2], y = area[1] + r() * area[3], s = r(); circle(g, x, y, 0.6 + s * 1.6, alpha(color, 0.25 + 0.6 * s * (0.6 + 0.4 * Math.sin(t * 2 + i)))); } }
function fog(g, y, h, color, a = 0.35) { g.fillStyle = linGrad(g, 0, y, 0, y + h, [alpha(color, 0), alpha(color, a), alpha(color, 0)]); g.fillRect(-E.W, y, E.W * 3, h); }

// ---------- light ----------
function sun(g, x, y, r, color = '#fff6e0', glowColor = '#ffd59a', glowR = 4) { glow(g, x, y, r * glowR, glowColor, 0.55); glow(g, x, y, r * 1.8, '#fff3dc', 0.6); circle(g, x, y, r, color); }
function moon(g, x, y, r, color = '#e8ecff') { glow(g, x, y, r * 4, color, 0.18); circle(g, x, y, r, color); }
function godRays(g, x, y, o = {}) {
  const { count = 7, angle = Math.PI / 2, spread = 0.9, len = 1600, color = '#ffd9a0', a = 0.1, t = 0, width = 0.07 } = o;
  g.save(); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < count; i++) {
    const ang = angle - spread / 2 + (spread * (i + 0.5)) / count + Math.sin(t * 0.3 + i) * 0.01, w = width * (0.6 + ((i * 37) % 10) / 10);
    g.fillStyle = linGrad(g, x, y, x + Math.cos(ang) * len, y + Math.sin(ang) * len, [alpha(color, a), alpha(color, 0)]);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(ang - w) * len, y + Math.sin(ang - w) * len); g.lineTo(x + Math.cos(ang + w) * len, y + Math.sin(ang + w) * len); g.closePath(); g.fill();
  }
  g.restore();
}
// cone of light from a lamp / spotlight / window, pointing at angle
function lightCone(g, x, y, o = {}) { const { angle = Math.PI / 2, spread = 0.5, len = 700, color = '#ffe2a8', a = 0.18 } = o; g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, x, y, 0, len, [alpha(color, a), alpha(color, a * 0.4), alpha(color, 0)]); g.beginPath(); g.moveTo(x, y); g.arc(x, y, len, angle - spread / 2, angle + spread / 2); g.closePath(); g.fill(); g.restore(); }
function pool(g, x, y, rx, ry, color = '#ffd59a', a = 0.3) { g.save(); g.globalCompositeOperation = 'lighter'; g.translate(x, y); g.scale(1, ry / rx); g.fillStyle = radGrad(g, 0, 0, 0, rx, [alpha(color, a), alpha(color, 0)]); g.beginPath(); g.arc(0, 0, rx, 0, Math.PI * 2); g.fill(); g.restore(); }
function lensStreak(g, x, y, w = E.W, color = '#ffe6cc', a = 0.35, h = 2) { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, x - w / 2, 0, x + w / 2, 0, [alpha(color, 0), alpha(color, a), alpha(color, 0)]); g.fillRect(x - w / 2, y - h / 2, w, h); g.restore(); }
function sparkle(g, x, y, s = 20, color = '#ffffff', a = 0.9) { g.save(); g.globalCompositeOperation = 'lighter'; glow(g, x, y, s * 0.8, color, a * 0.6); seg(g, [[x - s, y], [x + s, y]], s * 0.06, alpha(color, a)); seg(g, [[x, y - s], [x, y + s]], s * 0.06, alpha(color, a)); g.restore(); }
function lightning(g, o = {}) {
  const { seed = 9, x1 = E.W * 0.6, y1 = 0, x2 = E.W * 0.5, y2 = E.H * 0.6, color = '#dfe8ff', w = 3, branches = 3, a = 1, jag = 60 } = o;
  const r = rng(seed); const path = (ax, ay, bx, by, n, wd, depth) => {
    const pts = [[ax, ay]]; for (let i = 1; i < n; i++) { const u = i / n; pts.push([lerp(ax, bx, u) + (r() - 0.5) * jag * (1 - u * 0.3), lerp(ay, by, u) + (r() - 0.5) * jag * 0.3]); } pts.push([bx, by]);
    g.save(); g.globalCompositeOperation = 'lighter'; g.shadowColor = color; g.shadowBlur = 24; seg(g, pts, wd, alpha(color, a)); seg(g, pts, wd * 0.4, alpha('#ffffff', a)); g.restore();
    if (depth > 0) for (let b = 0; b < branches; b++) { const k = 2 + Math.floor(r() * (pts.length - 3)); const [px, py] = pts[k]; path(px, py, px + (r() - 0.3) * 260, py + 120 + r() * 200, 6, wd * 0.5, depth - 1); }
  }; path(x1, y1, x2, y2, 14, w, 1);
}
function speedLines(g, t, o = {}) { const { cx = E.W / 2, cy = E.H / 2, count = 60, color = '#ffffff', a = 0.25, inner = 260, seed = 6 } = o; const r = rng(seed); g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < count; i++) { const ang = r() * Math.PI * 2, d0 = inner + r() * 200 + ((t * 900 + r() * 400) % 500), L = 80 + r() * 260; seg(g, [[cx + Math.cos(ang) * d0, cy + Math.sin(ang) * d0], [cx + Math.cos(ang) * (d0 + L), cy + Math.sin(ang) * (d0 + L)]], 1 + r() * 2.5, alpha(color, a * r())); } g.restore(); }
// expanding rings: someone speaking off-screen / a realisation / a shockwave
function rings(g, x, y, t, o = {}) { const { count = 3, r0 = 40, r1 = 140, color = '#fff1e6', a = 0.5, speed = 1.4, w = 2 } = o; for (let k = 0; k < count; k++) { const ph = (t * speed + k / count) % 1; ring(g, x, y, r0 + ph * (r1 - r0), w, alpha(color, a * (1 - ph))); } }

// ---------- set dressing ----------
function skyline(g, o = {}) {
  const { seed = 7, x = 0, y = E.H * 0.6, w = E.W, minH = 40, maxH = 220, color = '#2a2440', windowColor = '#ffd59a', lit = 0.35, minW = 26, maxW = 70 } = o;
  const r = rng(seed); let cx = x; g.fillStyle = color;
  while (cx < x + w) { const bw = minW + r() * (maxW - minW), bh = minH + r() ** 1.5 * (maxH - minH); g.fillStyle = color; g.fillRect(cx, y - bh, bw, bh + 2); if (r() < 0.2) g.fillRect(cx + bw * 0.45, y - bh - 24, 3, 24);
    g.fillStyle = windowColor; for (let wy = y - bh + 8; wy < y - 8; wy += 13) for (let wx = cx + 5; wx < cx + bw - 7; wx += 11) if (r() < lit) g.fillRect(wx, wy, 4, 6);
    cx += bw + r() * 6; }
}
function hills(g, o = {}) { const { seed = 8, y = E.H * 0.7, amp = 80, color = '#2a2440', freq = 0.004 } = o; g.fillStyle = color; g.beginPath(); g.moveTo(-E.W, E.H * 2); for (let x = -E.W; x <= E.W * 2; x += 20) g.lineTo(x, y - (noise(x * freq, seed) * 0.5 + 0.5) * amp); g.lineTo(E.W * 2, E.H * 2); g.closePath(); g.fill(); }
function clouds(g, o = {}) { const { seed = 10, count = 6, y = E.H * 0.2, h = 120, color = '#ffffff', a = 0.12 } = o; const r = rng(seed); for (let i = 0; i < count; i++) { const cx = r() * E.W, cy = y + r() * h, w = 160 + r() * 260; g.fillStyle = alpha(color, a); g.beginPath(); g.ellipse(cx, cy, w, 14 + r() * 16, 0, 0, Math.PI * 2); g.fill(); } }
function tree(g, x, y, s = 1, color = '#1c1626') { seg(g, [[x, y], [x, y - 90 * s]], 9 * s, color); for (const [dx, dy, r] of [[0, -130, 46], [-34, -104, 34], [34, -104, 34], [-16, -150, 30], [20, -146, 32]]) circle(g, x + dx * s, y + dy * s, r * s, color); }
function pine(g, x, y, s = 1, color = '#1c1626') { poly(g, [[x, y - 220 * s], [x + 30 * s, y], [x - 30 * s, y]], color); }
function lampPost(g, x, y, h = 320, o = {}) { const { color = '#15121c', light = '#ffd59a', on = true, a = 0.22 } = o; seg(g, [[x, y], [x, y - h], [x + 34, y - h - 10]], 6, color); rr(g, x + 24, y - h - 12, 26, 10, 3); g.fillStyle = color; g.fill(); if (on) { glow(g, x + 37, y - h - 2, 60, light, 0.8); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, 0, y - h, 0, y, [alpha(light, a), alpha(light, a * 0.25)]); g.beginPath(); g.moveTo(x + 30, y - h); g.lineTo(x + 44, y - h); g.lineTo(x + 140, y); g.lineTo(x - 66, y); g.closePath(); g.fill(); g.restore(); } }
// window with a view: drawSky(g, x, y, w, h) paints inside, then frame + mullions (+ optional blinds)
function windowFrame(g, o, drawSky) {
  const { x, y, w, h, cols = 3, rows = 1, frame = '#2b2030', bar = 8, blinds = 0, arch = false } = o;
  g.save(); g.beginPath(); if (arch) { g.moveTo(x, y + h); g.lineTo(x, y + w / 2); g.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); g.lineTo(x + w, y + h); g.closePath(); } else g.rect(x, y, w, h);
  g.clip(); drawSky(g, x, y, w, h);
  for (let i = 0; i < blinds; i++) { g.fillStyle = alpha(frame, 0.35); g.fillRect(x, y + 6 + i * 7, w, 2); }
  g.fillStyle = frame; for (let i = 1; i < cols; i++) g.fillRect(x + (w * i) / cols - bar / 2, y, bar, h); for (let i = 1; i < rows; i++) g.fillRect(x, y + (h * i) / rows - bar / 2, w, bar);
  g.restore(); g.strokeStyle = frame; g.lineWidth = bar * 1.2; if (arch) { g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y + w / 2); g.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); g.lineTo(x + w, y + h); g.closePath(); g.stroke(); } else g.strokeRect(x, y, w, h);
}
// building facade with a grid of (some) lit windows
function facade(g, o = {}) { const { x, y, w, h, color = '#2a2238', win = '#ffcf8a', dark = '#1a1424', cols = 4, rows = 3, lit = 0.6, seed = 11, door = false } = o; const r = rng(seed); g.fillStyle = color; g.fillRect(x, y - h, w, h); const cw = w / cols, rh = (h - 30) / rows; for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const on = r() < lit; const wx = x + i * cw + cw * 0.2, wy = y - h + 20 + j * rh + rh * 0.15; g.fillStyle = on ? win : dark; g.fillRect(wx, wy, cw * 0.6, rh * 0.62); if (on) glow(g, wx + cw * 0.3, wy + rh * 0.3, cw * 0.7, win, 0.18); } if (door) { g.fillStyle = win; g.fillRect(x + w / 2 - 26, y - 90, 52, 90); glow(g, x + w / 2, y - 45, 120, win, 0.3); } }
function door(g, o = {}) { const { x, y, w = 110, h = 230, color = '#3a2a36', open = 0, light = '#cfe0ff' } = o; g.fillStyle = shade(color, -0.4); g.fillRect(x, y - h, w, h); if (open > 0) { g.fillStyle = light; g.fillRect(x, y - h, w * open, h); glow(g, x + w * open / 2, y - h / 2, h, light, 0.25 * open); } g.fillStyle = color; g.fillRect(x + w * open, y - h, w * (1 - open), h); g.strokeStyle = shade(color, -0.5); g.lineWidth = 6; g.strokeRect(x, y - h, w, h); }
function chair(g, x, y, s = 1, color = '#2a2230') { seg(g, [[x - 30 * s, y], [x - 26 * s, y - 70 * s], [x + 26 * s, y - 70 * s], [x + 30 * s, y]], 6 * s, color); seg(g, [[x - 28 * s, y - 70 * s], [x - 32 * s, y - 160 * s]], 7 * s, color); rr(g, x - 34 * s, y - 78 * s, 68 * s, 12 * s, 4 * s); g.fillStyle = color; g.fill(); }
function stool(g, x, y, s = 1, color = '#2a2230') { rr(g, x - 26 * s, y - 72 * s, 52 * s, 10 * s, 4 * s); g.fillStyle = color; g.fill(); for (const dx of [-20, 20]) seg(g, [[x + dx * 0.4 * s, y - 70 * s], [x + dx * s, y]], 4 * s, color); seg(g, [[x - 14 * s, y - 28 * s], [x + 14 * s, y - 28 * s]], 3 * s, color); }
function counter(g, o = {}) { const { x, y, w, h = 90, color = '#2a1e2a', top = '#3a2a37', doors = 8 } = o; g.fillStyle = color; g.fillRect(x, y - h, w, h); g.fillStyle = top; g.fillRect(x - 6, y - h - 8, w + 12, 9); g.strokeStyle = shade(color, -0.3); g.lineWidth = 2; for (let i = 1; i < doors; i++) { g.beginPath(); g.moveTo(x + (w * i) / doors, y - h + 8); g.lineTo(x + (w * i) / doors, y - 4); g.stroke(); } }
function screen(g, o = {}, content) { const { x, y, w, h, frame = '#0c0c12', bg = '#14202c', glowC = '#7fd0d6', a = 0.25 } = o; rr(g, x - 8, y - 8, w + 16, h + 16, 8); g.fillStyle = frame; g.fill(); g.fillStyle = bg; g.fillRect(x, y, w, h); if (content) { g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); content(g, x, y, w, h); g.restore(); } glow(g, x + w / 2, y + h / 2, Math.max(w, h) * 0.8, glowC, a); }
function bed(g, o = {}) { const { x, y, w = 420, color = '#5a5aa0', frame = '#2a2238', pillow = '#e8e4f4' } = o; g.fillStyle = frame; g.fillRect(x, y - 70, w, 70); g.fillRect(x - 10, y - 150, 22, 150); g.fillStyle = color; rr(g, x + 6, y - 96, w - 6, 40, 14); g.fill(); g.fillStyle = pillow; rr(g, x + 16, y - 116, 90, 30, 12); g.fill(); }
function clock(g, x, y, r, t = 0, o = {}) { const { face = '#f2efe8', ink = '#1a1622', red = '#e04a3a', speed = 1 } = o; circle(g, x, y, r, face); ring(g, x, y, r, r * 0.06, ink); for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6; seg(g, [[x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8], [x + Math.cos(a) * r * 0.92, y + Math.sin(a) * r * 0.92]], r * 0.04, ink); } const s = t * speed, ang = (v) => v * Math.PI * 2 - Math.PI / 2; seg(g, [[x, y], [x + Math.cos(ang(s / 3600)) * r * 0.5, y + Math.sin(ang(s / 3600)) * r * 0.5]], r * 0.07, ink); seg(g, [[x, y], [x + Math.cos(ang(s / 60 / 60 * 12)) * r * 0.7, y + Math.sin(ang(s / 60 / 60 * 12)) * r * 0.7]], r * 0.05, ink); seg(g, [[x, y], [x + Math.cos(ang(Math.floor(s) / 60)) * r * 0.82, y + Math.sin(ang(Math.floor(s) / 60)) * r * 0.82]], r * 0.025, red); circle(g, x, y, r * 0.05, ink); }
// planks / tiles receding toward a horizon line
function floorLines(g, y0, y1, color = 'rgba(0,0,0,.25)', spacing = 0.06) { g.strokeStyle = color; g.lineWidth = 1.5; for (let y = y0 + 8; y < y1; y += Math.max(6, (y - y0) * spacing + 6)) { g.beginPath(); g.moveTo(-E.W, y); g.lineTo(E.W * 2, y); g.stroke(); } }
// stadium / audience crowd: rows of tiny bobbing stick people
function crowd(g, t, o = {}) {
  const { seed = 12, x = 0, y = E.H * 0.5, w = E.W, rows = 6, rowH = 26, size = 1, color = '#3a3358', colors = null, flags = 0.02, wave = 0, cheer = 0 } = o;
  const r = rng(seed);
  for (let j = 0; j < rows; j++) { const ry = y + j * rowH, sc = size * (1 + j * 0.06); for (let cx = x + r() * 10; cx < x + w; cx += 13 * sc + r() * 6) {
    const c = colors ? colors[Math.floor(r() * colors.length)] : shade(color, (r() - 0.5) * 0.3); const ph = r() * 6.28, bob = Math.max(0, Math.sin(t * 6 + ph)) * 3 * cheer + (wave ? Math.max(0, Math.sin(t * 3 - cx * 0.01 * wave)) * 8 : 0);
    circle(g, cx, ry - 14 * sc - bob, 5 * sc, c); seg(g, [[cx, ry - 9 * sc - bob], [cx, ry + 6 * sc]], 5 * sc, c);
    if (cheer > 0.5 && r() < 0.3) seg(g, [[cx, ry - 6 * sc - bob], [cx - 5 * sc, ry - 22 * sc - bob]], 2 * sc, c);
    if (r() < flags) { const fc = ['#e04a3a', '#3a7ae0', '#f2c21a', '#ffffff'][Math.floor(r() * 4)]; seg(g, [[cx + 4, ry - 10 - bob], [cx + 4, ry - 40 - bob]], 1.5, '#ddd'); g.fillStyle = fc; g.fillRect(cx + 4, ry - 40 - bob + Math.sin(t * 4 + ph) * 2, 18, 11); }
  } }
}

return { rain, drops, dust, snow, stars, fog, sun, moon, godRays, lightCone, pool, lensStreak, sparkle, lightning, speedLines, rings, skyline, hills, clouds, tree, pine, lampPost, windowFrame, facade, door, chair, stool, counter, screen, bed, clock, floorLines, crowd };
})());

})();
