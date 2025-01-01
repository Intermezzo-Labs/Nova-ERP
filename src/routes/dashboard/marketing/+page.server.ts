import { error, redirect } from '@sveltejs/kit';
import { novaUserProfileSchema } from '$lib/schemas/nova-user';

export const load = async ({ locals }) => {
	const { supabase } = locals;
	const { user } = await locals.safeGetSession();

	if (!user) {
		throw error(401, 'Unauthorized');
	}

	const { data: userData, error: userError } = await supabase
		.from('nova_users')
		.select('preferences')
		.eq('user_id', user.id)
		.single();

	if (userError || !userData) {
		console.warn(userData, userError);
		redirect(302, '/dashboard/settings');
	}

	// Sanitize the logo_url if it exists
	const sanitizedProfile = novaUserProfileSchema.safeParse(userData?.preferences);
	if (sanitizedProfile.error) console.warn(sanitizedProfile.error);
	if (sanitizedProfile.success && sanitizedProfile.data.logoUrl) {
		try {
			const { data: publicUrl } = await supabase.storage
				.from('logos')
				.createSignedUrl(sanitizedProfile.data.logoUrl, 60);
			sanitizedProfile.data.logoUrl = publicUrl?.signedUrl;
		} catch (e) {
			console.error('Error getting public URL:', e);
			sanitizedProfile.data.logoUrl = ''; // fallback to empty
		}
	}

	return {
		userData: sanitizedProfile.data
	};
};
