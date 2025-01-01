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

	type Props = { data: LayoutData; children: Snippet };
	let { data, children }: Props = $props();
</script>

<Toast />
<div class="h-screen w-screen overflow-hidden">
	<Menu
		email={data.user?.email ?? 'unknown'}
		class="flex"
		selectedCompanyId={data.currentCompanyId ?? ''}
		availableCompanies={data.companies}
	/>
	<div class="h-main-window flex divide-x overflow-hidden">
		<nav class={cn('hidden shrink-0 flex-col md:flex md:w-56')}>
			<div class={cn('flex items-center justify-center px-2 md:h-[52px] md:px-0')}>
				<CompanySwitcher
					selectedCompanyId={data.currentCompanyId ?? ''}
					availableCompanies={data.companies}
				/>
			</div>
			<Separator />
			<Nav routes={primaryRoutes} />
			<Separator />
			<Nav routes={secondaryRoutes} />
		</nav>
		<main class="h-full flex-1">
			{@render children()}
		</main>
	</div>
</div>
