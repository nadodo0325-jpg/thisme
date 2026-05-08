import { forwardRef } from "react";

import { templates } from "@/lib/templates";

type Props = {
  title: string;
  text: string;
  template: keyof typeof templates;
};

const StoryCard = forwardRef<HTMLDivElement, Props>(
  ({ title, text, template }, ref) => {

    const currentTemplate =
      templates[template];

    return (

      <div
        ref={ref}
        className="mt-12 w-full max-w-[360px]"
      >

        <div
          className={`
            relative overflow-hidden rounded-[48px]
            w-full aspect-[9/16]
            px-8 py-10
            shadow-2xl
            flex flex-col
            ${currentTemplate.card}
          `}
        >

          {/* Glow */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,#ffffff33,transparent_40%)]" />

          {/* Top */}
          <div className="relative z-10">

            <p
              className={`
                text-xs tracking-[0.3em] mb-6 uppercase
                ${currentTemplate.label}
              `}
            >
              THIS ME
            </p>

            <h2 className="text-4xl leading-tight font-bold">
              {title}
            </h2>

          </div>

          {/* Center */}
          <div className="relative z-10 flex-1 flex items-center">

            <p
              className={`
                text-2xl leading-relaxed whitespace-pre-line
                ${currentTemplate.text}
              `}
            >
              {text}
            </p>

          </div>

          {/* Bottom */}
          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="text-sm opacity-70">
                我這版
              </p>

              <p className="text-xs opacity-40 mt-1">
                this me project
              </p>

            </div>

            <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-sm" />

          </div>

        </div>

      </div>

    );
  }
);

StoryCard.displayName = "StoryCard";

export default StoryCard;