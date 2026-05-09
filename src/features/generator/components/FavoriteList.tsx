"use client";

import {
  PersonalityCard,
} from "@/features/generator/utils/parseResponse";

type Props = {
  items: PersonalityCard[];

  onSelect: (
    card: PersonalityCard
  ) => void;
};

export default function FavoriteList({
  items,
  onSelect,
}: Props) {

  if (!items.length) {
    return (
      <div
        className="
          rounded-[30px]
          border
          border-white/10
          bg-white/5
          p-6
          backdrop-blur-2xl
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <div className="text-sm font-semibold text-white">
              收藏人格
            </div>

            <div className="mt-1 text-xs text-zinc-500">
              你收藏的人格卡會出現在這裡
            </div>

          </div>

          <div className="text-3xl">
            ⭐
          </div>

        </div>

        <div
          className="
            mt-5
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-black/10
            px-5
            py-10
            text-center
          "
        >

          <div className="text-4xl">
            🫠
          </div>

          <div className="mt-4 text-sm text-white/70">
            還沒有收藏人格卡
          </div>

          <div className="mt-2 text-xs text-zinc-500">
            點擊「收藏人格」即可加入
          </div>

        </div>

      </div>
    );
  }

  return (
    <div
      className="
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-2xl
      "
    >

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <div className="text-sm font-semibold text-white">
            收藏人格
          </div>

          <div className="mt-1 text-xs text-zinc-500">
            Saved Personality Collection
          </div>

        </div>

        <div
          className="
            rounded-full
            border
            border-yellow-400/20
            bg-yellow-500/10
            px-3
            py-1
            text-xs
            text-yellow-100
          "
        >
          {items.length} Saved
        </div>

      </div>

      {/* List */}
      <div className="mt-5 flex flex-col gap-4">

        {items.map(
          (
            item,
            index
          ) => (

            <button
              key={`${item.title}-${index}`}
              onClick={() =>
                onSelect(item)
              }
              className="
                group
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-white/10
                bg-gradient-to-br
                from-white/8
                to-white/[0.03]
                p-5
                text-left
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-yellow-300/20
                hover:bg-white/10
              "
            >

              {/* Glow */}
              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-32
                  w-32
                  rounded-full
                  bg-yellow-300/10
                  blur-3xl
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              <div className="relative z-10">

                {/* Top */}
                <div className="flex items-start justify-between gap-3">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="text-lg">
                        ⭐
                      </div>

                      <div className="text-lg font-bold leading-tight text-white">
                        {item.title}
                      </div>

                    </div>

                    <div className="mt-2 text-xs tracking-[0.18em] text-yellow-100/60">
                      SAVED PERSONALITY
                    </div>

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
                      text-white/60
                    "
                  >
                    #{index + 1}
                  </div>

                </div>

                {/* Preview */}
                <div className="mt-4 space-y-2">

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/5
                      bg-black/10
                      p-3
                    "
                  >

                    <div className="text-[10px] tracking-[0.2em] text-pink-100/50">
                      LOVE
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">
                      {item.love}
                    </p>

                  </div>

                </div>

                {/* Tags */}
                {item.tags && (

                  <div className="mt-4 flex flex-wrap gap-2">

                    {item.tags
                      .split(/[\s,，]+/)
                      .filter(Boolean)
                      .slice(0, 3)
                      .map(
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
                              bg-white/10
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

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">

                  <div className="text-xs text-zinc-500">
                    點擊快速載入
                  </div>

                  <div
                    className="
                      text-sm
                      text-yellow-100/80
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