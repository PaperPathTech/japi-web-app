-- Add report status support to vendor_reports
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'vendor_report_status'
  ) THEN
    CREATE TYPE vendor_report_status AS ENUM (
      'new',
      'in_review',
      'resolved',
      'dismissed'
    );
  END IF;
END $$;

ALTER TABLE vendor_reports
  ADD COLUMN IF NOT EXISTS status vendor_report_status;

UPDATE vendor_reports
SET status = 'new'
WHERE status IS NULL;

ALTER TABLE vendor_reports
  ALTER COLUMN status SET DEFAULT 'new';

ALTER TABLE vendor_reports
  ALTER COLUMN status SET NOT NULL;
