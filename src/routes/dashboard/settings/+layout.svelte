<script lang="ts">
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import SidebarNav from './_components/sidebar-nav.svelte';

	const sidebarNavItems = [
		{
			title: 'Profile',
			href: '/dashboard/settings'
		}
		// {
		// 	title: 'Account',
		// 	href: '/dashboard/settings/account'
		// },
		// {
		// 	title: 'Appearance',
		// 	href: '/dashboard/settings/appearance'
		// },
		// {
		// 	title: 'Notifications',
		// 	href: '/dashboard/settings/notifications'
		// },
		// {
		// 	title: 'Display',
		// 	href: '/dashboard/settings/display'
		// }
	];
</script>

<MainContainerLayout title="Settings">
	<div
		class="flex h-full flex-col space-y-8 overflow-auto p-4 lg:flex-row lg:space-x-12 lg:space-y-0"
	>
		<aside class="sticky top-0 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} class="overflow-auto" />
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			<slot />
		</div>
	</div>
</MainContainerLayout>
