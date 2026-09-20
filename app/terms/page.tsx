import type { Metadata } from "next";
import { InteriorBackdrop, InteriorFooter, InteriorHeader } from "@/components/interior-shell";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms governing use of the Carl Griff website and reader rewards." };

const sections = [
  ["Website content", "Text, artwork, branding, and downloadable material on this website belong to their respective rights holders and may not be republished, sold, or redistributed without permission."],
  ["Reader rewards", "Reader-reward files are provided for personal, non-commercial use. Download links may change or be withdrawn, and availability is not guaranteed indefinitely."],
  ["External services", "This site links to services such as Instagram, Facebook, Kit, Resend, Vercel, and Cloudflare. Their own terms and privacy practices apply when you use those services."],
  ["No warranty", "The website and its downloads are provided as available. Reasonable care is taken, but uninterrupted access, compatibility, and error-free operation are not guaranteed."],
  ["Contact", "Questions about these terms may be sent through the website contact form or to carl@carlgriff.com."],
];

export default function TermsPage() { return <main className="relative min-h-screen overflow-hidden bg-gunmetal px-5 py-7 text-parchment sm:px-8"><InteriorBackdrop /><div className="relative z-10"><InteriorHeader /><article className="mx-auto max-w-4xl py-14 sm:py-20"><h1 className="font-display text-4xl sm:text-6xl">Terms of Use</h1><p className="mt-4 text-sm text-parchment/45">Last updated: September 20, 2026</p><p className="mt-8 leading-8 text-parchment/70">These terms apply when you visit carlgriff.com or download reader material. By using this site, you agree to use its content and services lawfully and in accordance with these terms.</p><div className="mt-10 space-y-9">{sections.map(([title, body]) => <section key={title}><h2 className="font-display text-2xl">{title}</h2><p className="mt-3 leading-8 text-parchment/65">{body}</p></section>)}</div></article><InteriorFooter /></div></main>; }
