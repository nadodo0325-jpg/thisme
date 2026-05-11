"use client";

import { motion } from "framer-motion";

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
  return (
    <motion.div
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) {
          onSwipe("right");
        }

        if (info.offset.x < -120) {
          onSwipe("left");
        }
      }}
      whileTap={{ scale: 0.98 }}
      className="
        absolute
        w-[340px]
        h-[480px]
        rounded-[32px]
        bg-zinc-900
        border
        border-zinc-800
        shadow-2xl
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-8
        cursor-grab
        active:cursor-grabbing
      "
    >
      <div className="text-7xl mb-8">
        {card.emoji}
      </div>

      <h2 className="text-3xl font-semibold leading-snug">
        {card.text}
      </h2>

      <p className="mt-8 text-zinc-500 text-sm">
        Swipe right if this resonates.
      </p>
    </motion.div>
  );
}