import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { profileFormSchema } from './profile-form.svelte';
import { createNovaUser, getNovaUser, updateNovaUser } from '$lib/server/user';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const { data: { user }, error } = await locals.supabase.auth.getUser();
    if (error || !user) {
        throw error(401, 'Unauthorized');
    }

    let userData;
    try {
        userData = await getNovaUser(user.id);
        if (!userData) {
            // If no user exists in nova_users, create initial record
            userData = await createNovaUser({
                id: user.id,
                firstName: user.user_metadata?.first_name || '',
                lastName: user.user_metadata?.last_name || '',
                email: user.email || '',
                role: 'User',
                status: 'Active'
            });
        }
    } catch (e) {
        console.error('Error fetching/creating user data:', e);
        throw error(500, {
            message: 'Failed to load user data',
            cause: e instanceof Error ? e.message : 'Unknown error'
        });
    }

    const form = await superValidate(userData, zod(profileFormSchema));
    return { 
        form,
        userData 
    };
};

export const actions: Actions = {
    default: async (event) => {
        const { data: { user }, error } = await event.locals.supabase.auth.getUser();
        if (error || !user) {
            throw error(401, 'Unauthorized');
        }

        const form = await superValidate(event, zod(profileFormSchema));
        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const existingUser = await getNovaUser(user.id);
            let updatedUser;
            
            if (existingUser) {
                updatedUser = await updateNovaUser({
                    id: user.id,
                    ...form.data
                });
            } else {
                updatedUser = await createNovaUser({
                    ...form.data,
                    email: user.email || '',
                    role: 'User',
                    status: 'Active'
                });
            }

            return {
                form,
                success: true,
                userData: updatedUser
            };
        } catch (e) {
            console.error('Error saving user data:', e);
            return fail(500, {
                form,
                error: 'Failed to save user data'
            });
        }
    }
};
