<script lang="ts">
	import type { MenuItem } from '$lib/types/navigation';

	const menuItems: MenuItem[] = [
		{ id: 'contacts', name: 'Contacts', route: '/crm/contacts' },
		{ id: 'companies', name: 'Companies', route: '/crm/companies' },
		{ id: 'deals', name: 'Deals', route: '/crm/deals' },
		{ id: 'tickets', name: 'Tickets', route: '/crm/tickets', badge: 3 },
		{ id: 'lists', name: 'Lists', route: '/crm/lists' },
		{ id: 'inbox', name: 'Inbox', route: '/crm/inbox', badge: 12 },
		{ id: 'calls', name: 'Calls', route: '/crm/calls' },
		{ id: 'tasks', name: 'Tasks', route: '/crm/tasks', badge: 5 }
	];
</script>

<div class="flex min-h-screen">
	<main class="flex-1">
		<slot />
	</main>
</div>
