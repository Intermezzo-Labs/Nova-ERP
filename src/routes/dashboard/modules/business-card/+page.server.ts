import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { supabase } = locals;
    const { session, user } = await locals.safeGetSession();

    if (!session) {
        throw error(401, 'Unauthorized');
    }

    try {
        const { data: userData, error: userError } = await supabase
            .from('nova_users')
            .select('*')
            .eq('id', user?.id)
            .single();

        if (userError) {
            console.error('Database error:', userError);
            throw error(500, 'Error fetching user data');
        }

        if (!userData) {
            throw error(404, 'User data not found');
        }

        return {
            userData
        };
    } catch (err) {
        console.error('Server error:', err);
        throw error(500, 'Internal server error');
    }
};
