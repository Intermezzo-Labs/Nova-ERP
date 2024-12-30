import { superValidate } from 'sveltekit-superforms/server';
import { invoiceFormSchema } from '../../../lib/schemas/invoice';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { customerFormSchema } from '../../../lib/schemas/customer';
import { companyDetailsSchema } from '$lib/schemas/company';

export const load = async ({ locals }) => {
	// Get invoice count with error handling
	const { supabase, safeGetSession } = locals;
	const { user } = await safeGetSession();

	if (!user) throw 'Missing user data';

	// Initialize the form with default data
	const form = await superValidate(zod(invoiceFormSchema));

	const invoicesReq = supabase.from('invoice').select('*, customer(details)', { count: 'exact' });
	const customersReq = supabase.from('customer').select('id, details');
	const companiesReq = supabase.from('company').select('id, details');

	const [invoicesResponse, customersResponse, companiesResponse] = await Promise.all([
		invoicesReq,
		customersReq,
		companiesReq
	]);

	return {
		form,
		invoices: invoicesResponse.data?.map((invoice) => {
			const result = customerFormSchema.safeParse(invoice.customer?.details);
			return {
				...invoice,
				customer: result.success ? result.data : null
			};
		}),
		invoicesCount: invoicesResponse.count,
		customers: customersResponse.data?.map((customer) => ({
			id: customer.id,
			details: customerFormSchema.parse(customer.details)
		})),
		companies: companiesResponse.data?.map((company) => ({
			id: company.id,
			details: companyDetailsSchema.parse(company.details)
		}))
	};
};

export const actions = {
	create: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { user } = await safeGetSession();

		if (!user) throw 'Missing user data';

		const data = await request.formData();
		const form = await superValidate(data, zod(invoiceFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error } = await supabase.from('invoice').insert({
			company_id: form.data.company_id,
			customer_id: form.data.customer_id,
			document_location: '',
			total: form.data.total,
			user_id: user!.id,
			status: form.data.status
		});

		if (error)
			return fail(400, {
				form,
				error
			});

		return {
			form,
			success: true
		};
	}
};
