import { EmotionCard } from "../types/swipe";

export const emotionCards: EmotionCard[] =
  [
    {
      id: "lonely-night",

      vibe: "dreamy",

      emoji: "🌙",

      text:
        "You miss people even when you choose to be alone.",

      subtext:
        "Some people learn loneliness so well it starts feeling safe.",

      weights: {
        loneliness: 3,
        intimacy: 2,
      },

      aiReply: {
        resonate:
          "You feel absence very deeply.",

        reject:
          "Maybe you've just gotten good at distancing yourself.",

        neutral:
          "You're harder to read than most people.",
      },
    },

    {
      id: "validation-loop",

      vibe: "soft",

      emoji: "✨",

      text:
        "Being ignored hurts more than you admit.",

      subtext:
        "You notice small changes in attention immediately.",

      weights: {
        validation: 4,
        anxiety: 1,
      },

      aiReply: {
        resonate:
          "You care more than you pretend to.",

        reject:
          "You probably learned not to expect too much.",

        neutral:
          "You keep a lot of reactions hidden.",
      },
    },

    {
      id: "emotional-avoidance",

      vibe: "dark",

      emoji: "🫥",

      text:
        "You disappear when things start feeling real.",

      subtext:
        "Avoidance can look a lot like self-protection.",

      weights: {
        avoidance: 5,
      },

      aiReply: {
        resonate:
          "Running feels safer than staying.",

        reject:
          "Maybe you just hate emotional pressure.",

        neutral:
          "You don't fully trust emotional closeness.",
      },
    },

    {
      id: "overthinking",

      vibe: "chaotic",

      emoji: "🌀",

      text:
        "Your brain replays moments long after everyone else forgot them.",

      subtext:
        "You revisit emotions more than most people.",

      weights: {
        anxiety: 4,
      },

      aiReply: {
        resonate:
          "You carry conversations longer than you should.",

        reject:
          "You might just hide your anxiety better.",

        neutral:
          "Your mind rarely fully rests.",
      },
    },

    {
      id: "hopeless-romantic",

      vibe: "dreamy",

      emoji: "💫",

      text:
        "Part of you still believes someone will understand you completely.",

      subtext:
        "Even after disappointment, you haven't fully given up.",

      weights: {
        intimacy: 4,
        loneliness: 1,
      },

      aiReply: {
        resonate:
          "You still want emotional depth.",

        reject:
          "Maybe you've stopped expecting people to stay.",

        neutral:
          "You want connection, but carefully.",
      },
    },

    {
      id: "silent-anxiety",

      vibe: "dark",

      emoji: "🫠",

      text:
        "You act calm even when you're mentally collapsing.",

      subtext:
        "People often mistake your silence for stability.",

      weights: {
        anxiety: 3,
        avoidance: 2,
      },

      aiReply: {
        resonate:
          "You hide emotional exhaustion extremely well.",

        reject:
          "You've probably become numb to stress.",

        neutral:
          "You don't like people seeing you overwhelmed.",
      },
    },

    {
      id: "attachment",

      vibe: "soft",

      emoji: "🩶",

      text:
        "You get emotionally attached faster than you want to admit.",

      subtext:
        "You feel safe with people very quickly.",

      weights: {
        intimacy: 3,
        validation: 2,
      },

      aiReply: {
        resonate:
          "You feel emotional shifts immediately.",

        reject:
          "Maybe you've become more guarded recently.",

        neutral:
          "You try to stay detached, but not completely.",
      },
    },

    {
      id: "emotional-mask",

      vibe: "dark",

      emoji: "🎭",

      text:
        "Most people don't know how intense your emotions actually are.",

      subtext:
        "You learned how to look okay before you actually were.",

      weights: {
        loneliness: 2,
        anxiety: 2,
      },

      aiReply: {
        resonate:
          "You hide depth behind composure.",

        reject:
          "You don't like being emotionally exposed.",

        neutral:
          "You reveal yourself very selectively.",
      },
    },

    {
      id: "softness",

      vibe: "soft",

      emoji: "🤍",

      text:
        "Even after everything, you still choose softness.",

      subtext:
        "Some people become colder. You didn't.",

      weights: {
        intimacy: 3,
      },

      aiReply: {
        resonate:
          "You still believe kindness matters.",

        reject:
          "Maybe softness stopped feeling safe.",

        neutral:
          "You protect your softness carefully now.",
      },
    },

    {
      id: "fear-of-loss",

      vibe: "dreamy",

      emoji: "🌧️",

      text:
        "You get scared people will leave once they know you deeply.",

      subtext:
        "Being understood feels comforting and terrifying at the same time.",

      weights: {
        anxiety: 2,
        loneliness: 3,
      },

      aiReply: {
        resonate:
          "You expect loss before closeness fully settles.",

        reject:
          "You probably learned emotional distance early.",

        neutral:
          "Trust takes a long time for you.",
      },
    },
  ];