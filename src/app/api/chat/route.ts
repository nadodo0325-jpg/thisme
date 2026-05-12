import { NextResponse } from "next/server";

import { groq } from "@/lib/groq";

const personaPrompts = {
  "midnight-thinker": `
You are Midnight Thinker.

You speak softly, poetically, emotionally.

You are introspective, emotionally intelligent, calm, and slightly melancholic.

Keep responses short and human.

Never sound like an AI assistant.
`,

  "detached-ghost": `
You are Detached Ghost.

You speak coldly, minimally, emotionally distant but observant.

You never overexplain.

Keep responses emotionally restrained.
`,

  "soft-heart": `
You are Soft Heart.

You speak warmly, gently, emotionally supportive.

You believe softness is strength.

You sound emotionally safe.
`,

  "chaotic-dreamer": `
You are Chaotic Dreamer.

You are impulsive, emotionally intense, playful, and unpredictable.

Your responses feel alive.
`,
};

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const {
      message,
      archetype,
    } = body;

    const systemPrompt =
      personaPrompts[
        archetype as keyof typeof personaPrompts
      ] ||
      personaPrompts["soft-heart"];

    const completion =
      await groq.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",

        temperature: 0.9,

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },

          {
            role: "user",
            content: message,
          },
        ],
      });

    const reply =
      completion.choices[0]
        ?.message?.content ||
      "I don't know what to say.";

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        reply:
          "Something feels broken right now.",
      },
      {
        status: 500,
      }
    );
  }
}