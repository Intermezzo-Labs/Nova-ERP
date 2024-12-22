<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { toPng } from 'html-to-image';
	import type { Database } from '$lib/types/database.types';

	export let open = true;
	export let invoice: Database['public']['Tables']['invoice']['Row'];
	export let company: any; // TODO: Add proper typing
	export let customer: any; // TODO: Add proper typing

	let invoiceRef: HTMLElement;

	async function downloadAsPNG() {
		if (!invoiceRef) return;

		try {
			const dataUrl = await toPng(invoiceRef);
			const link = document.createElement('a');
			link.download = `invoice-${invoice.id}.png`;
			link.href = dataUrl;
			link.click();
		} catch (err) {
			console.error('Failed to download invoice:', err);
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-3xl">
		<Dialog.Header>
			<Dialog.Title>Invoice #{invoice.id}</Dialog.Title>
		</Dialog.Header>

		<div bind:this={invoiceRef} class="rounded-lg bg-white p-8">
			<!-- Company Details -->
			<div class="mb-8">
				<h2 class="mb-2 text-2xl font-bold">{company?.name}</h2>
				<p>{company?.address}</p>
				<p>{company?.email}</p>
				<p>{company?.phone}</p>
			</div>

			<!-- Customer Details -->
			<div class="mb-8">
				<h3 class="mb-2 text-lg font-semibold">Bill To:</h3>
				<p>{customer?.name}</p>
				<p>{customer?.address}</p>
				<p>{customer?.email}</p>
				<p>{customer?.phone}</p>
			</div>

			<!-- Invoice Details -->
			<div class="mb-8">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<p class="font-semibold">Invoice Number:</p>
						<p>#{invoice.id}</p>
					</div>
					<div>
						<p class="font-semibold">Date:</p>
						<p>{new Date(invoice.created_at).toLocaleDateString()}</p>
					</div>
					<div>
						<p class="font-semibold">Status:</p>
						<p>{invoice.status}</p>
					</div>
				</div>
			</div>

			<!-- Total -->
			<div class="mb-8 text-right">
				<p class="text-xl font-bold">Total: ${invoice.total.toFixed(2)}</p>
			</div>
		</div>

		<div class="mt-4 flex justify-end gap-2">
			<Button variant="outline" on:click={() => (open = false)}>Close</Button>
			<Button variant="default" on:click={downloadAsPNG}>Download</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
