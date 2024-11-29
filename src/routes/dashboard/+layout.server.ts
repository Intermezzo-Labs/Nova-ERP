import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    const { data: { user }, error } = await locals.supabase.auth.getUser();
    
    if (error || !user) {
        throw redirect(303, '/');
    }

    return {
        user
    };
};
