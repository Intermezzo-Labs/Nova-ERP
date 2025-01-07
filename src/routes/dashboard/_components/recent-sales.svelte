<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	const buildCustomer = (name: string, initials: string, email: string, amount: string) => ({
		name,
		email,
		amount,
		initials
	});
	const customers: ReturnType<typeof buildCustomer>[] = [
		buildCustomer('Olivia Martin', 'OM', 'olivia.martin@email.com', '+$1,999.00'),
		buildCustomer('Jackson Lee', 'JL', 'jackson.lee@email.com', '+$39.00'),
		buildCustomer('Isabella Nguyen', 'IN', 'isabella.nguyen@email.com', '+$299.00'),
		buildCustomer('William Kim', 'WK', 'will@email.com', '+$99.00'),
		buildCustomer('Sofia Davis', 'SD', 'sofia.davis@email.com', '+$39.00')
	];
</script>

<div class="space-y-8">
	{#each customers as customer}
		<div class="flex items-center">
			<Avatar.Root class="h-9 w-9">
				<!-- <Avatar.Image src="/avatars/01.png" alt="Avatar" /> -->
				<Avatar.Fallback>{customer.initials}</Avatar.Fallback>
			</Avatar.Root>
			<div class="ml-4 space-y-1">
				<p class="text-sm font-medium leading-none">{customer.name}</p>
				<p class="text-sm text-muted-foreground">{customer.email}</p>
			</div>
			<div class="ml-auto font-medium">{customer.amount}</div>
		</div>
	{/each}
</div>
