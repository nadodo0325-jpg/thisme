"use client";

import { useEffect } from "react";

import SwipeDeck from "@/features/swipe/components/SwipeDeck";

import { useFluxStore } from "@/stores/fluxStore";

import {
  calculateAtmosphere,
  calculateAuraOpacity,
  calculateOverlayOpacity,
  calculatePulseStrength,
  calculateShockwavePower,
} from "@/features/swipe/lib/emotionUniverse";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

export default function FluxPage() {
  const {
    vector,
    universe,
  } = useFluxStore();

  /*
    EMOTIONAL ATMOSPHERE
  */

  const atmosphere =
    useMotionValue(0);

  /*
    LIVE REACTIVE SIGNALS
  */

  const flashLayer =
    useMotionValue(0);

  const pulseBurst =
    useMotionValue(1);

  const shockwaveBurst =
    useMotionValue(0);

  const particlesBoost =
    useMotionValue(0);

  /*
    dynamic atmosphere
  */

  useEffect(() => {
    const totalEmotion =
      calculateAtmosphere(
        vector
      );

    animate(
      atmosphere,
      totalEmotion,
      {
        duration: 1.2,
      }
    );
  }, [
    vector,
    atmosphere,
  ]);

  /*
    REACTIVE UNIVERSE EVENTS
  */

  useEffect(() => {
    if (
      !universe.swipeImpulse &&
      !universe.universePulse &&
      !universe.shockwave
    ) {
      return;
    }

    /*
      fullscreen flash
    */

    flashLayer.set(0.55);

    animate(
      flashLayer,
      0,
      {
        duration: 0.9,
        ease: "easeOut",
      }
    );

    /*
      universe pulse burst
    */

    pulseBurst.set(1.24);

    animate(
      pulseBurst,
      1,
      {
        duration: 1.4,
        ease: "easeOut",
      }
    );

    /*
      shockwave explode
    */

    shockwaveBurst.set(1);

    animate(
      shockwaveBurst,
      0,
      {
        duration: 1.8,
        ease: "easeOut",
      }
    );

    /*
      particles response
    */

    particlesBoost.set(1);

    animate(
      particlesBoost,
      0,
      {
        duration: 2.2,
        ease: "easeOut",
      }
    );
  }, [
    universe.swipeImpulse,
    universe.universePulse,
    universe.shockwave,
    flashLayer,
    pulseBurst,
    shockwaveBurst,
    particlesBoost,
  ]);

  /*
    background reactions
  */

  const topAuraOpacity =
    useTransform(
      atmosphere,
      (value) =>
        calculateAuraOpacity(
          value
        ).top
    );

  const bottomAuraOpacity =
    useTransform(
      atmosphere,
      (value) =>
        calculateAuraOpacity(
          value
        ).bottom
    );

  const sideAuraOpacity =
    useTransform(
      atmosphere,
      (value) =>
        calculateAuraOpacity(
          value
        ).side
    );

  const overlayOpacity =
    useTransform(
      atmosphere,
      (value) =>
        calculateOverlayOpacity(
          value
        )
    );

  /*
    emotional pulse
  */

  const pulseScale =
    useTransform(
      atmosphere,
      (value) =>
        calculatePulseStrength(
          value
        )
    );

  /*
    NEW:
    fullscreen flash layer
  */

  const flashOpacity =
    useTransform(
      flashLayer,
      [0, 1],
      [0, 0.85]
    );

  /*
    NEW:
    emotion shockwave
  */

  const shockwaveScale =
    useTransform(
      shockwaveBurst,
      [0, 1],
      [1, 2.4]
    );

  const shockwaveOpacity =
    useTransform(
      atmosphere,
      (value) =>
        calculateShockwavePower(
          value
        )
    );

  /*
    NEW:
    breathing gradients
  */

  const breathingScale =
    useTransform(
      atmosphere,
      [0, 18],
      [1, 1.18]
    );

  /*
    LIVE PULSE BURST
  */

  const reactivePulseScale =
    useTransform(
      pulseBurst,
      [1, 1.24],
      [1, 1.24]
    );

  /*
    PARTICLE ENERGY
  */

  const particleOpacity =
    useTransform(
      particlesBoost,
      [0, 1],
      [0.18, 0.95]
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
      {/* FULLSCREEN FLASH LAYER */}

      <motion.div
        style={{
          opacity:
            flashOpacity,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[60]
          bg-white
          mix-blend-soft-light
        "
      />

      {/* BASE ATMOSPHERE */}

      <motion.div
        style={{
          opacity:
            topAuraOpacity,
          scale:
            breathingScale,
        }}
        animate={{
          scale: [
            1,
            1.08,
            1,
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
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
          scale:
            breathingScale,
        }}
        animate={{
          scale: [
            1,
            1.06,
            1,
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_bottom,rgba(34,211,238,0.18),transparent_42%)]
        "
      />

      {/* REACTIVE PULSE BURST */}

      <motion.div
        style={{
          scale:
            reactivePulseScale,
        }}
        className="
          absolute
          inset-0
          z-[1]
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_55%)]
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

      {/* SHOCKWAVE EXPLODE */}

      <motion.div
        style={{
          scale:
            shockwaveScale,
          opacity:
            shockwaveOpacity,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[4]
          h-[900px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-fuchsia-400/25
          blur-[2px]
        "
      />

      <motion.div
        style={{
          scale:
            shockwaveScale,
          opacity:
            shockwaveOpacity,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[3]
          h-[620px]
          w-[620px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-cyan-300/20
        "
      />

      {/* REACTIVE PARTICLES */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          overflow-hidden
        "
      >
        {Array.from({
          length: 28,
        }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: `${
                2 +
                (i % 4)
              }px`,
              height: `${
                2 +
                (i % 4)
              }px`,
              left: `${
                (i * 4.2) %
                100
              }%`,
              top: `${
                62 +
                ((i * 5) %
                  24)
              }%`,
              opacity:
                particleOpacity,
            }}
            animate={{
              y: [
                0,
                -160,
              ],
              opacity: [
                0,
                1,
                0,
              ],
              x: [
                0,
                i % 2 === 0
                  ? 40
                  : -40,
              ],
              scale: [
                0.8,
                1.4,
                0.6,
              ],
            }}
            transition={{
              repeat: Infinity,
              duration:
                5 + i * 0.24,
              delay:
                i * 0.08,
              ease: "linear",
            }}
            className="
              absolute
              rounded-full
              bg-white/40
              blur-[1px]
            "
          />
        ))}
      </div>

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