import { z } from 'zod';

export const companyFormSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	address: z.object({
		street1: z.string(),
		street2: z.string().optional(),
		city: z.string(),
		state: z.string().optional(),
		province: z.string().optional(),
		country: z.string()
	}),
	phone: z.string().optional(),
	website: z.string().optional()
});
export type CompanyFormSchema = typeof companyFormSchema;
export type CompanyDetails = z.infer<typeof companyFormSchema>;

const hasId = z.object({ id: z.number() });
export const updateCompanyFormSchema = companyFormSchema.merge(hasId);
export type UpdateCompanyDetails = z.infer<typeof updateCompanyFormSchema>;
