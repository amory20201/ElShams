CREATE TABLE IF NOT EXISTS property_leads (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  mobile_phone VARCHAR(30) NOT NULL,
  prop_type VARCHAR(50),
  trans_type VARCHAR(50),
  budget VARCHAR(50) NOT NULL,
  requested_property TEXT,
  lead_source VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
