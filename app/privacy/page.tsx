import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Carl Griff",
  description: "Privacy information for the Carl Griff website and reader list.",
};

const sections = [
  {
    title: "Information collected",
    body: [
      "When you request The Child of Destiny reader pack or join the reader list, this site collects the email address you submit.",
      "The website host may also process limited technical information needed to serve and secure the site, such as an IP address, browser type, request time, and server logs.",
    ],
  },
  {
    title: "How information is used",
    body: [
      "Your email address is used to deliver the requested reader rewards, manage your subscription, and send occasional messages about books, stories, releases, and related reader material from Carl Griff.",
      "Personal information is not sold. It may be disclosed when required by law or when reasonably necessary to protect the website, its readers, or its services.",
    ],
  },
  {
    title: "Email provider",
    body: [
      "The reader list is managed through Kit. When you submit the signup form, your email address is sent to Kit so it can maintain your subscription and deliver email. Kit processes subscriber information under its own terms and data-processing commitments.",
    ],
  },
  {
    title: "Retention and your choices",
    body: [
      "Subscription information is retained while you remain on the reader list or while it is reasonably needed for the purposes described above.",
      "You may unsubscribe at any time using the unsubscribe link included in reader-list emails. You may also reply to any email from the Carl Griff reader list to request access, correction, or deletion of your subscription information.",
    ],
  },
  {
    title: "Cookies and tracking",
    body: [
      "The current website does not intentionally set advertising or analytics cookies. Essential infrastructure operated by the website host may process technical data required to provide and protect the service.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "This notice may be updated when the website, reader-list features, or service providers change. The revision date below will be updated when material changes are made.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gunmetal px-5 py-8 text-parchment sm:px-8">
      <header className="mx-auto flex max-w-4xl items-center justify-between border-b border-brass/25 pb-6">
        <a href="/" className="text-lg font-semibold">
          CG · Carl Griff
        </a>
        <a
          href="/"
          className="text-sm text-parchment/65 underline decoration-brass/50 underline-offset-4 hover:text-parchment"
        >
          Return home
        </a>
      </header>

      <article className="mx-auto max-w-4xl py-12 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-light">
          Reader data notice
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-sm text-parchment/50">
          Last updated: September 18, 2026
        </p>
        <p className="mt-8 max-w-3xl text-base leading-8 text-parchment/75">
          This policy explains how Carlston Grefalde, publishing as Carl Griff,
          handles personal information collected through this website and the
          Carl Griff reader list.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl font-semibold text-parchment">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-3xl text-base leading-8 text-parchment/70"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="font-display text-2xl font-semibold text-parchment">
              Service-provider policy
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-parchment/70">
              Review{" "}
              <a
                href="https://kit.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="text-brass-light underline decoration-brass/50 underline-offset-4 hover:text-parchment"
              >
                Kit’s privacy policy
              </a>{" "}
              for information about Kit’s privacy practices.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-parchment">
              Contact
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-parchment/70">
              For a privacy request concerning the reader list, reply to any
              email you receive from Carl Griff and state the request clearly.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
