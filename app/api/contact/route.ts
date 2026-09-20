import { NextResponse } from "next/server";

const CONTACT_RECIPIENT = "carl@carlgriff.com";
const MAX_BODY_BYTES = 20_000;

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");

  try {
    if (!origin || !host || new URL(origin).host !== host) {
      return json({ error: "Request origin is not allowed." }, 403);
    }
  } catch {
    return json({ error: "Request origin is not allowed." }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: "Message is too large." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ error: "Message is too large." }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "Enter your contact details and message." }, 400);
  }

  const name = cleanText(body.name);
  const email = cleanText(body.email).toLowerCase();
  const message = cleanText(body.message);
  const website = cleanText(body.website);
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  // Silently accept bot submissions caught by the honeypot.
  if (website || !startedAt || Date.now() - startedAt < 2_000) {
    return json({ success: true });
  }

  if (name.length < 2 || name.length > 100) {
    return json({ error: "Enter your name." }, 400);
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Enter a valid email address." }, 400);
  }
  if (message.length < 10 || message.length > 5000) {
    return json({ error: "Enter a message between 10 and 5,000 characters." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || CONTACT_RECIPIENT;

  if (!apiKey || !from) {
    return json(
      { error: "Contact dispatch is not available yet. Please try again later." },
      503,
    );
  }

  const safeName = name.replace(/[\r\n]+/g, " ");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website message from ${safeName}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Resend request failed");
    return json({ success: true });
  } catch {
    return json(
      { error: "Your message could not be sent. Please try again." },
      502,
    );
  }
}
