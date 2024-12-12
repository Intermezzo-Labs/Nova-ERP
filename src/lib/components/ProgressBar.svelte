<script>
	export let progress;
	export let label;
</script>

<div
	class="rounded-lg bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
>
	<div class="space-y-3">
		<h2 class="text-base font-bold text-gray-500 sm:text-lg">{label}</h2>
		<div class="h-3 w-full rounded-full bg-gray-200 sm:h-4">
			<div
				class="h-full rounded-full bg-green-500 transition-all duration-300"
				style="width: {progress}%"
			></div>
		</div>
	</div>
</div>
