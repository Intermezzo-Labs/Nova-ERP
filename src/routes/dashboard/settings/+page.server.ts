import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail, redirect, error, json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { profileFormSchema } from './profile-form.svelte';

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		redirect(303, '/');
	}

	const { data } = await supabase.from('nova_users').select('*').eq('user_id', user.id).single();
	const form = await superValidate({ ...(data?.preferences as object) }, zod(profileFormSchema));

	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ locals: { safeGetSession, supabase }, request }) => {
		const { session, user } = await safeGetSession();
		if (!session || !user) {
			throw error(401, 'Unauthorized');
		}

		const preferences = await request.formData();
		const form = await superValidate(preferences, zod(profileFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { error } = await supabase
				.from('nova_users')
				.upsert({
					email: user.email!,
					user_id: user.id,
					preferences: form.data
				})
				.eq('user_id', user.id)
				.select('*')
				.single();

			if (error) throw error;

			return json({
				form,
				success: true
			});
		} catch (e) {
			console.error('Error saving user data:', e);

			return fail(500, {
				form,
				error: 'Failed to save user data'
			});
		}
	}
};
