import { S } from '../../engine/state.js';

let AC = null;
function beep(notes, type, vol, len, gap){
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const t = AC.currentTime;
    notes.forEach((f, i) => {
      const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.value = f;
      const st = t + i * gap;
      g.gain.setValueAtTime(0.0001, st); g.gain.exponentialRampToValueAtTime(vol, st + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, st + len);
      o.connect(g); g.connect(AC.destination); o.start(st); o.stop(st + len + 0.03);
    });
  } catch (e) {}
}
export const sfx = {
  tap: () => beep([620], 'sine', 0.025, 0.05, 0),
  ok: () => beep([660, 990], 'sine', 0.07, 0.12, 0.09),
  bad: () => beep([240, 180], 'triangle', 0.08, 0.16, 0.12),
  win: () => beep([523, 659, 784, 1047], 'sine', 0.07, 0.2, 0.11),
  coin: () => beep([988, 1319], 'square', 0.03, 0.09, 0.07),
  tick: () => beep([880], 'sine', 0.02, 0.04, 0)
};
export function buzz(){ try { if (navigator.vibrate) navigator.vibrate(70); } catch (e) {} }
