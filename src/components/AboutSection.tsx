"use client";

import { Briefcase, Users, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-24 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-10">
          About Rozgar Bot 🤖
        </h2>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-14">
          Rozgar Bot is a modern <span className="font-semibold text-emerald-600">job finder platform</span> 
          that connects job seekers in Pakistan with the latest openings and 
          remote opportunities. Whether you are a student, fresher, or a 
          professional, finding the right job has never been this easy! 🚀
        </p>

        {/* Cute Info Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-green-600 hover:shadow-lg transition-all p-6">
            <Briefcase className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-gray-800 mb-2">Easy Job Search</h3>
            <p className="text-gray-600 text-sm">
              Quickly find jobs that match your skills with powerful search and filters.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-green-600 hover:shadow-lg transition-all p-6">
            <Users className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-gray-800 mb-2">For Everyone</h3>
            <p className="text-gray-600 text-sm">
              Students, freshers, and professionals — Rozgar Bot is for all job seekers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-green-600 hover:shadow-lg transition-all p-6">
            <Sparkles className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-gray-800 mb-2">Stress-Free</h3>
            <p className="text-gray-600 text-sm">
              Say goodbye to complicated job hunting — we keep it simple and fun!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
