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

	const buildMenuItem = (basePath: string) => (label: string, slug: string, badge?: number) =>
		({
			id: slug,
			name: label,
			badge,
			route: `${basePath}/${slug}`
		}) satisfies MenuItem;

	const buildCrmMenuItem = buildMenuItem('/dashboard/modules/crm');
	const crmMenuItems: MenuItem[] = [
		buildCrmMenuItem('Contacts', 'contacts'),
		buildCrmMenuItem('Companies', 'companies'),
		buildCrmMenuItem('Deals', 'deals'),
		buildCrmMenuItem('Tickets', 'tickets', 3),
		buildCrmMenuItem('Lists', 'lists'),
		buildCrmMenuItem('Inbox', 'inbox', 12),
		buildCrmMenuItem('Calls', 'calls'),
		buildCrmMenuItem('Tasks', 'tasks', 5)
	];

	const buildBaseModuleMenuItem = buildMenuItem('/dashboard/modules');
	const templatesMenuItems: MenuItem[] = [
		buildBaseModuleMenuItem('Business Cards', 'business-card'),
		buildBaseModuleMenuItem('Invoices', 'invoices'),
		buildBaseModuleMenuItem('Websites', 'websites')
	];

	const navItems: NavItem[] = [
		{ label: 'Dashboard', href: '/dashboard', icon: '📊' },
		{ label: 'CRM', href: '/dashboard/modules/crm', icon: '👥', submenu: crmMenuItems },
		{
			label: 'Templates',
			href: '/dashboard/modules/templates',
			icon: '📇',
			submenu: templatesMenuItems
		},
		{ label: 'AI Agents', href: '/dashboard/modules/ai-agent', icon: '🤖' }
	];
</script>

<nav
	class="fixed bottom-0 z-50 h-16 w-full border-t border-white/10
            bg-gradient-to-b from-slate-900 to-slate-800 backdrop-blur-sm transition-all duration-300
            lg:fixed lg:bottom-auto lg:h-screen lg:w-64 lg:border-r lg:border-t-0"
>
	<div class="hidden p-4 lg:block lg:p-8">
		<h2
			class="bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent"
		>
			Nova ERP
		</h2>
	</div>

	<!-- Mobile navigation -->
	<div class="flex h-full lg:hidden">
		<ul class="flex w-full items-center justify-around px-4">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="group flex flex-col items-center rounded-lg p-2 text-white/80
                   transition-all duration-200 hover:text-white"
					>
						<span class="text-xl">{item.icon}</span>
						<span class="mt-1 text-xs">{item.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Desktop navigation -->
	<ul class="hidden flex-col space-y-1 p-4 lg:flex">
		{#each navItems as item}
			<li class="group relative">
				<a
					href={item.href}
					class="flex items-center rounded-lg px-2 py-3 text-white/80 transition-all duration-200 hover:translate-x-1
                 hover:bg-white/10 hover:text-white lg:space-x-3 lg:px-4
                 {$page.url.pathname === item.href
						? 'bg-white/20 text-white shadow-sm'
						: 'hover:text-white'}
                 group"
				>
					<span class="w-12 text-center text-2xl lg:w-auto lg:text-left lg:text-lg"
						>{item.icon}</span
					>
					<span class="hidden font-medium lg:block">{item.label}</span>
				</a>

				{#if item.submenu}
					<div
						class="invisible absolute left-full top-0 ml-2 opacity-0 transition-all
                      duration-200 group-hover:visible group-hover:opacity-100"
					>
						<div
							class="overflow-hidden rounded-xl border border-gray-100 bg-white
                        shadow-lg dark:border-gray-700 dark:bg-slate-800"
						>
							<CRMenu menuItems={item.submenu} />
						</div>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
