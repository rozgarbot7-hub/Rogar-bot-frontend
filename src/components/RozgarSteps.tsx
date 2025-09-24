"use client";
import { FaSearch, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch size={36} className="text-emerald-600" />,
    title: "1. Search Jobs",
    desc: "Find jobs that match your skills through Rozgar Bot.",
  },
  {
    icon: <FaPaperPlane size={36} className="text-emerald-600" />,
    title: "2. Apply",
    desc: "Apply to your preferred job – with a fast and easy process.",
  },
  {
    icon: <FaCheckCircle size={36} className="text-emerald-600" />,
    title: "3. Get Hired",
    desc: "Land your dream job and take your career to the next level!",
  },
];

export default function RozgarSteps() {
  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-emerald-700 mb-12 font-poppins">
        Rozgar Bot – Your Path to Success 💼
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-emerald-300 border border-emerald-100 transition-transform hover:scale-105"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
