import { NextRequest, NextResponse } from "next/server";
import groq from "@/lib/ai";
import { parseAction } from "@/services/parser/actionParser";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1].content;

    const parsedAction = parseAction(lastMessage);
console.log("Parsed Action:", parsedAction);
    // Blockchain Action
    if (parsedAction.action !== "CHAT") {
     return NextResponse.json({
  type: "action",
  action: parsedAction.action,
  message: parsedAction.message,

  amount: parsedAction.amount,

  recipient: parsedAction.recipient,

  token: parsedAction.token,
});
    }

    // Normal AI Chat
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are Base MCP v2, an AI Blockchain Agent. Keep answers short and helpful.",
        },
        ...messages,
      ],
    });

    return NextResponse.json({
      type: "chat",
      message:
        completion.choices[0]?.message?.content ??
        "I couldn't generate a response.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}