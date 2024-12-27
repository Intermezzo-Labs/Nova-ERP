<script lang="ts">
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	import Sidebar from './_components/sidebar.svelte';
	import SuperDebug from 'sveltekit-superforms';
	import AddProductDialog from './_components/add-product-dialog.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#snippet actions()}
	<AddProductDialog data={data.form} />
{/snippet}

<MainContainerLayout title="Products" {actions}>
	<div class="flex h-full">
		<Sidebar class="w-64" />
		<div class="flex-1 border-l">
			<div class="space-y-4 p-4">
				<SuperDebug data={data.products} />
			</div>
		</div>
	</div>
</MainContainerLayout>
