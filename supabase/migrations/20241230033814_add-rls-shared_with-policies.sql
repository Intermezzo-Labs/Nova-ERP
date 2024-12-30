create policy "Users with email in shared_with can view data"
on public."company"
as PERMISSIVE
for SELECT
to authenticated
USING (auth.email() IN (SELECT jsonb_array_elements_text(shared_with)));
