<script lang="ts">
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	import Sidebar from './_components/sidebar.svelte';
	import AddProductDialog from './_components/add-product-dialog.svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Settings } from 'lucide-svelte';
	import type { UpdateProductDetails } from '$lib/schemas/product';
	import ManageProductDialog from './_components/manage-product-dialog.svelte';

	let { data }: { data: PageData } = $props();

	let selectedProduct = $state<UpdateProductDetails | null>(null);
</script>

{#snippet actions()}
	<AddProductDialog data={data.form} />
{/snippet}

<MainContainerLayout title="Products" {actions}>
	<div class="flex h-full flex-col md:flex-row">
		<Sidebar class="md:w-64" />
		<div class="flex-1 md:border-l">
			<div class="grid w-full items-start gap-2 p-4 md:grid-cols-4 md:gap-4">
				{#each data.products ?? [] as product}
					<Card.Root>
						<Card.Header>
							<Card.Title>{product.details.name}</Card.Title>
							<Card.Description>{product.details.description}</Card.Description>
						</Card.Header>
						<Card.Content>
							<p>${product.details.price}</p>
						</Card.Content>
						<Card.Footer>
							<Button
								variant="outline"
								class="w-full"
								onclick={() =>
									(selectedProduct = {
										id: product.id,
										...product.details
									})}
							>
								<Settings class="mr-2 size-4" /> Manage
							</Button>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</div>
	</div>
</MainContainerLayout>

{#if selectedProduct}
	<ManageProductDialog
		data={selectedProduct}
		open={!!selectedProduct}
		handleClose={() => (selectedProduct = null)}
	/>
{/if}
