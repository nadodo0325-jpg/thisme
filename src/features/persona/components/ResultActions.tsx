"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { useState } from "react";

import { useFluxStore } from "@/stores/fluxStore";

export default function ResultActions() {
  const router = useRouter();

  const { reset } = useFluxStore();

  const [copied, setCopied] =
    useState(false);

  async function handleRestart() {
    /*
      reset state
    */

    reset();

    /*
      clear persisted storage
    */

    localStorage.clear();

    /*
      smoother transition
    */

    setTimeout(() => {
      router.push("/flux");
    }, 120);
  }

  async function handleShare() {
    const shareText =
      "我剛剛在 FLUXY 測出了自己的情緒人格。這東西比想像中還準。";

    /*
      native share
    */

    if (
      navigator.share
    ) {
      try {
        await navigator.share({
          title: "FLUXY",
          text: shareText,
          url:
            window.location.href,
        });

        return;
      } catch {
        console.log(
          "share cancelled"
        );
      }
    }

    /*
      fallback copy
    */

    try {
      await navigator.clipboard.writeText(
        `${shareText}\n${window.location.href}`
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      console.log(
        "copy failed"
      );
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.2,
      }}
      className="
        mt-14
        flex
        flex-col
        gap-4
      "
    >
      {/* PRIMARY */}

      <button
        onClick={handleShare}
        className="
          group
          relative
          overflow-hidden
          rounded-full
          bg-white
          px-7
          py-4
          font-medium
          tracking-wide
          text-black
          transition-all
          duration-300
          hover:scale-[1.02]
          active:scale-[0.98]
        "
      >
        <span className="relative z-10">
          分享我的人格結果
        </span>

        <div
          className="
            absolute
            inset-0
            bg-zinc-200
            opacity-0
            transition
            group-hover:opacity-100
          "
        />
      </button>

      {/* SECONDARY */}

      <button
        onClick={handleRestart}
        className="
          group
          rounded-full
          border
          border-white/10
          bg-white/[0.03]
          px-7
          py-4
          tracking-wide
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:border-white/20
          hover:bg-white/10
          active:scale-[0.98]
        "
      >
        再測一次
      </button>

      {/* SHARE STATUS */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: copied
            ? 1
            : 0,
        }}
        className="
          pt-2
          text-center
          text-sm
          text-white/40
        "
      >
        連結已複製，快丟去 Threads。
      </motion.div>

      {/* SOCIAL HINT */}

      <div
        className="
          mt-4
          text-center
          text-xs
          leading-relaxed
          text-white/20
        "
      >
        已經有很多人正在分享自己的
        <br />
        emotional archetype。
      </div>
    </motion.div>
  );
}