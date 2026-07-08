"use client";

import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { sendChatMessage } from "@/services/chat/chat";
import { executeAction } from "@/hooks/useExecutor";
import useTransactionEngine from "@/hooks/useTransactionEngine";
type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;

  hash?: string;

  explorer?: string;
};

export default function Chat() {
    const { address } = useAccount();
    const chainId = useChainId();
   const { send } = useTransactionEngine();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendChatMessage(
  updatedMessages.map(({ role, content }) => ({
    role,
    content,
  }))
);
console.log("API Reply:", reply);
console.log("API Reply Type:", typeof reply);
console.log("API Reply Object:", JSON.stringify(reply, null, 2));
console.log(reply);
if (reply.type === "chat") {
  setMessages((prev) => [
    ...prev,
    {
      id: Date.now() + 1,
      role: "assistant",
      content: reply.message,
    },
  ]);

  return;
}
console.log("Address:", address);
console.log("Chain ID:", chainId);
const result = await executeAction(
  {
    action: reply.action as any,
    message: reply.message,
    amount: (reply as any).amount,
    recipient: (reply as any).recipient,
    token: (reply as any).token,
  },
  address,
  chainId
);

if (
  result.success &&
  reply.action === "SEND_ETH" &&
  reply.amount &&
  reply.recipient
) {
  const tx = await send({
    recipient: reply.recipient as `0x${string}`,
    amount: reply.amount,
  });

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now() + 1,
      role: "assistant",
      content: tx.message,
      hash: tx.hash,
      explorer: tx.explorer,
    },
  ]);

  return;
}

if (result.success && reply.action === "SEND_USDC") {
  const tx = await send(result as any);

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now() + 1,
      role: "assistant",
      content: tx.message,
      hash: tx.hash,
      explorer: tx.explorer,
    },
  ]);

  return;
}

setMessages((prev) => [
  ...prev,
  {
    id: Date.now() + 1,
    role: "assistant",
    content: result.message,
  },
]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-white">
      <h2 className="mb-6 text-2xl font-bold">
        Base MCP AI
      </h2>

      <div className="mb-6 h-96 overflow-y-auto rounded-lg border border-zinc-800 bg-black p-4">
        {messages.length === 0 ? (
          <p className="text-zinc-500">
            Ask anything...
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user"
                    ? "text-right"
                    : "text-left"
                }
              >
                <div
                  className={`inline-block rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-600"
                      : "bg-zinc-700"
                  }`}
                >
                  <>
  <div>{message.content}</div>

  {message.hash && (
    <div className="mt-2 break-all text-xs text-zinc-400">
      Hash:
      <br />
      {message.hash}
    </div>
  )}

  {message.explorer && (
    <a
      href={message.explorer}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 block text-blue-400 underline hover:text-blue-300"
    >
      🔗 View on BaseScan
    </a>
  )}
</>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask Base MCP..."
          className="flex-1 rounded-lg border border-zinc-700 bg-black px-4 py-3 outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
