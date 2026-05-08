export function parseResponse(
  text: string
) {

  // 統一換行
  const cleaned =
    text.replace(/\r/g, "");

  // 通用抓取函式
  const extract = (
    label: string
  ) => {

    const regex =
      new RegExp(
        `${label}[：:]\\s*([\\s\\S]*?)(?=\\n[A-Za-z\u4e00-\u9fa5]+[：:]|$)`
      );

    const match =
      cleaned.match(regex);

    return (
      match?.[1]
        ?.trim()
        ?.replace(/\n/g, " ") ||
      ""
    );
  };

  const title =
    extract("人格");

  const love =
    extract("戀愛狀態");

  const dark =
    extract("黑暗面");

  const friends =
    extract("朋友眼中的你");

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
  };
}