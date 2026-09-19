"use client";

import { track } from "@vercel/analytics/react";

type TrackedPdfLinkProps = {
  href: string;
  className: string;
  children: React.ReactNode;
};

export function TrackedPdfLink({
  href,
  className,
  children,
}: TrackedPdfLinkProps) {
  function trackPdfClick() {
    try {
      track("child_of_destiny_pdf_click", {
        reward: "the-child-of-destiny",
        format: "pdf",
        source: "reader-rewards",
      });
    } catch {
      // Analytics must never prevent the reader from opening the PDF.
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackPdfClick}
      className={className}
    >
      {children}
    </a>
  );
}
