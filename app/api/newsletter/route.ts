import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 4_000;

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");

  try {
    if (!origin || !host || new URL(origin).host !== host) {
      return json({ error: "Request origin is not allowed." }, 403);
    }
  } catch {
    return json({ error: "Request origin is not allowed." }, 403);
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return json({ error: "Request is too large." }, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Enter a valid email address." }, 400);
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  // Quietly accept automated submissions without sending them to Kit.
  if (website || !startedAt || Date.now() - startedAt < 2_000) {
    return json({ success: true });
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Enter a valid email address." }, 400);
  }

  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    return json({ error: "Reader-list signup is not available yet. Please try again later." }, 503);
  }

  try {
    const response = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({ email_address: email }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Kit subscriber request failed");
    return json({ success: true });
  } catch {
    return json({ error: "We couldn’t add you to the reader list. Please try again." }, 502);
  }
}
