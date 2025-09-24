import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ✅ RapidAPI Job ka type
type JobApiResponse = {
  job_id?: string;
  job_title?: string;
  employer_name?: string;
  job_city?: string;
  job_country?: string;
  job_employment_type?: string;
  job_posted_at_datetime_utc?: string;
  job_apply_link?: string;
  job_min_salary?: number;
  job_max_salary?: number;
  job_salary_currency?: string;
  job_required_skills?: string[];
  job_description?: string;
};

// POST: RapidAPI se jobs fetch karke MongoDB me save karega
export async function POST(req: Request) {
  try {
    const { query, location } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
      query + (location ? " in " + location : "")
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("🔴 RapidAPI Error:", errorText);
      return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }

    const data = await response.json();

    // ✅ Proper type use kiya
    const jobs = (data.data || []).map((job: JobApiResponse, idx: number) => ({
      jobId: job.job_id || String(idx), // ✅ custom ID (not MongoDB _id)
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || job.job_country || "Not specified",
      type: job.job_employment_type || "Full-time",
      postedAt: job.job_posted_at_datetime_utc
        ? new Date(job.job_posted_at_datetime_utc).toISOString()
        : new Date().toISOString(),
      applyUrl: job.job_apply_link,
      source: "RapidAPI",
      salaryMin: job.job_min_salary || null,
      salaryMax: job.job_max_salary || null,
      currency: job.job_salary_currency || null,
      tags: job.job_required_skills || [],
      description: job.job_description
        ? job.job_description.slice(0, 120) + "..."
        : "No description available",
    }));

    // ✅ Jobs MongoDB me safe insert/update karna
    const client = await clientPromise;
    const db = client.db("rozgarbot");
    const jobsCollection = db.collection("jobs");

    for (const job of jobs) {
      await jobsCollection.updateOne(
        { jobId: job.jobId }, // check by jobId
        { $set: job },        // update if exists
        { upsert: true }      // otherwise insert
      );
    }

    return NextResponse.json({ success: true, jobs });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("🔴 API Route Error:", error.message, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("🔴 API Route Unknown Error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

// GET: MongoDB se jobs fetch karega
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rozgarbot");
    const jobsCollection = db.collection("jobs");

    const jobs = await jobsCollection.find({}).limit(5).toArray();

    return NextResponse.json({ success: true, jobs });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("🔴 DB Fetch Error:", error.message, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("🔴 DB Unknown Error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
