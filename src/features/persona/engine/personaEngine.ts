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
        "深夜觀察者",

      tone: "poetic",

      energy: "low",

      description:
        "你總是在安靜裡想很多。表面冷靜，其實情緒比誰都深。",

      quote:
        "你不是不想靠近人，只是太習慣先把自己藏起來。",

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
        "情緒幽靈",

      tone: "cold",

      energy: "low",

      description:
        "你習慣保持距離，總是在離開之前先後退一步。",

      quote:
        "你消失的速度，總是比別人靠近你的速度更快。",

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
        "被需要成癮者",

      tone: "chaotic",

      energy: "high",

      description:
        "你很在意別人的情緒，也害怕自己不被需要。",

      quote:
        "有時候你想要的不是答案，只是有人願意看見你。",

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
        "浪漫倖存者",

      tone: "soft",

      energy: "medium",

      description:
        "即使失望過很多次，你還是相信真正的靠近存在。",

      quote:
        "你還願意相信愛，本身就已經很勇敢了。",

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
        "情緒內耗機",

      tone: "poetic",

      energy: "medium",

      description:
        "很多事情明明已經過去了，你卻還在腦海裡反覆重播。",

      quote:
        "你不是放不下，只是大腦從來沒有真正停下來過。",

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
        ? "安靜共感者"
        : "柔軟人格",

    tone: "soft",

    energy: "medium",

    description:
      "你比自己想像中更敏感，也比別人以為的更容易受傷。",

    quote:
      "在這個越來越冷淡的世界，你還願意保持溫柔。",

    gradient:
      "from-rose-950 via-black to-black",

    accent:
      "text-rose-300",
  };
}