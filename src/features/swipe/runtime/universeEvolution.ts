/*
  UNIVERSE AUTO EVOLUTION
  -----------------------------------
  global emotional mutation system
*/

import { EmotionVector } from "@/stores/fluxStore";

import {
  calculateInstability,
} from "../lib/emotionRuntime";

/*
  mutate emotional universe
*/

export function evolveUniverse(
  vector: EmotionVector
): EmotionVector {
  const instability =
    calculateInstability(
      vector
    );

  /*
    resonance can become obsession
  */

  const obsessionShift =
    vector.resonance *
    instability *
    0.004;

  /*
    suppression leaks loneliness
  */

  const lonelinessShift =
    vector.suppression *
    0.003;

  /*
    anxiety corrupts validation
  */

  const validationDecay =
    vector.anxiety *
    0.002;

  /*
    unstable intensity
  */

  const intensityMutation =
    instability * 0.01;

  return {
    ...vector,

    obsession:
      vector.obsession +
      obsessionShift,

    loneliness:
      vector.loneliness +
      lonelinessShift,

    validation:
      Math.max(
        0,
        vector.validation -
          validationDecay
      ),

    emotionalIntensity:
      vector.emotionalIntensity +
      intensityMutation,
  };
}