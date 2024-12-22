<script lang="ts">
	import { Activity, CreditCard, DollarSign, Users } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import RecentSales from './_components/recent-sales.svelte';
	import Overview from './_components/overview.svelte';
	import { Separator } from '$lib/components/ui/select';
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
</script>

{#snippet tabOptions()}
	<Tabs.List class="sm:ml-auto">
		<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
		<Tabs.Trigger value="analytics" disabled>Analytics</Tabs.Trigger>
		<Tabs.Trigger value="reports" disabled>Reports</Tabs.Trigger>
		<Tabs.Trigger value="notifications" disabled>Notifications</Tabs.Trigger>
	</Tabs.List>
{/snippet}

<Tabs.Root value="overview" class="sm:flex sm:h-full sm:flex-col">
	<MainContainerLayout title="Dashboard" actions={tabOptions}>
		<Tabs.Content value="overview" class="m-0 space-y-4 p-4">
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card.Root>
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
						<DollarSign class="h-4 w-4 text-muted-foreground" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">$45,231.89</div>
						<p class="text-xs text-muted-foreground">+20.1% from last month</p>
					</Card.Content>
				</Card.Root>
				<Card.Root>
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
						<Users class="h-4 w-4 text-muted-foreground" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">+2350</div>
						<p class="text-xs text-muted-foreground">+180.1% from last month</p>
					</Card.Content>
				</Card.Root>
				<Card.Root>
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Sales</Card.Title>
						<CreditCard class="h-4 w-4 text-muted-foreground" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">+12,234</div>
						<p class="text-xs text-muted-foreground">+19% from last month</p>
					</Card.Content>
				</Card.Root>
				<Card.Root>
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Active Now</Card.Title>
						<Activity class="h-4 w-4 text-muted-foreground" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">+573</div>
						<p class="text-xs text-muted-foreground">+201 since last hour</p>
					</Card.Content>
				</Card.Root>
			</div>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
				<Card.Root class="col-span-4">
					<Card.Header>
						<Card.Title>Overview</Card.Title>
					</Card.Header>
					<Card.Content>
						<Overview />
					</Card.Content>
				</Card.Root>
				<Card.Root class="col-span-3">
					<Card.Header>
						<Card.Title>Recent Sales</Card.Title>
						<Card.Description>You made 265 sales this month.</Card.Description>
					</Card.Header>
					<Card.Content>
						<RecentSales />
					</Card.Content>
				</Card.Root>
			</div>
		</Tabs.Content>
	</MainContainerLayout>
</Tabs.Root>
