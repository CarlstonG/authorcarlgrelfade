import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: { absolute: "Carl Griff | Dark Fantasy Author of Steel of Machina" },
  description:
    "Discover dark military fantasy by Carl Griff, author of Steel of Machina. Explore the upcoming novel The Uncrowned and get the free prequel novella, The Child of Destiny.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Carl Griff | Dark Fantasy Author of Steel of Machina",
    description:
      "Discover dark military fantasy by Carl Griff, author of Steel of Machina. Explore the upcoming novel The Uncrowned and get the free prequel novella, The Child of Destiny.",
    url: "/",
    images: [{ url: "/images/promo_preorder.jpg", alt: "Steel of Machina: The Uncrowned preorder announcement" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carl Griff | Dark Fantasy Author of Steel of Machina",
    description:
      "Discover dark military fantasy by Carl Griff, author of Steel of Machina. Explore the upcoming novel The Uncrowned and get the free prequel novella, The Child of Destiny.",
    images: ["/images/promo_preorder.jpg"],
  },
};

export default function HomePage() {
  return <LandingPage />;
}
