"use client";

import { useEffect } from "react";

import SwipeDeck from "@/features/swipe/components/SwipeDeck";

import { useFluxStore } from "@/stores/fluxStore";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

export default function FluxPage() {
  const { vector } =
    useFluxStore();

  /*
    EMOTIONAL ATMOSPHERE
  */

  const atmosphere =
    useMotionValue(0);

  /*
    dynamic atmosphere
  */

  useEffect(() => {
    const totalEmotion =
      vector.loneliness +
      vector.anxiety +
      vector.validation +
      vector.intimacy +
      vector.avoidance +
      vector.resonance +
      vector.rejection +
      vector.obsession +
      vector.emotionalIntensity +
      vector.suppression;

    animate(
      atmosphere,
      Math.min(
        totalEmotion,
        18
      ),
      {
        duration: 1.2,
      }
    );
  }, [
    vector,
    atmosphere,
  ]);

  /*
    background reactions
  */

  const topAuraOpacity =
    useTransform(
      atmosphere,
      [0, 18],
      [0.12, 0.28]
    );

  const bottomAuraOpacity =
    useTransform(
      atmosphere,
      [0, 18],
      [0.08, 0.22]
    );

  const sideAuraOpacity =
    useTransform(
      atmosphere,
      [0, 18],
      [0.08, 0.18]
    );

  const overlayOpacity =
    useTransform(
      atmosphere,
      [0, 18],
      [0.3, 0.5]
    );

  /*
    emotional pulse
  */

  const pulseScale =
    useTransform(
      atmosphere,
      [0, 18],
      [1, 1.08]
    );

  return (
    <main
      className="
        fixed
        inset-0
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* BASE ATMOSPHERE */}

      <motion.div
        style={{
          opacity:
            topAuraOpacity,
        }}
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(124,92,255,0.22),transparent_38%)]
        "
      />

      <motion.div
        style={{
          opacity:
            bottomAuraOpacity,
        }}
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_bottom,rgba(34,211,238,0.18),transparent_42%)]
        "
      />

      {/* AURA LIGHTS */}

      <motion.div
        style={{
          scale: pulseScale,
          opacity:
            topAuraOpacity,
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-[12%]
          h-[480px]
          w-[480px]
          -translate-x-1/2
          rounded-full
          bg-fuchsia-500/10
          blur-[140px]
        "
      />

      <motion.div
        style={{
          scale: pulseScale,
          opacity:
            bottomAuraOpacity,
        }}
        animate={{
          y: [0, 14, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[-120px]
          left-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-cyan-400/10
          blur-[120px]
        "
      />

      <motion.div
        style={{
          opacity:
            sideAuraOpacity,
        }}
        animate={{
          x: [0, -12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-120px]
          top-1/3
          h-[260px]
          w-[260px]
          rounded-full
          bg-violet-500/10
          blur-[100px]
        "
      />

      {/* EXTRA EMOTIONAL FIELD */}

      <motion.div
        style={{
          opacity:
            sideAuraOpacity,
          scale: pulseScale,
        }}
        animate={{
          x: [0, 12, 0],
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[-120px]
          top-[36%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-rose-500/10
          blur-[120px]
        "
      />

      {/* GRAIN */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          mix-blend-screen
          pointer-events-none
        "
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* DARK OVERLAY */}

      <motion.div
        style={{
          opacity:
            overlayOpacity,
        }}
        className="
          absolute
          inset-0
          bg-black
        "
      />

      {/* TOP HUD */}

      <div
        className="
          absolute
          left-0
          top-0
          z-30
          flex
          w-full
          items-start
          justify-between
          px-5
          pt-6
        "
      >
        {/* BRAND */}

        <div>
          <p
            className="
              text-[1.7rem]
              font-semibold
              tracking-[0.28em]
              text-white
            "
          >
            FLUXY
          </p>

          <p
            className="
              mt-2
              text-[10px]
              uppercase
              tracking-[0.28em]
              text-white/28
            "
          >
            emotional feed system
          </p>
        </div>

        {/* LIVE */}

        <motion.div
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
          }}
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-emerald-400/15
            bg-emerald-400/10
            px-3
            py-1.5
            backdrop-blur-xl
          "
        >
          <div className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-emerald-200
            "
          >
            live
          </p>
        </motion.div>
      </div>

      {/* CENTER EXPERIENCE */}

      <div
        className="
          relative
          z-20
          flex
          h-full
          w-full
          items-center
          justify-center
          px-4
        "
      >
        {/* LEFT AMBIENT */}

        <motion.div
          animate={{
            opacity: [
              0.22,
              0.35,
              0.22,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
          className="
            absolute
            left-5
            top-[24%]
            hidden
            max-w-[180px]
            xl:block
          "
        >
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.28em]
              text-white/22
            "
          >
            emotional signal
          </p>

          <p
            className="
              mt-4
              text-sm
              leading-relaxed
              text-white/42
            "
          >
            很多人其實不是不痛苦，
            <br />
            只是已經習慣沉默。
          </p>
        </motion.div>

        {/* RIGHT AMBIENT */}

        <motion.div
          animate={{
            opacity: [
              0.2,
              0.34,
              0.2,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
          }}
          className="
            absolute
            right-5
            top-[28%]
            hidden
            text-right
            xl:block
          "
        >
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.28em]
              text-white/22
            "
          >
            live emotional trend
          </p>

          <div className="mt-4 space-y-3">
            <p className="text-sm text-white/40">
              loneliness ↑
            </p>

            <p className="text-sm text-white/26">
              emotional fatigue
            </p>

            <p className="text-sm text-white/26">
              unread anxiety
            </p>
          </div>
        </motion.div>

        {/* SWIPE CORE */}

        <motion.div
          style={{
            scale: pulseScale,
          }}
          className="relative z-20"
        >
          <SwipeDeck />
        </motion.div>
      </div>

      {/* BOTTOM HUD */}

      <motion.div
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          absolute
          bottom-0
          left-0
          z-30
          w-full
          px-6
          pb-8
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-md
            items-center
            justify-between
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
            px-5
            py-3
            backdrop-blur-2xl
          "
        >
          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.24em]
                text-white/22
              "
            >
              active emotion
            </p>

            <p className="mt-1 text-sm text-white/70">
              suppressed thoughts
            </p>
          </div>

          <div className="text-right">
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.24em]
                text-white/22
              "
            >
              online now
            </p>

            <p className="mt-1 text-sm text-white/70">
              14,291
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}