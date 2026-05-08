import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const input = body.input;

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
你是一個擅長生成 IG Story 情緒文案的助手。

規則：
1. 產生一個版本名稱
2. 產生一句短句
3. 不要太雞湯
4. 要像年輕人的內心話
5. 總字數不要太長

格式：

版本：xxx
句子：xxx
            `,
          },

          {
            role: "user",
            content: input,
          },
        ],

        temperature: 0.9,

        max_tokens: 80,
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