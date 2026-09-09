# Carl Griff Reader Rewards

## Local development
Run `npm install` and `npm run dev`. Copy `.env.example` to `.env.local`.

## Reader flow
- Public, indexable `/bek`: story introduction, email field, GET BEK FREE.
- The homepage modal uses the same email form.
- POST /api/subscribe validates email, upserts the subscriber in Kit v4, then associates them with the BEK form. No separate subscriber database.
- Only after both requests succeed does the browser navigate immediately to `/reader-rewards`. New and existing subscribers follow the same flow.
- Returning readers use the direct rewards link from email.
- `/reader-rewards` has noindex/nofollow metadata and no public navigation link. It is unlisted, not authenticated. Sharing is acceptable.
- Old `/library` links redirect to rewards. No sitemap or site search currently exists; exclude both routes if adding either.

## Required Kit setup
Set server-only `KIT_API_KEY` (v4) and `KIT_BEK_FORM_ID`. The form associates readers with BEK; use Kit form automation to add a BEK tag if desired. Never put secrets in public variables.

Set up a Kit email triggered by the BEK form containing your full website URL followed by /reader-rewards. Choose confirmation settings in Kit; website access does not wait for confirmation. Test actual delivery for new subscribers. Existing form subscribers may not receive the same automation again, but their successful submission still opens rewards immediately.

Suggested subject: Your copy of BEK is ready
Suggested body: Thanks for joining me. Your BEK reader pack is ready, including the novella, character card and wallpaper.
Button: GET YOUR READER PACK → your full /reader-rewards URL.

## Rewards
Set `BEK_DELIVERY_URL` to an ebook delivery page for existing readers, not another signup page. Optional PDF/EPUB URLs provide direct alternatives.

Place artwork in public/downloads/bek, for example:
- bek-character-card.pdf
- bek-wallpaper-desktop.jpg
- bek-wallpaper-mobile.jpg

Set the matching variables in .env.example to /downloads/bek/filename. Local artwork uses direct download links. Leave missing URLs blank; the page does not pretend missing assets are available. Cover and artwork previews need the final artwork before they can be added. Expand the rewards array in app/reader-rewards/page.tsx for future packs.

Rebuild/redeploy when changing NEXT_PUBLIC variables. Configure server variables on the deployment too.

## Validation
Run `npx tsc --noEmit` and `git diff --check`.
Before launch, test live Kit credentials with an authorized test address, duplicate signup, the welcome email, all downloads, and desktop/mobile rendering. No live subscribers are created by local checks.
