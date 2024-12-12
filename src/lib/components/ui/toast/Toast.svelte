<script lang="ts">
	import { toast } from '$lib/stores/toast';
	import { fly } from 'svelte/transition';
</script>

{#if $toast.length}
	<div class="fixed right-4 top-4 z-50 flex flex-col gap-2">
		{#each $toast as notification (notification.id)}
			<div
				transition:fly={{ x: 300, duration: 300 }}
				class="min-w-[200px] rounded-lg p-4 shadow-md {notification.type === 'error'
					? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
					: notification.type === 'success'
						? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
						: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'}"
			>
				{notification.message}
			</div>
		{/each}
	</div>
{/if}
