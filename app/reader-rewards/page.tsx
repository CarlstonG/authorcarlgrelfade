import type { Metadata } from "next";
import { TrackedPdfLink } from "@/components/tracked-pdf-link";

export const metadata: Metadata = {
  title: "Reader Rewards | Carl Griff",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const rewards = [
  {
    title: "THE CHILD OF DESTINY",
    description: "A short novella from the world of Steel of Machina.",
    links: [
      {
        label: "READ / DOWNLOAD PDF",
        url: process.env.CHILD_OF_DESTINY_PDF_URL,
        trackPdfClick: true,
      },
      {
        label: "DOWNLOAD EPUB",
        url: process.env.CHILD_OF_DESTINY_EPUB_URL,
        trackPdfClick: false,
      },
    ],
  },
  {
    title: "BONUS ART PACK",
    description: "Wallpapers, character card, and illustrations.",
    links: [
      {
        label: "DOWNLOAD BONUS ART PACK",
        url: process.env.CHILD_OF_DESTINY_BONUS_ART_ZIP_URL,
        trackPdfClick: false,
      },
    ],
  },
];

export default function ReaderRewardsPage() {
  return (
    <main className="min-h-screen bg-gunmetal px-5 py-8 text-parchment sm:px-8">
      <header className="mx-auto max-w-5xl border-b border-brass/25 pb-6">
        <a href="/" className="text-lg font-semibold">CG · Carl Griff</a>
      </header>
      <div className="mx-auto max-w-5xl py-12 sm:py-20">
        <h1 className="font-display text-4xl sm:text-6xl">Reader Rewards</h1>
        <p className="mt-5 text-lg leading-8 text-parchment/75">Thanks for reading. Your Child of Destiny reader pack lives here—bookmark this page to return anytime.</p>
        <div className="mt-10 grid gap-6">
          {rewards.map((reward) => (
            <section key={reward.title} className="rounded-md border border-brass/30 bg-iron p-6 sm:p-8">
              <h2 className="font-display text-2xl">{reward.title}</h2>
              <p className="mt-3 leading-7 text-parchment/75">{reward.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {reward.links.some((link) => link.url) ? (
                  reward.links.map((link) =>
                    link.url && link.trackPdfClick ? (
                      <TrackedPdfLink
                        key={link.label}
                        href={link.url}
                        className="copper-button inline-flex min-h-12 items-center justify-center rounded-sm px-5 py-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                      >
                        {link.label}
                      </TrackedPdfLink>
                    ) : link.url ? (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="copper-button inline-flex min-h-12 items-center justify-center rounded-sm px-5 py-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                      >
                        {link.label}
                      </a>
                    ) : null,
                  )
                ) : (
                  <p className="text-sm text-parchment/60">Coming soon — files are being prepared.</p>
                )}
              </div>
            </section>
          ))}
        </div>
        <section className="mt-12">
          <h2 className="font-display text-2xl">More from the world</h2>
          <p className="mt-3 leading-7 text-parchment/75">More illustrations, character cards, and reader bonuses will be added over time.</p>
        </section>
      </div>
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
