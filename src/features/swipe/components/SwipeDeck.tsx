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

const liveStats = [
  "今晚最多人卡住的情緒是『已讀不回』",
  "72% people paused before swiping",
  "凌晨 1:43 是情緒活躍高峰",
  "avoidance energy 正在快速上升",
  "這週最多人害怕的是『突然冷淡』",
  "很多人其實沒有看起來那麼穩定",
];

const dynamicMessages = [
  "很多人其實也有一樣的情緒",
  "AI 正在拼湊你的 emotional pattern",
  "你開始露出真正的自己了",
  "有些情緒其實藏不住",
  "你的情緒輪廓越來越清晰",
  "你滑動的速度也透露了很多事",
  "有些選擇，比你以為的更真實",
];

type GestureState =
  | "idle"
  | "resonate"
  | "reject"
  | "intense"
  | "suppress";

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

  const [aiMessage, setAiMessage] =
    useState("");

  const [liveMessage, setLiveMessage] =
    useState(liveStats[0]);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const [hasRestored, setHasRestored] =
    useState(false);

  /*
    emotional gesture state
  */

  const [gestureState, setGestureState] =
    useState<GestureState>("idle");

  /*
    hydration
  */

  useEffect(() => {
    setHydrated(true);
  }, []);

  /*
    restore
  */

  useEffect(() => {
    if (!hydrated) return;

    if (hasRestored) return;

    setIndex(emotions.length);

    setHasRestored(true);
  }, [
    hydrated,
    emotions.length,
    hasRestored,
  ]);

  /*
    rotating feed
  */

  useEffect(() => {
    const interval =
      setInterval(() => {
        const random =
          Math.floor(
            Math.random() *
              liveStats.length
          );

        setLiveMessage(
          liveStats[random]
        );
      }, 3600);

    return () =>
      clearInterval(interval);
  }, []);

  const currentCard =
    emotionCards[index];

  const nextCard =
    emotionCards[index + 1];

  /*
    progress
  */

  const progress = useMemo(() => {
    return (
      (index /
        emotionCards.length) *
      100
    );
  }, [index]);

  /*
    swipe
  */

  function handleSwipe(
    direction:
      | "left"
      | "right"
      | "up"
      | "down"
  ) {
    if (
      !currentCard ||
      isTransitioning
    ) {
      return;
    }

    setIsTransitioning(true);

    /*
      emotional reactions
    */

    if (direction === "right") {
      setGestureState(
        "resonate"
      );

      /*
        resonance
      */

      addEmotion(
        currentCard.id,
        {
          ...currentCard.weights,
          resonance: 1,
        }
      );
    }

    if (direction === "left") {
      setGestureState("reject");

      /*
        rejection
      */

      addEmotion(
        currentCard.id,
        {
          rejection: 1,
        }
      );
    }

    if (direction === "up") {
      setGestureState("intense");

      /*
        amplification
      */

      addEmotion(
        currentCard.id,
        {
          ...currentCard.weights,
          obsession: 1.4,
          emotionalIntensity: 1,
        }
      );
    }

    if (direction === "down") {
      setGestureState("suppress");

      /*
        suppression
      */

      addEmotion(
        currentCard.id,
        {
          suppression: 1.2,
          avoidance: 1,
        }
      );
    }

    /*
      ai response
    */

    let reply = "";

    if (direction === "right") {
      reply =
        currentCard.aiReply
          ?.resonate ||
        "你對這個情緒產生了共鳴。";
    }

    if (direction === "left") {
      reply =
        currentCard.aiReply
          ?.reject ||
        "你正在抗拒這個情緒。";
    }

    if (direction === "up") {
      reply =
        "你放大了這個情緒。";
    }

    if (direction === "down") {
      reply =
        "你選擇把情緒壓了下去。";
    }

    if (reply) {
      setAiMessage(reply);
    }

    /*
      live emotional update
    */

    const randomDynamic =
      dynamicMessages[
        Math.floor(
          Math.random() *
            dynamicMessages.length
        )
      ];

    setLiveMessage(
      randomDynamic
    );

    const nextIndex = index + 1;

    /*
      result
    */

    if (
      nextIndex >=
      emotionCards.length
    ) {
      setTimeout(() => {
        router.push(
          "/flux/result"
        );
      }, 1700);

      return;
    }

    /*
      pacing
    */

    setTimeout(() => {
      setAiMessage("");

      setGestureState("idle");

      setIndex(nextIndex);

      setIsTransitioning(false);
    }, 900);
  }

  /*
    hydration guard
  */

  if (!hydrated) {
    return null;
  }

  /*
    completed
  */

  if (!currentCard) {
    return (
      <div className="text-white/30">
        generating result...
      </div>
    );
  }

  /*
    gesture visuals
  */

  const gestureLabel =
    gestureState ===
    "resonate"
      ? "resonating..."
      : gestureState ===
        "reject"
      ? "rejecting..."
      : gestureState ===
        "intense"
      ? "too intense..."
      : gestureState ===
        "suppress"
      ? "emotion suppressed..."
      : "";

  return (
    <div className="flex w-full flex-col items-center">
      {/* EMOTIONAL AURA */}

      <AnimatePresence>
        {gestureState !== "idle" && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.2,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              z-0
              h-[420px]
              w-[420px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              blur-[120px]
            "
            style={{
              background:
                gestureState ===
                "resonate"
                  ? "rgba(255,255,255,0.14)"
                  : gestureState ===
                    "intense"
                  ? "rgba(168,85,247,0.16)"
                  : gestureState ===
                    "suppress"
                  ? "rgba(34,211,238,0.12)"
                  : "rgba(120,120,255,0.12)",
            }}
          />
        )}
      </AnimatePresence>

      {/* LIVE BAR */}

      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          z-10
          mb-5
          flex
          w-full
          max-w-[360px]
          items-center
          gap-3
          rounded-full
          border
          border-white/10
          bg-white/[0.04]
          px-4
          py-2.5
          backdrop-blur-2xl
        "
      >
        <div
          className="
            relative
            flex
            items-center
            justify-center
          "
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400" />

          <div
            className="
              absolute
              h-2
              w-2
              rounded-full
              bg-emerald-400
              animate-ping
            "
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={liveMessage}
            initial={{
              opacity: 0,
              y: 6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -6,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              text-[11px]
              tracking-[0.12em]
              text-white/45
            "
          >
            {liveMessage}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* PROGRESS */}

      <div className="relative z-10 mb-6 w-full max-w-[360px]">
        <div
          className="
            mb-3
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.22em]
                text-white/25
              "
            >
              emotional scan
            </p>

            <p className="mt-1 text-xs text-white/35">
              AI 正在讀取你的情緒偏移
            </p>
          </div>

          <div
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              px-3
              py-1
              text-xs
              text-white/35
              backdrop-blur-xl
            "
          >
            {Math.min(
              index + 1,
              emotionCards.length
            )}
            /{emotionCards.length}
          </div>
        </div>

        <div
          className="
            relative
            h-[8px]
            overflow-hidden
            rounded-full
            bg-white/[0.05]
          "
        >
          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="
              absolute
              left-0
              top-0
              h-full
              rounded-full
              bg-white
            "
          />

          <motion.div
            animate={{
              x: [
                "-20%",
                "120%",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "linear",
            }}
            className="
              absolute
              top-0
              h-full
              w-[20%]
              bg-white/30
              blur-md
            "
          />
        </div>
      </div>

      {/* GESTURE STATE */}

      <div className="relative z-10 mb-4 h-[28px]">
        <AnimatePresence mode="wait">
          {gestureLabel && (
            <motion.p
              key={gestureLabel}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="
                text-sm
                tracking-[0.18em]
                text-white/32
                uppercase
              "
            >
              {gestureLabel}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* AI FEELING */}

      <div className="relative z-10 mb-4 flex h-[82px] items-center justify-center">
        <AnimatePresence mode="wait">
          {aiMessage && (
            <motion.div
              key={aiMessage}
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.96,
                filter:
                  "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter:
                  "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.96,
                filter:
                  "blur(8px)",
              }}
              transition={{
                duration: 0.45,
              }}
              className="
                max-w-[320px]
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/[0.045]
                  px-5
                  py-4
                  backdrop-blur-2xl
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.04]
                    to-transparent
                  "
                />

                <p
                  className="
                    relative
                    text-center
                    text-sm
                    leading-relaxed
                    tracking-wide
                    text-white/72
                  "
                >
                  {aiMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CARD STACK */}

      <div className="relative h-[580px] w-[340px] max-w-full">
        {nextCard && (
          <motion.div
            animate={{
              scale: 0.93,
              y: 22,
              opacity: 0.22,
            }}
            className="
              absolute
              inset-0
              rounded-[44px]
              border
              border-white/5
              bg-white/[0.02]
              blur-[1px]
            "
          />
        )}

        {nextCard && (
          <motion.div
            animate={{
              scale: 0.965,
              y: 10,
              opacity: 0.45,
            }}
            className="
              absolute
              inset-0
              rounded-[44px]
              border
              border-white/8
              bg-white/[0.025]
            "
          />
        )}

        <AnimatePresence mode="wait">
          <SwipeCard
            key={currentCard.id}
            card={currentCard}
            onSwipe={handleSwipe}
          />
        </AnimatePresence>
      </div>

      {/* BOTTOM ACTION */}

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
          mt-6
          flex
          items-center
          gap-8
          text-sm
          tracking-wide
          text-white/28
        "
      >
        <div className="flex items-center gap-3">
          <span>← reject</span>

          <span className="text-white/12">
            ↑ intense
          </span>
        </div>

        <div
          className="
            h-1
            w-1
            rounded-full
            bg-white/15
          "
        />

        <div className="flex items-center gap-3">
          <span className="text-white/12">
            suppress ↓
          </span>

          <span>resonate →</span>
        </div>
      </motion.div>

      {/* FOOTNOTE */}

      <p
        className="
          mt-5
          text-center
          text-xs
          leading-relaxed
          text-white/16
        "
      >
        AI 不只在分析答案。
        <br />
        也正在讀取你的情緒節奏。
      </p>
    </div>
  );
}