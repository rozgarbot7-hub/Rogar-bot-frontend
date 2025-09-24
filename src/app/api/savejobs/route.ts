import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // your clientPromise (MongoDB driver)

export async function POST(req: Request) {
  try {
    const { userId, job } = await req.json();

    if (!userId || !job || !job.id) {
      return NextResponse.json({ ok: false, message: "userId and job.id required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rozgarbot");
    const col = db.collection("savedJobs");

    // Prevent duplicates: check if same user already saved this job
    const exists = await col.findOne({ userId, jobId: job.id });
    if (exists) {
      return NextResponse.json({ ok: true, message: "Already saved" });
    }

    const doc = {
      userId,
      jobId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      applyUrl: job.applyUrl,
      rawJob: job, // optional: store full job object if you want
      createdAt: new Date(),
    };

    const result = await col.insertOne(doc);
    return NextResponse.json({ ok: true, message: "Saved", savedId: result.insertedId });
  } catch (err) {
    console.error("saved-jobs POST error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ ok: false, message: "userId required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rozgarbot");
    const col = db.collection("savedJobs");

    const jobs = await col.find({ userId }).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ ok: true, jobs });
  } catch (err) {
    console.error("saved-jobs GET error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
