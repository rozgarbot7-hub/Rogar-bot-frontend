import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true", // false = TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendJobAlert(to: string, subject: string, message: string) {
  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to,
      subject,
      text: message,
    });
    console.log(`✅ Email sent to ${to}`);
    return { success: true };
  } catch (err) {
    console.error("❌ Email error:", err);
    return { success: false };
  }
}
