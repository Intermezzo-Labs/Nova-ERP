<script lang="ts">
	import type { PageData } from './$types';
	import AddCustomerDialog from './_components/add-customer-dialog.svelte';
	import { Users } from 'lucide-svelte';

	export let data: PageData;
</script>

<div class="flex h-full p-2">
	<div class="flex w-full rounded-md border border-dashed">
		<div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
			<Users class="h-10 w-10 text-muted-foreground" />

			<h3 class="mt-4 text-lg font-semibold">No customers added</h3>
			<p class="mb-4 mt-2 text-sm text-muted-foreground">
				You have not added any customers. Add one below.
			</p>
			<AddCustomerDialog data={data.form} />
		</div>
	</div>
</div>
