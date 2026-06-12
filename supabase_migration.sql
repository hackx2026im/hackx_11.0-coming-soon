-- Create the hackx_leads table
CREATE TABLE hackx_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  university text NOT NULL,
  phone text NOT NULL,
  email text,
  lang text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE hackx_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new leads
CREATE POLICY "Allow public inserts" ON hackx_leads FOR INSERT WITH CHECK (true);

-- (Optional) Only allow authenticated admins to read leads
-- CREATE POLICY "Allow admins to read" ON hackx_leads FOR SELECT USING (auth.role() = 'authenticated');
