<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { customerFormSchema, type CustomerFormSchema } from '../customerSchema';
	import Button from '$lib/components/ui/button/button.svelte';
	import { UserPlus } from 'lucide-svelte';

	const { data }: { data: SuperValidated<Infer<CustomerFormSchema>> } = $props();
	let open = $state(false);

	const form = superForm(data, {
		validators: zodClient(customerFormSchema),
		dataType: 'json',
		onResult: () => (open = false)
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]}>
			<UserPlus class="mr-2 size-4" /> Add customer
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<form method="POST" use:enhance action="/dashboard/customers/?/create">
			<Dialog.Header>
				<Dialog.Title>Add customer</Dialog.Title>
				<Dialog.Description>
					Add customer details and click save when you're done.
				</Dialog.Description>
			</Dialog.Header>

			<div class="grid py-6">
				<Form.Field {form} name="name" autofocus>
					<Form.Control let:attrs>
						<Form.Label>Name</Form.Label>
						<Input {...attrs} required bind:value={$formData.name} placeholder="Bruce Wayne" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input
							{...attrs}
							type="email"
							bind:value={$formData.email}
							placeholder="bruce@way.ne"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="phone">
					<Form.Control let:attrs>
						<Form.Label>Phone</Form.Label>
						<Input {...attrs} type="tel" bind:value={$formData.phone} placeholder="### ### ####" />
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
