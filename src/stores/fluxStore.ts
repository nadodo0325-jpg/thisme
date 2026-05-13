import { create } from "zustand";

import { persist } from "zustand/middleware";

export type EmotionVector = {
  loneliness: number;
  anxiety: number;
  validation: number;
  intimacy: number;
  avoidance: number;

  /*
    NEW EMOTIONAL LAYERS
  */

  resonance: number;
  rejection: number;
  obsession: number;
  suppression: number;
  emotionalIntensity: number;
};

type FluxStore = {
  emotions: string[];

  vector: EmotionVector;

  addEmotion: (
    id: string,
    weights: Partial<EmotionVector>
  ) => EmotionVector;

  reset: () => void;
};

const createInitialVector =
  (): EmotionVector => ({
    loneliness: 0,
    anxiety: 0,
    validation: 0,
    intimacy: 0,
    avoidance: 0,

    /*
      NEW DEFAULTS
    */

    resonance: 0,
    rejection: 0,
    obsession: 0,
    suppression: 0,
    emotionalIntensity: 0,
  });

export const useFluxStore =
  create<FluxStore>()(
    persist(
      (set) => ({
        emotions: [],

        vector: createInitialVector(),

        addEmotion: (
          id,
          weights
        ) => {
          let updatedVector =
            createInitialVector();

          set((state) => {
            /*
              PREVENT DUPLICATE SWIPE
            */

            if (
              state.emotions.includes(id)
            ) {
              updatedVector =
                state.vector;

              return state;
            }

            updatedVector = {
              loneliness:
                state.vector
                  .loneliness +
                (weights.loneliness ||
                  0),

              anxiety:
                state.vector.anxiety +
                (weights.anxiety ||
                  0),

              validation:
                state.vector
                  .validation +
                (weights.validation ||
                  0),

              intimacy:
                state.vector
                  .intimacy +
                (weights.intimacy ||
                  0),

              avoidance:
                state.vector
                  .avoidance +
                (weights.avoidance ||
                  0),

              /*
                NEW EMOTIONAL FIELDS
              */

              resonance:
                state.vector
                  .resonance +
                (weights.resonance ||
                  0),

              rejection:
                state.vector
                  .rejection +
                (weights.rejection ||
                  0),

              obsession:
                state.vector
                  .obsession +
                (weights.obsession ||
                  0),

              suppression:
                state.vector
                  .suppression +
                (weights.suppression ||
                  0),

              emotionalIntensity:
                state.vector
                  .emotionalIntensity +
                (weights.emotionalIntensity ||
                  0),
            };

            return {
              emotions: [
                ...state.emotions,
                id,
              ],

              vector: updatedVector,
            };
          });

          return updatedVector;
        },

        reset: () =>
          set({
            emotions: [],

            vector:
              createInitialVector(),
          }),
      }),

      {
        name: "fluxy-emotions",
      }
    )
  );