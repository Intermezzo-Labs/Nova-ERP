-- This file should contain an SQL script that populates your database
-- with seed data.
-- You can use this file to add initial data to specific tables, or
-- to create test data for your application.

-- Insert some sample users
insert into auth.users (instance_id, id, aud, role, email, encrypted_password, raw_app_meta_data, raw_user_meta_data, email_confirmed_at, created_at)
  values ('00000000-0000-0000-0000-000000000000', '185f2f83-d63a-4c9b-b4a0-7e4a885799e2', 'authenticated', 'authenticated', 'my@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now()));

insert into auth.identities (id, user_id, identity_data, provider, provider_id, created_at)
  values ('185f2f83-d63a-4c9b-b4a0-7e4a885799e2', '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',	'{"sub": "185f2f83-d63a-4c9b-b4a0-7e4a885799e2"}', 'email', 'foobar', timezone('utc'::text, now()));

-- Insert a sample customer
INSERT INTO public.customer (id, user_id, email, details, created_at, updated_at)
VALUES
    (DEFAULT, '185f2f83-d63a-4c9b-b4a0-7e4a885799e2', 'john.doe@example.com', '{"name": "John Doe" }'::jsonb, NOW(), NOW());

-- Insert a sample note for the customer
INSERT INTO public.customer_note (id, user_id, customer_id, note, created_at, updated_at)
VALUES
    (DEFAULT, '185f2f83-d63a-4c9b-b4a0-7e4a885799e2', 1, 'Initial customer contact', NOW(), NOW());