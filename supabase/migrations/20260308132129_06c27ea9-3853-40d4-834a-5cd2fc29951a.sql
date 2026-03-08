
-- Add payment_method and checkout_request_id columns to payments
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'cash';
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS checkout_request_id text NULL;
