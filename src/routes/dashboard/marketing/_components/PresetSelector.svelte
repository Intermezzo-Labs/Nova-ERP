<script lang="ts">
	import { tick } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { ChevronsUpDown, Check } from 'lucide-svelte';

	export let presets: any[];
	let open = false;

	let value = '';

	$: selectedValue = presets.find((f) => f.name === value)?.name ?? 'Load a preset...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
		>
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-full p-0 md:w-[200px] lg:w-[300px]">
		<Command.Root>
			<Command.Input placeholder="Search presets..." />
			<Command.List>
				<Command.Empty>No presets found.</Command.Empty>
				<Command.Group heading="Examples">
					{#each presets as preset}
						<Command.Item
							value={preset.name}
							class="aria-selected:bg-primary aria-selected:text-primary-foreground"
							onSelect={(currentValue) => {
								value = currentValue;
								closeAndFocusTrigger(ids.trigger);
							}}
						>
							{preset.name}
							<Check
								class={cn('ml-auto h-4 w-4', value === preset.name ? 'opacity-100' : 'opacity-0')}
							/>
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
