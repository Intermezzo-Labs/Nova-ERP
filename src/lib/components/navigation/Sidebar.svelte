<script lang="ts">
  import { page } from '$app/stores';
  import CRMenu from './Menu.svelte';
  import type { MenuItem } from '$lib/types/navigation';
  
  interface NavItem {
    label: string;
    href: string;
    icon: string;
    submenu?: MenuItem[];
  }

  const crmMenuItems: MenuItem[] = [
    { id: 'contacts', name: 'Contacts', route: '/modules/crm/contacts' },
    { id: 'companies', name: 'Companies', route: '/modules/crm/companies' },
    { id: 'deals', name: 'Deals', route: '/modules/crm/deals' },
    { id: 'tickets', name: 'Tickets', route: '/modules/crm/tickets', badge: 3 },
    { id: 'lists', name: 'Lists', route: '/modules/crm/lists' },
    { id: 'inbox', name: 'Inbox', route: '/modules/crm/inbox', badge: 12 },
    { id: 'calls', name: 'Calls', route: '/modules/crm/calls' },
    { id: 'tasks', name: 'Tasks', route: '/modules/crm/tasks', badge: 5 }
  ];

  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'CRM', href: '/modules/crm', icon: '👥', submenu: crmMenuItems },
    { label: 'Business Cards', href: '/modules/business-card', icon: '📇' },
    { label: 'Settings', href: '/settings', icon: '⚙️' }
  ];
</script>

<nav class="fixed bottom-0 lg:bottom-auto h-16 lg:h-screen w-full lg:w-64 
            bg-gradient-to-b from-slate-900 to-slate-800 border-t lg:border-t-0 lg:border-r 
            border-white/10 backdrop-blur-sm z-50 lg:fixed transition-all duration-300">
  
  <div class="p-4 lg:p-8 hidden lg:block">
    <h2 class="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
      Nova ERP
    </h2>
  </div>
  
  <!-- Mobile navigation -->
  <div class="lg:hidden flex h-full">
    <ul class="flex justify-around items-center w-full px-4">
      {#each navItems as item}
        <li>
          <a
            href={item.href}
            class="flex flex-col items-center p-2 rounded-lg transition-all duration-200
                   text-white/80 hover:text-white group"
          >
            <span class="text-xl">{item.icon}</span>
            <span class="text-xs mt-1">{item.label}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Desktop navigation -->
  <ul class="hidden lg:flex flex-col space-y-1 p-4">
    {#each navItems as item}
      <li class="relative group">
        <a
          href={item.href}
          class="flex items-center lg:space-x-3 px-2 lg:px-4 py-3 rounded-lg transition-all duration-200
                 hover:bg-white/10 text-white/80 hover:text-white hover:translate-x-1
                 {$page.url.pathname === item.href ? 
                   'bg-white/20 text-white shadow-sm' : 
                   'hover:text-white'}
                 group"
        >
          <span class="text-2xl lg:text-lg w-12 lg:w-auto text-center lg:text-left">{item.icon}</span>
          <span class="font-medium hidden lg:block">{item.label}</span>
        </a>

        {#if item.submenu}
          <div class="absolute left-full top-0 ml-2 invisible group-hover:visible opacity-0 
                      group-hover:opacity-100 transition-all duration-200">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden 
                        border border-gray-100 dark:border-gray-700">
              <CRMenu menuItems={item.submenu} />
            </div>
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</nav>
