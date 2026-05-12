import { EmotionCard } from "../types/swipe";

export const emotionCards: EmotionCard[] =
  [
    {
      id: "lonely-night",
      text: "I miss people even when I choose to be alone.",
      emoji: "🌙",
      weights: {
        loneliness: 3,
        intimacy: 2,
      },
    },

    {
      id: "validation-loop",
      text: "Being ignored hurts more than I admit.",
      emoji: "✨",
      weights: {
        validation: 4,
        anxiety: 1,
      },
    },

    {
      id: "emotional-avoidance",
      text: "I disappear when things start feeling real.",
      emoji: "🫥",
      weights: {
        avoidance: 5,
      },
    },

    {
      id: "overthinking",
      text: "My brain replays moments I should've forgotten.",
      emoji: "🌀",
      weights: {
        anxiety: 4,
      },
    },

    {
      id: "hopeless-romantic",
      text: "I still believe someone will understand me completely.",
      emoji: "💫",
      weights: {
        intimacy: 4,
        loneliness: 1,
      },
    },

    {
      id: "silent-anxiety",
      text: "I act calm even when I'm mentally collapsing.",
      emoji: "🫠",
      weights: {
        anxiety: 3,
        avoidance: 2,
      },
    },

    {
      id: "attachment",
      text: "I get emotionally attached too fast.",
      emoji: "🩶",
      weights: {
        intimacy: 3,
        validation: 2,
      },
    },

    {
      id: "emotional-mask",
      text: "Most people don't know how intense my emotions actually are.",
      emoji: "🎭",
      weights: {
        loneliness: 2,
        anxiety: 2,
      },
    },

    {
      id: "softness",
      text: "Even after everything, I still choose softness.",
      emoji: "🤍",
      weights: {
        intimacy: 3,
      },
    },

    {
      id: "fear-of-loss",
      text: "I get scared people will leave once they know me deeply.",
      emoji: "🌧️",
      weights: {
        anxiety: 2,
        loneliness: 3,
      },
    },
  ];