"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  Cog,
  Compass,
  Download,
  FileText,
  Gauge,
  Image as ImageIcon,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Map,
  Radio,
  ScrollText,
  Shield,
  UserRound,
  Wrench,
} from "lucide-react";
import { usePathname } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, ease },
} as const;

const reconFiles = [
  {
    code: "PUB-01",
    title: "Blood Magic and Steel",
    subtitle: "Volume I // Book Cover",
    icon: BookOpen,
    className: "recon-cover",
  },
  {
    code: "MAP-07",
    title: "The Western Trench Line",
    subtitle: "Interactive Strategic Map",
    icon: Map,
    className: "recon-map",
  },
  {
    code: "MECH-13",
    title: "Trench-Crawl Mech Unit",
    subtitle: "Concept Illustration",
    icon: Cog,
    className: "recon-mech",
  },
  {
    code: "SUB-12",
    title: "Bek // Age 12",
    subtitle: "Classified Subject Profile",
    icon: UserRound,
    className: "recon-profile",
  },
];

const requisitions = [
  {
    icon: FileText,
    title: "Free 8,000-Word Novella",
    detail: "EPUB / PDF field editions",
  },
  {
    icon: ImageIcon,
    title: "High-Res WW1-Tech Art",
    detail: "Wallpapers and concept sketches",
  },
  {
    icon: Compass,
    title: "Classified World Archive",
    detail: "Factions, trench maps and magic wiki",
  },
];

function Rivets() {
  return (
    <>
      <i className="rivet left-3 top-3" />
      <i className="rivet right-3 top-3" />
      <i className="rivet bottom-3 left-3" />
      <i className="rivet bottom-3 right-3" />
    </>
  );
}

function GaugeDial({ value, label }: { value: string; label: string }) {
  return (
    <div className="gauge-dial">
      <div className="gauge-face">
        <span className="gauge-needle" />
        <span className="gauge-value">{value}</span>
      </div>
      <span className="mt-3 font-mono text-[8px] uppercase tracking-[0.22em] text-parchment/40">
        {label}
      </span>
    </div>
  );
}

function CommandInstrument() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: 0.2, ease }}
      className="iron-panel relative hidden min-h-[410px] overflow-hidden rounded-md p-8 lg:block"
    >
      <Rivets />
      <div className="map-lines absolute inset-0 opacity-30" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-brass/25 pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-parchment/40">
          <span>Frontier Relay</span>
          <span className="inline-flex items-center gap-2 text-amber">
            <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber shadow-[0_0_10px_#FF8C00]" />
            Live
          </span>
        </div>

        <div className="my-auto grid grid-cols-2 gap-6 py-9">
          <GaugeDial value="87" label="Signal Pressure" />
          <GaugeDial value="04" label="Files Incoming" />
        </div>

        <div className="space-y-3 border-t border-brass/20 pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-parchment/35">
          <div className="flex items-center justify-between">
            <span>Western Line</span>
            <span className="text-brass-light">Holding</span>
          </div>
          <div className="telegraph-line" />
          <div className="flex items-center justify-between">
            <span>Archive Integrity</span>
            <span className="text-brass-light">Nominal</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ReconCard({
  file,
  duplicate,
}: {
  file: (typeof reconFiles)[number];
  duplicate?: boolean;
}) {
  const Icon = file.icon;

  return (
    <motion.article
      whileHover={{ y: -8, rotate: 0.7, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      aria-hidden={duplicate || undefined}
      className={`recon-card ${file.className} relative h-[290px] w-[260px] shrink-0 overflow-hidden rounded-sm sm:h-[330px] sm:w-[300px]`}
    >
      <Rivets />
      <div className="absolute inset-3 overflow-hidden border border-brass/20 bg-gunmetal">
        <div className="recon-visual absolute inset-0" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-brass/20 bg-black/35 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.2em] text-parchment/45">
          <span>{file.code}</span>
          <span>Recon Asset</span>
        </div>
        <Icon
          className="absolute left-1/2 top-[43%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-brass/45"
          strokeWidth={0.8}
        />
        <div className="absolute inset-x-0 bottom-0 border-t border-copper/30 bg-[#11100e]/90 p-5 backdrop-blur-sm">
          <p className="font-display text-lg font-semibold uppercase tracking-[0.04em] text-parchment">
            {file.title}
          </p>
          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-copper-light">
            {file.subtitle}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function ReconCarousel() {
  return (
    <section className="relative z-10 overflow-hidden border-y border-brass/15 bg-black/15 py-16">
      <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between px-5 sm:px-8 lg:px-12">
        <div>
          <div className="mb-3 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-amber/75">
            <Radio className="h-3.5 w-3.5" /> Incoming visual telemetry
          </div>
          <h2 className="font-display text-2xl uppercase tracking-[0.04em] text-parchment sm:text-3xl">
            Moving Gallery // Recon Feed
          </h2>
        </div>
        <span className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-parchment/25 sm:block">
          Hover to inspect
        </span>
      </div>

      <div className="carousel-mask relative">
        <motion.div
          className="flex w-max gap-5 px-5 sm:gap-6 sm:px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, ease: "linear", repeat: Infinity }}
        >
          {[...reconFiles, ...reconFiles].map((file, index) => (
            <ReconCard
              key={`${file.code}-${index}`}
              file={file}
              duplicate={index >= reconFiles.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BekCover() {
  return (
    <div className="iron-frame relative min-h-[610px] overflow-hidden rounded-md p-5 shadow-2xl sm:min-h-[680px] sm:p-7">
      <Rivets />
      <div className="bek-cover absolute inset-5 overflow-hidden border border-brass/30 sm:inset-7">
        <div className="map-lines absolute inset-0 opacity-35" />
        <div className="absolute -left-20 bottom-8 h-64 w-64 rounded-full bg-amber/10 blur-[80px]" />
        <div className="absolute -right-12 top-12 h-52 w-52 rounded-full bg-copper/10 blur-[70px]" />

        <div className="relative flex h-full flex-col justify-between p-7 sm:p-10">
          <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-parchment/40">
            <span>Recon File 01</span>
            <span>Restricted</span>
          </div>

          <div className="py-14 text-center">
            <div className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-full border border-brass/45 bg-black/25 shadow-[0_0_50px_rgba(255,140,0,0.12)]">
              <Compass className="h-12 w-12 text-brass-light" strokeWidth={1} />
              <span className="absolute -inset-2 rounded-full border border-dashed border-copper/25" />
            </div>
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.36em] text-amber">
              A child marked by destiny
            </p>
            <h3 className="brass-text font-display text-7xl font-bold tracking-[0.08em] sm:text-8xl">
              BEK
            </h3>
            <div className="mx-auto my-7 flex w-28 items-center gap-2">
              <span className="h-px flex-1 bg-brass/50" />
              <Cog className="h-4 w-4 text-copper" />
              <span className="h-px flex-1 bg-brass/50" />
            </div>
            <p className="font-display text-lg uppercase tracking-[0.18em] text-parchment/75">
              A Child of Destiny
            </p>
          </div>

          <div className="flex items-end justify-between border-t border-brass/20 pt-5">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-parchment/30">
                Blood Magic and Steel
              </p>
              <p className="mt-2 font-display text-sm uppercase tracking-[0.1em] text-parchment/70">
                Carl Grefalde
              </p>
            </div>
            <Shield className="h-7 w-7 text-brass/40" strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="status-tag absolute left-9 top-9 z-20 inline-flex items-center gap-2 rounded-sm px-3 py-2 font-mono text-[8px] uppercase tracking-[0.18em] sm:left-12 sm:top-12">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber shadow-[0_0_10px_#FF8C00]" />
        Classified Prequel // Recon File #01
      </div>
    </div>
  );
}

function AccessPanel() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [error, setError] = useState("");

  const pdfUrl =
    process.env.NEXT_PUBLIC_BEK_PDF_URL ??
    "/downloads/bek-a-child-of-destiny.pdf";
  const epubUrl =
    process.env.NEXT_PUBLIC_BEK_EPUB_URL ??
    "/downloads/bek-a-child-of-destiny.epub";
  const wikiUrl =
    process.env.NEXT_PUBLIC_BEK_WIKI_URL ?? "https://example.com/classified-wiki";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Dispatch authorization failed.");
      }

      setStatus("success");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Dispatch authorization failed.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease }}
        className="access-granted iron-panel relative overflow-hidden rounded-sm p-6 sm:p-7"
      >
        <Rivets />
        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-4 border-b border-brass/20 pb-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber/50 bg-amber/10 text-amber shadow-[0_0_25px_rgba(255,140,0,0.18)]">
              <Check className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-amber/70">
                Telegraph handshake complete
              </p>
              <h3 className="mt-1 font-display text-xl uppercase tracking-[0.05em] text-parchment sm:text-2xl">
                Access Granted // Telegraph Confirmed
              </h3>
            </div>
          </div>
          <p className="mb-5 text-sm leading-6 text-parchment/55">
            Field supplies released. Select your preferred file or enter the
            classified intelligence archive.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a className="supply-link" href={pdfUrl} download>
              <Download className="h-4 w-4" /> PDF DOSSIER
            </a>
            <a className="supply-link" href={epubUrl} download>
              <Download className="h-4 w-4" /> EPUB DOSSIER
            </a>
            <a
              className="supply-link sm:col-span-2"
              href={wikiUrl}
              target="_blank"
              rel="noreferrer"
            >
              <BookOpen className="h-4 w-4" /> OPEN CLASSIFIED WIKI
              <ArrowUpRight className="ml-auto h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <label htmlFor="dispatch-email" className="sr-only">
        Dispatch email
      </label>
      <div className="group relative">
        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment/25 transition-colors group-focus-within:text-amber" />
        <input
          id="dispatch-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your dispatch email..."
          className="dispatch-input h-14 w-full rounded-sm pl-11 pr-4 font-mono text-sm outline-none"
        />
      </div>
      {status === "error" && error ? (
        <p role="alert" className="font-mono text-xs text-red-300">
          [ TELEGRAPH ERROR ] {error}
        </p>
      ) : null}
      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
        whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
        className="copper-button group flex h-14 w-full items-center justify-center gap-3 rounded-sm px-5 font-mono text-xs font-bold tracking-[0.15em] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" /> TRANSMITTING...
          </>
        ) : (
          <>
            <Wrench className="h-4 w-4 transition-transform group-hover:rotate-12" />
            [ CLAIM FIELD SUPPLIES ]
          </>
        )}
      </motion.button>
      <p className="flex items-center justify-center gap-2 pt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-parchment/25">
        <LockKeyhole className="h-3 w-3" /> Encrypted dispatch // No spam
      </p>
    </form>
  );
}

export function LandingPage({ focusBek = false }: { focusBek?: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    const shouldScroll =
      focusBek || pathname === "/bek" || window.location.hash === "#bek";

    if (!shouldScroll) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById("bek")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusBek, pathname]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gunmetal text-parchment">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.065]" />
      <div className="vintage-grid pointer-events-none fixed inset-0 z-0 opacity-30" />
      <div className="pointer-events-none fixed -left-40 top-24 z-0 h-[34rem] w-[34rem] rounded-full bg-copper/[0.07] blur-[140px]" />
      <div className="pointer-events-none fixed -right-48 top-[45%] z-0 h-[40rem] w-[40rem] rounded-full bg-amber/[0.05] blur-[160px]" />

      <section className="relative z-10 flex min-h-screen flex-col px-5 pb-10 pt-6 sm:px-8 lg:px-12">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-brass/15 pb-5">
          <div className="brass-plate relative inline-flex items-center gap-3 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.19em] text-parchment/70 sm:text-[9px]">
            <span className="flex h-7 w-7 items-center justify-center border border-brass/50 bg-black/25 text-brass-light">
              CG
            </span>
            <span>Command Dossier // Carl Grefalde Archives</span>
          </div>
          <div className="hidden items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-amber/60 sm:flex">
            <Radio className="h-3.5 w-3.5" /> Telegraph online
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="mb-7 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.26em] text-copper-light">
              <span className="telegraph-dot" />
              Field transmission 001 // Eyes only
            </div>
            <h1 className="max-w-5xl font-display text-[clamp(3rem,7.2vw,7.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
              Warfare, Weird Tech
              <span className="brass-text block">&amp; The Frontier</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-parchment/55 sm:text-lg">
              March through the diesel-choked trenches of{" "}
              <span className="text-parchment">Blood Magic and Steel</span>,
              then trade the gunsmoke for strange drinks and stranger company
              in the cozy galactic frontier of{" "}
              <span className="text-parchment">8 Tentacles Bar Tender</span>.
            </p>

            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <motion.a
                href="#bek"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="brass-button group inline-flex min-h-14 items-center gap-3 rounded-sm px-6 font-mono text-xs font-bold tracking-[0.14em]"
              >
                [ UNLOCK PREQUEL DOSSIER ]
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </motion.a>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-parchment/25">
                No requisition credits required
              </span>
            </div>
          </motion.div>

          <CommandInstrument />
        </div>

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-brass/10 pt-5 font-mono text-[8px] uppercase tracking-[0.2em] text-parchment/20">
          <span>Dark military fantasy</span>
          <Gauge className="hidden h-4 w-4 text-brass/30 sm:block" />
          <span>Cozy frontier science fiction</span>
        </div>
      </section>

      <ReconCarousel />

      <section
        id="bek"
        className="relative z-10 scroll-mt-0 px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <motion.div {...reveal}>
            <BekCover />
          </motion.div>

          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
            <div className="mb-6 inline-flex items-center gap-2 border border-amber/35 bg-amber/[0.06] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.22em] text-amber">
              <ScrollText className="h-3.5 w-3.5" />
              [ Field Dispatch Access ]
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-parchment sm:text-6xl">
              Bek: A Child of Destiny
            </h2>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-copper-light sm:text-xs">
              A Companion Novella to Blood Magic and Steel
            </p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-parchment/55">
              Before the stars, young Bek learned to survive knee-deep mud,
              dark blood magic, and the thunder of diesel artillery. This is
              the classified account of the child he was before war marked
              him for a larger frontier.
            </p>

            <div className="my-9 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-brass/40 to-transparent" />
              <Cog className="h-4 w-4 text-brass/50" />
              <span className="h-px w-12 bg-brass/20" />
            </div>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <Wrench className="h-4 w-4 text-brass-light" />
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-parchment/65">
                  Requisition includes
                </p>
              </div>
              <div className="space-y-3">
                {requisitions.map(({ icon: Icon, title, detail }, index) => (
                  <div
                    key={title}
                    className="requisition-item relative flex items-center gap-4 overflow-hidden rounded-sm p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass/35 bg-brass/[0.06] text-brass-light">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-parchment/85">
                        {title}
                      </p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-parchment/30">
                        {detail}
                      </p>
                    </div>
                    <span className="ml-auto hidden font-mono text-[9px] text-brass/30 sm:block">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <AccessPanel />
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-brass/15 px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-parchment/25 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Carl Grefalde Archives</span>
          <span>End transmission // Await further orders</span>
        </div>
      </footer>
    </main>
  );
}
