"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

import { EmotionCard } from "../types/swipe";

type Props = {
  card: EmotionCard;

  onSwipe: (
    direction: "left" | "right"
  ) => void;
};

export default function SwipeCard({
  card,
  onSwipe,
}: Props) {
  const x = useMotionValue(0);

  /*
    ROTATION
  */

  const rotate = useTransform(
    x,
    [-260, 260],
    [-22, 22]
  );

  /*
    OVERLAYS
  */

  const rightOpacity = useTransform(
    x,
    [20, 140],
    [0, 1]
  );

  const leftOpacity = useTransform(
    x,
    [-140, -20],
    [1, 0]
  );

  /*
    SCALE FEEL
  */

  const cardScale = useTransform(
    x,
    [-260, 0, 260],
    [0.96, 1, 0.96]
  );

  /*
    VIBE STYLES
  */

  const vibeStyles = {
    soft: {
      glow:
        "from-rose-500/20 via-pink-500/10 to-transparent",

      border:
        "border-rose-500/20",
    },

    dark: {
      glow:
        "from-zinc-500/20 via-white/5 to-transparent",

      border:
        "border-zinc-500/20",
    },

    dreamy: {
      glow:
        "from-indigo-500/20 via-fuchsia-500/10 to-transparent",

      border:
        "border-indigo-500/20",
    },

    chaotic: {
      glow:
        "from-cyan-500/20 via-sky-500/10 to-transparent",

      border:
        "border-cyan-500/20",
    },
  };

  const vibe =
    vibeStyles[
      card.vibe || "soft"
    ];

  async function handleDragEnd(
    _: any,
    info: any
  ) {
    const offset =
      info.offset.x;

    const velocity =
      info.velocity.x;

    /*
      NATURAL SWIPE DETECTION
    */

    const shouldSwipeRight =
      offset > 110 ||
      velocity > 650;

    const shouldSwipeLeft =
      offset < -110 ||
      velocity < -650;

    /*
      FLY RIGHT
    */

    if (shouldSwipeRight) {
      await animate(
        x,
        900,
        {
          type: "spring",
          stiffness: 220,
          damping: 24,
        }
      );

      onSwipe("right");

      return;
    }

    /*
      FLY LEFT
    */

    if (shouldSwipeLeft) {
      await animate(
        x,
        -900,
        {
          type: "spring",
          stiffness: 220,
          damping: 24,
        }
      );

      onSwipe("left");

      return;
    }

    /*
      SNAP BACK
    */

    animate(x, 0, {
      type: "spring",
      stiffness: 420,
      damping: 30,
    });
  }

  return (
    <motion.div
      drag="x"
      dragElastic={0.18}
      dragMomentum={true}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      whileTap={{
        scale: 0.985,
        cursor: "grabbing",
      }}
      style={{
        x,
        rotate,
        scale: cardScale,
      }}
      onDragEnd={handleDragEnd}
      className={`
        absolute
        w-[340px]
        h-[540px]
        rounded-[40px]
        bg-gradient-to-b
        from-zinc-900
        via-black
        to-black
        border
        ${vibe.border}
        shadow-2xl
        overflow-hidden
        flex
        flex-col
        items-center
        justify-center
        px-8
        text-center
        select-none
        touch-none
        cursor-grab
        will-change-transform
        backdrop-blur-xl
      `}
    >
      {/* ATMOSPHERE */}

      <div
        className={`
          absolute
          inset-0
          bg-gradient-to-b
          ${vibe.glow}
          opacity-80
        `}
      />

      {/* RIGHT OVERLAY */}

      <motion.div
        style={{
          opacity: rightOpacity,
          scale: rightOpacity,
        }}
        className="
          absolute
          top-8
          right-8
          border
          border-emerald-400
          text-emerald-300
          bg-emerald-500/10
          backdrop-blur-md
          px-5
          py-2
          rounded-full
          text-xs
          font-semibold
          tracking-[0.25em]
          z-20
        "
      >
        RESONATE
      </motion.div>

      {/* LEFT OVERLAY */}

      <motion.div
        style={{
          opacity: leftOpacity,
          scale: leftOpacity,
        }}
        className="
          absolute
          top-8
          left-8
          border
          border-rose-400
          text-rose-300
          bg-rose-500/10
          backdrop-blur-md
          px-5
          py-2
          rounded-full
          text-xs
          font-semibold
          tracking-[0.25em]
          z-20
        "
      >
        REJECT
      </motion.div>

      {/* FLOATING GLOW */}

      <motion.div
        style={{
          x,
        }}
        className="
          absolute
          w-[280px]
          h-[280px]
          rounded-full
          bg-white/5
          blur-3xl
        "
      />

      {/* AI LABEL */}

      <div
        className="
          absolute
          top-8
          left-1/2
          -translate-x-1/2
          text-[10px]
          tracking-[0.35em]
          uppercase
          text-zinc-600
          z-20
        "
      >
        Emotional Scan
      </div>

      {/* CONTENT */}

      <div className="relative z-10">
        {/* EMOJI */}

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="text-8xl mb-10"
        >
          {card.emoji}
        </motion.div>

        {/* MAIN TEXT */}

        <h2
          className="
            text-[2rem]
            leading-[1.2]
            font-semibold
            tracking-tight
            text-white
          "
        >
          {card.text}
        </h2>

        {/* SUBTEXT */}

        {card.subtext && (
          <p
            className="
              mt-8
              text-zinc-500
              text-sm
              leading-relaxed
              max-w-[260px]
              mx-auto
            "
          >
            {card.subtext}
          </p>
        )}

        {/* FOOTER */}

        <p
          className="
            mt-12
            text-[11px]
            tracking-[0.2em]
            uppercase
            text-zinc-700
          "
        >
          swipe based on emotion
        </p>
      </div>
    </motion.div>
  );
}