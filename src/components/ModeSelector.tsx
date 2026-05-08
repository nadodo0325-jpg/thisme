"use client";

import { modes } from "@/lib/modes";

type Props = {
  selectedMode: string;
  onSelect: (modeId: string) => void;
};

export default function ModeSelector({
  selectedMode,
  onSelect,
}: Props) {

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

      {modes.map((mode) => {

        const isActive =
          selectedMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() =>
              onSelect(mode.id)
            }
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              p-5
              text-left
              transition-all
              duration-300
              backdrop-blur-xl
              ${
                isActive
                  ? `
                    border-purple-400/60
                    bg-purple-500/20
                    shadow-[0_0_40px_rgba(168,85,247,0.35)]
                    scale-[1.02]
                  `
                  : `
                    border-white/10
                    bg-white/5
                    hover:bg-white/10
                    hover:border-white/20
                  `
              }
            `}
          >

            {/* Glow */}
            <div
              className="
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
                bg-gradient-to-br
                from-white/5
                to-transparent
              "
            />

            {/* Trending Badge */}
            {mode.trending && (
              <div
                className="
                  absolute
                  top-3
                  right-3
                  rounded-full
                  bg-pink-500/20
                  border
                  border-pink-400/20
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  tracking-[0.15em]
                  text-pink-100
                  backdrop-blur
                "
              >
                HOT
              </div>
            )}

            {/* Content */}
            <div className="relative z-10">

              {/* Emoji */}
              <div
                className="
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                  text-3xl
                  shadow-inner
                  backdrop-blur
                "
              >
                {mode.emoji}
              </div>

              {/* Name */}
              <div className="text-lg font-bold text-white tracking-tight">
                {mode.name}
              </div>

              {/* Description */}
              <div className="mt-2 text-sm leading-relaxed text-zinc-400">
                {mode.description}
              </div>

            </div>

          </button>
        );
      })}
    </div>
  );
}