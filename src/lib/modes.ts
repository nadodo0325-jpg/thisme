export type Mode = {
  id: string;

  name: string;

  shortName: string;

  emoji: string;

  description: string;

  placeholder: string;

  gradient: string;

  accent: string;

  cardLabel: string;

  trending: boolean;

  popular?: boolean;

  locked?: boolean;

  stats?: {
    shares: string;
    users: string;
  };
};

export const modes: Mode[] = [

  {
    id: "love",

    name: "戀愛人格",

    shortName: "LOVE",

    emoji: "💘",

    description:
      "像凌晨三點沒發出去的訊息",

    placeholder:
      "輸入最近讓你情緒內耗的人...",

    gradient:
      "from-[#3B0764] via-[#7E22CE] to-[#EC4899]",

    accent:
      "bg-pink-500/20 text-pink-100",

    cardLabel:
      "LOVE ANALYSIS",

    trending: true,

    popular: true,

    stats: {
      shares: "182K",
      users: "1.2M",
    },
  },

  {
    id: "dark",

    name: "黑暗人格",

    shortName: "DARK",

    emoji: "🖤",

    description:
      "那些你不敢承認的情緒",

    placeholder:
      "輸入你最不想被別人知道的一面...",

    gradient:
      "from-[#020617] via-[#111827] to-black",

    accent:
      "bg-zinc-500/20 text-zinc-100",

    cardLabel:
      "DARK SIDE",

    trending: true,

    popular: true,

    stats: {
      shares: "241K",
      users: "2.1M",
    },
  },

  {
    id: "friends",

    name: "朋友眼中的你",

    shortName: "FRIENDS",

    emoji: "👀",

    description:
      "別人其實比你更懂你",

    placeholder:
      "輸入朋友最常吐槽你的事...",

    gradient:
      "from-[#082F49] via-[#0369A1] to-[#06B6D4]",

    accent:
      "bg-cyan-500/20 text-cyan-100",

    cardLabel:
      "FRIEND VIEW",

    trending: false,

    popular: true,

    stats: {
      shares: "89K",
      users: "841K",
    },
  },

  {
    id: "roast",

    name: "AI Roast",

    shortName: "ROAST",

    emoji: "🔥",

    description:
      "AI 會直接吐槽你的靈魂",

    placeholder:
      "輸入你最近最荒謬的情緒狀態...",

    gradient:
      "from-[#3F0D12] via-[#7F1D1D] to-[#DC2626]",

    accent:
      "bg-red-500/20 text-red-100",

    cardLabel:
      "AI ROAST",

    trending: true,

    popular: true,

    stats: {
      shares: "312K",
      users: "3.4M",
    },
  },

  {
    id: "mbti",

    name: "MBTI 人格",

    shortName: "MBTI",

    emoji: "🧠",

    description:
      "像被人格學老師看穿",

    placeholder:
      "輸入你一直改不掉的性格習慣...",

    gradient:
      "from-[#1E293B] via-[#334155] to-[#475569]",

    accent:
      "bg-slate-500/20 text-slate-100",

    cardLabel:
      "MBTI REPORT",

    trending: false,

    popular: false,

    stats: {
      shares: "74K",
      users: "590K",
    },
  },

  {
    id: "pastlife",

    name: "前世人格",

    shortName: "PAST LIFE",

    emoji: "🔮",

    description:
      "你靈魂裡一直沒說的事",

    placeholder:
      "輸入最近一直重複出現的情緒...",

    gradient:
      "from-[#312E81] via-[#6366F1] to-[#A78BFA]",

    accent:
      "bg-indigo-500/20 text-indigo-100",

    cardLabel:
      "PAST LIFE",

    trending: false,

    popular: false,

    stats: {
      shares: "51K",
      users: "412K",
    },
  },
];