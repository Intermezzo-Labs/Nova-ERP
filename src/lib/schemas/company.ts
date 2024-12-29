import validator from 'validator';
import { z } from 'zod';

export const companyDetailsSchema = z.object({
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
	phone: z.string().refine(validator.isMobilePhone).optional(),
	website: z.string().refine(validator.isURL).optional()
});
export type CompanyDetails = z.infer<typeof companyDetailsSchema>;

export const companySharedWithSchema = z.array(z.string().refine(validator.isEmail));
export type CompanySharedWith = z.infer<typeof companySharedWithSchema>;

export const companyFormSchema = z.object({
	details: companyDetailsSchema,
	shared_with: companySharedWithSchema
});
export type CompanyFormSchema = typeof companyFormSchema;
export type CompanyForm = z.infer<typeof companyFormSchema>;

const hasId = z.object({ id: z.number() });
export const updateCompanyFormSchema = companyFormSchema.merge(hasId);
export type UpdateCompanyFormSchema = typeof updateCompanyFormSchema;
export type UpdateCompanyForm = z.infer<typeof updateCompanyFormSchema>;
