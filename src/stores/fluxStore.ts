"use client";

import { create } from "zustand";

import { persist } from "zustand/middleware";

import { runtimeDebug } from "@/features/swipe/runtime/runtimeDebug";

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

export type UniverseState = {
  /*
    CURRENT GLOBAL FEELING
  */

  mood:
    | "idle"
    | "resonate"
    | "reject"
    | "intense"
    | "suppress";

  /*
    emotional pulse energy
  */

  pulse: number;

  /*
    live atmosphere level
  */

  atmosphere: number;

  /*
    universe flash trigger
  */

  shockwave: number;

  /*
    NEW LIVE TRIGGERS
  */

  swipeImpulse: number;

  universePulse: number;

  liveSignal: number;
};

type FluxStore = {
  emotions: string[];

  vector: EmotionVector;

  /*
    UNIVERSE
  */

  universe: UniverseState;

  addEmotion: (
    id: string,
    weights: Partial<EmotionVector>
  ) => EmotionVector;

  /*
    LIVE ATMOSPHERE UPDATE
  */

  triggerUniverse: (
    mood: UniverseState["mood"],
    intensity?: number
  ) => void;

  /*
    NEW REALTIME TRIGGERS
  */

  triggerUniversePulse: (
    intensity?: number
  ) => void;

  triggerShockwave: () => void;

  triggerLiveSignal: () => void;

  swipeImpulse: (
    intensity?: number
  ) => void;

  resetUniverse: () => void;

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

const createInitialUniverse =
  (): UniverseState => ({
    mood: "idle",

    pulse: 0,

    atmosphere: 0,

    shockwave: 0,

    /*
      NEW LIVE DEFAULTS
    */

    swipeImpulse: 0,

    universePulse: 0,

    liveSignal: 0,
  });

export const useFluxStore =
  create<FluxStore>()(
    persist(
      (set) => ({
        emotions: [],

        vector:
          createInitialVector(),

        /*
          UNIVERSE
        */

        universe:
          createInitialUniverse(),

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

            runtimeDebug(
              "VECTOR_UPDATE",
              {
                id,
                weights,
              }
            );

            updatedVector = {
              loneliness:
                state.vector
                  .loneliness +
                (weights.loneliness ||
                  0),

              anxiety:
                state.vector
                  .anxiety +
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

              vector:
                updatedVector,
            };
          });

          return updatedVector;
        },

        /*
          REALTIME EMOTIONAL WORLD
        */

        triggerUniverse: (
          mood,
          intensity = 1
        ) => {
          runtimeDebug(
            "UNIVERSE_EVENT",
            {
              mood,
              intensity,
            }
          );

          set((state) => ({
            universe: {
              ...state.universe,

              mood,

              pulse:
                state.universe
                  .pulse +
                intensity,

              atmosphere:
                Math.min(
                  state.universe
                    .atmosphere +
                    intensity *
                      0.6,
                  10
                ),

              shockwave:
                Date.now(),
            },
          }));
        },

        /*
          SWIPE IMPULSE
        */

        swipeImpulse: (
          intensity = 1
        ) =>
          set((state) => ({
            universe: {
              ...state.universe,

              swipeImpulse:
                Date.now() +
                intensity,
            },
          })),

        /*
          UNIVERSE PULSE
        */

        triggerUniversePulse: (
          intensity = 1
        ) =>
          set((state) => ({
            universe: {
              ...state.universe,

              universePulse:
                Date.now() +
                intensity,

              pulse:
                state.universe
                  .pulse +
                intensity,
            },
          })),

        /*
          SHOCKWAVE
        */

        triggerShockwave: () =>
          set((state) => ({
            universe: {
              ...state.universe,

              shockwave:
                Date.now(),
            },
          })),

        /*
          LIVE SIGNAL
        */

        triggerLiveSignal: () =>
          set((state) => ({
            universe: {
              ...state.universe,

              liveSignal:
                Date.now(),
            },
          })),

        resetUniverse: () =>
          set({
            universe:
              createInitialUniverse(),
          }),

        reset: () =>
          set({
            emotions: [],

            vector:
              createInitialVector(),

            universe:
              createInitialUniverse(),
          }),
      }),

      {
        name: "fluxy-emotions",

        onRehydrateStorage:
          () => {
            runtimeDebug(
              "HYDRATION_START"
            );

            return (
              state
            ) => {
              runtimeDebug(
                "HYDRATION_FINISH",
                {
                  emotions:
                    state
                      ?.emotions
                      ?.length,

                  mood:
                    state
                      ?.universe
                      ?.mood,
                }
              );
            };
          },
      }
    )
  );