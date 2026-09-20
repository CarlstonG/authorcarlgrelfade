"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BekSignup } from "@/components/bek-signup";
import { ContactForm } from "@/components/contact-form";
import { NewsletterSignup } from "@/components/newsletter-signup";
import {
  ArrowDown,
  Check,
  ChevronDown,
  Cog,
  Compass,
  Download,
  FileText,
  Gauge,
  Facebook,
  Image as ImageIcon,
  Instagram,
  Mail,
  Radio,
  ScrollText,
  Wrench,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/carlgriff.author/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/CarlGGriff",
    icon: Facebook,
  },
];

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
    code: "DOS-01",
    title: "The Child of Destiny",
    subtitle: "Official Prequel Cover",
    image: "/images/child-of-destiny/cover.jpg",
    imageAlt: "The Child of Destiny prequel cover",
    imagePosition: "center",
    imageFit: "cover",
  },
  {
    code: "SUB-12",
    title: "Bek // Age 12",
    subtitle: "Classified Subject Portrait",
    image: "/images/child-of-destiny/bek-card.jpg",
    imageAlt: "Bek standing before a dark stone wall",
    imagePosition: "center 30%",
    imageFit: "cover",
  },
  {
    code: "BST-07",
    title: "Kingtoad",
    subtitle: "Canal Beast Sighting",
    image: "/images/child-of-destiny/kingtoad.jpg",
    imageAlt: "A giant Kingtoad emerging from dark blue water",
    imagePosition: "center",
    imageFit: "cover",
  },
  {
    code: "SIG-04",
    title: "Machina Death Sigil",
    subtitle: "Recovered Brass Insignia",
    image: "/images/child-of-destiny/skull-gear.png",
    imageAlt: "A weathered brass gear entwined with an animal skull",
    imagePosition: "center",
    imageFit: "contain",
  },
  {
    code: "REL-09",
    title: "Ember Plague Mask",
    subtitle: "Restricted Field Relic",
    image: "/images/child-of-destiny/plague-mask.png",
    imageAlt: "A stitched black plague mask with teal lenses and glowing embers",
    imagePosition: "center",
    imageFit: "contain",
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

function SocialLinks({ footer = false }: { footer?: boolean }) {
  return (
    <nav aria-label="Carl Griff on social media" className="flex items-center gap-2">
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow Carl Griff on ${label}`}
          title={label}
          className={`inline-flex shrink-0 items-center justify-center rounded-sm border border-brass/30 bg-black/20 text-brass-light transition-colors hover:border-brass/70 hover:bg-brass/10 hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
            footer ? "h-12 w-12" : "h-11 w-11"
          }`}
        >
          <Icon aria-hidden="true" className={footer ? "h-6 w-6" : "h-[18px] w-[18px]"} />
        </a>
      ))}
    </nav>
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
  return (
    <motion.article
      whileHover={{ y: -8, rotate: 0.7, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      aria-hidden={duplicate || undefined}
      className="recon-card group relative h-[340px] w-[270px] shrink-0 overflow-hidden rounded-sm sm:h-[390px] sm:w-[310px]"
    >
      <Rivets />
      <div className="absolute inset-3 overflow-hidden border border-brass/20 bg-gunmetal">
        <Image
          src={file.image}
          alt={duplicate ? "" : file.imageAlt}
          fill
          sizes="310px"
          className={`${file.imageFit === "contain" ? "object-contain p-5" : "object-cover"} transition-transform duration-700 group-hover:scale-105`}
          style={{ objectPosition: file.imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/85" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-brass/20 bg-black/35 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.2em] text-parchment/45">
          <span>{file.code}</span>
          <span>Recon Asset</span>
        </div>
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
      <div className="bek-cover absolute inset-5 overflow-hidden border border-brass/30 bg-black sm:inset-7">
        <Image
          src="/images/child-of-destiny/cover.jpg"
          alt="The Child of Destiny, a short prequel by Carl Griff"
          fill
          sizes="(min-width: 1024px) 42vw, calc(100vw - 80px)"
          className="object-contain"
          priority
        />
        <div className="status-tag absolute left-4 top-4 z-10 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.18em] sm:left-5 sm:top-5">
          Official prequel // Recon file 01
        </div>
      </div>

    </div>
  );
}

function ArchivePreview() {
  return (
    <section className="relative z-10 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-3">
          <a href="/books" className="iron-frame rounded-sm p-7 transition-transform hover:-translate-y-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-copper-light">Book status</p>
            <h2 className="mt-4 font-display text-2xl">The Uncrowned</h2>
            <p className="mt-4 leading-7 text-parchment/60">Book One of Steel of Machina is in development.</p>
            <p className="mt-6 border-l-2 border-brass/50 pl-3 text-sm text-parchment/40">Coming Soon</p>
          </a>
          <a href="/gallery" className="iron-frame rounded-sm p-7 transition-transform hover:-translate-y-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-copper-light">Visual archive</p>
            <h2 className="mt-4 font-display text-2xl">Concept Gallery</h2>
            <p className="mt-4 leading-7 text-parchment/60">Inspect character files, creatures, relics, and artwork from the frontier.</p>
            <p className="mt-6 text-sm font-semibold text-brass-light">OPEN THE GALLERY →</p>
          </a>
          <article className="iron-frame rounded-sm p-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-copper-light">Reader dispatches</p>
            <h2 className="mt-4 font-display text-2xl">Field Reports</h2>
            <p className="mt-4 leading-7 text-parchment/60">Reader reactions will appear here after the next advance-reader campaign.</p>
            <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brass-light">Coming soon</p>
          </article>
        </div>
      </div>
    </section>
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
        className="inline-flex min-h-11 items-center gap-2 rounded-sm px-2 font-sans text-base font-medium text-parchment/80 transition-colors hover:bg-brass/10 hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass sm:px-3 sm:text-lg"
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
          href="#child-of-destiny"
          onClick={(event) => {
            event.preventDefault();
            setOpen(false);
            window.history.pushState(null, "", "#child-of-destiny");
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
  const contactDialog = useRef<HTMLDialogElement>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

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
    if (!contactOpen) return;
    const dialog = contactDialog.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [contactOpen]);

  useEffect(() => {
    const shouldScroll =
      focusBek ||
      pathname === "/child-of-destiny" ||
      window.location.hash === "#child-of-destiny" ||
      window.location.hash === "#bek";

    if (!shouldScroll) return;

    const frame = window.requestAnimationFrame(() => {
      scrollToBek();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusBek, pathname]);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#contact") setContactOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gunmetal text-parchment">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.065]" />
      <div className="vintage-grid pointer-events-none fixed inset-0 z-0 opacity-30" />
      <div className="pointer-events-none fixed -left-40 top-24 z-0 h-[34rem] w-[34rem] rounded-full bg-copper/[0.07] blur-[140px]" />
      <div className="pointer-events-none fixed -right-48 top-[45%] z-0 h-[40rem] w-[40rem] rounded-full bg-amber/[0.05] blur-[160px]" />

      <section className="relative z-10 flex min-h-screen flex-col px-5 pb-10 pt-6 sm:px-8 lg:px-12">
        <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 border-b border-brass/15 pb-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="brass-plate relative inline-flex items-center gap-3 px-3 py-3 font-sans text-base font-medium text-parchment/85 sm:px-4 sm:text-lg">
              <span className="flex h-7 w-7 items-center justify-center border border-brass/50 bg-black/25 text-brass-light">
                CG
              </span>
              <span className="hidden sm:inline">Carl Griff</span>
            </div>
            <SocialLinks />
          </div>
          <div className="order-3 flex w-full items-center justify-between gap-2 border-t border-brass/10 pt-3 sm:order-none sm:w-auto sm:border-0 sm:pt-0">
            <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
              <ProjectsDropdown />
              <a href="/books" className="rounded-sm px-2 py-3 text-base font-medium text-parchment/75 hover:bg-brass/10 hover:text-parchment sm:px-3 sm:text-lg">Books</a>
              <a href="/gallery" className="rounded-sm px-2 py-3 text-base font-medium text-parchment/75 hover:bg-brass/10 hover:text-parchment sm:px-3 sm:text-lg">Gallery</a>
              <a href="/about" className="rounded-sm px-2 py-3 text-base font-medium text-parchment/75 hover:bg-brass/10 hover:text-parchment sm:px-3 sm:text-lg">About</a>
            </nav>
            <button
              id="contact"
              type="button"
              aria-haspopup="dialog"
              onClick={() => setContactOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-brass/25 px-3 font-sans text-base font-medium text-parchment/80 transition-colors hover:border-brass/60 hover:bg-brass/10 hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass sm:text-lg"
            >
              <Mail className="h-[18px] w-[18px] text-brass-light" aria-hidden="true" />
              <span className="hidden sm:inline">Contact Me</span>
            </button>
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
                href="#child-of-destiny"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState(null, "", "#child-of-destiny");
                  scrollToBek();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="brass-button group inline-flex min-h-14 items-center gap-3 rounded-sm px-6 font-mono text-xs font-bold tracking-[0.14em]"
              >
                GET THE CHILD OF DESTINY FREE
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

      <ArchivePreview />

      <section
        id="child-of-destiny"
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
                  GET THE CHILD OF DESTINY FREE
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
              The Child of Destiny
            </h2>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-copper-light sm:text-xs">
              A Short Novella from the World of Steel of Machina
            </p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-parchment/55">
              <strong>The Child of Destiny</strong> is a short novella set in the world of{" "}
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
                GET THE CHILD OF DESTINY FREE
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="reader-list" className="relative z-10 border-t border-brass/15 px-5 py-20 sm:px-8 lg:px-12">
        <motion.div {...reveal} className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber">[ Open reader channel ]</p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl">Join the Reader List</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-parchment/65 sm:text-lg">Get future book news, development reports, concept art, and occasional extras delivered directly to your inbox.</p>
          <div className="mt-9 rounded-sm border border-brass/30 bg-black/15 p-5 text-left shadow-xl sm:p-8">
            <NewsletterSignup />
          </div>
        </motion.div>
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
              The Child of Destiny
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

      <dialog
        ref={contactDialog}
        aria-labelledby="contact-title"
        aria-describedby="contact-description"
        onClose={() => setContactOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setContactOpen(false);
        }}
        className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-xl overflow-y-auto rounded-md border border-brass/50 bg-gunmetal p-0 text-parchment shadow-2xl backdrop:bg-black/75"
      >
        <div className="p-5 sm:p-8">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.22em] text-amber">
                [ Direct transmission ]
              </p>
              <h2 id="contact-title" className="font-display text-3xl leading-tight">
                Contact Carl
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close contact form"
              onClick={() => setContactOpen(false)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-brass/30 hover:bg-brass/10 focus-visible:outline-2 focus-visible:outline-brass"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <p id="contact-description" className="mb-6 leading-7 text-parchment/70">
            Questions, reader notes, and professional inquiries are welcome.
          </p>
          <ContactForm />
        </div>
      </dialog>

      <footer className="relative z-10 border-t border-brass/15 px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 font-mono text-[8px] uppercase tracking-[0.18em] text-parchment/25 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Carlston Grefalde Archives</span>
          <SocialLinks footer />
          <div className="flex items-center gap-4">
            <a href="/books" className="hover:text-parchment/70">Books</a>
            <a href="/gallery" className="hover:text-parchment/70">Gallery</a>
            <a href="/privacy" className="hover:text-parchment/70">
              Privacy
            </a>
            <a href="/terms" className="hover:text-parchment/70">Terms</a>
            <span>End transmission. Await further orders</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
