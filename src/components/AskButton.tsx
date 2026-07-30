"use client";

export const OPEN_CHAT_EVENT = "portfolio:open-chat";

export default function AskButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
    >
      {children}
    </button>
  );
}
