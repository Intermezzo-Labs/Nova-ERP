import { z } from 'zod';

export const lineItemFormSchema = z.object({
	name: z.string(),
	sku: z.string(),
	quantity: z.number()
});
export type InventoryItemFormSchema = typeof lineItemFormSchema;

const hasId = z.object({ id: z.number() });
export const updateInventoryItemFormSchema = lineItemFormSchema.merge(hasId);
export type UpdateInventoryItemDetails = z.infer<typeof updateInventoryItemFormSchema>;
