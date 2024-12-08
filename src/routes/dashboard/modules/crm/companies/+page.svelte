<script lang="ts">
	import type { PageData } from './$types';
	import AddCompanyDialog from './_components/add-company-dialog.svelte';

	export let data: PageData;
</script>

<div
	class="flex flex-1 items-center justify-center rounded-lg border border-dashed py-12 shadow-sm"
>
	<div class="flex flex-col items-center gap-1 text-center">
		<h3 class="text-2xl font-bold tracking-tight">You have no companies</h3>
		<p class="mb-4 text-sm text-muted-foreground">
			You can start tracking leads as soon as you add a company.
		</p>
		<AddCompanyDialog data={data.form} />
	</div>
</div>
