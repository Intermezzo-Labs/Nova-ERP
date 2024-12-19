import type { PageServerLoad } from './$types.js';
import { customerFormSchema, type CustomerDetails } from '../customerSchema.js';
import type { Tables } from '$lib/types/database.types.js';

export const load: PageServerLoad = async ({
	parent,
	params,
	locals: { supabase, safeGetSession }
}) => {
	const { form, customers: rawCustomers } = await parent();
	const { user } = await safeGetSession();

	const customers = rawCustomers?.map(parseCustomer) ?? [];
	let selectedCustomer = customers?.find((c) => c.id === +params.id);
	if (!selectedCustomer) {
		const { data, error } = await supabase
			.from('customer')
			.select('*')
			.eq('id', params.id)
			.eq('user_id', user!.id)
			.single();
		if (error) throw error;
		selectedCustomer = parseCustomer(data);
	}

	return {
		form,
		customers,
		selectedCustomer
	};
};

export interface ICustomer extends Pick<Tables<'customer'>, 'id'> {
	details: CustomerDetails;
	created: string;
	updated: string;
}

const parseCustomer = (customer: Tables<'customer'>): ICustomer => ({
	id: customer.id,
	created: new Date(customer.created_at).toLocaleString(),
	updated: new Date(customer.updated_at).toLocaleString(),
	details: customerFormSchema.parse(customer.details)
});
