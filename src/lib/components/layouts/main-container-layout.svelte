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

<div class={cn('sm:flex sm:h-full sm:flex-col', className)}>
	<div class="flex h-14 flex-col items-center justify-between gap-2 px-4 sm:flex-row">
		{#if title}
			<h1 class="text-xl font-bold">{title}</h1>
		{/if}
		{#if actions}
			{@render actions()}
		{/if}
	</div>
	<Separator class="my-0" />
	<div class="h-full flex-1 overflow-auto">
		{@render children()}
	</div>
</div>
