import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// initialize Resend with the API key from env
const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, honeypot } = await req.json();

    // anti-bot
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    // basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // from/to — use env variables
    // NOTE: CONTACT_FROM should ideally be a verified sender in Resend (simple email, no weird display-name)
    const from = process.env.CONTACT_FROM || "onboarding@resend.dev";
    const to = process.env.CONTACT_TO || process.env.CONTACT_FROM || "rozgarbot7@gmail.com";

    const html = `
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      ${subject ? `<p><b>Subject:</b> ${subject}</p>` : ""}
      <p>${String(message).replace(/\n/g, "<br/>")}</p>
    `;

    const text = `Name: ${name}\nEmail: ${email}\n${subject ? `Subject: ${subject}\n\n` : "\n"}${message}`;

    // send via Resend
    const resp = await resend.emails.send({
      from,
      to,
      replyTo: email, // lets you reply to the visitor's email easily
      subject: subject ? `[Contact] ${subject}` : "New Contact Form Message",
      html,
      text,
    });

    // resp.id usually contains the message id from Resend
    return NextResponse.json({ ok: true, id: (resp as any).id || null });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
