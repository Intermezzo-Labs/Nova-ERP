import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { companyFormSchema, updateCompanyFormSchema } from './companySchema.js';

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { user } = await safeGetSession();

	if (!user) throw 'Missing user data';

	const { data: companies, error } = await supabase
		.from('company')
		.select('*')
		.eq('user_id', user.id)
		.limit(20);

	return {
		form: await superValidate(zod(companyFormSchema)),
		companies:
			companies?.map((company) => ({
				id: company.id,
				created: new Date(company.created_at).toLocaleString(),
				updated: new Date(company.updated_at).toLocaleString(),
				details: companyFormSchema.parse(company.details)
			})) ?? [],
		error
	};
};

export const actions: Actions = {
	create: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { user } = await safeGetSession();

		if (!user) throw 'Missing user data';

		const data = await request.formData();
		const form = await superValidate(data, zod(companyFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error } = await supabase.from('company').insert({
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
		const form = await superValidate(data, zod(updateCompanyFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { id, ...details } = form.data;
		console.log('ok');

		const { error } = await supabase
			.from('company')
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
