import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';
import { customerFormSchema, type CustomerDetails } from '../../../lib/schemas/customer';
import type { Tables } from '$lib/types/database.types';
import { getCompanyId } from '$lib/utils/company-id';
import { redirect } from '@sveltejs/kit';

export type Customer = Tables<'customer'> & {
	details: CustomerDetails;
	customer_note: Tables<'customer_note'>[];
};

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase }, cookies }) => {
	const companyId = getCompanyId(cookies);
	const { user } = await safeGetSession();

	if (!user || !companyId) redirect(302, '/dashboard/companies');

	const { data, error } = await supabase
		.from('customer')
		.select('*, customer_note(*)')
		.eq('company_id', companyId)
		.is('archived_at', null)
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
