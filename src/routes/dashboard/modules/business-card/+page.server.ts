import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { novaUserProfileSchema } from '$lib/types/user';

export const load: PageServerLoad = async ({ locals }) => {
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

	if (userError) {
		console.error('Database error:', userError);
		// throw error(404, 'Error fetching user data');
	}

	if (!userData) {
		console.warn('User data not found:', userData);
		// throw error(404, 'User data not found');
	}

	// Sanitize the logo_url if it exists
	const sanitizedProfile = novaUserProfileSchema.safeParse(userData?.preferences);
	if (sanitizedProfile.error) console.warn('woops', sanitizedProfile.error);
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
