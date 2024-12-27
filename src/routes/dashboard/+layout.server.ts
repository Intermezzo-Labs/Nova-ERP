import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { companyFormSchema } from '$lib/schemas/company';

export const load: LayoutServerLoad = async ({
	locals: { safeGetSession, supabase },
	cookies,
	url
}) => {
	const { user } = await safeGetSession();
	if (!user) throw user;

	const response = await supabase.from('company').select('id, details').is('archived_at', null);

	if (response.count === 0) {
		const pathname = '/dashboard/companies';
		if (pathname === url.pathname) return;

		const redirectTo = new URL(pathname, url);
		redirect(302, redirectTo);
	}

	const companies =
		response.data?.map((company) => ({
			...company,
			details: companyFormSchema.parse(company.details)
		})) ?? [];

	const companyIdCookie = cookies.get('nova-company-id');
	if (!companyIdCookie) {
		const [firstCompany] = companies;
		cookies.set('nova-company-id', String(firstCompany.id), { path: '/' });
	}

	return {
		companies,
		currentCompanyId: Number(companyIdCookie)
	};
};
