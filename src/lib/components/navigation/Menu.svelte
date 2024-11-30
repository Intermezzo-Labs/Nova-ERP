<script lang="ts">
	import { page } from '$app/stores';
	import type { MenuItem } from '$lib/types/navigation';

	export let menuItems: MenuItem[];
	export let orientation: 'horizontal' | 'vertical' = 'vertical';

	$: activeRoute = $page.url.pathname;

	function isActive(route: string): boolean {
		return activeRoute.startsWith(route);
	}
</script>

<nav class="menu w-64" aria-label="CRM Navigation">
	<ul class="flex flex-col gap-1 p-2" role="menubar" aria-orientation={orientation}>
		{#each menuItems as item (item.id)}
			<li role="none" class="w-full">
				<a
					href={item.route}
					role="menuitem"
					class="group flex items-center rounded-lg px-3 py-2 text-sm transition-all
                        hover:bg-gray-100 dark:hover:bg-gray-700/50
                        {isActive(item.route)
						? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
						: 'text-gray-700 dark:text-gray-300'}"
					aria-current={isActive(item.route) ? 'page' : undefined}
				>
					<span class="flex-1 font-medium">
						{item.name}
					</span>

					{#if item.badge !== undefined}
						<span
							class="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium"
						>
							{item.badge}
						</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="postcss">
	.menu {
		@apply min-w-[200px];
	}

	/* Add smooth hover transitions */
	.menu a {
		@apply relative overflow-hidden;
	}

	.menu a::before {
		@apply absolute inset-0 transform bg-current opacity-0 transition-opacity content-[''];
	}

	.menu a:hover::before {
		@apply opacity-5;
	}
</style>
