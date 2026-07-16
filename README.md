# ElShams real estate site

The responsive landing page is in `index.html`. Leads are submitted to `/api/leads` and stored by `api/leads.js` in PostgreSQL.

## Deploy

1. Create a PostgreSQL database and run `schema.sql`.
2. Deploy this folder to Vercel.
3. Add `DATABASE_URL` to the project's environment variables (use the database provider's SSL connection string).
4. Vercel installs `postgres` from `package.json`; submissions will then be written to `property_leads`.

The API validates required fields and uses parameterized queries to protect the database from SQL injection.
