<script>
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import ActionCard from '$lib/components/ActionCard.svelte';

	let actions = [
		{
			title: 'Recommended: All you need to get started',
			subtitle: 'Set up the basics',
			description: 'Import your contacts, invite teammates, and understand properties.',
			progress: 83,
			time: 'About 2 minutes left'
		},
		{
			title: 'Close more deals faster with Sales Hub',
			subtitle: 'Track your deals in one place',
			description: 'Create a custom pipeline and never lose track of a sale again.',
			progress: 0,
			time: 'About 4 minutes left'
		}
	];
</script>

<ProgressBar progress="38" label="Your Sales tools progress" />
<div class="mt-6 grid gap-4 sm:gap-6">
	{#each actions as action}
		<ActionCard {action} />
	{/each}
</div>
