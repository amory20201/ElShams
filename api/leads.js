// Vercel serverless function. Add DATABASE_URL in your hosting project's environment variables.
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, phone, budget } = req.body || {};
  if (!name?.trim() || !phone?.trim() || !budget?.trim()) return res.status(400).json({ error: 'Name, phone and budget are required' });
  if (name.length > 120 || phone.length > 30 || budget.length > 50) return res.status(400).json({ error: 'Invalid input' });
  try {
    await sql`INSERT INTO property_leads (full_name, mobile_phone, budget) VALUES (${name.trim()}, ${phone.trim()}, ${budget.trim()})`;
    return res.status(201).json({ saved: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not save lead' });
  }
}
