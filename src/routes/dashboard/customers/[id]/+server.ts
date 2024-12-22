import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const DELETE: RequestHandler = async ({ locals: { safeGetSession, supabase }, params }) => {
	const { user } = await safeGetSession();

	if (!user) throw 'Missing user data';

	const everything = await supabase.from('customer').delete({ count: 'exact' }).eq('id', params.id);
	console.log(everything, params.id);
	if (everything.error) throw everything.error;

	return json(params.id, { status: 200 });
};
