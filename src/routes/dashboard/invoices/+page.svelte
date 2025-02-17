<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { toast } from '$lib/stores/toast';
	import type { Database } from '$lib/types/database.types';
	import InvoiceModal from './_components/InvoiceModal.svelte';
	import ConfirmDialog from './_components/ConfirmDialog.svelte';
	import InvoiceTemplate from './_components/InvoiceTemplate.svelte';
	import type { PageData } from './$types';
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';

	let { data }: { data: PageData } = $props();

	type Invoice = Database['public']['Tables']['invoice']['Row'] & {
		customer_name?: string;
		customer_details?: any;
		company_details?: any;
	};

	// Modal states
	let showConfirmDelete = $state(false);
	let showInvoiceTemplate = $state(false);
	let selectedInvoice = $state<Invoice | null>(null);

	// Pagination
	let currentPage = $state(1);
	let pageSize = $state(10);
	let totalCount = $state(0);

	// Filters
	let statusFilter: Database['public']['Enums']['invoice_status'] | 'all' = $state('all');
	let searchQuery = $state('');

	async function loadInvoices() {
		// try {
		//     loading = true;
		//     const { supabase } = $page.data;
		//     let query = supabase
		//         .from('invoice')
		//         .select(`
		//             *,
		//             customer:customer_id(
		//                 details->name
		//             )
		//         `, { count: 'exact' })
		//         .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);
		//     if (statusFilter !== 'all') {
		//         query = query.eq('status', statusFilter);
		//     }
		//     if (searchQuery) {
		//         query = query.textSearch('customer.details->name', searchQuery);
		//     }
		//     const { data, error: err, count } = await query;
		//     if (err) throw err;
		//     invoices = data.map(invoice => ({
		//         ...invoice,
		//         customer_name: invoice.customer?.details?.name
		//     }));
		//     totalCount = count || 0;
		// } catch (err) {
		//     error = 'Failed to load invoices';
		//     toast.error('Failed to load invoices');
		// } finally {
		//     loading = false;
		// }
	}

	// Reload when filters or pagination changes
	$effect(() => {
		if (currentPage || pageSize || statusFilter || searchQuery) loadInvoices();
	});

	async function loadCustomersAndCompanies() {
		// try {
		//     const { supabase } = $page.data;
		//     // Load customers
		//     const { data: customerData, error: customerError } = await supabase
		//         .from('customer')
		//         .select('id, details');
		//     if (customerError) throw customerError;
		//     if (customerData) {
		//         customers = customerData.map(c => ({
		//             id: c.id,
		//             name: c.details?.name || 'Unnamed Customer'
		//         }));
		//     }
		//     // Load companies
		//     const { data: companyData, error: companyError } = await supabase
		//         .from('company')
		//         .select('id, details');
		//     if (companyError) throw companyError;
		//     if (companyData) {
		//         companies = companyData.map(c => ({
		//             id: c.id,
		//             name: c.details?.name || 'Unnamed Company'
		//         }));
		//     }
		// } catch (err) {
		//     console.error('Failed to load customers and companies:', err);
		//     toast.error('Failed to load customers and companies');
		// }
	}

	async function handleCreateInvoice() {
		// selectedInvoice = null;
		// const initialData = {
		//     customer_id: customers[0]?.id || 0,
		//     company_id: companies[0]?.id || 0,
		//     status: 'Pending' as const,
		//     lineItems: [{
		//         description: '',
		//         quantity: 1,
		//         unitPrice: 0,
		//         amount: 0
		//     }],
		//     total: 0,
		//     notes: ''
		// };
		// await form.set(initialData);
		// showInvoiceModal = true;
	}

	function handleEditInvoice(invoice: Invoice) {
		// selectedInvoice = invoice;
		// $form = {
		//     customer_id: invoice.customer_id,
		//     company_id: invoice.company_id,
		//     status: invoice.status,
		//     lineItems: [],
		//     total: invoice.total,
		//     notes: invoice.notes || ''
		// };
		// showInvoiceModal = true;
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
			const { error: err } = await supabase.from('invoice').delete().eq('id', selectedInvoice.id);

			if (err) throw err;

			toast.success('Invoice deleted successfully');
			loadInvoices();
		} catch (err) {
			toast.error('Failed to delete invoice');
		}
	}
</script>

{#snippet actions()}
	<InvoiceModal data={data.form} customers={data.customers} companies={data.companies} />
{/snippet}

<MainContainerLayout title="Invoices" {actions}>
	<div class="w-full flex-1 space-y-4 p-4">
		{#if $page.error}
			<div
				class="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900 dark:text-red-300"
			>
				<p>{$page.error.message}</p>
			</div>
		{/if}

		<!-- Filters -->
		<div class="flex flex-wrap gap-4">
			<div class="w-full md:w-auto">
				<Select.Root bind:value={statusFilter} type="single">
					<Select.Trigger class="w-full md:w-[200px]">
						{statusFilter ?? 'Filter by status'}
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
						<Table.Head class="text-nowrap">Invoice ID</Table.Head>
						<Table.Head>Customer</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Total</Table.Head>
						<Table.Head>Created</Table.Head>
						<Table.Head class="text-right">Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#if data.invoicesCount === 0}
						<Table.Row>
							<Table.Cell colspan={6} class="text-center">No invoices found</Table.Cell>
						</Table.Row>
					{:else if data.invoices?.length}
						{#each data.invoices as invoice}
							<Table.Row>
								<Table.Cell>#{invoice.id}</Table.Cell>
								<Table.Cell>
									<a
										href="/dashboard/customers/{invoice.customer_id}"
										class="text-blue-600 hover:underline dark:text-blue-400"
									>
										{invoice.customer?.name ?? 'N/A'}
									</a>
								</Table.Cell>
								<Table.Cell>
									<span
										class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                                    {invoice.status === 'Completed'
											? 'bg-green-100 text-green-800'
											: invoice.status === 'Pending'
												? 'bg-yellow-100 text-yellow-800'
												: invoice.status === 'Canceled'
													? 'bg-red-100 text-red-800'
													: 'bg-gray-100 text-gray-800'}"
									>
										{invoice.status}
									</span>
								</Table.Cell>
								<Table.Cell>${invoice.total.toFixed(2)}</Table.Cell>
								<Table.Cell>{new Date(invoice.created_at).toLocaleDateString()}</Table.Cell>
								<Table.Cell class="text-right">
									<div class="flex justify-end gap-2">
										<Button variant="outline" size="sm" onclick={() => handleViewInvoice(invoice)}>
											View
										</Button>
										<Button variant="outline" size="sm" onclick={() => handleEditInvoice(invoice)}>
											Edit
										</Button>
										<Button
											variant="destructive"
											size="sm"
											onclick={() => handleDeleteInvoice(invoice)}
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
				Showing {(currentPage - 1) * pageSize + 1} to {Math.min(
					currentPage * pageSize,
					data.invoicesCount ?? 0
				)} of
				{data.invoicesCount} results
			</p>
			<div class="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					disabled={currentPage === 1}
					onclick={() => currentPage--}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					disabled={currentPage * pageSize >= totalCount}
					onclick={() => currentPage++}
				>
					Next
				</Button>
			</div>
		</div>
	</div>
</MainContainerLayout>

<!-- Modals -->
<!-- {#if showInvoiceModal}
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
{/if} -->

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
		open={showInvoiceTemplate}
		handleClose={() => {
			selectedInvoice = null;
			showInvoiceTemplate = false;
		}}
		invoice={selectedInvoice}
		company={selectedInvoice.company_details}
		customer={selectedInvoice.customer_details}
	/>
{/if}
