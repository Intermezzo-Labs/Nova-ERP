import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createNovaUser, getNovaUser } from '$lib/server/user';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
	const { data: { user }, error } = await supabase.auth.getUser();

	// if the user is already logged in return them to the account page
	if (user && !error) {
		throw redirect(303, '/dashboard');
	}

	return { url: url.origin };
};

export const actions: Actions = {
	default: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event;
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const validEmail = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email);

		if (!validEmail) {
			return fail(400, { errors: { email: 'Please enter a valid email address' }, email });
		}

		const { error } = await supabase.auth.signInWithOtp({ 
			email,
			options: {
				emailRedirectTo: `${event.url.origin}/auth/callback`
			}
		});

		if (error) {
			return fail(400, {
				success: false,
				email,
				message: `There was an issue, Please contact support.`
			});
		}

		return {
			success: true,
			message: 'Please check your email for a magic link to log into the website.'
		};
	}
};
