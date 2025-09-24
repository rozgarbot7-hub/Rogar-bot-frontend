"use client";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Job } from "@/types/job";

export default function JobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchJobs("latest jobs in Pakistan");
  }, []);

  async function fetchJobs(query: string) {
    setLoading(true);
    setJobs([]);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setJobs(data.jobs ?? []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("fetchJobs error:", err.message);
      } else {
        console.error("fetchJobs error:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      {/* Search bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search (e.g. frontend, remote, Karachi)..."
            className="w-full md:max-w-md border rounded-xl px-4 py-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => fetchJobs(q || "latest jobs in Pakistan")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Search
          </button>
          <button
            onClick={() => {
              setQ("");
              fetchJobs("latest jobs in Pakistan");
            }}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* results */}
      {loading && <p className="text-center text-gray-500">Loading jobs...</p>}

      {!loading && jobs.length === 0 && (
        <p className="text-center text-gray-500">No jobs found.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {jobs.map((job, index) => (
          <JobCard key={job.id || index} job={job} />
        ))}
      </div>
    </section>
  );
}
