import { EmotionCard } from "../types/swipe";

export const emotionCards: EmotionCard[] =
  [
    {
      id: "late-night-reply",

      vibe: "dreamy",

      emoji: "🌙",

      text:
        "你總是在深夜，突然很想某個人。",

      subtext:
        "白天能忍住的情緒，到了晚上總會慢慢浮上來。",

      weights: {
        loneliness: 3,
        intimacy: 2,
      },

      aiReply: {
        resonate:
          "你其實比自己想像中更念舊。",

        reject:
          "你只是很習慣把情緒藏到深夜。",

        neutral:
          "有些情緒只有晚上會出現。",
      },
    },

    {
      id: "seen-message",

      vibe: "soft",

      emoji: "📱",

      text:
        "被已讀不回時，你會反覆想是不是自己做錯了什麼。",

      subtext:
        "你其實很容易察覺別人情緒的變化。",

      weights: {
        validation: 4,
        anxiety: 1,
      },

      aiReply: {
        resonate:
          "你比大部分人更在意細節。",

        reject:
          "你可能只是習慣降低期待。",

        neutral:
          "你很少真正表現出失落。",
      },
    },

    {
      id: "emotional-distance",

      vibe: "dark",

      emoji: "🫥",

      text:
        "當別人開始太靠近，你反而會想後退。",

      subtext:
        "有時候不是不想靠近，而是太怕失去。",

      weights: {
        avoidance: 5,
      },

      aiReply: {
        resonate:
          "離開通常比留下更讓你安心。",

        reject:
          "你只是需要自己的空間。",

        neutral:
          "你對情緒靠近一直很敏感。",
      },
    },

    {
      id: "overthinking",

      vibe: "chaotic",

      emoji: "🌀",

      text:
        "你會一直重播某些對話，直到睡著。",

      subtext:
        "很多別人早就忘記的小事，你卻記很久。",

      weights: {
        anxiety: 4,
      },

      aiReply: {
        resonate:
          "你的大腦很少真正停下來。",

        reject:
          "你只是看起來比別人冷靜。",

        neutral:
          "你會默默消化很多情緒。",
      },
    },

    {
      id: "romantic-core",

      vibe: "dreamy",

      emoji: "💫",

      text:
        "即使失望很多次，你還是期待真正的偏愛。",

      subtext:
        "你從來沒有真的放棄過被理解。",

      weights: {
        intimacy: 4,
        loneliness: 1,
      },

      aiReply: {
        resonate:
          "你還是相信真正的靠近存在。",

        reject:
          "你可能已經開始學會保護自己。",

        neutral:
          "你很渴望穩定的情感連結。",
      },
    },

    {
      id: "silent-breakdown",

      vibe: "dark",

      emoji: "🫠",

      text:
        "你常常一邊正常聊天，一邊偷偷情緒崩潰。",

      subtext:
        "很多人以為你很穩，其實不是。",

      weights: {
        anxiety: 3,
        avoidance: 2,
      },

      aiReply: {
        resonate:
          "你太習慣自己消化情緒了。",

        reject:
          "你可能早就麻痺很久了。",

        neutral:
          "你不喜歡讓人看見脆弱。",
      },
    },

    {
      id: "fast-attachment",

      vibe: "soft",

      emoji: "🩶",

      text:
        "你會很快對一個人產生情緒依賴。",

      subtext:
        "你其實很容易把真心放進關係裡。",

      weights: {
        intimacy: 3,
        validation: 2,
      },

      aiReply: {
        resonate:
          "你感受到情緒變化的速度很快。",

        reject:
          "你開始變得比較有防備了。",

        neutral:
          "你一直在控制自己的投入。",
      },
    },

    {
      id: "emotional-mask",

      vibe: "dark",

      emoji: "🎭",

      text:
        "大部分的人，其實不知道你真正的情緒有多重。",

      subtext:
        "你太早學會『看起來沒事』了。",

      weights: {
        loneliness: 2,
        anxiety: 2,
      },

      aiReply: {
        resonate:
          "你很擅長把情緒藏起來。",

        reject:
          "你不喜歡被看穿。",

        neutral:
          "你只會對少數人卸下防備。",
      },
    },

    {
      id: "soft-heart",

      vibe: "soft",

      emoji: "🤍",

      text:
        "經歷很多事情後，你還是選擇溫柔。",

      subtext:
        "不是每個人都能在受傷後還保持柔軟。",

      weights: {
        intimacy: 3,
      },

      aiReply: {
        resonate:
          "你其實一直都很善良。",

        reject:
          "你開始學會保護自己的情緒了。",

        neutral:
          "你的溫柔變得更安靜了。",
      },
    },

    {
      id: "fear-of-losing",

      vibe: "dreamy",

      emoji: "🌧️",

      text:
        "你很害怕別人在真正了解你後離開。",

      subtext:
        "越靠近的關係，越容易讓你不安。",

      weights: {
        anxiety: 2,
        loneliness: 3,
      },

      aiReply: {
        resonate:
          "你總是提前準備失去。",

        reject:
          "你可能很早就習慣獨自承受。",

        neutral:
          "信任對你來說一直很難。",
      },
    },

    {
      id: "social-exhaustion",

      vibe: "chaotic",

      emoji: "🔕",

      text:
        "有時候你突然消失，不是討厭誰，只是太累了。",

      subtext:
        "你需要大量自己的時間恢復情緒。",

      weights: {
        avoidance: 3,
        loneliness: 2,
      },

      aiReply: {
        resonate:
          "你一直都在偷偷耗電。",

        reject:
          "你只是討厭情緒壓力。",

        neutral:
          "你需要安靜才能恢復自己。",
      },
    },

    {
      id: "attention-shift",

      vibe: "soft",

      emoji: "👀",

      text:
        "你會立刻感覺到別人對你的態度變了。",

      subtext:
        "有些細節別人不在意，你卻會記很久。",

      weights: {
        validation: 3,
        anxiety: 2,
      },

      aiReply: {
        resonate:
          "你對情緒變化非常敏感。",

        reject:
          "你可能只是想太多了。",

        neutral:
          "你很在意關係裡的溫度。",
      },
    },
  ];