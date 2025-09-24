"use client";

import { Job } from "@/types/job";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/nextjs";

export default function JobCard({ job }: { job: Job }) {
  const { userId } = useAuth();
  const date = new Date(job.postedAt);

  const [saved, setSaved] = useState(false);

  const saveJob = () => {
    if (!userId) return; // agar user login nahi hai to return

    const savedJobs = JSON.parse(localStorage.getItem(`savedJobs-${userId}`) || "[]");
    if (!savedJobs.find((j: Job) => j.id === job.id)) {
      savedJobs.push(job);
      localStorage.setItem(`savedJobs-${userId}`, JSON.stringify(savedJobs));
    }
    setSaved(true);
  };

  return (
    <div className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition bg-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-emerald-700">{job.title}</h3>
          <p className="text-sm text-gray-700">
            {job.company} • {job.location}
          </p>
          <p className="text-xs mt-1 text-gray-500">
            {job.type} • Posted {date.toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-end">
          {/* Apply Button */}
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl border border-emerald-600 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
          >
            Apply
          </a>

          {/* Save Job Button */}
          <SignedIn>
            <button
              onClick={saveJob}
              disabled={saved}
              className={`px-3 py-2 rounded-xl text-sm transition ${
                saved
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {saved ? "Saved ✅" : "Save Job"}
            </button>
          </SignedIn>

          {/* Show Sign in button if logged out */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-3 py-2 rounded-xl text-sm bg-emerald-600 text-white hover:bg-emerald-700">
                Sign in to Save
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
