<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import * as Dialog from '$lib/components/ui/dialog';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import * as Select from '$lib/components/ui/select';
    import { superForm } from 'sveltekit-superforms/client';
    import type { SuperValidated } from 'sveltekit-superforms';
    import type { InvoiceForm, LineItem } from '../invoiceSchema';
    
    export let open = false;
    export let form: SuperValidated<InvoiceForm>;
    export let customers: Array<{ id: number; name: string }> = [];
    export let companies: Array<{ id: number; name: string }> = [];
    
    let selectedCustomerId: number;
    let selectedCompanyId: number;
    
    $: selectedCustomerId = $formData?.customer_id ?? customers[0]?.id ?? 0;
    $: selectedCompanyId = $formData?.company_id ?? companies[0]?.id ?? 0;
    
    $: if (selectedCustomerId) {
        $formData.customer_id = selectedCustomerId;
    }
    
    $: if (selectedCompanyId) {
        $formData.company_id = selectedCompanyId;
    }
    
    const dispatch = createEventDispatcher();
    const { enhance, errors, form: formData } = superForm<InvoiceForm>(form, {
        dataType: 'json',
        resetForm: false,
        taintedMessage: null,
        onUpdated: ({ form }) => {
            if (form.valid) {
                open = false;
            }
        }
    });

    let lineItems: LineItem[] = [{
        description: '',
        quantity: 1,
        unitPrice: 0,
        amount: 0
    }];

    $: if ($formData) {
        lineItems = $formData.lineItems || [{
            description: '',
            quantity: 1,
            unitPrice: 0,
            amount: 0
        }];
    }

    function addLineItem() {
        lineItems = [...lineItems, { 
            description: '', 
            quantity: 1, 
            unitPrice: 0, 
            amount: 0 
        }];
        $formData.lineItems = lineItems;
        calculateTotal();
    }

    function removeLineItem(index: number) {
        lineItems = lineItems.filter((_, i) => i !== index);
        $formData.lineItems = lineItems;
        calculateTotal();
    }

    function calculateLineItemAmount(index: number) {
        const item = lineItems[index];
        item.amount = item.quantity * item.unitPrice;
        $formData.lineItems = lineItems;
        calculateTotal();
    }

    function calculateTotal() {
        $formData.total = lineItems.reduce((sum, item) => sum + item.amount, 0);
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Content class="sm:max-w-[600px]">
        <Dialog.Header>
            <Dialog.Title>{$formData?.id ? 'Edit Invoice' : 'Create Invoice'}</Dialog.Title>
        </Dialog.Header>
        
        <form method="POST" use:enhance>
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <Select.Root
                            bind:value={selectedCustomerId}
                            error={$errors?.customer_id?.[0]}
                        >
                            <Select.Trigger>
                                <Select.Value placeholder="Select Customer" />
                            </Select.Trigger>
                            <Select.Content>
                                {#each customers as customer}
                                    <Select.Item value={customer.id}>
                                        {customer.name}
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>
                    
                    <div>
                        <Select.Root
                            bind:value={selectedCompanyId}
                            error={$errors?.company_id?.[0]}
                        >
                            <Select.Trigger>
                                <Select.Value placeholder="Select Company" />
                            </Select.Trigger>
                            <Select.Content>
                                {#each companies as company}
                                    <Select.Item value={company.id}>
                                        {company.name}
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>
                </div>
                
                <div class="space-y-2">
                    <h3 class="text-lg font-semibold">Line Items</h3>
                    {#each lineItems as item, index}
                        <div class="grid grid-cols-12 gap-2 items-center">
                            <div class="col-span-5">
                                <Input
                                    type="text"
                                    placeholder="Description"
                                    bind:value={$formData.lineItems[index].description}
                                />
                            </div>
                            <div class="col-span-2">
                                <Input
                                    type="number"
                                    min="1"
                                    placeholder="Qty"
                                    bind:value={$formData.lineItems[index].quantity}
                                    on:input={() => calculateLineItemAmount(index)}
                                />
                            </div>
                            <div class="col-span-2">
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="Price"
                                    bind:value={$formData.lineItems[index].unitPrice}
                                    on:input={() => calculateLineItemAmount(index)}
                                />
                            </div>
                            <div class="col-span-2">
                                <Input
                                    type="number"
                                    readonly
                                    value={$formData.lineItems[index].amount}
                                />
                            </div>
                            <div class="col-span-1">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    on:click={() => removeLineItem(index)}
                                >
                                    ×
                                </Button>
                            </div>
                        </div>
                    {/each}
                    
                    <Button
                        type="button"
                        variant="outline"
                        on:click={addLineItem}
                    >
                        Add Line Item
                    </Button>
                </div>
                
                <div class="flex justify-end">
                    <div class="text-lg font-semibold">
                        Total: ${$formData.total.toFixed(2)}
                    </div>
                </div>
            </div>
            
            <Dialog.Footer>
                <Button type="button" variant="outline" on:click={() => open = false}>
                    Cancel
                </Button>
                <Button type="submit">
                    {form.data.customer_id ? 'Update' : 'Create'}
                </Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>
