import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { companyFormSchema } from './_components/add-company-dialog.svelte';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(companyFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		console.log('let us see', event);
		const form = await superValidate(event, zod(companyFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
