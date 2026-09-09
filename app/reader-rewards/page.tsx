import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reader Rewards | Carl Griff",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const rewards = [
  { title: "BEK", description: "A short novella from the world of Steel of Machina.",
    links: [
      { label: "Read / Download BEK", url: process.env.BEK_DELIVERY_URL, external: true },
      { label: "Download PDF", url: process.env.NEXT_PUBLIC_BEK_PDF_URL },
      { label: "Download EPUB", url: process.env.NEXT_PUBLIC_BEK_EPUB_URL },
    ] },
  { title: "Bek character card", description: "Meet Bek beyond the pages.",
    links: [{ label: "Download character card", url: process.env.NEXT_PUBLIC_CHARACTER_CARD_URL }] },
  { title: "Steel of Machina wallpaper", description: "A piece of the world for your screen.",
    links: [
      { label: "Download desktop", url: process.env.NEXT_PUBLIC_DESKTOP_WALLPAPER_URL },
      { label: "Download mobile", url: process.env.NEXT_PUBLIC_MOBILE_WALLPAPER_URL },
    ] },
];

export default function ReaderRewardsPage() {
  return (
    <main className="min-h-screen bg-gunmetal px-5 py-8 text-parchment sm:px-8">
      <header className="mx-auto max-w-5xl border-b border-brass/25 pb-6">
        <a href="/" className="text-lg font-semibold">CG · Carl Griff</a>
      </header>
      <div className="mx-auto max-w-5xl py-12 sm:py-20">
        <h1 className="font-display text-4xl sm:text-6xl">Reader Rewards</h1>
        <p className="mt-5 text-lg leading-8 text-parchment/75">Thanks for reading. Your BEK reader pack lives here—bookmark this page to return anytime.</p>
        <div className="mt-10 grid gap-6">
          {rewards.map((reward) => {
            const available = reward.links.filter((link) => link.url);
            return (
              <section key={reward.title} className="rounded-md border border-brass/30 bg-iron p-6 sm:p-8">
                <h2 className="font-display text-2xl">{reward.title}</h2>
                <p className="mt-3 leading-7 text-parchment/75">{reward.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {available.map((link) => (
                    <a key={link.label} href={link.url} download={"external" in link && link.external ? undefined : true}
                      className="copper-button inline-flex min-h-12 items-center justify-center rounded-sm px-5 py-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass">
                      {link.label}
                    </a>
                  ))}
                  {!available.length && <p className="text-sm text-parchment/60">Coming soon — files are being prepared.</p>}
                </div>
              </section>
            );
          })}
        </div>
        <section className="mt-12">
          <h2 className="font-display text-2xl">More from the world</h2>
          <p className="mt-3 leading-7 text-parchment/75">More illustrations, character cards, and reader bonuses will be added over time.</p>
        </section>
      </div>
    </main>
  );
}
