<script lang="ts">
  interface StatCard {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
  }

  const stats: StatCard[] = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up' },
    { title: 'Active Users', value: '2,338', change: '+15.3%', trend: 'up' },
    { title: 'Pending Orders', value: '12', change: '-2.3%', trend: 'down' },
    { title: 'Customer Satisfaction', value: '98%', change: '+4.4%', trend: 'up' }
  ];
</script>

<div class="space-y-8">
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold text-primary">Dashboard</h1>
    <div class="flex space-x-4">
      <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
        New Report
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each stats as stat}
      <div class="p-6 bg-card rounded-xl border border-border">
        <h3 class="text-sm font-medium text-muted-foreground">{stat.title}</h3>
        <p class="text-2xl font-bold mt-2 text-primary">{stat.value}</p>
        <p class="mt-2 text-sm {stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}">
          {stat.change}
        </p>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="p-6 bg-card rounded-xl border border-border">
      <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
      <!-- Add activity content -->
    </div>
    
    <div class="p-6 bg-card rounded-xl border border-border">
      <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
      <!-- Add quick actions -->
    </div>
  </div>
</div>
