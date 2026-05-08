"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import * as htmlToImage from "html-to-image";

import InputBox from "@/features/generator/components/InputBox";
import GenerateButton from "@/features/generator/components/GenerateButton";
import DownloadButton from "@/features/generator/components/DownloadButton";
import CopyButton from "@/features/generator/components/CopyButton";
import StoryCard from "@/features/generator/components/StoryCard";
import TemplateSelector from "@/features/generator/components/TemplateSelector";
import HistoryList from "@/features/generator/components/HistoryList";

import { templates } from "@/lib/templates";

import { parseResponse } from "@/features/generator/utils/parseResponse";

type HistoryItem = {
  title: string;
  text: string;
  createdAt: string;
};

export default function HomePage() {

  const [input, setInput] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [template, setTemplate] =
    useState<keyof typeof templates>("dark");

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  const [current, setCurrent] = useState({
    title: "還在想的人",
    text: "有些答案，不會馬上出現。",
  });

  const cardRef =
    useRef<HTMLDivElement>(null);

  // 讀取歷史
  useEffect(() => {

    const saved =
      localStorage.getItem(
        "thisme-history"
      );

    if (saved) {

      setHistory(JSON.parse(saved));
    }

  }, []);

  const generateVersion = async () => {

    if (!input) return;

    try {

      setLoading(true);

      const response =
        await fetch("/api/generate", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            input,
          }),
        });

      const data =
        await response.json();

      if (data.result) {

        const parsed =
          parseResponse(data.result);

        setCurrent(parsed);

        // 建立歷史紀錄
        const newHistory = [
          {
            title: parsed.title,
            text: parsed.text,
            createdAt:
              new Date().toLocaleDateString(),
          },

          ...history,
        ];

        // 最多保留20筆
        const sliced =
          newHistory.slice(0, 20);

        setHistory(sliced);

        localStorage.setItem(
          "thisme-history",
          JSON.stringify(sliced)
        );
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const downloadStory = async () => {

    if (!cardRef.current) return;

    const dataUrl =
      await htmlToImage.toPng(
        cardRef.current,
        {
          pixelRatio: 2,
        }
      );

    const link =
      document.createElement("a");

    link.download =
      "thisme-story.png";

    link.href = dataUrl;

    link.click();
  };

  // 分享文案
  const shareText = `#我這版

${current.title}

${current.text}`;

  return (
    <main className="min-h-screen bg-black text-white px-5 py-12">

      <div className="max-w-md mx-auto flex flex-col items-center">

        {/* Logo */}
        <h1 className="text-5xl font-bold mb-3 tracking-tight text-center">
          我這版
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-500 mb-10 text-center leading-relaxed">
          把你現在的狀態，
          變成一個可以被看到的版本
        </p>

        {/* Input */}
        <div className="w-full">
          <InputBox
            value={input}
            onChange={setInput}
          />
        </div>

        {/* Generate */}
        <GenerateButton
          onClick={generateVersion}
        />

        {/* Template */}
        <TemplateSelector
          current={template}
          onChange={setTemplate}
        />

        {/* Loading */}
        {loading && (
          <p className="mt-6 text-zinc-500">
            生成中...
          </p>
        )}

        {/* Story */}
        <StoryCard
          ref={cardRef}
          title={current.title}
          text={current.text}
          template={template}
        />

        {/* Actions */}
        <div className="mt-6 flex gap-4 flex-wrap justify-center">

          <DownloadButton
            onClick={downloadStory}
          />

          <CopyButton
            text={shareText}
          />

        </div>

        {/* History */}
        <HistoryList
          items={history}
        />

      </div>

    </main>
  );
}