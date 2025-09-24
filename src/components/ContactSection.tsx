"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
      setError("Could not send your message. Please try again.");
    }
  }

  return (
    <section
      id="contactsection"
      className="relative bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-28 px-6 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-200 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-emerald-300 rounded-full opacity-20 blur-3xl -z-10"></div>

      <h2 className="text-4xl font-extrabold text-center text-emerald-700 mb-12">
        ✨ Contact Us ✨
      </h2>

      {/* Single Card Block */}
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl border hover:shadow-emerald-200 transition duration-300">
        <div className="text-center mb-8">
          <Mail className="w-14 h-14 text-emerald-600 mx-auto animate-bounce mb-3" />
          <p className="text-gray-600">
            Have a question? Fill out the form or email us at <br />
            <a
              href="mailto:support@rozgarbot.com"
              className="text-emerald-700 font-semibold underline"
            >
              support@rozgarbot.com
            </a>
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5">
          {/* Hidden anti-bot field */}
          <input
            type="text"
            name="website"
            value={form.honeypot}
            onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-xl px-4 py-3 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="🌸 Your Name"
          />

          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-xl px-4 py-3 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="📧 Your Email"
          />

          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full border rounded-xl px-4 py-3 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="✨ Subject"
          />

          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border rounded-xl px-4 py-3 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="💬 Write your message..."
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-6 py-3 font-semibold shadow-md hover:scale-105 hover:bg-emerald-700 transition transform duration-200 disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send Message 🚀"}
          </button>

          {status === "success" && (
            <p className="text-emerald-700 text-sm mt-2 text-center">
              🎉 Thanks! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
