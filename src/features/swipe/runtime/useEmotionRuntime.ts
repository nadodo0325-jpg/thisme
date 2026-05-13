"use client";

import { useEffect } from "react";

import { useFluxStore } from "@/stores/fluxStore";

import {
  processEmotionRuntime,
} from "../lib/emotionRuntime";

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

        const result =
          processEmotionRuntime(
            store.vector
          );

        /*
          direct zustand update
          NO react render loop
        */

        useFluxStore.setState({
          vector:
            result.vector,

          universe: {
            ...store.universe,

            atmosphere:
              result.instability *
              10,

            pulse:
              result.temperature *
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