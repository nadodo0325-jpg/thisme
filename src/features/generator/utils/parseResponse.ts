export function parseResponse(result: string) {

  const lines = result.split("\n");

  const title =
    lines.find((line) =>
      line.includes("版本：")
    ) || "";

  const text =
    lines.find((line) =>
      line.includes("句子：")
    ) || "";

  return {
    title: title.replace("版本：", "").trim(),
    text: text.replace("句子：", "").trim(),
  };
}