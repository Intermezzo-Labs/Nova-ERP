<script lang="ts">
  import '../app.postcss';
  import Sidebar from '$lib/components/navigation/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
</script>

<div class="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
  <Sidebar />
  <main class="flex-1 flex flex-col w-full ml-[72px] lg:ml-64">
    <Header />
    <div class="flex-1 overflow-y-auto">
      <div class="p-4 sm:p-6 lg:p-8 mx-auto w-full max-w-7xl">
        <slot />
      </div>
    </div>
  </main>
</div>
