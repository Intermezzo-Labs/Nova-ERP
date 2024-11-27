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
      <li>
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
          
          <!-- Tooltip for mobile -->
          <div class="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-sm
                      rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-200 pointer-events-none lg:hidden whitespace-nowrap">
            {item.label}
          </div>
        </a>
      </li>
    {/each}
  </ul>
</nav>
