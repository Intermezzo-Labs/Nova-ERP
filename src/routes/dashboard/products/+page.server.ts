import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { productFormSchema } from '$lib/schemas/product';
import { getCompanyId } from '$lib/utils/company-id.js';

export const load = async ({ locals }) => {
	// Get invoice count with error handling
	const { supabase, safeGetSession } = locals;
	const { user } = await safeGetSession();

	if (!user) throw 'Missing user data';

	// Initialize the form with default data
	const form = await superValidate(zod(productFormSchema));

	const { data: products } = await supabase.from('product').select('*').limit(100);

	return {
		form,
		products
	};
};

export const actions = {
	create: async ({ locals: { supabase, safeGetSession }, request, cookies }) => {
		const companyId = getCompanyId(cookies);
		const { user } = await safeGetSession();

		if (!user) throw 'Missing user data';

		const data = await request.formData();
		const form = await superValidate(data, zod(productFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error } = await supabase.from('product').insert({
			user_id: user.id,
			company_id: companyId,
			details: {
				name: form.data.name,
				description: form.data.description,
				price: form.data.price
			}
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
