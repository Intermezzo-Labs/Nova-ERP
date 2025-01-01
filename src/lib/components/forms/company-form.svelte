<script lang="ts">
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { CompanyForm, UpdateCompanyForm } from '$lib/schemas/company';
	import { tick, type Snippet } from 'svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import Separator from '../ui/separator/separator.svelte';
	import Button from '../ui/button/button.svelte';
	import { cn } from '$lib/utils';

	type Props = {
		form: SuperForm<CompanyForm | UpdateCompanyForm>;
		action: string;
		header: Snippet;
		footer: Snippet;
		readonly?: boolean;
	};
	let { form, header, footer, action, readonly }: Props = $props();
	let { enhance, form: formData } = form;

	function addEmail() {
		$formData.shared_with = [...$formData.shared_with, ''];

		tick().then(() => {
			const urlInputs = Array.from(
				document.querySelectorAll<HTMLElement>("#company-form input[name='shared_with']")
			);
			const lastInput = urlInputs[urlInputs.length - 1];
			lastInput && lastInput.focus();
		});
	}
</script>

<form method="POST" use:enhance {action} id="company-form">
	{@render header()}

	<div class="grid gap-6 py-6">
		{#if 'id' in $formData}
			<Form.Field {form} name="id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} required bind:value={$formData.id} type="hidden" readonly />
					{/snippet}
				</Form.Control>
			</Form.Field>
		{/if}
		<Form.Field {form} name="details.name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label for="name">Name</Form.Label>
					<Input {...props} required bind:value={$formData.details.name} {readonly} />
				{/snippet}
			</Form.Control>
			<Form.Description>The legal name of your company.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="details.description">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label for="name">Description</Form.Label>
					<Textarea {...props} rows={3} bind:value={$formData.details.description} {readonly} />
				{/snippet}
			</Form.Control>
			<Form.Description>Short description of your company.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Separator />

		<div>
			<Form.Fieldset {form} name="shared_with">
				<Form.Legend>People with access</Form.Legend>
				{#each $formData.shared_with as _, i}
					<Form.ElementField {form} name="shared_with[{i}]">
						<Form.Description class={cn(i !== 0 && 'sr-only')}>
							Add email to list to share customers, products and invoices.
						</Form.Description>
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} bind:value={$formData.shared_with[i]} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.ElementField>
				{/each}
			</Form.Fieldset>
			<Button type="button" variant="outline" size="sm" class="mt-2" onclick={addEmail}>
				Add Email
			</Button>
		</div>
	</div>

	{@render footer()}
</form>
