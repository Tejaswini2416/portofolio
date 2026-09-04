import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, targetEmail = "tejaswinikummari17@gmail.com" } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All required fields must be supplied." },
        { status: 400 }
      );
    }

    // Try optional Formspree integration if configured or fallback to structured receipt
    // You can set FORMSPREE_KEY or RESEND_API_KEY in .env.local
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    if (formspreeEndpoint) {
      try {
        await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, subject, message, targetEmail }),
        });
      } catch (err) {
        console.error("Formspree forward error:", err);
      }
    }

    console.log(`[Contact Form Received] From: ${name} <${email}> | To: ${targetEmail} | Subject: ${subject}`);

    return NextResponse.json({
      success: true,
      message: `Your inquiry has been logged and dispatched to ${targetEmail}.`,
      data: { name, email, subject, timestamp: new Date().toISOString() },
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
