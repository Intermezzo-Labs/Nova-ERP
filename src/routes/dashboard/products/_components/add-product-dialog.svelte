<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import { PlusCircle } from 'lucide-svelte';
	import { productFormSchema, type ProductFormSchema } from '$lib/schemas/product';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { PageData } from '../$types';

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

	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]}>
			<PlusCircle class="mr-2 size-4" /> Add products
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<form method="POST" use:enhance action="/dashboard/products/?/create">
			<Dialog.Header>
				<Dialog.Title>Add product</Dialog.Title>
				<Dialog.Description>
					Add product details and click save when you're done.
				</Dialog.Description>
			</Dialog.Header>

			<div class="grid py-6">
				<Form.Field {form} name="name" autofocus>
					<Form.Control let:attrs>
						<Form.Label>Name</Form.Label>
						<Input {...attrs} required bind:value={$formData.name} placeholder="Cookies n' cream" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="price">
					<Form.Control let:attrs>
						<Form.Label>Price</Form.Label>
						<Input {...attrs} required bind:value={$formData.price} placeholder="$5.99" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="description">
					<Form.Control let:attrs>
						<Form.Label>Description</Form.Label>
						<Textarea
							{...attrs}
							bind:value={$formData.description}
							placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing elit..."
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			{#if browser}
				<SuperDebug data={$formData} />
			{/if}

			<Dialog.Footer>
				<Form.Button>Save customer</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
