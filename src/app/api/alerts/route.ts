import { NextRequest, NextResponse } from "next/server";
import { sendJobAlert } from "@/lib/email"; // Nodemailer utility

// ✅ Proper type banaya
type Alert = {
  email: string;
  keywords: string;
  location?: string;
  type?: string;
};

// ✅ const + typed array
const alerts: Alert[] = []; // abhi memory me store, baad me DB use hoga

export async function POST(req: NextRequest) {
  try {
    const { email, keywords, location, type } = await req.json();

    if (!email || !keywords) {
      return NextResponse.json(
        { success: false, message: "Email and keywords required" },
        { status: 400 }
      );
    }

    // Save alert (temporary)
    const alert: Alert = { email, keywords, location, type };
    alerts.push(alert);

    // Send email
    await sendJobAlert(
      email,
      "Rozgar Bot - Job Alert",
      `Hello 👋\n\nYou have subscribed for job alerts.\n\nKeywords: ${keywords}\nLocation: ${
        location || "Any"
      }\nType: ${type || "Any"}\n\nWe will notify you when matching jobs are found. 🚀`
    );

    return NextResponse.json({
      success: true,
      message: "✅ Alert saved & email sent!",
    });
  } catch (err) {
    console.error("❌ Alert Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save alert" },
      { status: 500 }
    );
  }
}

// For testing (GET all alerts)
export async function GET() {
  return NextResponse.json(alerts);
}
