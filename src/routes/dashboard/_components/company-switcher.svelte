<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils';
	import { Building } from 'lucide-svelte';
	import type { PageData } from '../$types';
	import { invalidateAll } from '$app/navigation';

	type Props = {
		selectedCompanyId: string;
		availableCompanies: PageData['companies'];
	};
	let { selectedCompanyId = $bindable(''), availableCompanies }: Props = $props();

	let selectedCompany = $derived(
		availableCompanies?.find((c) => c.id === selectedCompanyId)?.details.name ?? 'Select company'
	);

	const handleSelectedChange = async (id: string) => {
		const form = new FormData();
		form.append('id', id);
		await fetch('/dashboard/companies/?/select', { method: 'POST', body: form });
		await invalidateAll();
	};
</script>

<Select.Root
	type="single"
	value={selectedCompanyId}
	controlledValue
	onValueChange={handleSelectedChange}
>
	<Select.Trigger
		class={cn(
			'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0'
		)}
		aria-label="Select account"
	>
		<span class="pointer-events-none">
			<Building />
			<span class={cn('ml-2')}>
				{selectedCompany}
			</span>
		</span>
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each availableCompanies ?? [] as company}
				<Select.Item value={company.id} label={company.details.name}>
					<div
						class="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground"
					>
						<Building aria-hidden="true" class="size-4 shrink-0 text-foreground" />
						{company.details.name}
					</div>
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
