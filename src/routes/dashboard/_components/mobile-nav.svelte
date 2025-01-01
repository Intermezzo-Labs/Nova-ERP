<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Menu } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { primaryRoutes, secondaryRoutes } from '../config';
	import CompanySwitcher from './company-switcher.svelte';
	import Nav from './nav.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { PageData } from '../$types';
	import type { HTMLAttributes } from 'svelte/elements';
	import { page } from '$app/state';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	type Props = {
		class: $$Props['class'];
		selectedCompanyId: string;
		availableCompanies: PageData['companies'];
	};
	const { class: className, availableCompanies, selectedCompanyId }: Props = $props();

	$effect(() => {
		if (page.route.id) open = false;
	});
	let open = $state(false);
</script>

<div class={cn(className)}>
	<Sheet.Root bind:open>
		<Sheet.Trigger class={buttonVariants({ variant: 'ghost' })}>
			<Menu class="size-4" />
		</Sheet.Trigger>
		<Sheet.Content side="right">
			<Sheet.Header>
				<Sheet.Title>Navigation</Sheet.Title>
				<Sheet.Description>
					<div class={cn('flex items-center justify-center px-2')}>
						<CompanySwitcher selectedCompanyId={selectedCompanyId ?? ''} {availableCompanies} />
					</div>
				</Sheet.Description>
			</Sheet.Header>
			<nav class={cn('flex flex-col')}>
				<Nav routes={primaryRoutes} />
				<Separator />
				<Nav routes={secondaryRoutes} />
			</nav>
			<Sheet.Footer>
				<Sheet.Close class={buttonVariants({ variant: 'outline' })}>Close</Sheet.Close>
			</Sheet.Footer>
		</Sheet.Content>
	</Sheet.Root>
</div>
