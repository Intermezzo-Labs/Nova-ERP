<script lang="ts">
	import Sidebar from './_components/sidebar.svelte';
</script>

<div class="flex h-full">
	<Sidebar class="w-64" />
	<div class="flex-1 border-l">
		<slot />
	</div>
</div>
