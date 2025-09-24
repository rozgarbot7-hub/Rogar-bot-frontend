import { NextResponse } from "next/server";

type ApiResponse = {
  answer?: string;
  [key: string]: unknown;
};

export async function POST(req: Request) {
  const { message } = await req.json();

  // ⚠️ `/docs` nahi, actual API endpoint `/ask` hai
  const res = await fetch("https://rozgar-bot-server.onrender.com/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });

  const data: ApiResponse = await res.json();

  // normalize: hamesha ek answer string bhejna
  let answer: string | null = null;
  if (typeof data.answer === "string") {
    answer = data.answer;
  } else {
    try {
      answer = JSON.stringify(data);
    } catch {
      answer = "Kuch ghalat ho gaya.";
    }
  }

  return NextResponse.json({ answer });
}
