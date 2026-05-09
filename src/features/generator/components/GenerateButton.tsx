type Props = {
  onClick: () => void;

  loading?: boolean;

  mode?: string;
};

const modeConfig: Record<
  string,
  {
    emoji: string;
    title: string;
    subtitle: string;
    loadingTitle: string;
    loadingSubtitle: string;
    gradient: string;
    shadow: string;
  }
> = {
  love: {
    emoji: "💘",
    title: "生成戀愛人格",
    subtitle: "LOVE PERSONALITY ANALYSIS",
    loadingTitle: "AI 正在解析你的戀愛腦...",
    loadingSubtitle: "READING EMOTIONAL PATTERNS",
    gradient:
      "from-fuchsia-500 via-pink-500 to-rose-500",
    shadow:
      "hover:shadow-[0_0_70px_rgba(236,72,153,0.45)]",
  },

  dark: {
    emoji: "🖤",
    title: "生成黑暗人格",
    subtitle: "DARK SIDE ANALYSIS",
    loadingTitle: "AI 正在翻閱你的黑暗面...",
    loadingSubtitle: "SCANNING HIDDEN EMOTIONS",
    gradient:
      "from-zinc-700 via-zinc-900 to-black",
    shadow:
      "hover:shadow-[0_0_70px_rgba(255,255,255,0.18)]",
  },

  friends: {
    emoji: "👀",
    title: "生成朋友視角人格",
    subtitle: "FRIEND PERSPECTIVE",
    loadingTitle: "AI 正在模擬朋友眼中的你...",
    loadingSubtitle: "READING SOCIAL SIGNALS",
    gradient:
      "from-cyan-500 via-sky-500 to-blue-500",
    shadow:
      "hover:shadow-[0_0_70px_rgba(34,211,238,0.4)]",
  },

  roast: {
    emoji: "🔥",
    title: "開始 AI Roast",
    subtitle: "BRUTAL AI ANALYSIS",
    loadingTitle: "AI 正在準備吐槽你的靈魂...",
    loadingSubtitle: "GENERATING EMOTIONAL DAMAGE",
    gradient:
      "from-red-600 via-orange-500 to-yellow-500",
    shadow:
      "hover:shadow-[0_0_70px_rgba(239,68,68,0.45)]",
  },

  mbti: {
    emoji: "🧠",
    title: "生成 MBTI 人格",
    subtitle: "MBTI PERSONALITY REPORT",
    loadingTitle: "AI 正在分析你的性格結構...",
    loadingSubtitle: "MAPPING PERSONALITY TYPE",
    gradient:
      "from-slate-500 via-slate-700 to-slate-900",
    shadow:
      "hover:shadow-[0_0_70px_rgba(148,163,184,0.35)]",
  },

  pastlife: {
    emoji: "🔮",
    title: "生成前世人格",
    subtitle: "SOUL MEMORY ANALYSIS",
    loadingTitle: "AI 正在讀取你的靈魂記憶...",
    loadingSubtitle: "ACCESSING PAST LIFE DATA",
    gradient:
      "from-indigo-500 via-violet-500 to-purple-500",
    shadow:
      "hover:shadow-[0_0_70px_rgba(139,92,246,0.45)]",
  },
};

export default function GenerateButton({
  onClick,
  loading = false,
  mode = "love",
}: Props) {

  const currentMode =
    modeConfig[mode] ||
    modeConfig.love;

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        group
        relative
        mt-2
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        px-6
        py-5
        transition-all
        duration-300
        backdrop-blur-2xl
        ${
          loading
            ? `
              cursor-not-allowed
              bg-white/10
              opacity-80
            `
            : `
              bg-gradient-to-r
              ${currentMode.gradient}
              hover:scale-[1.015]
              ${currentMode.shadow}
              active:scale-[0.99]
            `
        }
      `}
    >

      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      >

        <div className="absolute left-0 top-0 h-full w-1/2 bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-full w-1/2 bg-white/20 blur-3xl" />

      </div>

      {/* Shine */}
      {!loading && (
        <div
          className="
            absolute
            inset-y-0
            -left-[30%]
            w-[30%]
            rotate-12
            bg-white/20
            blur-2xl
            transition-all
            duration-1000
            group-hover:left-[120%]
          "
        />
      )}

      {/* Pulse */}
      {!loading && (
        <div className="absolute inset-0 animate-pulse bg-white/[0.03]" />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4">

        {/* Icon */}
        {loading ? (

          <div
            className="
              h-5
              w-5
              animate-spin
              rounded-full
              border-2
              border-white/30
              border-t-white
            "
          />

        ) : (

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white/15
              text-2xl
              shadow-inner
              backdrop-blur-xl
            "
          >
            {currentMode.emoji}
          </div>

        )}

        {/* Text */}
        <div className="text-left">

          <div className="text-lg font-black tracking-tight text-white">

            {loading
              ? currentMode.loadingTitle
              : currentMode.title}

          </div>

          <div className="mt-1 text-xs tracking-[0.18em] text-white/70">

            {loading
              ? currentMode.loadingSubtitle
              : currentMode.subtitle}

          </div>

        </div>

      </div>

    </button>
  );
}