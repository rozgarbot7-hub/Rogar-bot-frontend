"use client";
import { useState } from "react";

export default function AlertForm() {
  const [email, setEmail] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, keywords }),
    });
    const data = await res.json();
    alert(data.message || "Saved!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-emerald-600">📩 Job Alerts</h3>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Keywords (e.g. React, Designer)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">
        Save Alert
      </button>
    </form>
  );
}
