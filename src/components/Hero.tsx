import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-snug">
          Find your next job with{" "}
          <span className="text-emerald-700 relative">
            Rozgar Bot
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-emerald-200 -z-10 rounded-md"></span>
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Fresh openings across Pakistan and remote roles. Search, filter and apply in minutes — 
          start your career journey today!
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/jobs"
            className="inline-flex items-center rounded-full bg-emerald-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-emerald-300 hover:scale-105 transition-all duration-300"
          >
            🔍 Browse Jobs
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-white border border-emerald-600 text-emerald-700 px-8 py-4 text-lg font-semibold shadow hover:shadow-emerald-200 hover:bg-emerald-50 transition-all duration-300"
          >
            📩 Contact Us
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          ✅ 1000+ jobs listed every week • Trusted by job seekers
        </p>
      </div>
    </section>
  );
}
