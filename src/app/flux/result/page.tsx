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

import type {
  ArchetypeType,
  ToneType,
} from "@/types/global";

const rarityMap: Partial<
  Record<ArchetypeType, string>
> = {
  高敏感人格:
    "Top 6% rare emotional pattern",

  安全感飢渴者:
    "Top 8% attachment intensity type",

  疏離型依戀者:
    "Top 4% emotional suppression type",

  安靜共感者:
    "Top 11% reflective emotional type",
};

const auraMap: Partial<
  Record<ToneType, string>
> = {
  soft: "rose aura",

  cold: "ghost aura",

  poetic: "midnight aura",

  chaotic: "neon aura",
};

const tagMap: Partial<
  Record<ArchetypeType, string[]>
> = {
  高敏感人格: [
    "emotionally deep",
    "late night overthinking",
    "quiet attachment",
  ],

  安全感飢渴者: [
    "connection craving",
    "emotion seeking",
    "attachment driven",
  ],

  疏離型依戀者: [
    "emotionally distant",
    "protective avoidance",
    "silent observer",
  ],

  安靜共感者: [
    "gentle energy",
    "emotionally reflective",
    "carefully vulnerable",
  ],
};

export default function ResultPage() {
  const { vector } = useFluxStore();

  const [hydrated, setHydrated] =
    useState(false);

  const [phase, setPhase] =
    useState(0);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const persona = useMemo(() => {
    return generatePersona(vector);
  }, [vector]);

  const rarity =
    rarityMap[
      persona.archetype
    ] ??
    "Rare emotional pattern";

  const aura =
    auraMap[persona.tone] ??
    "emotional aura";

  const tags =
    tagMap[
      persona.archetype
    ] ?? [
      "emotionally aware",
      "sensitive",
      "reflective",
    ];

  /*
    cinematic reveal
  */

  useEffect(() => {
    if (!hydrated) return;

    const timers = [
      setTimeout(() => {
        setPhase(1);
      }, 1000),

      setTimeout(() => {
        setPhase(2);
      }, 2400),

      setTimeout(() => {
        setPhase(3);
      }, 4200),
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
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-b
        ${persona.gradient}
        px-4
        pb-16
        pt-10
        text-white
      `}
    >
      {/* BACKGROUND LIGHT */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.65, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-[10%]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[-80px]
          left-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-fuchsia-500/10
          blur-3xl
        "
      />

      {/* NOISE */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          pointer-events-none
        "
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[430px]
          flex-col
          items-center
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
              mt-24
              flex
              flex-col
              items-center
              gap-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                bg-white/[0.05]
                px-5
                py-3
                backdrop-blur-2xl
              "
            >
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.3em]
                  text-white/40
                "
              >
                emotional scan
              </p>
            </div>

            <p
              className="
                text-center
                text-sm
                leading-relaxed
                tracking-[0.18em]
                text-white/35
              "
            >
              正在重建你的情緒輪廓...
            </p>
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
            className="
              mt-10
              text-center
            "
          >
            <p
              className="
                text-[1.75rem]
                font-light
                leading-[1.45]
                text-white/90
              "
            >
              你總是在感受很多事情，
              <br />
              卻很少真的說出口。
            </p>

            <p
              className="
                mt-5
                text-[11px]
                uppercase
                tracking-[0.28em]
                text-white/25
              "
            >
              emotional pattern detected
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
            className="
              mt-10
              w-full
            "
          >
            {/* SHARE CARD */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[42px]
                border
                border-white/10
                bg-white/[0.06]
                p-7
                shadow-[0_0_80px_rgba(255,255,255,0.06)]
                backdrop-blur-3xl
              "
            >
              {/* inner light */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-white/[0.06]
                  via-transparent
                  to-transparent
                "
              />

              {/* aura */}

              <div
                className="
                  absolute
                  left-1/2
                  top-[-120px]
                  h-[260px]
                  w-[260px]
                  -translate-x-1/2
                  rounded-full
                  bg-white/10
                  blur-3xl
                "
              />

              <div className="relative z-10">
                {/* top */}

                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-white/25
                      "
                    >
                      emotional archetype
                    </p>

                    <p
                      className="
                        mt-2
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-white/40
                      "
                    >
                      {aura}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-3
                      py-1
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-white/45
                      backdrop-blur-xl
                    "
                  >
                    FLUXY
                  </div>
                </div>

                {/* title */}

                <div className="mt-12">
                  <h1
                    className={`
                      text-[2.8rem]
                      font-semibold
                      leading-[0.95]
                      tracking-tight
                      ${persona.accent}
                    `}
                  >
                    {persona.archetype}
                  </h1>

                  <p
                    className="
                      mt-5
                      text-base
                      leading-relaxed
                      text-white/60
                    "
                  >
                    {persona.description}
                  </p>
                </div>

                {/* rarity */}

                <div
                  className="
                    mt-8
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.05]
                    px-4
                    py-2
                    text-[11px]
                    tracking-[0.18em]
                    text-white/50
                    backdrop-blur-xl
                  "
                >
                  {rarity}
                </div>

                {/* tags */}

                <div className="mt-8 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-2
                        text-xs
                        text-white/60
                        backdrop-blur-xl
                      "
                    >
                      #{tag}
                    </div>
                  ))}
                </div>

                {/* quote */}

                <div
                  className="
                    mt-10
                    rounded-[28px]
                    border
                    border-white/10
                    bg-black/20
                    p-6
                    backdrop-blur-xl
                  "
                >
                  <p
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.28em]
                      text-white/25
                    "
                  >
                    inner signal
                  </p>

                  <p
                    className="
                      mt-4
                      text-xl
                      font-light
                      leading-relaxed
                      text-white/88
                    "
                  >
                    「{persona.quote}」
                  </p>
                </div>

                {/* energy */}

                <div className="mt-10">
                  <div className="mb-4 flex items-center gap-3">
                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                        text-white/25
                      "
                    >
                      emotional energy
                    </p>

                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <div className="flex gap-2">
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
                          flex-1
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

                {/* bottom */}

                <div
                  className="
                    mt-10
                    flex
                    items-center
                    justify-between
                    text-[11px]
                    tracking-[0.16em]
                    text-white/25
                  "
                >
                  <p>
                    synced with FLUXY
                  </p>

                  <p>
                    emotional mirror
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 3 */}

        {phase >= 3 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="
              mt-10
              w-full
              text-center
            "
          >
            {/* LIVE META */}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                px-6
                py-5
                text-sm
                leading-relaxed
                text-white/45
                backdrop-blur-2xl
              "
            >
              本週有 32% 的人與你共享相似情緒頻率
              <br />
              凌晨時段最容易進入這種 emotional state
            </div>

            {/* ACTIONS */}

            <ResultActions />
          </motion.div>
        )}
      </div>
    </main>
  );
}