"use client";
import { useState, useRef, useEffect } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  salary?: string;
  experience?: string;
  apply_link: string;
}

interface Message {
  role: "user" | "agent";
  text?: string;
  jobs?: Job[];
}

export default function RozgarBotUI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", text: "👋 Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // scroll automatically to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (queryText?: string) => {
    const query = queryText || input;
    if (!query.trim()) return;

    const userMsg: Message = { role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/rozgar-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const agentMsg: Message = {
        role: "agent",
        text: data.answer ?? "Koi jawab nahi mila.",
        jobs: Array.isArray(data.jobs) ? data.jobs : [],
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: "⚠️ Kuch ghalat ho gaya, dobara koshish karo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === "user"
                ? "ml-auto bg-emerald-100 text-right"
                : "mr-auto bg-gray-100 text-left"
            }`}
          >
            {msg.text && <p>{msg.text}</p>}

            {msg.jobs && msg.jobs.length > 0 && (
              <div className="mt-3 space-y-3">
                {msg.jobs.map((job, j) => (
                  <div key={j} className="border p-3 rounded-lg bg-white shadow-sm">
                    <h3 className="font-bold text-emerald-700">{job.title}</h3>
                    <p className="text-sm text-gray-600">
                      {job.company} {job.location ? "— " + job.location : ""}
                    </p>
                    {job.salary && <p>💰 {job.salary}</p>}
                    {job.experience && <p>📝 {job.experience}</p>}
                    <a
                      href={job.apply_link || "#"}
                      target="_blank"
                      className="text-emerald-600 underline"
                    >
                      Apply Here
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your query..."
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
