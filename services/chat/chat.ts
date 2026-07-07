export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  type: "chat" | "action";
  message: string;
  action?: string;
};

export async function sendChatMessage(
  messages: ChatMessage[]
): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message.");
  }

  const data = await response.json();

console.log("SERVICE DATA:", data);

return data;
}