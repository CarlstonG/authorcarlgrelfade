"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BekSignup } from "@/components/bek-signup";
import {
  ArrowDown,
  BookOpen,
  Check,
  ChevronDown,
  Cog,
  Compass,
  Download,
  FileText,
  Gauge,
  Image as ImageIcon,
  Map,
  Radio,
  ScrollText,
  Shield,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

function scrollToBek() {
  const target = document.getElementById("bek-content");
  if (!target) return;
  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  const bounds = target.getBoundingClientRect();
  // Center the content rather than the section's decorative padding.
  // On short desktop windows, keep the bottom action in view.
  const offset = desktop
    ? Math.min((window.innerHeight - bounds.height) / 2, window.innerHeight - bounds.height - 24)
    : 20;
  window.scrollTo({
    top: window.scrollY + bounds.top - offset,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });
}

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
    title: "Wallpaper and Illustrations",
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

function HeroPortrait() {
  return (
    <figure className="hero-portrait">
      <Image
        src="/images/hero-banner.png"
        alt="Carl Grefalde wearing a tweed suit and flat cap"
        width={1080}
        height={1350}
        sizes="(min-width: 1280px) 448px, (min-width: 1024px) 36vw, (min-width: 640px) calc(100vw - 86px), calc(100vw - 58px)"
        priority
        className="hero-portrait-image"
      />
    </figure>
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

    </div>
  );
}

function ProjectsDropdown() {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function dismiss(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      ref={container}
      className="relative z-40"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls="projects-dropdown"
        onClick={() => setOpen(!open)}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm px-3 font-sans text-base font-medium text-parchment/80 transition-colors hover:bg-brass/10 hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
      >
        Projects
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <nav
        id="projects-dropdown"
        aria-label="Projects"
        hidden={!open}
        className="absolute right-0 top-full mt-2 w-60 rounded-sm border border-brass/35 bg-gunmetal p-2 shadow-xl"
      >
        <span aria-disabled="true" className="block px-3 py-3 font-sans text-base text-parchment/45">
          Steel Machina (Soon)
        </span>
        <a
          href="#bek"
          onClick={(event) => {
            event.preventDefault();
            setOpen(false);
            window.history.pushState(null, "", "#bek");
            scrollToBek();
          }}
          className="block rounded-sm px-3 py-3 font-sans text-base text-parchment transition-colors hover:bg-brass/10 focus-visible:outline-2 focus-visible:outline-brass"
        >
          Child of Destiny
        </a>
      </nav>
    </div>
  );
}

export function LandingPage({ focusBek = false }: { focusBek?: boolean }) {
  const pathname = usePathname();
  const downloadDialog = useRef<HTMLDialogElement>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);

  useEffect(() => {
    if (!downloadOpen) return;
    const dialog = downloadDialog.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [downloadOpen]);

  useEffect(() => {
    const shouldScroll =
      focusBek || pathname === "/bek" || window.location.hash === "#bek";

    if (!shouldScroll) return;

    const frame = window.requestAnimationFrame(() => {
      scrollToBek();
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
          <div className="brass-plate relative inline-flex items-center gap-3 px-4 py-3 font-sans text-base font-medium text-parchment/85 sm:text-lg">
            <span className="flex h-7 w-7 items-center justify-center border border-brass/50 bg-black/25 text-brass-light">
              CG
            </span>
            <span>Carl Griff</span>
          </div>
          <ProjectsDropdown />
        </header>

        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="mb-7 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.26em] text-copper-light">
              <span className="telegraph-dot" />
              Exclusive transmission from the creator
            </div>
            <h1 className="max-w-5xl font-display text-[clamp(3rem,7.2vw,7.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
              CARL GRIFF
            </h1>
            <p className="mt-4 text-base leading-relaxed text-parchment/70 sm:text-xl">
              a pen name of Carlston Grefalde
            </p>
            <p className="mt-8 max-w-3xl text-base leading-8 text-parchment/55 sm:text-lg">
              Carl Griff is the pen name of Carlston Grefalde, a software
              developer, game developer, father, and lifelong worldbuilder.
              After years of creating worlds through notebooks, code, and game
              development, he returned to one of his oldest ambitions: writing
              fantasy.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-parchment/55 sm:text-lg">
              He is currently working on his debut novel,{" "}
              <em className="text-parchment">
                Steel of Machina: Book One — The Uncrowned
              </em>
              .
            </p>

            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <motion.a
                href="#bek"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState(null, "", "#bek");
                  scrollToBek();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="brass-button group inline-flex min-h-14 items-center gap-3 rounded-sm px-6 font-mono text-xs font-bold tracking-[0.14em]"
              >
                GET BEK FREE
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </motion.a>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-parchment/25">
                No requisition credits required
              </span>
            </div>
          </motion.div>

          <HeroPortrait />
        </div>

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-brass/10 pt-5 font-mono text-[8px] uppercase tracking-[0.2em] text-parchment/20">
          <span>Dark military fantasy</span>
          <Gauge className="hidden h-4 w-4 text-brass/30 sm:block" />
          <span>Cozy Dark fantasy (soon)</span>
        </div>
      </section>

      <ReconCarousel />

      <section
        id="bek"
        className="relative z-10 scroll-mt-0 px-5 py-24 sm:px-8 lg:px-12 lg:py-12"
      >
        <div id="bek-content" className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <motion.div {...reveal}>
            <div className="relative pb-20">
              <BekCover />
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setDownloadOpen(true)}
                className="absolute inset-0 z-40 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
              >
                <span className="absolute inset-x-0 bottom-0 flex min-h-14 items-center justify-center gap-2 rounded-sm border border-brass bg-gunmetal px-4 py-3 font-sans text-base font-semibold text-parchment shadow-lg">
                  <Download aria-hidden="true" className="h-5 w-5" />
                  GET BEK FREE
                </span>
              </button>
            </div>
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
              A Short Novella from the World of Steel of Machina
            </p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-parchment/55">
              <strong>BEK</strong> is a short novella set in the world of{" "}
              <em>Steel of Machina</em>. In the lawless canal city of Basabas,
              a side character gets an adventure of his own—through crowded
              piers, shifting tides, strange beasts, and the dangerous corners
              the main story leaves behind.
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
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setDownloadOpen(true)}
                className="copper-button flex min-h-14 w-full items-center justify-center gap-3 rounded-sm px-5 font-sans text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
              >
                <Download aria-hidden="true" className="h-5 w-5" />
                GET BEK FREE
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <dialog
        ref={downloadDialog}
        aria-labelledby="download-title"
        aria-describedby="download-description"
        onClose={() => setDownloadOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setDownloadOpen(false);
        }}
        className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-md border border-brass/50 bg-gunmetal p-0 text-parchment shadow-2xl backdrop:bg-black/75"
      >
        <div className="p-5 sm:p-8">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 id="download-title" className="font-display text-2xl leading-tight sm:text-3xl">
              Bek: A Child of Destiny
            </h2>
            <button
              type="button"
              aria-label="Close freebie library"
              onClick={() => setDownloadOpen(false)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-brass/30 hover:bg-brass/10 focus-visible:outline-2 focus-visible:outline-brass"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <p id="download-description" className="mb-6 text-base leading-7 text-parchment/75">
            Get the free novella, a character card, and desktop and mobile wallpapers. Enter your email to access your reader rewards.
          </p>
          <div className="mb-6 rounded-sm border border-brass/25 bg-brass/5 p-4">
            <h3 className="mb-3 font-sans text-base font-semibold text-parchment">
              What’s included
            </h3>
            <ul className="space-y-3 text-sm leading-6 text-parchment/80">
              {[
                "Free short novella in PDF or EPUB",
                "Desktop and mobile wallpapers",
                "Character card",
                "Monthly updates with more extras",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brass-light" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <BekSignup />
        </div>
      </dialog>

      <footer className="relative z-10 border-t border-brass/15 px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-parchment/25 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Carlston Grefalde Archives</span>
          <span>End transmission. Await further orders</span>
        </div>
      </footer>
    </main>
  );
}
