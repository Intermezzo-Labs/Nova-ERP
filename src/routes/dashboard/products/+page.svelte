<script lang="ts">
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	import Sidebar from './_components/sidebar.svelte';
	import AddProductDialog from './_components/add-product-dialog.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#snippet actions()}
	<AddProductDialog data={data.form} />
{/snippet}

<MainContainerLayout title="Products" {actions}>
	<div class="flex h-full flex-col md:flex-row">
		<Sidebar class="md:w-64" />
		<div class="flex-1 md:border-l">
			<div class="w-full space-y-4 p-4">
				<!-- <SuperDebug data={data.products} /> -->
			</div>
		</div>
	</div>
</MainContainerLayout>
