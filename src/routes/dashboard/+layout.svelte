<script lang="ts">
	import { primaryRoutes, secondaryRoutes } from './config';
	import { cn } from '$lib/utils';
	import { Separator } from '$lib/components/ui/select';
	import Menu from './_components/menu.svelte';
	import CompanySwitcher from './_components/company-switcher.svelte';
	import Nav from './_components/nav.svelte';

	import Toast from '$lib/components/ui/toast/Toast.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Maximize2 } from 'lucide-svelte';

	type Props = { data: LayoutData; children: Snippet; defaultCollapsed: boolean };
	let { data, children, defaultCollapsed = true }: Props = $props();

	let isCollapsed = $state(defaultCollapsed);

	const handleCollapse = async () => {
		isCollapsed = !isCollapsed;
	};
</script>

<Toast />
<div class="h-screen w-screen overflow-hidden">
	<Menu
		class="flex"
		selectedCompanyId={data.currentCompanyId ?? ''}
		availableCompanies={data.companies}
	/>
	<div class="h-main-window flex divide-x overflow-hidden">
		<nav class={cn('flex shrink-0 flex-col', isCollapsed ? '' : 'md:w-56')}>
			<div
				class={cn(
					'flex items-center justify-center md:h-[52px] md:px-0',
					isCollapsed ? 'h-[52px]' : 'px-2'
				)}
			>
				<CompanySwitcher
					{isCollapsed}
					selectedCompanyId={data.currentCompanyId ?? ''}
					availableCompanies={data.companies}
				/>
			</div>
			<Separator />
			<Nav {isCollapsed} routes={primaryRoutes} />
			<Separator />
			<Nav {isCollapsed} routes={secondaryRoutes} />
			<Button
				variant="ghost"
				size="icon"
				class="mx-auto mb-4 mt-auto md:hidden"
				onclick={handleCollapse}
			>
				<Maximize2 class="size-4" />
			</Button>
		</nav>
		<main class="h-full flex-1">
			{@render children()}
		</main>
	</div>
</div>
