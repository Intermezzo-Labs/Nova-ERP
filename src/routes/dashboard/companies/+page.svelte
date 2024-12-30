<script lang="ts">
	import type { PageData } from './$types';
	import { Building, LucideOctagonMinus } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import AddCompanyDialog from './_components/add-company-dialog.svelte';
	import EditCompanyDialog from './_components/edit-company-dialog.svelte';
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	import EmptyPlaceholder from '$lib/components/empty-placeholder.svelte';
	import type { UpdateCompanyForm } from '$lib/schemas/company';
	import CompanyCard from './_components/company-card.svelte';

	let { data }: { data: PageData } = $props();
	let selectedCompany = $state<UpdateCompanyForm | null>(null);
</script>

{#snippet actions()}
	<AddCompanyDialog data={data.form} />
{/snippet}

{#snippet icon()}
	<Building class="size-5" />
{/snippet}

<MainContainerLayout title="Companies" actions={data.companies.length ? actions : undefined}>
	{#if data.error}
		<Alert.Root variant="destructive">
			<LucideOctagonMinus class="size-5" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{data.error}</Alert.Description>
		</Alert.Root>
	{/if}
	<div class="grid items-start gap-4 p-4 lg:grid-cols-3">
		{#each data.companies as company}
			<CompanyCard
				{company}
				onManageClick={() =>
					(selectedCompany = {
						id: company.id,
						details: company.details,
						shared_with: company.shared_with
					})}
				onShareClick={() => alert('cool')}
			/>
		{/each}
	</div>
	{#if data.companies.length < 1}
		<div class="p-4">
			<EmptyPlaceholder {icon} itemLabel="companies">
				{@render actions()}
			</EmptyPlaceholder>
		</div>
	{/if}
</MainContainerLayout>

{#if selectedCompany}
	<EditCompanyDialog
		data={selectedCompany}
		open={!!selectedCompany}
		handleClose={() => (selectedCompany = null)}
		archived={!!data.companies.find((c) => c.id === selectedCompany?.id)?.archived_at}
	/>
{/if}
