# Carl Grefalde Author Hub

A single-page Next.js author launcher with a dedicated `/bek` entry route, smooth hash navigation, a responsive cyberpunk-fantasy interface, and a Mailchimp-ready lead-magnet flow.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Both `http://localhost:3000/#bek` and `http://localhost:3000/bek` scroll directly to the prequel dossier.

## Mailchimp configuration

Copy `.env.example` to `.env.local` and provide:

- `MAILCHIMP_API_KEY`
- `MAILCHIMP_SERVER_PREFIX`
- `MAILCHIMP_AUDIENCE_ID`

During local development, the API returns a demo success when Mailchimp variables are absent. Production returns a configuration error instead of pretending a subscription succeeded.

## Download configuration

Place the PDF and EPUB in `public/downloads`, or configure hosted asset URLs with:

- `NEXT_PUBLIC_BEK_PDF_URL`
- `NEXT_PUBLIC_BEK_EPUB_URL`
- `NEXT_PUBLIC_BEK_WIKI_URL`
