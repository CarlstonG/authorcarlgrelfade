"use client";

import { FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";

export function BekSignup() {
  const id = useId();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Please try again in a moment.");
      }
      router.push("/reader-rewards");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Please try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label htmlFor={id} className="block text-base text-parchment">Email address</label>
      <input id={id} type="email" autoComplete="email" required maxLength={254}
        value={email} onChange={(event) => setEmail(event.target.value)}
        aria-describedby={error ? id + "-error" : undefined}
        aria-invalid={error ? true : undefined}
        placeholder="you@example.com"
        className="dispatch-input h-14 w-full rounded-sm px-4 text-base focus-visible:outline-2 focus-visible:outline-brass" />
      {error && <p id={id + "-error"} role="alert" className="text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={busy}
        className="copper-button flex min-h-14 w-full items-center justify-center rounded-sm px-4 text-base font-semibold disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass">
        {busy ? "Getting your reader pack…" : "GET BEK FREE"}
      </button>
      <p className="text-sm leading-6 text-parchment/70">
        By signing up, you’ll join the Carl Griff reader list. Unsubscribe anytime.
      </p>
    </form>
  );
}
