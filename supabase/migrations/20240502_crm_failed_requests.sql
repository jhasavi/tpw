-- Migration: Create crm_failed_requests table for durable CRM failure handling
-- Purpose: Store failed CRM requests for retry and recovery
-- Environment: Production Supabase database

-- Create crm_failed_requests table
CREATE TABLE IF NOT EXISTS crm_failed_requests (
  id TEXT PRIMARY KEY,                    -- Unique request identifier
  timestamp TEXT NOT NULL,                -- ISO timestamp of original failure
  endpoint TEXT NOT NULL,                 -- CRM API endpoint
  method TEXT NOT NULL,                   -- HTTP method (POST, GET, PATCH)
  payload JSONB,                          -- Request payload
  error TEXT NOT NULL,                    -- Error message
  status_code INTEGER,                    -- HTTP status code (if available)
  retry_count INTEGER DEFAULT 0,         -- Number of retry attempts
  user_id TEXT,                           -- TPW user ID (for correlation)
  email TEXT,                             -- User email (for lookup)
  created_at TIMESTAMP DEFAULT NOW(),     -- Creation timestamp
  last_retry_at TIMESTAMP                 -- Last retry timestamp
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_crm_failed_requests_email ON crm_failed_requests(email);
CREATE INDEX IF NOT EXISTS idx_crm_failed_requests_retry_count ON crm_failed_requests(retry_count);
CREATE INDEX IF NOT EXISTS idx_crm_failed_requests_created_at ON crm_failed_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_crm_failed_requests_user_id ON crm_failed_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_failed_requests_status_code ON crm_failed_requests(status_code);

-- Add RLS (Row Level Security) policies
ALTER TABLE crm_failed_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to manage all failed requests
CREATE POLICY "Service role full access to crm_failed_requests" ON crm_failed_requests
  FOR ALL USING (auth.role() = 'service_role');

-- Policy: Allow authenticated users to view their own failed requests (for debugging)
CREATE POLICY "Users can view own failed requests" ON crm_failed_requests
  FOR SELECT USING (auth.uid()::text = user_id);

-- Add comments for documentation
COMMENT ON TABLE crm_failed_requests IS 'Stores failed CRM requests for retry and recovery';
COMMENT ON COLUMN crm_failed_requests.id IS 'Unique request identifier for deduplication';
COMMENT ON COLUMN crm_failed_requests.timestamp IS 'ISO timestamp of original failure';
COMMENT ON COLUMN crm_failed_requests.endpoint IS 'CRM API endpoint that failed';
COMMENT ON COLUMN crm_failed_requests.method IS 'HTTP method used for the request';
COMMENT ON COLUMN crm_failed_requests.payload IS 'Original request payload';
COMMENT ON COLUMN crm_failed_requests.error IS 'Error message from failure';
COMMENT ON COLUMN crm_failed_requests.status_code IS 'HTTP status code (if available)';
COMMENT ON COLUMN crm_failed_requests.retry_count IS 'Number of retry attempts made';
COMMENT ON COLUMN crm_failed_requests.user_id IS 'TPW user ID for correlation';
COMMENT ON COLUMN crm_failed_requests.email IS 'User email for lookup and debugging';
COMMENT ON COLUMN crm_failed_requests.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN crm_failed_requests.last_retry_at IS 'Timestamp of last retry attempt';

-- Create a function for automatic cleanup of old failed requests
CREATE OR REPLACE FUNCTION cleanup_old_crm_failures()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete failed requests older than 7 days
  DELETE FROM crm_failed_requests 
  WHERE created_at < NOW() - INTERVAL '7 days';
  
  -- Log cleanup activity
  INSERT INTO supabase_admin.log_entries (level, message, created_at)
  VALUES ('INFO', 'CRM failed requests cleanup completed', NOW());
  
  EXCEPTION WHEN OTHERS THEN
    -- Log cleanup errors
    INSERT INTO supabase_admin.log_entries (level, message, created_at)
    VALUES ('ERROR', 'CRM failed requests cleanup failed: ' || SQLERRM, NOW());
END;
$$;

-- Grant execution rights to service role
GRANT EXECUTE ON FUNCTION cleanup_old_crm_failures TO service_role;

-- Create a scheduled job for daily cleanup (if supported)
-- Note: This would need to be set up in Supabase dashboard or via cron
-- Example: SELECT cron.schedule('cleanup-crm-failures', '0 2 * * *', 'SELECT cleanup_old_crm_failures();');

-- Create view for monitoring failed requests
CREATE OR REPLACE VIEW crm_failure_stats AS
SELECT 
  COUNT(*) as total_failed,
  COUNT(CASE WHEN retry_count = 0 THEN 1 END) as pending_first_retry,
  COUNT(CASE WHEN retry_count < 3 THEN 1 END) as eligible_for_retry,
  COUNT(CASE WHEN retry_count >= 3 THEN 1 END) as exhausted_retries,
  COUNT(CASE WHEN status_code >= 500 THEN 1 END) as server_errors,
  COUNT(CASE WHEN status_code >= 400 AND status_code < 500 THEN 1 END) as client_errors,
  MIN(created_at) as oldest_failure,
  MAX(created_at) as newest_failure,
  AVG(EXTRACT(EPOCH FROM (NOW() - created_at))/60) as avg_age_minutes
FROM crm_failed_requests;

-- Grant read access to service role
GRANT SELECT ON crm_failure_stats TO service_role;

COMMENT ON VIEW crm_failure_stats IS 'Monitoring view for CRM failure queue statistics';
