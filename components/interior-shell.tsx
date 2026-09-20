import { Facebook, Instagram } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/#reader-list", label: "Reader List" },
];

export function InteriorHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-b border-brass/25 pb-6">
      <a href="/" className="font-display text-lg font-semibold tracking-wide text-parchment">
        CG · Carl Griff
      </a>
      <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-base font-medium text-parchment/70 sm:text-lg">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-brass-light">
            {link.label}
          </a>
        ))}
        <a href="/#contact" className="transition-colors hover:text-brass-light">Contact</a>
      </nav>
    </header>
  );
}

export function InteriorFooter() {
  return (
    <footer className="mx-auto mt-16 flex w-full max-w-6xl flex-col gap-5 border-t border-brass/25 py-7 text-sm text-parchment/50 sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} Carl Griff</span>
      <div className="flex items-center gap-3">
        <a href="https://www.instagram.com/carlgriff.author/" target="_blank" rel="noopener noreferrer" aria-label="Carl Griff on Instagram" className="rounded-sm border border-brass/30 p-3 text-brass-light hover:bg-brass/10"><Instagram className="h-5 w-5" /></a>
        <a href="https://www.facebook.com/CarlGGriff" target="_blank" rel="noopener noreferrer" aria-label="Carl Griff on Facebook" className="rounded-sm border border-brass/30 p-3 text-brass-light hover:bg-brass/10"><Facebook className="h-5 w-5" /></a>
      </div>
      <div className="flex gap-4">
        <a href="/privacy" className="hover:text-parchment">Privacy</a>
        <a href="/terms" className="hover:text-parchment">Terms</a>
      </div>
    </footer>
  );
}

export function InteriorBackdrop() {
  return (
    <>
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.055]" />
      <div className="vintage-grid pointer-events-none fixed inset-0 opacity-25" />
    </>
  );
}
