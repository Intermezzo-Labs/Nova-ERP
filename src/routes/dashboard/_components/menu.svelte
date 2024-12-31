<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	type Props = {
		email: string;
		class: $$Props['class'];
		selectedCompanyId: string;
		availableCompanies: PageData['companies'];
	};

	let {
		email,
		class: className,
		selectedCompanyId = $bindable(''),
		availableCompanies,
		...restProps
	}: Props = $props();

	type MenuItem = {
		label: string;
		shortcut?: string;
		handleClick?: () => void;
		separator?: boolean;
		children?: MenuItem[];
	};
	const novaErp: MenuItem[] = [
		{
			label: email,
			separator: true
		},
		{
			label: 'Settings',
			handleClick: () => goto('/dashboard/settings'),
			separator: true
		},
		{
			label: 'Logout',
			handleClick: () => goto('/auth/logout')
		}
	];
</script>

<Menubar.Root
	class={cn('rounded-none border-x-0 border-b border-t-0 px-2 lg:px-4', className)}
	{...restProps}
>
	<Menubar.Menu>
		<Menubar.Trigger class="font-bold">Nova ERP</Menubar.Trigger>
		<Menubar.Content>
			{#each novaErp as item}
				<Menubar.Item onclick={item.handleClick}>
					{item.label}
					{#if item.shortcut}
						<Menubar.Shortcut>{item.shortcut}</Menubar.Shortcut>
					{/if}
				</Menubar.Item>
				{#if item.separator}
					<Menubar.Separator />
				{/if}
			{/each}
		</Menubar.Content>
	</Menubar.Menu>
	<!-- <Menubar.Menu>
		<Menubar.Trigger class="relative">File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Sub>
				<Menubar.SubTrigger>New</Menubar.SubTrigger>
				<Menubar.SubContent class="w-[230px]">
					<Menubar.Item>
						Playlist <Menubar.Shortcut>⌘N</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item disabled>
						Playlist from Selection <Menubar.Shortcut>⇧⌘N</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item>
						Smart Playlist... <Menubar.Shortcut>⌥⌘N</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item>Playlist Folder</Menubar.Item>
					<Menubar.Item disabled>Genius Playlist</Menubar.Item>
				</Menubar.SubContent>
			</Menubar.Sub>
			<Menubar.Item>
				Open Stream URL... <Menubar.Shortcut>⌘U</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				Close Window <Menubar.Shortcut>⌘W</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Sub>
				<Menubar.SubTrigger>Library</Menubar.SubTrigger>
				<Menubar.SubContent>
					<Menubar.Item>Update Cloud Library</Menubar.Item>
					<Menubar.Item>Update Genius</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item>Organize Library...</Menubar.Item>
					<Menubar.Item>Export Library...</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item>Import Playlist...</Menubar.Item>
					<Menubar.Item disabled>Export Playlist...</Menubar.Item>
					<Menubar.Item>Show Duplicate Items</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item>Get Album Artwork</Menubar.Item>
					<Menubar.Item disabled>Get Track Names</Menubar.Item>
				</Menubar.SubContent>
			</Menubar.Sub>
			<Menubar.Item>
				Import... <Menubar.Shortcut>⌘O</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>Burn Playlist to Disc...</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				Show in Finder <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>Convert</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>Page Setup...</Menubar.Item>
			<Menubar.Item disabled>
				Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item disabled>
				Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item disabled>
				Cut <Menubar.Shortcut>⌘X</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Copy <Menubar.Shortcut>⌘C</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Paste <Menubar.Shortcut>⌘V</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				Select All <Menubar.Shortcut>⌘A</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Deselect All <Menubar.Shortcut>⇧⌘A</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				Smart Dictation...
				<Menubar.Shortcut>
					<Mic class="h-4 w-4" />
				</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				Emoji & Symbols
				<Menubar.Shortcut>
					<Smile class="h-4 w-4" />
				</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.CheckboxItem>Show Playing Next</Menubar.CheckboxItem>
			<Menubar.CheckboxItem checked>Show Lyrics</Menubar.CheckboxItem>
			<Menubar.Separator />
			<Menubar.Item inset disabled>Show Status Bar</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item inset>Hide Sidebar</Menubar.Item>
			<Menubar.Item disabled inset>Enter Full Screen</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu> -->
	<Menubar.Menu>
		<Menubar.Trigger class="hidden md:block">Account</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				<Menubar.GroupHeading inset>Switch Account</Menubar.GroupHeading>
				<Menubar.Separator />
				<Menubar.RadioGroup value={selectedCompanyId}>
					{#each availableCompanies ?? [] as company}
						<Menubar.RadioItem value={String(company.id)}>{company.details.name}</Menubar.RadioItem>
					{/each}
				</Menubar.RadioGroup>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Item inset onclick={() => goto('/dashboard/companies')}>
				Manage Company...
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item inset onclick={() => goto('/dashboard/companies')}>Add Company...</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
