import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

type SubscribeBody = {
  email?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: SubscribeBody;

  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !serverPrefix) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({ success: true, demo: true });
    }

    return NextResponse.json(
      { error: "Subscription service is not configured." },
      { status: 503 },
    );
  }

  const subscriberHash = createHash("md5").update(email).digest("hex");
  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      detail?: string;
    } | null;

    return NextResponse.json(
      { error: result?.detail ?? "Unable to authorize access. Try again." },
      { status: response.status },
    );
  }

  return NextResponse.json({ success: true });
}
