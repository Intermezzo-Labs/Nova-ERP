<script lang="ts">
	export let title = 'Coming Soon';
	export let description = "We're working on something exciting. Stay tuned!";
	export let backgroundClass = 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900';
	export let animationClass = 'animate-pulse';
	export let ctaText = 'Stay Tuned';
</script>

<div class="flex min-h-[50vh] w-full items-center justify-center p-8 {backgroundClass}">
	<div class="text-center">
		<h1
			class="mb-8 bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-6xl font-bold text-transparent transition-all duration-700 hover:scale-105 {animationClass}"
		>
			{title}
		</h1>

		<p class="mx-auto max-w-md text-lg text-white/80">
			{description}
		</p>

		<div class="mt-8">
			<span
				class="inline-block rounded-full border border-white/20 px-6 py-2 text-sm text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
			>
				{ctaText}
			</span>
		</div>
	</div>
</div>
