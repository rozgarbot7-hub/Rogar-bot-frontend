"use client";
import { useState } from "react";
import RozgarBotUI from "./RozgarBotUI";
import { X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-700 transition"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[90%] max-w-md max-h-[80vh] bg-white border shadow-2xl rounded-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white px-4 py-3 flex justify-between items-center rounded-t-xl">
            <h2 className="font-semibold">AI Job Assistant</h2>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat UI */}
          <div className="flex-1 overflow-y-auto">
            <RozgarBotUI />
          </div>
        </div>
      )}
    </>
  );
}
