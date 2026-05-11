import { create } from "zustand";

import { persist } from "zustand/middleware";

type EmotionVector = {
  loneliness: number;
  anxiety: number;
  validation: number;
  intimacy: number;
  avoidance: number;
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

const initialVector: EmotionVector = {
  loneliness: 0,
  anxiety: 0,
  validation: 0,
  intimacy: 0,
  avoidance: 0,
};

export const useFluxStore =
  create<FluxStore>()(
    persist(
      (set) => ({
        emotions: [],

        vector: initialVector,

        addEmotion: (id, weights) => {
          let updatedVector: EmotionVector =
            initialVector;

          set((state) => {
            updatedVector = {
              loneliness:
                state.vector.loneliness +
                (weights.loneliness || 0),

              anxiety:
                state.vector.anxiety +
                (weights.anxiety || 0),

              validation:
                state.vector.validation +
                (weights.validation || 0),

              intimacy:
                state.vector.intimacy +
                (weights.intimacy || 0),

              avoidance:
                state.vector.avoidance +
                (weights.avoidance || 0),
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
            vector: initialVector,
          }),
      }),

      {
        name: "fluxy-emotions",
      }
    )
  );