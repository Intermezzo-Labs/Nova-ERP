<script lang="ts">
	import { primaryRoutes, secondaryRoutes } from './config';
	import { cn } from '$lib/utils';
	import { Separator } from '$lib/components/ui/select';
	import Menu from './_components/menu.svelte';
	import AccountSwitcher from './_components/account-switcher.svelte';
	import Nav from './_components/nav.svelte';

	import { accounts } from './customers/[id]/data';
	import Toast from '$lib/components/ui/toast/Toast.svelte';
	export let defaultCollapsed = false;

	let isCollapsed = defaultCollapsed;
</script>

<Toast />
<div class="sm:h-screen sm:w-screen sm:overflow-hidden">
	<Menu class="hidden sm:flex" />
	<div class="sm:h-main-window divide-x sm:flex sm:overflow-hidden">
		<nav class="hidden shrink-0 sm:block sm:w-56">
			<div
				class={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}
			>
				<AccountSwitcher {isCollapsed} {accounts} />
			</div>
			<Separator />
			<Nav {isCollapsed} routes={primaryRoutes} />
			<Separator />
			<Nav {isCollapsed} routes={secondaryRoutes} />
		</nav>
		<main class="sm:h-full sm:flex-1">
			<slot />
		</main>
	</div>
</div>
