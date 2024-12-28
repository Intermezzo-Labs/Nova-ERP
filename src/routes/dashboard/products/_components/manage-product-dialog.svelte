<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { updateProductFormSchema, type UpdateProductDetails } from '$lib/schemas/product';
	import ProductForm from '$lib/components/forms/product-form.svelte';

	type Props = {
		data: UpdateProductDetails;
		open: boolean;
		handleClose: () => void;
	};
	let { data, open, handleClose }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(updateProductFormSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				handleClose();
			}
		}
	});
</script>

{#snippet header()}
	<Dialog.Header>
		<Dialog.Title>Manage {data.name}</Dialog.Title>
		<Dialog.Description>Update product details and click save when you're done.</Dialog.Description>
	</Dialog.Header>
{/snippet}

{#snippet footer()}
	<Dialog.Footer>
		<Form.Button>Save product</Form.Button>
	</Dialog.Footer>
{/snippet}

<Dialog.Root {open} onOpenChange={handleClose}>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<ProductForm action="/dashboard/products/?/create" {header} {footer} {form} />
	</Dialog.Content>
</Dialog.Root>
