-- Add deferred_at column to onboarding_progress table for 24h snooze feature
ALTER TABLE onboarding_progress
ADD COLUMN IF NOT EXISTS deferred_at TIMESTAMPTZ;

-- Add index for efficient queries checking deferred status
CREATE INDEX IF NOT EXISTS idx_onboarding_progress_deferred_at 
ON onboarding_progress(user_id, deferred_at);
