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
    [-18, 18]
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
    [0.97, 1, 0.97]
  );

  /*
    GLOW PARALLAX
  */

  const glowX = useTransform(
    x,
    [-260, 260],
    [-55, 55]
  );

  /*
    LIVE META
  */

  const metaOpacity = useTransform(
    x,
    [-120, 0, 120],
    [0.35, 1, 0.35]
  );

  /*
    VIBE STYLES
  */

  const vibeStyles = {
    soft: {
      glow:
        "from-rose-500/25 via-pink-500/10 to-transparent",

      border:
        "border-rose-400/20",

      accent:
        "text-rose-100",

      orb: "bg-rose-400/20",
    },

    dark: {
      glow:
        "from-zinc-400/20 via-white/[0.03] to-transparent",

      border:
        "border-zinc-400/20",

      accent:
        "text-zinc-100",

      orb: "bg-zinc-300/10",
    },

    dreamy: {
      glow:
        "from-indigo-500/25 via-fuchsia-500/10 to-transparent",

      border:
        "border-indigo-400/20",

      accent:
        "text-indigo-100",

      orb: "bg-indigo-400/20",
    },

    chaotic: {
      glow:
        "from-cyan-500/25 via-sky-500/10 to-transparent",

      border:
        "border-cyan-400/20",

      accent:
        "text-cyan-100",

      orb: "bg-cyan-400/20",
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
      initial={{
        opacity: 0,
        scale: 0.92,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`
        absolute
        flex
        h-[560px]
        w-[340px]
        flex-col
        overflow-hidden
        rounded-[42px]
        border
        bg-[rgba(10,10,10,0.78)]
        px-7
        py-8
        text-center
        shadow-[0_20px_80px_rgba(0,0,0,0.65)]
        backdrop-blur-3xl
        select-none
        touch-none
        cursor-grab
        will-change-transform
        ${vibe.border}
      `}
    >
      {/* BACKGROUND GLOW */}

      <div
        className={`
          absolute
          inset-0
          bg-gradient-to-b
          ${vibe.glow}
          opacity-90
        `}
      />

      {/* TOP LIGHT */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-[180px]
          bg-gradient-to-b
          from-white/[0.06]
          to-transparent
        "
      />

      {/* FLOATING ORB */}

      <motion.div
        style={{
          x: glowX,
        }}
        className={`
          absolute
          left-1/2
          top-[28%]
          h-[280px]
          w-[280px]
          -translate-x-1/2
          rounded-full
          blur-3xl
          ${vibe.orb}
        `}
      />

      {/* GLASS EDGE */}

      <div
        className="
          absolute
          inset-0
          rounded-[42px]
          ring-1
          ring-white/[0.04]
        "
      />

      {/* NOISE */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          mix-blend-screen
          pointer-events-none
          bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
        "
      />

      {/* RIGHT OVERLAY */}

      <motion.div
        style={{
          opacity: rightOpacity,
          scale: rightOpacity,
        }}
        className="
          absolute
          right-6
          top-6
          z-20
          rounded-full
          border
          border-emerald-400/30
          bg-emerald-500/10
          px-5
          py-2
          text-[11px]
          tracking-[0.28em]
          text-emerald-200
          backdrop-blur-xl
        "
      >
        很像我
      </motion.div>

      {/* LEFT OVERLAY */}

      <motion.div
        style={{
          opacity: leftOpacity,
          scale: leftOpacity,
        }}
        className="
          absolute
          left-6
          top-6
          z-20
          rounded-full
          border
          border-rose-400/30
          bg-rose-500/10
          px-5
          py-2
          text-[11px]
          tracking-[0.28em]
          text-rose-200
          backdrop-blur-xl
        "
      >
        不像我
      </motion.div>

      {/* TOP META */}

      <div
        className="
          absolute
          left-1/2
          top-7
          z-20
          -translate-x-1/2
          text-[10px]
          uppercase
          tracking-[0.35em]
          text-white/20
        "
      >
        emotional fragment
      </div>

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          items-center
          justify-center
        "
      >
        {/* EMOJI */}

        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 5.5,
            ease: "easeInOut",
          }}
          className="
            mb-10
            text-[5.5rem]
            drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]
          "
        >
          {card.emoji}
        </motion.div>

        {/* TITLE */}

        <h2
          className={`
            max-w-[290px]
            text-[2.15rem]
            font-semibold
            leading-[1.14]
            tracking-[-0.04em]
            ${vibe.accent}
          `}
        >
          {card.text}
        </h2>

        {/* SUBTEXT */}

        {card.subtext && (
          <p
            className="
              mt-7
              max-w-[260px]
              text-[15px]
              leading-relaxed
              text-white/40
            "
          >
            {card.subtext}
          </p>
        )}

        {/* MICRO COPY */}

        <p
          className="
            mt-8
            text-[13px]
            leading-relaxed
            text-white/22
          "
        >
          有些情緒，
          <br />
          不需要解釋也會被理解。
        </p>
      </div>

      {/* BOTTOM */}

      <div className="relative z-10">
        {/* LIVE META */}

        <motion.div
          style={{
            opacity: metaOpacity,
          }}
          className="
            mx-auto
            mb-5
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
            px-4
            py-2
            text-[10px]
            tracking-[0.22em]
            text-white/35
            backdrop-blur-xl
          "
        >
          <div className="h-2 w-2 rounded-full bg-white/50" />

          78% people felt this too
        </motion.div>

        {/* FOOTER */}

        <p
          className="
            text-center
            text-[11px]
            tracking-[0.24em]
            text-white/15
          "
        >
          跟著直覺滑動 →
        </p>
      </div>
    </motion.div>
  );
}