/*
  EMOTIONAL UNIVERSE ENGINE
  -----------------------------------
  controls:
  - atmosphere
  - aura
  - resonance
  - pulse
  - visual intensity
*/

import { EmotionVector } from "@/stores/fluxStore";

/*
  EMOTION COLOR SYSTEM
*/

export const emotionColors = {
  resonate:
    "rgba(255,255,255,0.16)",

  reject:
    "rgba(255,80,120,0.16)",

  intense:
    "rgba(168,85,247,0.18)",

  suppress:
    "rgba(34,211,238,0.14)",

  loneliness:
    "rgba(120,120,255,0.18)",

  anxiety:
    "rgba(255,140,140,0.16)",

  obsession:
    "rgba(196,90,255,0.2)",
};

/*
  TOTAL ATMOSPHERE
*/

export function calculateAtmosphere(
  vector: EmotionVector
) {
  return Math.min(
    vector.loneliness +
      vector.anxiety +
      vector.validation +
      vector.intimacy +
      vector.avoidance +
      vector.resonance +
      vector.rejection +
      vector.obsession +
      vector.emotionalIntensity +
      vector.suppression,
    18
  );
}

/*
  PULSE STRENGTH
*/

export function calculatePulseStrength(
  atmosphere: number
) {
  return 1 + atmosphere * 0.006;
}

/*
  SHOCKWAVE POWER
*/

export function calculateShockwavePower(
  intensity: number
) {
  return Math.min(
    0.12 + intensity * 0.04,
    0.38
  );
}

/*
  RESONANCE SCALE
*/

export function calculateResonanceScale(
  resonance: number
) {
  return Math.min(
    1 + resonance * 0.04,
    1.4
  );
}

/*
  PARTICLE DENSITY
*/

export function calculateParticleDensity(
  atmosphere: number
) {
  return Math.floor(
    18 + atmosphere * 1.4
  );
}

/*
  LIVE AURA OPACITY
*/

export function calculateAuraOpacity(
  atmosphere: number
) {
  return {
    top:
      0.12 +
      atmosphere * 0.009,

    bottom:
      0.08 +
      atmosphere * 0.007,

    side:
      0.08 +
      atmosphere * 0.005,
  };
}

/*
  ATMOSPHERE OVERLAY
*/

export function calculateOverlayOpacity(
  atmosphere: number
) {
  return Math.min(
    0.3 + atmosphere * 0.012,
    0.58
  );
}

/*
  EMOTIONAL TEMPERATURE
*/

export function calculateEmotionalTemperature(
  vector: EmotionVector
) {
  return (
    vector.obsession * 1.4 +
    vector.anxiety * 1.2 +
    vector.emotionalIntensity *
      1.5 -
    vector.suppression * 0.8
  );
}

/*
  UNIVERSE STATE
*/

export function detectUniverseMood(
  vector: EmotionVector
):
  | "idle"
  | "resonate"
  | "reject"
  | "intense"
  | "suppress" {
  if (
    vector.obsession > 4 ||
    vector.emotionalIntensity >
      4
  ) {
    return "intense";
  }

  if (
    vector.suppression > 4
  ) {
    return "suppress";
  }

  if (
    vector.rejection > 4
  ) {
    return "reject";
  }

  if (
    vector.resonance > 4
  ) {
    return "resonate";
  }

  return "idle";
}

/*
  GESTURE VISUAL SYSTEM
*/

export type GestureState =
  | "idle"
  | "resonate"
  | "reject"
  | "intense"
  | "suppress";

/*
  UNIVERSE SIGNAL GRADIENT
*/

export function getUniverseSignalGradient(
  gesture: GestureState
) {
  switch (gesture) {
    case "resonate":
      return "radial-gradient(circle, rgba(255,255,255,0.16), transparent 70%)";

    case "intense":
      return "radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%)";

    case "suppress":
      return "radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)";

    case "reject":
      return "radial-gradient(circle, rgba(255,80,120,0.14), transparent 70%)";

    default:
      return "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)";
  }
}

/*
  AURA COLOR
*/

export function getAuraColor(
  gesture: GestureState
) {
  switch (gesture) {
    case "resonate":
      return "rgba(255,255,255,0.14)";

    case "intense":
      return "rgba(168,85,247,0.16)";

    case "suppress":
      return "rgba(34,211,238,0.12)";

    case "reject":
      return "rgba(120,120,255,0.12)";

    default:
      return "rgba(255,255,255,0.08)";
  }
}

/*
  GESTURE LABEL
*/

export function getGestureLabel(
  gesture: GestureState
) {
  switch (gesture) {
    case "resonate":
      return "resonating...";

    case "reject":
      return "rejecting...";

    case "intense":
      return "too intense...";

    case "suppress":
      return "emotion suppressed...";

    default:
      return "";
  }
}