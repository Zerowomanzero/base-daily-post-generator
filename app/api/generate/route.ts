import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 }
    );
  }

  const client = new OpenAI({ apiKey });

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You write short daily posts. Tone is educational, witty, calm.",
      },
      {
        role: "user",
        content:
          "Write one short daily crypto post focused on the Base ecosystem.",
      },
    ],
  });

  return NextResponse.json({
    post: completion.choices[0].message.content,
  });
}