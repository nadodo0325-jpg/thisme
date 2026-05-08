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

const trendingPersonalities = [
  {
    title: "已讀不回型戀愛腦",
    emoji: "💔",
    users: "12.4K",
  },
  {
    title: "高敏感嘴硬人格",
    emoji: "🫠",
    users: "9.8K",
  },
  {
    title: "情緒失蹤型人格",
    emoji: "🌑",
    users: "16.1K",
  },
  {
    title: "半夜內耗觀察者",
    emoji: "🖤",
    users: "21.3K",
  },
];

export default function HomePage() {

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [mode, setMode] =
    useState("love");

  const [template, setTemplate] =
    useState<keyof typeof templates>(
      "dark"
    );

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  const [loadingText, setLoadingText] =
    useState(
      loadingMessages[0]
    );

  const [activeCard, setActiveCard] =
    useState(0);

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

          setActiveCard(0);

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
    <main className="min-h-screen overflow-hidden bg-[#0F172A] px-5 py-12 text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-3xl" />

        <div className="absolute left-0 top-1/2 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-3xl" />

      </div>

      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center">

        {/* NAV */}
        <div className="mb-10 flex w-full items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">

          <div className="text-lg font-black tracking-wide">
            THISME
          </div>

          <div className="flex items-center gap-2 text-xs text-white/60">

            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            1.2M 分析中

          </div>

        </div>

        {/* HERO */}
        <div className="text-center">

          <div className="mb-4 inline-flex items-center rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-xs tracking-[0.2em] text-purple-200 backdrop-blur-xl">

            AI PERSONALITY PLATFORM

          </div>

          <h1 className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-6xl font-black tracking-tight text-transparent">

            THISME

          </h1>

          <p className="mt-5 leading-relaxed text-zinc-400">

            把你的情緒、
            <br />
            變成朋友會想截圖的版本

          </p>

        </div>

        {/* Trending */}
        <div className="mt-10 w-full">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <div className="text-sm font-semibold text-white">
                Trending 人格
              </div>

              <div className="mt-1 text-xs text-zinc-500">
                今天最多人分享
              </div>

            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              LIVE
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3">

            {trendingPersonalities.map(
              (
                item,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    setInput(
                      item.title
                    )
                  }
                  className="
                    group
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                    text-left
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-purple-400/30
                    hover:bg-white/10
                  "
                >

                  <div className="text-3xl">
                    {item.emoji}
                  </div>

                  <div className="mt-3 text-sm font-semibold text-white leading-relaxed">
                    {item.title}
                  </div>

                  <div className="mt-2 text-xs text-zinc-500">
                    {item.users} users
                  </div>

                </button>
              )
            )}

          </div>

        </div>

        {/* Community CTA */}
        <div className="mt-8 w-full rounded-[32px] border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-2xl">

          <div className="flex items-start justify-between">

            <div>

              <div className="text-sm tracking-[0.25em] text-purple-200/70">
                COMMUNITY
              </div>

              <h2 className="mt-3 text-2xl font-black leading-tight">
                超過 32 萬人
                <br />
                正在分享人格卡
              </h2>

            </div>

            <div className="rounded-full bg-white/10 px-3 py-2 text-xs text-white/70">
              HOT
            </div>

          </div>

          <div className="mt-5 flex items-center gap-2">

            <div className="flex -space-x-3">

              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/10
                      text-sm
                      backdrop-blur
                    "
                  >
                    ✦
                  </div>
                )
              )}

            </div>

            <div className="ml-3 text-sm text-white/70">
              今天已新增 8,421 張人格卡
            </div>

          </div>

        </div>

        {/* Mode */}
        <div className="mt-10 w-full">

          <div className="mb-3 text-sm text-zinc-400">
            選擇人格模式
          </div>

          <ModeSelector
            selectedMode={mode}
            onSelect={setMode}
          />

        </div>

        {/* Input */}
        <div className="mt-8 w-full">

          <InputBox
            value={input}
            onChange={setInput}
          />

        </div>

        {/* Generate */}
        <div className="mt-5 w-full">

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

              <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-purple-400 border-t-pink-400" />

            </div>

            <p className="animate-pulse text-sm tracking-wide text-zinc-400">
              {loadingText}
            </p>

          </div>
        )}

        {/* Story */}
        <div className="mt-12 flex w-full justify-center">

          <StoryCard
            ref={cardRef}
            title={current.title}
            love={current.love}
            dark={current.dark}
            friends={current.friends}
            template={mode}
          />

        </div>

        {/* Card Switch */}
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
        <div className="mt-6 flex flex-wrap justify-center gap-4">

          <DownloadButton
            onClick={
              downloadStory
            }
          />

          <CopyButton
            text={shareText}
          />

        </div>

        {/* CTA */}
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
            backdrop-blur-xl
            transition-all
            hover:bg-white/10
            hover:text-white
          "
        >

          再測一次人格

        </button>

        {/* Social Proof */}
        <div className="mt-10 w-full rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <div className="text-lg font-bold">
                朋友都在玩的 AI 人格
              </div>

              <div className="mt-2 text-sm leading-relaxed text-zinc-400">
                越多人分享，
                越容易看到自己的另一面。
              </div>

            </div>

            <div className="text-5xl">
              🫠
            </div>

          </div>

        </div>

        {/* History */}
        <div className="mt-12 w-full">

          <HistoryList
            items={history}
          />

        </div>

      </div>

    </main>
  );
}