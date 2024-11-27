<script>
  import Header from '$lib/components/Header.svelte';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import ActionCard from '$lib/components/ActionCard.svelte';

  let actions = [
    {
      title: 'Recommended: All you need to get started',
      subtitle: 'Set up the basics',
      description: 'Import your contacts, invite teammates, and understand properties.',
      progress: 83,
      time: 'About 2 minutes left',
    },
    {
      title: 'Close more deals faster with Sales Hub',
      subtitle: 'Track your deals in one place',
      description: 'Create a custom pipeline and never lose track of a sale again.',
      progress: 0,
      time: 'About 4 minutes left',
    },
  ];
</script>

<div class="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
  <main class="flex-1 flex flex-col w-full ml-[72px] lg:ml-64">
    <Header />
    <div class="flex-1 overflow-y-auto">
      <div class="p-4 sm:p-6 lg:p-8 mx-auto w-full max-w-7xl">
        <div class="max-w-5xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          <ProgressBar progress="38" label="Your Sales tools progress" />
          <div class="grid gap-4 sm:gap-6">
            {#each actions as action}
              <ActionCard {action} />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
