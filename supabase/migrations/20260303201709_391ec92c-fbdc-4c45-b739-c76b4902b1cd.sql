
-- Fix maintenance_requests RLS: change from RESTRICTIVE to PERMISSIVE
-- so landlords OR tenants can access (not both required)

DROP POLICY IF EXISTS "Landlords can manage maintenance for own properties" ON public.maintenance_requests;
DROP POLICY IF EXISTS "Tenants can manage own requests" ON public.maintenance_requests;

-- Landlords: full CRUD on requests for their properties
CREATE POLICY "Landlords can manage maintenance for own properties"
ON public.maintenance_requests
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM units u
    JOIN properties p ON u.property_id = p.id
    WHERE u.id = maintenance_requests.unit_id AND p.landlord_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM units u
    JOIN properties p ON u.property_id = p.id
    WHERE u.id = maintenance_requests.unit_id AND p.landlord_id = auth.uid()
  )
);

-- Tenants: can view and create their own requests
CREATE POLICY "Tenants can view own requests"
ON public.maintenance_requests
FOR SELECT
TO authenticated
USING (auth.uid() = tenant_id);

CREATE POLICY "Tenants can create requests"
ON public.maintenance_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Tenants can update own requests"
ON public.maintenance_requests
FOR UPDATE
TO authenticated
USING (auth.uid() = tenant_id);
