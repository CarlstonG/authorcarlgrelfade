import type { Metadata } from "next";
import Image from "next/image";
import { InteriorBackdrop, InteriorFooter, InteriorHeader } from "@/components/interior-shell";

export const metadata: Metadata = { title: "About Carl Griff", description: "Meet Carl Griff, software engineer, game developer, father, and fantasy author." };

export default function AboutPage() {
  return <main className="relative min-h-screen overflow-hidden bg-gunmetal px-5 py-7 text-parchment sm:px-8"><InteriorBackdrop /><div className="relative z-10"><InteriorHeader />
    <section className="mx-auto grid max-w-6xl items-start gap-12 py-14 sm:py-20 lg:grid-cols-[0.75fr_1.25fr]"><div className="hero-portrait"><Image src="/images/hero-banner.png" alt="Carl Grefalde, writing as Carl Griff" width={1080} height={1350} className="hero-portrait-image" /></div><div><p className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber">[ Author dossier ]</p><h1 className="mt-4 font-display text-4xl sm:text-6xl">Carl Griff</h1><p className="mt-4 text-parchment/55">A pen name of Carlston Grefalde</p><div className="mt-8 space-y-5 text-lg leading-9 text-parchment/70"><p>Carl Griff is a software engineer, game developer, father, and lifelong worldbuilder. After years of creating worlds through notebooks, code, and game development, he returned to one of his oldest ambitions: writing fantasy.</p><p>With a background in game design, Carl specializes in tight character perspective, spatial awareness, and immersive environments. His fiction aims to place readers inside the character’s exact physical position, the layout of every room, and the brutal weight of every choice.</p><p>Originally from Dumaguete City, a small Filipino city shaped by Spanish influences, Carl continues to enjoy programming and designing game levels that invite exploration, danger, and discovery. His creative influences include Tite Kubo, John Quinn, and Tuomas Pirinen. In 2010, he was named Programmer of the Year at STI College.</p></div></div></section>
    <InteriorFooter /></div></main>;
}
