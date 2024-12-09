<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { LucideOctagonMinus } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import AddCustomerDialog from './_components/add-customer-dialog.svelte';
	import EditCustomerDialog from './_components/edit-customer-dialog.svelte';
	import * as Table from '$lib/components/ui/table';

	export let data: PageData;
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Customers</h2>
		<div class="flex items-center space-x-2">
			<AddCustomerDialog data={data.form} />
		</div>
	</div>
	{#if data.error}
		<Alert.Root variant="destructive">
			<LucideOctagonMinus class="size-5" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{data.error}</Alert.Description>
		</Alert.Root>
	{/if}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Name</Table.Head>
				<Table.Head>Phone</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Created</Table.Head>
				<Table.Head>Updated</Table.Head>
				<Table.Head class="text-right"></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.customers as customer}
				<Table.Row>
					<Table.Cell class="font-medium">{customer.details.name}</Table.Cell>
					<Table.Cell>{customer.details.phone}</Table.Cell>
					<Table.Cell>{customer.details.email}</Table.Cell>
					<Table.Cell>{customer.created}</Table.Cell>
					<Table.Cell>{customer.updated}</Table.Cell>
					<Table.Cell class="text-right">
						<EditCustomerDialog data={Object.assign({ id: customer.id }, customer.details)} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
	{#if data.customers.length < 1}
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
			<Card.Root class="col-span-3">
				<Card.Header>
					<Card.Title>You have no customers</Card.Title>
					<Card.Description>
						You can start tracking leads as soon as you add a company.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<p class="mb-4 text-sm text-muted-foreground"></p>
					<AddCustomerDialog data={data.form} />
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</div>
