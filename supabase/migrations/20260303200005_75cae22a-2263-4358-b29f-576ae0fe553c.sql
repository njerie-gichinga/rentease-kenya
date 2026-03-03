
-- Drop the problematic policy that references auth.users directly
DROP POLICY IF EXISTS "Invitees can view their invitation" ON public.tenant_invitations;

-- Recreate using auth.jwt() which doesn't require table access
CREATE POLICY "Invitees can view their invitation"
ON public.tenant_invitations
FOR SELECT
TO authenticated
USING (tenant_email = (auth.jwt()->>'email'));
