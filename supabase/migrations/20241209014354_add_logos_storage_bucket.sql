
-- Set up Storage!
insert into storage.buckets (id, name)
  values ('logos', 'logos');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Give users access to delete own logos folder " on storage.objects
  for delete using ((bucket_id = 'logos'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1]));

create policy "Give users access to select own logos folder " on storage.objects
  for select using ((bucket_id = 'logos'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1]));

create policy "Give users access to update own logos folder " on storage.objects
  for update using ((bucket_id = 'logos'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1]));

create policy "Give users access to create own logos folder" on storage.objects
  for insert with check ((bucket_id = 'logos'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1]));