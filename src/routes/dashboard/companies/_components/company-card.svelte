<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Settings, User } from 'lucide-svelte';
	import type { PageData } from '../$types';
	import { Badge } from '$lib/components/ui/badge';

	type Props = {
		company: PageData['companies'][0];
		onManageClick: () => void;
		onShareClick?: () => void;
	};
	let { company, onManageClick, onShareClick }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-start justify-between space-y-0 pb-2 lg:gap-4">
		<Card.Title class="whitespace-nowrap text-sm font-medium">
			{company.details.name}
		</Card.Title>
		<Card.Description class="lg:text-right">{company.details.description}</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<div>
			<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
				<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span>
				<div class="space-y-1">
					<p class="text-sm font-medium leading-none">Created</p>
					<p class="text-sm text-muted-foreground">
						{company.created_at}
					</p>
				</div>
			</div>
			{#if company.archived_at}
				<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
					<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span>
					<div class="space-y-1">
						<p class="text-sm font-medium leading-none">Archived</p>
						<p class="text-sm text-muted-foreground">
							{company.archived_at}
						</p>
					</div>
				</div>
			{/if}
			<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
				<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span>
				<div class="space-y-1">
					<p class="text-sm font-medium leading-none">Shared with</p>
					<div class="flex flex-wrap gap-2">
						{#each company.shared_with as user}
							<Badge variant="outline">
								<User class="mr-2 size-3" />
								{user}
							</Badge>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="flex-col gap-2">
		<Button class="w-full" variant="outline" size="lg" onclick={onManageClick}>
			<Settings class="mr-2 size-4" /> Manage
		</Button>
	</Card.Footer>
</Card.Root>
