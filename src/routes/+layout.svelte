<!-- // src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.postcss';
  import { onMount } from 'svelte';
  
  let mounted = false;
  let theme = 'dark';
  
  onMount(() => {
    mounted = true;
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', prefersDark);
  });

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
  }
</script>

<svelte:head>
  <title>Nova - Open Source ERP Platform</title>
  <meta name="description" content="Transform your business with Nova ERP, the open source platform featuring AI-powered insights and seamless integrations for unparalleled efficiency." />
  <meta name="theme-color" content={theme === 'dark' ? '#1a1a1a' : '#ffffff'} />
</svelte:head>

<div class="min-h-screen bg-background transition-colors duration-300">
  <slot />
</div>
