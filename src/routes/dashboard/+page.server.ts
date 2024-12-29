import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	const layoutCookie = event.cookies.get('PaneForge:layout');
	const collapsedCookie = event.cookies.get('PaneForge:collapsed');

	let layout: number[] | undefined;
	let collapsed: boolean | undefined;

	if (layoutCookie) layout = JSON.parse(layoutCookie);

	if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);

	return { layout, collapsed };
};

export const actions: Actions = {
	collapse: async ({ cookies, request }) => {
		const formData = await request.formData();
		const collapse = formData.get('collapse');
		cookies.set('PaneForge:collapsed', String(collapse), { path: '/' });

		return {
			collapse
		};
	}
};
