"use client";

import {
  forwardRef,
} from "react";

import { modes } from "@/lib/modes";

type Props = {
  title: string;

  love: string;

  dark: string;

  friends: string;

  tags?: string;

  template: string;
};

const StoryCard = forwardRef<
  HTMLDivElement,
  Props
>(({
  title,
  love,
  dark,
  friends,
  tags,
  template,
}, ref) => {

  const currentMode =
    modes.find(
      (mode) =>
        mode.id === template
    );

  const gradient =
    currentMode?.gradient ||
    "from-[#020617] via-[#111827] to-black";

  const accent =
    currentMode?.accent ||
    "bg-zinc-500/20 text-zinc-100";

  return (
    <div
      ref={ref}
      className={`
        relative
        w-[390px]
        min-h-[860px]
        overflow-hidden
        rounded-[42px]
        bg-gradient-to-br
        ${gradient}
        p-8
        shadow-[0_30px_120px_rgba(0,0,0,0.55)]
        border
        border-white/10
      `}
    >

      {/* Background */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Glow */}
      <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="absolute top-1/2 -left-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Header */}
        <div>

          {/* Top Bar */}
          <div className="flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-3">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl">

                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

                <span className="text-[11px] tracking-[0.25em] text-white/70">
                  THISME AI
                </span>

              </div>

              {/* Trending */}
              {currentMode?.trending && (
                <div className="rounded-full border border-pink-400/20 bg-pink-500/20 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-pink-100 backdrop-blur">
                  HOT
                </div>
              )}

            </div>

            {/* Emoji */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl backdrop-blur-xl">
              {currentMode?.emoji || "✦"}
            </div>

          </div>

          {/* Mode */}
          <div className="mt-8">

            <div
              className={`
                inline-flex
                items-center
                rounded-full
                border
                border-white/10
                px-4
                py-1.5
                text-[11px]
                tracking-[0.22em]
                backdrop-blur-xl
                ${accent}
              `}
            >
              {currentMode?.name || "AI PERSONA"}
            </div>

            {/* Title */}
            <h1 className="mt-6 whitespace-pre-wrap text-[48px] font-black leading-[0.96] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
              {title}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[90%] text-[15px] leading-[1.7] text-white/60">
              {currentMode?.description}
            </p>

          </div>

        </div>

        {/* Blocks */}
        <div className="mt-9 flex flex-1 flex-col gap-5">

          {/* Love */}
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-xl">

            <div className="mb-3 flex items-center gap-2">

              <div className="h-2 w-2 rounded-full bg-pink-300" />

              <div className="text-[11px] uppercase tracking-[0.25em] text-pink-100/70">
                戀愛狀態
              </div>

            </div>

            <p className="whitespace-pre-wrap text-[19px] leading-[1.85] text-white/90">
              {love}
            </p>

          </div>

          {/* Dark */}
          <div className="rounded-[30px] border border-white/10 bg-black/15 p-5 backdrop-blur-2xl shadow-xl">

            <div className="mb-3 flex items-center gap-2">

              <div className="h-2 w-2 rounded-full bg-purple-300" />

              <div className="text-[11px] uppercase tracking-[0.25em] text-purple-100/70">
                黑暗面
              </div>

            </div>

            <p className="whitespace-pre-wrap text-[19px] leading-[1.85] text-white/90">
              {dark}
            </p>

          </div>

          {/* Friends */}
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-xl">

            <div className="mb-3 flex items-center gap-2">

              <div className="h-2 w-2 rounded-full bg-cyan-300" />

              <div className="text-[11px] uppercase tracking-[0.25em] text-cyan-100/70">
                朋友眼中的你
              </div>

            </div>

            <p className="whitespace-pre-wrap text-[19px] leading-[1.85] text-white/90">
              {friends}
            </p>

          </div>

        </div>

        {/* Tags */}
        {tags && (
          <div className="mt-8 flex flex-wrap gap-3">

            {tags
              .split(" ")
              .filter(Boolean)
              .map((tag, index) => (

                <div
                  key={index}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/10
                    px-4
                    py-2
                    text-sm
                    text-white/85
                    backdrop-blur-xl
                  "
                >
                  {tag}
                </div>
              ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-9 flex items-end justify-between border-t border-white/10 pt-6">

          <div>

            <div className="text-[10px] uppercase tracking-[0.24em] text-white/40">
              Generated by
            </div>

            <div className="mt-1 text-[22px] font-black tracking-wide text-white">
              THISME
            </div>

          </div>

          <div className="text-right">

            <div className="text-[10px] uppercase tracking-[0.24em] text-white/40">
              Share Your Version
            </div>

            <div className="mt-1 text-sm text-white/75">
              AI Personality Card
            </div>

            <div className="mt-2 text-xs text-white/40">
              @thisme.ai
            </div>

          </div>

        </div>

      </div>

    </div>
  );
});

StoryCard.displayName =
  "StoryCard";

export default StoryCard;