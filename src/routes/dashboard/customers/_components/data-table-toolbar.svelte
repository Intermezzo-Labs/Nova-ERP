<script lang="ts">
	// import type { Writable } from 'svelte/store';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import DataTableFacetedFilter from './data-table-faceted-filter.svelte';
	import DataTableViewOptions from './data-table-view-options.svelte';
	import { Cross } from 'lucide-svelte';

	// export let tableModel: any;
	// export let data: any[];

	// const counts = data.reduce<{
	// 	status: { [index: string]: number };
	// 	priority: { [index: string]: number };
	// }>(
	// 	(acc, { status, priority }) => {
	// 		acc.status[status] = (acc.status[status] || 0) + 1;
	// 		acc.priority[priority] = (acc.priority[priority] || 0) + 1;
	// 		return acc;
	// 	},
	// 	{
	// 		status: {},
	// 		priority: {}
	// 	}
	// );

	// const { pluginStates } = tableModel;
	// const {
	// 	filterValue
	// }: {
	// 	filterValue: Writable<string>;
	// } = pluginStates.filter;

	// const {
	// 	filterValues
	// }: {
	// 	filterValues: Writable<{
	// 		status: string[];
	// 		priority: string[];
	// 	}>;
	// } = pluginStates.colFilter;

	// $: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input placeholder="Filter tasks..." class="h-8 w-[150px] lg:w-[250px]" type="search" />

		<DataTableFacetedFilter title="Status" options={[]} counts={counts.status} />
		<DataTableFacetedFilter title="Priority" options={[]} counts={{}} />
		{#if showReset}
			<Button variant="ghost" class="h-8 px-2 lg:px-3">
				Reset
				<Cross class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>

	<DataTableViewOptions {tableModel} />
</div>
