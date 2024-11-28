<script lang="ts">
	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground lg:flex-row">
	<Sidebar />
	<main class="ml-[72px] flex w-full flex-1 flex-col lg:ml-64">
		<Header />
		<div class="flex-1 overflow-y-auto">
			<div class="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
				<slot />
			</div>
		</div>
	</main>
</div>
