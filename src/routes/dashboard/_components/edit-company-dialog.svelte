<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { Pencil } from 'lucide-svelte';
	import { type UpdateCompanyDetails, updateCompanyFormSchema } from '$lib/schemas/company';

	export let data: UpdateCompanyDetails;

	const form = superForm(data, {
		validators: zodClient(updateCompanyFormSchema),
		dataType: 'json',
		applyAction: true
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]}><Pencil class="mr-2 size-4" /> Edit Details</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<form method="POST" use:enhance action="?/update">
			<Dialog.Header>
				<Dialog.Title>Edit {data.name}</Dialog.Title>
				<Dialog.Description>
					Update company details and settings here and click update when you're done.
				</Dialog.Description>
			</Dialog.Header>

			<div class="grid gap-6 py-6">
				<Form.Field {form} name="name">
					<Form.Control let:attrs>
						<Form.Label for="name">Name</Form.Label>
						<Input {...attrs} required bind:value={$formData.name} />
					</Form.Control>
					<Form.Description>Set the font you want to use in the dashboard.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="description">
					<Form.Control let:attrs>
						<Form.Label for="name">Description</Form.Label>
						<Textarea {...attrs} rows={3} bind:value={$formData.description} />
					</Form.Control>
					<Form.Description>Set the font you want to use in the dashboard.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			{#if browser}
				<SuperDebug data={$formData} />
			{/if}

			<Dialog.Footer>
				<Form.Button>Update company</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
