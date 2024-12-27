<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { companyFormSchema, type CompanyFormSchema } from '$lib/schemas/company';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Plus } from 'lucide-svelte';
	import CompanyForm from '$lib/components/forms/company-form.svelte';

	let {
		data,
		open = $bindable(false)
	}: { data: SuperValidated<Infer<CompanyFormSchema>>; open?: boolean } = $props();

	const form = superForm(data, {
		validators: zodClient(companyFormSchema),
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type === 'success') open = false;
		}
	});
</script>

{#snippet header()}
	<Dialog.Header>
		<Dialog.Title>Add company</Dialog.Title>
		<Dialog.Description>
			Add company details and settings here and click save when you're done.
		</Dialog.Description>
	</Dialog.Header>
{/snippet}

{#snippet footer()}
	<Dialog.Footer>
		<Form.Button>Save company</Form.Button>
	</Dialog.Footer>
{/snippet}

<Dialog.Root {open} onOpenChange={(bool) => (open = bool)}>
	<Dialog.Trigger asChild let:builder>
		<Form.Button builders={[builder]}><Plus class="mr-2 size-4" /> Add Company</Form.Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
		<CompanyForm {header} {footer} {form} action="?/create" />
	</Dialog.Content>
</Dialog.Root>
