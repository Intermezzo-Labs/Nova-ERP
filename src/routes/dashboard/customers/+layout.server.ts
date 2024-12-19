import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';
import { customerFormSchema } from './customerSchema';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { user } = await safeGetSession();

	if (!user) throw 'Missing user data';

	const { data: customers, error } = await supabase
		.from('customer')
		.select('*')
		.eq('user_id', user.id)
		.limit(100);

	return {
		form: await superValidate(zod(customerFormSchema)),
		customers,
		error
	};
};
