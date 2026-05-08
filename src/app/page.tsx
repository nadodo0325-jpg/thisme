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

import ModeSelector from "@/components/ModeSelector";

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

  // AI 模式
  const [mode, setMode] =
    useState("love");

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
            mode,
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
          pixelRatio: 3,

          cacheBust: true,

          backgroundColor:
            "#0F172A",
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
    <main className="min-h-screen bg-[#0F172A] text-white px-5 py-12">

      <div className="max-w-md mx-auto flex flex-col items-center">

        {/* Hero */}
        <div className="mb-10 text-center">

          {/* Logo */}
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            THISME
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 mt-4 leading-relaxed">
            AI 人格娛樂平台
            <br />
            把你的狀態變成可以分享的版本
          </p>

        </div>

        {/* AI 模式選擇 */}
        <div className="w-full mb-8">

          <div className="mb-3 text-sm text-zinc-400">
            選擇人格模式
          </div>

          <ModeSelector
            selectedMode={mode}
            onSelect={setMode}
          />

        </div>

        {/* Input */}
        <div className="w-full">
          <InputBox
            value={input}
            onChange={setInput}
          />
        </div>

        {/* Generate */}
        <div className="w-full mt-5">
          <GenerateButton
            onClick={generateVersion}
          />
        </div>

        {/* Template */}
        <div className="mt-6">
          <TemplateSelector
            current={template}
            onChange={setTemplate}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-6 flex items-center gap-3 text-zinc-400">

            <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />

            <p>
              AI 正在拆解你的情緒...
            </p>

          </div>
        )}

        {/* Story */}
        <div className="mt-10 w-full flex justify-center">

          <StoryCard
            ref={cardRef}
            title={current.title}
            text={current.text}
            template={template}
          />

        </div>

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
        <div className="w-full mt-10">

          <HistoryList
            items={history}
          />

        </div>

      </div>

    </main>
  );
}