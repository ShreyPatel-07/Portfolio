"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  /** Short UI tick — safe to call when sound is off (no-op). */
  tick: (variant?: "hover" | "click") => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

/**
 * Optional, muted-by-default audio.
 *
 * · Nothing is created until the visitor explicitly enables sound, so no
 *   AudioContext exists and nothing can autoplay.
 * · The ambient bed is a quiet, slowly breathing minor chord with a little
 *   stereo width and delay — musical rather than a low drone. UI ticks are
 *   synthesised — no audio assets to download.
 * · Automatically unavailable when prefers-reduced-motion is set.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{ stop: () => void } | null>(null);
  const lastTick = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof window === "undefined" || !("AudioContext" in window)) {
      setSupported(false);
    }
  }, []);

  const buildAmbient = useCallback((ctx: AudioContext) => {
    const now = ctx.currentTime;
    const sources: OscillatorNode[] = [];

    const master = ctx.createGain();
    master.gain.value = 0;
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -30;
    compressor.knee.value = 24;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.12;
    compressor.release.value = 0.7;
    master.connect(compressor).connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1050;
    filter.Q.value = 0.35;

    // A slow filter drift keeps the pad from sounding like a held test tone.
    const filterLfo = ctx.createOscillator();
    filterLfo.type = "sine";
    filterLfo.frequency.value = 0.043;
    const filterLfoGain = ctx.createGain();
    filterLfoGain.gain.value = 160;
    filterLfo.connect(filterLfoGain).connect(filter.frequency);
    sources.push(filterLfo);

    const bus = ctx.createGain();
    bus.gain.value = 0.5;
    filter.connect(bus).connect(master);

    // Very quiet room: one delay tap, low feedback, mostly dry signal.
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.38;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.18;
    const wet = ctx.createGain();
    wet.gain.value = 0.09;
    bus.connect(delay);
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(master);

    // A minor add9, centred above the sub-bass: E3, A3, C4, E4, G4, C5.
    // Keeping the lowest voice at E3 avoids the constant 55–110 Hz hum that
    // makes a pad read as room noise rather than music.
    const voices = [
      { freq: 164.81, type: "triangle" as OscillatorType, level: 0.055, pan: 0.24 },
      { freq: 220, type: "sine" as OscillatorType, level: 0.1, pan: -0.16 },
      { freq: 261.63, type: "triangle" as OscillatorType, level: 0.085, pan: 0.38 },
      { freq: 329.63, type: "sine" as OscillatorType, level: 0.075, pan: -0.42 },
      { freq: 392, type: "sine" as OscillatorType, level: 0.04, pan: 0.08 },
      { freq: 523.25, type: "sine" as OscillatorType, level: 0.012, pan: -0.24 },
    ];

    voices.forEach((voice, index) => {
      const osc = ctx.createOscillator();
      osc.type = voice.type;
      osc.frequency.value = voice.freq;
      osc.detune.value = (index - 2.5) * 2.4;

      const gain = ctx.createGain();
      gain.gain.value = voice.level;

      const panner = ctx.createStereoPanner();
      panner.pan.value = voice.pan;

      osc.connect(gain).connect(panner).connect(filter);
      osc.start(now);
      sources.push(osc);

      // Each voice swells at its own slow rate, so the chord breathes instead
      // of holding one static tone.
      const movement = ctx.createOscillator();
      movement.type = "sine";
      movement.frequency.value = 0.021 + index * 0.004;
      const movementDepth = ctx.createGain();
      movementDepth.gain.value = voice.level * 0.26;
      movement.connect(movementDepth).connect(gain.gain);
      movement.start(now);
      sources.push(movement);
    });

    // A barely perceptible breath on the whole bed.
    const breath = ctx.createOscillator();
    breath.type = "sine";
    breath.frequency.value = 0.031;
    const breathGain = ctx.createGain();
    breathGain.gain.value = 0.035;
    breath.connect(breathGain).connect(bus.gain);
    breath.start(now);
    sources.push(breath);

    master.gain.linearRampToValueAtTime(0.026, now + 5);

    return {
      stop: () => {
        const stopAt = ctx.currentTime;
        master.gain.cancelScheduledValues(stopAt);
        master.gain.setValueAtTime(master.gain.value, stopAt);
        master.gain.linearRampToValueAtTime(0, stopAt + 1.1);
        window.setTimeout(() => {
          sources.forEach((source) => {
            try {
              source.stop();
            } catch {
              // Already stopped by a previous cleanup.
            }
          });
          master.disconnect();
          compressor.disconnect();
          filter.disconnect();
          delay.disconnect();
        }, 1200);
      },
    };
  }, []);

  /** Pure state flip — the audio itself is driven by the effect below. */
  const toggle = useCallback(() => setEnabled((current) => !current), []);

  /**
   * Own the ambient bed here rather than inside the state updater.
   * StrictMode double-invokes updaters, which used to build two drones and
   * only stop one — so muting left a quiet fan-like hum running. An effect
   * with a cleanup starts exactly one bed and always tears it down.
   */
  useEffect(() => {
    if (!enabled || !supported) return;

    const AudioCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    const ctx = ctxRef.current ?? new AudioCtor();
    ctxRef.current = ctx;
    void ctx.resume();

    const ambient = buildAmbient(ctx);
    ambientRef.current = ambient;

    return () => {
      ambient.stop();
      ambientRef.current = null;
    };
  }, [enabled, supported, buildAmbient]);

  const tick = useCallback(
    (variant: "hover" | "click" = "hover") => {
      const ctx = ctxRef.current;
      if (!enabled || !ctx) return;
      const now = ctx.currentTime;
      if (now - lastTick.current < 0.045) return;
      lastTick.current = now;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2400;
      osc.type = "sine";
      osc.frequency.setValueAtTime(variant === "click" ? 520 : 880, now);
      osc.frequency.exponentialRampToValueAtTime(variant === "click" ? 340 : 620, now + 0.1);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(variant === "click" ? 0.018 : 0.008, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      osc.connect(gain).connect(filter).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    },
    [enabled]
  );

  useEffect(() => {
    return () => {
      const ctx = ctxRef.current;
      ambientRef.current?.stop();
      ambientRef.current = null;
      void ctx?.close();
      ctxRef.current = null;
    };
  }, []);

  const value = useMemo(() => ({ enabled, toggle, tick }), [enabled, toggle, tick]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const context = useContext(SoundContext);
  return (
    context ?? {
      enabled: false,
      toggle: () => {},
      tick: () => {},
    }
  );
}
