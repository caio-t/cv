"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { OPEN_CHAT_EVENT } from "./AskButton";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Ask me anything about Caio's experience — the projects, the stack, the timeline, or how a role might fit.",
};

const SUGGESTIONS = [
  "Summarise his backend experience",
  "Has he led teams?",
  "Which frontend frameworks has he shipped?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, open);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, open);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await send(input);
  }

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m !== WELCOME_MESSAGE)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-brass text-on-brass rounded-full shadow-xl px-5 py-3 hover:bg-brass-light transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="readout text-[13px] font-medium">
            Ask about my work
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 left-5 sm:bottom-8 sm:right-8 sm:left-auto sm:w-[27rem] z-50 flex flex-col bg-surface border border-rule-strong rounded-lg shadow-2xl overflow-hidden max-h-[75vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-rule">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-patina" aria-hidden />
          <span className="label text-muted">Portfolio assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted hover:text-foreground transition-colors"
          aria-label="Close assistant"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[180px]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-brass text-on-brass rounded-br-sm"
                  : "bg-surface-2 text-foreground/90 rounded-bl-sm border border-rule"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {messages.length === 1 && !isLoading && (
          <div className="flex flex-col items-start gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-left text-xs text-brass border border-rule hover:border-brass rounded px-2.5 py-1.5 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-2 border border-rule rounded-lg rounded-bl-sm px-3.5 py-3 dot-pulse">
              <span className="inline-block w-1.5 h-1.5 bg-muted rounded-full mx-0.5" />
              <span className="inline-block w-1.5 h-1.5 bg-muted rounded-full mx-0.5" />
              <span className="inline-block w-1.5 h-1.5 bg-muted rounded-full mx-0.5" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-3 border-t border-rule"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question"
          disabled={isLoading}
          className="flex-1 bg-background border border-rule rounded px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brass disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="readout bg-brass text-on-brass hover:bg-brass-light disabled:opacity-40 rounded px-3.5 py-2 text-sm font-medium transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
