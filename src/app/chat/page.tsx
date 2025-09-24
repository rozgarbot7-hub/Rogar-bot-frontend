"use client";
import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Mai AI Job Assistant hu. Aap ko kis job ki talash hai?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/rozgar-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput }), // ✅ fix text field
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "bot", text: data.answer || "Mujhe jawab nahi mila." }
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "bot", text: "Server error, dobara try karein." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-emerald-600 text-white p-4 text-center font-bold text-lg">
        Rozgar AI Chat
      </header>

      <div className="flex-1 p-4 flex flex-col-reverse overflow-y-auto space-y-3">
        <div ref={messagesEndRef} />
        {messages.slice().reverse().map((msg, i) => (
          <div
            key={i}
            className={`p-3 max-w-xs rounded-lg ${
              msg.role === "user" ? "bg-emerald-100 ml-auto" : "bg-gray-200 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="p-3 max-w-xs rounded-lg bg-gray-200 mr-auto">
            Typing...
          </div>
        )}
      </div>

      <footer className="p-4 flex gap-2 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-emerald-600 text-white px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
