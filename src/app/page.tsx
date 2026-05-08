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

const loadingMessages = [
  "AI 正在偷看你的情緒...",
  "正在分析你不敢講的那面...",
  "AI 正在翻閱你的深夜人格...",
  "正在生成朋友會截圖的版本...",
  "正在拆解你的戀愛腦...",
  "AI 正在觀察你的情緒裂縫...",
];

export default function HomePage() {

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // AI 模式
  const [mode, setMode] =
    useState("love");

  // 保留模板系統
  const [template, setTemplate] =
    useState<keyof typeof templates>(
      "dark"
    );

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  // loading 文案
  const [loadingText, setLoadingText] =
    useState(
      loadingMessages[0]
    );

  // 多卡切換（STEP 23 基礎）
  const [activeCard, setActiveCard] =
    useState(0);

  // 新版人格結果
  const [current, setCurrent] =
    useState({
      title: "還在想的人",

      love:
        "有些答案，不會馬上出現。",

      dark:
        "你只是太習慣自己消化。",

      friends:
        "有些人其實一直都懂你。",
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

      setHistory(
        JSON.parse(saved)
      );
    }

  }, []);

  const generateVersion =
    async () => {

      if (!input) return;

      try {

        setLoading(true);

        // 隨機 loading 文案
        setLoadingText(
          loadingMessages[
            Math.floor(
              Math.random() *
              loadingMessages.length
            )
          ]
        );

        const response =
          await fetch(
            "/api/generate",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                input,
                mode,
              }),
            }
          );

        const data =
          await response.json();

        if (data.result) {

          const parsed =
            parseResponse(
              data.result
            );

          setCurrent(parsed);

          // 重置卡片 index
          setActiveCard(0);

          // 建立歷史紀錄
          const newHistory = [
            {
              title:
                parsed.title,

              text: `
戀愛狀態：
${parsed.love}

黑暗面：
${parsed.dark}

朋友眼中的你：
${parsed.friends}
              `,

              createdAt:
                new Date().toLocaleDateString(),
            },

            ...history,
          ];

          // 最多保留20筆
          const sliced =
            newHistory.slice(
              0,
              20
            );

          setHistory(sliced);

          localStorage.setItem(
            "thisme-history",
            JSON.stringify(
              sliced
            )
          );
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const downloadStory =
    async () => {

      if (!cardRef.current)
        return;

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
        document.createElement(
          "a"
        );

      link.download =
        `thisme-${Date.now()}.png`;

      link.href = dataUrl;

      link.click();
    };

  // 分享文案
  const shareText = `#THISME人格報告

【${current.title}】

戀愛狀態：
${current.love}

黑暗面：
${current.dark}

朋友眼中的你：
${current.friends}

— THISME AI Personality`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#0F172A] text-white px-5 py-12">

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-3xl" />

      </div>

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">

        {/* Hero */}
        <div className="mb-10 text-center">

          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">

            THISME

          </h1>

          <p className="text-zinc-400 mt-4 leading-relaxed">

            AI 人格娛樂平台
            <br />
            把你的狀態變成可以分享的版本

          </p>

        </div>

        {/* 模式 */}
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
            onClick={
              generateVersion
            }
          />

        </div>

        {/* Template */}
        <div className="mt-6">

          <TemplateSelector
            current={template}
            onChange={
              setTemplate
            }
          />

        </div>

        {/* Loading */}
        {loading && (

          <div className="mt-8 flex flex-col items-center">

            <div className="relative mb-5">

              <div className="h-14 w-14 rounded-full border-2 border-purple-500/20" />

              <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-pink-400 border-r-purple-400" />

            </div>

            <p className="animate-pulse text-zinc-400 text-sm tracking-wide">
              {loadingText}
            </p>

          </div>
        )}

        {/* Story */}
        <div className="mt-10 w-full flex justify-center">

          <StoryCard
            ref={cardRef}
            title={current.title}
            love={current.love}
            dark={current.dark}
            friends={current.friends}
            template={mode}
          />

        </div>

        {/* Card Switch UI */}
        <div className="mt-5 flex items-center gap-2">

          {[0, 1, 2].map(
            (index) => (

              <button
                key={index}
                onClick={() =>
                  setActiveCard(
                    index
                  )
                }
                className={`
                  h-2.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    activeCard ===
                    index
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/30"
                  }
                `}
              />
            )
          )}

        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4 flex-wrap justify-center">

          <DownloadButton
            onClick={
              downloadStory
            }
          />

          <CopyButton
            text={shareText}
          />

        </div>

        {/* 再測一次 */}
        <button
          onClick={
            generateVersion
          }
          className="
            mt-6
            rounded-full
            border
            border-white/10
            bg-white/5
            px-6
            py-3
            text-sm
            text-white/80
            backdrop-blur
            transition-all
            hover:bg-white/10
            hover:text-white
          "
        >

          再測一次人格

        </button>

        {/* History */}
        <div className="w-full mt-12">

          <HistoryList
            items={history}
          />

        </div>

      </div>

    </main>
  );
}