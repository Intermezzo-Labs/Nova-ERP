<script lang="ts">
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	import type { PageData } from './$types';
	import PresetSave from './_components/PresetSave.svelte';
	import PresetSelector from './_components/PresetSelector.svelte';
	import BusinessCard from './_components/business-card.svelte';

	export let data: PageData;
</script>

{#snippet actions()}
	<div class="ml-auto flex w-full space-x-2 sm:justify-end">
		<!-- <PresetSelector presets={[]} />
		<PresetSave /> -->
		<!-- <div class=" space-x-2 md:flex">
			<CodeViewer />
			<PresetShare />
		</div>
		<PresetActions /> -->
	</div>
{/snippet}

<MainContainerLayout title="Marketing" {actions}>
	<BusinessCard {data} />
</MainContainerLayout>
