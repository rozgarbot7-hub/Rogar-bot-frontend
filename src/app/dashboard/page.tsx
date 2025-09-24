"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Job } from "@/types/job";

export default function Dashboard() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  // ✅ Saved Jobs load karna
  useEffect(() => {
    if (userId) {
      const jobs = JSON.parse(localStorage.getItem(`savedJobs-${userId}`) || "[]");

      // Agar job ke pass id nahi hai to ek assign kar do
      const jobsWithIds = jobs.map((job: Job, index: number) => ({
        ...job,
        id: job.id || job.id || `${Date.now()}-${index}`,
      }));

      setSavedJobs(jobsWithIds);
    }
  }, [userId]);

  if (!isLoaded) return <div>Loading...</div>;

  if (!userId) {
    return (
      <div className="text-red-500 p-6 text-center">
        ❌ Please log in to access dashboard
      </div>
    );
  }

  // ✅ Job Alerts toggle
  const handleAlertToggle = async () => {
    const newState = !alertsEnabled;
    setAlertsEnabled(newState);

    if (newState) {
      try {
        const res = await fetch("/api/alerts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user?.primaryEmailAddress?.emailAddress,
            keywords: "developer",
            location: "Pakistan",
            type: "Full-time",
          }),
        });

        const data = await res.json();
        if (data.success) {
          alert("✅ Job alerts enabled! Check your email.");
        } else {
          alert("❌ Failed to enable alerts.");
        }
      } catch (err) {
        console.error(err);
        alert("⚠️ Error sending job alert.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-600 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">Rozgar Bot</h2>
        <nav className="space-y-4">
          <a href="#profile" className="block hover:text-gray-200">👤 Profile</a>
          <a href="#saved" className="block hover:text-gray-200">⭐ Saved Jobs</a>
          <a href="#alerts" className="block hover:text-gray-200">🔔 Job Alerts</a>
          <a href="#settings" className="block hover:text-gray-200">⚙️ Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Profile Section */}
        <section id="profile" className="mb-12">
          <h1 className="text-2xl font-bold text-emerald-600 mb-4">
            Welcome, {user?.firstName} 🚀
          </h1>
        </section>

        {/* Saved Jobs Section */}
        <section id="saved" className="mb-12">
          <h2 className="text-xl font-bold text-emerald-600 mb-4">⭐ Saved Jobs</h2>
          {savedJobs.length === 0 ? (
            <p className="text-gray-500">No jobs saved yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {savedJobs.map((job, index) => (
                <div
                  key={job.id || job.id || index}
                  className="p-4 bg-white rounded-xl shadow-md text-left"
                >
                  <h3 className="font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Job Alerts Section */}
        <section id="alerts" className="mb-12">
          <h2 className="text-xl font-bold text-emerald-600 mb-4">🔔 Job Alerts</h2>
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
            <span className="text-gray-700">Email Job Alerts</span>
            <button
              onClick={handleAlertToggle}
              className={`px-4 py-2 rounded-lg text-white ${
                alertsEnabled ? "bg-emerald-600" : "bg-gray-400"
              }`}
            >
              {alertsEnabled ? "Disable" : "Enable"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
