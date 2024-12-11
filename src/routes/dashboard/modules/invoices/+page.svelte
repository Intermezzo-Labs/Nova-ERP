<script lang="ts">
    import { page } from '$app/stores';
    import { Button } from "$lib/components/ui/button";
    import * as Table from '$lib/components/ui/table';
    import * as Select from '$lib/components/ui/select';
    import { Input } from '$lib/components/ui/input';
    import { toast } from '$lib/stores/toast';
    import Toast from '$lib/components/ui/toast/Toast.svelte';
    import type { Database } from '$lib/types/database.types';
    import { onMount } from 'svelte';
    import type { SuperValidated } from 'sveltekit-superforms';
    import { superForm } from 'sveltekit-superforms/client';
    import InvoiceModal from './_components/InvoiceModal.svelte';
    import ConfirmDialog from './_components/ConfirmDialog.svelte';
    import InvoiceTemplate from './_components/InvoiceTemplate.svelte';
    import type { InvoiceForm } from './invoiceSchema';
    import type { PageData } from './$types';

    export let data: PageData;

    // Initialize the form with fallback
    const { form, enhance } = superForm<InvoiceForm>(data.form as SuperValidated<InvoiceForm>, {
        dataType: 'json'
    });

    type Invoice = Database['public']['Tables']['invoice']['Row'] & {
        customer_name?: string;
        customer_details?: any;
        company_details?: any;
    };

    let invoices: Invoice[] = [];
    let loading = true;
    let error: string | null = null;
    
    // Modal states
    let showInvoiceModal = false;
    let showConfirmDelete = false;
    let showInvoiceTemplate = false;
    let selectedInvoice: Invoice | null = null;
    
    // Form data
    let customers: Array<{ id: number; name: string }> = [];
    let companies: Array<{ id: number; name: string }> = [];
    
    // Get data from props
    $: ({ invoiceCount, error: loadError } = data);

    // Pagination
    let currentPage = 1;
    let pageSize = 10;
    let totalCount = 0;

    // Filters
    let statusFilter: Database['public']['Enums']['invoice_status'] | 'all' = 'all';
    let searchQuery = '';


    async function loadInvoices() {
        try {
            loading = true;
            const { supabase } = $page.data;
            
            let query = supabase
                .from('invoice')
                .select(`
                    *,
                    customer:customer_id(
                        details->name
                    )
                `, { count: 'exact' })
                .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            if (searchQuery) {
                query = query.textSearch('customer.details->name', searchQuery);
            }

            const { data, error: err, count } = await query;

            if (err) throw err;

            invoices = data.map(invoice => ({
                ...invoice,
                customer_name: invoice.customer?.details?.name
            }));
            totalCount = count || 0;
        } catch (err) {
            error = 'Failed to load invoices';
            toast.error('Failed to load invoices');
        } finally {
            loading = false;
        }
    }

    $: {
        // Reload when filters or pagination changes
        currentPage, pageSize, statusFilter, searchQuery;
        loadInvoices();
    }

    async function loadCustomersAndCompanies() {
        try {
            const { supabase } = $page.data;
            
            // Load customers
            const { data: customerData, error: customerError } = await supabase
                .from('customer')
                .select('id, details');
            
            if (customerError) throw customerError;
            
            if (customerData) {
                customers = customerData.map(c => ({
                    id: c.id,
                    name: c.details?.name || 'Unnamed Customer'
                }));
            }
            
            // Load companies
            const { data: companyData, error: companyError } = await supabase
                .from('company')
                .select('id, details');
            
            if (companyError) throw companyError;
            
            if (companyData) {
                companies = companyData.map(c => ({
                    id: c.id,
                    name: c.details?.name || 'Unnamed Company'
                }));
            }
        } catch (err) {
            console.error('Failed to load customers and companies:', err);
            toast.error('Failed to load customers and companies');
        }
    }

    async function handleCreateInvoice() {
        selectedInvoice = null;
        const initialData = {
            customer_id: customers[0]?.id || 0,
            company_id: companies[0]?.id || 0,
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
        
        await form.set(initialData);
        showInvoiceModal = true;
    }

    function handleEditInvoice(invoice: Invoice) {
        selectedInvoice = invoice;
        $form = {
            customer_id: invoice.customer_id,
            company_id: invoice.company_id,
            status: invoice.status,
            lineItems: [],
            total: invoice.total,
            notes: invoice.notes || ''
        };
        showInvoiceModal = true;
    }

    function handleViewInvoice(invoice: Invoice) {
        selectedInvoice = invoice;
        showInvoiceTemplate = true;
    }

    function handleDeleteInvoice(invoice: Invoice) {
        selectedInvoice = invoice;
        showConfirmDelete = true;
    }

    async function confirmDelete() {
        if (!selectedInvoice) return;
        
        try {
            const { supabase } = $page.data;
            const { error: err } = await supabase
                .from('invoice')
                .delete()
                .eq('id', selectedInvoice.id);
            
            if (err) throw err;
            
            toast.success('Invoice deleted successfully');
            loadInvoices();
        } catch (err) {
            toast.error('Failed to delete invoice');
        }
    }

    onMount(() => {
        loadInvoices();
        loadCustomersAndCompanies();
    });
</script>

<Toast />
<div class="container mx-auto p-6 space-y-6">
    {#if loadError}
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900 dark:text-red-300">
            <p>{loadError}</p>
        </div>
    {/if}
    <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Invoices</h1>
        <Button variant="default" on:click={handleCreateInvoice}>Create Invoice</Button>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 flex-wrap">
        <div class="w-full md:w-auto">
            <Select.Root
                value={statusFilter}
                onValueChange={(value) => statusFilter = value as typeof statusFilter}
            >
                <Select.Trigger class="w-full md:w-[200px]">
                    <Select.Value placeholder="Filter by status" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="all">All Statuses</Select.Item>
                    <Select.Item value="Pending">Pending</Select.Item>
                    <Select.Item value="Completed">Completed</Select.Item>
                    <Select.Item value="Canceled">Canceled</Select.Item>
                    <Select.Item value="Stale">Stale</Select.Item>
                    <Select.Item value="Rejected">Rejected</Select.Item>
                </Select.Content>
            </Select.Root>
        </div>
        <Input 
            type="search"
            placeholder="Search customers..."
            class="w-full md:w-[300px]"
            bind:value={searchQuery}
        />
    </div>

    <!-- Table -->
    <div class="rounded-md border">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Invoice ID</Table.Head>
                    <Table.Head>Customer</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Total</Table.Head>
                    <Table.Head>Created</Table.Head>
                    <Table.Head class="text-right">Actions</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#if loading}
                    <Table.Row>
                        <Table.Cell colspan="6" class="text-center">Loading...</Table.Cell>
                    </Table.Row>
                {:else if error}
                    <Table.Row>
                        <Table.Cell colspan="6" class="text-center text-red-500">{error}</Table.Cell>
                    </Table.Row>
                {:else if invoices.length === 0}
                    <Table.Row>
                        <Table.Cell colspan="6" class="text-center">No invoices found</Table.Cell>
                    </Table.Row>
                {:else}
                    {#each invoices as invoice}
                        <Table.Row>
                            <Table.Cell>#{invoice.id}</Table.Cell>
                            <Table.Cell>
                                <a 
                                    href="/dashboard/modules/crm/customers/{invoice.customer_id}"
                                    class="text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    {invoice.customer_name}
                                </a>
                            </Table.Cell>
                            <Table.Cell>
                                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                                    {invoice.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    invoice.status === 'Canceled' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'}">
                                    {invoice.status}
                                </span>
                            </Table.Cell>
                            <Table.Cell>${invoice.total.toFixed(2)}</Table.Cell>
                            <Table.Cell>{new Date(invoice.created_at).toLocaleDateString()}</Table.Cell>
                            <Table.Cell class="text-right">
                                <div class="flex justify-end gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        on:click={() => handleViewInvoice(invoice)}
                                    >
                                        View
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        on:click={() => handleEditInvoice(invoice)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        size="sm"
                                        on:click={() => handleDeleteInvoice(invoice)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                {/if}
            </Table.Body>
        </Table.Root>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between">
        <p class="text-sm text-gray-600 dark:text-gray-400">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} results
        </p>
        <div class="flex gap-2">
            <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === 1}
                on:click={() => currentPage--}
            >
                Previous
            </Button>
            <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage * pageSize >= totalCount}
                on:click={() => currentPage++}
            >
                Next
            </Button>
        </div>
    </div>
</div>

<!-- Modals -->
{#if showInvoiceModal}
    <InvoiceModal
        bind:open={showInvoiceModal}
        {customers}
        {companies}
        {form}
        on:submit={async (event) => {
            try {
                const result = await enhance(event);
                if (!result?.error) {
                    showInvoiceModal = false;
                    loadInvoices();
                    toast.success('Invoice created successfully');
                } else {
                    toast.error(result.error);
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to create invoice');
            }
        }}
    />
{/if}

{#if showConfirmDelete}
    <ConfirmDialog
        bind:open={showConfirmDelete}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        on:confirm={confirmDelete}
    />
{/if}

{#if showInvoiceTemplate && selectedInvoice}
    <InvoiceTemplate
        invoice={selectedInvoice}
        company={selectedInvoice.company_details}
        customer={selectedInvoice.customer_details}
    />
{/if}
