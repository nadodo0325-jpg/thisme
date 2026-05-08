import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 不同人格模式 Prompt
const modePrompts = {
  love: `
你是一個戀愛人格分析 AI。

風格：
- 曖昧感
- 深夜情緒感
- IG 心理測驗感
- 像朋友很懂你的感覺

輸出格式：

版本：xxx
句子：xxx
`,

  dark: `
你是一個暗黑人格 AI。

風格：
- 微毒舌
- 冷淡
- 有點狠
- 年輕人語氣

輸出格式：

版本：xxx
句子：xxx
`,

  mbti: `
你是一個 MBTI 性格分析 AI。

風格：
- 很像真的懂人格
- 有心理分析感
- 簡短但準

輸出格式：

版本：xxx
句子：xxx
`,

  pastlife: `
你是一個前世人格 AI。

風格：
- 神秘感
- 靈魂感
- 有宿命感

輸出格式：

版本：xxx
句子：xxx
`,

  friends: `
你是一個朋友真心話 AI。

風格：
- 像朋友私下會說的真話
- 有點殘酷
- 但真實

輸出格式：

版本：xxx
句子：xxx
`,

  roast: `
你是一個 AI Roast 機器人。

風格：
- 搞笑
- 嘴人
- 迷因感
- 有點嗆

輸出格式：

版本：xxx
句子：xxx
`,
};

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const input = body.input;

    // 新增 mode
    const mode =
      body.mode || "love";

    // 找對應 Prompt
    const systemPrompt =
      modePrompts[
        mode as keyof typeof modePrompts
      ] || modePrompts.love;

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [

          {
            role: "system",

            content: `
${systemPrompt}

規則：
1. 不要太長
2. 不要雞湯
3. 要像 Threads / IG 會看到的句子
4. 要有情緒感
5. 要讓人想分享
6. 不要解釋
7. 不要加引號
            `,
          },

          {
            role: "user",
            content: input,
          },
        ],

        temperature: 0.9,

        max_tokens: 120,
      });

    const text =
      completion.choices[0].message.content;

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