"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

      router.push("/flux/result");

      return;
    }

    setIndex(nextIndex);
  }

  if (!currentCard) return null;

  return (
    <div className="relative w-[340px] h-[480px]">
      <SwipeCard
        key={currentCard.id}
        card={currentCard}
        onSwipe={handleSwipe}
      />
    </div>
  );
}