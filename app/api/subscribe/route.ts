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

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: "Request is too large." }, 413);
  }

  let body: unknown;
  const reader = request.body?.getReader();
  if (!reader) {
    return json({ error: "Enter a valid email address." }, 400);
  }

  try {
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ error: "Request is too large." }, 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    body = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return json({ error: "Enter a valid email address." }, 400);
  } finally {
    reader.releaseLock();
  }

  const value = body && typeof body === "object" && "email" in body ? body.email : null;
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Enter a valid email address." }, 400);
  }
  const key = process.env.KIT_API_KEY;
  const form = process.env.KIT_BEK_FORM_ID;
  if (!key || !form || !/^\d+$/.test(form)) {
    return json({ error: "Reader pack signup is not available yet. Please come back soon." }, 503);
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
    const newSubscriber = subscriber.status === 201;
    const membership = await fetch(`https://api.kit.com/v4/forms/${form}/subscribers`, {
      ...options, signal: AbortSignal.timeout(15000),
    });
    if (!membership.ok) throw new Error("Kit form request failed");
    return json({ success: true, newSubscriber });
  } catch {
    return json({ error: "We couldn’t get your reader pack ready. Please try again." }, 502);
  }
}
