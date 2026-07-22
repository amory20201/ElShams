// Vercel serverless function. Add DATABASE_URL in your hosting project's environment variables.
import postgres from 'postgres';

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, phone, budget, prop_type, trans_type, requested_property, lead_source } = req.body || {};

  if (!name?.trim() || !phone?.trim() || !budget?.trim()) return res.status(400).json({ error: 'Name, phone and budget are required' });
  if (name.length > 120 || phone.length > 30 || budget.length > 50) return res.status(400).json({ error: 'Invalid input' });

  try {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    await sql`
      INSERT INTO property_leads
        (full_name, mobile_phone, budget, prop_type, trans_type, requested_property, lead_source)
      VALUES
        (${name.trim()}, ${phone.trim()}, ${budget.trim()}, ${prop_type?.trim() || null}, ${trans_type?.trim() || null}, ${requested_property?.trim() || null}, ${lead_source?.trim() || null})
    `;
    return res.status(201).json({ saved: true });
  } catch (error) {
    console.error('Lead save error:', error);
    return res.status(500).json({ error: 'Could not save lead' });
  }
}
