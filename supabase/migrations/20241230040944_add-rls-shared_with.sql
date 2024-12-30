
CREATE POLICY "Users can view customers of shared companies"
ON public.customer
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.company c
    WHERE c.id = customer.company_id
      AND auth.email() IN (SELECT jsonb_array_elements_text(c.shared_with))
  )
);

CREATE POLICY "Users can view invoice of shared companies"
ON public.invoice
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.company c
    WHERE c.id = invoice.company_id
      AND auth.email() IN (SELECT jsonb_array_elements_text(c.shared_with))
  )
);

CREATE POLICY "Users can view product of shared companies"
ON public.product
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.company c
    WHERE c.id = product.company_id
      AND auth.email() IN (SELECT jsonb_array_elements_text(c.shared_with))
  )
);

CREATE POLICY "Users can view inventory_item of shared companies"
ON public.inventory_item
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.company c
    WHERE c.id = inventory_item.company_id
      AND auth.email() IN (SELECT jsonb_array_elements_text(c.shared_with))
  )
);