-- Win-back logging enhancements for monitoring and retry visibility
-- Run in Supabase SQL editor

ALTER TABLE public.win_back_email_log
  ADD COLUMN IF NOT EXISTS attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_error text,
  ADD COLUMN IF NOT EXISTS last_attempt_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_win_back_email_log_status ON public.win_back_email_log(status, sent_at DESC);
