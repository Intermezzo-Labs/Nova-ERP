<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		icon?: Snippet;
		itemLabel: string;
		children?: Snippet;
	};
	let { icon, itemLabel, children }: Props = $props();
</script>

<div class="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
	<div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
		{@render icon?.()}
		<h3 class="mt-4 text-lg font-semibold">No {itemLabel} added</h3>
		<p class="mb-4 mt-2 text-sm text-muted-foreground">
			You have not added any {itemLabel}. Add one below.
		</p>
		{@render children?.()}
	</div>
</div>
