import { EmotionCard } from "../types/swipe";

export const emotionCards: EmotionCard[] = [
  {
    id: "lonely",
    text: "I want someone to stay.",
    emoji: "🌙",
    weights: {
      loneliness: 3,
      intimacy: 2,
    },
  },

  {
    id: "validation",
    text: "I want to feel important.",
    emoji: "✨",
    weights: {
      validation: 4,
    },
  },

  {
    id: "avoidance",
    text: "I disappear when things get real.",
    emoji: "🫥",
    weights: {
      avoidance: 5,
    },
  },

  {
    id: "overthinking",
    text: "My thoughts never stop.",
    emoji: "🌀",
    weights: {
      anxiety: 4,
    },
  },
];