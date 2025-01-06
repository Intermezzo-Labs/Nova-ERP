<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="grid h-screen place-content-center px-4">
	<div class="text-center">
		<h1 class="text-9xl font-black text-gray-200">{page.status}</h1>

		<p class="text-2xl font-bold tracking-tight sm:text-4xl">Uh-oh!</p>

		<p class="my-4 text-muted-foreground">We can't find that page. {page.error?.message}</p>

		<Button href="/">Go Back Home</Button>
	</div>
</div>
