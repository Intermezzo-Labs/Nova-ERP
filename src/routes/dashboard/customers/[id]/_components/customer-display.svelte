<script lang="ts">
	import { DateFormatter, getDayOfWeek, getLocalTimeZone, now } from '@internationalized/date';

	import * as Avatar from '$lib/components/ui/avatar';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import {
		Archive,
		ArchiveX,
		Clock,
		EllipsisVertical,
		Forward,
		Reply,
		ReplyAll,
		Trash2
	} from 'lucide-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { customerNoteFormSchema, type CustomerNoteFormSchema } from '$lib/schemas/customer';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import type { Customer } from '../../+layout.server';
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	import { goto } from '$app/navigation';
	import EditCustomerDialog from './edit-customer-dialog.svelte';

	const {
		customer,
		noteForm
	}: {
		customer: Customer;
		noteForm: SuperValidated<Infer<CustomerNoteFormSchema>>;
	} = $props();

	const fullFormatter = new DateFormatter('en-US', {
		dateStyle: 'medium',
		timeStyle: 'medium'
	});

	const relativeFormatter = new DateFormatter('en-US', {
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h12'
	});
	let todayDate = $state(now(getLocalTimeZone()));

	function getClosestWeekend() {
		const dayOfWeek = getDayOfWeek(todayDate, 'en-US');
		if (dayOfWeek === 6) {
			return todayDate.toDate();
		}
		return todayDate.add({ days: 6 - dayOfWeek }).toDate();
	}

	const form = superForm(noteForm, {
		validators: zodClient(customerNoteFormSchema)
	});

	const { form: formData, enhance } = form;

	async function handleDelete() {
		const response = await fetch(`/dashboard/customers/${customer.id}`, {
			method: 'DELETE'
		});
		if (response.ok) goto('/dashboard/customers');
		alert(response.statusText);
	}

	let openEditDialog = $state(false);
</script>

{#snippet actions()}
	<div class="hidden items-center gap-2 md:flex">
		<Tooltip.Root openDelay={0} group>
			<Tooltip.Trigger
				id="archive_tooltip"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
				disabled={!customer}
			>
				<Archive class="size-4" />
				<span class="sr-only">Archive</span>
			</Tooltip.Trigger>
			<Tooltip.Content>Archive</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root openDelay={0} group>
			<Tooltip.Trigger
				id="move_to_junk_tooltip"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
				disabled={!customer}
			>
				<ArchiveX class="size-4" />
				<span class="sr-only">Move to junk</span>
			</Tooltip.Trigger>
			<Tooltip.Content>Move to junk</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root openDelay={0} group>
			<Tooltip.Trigger
				id="move_to_trash_tooltip"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
				onclick={handleDelete}
				disabled={!customer}
			>
				<Trash2 class="size-4" />
				<span class="sr-only">Move to trash</span>
			</Tooltip.Trigger>
			<Tooltip.Content>Move to trash</Tooltip.Content>
		</Tooltip.Root>
		<Separator orientation="vertical" class="mx-1 h-6" />
		<Tooltip.Root openDelay={0} group>
			<Popover.Root portal={null}>
				<Tooltip.Trigger asChild let:builder={tooltip_builder} id="snooze_popover">
					<Popover.Trigger asChild let:builder={popover_builder} id="snooze_popover">
						<Button
							builders={[tooltip_builder, popover_builder]}
							variant="ghost"
							size="icon"
							disabled={!customer}
						>
							<Clock class="size-4" />
							<span class="sr-only">Snooze</span>
						</Button>
					</Popover.Trigger>
				</Tooltip.Trigger>
				<Popover.Content class="flex w-[535px] p-0">
					<div class="flex flex-col gap-2 border-r px-2 py-4">
						<div class="px-4 text-sm font-medium">Snooze until</div>
						<div class="grid min-w-[250px] gap-1">
							<Button variant="ghost" class="justify-start font-normal">
								Later today
								<span class="ml-auto text-muted-foreground">
									{relativeFormatter.format(todayDate.add({ hours: 4 }).toDate())}
								</span>
							</Button>
							<Button variant="ghost" class="justify-start font-normal">
								Tomorrow
								<span class="ml-auto text-muted-foreground">
									{relativeFormatter.format(todayDate.add({ days: 1 }).toDate())}
								</span>
							</Button>
							<Button variant="ghost" class="justify-start font-normal">
								This weekend
								<span class="ml-auto text-muted-foreground">
									{relativeFormatter.format(getClosestWeekend())}
								</span>
							</Button>
							<Button variant="ghost" class="justify-start font-normal">
								Next week
								<span class="ml-auto text-muted-foreground">
									{relativeFormatter.format(todayDate.add({ weeks: 1 }).toDate())}
								</span>
							</Button>
						</div>
					</div>
					<div class="p-2">
						<Calendar bind:value={todayDate} initialFocus />
					</div>
				</Popover.Content>
			</Popover.Root>
			<Tooltip.Content>Snooze</Tooltip.Content>
		</Tooltip.Root>
	</div>
	<div class="ml-auto flex items-center gap-2">
		<Tooltip.Root openDelay={0} group>
			<Tooltip.Trigger
				id="reply_tooltip"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
				disabled={!customer}
			>
				<Reply class="size-4" />
				<span class="sr-only">Reply</span>
			</Tooltip.Trigger>
			<Tooltip.Content>Reply</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root openDelay={0} group>
			<Tooltip.Trigger
				id="reply_all_tooltip"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
				disabled={!customer}
			>
				<ReplyAll class="size-4" />
				<span class="sr-only">Reply all</span>
			</Tooltip.Trigger>
			<Tooltip.Content>Reply all</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root openDelay={0} group>
			<Tooltip.Trigger
				id="forward_tooltip"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
				disabled={!customer}
			>
				<Forward class="size-4" />
				<span class="sr-only">Forward</span>
			</Tooltip.Trigger>
			<Tooltip.Content>Forward</Tooltip.Content>
		</Tooltip.Root>
		<Separator orientation="vertical" class="mx-2 h-6" />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				id="more_options_dropdown"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
				disabled={!customer}
			>
				<EllipsisVertical class="size-4" />
				<span class="sr-only">More</span>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>Manage</DropdownMenu.Label>
				<DropdownMenu.Item onclick={() => (openEditDialog = true)}>Edit</DropdownMenu.Item>
				<DropdownMenu.Item onclick={handleDelete}>Delete</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Mark as unread</DropdownMenu.Item>
				<DropdownMenu.Item>Star thread</DropdownMenu.Item>
				<DropdownMenu.Item>Add label</DropdownMenu.Item>
				<DropdownMenu.Item>Mute thread</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{/snippet}

<MainContainerLayout {actions} class="flex-1">
	<div class="flex h-full flex-1 flex-col overflow-hidden">
		<div class="flex items-start p-4">
			<div class="flex items-start gap-4 text-sm">
				<Avatar.Root>
					<Avatar.Image alt={customer.details.name} />
					<Avatar.Fallback>
						{customer.details.name
							.split(' ')
							.map((chunk) => chunk[0])
							.join('')}
					</Avatar.Fallback>
				</Avatar.Root>
				<div class="grid gap-1">
					<div class="font-semibold">{customer.details.name}</div>
					<div class="line-clamp-1 text-xs">[subject]</div>
					<div class="line-clamp-1 text-xs">
						<span class="font-medium">Reply-To:</span>
						{customer.details.email}
					</div>
				</div>
			</div>
			{#if customer.created_at}
				<div class="ml-auto text-xs text-muted-foreground">
					{fullFormatter.format(new Date(customer.created_at))}
				</div>
			{/if}
		</div>
		<Separator />
		{#if customer.customer_note.length}
			<div class="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
				{#each customer.customer_note as note}
					<article>
						<header class="text-xs text-muted-foreground"><time>{note.created_at}</time></header>
						<main class="whitespace-pre-wrap"><p>{note.note}</p></main>
					</article>
				{/each}
			</div>
		{:else}
			<div class="p-8 text-center text-muted-foreground"><p>No notes for this customer</p></div>
		{/if}
		<Separator class="mt-auto" />
		<div class="p-4">
			<form method="POST" use:enhance action="?/create-note">
				<div class="grid gap-4">
					<Form.Field {form} name="note" autofocus>
						<Form.Control let:attrs>
							<Form.Label hidden>Note</Form.Label>
							<Textarea
								{...attrs}
								required
								bind:value={$formData.note}
								class="p-4"
								placeholder={`Reply to ${customer.details.name}...`}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<div class="flex items-center">
						<Label for="mute" class="flex items-center gap-2 text-xs font-normal">
							<Switch id="mute" aria-label="Mute thread" /> Mute this thread
						</Label>
						<Button size="sm" class="ml-auto" type="submit">Save</Button>
					</div>
				</div>
			</form>
		</div>
	</div>
</MainContainerLayout>

<EditCustomerDialog
	data={{
		id: customer.id,
		name: customer.details.name,
		email: customer.details.email,
		phone: customer.details.phone
	}}
	open={openEditDialog}
/>
