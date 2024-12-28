<script lang="ts">
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { CompanyDetails, UpdateCompanyDetails } from '$lib/schemas/company';
	import type { Snippet } from 'svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	type Props = {
		form: SuperForm<CompanyDetails | UpdateCompanyDetails>;
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

	<div class="grid gap-6 py-6">
		{#if 'id' in $formData}
			<Form.Field {form} name="id">
				<Form.Control let:attrs>
					<Input {...attrs} required bind:value={$formData.id} type="hidden" readonly />
				</Form.Control>
			</Form.Field>
		{/if}
		<Form.Field {form} name="name">
			<Form.Control let:attrs>
				<Form.Label for="name">Name</Form.Label>
				<Input {...attrs} required bind:value={$formData.name} {readonly} />
			</Form.Control>
			<Form.Description>The legal name of your company.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="description">
			<Form.Control let:attrs>
				<Form.Label for="name">Description</Form.Label>
				<Textarea {...attrs} rows={3} bind:value={$formData.description} {readonly} />
			</Form.Control>
			<Form.Description>Short description of your company.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	{#if browser}
		<SuperDebug data={$formData} />
	{/if}

	{@render footer()}
</form>
