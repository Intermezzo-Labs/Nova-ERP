import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const DELETE: RequestHandler = async ({ locals: { safeGetSession, supabase }, params }) => {
	const { user } = await safeGetSession();

	if (!user) throw 'Missing user data';

	const response = await supabase
		.from('customer')
		.update({ archived_at: new Date().toISOString() })
		.eq('id', params.id);
	if (response.error) throw response.error;

	return json(response);
};
