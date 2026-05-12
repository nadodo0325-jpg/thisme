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
      className="
        absolute
        w-[340px]
        h-[520px]
        rounded-[36px]
        bg-gradient-to-b
        from-zinc-900
        via-zinc-950
        to-black
        border
        border-zinc-800
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
      "
    >
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
        "
      >
        REJECT
      </motion.div>

      {/* GLOW */}

      <motion.div
        style={{
          x,
        }}
        className="
          absolute
          w-[260px]
          h-[260px]
          rounded-full
          bg-white/5
          blur-3xl
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="text-8xl mb-10"
        >
          {card.emoji}
        </motion.div>

        <h2
          className="
            text-4xl
            font-semibold
            leading-snug
            tracking-tight
          "
        >
          {card.text}
        </h2>

        <p
          className="
            mt-10
            text-zinc-500
            text-sm
            tracking-wide
          "
        >
          Swipe if this resonates with you
        </p>
      </div>
    </motion.div>
  );
}