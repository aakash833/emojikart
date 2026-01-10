import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// NOTE: This route attempts to send email using SMTP when environment variables
// are configured. If no SMTP config is present, it will return 200 and act as
// a temporary fallback (so the UI still shows the confirmation message).

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body || {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Try to send email if SMTP env vars are configured.
    const smtpHost = process.env.SMTP_HOST;

    if (smtpHost) {
      // Lazy import nodemailer to avoid adding it unless needed.
      let nodemailer;
      try {
        // nodemailer is optional for local dev; if it's not installed the import
        // would cause a type error during build. Suppress the TS check here.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nodemailer = await import("nodemailer");
      } catch (e) {
        console.error("nodemailer not installed", e);
        return NextResponse.json({
          ok: true,
          note: "nodemailer not installed, fallback used",
        });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      });

      const mailTo = process.env.CONTACT_EMAIL || "aakashvamja5160@gmail.com";

      const mailOptions = {
        from:
          process.env.FROM_EMAIL ||
          `no-reply@${
            process.env.NEXT_PUBLIC_VERCEL_URL || "emojikeyboard.com"
          }`,
        to: mailTo,
        subject: `Contact form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ ok: true });
      } catch (sendErr) {
        console.error("Error sending mail", sendErr);
        // Return ok so UI still shows confirmation; include note.
        return NextResponse.json({
          ok: true,
          note: "failed to send email, logged on server",
        });
      }
    }

    // No SMTP configured: log and return success (temporary fallback).
    console.log("Contact form received (no SMTP configured):", {
      name,
      email,
      subject,
      message,
    });
    return NextResponse.json({ ok: true, note: "no-smtp-config" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
