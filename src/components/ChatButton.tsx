"use client";
import { useRouter } from "next/navigation";

export default function ChatButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/chat")}
      className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition"
    >
      💬 AI Job Assistant
    </button>
  );
}
