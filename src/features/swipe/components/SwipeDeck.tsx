"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { emotionCards } from "../data/emotions";

import SwipeCard from "./SwipeCard";

import { useFluxStore } from "@/stores/fluxStore";

export default function SwipeDeck() {
  const router = useRouter();

  const {
    addEmotion,
    emotions,
  } = useFluxStore();

  const [index, setIndex] =
    useState(0);

  const [hydrated, setHydrated] =
    useState(false);

  /*
    AI reaction
  */

  const [aiMessage, setAiMessage] =
    useState("");

  /*
    hydration
  */

  useEffect(() => {
    setHydrated(true);
  }, []);

  /*
    restore progress
  */

  useEffect(() => {
    if (!hydrated) return;

    setIndex(emotions.length);
  }, [hydrated, emotions.length]);

  const currentCard =
    emotionCards[index];

  const nextCard =
    emotionCards[index + 1];

  /*
    progress
  */

  const progress = useMemo(() => {
    return (
      ((index + 1) /
        emotionCards.length) *
      100
    );
  }, [index]);

  /*
    swipe
  */

  function handleSwipe(
    direction: "left" | "right"
  ) {
    if (!currentCard) return;

    /*
      emotion accumulation
    */

    if (direction === "right") {
      addEmotion(
        currentCard.id,
        currentCard.weights
      );
    }

    /*
      AI reply
    */

    const reply =
      direction === "right"
        ? currentCard.aiReply
            ?.resonate
        : currentCard.aiReply
            ?.reject;

    if (reply) {
      setAiMessage(reply);
    }

    const nextIndex = index + 1;

    /*
      final transition
    */

    if (nextIndex >= emotionCards.length) {
      setTimeout(() => {
        router.push("/flux/result");
      }, 1400);

      return;
    }

    /*
      cinematic pacing
    */

    setTimeout(() => {
      setAiMessage("");

      setIndex(nextIndex);
    }, 1000);
  }

  /*
    hydration guard
  */

  if (!hydrated) {
    return null;
  }

  /*
    complete
  */

  if (!currentCard) {
    return (
      <div className="text-zinc-500">
        Entering result...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* PROGRESS */}

      <div className="w-[340px] mb-8">
        <div className="flex justify-between text-xs text-zinc-500 mb-2 tracking-wide">
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

        <div
          className="
            h-[6px]
            bg-zinc-900
            rounded-full
            overflow-hidden
            border
            border-zinc-800
          "
        >
          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="
              h-full
              bg-white
            "
          />
        </div>
      </div>

      {/* AI MESSAGE */}

      <AnimatePresence mode="wait">
        {aiMessage && (
          <motion.div
            key={aiMessage}
            initial={{
              opacity: 0,
              y: 10,
              filter:
                "blur(6px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -10,
              filter:
                "blur(6px)",
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              mb-6
              text-center
              text-sm
              text-zinc-400
              tracking-wide
              max-w-[280px]
              min-h-[40px]
              leading-relaxed
            "
          >
            {aiMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* STACK */}

      <div className="relative w-[340px] h-[540px]">
        {/* DEPTH CARD 2 */}

        {nextCard && (
          <motion.div
            animate={{
              scale: 0.94,
              y: 18,
              opacity: 0.35,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              absolute
              inset-0
              rounded-[40px]
              bg-zinc-950
              border
              border-zinc-900
              blur-[0.3px]
            "
          />
        )}

        {/* DEPTH CARD 1 */}

        {nextCard && (
          <motion.div
            animate={{
              scale: 0.97,
              y: 8,
              opacity: 0.6,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              absolute
              inset-0
              rounded-[40px]
              bg-zinc-900
              border
              border-zinc-800
            "
          />
        )}

        {/* ACTIVE CARD */}

        <AnimatePresence mode="wait">
          <SwipeCard
            key={currentCard.id}
            card={currentCard}
            onSwipe={handleSwipe}
          />
        </AnimatePresence>
      </div>

      {/* HINTS */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
        }}
        className="
          mt-8
          flex
          gap-10
          text-sm
          text-zinc-600
          tracking-wide
        "
      >
        <span>
          ← Reject
        </span>

        <span>
          Resonates →
        </span>
      </motion.div>
    </div>
  );
}