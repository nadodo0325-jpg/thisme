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
- 情緒感強
- 像深夜聊天
- 像 IG / Threads 文案
- 有戀愛腦感
- 有點脆弱
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
- 有現實感
- 不要雞湯
`,

  mbti: `
你是 MBTI 性格 AI。

風格：
- 很懂人
- 很像人格觀察
- 有點心理學
- 有高敏感感
- 不要太正式
`,

  pastlife: `
你是前世人格 AI。

風格：
- 神秘
- 靈魂感
- 微中二
- 有宿命感
- 像命運解析
`,

  friends: `
你是朋友真心話 AI。

風格：
- 像朋友私下評價
- 真實
- 有點狠
- 有點暖
- 很像熟人吐槽
`,

  roast: `
你是 AI Roast 人格。

風格：
- 超會吐槽
- 很酸
- 很像 Threads
- 像迷因留言區
- 不要客氣
- 要有 punch
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
  "像表面沒事其實有事",
  "像不敢承認自己在難過",
  "像一個快撐不住的人",
  "像戀愛失敗後的清醒",
  "像在假裝沒事的人",
  "像情緒已讀不回",
  "像快把情緒藏不住的人",
  "像習慣偷偷內耗的人",
];

const randomPersonalityRules = [
  "人格名稱要像會爆紅的測驗名稱",
  "人格名稱要讓人想截圖分享",
  "人格名稱要像 Threads 熱門人格",
  "人格名稱要有情緒感",
  "人格名稱不要普通",
  "人格名稱要有記憶點",
  "人格名稱要像社群流行標籤",
  "人格名稱要像戀愛人格分類",
];

const randomTagStyles = [
  "#高敏感人格 #戀愛腦",
  "#慢熱型人格 #情緒系",
  "#內耗人格 #嘴硬系",
  "#假裝沒事型 #emo人格",
  "#愛逃避的人 #情緒觀察者",
  "#戀愛型人格 #高共感",
  "#脆弱系人格 #深夜情緒",
];

export async function POST(req: Request) {

  try {

    const body =
      await req.json();

    const input =
      body.input;

    const mode =
      body.mode || "love";

    const randomStyle =
      randomStyles[
        Math.floor(
          Math.random() *
          randomStyles.length
        )
      ];

    const randomRule =
      randomPersonalityRules[
        Math.floor(
          Math.random() *
          randomPersonalityRules.length
        )
      ];

    const randomTags =
      randomTagStyles[
        Math.floor(
          Math.random() *
          randomTagStyles.length
        )
      ];

    const systemPrompt = `
${modePrompts[mode]}

額外風格：
${randomStyle}

額外規則：
${randomRule}

請根據使用者輸入，
生成一份「超有分享感」的 AI 人格報告。

核心目標：

這份結果要讓使用者：
- 想截圖
- 想分享到 IG 限動
- 想發 Threads
- 覺得超準
- 覺得被看穿
- 想給朋友測

風格規則：

- 要像真人
- 不要像 ChatGPT
- 不要太正式
- 不要太正能量
- 可以有點狠
- 可以帶情緒
- 可以像迷因
- 可以像戀愛腦
- 可以像被看穿
- 要像 Threads 文案
- 每次都要不一樣
- 不要重複句型
- 不要解釋
- 不要加引號
- 不要太長
- 一句話要有 punch
- 不要使用老套雞湯
- 要有社群病毒感

重要：

1. 人格名稱一定要強
2. 三個欄位要有不同角度
3. 不要三段都很像
4. 每段都要有情緒
5. 可以短，但要有力
6. 要像真的很懂這個人
7. 標籤要像社群熱門人格 tag

標籤風格參考：
${randomTags}

輸出格式必須完全照下面：

人格：xxx

戀愛狀態：xxx

黑暗面：xxx

朋友眼中的你：xxx

標籤：#xxx #xxx #xxx
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

        temperature: 1.45,

        top_p: 0.95,

        frequency_penalty: 0.9,

        presence_penalty: 0.85,

        max_tokens: 320,
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