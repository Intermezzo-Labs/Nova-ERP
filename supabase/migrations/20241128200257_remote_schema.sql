drop trigger if exists "set_updated_at" on "public"."nova_users";

drop policy "Service role can insert users" on "public"."nova_users";

drop policy "Users can update own data" on "public"."nova_users";

drop policy "Users can view own data" on "public"."nova_users";

revoke delete on table "public"."nova_users" from "anon";

revoke insert on table "public"."nova_users" from "anon";

revoke references on table "public"."nova_users" from "anon";

revoke select on table "public"."nova_users" from "anon";

revoke trigger on table "public"."nova_users" from "anon";

revoke truncate on table "public"."nova_users" from "anon";

revoke update on table "public"."nova_users" from "anon";

revoke delete on table "public"."nova_users" from "authenticated";

revoke insert on table "public"."nova_users" from "authenticated";

revoke references on table "public"."nova_users" from "authenticated";

revoke select on table "public"."nova_users" from "authenticated";

revoke trigger on table "public"."nova_users" from "authenticated";

revoke truncate on table "public"."nova_users" from "authenticated";

revoke update on table "public"."nova_users" from "authenticated";

revoke delete on table "public"."nova_users" from "service_role";

revoke insert on table "public"."nova_users" from "service_role";

revoke references on table "public"."nova_users" from "service_role";

revoke select on table "public"."nova_users" from "service_role";

revoke trigger on table "public"."nova_users" from "service_role";

revoke truncate on table "public"."nova_users" from "service_role";

revoke update on table "public"."nova_users" from "service_role";

alter table "public"."nova_users" drop constraint "nova_users_id_fkey";

alter table "public"."nova_users" drop constraint "nova_users_role_check";

alter table "public"."nova_users" drop constraint "nova_users_status_check";

drop function if exists "public"."handle_updated_at"();

alter table "public"."nova_users" drop constraint "nova_users_pkey";

drop index if exists "public"."nova_users_pkey";

drop table "public"."nova_users";


