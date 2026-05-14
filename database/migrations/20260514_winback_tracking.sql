-- Win-back campaign infrastructure
-- Run in Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.win_back_email_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  inactivity_day integer NOT NULL,
  segment text NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'sent',
  UNIQUE (user_id, inactivity_day)
);

ALTER TABLE public.win_back_email_log ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'win_back_email_log'
      AND policyname = 'Service role manages win back email log'
  ) THEN
    CREATE POLICY "Service role manages win back email log"
      ON public.win_back_email_log
      AS PERMISSIVE
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_win_back_email_log_sent_at ON public.win_back_email_log(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_win_back_email_log_inactivity_day ON public.win_back_email_log(inactivity_day);

CREATE TABLE IF NOT EXISTS public.email_campaign_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  campaign_id text NOT NULL,
  event_type text NOT NULL,
  event_at timestamptz NOT NULL DEFAULT now(),
  link_url text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

ALTER TABLE public.email_campaign_events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'email_campaign_events'
      AND policyname = 'Service role manages email campaign events'
  ) THEN
    CREATE POLICY "Service role manages email campaign events"
      ON public.email_campaign_events
      AS PERMISSIVE
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_email_campaign_events_campaign ON public.email_campaign_events(campaign_id, event_type, event_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_campaign_events_email ON public.email_campaign_events(email, event_at DESC);
