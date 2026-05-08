export function parseResponse(
  raw: string
) {

  const clean =
    raw.replace(/\*\*/g, "");

  const titleMatch =
    clean.match(/版本[:：]\s*(.+)/);

  const textMatch =
    clean.match(/句子[:：]\s*([\s\S]+)/);

  return {
    title:
      titleMatch?.[1]?.trim() ||
      "無法定義的人",

    text:
      textMatch?.[1]?.trim() ||
      "有些情緒，連 AI 都說不清。",
  };
}