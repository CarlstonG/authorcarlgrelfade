import type { Metadata } from "next";
import { Cinzel, Space_Grotesk } from "next/font/google";
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
  title: "Carl Grefalde // Author & Creator",
  description:
    "Stories from the frontier and fantasy realms by Carl Grefalde.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
