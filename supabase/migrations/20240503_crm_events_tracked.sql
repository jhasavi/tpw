-- Create table for tracking CRM events to ensure idempotency
-- This prevents duplicate CRM events from being sent

CREATE TABLE IF NOT EXISTS crm_events_tracked (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_key VARCHAR(255) NOT NULL,
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  event_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure uniqueness per user and event key
  UNIQUE(user_id, event_key)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_crm_events_tracked_user_id ON crm_events_tracked(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_events_tracked_event_key ON crm_events_tracked(event_key);
CREATE INDEX IF NOT EXISTS idx_crm_events_tracked_event_type ON crm_events_tracked(event_type);
CREATE INDEX IF NOT EXISTS idx_crm_events_tracked_tracked_at ON crm_events_tracked(tracked_at);

-- Add RLS policies
ALTER TABLE crm_events_tracked ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own tracked events
CREATE POLICY "Users can view own CRM events" ON crm_events_tracked
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own tracked events
CREATE POLICY "Users can insert own CRM events" ON crm_events_tracked
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own tracked events
CREATE POLICY "Users can update own CRM events" ON crm_events_tracked
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own tracked events
CREATE POLICY "Users can delete own CRM events" ON crm_events_tracked
  FOR DELETE USING (auth.uid() = user_id);

-- Add function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to automatically update updated_at
CREATE TRIGGER update_crm_events_tracked_updated_at
  BEFORE UPDATE ON crm_events_tracked
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment for documentation
COMMENT ON TABLE crm_events_tracked IS 'Tracks CRM events sent to prevent duplicates and ensure idempotency';
COMMENT ON COLUMN crm_events_tracked.event_key IS 'Unique key for the event (e.g., course_started_userId_courseId)';
COMMENT ON COLUMN crm_events_tracked.event_type IS 'Type of CRM event (course_started, lesson_completed, course_completed)';
