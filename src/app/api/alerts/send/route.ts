import { NextResponse } from "next/server";
import { sendJobAlert } from "@/lib/email";

export async function POST() {
  try {
    const alerts = [
      { email: "test1@gmail.com", keywords: "developer" },
      { email: "test2@gmail.com", keywords: "designer" },
    ];

    // Loop through alerts and send emails
    for (const alert of alerts) {
      await sendJobAlert(
        alert.email,
        `New jobs for ${alert.keywords}`, // subject
        `We found new job opportunities related to ${alert.keywords}.` // message
      );
    }

    return NextResponse.json({
      success: true,
      message: "Alerts sent!",
    });
  } catch (error) {
    console.error("Alert Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send alerts" },
      { status: 500 }
    );
  }
}
