import type { Actions, PageServerLoad } from './$types.js';
import { customerFormSchema, customerNoteFormSchema } from '../customerSchema.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({
	parent,
	params,
	locals: { supabase, safeGetSession }
}) => {
	const { form, customers } = await parent();
	const { user } = await safeGetSession();

	let selectedCustomer = customers?.find((c) => c.id === +params.id);
	if (!selectedCustomer) {
		const { data, error } = await supabase
			.from('customer')
			.select('*, customer_note(*)')
			.eq('id', params.id)
			.eq('user_id', user!.id)
			.single();

		if (error) throw error;

		selectedCustomer = {
			...data,
			details: customerFormSchema.parse(data.details)
		};
		customers?.push(selectedCustomer);
	}

	if (!selectedCustomer) redirect(302, '/dashboard/customers');

	return {
		form,
		customers,
		selectedCustomer,
		customerNoteForm: await superValidate(zod(customerNoteFormSchema))
	};
};

export const actions: Actions = {
	'create-note': async ({ locals: { supabase, safeGetSession }, request, params }) => {
		const { user } = await safeGetSession();

		if (!user) throw 'Missing user data';
		const data = await request.formData();
		const form = await superValidate(data, zod(customerNoteFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { note } = form.data;

		const { error } = await supabase.from('customer_note').insert({
			note,
			user_id: user.id,
			customer_id: +params.id
		});

		if (error) throw error;

		return {
			form
		};
	}
	// update: async ({ locals: { supabase, safeGetSession }, request }) => {
	// 	const { user } = await safeGetSession();

	// 	if (!user) throw 'Missing user data';

	// 	const data = await request.formData();
	// 	const form = await superValidate(data, zod(updateCustomerFormSchema));

	// 	if (!form.valid) {
	// 		return fail(400, {
	// 			form
	// 		});
	// 	}

	// 	const { id, ...details } = form.data;

	// 	const { error } = await supabase
	// 		.from('customer')
	// 		.update({
	// 			details
	// 		})
	// 		.eq('id', id);

	// 	if (error) throw error;

	// 	return {
	// 		form,
	// 		success: true
	// 	};
	// }
};
