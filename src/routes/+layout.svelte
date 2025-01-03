<script>
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		// Set dark mode as default
		document.documentElement.dataset.mode = 'dark';

		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<ModeWatcher />
{@render children()}
