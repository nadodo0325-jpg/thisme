"use client";

import { useEffect } from "react";

import { useFluxStore } from "@/stores/fluxStore";

import {
  processEmotionRuntime,
} from "../lib/emotionRuntime";

import {
  evolveUniverse,
} from "./universeEvolution";

import { runtimeDebug } from "./runtimeDebug";

export function useEmotionRuntime() {
  useEffect(() => {
    let frameId = 0;

    let tickCount = 0;

    let lastUpdate =
      performance.now();

    const LOOP_INTERVAL = 120;

    runtimeDebug(
      "RUNTIME_START"
    );

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

        tickCount += 1;

        if (
          tickCount % 20 ===
          0
        ) {
          runtimeDebug(
            "RUNTIME_TICK",
            {
              tickCount,

              atmosphere:
                store.universe
                  .atmosphere,
            }
          );
        }

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
      runtimeDebug(
        "RUNTIME_STOP"
      );

      cancelAnimationFrame(
        frameId
      );
    };
  }, []);
}