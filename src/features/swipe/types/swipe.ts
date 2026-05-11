export type EmotionCard = {
  id: string;

  text: string;

  emoji: string;

  weights: {
    loneliness?: number;
    anxiety?: number;
    validation?: number;
    intimacy?: number;
    avoidance?: number;
  };
};