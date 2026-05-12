"use client";

import { motion } from "framer-motion";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ResultActions from "@/features/persona/components/ResultActions";

import { generatePersona } from "@/features/persona/engine/personaEngine";

import { useFluxStore } from "@/stores/fluxStore";

export default function ResultPage() {
  const { vector } = useFluxStore();

  const [hydrated, setHydrated] =
    useState(false);

  /*
    emergence phases
  */

  const [phase, setPhase] =
    useState(0);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const persona = useMemo(() => {
    return generatePersona(vector);
  }, [vector]);

  /*
    cinematic reveal
  */

  useEffect(() => {
    if (!hydrated) return;

    const timers = [
      setTimeout(() => {
        setPhase(1);
      }, 1200),

      setTimeout(() => {
        setPhase(2);
      }, 3200),

      setTimeout(() => {
        setPhase(3);
      }, 5200),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [hydrated]);

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-black" />
    );
  }

  return (
    <main
      className={`
        min-h-screen
        bg-gradient-to-b
        ${persona.gradient}
        text-white
        relative
        overflow-hidden
        flex
        items-center
        justify-center
        px-6
      `}
    >
      {/* BACKGROUND AURA */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          w-[600px]
          h-[600px]
          rounded-full
          bg-white/5
          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          max-w-2xl
          text-center
        "
      >
        {/* PHASE 0 */}

        {phase === 0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              text-zinc-500
              tracking-[0.3em]
              uppercase
              text-sm
            "
          >
            Analyzing emotional patterns...
          </motion.div>
        )}

        {/* PHASE 1 */}

        {phase >= 1 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              filter:
                "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
            }}
            transition={{
              duration: 1,
            }}
            className="mb-10"
          >
            <p
              className="
                text-2xl
                md:text-3xl
                leading-relaxed
                font-light
                text-zinc-200
              "
            >
              You keep people close...
              <br />
              but never fully let them
              stay.
            </p>
          </motion.div>
        )}

        {/* PHASE 2 */}

        {phase >= 2 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              filter:
                "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
            }}
            transition={{
              duration: 1,
            }}
            className="mb-14"
          >
            <p
              className="
                uppercase
                tracking-[0.35em]
                text-xs
                text-zinc-500
                mb-6
              "
            >
              Emotional archetype detected
            </p>

            <h1
              className={`
                text-6xl
                md:text-8xl
                font-bold
                tracking-tight
                ${persona.accent}
              `}
            >
              {persona.archetype}
            </h1>
          </motion.div>
        )}

        {/* PHASE 3 */}

        {phase >= 3 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
          >
            {/* DESCRIPTION */}

            <p
              className="
                text-xl
                text-zinc-300
                leading-relaxed
                mb-12
                max-w-xl
                mx-auto
              "
            >
              {persona.description}
            </p>

            {/* QUOTE */}

            <div
              className="
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                rounded-[36px]
                p-10
              "
            >
              <p
                className="
                  text-2xl
                  leading-relaxed
                  font-light
                "
              >
                “{persona.quote}”
              </p>
            </div>

            {/* ENERGY */}

            <div className="mt-12">
              <p className="text-zinc-500 text-sm mb-4 tracking-wide">
                Emotional Energy
              </p>

              <div className="flex justify-center gap-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: i * 0.15,
                    }}
                    className={`
                      h-2
                      w-16
                      rounded-full

                      ${
                        i <=
                        (persona.energy ===
                        "high"
                          ? 3
                          : persona.energy ===
                            "medium"
                          ? 2
                          : 1)
                          ? "bg-white"
                          : "bg-white/10"
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            {/* ACTIONS */}

            <ResultActions />
          </motion.div>
        )}
      </div>
    </main>
  );
}