import { InteriorBackdrop } from "@/components/interior-shell";

export default function NotFound() {
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gunmetal px-5 text-center text-parchment"><InteriorBackdrop /><section className="relative z-10 max-w-xl"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber">Error // Archive file missing</p><h1 className="mt-5 font-display text-7xl sm:text-9xl">404</h1><p className="mt-6 text-lg leading-8 text-parchment/65">This transmission could not be recovered from the archive.</p><a href="/" className="copper-button mt-8 inline-flex min-h-12 items-center rounded-sm px-6 font-semibold">RETURN HOME</a></section></main>;
}
