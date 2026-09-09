import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 }); }

  const value = body && typeof body === "object" && "email" in body ? body.email : null;
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const key = process.env.KIT_API_KEY;
  const form = process.env.KIT_BEK_FORM_ID;
  if (!key || !form || !/^\d+$/.test(form)) {
    return NextResponse.json({ error: "Reader pack signup is not available yet. Please come back soon." }, { status: 503 });
  }
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Kit-Api-Key": key },
    body: JSON.stringify({ email_address: email }),
    cache: "no-store" as const,
  };
  try {
    // Kit upserts by email; do not overwrite existing subscriber names or states.
    const subscriber = await fetch("https://api.kit.com/v4/subscribers", {
      ...options, signal: AbortSignal.timeout(15000),
    });
    if (!subscriber.ok) throw new Error("Kit subscriber request failed");
    const membership = await fetch(`https://api.kit.com/v4/forms/${form}/subscribers`, {
      ...options, signal: AbortSignal.timeout(15000),
    });
    if (!membership.ok) throw new Error("Kit form request failed");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "We couldn’t get your reader pack ready. Please try again." }, { status: 502 });
  }
}
