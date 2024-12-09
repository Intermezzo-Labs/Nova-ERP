import { z } from 'zod';
import { isEmail, isMobilePhone } from 'validator';

export const customerFormSchema = z.object({
	name: z.string(),
	phone: z.string().refine(isMobilePhone).optional(),
	email: z.string().refine(isEmail).optional()
});
export type CustomerFormSchema = typeof customerFormSchema;
export type CustomerDetails = z.infer<typeof customerFormSchema>;

const hasId = z.object({ id: z.number() });
export const updateCustomerFormSchema = customerFormSchema.merge(hasId);
export type UpdateCustomerDetails = z.infer<typeof updateCustomerFormSchema>;
