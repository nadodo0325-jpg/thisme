"use client";

import { modes } from "@/data/modes";

type Props = {
  selectedMode: string;
  onSelect: (modeId: string) => void;
};

export default function ModeSelector({
  selectedMode,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
              rounded-2xl border p-4 text-left transition-all duration-200
              ${
                isActive
                  ? "border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }
            `}
          >
            <div className="mb-2 text-3xl">
              {mode.emoji}
            </div>

            <div className="font-semibold text-white">
              {mode.name}
            </div>

            <div className="mt-1 text-sm text-gray-400">
              {mode.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}