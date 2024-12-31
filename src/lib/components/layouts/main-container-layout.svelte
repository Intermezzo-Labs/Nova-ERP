<script lang="ts">
	import type { Snippet } from 'svelte';
	import Separator from '../ui/separator/separator.svelte';
	import { cn } from '$lib/utils';

	type MainContainerProps = {
		title?: string;
		actions?: Snippet;
		children?: Snippet;
		class?: string;
	};
	const { title, actions, children, class: className }: MainContainerProps = $props();
</script>

<div class={cn('flex h-full flex-col', className)}>
	<div class="flex flex-col items-center justify-between gap-2 p-4 sm:flex-row sm:py-0 md:h-14">
		{#if title}
			<h1 class="text-xl font-bold">{title}</h1>
		{/if}
		{#if actions}
			{@render actions()}
		{/if}
	</div>
	{#if children}
		<Separator class="my-0" />
		<div class="h-full flex-1 overflow-auto">
			{@render children()}
		</div>
	{/if}
</div>
