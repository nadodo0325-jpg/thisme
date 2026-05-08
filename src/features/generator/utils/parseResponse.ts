export function parseResponse(
  text: string
) {

  // 統一換行
  const cleaned =
    text
      .replace(/\r/g, "")
      .trim();

  // 通用抓取函式
  const extract = (
    labels: string[]
  ) => {

    for (const label of labels) {

      const regex =
        new RegExp(
          `${label}[：:]\\s*([\\s\\S]*?)(?=\\n(?:人格|戀愛狀態|黑暗面|朋友眼中的你|標籤|Tags?)[：:]|$)`,
          "i"
        );

      const match =
        cleaned.match(regex);

      if (
        match?.[1]
      ) {

        return match[1]
          .trim()
          .replace(/\n+/g, " ")
          .replace(/\s{2,}/g, " ");
      }
    }

    return "";
  };

  const title =
    extract([
      "人格",
      "人格名稱",
      "標題",
    ]);

  const love =
    extract([
      "戀愛狀態",
      "戀愛人格",
      "愛情狀態",
    ]);

  const dark =
    extract([
      "黑暗面",
      "陰暗面",
      "真實黑暗面",
    ]);

  const friends =
    extract([
      "朋友眼中的你",
      "朋友視角",
      "朋友怎麼看你",
    ]);

  const tags =
    extract([
      "標籤",
      "Tags",
      "TAGS",
    ]);

  // 自動補 #
  const normalizedTags =
    tags
      ? tags
          .split(/[\s,，]+/)
          .filter(Boolean)
          .map((tag) =>
            tag.startsWith("#")
              ? tag
              : `#${tag}`
          )
          .slice(0, 5)
          .join(" ")
      : "#情緒型人格 #慢熱系 #高敏感";

  return {
    title:
      title ||
      "情緒觀察者",

    love:
      love ||
      "你總是比別人更容易投入。",

    dark:
      dark ||
      "你習慣把情緒藏起來。",

    friends:
      friends ||
      "大家其實比你想像中更懂你。",

    tags:
      normalizedTags,
  };
}