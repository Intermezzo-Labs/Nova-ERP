import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';
import { customerFormSchema, type CustomerDetails } from '../../../lib/schemas/customer';
import type { Tables } from '$lib/types/database.types';

export type Customer = Tables<'customer'> & {
	details: CustomerDetails;
	customer_note: Tables<'customer_note'>[];
};

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { user } = await safeGetSession();

	if (!user) throw 'Missing user data';

	const { data, error } = await supabase
		.from('customer')
		.select('*, customer_note(*)')
		.eq('user_id', user.id)
		.order('updated_at', { ascending: false })
		.limit(20);

	const customers = data?.map(
		(customer) =>
			({
				...customer,
				details: customerFormSchema.parse(customer.details)
			}) satisfies Customer
	);

	return {
		form: await superValidate(zod(customerFormSchema)),
		customers,
		error
	};
};
