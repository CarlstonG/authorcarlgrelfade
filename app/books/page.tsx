import type { Metadata } from "next";
import Image from "next/image";
import { InteriorBackdrop, InteriorFooter, InteriorHeader } from "@/components/interior-shell";

export const metadata: Metadata = { title: "Books", description: "Books and stories by fantasy author Carl Griff." };

const books = [
  {
    title: "Steel of Machina: The Uncrowned",
    status: "IN DEVELOPMENT",
    genre: "Dark Military Fantasy",
    description: [
      "Five years after Valdaka’s fall, its surviving prince, Dane, is drawn toward scattered resistance movements seeking a leader. Reclaiming his place means confronting the loss of his kingdom—and deciding what he is willing to become for those who survived.",
      "Meanwhile, Kaen, a Valen Sentinel investigating treachery and forbidden blood magic, enters the divided Free Nations as an envoy and spy. The mysterious Mask King moves among refugees and those caught in the conflict, concealing an identity and purpose that neither side fully understands.",
      "As Emperor Azezel’s armies advance under a promise to unite and cleanse the East, Steel of Machina: The Uncrowned follows their intertwined paths through Imperial conquest, fractured loyalties, and a resistance whose leaders may prove as dangerous as the enemy.",
    ],
    progress: "Coming Soon",
    image: "/images/hero-banner.png",
    imageAlt: "Steel of Machina artwork",
  },
  { title: "The Child of Destiny", status: "FREE NOVELLA", genre: "Steel of Machina Prequel", description: ["In the lawless canal city of Basabas, a side character gets an adventure of his own through shifting tides, strange beasts, and dangerous corners."], progress: "Available in PDF and EPUB", image: "/images/child-of-destiny/cover.jpg", imageAlt: "The Child of Destiny cover", href: "/child-of-destiny" },
];

export default function BooksPage() {
  return <main className="relative min-h-screen overflow-hidden bg-gunmetal px-5 py-7 text-parchment sm:px-8"><InteriorBackdrop /><div className="relative z-10"><InteriorHeader />
    <section className="mx-auto max-w-6xl py-14 sm:py-20">
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber">[ Published and incoming transmissions ]</p>
      <h1 className="mt-4 font-display text-4xl sm:text-6xl">Books & Stories</h1>
      <div className="mt-12 space-y-8">
        {books.map((book) => (
          <article key={book.title} className="iron-frame grid overflow-hidden rounded-sm p-4 md:grid-cols-[260px_minmax(0,1fr)] md:gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div className="relative min-h-[390px] overflow-hidden border border-brass/25 bg-black/25 md:min-h-[430px]">
              <Image src={book.image} alt={book.imageAlt} fill sizes="(min-width: 1024px) 300px, (min-width: 768px) 260px, calc(100vw - 72px)" className="object-cover" />
            </div>
            <div className="min-w-0 p-5 sm:p-7 lg:p-9">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-copper-light">{book.status} · {book.genre}</p>
              <h2 className="mt-4 max-w-3xl font-display text-2xl leading-tight sm:text-3xl">{book.title}</h2>
              <div className="mt-6 max-w-3xl space-y-4">
                {book.description.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-parchment/65">{paragraph}</p>)}
              </div>
              <p className="mt-6 border-l-2 border-brass/50 pl-3 text-sm text-parchment/50">{book.progress}</p>
              {book.href && <a href={book.href} className="copper-button mt-7 inline-flex min-h-11 items-center rounded-sm px-5 font-semibold">GET IT FREE</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
    <InteriorFooter /></div></main>;
}
