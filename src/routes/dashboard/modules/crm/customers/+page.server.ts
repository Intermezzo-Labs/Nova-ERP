import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { customerFormSchema, updateCustomerFormSchema } from './customerSchema.js';

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { user } = await safeGetSession();

	if (!user) throw 'Missing user data';

	const { data: customers, error } = await supabase
		.from('customer')
		.select('*')
		.eq('user_id', user.id)
		.limit(20);

	return {
		form: await superValidate(zod(customerFormSchema)),
		customers:
			customers?.map((customer) => ({
				id: customer.id,
				created: new Date(customer.created_at).toLocaleString(),
				updated: new Date(customer.updated_at).toLocaleString(),
				details: customerFormSchema.parse(customer.details)
			})) ?? [],
		error
	};
};

export const actions: Actions = {
	create: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { user } = await safeGetSession();

		if (!user) throw 'Missing user data';

		const data = await request.formData();
		const form = await superValidate(data, zod(customerFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error } = await supabase.from('customer').insert({
			details: form.data,
			user_id: user.id
		});

		if (error) throw error;

		return {
			form,
			success: true
		};
	},
	update: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { user } = await safeGetSession();

		if (!user) throw 'Missing user data';

		const data = await request.formData();
		const form = await superValidate(data, zod(updateCustomerFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { id, ...details } = form.data;

		const { error } = await supabase
			.from('customer')
			.update({
				details
			})
			.eq('id', id);

		if (error) throw error;

		return {
			form,
			success: true
		};
	}
};
