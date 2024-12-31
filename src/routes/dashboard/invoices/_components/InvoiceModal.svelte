<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { superForm } from 'sveltekit-superforms/client';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { invoiceFormSchema } from '../../../../lib/schemas/invoice';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Plus, Trash } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { browser } from '$app/environment';
	import SuperDebug from 'sveltekit-superforms';
	import type { PageData } from '../$types';

	type Props = {
		data: SuperValidated<Infer<typeof invoiceFormSchema>>;
		customers: PageData['customers'];
		companies: PageData['companies'];
	};
	let { data, customers, companies }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(invoiceFormSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	function addLineItem() {
		$formData.lineItems = [
			...$formData.lineItems,
			{
				description: '',
				quantity: 1,
				unitPrice: 0,
				amount: 0
			}
		];
		calculateTotal();
	}

	function removeLineItem(index: number) {
		$formData.lineItems = $formData.lineItems.filter((_, i) => i !== index);
		calculateTotal();
	}

	function calculateLineItemAmount(index: number) {
		const item = $formData.lineItems[index];
		item.amount = item.quantity * item.unitPrice;
		calculateTotal();
	}

	function calculateTotal() {
		$formData.total = $formData.lineItems.reduce((sum, item) => sum + item.amount, 0);
	}
	let open = $state(false);

	let selectedCustomer = $derived(
		customers?.find((c) => c.id === $formData.customer_id)?.details.name ?? 'Select customer'
	);
	let selectedCompany = $derived(
		customers?.find((c) => c.id === $formData.company_id)?.details.name ?? 'Select company'
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button {...props}><Plus class="mr-2 size-4" /> Create Invoice</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[600px]">
		<form
			method="POST"
			use:enhance={{
				onResult: (ev) => {
					open = false;
				}
			}}
			action="?/create"
		>
			<Dialog.Header>
				<Dialog.Title>Create Invoice</Dialog.Title>
				<Dialog.Description>
					Create an invocie here and click save when you're done.
				</Dialog.Description>
			</Dialog.Header>

			<div class="grid gap-2 py-6">
				<Form.Field {form} name="customer_id">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Customer</Form.Label>
							<Select.Root
								{...props}
								value={String($formData.customer_id)}
								type="single"
								onValueChange={(v) => ($formData.customer_id = +v)}
								controlledValue
							>
								<Select.Trigger>
									{selectedCustomer}
								</Select.Trigger>
								<Select.Content>
									{#each customers ?? [] as customer}
										<Select.Item value={String(customer.id)}>
											{customer.details.name}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.Description>Select the customer you want to send this invoice to.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="company_id">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Company</Form.Label>
							<Select.Root
								{...props}
								value={String($formData.company_id)}
								type="single"
								onValueChange={(v) => ($formData.company_id = +v)}
								controlledValue
							>
								<Select.Trigger>
									{selectedCompany}
								</Select.Trigger>
								<Select.Content>
									{#each companies ?? [] as company}
										<Select.Item value={String(company.id)}>
											{company.details.name}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<Form.Description
								>Select the company you want to use in this invoice.</Form.Description
							>
							<Form.FieldErrors />
						{/snippet}
					</Form.Control>
				</Form.Field>
			</div>
			<div class="space-y-2">
				<h3 class="text-lg font-semibold">Line Items</h3>
				{#each $formData.lineItems as item, index}
					<div class="grid grid-cols-12 items-center gap-2">
						<div class="col-span-5">
							<Input type="text" placeholder="Description" bind:value={item.description} />
						</div>
						<div class="col-span-2">
							<Input
								type="number"
								min="1"
								placeholder="Qty"
								bind:value={item.quantity}
								oninput={() => calculateLineItemAmount(index)}
							/>
						</div>
						<div class="col-span-2">
							<Input
								type="number"
								min="0"
								step="0.01"
								placeholder="Price"
								bind:value={item.unitPrice}
								oninput={() => calculateLineItemAmount(index)}
							/>
						</div>
						<div class="col-span-2">
							<Input type="number" readonly value={item.amount} />
						</div>
						<div class="col-span-1">
							<Button
								type="button"
								variant="destructive"
								size="icon"
								onclick={() => removeLineItem(index)}
							>
								<Trash class="size-4" />
							</Button>
						</div>
					</div>
				{/each}

				<Button type="button" variant="outline" onclick={addLineItem}>Add Line Item</Button>
			</div>

			<div class="flex justify-end">
				<div class="text-lg font-semibold">
					Total: ${$formData.total.toFixed(2)}
				</div>
			</div>

			{#if browser}
				<SuperDebug data={$formData} />
			{/if}

			<Dialog.Footer class="gap-2">
				<Form.Button type="button" variant="outline" onclick={() => (open = false)}>
					Cancel
				</Form.Button>
				<Form.Button type="submit">Create</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
