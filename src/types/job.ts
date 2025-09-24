export type JobType = "Full-time" | "Part-time" | "Internship" | "Contract" | "Remote";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  postedAt: string; // ISO date string, e.g. "2025-08-22"
  applyUrl: string;
  source?: string;       // e.g. "Company Site", "Rozee.pk"
  salaryMin?: number;    // optional
  salaryMax?: number;    // optional
  currency?: string;     // e.g. "PKR", "USD"
  tags?: string[];       // e.g. ["Next.js","Tailwind"]
  description?: string;  // short summary (optional)
}
