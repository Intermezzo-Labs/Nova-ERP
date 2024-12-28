import validator from 'validator';
import { z } from 'zod';

export const productFormSchema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.string().refine((v) => validator.isCurrency(v, { allow_decimal: true }))
});
export type ProductDetails = z.infer<typeof productFormSchema>;
export type ProductFormSchema = typeof productFormSchema;

const hasId = z.object({ id: z.number() });
export const updateProductFormSchema = productFormSchema.merge(hasId);
export type UpdateProductDetails = z.infer<typeof updateProductFormSchema>;
