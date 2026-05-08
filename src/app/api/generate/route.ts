import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const modePrompts: Record<
  string,
  string
> = {

  love: `
你是戀愛人格分析 AI。

風格：
- 曖昧
- 有點情緒
- 像深夜聊天
- 像 IG / Threads 文案
- 有戀愛腦感
- 不要太正能量
`,

  dark: `
你是暗黑人格 AI。

風格：
- 毒舌
- 冷淡
- 有點狠
- 像朋友吐槽
- 像 Threads 迷因
- 不要雞湯
`,

  mbti: `
你是 MBTI 性格 AI。

風格：
- 很懂人
- 很像人格觀察
- 有點心理學
- 不要太正式
`,

  pastlife: `
你是前世人格 AI。

風格：
- 神秘
- 靈魂感
- 微中二
- 有宿命感
`,

  friends: `
你是朋友真心話 AI。

風格：
- 像朋友私下評價
- 真實
- 有點狠
- 但很準
`,

  roast: `
你是 AI Roast 人格。

風格：
- 超會吐槽
- 很酸
- 很像 Threads
- 像迷因留言區
- 不要客氣
`,
};

const randomStyles = [
  "像凌晨三點發的限動",
  "像沒有發出去的訊息",
  "像前任會講的話",
  "像朋友突然看穿你",
  "像情緒爆炸前一秒",
  "像在逞強的人",
  "像喝醉後才敢承認",
  "像很久沒被理解的人",
  "像情緒快爛掉的人",
  "像表面沒事其實有事",
];

export async function POST(req: Request) {

  try {

    const body =
      await req.json();

    const input =
      body.input;

    const mode =
      body.mode || "love";

    // 隨機風格
    const randomStyle =
      randomStyles[
        Math.floor(
          Math.random() *
          randomStyles.length
        )
      ];

    const systemPrompt = `
${modePrompts[mode]}

額外風格：
${randomStyle}

請根據使用者輸入，
生成一份 AI 人格報告。

規則：

- 要像真人
- 不要像 ChatGPT
- 不要太正式
- 不要太正能量
- 可以有點狠
- 可以帶情緒
- 要像 Threads 文案
- 每次都要不一樣
- 不要重複句型
- 不要解釋
- 不要加引號

輸出格式必須完全照下面：

人格：xxx

戀愛狀態：xxx

黑暗面：xxx

朋友眼中的你：xxx
`;

    const completion =
      await groq.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },

          {
            role: "user",
            content: input,
          },
        ],

        temperature: 1.3,

        top_p: 0.95,

        max_tokens: 220,
      });

    const text =
      completion.choices[0]
        .message.content;

    return Response.json({
      result: text,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      error: "生成失敗",
    });
  }
}