import { PRIVATE_SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/database.types';
import { createClient, type User } from '@supabase/supabase-js';

const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_ROLE, {
	auth: {
		autoRefreshToken: false,
		persistSession: false
	}
});

export const adminAuthClient = supabase.auth.admin;

export const getUserByPublicKey = ({ publicKey }: { publicKey: string }) =>
	supabase.rpc('get_user_by_pubkey', { p_pubkey: publicKey }).returns<User>();
