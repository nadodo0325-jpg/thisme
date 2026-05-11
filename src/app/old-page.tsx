"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import * as htmlToImage from "html-to-image";

import InputBox from "@/features/generator/components/InputBox";
import GenerateButton from "@/features/generator/components/GenerateButton";
import DownloadButton from "@/features/generator/components/DownloadButton";
import CopyButton from "@/features/generator/components/CopyButton";
import StoryCard from "@/features/generator/components/StoryCard";
import HistoryList from "@/features/generator/components/HistoryList";

import TrendingFeed from "@/features/feed/components/TrendingFeed";

import ModeSelector from "@/components/ModeSelector";

import { modes } from "@/lib/modes";

import {
  parseResponse,
  PersonalityCard,
} from "@/features/generator/utils/parseResponse";

import {
  trendingFeed,
} from "@/features/feed/data/trendingFeed";

import type {
  TrendingPersonality,
} from "@/features/generator/types";

type HistoryItem = {
  title: string;
  text: string;
  createdAt: string;
};

type FavoriteItem = {
  id: string;
  title: string;
  tags?: string;
  mode: string;
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

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  const [favorites, setFavorites] =
    useState<FavoriteItem[]>([]);

  const [loadingText, setLoadingText] =
    useState(
      loadingMessages[0]
    );

  const [activeCard, setActiveCard] =
    useState(0);

  const [cards, setCards] =
    useState<PersonalityCard[]>([
      {
        title: "還在想的人",

        love:
          "有些答案，不會馬上出現。",

        dark:
          "你只是太習慣自己消化。",

        friends:
          "有些人其實一直都懂你。",

        tags:
          "#高敏感人格 #情緒系",
      },
    ]);

  const current =
    cards[
      activeCard
    ] || cards[0];

  const currentMode =
    useMemo(
      () =>
        modes.find(
          (item) =>
            item.id === mode
        ) || modes[0],
      [mode]
    );

  const cardRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const savedHistory =
      localStorage.getItem(
        "thisme-history"
      );

    if (savedHistory) {

      setHistory(
        JSON.parse(
          savedHistory
        )
      );
    }

    const savedFavorites =
      localStorage.getItem(
        "thisme-favorites"
      );

    if (savedFavorites) {

      setFavorites(
        JSON.parse(
          savedFavorites
        )
      );
    }

  }, []);

  const favoriteId =
    `${mode}-${current.title}`;

  const isFavorited =
    favorites.some(
      (item) =>
        item.id ===
        favoriteId
    );

  const toggleFavorite =
    () => {

      if (!current) return;

      if (isFavorited) {

        const filtered =
          favorites.filter(
            (item) =>
              item.id !==
              favoriteId
          );

        setFavorites(
          filtered
        );

        localStorage.setItem(
          "thisme-favorites",
          JSON.stringify(
            filtered
          )
        );

        return;
      }

      const newFavorite: FavoriteItem =
        {
          id: favoriteId,

          title:
            current.title,

          tags:
            current.tags,

          mode,

          createdAt:
            new Date().toLocaleDateString(),
        };

      const updated = [
        newFavorite,
        ...favorites,
      ].slice(0, 50);

      setFavorites(
        updated
      );

      localStorage.setItem(
        "thisme-favorites",
        JSON.stringify(
          updated
        )
      );
    };

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

          const parsedCards =
            parseResponse(
              data.result
            );

          setCards(
            parsedCards
          );

          setActiveCard(0);

          const firstCard =
            parsedCards[0];

          const newHistory = [
            {
              title:
                firstCard.title,

              text: `
戀愛狀態：
${firstCard.love}

黑暗面：
${firstCard.dark}

朋友眼中的你：
${firstCard.friends}
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

  const loadTrendingPersonality =
    (
      item: TrendingPersonality
    ) => {

      setMode(
        item.mode
      );

      setInput(
        item.input
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
        `thisme-${activeCard + 1}-${Date.now()}.png`;

      link.href = dataUrl;

      link.click();
    };

  const nextCard =
    () => {

      setActiveCard(
        (prev) =>
          (prev + 1) %
          cards.length
      );
    };

  const prevCard =
    () => {

      setActiveCard(
        (prev) =>
          prev === 0
            ? cards.length - 1
            : prev - 1
      );
    };

  const shareText = `
#THISME人格報告

【${current.title}】

戀愛狀態：
${current.love}

黑暗面：
${current.dark}

朋友眼中的你：
${current.friends}

${current.tags}

— THISME AI Personality
`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#0F172A] px-5 py-12 text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className={`
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            blur-3xl
            opacity-30
            bg-gradient-to-br
            ${currentMode.gradient}
          `}
        />

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

          <div
            className={`
              mb-4
              inline-flex
              items-center
              rounded-full
              border
              px-4
              py-2
              text-xs
              tracking-[0.2em]
              backdrop-blur-xl
              ${currentMode.accent}
            `}
          >

            {currentMode.label}

          </div>

          <h1 className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-6xl font-black tracking-tight text-transparent">

            THISME

          </h1>

          <p className="mt-5 leading-relaxed text-zinc-400">

            {currentMode.description}

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

        {/* NEW SOCIAL FEED */}
        <div className="mt-12 w-full">

          <TrendingFeed
            items={trendingFeed}
            onSelect={
              loadTrendingPersonality
            }
          />

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
            mode={mode}
            loading={loading}
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
        <div className="relative mt-12 flex w-full items-center justify-center">

          {cards.length > 1 && (
            <button
              onClick={prevCard}
              className="
                absolute
                left-0
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/10
                text-xl
                backdrop-blur-xl
                transition-all
                hover:scale-105
                hover:bg-white/20
              "
            >
              ←
            </button>
          )}

          <div
            className="
              transition-all
              duration-500
              animate-in
              fade-in
              zoom-in-95
            "
          >

            <StoryCard
              ref={cardRef}
              title={current.title}
              love={current.love}
              dark={current.dark}
              friends={current.friends}
              tags={current.tags}
              template={mode}
              isFavorite={
                isFavorited
              }
            />

          </div>

          {cards.length > 1 && (
            <button
              onClick={nextCard}
              className="
                absolute
                right-0
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/10
                text-xl
                backdrop-blur-xl
                transition-all
                hover:scale-105
                hover:bg-white/20
              "
            >
              →
            </button>
          )}

        </div>

        {/* Dots */}
        <div className="mt-5 flex items-center gap-2">

          {cards.map(
            (
              _,
              index
            ) => (

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

          <button
            onClick={
              toggleFavorite
            }
            className={`
              rounded-2xl
              border
              px-5
              py-3
              text-sm
              font-semibold
              transition-all
              duration-300
              backdrop-blur-xl
              ${
                isFavorited
                  ? `
                    border-pink-400/40
                    bg-pink-500/20
                    text-pink-100
                  `
                  : `
                    border-white/10
                    bg-white/5
                    text-white/80
                    hover:bg-white/10
                  `
              }
            `}
          >

            {isFavorited
              ? "💖 已收藏"
              : "🤍 收藏人格"}

          </button>

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

        {/* Favorites */}
        <div className="mt-12 w-full">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <div className="text-lg font-bold text-white">
                收藏人格
              </div>

              <div className="mt-1 text-sm text-zinc-500">
                你收藏過的 AI 人格版本
              </div>

            </div>

            <div className="rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1 text-xs text-pink-100">
              {favorites.length} Favorites
            </div>

          </div>

          {favorites.length === 0 ? (

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">

              <div className="text-4xl">
                💫
              </div>

              <div className="mt-4 text-sm text-zinc-400">
                你還沒有收藏的人格卡
              </div>

            </div>

          ) : (

            <div className="space-y-4">

              {favorites.map(
                (
                  item
                ) => (

                  <div
                    key={item.id}
                    className="
                      rounded-[28px]
                      border
                      border-white/10
                      bg-white/5
                      p-5
                      backdrop-blur-xl
                    "
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <div className="text-lg font-bold text-white">
                          {item.title}
                        </div>

                        <div className="mt-2 text-sm text-zinc-400">
                          {item.tags}
                        </div>

                        <div className="mt-3 text-xs text-zinc-500">
                          收藏於 {item.createdAt}
                        </div>

                      </div>

                      <button
                        onClick={() => {

                          const filtered =
                            favorites.filter(
                              (
                                favorite
                              ) =>
                                favorite.id !==
                                item.id
                            );

                          setFavorites(
                            filtered
                          );

                          localStorage.setItem(
                            "thisme-favorites",
                            JSON.stringify(
                              filtered
                            )
                          );
                        }}
                        className="
                          rounded-full
                          border
                          border-white/10
                          bg-white/5
                          px-3
                          py-2
                          text-xs
                          text-white/70
                          transition-all
                          hover:bg-red-500/20
                          hover:text-red-100
                        "
                      >
                        移除
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

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