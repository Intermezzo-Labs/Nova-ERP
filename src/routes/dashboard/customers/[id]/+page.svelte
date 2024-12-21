<script lang="ts">
	import { Search } from 'lucide-svelte';

	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/select';
	import CustomerDisplay from './_components/customer-display.svelte';
	import CustomerList from './_components/customer-list.svelte';

	import type { PageData } from './$types';
	import AddCustomerDialog from '../_components/add-customer-dialog.svelte';

	export let data: PageData;
</script>

<div class="flex h-full flex-1 divide-x">
	<section class="flex h-full max-w-lg flex-col md:min-w-96">
		<div class="flex items-center justify-between gap-4 px-4 py-2">
			<h1 class="text-xl font-bold">Customers</h1>
			<AddCustomerDialog data={data.form} />
		</div>
		<Separator />
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
	</section>
	<section class="flex h-full flex-1 flex-col">
		<CustomerDisplay noteForm={data.customerNoteForm} customer={data.selectedCustomer} />
	</section>
</div>
