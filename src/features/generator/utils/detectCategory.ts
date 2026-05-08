export function detectCategory(input: string) {

  const text = input.toLowerCase();

  // 低潮
  if (
    text.includes("累") ||
    text.includes("煩") ||
    text.includes("不想") ||
    text.includes("痛苦")
  ) {
    return "low";
  }

  // 掙扎
  if (
    text.includes("改變") ||
    text.includes("開始") ||
    text.includes("努力")
  ) {
    return "struggle";
  }

  // 關係
  if (
    text.includes("喜歡") ||
    text.includes("分手") ||
    text.includes("感情")
  ) {
    return "relationship";
  }

  // 偽裝
  if (
    text.includes("沒事") ||
    text.includes("還好") ||
    text.includes("習慣")
  ) {
    return "mask";
  }

  return "default";
}