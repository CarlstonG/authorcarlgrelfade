"use client";

import { FormEvent, useRef, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
          startedAt: startedAt.current,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Your message could not be sent.");
      }

      form.reset();
      startedAt.current = Date.now();
      setStatus("success");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Your message could not be sent.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-brass/35 bg-brass/[0.06] p-6 text-center">
        <CheckCircle2 className="mx-auto h-9 w-9 text-brass-light" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl">Message dispatched</h3>
        <p className="mt-3 leading-7 text-parchment/70">
          Thanks for reaching out. Carl will reply as soon as he can.
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
          className="mt-6 min-h-11 rounded-sm border border-brass/35 px-5 text-sm text-parchment hover:bg-brass/10"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm text-parchment/80">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          className="dispatch-input h-12 w-full rounded-sm px-4 text-base focus-visible:outline-2 focus-visible:outline-brass"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm text-parchment/80">
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          className="dispatch-input h-12 w-full rounded-sm px-4 text-base focus-visible:outline-2 focus-visible:outline-brass"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm text-parchment/80">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className="dispatch-input w-full resize-y rounded-sm px-4 py-3 text-base focus-visible:outline-2 focus-visible:outline-brass"
        />
      </div>
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="copper-button flex min-h-14 w-full items-center justify-center gap-3 rounded-sm px-5 text-base font-semibold disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === "loading" ? "SENDING DISPATCH…" : "SEND MESSAGE"}
      </button>
      <p className="text-xs leading-5 text-parchment/50">
        Your details are used only to reply to this message. See the{" "}
        <a href="/privacy" className="text-brass-light underline underline-offset-4">Privacy Policy</a>.
      </p>
    </form>
  );
}
