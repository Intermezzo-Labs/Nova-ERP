<script lang="ts">
  import { page } from '$app/stores';
  
  interface NavItem {
    label: string;
    href: string;
    icon: string;
  }

  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Business Cards', href: '/modules/business-card', icon: '📇' },
    { label: 'CRM', href: '/modules/crm', icon: '👥' },
    { label: 'Settings', href: '/settings', icon: '⚙️' }
  ];
</script>

<nav class="h-screen w-64 bg-card border-r border-border">
  <div class="p-4">
    <h2 class="text-2xl font-bold text-primary">Nova ERP</h2>
  </div>
  
  <ul class="space-y-2 p-4">
    {#each navItems as item}
      <li>
        <a
          href={item.href}
          class="flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
                 hover:bg-accent hover:text-accent-foreground
                 {$page.url.pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}"
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>
