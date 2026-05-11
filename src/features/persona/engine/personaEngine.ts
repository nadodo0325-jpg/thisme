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
  if (
    vector.loneliness >= 5 &&
    vector.anxiety >= 4
  ) {
    return {
      archetype: "midnight-thinker",

      tone: "poetic",

      energy: "low",

      description:
        "Quiet, emotional, reflective.",

      quote:
        "You feel everything deeply, even the things you never say out loud.",

      gradient:
        "from-indigo-950 via-black to-black",

      accent: "text-indigo-300",
    };
  }

  if (vector.avoidance >= 5) {
    return {
      archetype: "detached-ghost",

      tone: "cold",

      energy: "low",

      description:
        "Emotionally distant but observant.",

      quote:
        "You disappear before people can leave you first.",

      gradient:
        "from-zinc-900 via-black to-black",

      accent: "text-zinc-300",
    };
  }

  return {
    archetype: "soft-heart",

    tone: "soft",

    energy: "medium",

    description:
      "Warm, emotional, hopeful.",

    quote:
      "Even after everything, you still choose softness.",

    gradient:
      "from-rose-950 via-black to-black",

    accent: "text-rose-300",
  };
}