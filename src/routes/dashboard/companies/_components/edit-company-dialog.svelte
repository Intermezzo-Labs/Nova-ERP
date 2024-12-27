<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { type UpdateCompanyDetails, updateCompanyFormSchema } from '$lib/schemas/company';
	import CompanyForm from '$lib/components/forms/company-form.svelte';

	type Props = {
		data: UpdateCompanyDetails;
		open: boolean;
		handleClose: () => void;
		archived: boolean;
	};
	let { data, open, handleClose, archived }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(updateCompanyFormSchema),
		dataType: 'json',
		applyAction: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				handleClose();
			}
		}
	});
</script>

{#snippet header()}
	<Dialog.Header>
		{#if archived}
			<Dialog.Title>{data.name} is archived</Dialog.Title>
			<Dialog.Description>
				Unarchive this company if you want to make any updates.
			</Dialog.Description>
		{:else}
			<Dialog.Title>Edit {data.name}</Dialog.Title>
			<Dialog.Description>
				Update company details and settings here and click update when you're done.
			</Dialog.Description>
		{/if}
	</Dialog.Header>
{/snippet}

{#snippet footer()}
	<Dialog.Footer>
		{#if archived}
			<Form.Button variant="outline" formaction="/dashboard/companies/?/unarchive">
				Unarchive company
			</Form.Button>
		{:else}
			<Form.Button variant="outline" formaction="/dashboard/companies/?/archive">
				Archive company
			</Form.Button>
			<Form.Button>Update company</Form.Button>
		{/if}
	</Dialog.Footer>
{/snippet}

<Dialog.Root {open} onOpenChange={handleClose}>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<CompanyForm
			{header}
			{footer}
			{form}
			action="/dashboard/companies/?/update"
			readonly={archived}
		/>
	</Dialog.Content>
</Dialog.Root>
