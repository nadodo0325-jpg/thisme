export function parseResponse(
  raw: string
) {

  const clean =
    raw.replace(/\*\*/g, "");

  const getValue = (
    label: string
  ) => {

    const regex = new RegExp(
      `${label}[:：]\\s*([\\s\\S]*?)(?=\\n[A-Za-z\u4e00-\u9fa5]+[:：]|$)`
    );

    return (
      clean.match(regex)?.[1]
        ?.trim() || ""
    );
  };

  return {

    title:
      getValue("人格") ||
      "無法定義的人",

    love:
      getValue("戀愛狀態") ||
      "有些情緒，沒有答案。",

    dark:
      getValue("黑暗面") ||
      "你只是太習慣忍耐。",

    friends:
      getValue("朋友眼中的你") ||
      "有些人其實很懂你。",

  };
}