"use client";

import {
  useState,
} from "react";

type Props = {
  text: string;
};

export default function CopyButton({
  text,
}: Props) {

  const [copied, setCopied] =
    useState(false);

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(
        text
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        rounded-2xl
        px-5
        py-3
        font-semibold
        transition-all
        duration-200
        active:scale-95
        ${
          copied
            ? "bg-green-500 text-white"
            : "bg-white/10 text-white hover:bg-white/20"
        }
      `}
    >

      {copied
        ? "已複製分享文案"
        : "複製分享文案"}

    </button>
  );
}