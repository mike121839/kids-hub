/* ============================================
   KIDS LEARNING HUB v2 — IMMERSIVE APP.JS
   ============================================ */

// ============ AUDIO CONTEXT (for sound effects & background music) ============
let audioCtx;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

// ============ SOUND EFFECTS ============
const SFX = {
  // Faith sounds (gentle/reverent)
  faithCorrect() {
    const ctx = getAudioCtx();
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.8);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12); osc.stop(ctx.currentTime + i * 0.12 + 0.8);
    });
  },
  faithWrong() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 220;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.5);
  },
  faithChime() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.4);
  },
  pageTurn() {
    const ctx = getAudioCtx();
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    const source = ctx.createBufferSource(); source.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 800;
    const gain = ctx.createGain(); gain.gain.value = 0.06;
    source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    source.start();
  },
  // Health sounds (fun/playful)
  healthCorrect() {
    const ctx = getAudioCtx();
    [587.33, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'square'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.1); osc.stop(ctx.currentTime + i * 0.1 + 0.3);
    });
  },
  healthWrong() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'square'; osc.frequency.value = 150;
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.3);
  },
  pop() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 600;
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.15);
  },
  celebrate() {
    const ctx = getAudioCtx();
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.15); osc.stop(ctx.currentTime + i * 0.15 + 1);
    });
  },
  // Brain Gym sounds
  brainCorrect() {
    const ctx = getAudioCtx();
    [1047, 1319].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.4);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08); osc.stop(ctx.currentTime + i * 0.08 + 0.4);
    });
  },
  brainWrong() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'square'; osc.frequency.value = 200;
    osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.25);
  },
  brainLevelUp() {
    const ctx = getAudioCtx();
    [523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.5);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12); osc.stop(ctx.currentTime + i * 0.12 + 0.5);
    });
  },
  // Exercise sounds
  exerciseCorrect() {
    const ctx = getAudioCtx();
    [440, 554, 659].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.4);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08); osc.stop(ctx.currentTime + i * 0.08 + 0.4);
    });
  },
  exerciseWrong() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'square'; osc.frequency.value = 180;
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.25);
  },
  whistle() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 1200;
    osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.4);
  },
  countdown() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.15);
  }
};

// ============ BACKGROUND MUSIC (Web Audio synthesized ambient pad) ============
let bgMusicNodes = [];
function startBgMusic(type) {
  // Background music disabled
}
function stopBgMusic() {
  const ctx = audioCtx;
  bgMusicNodes.forEach(({ osc, gain }) => {
    try {
      if (ctx) gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => { try { osc.stop(); } catch(e) {} }, 1500);
    } catch(e) {}
  });
  bgMusicNodes = [];
}

// ============ NARRATION SYSTEM (MP3 + fallback) ============
let currentNarrationAudio = null;

// ============ TTS AUDIO SYSTEM (MP3-based, no speechSynthesis) ============
// All narration uses server-side TTS via /tts?text=... endpoint.
// Pre-generated MP3s are in audio/ folder for key narrations (storybook, prayers, etc.)

let currentTTSAudio = null; // currently playing TTS audio element
let ttsQueue = []; // for sequence playback

// ============ WORD-BY-WORD HIGHLIGHTING ============
let hlState = null;

function setupWordHighlight(el, text, prefixLen) {
  endHighlight();
  if (!el || !text) return;
  const parts = text.split(/(\s+)/);
  el.innerHTML = parts.map(p => /^\s+$/.test(p) ? p :
    `<span class="hl-word">${p.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</span>`
  ).join('');
  const spans = Array.from(el.querySelectorAll('.hl-word'));
  const totalLen = spans.reduce((s, sp) => s + sp.textContent.length, 0);
  if (!totalLen) return;
  const pre = prefixLen || 0;
  const grand = totalLen + pre;
  let cum = pre;
  hlState = { el, words: spans.map(sp => {
    const start = cum / grand;
    cum += sp.textContent.length;
    return { span: sp, start, end: cum / grand };
  }), idx: -1 };
}

function tickHighlight(audio) {
  if (!hlState || !audio || !audio.duration) return;
  const buf = Math.min(0.4, audio.duration * 0.06);
  const t = Math.max(0, audio.currentTime - buf);
  const d = Math.max(0.1, audio.duration - buf - 0.3);
  const frac = Math.min(1, t / d);
  let idx = hlState.words.findIndex(w => frac < w.end);
  if (idx < 0) idx = hlState.words.length - 1;
  if (idx === hlState.idx) return;
  hlState.words.forEach((w, i) => {
    w.span.classList.toggle('hl-active', i === idx);
    w.span.classList.toggle('hl-spoken', i < idx);
  });
  hlState.idx = idx;
}

function endHighlight() {
  if (!hlState) return;
  hlState.words.forEach(w => {
    w.span.classList.remove('hl-active');
    w.span.classList.add('hl-spoken');
  });
  const el = hlState.el;
  hlState = null;
  setTimeout(() => { if (el && !hlState) el.textContent = el.textContent; }, 800);
}

function _hookHighlight(audio) {
  if (!hlState) return;
  audio.ontimeupdate = () => tickHighlight(audio);
}

const isLocalServer = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '192.168.4.21';

function ttsUrl(text) {
  // When deployed (not localhost), try the pre-generated cache file
  if (!isLocalServer) {
    const hash = md5(text.trim());
    return `audio/cache/${hash}.mp3`;
  }
  return '/tts?text=' + encodeURIComponent(text.trim());
}

// Simple MD5 hash for cache file lookup (matches pregen_audio.py)
function md5(string) {
  function md5cycle(x, k) {
    let a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a,b,c,d,k[0],7,-680876936);d = ff(d,a,b,c,k[1],12,-389564586);c = ff(c,d,a,b,k[2],17,606105819);b = ff(b,c,d,a,k[3],22,-1044525330);
    a = ff(a,b,c,d,k[4],7,-176418897);d = ff(d,a,b,c,k[5],12,1200080426);c = ff(c,d,a,b,k[6],17,-1473231341);b = ff(b,c,d,a,k[7],22,-45705983);
    a = ff(a,b,c,d,k[8],7,1770035416);d = ff(d,a,b,c,k[9],12,-1958414417);c = ff(c,d,a,b,k[10],17,-42063);b = ff(b,c,d,a,k[11],22,-1990404162);
    a = ff(a,b,c,d,k[12],7,1804603682);d = ff(d,a,b,c,k[13],12,-40341101);c = ff(c,d,a,b,k[14],17,-1502002290);b = ff(b,c,d,a,k[15],22,1236535329);
    a = gg(a,b,c,d,k[1],5,-165796510);d = gg(d,a,b,c,k[6],9,-1069501632);c = gg(c,d,a,b,k[11],14,643717713);b = gg(b,c,d,a,k[0],20,-373897302);
    a = gg(a,b,c,d,k[5],5,-701558691);d = gg(d,a,b,c,k[10],9,38016083);c = gg(c,d,a,b,k[15],14,-660478335);b = gg(b,c,d,a,k[4],20,-405537848);
    a = gg(a,b,c,d,k[9],5,568446438);d = gg(d,a,b,c,k[14],9,-1019803690);c = gg(c,d,a,b,k[3],14,-187363961);b = gg(b,c,d,a,k[8],20,1163531501);
    a = gg(a,b,c,d,k[13],5,-1444681467);d = gg(d,a,b,c,k[2],9,-51403784);c = gg(c,d,a,b,k[7],14,1735328473);b = gg(b,c,d,a,k[12],20,-1926607734);
    a = hh(a,b,c,d,k[5],4,-378558);d = hh(d,a,b,c,k[8],11,-2022574463);c = hh(c,d,a,b,k[11],16,1839030562);b = hh(b,c,d,a,k[14],23,-35309556);
    a = hh(a,b,c,d,k[1],4,-1530992060);d = hh(d,a,b,c,k[4],11,1272893353);c = hh(c,d,a,b,k[7],16,-155497632);b = hh(b,c,d,a,k[10],23,-1094730640);
    a = hh(a,b,c,d,k[13],4,681279174);d = hh(d,a,b,c,k[0],11,-358537222);c = hh(c,d,a,b,k[3],16,-722521979);b = hh(b,c,d,a,k[6],23,76029189);
    a = hh(a,b,c,d,k[9],4,-640364487);d = hh(d,a,b,c,k[12],11,-421815835);c = hh(c,d,a,b,k[15],16,530742520);b = hh(b,c,d,a,k[2],23,-995338651);
    a = ii(a,b,c,d,k[0],6,-198630844);d = ii(d,a,b,c,k[7],10,1126891415);c = ii(c,d,a,b,k[14],15,-1416354905);b = ii(b,c,d,a,k[5],21,-57434055);
    a = ii(a,b,c,d,k[12],6,1700485571);d = ii(d,a,b,c,k[3],10,-1894986606);c = ii(c,d,a,b,k[10],15,-1051523);b = ii(b,c,d,a,k[1],21,-2054922799);
    a = ii(a,b,c,d,k[8],6,1873313359);d = ii(d,a,b,c,k[15],10,-30611744);c = ii(c,d,a,b,k[6],15,-1560198380);b = ii(b,c,d,a,k[13],21,1309151649);
    a = ii(a,b,c,d,k[4],6,-145523070);d = ii(d,a,b,c,k[11],10,-1120210379);c = ii(c,d,a,b,k[2],15,718787259);b = ii(b,c,d,a,k[9],21,-343485551);
    x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
  }
  function cmn(q, a, b, x, s, t) { a = add32(add32(a, q), add32(x, t)); return add32((a << s) | (a >>> (32 - s)), b); }
  function ff(a,b,c,d,x,s,t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
  function gg(a,b,c,d,x,s,t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
  function hh(a,b,c,d,x,s,t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a,b,c,d,x,s,t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
  function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
  function md5blk(s) {
    const md5blks = [];
    for (let i = 0; i < 64; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i+1) << 8) + (s.charCodeAt(i+2) << 16) + (s.charCodeAt(i+3) << 24);
    return md5blks;
  }
  const hex_chr = '0123456789abcdef'.split('');
  function rhex(n) { let s = ''; for (let j = 0; j < 4; j++) s += hex_chr[(n >> (j * 8 + 4)) & 0x0f] + hex_chr[(n >> (j * 8)) & 0x0f]; return s; }
  function hex(x) { return x.map(rhex).join(''); }

  let n = string.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
  for (i = 64; i <= n; i += 64) md5cycle(state, md5blk(string.substring(i - 64, i)));
  string = string.substring(i - 64);
  const tail = Array(16).fill(0);
  for (i = 0; i < string.length; i++) tail[i >> 2] |= string.charCodeAt(i) << ((i % 4) << 3);
  tail[i >> 2] |= 0x80 << ((i % 4) << 3);
  if (i > 55) { md5cycle(state, tail); tail.fill(0); }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return hex(state);
}

function playNarration(key, fallbackText, onEnd, highlightEl, highlightText) {
  stopAllAudio();
  if (highlightEl) {
    const hlTxt = highlightText || fallbackText;
    const pre = highlightText ? fallbackText.indexOf(highlightText) : 0;
    setupWordHighlight(highlightEl, hlTxt, pre > 0 ? pre : 0);
  }
  const wrappedEnd = () => { endHighlight(); if (onEnd) onEnd(); };
  const audio = new Audio(`audio/${key}.mp3`);
  let started = false;
  audio.oncanplaythrough = () => {
    if (started) return;
    started = true;
    currentTTSAudio = audio;
    _hookHighlight(audio);
    audio.play().catch(() => {});
    audio.onended = wrappedEnd;
  };
  audio.onerror = () => {
    if (started) return;
    started = true;
    playTTS(fallbackText, wrappedEnd);
  };
  setTimeout(() => {
    if (!started) {
      started = true;
      playTTS(fallbackText, wrappedEnd);
    }
  }, 3000);
}

function playTTS(text, onEnd) {
  stopCurrentTTS();
  if (!text || !text.trim()) { if (onEnd) onEnd(); return; }
  const audio = new Audio(ttsUrl(text));
  currentTTSAudio = audio;
  _hookHighlight(audio);
  audio.onended = () => {
    currentTTSAudio = null;
    if (onEnd) onEnd();
  };
  audio.onerror = () => {
    currentTTSAudio = null;
    if (onEnd) onEnd();
  };
  audio.play().catch(() => { if (onEnd) onEnd(); });
}

// Alias for backward compat — speakQuick now uses TTS audio
function speakQuick(text, onEnd, highlightEl, hlText) {
  stopCurrentTTS();
  if (highlightEl) {
    const t = hlText || text;
    const pre = hlText ? text.indexOf(hlText) : 0;
    setupWordHighlight(highlightEl, t, pre > 0 ? pre : 0);
  }
  playTTS(text, onEnd);
}

// Play a sequence of texts/objects one after another using TTS audio
function speakSequence(texts, onAllDone) {
  ttsQueue = [...texts]; // save queue so we can cancel
  _playNextInSequence(texts, onAllDone);
}

function _playNextInSequence(items, onAllDone) {
  if (!items.length) { ttsQueue = []; if (onAllDone) onAllDone(); return; }
  const [first, ...rest] = items;
  const text = typeof first === 'string' ? first : first.text;
  const onStart = typeof first === 'object' ? first.onStart : null;
  if (onStart) onStart();
  playTTS(text, () => {
    setTimeout(() => _playNextInSequence(rest, onAllDone), 300);
  });
}

function stopCurrentTTS() {
  ttsQueue = [];
  if (currentTTSAudio) {
    currentTTSAudio.pause();
    currentTTSAudio.currentTime = 0;
    currentTTSAudio = null;
  }
}

function stopAllAudio() {
  stopCurrentTTS();
  endHighlight();
  if (currentNarrationAudio) { currentNarrationAudio.pause(); currentNarrationAudio = null; }
  stopBgMusic();
}

// ============ PARTICLES ============
const FAITH_PARTICLES = ['✝️', '⭐', '🕯️', '✨', '🌟', '💫', '🕊️'];
const HEALTH_PARTICLES = ['🍎', '🥦', '🍊', '🌿', '🌻', '💚', '🥕'];
const MUSIC_PARTICLES = ['🎵', '🎶', '🎸', '🥁', '🎹', '🎺', '🎻'];
const BRAIN_PARTICLES = ['🧠', '💡', '⚡', '🔮', '✨', '🎯', '🧩'];
const EXERCISE_PARTICLES = ['🏃', '💪', '⭐', '🔥', '🦘', '🤸', '🏆'];
const MAIN_PARTICLES = ['⭐', '✨', '🌟', '💫', '🎵'];

function spawnParticles(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.textContent = items[Math.floor(Math.random() * items.length)];
    container.appendChild(p);
  }
}

// ============ CORE SYSTEM ============
let currentPlayer = null;
let players = JSON.parse(localStorage.getItem('klh_players') || '[]');
const AVATARS = [
  { emoji: '🌲', name: 'Cedar' }, { emoji: '🕊️', name: 'Dove' },
  { emoji: '⭐', name: 'Star' }, { emoji: '✝️', name: 'Cross' },
  { emoji: '❤️', name: 'Heart' }, { emoji: '🍎', name: 'Apple' },
];
let setupSlotIndex = -1;
let selectedAvatar = 0;

function savePlayers() { localStorage.setItem('klh_players', JSON.stringify(players)); }

function openScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) {
    screen.classList.add('active');
    updateStarsDisplays();
    setTimeout(() => {
      const btn = screen.querySelector('button, [tabindex="0"], input');
      if (btn) btn.focus();
    }, 120);
  }
  // Spawn particles for relevant screens
  if (id === 'player-screen') spawnParticles('particles-main', MAIN_PARTICLES);
  if (id === 'hub-screen') spawnParticles('particles-hub', MAIN_PARTICLES);
  if (id === 'faith-hub') spawnParticles('particles-faith', FAITH_PARTICLES);
  if (id === 'health-hub') spawnParticles('particles-health', HEALTH_PARTICLES);
  if (id === 'story-screen') spawnParticles('particles-story', FAITH_PARTICLES);
  if (id === 'faith-memory-screen') spawnParticles('particles-fmem', FAITH_PARTICLES);
  if (id === 'music-hub') spawnParticles('particles-music', MUSIC_PARTICLES);
  if (id === 'music-explorer-screen') spawnParticles('particles-mexplore', MUSIC_PARTICLES);
  if (id === 'brain-hub') spawnParticles('particles-brain', BRAIN_PARTICLES);
  if (id === 'exercise-hub') spawnParticles('particles-exercise', EXERCISE_PARTICLES);
}

function updateStarsDisplays() {
  const stars = currentPlayer ? (currentPlayer.stars || 0) : 0;
  document.querySelectorAll('.player-stars').forEach(el => el.textContent = stars);
}

function addStars(n) {
  if (!currentPlayer) return;
  currentPlayer.stars = (currentPlayer.stars || 0) + n;
  savePlayers();
  updateStarsDisplays();
}

// ============ PLAYER SELECT ============
function renderPlayerSlots() {
  const container = document.getElementById('player-slots');
  container.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const p = players[i];
    const btn = document.createElement('button');
    btn.className = 'player-slot' + (p ? '' : ' empty');
    if (p) {
      btn.innerHTML = `<div class="slot-avatar">${p.avatar}</div><div class="slot-name">${p.name}</div><div class="slot-stars">⭐ ${p.stars || 0} Stars</div>`;
      btn.onclick = () => { currentPlayer = players[i]; savePlayers(); openScreen('hub-screen'); renderHubPlayer(); };
    } else {
      btn.innerHTML = `<div class="slot-avatar" style="opacity:0.3">➕</div><div class="slot-name">New Player</div>`;
      btn.onclick = () => { setupSlotIndex = i; openSetup(); };
    }
    container.appendChild(btn);
  }
}

function openSetup() {
  openScreen('setup-screen');
  document.getElementById('setup-name').value = '';
  selectedAvatar = 0;
  renderAvatarGrid();
}

function renderAvatarGrid() {
  const grid = document.getElementById('avatar-grid');
  grid.innerHTML = '';
  AVATARS.forEach((a, i) => {
    const btn = document.createElement('button');
    btn.className = 'avatar-option' + (i === selectedAvatar ? ' selected' : '');
    btn.textContent = a.emoji;
    btn.onclick = () => { selectedAvatar = i; renderAvatarGrid(); SFX.pop(); };
    grid.appendChild(btn);
  });
}

function saveNewPlayer() {
  const name = document.getElementById('setup-name').value.trim();
  if (!name) { document.getElementById('setup-name').focus(); return; }
  const p = { name, avatar: AVATARS[selectedAvatar].emoji, stars: 0 };
  players[setupSlotIndex] = p;
  savePlayers();
  currentPlayer = p;
  SFX.faithCorrect();
  openScreen('hub-screen');
  renderHubPlayer();
}

function renderHubPlayer() {
  const el = document.getElementById('hub-player-info');
  if (currentPlayer) {
    el.innerHTML = `<span class="player-avatar-sm">${currentPlayer.avatar}</span> ${currentPlayer.name} <span style="color:var(--faith-gold)">⭐ ${currentPlayer.stars || 0}</span>`;
  }
}

// ============ CELEBRATION ============
function celebrate(text, stars) {
  const overlay = document.getElementById('celebration');
  overlay.classList.remove('hidden');
  document.getElementById('celebration-text').innerHTML = text;
  document.getElementById('celebration-stars').textContent = stars > 0 ? '⭐'.repeat(stars) : '';
  if (stars > 0) addStars(stars);
  SFX.celebrate();
  // Confetti
  const cc = document.getElementById('confetti-container');
  cc.innerHTML = '';
  const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#03A9F4', '#FF9800', '#E91E63', '#9C27B0', '#00BCD4'];
  for (let i = 0; i < 100; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (2.5 + Math.random() * 3) + 's';
    c.style.animationDelay = Math.random() * 1.5 + 's';
    c.style.width = (6 + Math.random() * 12) + 'px';
    c.style.height = (6 + Math.random() * 12) + 'px';
    const shapes = ['50%', '2px', '0'];
    c.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
    cc.appendChild(c);
  }
  // Firework bursts
  for (let b = 0; b < 3; b++) {
    setTimeout(() => {
      const cx = 20 + Math.random() * 60;
      const cy = 20 + Math.random() * 40;
      for (let i = 0; i < 20; i++) {
        const fw = document.createElement('div');
        fw.className = 'firework';
        fw.style.left = cx + '%'; fw.style.top = cy + '%';
        fw.style.background = colors[Math.floor(Math.random() * colors.length)];
        const angle = (i / 20) * Math.PI * 2;
        const dist = 60 + Math.random() * 80;
        fw.style.setProperty('--fw-x', Math.cos(angle) * dist + 'px');
        fw.style.setProperty('--fw-y', Math.sin(angle) * dist + 'px');
        cc.appendChild(fw);
      }
    }, b * 400);
  }
  speakQuick(text.replace(/[^\w\s!]/g, ''));
}

function closeCelebration() {
  document.getElementById('celebration').classList.add('hidden');
  stopAllAudio();
}

// ===========================================================
//  SECTION A: FAITH
// ===========================================================

// ============ A1: STORYBOOK with ANIMATED ILLUSTRATIONS ============
const SPARKLES_HTML = '<div class="sparkles"><span class="sparkle">✨</span><span class="sparkle">⭐</span><span class="sparkle">✨</span><span class="sparkle">🌟</span><span class="sparkle">✨</span><span class="sparkle">⭐</span></div>';

const storyPages = [
  {
    chapter: 'Chapter 1 — A Village in the Mountains',
    text: "Long ago, in 1828, a baby boy named Youssef was born in a tiny mountain village called Beka Kafra in Lebanon. The village was surrounded by beautiful cedar trees and snowy mountain peaks.",
    scene: `<div class="illust scene-1">
      <div class="sky"></div>
      <div class="el mountain1"></div><div class="el mountain2"></div>
      <div class="el snow1"></div><div class="el snow2"></div>
      <div class="ground"></div>
      <div class="el" style="bottom:28%;left:12%;font-size:3rem;">🌲</div>
      <div class="el" style="bottom:28%;left:22%;font-size:2.5rem;">🌲</div>
      <div class="el" style="bottom:30%;right:22%;font-size:2.8rem;">🌲</div>
      <div class="el" style="bottom:30%;left:38%;font-size:3.5rem;">🏘️</div>
      <div class="el float" style="top:5%;left:40%;font-size:3rem;">⭐</div>
      <div class="el char char-sm" style="bottom:30%;left:54%;"><div class="ch-head"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char" style="bottom:32%;left:62%;"><div class="ch-baby-head"></div><div class="ch-swaddle"></div></div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'story-1'
  },
  {
    chapter: 'Chapter 2 — The Young Shepherd',
    text: "Young Youssef loved spending time in nature. He would take the sheep to graze on the green hills, and while they ate, he would sit quietly and pray. Even as a child, he felt close to God.",
    scene: `<div class="illust scene-2">
      <div class="sky"></div>
      <div class="el hill"></div><div class="el hill2"></div>
      <div class="ground"></div>
      <div class="el sun"></div>
      <div class="el" style="bottom:38%;left:18%;font-size:3rem;">🐑</div>
      <div class="el" style="bottom:40%;left:33%;font-size:2.5rem;">🐑</div>
      <div class="el" style="bottom:36%;right:28%;font-size:2.8rem;">🐑</div>
      <div class="el char char-float" style="bottom:36%;left:52%;"><div class="ch-head"></div><div class="ch-tunic green"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div><div class="ch-staff"></div></div>
      <div class="el" style="bottom:42%;right:20%;font-size:2rem;">🌸</div>
      <div class="el" style="bottom:38%;left:8%;font-size:1.8rem;">🌼</div>
      <div class="el" style="top:15%;left:20%;font-size:2rem;">🦋</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'story-2'
  },
  {
    chapter: 'Chapter 3 — The Call to Serve',
    text: "When Youssef grew up, he knew God was calling him to something special. He left his family and his village to join a monastery, where monks spent their lives praying and serving God.",
    scene: `<div class="illust scene-3">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el path"></div>
      <div class="el monastery-base"></div>
      <div class="el monastery-roof"></div>
      <div class="el cross-top">✝️</div>
      <div class="el char char-float" style="bottom:30%;left:12%;"><div class="ch-head"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="top:20%;right:25%;font-size:2rem;">🕊️</div>
      <div class="el" style="top:15%;right:35%;font-size:1.8rem;">🕊️</div>
      <div class="el" style="bottom:35%;right:12%;font-size:2.5rem;">🌲</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'story-3'
  },
  {
    chapter: 'Chapter 4 — Brother Charbel',
    text: "At the monastery, he was given the name Charbel, after an ancient saint. Brother Charbel spent his days praying, working in the fields, and helping others. He was kind, humble, and always joyful.",
    scene: `<div class="illust scene-4">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el arch"></div>
      <div class="el window-light"></div>
      <div class="el" style="top:8%;left:45%;font-size:3.5rem;">✝️</div>
      <div class="el char char-kneel char-pray" style="bottom:16%;left:40%;"><div class="ch-halo"></div><div class="ch-head dark"></div><div class="ch-robe"></div></div>
      <div class="el" style="bottom:16%;left:22%;font-size:2.5rem;">🕯️</div>
      <div class="el" style="bottom:16%;right:22%;font-size:2.5rem;">🕯️</div>
      <div class="el" style="bottom:16%;left:30%;font-size:2rem;">🕯️</div>
      <div class="el" style="bottom:16%;right:30%;font-size:2rem;">🕯️</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'story-4'
  },
  {
    chapter: 'Chapter 5 — The Hermit',
    text: "Charbel loved God so much that he asked to live as a hermit — all alone in a small room, spending every moment in prayer and silence. For 23 years, he prayed, fasted, and lived simply.",
    scene: `<div class="illust scene-5">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el moon"></div>
      <div class="el hermitage"></div>
      <div class="el hermitage-roof"></div>
      <div class="el hermitage-door"></div>
      <div class="el" style="top:8%;left:10%;font-size:1.5rem;">⭐</div>
      <div class="el" style="top:15%;left:30%;font-size:1rem;">⭐</div>
      <div class="el" style="top:5%;left:50%;font-size:1.3rem;">⭐</div>
      <div class="el" style="top:20%;left:70%;font-size:0.8rem;">⭐</div>
      <div class="el" style="top:10%;right:5%;font-size:1.2rem;">⭐</div>
      <div class="el char char-kneel char-pray" style="bottom:24%;left:58%;"><div class="ch-halo"></div><div class="ch-head dark"></div><div class="ch-robe"></div></div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'story-5'
  },
  {
    chapter: 'Chapter 6 — A Peaceful Light',
    text: "Even though Charbel lived quietly, people could feel his holiness. His simple, peaceful life inspired everyone who knew him. He showed that you don't need big things to be great — just a loving heart.",
    scene: `<div class="illust scene-6">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el river"></div>
      <div class="el glow"></div>
      <div class="el char char-float" style="bottom:33%;left:40%;"><div class="ch-halo"></div><div class="ch-head dark"></div><div class="ch-robe"></div></div>
      <div class="el" style="bottom:35%;left:15%;font-size:2.5rem;">🌷</div>
      <div class="el" style="bottom:35%;right:15%;font-size:2.5rem;">🌻</div>
      <div class="el" style="bottom:37%;left:68%;font-size:2rem;">🌸</div>
      <div class="el" style="top:15%;left:15%;font-size:2rem;">🕊️</div>
      <div class="el" style="top:20%;right:20%;font-size:1.8rem;">🦋</div>
      <div class="el char char-sm" style="bottom:33%;left:18%;"><div class="ch-head"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:33%;right:18%;"><div class="ch-head blond"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'story-6'
  },
  {
    chapter: 'Chapter 7 — Miracles',
    text: "After St. Charbel passed away in 1898, something amazing happened. A bright light was seen glowing from his tomb! People who prayed to him began to be healed. Miracle after miracle was reported.",
    scene: `<div class="illust scene-7">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el tomb"></div>
      <div class="el tomb-top"></div>
      <div class="el light-ray"></div>
      <div class="el" style="bottom:28%;left:33%;font-size:2.5rem;">✝️</div>
      <div class="el char char-sm" style="bottom:24%;left:8%;"><div class="ch-head dark"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:24%;left:17%;"><div class="ch-head"></div><div class="ch-tunic red"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:24%;right:14%;"><div class="ch-head blond"></div><div class="ch-tunic purple"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:24%;right:6%;"><div class="ch-head"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="bottom:24%;left:58%;font-size:2rem;">🕯️</div>
      <div class="el" style="bottom:24%;right:24%;font-size:2rem;">🕯️</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'story-7'
  },
  {
    chapter: 'Chapter 8 — A Light for the World',
    text: "Today, St. Charbel is loved by millions of people all around the world. He teaches us that prayer, kindness, and a simple heart can change the world. His light continues to shine for all of us!",
    scene: `<div class="illust scene-8">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el rays"></div>
      <div class="el cedar"><div class="cedar-trunk"></div><div class="cedar-layer1"></div><div class="cedar-layer2"></div><div class="cedar-layer3"></div></div>
      <div class="el" style="top:10%;left:15%;font-size:3rem;">💛</div>
      <div class="el" style="top:15%;right:15%;font-size:2.5rem;">❤️</div>
      <div class="el" style="top:25%;left:10%;font-size:2rem;">💛</div>
      <div class="el" style="top:20%;right:30%;font-size:2.5rem;">🌍</div>
      <div class="el" style="top:8%;left:45%;font-size:3rem;">⭐</div>
      <div class="el char char-sm" style="bottom:20%;left:8%;"><div class="ch-head dark"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:20%;left:18%;"><div class="ch-head"></div><div class="ch-tunic green"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:20%;right:8%;"><div class="ch-head blond"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:20%;right:18%;"><div class="ch-head dark"></div><div class="ch-tunic red"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'story-8'
  }
];

// --- St. Francis Story ---
const francisPages = [
  {
    chapter: 'Chapter 1 — A Boy in Assisi',
    text: "Long ago, in a beautiful town called Assisi in Italy, a boy named Francis was born to a very rich family. His father sold fine cloth, and Francis had everything a boy could want!",
    scene: `<div class="illust scene-fr-1">
      <div class="sky"></div>
      <div class="el fr-hills"></div>
      <div class="ground"></div>
      <div class="el sun"></div>
      <div class="el" style="bottom:30%;left:25%;font-size:3.5rem;">🏘️</div>
      <div class="el" style="bottom:30%;right:25%;font-size:2.5rem;">🌲</div>
      <div class="el" style="bottom:30%;right:35%;font-size:2rem;">🌲</div>
      <div class="el char char-float" style="bottom:30%;left:58%;"><div class="ch-head"></div><div class="ch-tunic red"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="top:12%;left:18%;font-size:2rem;">🕊️</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'francis-1'
  },
  {
    chapter: 'Chapter 2 — A Life of Fun',
    text: "Young Francis loved parties and having fun with his friends. He wore the fanciest clothes and spent money like a prince! But deep inside, he felt something was missing.",
    scene: `<div class="illust scene-fr-2">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el" style="top:10%;left:15%;font-size:2.5rem;">🎉</div>
      <div class="el" style="top:15%;right:20%;font-size:2rem;">🎶</div>
      <div class="el" style="top:8%;left:45%;font-size:2rem;">🎊</div>
      <div class="el char char-float" style="bottom:28%;left:38%;"><div class="ch-head"></div><div class="ch-tunic gold"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:28%;left:22%;"><div class="ch-head dark"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:28%;right:22%;"><div class="ch-head blond"></div><div class="ch-tunic green"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="bottom:28%;left:8%;font-size:2.5rem;">🏺</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'francis-2'
  },
  {
    chapter: 'Chapter 3 — God Speaks to Francis',
    text: "One day, Francis was praying in a small, broken-down church when he heard God's voice say: Rebuild my church! Francis knew God was calling him to something amazing.",
    scene: `<div class="illust scene-fr-3">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el fr-ruined-wall1"></div>
      <div class="el fr-ruined-wall2"></div>
      <div class="el window-light"></div>
      <div class="el" style="top:8%;left:42%;font-size:3.5rem;">✝️</div>
      <div class="el char char-kneel char-pray" style="bottom:18%;left:40%;"><div class="ch-head"></div><div class="ch-robe brown"></div></div>
      <div class="el" style="bottom:18%;left:22%;font-size:2rem;">🕯️</div>
      <div class="el" style="bottom:18%;right:22%;font-size:2rem;">🕯️</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'francis-3'
  },
  {
    chapter: 'Chapter 4 — Giving Everything Away',
    text: "Francis gave away all his fancy clothes and his father's money to help the poor. He chose to live simply, just like Jesus, wearing only a plain brown robe.",
    scene: `<div class="illust scene-fr-4">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el" style="bottom:35%;left:15%;font-size:2.5rem;">🏘️</div>
      <div class="el char char-float" style="bottom:28%;left:35%;"><div class="ch-halo"></div><div class="ch-head"></div><div class="ch-robe brown"></div></div>
      <div class="el char char-sm" style="bottom:28%;right:30%;"><div class="ch-head dark"></div><div class="ch-tunic purple"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="bottom:36%;left:50%;font-size:2rem;">👘</div>
      <div class="el" style="top:15%;right:15%;font-size:2rem;">🕊️</div>
      <div class="el" style="top:20%;left:15%;font-size:1.8rem;">☀️</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'francis-4'
  },
  {
    chapter: 'Chapter 5 — Preaching to the Birds',
    text: "Francis loved all of God's creatures! One day, he preached a sermon to the birds, and they all gathered around to listen. He called them his little brothers and sisters.",
    scene: `<div class="illust scene-fr-5">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el" style="bottom:38%;left:8%;font-size:2.5rem;">🌲</div>
      <div class="el" style="bottom:38%;right:8%;font-size:2.8rem;">🌲</div>
      <div class="el char char-float" style="bottom:32%;left:38%;"><div class="ch-halo"></div><div class="ch-head"></div><div class="ch-robe brown"></div></div>
      <div class="el" style="bottom:38%;left:25%;font-size:2rem;">🐦</div>
      <div class="el" style="bottom:34%;right:25%;font-size:1.8rem;">🐦</div>
      <div class="el" style="bottom:40%;left:55%;font-size:1.6rem;">🐦</div>
      <div class="el" style="top:15%;left:30%;font-size:2rem;">🕊️</div>
      <div class="el" style="top:20%;right:25%;font-size:1.8rem;">🕊️</div>
      <div class="el" style="top:12%;right:40%;font-size:2.2rem;">🕊️</div>
      <div class="el" style="bottom:35%;left:18%;font-size:1.5rem;">🌸</div>
      <div class="el" style="bottom:35%;right:18%;font-size:1.5rem;">🌼</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'francis-5'
  },
  {
    chapter: 'Chapter 6 — The Wolf of Gubbio',
    text: "A scary wolf was frightening the people of a town called Gubbio. But Francis walked up to the wolf and spoke gently to it. The wolf became calm and never hurt anyone again!",
    scene: `<div class="illust scene-fr-6">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el" style="bottom:35%;right:10%;font-size:2.5rem;">🏘️</div>
      <div class="el char char-float" style="bottom:28%;left:30%;"><div class="ch-halo"></div><div class="ch-head"></div><div class="ch-robe brown"></div></div>
      <div class="el" style="bottom:28%;left:52%;font-size:3.5rem;">🐺</div>
      <div class="el char char-xs" style="bottom:28%;right:20%;"><div class="ch-head dark"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:28%;right:14%;"><div class="ch-head blond"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="top:18%;left:12%;font-size:1.8rem;">🌙</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'francis-6'
  },
  {
    chapter: 'Chapter 7 — The Gift of the Stigmata',
    text: "While praying on a mountaintop, Francis received a special gift from God — the marks of Jesus on his hands and feet, called the stigmata. He was filled with God's love.",
    scene: `<div class="illust scene-fr-7">
      <div class="sky"></div>
      <div class="el fr-mountain"></div>
      <div class="ground"></div>
      <div class="el light-ray"></div>
      <div class="el" style="top:5%;left:42%;font-size:3rem;">✝️</div>
      <div class="el char char-kneel char-pray" style="bottom:32%;left:38%;"><div class="ch-halo"></div><div class="ch-head"></div><div class="ch-robe brown"></div></div>
      <div class="el" style="top:15%;left:20%;font-size:1.5rem;">⭐</div>
      <div class="el" style="top:10%;right:20%;font-size:1.2rem;">⭐</div>
      <div class="el" style="top:20%;right:35%;font-size:1rem;">⭐</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'francis-7'
  },
  {
    chapter: 'Chapter 8 — A Saint of Peace',
    text: "St. Francis taught the whole world to love nature, care for animals, and live with a joyful, simple heart. He is the patron saint of animals and reminds us that peace starts with kindness!",
    scene: `<div class="illust scene-fr-8">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el rays"></div>
      <div class="el" style="top:8%;left:42%;font-size:3rem;">☀️</div>
      <div class="el" style="top:15%;left:15%;font-size:2.5rem;">🕊️</div>
      <div class="el" style="top:12%;right:15%;font-size:2rem;">🕊️</div>
      <div class="el" style="top:20%;right:30%;font-size:2.5rem;">🌍</div>
      <div class="el" style="bottom:32%;left:10%;font-size:2rem;">🌸</div>
      <div class="el" style="bottom:32%;right:10%;font-size:2rem;">🌻</div>
      <div class="el char char-sm" style="bottom:28%;left:20%;"><div class="ch-head dark"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:28%;left:30%;"><div class="ch-head blond"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-float" style="bottom:28%;left:45%;"><div class="ch-halo"></div><div class="ch-head"></div><div class="ch-robe brown"></div></div>
      <div class="el char char-sm" style="bottom:28%;right:20%;"><div class="ch-head"></div><div class="ch-tunic green"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="bottom:36%;left:60%;font-size:1.8rem;">🐦</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'francis-8'
  }
];

// --- St. Clare Story ---
const clarePages = [
  {
    chapter: 'Chapter 1 — A Noble Girl',
    text: "In the town of Assisi, there lived a beautiful girl named Clare who came from a noble, wealthy family. She had a kind heart and always thought about how she could help others.",
    scene: `<div class="illust scene-cl-1">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el" style="bottom:32%;left:15%;font-size:3.5rem;">🏠</div>
      <div class="el" style="bottom:32%;left:35%;font-size:2.5rem;">🌷</div>
      <div class="el char char-float" style="bottom:30%;left:55%;"><div class="ch-head blond"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="bottom:30%;right:15%;font-size:2.5rem;">🌲</div>
      <div class="el" style="top:10%;right:15%;font-size:2rem;">☀️</div>
      <div class="el" style="top:18%;left:20%;font-size:1.8rem;">🦋</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'clare-1'
  },
  {
    chapter: 'Chapter 2 — Hearing Francis Preach',
    text: "One day, Clare heard a young man named Francis preaching about God's love. His words touched her heart so deeply that she knew she wanted to give her life to God too!",
    scene: `<div class="illust scene-cl-2">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el arch"></div>
      <div class="el window-light"></div>
      <div class="el" style="top:8%;left:45%;font-size:3rem;">✝️</div>
      <div class="el char char-float" style="bottom:18%;left:30%;"><div class="ch-halo"></div><div class="ch-head"></div><div class="ch-robe brown"></div></div>
      <div class="el char" style="bottom:18%;right:28%;"><div class="ch-head blond"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="bottom:18%;left:18%;font-size:2rem;">🕯️</div>
      <div class="el" style="bottom:18%;right:18%;font-size:2rem;">🕯️</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'clare-2'
  },
  {
    chapter: 'Chapter 3 — Running Away by Night',
    text: "On a dark, quiet night, Clare secretly left her family's home. She ran through the fields to find Francis, carrying nothing but her faith and courage. She was ready for a new life!",
    scene: `<div class="illust scene-cl-3">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el moon"></div>
      <div class="el" style="top:8%;left:10%;font-size:1.5rem;">⭐</div>
      <div class="el" style="top:15%;left:30%;font-size:1rem;">⭐</div>
      <div class="el" style="top:5%;left:55%;font-size:1.3rem;">⭐</div>
      <div class="el" style="top:18%;right:15%;font-size:0.8rem;">⭐</div>
      <div class="el" style="top:10%;right:30%;font-size:1.2rem;">⭐</div>
      <div class="el char char-float" style="bottom:28%;left:45%;"><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="bottom:32%;left:38%;font-size:2rem;">🕯️</div>
      <div class="el" style="bottom:30%;left:12%;font-size:2.5rem;">🏠</div>
      <div class="el" style="bottom:30%;right:15%;font-size:2rem;">🌲</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'clare-3'
  },
  {
    chapter: 'Chapter 4 — The Poor Clares',
    text: "Clare started a group of sisters called the Poor Clares. They lived together in a simple convent, praying, singing, and helping the poor. They didn't need fancy things to be happy!",
    scene: `<div class="illust scene-cl-4">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el cl-convent"></div>
      <div class="el cl-convent-roof"></div>
      <div class="el" style="top:12%;left:38%;font-size:2.5rem;">✝️</div>
      <div class="el char char-float" style="bottom:26%;left:20%;"><div class="ch-halo"></div><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el char char-sm" style="bottom:26%;left:35%;"><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el char char-sm" style="bottom:26%;right:30%;"><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el char char-xs" style="bottom:26%;right:22%;"><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el" style="bottom:30%;right:10%;font-size:2rem;">🌷</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'clare-4'
  },
  {
    chapter: 'Chapter 5 — A Life of Prayer',
    text: "Clare spent many hours every day praying before the Blessed Sacrament. Her love for Jesus was so strong that her face would glow with a beautiful, warm light!",
    scene: `<div class="illust scene-cl-5">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el arch"></div>
      <div class="el glow"></div>
      <div class="el cl-monstrance"></div>
      <div class="el char char-kneel char-pray" style="bottom:16%;left:38%;"><div class="ch-halo"></div><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el" style="bottom:16%;left:18%;font-size:2.5rem;">🕯️</div>
      <div class="el" style="bottom:16%;right:18%;font-size:2.5rem;">🕯️</div>
      <div class="el" style="bottom:16%;left:28%;font-size:2rem;">🕯️</div>
      <div class="el" style="bottom:16%;right:28%;font-size:2rem;">🕯️</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'clare-5'
  },
  {
    chapter: 'Chapter 6 — Protecting Her Sisters',
    text: "When enemy soldiers came to attack the convent, brave Clare held up the golden monstrance with the Blessed Sacrament. The soldiers were so amazed that they turned around and left!",
    scene: `<div class="illust scene-cl-6">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el cl-wall"></div>
      <div class="el glow"></div>
      <div class="el char char-float" style="bottom:26%;left:55%;"><div class="ch-halo"></div><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el" style="bottom:44%;left:58%;font-size:2rem;">✝️</div>
      <div class="el char char-sm" style="bottom:26%;left:10%;"><div class="ch-head dark"></div><div class="ch-tunic dark-armor"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:26%;left:22%;"><div class="ch-head dark"></div><div class="ch-tunic dark-armor"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:26%;right:18%;"><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'clare-6'
  },
  {
    chapter: 'Chapter 7 — Joy in Simplicity',
    text: "Clare and her sisters grew vegetables, made beautiful things, and cared for the sick. They showed everyone that true joy comes from loving God and living simply.",
    scene: `<div class="illust scene-cl-7">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el sun"></div>
      <div class="el" style="bottom:35%;left:8%;font-size:2rem;">🌷</div>
      <div class="el" style="bottom:35%;left:18%;font-size:1.8rem;">🌻</div>
      <div class="el" style="bottom:35%;right:8%;font-size:2rem;">🌸</div>
      <div class="el" style="bottom:35%;right:18%;font-size:1.8rem;">🌼</div>
      <div class="el char char-float" style="bottom:28%;left:25%;"><div class="ch-halo"></div><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el char char-sm" style="bottom:28%;left:42%;"><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el char char-sm" style="bottom:28%;right:25%;"><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el" style="top:15%;left:15%;font-size:2rem;">🦋</div>
      <div class="el" style="top:20%;right:20%;font-size:1.8rem;">🐦</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'clare-7'
  },
  {
    chapter: 'Chapter 8 — A Light for All',
    text: "St. Clare's light shines for all of us today! She teaches us that you don't need riches to be happy — just a heart full of love, prayer, and kindness toward others!",
    scene: `<div class="illust scene-cl-8">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el rays"></div>
      <div class="el" style="top:8%;left:42%;font-size:3rem;">⭐</div>
      <div class="el" style="top:15%;left:15%;font-size:2.5rem;">💛</div>
      <div class="el" style="top:12%;right:15%;font-size:2rem;">❤️</div>
      <div class="el" style="top:20%;right:30%;font-size:2.5rem;">🌍</div>
      <div class="el char char-float" style="bottom:24%;left:38%;"><div class="ch-halo"></div><div class="ch-head veiled"></div><div class="ch-robe white"></div></div>
      <div class="el char char-sm" style="bottom:24%;left:15%;"><div class="ch-head dark"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:24%;left:25%;"><div class="ch-head blond"></div><div class="ch-tunic green"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:24%;right:15%;"><div class="ch-head"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:24%;right:25%;"><div class="ch-head dark"></div><div class="ch-tunic red"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'clare-8'
  }
];

// --- St. Michael the Archangel Story ---
const michaelPages = [
  {
    chapter: "Chapter 1 — God's Mighty Warrior",
    text: "In heaven, there is a mighty and powerful angel named Michael. He is the leader of all God's angels, and his name means Who is like God? He is brave, strong, and full of light!",
    scene: `<div class="illust scene-mi-1">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el mi-cloud1"></div>
      <div class="el mi-cloud2"></div>
      <div class="el mi-cloud3"></div>
      <div class="el rays"></div>
      <div class="el char char-float" style="bottom:30%;left:35%;"><div class="ch-wings"></div><div class="ch-halo"></div><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div><div class="ch-sword"></div></div>
      <div class="el" style="top:8%;left:15%;font-size:2rem;">⭐</div>
      <div class="el" style="top:12%;right:18%;font-size:1.5rem;">⭐</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'michael-1'
  },
  {
    chapter: 'Chapter 2 — The Battle in Heaven',
    text: "Long ago, a great battle took place in heaven. The evil angel Lucifer tried to fight against God. But Michael the Archangel stood up and said: No one is greater than God!",
    scene: `<div class="illust scene-mi-2">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el" style="top:10%;left:30%;font-size:2.5rem;">⚡</div>
      <div class="el" style="top:20%;right:35%;font-size:2rem;">⚡</div>
      <div class="el char char-float" style="bottom:30%;left:20%;"><div class="ch-wings"></div><div class="ch-halo"></div><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div><div class="ch-sword"></div></div>
      <div class="el dark-shape" style="bottom:30%;right:20%;"></div>
      <div class="el char char-xs char-float" style="bottom:38%;left:8%;"><div class="ch-wings"></div><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs char-float" style="bottom:42%;left:15%;"><div class="ch-wings"></div><div class="ch-head"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'michael-2'
  },
  {
    chapter: 'Chapter 3 — Cast Down the Dragon',
    text: "With his mighty sword of light, Michael defeated the dragon and cast him down from heaven! All the good angels cheered, and heaven was filled with peace and joy.",
    scene: `<div class="illust scene-mi-3">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el light-ray" style="left:25%;"></div>
      <div class="el light-ray" style="left:45%;"></div>
      <div class="el char char-float" style="bottom:40%;left:32%;"><div class="ch-wings"></div><div class="ch-halo"></div><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div><div class="ch-sword"></div></div>
      <div class="el dark-shape" style="bottom:15%;left:38%;opacity:0.5;"></div>
      <div class="el" style="top:5%;left:15%;font-size:2.5rem;">⭐</div>
      <div class="el" style="top:10%;right:15%;font-size:2rem;">⭐</div>
      <div class="el" style="top:15%;left:40%;font-size:3rem;">✝️</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'michael-3'
  },
  {
    chapter: "Chapter 4 — Protector of God's People",
    text: "St. Michael is always watching over God's people. Like a loving guardian, he protects families, children, and everyone who calls on his name. He is our heavenly shield!",
    scene: `<div class="illust scene-mi-4">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el glow"></div>
      <div class="el char char-float" style="top:12%;left:35%;"><div class="ch-wings"></div><div class="ch-halo"></div><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div><div class="ch-shield"></div></div>
      <div class="el char char-sm" style="bottom:25%;left:15%;"><div class="ch-head dark"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:25%;left:26%;"><div class="ch-head blond"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:25%;right:20%;"><div class="ch-head"></div><div class="ch-tunic green"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:25%;right:30%;"><div class="ch-head dark"></div><div class="ch-tunic red"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="top:10%;right:12%;font-size:2rem;">☀️</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'michael-4'
  },
  {
    chapter: 'Chapter 5 — Helping Those in Need',
    text: "Whenever someone is in danger or feeling scared, St. Michael comes to help! He brings courage and strength to those who pray to him. You are never alone with Michael by your side.",
    scene: `<div class="illust scene-mi-5">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el glow"></div>
      <div class="el char char-sm" style="bottom:28%;left:20%;"><div class="ch-head"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-float" style="bottom:32%;right:22%;"><div class="ch-wings"></div><div class="ch-halo"></div><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div><div class="ch-shield"></div></div>
      <div class="el" style="top:10%;left:10%;font-size:1.5rem;">⭐</div>
      <div class="el" style="top:15%;right:15%;font-size:1.2rem;">⭐</div>
      <div class="el" style="top:8%;left:45%;font-size:2rem;">⭐</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'michael-5'
  },
  {
    chapter: 'Chapter 6 — Guardian of the Church',
    text: "St. Michael is the special guardian of the Church. He stands watch over all of God's people, keeping them safe from harm. He is the strongest of all the angels!",
    scene: `<div class="illust scene-mi-6">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el monastery-base"></div>
      <div class="el monastery-roof"></div>
      <div class="el cross-top">✝️</div>
      <div class="el char char-float" style="top:10%;left:55%;"><div class="ch-wings"></div><div class="ch-halo"></div><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div><div class="ch-sword"></div></div>
      <div class="el char char-xs" style="bottom:26%;left:10%;"><div class="ch-head dark"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:26%;left:20%;"><div class="ch-head blond"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el" style="bottom:28%;right:15%;font-size:2.5rem;">🌲</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'michael-6'
  },
  {
    chapter: 'Chapter 7 — The Prayer to St. Michael',
    text: "Many people pray the Prayer to St. Michael every day for protection. When you say this prayer, you are asking the mightiest angel in heaven to be your protector!",
    scene: `<div class="illust scene-mi-7">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el glow"></div>
      <div class="el char char-kneel char-pray" style="bottom:20%;left:28%;"><div class="ch-head"></div><div class="ch-tunic blue"></div></div>
      <div class="el char char-float" style="bottom:28%;right:22%;"><div class="ch-wings"></div><div class="ch-halo"></div><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div><div class="ch-shield"></div></div>
      <div class="el" style="bottom:20%;left:18%;font-size:2rem;">🕯️</div>
      <div class="el" style="bottom:20%;left:44%;font-size:2rem;">🕯️</div>
      <div class="el" style="top:10%;left:15%;font-size:1.5rem;">⭐</div>
      <div class="el" style="top:8%;right:20%;font-size:1.2rem;">⭐</div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'michael-7'
  },
  {
    chapter: 'Chapter 8 — Our Heavenly Protector',
    text: "St. Michael the Archangel reminds us that God always wins over darkness. With faith, courage, and prayer, we can be brave just like Michael! He is always there to protect us.",
    scene: `<div class="illust scene-mi-8">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="el rays"></div>
      <div class="el" style="top:5%;left:15%;font-size:1.5rem;">⭐</div>
      <div class="el" style="top:10%;left:35%;font-size:1rem;">⭐</div>
      <div class="el" style="top:8%;right:15%;font-size:1.3rem;">⭐</div>
      <div class="el" style="top:15%;right:30%;font-size:0.8rem;">⭐</div>
      <div class="el" style="top:20%;left:55%;font-size:2.5rem;">🌍</div>
      <div class="el char char-float" style="bottom:35%;left:35%;"><div class="ch-wings"></div><div class="ch-halo"></div><div class="ch-head blond"></div><div class="ch-tunic white"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div><div class="ch-sword"></div></div>
      <div class="el char char-sm" style="bottom:22%;left:10%;"><div class="ch-head dark"></div><div class="ch-tunic blue"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:22%;left:22%;"><div class="ch-head blond"></div><div class="ch-tunic pink"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-sm" style="bottom:22%;right:10%;"><div class="ch-head"></div><div class="ch-tunic green"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      <div class="el char char-xs" style="bottom:22%;right:22%;"><div class="ch-head dark"></div><div class="ch-tunic red"></div><div class="ch-legs"><div class="ch-leg"></div><div class="ch-leg"></div></div></div>
      ${SPARKLES_HTML}
    </div>`,
    narrationKey: 'michael-8'
  }
];

// Story registry
const allStories = {
  charbel: { title: "St. Charbel's Story", pages: storyPages },
  francis: { title: "St. Francis' Story", pages: francisPages },
  clare:   { title: "St. Clare's Story",   pages: clarePages },
  michael: { title: "St. Michael's Story", pages: michaelPages },
};

let storyPage = 0;
let currentStoryId = 'charbel';
let currentStoryPages = storyPages;

function startStory(id) {
  currentStoryId = id || 'charbel';
  const story = allStories[currentStoryId];
  currentStoryPages = story.pages;
  document.getElementById('story-title').textContent = '\u{1F4D6} ' + story.title;
  storyPage = 0;
  startBgMusic('faith');
  renderStoryPage();
  renderPageDots();
}

function renderStoryPage() {
  const pg = currentStoryPages[storyPage];
  document.getElementById('book-illustration').innerHTML = pg.scene;
  document.getElementById('page-chapter').textContent = pg.chapter;
  const pgTextEl = document.getElementById('page-text');
  document.getElementById('page-number').textContent = `Page ${storyPage + 1} of ${currentStoryPages.length}`;
  document.getElementById('prev-page').disabled = storyPage === 0;
  document.getElementById('next-page').disabled = storyPage === currentStoryPages.length - 1;
  updatePageDots();
  // Narration with word highlighting
  playNarration(pg.narrationKey, pg.text, () => {
    if (storyPage === currentStoryPages.length - 1) {
      const story = allStories[currentStoryId];
      celebrate('\u{1F389} You finished ' + story.title + '! \u{1F389}', 2);
    }
  }, pgTextEl);
}

function turnPage(dir) {
  stopAllAudio();
  SFX.pageTurn();
  document.getElementById('storybook').classList.add('turning');
  setTimeout(() => document.getElementById('storybook').classList.remove('turning'), 600);
  storyPage = Math.max(0, Math.min(currentStoryPages.length - 1, storyPage + dir));
  setTimeout(() => {
    renderStoryPage();
    startBgMusic('faith');
  }, 300);
}

function renderPageDots() {
  const c = document.getElementById('page-dots');
  c.innerHTML = '';
  currentStoryPages.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'page-dot' + (i === storyPage ? ' active' : '');
    c.appendChild(d);
  });
}

function updatePageDots() {
  document.querySelectorAll('#page-dots .page-dot').forEach((d, i) => {
    d.className = 'page-dot' + (i === storyPage ? ' active' : '');
  });
}

// ============ A2: FAITH MEMORY MATCH (5 Levels) ============
const faithSymbols = [
  { emoji: '✝️', name: 'Cross' },
  { emoji: '🌲', name: 'Cedar' },
  { emoji: '⛪', name: 'Church' },
  { emoji: '🕯️', name: 'Candle' },
  { emoji: '🕊️', name: 'Dove' },
  { emoji: '📿', name: 'Rosary' },
  { emoji: '🙏', name: 'Prayer' },
  { emoji: '⭐', name: 'Star' },
  { emoji: '📖', name: 'Bible' },
  { emoji: '🔔', name: 'Bell' },
  { emoji: '❤️', name: 'Heart' },
  { emoji: '🌹', name: 'Rose' },
  { emoji: '🏔️', name: 'Mountain' },
  { emoji: '🐑', name: 'Sheep' },
  { emoji: '🌙', name: 'Moon' },
];

const fmLevels = [
  { pairs: 6,  cols: 4, rows: 3, label: 'Level 1', maxW: '700px' },
  { pairs: 8,  cols: 4, rows: 4, label: 'Level 2', maxW: '700px' },
  { pairs: 10, cols: 5, rows: 4, label: 'Level 3', maxW: '850px' },
  { pairs: 12, cols: 6, rows: 4, label: 'Level 4', maxW: '1000px' },
  { pairs: 15, cols: 6, rows: 5, label: 'Level 5', maxW: '1000px' },
];

const matchPhrases = [
  "Great match!", "Wonderful!", "You found a pair!", "Excellent!",
  "Well done!", "Amazing!", "Brilliant!", "You're so smart!"
];
const missPhrases = [
  "Whoops!", "Not quite!", "Try again!", "Almost!",
  "So close!", "Keep looking!", "Oops! Try another one!", "Don't give up!"
];

let fmCards = [], fmFlipped = [], fmMatched = 0, fmMoves = 0, fmLocked = false;
let fmCurrentLevel = 0;

function startFaithMemory() {
  // Show level selection
  const grid = document.getElementById('fm-grid');
  grid.style.maxWidth = '800px';
  grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
  grid.innerHTML = '';
  document.getElementById('fm-moves').textContent = '0';
  document.getElementById('fm-pairs').textContent = '0';
  document.getElementById('fm-total-pairs').textContent = '0';
  document.getElementById('fm-feedback').textContent = 'Pick a level!';
  document.getElementById('fm-feedback').className = 'feedback';
  fmLevels.forEach((lvl, i) => {
    const btn = document.createElement('button');
    btn.className = 'fm-level-btn';
    btn.innerHTML = `<div class="fm-level-icon">${i + 1}</div><div class="fm-level-label">${lvl.label}</div><div class="fm-level-size">${lvl.cols}×${lvl.rows}</div>`;
    btn.onclick = () => startFaithMemoryLevel(i);
    grid.appendChild(btn);
  });
  speakQuick('Pick a level!');
}

function startFaithMemoryLevel(levelIdx) {
  fmCurrentLevel = levelIdx;
  const lvl = fmLevels[levelIdx];
  fmMatched = 0; fmMoves = 0; fmLocked = false; fmFlipped = [];
  document.getElementById('fm-moves').textContent = '0';
  document.getElementById('fm-pairs').textContent = '0';
  document.getElementById('fm-total-pairs').textContent = lvl.pairs;
  document.getElementById('fm-feedback').textContent = `${lvl.label} — Find all ${lvl.pairs} pairs!`;
  document.getElementById('fm-feedback').className = 'feedback';
  const symbols = faithSymbols.slice(0, lvl.pairs);
  const pairs = [...symbols.map(s => ({...s})), ...symbols.map(s => ({...s}))];
  fmCards = pairs.sort(() => Math.random() - 0.5);
  renderMemoryGrid();
  speakQuick(`${lvl.label}! Find all ${lvl.pairs} pairs!`);
}

function renderMemoryGrid() {
  const grid = document.getElementById('fm-grid');
  const lvl = fmLevels[fmCurrentLevel];
  grid.style.gridTemplateColumns = `repeat(${lvl.cols}, 1fr)`;
  grid.style.maxWidth = lvl.maxW;
  grid.innerHTML = '';
  fmCards.forEach((sym, i) => {
    const card = document.createElement('button');
    card.className = 'memory-card';
    if (lvl.pairs > 10) card.classList.add('memory-card-sm');
    card.innerHTML = `<div class="card-front"></div><div class="card-back">${sym.emoji}</div>`;
    card.onclick = () => flipFaithCard(i, card);
    card.dataset.index = i;
    grid.appendChild(card);
  });
}

function flipFaithCard(index, card) {
  if (fmLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  SFX.faithChime();
  fmFlipped.push({ index, card });

  if (fmFlipped.length === 2) {
    fmMoves++;
    document.getElementById('fm-moves').textContent = fmMoves;
    fmLocked = true;
    const [a, b] = fmFlipped;
    const lvl = fmLevels[fmCurrentLevel];

    if (fmCards[a.index].emoji === fmCards[b.index].emoji) {
      a.card.classList.add('matched');
      b.card.classList.add('matched');
      a.card.style.boxShadow = '0 0 25px rgba(76,175,80,0.6)';
      b.card.style.boxShadow = '0 0 25px rgba(76,175,80,0.6)';
      fmMatched++;
      document.getElementById('fm-pairs').textContent = fmMatched;

      const phrase = matchPhrases[Math.floor(Math.random() * matchPhrases.length)];
      const symbolName = fmCards[a.index].name;
      document.getElementById('fm-feedback').textContent = `✅ ${phrase} You matched the ${symbolName}!`;
      document.getElementById('fm-feedback').className = 'feedback correct';
      SFX.faithCorrect();
      speakQuick(phrase + ` You matched the ${symbolName}!`);

      fmFlipped = [];
      fmLocked = false;

      if (fmMatched === lvl.pairs) {
        const maxMoves = lvl.pairs * 2;
        const stars = fmMoves <= maxMoves ? 3 : fmMoves <= maxMoves + 5 ? 2 : 1;
        setTimeout(() => { celebrate(`🎉 ${lvl.label} Complete! All ${lvl.pairs} pairs in ${fmMoves} moves! 🎉`, stars); startFaithMemory(); }, 800);
      }
    } else {
      const phrase = missPhrases[Math.floor(Math.random() * missPhrases.length)];
      document.getElementById('fm-feedback').textContent = `❌ ${phrase}`;
      document.getElementById('fm-feedback').className = 'feedback incorrect';
      SFX.faithWrong();
      speakQuick(phrase);

      setTimeout(() => {
        a.card.classList.remove('flipped');
        b.card.classList.remove('flipped');
        fmFlipped = [];
        fmLocked = false;
        document.getElementById('fm-feedback').textContent = '';
        document.getElementById('fm-feedback').className = 'feedback';
      }, 2200);
    }
  }
}

// ============ A3: WORD SEARCH ============
const wsWords = ['CHARBEL', 'PRAYER', 'FAITH', 'MONK', 'HERMIT', 'CROSS', 'LOVE', 'GOD'];
let wsGrid = [], wsSize = 8, wsFound = [], wsCursorR = 0, wsCursorC = 0;
let wsSelecting = false, wsSelStart = null, wsHighlighted = [];

function startWordSearch() {
  wsFound = []; wsHighlighted = [];
  wsCursorR = 0; wsCursorC = 0;
  wsSelecting = false; wsSelStart = null;
  document.getElementById('ws-found').textContent = '0';
  document.getElementById('ws-total').textContent = wsWords.length;
  generateWSGrid(); renderWSGrid(); renderWSWordList();
}

function generateWSGrid() {
  wsGrid = Array.from({ length: wsSize }, () => Array(wsSize).fill(''));
  const directions = [[0,1],[1,0]]; // right and down only
  for (const word of wsWords) {
    let placed = false;
    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const r = Math.floor(Math.random() * wsSize);
      const c = Math.floor(Math.random() * wsSize);
      let fits = true;
      for (let k = 0; k < word.length; k++) {
        const nr = r + dir[0]*k, nc = c + dir[1]*k;
        if (nr<0||nr>=wsSize||nc<0||nc>=wsSize) { fits=false; break; }
        if (wsGrid[nr][nc]!==''&&wsGrid[nr][nc]!==word[k]) { fits=false; break; }
      }
      if (fits) {
        for (let k = 0; k < word.length; k++) wsGrid[r+dir[0]*k][c+dir[1]*k] = word[k];
        placed = true;
      }
    }
  }
  for (let r=0;r<wsSize;r++) for (let c=0;c<wsSize;c++)
    if (wsGrid[r][c]==='') wsGrid[r][c]='ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random()*26)];
}

function renderWSGrid() {
  const grid = document.getElementById('ws-grid');
  grid.style.gridTemplateColumns = `repeat(${wsSize}, 52px)`;
  grid.innerHTML = '';
  for (let r=0;r<wsSize;r++) for (let c=0;c<wsSize;c++) {
    const cell = document.createElement('button');
    cell.className = 'ws-cell';
    cell.textContent = wsGrid[r][c];
    if (r===wsCursorR&&c===wsCursorC) cell.classList.add('cursor');
    if (wsHighlighted.some(h=>h[0]===r&&h[1]===c)) cell.classList.add('highlighted');
    cell.onclick = () => wsClick(r,c);
    grid.appendChild(cell);
  }
}

function wsClick(r,c) {
  if (!wsSelecting) { wsSelecting=true; wsSelStart=[r,c]; wsCursorR=r; wsCursorC=c; }
  else {
    const sr=wsSelStart[0],sc=wsSelStart[1];
    const dr=Math.sign(r-sr),dc=Math.sign(c-sc);
    const len=Math.max(Math.abs(r-sr),Math.abs(c-sc))+1;
    let word=''; const cells=[];
    for (let k=0;k<len;k++) {
      const nr=sr+dr*k,nc=sc+dc*k;
      if (nr<0||nr>=wsSize||nc<0||nc>=wsSize) break;
      word+=wsGrid[nr][nc]; cells.push([nr,nc]);
    }
    const match=wsWords.find(w=>w===word&&!wsFound.includes(w));
    if (match) {
      wsFound.push(match); wsHighlighted.push(...cells);
      document.getElementById('ws-found').textContent=wsFound.length;
      SFX.faithCorrect();
      speakQuick(`You found ${match}!`);
      renderWSWordList();
      if (wsFound.length===wsWords.length) setTimeout(()=>celebrate('🎉 All words found! 🎉',3),500);
    }
    wsSelecting=false; wsSelStart=null;
  }
  renderWSGrid();
}

function renderWSWordList() {
  const list = document.getElementById('ws-wordlist');
  list.innerHTML = '';
  wsWords.forEach(w => {
    const el = document.createElement('div');
    el.className = 'ws-word' + (wsFound.includes(w) ? ' found' : '');
    el.textContent = w;
    list.appendChild(el);
  });
}

// ============ QUIZ SHUFFLE HELPER ============
// Shuffles answers and returns { shuffled: [...], correctIndex: n }
function shuffleAnswers(answers, correctIndex) {
  const indices = answers.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const shuffled = indices.map(i => answers[i]);
  const newCorrect = indices.indexOf(correctIndex);
  return { shuffled, correctIndex: newCorrect };
}

// ============ A4: FAITH QUIZZES ============
const charbelQuizData = [
  { q:"Where was St. Charbel born?", a:["Beka Kafra","Beirut","Jerusalem","Rome"], correct:0 },
  { q:"What was St. Charbel's name before becoming a monk?", a:["Youssef","Pierre","Antoine","Georges"], correct:0 },
  { q:"Which country is St. Charbel from?", a:["Lebanon","Egypt","Italy","France"], correct:0 },
  { q:"What does a hermit do?", a:["Lives alone in prayer","Travels the world","Builds houses","Cooks food"], correct:0 },
  { q:"How many years did St. Charbel live as a hermit?", a:["23 years","5 years","50 years","2 years"], correct:0 },
  { q:"What tree is a symbol of Lebanon?", a:["Cedar tree","Palm tree","Oak tree","Pine tree"], correct:0 },
  { q:"What happened at St. Charbel's tomb?", a:["A bright light was seen","It snowed","Flowers grew","A rainbow appeared"], correct:0 },
  { q:"What did St. Charbel do as a young boy?", a:["Tended sheep and prayed","Played video games","Sailed on boats","Built castles"], correct:0 },
  { q:"What is a monastery?", a:["Where monks live and pray","A school","A hospital","A park"], correct:0 },
  { q:"What does St. Charbel teach us?", a:["Prayer and kindness change the world","Money is most important","Be famous","Never be quiet"], correct:0 },
];

const francisQuizData = [
  { q:"Where was St. Francis born?", a:["Assisi, Italy","Rome","Paris","London"], correct:0 },
  { q:"What did young Francis love doing?", a:["Going to parties","Reading books","Fishing","Sleeping"], correct:0 },
  { q:"What did God say to Francis in the broken church?", a:["Rebuild my church!","Go home!","Sing a song!","Build a castle!"], correct:0 },
  { q:"What did Francis give away?", a:["His fancy clothes","His pet dog","His house","His horse"], correct:0 },
  { q:"Who did Francis preach to in the fields?", a:["The birds","The fish","The clouds","The trees"], correct:0 },
  { q:"What scary animal did Francis make friends with?", a:["A wolf","A lion","A bear","A snake"], correct:0 },
  { q:"What is St. Francis the patron saint of?", a:["Animals","Cooking","Music","Sports"], correct:0 },
  { q:"What color robe did Francis wear?", a:["Brown","Red","Blue","White"], correct:0 },
  { q:"What special marks did Francis receive on his hands?", a:["The stigmata","A crown","Wings","A medal"], correct:0 },
  { q:"What does St. Francis teach us?", a:["Love all of God's creatures","Be rich","Stay home","Never share"], correct:0 },
];

const clareQuizData = [
  { q:"What kind of family was St. Clare born into?", a:["A wealthy family","A poor family","A royal family","A farmer family"], correct:0 },
  { q:"Who inspired Clare to give her life to God?", a:["St. Francis","Her mother","A teacher","The king"], correct:0 },
  { q:"How did Clare leave her home?", a:["She ran away at night","She left at sunrise","Her family said goodbye","A carriage came for her"], correct:0 },
  { q:"What was Clare's group of sisters called?", a:["The Poor Clares","The Happy Sisters","The Bright Lights","The Kind Hearts"], correct:0 },
  { q:"What did Clare spend many hours doing?", a:["Praying","Painting","Cooking","Dancing"], correct:0 },
  { q:"What did Clare hold up when soldiers came?", a:["A golden monstrance","A sword","A shield","A flag"], correct:0 },
  { q:"What happened when the soldiers saw Clare?", a:["They turned around amazed","They laughed","They kept coming","They fell asleep"], correct:0 },
  { q:"What did Clare grow in the garden?", a:["Vegetables","Only roses","Nothing","Only trees"], correct:0 },
  { q:"Who did Clare take special care of?", a:["Sick people","Only animals","Only flowers","Only books"], correct:0 },
  { q:"What does St. Clare teach us?", a:["Richness comes from love","Money is everything","Stay alone","Never pray"], correct:0 },
];

const michaelQuizData = [
  { q:"What is St. Michael?", a:["An archangel","A king","A shepherd","A monk"], correct:0 },
  { q:"What does Michael's name mean?", a:["Who is like God?","Strong warrior","Bright light","God's helper"], correct:0 },
  { q:"Who did Michael fight against in heaven?", a:["Lucifer","A lion","A giant","A dragon king"], correct:0 },
  { q:"What did Michael say during the battle?", a:["No one is greater than God!","I am the strongest!","Run away!","Let me think!"], correct:0 },
  { q:"What did Michael use to defeat the dragon?", a:["A sword of light","A magic spell","A big rock","Thunder"], correct:0 },
  { q:"What is Michael the special guardian of?", a:["The Church","The ocean","The forest","The stars"], correct:0 },
  { q:"What does Michael bring to people who pray?", a:["Courage and strength","Money and gold","Food and water","Toys and games"], correct:0 },
  { q:"What do many people pray for from St. Michael?", a:["Protection","Homework help","Good weather","Snacks"], correct:0 },
  { q:"Michael is called God's mighty...?", a:["Warrior","Singer","Builder","Painter"], correct:0 },
  { q:"What does Michael's story teach us?", a:["With faith we can be brave","Fighting is always good","Angels don't help us","Be afraid of everything"], correct:0 },
];

const faithQuizzes = {
  charbel:  { title: "St. Charbel Quiz",  icon: "⛪", data: charbelQuizData },
  francis:  { title: "St. Francis Quiz",   icon: "🐦", data: francisQuizData },
  clare:    { title: "St. Clare Quiz",     icon: "✨", data: clareQuizData },
  michael:  { title: "St. Michael Quiz",   icon: "⚔️", data: michaelQuizData },
};
let activeQuizData = charbelQuizData;
let activeQuizTitle = "St. Charbel Quiz";
let fqIndex=0, fqScore=0, fqAnswered=false, fqShuffled=[], fqCorrectIdx=0;

function startFaithQuizFor(key) {
  const quiz = faithQuizzes[key];
  activeQuizData = quiz.data;
  activeQuizTitle = quiz.title;
  document.getElementById('fq-title').textContent = quiz.icon + ' ' + quiz.title;
  openScreen('faith-quiz-screen');
  startFaithQuiz();
}

function startFaithQuiz() {
  fqIndex=0; fqScore=0; fqAnswered=false;
  document.getElementById('fq-score').textContent='0';
  document.getElementById('fq-total').textContent=activeQuizData.length;
  renderFaithQuizQ();
}

function renderFaithQuizQ() {
  if (fqIndex>=activeQuizData.length) {
    const stars = fqScore>=9?3:fqScore>=6?2:1;
    celebrate(`🎉 Quiz complete! ${fqScore}/${activeQuizData.length} 🎉`, stars);
    return;
  }
  fqAnswered=false;
  const q=activeQuizData[fqIndex];
  const sh=shuffleAnswers(q.a, q.correct);
  fqShuffled=sh.shuffled; fqCorrectIdx=sh.correctIndex;
  document.getElementById('fq-progress').textContent=`Question ${fqIndex+1} of ${activeQuizData.length}`;
  document.getElementById('fq-question').textContent=q.q;
  document.getElementById('fq-feedback').textContent='';
  document.getElementById('fq-feedback').className='feedback';
  const container=document.getElementById('fq-choices');
  container.innerHTML='';
  fqShuffled.forEach((ans,i)=>{
    const btn=document.createElement('button');
    btn.className='choice-btn'; btn.textContent=ans;
    btn.id='fq-choice-'+i;
    btn.style.opacity='0.5';
    btn.onclick=()=>faithQuizAnswer(i,btn);
    container.appendChild(btn);
  });
  // Read question then each option with highlighting
  const seq=[q.q, ...fqShuffled.map((ans,i)=>({
    text:ans,
    onStart:()=>{
      fqShuffled.forEach((_,j)=>{
        const b=document.getElementById('fq-choice-'+j);
        if(b){b.style.opacity=j===i?'1':'0.5';b.style.boxShadow=j===i?'0 0 20px rgba(212,168,67,0.5), 0 0 0 3px var(--faith-gold)':'none';}
      });
    }
  })),{text:'Choose your answer!',onStart:()=>{
    fqShuffled.forEach((_,j)=>{const b=document.getElementById('fq-choice-'+j);if(b){b.style.opacity='1';b.style.boxShadow='none';}});
  }}];
  speakSequence(seq);
}

function faithQuizAnswer(i,btn) {
  if (fqAnswered) return;
  fqAnswered=true;
  stopCurrentTTS();
  const btns=document.querySelectorAll('#fq-choices .choice-btn');
  fqShuffled.forEach((_,j)=>{const b=document.getElementById('fq-choice-'+j);if(b){b.style.opacity='1';b.style.boxShadow='none';}});
  if (i===fqCorrectIdx) {
    btn.classList.add('correct'); fqScore++;
    document.getElementById('fq-score').textContent=fqScore;
    document.getElementById('fq-feedback').textContent='✅ Correct! Great job!';
    document.getElementById('fq-feedback').className='feedback correct';
    SFX.faithCorrect();
    speakQuick('Correct! Great job!', ()=>{
      setTimeout(()=>{ fqIndex++; renderFaithQuizQ(); },500);
    });
  } else {
    btn.classList.add('wrong'); btns[fqCorrectIdx].classList.add('correct');
    document.getElementById('fq-feedback').textContent='❌ Not quite! The answer is: '+fqShuffled[fqCorrectIdx];
    document.getElementById('fq-feedback').className='feedback incorrect';
    SFX.faithWrong();
    speakQuick('Not quite! The answer is '+fqShuffled[fqCorrectIdx], ()=>{
      setTimeout(()=>{ fqIndex++; renderFaithQuizQ(); },500);
    });
  }
}

// ============ A5: PRAYER CORNER ============
const prayers = [
  { name:"Our Father", key:"prayer-our-father", text:"Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen." },
  { name:"Hail Mary", key:"prayer-hail-mary", text:"Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." },
  { name:"Glory Be", key:"prayer-glory-be", text:"Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen." },
  { name:"St. Michael", key:"prayer-st-michael", text:"Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray. And do thou, O Prince of the heavenly host, by the power of God, cast into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen." },
  { name:"Guardian Angel", key:"prayer-guardian-angel", text:"Angel of God, my guardian dear, to whom God's love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen." },
  { name:"St. Francis", key:"prayer-st-francis", text:"Lord, make me an instrument of your peace. Where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith; where there is despair, hope; where there is darkness, light; where there is sadness, joy. O Divine Master, grant that I may not so much seek to be consoled as to console, to be understood as to understand, to be loved as to love. For it is in giving that we receive, it is in pardoning that we are pardoned, and it is in dying that we are born to eternal life. Amen." },
  { name:"St. Clare", key:"prayer-st-clare", text:"Blessed be you, my Lord God, for creating me and giving me life. Blessed be you for loving me as your very own child. Help me to live in your light and follow your path with a simple and joyful heart. Amen." },
  { name:"Memorare", key:"prayer-memorare", text:"Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thine intercession was left unaided. Inspired by this confidence, I fly unto thee, O Virgin of virgins, my mother. To thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen." },
];
let currentPrayer=0, prayersListened=new Set();

function initPrayer() { currentPrayer=0; prayersListened.clear(); renderPrayerText(); }
function selectPrayer(i,btn) {
  currentPrayer=i; stopAllAudio();
  document.querySelectorAll('.prayer-tab').forEach(t=>t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPrayerText();
}
const prayerIllusts = [
  /* 0: Our Father */
  `<div class="prayer-illust pi-our-father">
    <div class="pi-cross"></div>
    <div class="pi-ray"></div><div class="pi-ray"></div><div class="pi-ray"></div><div class="pi-ray"></div><div class="pi-ray"></div>
    <div class="pi-sun"></div>
    <div class="pi-cloud"></div><div class="pi-cloud"></div><div class="pi-cloud"></div>
  </div>`,
  /* 1: Hail Mary */
  `<div class="prayer-illust pi-hail-mary">
    <div class="pi-star"></div><div class="pi-star"></div><div class="pi-star"></div><div class="pi-star"></div><div class="pi-star"></div>
    <div class="pi-figure">
      <div class="pi-head"><div class="pi-halo"></div><div class="pi-veil"></div></div>
      <div class="pi-robe"><div class="pi-hands"></div></div>
    </div>
  </div>`,
  /* 2: Glory Be */
  `<div class="prayer-illust pi-glory-be">
    <div class="pi-glow"></div>
    <div class="pi-trinity">
      <div class="pi-halo-ring"></div><div class="pi-halo-ring"></div><div class="pi-halo-ring"></div>
    </div>
    <div class="pi-dove">🕊️</div>
  </div>`,
  /* 3: St. Michael */
  `<div class="prayer-illust pi-st-michael">
    <div class="pi-figure">
      <div class="pi-wing pi-wing-l"></div><div class="pi-wing pi-wing-r"></div>
      <div class="pi-head"><div class="pi-helmet"></div></div>
      <div class="pi-armor"></div>
      <div class="pi-sword"></div>
      <div class="pi-shield"></div>
    </div>
  </div>`,
  /* 4: Guardian Angel */
  `<div class="prayer-illust pi-guardian">
    <div class="pi-glow-ring"></div>
    <div class="pi-angel">
      <div class="pi-a-wing pi-a-wing-l"></div><div class="pi-a-wing pi-a-wing-r"></div>
      <div class="pi-a-head"><div class="pi-a-halo"></div></div>
      <div class="pi-a-robe"></div>
    </div>
    <div class="pi-child">
      <div class="pi-c-head"><div class="pi-c-hair"></div></div>
      <div class="pi-c-body"></div>
    </div>
  </div>`,
  /* 5: St. Francis */
  `<div class="prayer-illust pi-francis">
    <div class="pi-sun"></div>
    <div class="pi-bird">🐦</div><div class="pi-bird">🕊️</div><div class="pi-bird">🐦</div>
    <div class="pi-figure">
      <div class="pi-head"><div class="pi-tonsure"></div></div>
      <div class="pi-robe"></div>
    </div>
    <div class="pi-animal">🐺</div><div class="pi-animal">🐰</div>
  </div>`,
  /* 6: St. Clare */
  `<div class="prayer-illust pi-clare">
    <div class="pi-light-rays"></div>
    <div class="pi-figure">
      <div class="pi-head"><div class="pi-veil"></div></div>
      <div class="pi-robe"><div class="pi-lantern"></div></div>
    </div>
    <div class="pi-flower">🌸</div><div class="pi-flower">🌺</div><div class="pi-flower">🌸</div><div class="pi-flower">🌺</div>
  </div>`,
  /* 7: Memorare */
  `<div class="prayer-illust pi-memorare">
    <div class="pi-rose">🌹</div><div class="pi-rose">🌹</div><div class="pi-rose">🌹</div><div class="pi-rose">🌹</div>
    <div class="pi-figure">
      <div class="pi-head"><div class="pi-crown"></div><div class="pi-veil"></div></div>
      <div class="pi-cloak"><div class="pi-hands"></div></div>
    </div>
  </div>`
];
function renderPrayerText() {
  document.getElementById('prayer-text').textContent=prayers[currentPrayer].text;
  document.getElementById('prayer-illust').innerHTML=prayerIllusts[currentPrayer]||'';
}
function readPrayer() {
  const pEl=document.getElementById('prayer-text');
  playNarration(prayers[currentPrayer].key, prayers[currentPrayer].text, ()=>{
    prayersListened.add(currentPrayer);
    if (prayersListened.size===prayers.length) celebrate('🙏 You listened to all the prayers! 🙏',1);
  }, pEl);
}

// ===========================================================
//  SECTION B: HEALTHY LIVING
// ===========================================================

// ============ B1: FOOD GROUPS ============
const foodGroups = [
  { name:'Protein', emoji:'🍗', className:'fg-protein', items:['🍗','🥩','🥚','🐟','🥜'], benefit:'Builds strong muscles and helps your body grow!', fact:'Did you know? Your muscles are made mostly of protein! Every time you run, jump, or play, your proteins are hard at work.',
    scene: `<div class="illust scene-fg-protein">
      <div class="sky"></div><div class="ground"></div>
      <div class="el barn"></div><div class="el barn-roof"></div><div class="el barn-door"></div>
      <div class="el fence" style="bottom:28%;right:10%;width:40%;height:15%;"><div class="fence-post"></div><div class="fence-post" style="left:33%"></div><div class="fence-post" style="left:66%"></div><div class="fence-post" style="right:0"></div></div>
      <div class="el sun" style="top:8%;right:12%;"></div>
      <div class="el float" style="bottom:32%;right:15%;font-size:2.2rem;">🐔</div>
      <div class="el float" style="bottom:34%;right:30%;font-size:2rem;animation-delay:0.5s;">🐔</div>
      <div class="el" style="bottom:34%;left:55%;font-size:2.5rem;">🐄</div>
      <div class="el float" style="top:15%;left:20%;font-size:2rem;">🍗</div>
      <div class="el float" style="top:12%;right:30%;font-size:1.8rem;animation-delay:0.3s;">🥩</div>
      <div class="el float" style="top:20%;left:50%;font-size:1.5rem;animation-delay:0.6s;">🥚</div>
      <div class="el float" style="top:18%;right:15%;font-size:1.6rem;animation-delay:0.9s;">🐟</div>
      <div class="el float" style="top:25%;left:35%;font-size:1.4rem;animation-delay:1.2s;">🥜</div>
      ${SPARKLES_HTML}
    </div>` },
  { name:'Carbs', emoji:'🍞', className:'fg-carbs', items:['🍞','🍚','🍝','🥔','🥣'], benefit:'Gives you energy to run, play, and think!', fact:'Did you know? Carbs are like fuel for your body, just like petrol for a car. Without them, you would feel tired and sleepy!',
    scene: `<div class="illust scene-fg-carbs">
      <div class="sky"></div>
      <div class="el hill-1"></div><div class="el hill-2"></div>
      <div class="ground"></div>
      <div class="el sun" style="top:6%;right:10%;"></div>
      <div class="el wheat" style="bottom:38%;left:12%;height:30px;"></div>
      <div class="el wheat" style="bottom:38%;left:20%;height:35px;animation-delay:0.2s;"></div>
      <div class="el wheat" style="bottom:38%;left:28%;height:28px;animation-delay:0.4s;"></div>
      <div class="el wheat" style="bottom:38%;left:36%;height:32px;animation-delay:0.6s;"></div>
      <div class="el wheat" style="bottom:38%;left:44%;height:30px;animation-delay:0.8s;"></div>
      <div class="el wheat" style="bottom:38%;right:35%;height:34px;animation-delay:0.3s;"></div>
      <div class="el wheat" style="bottom:38%;right:25%;height:28px;animation-delay:0.5s;"></div>
      <div class="el float" style="top:12%;left:15%;font-size:2rem;">🍞</div>
      <div class="el float" style="top:10%;left:40%;font-size:1.8rem;animation-delay:0.4s;">🍚</div>
      <div class="el float" style="top:15%;right:25%;font-size:1.6rem;animation-delay:0.8s;">🍝</div>
      <div class="el float" style="top:20%;right:10%;font-size:1.5rem;animation-delay:1.1s;">🥔</div>
      <div class="el float" style="top:8%;right:45%;font-size:1.4rem;animation-delay:0.6s;">🥣</div>
      ${SPARKLES_HTML}
    </div>` },
  { name:'Fruits', emoji:'🍎', className:'fg-fruits', items:['🍎','🍌','🫐','🍊','🍇'], benefit:'Full of vitamins that keep you healthy and strong!', fact:'Did you know? Eating colourful fruits gives you different vitamins. Try to eat a rainbow every day!',
    scene: `<div class="illust scene-fg-fruits">
      <div class="sky"></div><div class="ground"></div>
      <div class="el rainbow"></div>
      <div class="el sun" style="top:6%;right:8%;"></div>
      <div class="el tree-trunk" style="bottom:28%;left:10%;"></div>
      <div class="el tree-canopy" style="bottom:55%;left:3%;"></div>
      <div class="el tree-trunk" style="bottom:28%;right:10%;"></div>
      <div class="el tree-canopy" style="bottom:55%;right:3%;"></div>
      <div class="el float" style="bottom:60%;left:8%;font-size:1.5rem;">🍎</div>
      <div class="el float" style="bottom:62%;right:8%;font-size:1.3rem;animation-delay:0.3s;">🍊</div>
      <div class="el float" style="top:15%;left:30%;font-size:2.2rem;">🍎</div>
      <div class="el float" style="top:12%;left:50%;font-size:2rem;animation-delay:0.4s;">🍌</div>
      <div class="el float" style="top:18%;right:20%;font-size:1.6rem;animation-delay:0.7s;">🫐</div>
      <div class="el float" style="top:10%;right:35%;font-size:1.8rem;animation-delay:1s;">🍊</div>
      <div class="el float" style="top:22%;left:20%;font-size:1.5rem;animation-delay:0.5s;">🍇</div>
      ${SPARKLES_HTML}
    </div>` },
  { name:'Vegetables', emoji:'🥦', className:'fg-veggies', items:['🥦','🥕','🥬','🫛','🍅'], benefit:'Superfoods that protect your body like a shield!', fact:'Did you know? Carrots really do help your eyes! They have a vitamin called beta-carotene that keeps your vision sharp.',
    scene: `<div class="illust scene-fg-veggies">
      <div class="sky"></div><div class="ground"></div>
      <div class="el sun" style="top:6%;right:10%;"></div>
      <div class="el soil-row" style="bottom:30%;"></div>
      <div class="el soil-row" style="bottom:20%;"></div>
      <div class="el soil-row" style="bottom:10%;"></div>
      <div class="el plant" style="bottom:30%;left:18%;"></div>
      <div class="el plant" style="bottom:30%;left:38%;height:24px;"></div>
      <div class="el plant" style="bottom:30%;left:58%;height:18px;"></div>
      <div class="el plant" style="bottom:20%;left:28%;height:22px;"></div>
      <div class="el plant" style="bottom:20%;left:48%;"></div>
      <div class="el plant" style="bottom:20%;left:68%;height:26px;"></div>
      <div class="el" style="bottom:33%;right:15%;font-size:2.5rem;">🧑‍🌾</div>
      <div class="el float" style="top:10%;left:15%;font-size:2rem;">🥦</div>
      <div class="el float" style="top:8%;left:40%;font-size:1.8rem;animation-delay:0.3s;">🥕</div>
      <div class="el float" style="top:14%;right:25%;font-size:1.6rem;animation-delay:0.6s;">🥬</div>
      <div class="el float" style="top:12%;right:10%;font-size:1.5rem;animation-delay:0.9s;">🫛</div>
      <div class="el float" style="top:20%;left:28%;font-size:1.4rem;animation-delay:1.1s;">🍅</div>
      ${SPARKLES_HTML}
    </div>` },
  { name:'Healthy Fats', emoji:'🥑', className:'fg-fats', items:['🥑','🫒','🥜','🌻','🐟'], benefit:'Helps your brain think clearly and learn new things!', fact:'Did you know? Your brain is about 60% fat! Eating healthy fats like avocado and nuts makes your brain work better.',
    scene: `<div class="illust scene-fg-fats">
      <div class="sky"></div><div class="ground"></div>
      <div class="el ocean"></div>
      <div class="el sun" style="top:6%;left:45%;"></div>
      <div class="el olive-trunk" style="bottom:35%;left:12%;"></div>
      <div class="el olive-canopy" style="bottom:55%;left:5%;"></div>
      <div class="el olive-trunk" style="bottom:35%;right:15%;"></div>
      <div class="el olive-canopy" style="bottom:55%;right:8%;"></div>
      <div class="el float" style="top:10%;left:15%;font-size:2rem;">🥑</div>
      <div class="el float" style="top:8%;left:40%;font-size:1.8rem;animation-delay:0.4s;">🫒</div>
      <div class="el float" style="top:15%;right:20%;font-size:1.6rem;animation-delay:0.7s;">🥜</div>
      <div class="el float" style="top:12%;right:40%;font-size:1.5rem;animation-delay:1s;">🌻</div>
      <div class="el float" style="top:20%;left:30%;font-size:1.4rem;animation-delay:0.5s;">🐟</div>
      ${SPARKLES_HTML}
    </div>` },
  { name:'Water', emoji:'💧', className:'fg-water', items:['💧','🚰','🧊','🥤','💦'], benefit:"Your body's best friend — keeps everything working!", fact:'Did you know? Your body is made up of about 60% water. Drinking enough water helps you think, play, and stay healthy!',
    scene: `<div class="illust scene-fg-water">
      <div class="sky"></div><div class="ground"></div>
      <div class="el cliff-left"></div><div class="el cliff-right"></div>
      <div class="el waterfall"></div>
      <div class="el pool"></div>
      <div class="el foam"></div>
      <div class="el float" style="bottom:25%;left:25%;font-size:1.5rem;">🐟</div>
      <div class="el float" style="bottom:28%;right:25%;font-size:1.3rem;animation-delay:0.5s;">🐟</div>
      <div class="el float" style="top:8%;left:10%;font-size:2rem;">💧</div>
      <div class="el float" style="top:6%;right:10%;font-size:1.8rem;animation-delay:0.3s;">🚰</div>
      <div class="el float" style="top:14%;left:35%;font-size:1.5rem;animation-delay:0.6s;">🧊</div>
      <div class="el float" style="top:12%;right:35%;font-size:1.4rem;animation-delay:0.9s;">🥤</div>
      <div class="el float" style="top:20%;left:22%;font-size:1.3rem;animation-delay:1.1s;">💦</div>
      ${SPARKLES_HTML}
    </div>` }
];
let foodGroupsExplored=new Set();

function initFoodExplorer() {
  foodGroupsExplored.clear();
  document.getElementById('food-detail').classList.add('hidden');
  document.getElementById('food-wheel').classList.remove('hidden');
  const wheel=document.getElementById('food-wheel');
  wheel.innerHTML='';
  foodGroups.forEach((fg,i)=>{
    const btn=document.createElement('button');
    btn.className='food-group-btn '+fg.className;
    btn.innerHTML=`<div class="fg-emoji">${fg.emoji}</div>${fg.name}`;
    btn.onclick=()=>showFoodDetail(i);
    wheel.appendChild(btn);
  });
}

function showFoodDetail(i) {
  const fg=foodGroups[i]; foodGroupsExplored.add(i);
  document.getElementById('food-wheel').classList.add('hidden');
  document.getElementById('food-detail').classList.remove('hidden');
  document.getElementById('fg-scene').innerHTML = fg.scene;
  document.getElementById('food-group-name').textContent=fg.emoji+' '+fg.name;
  document.getElementById('food-benefit').textContent=fg.benefit;
  const fFactEl=document.getElementById('food-fact');
  fFactEl.textContent=fg.fact;
  SFX.healthCorrect();
  playNarration('food-'+fg.name.toLowerCase().replace(/\s/g,'-'), fg.name+'. '+fg.benefit+' '+fg.fact, ()=>{
    if (foodGroupsExplored.size===foodGroups.length) celebrate('🎉 You explored all the food groups! 🎉',2);
  }, fFactEl, fg.fact);
}

function closeFoodDetail() {
  stopAllAudio();
  document.getElementById('food-detail').classList.add('hidden');
  document.getElementById('food-wheel').classList.remove('hidden');
}

// ============ B2: BODY TOUR (Food Journey Adventure) ============
const bodyStages = [
  {
    title:'👄 Mouth', tapText:'TAP TO CHEW!', key:'body-tour-1',
    text:"Chomp chomp chomp! Your teeth break the food into tiny little pieces! Your tongue and saliva start to melt it down. Great job chewing!",
    scene: (char) => `<div class="illust scene-body-1">
      <div class="el lips-left"></div><div class="el lips-right"></div>
      <div class="el teeth-top"><div class="tooth-t"></div><div class="tooth-t"></div><div class="tooth-t"></div><div class="tooth-t"></div><div class="tooth-t"></div><div class="tooth-t"></div></div>
      <div class="el teeth-bottom"><div class="tooth-b"></div><div class="tooth-b"></div><div class="tooth-b"></div><div class="tooth-b"></div><div class="tooth-b"></div></div>
      <div class="el tongue"></div>
      <div class="el food-char-scene ${char}" style="position:absolute;top:35%;left:42%;z-index:5;">${foodCharHTML(char,true)}</div>
      ${SPARKLES_HTML}
    </div>`
  },
  {
    title:'⬇️ Throat', tapText:'TAP TO SWALLOW!', key:'body-tour-2',
    text:"Wheee, down it goes! A special tube called the esophagus squeezes the food down to your tummy, like a waterslide!",
    scene: (char) => `<div class="illust scene-body-2">
      <div class="el tube-left"></div><div class="el tube-right"></div>
      <div class="el tube-wave1"></div><div class="el tube-wave2"></div><div class="el tube-wave3"></div>
      <div class="el" style="top:5%;left:36%;font-size:1.5rem;">💧</div>
      <div class="el" style="top:40%;right:30%;font-size:1.3rem;">💧</div>
      <div class="el" style="top:70%;left:35%;font-size:1.2rem;">💧</div>
      <div class="el food-char-scene ${char}" style="position:absolute;top:5%;left:40%;z-index:5;">${foodCharHTML(char,true)}</div>
      ${SPARKLES_HTML}
    </div>`
  },
  {
    title:'🫃 Stomach', tapText:'TAP TO MIX!', key:'body-tour-3',
    text:"Splash! Your tummy is like a big mixing machine! It churns and squishes the food with special juices until it becomes a mushy soup!",
    scene: (char) => `<div class="illust scene-body-3">
      <div class="el stomach-shape">
        <div class="acid"></div>
        <div class="el bubble" style="bottom:30%;left:25%;"></div>
        <div class="el bubble" style="bottom:20%;left:55%;"></div>
        <div class="el bubble" style="bottom:35%;right:25%;"></div>
      </div>
      <div class="el" style="top:5%;left:15%;font-size:1.5rem;">💦</div>
      <div class="el" style="top:10%;right:20%;font-size:1.3rem;">💦</div>
      <div class="el food-char-scene ${char}" style="position:absolute;top:30%;left:38%;z-index:5;">${foodCharHTML(char,true)}</div>
      ${SPARKLES_HTML}
    </div>`
  },
  {
    title:'🌀 Small Intestine', tapText:'TAP TO ABSORB!', key:'body-tour-4',
    text:"This is where the magic happens! Your small intestine grabs all the good stuff — vitamins, energy, and protein — from the mushy food!",
    scene: (char) => `<div class="illust scene-body-4">
      <div class="el intestine-tube">
        <div class="tube-seg"></div><div class="tube-seg"></div><div class="tube-seg"></div><div class="tube-seg"></div>
        <div class="tube-conn-1"></div><div class="tube-conn-2"></div><div class="tube-conn-3"></div>
      </div>
      <div class="el nutrient-star" style="top:15%;left:20%;font-size:1.4rem;">⭐</div>
      <div class="el nutrient-star" style="top:40%;right:15%;font-size:1.2rem;">✨</div>
      <div class="el nutrient-star" style="top:65%;left:25%;font-size:1.5rem;">🌟</div>
      <div class="el nutrient-star" style="bottom:10%;right:20%;font-size:1.3rem;">⭐</div>
      ${SPARKLES_HTML}
    </div>`
  },
  {
    title:'🩸 Blood Stream', tapText:'TAP TO DELIVER!', key:'body-tour-5',
    text:"The nutrients hop onto your blood like passengers on a bus! They zoom off to your muscles, your bones, and your brain!",
    scene: (char) => `<div class="illust scene-body-5">
      <div class="sky"></div>
      <div class="el blood-river"></div>
      <div class="el blood-cell" style="bottom:30%;left:15%;"></div>
      <div class="el blood-cell" style="bottom:35%;left:40%;animation-delay:0.5s;"></div>
      <div class="el blood-cell" style="bottom:28%;right:20%;animation-delay:1s;"></div>
      <div class="el blood-cell" style="bottom:38%;right:40%;animation-delay:1.5s;"></div>
      <div class="el dest-icon" style="top:8%;left:10%;">💪</div>
      <div class="el dest-icon" style="top:8%;left:43%;animation-delay:0.3s;">🦴</div>
      <div class="el dest-icon" style="top:8%;right:10%;animation-delay:0.6s;">🧠</div>
      <div class="el nutrient-star" style="bottom:40%;left:35%;font-size:1.2rem;">✨</div>
      <div class="el nutrient-star" style="bottom:42%;right:30%;font-size:1rem;">⭐</div>
      ${SPARKLES_HTML}
    </div>`
  },
  {
    title:'🧠 Brain Power!', tapText:'TAP TO POWER UP!', key:'body-tour-6',
    text:"Your brain lights up with power! Healthy food makes you think better, learn faster, and feel amazing! What an incredible journey!",
    scene: (char) => `<div class="illust scene-body-6">
      <div class="sky"></div>
      <div class="el brain-shape">
        <div class="brain-fold1"></div><div class="brain-fold2"></div><div class="brain-fold3"></div>
        <div class="brain-center"></div>
      </div>
      <div class="el synapse" style="top:10%;left:15%;">⚡</div>
      <div class="el synapse" style="top:20%;right:18%;animation-delay:0.4s;">⚡</div>
      <div class="el synapse" style="top:75%;left:25%;animation-delay:0.8s;">⚡</div>
      <div class="el synapse" style="top:80%;right:22%;animation-delay:1.2s;">⚡</div>
      <div class="el" style="top:5%;left:45%;font-size:2rem;">💡</div>
      <div class="el" style="bottom:5%;left:40%;font-size:1.8rem;">🌟</div>
      ${SPARKLES_HTML}
    </div>`
  }
];
let bodyStage=0, bodyTourChar='apple';

function foodCharHTML(type, small) {
  const cls = small ? 'food-char-scene '+type : 'food-char '+type;
  if (type==='apple') return `<div class="${cls}"><div class="food-char-stem"></div><div class="food-char-leaf"></div><div class="food-char-body"><div class="food-char-eyes"></div><div class="food-char-smile"></div></div></div>`;
  if (type==='banana') return `<div class="${cls}"><div class="food-char-body"><div class="food-char-eyes"></div><div class="food-char-smile"></div></div></div>`;
  if (type==='carrot') return `<div class="${cls}"><div class="food-char-top"></div><div class="food-char-body"><div class="food-char-eyes"></div><div class="food-char-smile"></div></div></div>`;
  if (type==='bread') return `<div class="${cls}"><div class="food-char-body"><div class="food-char-crust"></div><div class="food-char-eyes"></div><div class="food-char-smile"></div></div></div>`;
  return '';
}

function pickFoodChar(type) {
  bodyTourChar = type;
  SFX.pop();
  document.getElementById('food-char-select').classList.add('hidden');
  document.getElementById('body-tour-content').classList.remove('hidden');
  bodyStage = 0;
  startBgMusic('health');
  renderBodyStage();
  renderBodyDots();
  speakQuick("Great choice! Let's go on a food journey!");
}

function startBodyTour() {
  bodyStage=0;
  document.getElementById('food-char-select').classList.remove('hidden');
  document.getElementById('body-tour-content').classList.add('hidden');
}

function renderBodyStage() {
  const s=bodyStages[bodyStage];
  const sceneEl=document.getElementById('body-tour-scene');
  sceneEl.innerHTML = s.scene(bodyTourChar);
  document.getElementById('body-stage-title').textContent=s.title;
  const bTextEl=document.getElementById('body-stage-text');
  bTextEl.textContent=s.text;
  document.getElementById('body-prev').disabled=bodyStage===0;
  document.getElementById('body-next').disabled=bodyStage===bodyStages.length-1;
  updateBodyDots();
  // Show tap button
  const tapBtn=document.getElementById('body-tap-btn');
  tapBtn.textContent=s.tapText;
  tapBtn.classList.remove('hidden');
  tapBtn.onclick=()=>{
    tapBtn.classList.add('hidden');
    // Trigger tap animation
    const illust=sceneEl.querySelector('.illust');
    if(illust) illust.classList.add('body-anim-'+(bodyStage+1));
    SFX.pop();
    setTimeout(()=>{
      playNarration(s.key, s.title.replace(/[^\w\s!]/g,'')+'. '+s.text, ()=>{
        if (bodyStage===bodyStages.length-1) celebrate('🎉 Amazing food journey complete! 🎉',2);
      }, bTextEl, s.text);
    }, 1200);
  };
}

function bodyTourNav(dir) {
  stopAllAudio(); SFX.pop();
  bodyStage=Math.max(0,Math.min(bodyStages.length-1,bodyStage+dir));
  renderBodyStage(); startBgMusic('health');
}

function renderBodyDots() {
  const c=document.getElementById('body-dots'); c.innerHTML='';
  bodyStages.forEach((_,i)=>{
    const d=document.createElement('div');
    d.className='page-dot'+(i===bodyStage?' active':'');
    c.appendChild(d);
  });
}
function updateBodyDots() {
  document.querySelectorAll('#body-dots .page-dot').forEach((d,i)=>{
    d.className='page-dot'+(i===bodyStage?' active':'');
  });
}

// ============ B3: BUILD A PLATE ============
const plateFood = [
  {emoji:'🍗',name:'Chicken',group:'protein'},{emoji:'🐟',name:'Fish',group:'protein'},
  {emoji:'🥚',name:'Egg',group:'protein'},{emoji:'🍞',name:'Bread',group:'carbs'},
  {emoji:'🍚',name:'Rice',group:'carbs'},{emoji:'🥔',name:'Potato',group:'carbs'},
  {emoji:'🥦',name:'Broccoli',group:'veggies'},{emoji:'🥕',name:'Carrot',group:'veggies'},
  {emoji:'🍎',name:'Apple',group:'fruit'},{emoji:'🍌',name:'Banana',group:'fruit'},
  {emoji:'🥑',name:'Avocado',group:'fats'},{emoji:'🥜',name:'Nuts',group:'fats'},
];
let plateItems=[], plateOptions=[];

function startBuildPlate() {
  plateItems=[];
  document.getElementById('plate-items').innerHTML='';
  document.getElementById('plate-count').textContent='0';
  document.getElementById('plate-check').style.display='none';
  document.getElementById('plate-feedback').textContent='';
  document.getElementById('plate-feedback').className='feedback';
  plateOptions=[...plateFood].sort(()=>Math.random()-0.5).slice(0,8);
  renderFoodOptions();
  speakQuick('Build a healthy picnic! Pick your foods.');
}

function renderFoodOptions() {
  const c=document.getElementById('food-options'); c.innerHTML='';
  plateOptions.forEach((f,i)=>{
    const btn=document.createElement('button');
    btn.className='food-option'+(plateItems.includes(i)?' picked':'');
    btn.innerHTML=`<span class="fo-emoji">${f.emoji}</span> ${f.name}`;
    btn.onclick=()=>addToPlate(i);
    c.appendChild(btn);
  });
}

function addToPlate(i) {
  if (plateItems.includes(i)||plateItems.length>=6) return;
  plateItems.push(i); SFX.pop();
  const f=plateOptions[i];
  const item=document.createElement('span');
  item.className='plate-item'; item.textContent=f.emoji;
  document.getElementById('plate-items').appendChild(item);
  document.getElementById('plate-count').textContent=plateItems.length;
  renderFoodOptions();
  if (plateItems.length>=4) document.getElementById('plate-check').style.display='block';
}

function checkPlate() {
  const groups=new Set(plateItems.map(i=>plateOptions[i].group));
  let msg,stars;
  if (groups.size>=4) { msg='🎉 Perfect! A beautifully balanced plate! 🎉'; stars=3; }
  else if (groups.size>=3) { msg='👍 Good job! Try adding more variety next time!'; stars=2; }
  else { msg='🤔 Try mixing different food groups for a healthier plate!'; stars=1; }
  celebrate(msg,stars);
}

// ============ B4: GOOD HABITS ============
const habitsScenes = {
  bathroom: `<div class="illust scene-hab-bathroom">
    <div class="el tiles"></div><div class="ground"></div>
    <div class="el sink"></div><div class="el faucet"></div>
    <div class="el" style="bottom:45%;left:55%;font-size:1.8rem;">🧼</div>
    <div class="el float" style="top:20%;left:25%;font-size:1.2rem;">🫧</div>
    <div class="el float" style="top:15%;right:30%;font-size:1rem;animation-delay:0.5s;">🫧</div>
    <div class="el float" style="top:25%;left:50%;font-size:0.8rem;animation-delay:1s;">🫧</div>
  </div>`,
  dining: `<div class="illust scene-hab-dining">
    <div class="sky"></div><div class="ground"></div>
    <div class="el window-frame"></div>
    <div class="el table-top"></div><div class="el table-leg-l"></div><div class="el table-leg-r"></div>
    <div class="el" style="bottom:30%;left:25%;font-size:1.5rem;">🍽️</div>
    <div class="el" style="bottom:30%;right:25%;font-size:1.5rem;">🍽️</div>
    <div class="el" style="bottom:30%;left:45%;font-size:1.2rem;">🥤</div>
  </div>`,
  kitchen: `<div class="illust scene-hab-kitchen">
    <div class="sky"></div><div class="ground"></div>
    <div class="el cabinet"></div><div class="el counter"></div>
    <div class="el" style="bottom:30%;left:20%;font-size:1.5rem;">🍳</div>
    <div class="el" style="bottom:30%;left:45%;font-size:1.3rem;">🥘</div>
    <div class="el" style="bottom:30%;right:20%;font-size:1.4rem;">🍽️</div>
  </div>`,
  market: `<div class="illust scene-hab-market">
    <div class="sky"></div><div class="ground"></div>
    <div class="el sun" style="top:5%;right:8%;"></div>
    <div class="el stall"></div><div class="el stall-roof"></div>
    <div class="el stall2"></div><div class="el stall2-roof"></div>
    <div class="el float" style="bottom:35%;left:20%;font-size:1.3rem;">🍎</div>
    <div class="el float" style="bottom:38%;left:30%;font-size:1.1rem;animation-delay:0.3s;">🥕</div>
    <div class="el float" style="bottom:33%;right:18%;font-size:1.2rem;animation-delay:0.6s;">🥦</div>
    <div class="el float" style="bottom:36%;right:28%;font-size:1rem;animation-delay:0.9s;">🍌</div>
  </div>`
};
const habitsData = [
  { sceneBg:'bathroom', question:'What should you do before eating?', choices:['Wash my hands with soap!','Jump on the table','Watch TV','Play with the dog'], correct:0, explanation:'Always wash your hands with soap and water before eating to keep germs away!' },
  { sceneBg:'dining', question:'How should you sit at the dinner table?', choices:['Sit up straight like a king or queen!','Lie down on the floor','Stand on the chair','Sit under the table'], correct:0, explanation:'Sitting up straight at the table is good for your tummy and shows respect!' },
  { sceneBg:'dining', question:'How should you eat your food?', choices:['Use my fork and knife properly','Use my hands for everything','Throw it in the air','Eat off the floor'], correct:0, explanation:'Using utensils properly is a great habit! It shows you have good manners.' },
  { sceneBg:'dining', question:'What kind words should you say at mealtimes?', choices:['Please and thank you!','Give me that now!','I want it all!','Nothing at all'], correct:0, explanation:'Kind words like please and thank you make everyone at the table happier!' },
  { sceneBg:'dining', question:'What should you do while chewing food?', choices:['Keep my mouth closed','Talk with food in my mouth','Sing a song','Make funny faces'], correct:0, explanation:'Chewing with your mouth closed is polite and helps you eat better!' },
  { sceneBg:'dining', question:'Should you use screens at the dinner table?', choices:['No! Mealtime is family time!','Yes, watch cartoons','Only if I am bored','Phones belong at the table'], correct:0, explanation:'Mealtime is the perfect time to talk with your family and enjoy being together!' },
  { sceneBg:'kitchen', question:'How can you help at mealtime?', choices:['Help set the table!','Wait for someone else','Hide in my room','Complain about the food'], correct:0, explanation:'Helping set and clear the table makes you a wonderful team player!' },
  { sceneBg:'market', question:'What should you do when you see a new food?', choices:['Be a food explorer and try one bite!','Say yuck without trying','Throw it away','Cry about it'], correct:0, explanation:'Being a food explorer is amazing! You might discover a new favourite food!' }
];
let habitIndex=0, habitScore=0, habitAnswered=false, habShuffled=[], habCorrectIdx=0;

function startHabits() {
  habitIndex=0; habitScore=0; habitAnswered=false;
  document.getElementById('habits-score').textContent='0';
  document.getElementById('habits-total').textContent=habitsData.length;
  renderHabit();
}

function renderHabit() {
  if (habitIndex>=habitsData.length) {
    const stars=habitScore>=7?3:habitScore>=5?2:1;
    celebrate(`🎉 Great manners! ${habitScore}/${habitsData.length} 🎉`,stars);
    return;
  }
  habitAnswered=false;
  const h=habitsData[habitIndex];
  const sh=shuffleAnswers(h.choices, h.correct);
  habShuffled=sh.shuffled; habCorrectIdx=sh.correctIndex;
  document.getElementById('habit-scene-bg').innerHTML=habitsScenes[h.sceneBg]||'';
  document.getElementById('habit-question').textContent=h.question;
  document.getElementById('habit-feedback').textContent='';
  document.getElementById('habit-feedback').className='feedback';
  const c=document.getElementById('habit-choices'); c.innerHTML='';
  habShuffled.forEach((ch,i)=>{
    const btn=document.createElement('button');
    btn.className='choice-btn'; btn.textContent=ch;
    btn.id = 'habit-choice-'+i;
    btn.style.opacity = '0.5';
    btn.onclick=()=>habitAnswer(i,btn);
    c.appendChild(btn);
  });
  const sequence = [
    h.question,
    ...habShuffled.map((ch, i) => ({
      text: ch,
      onStart: () => {
        habShuffled.forEach((_, j) => {
          const b = document.getElementById('habit-choice-'+j);
          if (b) {
            b.style.opacity = j === i ? '1' : '0.5';
            b.style.boxShadow = j === i ? '0 0 20px rgba(255,152,0,0.5), 0 0 0 3px var(--health-orange)' : 'none';
          }
        });
      }
    })),
    { text: 'Pick the right answer!', onStart: () => {
      habShuffled.forEach((_, j) => {
        const b = document.getElementById('habit-choice-'+j);
        if (b) { b.style.opacity = '1'; b.style.boxShadow = 'none'; }
      });
    }}
  ];
  speakSequence(sequence);
}

function habitAnswer(i,btn) {
  if (habitAnswered) return;
  habitAnswered=true;
  stopCurrentTTS();
  const h=habitsData[habitIndex];
  const btns=document.querySelectorAll('#habit-choices .choice-btn');
  habShuffled.forEach((_,j)=>{
    const b=document.getElementById('habit-choice-'+j);
    if(b){b.style.opacity='1';b.style.boxShadow='none';}
  });
  if (i===habCorrectIdx) {
    btn.classList.add('correct'); habitScore++;
    document.getElementById('habits-score').textContent=habitScore;
    document.getElementById('habit-feedback').textContent='✅ '+h.explanation;
    document.getElementById('habit-feedback').className='feedback correct';
    SFX.healthCorrect();
    speakQuick('That is correct! '+h.explanation, ()=>{
      setTimeout(()=>{ habitIndex++; renderHabit(); },800);
    });
  } else {
    btn.classList.add('wrong'); btns[habCorrectIdx].classList.add('correct');
    document.getElementById('habit-feedback').textContent='💡 '+h.explanation;
    document.getElementById('habit-feedback').className='feedback incorrect';
    SFX.healthWrong();
    speakQuick('Not quite. '+h.explanation, ()=>{
      setTimeout(()=>{ habitIndex++; renderHabit(); },800);
    });
  }
}

// ============ B5: NUTRITION QUIZ ============
const nutriQuizScenes = {
  kitchen: habitsScenes.kitchen,
  meadow: `<div class="illust scene-nq-meadow">
    <div class="sky"></div><div class="ground"></div>
    <div class="el hill"></div><div class="el hill2"></div>
    <div class="el sun" style="top:6%;right:10%;"></div>
    <div class="el float" style="bottom:35%;left:20%;font-size:1.8rem;">🌷</div>
    <div class="el float" style="bottom:38%;right:25%;font-size:1.5rem;animation-delay:0.5s;">🌻</div>
    <div class="el float" style="bottom:33%;left:50%;font-size:1.3rem;animation-delay:1s;">🌸</div>
    <div class="el" style="top:15%;left:15%;font-size:1.5rem;">🦋</div>
  </div>`,
  bathroom: habitsScenes.bathroom,
  dining: habitsScenes.dining
};
const nutriQuizData = [
  {q:"Which food is a protein?",a:["Chicken","Bread","Apple","Rice"],correct:0,sceneBg:'kitchen'},
  {q:"What does water help your body do?",a:["Stay hydrated","Grow feathers","Turn purple","Fly"],correct:0,sceneBg:'meadow'},
  {q:"Which vegetable is orange and helps your eyes?",a:["Carrot","Broccoli","Peas","Tomato"],correct:0,sceneBg:'meadow'},
  {q:"What food group gives you energy to run and play?",a:["Carbs","Water","Healthy fats","Protein"],correct:0,sceneBg:'meadow'},
  {q:"Which is the healthiest drink?",a:["Water","Soda","Energy drink","Milkshake"],correct:0,sceneBg:'bathroom'},
  {q:"What should you do before eating?",a:["Wash your hands","Run around","Watch TV","Take a nap"],correct:0,sceneBg:'bathroom'},
  {q:"Which food helps build strong bones?",a:["Milk","Candy","Chips","Ice cream"],correct:0,sceneBg:'meadow'},
  {q:"Avocado is a healthy ___?",a:["Fat","Protein","Carb","Vegetable"],correct:0,sceneBg:'kitchen'},
  {q:"How many servings of fruits and veggies should you aim for each day?",a:["5","1","20","100"],correct:0,sceneBg:'meadow'},
  {q:"What's polite to say when someone passes you food?",a:["Thank you","Give me more","Whatever","Nothing"],correct:0,sceneBg:'dining'},
];
let nqIndex=0, nqScore=0, nqAnswered=false, nqShuffled=[], nqCorrectIdx=0;

function startNutriQuiz() {
  nqIndex=0; nqScore=0; nqAnswered=false;
  document.getElementById('nq-score').textContent='0';
  document.getElementById('nq-total').textContent=nutriQuizData.length;
  renderNutriQ();
}

function renderNutriQ() {
  if (nqIndex>=nutriQuizData.length) {
    const stars=nqScore>=9?3:nqScore>=6?2:1;
    celebrate(`🎉 Nutrition Quiz complete! ${nqScore}/${nutriQuizData.length} 🎉`,stars);
    return;
  }
  nqAnswered=false;
  const q=nutriQuizData[nqIndex];
  const sh=shuffleAnswers(q.a, q.correct);
  nqShuffled=sh.shuffled; nqCorrectIdx=sh.correctIndex;
  document.getElementById('nq-scene-bg').innerHTML=nutriQuizScenes[q.sceneBg]||'';
  document.getElementById('nq-progress').textContent=`Question ${nqIndex+1} of ${nutriQuizData.length}`;
  document.getElementById('nq-question').textContent=q.q;
  document.getElementById('nq-feedback').textContent='';
  document.getElementById('nq-feedback').className='feedback';
  const c=document.getElementById('nq-choices'); c.innerHTML='';
  nqShuffled.forEach((ans,i)=>{
    const btn=document.createElement('button');
    btn.className='choice-btn'; btn.textContent=ans;
    btn.id='nq-choice-'+i;
    btn.style.opacity='0.5';
    btn.onclick=()=>nutriQuizAnswer(i,btn);
    c.appendChild(btn);
  });
  const seq=[q.q, ...nqShuffled.map((ans,i)=>({
    text:ans,
    onStart:()=>{
      nqShuffled.forEach((_,j)=>{
        const b=document.getElementById('nq-choice-'+j);
        if(b){b.style.opacity=j===i?'1':'0.5';b.style.boxShadow=j===i?'0 0 20px rgba(255,152,0,0.5), 0 0 0 3px var(--health-orange)':'none';}
      });
    }
  })),{text:'Choose your answer!',onStart:()=>{
    nqShuffled.forEach((_,j)=>{const b=document.getElementById('nq-choice-'+j);if(b){b.style.opacity='1';b.style.boxShadow='none';}});
  }}];
  speakSequence(seq);
}

function nutriQuizAnswer(i,btn) {
  if (nqAnswered) return;
  nqAnswered=true;
  stopCurrentTTS();
  const btns=document.querySelectorAll('#nq-choices .choice-btn');
  nqShuffled.forEach((_,j)=>{const b=document.getElementById('nq-choice-'+j);if(b){b.style.opacity='1';b.style.boxShadow='none';}});
  if (i===nqCorrectIdx) {
    btn.classList.add('correct'); nqScore++;
    document.getElementById('nq-score').textContent=nqScore;
    document.getElementById('nq-feedback').textContent='✅ Correct! Well done!';
    document.getElementById('nq-feedback').className='feedback correct';
    SFX.healthCorrect();
    speakQuick('Correct! Well done!', ()=>{
      setTimeout(()=>{ nqIndex++; renderNutriQ(); },500);
    });
  } else {
    btn.classList.add('wrong'); btns[nqCorrectIdx].classList.add('correct');
    document.getElementById('nq-feedback').textContent='❌ The answer is: '+nqShuffled[nqCorrectIdx];
    document.getElementById('nq-feedback').className='feedback incorrect';
    SFX.healthWrong();
    speakQuick('Not quite! The answer is '+nqShuffled[nqCorrectIdx], ()=>{
      setTimeout(()=>{ nqIndex++; renderNutriQ(); },500);
    });
  }
}

// ============ B6: FOOD SORT ============
const sortFoods = [
  {emoji:'🍗',name:'Chicken',group:'protein'},{emoji:'🥩',name:'Steak',group:'protein'},
  {emoji:'🥚',name:'Egg',group:'protein'},{emoji:'🐟',name:'Fish',group:'protein'},
  {emoji:'🫘',name:'Beans',group:'protein'},{emoji:'🍞',name:'Bread',group:'carbs'},
  {emoji:'🍚',name:'Rice',group:'carbs'},{emoji:'🍝',name:'Pasta',group:'carbs'},
  {emoji:'🥔',name:'Potato',group:'carbs'},{emoji:'🥣',name:'Oats',group:'carbs'},
  {emoji:'🍎',name:'Apple',group:'fruitsveggies'},{emoji:'🥦',name:'Broccoli',group:'fruitsveggies'},
  {emoji:'🥕',name:'Carrot',group:'fruitsveggies'},{emoji:'🍌',name:'Banana',group:'fruitsveggies'},
  {emoji:'🍇',name:'Grapes',group:'fruitsveggies'},{emoji:'🥑',name:'Avocado',group:'fats'},
  {emoji:'🥜',name:'Nuts',group:'fats'},{emoji:'🫒',name:'Olive Oil',group:'fats'},
  {emoji:'🌻',name:'Seeds',group:'fats'},{emoji:'🧈',name:'Butter',group:'fats'},
];
let fsQueue=[], fsCurrent=0, fsScore2=0;

function startFoodSort() {
  fsQueue=[...sortFoods].sort(()=>Math.random()-0.5).slice(0,15);
  fsCurrent=0; fsScore2=0;
  document.getElementById('fs-score').textContent='0';
  document.getElementById('fs-left').textContent=fsQueue.length;
  document.getElementById('fs-feedback').textContent='';
  document.getElementById('fs-feedback').className='feedback';
  renderSortFood();
  speakQuick('Sort the foods into the right groups!');
}

function renderSortFood() {
  if (fsCurrent>=fsQueue.length) {
    const stars=fsScore2>=13?3:fsScore2>=10?2:1;
    celebrate(`🎉 Food Factory done! ${fsScore2}/${fsQueue.length} correct! 🎉`,stars);
    return;
  }
  const f=fsQueue[fsCurrent];
  const el=document.getElementById('sort-food');
  el.textContent=f.emoji;
  el.className='conveyor-food';
  document.getElementById('sort-food-name').textContent=f.name;
  el.style.animation='none';
  setTimeout(()=>el.style.animation='bounceIn 0.5s ease',10);
}

function sortFood(group) {
  if (fsCurrent>=fsQueue.length) return;
  const f=fsQueue[fsCurrent];
  const fb=document.getElementById('fs-feedback');
  const el=document.getElementById('sort-food');
  if (f.group===group) {
    fsScore2++; document.getElementById('fs-score').textContent=fsScore2;
    fb.textContent='✅ Correct! '+f.name+' is '+groupLabel(group)+'!';
    fb.className='feedback correct';
    el.classList.add('sort-correct');
    SFX.healthCorrect();
  } else {
    fb.textContent='❌ '+f.name+' is actually '+groupLabel(f.group)+'!';
    fb.className='feedback incorrect';
    el.classList.add('sort-wrong');
    SFX.healthWrong();
  }
  fsCurrent++;
  document.getElementById('fs-left').textContent=Math.max(0,fsQueue.length-fsCurrent);
  setTimeout(renderSortFood,1200);
}

function groupLabel(g) {
  return {protein:'a Protein',carbs:'a Carb',fruitsveggies:'a Fruit or Veggie',fats:'a Healthy Fat'}[g]||g;
}

// ============ M: MUSIC & INSTRUMENTS ============
const instruments = [
  { id:'piano', emoji:'🎹', name:'Piano', family:'strings', fact:'A piano has 88 keys and makes sound when little hammers hit strings inside!' },
  { id:'guitar', emoji:'🎸', name:'Guitar', family:'strings', fact:'A guitar has 6 strings you pluck or strum to make beautiful music!' },
  { id:'violin', emoji:'🎻', name:'Violin', family:'strings', fact:'A violin is played with a bow that slides across its strings to make a singing sound!' },
  { id:'drum', emoji:'🥁', name:'Drum', family:'percussion', fact:'Drums are one of the oldest instruments! You hit them with sticks to make a beat!' },
  { id:'tambourine', emoji:'🪇', name:'Tambourine', family:'percussion', fact:'A tambourine has tiny metal discs that jingle when you shake or hit it!' },
  { id:'xylophone', emoji:'🎵', name:'Xylophone', family:'percussion', fact:'A xylophone has colourful bars you hit with mallets to play different notes!' },
  { id:'trumpet', emoji:'🎺', name:'Trumpet', family:'wind', fact:'A trumpet is a shiny brass instrument you blow into to make a bright, loud sound!' },
  { id:'flute', emoji:'🪈', name:'Flute', family:'wind', fact:'A flute makes a soft, gentle sound when you blow air across a hole!' },
];

const familyNames = { strings:'Strings 🎸', percussion:'Percussion 🥁', wind:'Wind 🎺' };

// --- Web Audio Instrument Sounds (rich, 2-3s each) ---
function _playNote(ctx, freq, startTime, duration, vol, type, filterFreq) {
  const o = ctx.createOscillator();
  o.type = type || 'sine';
  o.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.001, startTime);
  g.gain.linearRampToValueAtTime(vol || 0.3, startTime + 0.005);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  if (filterFreq) {
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = filterFreq;
    o.connect(f); f.connect(g);
  } else {
    o.connect(g);
  }
  g.connect(ctx.destination);
  o.start(startTime); o.stop(startTime + duration);
}

function _playGuitarPluck(ctx, freq, startTime, duration, vol) {
  // Karplus-Strong inspired: noise burst → comb filter → warm decay
  const sampleRate = ctx.sampleRate;
  const len = Math.round(sampleRate / freq);
  const bufferSize = Math.round(sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  // Initial excitation: short noise burst shaped like a pluck
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.8;
  // Feedback loop with averaging (Karplus-Strong)
  for (let i = len; i < bufferSize; i++) {
    data[i] = (data[i - len] + data[i - len + 1]) * 0.498;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, startTime);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 4000;
  src.connect(lp); lp.connect(g); g.connect(ctx.destination);
  src.start(startTime); src.stop(startTime + duration);
}

function playInstrumentSound(id, noteFreq) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const t = ctx.currentTime;

  if (id === 'piano') {
    // 3-note arpeggio: C4, E4, G4 with harmonics
    const notes = noteFreq ? [noteFreq] : [261.63, 329.63, 392.00];
    notes.forEach((f, i) => {
      const delay = i * 0.15;
      _playNote(ctx, f, t + delay, 2.2, 0.3, 'sine');
      _playNote(ctx, f * 2, t + delay, 1.8, 0.08, 'sine'); // 2nd harmonic
      _playNote(ctx, f * 3, t + delay, 1.2, 0.03, 'sine'); // 3rd harmonic
    });
  } else if (id === 'guitar') {
    // Plucked guitar string using Karplus-Strong-inspired synthesis
    if (noteFreq) {
      _playGuitarPluck(ctx, noteFreq, t, 3.0, 0.35);
    } else {
      // Full strum
      const strings = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
      strings.forEach((f, i) => _playGuitarPluck(ctx, f, t + i * 0.05, 2.5, 0.15));
    }
  } else if (id === 'violin') {
    // Rich bowed sound with vibrato
    const freq = noteFreq || 440;
    const dur = 3.0;
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = freq;
    const o2 = ctx.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = freq * 2; // harmonic
    const o3 = ctx.createOscillator(); o3.type = 'sine'; o3.frequency.value = freq * 3;
    // Vibrato LFO
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 5.5;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 6;
    lfo.connect(lfoGain); lfoGain.connect(o.frequency); lfoGain.connect(o2.frequency);
    // Filter for warmth
    const filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 2500;
    // Mix
    const mix = ctx.createGain();
    const g2 = ctx.createGain(); g2.gain.value = 0.15;
    const g3 = ctx.createGain(); g3.gain.value = 0.06;
    o.connect(filt); filt.connect(mix);
    o2.connect(g2); g2.connect(mix);
    o3.connect(g3); g3.connect(mix);
    mix.connect(ctx.destination);
    // Slow bow attack envelope
    mix.gain.setValueAtTime(0.001, t);
    mix.gain.linearRampToValueAtTime(0.25, t + 0.5);
    mix.gain.setValueAtTime(0.25, t + 2.0);
    mix.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t); o.stop(t + dur);
    o2.start(t); o2.stop(t + dur);
    o3.start(t); o3.stop(t + dur);
    lfo.start(t); lfo.stop(t + dur);
  } else if (id === 'drum') {
    // Deep resonant hit with body
    const body = ctx.createOscillator(); body.type = 'sine';
    body.frequency.setValueAtTime(150, t);
    body.frequency.exponentialRampToValueAtTime(60, t + 0.3);
    const bg = ctx.createGain();
    bg.gain.setValueAtTime(0.6, t);
    bg.gain.exponentialRampToValueAtTime(0.001, t + 2.0);
    body.connect(bg); bg.connect(ctx.destination);
    body.start(t); body.stop(t + 2.0);
    // Sub-bass
    const sub = ctx.createOscillator(); sub.type = 'sine'; sub.frequency.value = 50;
    const sg = ctx.createGain(); sg.gain.setValueAtTime(0.15, t);
    sg.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
    sub.connect(sg); sg.connect(ctx.destination);
    sub.start(t); sub.stop(t + 1.5);
    // Transient noise crack
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
    const ns = ctx.createBufferSource(); ns.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 4000; bp.Q.value = 1;
    const ng = ctx.createGain(); ng.gain.setValueAtTime(0.35, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    ns.connect(bp); bp.connect(ng); ng.connect(ctx.destination);
    ns.start(t); ns.stop(t + 0.15);
  } else if (id === 'tambourine') {
    // Hit + metallic jingle shimmer
    const dur = 2.5;
    // Initial hit noise
    const hitBuf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const hd = hitBuf.getChannelData(0);
    for (let i = 0; i < hd.length; i++) hd[i] = (Math.random() * 2 - 1);
    const hit = ctx.createBufferSource(); hit.buffer = hitBuf;
    const hbp = ctx.createBiquadFilter(); hbp.type = 'bandpass'; hbp.frequency.value = 3000;
    const hg = ctx.createGain(); hg.gain.setValueAtTime(0.4, t);
    hg.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    hit.connect(hbp); hbp.connect(hg); hg.connect(ctx.destination);
    hit.start(t); hit.stop(t + 0.08);
    // Metallic jingle oscillators with tremolo
    [6200, 7800, 9400, 11000].forEach((f, i) => {
      const o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.value = f + (Math.random() * 200 - 100);
      const trem = ctx.createOscillator(); trem.type = 'sine'; trem.frequency.value = 14 + i * 2;
      const tremG = ctx.createGain(); tremG.gain.value = 0.06;
      trem.connect(tremG);
      const g = ctx.createGain();
      tremG.connect(g.gain);
      g.gain.setValueAtTime(0.08, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 4000;
      o.connect(hp); hp.connect(g); g.connect(ctx.destination);
      o.start(t + 0.02); o.stop(t + dur);
      trem.start(t); trem.stop(t + dur);
    });
  } else if (id === 'xylophone') {
    // 4-note ascending bright run
    const notes = noteFreq ? [noteFreq] : [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, i) => {
      const delay = i * 0.25;
      // Bright sine + 3rd partial
      _playNote(ctx, f, t + delay, 1.2, 0.35, 'sine');
      _playNote(ctx, f * 3, t + delay, 0.8, 0.08, 'sine'); // metallic overtone
    });
  } else if (id === 'trumpet') {
    // Bold 2-note fanfare
    const notes = noteFreq ? [[noteFreq, 1.5]] : [[392, 0.8], [523.25, 1.8]];
    let offset = 0;
    notes.forEach(([f, dur]) => {
      // Square + sawtooth for brassy timbre
      const o1 = ctx.createOscillator(); o1.type = 'square'; o1.frequency.value = f;
      const o2 = ctx.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = f;
      const filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 2000;
      const mix = ctx.createGain();
      const g2 = ctx.createGain(); g2.gain.value = 0.4;
      o1.connect(mix); o2.connect(g2); g2.connect(mix);
      mix.connect(filt); filt.connect(ctx.destination);
      mix.gain.setValueAtTime(0.001, t + offset);
      mix.gain.linearRampToValueAtTime(0.25, t + offset + 0.04);
      mix.gain.setValueAtTime(0.25, t + offset + dur * 0.7);
      mix.gain.exponentialRampToValueAtTime(0.001, t + offset + dur);
      o1.start(t + offset); o1.stop(t + offset + dur);
      o2.start(t + offset); o2.stop(t + offset + dur);
      offset += dur * 0.85;
    });
  } else if (id === 'flute') {
    // Airy sustained note with vibrato and breath
    const freq = noteFreq || 659;
    const dur = 3.0;
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = freq;
    const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = freq * 2;
    // Vibrato
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 4.5;
    const lfoG = ctx.createGain(); lfoG.gain.value = 4;
    lfo.connect(lfoG); lfoG.connect(o.frequency);
    // Breath noise
    const nBuf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const nd = nBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = (Math.random() * 2 - 1);
    const ns = ctx.createBufferSource(); ns.buffer = nBuf;
    const nbp = ctx.createBiquadFilter(); nbp.type = 'bandpass'; nbp.frequency.value = freq; nbp.Q.value = 3;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.001, t);
    ng.gain.linearRampToValueAtTime(0.06, t + 0.3);
    ng.gain.setValueAtTime(0.06, t + dur * 0.7);
    ng.gain.exponentialRampToValueAtTime(0.001, t + dur);
    ns.connect(nbp); nbp.connect(ng); ng.connect(ctx.destination);
    // Main mix
    const mix = ctx.createGain();
    const g2 = ctx.createGain(); g2.gain.value = 0.05;
    o.connect(mix); o2.connect(g2); g2.connect(mix);
    mix.connect(ctx.destination);
    mix.gain.setValueAtTime(0.001, t);
    mix.gain.linearRampToValueAtTime(0.3, t + 0.3);
    mix.gain.setValueAtTime(0.3, t + dur * 0.7);
    mix.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t); o.stop(t + dur);
    o2.start(t); o2.stop(t + dur);
    lfo.start(t); lfo.stop(t + dur);
    ns.start(t); ns.stop(t + dur);
  }
}

// --- M1: Instrument Explorer ---
let meExplored = new Set();

function initMusicExplorer() {
  meExplored = new Set();
  document.getElementById('me-count').textContent = '0';
  document.getElementById('me-detail').style.display = 'none';
  document.getElementById('me-feedback').textContent = '';
  const grid = document.getElementById('me-grid');
  grid.innerHTML = '';
  instruments.forEach((inst, i) => {
    const btn = document.createElement('button');
    btn.className = 'instrument-btn';
    btn.id = 'inst-btn-' + inst.id;
    btn.innerHTML = `<div class="inst-emoji">${inst.emoji}</div><div class="inst-name">${inst.name}</div>`;
    btn.onclick = () => exploreInstrument(i);
    grid.appendChild(btn);
  });
  speakQuick('Tap an instrument to learn about it!');
}

const MUSIC_SPARKLES = '<div class="sparkles"><span class="sparkle">🎵</span><span class="sparkle">✨</span><span class="sparkle">🎶</span><span class="sparkle">⭐</span><span class="sparkle">✨</span><span class="sparkle">🎵</span></div>';
const instrumentScenes = {
  piano: `<div class="illust inst-scene-piano">
    <div class="sky"></div><div class="ground"></div>
    <div class="el" style="bottom:15%;left:50%;transform:translateX(-50%);font-size:9rem;">🎹</div>
    <div class="el float" style="top:10%;left:15%;font-size:2.5rem;">🎵</div>
    <div class="el float" style="top:18%;right:18%;font-size:2rem;">🎶</div>
    <div class="el float" style="top:30%;left:8%;font-size:1.8rem;">♪</div>
    <div class="el" style="top:8%;right:35%;font-size:1.5rem;">✨</div>
    ${MUSIC_SPARKLES}</div>`,
  guitar: `<div class="illust inst-scene-guitar">
    <div class="sky"></div><div class="ground"></div>
    <div class="el" style="bottom:15%;left:50%;transform:translateX(-50%);font-size:9rem;">🎸</div>
    <div class="el float" style="top:12%;left:12%;font-size:2.2rem;">⭐</div>
    <div class="el float" style="top:20%;right:15%;font-size:2rem;">🎵</div>
    <div class="el" style="bottom:35%;right:10%;font-size:2.5rem;">🔥</div>
    <div class="el float" style="top:8%;left:45%;font-size:1.8rem;">🎶</div>
    ${MUSIC_SPARKLES}</div>`,
  violin: `<div class="illust inst-scene-violin">
    <div class="sky"></div><div class="ground"></div>
    <div class="el" style="bottom:15%;left:50%;transform:translateX(-50%);font-size:9rem;">🎻</div>
    <div class="el float" style="top:10%;left:20%;font-size:2rem;">✨</div>
    <div class="el float" style="top:15%;right:15%;font-size:2.5rem;">🎵</div>
    <div class="el" style="top:35%;left:10%;font-size:1.8rem;">🌟</div>
    <div class="el float" style="top:8%;right:40%;font-size:2rem;">🎶</div>
    ${MUSIC_SPARKLES}</div>`,
  drum: `<div class="illust inst-scene-drum">
    <div class="sky"></div><div class="ground"></div>
    <div class="el" style="bottom:15%;left:50%;transform:translateX(-50%);font-size:9rem;">🥁</div>
    <div class="el float" style="top:8%;left:20%;font-size:2.5rem;">💥</div>
    <div class="el float" style="top:15%;right:12%;font-size:2rem;">🎵</div>
    <div class="el" style="top:25%;left:8%;font-size:2.2rem;">⚡</div>
    <div class="el float" style="top:10%;right:35%;font-size:1.8rem;">🔊</div>
    ${MUSIC_SPARKLES}</div>`,
  tambourine: `<div class="illust inst-scene-tambourine">
    <div class="sky"></div><div class="ground"></div>
    <div class="el" style="bottom:15%;left:50%;transform:translateX(-50%);font-size:9rem;">🪇</div>
    <div class="el float" style="top:10%;left:15%;font-size:2rem;">✨</div>
    <div class="el float" style="top:18%;right:20%;font-size:2.5rem;">🎶</div>
    <div class="el" style="top:30%;right:10%;font-size:1.8rem;">💫</div>
    <div class="el float" style="top:8%;left:40%;font-size:2rem;">🌟</div>
    ${MUSIC_SPARKLES}</div>`,
  xylophone: `<div class="illust inst-scene-xylophone">
    <div class="sky"></div><div class="ground"></div>
    <div class="el" style="bottom:15%;left:50%;transform:translateX(-50%);font-size:9rem;">🎵</div>
    <div class="el float" style="top:10%;left:10%;font-size:2.5rem;">🌈</div>
    <div class="el float" style="top:15%;right:15%;font-size:2rem;">✨</div>
    <div class="el" style="top:28%;left:18%;font-size:2rem;">🎶</div>
    <div class="el float" style="top:8%;right:38%;font-size:1.8rem;">⭐</div>
    ${MUSIC_SPARKLES}</div>`,
  trumpet: `<div class="illust inst-scene-trumpet">
    <div class="sky"></div><div class="ground"></div>
    <div class="el" style="bottom:15%;left:50%;transform:translateX(-50%);font-size:9rem;">🎺</div>
    <div class="el float" style="top:8%;left:15%;font-size:2.5rem;">⭐</div>
    <div class="el float" style="top:18%;right:12%;font-size:2rem;">🎵</div>
    <div class="el" style="top:12%;left:40%;font-size:2.2rem;">👑</div>
    <div class="el float" style="top:30%;right:25%;font-size:1.8rem;">🎶</div>
    ${MUSIC_SPARKLES}</div>`,
  flute: `<div class="illust inst-scene-flute">
    <div class="sky"></div><div class="ground"></div>
    <div class="el" style="bottom:15%;left:50%;transform:translateX(-50%);font-size:9rem;">🪈</div>
    <div class="el float" style="top:10%;left:12%;font-size:2.5rem;">🦋</div>
    <div class="el float" style="top:18%;right:15%;font-size:2rem;">🌿</div>
    <div class="el" style="top:30%;left:20%;font-size:1.8rem;">🍃</div>
    <div class="el float" style="top:8%;right:30%;font-size:2rem;">🎵</div>
    ${MUSIC_SPARKLES}</div>`,
};

function exploreInstrument(idx) {
  const inst = instruments[idx];
  meExplored.add(inst.id);
  document.getElementById('me-count').textContent = meExplored.size;
  document.getElementById('inst-btn-' + inst.id).classList.add('explored');
  const detail = document.getElementById('me-detail');
  detail.style.display = 'block';
  detail.innerHTML = `<div class="inst-illust-container">${instrumentScenes[inst.id]}</div>
    <div class="detail-name">${inst.name}</div>
    <div class="detail-family">Family: ${familyNames[inst.family]}</div>
    <div class="detail-fact" id="inst-fact-text">${inst.fact}</div>`;
  playInstrumentSound(inst.id);
  speakQuick(`This is a ${inst.name}! ${inst.fact}`, null, document.getElementById('inst-fact-text'), inst.fact);
  if (meExplored.size === instruments.length) {
    setTimeout(() => celebrate('🎉 You explored all 8 instruments! 🎉', 3), 2000);
  }
}

// --- M2: What's That Sound? ---
let sqQuestions = [], sqCurrent = 0, sqScore = 0, sqCurrentInst = null;

function startSoundQuiz() {
  sqQuestions = [...instruments].sort(() => Math.random() - 0.5);
  sqCurrent = 0; sqScore = 0;
  document.getElementById('sq-score').textContent = '0';
  document.getElementById('sq-feedback').textContent = '';
  renderSoundQuizQ();
}

function renderSoundQuizQ() {
  if (sqCurrent >= sqQuestions.length) {
    const stars = sqScore >= 7 ? 3 : sqScore >= 5 ? 2 : 1;
    celebrate(`🎉 Sound Quiz done! ${sqScore}/8 correct! 🎉`, stars);
    return;
  }
  sqCurrentInst = sqQuestions[sqCurrent];
  const progEl = document.getElementById('sq-progress');
  progEl.innerHTML = '';
  for (let i = 0; i < sqQuestions.length; i++) {
    const dot = document.createElement('span');
    dot.className = 'quiz-dot' + (i === sqCurrent ? ' active' : i < sqCurrent ? ' done' : '');
    progEl.appendChild(dot);
  }
  document.getElementById('sq-question').textContent = 'Listen carefully... which instrument makes this sound?';
  document.getElementById('sq-play-btn').style.display = 'inline-block';
  document.getElementById('sq-feedback').textContent = '';

  // Play the sound
  setTimeout(() => playInstrumentSound(sqCurrentInst.id), 500);

  // Generate 4 choices (correct + 3 wrong)
  const wrong = instruments.filter(i => i.id !== sqCurrentInst.id).sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [sqCurrentInst, ...wrong].sort(() => Math.random() - 0.5);

  const grid = document.getElementById('sq-choices');
  grid.innerHTML = '';
  choices.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'music-choice';
    btn.innerHTML = `${ch.emoji} ${ch.name}`;
    btn.onclick = () => answerSoundQuiz(ch.id, btn);
    grid.appendChild(btn);
  });

  speakQuick('Listen carefully... which instrument makes this sound?');
}

function playSoundQuizSound() {
  if (sqCurrentInst) playInstrumentSound(sqCurrentInst.id);
}

function answerSoundQuiz(chosenId, btn) {
  const fb = document.getElementById('sq-feedback');
  const allBtns = document.querySelectorAll('#sq-choices .music-choice');
  allBtns.forEach(b => b.disabled = true);

  if (chosenId === sqCurrentInst.id) {
    sqScore++;
    document.getElementById('sq-score').textContent = sqScore;
    fb.textContent = `✅ Correct! That was the ${sqCurrentInst.name}!`;
    fb.className = 'feedback correct';
    btn.style.borderColor = '#4CAF50';
    SFX.faithCorrect();
    speakQuick(`Correct! That was the ${sqCurrentInst.name}!`);
  } else {
    fb.textContent = `❌ Not quite! That was the ${sqCurrentInst.name}!`;
    fb.className = 'feedback incorrect';
    btn.style.borderColor = '#f44336';
    SFX.faithWrong();
    speakQuick(`Not quite! That was the ${sqCurrentInst.name}!`);
  }
  sqCurrent++;
  setTimeout(renderSoundQuizQ, 2200);
}

// --- M3: Instrument Families Sort ---
let mfQueue = [], mfCurrent = 0, mfScore = 0;

function startMusicFamilies() {
  mfQueue = [...instruments].sort(() => Math.random() - 0.5);
  mfCurrent = 0; mfScore = 0;
  document.getElementById('mf-count').textContent = '0';
  document.getElementById('mf-feedback').textContent = '';
  const bins = document.getElementById('mf-bins');
  bins.innerHTML = '';
  ['strings', 'percussion', 'wind'].forEach(fam => {
    const btn = document.createElement('button');
    btn.className = 'sort-bin';
    btn.innerHTML = `<div class="bin-emoji">${familyNames[fam].split(' ')[1]}</div><div class="bin-label">${familyNames[fam].split(' ')[0]}</div><div class="bin-count" id="mf-bin-${fam}">0</div>`;
    btn.onclick = () => sortInstrument(fam);
    bins.appendChild(btn);
  });
  renderMusicFamilyItem();
  speakQuick('Sort each instrument into the right family!');
}

function renderMusicFamilyItem() {
  if (mfCurrent >= mfQueue.length) {
    const stars = mfScore >= 7 ? 3 : mfScore >= 5 ? 2 : 1;
    celebrate(`🎉 All instruments sorted! ${mfScore}/8 correct! 🎉`, stars);
    return;
  }
  const inst = mfQueue[mfCurrent];
  const el = document.getElementById('mf-current');
  el.innerHTML = `<div style="font-size:5rem;margin-bottom:10px;">${inst.emoji}</div><div style="font-size:2rem;font-weight:700;">${inst.name}</div>`;
  el.style.animation = 'none';
  setTimeout(() => el.style.animation = 'bounceIn 0.5s ease', 10);
  document.getElementById('mf-feedback').textContent = '';
  playInstrumentSound(inst.id);
}

function sortInstrument(family) {
  if (mfCurrent >= mfQueue.length) return;
  const inst = mfQueue[mfCurrent];
  const fb = document.getElementById('mf-feedback');
  if (inst.family === family) {
    mfScore++;
    fb.textContent = `✅ Correct! ${inst.name} is a ${family} instrument!`;
    fb.className = 'feedback correct';
    SFX.faithCorrect();
    speakQuick(`Correct! ${inst.name} is a ${family} instrument!`);
  } else {
    fb.textContent = `❌ ${inst.name} is actually a ${inst.family} instrument!`;
    fb.className = 'feedback incorrect';
    SFX.faithWrong();
    speakQuick(`Not quite! ${inst.name} is a ${inst.family} instrument!`);
  }
  mfCurrent++;
  document.getElementById('mf-count').textContent = mfCurrent;
  setTimeout(renderMusicFamilyItem, 1500);
}

// --- M4: Play Music (Piano, Drums, Xylophone, Guitar) ---
const pianoNotes = [
  { note: 'C', freq: 261.63, color: '#f44336' },
  { note: 'D', freq: 293.66, color: '#FF9800' },
  { note: 'E', freq: 329.63, color: '#FFEB3B' },
  { note: 'F', freq: 349.23, color: '#4CAF50' },
  { note: 'G', freq: 392.00, color: '#03A9F4' },
  { note: 'A', freq: 440.00, color: '#3F51B5' },
  { note: 'B', freq: 493.88, color: '#9C27B0' },
  { note: 'C2', freq: 523.25, color: '#E91E63' },
];
const xyloNotes = [
  { note: 'C', freq: 523.25, color: '#f44336', h: 170 },
  { note: 'D', freq: 587.33, color: '#FF9800', h: 155 },
  { note: 'E', freq: 659.25, color: '#FFEB3B', h: 140 },
  { note: 'F', freq: 698.46, color: '#4CAF50', h: 125 },
  { note: 'G', freq: 783.99, color: '#03A9F4', h: 115 },
  { note: 'A', freq: 880.00, color: '#3F51B5', h: 105 },
  { note: 'B', freq: 987.77, color: '#9C27B0', h: 95 },
  { note: 'C2', freq: 1046.50, color: '#E91E63', h: 85 },
];
const drumKit = [
  { name: 'Hi-Hat', type: 'hihat', css: 'dk-hihat drum-cymbal' },
  { name: 'Crash', type: 'crash', css: 'dk-crash drum-cymbal' },
  { name: 'Ride', type: 'ride', css: 'dk-ride drum-cymbal' },
  { name: 'Snare', type: 'snare', css: 'dk-snare drum-shell' },
  { name: 'High Tom', type: 'tom', css: 'dk-tom1 drum-shell' },
  { name: 'Mid Tom', type: 'tom2', css: 'dk-tom2 drum-shell' },
  { name: 'Floor Tom', type: 'floor', css: 'dk-floor-tom drum-shell' },
  { name: 'Bass Drum', type: 'kick', css: 'dk-kick drum-shell' },
];
const guitarStrings = [
  { note: 'E', freq: 82.41, color: '#ff5252', thickness: 7 },
  { note: 'A', freq: 110.00, color: '#ff9100', thickness: 6 },
  { note: 'D', freq: 146.83, color: '#ffea00', thickness: 6 },
  { note: 'G', freq: 196.00, color: '#69f0ae', thickness: 5 },
  { note: 'B', freq: 246.94, color: '#40c4ff', thickness: 4 },
  { note: 'e', freq: 329.63, color: '#e040fb', thickness: 3 },
];

function darken(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.max(0,r-50)},${Math.max(0,g-50)},${Math.max(0,b-50)})`;
}

let currentPlayInst = 'piano';
function initPlayMusic() {
  currentPlayInst = 'piano';
  document.querySelectorAll('.play-inst-tab').forEach((t,i) => t.classList.toggle('active', i===0));
  renderPlayInstrument();
  speakQuick('Tap the keys to make music!');
}

function switchPlayInst(inst, btn) {
  currentPlayInst = inst;
  document.querySelectorAll('.play-inst-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPlayInstrument();
}

function renderPlayInstrument() {
  const area = document.getElementById('play-inst-area');
  const fb = document.getElementById('play-inst-feedback');
  area.innerHTML = '';
  if (currentPlayInst === 'piano') {
    const c = document.createElement('div'); c.className = 'piano-container';
    pianoNotes.forEach((n, i) => {
      const key = document.createElement('button'); key.className = 'piano-key';
      key.style.background = `linear-gradient(180deg, ${n.color}, ${darken(n.color)})`;
      key.innerHTML = `<div class="key-note">${n.note.replace('2','')}</div>`;
      key.onclick = () => { playInstrumentSound('piano', n.freq); key.classList.add('key-active'); fb.textContent = `🎵 ${n.note.replace('2','')}`; setTimeout(() => key.classList.remove('key-active'), 300); };
      c.appendChild(key);
    });
    area.appendChild(c);
    fb.textContent = 'Tap the keys to make music!';
  } else if (currentPlayInst === 'xylo') {
    const wrap = document.createElement('div'); wrap.className = 'xylo-wrapper';
    const frame = document.createElement('div'); frame.className = 'xylo-frame';
    const bars = document.createElement('div'); bars.className = 'xylo-bars';
    xyloNotes.forEach((n, i) => {
      const bar = document.createElement('button'); bar.className = 'xylo-bar';
      bar.style.background = `linear-gradient(180deg, ${n.color}, ${darken(n.color)})`;
      bar.style.height = n.h + 'px';
      bar.style.width = (95 - i * 5) + 'px';
      bar.innerHTML = n.note.replace('2','');
      bar.onclick = () => { playInstrumentSound('xylophone', n.freq); bar.classList.add('bar-active'); fb.textContent = `🎵 ${n.note.replace('2','')}`; setTimeout(() => bar.classList.remove('bar-active'), 300); };
      bars.appendChild(bar);
    });
    wrap.appendChild(frame);
    wrap.appendChild(bars);
    area.appendChild(wrap);
    fb.textContent = 'Tap the bars to play!';
  } else if (currentPlayInst === 'drums') {
    const kit = document.createElement('div'); kit.className = 'drum-kit';
    drumKit.forEach(dk => {
      const piece = document.createElement('button');
      piece.className = `drum-piece ${dk.css}`;
      const inner = dk.css.includes('drum-shell') ? `<div class="drum-head"></div><span class="drum-name">${dk.name}</span>` : `<span class="drum-name">${dk.name}</span>`;
      piece.innerHTML = inner;
      piece.onclick = () => { playDrumSound(dk.type); piece.classList.add('dp-active'); fb.textContent = `🥁 ${dk.name}!`; setTimeout(() => piece.classList.remove('dp-active'), 200); };
      kit.appendChild(piece);
    });
    area.appendChild(kit);
    fb.textContent = 'Hit the drums to play!';
  } else if (currentPlayInst === 'guitar') {
    const body = document.createElement('div'); body.className = 'guitar-body';
    const visual = document.createElement('div'); visual.className = 'guitar-visual';
    visual.innerHTML = '<div class="guitar-neck"></div><div class="guitar-soundhole"></div>';
    const stringsArea = document.createElement('div'); stringsArea.className = 'guitar-strings-area';
    guitarStrings.forEach((s, i) => {
      const row = document.createElement('div'); row.className = 'gtr-string';
      row.innerHTML = `<span class="gtr-string-label" style="color:${s.color}">${s.note}</span><div class="gtr-string-wire" style="background:${s.color};height:${s.thickness}px;"></div><span class="gtr-string-note">${s.note}</span>`;
      row.onclick = () => { playInstrumentSound('guitar', s.freq); row.classList.add('gs-active'); fb.textContent = `🎸 ${s.note} string!`; setTimeout(() => row.classList.remove('gs-active'), 600); };
      stringsArea.appendChild(row);
    });
    visual.appendChild(stringsArea);
    body.appendChild(visual);
    area.appendChild(body);
    fb.textContent = 'Pluck the strings to play!';
  }
}

function playDrumSound(type) {
  const ctx = getAudioCtx(); const now = ctx.currentTime;
  const master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination);
  if (type === 'kick') {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(150, now); o.frequency.exponentialRampToValueAtTime(40, now+0.2);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.8, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.5);
    o.connect(g); g.connect(master); o.start(now); o.stop(now+0.5);
  } else if (type === 'snare') {
    const buf = ctx.createBuffer(1, ctx.sampleRate*0.2, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*0.05));
    const src = ctx.createBufferSource(); src.buffer = buf;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.6, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.25);
    src.connect(g); g.connect(master); src.start(now);
    const o = ctx.createOscillator(); o.type='triangle'; o.frequency.value=180;
    const g2=ctx.createGain(); g2.gain.setValueAtTime(0.4,now); g2.gain.exponentialRampToValueAtTime(0.001,now+0.1);
    o.connect(g2); g2.connect(master); o.start(now); o.stop(now+0.15);
  } else if (type === 'hihat') {
    const buf = ctx.createBuffer(1, ctx.sampleRate*0.1, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*0.015));
    const src = ctx.createBufferSource(); src.buffer = buf;
    const hp = ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=7000;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.4, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.1);
    src.connect(hp); hp.connect(g); g.connect(master); src.start(now);
  } else if (type === 'tom') {
    const o = ctx.createOscillator(); o.type='sine'; o.frequency.setValueAtTime(200, now); o.frequency.exponentialRampToValueAtTime(100, now+0.25);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.7, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.35);
    o.connect(g); g.connect(master); o.start(now); o.stop(now+0.35);
  } else if (type === 'tom2') {
    const o = ctx.createOscillator(); o.type='sine'; o.frequency.setValueAtTime(150, now); o.frequency.exponentialRampToValueAtTime(80, now+0.3);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.7, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.4);
    o.connect(g); g.connect(master); o.start(now); o.stop(now+0.4);
  } else if (type === 'floor') {
    const o = ctx.createOscillator(); o.type='sine'; o.frequency.setValueAtTime(100, now); o.frequency.exponentialRampToValueAtTime(50, now+0.4);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.75, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.5);
    o.connect(g); g.connect(master); o.start(now); o.stop(now+0.5);
  } else if (type === 'crash') {
    const buf = ctx.createBuffer(1, ctx.sampleRate*0.8, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*0.2));
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=5000; bp.Q.value=0.5;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.35, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.8);
    src.connect(bp); bp.connect(g); g.connect(master); src.start(now);
  } else if (type === 'ride') {
    const buf = ctx.createBuffer(1, ctx.sampleRate*0.6, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*0.15));
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=6000; bp.Q.value=1;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.3, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.6);
    src.connect(bp); bp.connect(g); g.connect(master); src.start(now);
    const ping = ctx.createOscillator(); ping.type='sine'; ping.frequency.value=4000;
    const pg = ctx.createGain(); pg.gain.setValueAtTime(0.15, now); pg.gain.exponentialRampToValueAtTime(0.001, now+0.3);
    ping.connect(pg); pg.connect(master); ping.start(now); ping.stop(now+0.3);
  }
}

// --- M5: Animal Orchestra ---
const animalOrchestra = [
  { animal: '🐱', name: 'Cat', instrument: 'violin', instName: 'Violin' },
  { animal: '🐶', name: 'Dog', instrument: 'drum', instName: 'Drums' },
  { animal: '🐸', name: 'Frog', instrument: 'xylophone', instName: 'Xylophone' },
  { animal: '🦁', name: 'Lion', instrument: 'trumpet', instName: 'Trumpet' },
  { animal: '🐦', name: 'Bird', instrument: 'flute', instName: 'Flute' },
  { animal: '🐷', name: 'Pig', instrument: 'tambourine', instName: 'Tambourine' },
  { animal: '🐮', name: 'Cow', instrument: 'guitar', instName: 'Guitar' },
  { animal: '🐵', name: 'Monkey', instrument: 'piano', instName: 'Piano' },
];
let aoPlayed = new Set();

function initAnimalOrchestra() {
  aoPlayed.clear();
  document.getElementById('ao-count').textContent = '0';
  document.getElementById('ao-feedback').textContent = 'Tap an animal to hear its instrument!';
  const grid = document.getElementById('animal-grid');
  grid.innerHTML = '';
  animalOrchestra.forEach((a, i) => {
    const card = document.createElement('button');
    card.className = 'animal-card';
    card.id = `ao-card-${i}`;
    card.innerHTML = `<span>${a.animal}</span><span class="animal-name">${a.name}</span>`;
    card.onclick = () => tapAnimal(i);
    grid.appendChild(card);
  });
  speakQuick('Tap an animal to hear its instrument!');
}

function tapAnimal(idx) {
  const a = animalOrchestra[idx];
  const card = document.getElementById(`ao-card-${idx}`);
  aoPlayed.add(idx);
  card.classList.add('ao-played');
  card.classList.remove('ao-bounce');
  void card.offsetWidth;
  card.classList.add('ao-bounce');
  playInstrumentSound(a.instrument);
  document.getElementById('ao-count').textContent = aoPlayed.size;
  const fb = document.getElementById('ao-feedback');
  fb.textContent = `${a.animal} The ${a.name} played the ${a.instName}!`;
  speakQuick(`The ${a.name} played the ${a.instName}!`);
  if (aoPlayed.size === animalOrchestra.length) {
    setTimeout(() => celebrate('🎉 You heard the whole Animal Orchestra! 🎉', 3), 1500);
  }
}

// ============ BRAIN GYM: TRUE OR FALSE BLITZ ============
const tfAllData = [
  // Easy
  { s: "The sun is hot", a: true },
  { s: "Fish can fly", a: false },
  { s: "Water is wet", a: true },
  { s: "Dogs can bark", a: true },
  { s: "The moon is made of cheese", a: false },
  { s: "Birds have feathers", a: true },
  { s: "Ice is hot", a: false },
  { s: "Cats can purr", a: true },
  { s: "Trees can walk", a: false },
  { s: "Apples grow on trees", a: true },
  // Medium
  { s: "Spiders have 6 legs", a: false },
  { s: "The Earth is round", a: true },
  { s: "Penguins can fly", a: false },
  { s: "Honey never goes bad", a: true },
  { s: "Bats are blind", a: false },
  { s: "Dolphins are fish", a: false },
  { s: "An octopus has 3 hearts", a: true },
  { s: "A snail can sleep for 3 years", a: true },
  { s: "Cows can walk upstairs but not downstairs", a: true },
  { s: "Frogs need to drink water", a: false },
  // Hard
  { s: "Bananas are berries", a: true },
  { s: "Strawberries are actually berries", a: false },
  { s: "Goldfish have a 3-second memory", a: false },
  { s: "A group of flamingos is called a flamboyance", a: true },
  { s: "Sound travels faster in water than air", a: true },
  { s: "Venus is the hottest planet", a: true },
  { s: "Sharks are older than trees", a: true },
  { s: "Butterflies taste with their feet", a: true },
  { s: "Humans have 206 bones", a: true },
  { s: "Lightning is hotter than the surface of the sun", a: true },
];
let tfRounds = [], tfIndex = 0, tfScore = 0, tfAnswered = false, tfTimerId = null, tfTimerStart = 0;

function startTFBlitz() {
  // Pick 15: 5 easy, 5 medium, 5 hard
  const easy = tfAllData.slice(0, 10).sort(() => Math.random() - 0.5).slice(0, 5);
  const med = tfAllData.slice(10, 20).sort(() => Math.random() - 0.5).slice(0, 5);
  const hard = tfAllData.slice(20).sort(() => Math.random() - 0.5).slice(0, 5);
  tfRounds = [...easy, ...med, ...hard];
  tfIndex = 0; tfScore = 0; tfAnswered = false;
  document.getElementById('tf-score').textContent = '0';
  document.getElementById('tf-feedback').textContent = '';
  renderTFRound();
}

function getTFTimer() { return tfIndex < 5 ? 16000 : tfIndex < 10 ? 12000 : 10000; }

function clearTFTimer() { if (tfTimerId) { clearInterval(tfTimerId); tfTimerId = null; } }

function renderTFRound() {
  clearTFTimer();
  if (tfIndex >= tfRounds.length) {
    const stars = tfScore >= 12 ? 3 : tfScore >= 8 ? 2 : 1;
    celebrate(`True or False!\nScore: ${tfScore}/15`, stars);
    return;
  }
  tfAnswered = false;
  const q = tfRounds[tfIndex];
  document.getElementById('tf-statement').textContent = q.s;
  document.getElementById('tf-round').textContent = tfIndex + 1;
  document.getElementById('tf-card').className = 'tf-card';
  document.getElementById('tf-feedback').textContent = '';
  document.getElementById('tf-btn-true').disabled = false;
  document.getElementById('tf-btn-false').disabled = false;
  // Timer
  const bar = document.getElementById('tf-timer-bar');
  bar.style.width = '100%';
  const dur = getTFTimer();
  tfTimerStart = Date.now();
  tfTimerId = setInterval(() => {
    const elapsed = Date.now() - tfTimerStart;
    const pct = Math.max(0, 1 - elapsed / dur) * 100;
    bar.style.width = pct + '%';
    if (elapsed >= dur) { clearTFTimer(); answerTF(null); }
  }, 50);
}

function answerTF(val) {
  if (tfAnswered) return;
  tfAnswered = true;
  clearTFTimer();
  document.getElementById('tf-btn-true').disabled = true;
  document.getElementById('tf-btn-false').disabled = true;
  const q = tfRounds[tfIndex];
  const card = document.getElementById('tf-card');
  const fb = document.getElementById('tf-feedback');
  if (val === null) {
    card.classList.add('tf-wrong');
    fb.textContent = `⏰ Time's up! Answer: ${q.a ? 'TRUE' : 'FALSE'}`;
    SFX.brainWrong();
  } else if (val === q.a) {
    tfScore++;
    card.classList.add('tf-correct');
    fb.textContent = '✅ Correct!';
    SFX.brainCorrect();
    document.getElementById('tf-score').textContent = tfScore;
  } else {
    card.classList.add('tf-wrong');
    fb.textContent = `❌ Nope! Answer: ${q.a ? 'TRUE' : 'FALSE'}`;
    SFX.brainWrong();
  }
  tfIndex++;
  setTimeout(renderTFRound, 1500);
}

// ============ BRAIN GYM: WHAT COMES NEXT ============
const wcnAllPatterns = [
  // AB patterns
  { seq: ['🔴','🔵','🔴','🔵','🔴'], ans: '🔵', ch: ['🔵','🟡','🔴'] },
  { seq: ['⭐','🌙','⭐','🌙','⭐'], ans: '🌙', ch: ['🌙','⭐','☀️'] },
  { seq: ['🐱','🐶','🐱','🐶','🐱'], ans: '🐶', ch: ['🐶','🐱','🐰'] },
  { seq: ['🟢','🟡','🟢','🟡','🟢'], ans: '🟡', ch: ['🟡','🟢','🔴'] },
  // AAB patterns
  { seq: ['⭐','⭐','🌙','⭐','⭐'], ans: '🌙', ch: ['🌙','⭐','💫'] },
  { seq: ['🔴','🔴','🔵','🔴','🔴'], ans: '🔵', ch: ['🔵','🔴','🟡'] },
  { seq: ['🍎','🍎','🍌','🍎','🍎'], ans: '🍌', ch: ['🍌','🍎','🍇'] },
  // ABB patterns
  { seq: ['🌈','☁️','☁️','🌈','☁️'], ans: '☁️', ch: ['☁️','🌈','⭐'] },
  { seq: ['🎵','🎶','🎶','🎵','🎶'], ans: '🎶', ch: ['🎶','🎵','🎸'] },
  // ABC patterns
  { seq: ['🔴','🔵','🟡','🔴','🔵'], ans: '🟡', ch: ['🟡','🔴','🟢'] },
  { seq: ['🍎','🍌','🍇','🍎','🍌'], ans: '🍇', ch: ['🍇','🍎','🍊'] },
  { seq: ['🐱','🐶','🐰','🐱','🐶'], ans: '🐰', ch: ['🐰','🐱','🐶'] },
  // Growing/number
  { seq: ['1️⃣','2️⃣','3️⃣','4️⃣'], ans: '5️⃣', ch: ['5️⃣','6️⃣','3️⃣'] },
  { seq: ['🌱','🌿','🌲','🌱','🌿'], ans: '🌲', ch: ['🌲','🌱','🌿'] },
  { seq: ['🐣','🐥','🐔','🐣','🐥'], ans: '🐔', ch: ['🐔','🐣','🦆'] },
  { seq: ['❄️','💧','☀️','❄️','💧'], ans: '☀️', ch: ['☀️','❄️','🌈'] },
  { seq: ['🌑','🌓','🌕','🌑','🌓'], ans: '🌕', ch: ['🌕','🌑','🌗'] },
  { seq: ['🥚','🐣','🐥','🥚','🐣'], ans: '🐥', ch: ['🐥','🥚','🐔'] },
  { seq: ['🟦','🟧','🟩','🟦','🟧'], ans: '🟩', ch: ['🟩','🟦','🟥'] },
  { seq: ['😀','😃','😄','😀','😃'], ans: '😄', ch: ['😄','😀','😆'] },
];
let wcnRounds = [], wcnIndex = 0, wcnScore = 0, wcnAnswered = false;

function startWCN() {
  // Easy first, harder later
  const easy = wcnAllPatterns.slice(0, 4).sort(() => Math.random() - 0.5).slice(0, 3);
  const mid = wcnAllPatterns.slice(4, 9).sort(() => Math.random() - 0.5).slice(0, 3);
  const hard = wcnAllPatterns.slice(9).sort(() => Math.random() - 0.5).slice(0, 4);
  wcnRounds = [...easy, ...mid, ...hard];
  wcnIndex = 0; wcnScore = 0; wcnAnswered = false;
  document.getElementById('wcn-score').textContent = '0';
  document.getElementById('wcn-feedback').textContent = '';
  renderWCNRound();
}

function renderWCNRound() {
  if (wcnIndex >= wcnRounds.length) {
    const stars = wcnScore >= 8 ? 3 : wcnScore >= 5 ? 2 : 1;
    celebrate(`Pattern Master!\nScore: ${wcnScore}/10`, stars);
    return;
  }
  wcnAnswered = false;
  const p = wcnRounds[wcnIndex];
  document.getElementById('wcn-round').textContent = wcnIndex + 1;
  document.getElementById('wcn-feedback').textContent = '';
  // Render sequence with last item as mystery
  const seqEl = document.getElementById('wcn-seq');
  seqEl.innerHTML = '';
  p.seq.forEach(item => {
    const d = document.createElement('div');
    d.className = 'wcn-item';
    d.textContent = item;
    seqEl.appendChild(d);
  });
  const mystery = document.createElement('div');
  mystery.className = 'wcn-item wcn-mystery';
  mystery.textContent = '❓';
  mystery.id = 'wcn-mystery';
  seqEl.appendChild(mystery);
  // Render choices (shuffled)
  const choicesEl = document.getElementById('wcn-choices');
  const shuffled = [...p.ch].sort(() => Math.random() - 0.5);
  choicesEl.innerHTML = '';
  shuffled.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'wcn-choice';
    btn.textContent = c;
    btn.onclick = () => answerWCN(c, btn);
    choicesEl.appendChild(btn);
  });
}

function answerWCN(choice, btn) {
  if (wcnAnswered) return;
  wcnAnswered = true;
  const p = wcnRounds[wcnIndex];
  const fb = document.getElementById('wcn-feedback');
  document.querySelectorAll('.wcn-choice').forEach(b => b.disabled = true);
  if (choice === p.ans) {
    wcnScore++;
    btn.classList.add('wcn-correct');
    fb.textContent = '✅ Correct!';
    SFX.brainCorrect();
    document.getElementById('wcn-score').textContent = wcnScore;
    // Reveal answer in mystery slot
    const m = document.getElementById('wcn-mystery');
    m.textContent = p.ans;
    m.className = 'wcn-item wcn-reveal';
  } else {
    btn.classList.add('wcn-wrong');
    fb.textContent = `❌ It was ${p.ans}`;
    SFX.brainWrong();
    const m = document.getElementById('wcn-mystery');
    m.textContent = p.ans;
    m.className = 'wcn-item wcn-reveal';
  }
  wcnIndex++;
  setTimeout(renderWCNRound, 1800);
}

// ============ BRAIN GYM: ODD ONE OUT ============
const oooAllData = [
  // Easy
  { items: ['🍎','🍌','🍇','🚗'], odd: 3, reason: "Car is not a fruit!" },
  { items: ['🐱','🐶','🐰','🌺'], odd: 3, reason: "Flower is not an animal!" },
  { items: ['⚽','🏀','🎾','📚'], odd: 3, reason: "Book is not a ball!" },
  { items: ['🚗','🚌','🚂','🍕'], odd: 3, reason: "Pizza is not a vehicle!" },
  { items: ['🎹','🎸','🎺','📺'], odd: 3, reason: "TV is not an instrument!" },
  { items: ['👟','👢','🧢','👞'], odd: 2, reason: "Hat goes on your head, not feet!" },
  // Medium
  { items: ['🐱','🐶','🐟','🐰'], odd: 2, reason: "Fish lives in water, not on land!" },
  { items: ['🍎','🍌','🥕','🍇'], odd: 2, reason: "Carrot is a vegetable, not a fruit!" },
  { items: ['✈️','🚁','🚀','🚢'], odd: 3, reason: "Ship doesn't fly!" },
  { items: ['🧊','🏔️','❄️','🔥'], odd: 3, reason: "Fire is hot, the rest are cold!" },
  { items: ['🐘','🐋','🐪','🐁'], odd: 1, reason: "Whale lives in the ocean!" },
  { items: ['🍕','🍔','🌮','🎂'], odd: 3, reason: "Cake is dessert, not a meal!" },
  { items: ['🌞','🌙','⭐','🌧️'], odd: 3, reason: "Rain is weather, others are in the sky!" },
  { items: ['🦁','🐯','🐻','🐧'], odd: 3, reason: "Penguin is a bird, others are big mammals!" },
  // Hard
  { items: ['🍎','🍓','🍑','🍋'], odd: 3, reason: "Lemon is yellow, the rest are red!" },
  { items: ['🐸','🐊','🐢','🐧'], odd: 3, reason: "Penguin lives in ice, others like warmth!" },
  { items: ['🥛','🧃','💧','🍕'], odd: 3, reason: "Pizza is food, the rest are drinks!" },
  { items: ['🎨','🖍️','✏️','🔨'], odd: 3, reason: "Hammer is a tool, not for drawing!" },
  { items: ['🌳','🌵','🌻','🌲'], odd: 2, reason: "Sunflower is not a tree!" },
  { items: ['🐜','🐝','🐛','🦅'], odd: 3, reason: "Eagle is big, the rest are tiny bugs!" },
];
let oooRounds = [], oooIndex = 0, oooScore = 0, oooAnswered = false;

function startOOO() {
  const easy = oooAllData.slice(0, 6).sort(() => Math.random() - 0.5).slice(0, 4);
  const med = oooAllData.slice(6, 14).sort(() => Math.random() - 0.5).slice(0, 4);
  const hard = oooAllData.slice(14).sort(() => Math.random() - 0.5).slice(0, 4);
  oooRounds = [...easy, ...med, ...hard];
  oooIndex = 0; oooScore = 0; oooAnswered = false;
  document.getElementById('ooo-score').textContent = '0';
  document.getElementById('ooo-feedback').textContent = '';
  renderOOORound();
}

function renderOOORound() {
  if (oooIndex >= oooRounds.length) {
    const stars = oooScore >= 10 ? 3 : oooScore >= 7 ? 2 : 1;
    celebrate(`Odd One Out!\nScore: ${oooScore}/12`, stars);
    return;
  }
  oooAnswered = false;
  const q = oooRounds[oooIndex];
  document.getElementById('ooo-round').textContent = oooIndex + 1;
  document.getElementById('ooo-feedback').textContent = '';
  const grid = document.getElementById('ooo-grid');
  grid.innerHTML = '';
  q.items.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.className = 'ooo-card';
    btn.textContent = item;
    btn.onclick = () => selectOOO(i, btn);
    grid.appendChild(btn);
  });
}

function selectOOO(idx, btn) {
  if (oooAnswered) return;
  oooAnswered = true;
  const q = oooRounds[oooIndex];
  const fb = document.getElementById('ooo-feedback');
  const cards = document.querySelectorAll('.ooo-card');
  cards.forEach(c => c.disabled = true);
  if (idx === q.odd) {
    oooScore++;
    btn.classList.add('ooo-correct');
    fb.textContent = '✅ ' + q.reason;
    SFX.brainCorrect();
    document.getElementById('ooo-score').textContent = oooScore;
    cards.forEach((c, i) => { if (i !== q.odd) c.classList.add('ooo-dim'); });
  } else {
    btn.classList.add('ooo-wrong');
    cards[q.odd].classList.add('ooo-correct');
    fb.textContent = '❌ ' + q.reason;
    SFX.brainWrong();
  }
  oooIndex++;
  setTimeout(renderOOORound, 2000);
}

// ============ BRAIN GYM: SHAPE SORTER ============
const ssPhases = [
  {
    rule: 'Sort by SHAPE!',
    bins: [
      { label: '⚪ Circle', match: 'circle' },
      { label: '⬜ Square', match: 'square' },
      { label: '🔺 Triangle', match: 'triangle' },
    ],
    key: 'shape'
  },
  {
    rule: 'Sort by COLOR!',
    bins: [
      { label: '🔴 Red', match: '#EF5350' },
      { label: '🔵 Blue', match: '#42A5F5' },
      { label: '🟡 Yellow', match: '#FFD600' },
    ],
    key: 'color'
  },
  {
    rule: 'Sort by SIZE!',
    bins: [
      { label: '🔍 Small', match: 'small' },
      { label: '🔎 Big', match: 'big' },
    ],
    key: 'size'
  },
  {
    rule: 'Sort by SIDES!',
    bins: [
      { label: 'Less than 4', match: 'few' },
      { label: '4 or more', match: 'many' },
    ],
    key: 'sides'
  }
];
const ssAllShapes = [
  // Phase 1: sort by shape
  { shape: 'circle', color: '#EF5350', size: 'big', sides: 0 },
  { shape: 'square', color: '#42A5F5', size: 'big', sides: 4 },
  { shape: 'triangle', color: '#FFD600', size: 'big', sides: 3 },
  { shape: 'circle', color: '#66BB6A', size: 'small', sides: 0 },
  // Phase 2: sort by color
  { shape: 'square', color: '#EF5350', size: 'big', sides: 4 },
  { shape: 'circle', color: '#42A5F5', size: 'small', sides: 0 },
  { shape: 'triangle', color: '#FFD600', size: 'big', sides: 3 },
  { shape: 'square', color: '#EF5350', size: 'small', sides: 4 },
  // Phase 3: sort by size
  { shape: 'circle', color: '#EF5350', size: 'big', sides: 0 },
  { shape: 'square', color: '#42A5F5', size: 'small', sides: 4 },
  { shape: 'triangle', color: '#FFD600', size: 'big', sides: 3 },
  { shape: 'circle', color: '#66BB6A', size: 'small', sides: 0 },
  // Phase 4: sort by sides
  { shape: 'triangle', color: '#EF5350', size: 'big', sides: 3 },
  { shape: 'square', color: '#42A5F5', size: 'small', sides: 4 },
  { shape: 'circle', color: '#FFD600', size: 'big', sides: 0 },
];
let ssIndex = 0, ssScore = 0, ssAnswered = false;

function getSSPhase() { return ssIndex < 4 ? 0 : ssIndex < 8 ? 1 : ssIndex < 12 ? 2 : 3; }

function startShapeSorter() {
  ssIndex = 0; ssScore = 0; ssAnswered = false;
  document.getElementById('ss-score').textContent = '0';
  document.getElementById('ss-feedback').textContent = '';
  renderSSItem();
}

function renderSSItem() {
  if (ssIndex >= ssAllShapes.length) {
    const stars = ssScore >= 13 ? 3 : ssScore >= 9 ? 2 : 1;
    celebrate(`Shape Sorter!\nScore: ${ssScore}/15`, stars);
    return;
  }
  ssAnswered = false;
  const phase = getSSPhase();
  const ph = ssPhases[phase];
  const s = ssAllShapes[ssIndex];
  document.getElementById('ss-left').textContent = ssAllShapes.length - ssIndex;
  document.getElementById('ss-feedback').textContent = '';
  // Rule banner
  const ruleEl = document.getElementById('ss-rule');
  ruleEl.textContent = ph.rule;
  ruleEl.style.animation = 'none'; ruleEl.offsetHeight; ruleEl.style.animation = '';
  // Draw shape
  const display = document.getElementById('ss-display');
  const sz = s.size === 'big' ? 80 : 50;
  const cls = s.shape === 'circle' ? 'ss-circle' : s.shape === 'square' ? 'ss-square' : 'ss-triangle';
  display.innerHTML = `<div class="ss-shape ${cls}" style="width:${sz}px;height:${sz}px;background:${s.color};"></div>`;
  // Bins
  const binsEl = document.getElementById('ss-bins');
  binsEl.innerHTML = '';
  ph.bins.forEach(bin => {
    const btn = document.createElement('button');
    btn.className = 'ss-bin';
    btn.textContent = bin.label;
    btn.onclick = () => sortSSShape(bin.match, btn);
    binsEl.appendChild(btn);
  });
}

function sortSSShape(binMatch, btn) {
  if (ssAnswered) return;
  ssAnswered = true;
  const phase = getSSPhase();
  const ph = ssPhases[phase];
  const s = ssAllShapes[ssIndex];
  const fb = document.getElementById('ss-feedback');
  document.querySelectorAll('.ss-bin').forEach(b => b.disabled = true);
  // Determine correct answer
  let correct;
  if (ph.key === 'shape') correct = s.shape;
  else if (ph.key === 'color') correct = s.color;
  else if (ph.key === 'size') correct = s.size;
  else correct = s.sides < 4 ? 'few' : 'many';

  if (binMatch === correct) {
    ssScore++;
    btn.classList.add('ss-correct');
    fb.textContent = '✅ Correct!';
    SFX.brainCorrect();
    document.getElementById('ss-score').textContent = ssScore;
  } else {
    btn.classList.add('ss-wrong');
    fb.textContent = '❌ Not quite!';
    SFX.brainWrong();
  }
  ssIndex++;
  // Check if phase changed
  const newPhase = getSSPhase();
  if (newPhase !== phase && ssIndex < ssAllShapes.length) {
    setTimeout(() => { SFX.brainLevelUp(); renderSSItem(); }, 1500);
  } else {
    setTimeout(renderSSItem, 1200);
  }
}

// ============ BRAIN GYM: RIDDLE TIME ============
const riddleAllData = [
  // Easy (1-3): very concrete, everyday objects
  {
    riddle: "I am yellow and I shine in the sky. What am I?",
    hints: ["I come out during the day", "I keep you warm", "I go away at night!"],
    choices: ["Sun", "Moon", "Star", "Cloud"], correct: 0
  },
  {
    riddle: "I am cold and white and fall from the sky. What am I?",
    hints: ["I come in winter", "Kids play in me", "You can build a man with me!"],
    choices: ["Snow", "Rain", "Clouds", "Ice Cream"], correct: 0
  },
  {
    riddle: "You use me to eat soup. What am I?",
    hints: ["I'm in the kitchen", "I'm not a fork", "I am round and scoopy!"],
    choices: ["Spoon", "Cup", "Plate", "Knife"], correct: 0
  },
  // Medium (4-6): simple "I have ___ but can't ___" format
  {
    riddle: "I have four legs but I can't walk. What am I?",
    hints: ["You sit at me", "I'm in your house", "You eat dinner at me!"],
    choices: ["Table", "Dog", "Horse", "Frog"], correct: 0
  },
  {
    riddle: "I have a trunk but I'm not an elephant. What am I?",
    hints: ["I'm very tall", "I have green leaves", "Birds sit on me!"],
    choices: ["Tree", "Car", "Suitcase", "Elephant"], correct: 0
  },
  {
    riddle: "I have hands but can't clap. What am I?",
    hints: ["I hang on a wall", "I have numbers on my face", "Tick tock!"],
    choices: ["Clock", "Book", "Mirror", "Door"], correct: 0
  },
  // Slightly harder (7-8)
  {
    riddle: "I have teeth but I can't eat. What am I?",
    hints: ["You use me every morning", "I keep your hair neat", "You pull me through your hair!"],
    choices: ["Comb", "Shark", "Key", "Zipper"], correct: 0
  },
  {
    riddle: "I have keys but no locks. What am I?",
    hints: ["I make music", "I'm black and white", "You press me with your fingers!"],
    choices: ["Piano", "Computer", "Map", "Chest"], correct: 0
  },
];
let rdIndex = 0, rdScore = 0, rdHintsUsed = 0, rdAnswered = false;

function startRiddles() {
  rdIndex = 0; rdScore = 0; rdHintsUsed = 0; rdAnswered = false;
  document.getElementById('rd-score').textContent = '0';
  document.getElementById('rd-feedback').textContent = '';
  renderRiddle();
}

function renderRiddle() {
  if (rdIndex >= riddleAllData.length) {
    const stars = rdScore >= 20 ? 3 : rdScore >= 14 ? 2 : 1;
    celebrate(`Riddle Master!\nScore: ${rdScore}/24`, stars);
    return;
  }
  rdAnswered = false;
  rdHintsUsed = 0;
  const r = riddleAllData[rdIndex];
  document.getElementById('rd-round').textContent = rdIndex + 1;
  document.getElementById('rd-bubble').textContent = r.riddle;
  document.getElementById('rd-hint-text').textContent = '';
  document.getElementById('rd-feedback').textContent = '';
  document.getElementById('rd-hint-btn').disabled = false;
  document.getElementById('rd-hint-btn').textContent = '💡 Need a Hint?';
  // Shuffle choices
  const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  const correctNewIdx = indices.indexOf(r.correct);
  const choicesEl = document.getElementById('rd-choices');
  choicesEl.innerHTML = '';
  indices.forEach((origIdx, newIdx) => {
    const btn = document.createElement('button');
    btn.className = 'rd-choice';
    btn.textContent = r.choices[origIdx];
    btn.onclick = () => answerRiddle(newIdx === correctNewIdx, btn);
    choicesEl.appendChild(btn);
  });
}

function useRiddleHint() {
  if (rdAnswered || rdHintsUsed >= 3) return;
  const r = riddleAllData[rdIndex];
  document.getElementById('rd-hint-text').textContent = '💡 ' + r.hints[rdHintsUsed];
  rdHintsUsed++;
  if (rdHintsUsed >= 3) {
    document.getElementById('rd-hint-btn').disabled = true;
    document.getElementById('rd-hint-btn').textContent = 'No more hints';
  } else {
    document.getElementById('rd-hint-btn').textContent = `💡 Hint ${rdHintsUsed + 1}/3`;
  }
}

function answerRiddle(isCorrect, btn) {
  if (rdAnswered) return;
  rdAnswered = true;
  const fb = document.getElementById('rd-feedback');
  document.querySelectorAll('.rd-choice').forEach(b => b.disabled = true);
  document.getElementById('rd-hint-btn').disabled = true;
  if (isCorrect) {
    const pts = rdHintsUsed === 0 ? 3 : rdHintsUsed === 1 ? 2 : 1;
    rdScore += pts;
    btn.classList.add('rd-correct');
    fb.textContent = `✅ Correct! +${pts} points`;
    SFX.brainCorrect();
    document.getElementById('rd-score').textContent = rdScore;
  } else {
    btn.classList.add('rd-wrong');
    // Show correct
    const r = riddleAllData[rdIndex];
    fb.textContent = `❌ It was: ${r.choices[r.correct]}`;
    SFX.brainWrong();
  }
  rdIndex++;
  setTimeout(renderRiddle, 2000);
}

// ============ BRAIN GYM: SPOT THE DIFFERENCE ============
const stdScenes = [
  // ---- LEVEL 1: Sunny Day — 1 difference (very easy, big obvious missing item) ----
  {
    name: 'Sunny Day', bgClass: 'std-scene-sky',
    elements: [
      { type: 'sun', x: 75, y: 5, w: 30, h: 30, css: 'background:#FFD600;border-radius:50%;box-shadow:0 0 20px #FFD600;' },
      { type: 'cloud', x: 25, y: 8, w: 40, h: 18, css: 'background:#fff;border-radius:50%;opacity:0.8;' },
      { type: 'tree', x: 15, y: 35, w: 35, h: 55, css: 'background:#4CAF50;border-radius:50%;' },
      { type: 'trunk', x: 22, y: 65, w: 10, h: 35, css: 'background:#795548;border-radius:4px;' },
      { type: 'flower', x: 60, y: 78, w: 22, h: 22, text: '🌻', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'grass', x: 0, y: 88, w: 100, h: 12, css: 'background:linear-gradient(#66BB6A,#388E3C);' },
    ],
    diffs: [
      { idx: 4, prop: 'hidden', val: true }, // sunflower missing
    ]
  },
  // ---- LEVEL 2: Fruit Bowl — 1 difference (emoji swap) ----
  {
    name: 'Fruit Bowl', bgClass: 'std-scene-kitchen',
    elements: [
      { type: 'table', x: 5, y: 60, w: 90, h: 10, css: 'background:#8D6E63;border-radius:6px;' },
      { type: 'bowl', x: 25, y: 40, w: 50, h: 28, css: 'background:#FFCC80;border-radius:0 0 50% 50%;border:3px solid #EF6C00;' },
      { type: 'apple', x: 30, y: 32, w: 18, h: 18, text: '🍎', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'banana', x: 50, y: 30, w: 18, h: 18, text: '🍌', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'grapes', x: 40, y: 22, w: 18, h: 18, text: '🍇', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'floor', x: 0, y: 85, w: 100, h: 15, css: 'background:repeating-linear-gradient(90deg,#BCAAA4,#BCAAA4 20px,#D7CCC8 20px,#D7CCC8 40px);' },
    ],
    diffs: [
      { idx: 2, prop: 'text', val: '🍏' }, // red apple → green apple
    ]
  },
  // ---- LEVEL 3: Playground — 2 differences (missing + emoji swap) ----
  {
    name: 'Playground', bgClass: 'std-scene-sky',
    elements: [
      { type: 'sky', x: 0, y: 0, w: 100, h: 88, css: '' },
      { type: 'swing', x: 20, y: 25, w: 20, h: 50, css: 'border-top:6px solid #795548;border-left:4px solid #795548;border-right:4px solid #795548;border-bottom:none;' },
      { type: 'ball', x: 60, y: 72, w: 20, h: 20, css: 'background:#F44336;border-radius:50%;border:3px solid #C62828;' },
      { type: 'butterfly', x: 70, y: 18, w: 18, h: 18, text: '🦋', css: 'font-size:1.5rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'sun', x: 80, y: 5, w: 25, h: 25, css: 'background:#FFD600;border-radius:50%;box-shadow:0 0 15px #FFD600;' },
      { type: 'grass', x: 0, y: 88, w: 100, h: 12, css: 'background:linear-gradient(#66BB6A,#388E3C);' },
    ],
    diffs: [
      { idx: 2, prop: 'css', val: 'background:#2196F3;border-radius:50%;border:3px solid #1565C0;' }, // red ball → blue ball
      { idx: 3, prop: 'hidden', val: true }, // butterfly missing
    ]
  },
  // ---- LEVEL 4: Bedroom — 2 differences (missing + color change) ----
  {
    name: 'Bedroom', bgClass: 'std-scene-kitchen',
    elements: [
      { type: 'bed', x: 10, y: 45, w: 55, h: 30, css: 'background:#7E57C2;border-radius:8px;border:3px solid #4527A0;' },
      { type: 'pillow', x: 12, y: 42, w: 18, h: 12, css: 'background:#fff;border-radius:6px;border:2px solid #ccc;' },
      { type: 'lamp', x: 75, y: 25, w: 14, h: 30, css: 'background:#FFD54F;border-radius:50% 50% 0 0;border:2px solid #F9A825;' },
      { type: 'teddy', x: 70, y: 55, w: 22, h: 22, text: '🧸', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'window', x: 35, y: 5, w: 30, h: 30, css: 'background:#81D4FA;border:4px solid #795548;border-radius:4px;' },
      { type: 'moon', x: 42, y: 10, w: 16, h: 16, text: '🌙', css: 'font-size:1.2rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'floor', x: 0, y: 85, w: 100, h: 15, css: 'background:#D7CCC8;' },
    ],
    diffs: [
      { idx: 3, prop: 'hidden', val: true }, // teddy missing
      { idx: 0, prop: 'css', val: 'background:#42A5F5;border-radius:8px;border:3px solid #1565C0;' }, // bed purple → blue
    ]
  },
  // ---- LEVEL 5: Park — 3 differences (original park scene) ----
  {
    name: 'Park', bgClass: 'std-scene-sky',
    elements: [
      { type: 'tree', x: 15, y: 35, w: 40, h: 70, css: 'background:#4CAF50;border-radius:50%;' },
      { type: 'tree-trunk', x: 23, y: 70, w: 10, h: 35, css: 'background:#795548;border-radius:4px;' },
      { type: 'sun', x: 78, y: 8, w: 35, h: 35, css: 'background:#FFD600;border-radius:50%;box-shadow:0 0 20px #FFD600;' },
      { type: 'flower', x: 50, y: 80, w: 20, h: 20, text: '🌸', css: 'font-size:1.4rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'bird', x: 60, y: 20, w: 20, h: 20, text: '🐦', css: 'font-size:1.3rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'bench', x: 55, y: 65, w: 50, h: 14, css: 'background:#8D6E63;border-radius:4px;border:2px solid #5D4037;' },
      { type: 'cloud', x: 35, y: 5, w: 45, h: 20, css: 'background:#fff;border-radius:50%;opacity:0.7;' },
      { type: 'grass', x: 0, y: 88, w: 100, h: 12, css: 'background:linear-gradient(#66BB6A,#388E3C);' },
    ],
    diffs: [
      { idx: 0, prop: 'css', val: 'background:#FF9800;border-radius:50%;' }, // tree green → orange
      { idx: 3, prop: 'hidden', val: true }, // flower missing
      { idx: 4, prop: 'x', val: 30 }, // bird moved
    ]
  },
  // ---- LEVEL 6: Aquarium — 3 differences (emoji swaps + missing) ----
  {
    name: 'Aquarium', bgClass: 'std-scene-underwater',
    elements: [
      { type: 'fish1', x: 18, y: 25, w: 22, h: 20, text: '🐠', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'fish2', x: 62, y: 45, w: 22, h: 20, text: '🐟', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'octopus', x: 40, y: 65, w: 24, h: 24, text: '🐙', css: 'font-size:1.8rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'seaweed', x: 8, y: 55, w: 14, h: 42, css: 'background:linear-gradient(#4CAF50,#2E7D32);border-radius:40% 40% 0 0;' },
      { type: 'shell', x: 70, y: 82, w: 18, h: 16, text: '🐚', css: 'font-size:1.3rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'bubble', x: 50, y: 12, w: 12, h: 12, css: 'background:rgba(255,255,255,0.3);border-radius:50%;border:2px solid rgba(255,255,255,0.5);' },
      { type: 'sand', x: 0, y: 90, w: 100, h: 10, css: 'background:linear-gradient(#FFD54F,#FFB300);' },
    ],
    diffs: [
      { idx: 0, prop: 'text', val: '🐡' }, // tropical fish → blowfish
      { idx: 2, prop: 'hidden', val: true }, // octopus missing
      { idx: 4, prop: 'text', val: '🦀' }, // shell → crab
    ]
  },
  // ---- LEVEL 7: Kitchen — 4 differences ----
  {
    name: 'Kitchen', bgClass: 'std-scene-kitchen',
    elements: [
      { type: 'table', x: 10, y: 55, w: 80, h: 8, css: 'background:#8D6E63;border-radius:4px;' },
      { type: 'window', x: 30, y: 5, w: 40, h: 35, css: 'background:#81D4FA;border:4px solid #795548;border-radius:4px;' },
      { type: 'cup', x: 20, y: 42, w: 16, h: 18, css: 'background:#42A5F5;border-radius:0 0 8px 8px;border:2px solid #1E88E5;' },
      { type: 'plant', x: 72, y: 30, w: 20, h: 25, text: '🪴', css: 'font-size:1.8rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'clock', x: 75, y: 5, w: 18, h: 18, css: 'background:#fff;border-radius:50%;border:3px solid #333;' },
      { type: 'fruit', x: 45, y: 40, w: 22, h: 18, text: '🍎', css: 'font-size:1.4rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'floor', x: 0, y: 85, w: 100, h: 15, css: 'background:repeating-linear-gradient(90deg,#BCAAA4,#BCAAA4 20px,#D7CCC8 20px,#D7CCC8 40px);' },
    ],
    diffs: [
      { idx: 2, prop: 'css', val: 'background:#EF5350;border-radius:0 0 8px 8px;border:2px solid #C62828;' }, // cup blue → red
      { idx: 3, prop: 'x', val: 60 }, // plant moved
      { idx: 4, prop: 'hidden', val: true }, // clock missing
      { idx: 5, prop: 'text', val: '🍊' }, // apple → orange
    ]
  },
  // ---- LEVEL 8: Garden — 4 differences (colors, moved, swap) ----
  {
    name: 'Garden', bgClass: 'std-scene-sky',
    elements: [
      { type: 'fence', x: 0, y: 55, w: 100, h: 8, css: 'background:repeating-linear-gradient(90deg,#D7CCC8,#D7CCC8 12px,#795548 12px,#795548 14px);border-radius:2px;' },
      { type: 'rose', x: 15, y: 40, w: 20, h: 20, text: '🌹', css: 'font-size:1.5rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'tulip', x: 40, y: 42, w: 20, h: 20, text: '🌷', css: 'font-size:1.5rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'sunflower', x: 65, y: 35, w: 22, h: 22, text: '🌻', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'bee', x: 55, y: 15, w: 18, h: 18, text: '🐝', css: 'font-size:1.3rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'ladybug', x: 25, y: 70, w: 16, h: 16, text: '🐞', css: 'font-size:1.2rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'watering', x: 75, y: 68, w: 20, h: 20, text: '🚿', css: 'font-size:1.4rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'grass', x: 0, y: 88, w: 100, h: 12, css: 'background:linear-gradient(#66BB6A,#388E3C);' },
    ],
    diffs: [
      { idx: 1, prop: 'text', val: '🌺' }, // rose → hibiscus
      { idx: 3, prop: 'hidden', val: true }, // sunflower missing
      { idx: 4, prop: 'x', val: 30 }, // bee moved
      { idx: 5, prop: 'hidden', val: true }, // ladybug missing
    ]
  },
  // ---- LEVEL 9: Underwater — 5 differences ----
  {
    name: 'Underwater', bgClass: 'std-scene-underwater',
    elements: [
      { type: 'fish1', x: 20, y: 30, w: 24, h: 20, text: '🐠', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'fish2', x: 65, y: 50, w: 24, h: 20, text: '🐟', css: 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'coral', x: 40, y: 75, w: 25, h: 25, text: '🪸', css: 'font-size:1.8rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'seaweed', x: 10, y: 60, w: 15, h: 40, css: 'background:linear-gradient(#4CAF50,#2E7D32);border-radius:40% 40% 0 0;' },
      { type: 'star', x: 75, y: 80, w: 20, h: 20, text: '⭐', css: 'font-size:1.3rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'shell', x: 50, y: 88, w: 18, h: 14, text: '🐚', css: 'font-size:1.2rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'bubble', x: 30, y: 15, w: 14, h: 14, css: 'background:rgba(255,255,255,0.3);border-radius:50%;border:2px solid rgba(255,255,255,0.5);' },
      { type: 'jellyfish', x: 55, y: 18, w: 20, h: 20, text: '🪼', css: 'font-size:1.4rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'sand', x: 0, y: 90, w: 100, h: 10, css: 'background:linear-gradient(#FFD54F,#FFB300);' },
    ],
    diffs: [
      { idx: 0, prop: 'text', val: '🐡' }, // tropical fish → blowfish
      { idx: 1, prop: 'x', val: 50 }, // fish moved
      { idx: 2, prop: 'hidden', val: true }, // coral missing
      { idx: 4, prop: 'hidden', val: true }, // starfish missing
      { idx: 7, prop: 'x', val: 70 }, // jellyfish moved
    ]
  },
  // ---- LEVEL 10: Space — 6 differences (hardest!) ----
  {
    name: 'Space', bgClass: 'std-scene-underwater',
    elements: [
      { type: 'rocket', x: 15, y: 25, w: 22, h: 28, text: '🚀', css: 'font-size:2rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'planet1', x: 65, y: 20, w: 28, h: 28, css: 'background:#FF7043;border-radius:50%;border:3px solid #BF360C;' },
      { type: 'planet2', x: 40, y: 60, w: 22, h: 22, css: 'background:#42A5F5;border-radius:50%;border:3px solid #1565C0;' },
      { type: 'star1', x: 30, y: 10, w: 14, h: 14, text: '⭐', css: 'font-size:1rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'star2', x: 80, y: 55, w: 14, h: 14, text: '⭐', css: 'font-size:1rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'star3', x: 55, y: 8, w: 12, h: 12, text: '✨', css: 'font-size:0.9rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'moon', x: 78, y: 75, w: 20, h: 20, text: '🌙', css: 'font-size:1.5rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'alien', x: 10, y: 70, w: 20, h: 20, text: '👽', css: 'font-size:1.5rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'ufo', x: 45, y: 35, w: 22, h: 18, text: '🛸', css: 'font-size:1.5rem;display:flex;align-items:center;justify-content:center;' },
      { type: 'comet', x: 5, y: 5, w: 16, h: 16, text: '☄️', css: 'font-size:1.2rem;display:flex;align-items:center;justify-content:center;' },
    ],
    diffs: [
      { idx: 1, prop: 'css', val: 'background:#66BB6A;border-radius:50%;border:3px solid #2E7D32;' }, // orange planet → green
      { idx: 2, prop: 'x', val: 50 }, // blue planet moved
      { idx: 3, prop: 'hidden', val: true }, // star1 missing
      { idx: 7, prop: 'hidden', val: true }, // alien missing
      { idx: 8, prop: 'text', val: '🛰️' }, // ufo → satellite
      { idx: 9, prop: 'x', val: 85 }, // comet moved
    ]
  },
];
let stdLevel = 0, stdFound = 0, stdFoundSet = new Set();

function startSpotDiff() {
  stdLevel = 0; stdFound = 0; stdFoundSet = new Set();
  renderSTDScene();
}

function renderSTDScene() {
  if (stdLevel >= stdScenes.length) {
    celebrate('Eagle Eyes!\nAll 10 levels complete!', 3);
    return;
  }
  stdFound = 0; stdFoundSet = new Set();
  const scene = stdScenes[stdLevel];
  document.getElementById('std-level').textContent = stdLevel + 1;
  document.getElementById('std-total').textContent = scene.diffs.length;
  document.getElementById('std-found').textContent = '0';
  document.getElementById('std-feedback').textContent = '';
  const pair = document.getElementById('std-pair');
  pair.innerHTML = '';
  // Left scene (original)
  const leftDiv = document.createElement('div');
  leftDiv.className = `std-scene std-scene-left ${scene.bgClass}`;
  leftDiv.innerHTML = '<div class="std-label">Original</div>';
  scene.elements.forEach(el => {
    const d = document.createElement('div');
    d.className = 'std-el';
    d.style.cssText = `left:${el.x}%;top:${el.y}%;width:${el.w}%;height:${el.h}%;${el.css||''}`;
    if (el.text) d.textContent = el.text;
    leftDiv.appendChild(d);
  });
  pair.appendChild(leftDiv);
  // Right scene (with differences)
  const rightDiv = document.createElement('div');
  rightDiv.className = `std-scene std-scene-right ${scene.bgClass}`;
  rightDiv.innerHTML = '<div class="std-label">Find differences!</div>';
  scene.elements.forEach((el, i) => {
    const diff = scene.diffs.find(d => d.idx === i);
    const d = document.createElement('div');
    d.className = 'std-el';
    let elData = { ...el };
    if (diff && !diff.hidden) {
      if (diff.prop === 'css') elData.css = diff.val;
      if (diff.prop === 'x') elData.x = diff.val;
      if (diff.prop === 'text') elData.text = diff.val;
    }
    if (diff && diff.prop === 'hidden' && diff.val) {
      // Hidden element — skip rendering
      return;
    }
    d.style.cssText = `left:${elData.x}%;top:${elData.y}%;width:${elData.w}%;height:${elData.h}%;${elData.css||''}`;
    if (elData.text) d.textContent = elData.text;
    d.dataset.idx = i;
    rightDiv.appendChild(d);
  });
  // Click handler for right scene
  rightDiv.onclick = (e) => {
    const target = e.target.closest('.std-el');
    if (!target) {
      // Check if clicking where a hidden element should be
      const rect = rightDiv.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 100;
      const clickY = ((e.clientY - rect.top) / rect.height) * 100;
      // Check hidden diffs
      scene.diffs.forEach((diff, di) => {
        if (diff.prop === 'hidden' && diff.val && !stdFoundSet.has(di)) {
          const origEl = scene.elements[diff.idx];
          if (Math.abs(clickX - origEl.x - origEl.w/2) < origEl.w && Math.abs(clickY - origEl.y - origEl.h/2) < origEl.h) {
            markSTDFound(di, e.clientX - rect.left, e.clientY - rect.top, rightDiv);
          }
        }
      });
      return;
    }
    const idx = parseInt(target.dataset.idx);
    const diffIdx = scene.diffs.findIndex(d => d.idx === idx);
    if (diffIdx >= 0 && !stdFoundSet.has(diffIdx)) {
      const rect = rightDiv.getBoundingClientRect();
      markSTDFound(diffIdx, e.clientX - rect.left, e.clientY - rect.top, rightDiv);
    }
  };
  pair.appendChild(rightDiv);
}

function markSTDFound(diffIdx, x, y, container) {
  stdFoundSet.add(diffIdx);
  stdFound++;
  document.getElementById('std-found').textContent = stdFound;
  SFX.brainCorrect();
  // Add marker
  const marker = document.createElement('div');
  marker.className = 'std-found-marker';
  marker.style.left = x + 'px';
  marker.style.top = y + 'px';
  marker.textContent = '✅';
  container.appendChild(marker);
  const scene = stdScenes[stdLevel];
  if (stdFound >= scene.diffs.length) {
    SFX.brainLevelUp();
    document.getElementById('std-feedback').textContent = '🎉 All found!';
    stdLevel++;
    setTimeout(renderSTDScene, 2000);
  }
}

// ============ BRAIN GYM: MAZE ADVENTURE ============
let mazeGrid = null, mazeRows = 0, mazeCols = 0, mazePlayerPos = null;
let mazeStarsCollected = 0, mazeMoves = 0, mazeStarPositions = [], mazeEndPos = null;
let mazeLevel = 0, mazeKeyHandler = null;
const mazeLevels = [
  // Easy start — tiny mazes for little ones
  { rows: 5, cols: 5, cellSize: 48, starCount: 1 },
  { rows: 5, cols: 7, cellSize: 44, starCount: 1 },
  { rows: 7, cols: 7, cellSize: 40, starCount: 2 },
  // Medium — getting bigger
  { rows: 7, cols: 9, cellSize: 36, starCount: 2 },
  { rows: 9, cols: 9, cellSize: 32, starCount: 3 },
  { rows: 9, cols: 11, cellSize: 28, starCount: 3 },
  // Hard — big mazes!
  { rows: 11, cols: 11, cellSize: 26, starCount: 3 },
  { rows: 13, cols: 13, cellSize: 22, starCount: 4 },
  { rows: 13, cols: 15, cellSize: 20, starCount: 4 },
  { rows: 15, cols: 15, cellSize: 18, starCount: 5 },
];

function generateMaze(rows, cols) {
  // Create grid: all walls
  const grid = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = 1; // wall
    }
  }
  // Carve passages using recursive backtracker (on odd cells)
  function carve(r, c) {
    grid[r][c] = 0;
    const dirs = [[0,2],[2,0],[0,-2],[-2,0]].sort(() => Math.random() - 0.5);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr > 0 && nr < rows && nc > 0 && nc < cols && grid[nr][nc] === 1) {
        grid[r + dr/2][c + dc/2] = 0; // carve wall between
        carve(nr, nc);
      }
    }
  }
  carve(1, 1);
  return grid;
}

function startMaze() {
  mazeLevel = 0;
  renderMazeLevel();
}

function renderMazeLevel() {
  if (mazeLevel >= mazeLevels.length) {
    celebrate('Maze Master!\nAll 10 mazes completed!', 3);
    stopMazeKeys();
    return;
  }
  const lvl = mazeLevels[mazeLevel];
  mazeRows = lvl.rows; mazeCols = lvl.cols;
  mazeGrid = generateMaze(mazeRows, mazeCols);
  mazePlayerPos = { r: 1, c: 1 };
  mazeEndPos = { r: mazeRows - 2, c: mazeCols - 2 };
  mazeGrid[mazeEndPos.r][mazeEndPos.c] = 0; // ensure end is open
  mazeStarsCollected = 0; mazeMoves = 0;
  document.getElementById('maze-stars').textContent = '0';
  document.getElementById('maze-moves').textContent = '0';
  document.getElementById('maze-feedback').textContent = `Maze ${mazeLevel + 1} of ${mazeLevels.length}`;
  // Place stars along the solution path so player collects them before reaching the flag
  mazeStarPositions = [];
  // BFS to find solution path from start to end
  const solQueue = [{ r: 1, c: 1, path: [] }];
  const solVisited = new Set();
  solVisited.add('1,1');
  let solutionPath = [];
  while (solQueue.length > 0) {
    const cur = solQueue.shift();
    if (cur.r === mazeEndPos.r && cur.c === mazeEndPos.c) {
      solutionPath = cur.path;
      break;
    }
    for (const [dr, dc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      const nr = cur.r + dr, nc = cur.c + dc;
      const key = nr + ',' + nc;
      if (nr >= 0 && nr < mazeRows && nc >= 0 && nc < mazeCols && mazeGrid[nr][nc] === 0 && !solVisited.has(key)) {
        solVisited.add(key);
        solQueue.push({ r: nr, c: nc, path: [...cur.path, { r: nr, c: nc }] });
      }
    }
  }
  // Remove start and end from path, then spread stars evenly along it
  const starCandidates = solutionPath.filter(p => !(p.r === mazeEndPos.r && p.c === mazeEndPos.c));
  if (starCandidates.length > 0 && lvl.starCount > 0) {
    const count = Math.min(lvl.starCount, starCandidates.length);
    const spacing = Math.floor(starCandidates.length / (count + 1));
    for (let i = 0; i < count; i++) {
      mazeStarPositions.push(starCandidates[spacing * (i + 1)]);
    }
  }
  renderMazeGrid();
  setupMazeKeys();
}

function renderMazeGrid() {
  const container = document.getElementById('maze-container');
  const lvl = mazeLevels[mazeLevel];
  const sz = lvl.cellSize;
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'maze-grid';
  grid.style.gridTemplate = `repeat(${mazeRows}, ${sz}px) / repeat(${mazeCols}, ${sz}px)`;
  for (let r = 0; r < mazeRows; r++) {
    for (let c = 0; c < mazeCols; c++) {
      const cell = document.createElement('div');
      cell.className = 'maze-cell';
      cell.style.width = sz + 'px';
      cell.style.height = sz + 'px';
      if (mazeGrid[r][c] === 1) {
        cell.classList.add('maze-wall');
      } else {
        cell.classList.add('maze-path');
        if (r === 1 && c === 1) cell.classList.add('maze-start');
        if (r === mazeEndPos.r && c === mazeEndPos.c) cell.classList.add('maze-end');
      }
      // Player
      if (r === mazePlayerPos.r && c === mazePlayerPos.c) {
        const player = document.createElement('div');
        player.className = 'maze-player';
        cell.appendChild(player);
      }
      // Star
      if (mazeStarPositions.some(s => s.r === r && s.c === c)) {
        const star = document.createElement('span');
        star.className = 'maze-star';
        star.textContent = '⭐';
        star.dataset.r = r;
        star.dataset.c = c;
        cell.appendChild(star);
      }
      // End flag
      if (r === mazeEndPos.r && c === mazeEndPos.c && !(r === mazePlayerPos.r && c === mazePlayerPos.c)) {
        const flag = document.createElement('span');
        flag.className = 'maze-exit';
        flag.textContent = '🏁';
        cell.appendChild(flag);
      }
      cell.dataset.r = r;
      cell.dataset.c = c;
      grid.appendChild(cell);
    }
  }
  container.appendChild(grid);
}

function setupMazeKeys() {
  stopMazeKeys();
  mazeKeyHandler = (e) => {
    const screen = document.querySelector('.screen.active');
    if (!screen || screen.id !== 'brain-maze-screen') return;
    const dirMap = { ArrowUp: [-1,0], ArrowDown: [1,0], ArrowLeft: [0,-1], ArrowRight: [0,1] };
    const dir = dirMap[e.key];
    if (!dir) return;
    e.preventDefault();
    e.stopPropagation();
    moveMazePlayer(dir[0], dir[1]);
  };
  document.addEventListener('keydown', mazeKeyHandler, true);
}

function stopMazeKeys() {
  if (mazeKeyHandler) {
    document.removeEventListener('keydown', mazeKeyHandler, true);
    mazeKeyHandler = null;
  }
}

function moveMazePlayer(dr, dc) {
  const nr = mazePlayerPos.r + dr, nc = mazePlayerPos.c + dc;
  if (nr < 0 || nr >= mazeRows || nc < 0 || nc >= mazeCols) return;
  if (mazeGrid[nr][nc] === 1) return;
  mazePlayerPos = { r: nr, c: nc };
  mazeMoves++;
  document.getElementById('maze-moves').textContent = mazeMoves;
  // Check star collection
  const starIdx = mazeStarPositions.findIndex(s => s.r === nr && s.c === nc);
  if (starIdx >= 0) {
    mazeStarPositions.splice(starIdx, 1);
    mazeStarsCollected++;
    document.getElementById('maze-stars').textContent = mazeStarsCollected;
    SFX.brainCorrect();
  }
  renderMazeGrid();
  // Check if reached end
  if (nr === mazeEndPos.r && nc === mazeEndPos.c) {
    stopMazeKeys();
    const stars = 1 + mazeStarsCollected;
    SFX.brainLevelUp();
    document.getElementById('maze-feedback').textContent = `🎉 Maze ${mazeLevel + 1} complete! +${stars} ⭐`;
    addStars(stars);
    mazeLevel++;
    setTimeout(() => {
      renderMazeLevel();
    }, 2000);
  }
}

// ============ KEYBOARD NAV (TV Remote) ============
document.addEventListener('keydown', e => {
  const screen = document.querySelector('.screen.active');
  if (!screen) return;
  const focusable = [...screen.querySelectorAll('button:not(:disabled):not([style*="display: none"]):not([style*="display:none"]), input, [tabindex="0"]')];
  const idx = focusable.indexOf(document.activeElement);

  if (e.key==='Escape'||e.key==='Backspace') {
    const back = screen.querySelector('.back-btn');
    if (back) { e.preventDefault(); back.click(); }
    return;
  }
  if (e.key==='ArrowDown'||e.key==='ArrowRight') {
    e.preventDefault();
    if (idx<focusable.length-1) focusable[idx+1].focus();
    else if (focusable.length) focusable[0].focus();
  } else if (e.key==='ArrowUp'||e.key==='ArrowLeft') {
    e.preventDefault();
    if (idx>0) focusable[idx-1].focus();
    else if (focusable.length) focusable[focusable.length-1].focus();
  } else if (e.key==='Enter') {
    if (document.activeElement && document.activeElement.tagName!=='INPUT') {
      e.preventDefault(); document.activeElement.click();
    }
  }
});

// ============ SECTION: EXERCISE ============

// ---- Exercise Data ----
const EXERCISES = [
  { name: 'Star Jumps', emoji: '⭐', reps: 10, duration: 15, desc: 'Jump up and spread your arms and legs like a star!' },
  { name: 'High Knees', emoji: '🦵', reps: 10, duration: 15, desc: 'Run on the spot lifting your knees high!' },
  { name: 'Arm Circles', emoji: '💪', reps: 10, duration: 12, desc: 'Stretch your arms out and spin them in circles!' },
  { name: 'Frog Jumps', emoji: '🐸', reps: 8, duration: 15, desc: 'Squat low like a frog and jump forward!' },
  { name: 'Bunny Hops', emoji: '🐰', reps: 10, duration: 12, desc: 'Hop on both feet like a little bunny!' },
  { name: 'Toe Touches', emoji: '🦶', reps: 8, duration: 12, desc: 'Bend down and try to touch your toes!' },
  { name: 'Run On The Spot', emoji: '🏃', reps: null, duration: 15, desc: 'Run as fast as you can without moving!' },
  { name: 'Bear Walk', emoji: '🐻', reps: null, duration: 15, desc: 'Walk on your hands and feet like a bear!' },
  { name: 'Crab Walk', emoji: '🦀', reps: null, duration: 15, desc: 'Sit down, put hands behind, lift up and walk!' },
  { name: 'Windmills', emoji: '🌀', reps: 8, duration: 12, desc: 'Stand wide and touch opposite toes!' },
  { name: 'Sit and Reach', emoji: '🧘', reps: null, duration: 12, desc: 'Sit on the floor and reach for your toes!' },
  { name: 'Mountain Climbers', emoji: '⛰️', reps: 10, duration: 15, desc: 'In push-up position, run your knees to your chest!' },
  { name: 'Superhero Pose', emoji: '🦸', reps: null, duration: 10, desc: 'Stand tall with fists on hips like a superhero!' },
  { name: 'Tuck Jumps', emoji: '🚀', reps: 6, duration: 12, desc: 'Jump up and pull your knees to your chest!' },
  { name: 'Side Shuffles', emoji: '↔️', reps: null, duration: 15, desc: 'Shuffle side to side like a basketball player!' },
  { name: 'Burpees', emoji: '💥', reps: 5, duration: 15, desc: 'Jump up, drop down, push up, jump back!' },
  { name: 'Squat Jumps', emoji: '🦘', reps: 8, duration: 15, desc: 'Squat down low and jump up high!' },
  { name: 'Penguin Walk', emoji: '🐧', reps: null, duration: 12, desc: 'Walk with feet together swaying side to side!' },
];

const SIMON_COMMANDS = [
  { text: 'JUMP!', emoji: '🦘' },
  { text: 'CLAP YOUR HANDS!', emoji: '👏' },
  { text: 'TOUCH YOUR TOES!', emoji: '🦶' },
  { text: 'SPIN AROUND!', emoji: '🌀' },
  { text: 'FLAP YOUR ARMS!', emoji: '🐔' },
  { text: 'WIGGLE YOUR FINGERS!', emoji: '🖐️' },
  { text: 'STOMP YOUR FEET!', emoji: '🦶' },
  { text: 'HOP ON ONE FOOT!', emoji: '🦩' },
  { text: 'TOUCH YOUR NOSE!', emoji: '👃' },
  { text: 'WAVE HELLO!', emoji: '👋' },
  { text: 'DO A STAR JUMP!', emoji: '⭐' },
  { text: 'MARCH ON THE SPOT!', emoji: '🚶' },
  { text: 'PAT YOUR HEAD!', emoji: '🤚' },
  { text: 'RUB YOUR TUMMY!', emoji: '😋' },
  { text: 'REACH FOR THE SKY!', emoji: '🙌' },
  { text: 'DO A SQUAT!', emoji: '🏋️' },
  { text: 'SHAKE YOUR BODY!', emoji: '🤸' },
  { text: 'BALANCE ON ONE FOOT!', emoji: '🧘' },
  { text: 'DO TINY JUMPS!', emoji: '🐇' },
  { text: 'RUN ON THE SPOT!', emoji: '🏃' },
  { text: 'BLOW A KISS!', emoji: '😘' },
  { text: 'GIVE YOURSELF A HUG!', emoji: '🤗' },
  { text: 'MAKE A FUNNY FACE!', emoji: '🤪' },
  { text: 'PRETEND TO FLY!', emoji: '✈️' },
  { text: 'ROAR LIKE A LION!', emoji: '🦁' },
];

const ANIMAL_MOVES = [
  { animal: '🐻', name: 'Bear', move: 'Walk on hands and feet!', duration: 12 },
  { animal: '🐸', name: 'Frog', move: 'Squat low and leap forward!', duration: 10 },
  { animal: '🦀', name: 'Crab', move: 'Walk sideways on hands and feet!', duration: 12 },
  { animal: '🐍', name: 'Snake', move: 'Slither on the floor!', duration: 10 },
  { animal: '🐧', name: 'Penguin', move: 'Waddle with arms at your sides!', duration: 10 },
  { animal: '🦁', name: 'Lion', move: 'Crawl and ROAR loudly!', duration: 10 },
  { animal: '🐇', name: 'Bunny', move: 'Hop hop hop on both feet!', duration: 10 },
  { animal: '🦅', name: 'Eagle', move: 'Spread your wings and soar!', duration: 12 },
  { animal: '🐒', name: 'Monkey', move: 'Swing your arms and jump!', duration: 10 },
  { animal: '🦩', name: 'Flamingo', move: 'Stand on one leg!', duration: 12 },
  { animal: '🐊', name: 'Crocodile', move: 'Snap your jaws and army crawl!', duration: 10 },
  { animal: '🐎', name: 'Horse', move: 'Gallop around the room!', duration: 12 },
];

const BODY_CHALLENGES = [
  { q: 'Which body part helps you breathe?', a: ['Lungs', 'Knees', 'Ears', 'Elbows'], correct: 0,
    move: 'Take 5 deep breaths! Breathe in... and out!', emoji: '🫁', duration: 15 },
  { q: 'What makes your body move?', a: ['Muscles', 'Hair', 'Teeth', 'Eyebrows'], correct: 0,
    move: 'Flex your muscles! Do 5 arm curls!', emoji: '💪', duration: 12 },
  { q: 'What pumps blood around your body?', a: ['Heart', 'Stomach', 'Brain', 'Foot'], correct: 0,
    move: 'Get your heart pumping! 10 jumping jacks!', emoji: '❤️', duration: 15 },
  { q: 'How many bones do kids have? About...', a: ['300', '10', '50', '1000'], correct: 0,
    move: 'Stretch those bones! Touch your toes 5 times!', emoji: '🦴', duration: 12 },
  { q: 'What part of your body controls everything?', a: ['Brain', 'Tummy', 'Toes', 'Nose'], correct: 0,
    move: 'Brain break! Do 5 star jumps!', emoji: '🧠', duration: 12 },
  { q: 'What do your legs help you do?', a: ['Walk and run', 'Smell', 'Hear', 'Taste'], correct: 0,
    move: 'Use those legs! Run on the spot for 10 seconds!', emoji: '🦵', duration: 12 },
  { q: 'Where does food go after you swallow?', a: ['Stomach', 'Lungs', 'Brain', 'Feet'], correct: 0,
    move: 'Rub your tummy in circles 5 times!', emoji: '😋', duration: 10 },
  { q: 'What helps you balance?', a: ['Inner ear', 'Elbows', 'Hair', 'Fingers'], correct: 0,
    move: 'Test your balance! Stand on one foot for 10 seconds!', emoji: '🧘', duration: 12 },
  { q: 'What protects your brain?', a: ['Skull', 'Skin', 'Hair', 'Hat'], correct: 0,
    move: 'Pat your head gently 10 times!', emoji: '💀', duration: 10 },
  { q: 'What do your hands help you do?', a: ['Grab things', 'Hear', 'Smell', 'Walk'], correct: 0,
    move: 'Clap your hands 15 times as fast as you can!', emoji: '👏', duration: 10 },
];

const EXERCISE_VIDEOS = {
  warmup: {
    label: 'Warm Up', emoji: '🔥',
    videos: [
      { id: 'd3LPrhI0v-w', title: 'PE with Joe - Kids Workout' },
      { id: 'L_A_HjHZxfI', title: '5 Min Kids Warm Up' },
      { id: 'lJSgQBBnKtc', title: 'Kids Morning Warm Up' },
    ]
  },
  cardio: {
    label: 'Cardio', emoji: '❤️',
    videos: [
      { id: 'pnKCGY9ZocA', title: 'Kids Cardio Workout' },
      { id: 'ymigWt5TOV8', title: 'Jump and Move!' },
      { id: 'oe_HDjEm1oc', title: 'Active Kids Workout' },
    ]
  },
  dance: {
    label: 'Dance', emoji: '💃',
    videos: [
      { id: 'FP0wgVhUC9w', title: 'Kidz Bop Dance Along' },
      { id: 'gCzgc_RelBA', title: 'Freeze Dance for Kids' },
      { id: '388Q44ReOWE', title: 'Fun Dance Workout' },
    ]
  },
  superhero: {
    label: 'Superhero', emoji: '🦸',
    videos: [
      { id: '5if4cjO5oxE', title: 'Superhero Workout for Kids' },
      { id: 'dNL6RwymoNg', title: 'Avengers Kids Workout' },
      { id: 'Iri_MGeJmvU', title: 'Spider-Man Workout' },
    ]
  },
  cooldown: {
    label: 'Cool Down', emoji: '🌙',
    videos: [
      { id: '4ZpkRAcgws4', title: 'Kids Stretch & Cool Down' },
      { id: 'cZeM18fPbSk', title: 'Calm Down Stretches' },
      { id: 'YNGUiSgz03Q', title: 'Bedtime Stretches' },
    ]
  }
};

// ---- Exercise Timer ----
let etTimers = [];
let etExercises = [], etIndex = 0, etLevel = 1;

function clearExerciseTimer() {
  etTimers.forEach(t => clearTimeout(t));
  etTimers = [];
}

function startExerciseTimer(level) {
  clearExerciseTimer();
  etLevel = level;
  const counts = [5, 7, 10];
  const shuffled = [...EXERCISES].sort(() => Math.random() - 0.5);
  etExercises = shuffled.slice(0, counts[level - 1]);
  etIndex = 0;
  document.getElementById('et-total').textContent = etExercises.length;
  document.getElementById('et-level-select').classList.add('hidden');
  document.getElementById('et-workout').classList.remove('hidden');
  runExercise();
}

function runExercise() {
  if (etIndex >= etExercises.length) {
    finishExerciseTimer();
    return;
  }
  const ex = etExercises[etIndex];
  document.getElementById('et-current').textContent = etIndex + 1;
  document.getElementById('et-emoji').textContent = ex.emoji;
  document.getElementById('et-name').textContent = ex.reps ? `Do ${ex.reps} ${ex.name}!` : `${ex.name}!`;
  document.getElementById('et-desc').textContent = ex.desc;
  document.getElementById('et-countdown').textContent = '';
  document.getElementById('et-timer-bar').style.width = '100%';
  document.getElementById('et-status').textContent = 'Get ready...';
  const announce = ex.reps ? `Do ${ex.reps} ${ex.name}!` : ex.name + '!';
  playTTS(announce);
  // 3-2-1 countdown after 2s intro
  etTimers.push(setTimeout(() => showETCountdown(3, ex), 2000));
}

function showETCountdown(n, ex) {
  if (n <= 0) {
    document.getElementById('et-countdown').textContent = 'GO!';
    document.getElementById('et-status').textContent = 'GO GO GO!';
    SFX.whistle();
    etTimers.push(setTimeout(() => startETActive(ex), 800));
    return;
  }
  document.getElementById('et-countdown').textContent = n;
  SFX.countdown();
  etTimers.push(setTimeout(() => showETCountdown(n - 1, ex), 1000));
}

function startETActive(ex) {
  document.getElementById('et-countdown').textContent = '';
  document.getElementById('et-status').textContent = 'Keep going!';
  const dur = ex.duration * 1000;
  const start = Date.now();
  const bar = document.getElementById('et-timer-bar');
  function tick() {
    const elapsed = Date.now() - start;
    const pct = Math.max(0, 1 - elapsed / dur);
    bar.style.width = (pct * 100) + '%';
    if (elapsed < dur) {
      etTimers.push(setTimeout(tick, 50));
    } else {
      SFX.exerciseCorrect();
      document.getElementById('et-status').textContent = 'Great job!';
      const restTime = etLevel === 1 ? 10000 : etLevel === 2 ? 8000 : 6000;
      showETRest(restTime);
    }
  }
  tick();
}

function showETRest(ms) {
  etIndex++;
  if (etIndex >= etExercises.length) {
    etTimers.push(setTimeout(finishExerciseTimer, 1500));
    return;
  }
  document.getElementById('et-emoji').textContent = '😤';
  document.getElementById('et-name').textContent = 'Rest!';
  document.getElementById('et-desc').textContent = 'Catch your breath...';
  document.getElementById('et-timer-bar').style.width = '100%';
  const next = etExercises[etIndex];
  document.getElementById('et-status').textContent = `Next: ${next.emoji} ${next.name}`;
  const start = Date.now();
  const bar = document.getElementById('et-timer-bar');
  function tick() {
    const elapsed = Date.now() - start;
    const pct = Math.max(0, 1 - elapsed / ms);
    bar.style.width = (pct * 100) + '%';
    if (elapsed < ms) {
      etTimers.push(setTimeout(tick, 50));
    } else {
      runExercise();
    }
  }
  tick();
}

function finishExerciseTimer() {
  clearExerciseTimer();
  const stars = etLevel;
  celebrate(`Workout Complete!\n${etExercises.length} exercises done!`, stars);
  document.getElementById('et-level-select').classList.remove('hidden');
  document.getElementById('et-workout').classList.add('hidden');
}

// ---- YouTube Videos ----
let currentVideoCategory = 'warmup';

function initExerciseVideos() {
  currentVideoCategory = 'warmup';
  renderVideoCategoryTabs();
  renderVideoGrid('warmup');
}

function renderVideoCategoryTabs() {
  const c = document.getElementById('video-cat-tabs');
  c.innerHTML = '';
  Object.entries(EXERCISE_VIDEOS).forEach(([key, cat]) => {
    const btn = document.createElement('button');
    btn.className = 'video-cat-tab' + (key === currentVideoCategory ? ' active' : '');
    btn.textContent = cat.emoji + ' ' + cat.label;
    btn.onclick = () => {
      currentVideoCategory = key;
      document.querySelectorAll('.video-cat-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderVideoGrid(key);
    };
    c.appendChild(btn);
  });
}

function renderVideoGrid(category) {
  const grid = document.getElementById('video-grid');
  grid.innerHTML = '';
  document.getElementById('video-player-area').classList.add('hidden');
  grid.classList.remove('hidden');
  EXERCISE_VIDEOS[category].videos.forEach(v => {
    const card = document.createElement('button');
    card.className = 'video-thumb-card';
    card.innerHTML = `
      <div class="video-thumb" style="background-image:url('https://img.youtube.com/vi/${v.id}/hqdefault.jpg')">
        <div class="video-play-overlay">&#9654;</div>
      </div>
      <div class="video-thumb-title">${v.title}</div>
    `;
    card.onclick = () => openVideoPlayer(v.id);
    grid.appendChild(card);
  });
}

function openVideoPlayer(videoId) {
  document.getElementById('video-grid').classList.add('hidden');
  const area = document.getElementById('video-player-area');
  area.classList.remove('hidden');
  document.getElementById('video-player-container').innerHTML =
    `<iframe class="yt-iframe" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

function closeVideoPlayer() {
  document.getElementById('video-player-container').innerHTML = '';
  document.getElementById('video-player-area').classList.add('hidden');
  document.getElementById('video-grid').classList.remove('hidden');
}

function cleanupVideoIframes() {
  document.getElementById('video-player-container').innerHTML = '';
}

// ---- Simon Says ----
let simonTimers = [], simonRound = 0, simonScore = 0, simonLives = 3;
let simonIsSimon = true, simonAnswered = false;

function clearSimonTimer() {
  simonTimers.forEach(t => clearTimeout(t));
  simonTimers = [];
}

function initSimonSays() {
  clearSimonTimer();
  simonRound = 0; simonScore = 0; simonLives = 3; simonAnswered = false;
  document.getElementById('ss-ex-score').textContent = '0';
  document.getElementById('ss-ex-lives').textContent = '3';
  document.getElementById('simon-speech').textContent = 'Get ready!';
  document.getElementById('simon-speech').className = 'simon-speech';
  document.getElementById('simon-go-btn').disabled = true;
  document.getElementById('simon-stay-btn').disabled = true;
  document.getElementById('simon-feedback').textContent = '';
  document.getElementById('simon-timer-bar').style.width = '100%';
  simonTimers.push(setTimeout(nextSimonRound, 1500));
}

function nextSimonRound() {
  if (simonLives <= 0 || simonRound >= 15) { finishSimon(); return; }
  simonRound++;
  simonAnswered = false;
  const cmd = SIMON_COMMANDS[Math.floor(Math.random() * SIMON_COMMANDS.length)];
  // Trick ratio: 25% early, 50% late
  const trickChance = simonRound <= 5 ? 0.25 : simonRound <= 10 ? 0.35 : 0.5;
  simonIsSimon = Math.random() > trickChance;
  const speech = document.getElementById('simon-speech');
  const charEl = document.getElementById('simon-char');
  charEl.textContent = cmd.emoji;
  if (simonIsSimon) {
    speech.textContent = `Simon says... ${cmd.text}`;
    speech.className = 'simon-speech simon-safe';
    playTTS(`Simon says... ${cmd.text}`);
  } else {
    speech.textContent = cmd.text;
    speech.className = 'simon-speech simon-trick';
    playTTS(cmd.text);
  }
  document.getElementById('simon-go-btn').disabled = false;
  document.getElementById('simon-stay-btn').disabled = false;
  document.getElementById('simon-feedback').textContent = '';
  // Timer
  const timeLimit = simonRound <= 5 ? 5000 : simonRound <= 10 ? 4000 : 3000;
  const start = Date.now();
  const bar = document.getElementById('simon-timer-bar');
  function tick() {
    if (simonAnswered) return;
    const elapsed = Date.now() - start;
    const pct = Math.max(0, 1 - elapsed / timeLimit);
    bar.style.width = (pct * 100) + '%';
    if (elapsed < timeLimit) {
      simonTimers.push(setTimeout(tick, 50));
    } else {
      // Time's up
      simonAnswered = true;
      document.getElementById('simon-go-btn').disabled = true;
      document.getElementById('simon-stay-btn').disabled = true;
      if (simonIsSimon) {
        // Should have moved — lose life
        simonLives--;
        document.getElementById('ss-ex-lives').textContent = simonLives;
        document.getElementById('simon-feedback').textContent = '⏰ Too slow! Simon said to move!';
        SFX.exerciseWrong();
      } else {
        // Correctly didn't move
        simonScore += 15;
        document.getElementById('ss-ex-score').textContent = simonScore;
        document.getElementById('simon-feedback').textContent = '✅ Smart! Simon didn\'t say that!';
        SFX.exerciseCorrect();
      }
      simonTimers.push(setTimeout(nextSimonRound, 2000));
    }
  }
  tick();
}

function simonAction(didMove) {
  if (simonAnswered) return;
  simonAnswered = true;
  document.getElementById('simon-go-btn').disabled = true;
  document.getElementById('simon-stay-btn').disabled = true;
  const fb = document.getElementById('simon-feedback');
  if (didMove && simonIsSimon) {
    const bonus = 10;
    simonScore += bonus;
    fb.textContent = `✅ Great! +${bonus} points!`;
    SFX.exerciseCorrect();
  } else if (!didMove && !simonIsSimon) {
    simonScore += 15;
    fb.textContent = '✅ Smart! Simon didn\'t say! +15 points!';
    SFX.exerciseCorrect();
  } else if (didMove && !simonIsSimon) {
    simonLives--;
    document.getElementById('ss-ex-lives').textContent = simonLives;
    fb.textContent = '❌ Oops! Simon didn\'t say that!';
    SFX.exerciseWrong();
  } else {
    simonLives--;
    document.getElementById('ss-ex-lives').textContent = simonLives;
    fb.textContent = '❌ Simon said to move!';
    SFX.exerciseWrong();
  }
  document.getElementById('ss-ex-score').textContent = simonScore;
  simonTimers.push(setTimeout(nextSimonRound, 2000));
}

function finishSimon() {
  clearSimonTimer();
  const stars = simonScore >= 150 ? 3 : simonScore >= 100 ? 2 : 1;
  celebrate(`Simon Says Done!\nScore: ${simonScore}`, stars);
}

// ---- Daily Workout ----
function getDailyWorkoutSeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function getTodayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function loadStreakData() {
  const name = currentPlayer ? currentPlayer.name : 'default';
  const all = JSON.parse(localStorage.getItem('klh_exercise_streaks') || '{}');
  return all[name] || { lastCompleted: '', streak: 0, bestStreak: 0, completedDates: [] };
}

function saveStreakData(data) {
  const name = currentPlayer ? currentPlayer.name : 'default';
  const all = JSON.parse(localStorage.getItem('klh_exercise_streaks') || '{}');
  all[name] = data;
  localStorage.setItem('klh_exercise_streaks', JSON.stringify(all));
}

function initDailyWorkout() {
  clearExerciseTimer();
  document.getElementById('daily-intro').classList.remove('hidden');
  document.getElementById('daily-active').classList.add('hidden');

  const streak = loadStreakData();
  const today = getTodayStr();
  const isCompletedToday = streak.completedDates.includes(today);

  // Streak display
  const streakEl = document.getElementById('daily-streak');
  if (streak.streak > 0) {
    streakEl.innerHTML = `🔥 ${streak.streak} Day Streak! (Best: ${streak.bestStreak})`;
  } else {
    streakEl.innerHTML = '💪 Start your streak today!';
  }

  // Calendar (last 7 days)
  const cal = document.getElementById('daily-calendar');
  cal.innerHTML = '';
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    const isToday = i === 0;
    const done = streak.completedDates.includes(ds);
    const div = document.createElement('div');
    div.className = 'daily-day' + (isToday && done ? ' today completed' : isToday ? ' today' : done ? ' completed' : ' missed');
    div.innerHTML = `<span>${days[d.getDay()]}</span><span>${done ? '✅' : isToday ? '🎯' : '·'}</span>`;
    cal.appendChild(div);
  }

  // Preview today's exercises
  const rng = seededRandom(getDailyWorkoutSeed());
  const shuffled = [...EXERCISES].sort(() => rng() - 0.5);
  const dailyExercises = shuffled.slice(0, 7);
  const preview = document.getElementById('daily-preview');
  preview.innerHTML = '<div style="font-size:1.2rem;font-weight:700;margin-bottom:5px;">Today\'s Workout:</div><div class="daily-preview-list">' +
    dailyExercises.map(e => `<div class="daily-preview-item">${e.emoji} ${e.name}</div>`).join('') + '</div>';

  const btn = document.getElementById('daily-start-btn');
  if (isCompletedToday) {
    btn.textContent = '✅ Already Done Today!';
    btn.disabled = true;
    btn.style.opacity = '0.5';
  } else {
    btn.textContent = '💪 Start Today\'s Workout!';
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

function startDailyWorkout() {
  clearExerciseTimer();
  const rng = seededRandom(getDailyWorkoutSeed());
  const shuffled = [...EXERCISES].sort(() => rng() - 0.5);
  etExercises = shuffled.slice(0, 7);
  etIndex = 0;
  etLevel = 2; // medium rest time
  document.getElementById('daily-intro').classList.add('hidden');
  document.getElementById('daily-active').classList.remove('hidden');
  runDailyExercise();
}

function runDailyExercise() {
  if (etIndex >= etExercises.length) {
    finishDailyWorkout();
    return;
  }
  const ex = etExercises[etIndex];
  document.getElementById('daily-emoji').textContent = ex.emoji;
  document.getElementById('daily-name').textContent = ex.reps ? `Do ${ex.reps} ${ex.name}!` : `${ex.name}!`;
  document.getElementById('daily-desc').textContent = ex.desc;
  document.getElementById('daily-countdown').textContent = '';
  document.getElementById('daily-timer-bar').style.width = '100%';
  document.getElementById('daily-status').textContent = `Exercise ${etIndex + 1} of ${etExercises.length}`;
  const announce = ex.reps ? `Do ${ex.reps} ${ex.name}!` : ex.name + '!';
  playTTS(announce);
  etTimers.push(setTimeout(() => showDailyCountdown(3, ex), 2000));
}

function showDailyCountdown(n, ex) {
  if (n <= 0) {
    document.getElementById('daily-countdown').textContent = 'GO!';
    SFX.whistle();
    etTimers.push(setTimeout(() => startDailyActive(ex), 800));
    return;
  }
  document.getElementById('daily-countdown').textContent = n;
  SFX.countdown();
  etTimers.push(setTimeout(() => showDailyCountdown(n - 1, ex), 1000));
}

function startDailyActive(ex) {
  document.getElementById('daily-countdown').textContent = '';
  document.getElementById('daily-status').textContent = 'Keep going!';
  const dur = ex.duration * 1000;
  const start = Date.now();
  const bar = document.getElementById('daily-timer-bar');
  function tick() {
    const elapsed = Date.now() - start;
    bar.style.width = (Math.max(0, 1 - elapsed / dur) * 100) + '%';
    if (elapsed < dur) {
      etTimers.push(setTimeout(tick, 50));
    } else {
      SFX.exerciseCorrect();
      etIndex++;
      if (etIndex >= etExercises.length) {
        etTimers.push(setTimeout(finishDailyWorkout, 1500));
      } else {
        document.getElementById('daily-emoji').textContent = '😤';
        document.getElementById('daily-name').textContent = 'Rest!';
        document.getElementById('daily-desc').textContent = 'Catch your breath...';
        document.getElementById('daily-status').textContent = `Next: ${etExercises[etIndex].emoji} ${etExercises[etIndex].name}`;
        bar.style.width = '100%';
        const restStart = Date.now();
        function restTick() {
          const e = Date.now() - restStart;
          bar.style.width = (Math.max(0, 1 - e / 8000) * 100) + '%';
          if (e < 8000) etTimers.push(setTimeout(restTick, 50));
          else runDailyExercise();
        }
        restTick();
      }
    }
  }
  tick();
}

function finishDailyWorkout() {
  clearExerciseTimer();
  const streak = loadStreakData();
  const today = getTodayStr();
  if (!streak.completedDates.includes(today)) {
    streak.completedDates.push(today);
    // Calculate streak
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const ys = yesterday.getFullYear() + '-' + String(yesterday.getMonth()+1).padStart(2,'0') + '-' + String(yesterday.getDate()).padStart(2,'0');
    if (streak.lastCompleted === ys) {
      streak.streak++;
    } else if (streak.lastCompleted !== today) {
      streak.streak = 1;
    }
    streak.lastCompleted = today;
    if (streak.streak > streak.bestStreak) streak.bestStreak = streak.streak;
    // Keep only last 30 dates
    if (streak.completedDates.length > 30) streak.completedDates = streak.completedDates.slice(-30);
    saveStreakData(streak);
  }
  celebrate(`Daily Workout Done!\n🔥 ${streak.streak} Day Streak!`, 3);
  document.getElementById('daily-intro').classList.remove('hidden');
  document.getElementById('daily-active').classList.add('hidden');
  initDailyWorkout(); // refresh UI
}

// ---- Freeze Dance ----
let freezeTimers = [], freezeRound = 0, freezeScore = 0;
let freezeIsDancing = false, freezeAnswered = false;
let freezeMusicOsc = null, freezeMusicGain = null;

function clearFreezeTimer() {
  freezeTimers.forEach(t => clearTimeout(t));
  freezeTimers = [];
  stopFreezeMusic();
}

function startFreezeMusic() {
  try {
    const ctx = getAudioCtx();
    freezeMusicGain = ctx.createGain();
    freezeMusicGain.gain.value = 0.08;
    freezeMusicGain.connect(ctx.destination);
    freezeMusicOsc = ctx.createOscillator();
    freezeMusicOsc.type = 'sawtooth';
    // Simple bouncy melody - change frequency periodically
    freezeMusicOsc.frequency.value = 440;
    freezeMusicOsc.connect(freezeMusicGain);
    freezeMusicOsc.start();
    // Modulate frequency for a fun beat
    let noteIdx = 0;
    const notes = [440, 523, 587, 523, 440, 392, 440, 523];
    function changeNote() {
      if (!freezeMusicOsc) return;
      freezeMusicOsc.frequency.value = notes[noteIdx % notes.length];
      noteIdx++;
      freezeTimers.push(setTimeout(changeNote, 250));
    }
    changeNote();
  } catch(e) {}
}

function stopFreezeMusic() {
  try {
    if (freezeMusicOsc) { freezeMusicOsc.stop(); freezeMusicOsc = null; }
    if (freezeMusicGain) { freezeMusicGain.disconnect(); freezeMusicGain = null; }
  } catch(e) {}
  freezeMusicOsc = null; freezeMusicGain = null;
}

function initFreezeDance() {
  clearFreezeTimer();
  freezeRound = 0; freezeScore = 0; freezeAnswered = false;
  document.getElementById('freeze-score').textContent = '0';
  document.getElementById('freeze-round').textContent = '0';
  document.getElementById('freeze-char').className = 'freeze-character';
  document.getElementById('freeze-char').textContent = '💃';
  document.getElementById('freeze-status').textContent = 'Get Ready to Dance!';
  document.getElementById('freeze-status').className = 'freeze-status';
  document.getElementById('freeze-btn').disabled = true;
  document.getElementById('freeze-feedback').textContent = '';
  freezeTimers.push(setTimeout(nextFreezeRound, 1500));
}

function nextFreezeRound() {
  if (freezeRound >= 10) { finishFreeze(); return; }
  freezeRound++;
  freezeAnswered = false;
  document.getElementById('freeze-round').textContent = freezeRound;
  document.getElementById('freeze-feedback').textContent = '';

  // Dance phase
  freezeIsDancing = true;
  document.getElementById('freeze-char').className = 'freeze-character dancing';
  document.getElementById('freeze-char').textContent = ['💃', '🕺', '🤸', '🏃', '🧑‍🎤'][Math.floor(Math.random() * 5)];
  document.getElementById('freeze-status').textContent = '🎵 DANCE! 🎵';
  document.getElementById('freeze-status').className = 'freeze-status dance';
  document.getElementById('freeze-btn').disabled = false;
  document.getElementById('freeze-btn').textContent = '❄️ FREEZE!';
  startFreezeMusic();

  // Random dance duration 4-10 seconds
  const danceTime = 4000 + Math.random() * 6000;
  freezeTimers.push(setTimeout(() => {
    // FREEZE!
    stopFreezeMusic();
    freezeIsDancing = false;
    document.getElementById('freeze-char').className = 'freeze-character frozen';
    document.getElementById('freeze-char').textContent = '🧊';
    document.getElementById('freeze-status').textContent = '🧊 FREEZE! 🧊';
    document.getElementById('freeze-status').className = 'freeze-status freeze';
    SFX.whistle();

    // Give 3 seconds to respond
    freezeTimers.push(setTimeout(() => {
      if (!freezeAnswered) {
        // Missed the freeze
        document.getElementById('freeze-feedback').textContent = '⏰ Too slow to freeze!';
        SFX.exerciseWrong();
        freezeTimers.push(setTimeout(nextFreezeRound, 1500));
      }
    }, 3000));
  }, danceTime));
}

function freezeAction() {
  if (freezeAnswered) return;
  freezeAnswered = true;
  document.getElementById('freeze-btn').disabled = true;
  const fb = document.getElementById('freeze-feedback');

  if (!freezeIsDancing) {
    // Correctly froze!
    freezeScore += 10;
    fb.textContent = '✅ Perfect freeze! +10!';
    SFX.exerciseCorrect();
  } else {
    // Tapped while dancing — wrong!
    freezeScore = Math.max(0, freezeScore - 5);
    fb.textContent = '❌ Keep dancing! Music is still playing! -5';
    SFX.exerciseWrong();
  }
  document.getElementById('freeze-score').textContent = freezeScore;
  stopFreezeMusic();
  freezeTimers.push(setTimeout(nextFreezeRound, 1500));
}

function finishFreeze() {
  clearFreezeTimer();
  const stars = freezeScore >= 80 ? 3 : freezeScore >= 50 ? 2 : 1;
  celebrate(`Freeze Dance Done!\nScore: ${freezeScore}`, stars);
}

// ---- Animal Moves ----
let animalTimers = [], animalList = [], animalIndex = 0;

function clearAnimalTimer() {
  animalTimers.forEach(t => clearTimeout(t));
  animalTimers = [];
}

function initAnimalMoves() {
  clearAnimalTimer();
  animalList = [...ANIMAL_MOVES].sort(() => Math.random() - 0.5).slice(0, 8);
  animalIndex = 0;
  document.getElementById('animal-current').textContent = '0';
  document.getElementById('animal-feedback').textContent = '';
  nextAnimalMove();
}

function nextAnimalMove() {
  if (animalIndex >= animalList.length) { finishAnimalMoves(); return; }
  const a = animalList[animalIndex];
  animalIndex++;
  document.getElementById('animal-current').textContent = animalIndex;
  document.getElementById('animal-emoji').textContent = a.animal;
  document.getElementById('animal-name').textContent = `Move like a ${a.name}!`;
  document.getElementById('animal-move').textContent = a.move;
  document.getElementById('animal-timer-bar').style.width = '100%';
  document.getElementById('animal-status').textContent = 'Go!';
  document.getElementById('animal-feedback').textContent = '';
  playTTS(`Move like a ${a.name}! ${a.move}`);

  const dur = a.duration * 1000;
  const start = Date.now();
  const bar = document.getElementById('animal-timer-bar');
  function tick() {
    const elapsed = Date.now() - start;
    bar.style.width = (Math.max(0, 1 - elapsed / dur) * 100) + '%';
    if (elapsed < dur) {
      animalTimers.push(setTimeout(tick, 50));
    } else {
      SFX.exerciseCorrect();
      document.getElementById('animal-status').textContent = 'Great!';
      animalTimers.push(setTimeout(nextAnimalMove, 1500));
    }
  }
  tick();
}

function finishAnimalMoves() {
  clearAnimalTimer();
  celebrate('Animal Moves Complete!\nYou moved like 8 animals!', 2);
}

// ---- Body Challenge ----
let bcTimers = [], bcIndex = 0, bcScore = 0, bcData = [];

function clearBCTimer() {
  bcTimers.forEach(t => clearTimeout(t));
  bcTimers = [];
}

function initBodyChallenge() {
  clearBCTimer();
  bcData = [...BODY_CHALLENGES].sort(() => Math.random() - 0.5).slice(0, 10);
  bcIndex = 0; bcScore = 0;
  document.getElementById('bc-score').textContent = '0';
  document.getElementById('bc-total').textContent = bcData.length;
  document.getElementById('bc-quiz-area').classList.remove('hidden');
  document.getElementById('bc-exercise-area').classList.add('hidden');
  document.getElementById('bc-feedback').textContent = '';
  renderBCQuestion();
}

function renderBCQuestion() {
  if (bcIndex >= bcData.length) { finishBodyChallenge(); return; }
  const q = bcData[bcIndex];
  document.getElementById('bc-quiz-area').classList.remove('hidden');
  document.getElementById('bc-exercise-area').classList.add('hidden');
  document.getElementById('bc-question').textContent = q.q;
  const choices = document.getElementById('bc-choices');
  choices.innerHTML = '';
  // Shuffle answers but track correct
  const indices = q.a.map((_, i) => i).sort(() => Math.random() - 0.5);
  indices.forEach(i => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = q.a[i];
    btn.onclick = () => bcAnswer(i === q.correct);
    choices.appendChild(btn);
  });
  document.getElementById('bc-feedback').textContent = '';
  playTTS(q.q);
}

function bcAnswer(correct) {
  const fb = document.getElementById('bc-feedback');
  document.querySelectorAll('#bc-choices .choice-btn').forEach(b => b.disabled = true);
  if (correct) {
    bcScore++;
    document.getElementById('bc-score').textContent = bcScore;
    fb.textContent = '✅ Correct! Now do the exercise!';
    SFX.exerciseCorrect();
    bcTimers.push(setTimeout(() => startBCExercise(), 1500));
  } else {
    fb.textContent = '❌ Not quite! The answer is ' + bcData[bcIndex].a[bcData[bcIndex].correct];
    SFX.exerciseWrong();
    bcIndex++;
    bcTimers.push(setTimeout(renderBCQuestion, 2000));
  }
}

function startBCExercise() {
  const q = bcData[bcIndex];
  document.getElementById('bc-quiz-area').classList.add('hidden');
  document.getElementById('bc-exercise-area').classList.remove('hidden');
  document.getElementById('bc-ex-emoji').textContent = q.emoji;
  document.getElementById('bc-ex-text').textContent = q.move;
  document.getElementById('bc-timer-bar').style.width = '100%';
  document.getElementById('bc-feedback').textContent = '';
  playTTS(q.move);

  const dur = q.duration * 1000;
  const start = Date.now();
  const bar = document.getElementById('bc-timer-bar');
  function tick() {
    const elapsed = Date.now() - start;
    bar.style.width = (Math.max(0, 1 - elapsed / dur) * 100) + '%';
    if (elapsed < dur) {
      bcTimers.push(setTimeout(tick, 50));
    } else {
      SFX.exerciseCorrect();
      document.getElementById('bc-feedback').textContent = '💪 Awesome!';
      bcIndex++;
      bcTimers.push(setTimeout(renderBCQuestion, 1500));
    }
  }
  tick();
}

function finishBodyChallenge() {
  clearBCTimer();
  const stars = bcScore >= 8 ? 3 : bcScore >= 5 ? 2 : 1;
  celebrate(`Body Challenge Done!\nScore: ${bcScore}/${bcData.length}`, stars);
}

// ============ INIT ============
window.addEventListener('load', () => {
  // TTS is now handled by server-side /tts endpoint (no speechSynthesis needed)
  renderPlayerSlots();
  spawnParticles('particles-main', MAIN_PARTICLES);
});

// Resume audio context on first user interaction (required by browsers)
document.addEventListener('click', () => {
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}, { once: true });
