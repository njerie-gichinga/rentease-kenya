CREATE POLICY "Landlords can insert payments for own units"
ON public.payments
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM units u
    JOIN properties p ON u.property_id = p.id
    WHERE u.id = payments.unit_id AND p.landlord_id = auth.uid()
  )
);