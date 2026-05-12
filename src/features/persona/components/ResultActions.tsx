"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { useFluxStore } from "@/stores/fluxStore";

export default function ResultActions() {
  const router = useRouter();

  const { reset } = useFluxStore();

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
    try {
      await navigator.share({
        title: "FLUXY",
        text: "I just uncovered my emotional archetype on FLUXY.",
        url: window.location.href,
      });
    } catch {
      console.log("share cancelled");
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
      className="flex flex-col gap-4 mt-14"
    >
      {/* PRIMARY */}

      <button
        onClick={handleRestart}
        className="
          group
          relative
          overflow-hidden
          px-7
          py-4
          rounded-full
          bg-white
          text-black
          font-medium
          tracking-wide
          transition-all
          duration-300
          hover:scale-[1.02]
          active:scale-[0.98]
        "
      >
        <span className="relative z-10">
          重新進入情緒流
        </span>

        <div
          className="
            absolute
            inset-0
            bg-zinc-200
            opacity-0
            group-hover:opacity-100
            transition
          "
        />
      </button>

      {/* SECONDARY */}

      <button
        onClick={handleShare}
        className="
          group
          px-7
          py-4
          rounded-full
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          text-white
          tracking-wide
          transition-all
          duration-300
          hover:bg-white/10
          hover:border-white/20
          hover:scale-[1.02]
          active:scale-[0.98]
        "
      >
        分享人格結果
      </button>
    </motion.div>
  );
}