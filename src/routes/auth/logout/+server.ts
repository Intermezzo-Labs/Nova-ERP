import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	await supabase.auth.signOut();

	const redirectTo = new URL(url);
	redirectTo.pathname = '/';
	redirect(303, redirectTo);
};
