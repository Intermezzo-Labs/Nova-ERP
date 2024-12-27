import type { Cookies } from '@sveltejs/kit';

export const getCompanyId = (cookies: Cookies) => {
	const companyId = cookies.get('nova-company-id');
	if (!companyId) throw 'Missing company';
	return +companyId;
};
