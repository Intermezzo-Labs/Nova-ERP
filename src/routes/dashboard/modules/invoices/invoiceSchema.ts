import { z } from 'zod';

export const lineItemSchema = z.object({
    description: z.string().min(1, "Description is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    unitPrice: z.number().min(0, "Unit price must be non-negative"),
    amount: z.number().min(0, "Amount must be non-negative"),
});

export const invoiceFormSchema = z.object({
    customer_id: z.number().min(1, "Customer is required"),
    company_id: z.number().min(1, "Company is required"),
    status: z.enum(["Pending", "Completed", "Canceled", "Stale", "Rejected"]),
    lineItems: z.array(lineItemSchema).min(1, "At least one line item is required"),
    total: z.number().min(0, "Total must be non-negative"),
    notes: z.string().optional().nullable(),
});

export type LineItem = z.infer<typeof lineItemSchema>;
export type InvoiceForm = z.infer<typeof invoiceFormSchema>;
