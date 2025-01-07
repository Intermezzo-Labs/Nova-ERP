<script lang="ts">
	import type { Route } from '../config';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { page } from '$app/state';

	type Props = { routes: Route[] };
	let { routes }: Props = $props();

	let activeRoute = $derived(page.url.pathname);

	const getVariant = (path?: string) => (activeRoute === path ? 'default' : 'ghost');
</script>

<div class="group flex-col gap-4 py-2 data-[collapsed=true]:py-2 md:flex">
	<nav class="grid gap-1 px-2">
		{#each routes as route}
			<Button
				href={route.path}
				variant={getVariant(route.path)}
				size="sm"
				class={cn('justify-start', {
					'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white':
						getVariant(route.path) === 'default'
				})}
				disabled={route.disabled}
			>
				<route.icon class="mr-2 size-4" aria-hidden="true" />
				{route.title}
				{#if route.label}
					<span
						class={cn('ml-auto', {
							'text-background dark:text-white': getVariant(route.path) === 'default'
						})}
					>
						{route.label}
					</span>
				{/if}
			</Button>
		{/each}
	</nav>
</div>
