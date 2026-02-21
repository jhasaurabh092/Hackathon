/**
 * Rupee Rocket — Sound Effects using Web Audio API
 * No external files needed — all generated programmatically.
 */

let audioCtx = null;

function getCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function playTone(frequency, startTime, duration, gainVal, type = 'sine', ctx) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration);
}

/**
 * 🎉 Hurray sound — cheerful ascending arpeggio (C-E-G-C)
 * Played when money is ADDED to balance.
 */
export function playHurray() {
    try {
        const ctx = getCtx();
        const now = ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
            playTone(freq, now + i * 0.1, 0.25, 0.3, 'triangle', ctx);
        });
        playTone(1567.98, now + 0.4, 0.3, 0.15, 'sine', ctx);
    } catch (_) { }
}

/**
 * ⚠️ Alert sound — descending warning tones
 * Played when money is DEDUCTED from balance.
 */
export function playAlert() {
    try {
        const ctx = getCtx();
        const now = ctx.currentTime;
        const notes = [440, 349.23, 293.66, 220];
        notes.forEach((freq, i) => {
            playTone(freq, now + i * 0.12, 0.2, 0.3, 'sawtooth', ctx);
        });
    } catch (_) { }
}

/**
 * 🚀 Celebration sound — full fanfare for level completion!
 * Triumphant chord + ascending run + sparkle finish.
 */
export function playCelebration() {
    try {
        const ctx = getCtx();
        const now = ctx.currentTime;

        // Opening chord (C major)
        [261.63, 329.63, 392.00].forEach(freq => {
            playTone(freq, now, 0.4, 0.2, 'triangle', ctx);
        });

        // Fanfare run — ascending C major scale rapid
        const run = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
        run.forEach((freq, i) => {
            playTone(freq, now + 0.35 + i * 0.08, 0.18, 0.25, 'triangle', ctx);
        });

        // Final triumphant chord
        [1046.50, 1318.51, 1567.98].forEach((freq, i) => {
            playTone(freq, now + 1.1, 0.6, 0.2 - i * 0.04, 'sine', ctx);
        });

        // Sparkle shimmer
        [2093, 2349, 2637].forEach((freq, i) => {
            playTone(freq, now + 1.2 + i * 0.08, 0.15, 0.08, 'sine', ctx);
        });
    } catch (_) { }
}
