<script>
	export let action;
</script>

<div
	class="rounded-lg bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
>
	<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
		<div class="space-y-2">
			<h3 class="text-base font-bold text-gray-500 sm:text-lg">{action.title}</h3>
			<p class="text-sm text-blue-600">{action.subtitle}</p>
			<p class="text-sm text-gray-500">{action.description}</p>
		</div>
		<div class="flex min-w-[140px] flex-col space-y-2">
			<div class="h-2 w-full rounded-full bg-gray-200 sm:h-3">
				<div
					class="h-full rounded-full bg-green-500 transition-all duration-300"
					style="width: {action.progress}%"
				></div>
			</div>
			<p class="text-xs text-gray-500 sm:text-sm">{action.time}</p>
		</div>
	</div>
</div>
