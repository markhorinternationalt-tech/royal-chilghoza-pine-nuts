# Royal Chilghoza Pine Nuts — Cloudflare Final Project

This package is prepared for a Cloudflare Workers deployment using Workers Static Assets + Worker API + D1 + R2 + Workers AI.

## What is included
- Mobile-first premium design and responsive desktop layout.
- Main brand: **Royal Chilghoza Pine Nuts**.
- English default + 9 selectable languages: English, Chinese, Urdu, Pashto, Dari/Persian, Russian, Indonesian, Malay and Arabic.
- Language changes apply to the complete interface, including navigation and major content labels.
- Reliable Back button and browser history.
- Trade & Business folders and Research & Knowledge folders.
- Research includes GI, forests, global environment/climate, organic claims, supply-chain traceability, nutrition, processing and research library.
- Trade includes global markets, export/logistics, product quality, buyers/pricing, traceability, Afghanistan/Central Asia, China and USA.
- 43 supplied project photographs are included as real image files; no screenshots, stock or generated images are used.
- Profile photograph is separate and shown on the home page.
- Address is a clean end-of-page contact section, not a folder.
- Admin demo with server-side login endpoint, D1 content/settings/audit foundation, R2 binding and Workers AI binding.
- Theme Studio: background, text, accent and surface colors can be changed without redeployment once D1 is connected.
- Content editor is designed for draft-first changes; future full CMS fields can be expanded in D1.

## One-time Cloudflare setup
1. Create a D1 database:
   `npx wrangler d1 create royal-chilghoza-db --update-config`
2. Create the R2 bucket:
   `npx wrangler r2 bucket create royal-chilghoza-media --update-config`
3. Put the returned D1 database ID into `wrangler.jsonc` if Wrangler did not update it automatically.
4. Apply the schema:
   `npx wrangler d1 execute royal-chilghoza-db --remote --file=schema.sql`
5. Set secrets. **Do not put the real password in HTML or source code:**
   `npx wrangler secret put ADMIN_PASSWORD`
   `npx wrangler secret put SESSION_SECRET`
6. Install Wrangler and test locally:
   `npm install`
   `npm run dev`
7. Deploy only after Chrome/mobile testing:
   `npm run deploy`

## Important
- Cloudflare bindings are intentionally represented in `wrangler.jsonc`; the D1 ID must be supplied by the account owner.
- The public frontend never contains the production admin password.
- Ordinary content/theme changes are intended to happen through Admin/D1 after deployment, so a new deployment is not required for those changes.
- Programming-level changes (new routes, backend logic, bindings) still require a Worker deployment.
