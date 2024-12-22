<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { Bell, LucideOctagonMinus } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import AddCompanyDialog from '../_components/add-company-dialog.svelte';
	import EditCompanyDialog from '../_components/edit-company-dialog.svelte';

	export let data: PageData;
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Companies</h2>
		<div class="flex items-center space-x-2">
			<AddCompanyDialog data={data.form} />
		</div>
	</div>
	{#if data.error}
		<Alert.Root variant="destructive">
			<LucideOctagonMinus class="size-5" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{data.error}</Alert.Description>
		</Alert.Root>
	{/if}
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.companies as company}
			<Card.Root>
				<Card.Header class="flex flex-row items-start justify-between space-y-0 pb-2 lg:gap-4">
					<Card.Title class="whitespace-nowrap text-sm font-medium"
						>{company.details.name}</Card.Title
					>
					<Card.Description class="lg:text-right">{company.details.description}</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-4">
					<div class="flex items-center space-x-4 rounded-md border p-4">
						<Bell />
						<div class="flex-1 space-y-1">
							<p class="text-sm font-medium leading-none">Push Notifications</p>
							<p class="text-sm text-muted-foreground">Send notifications to device.</p>
						</div>
						<Switch />
					</div>
					<div>
						<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
							<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span>
							<div class="space-y-1">
								<p class="text-sm font-medium leading-none">Created</p>
								<p class="text-sm text-muted-foreground">
									{company.created}
								</p>
							</div>
						</div>
					</div>
				</Card.Content>
				<Card.Footer>
					<EditCompanyDialog data={Object.assign({ id: company.id }, company.details)} />
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
	{#if data.companies.length < 1}
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
			<Card.Root class="col-span-3">
				<Card.Header>
					<Card.Title>You have no companies</Card.Title>
					<Card.Description>
						You can start tracking leads as soon as you add a company.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<p class="mb-4 text-sm text-muted-foreground"></p>
					<AddCompanyDialog data={data.form} />
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</div>
