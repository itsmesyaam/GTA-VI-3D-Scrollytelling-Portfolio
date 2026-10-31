// Procedural Web Audio API Sound Engine (Zero External Audio Files)
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private padGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported
    }
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbientSynth();
    } else {
      this.stopAmbientSynth();
    }

    return !this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  private startAmbientSynth() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Master Gain
    this.padGain = this.ctx.createGain();
    this.padGain.gain.setValueAtTime(0.0001, now);
    this.padGain.gain.exponentialRampToValueAtTime(0.08, now + 2.5);

    // Warm Lowpass Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(480, now);
    this.filter.Q.setValueAtTime(3.0, now);

    // LFO for slow ambient filter sweep
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.08, now);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(220, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    lfo.start();

    // D Minor 9th chord frequencies: D2, A2, F3, C4, E4
    const chordFrequencies = [73.42, 110.0, 174.61, 261.63, 329.63];
    this.oscillators = [];

    chordFrequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((idx - 2) * 6.5, now);

      const voiceGain = this.ctx.createGain();
      voiceGain.gain.setValueAtTime(0.25 / chordFrequencies.length, now);

      osc.connect(voiceGain);
      if (this.filter) voiceGain.connect(this.filter);
      osc.start();
      this.oscillators.push(osc);
    });

    if (this.filter && this.padGain) {
      this.filter.connect(this.padGain);
      this.padGain.connect(this.ctx.destination);
    }
  }

  private stopAmbientSynth() {
    if (this.padGain && this.ctx) {
      this.padGain.gain.setTargetAtTime(0.00001, this.ctx.currentTime, 0.5);
      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Ignore if already stopped
          }
        });
        this.oscillators = [];
      }, 600);
    }
  }

  // Futuristic UI Click SFX
  public playClickSfx() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.06);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // AudioContext muted or suspended
    }
  }

  // Chapter Transition Shimmer SFX
  public playChapterSfx() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // AudioContext muted
    }
  }
}

export const soundEngine = new SoundEngine();
