<script lang="ts">
	import Sidebar from './_components/Sidebar.svelte';
	import Header from './_components/Header.svelte';

	let { data, children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground lg:flex-row">
	<Sidebar />
	<main class="flex w-full flex-1 flex-col lg:ml-64">
		<Header />
		<div class="flex-1 overflow-y-auto">
			<div class="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
				{@render children()}
			</div>
		</div>
	</main>
</div>
