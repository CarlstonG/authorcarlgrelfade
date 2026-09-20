import type { Metadata } from "next";
import { GalleryGrid, type GalleryItem } from "@/components/gallery-grid";
import { InteriorBackdrop, InteriorFooter, InteriorHeader } from "@/components/interior-shell";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Concept art, characters, creatures, and recovered visual files from the worlds of Carl Griff.",
};

// Replace captions and add instagramUrl values when the matching posts are ready.
const galleryItems: GalleryItem[] = [
  { id: "child-cover", title: "The Child of Destiny", category: "Cover File", caption: "Official cover artwork for The Child of Destiny, a short novella from the world of Steel of Machina.", image: "/images/child-of-destiny/cover.jpg", imageAlt: "The Child of Destiny cover", imageFit: "contain", actionUrl: "/child-of-destiny", actionLabel: "GET THE NOVELLA FREE" },
  { id: "bek", title: "Bek // Age 12", category: "Character File", caption: "Coming Soon", image: "/images/child-of-destiny/bek-card.jpg", imageAlt: "Character portrait of Bek" },
  { id: "kingtoad", title: "Kingtoad", category: "Creature Sighting", caption: "Coming Soon", image: "/images/child-of-destiny/kingtoad.jpg", imageAlt: "A Kingtoad emerging from dark water" },
  { id: "plague-mask", title: "Ember Plague Mask", category: "Recovered Relic", caption: "Coming Soon", image: "/images/child-of-destiny/plague-mask.png", imageAlt: "A stitched plague mask with glowing embers", imageFit: "contain" },
  { id: "death-sigil", title: "Machina Death Sigil", category: "Faction Insignia", caption: "Coming Soon", image: "/images/child-of-destiny/skull-gear.png", imageAlt: "A brass gear and animal skull insignia", imageFit: "contain" },
  { id: "bek-portrait", title: "Child of the Canal City", category: "Concept Illustration", caption: "Coming Soon", image: "/images/child-of-destiny/bek-portrait.jpg", imageAlt: "Concept portrait from The Child of Destiny" },
];

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gunmetal px-5 py-7 text-parchment sm:px-8">
      <InteriorBackdrop />
      <div className="relative z-10"><InteriorHeader />
        <section className="mx-auto max-w-6xl py-14 sm:py-20">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber">[ Visual archive ]</p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl">Gallery</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment/65">Characters, creatures, relics, and field illustrations from Carl Griff’s worlds. Select a file to inspect it.</p>
          <div className="mt-12"><GalleryGrid items={galleryItems} /></div>
        </section>
        <InteriorFooter />
      </div>
    </main>
  );
}
