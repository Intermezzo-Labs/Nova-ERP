<script lang="ts">
	import { Search } from 'lucide-svelte';

	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/select';
	import CustomerDisplay from './_components/customer-display.svelte';
	import CustomerList from './_components/customer-list.svelte';

	import type { PageData } from './$types';
	import AddCustomerDialog from '../_components/add-customer-dialog.svelte';
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';

	export let data: PageData;
</script>

{#snippet actions()}
	<AddCustomerDialog data={data.form} />
{/snippet}

<div class="flex h-full flex-1 divide-x">
	<MainContainerLayout title="Customers" {actions} class="md:w-96">
		<div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<form>
				<div class="relative">
					<Search
						class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground"
					/>
					<Input placeholder="Search" class="pl-8" disabled />
				</div>
			</form>
		</div>
		<CustomerList customers={data.customers ?? []} selectedCustomerId={data.selectedCustomer.id} />
	</MainContainerLayout>
	<CustomerDisplay noteForm={data.customerNoteForm} customer={data.selectedCustomer} />
</div>
