"use client";

import { useEffect } from "react";

import { useFluxStore } from "@/stores/fluxStore";

import {
  processEmotionRuntime,
} from "../lib/emotionRuntime";

import {
  evolveUniverse,
} from "./universeEvolution";

export function useEmotionRuntime() {
  useEffect(() => {
    let frameId = 0;

    let lastUpdate =
      performance.now();

    const LOOP_INTERVAL = 120;

    const runtimeLoop = (
      now: number
    ) => {
      const delta =
        now - lastUpdate;

      /*
        throttle runtime
      */

      if (
        delta >= LOOP_INTERVAL
      ) {
        lastUpdate = now;

        const store =
          useFluxStore.getState();

        /*
          runtime simulation
        */

        const runtimeResult =
          processEmotionRuntime(
            store.vector
          );

        /*
          universe evolution
        */

        const evolvedVector =
          evolveUniverse(
            runtimeResult.vector
          );

        /*
          direct zustand update
          NO react render loop
        */

        useFluxStore.setState({
          vector:
            evolvedVector,

          universe: {
            ...store.universe,

            atmosphere:
              runtimeResult.instability *
              10,

            pulse:
              runtimeResult.temperature *
              0.06,
          },
        });
      }

      frameId =
        requestAnimationFrame(
          runtimeLoop
        );
    };

    frameId =
      requestAnimationFrame(
        runtimeLoop
      );

    return () => {
      cancelAnimationFrame(
        frameId
      );
    };
  }, []);
}