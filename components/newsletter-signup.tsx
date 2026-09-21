"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, Mail, X } from "lucide-react";

export function NewsletterSignup() {
  const inputId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const startedAt = useRef(Date.now());
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!confirmed) return;
    const overflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.current?.close();
      document.body.style.overflow = overflow;
    };
  }, [confirmed]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");

    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: data.get("website"),
          startedAt: startedAt.current,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Please try again.");
      setEmail("");
      setConfirmed(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function closeConfirmation() {
    setConfirmed(false);
    startedAt.current = Date.now();
  }

  return (
    <>
      <form onSubmit={submit} className="mx-auto w-full max-w-2xl">
        <div className="grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label htmlFor={inputId} className="sr-only">Email address</label>
          <input id={inputId} type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your reader email…" className="dispatch-input h-14 w-full min-w-0 rounded-sm px-4 text-base focus-visible:outline-2 focus-visible:outline-brass" />
          <button type="submit" disabled={busy} className="copper-button inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-sm px-6 text-base font-semibold disabled:cursor-wait disabled:opacity-60 sm:w-auto"><Mail className="h-5 w-5" />{busy ? "JOINING…" : "JOIN THE READER LIST"}</button>
        </div>
        <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor={`${inputId}-website`}>Website</label><input id={`${inputId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
        {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
        <p className="mt-4 text-sm leading-6 text-parchment/55">Receive book news, development updates, artwork, and occasional reader extras. Unsubscribe at any time. See the <a href="/privacy" className="text-brass-light underline underline-offset-4">Privacy Policy</a>.</p>
      </form>

      <dialog ref={dialog} aria-labelledby="newsletter-confirmation-title" onClose={closeConfirmation} onClick={(event) => event.target === event.currentTarget && closeConfirmation()} className="m-auto w-[calc(100%_-_2rem)] max-w-md rounded-md border border-brass/50 bg-gunmetal p-0 text-parchment shadow-2xl backdrop:bg-black/75">
        <div className="relative p-7 text-center sm:p-9">
          <button type="button" aria-label="Close confirmation" onClick={closeConfirmation} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-sm border border-brass/30 hover:bg-brass/10"><X className="h-5 w-5" /></button>
          <CheckCircle2 className="mx-auto h-12 w-12 text-brass-light" />
          <h2 id="newsletter-confirmation-title" className="mt-5 font-display text-3xl">Thank You</h2>
          <p className="mt-4 leading-7 text-parchment/70">You’re on the Carl Griff reader list. Watch your inbox for future dispatches.</p>
          <p className="mt-3 text-sm text-parchment/45">Every email includes an unsubscribe link.</p>
          <button type="button" onClick={closeConfirmation} className="mt-7 min-h-11 rounded-sm border border-brass/40 px-6 font-semibold hover:bg-brass/10">CLOSE</button>
        </div>
      </dialog>
    </>
  );
}
