<script>
	import EmptyPlaceholder from '$lib/components/empty-placeholder.svelte';
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
</script>

<MainContainerLayout title="Orders">
	<div class="p-4">
		<EmptyPlaceholder itemLabel="orders" />
	</div>
</MainContainerLayout>
