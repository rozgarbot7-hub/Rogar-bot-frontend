"use client";

export default function RozgarVideo() {
  return (
    <section className="bg-emerald-100 py-16 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-8">
        What is Rozgar bot? – Understand In just 1 min 🎥
      </h2>
      <div className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg border border-emerald-200">
        <iframe
          src="https://www.youtube.com/embed/2EKAdeDXRC8"
          title="Rozgar Bot Demo"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
