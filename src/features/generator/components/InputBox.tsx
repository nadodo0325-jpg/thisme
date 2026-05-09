"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  value: string;

  onChange: (
    value: string
  ) => void;

  placeholder?: string;
};

const rotatingPlaceholders = [
  "輸入最近讓你情緒內耗的人...",
  "輸入你一直沒講出口的情緒...",
  "輸入最近反覆想起的一句話...",
  "輸入最近讓你睡不著的事...",
  "輸入你現在最真實的情緒...",
  "輸入最近很像你的狀態...",
];

export default function InputBox({
  value,
  onChange,
  placeholder,
}: Props) {

  const textareaRef =
    useRef<HTMLTextAreaElement>(
      null
    );

  const [
    currentPlaceholder,
    setCurrentPlaceholder,
  ] = useState(
    rotatingPlaceholders[0]
  );

  // Auto resize
  useEffect(() => {

    if (!textareaRef.current)
      return;

    textareaRef.current.style.height =
      "0px";

    textareaRef.current.style.height =
      `${textareaRef.current.scrollHeight}px`;

  }, [value]);

  // Rotate placeholder
  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentPlaceholder(
          rotatingPlaceholders[
            Math.floor(
              Math.random() *
              rotatingPlaceholders.length
            )
          ]
        );

      }, 3500);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        p-5
        backdrop-blur-2xl
      "
    >

      {/* Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Top */}
      <div className="mb-4 flex items-center justify-between">

        <div>

          <div className="text-[11px] tracking-[0.25em] text-white/40">
            THISME INPUT
          </div>

          <div className="mt-1 text-sm text-white/70">
            告訴 AI 你現在的情緒
          </div>

        </div>

        <div
          className="
            rounded-full
            border
            border-white/10
            bg-white/10
            px-3
            py-1.5
            text-xs
            text-white/60
            backdrop-blur-xl
          "
        >
          {value.length}/300
        </div>

      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        maxLength={300}
        rows={4}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={
          placeholder ||
          currentPlaceholder
        }
        className="
          min-h-[140px]
          w-full
          resize-none
          bg-transparent
          text-[17px]
          leading-[1.9]
          text-white
          outline-none
          placeholder:text-white/30
        "
      />

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">

        <div className="flex items-center gap-2 text-xs text-white/40">

          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          AI 正在等待你的情緒

        </div>

        <div className="text-[11px] tracking-[0.2em] text-white/30">
          EMOTION BASED INPUT
        </div>

      </div>

    </div>
  );
}