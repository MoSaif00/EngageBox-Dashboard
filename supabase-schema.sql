-- EngageBox schema — paste into Supabase SQL Editor and run once

-- Tables
CREATE TABLE IF NOT EXISTS projects (
  id serial PRIMARY KEY,
  name text,
  description text,
  url text,
  user_id varchar
);

CREATE TABLE IF NOT EXISTS feedbacks (
  id serial PRIMARY KEY,
  project_id integer REFERENCES projects(id) ON DELETE CASCADE,
  user_name text,
  user_email text,
  message text,
  rating integer
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id serial PRIMARY KEY,
  user_id varchar,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscribed boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_project_id ON feedbacks(project_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);

-- Widget RPC (called by EngageBox-Widget via supabase.rpc("add_feedback", ...))
CREATE OR REPLACE FUNCTION add_feedback(
  p_project_id integer,
  p_user_name text,
  p_user_email text,
  p_message text,
  p_rating integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO feedbacks (project_id, user_name, user_email, message, rating)
  VALUES (p_project_id, p_user_name, p_user_email, p_message, p_rating);
END;
$$;

GRANT EXECUTE ON FUNCTION add_feedback(integer, text, text, text, integer) TO anon, authenticated;

-- Optional: allow anon read of nothing; dashboard uses DATABASE_URL as postgres.
-- Enable RLS for safety on public API access:
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- No open SELECT/INSERT policies for anon on tables.
-- Feedback inserts go only through add_feedback (SECURITY DEFINER).
