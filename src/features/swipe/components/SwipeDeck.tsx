"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { motion } from "framer-motion";

import { emotionCards } from "../data/emotions";

import SwipeCard from "./SwipeCard";

import { useFluxStore } from "@/stores/fluxStore";
import { usePersonaStore } from "@/stores/personaStore";

import { generatePersona } from "@/features/persona/engine/personaEngine";

export default function SwipeDeck() {
  const router = useRouter();

  const [index, setIndex] = useState(0);

  const { addEmotion, vector } =
    useFluxStore();

  const { setPersona } =
    usePersonaStore();

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

    let updatedVector = vector;

    if (direction === "right") {
      updatedVector = addEmotion(
        currentCard.id,
        currentCard.weights
      );
    }

    const nextIndex = index + 1;

    if (nextIndex >= emotionCards.length) {
      const persona =
        generatePersona(updatedVector);

      setPersona(persona);

      setTimeout(() => {
        router.push("/flux/result");
      }, 300);

      return;
    }

    setIndex(nextIndex);
  }

  if (!currentCard) return null;

  return (
    <div className="flex flex-col items-center">
      {/* PROGRESS */}

      <div className="w-[340px] mb-6">
        <div className="flex justify-between text-xs text-zinc-500 mb-2">
          <span>
            Emotional Scan
          </span>

          <span>
            {index + 1}/
            {emotionCards.length}
          </span>
        </div>

        <div className="h-[6px] bg-zinc-900 rounded-full overflow-hidden">
          <motion.div
            animate={{
              width: `${progress}%`,
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