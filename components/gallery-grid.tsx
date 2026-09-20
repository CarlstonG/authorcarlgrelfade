"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  instagramUrl?: string;
  actionUrl?: string;
  actionLabel?: string;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selected) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", close);
    };
  }, [selected]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            whileHover={{ y: -6 }}
            className="iron-frame group relative min-h-[390px] overflow-hidden rounded-sm p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
          >
            <span className="relative block h-[300px] overflow-hidden border border-brass/25 bg-black/25">
              <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 92vw" className={`${item.imageFit === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-700 group-hover:scale-105`} />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </span>
            <span className="block px-2 pb-2 pt-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-copper-light">{item.category}</span>
              <span className="mt-2 block font-display text-xl text-parchment">{item.title}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)} role="presentation">
            <motion.section role="dialog" aria-modal="true" aria-labelledby="gallery-dialog-title" initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.25 }} className="grid max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-md border border-brass/45 bg-gunmetal shadow-2xl md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[360px] bg-black/35 md:min-h-[620px]">
                <Image src={selected.image} alt={selected.imageAlt} fill sizes="(min-width: 768px) 55vw, 100vw" className={selected.imageFit === "contain" ? "object-contain p-6" : "object-cover"} />
              </div>
              <div className="relative flex flex-col p-6 sm:p-8">
                <button ref={closeButton} type="button" onClick={() => setSelected(null)} aria-label="Close gallery item" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-sm border border-brass/30 hover:bg-brass/10 focus-visible:outline-2 focus-visible:outline-brass"><X className="h-5 w-5" /></button>
                <p className="pr-14 font-mono text-[9px] uppercase tracking-[0.22em] text-copper-light">{selected.category}</p>
                <h2 id="gallery-dialog-title" className="mt-4 pr-12 font-display text-3xl leading-tight sm:text-4xl">{selected.title}</h2>
                <p className="mt-6 leading-8 text-parchment/70">{selected.caption}</p>
                <div className="mt-auto space-y-3 pt-10">
                  {selected.instagramUrl ? <a href={selected.instagramUrl} target="_blank" rel="noopener noreferrer" className="copper-button flex min-h-12 items-center justify-center gap-2 rounded-sm px-5 font-semibold">VIEW ON INSTAGRAM <ExternalLink className="h-4 w-4" /></a> : <p className="rounded-sm border border-dashed border-brass/30 p-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-brass-light">Coming Soon</p>}
                  {selected.actionUrl && selected.actionLabel && <a href={selected.actionUrl} className="flex min-h-12 items-center justify-center rounded-sm border border-brass/35 px-5 font-semibold text-parchment hover:bg-brass/10">{selected.actionLabel}</a>}
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
