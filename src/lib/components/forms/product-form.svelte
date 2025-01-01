<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { type SuperForm } from 'sveltekit-superforms';
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
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} required bind:value={$formData.id} type="hidden" readonly />
					{/snippet}
				</Form.Control>
			</Form.Field>
		{/if}
		<Form.Field {form} name="name" autofocus>
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Name</Form.Label>
					<Input
						{...props}
						required
						bind:value={$formData.name}
						placeholder="Cookies n' cream"
						{readonly}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="price">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Price</Form.Label>
					<Input {...props} required bind:value={$formData.price} placeholder="$5.99" {readonly} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="description">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Description</Form.Label>
					<Textarea
						{...props}
						bind:value={$formData.description}
						placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing elit..."
						{readonly}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	{@render footer()}
</form>
