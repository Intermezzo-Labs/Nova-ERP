import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { preferencesFormSchema } from './preferences-form.svelte';
import { join } from 'path';
import type { NovaUserPreferences } from '$lib/types/user';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from 'lucide-svelte';

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		redirect(303, '/');
	}

	const { data } = await getNovaUserPreferences(supabase, user.id);
	const form = await superValidate(data?.preferences, zod(preferencesFormSchema));

	return {
		form,
		logoUrl: data?.preferences.logoUrl
	};
};

export const actions = {
	default: async ({ locals: { safeGetSession, supabase }, request }) => {
		const { session, user } = await safeGetSession();
		if (!session || !user) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const form = await superValidate(formData, zod(preferencesFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { data: existingData } = await getNovaUserPreferences(supabase, user.id);

			let logoUrl: string | undefined = undefined;
			const { data } = form;
			if (data.logoFile && data.logoFile instanceof File) {
				const path = join(user.id, crypto.randomUUID());
				const { error: storageError, data: logoData } = await supabase.storage
					.from('logos')
					.upload(path, data.logoFile);

				if (storageError) throw storageError;

				logoUrl = logoData.path;
			}

			const preferences = mergePreferences(data, existingData?.preferences);
			if (logoUrl) preferences.logoUrl = logoUrl;

			const { error } = await supabase.from('nova_users').upsert(
				{
					email: user.email!,
					user_id: user.id,
					preferences
				},
				{ onConflict: 'user_id' }
			);

			if (error) throw error;
			delete form.data.logoFile;

			return {
				form,
				logoUrl,
				success: true
			};
		} catch (e) {
			console.error('Error saving user data:', e);

			return fail(500, {
				form,
				error: 'Failed to save user data'
			});
		}
	}
} satisfies Actions;

const getNovaUserPreferences = (supabase: SupabaseClient<Database>, userId: string) =>
	supabase
		.from('nova_users')
		.select('preferences')
		.eq('user_id', userId)
		.returns<Array<{ preferences: NovaUserPreferences }>>()
		.single();

const mergePreferences = (
	target: typeof preferencesFormSchema._output,
	source?: Partial<NovaUserPreferences>
) =>
	({
		firstName: source?.firstName || target.firstName || '',
		lastName: source?.lastName || target.lastName || '',
		email: source?.email || target.email || '',
		role: source?.role || target.role || 'User',
		status: source?.status || target.status || 'Active',
		address: source?.address || target.address,
		company: source?.company || target.company,
		phone: source?.phone || target.phone,
		logoUrl: source?.logoUrl
	}) satisfies NovaUserPreferences;
