"use client";

import {
  motion,
  useMotionValue,
  useTransform,
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

  const rotate = useTransform(
    x,
    [-200, 200],
    [-18, 18]
  );

  const rightOpacity = useTransform(
    x,
    [0, 120],
    [0, 1]
  );

  const leftOpacity = useTransform(
    x,
    [-120, 0],
    [1, 0]
  );

  return (
    <motion.div
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      style={{
        x,
        rotate,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) {
          onSwipe("right");
        }

        if (info.offset.x < -120) {
          onSwipe("left");
        }
      }}
      className="
        absolute
        w-[340px]
        h-[520px]
        rounded-[36px]
        bg-gradient-to-b
        from-zinc-900
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
        cursor-grab
        active:cursor-grabbing
      "
    >
      {/* RIGHT OVERLAY */}

      <motion.div
        style={{
          opacity: rightOpacity,
        }}
        className="
          absolute
          top-8
          right-8
          border
          border-green-400
          text-green-400
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          tracking-widest
        "
      >
        RESONATE
      </motion.div>

      {/* LEFT OVERLAY */}

      <motion.div
        style={{
          opacity: leftOpacity,
        }}
        className="
          absolute
          top-8
          left-8
          border
          border-red-400
          text-red-400
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          tracking-widest
        "
      >
        REJECT
      </motion.div>

      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          w-[220px]
          h-[220px]
          rounded-full
          bg-white/5
          blur-3xl
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        <div className="text-8xl mb-10">
          {card.emoji}
        </div>

        <h2 className="text-4xl font-semibold leading-snug">
          {card.text}
        </h2>

        <p className="mt-10 text-zinc-500 text-sm tracking-wide">
          Swipe if this feels like you
        </p>
      </div>
    </motion.div>
  );
}