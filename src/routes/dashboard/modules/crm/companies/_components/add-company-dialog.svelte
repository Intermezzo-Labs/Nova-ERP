<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { Plus } from 'lucide-svelte';
	import { companyFormSchema, type CompanyFormSchema } from '../companySchema';

	export let data: SuperValidated<Infer<CompanyFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(companyFormSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]}><Plus class="mr-2 size-4" /> Add Company</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<form method="POST" use:enhance action="?/create">
			<Dialog.Header>
				<Dialog.Title>Add company</Dialog.Title>
				<Dialog.Description>
					Add company details and settings here and click save when you're done.
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
				<Form.Button>Save company</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
