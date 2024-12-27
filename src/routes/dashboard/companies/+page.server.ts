import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { companyFormSchema, updateCompanyFormSchema } from '../../../lib/schemas/company';
import { formatDateShort, timeAgo } from '$lib/utils/dates';

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { user } = await safeGetSession();

	if (!user) throw 'Missing user data';

	const { data: companies, error } = await supabase
		.from('company')
		.select('*')
		.eq('user_id', user.id)
		.order('archived_at', { nullsFirst: true })
		.limit(20);

	return {
		form: await superValidate(zod(companyFormSchema)),
		companies:
			companies?.map((company) => ({
				...company,
				created_at: formatDateShort(company.created_at),
				updated_at: timeAgo(company.updated_at),
				archived_at: company.archived_at ? formatDateShort(company.archived_at) : null,
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

		const { error } = await supabase
			.from('company')
			.update({
				details
			})
			.eq('id', id)
			.is('archived_at', null);

		if (error) {
			fail(400, {
				form,
				error
			});
		}

		return {
			form,
			success: true
		};
	},
	archive: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { user } = await safeGetSession();

		if (!user) throw 'Missing user data';

		const data = await request.formData();
		const form = await superValidate(data, zod(updateCompanyFormSchema));

		const { id } = form.data;

		const response = await supabase
			.from('company')
			.update({ archived_at: new Date().toISOString() })
			.eq('id', id);

		if (response.error) {
			fail(400, {
				form,
				error: response.error
			});
		}

		return {
			form,
			success: true
		};
	},
	unarchive: async ({ locals: { supabase, safeGetSession }, request }) => {
		const { user } = await safeGetSession();

		if (!user) throw 'Missing user data';

		const data = await request.formData();
		const form = await superValidate(data, zod(updateCompanyFormSchema));

		const { id } = form.data;

		const response = await supabase.from('company').update({ archived_at: null }).eq('id', id);

		if (response.error) {
			fail(400, {
				form,
				error: response.error
			});
		}

		return {
			form,
			success: true
		};
	},
	select: async ({ request, cookies }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		if (id) {
			cookies.set('nova-company-id', String(id), { path: '/' });
		}
		return {
			status: 200
		};
	}
};
