<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { Pencil } from 'lucide-svelte';
	import { updateCustomerFormSchema, type UpdateCustomerDetails } from '../customerSchema';

	export let data: UpdateCustomerDetails;

	const form = superForm(data, {
		validators: zodClient(updateCustomerFormSchema),
		dataType: 'json',
		applyAction: true
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="sm">
			<Pencil class="mr-2 size-4" /> Edit
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<form method="POST" use:enhance action="?/update">
			<Dialog.Header>
				<Dialog.Title>Edit {data.name}</Dialog.Title>
			</Dialog.Header>

			<div class="grid gap-6 py-6">
				<Form.Field {form} name="name">
					<Form.Control let:attrs>
						<Form.Label>Name</Form.Label>
						<Input {...attrs} required bind:value={$formData.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} type="email" bind:value={$formData.email} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="phone">
					<Form.Control let:attrs>
						<Form.Label>Phone</Form.Label>
						<Input {...attrs} type="tel" bind:value={$formData.phone} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			{#if browser}
				<SuperDebug data={$formData} />
			{/if}

			<Dialog.Footer>
				<Form.Button>Update customer</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
