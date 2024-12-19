<script lang="ts">
	import { formatTimeAgo } from '../utils.js';
	import { cn } from '$lib/utils.js';
	import type { PageData } from '../$types.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let customers: PageData['customers'];

	function get_badge_variant_from_label(label: string) {
		if (['work'].includes(label.toLowerCase())) {
			return 'default';
		}

		if (['personal'].includes(label.toLowerCase())) {
			return 'outline';
		}

		return 'secondary';
	}
	const handleCustomerClick = (customerId: number) => {
		const params = $page.url.searchParams;
		goto('/dashboard/customers/' + customerId);
	};
</script>

<div class="space-y-2 px-4 pb-4">
	{#each customers as customer}
		<button
			class={cn(
				'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
				// $mailStore.selected === item.id && 'bg-muted'
			)}
			on:click={() => handleCustomerClick(customer.id)}
		>
			<div class="flex w-full flex-col gap-1">
				<div class="flex items-center">
					<div class="flex items-center gap-2">
						<div class="font-semibold">{customer.details.name}</div>
						<!-- {#if !item.new}
							<span class="flex h-2 w-2 rounded-full bg-blue-600" ></span>
						{/if} -->
					</div>
					<div
						class={cn(
							'ml-auto text-xs'
							// $mailStore.selected === item.id ? 'text-foreground' : 'text-muted-foreground'
						)}
					>
						{formatTimeAgo(new Date(customer.created))}
					</div>
				</div>
				<div class="text-xs font-medium">{customer.details.email}</div>
			</div>
			<div class="line-clamp-2 text-xs text-muted-foreground">
				<!-- {item.text.substring(0, 300)} -->
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores esse perspiciatis velit voluptates
				cumque nostrum iste et animi sint, nulla quam tempora pariatur officiis, explicabo omnis corporis,
				atque facilis natus.
			</div>
			<!-- {#if item.labels.length}
				<div class="flex items-center gap-2">
					{#each item.labels as label}
						<Badge variant={get_badge_variant_from_label(label)}>
							{label}
						</Badge>
					{/each}
				</div>
			{/if} -->
		</button>
	{/each}
</div>
