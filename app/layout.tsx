import type { Metadata } from "next";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carlgriff.com"),
  title: {
    default: "Carl Griff | Fantasy Author & Worldbuilder",
    template: "%s | Carl Griff",
  },
  description: "Dark military fantasy, immersive worlds, and stories by author and game developer Carl Griff.",
  openGraph: {
    type: "website",
    siteName: "Carl Griff",
    title: "Carl Griff | Fantasy Author & Worldbuilder",
    description: "Dark military fantasy, immersive worlds, and stories by Carl Griff.",
    url: "/",
    images: [{ url: "/images/hero-banner.png", alt: "Carl Griff author portrait" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carl Griff | Fantasy Author & Worldbuilder",
    description: "Dark military fantasy, immersive worlds, and stories by Carl Griff.",
    images: ["/images/hero-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Carl Griff",
              alternateName: "Carlston Grefalde",
              url: "https://carlgriff.com",
              sameAs: [
                "https://www.instagram.com/carlgriff.author/",
                "https://www.facebook.com/CarlGGriff",
              ],
              jobTitle: "Author and Game Developer",
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
