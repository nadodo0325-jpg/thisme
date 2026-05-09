"use client";

import type {
  TrendingPersonality,
} from "@/features/generator/types";

type Props = {
  items: TrendingPersonality[];

  onSelect: (
    item: TrendingPersonality
  ) => void;
};

export default function TrendingFeed({
  items,
  onSelect,
}: Props) {

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div>

          <div className="text-lg font-bold text-white">
            社群人格牆
          </div>

          <div className="mt-1 text-sm text-zinc-500">
            今天最多人分享的人格版本
          </div>

        </div>

        <div
          className="
            rounded-full
            border
            border-emerald-400/20
            bg-emerald-500/10
            px-3
            py-1
            text-xs
            font-semibold
            text-emerald-100
            backdrop-blur-xl
          "
        >
          LIVE FEED
        </div>

      </div>

      {/* Feed */}
      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-2
          scrollbar-none
        "
      >

        {items.map(
          (
            item,
            index
          ) => (

            <button
              key={item.id || index}
              onClick={() =>
                onSelect(item)
              }
              className="
                group
                relative
                min-w-[260px]
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                p-5
                text-left
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-pink-400/30
                hover:bg-white/10
                hover:shadow-[0_0_60px_rgba(236,72,153,0.18)]
              "
            >

              {/* Glow */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              >

                <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />

                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

              </div>

              <div className="relative z-10">

                {/* Top */}
                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/10
                      text-3xl
                      backdrop-blur-xl
                    "
                  >
                    {item.emoji}
                  </div>

                  <div
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/10
                      px-3
                      py-1
                      text-[10px]
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    {item.mode}
                  </div>

                </div>

                {/* Title */}
                <div className="mt-5">

                  <div className="text-xl font-black leading-tight text-white">

                    {item.title}

                  </div>

                  <div className="mt-3 text-sm leading-relaxed text-zinc-400">

                    {item.description}

                  </div>

                </div>

                {/* Tags */}
                {item.tags?.length > 0 && (

                  <div className="mt-4 flex flex-wrap gap-2">

                    {item.tags.map(
                      (
                        tag,
                        tagIndex
                      ) => (

                        <div
                          key={tagIndex}
                          className="
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-3
                            py-1
                            text-[11px]
                            text-white/70
                          "
                        >
                          {tag}
                        </div>
                      )
                    )}

                  </div>
                )}

                {/* Stats */}
                <div className="mt-6 flex items-center gap-3">

                  <div
                    className="
                      rounded-full
                      border
                      border-pink-400/20
                      bg-pink-500/10
                      px-3
                      py-1.5
                      text-xs
                      text-pink-100
                    "
                  >
                    🔥 {item.shares}
                  </div>

                  <div
                    className="
                      rounded-full
                      border
                      border-cyan-400/20
                      bg-cyan-500/10
                      px-3
                      py-1.5
                      text-xs
                      text-cyan-100
                    "
                  >
                    👥 {item.users}
                  </div>

                </div>

                {/* CTA */}
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div className="text-xs tracking-[0.2em] text-white/40">

                    TAP TO LOAD

                  </div>

                  <div
                    className="
                      text-lg
                      text-white/60
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </div>

                </div>

              </div>

            </button>
          )
        )}

      </div>

    </div>
  );
}