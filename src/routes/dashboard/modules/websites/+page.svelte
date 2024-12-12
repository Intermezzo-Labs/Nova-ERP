<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="container mx-auto p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold">Website Templates</h1>
		<Button>Create Template</Button>
	</div>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<!-- Template cards will go here -->
		<div class="rounded-lg border p-4 dark:border-gray-700">
			<div class="aspect-video w-full rounded bg-slate-100 dark:bg-slate-800"></div>
			<h3 class="mt-4 font-semibold">Business Website</h3>
			<p class="text-sm text-gray-600 dark:text-gray-300">Professional business website template</p>
		</div>
	</div>
</div>
