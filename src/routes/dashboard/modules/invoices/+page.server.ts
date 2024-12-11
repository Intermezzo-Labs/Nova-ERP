import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { invoiceFormSchema } from './invoiceSchema';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { InvoiceForm } from './invoiceSchema';

const defaultFormData: InvoiceForm = {
    customer_id: 1,
    company_id: 1,
    status: 'Pending' as const,
    lineItems: [{ 
        description: '', 
        quantity: 1, 
        unitPrice: 0, 
        amount: 0 
    }],
    total: 0,
    notes: ''
};

export const load = async ({ locals }) => {
    try {
        const { supabase } = locals;
        
        if (!supabase) {
            throw new Error('Supabase client not available');
        }

        const defaultData = {
            customer_id: 1,
            company_id: 1,
            status: 'Pending' as const,
            lineItems: [{ 
                description: '', 
                quantity: 1, 
                unitPrice: 0, 
                amount: 0 
            }],
            total: 0,
            notes: ''
        };

        // Initialize the form with default data
        const form = await superValidate(defaultData, zod(invoiceFormSchema));

        // Get invoice count with error handling
        const { count, error: countError } = await supabase
            .from('invoice')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('Error fetching invoice count:', countError);
            return {
                form,
                invoiceCount: 0,
                error: 'Failed to fetch invoice count'
            };
        }

        return {
            form,
            invoiceCount: count ?? 0
        };
    } catch (err) {
        // Log the actual error for debugging
        console.error('Server load error:', err);
        // Return a default form even in case of error
        const form = await superValidate(defaultData, zod(invoiceFormSchema));
        return {
            form,
            invoiceCount: 0,
            error: err instanceof Error ? err.message : 'Failed to load invoice data'
        };
    }
};

export const actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, zod(invoiceFormSchema), {
            id: 'invoice-form'
        });
        
        if (!form.valid) {
            return fail(400, { form });
        }
        
        try {
            const { supabase } = locals;
            
            const { error: err } = await supabase
                .from('invoice')
                .insert({
                    customer_id: form.data.customer_id,
                    company_id: form.data.company_id,
                    status: form.data.status,
                    total: form.data.total,
                    notes: form.data.notes,
                    document_location: '' // This needs to be handled properly
                });
            
            if (err) throw err;
            
            return { form };
        } catch (err) {
            console.error('Form submission error:', err);
            return fail(500, {
                form,
                error: 'Failed to create invoice'
            });
        }
    }
};
