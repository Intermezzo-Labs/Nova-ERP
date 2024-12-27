alter table public.company add column shared_with jsonb;

alter table public.customer add column company_id BIGINT REFERENCES company(id) on delete cascade ;