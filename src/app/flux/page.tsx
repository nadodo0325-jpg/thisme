"use client";

import { motion } from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import ResultActions from "@/features/persona/components/ResultActions";

import { usePersonaStore } from "@/stores/personaStore";

export default function ResultPage() {
  const { persona } = usePersonaStore();

  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-black" />
    );
  }

  if (!persona) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        No persona generated.
      </main>
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
      {/* AURA */}

      <div
        className="
          absolute
          w-[500px]
          h-[500px]
          rounded-full
          bg-white/5
          blur-3xl
        "
      />

      {/* CONTENT */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          relative
          z-10
          max-w-xl
          text-center
        "
      >
        {/* LABEL */}

        <p
          className="
            uppercase
            tracking-[0.3em]
            text-sm
            text-zinc-500
            mb-6
          "
        >
          Your Emotional Archetype
        </p>

        {/* TITLE */}

        <h1
          className={`
            text-6xl
            md:text-7xl
            font-bold
            tracking-tight
            mb-6
            ${persona.accent}
          `}
        >
          {persona.archetype}
        </h1>

        {/* DESCRIPTION */}

        <p
          className="
            text-xl
            text-zinc-300
            leading-relaxed
            mb-12
          "
        >
          {persona.description}
        </p>

        {/* QUOTE CARD */}

        <div
          className="
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            rounded-[32px]
            p-8
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

        <div className="mt-10">
          <p className="text-zinc-500 text-sm mb-3">
            Emotional Energy
          </p>

          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
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

        <ResultActions />
      </motion.div>
    </main>
  );
}