-- Create the leads table
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  role text NOT NULL,
  phone text NOT NULL,
  lang text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new leads
CREATE POLICY "Allow public inserts" ON leads FOR INSERT WITH CHECK (true);

-- (Optional) Only allow authenticated admins to read leads
-- CREATE POLICY "Allow admins to read" ON leads FOR SELECT USING (auth.role() = 'authenticated');
