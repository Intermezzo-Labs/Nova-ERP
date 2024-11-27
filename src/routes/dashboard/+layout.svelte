<script lang="ts">
  import Sidebar from '$lib/components/navigation/Sidebar.svelte';
</script>

<div class="flex min-h-screen bg-background">
  <Sidebar />
  
  <main class="flex-1 p-6">
    <slot />
  </main>
</div>
