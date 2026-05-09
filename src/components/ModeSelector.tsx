"use client";

import { modes } from "@/lib/modes";

type Props = {
  selectedMode: string;
  onSelect: (
    modeId: string
  ) => void;
};

export default function ModeSelector({
  selectedMode,
  onSelect,
}: Props) {

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

      {modes.map((mode) => {

        const isActive =
          selectedMode ===
          mode.id;

        return (
          <button
            key={mode.id}
            onClick={() =>
              onSelect(
                mode.id
              )
            }
            className={`
              group
              relative
              overflow-hidden
              rounded-[30px]
              border
              p-5
              text-left
              transition-all
              duration-300
              backdrop-blur-2xl
              ${
                isActive
                  ? `
                    border-white/20
                    bg-white/12
                    shadow-[0_0_60px_rgba(168,85,247,0.28)]
                    scale-[1.02]
                  `
                  : `
                    border-white/10
                    bg-white/5
                    hover:-translate-y-1
                    hover:border-white/20
                    hover:bg-white/10
                  `
              }
            `}
          >

            {/* Background Glow */}
            <div
              className={`
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-500
                bg-gradient-to-br
                ${mode.gradient}
                ${
                  isActive
                    ? "opacity-20"
                    : "group-hover:opacity-10"
                }
              `}
            />

            {/* Blur Glow */}
            <div
              className={`
                absolute
                -right-10
                -top-10
                h-32
                w-32
                rounded-full
                blur-3xl
                transition-opacity
                duration-500
                ${
                  isActive
                    ? "bg-white/20 opacity-100"
                    : "bg-white/10 opacity-0 group-hover:opacity-100"
                }
              `}
            />

            {/* HOT */}
            {mode.trending && (
              <div
                className="
                  absolute
                  right-3
                  top-3
                  rounded-full
                  border
                  border-pink-400/20
                  bg-pink-500/20
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  tracking-[0.18em]
                  text-pink-100
                  backdrop-blur
                "
              >
                HOT
              </div>
            )}

            {/* Popular */}
            {mode.popular && (
              <div
                className="
                  absolute
                  left-3
                  top-3
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-2.5
                  py-1
                  text-[10px]
                  tracking-[0.18em]
                  text-white/70
                  backdrop-blur
                "
              >
                POPULAR
              </div>
            )}

            {/* Content */}
            <div className="relative z-10">

              {/* Icon */}
              <div
                className="
                  mt-6
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-[22px]
                  border
                  border-white/10
                  bg-white/10
                  text-4xl
                  shadow-inner
                  backdrop-blur-xl
                "
              >
                {mode.emoji}
              </div>

              {/* Short */}
              <div className="mt-5 text-[11px] tracking-[0.24em] text-white/40">
                {mode.shortName}
              </div>

              {/* Title */}
              <div className="mt-2 text-[20px] font-black tracking-tight text-white">
                {mode.name}
              </div>

              {/* Description */}
              <div className="mt-3 text-sm leading-relaxed text-white/60">
                {mode.description}
              </div>

              {/* Stats */}
              {mode.stats && (
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">

                  <div>

                    <div className="text-[10px] tracking-[0.18em] text-white/35">
                      SHARES
                    </div>

                    <div className="mt-1 text-sm font-semibold text-white/80">
                      {mode.stats.shares}
                    </div>

                  </div>

                  <div className="text-right">

                    <div className="text-[10px] tracking-[0.18em] text-white/35">
                      USERS
                    </div>

                    <div className="mt-1 text-sm font-semibold text-white/80">
                      {mode.stats.users}
                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* Active Ring */}
            {isActive && (
              <div
                className="
                  absolute
                  inset-0
                  rounded-[30px]
                  ring-1
                  ring-white/20
                "
              />
            )}

          </button>
        );
      })}
    </div>
  );
}