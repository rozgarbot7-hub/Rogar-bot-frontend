"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Is Rozgar Bot free to use?",
    answer:
      "Yes! Rozgar Bot is 100% free. You can easily browse job listings and apply without any cost.",
  },
  {
    question: "Does Rozgar Bot provide remote jobs?",
    answer:
      "Absolutely! You can use filters to search for Remote, Part-time, Full-time, and Internship jobs.",
  },
  {
    question: "Where does Rozgar Bot get job data from?",
    answer:
      "Rozgar Bot fetches jobs from verified sources (Rozee.pk, LinkedIn, Indeed, etc.) to ensure authentic opportunities.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "Currently, you can browse and apply to jobs without signing up. In future updates, signing up will allow you to save your favorite jobs.",
  },
  {
    question: "How can I apply for a job?",
    answer:
      "Each job card includes an 'Apply' button. Click on it to go directly to the employer’s website or Rozgar Bot’s apply page.",
  },
  {
    question: "Does Rozgar Bot guarantee a job?",
    answer:
      "Rozgar Bot shows you verified job listings, but the final hiring decision always belongs to the employer.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-12">
        Rozgar Bot FAQ – Your Questions, Our Answers
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="border border-emerald-200 rounded-xl bg-white shadow-sm transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-emerald-700"
              >
                {item.question}
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-emerald-600" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-600 transition-all">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
