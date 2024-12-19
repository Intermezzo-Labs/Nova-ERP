import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { customerFormSchema, updateCustomerFormSchema } from './customerSchema.js';

export const load: PageServerLoad = async ({ parent }) => {
	const { form, customers } = await parent();

	const [first] = customers ?? [];

	if (first) redirect(302, '/dashboard/customers/' + first.id);

	return {
		form
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
