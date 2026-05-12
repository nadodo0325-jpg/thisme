"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { emotionCards } from "../data/emotions";

import SwipeCard from "./SwipeCard";

import { useFluxStore } from "@/stores/fluxStore";

export default function SwipeDeck() {
  const router = useRouter();

  const {
    addEmotion,
    vector,
    emotions,
  } = useFluxStore();

  const [index, setIndex] = useState(0);

  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  /*
    IMPORTANT

    restore swipe progress
  */

  useEffect(() => {
    if (!hydrated) return;

    setIndex(emotions.length);
  }, [hydrated, emotions.length]);

  const currentCard =
    emotionCards[index];

  const nextCard =
    emotionCards[index + 1];

  const progress = useMemo(() => {
    return (
      ((index + 1) /
        emotionCards.length) *
      100
    );
  }, [index]);

  function handleSwipe(
    direction: "left" | "right"
  ) {
    if (!currentCard) return;

    if (direction === "right") {
      addEmotion(
        currentCard.id,
        currentCard.weights
      );
    }

    const nextIndex = index + 1;

    /*
      FINISHED
    */

    if (nextIndex >= emotionCards.length) {
      setTimeout(() => {
        router.push("/flux/result");
      }, 250);

      return;
    }

    setIndex(nextIndex);
  }

  /*
    hydration guard
  */

  if (!hydrated) {
    return null;
  }

  /*
    all cards completed
  */

  if (!currentCard) {
    return (
      <div className="text-zinc-500">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* PROGRESS */}

      <div className="w-[340px] mb-6">
        <div className="flex justify-between text-xs text-zinc-500 mb-2">
          <span>
            Emotional Scan
          </span>

          <span>
            {Math.min(
              index + 1,
              emotionCards.length
            )}
            /{emotionCards.length}
          </span>
        </div>

        <div className="h-[6px] bg-zinc-900 rounded-full overflow-hidden">
          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.25,
            }}
            className="h-full bg-white"
          />
        </div>
      </div>

      {/* CARD STACK */}

      <div className="relative w-[340px] h-[520px]">
        {/* NEXT CARD */}

        {nextCard && (
          <div
            className="
              absolute
              inset-0
              scale-[0.96]
              translate-y-3
              rounded-[36px]
              bg-zinc-900/60
              border
              border-zinc-800
            "
          />
        )}

        {/* CURRENT CARD */}

        <SwipeCard
          key={currentCard.id}
          card={currentCard}
          onSwipe={handleSwipe}
        />
      </div>

      {/* HINTS */}

      <div className="mt-8 flex gap-8 text-sm text-zinc-600">
        <span>
          ← Reject
        </span>

        <span>
          Resonates →
        </span>
      </div>
    </div>
  );
}