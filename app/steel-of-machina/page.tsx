import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InteriorBackdrop, InteriorFooter, InteriorHeader } from "@/components/interior-shell";

const synopsis = [
  "The Empire’s Dominion wages a ruthless campaign to purge the free nations of the Chastmires of the Viserik Blood Witches and their cult. Three lives are drawn into the conflict: an uncrowned prince who seeks allies at the far end of the world to exact his vengeance, a Hunter Sentinel officer determined to carry out his duty with honor, and a mock king bound to a deadly secret.",
  "The Uncrowned is the first book in the Steel of Machina series. It’s a dark military fantasy and coming-of-age adventure with gaslamp and steampunk elements.",
];

export const metadata: Metadata = {
  title: "Steel of Machina: The Uncrowned | Carl Griff",
  description:
    "Discover Steel of Machina: The Uncrowned, a dark military fantasy and coming-of-age adventure with gaslamp and steampunk elements by Carl Griff.",
  alternates: { canonical: "/steel-of-machina" },
  openGraph: {
    title: "Steel of Machina: The Uncrowned | Carl Griff",
    description:
      "A dark military fantasy and coming-of-age adventure with gaslamp and steampunk elements by Carl Griff.",
    url: "/steel-of-machina",
    images: [{ url: "/images/mockup_studio.jpg", alt: "Steel of Machina: The Uncrowned book mockup" }],
  },
};

export default function SteelOfMachinaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gunmetal px-5 py-7 text-parchment sm:px-8">
      <InteriorBackdrop />
      <div className="relative z-10">
        <InteriorHeader />
        <section className="mx-auto grid max-w-6xl items-center gap-10 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <figure className="hero-portrait max-w-md">
            <Image
              src="/images/mockup_studio.jpg"
              alt="Steel of Machina: Book One, The Uncrowned book mockup"
              width={1080}
              height={1350}
              priority
              sizes="(min-width: 1024px) 36vw, (min-width: 640px) 70vw, calc(100vw - 64px)"
              className="hero-portrait-image"
            />
          </figure>
          <div>
            <p className="inline-flex border border-amber/35 bg-amber/[0.06] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-amber">
              Steel of Machina · Book One
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-6xl">
              The <em className="text-brass-light">Uncrowned</em>
            </h1>
            <div className="mt-7 space-y-5 text-base leading-8 text-parchment/70 sm:text-lg">
              {synopsis.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link
              href="/child-of-destiny"
              className="copper-button mt-9 inline-flex min-h-12 items-center justify-center rounded-sm px-5 py-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              GET THE FREE COMPANION
            </Link>
          </div>
        </section>
        <InteriorFooter />
      </div>
    </main>
  );
}