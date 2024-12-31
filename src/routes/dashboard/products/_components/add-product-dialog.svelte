<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import { PlusCircle } from 'lucide-svelte';
	import { productFormSchema, type ProductFormSchema } from '$lib/schemas/product';
	import ProductForm from '$lib/components/forms/product-form.svelte';

	type Props = { data: SuperValidated<Infer<ProductFormSchema>> };
	const { data }: Props = $props();
	let open = $state(false);

	const form = superForm(data, {
		validators: zodClient(productFormSchema),
		dataType: 'json',
		onResult: (response) => {
			if (response.result.status === 200) open = false;
		}
	});
</script>

{#snippet header()}
	<Dialog.Header>
		<Dialog.Title>Add product</Dialog.Title>
		<Dialog.Description>Add product details and click save when you're done.</Dialog.Description>
	</Dialog.Header>
{/snippet}

{#snippet footer()}
	<Dialog.Footer>
		<Form.Button>Save customer</Form.Button>
	</Dialog.Footer>
{/snippet}

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button {...props}>
				<PlusCircle class="mr-2 size-4" /> Add products
			</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<ProductForm action="/dashboard/products/?/create" {header} {footer} {form} />
	</Dialog.Content>
</Dialog.Root>
