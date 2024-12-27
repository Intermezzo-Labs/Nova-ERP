<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { Bell, Building, Settings, LucideOctagonMinus } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import AddCompanyDialog from './_components/add-company-dialog.svelte';
	import EditCompanyDialog from './_components/edit-company-dialog.svelte';
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	import EmptyPlaceholder from '$lib/components/empty-placeholder.svelte';
	import type { UpdateCompanyDetails } from '$lib/schemas/company';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data }: { data: PageData } = $props();
	let selectedCompany = $state<UpdateCompanyDetails | null>(null);
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
			<Card.Root>
				<Card.Header class="flex flex-row items-start justify-between space-y-0 pb-2 lg:gap-4">
					<Card.Title class="whitespace-nowrap text-sm font-medium">
						{company.details.name}
					</Card.Title>
					<Card.Description class="lg:text-right">{company.details.description}</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-4">
					<div>
						<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
							<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span>
							<div class="space-y-1">
								<p class="text-sm font-medium leading-none">Created</p>
								<p class="text-sm text-muted-foreground">
									{company.created_at}
								</p>
							</div>
						</div>
						{#if company.archived_at}
							<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
								<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span>
								<div class="space-y-1">
									<p class="text-sm font-medium leading-none">Archived</p>
									<p class="text-sm text-muted-foreground">
										{company.archived_at}
									</p>
								</div>
							</div>
						{/if}
					</div>
				</Card.Content>
				<Card.Footer>
					<Button
						class="w-full"
						variant="outline"
						size="lg"
						onclick={() =>
							(selectedCompany = {
								id: company.id,
								...company.details
							})}
					>
						<Settings class="mr-2 size-4" /> Manage
					</Button>
				</Card.Footer>
			</Card.Root>
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
