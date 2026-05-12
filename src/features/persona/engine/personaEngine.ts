import { PersonaState } from "../types/persona";

type Vector = {
  loneliness: number;
  anxiety: number;
  validation: number;
  intimacy: number;
  avoidance: number;
};

export function generatePersona(
  vector: Vector
): PersonaState {
  const dominantEmotion =
    Object.entries(vector).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

  /*
    MIDNIGHT THINKER
  */

  if (
    vector.loneliness >= 4 &&
    vector.anxiety >= 3
  ) {
    return {
      archetype:
        "midnight-thinker",

      tone: "poetic",

      energy: "low",

      description:
        "Quiet, introspective, emotionally deep.",

      quote:
        "You feel everything deeply, even the things you never say out loud.",

      gradient:
        "from-indigo-950 via-black to-black",

      accent:
        "text-indigo-300",
    };
  }

  /*
    DETACHED GHOST
  */

  if (
    vector.avoidance >= 4
  ) {
    return {
      archetype:
        "detached-ghost",

      tone: "cold",

      energy: "low",

      description:
        "Emotionally distant but constantly observing.",

      quote:
        "You disappear before people can leave you first.",

      gradient:
        "from-zinc-900 via-black to-black",

      accent:
        "text-zinc-300",
    };
  }

  /*
    VALIDATION CHASER
  */

  if (
    vector.validation >= 4
  ) {
    return {
      archetype:
        "validation-chaser",

      tone: "chaotic",

      energy: "high",

      description:
        "You crave connection, attention, and emotional reassurance.",

      quote:
        "Silence feels louder when you need to feel seen.",

      gradient:
        "from-fuchsia-950 via-black to-black",

      accent:
        "text-fuchsia-300",
    };
  }

  /*
    HOPE ROMANTIC
  */

  if (
    vector.intimacy >= 4
  ) {
    return {
      archetype:
        "hope-romantic",

      tone: "soft",

      energy: "medium",

      description:
        "Warm, affectionate, and emotionally available.",

      quote:
        "Even after disappointment, you still believe closeness is worth it.",

      gradient:
        "from-rose-950 via-black to-black",

      accent:
        "text-rose-300",
    };
  }

  /*
    ANXIOUS OVERTHINKER
  */

  if (
    vector.anxiety >= 4
  ) {
    return {
      archetype:
        "anxious-overthinker",

      tone: "poetic",

      energy: "medium",

      description:
        "Your mind keeps running long after the moment ends.",

      quote:
        "You replay conversations like unfinished songs.",

      gradient:
        "from-cyan-950 via-black to-black",

      accent:
        "text-cyan-300",
    };
  }

  /*
    FALLBACK
  */

  return {
    archetype:
      dominantEmotion ===
      "loneliness"
        ? "quiet-soul"
        : "soft-heart",

    tone: "soft",

    energy: "medium",

    description:
      "Sensitive, reflective, and emotionally open.",

    quote:
      "Even after everything, you still choose softness.",

    gradient:
      "from-rose-950 via-black to-black",

    accent:
      "text-rose-300",
  };
}