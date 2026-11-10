import type { Metadata } from "next";
import Image from "next/image";
import { BekSignup } from "@/components/bek-signup";

export const metadata: Metadata = {
  title: "The Child of Destiny — Get the Free Novella | Carl Griff",
  description:
    "A free short novella from the world of Steel of Machina, plus a character card and wallpapers.",
  robots: { index: true, follow: true },
};

export default function ChildOfDestinyPage() {
  return (
    <main className="min-h-screen bg-gunmetal px-5 py-8 text-parchment sm:px-8">
      <header className="mx-auto max-w-5xl border-b border-brass/25 pb-6">
        <a href="/" className="text-lg font-semibold">
          CG · Carl Griff
        </a>
      </header>
      <section className="mx-auto grid max-w-6xl items-center gap-12 py-12 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
        <figure className="iron-frame relative mx-auto min-h-[520px] w-full max-w-md overflow-hidden rounded-md p-4 shadow-2xl sm:min-h-[640px] sm:p-6">
          <div className="absolute inset-4 overflow-hidden border border-brass/30 bg-black sm:inset-6">
            <Image
              src="/images/child-of-destiny/cover.jpg"
              alt="The Child of Destiny, a short prequel by Carl Griff"
              fill
              sizes="(min-width: 1024px) 36vw, (min-width: 640px) 70vw, calc(100vw - 64px)"
              className="object-contain"
              priority
            />
            <figcaption className="status-tag absolute left-3 top-3 z-10 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.18em] sm:left-4 sm:top-4">
              Official prequel // Recon file 01
            </figcaption>
          </div>
        </figure>
        <div>
          <p className="mb-5 inline-flex items-center gap-2 border border-amber/35 bg-amber/[0.06] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-amber">
            A free short novella
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            The Child of Destiny
          </h1>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-copper-light sm:text-xs">
            A short novella from the world of Steel of Machina
          </p>
          <p className="mt-7 max-w-2xl text-base leading-8 text-parchment/65">
            In the lawless canal city of Basabas, a side character gets an
            adventure of his own—through crowded piers, shifting tides, strange
            beasts, and the dangerous corners the main story leaves behind.
          </p>
          <div className="my-8 h-px w-full max-w-sm bg-gradient-to-r from-brass/40 to-transparent" />
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-parchment/65">
            Requisition includes
          </p>
          <ul className="mb-8 grid gap-3 text-sm text-parchment/75 sm:grid-cols-2">
            <li className="border-l-2 border-brass/50 pl-3">The free novella</li>
            <li className="border-l-2 border-brass/50 pl-3">Character card</li>
            <li className="border-l-2 border-brass/50 pl-3">Desktop wallpaper</li>
            <li className="border-l-2 border-brass/50 pl-3">Mobile wallpaper</li>
          </ul>
          <div className="border-t border-brass/25 pt-6">
            <h2 className="mb-5 font-display text-2xl">
              Get The Child of Destiny free
            </h2>
            <BekSignup />
          </div>
        </div>
      </section>
      <footer className="mx-auto flex max-w-5xl items-center justify-between border-t border-brass/25 py-6 text-sm text-parchment/55">
        <span>© {new Date().getFullYear()} Carl Griff</span>
        <a
          href="/privacy"
          className="underline decoration-brass/50 underline-offset-4 hover:text-parchment"
        >
          Privacy Policy
        </a>
      </footer>
    </main>
  );
}
