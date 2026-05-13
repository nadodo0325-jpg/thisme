/*
  EMOTIONAL RUNTIME ENGINE
  -----------------------------------
  controls:
  - emotional decay
  - drift
  - instability
  - signal mutation
  - runtime evolution
*/

import { EmotionVector } from "@/stores/fluxStore";

/*
  DECAY SYSTEM
*/

export function applyEmotionDecay(
  vector: EmotionVector
): EmotionVector {
  return {
    ...vector,

    loneliness:
      vector.loneliness * 0.996,

    anxiety:
      vector.anxiety * 0.995,

    validation:
      vector.validation * 0.994,

    intimacy:
      vector.intimacy * 0.997,

    avoidance:
      vector.avoidance * 0.996,

    resonance:
      vector.resonance * 0.995,

    rejection:
      vector.rejection * 0.996,

    obsession:
      vector.obsession * 0.992,

    suppression:
      vector.suppression * 0.997,

    emotionalIntensity:
      vector.emotionalIntensity *
      0.993,
  };
}

/*
  EMOTIONAL DRIFT
  -----------------------------------
  suppressed emotions
  slowly become loneliness
*/

export function applyEmotionalDrift(
  vector: EmotionVector
): EmotionVector {
  const driftAmount =
    vector.suppression * 0.002;

  return {
    ...vector,

    loneliness:
      vector.loneliness +
      driftAmount,

    suppression:
      Math.max(
        0,
        vector.suppression -
          driftAmount * 0.4
      ),
  };
}

/*
  EMOTIONAL AMPLIFICATION
  -----------------------------------
  obsession amplifies intensity
*/

export function amplifyEmotions(
  vector: EmotionVector
): EmotionVector {
  const amplification =
    vector.obsession * 0.015;

  return {
    ...vector,

    emotionalIntensity:
      vector.emotionalIntensity +
      amplification,

    anxiety:
      vector.anxiety +
      amplification * 0.35,
  };
}

/*
  RUNTIME INSTABILITY
  -----------------------------------
  unstable emotions create
  atmosphere corruption
*/

export function calculateInstability(
  vector: EmotionVector
) {
  return Math.min(
    (
      vector.anxiety * 1.4 +
      vector.obsession * 1.6 +
      vector.emotionalIntensity *
        1.2 -
      vector.resonance * 0.8
    ) *
      0.12,
    1
  );
}

/*
  EMOTIONAL TEMPERATURE
*/

export function calculateRuntimeTemperature(
  vector: EmotionVector
) {
  return (
    vector.obsession * 1.5 +
    vector.anxiety * 1.2 +
    vector.emotionalIntensity *
      1.4
  );
}

/*
  FULL RUNTIME STEP
*/

export function processEmotionRuntime(
  vector: EmotionVector
) {
  const decayed =
    applyEmotionDecay(vector);

  const drifted =
    applyEmotionalDrift(decayed);

  const amplified =
    amplifyEmotions(drifted);

  return {
    vector: amplified,

    instability:
      calculateInstability(
        amplified
      ),

    temperature:
      calculateRuntimeTemperature(
        amplified
      ),
  };
}