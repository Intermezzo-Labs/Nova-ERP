<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import SuperDebug, { type SuperForm } from 'sveltekit-superforms';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { type ProductDetails, type UpdateProductDetails } from '$lib/schemas/product';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		form: SuperForm<ProductDetails | UpdateProductDetails>;
		action: string;
		header: Snippet;
		footer: Snippet;
		readonly?: boolean;
	};
	let { form, header, footer, action, readonly }: Props = $props();
	let { enhance, form: formData } = form;
</script>

<form method="POST" use:enhance {action}>
	{@render header()}
	<div class="grid py-6">
		{#if 'id' in $formData}
			<Form.Field {form} name="id">
				<Form.Control let:attrs>
					<Input {...attrs} required bind:value={$formData.id} type="hidden" readonly />
				</Form.Control>
			</Form.Field>
		{/if}
		<Form.Field {form} name="name" autofocus>
			<Form.Control let:attrs>
				<Form.Label>Name</Form.Label>
				<Input
					{...attrs}
					required
					bind:value={$formData.name}
					placeholder="Cookies n' cream"
					{readonly}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="price">
			<Form.Control let:attrs>
				<Form.Label>Price</Form.Label>
				<Input {...attrs} required bind:value={$formData.price} placeholder="$5.99" {readonly} />
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
					{readonly}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	{#if browser}
		<SuperDebug data={$formData} />
	{/if}

	{@render footer()}
</form>
