<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let searchQuery = '';
  let isDark = false;

  onMount(() => {
    // Check system preference on mount
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
  });

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
  }
</script>

<header class="bg-gradient-to-r from-background/30 via-background/60 to-background/30 backdrop-blur-xl border-b border-border/5 sticky top-0 z-10">
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between p-4 sm:p-6 lg:p-8">
      <!-- Mobile search button -->
      <button class="md:hidden p-2 hover:bg-muted/50 rounded-xl">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <div class="flex items-center space-x-4 flex-1 mx-4">
      <div class="relative max-w-md w-full hidden md:block">
        <input
          bind:value={searchQuery}
          type="text"
          placeholder="Search anything..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border/10 
                 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-300
                 placeholder:text-muted-foreground/50"
        />
        <svg 
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 w-4 h-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    
    <div class="flex items-center space-x-2">
      <!-- Theme Toggle -->
      <button 
        on:click={toggleTheme}
        class="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-300 hover:scale-105"
        aria-label="Toggle theme"
      >
        {#if isDark}
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else}
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {/if}
      </button>

      <!-- Notifications -->
      <button 
        class="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-300 hover:scale-105 relative"
        aria-label="Notifications"
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
      </button>

      <!-- Avatar -->
      <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/80 via-blue-500/80 to-violet-500/80 
                  text-primary-foreground flex items-center justify-center font-medium
                  shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer
                  backdrop-blur-sm">
        <span class="text-sm font-semibold">SA</span>
      </div>
    </div>
  </div>
</header>
