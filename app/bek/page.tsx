import type { Metadata } from "next";
import { BekSignup } from "@/components/bek-signup";

export const metadata: Metadata = {
  title: "BEK — Get the Free Novella | Carl Griff",
  description: "A free short novella from the world of Steel of Machina, plus a character card and wallpapers.",
  robots: { index: true, follow: true },
};

export default function BekPage() {
  return (
    <main className="min-h-screen bg-gunmetal px-5 py-8 text-parchment sm:px-8">
      <header className="mx-auto max-w-5xl border-b border-brass/25 pb-6">
        <a href="/" className="text-lg font-semibold">CG · Carl Griff</a>
      </header>
      <section className="mx-auto grid max-w-5xl items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="mb-4 text-sm text-brass-light">A free short novella</p>
          <h1 className="font-display text-7xl font-bold sm:text-8xl">BEK</h1>
          <p className="mt-5 text-xl">Set in the world of <em>Steel of Machina</em>.</p>
          <p className="mt-6 text-base leading-8 text-parchment/75">
            In the lawless canal city of Basabas, a side character gets an adventure of his own—through crowded piers, shifting tides, strange beasts, and the dangerous corners the main story leaves behind.
          </p>
        </div>
        <div className="rounded-md border border-brass/40 bg-iron p-6 sm:p-8">
          <h2 className="mb-3 font-display text-2xl">Get BEK free</h2>
          <p className="mb-6 leading-7 text-parchment/75">Get the novella plus an exclusive character card and desktop and mobile wallpapers.</p>
          <BekSignup />
        </div>
      </section>
    </main>
  );
}
