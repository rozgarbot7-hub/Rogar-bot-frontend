"use client";
import { FaBell, FaPaperPlane, FaFilter } from "react-icons/fa";

const features = [
  {
    icon: <FaBell size={30} className="text-emerald-600" />,
    title: "Job Alerts",
    desc: "Get instant updates on new jobs – never miss an opportunity.",
  },
  {
    icon: <FaPaperPlane size={30} className="text-emerald-600" />,
    title: "Easy Apply",
    desc: "Apply with just one click – simple and fast process.",
  },
  {
    icon: <FaFilter size={30} className="text-emerald-600" />,
    title: "Smart Filters",
    desc: "Filter jobs according to your needs (remote, part-time, etc).",
  },
];

export default function RozgarFeatures() {
  return (
    <section className="bg-white py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-emerald-700 mb-12 font-poppins">
        Rozgar Bot Features 🤖
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-emerald-50 rounded-xl p-6 text-center shadow hover:shadow-emerald-300 hover:scale-105 transition-all border border-emerald-100"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-emerald-700 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
