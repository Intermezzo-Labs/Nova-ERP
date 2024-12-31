<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { type UpdateCustomerDetails, updateCustomerFormSchema } from '$lib/schemas/customer';

	type Props = {
		data: UpdateCustomerDetails;
		open: boolean;
	};
	let { data, open = $bindable(false) }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(updateCustomerFormSchema),
		dataType: 'json',
		applyAction: true,
		onResult: () => (open = false)
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<form method="POST" use:enhance action="?/update">
			<Dialog.Header>
				<Dialog.Title>Edit {data.name}</Dialog.Title>
			</Dialog.Header>

			<div class="grid gap-6 py-6">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Name</Form.Label>
							<Input {...props} required bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input {...props} type="email" bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="phone">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Phone</Form.Label>
							<Input {...props} type="tel" bind:value={$formData.phone} />
						{/snippet}
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
