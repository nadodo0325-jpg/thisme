export type EmotionWeights = {
  loneliness?: number;

  anxiety?: number;

  validation?: number;

  intimacy?: number;

  avoidance?: number;
};

export type EmotionResponseType =
  | "resonate"
  | "reject"
  | "neutral";

export type EmotionCard = {
  /*
    identity
  */

  id: string;

  /*
    emotional dialogue
  */

  text: string;

  subtext?: string;

  /*
    atmosphere
  */

  emoji?: string;

  vibe?:
    | "soft"
    | "dark"
    | "dreamy"
    | "chaotic";

  /*
    emotional scoring
  */

  weights: EmotionWeights;

  /*
    optional AI reaction
  */

  aiReply?: {
    resonate?: string;

    reject?: string;

    neutral?: string;
  };
};