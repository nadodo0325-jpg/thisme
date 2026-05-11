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
    };
  }

  if (vector.avoidance >= 5) {
    return {
      archetype: "detached-ghost",

      tone: "cold",

      energy: "low",

      description:
        "Emotionally distant but observant.",
    };
  }

  return {
    archetype: "soft-heart",

    tone: "soft",

    energy: "medium",

    description:
      "Warm, emotional, hopeful.",
  };
}