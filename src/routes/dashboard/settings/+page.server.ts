import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { profileFormSchema } from './profile-form.svelte';
import { createNovaUser, getNovaUser, updateNovaUser } from '$lib/server/user';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();
    if (!session || !user) {
        throw error(401, 'Unauthorized');
    }

    let userData;
    try {
        userData = await getNovaUser(user.id);
    } catch (e) {
        console.error('Error fetching user data:', e);
    }

    const form = await superValidate(userData || undefined, zod(profileFormSchema));
    return { form };
};

export const actions: Actions = {
    default: async (event) => {
        const { session, user } = await event.locals.safeGetSession();
        if (!session || !user) {
            throw error(401, 'Unauthorized');
        }

        const form = await superValidate(event, zod(profileFormSchema));
        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const existingUser = await getNovaUser(user.id);
            
            if (existingUser) {
                // Update existing user
                await updateNovaUser({
                    id: user.id,
                    ...form.data
                });
            } else {
                // Create new user
                await createNovaUser({
                    id: user.id,
                    ...form.data
                });
            }

            return {
                form,
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
};
