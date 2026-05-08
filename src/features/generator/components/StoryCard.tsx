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
    "from-[#0F172A] via-[#111827] to-black",

  friends:
    "from-[#082F49] via-[#0369A1] to-[#06B6D4]",

  roast:
    "from-[#3F0D12] via-[#7F1D1D] to-[#DC2626]",

  mbti:
    "from-[#1E293B] via-[#334155] to-[#475569]",

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
    "bg-pink-500/20 text-pink-100",

  dark:
    "bg-zinc-500/20 text-zinc-200",

  friends:
    "bg-cyan-500/20 text-cyan-100",

  roast:
    "bg-red-500/20 text-red-100",

  mbti:
    "bg-slate-500/20 text-slate-100",

  pastlife:
    "bg-indigo-500/20 text-indigo-100",

  sunset:
    "bg-pink-500/20 text-pink-100",

  ocean:
    "bg-cyan-500/20 text-cyan-100",

  forest:
    "bg-lime-500/20 text-lime-100",
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

  return (
    <div
      ref={ref}
      className={`
        relative
        w-[390px]
        min-h-[760px]
        overflow-hidden
        rounded-[42px]
        bg-gradient-to-br
        ${bg}
        p-8
        shadow-[0_30px_120px_rgba(0,0,0,0.45)]
        border border-white/10
      `}
    >

      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="absolute top-1/2 left-0 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">

        {/* Header */}
        <div>

          {/* Top Badge */}
          <div className="flex items-center justify-between">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">

              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-xs tracking-[0.25em] text-white/70">
                THISME AI
              </span>

            </div>

            {/* Avatar */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/10 text-xl">
              ✦
            </div>

          </div>

          {/* Main Title */}
          <div className="mt-8">

            <div className={`
              inline-flex
              rounded-full
              px-4
              py-1
              text-xs
              tracking-[0.2em]
              backdrop-blur
              ${accent}
            `}>
              AI PERSONA REPORT
            </div>

            <h1 className="mt-5 text-[44px] leading-[1] font-black tracking-tight text-white drop-shadow-2xl whitespace-pre-wrap">
              {title}
            </h1>

          </div>

        </div>

        {/* Personality Blocks */}
        <div className="my-8 flex-1 flex flex-col gap-5">

          {/* Love */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-pink-200/70">
              戀愛狀態
            </div>

            <p className="text-[19px] leading-[1.7] text-white/90 whitespace-pre-wrap">
              {love}
            </p>

          </div>

          {/* Dark */}
          <div className="rounded-3xl border border-white/10 bg-black/10 p-5 backdrop-blur-xl">

            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-purple-200/70">
              黑暗面
            </div>

            <p className="text-[19px] leading-[1.7] text-white/90 whitespace-pre-wrap">
              {dark}
            </p>

          </div>

          {/* Friends */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-cyan-200/70">
              朋友眼中的你
            </div>

            <p className="text-[19px] leading-[1.7] text-white/90 whitespace-pre-wrap">
              {friends}
            </p>

          </div>

        </div>

        {/* Tags */}
        {tags && (
          <div className="mb-8 flex flex-wrap gap-3">

            {tags
              .split(" ")
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
                    text-white/80
                    backdrop-blur
                  "
                >
                  {tag}
                </div>
              ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-end justify-between border-t border-white/10 pt-6">

          <div>

            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Generated by
            </div>

            <div className="mt-1 text-xl font-bold tracking-wide text-white">
              THISME
            </div>

          </div>

          <div className="text-right">

            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Share Your Version
            </div>

            <div className="mt-1 text-sm text-white/70">
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