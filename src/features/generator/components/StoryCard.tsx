"use client";

import {
  forwardRef,
} from "react";

type Props = {
  title: string;

  love: string;

  dark: string;

  friends: string;

  tags?: string;

  template: string;
};

const gradients: Record<
  string,
  string
> = {

  love:
    "from-[#3B0764] via-[#7E22CE] to-[#EC4899]",

  dark:
    "from-[#020617] via-[#111827] to-black",

  friends:
    "from-[#082F49] via-[#0369A1] to-[#06B6D4]",

  roast:
    "from-[#3F0D12] via-[#7F1D1D] to-[#DC2626]",

  mbti:
    "from-[#1E293B] via-[#334155] to-[#64748B]",

  pastlife:
    "from-[#312E81] via-[#6366F1] to-[#A78BFA]",

  sunset:
    "from-[#7C3AED] via-[#EC4899] to-[#F43F5E]",

  ocean:
    "from-[#082F49] via-[#0369A1] to-[#06B6D4]",

  forest:
    "from-[#052e16] via-[#166534] to-[#65a30d]",
};

const accents: Record<
  string,
  string
> = {

  love:
    "bg-pink-500/20 text-pink-100 border-pink-300/10",

  dark:
    "bg-zinc-500/20 text-zinc-200 border-zinc-300/10",

  friends:
    "bg-cyan-500/20 text-cyan-100 border-cyan-300/10",

  roast:
    "bg-red-500/20 text-red-100 border-red-300/10",

  mbti:
    "bg-slate-500/20 text-slate-100 border-slate-300/10",

  pastlife:
    "bg-indigo-500/20 text-indigo-100 border-indigo-300/10",

  sunset:
    "bg-pink-500/20 text-pink-100 border-pink-300/10",

  ocean:
    "bg-cyan-500/20 text-cyan-100 border-cyan-300/10",

  forest:
    "bg-lime-500/20 text-lime-100 border-lime-300/10",
};

const modeLabels: Record<
  string,
  string
> = {

  love:
    "LOVE ANALYSIS",

  dark:
    "DARK SIDE",

  friends:
    "FRIEND POV",

  roast:
    "AI ROAST",

  mbti:
    "MBTI REPORT",

  pastlife:
    "PAST LIFE",
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

  const bg =
    gradients[template] ||
    gradients.dark;

  const accent =
    accents[template] ||
    accents.dark;

  const label =
    modeLabels[template] ||
    "AI PERSONA";

  return (
    <div
      ref={ref}
      className={`
        relative
        w-[390px]
        min-h-[820px]
        overflow-hidden
        rounded-[42px]
        bg-gradient-to-br
        ${bg}
        p-8
        shadow-[0_30px_120px_rgba(0,0,0,0.5)]
        border
        border-white/10
      `}
    >

      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="absolute top-1/2 -left-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating Line */}
      <div className="absolute left-0 top-32 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Header */}
        <div>

          {/* Top Bar */}
          <div className="flex items-center justify-between">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl">

              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-[11px] tracking-[0.28em] text-white/70">
                THISME AI
              </span>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xl backdrop-blur-xl">
              ✦
            </div>

          </div>

          {/* Title */}
          <div className="mt-9">

            <div
              className={`
                inline-flex
                items-center
                rounded-full
                border
                px-4
                py-1.5
                text-[11px]
                tracking-[0.22em]
                backdrop-blur-xl
                ${accent}
              `}
            >
              {label}
            </div>

            <h1 className="mt-6 whitespace-pre-wrap text-[46px] font-black leading-[0.98] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
              {title}
            </h1>

          </div>

        </div>

        {/* Body */}
        <div className="mt-8 flex flex-1 flex-col gap-5">

          {/* Love */}
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-xl">

            <div className="mb-3 flex items-center gap-2">

              <div className="h-2 w-2 rounded-full bg-pink-300" />

              <div className="text-[11px] uppercase tracking-[0.25em] text-pink-100/70">
                戀愛狀態
              </div>

            </div>

            <p className="whitespace-pre-wrap text-[19px] leading-[1.8] text-white/90">
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

            <p className="whitespace-pre-wrap text-[19px] leading-[1.8] text-white/90">
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

            <p className="whitespace-pre-wrap text-[19px] leading-[1.8] text-white/90">
              {friends}
            </p>

          </div>

        </div>

        {/* Tags */}
        {tags && (
          <div className="mt-7 flex flex-wrap gap-3">

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
        <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-6">

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