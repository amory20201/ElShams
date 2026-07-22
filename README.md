# ElShams Real Estate site

The responsive landing page is in `index.html`. Buyer leads are submitted to `POST /api/leads` and stored by `api/leads.js` in PostgreSQL. Seller submissions are sent to the Google Sheet URL configured in `script.js` `SITE_CONFIG.sellSheetUrl`.

## Schema

Run `schema.sql` against your PostgreSQL database before deploying. The `property_leads` table now captures:

- `full_name`, `mobile_phone`, `budget` — required buyer fields
- `prop_type`, `trans_type`, `requested_property` — optional context fields
- `lead_source` — identifies `about_form` vs `sell_form` submissions

## Deploy

1. Create a PostgreSQL database and run `schema.sql`.
2. Deploy this folder to Vercel.
3. Add `DATABASE_URL` to the project's environment variables (use the database provider's SSL connection string).
4. Vercel installs `postgres` from `package.json`; buyer submissions will then be written to `property_leads`.
5. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` in `script.js` `SITE_CONFIG.sellSheetUrl` with your Google Sheet Web App URL to activate the sell form.
6. Replace the placeholder Vercel deploy URL in `<meta property="og:url">` across all HTML files with your actual domain.

The API validates required fields, uses parameterized queries to protect against SQL injection, and returns CORS headers.

## Site config

All contact numbers and URLs are defined once in `script.js` under `SITE_CONFIG` and `WA_LINKS`. Update them there instead of searching through HTML files.

