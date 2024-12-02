<script lang="ts" module>
	import { z } from 'zod';
	import { userRoles, userStatuses, type NovaUserPreferences } from '$lib/types/user';

	export const preferencesFormSchema = z.object({
		firstName: z.string().min(2, 'First name must be at least 2 characters.'),
		lastName: z.string().min(2, 'Last name must be at least 2 characters.'),
		email: z.string().email('Please enter a valid email address'),
		company: z.string().optional(),
		phone: z.string().optional(),
		address: z.string().optional(),
		role: z.enum(userRoles),
		status: z.enum(userStatuses),
		logoFile: z.custom<File>().optional()
	});
	export type PreferencesFormSchema = typeof preferencesFormSchema;
	preferencesFormSchema._output satisfies NovaUserPreferences;
</script>

<script lang="ts">
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { FormInputEvent } from '$lib/components/ui/input';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';

	interface Props {
		data: SuperValidated<Infer<PreferencesFormSchema>>;
		logo: Snippet;
	}
	let { data, logo }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(preferencesFormSchema)
	});

	const { form: formData, enhance } = form;

	let logoUrl: string | null = $state(null);
	const selectLogoFile = async (event: FormInputEvent) => {
		if (!event.currentTarget.files) return;
		const [file] = event.currentTarget.files;
		logoUrl = URL.createObjectURL(file);
	};
</script>

<form method="POST" class="space-y-8" use:enhance enctype="multipart/form-data">
	<Form.Field {form} name="firstName">
		<Form.Control let:attrs>
			<Form.Label>First Name</Form.Label>
			<Input {...attrs} bind:value={$formData.firstName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="lastName">
		<Form.Control let:attrs>
			<Form.Label>Last Name</Form.Label>
			<Input {...attrs} bind:value={$formData.lastName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input type="email" {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<fieldset class="space-y-4">
		<picture>
			{#if logoUrl}
				<img src={logoUrl} alt="logo" class="h-48 object-contain" />
			{:else if logo}
				{@render logo()}
			{/if}</picture
		>
		<Form.Field {form} name="logoFile">
			<Form.Control let:attrs>
				<Form.Label>Company Logo</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.logoFile}
					type="file"
					accept="image/*"
					on:change={selectLogoFile}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</fieldset>

	<Form.Field {form} name="company">
		<Form.Control let:attrs>
			<Form.Label>Company</Form.Label>
			<Input {...attrs} bind:value={$formData.company} />
		</Form.Control>
		<Form.Description>Optional: Enter your company name</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="phone">
		<Form.Control let:attrs>
			<Form.Label>Phone</Form.Label>
			<Input type="tel" {...attrs} bind:value={$formData.phone} />
		</Form.Control>
		<Form.Description>Optional: Enter your phone number</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="address">
		<Form.Control let:attrs>
			<Form.Label>Address</Form.Label>
			<Textarea {...attrs} bind:value={$formData.address} />
		</Form.Control>
		<Form.Description>Optional: Enter your address</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="role">
		<Form.Control let:attrs>
			<Form.Label>Role</Form.Label>
			<Select.Root
				selected={{ value: $formData.role, label: $formData.role }}
				onSelectedChange={(s) => s && ($formData.role = s.value)}
			>
				<Select.Input name={attrs.name} />
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a role" />
				</Select.Trigger>
				<Select.Content>
					{#each userRoles as role}
						<Select.Item value={role} label={role} />
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="status">
		<Form.Control let:attrs>
			<Form.Label>Status</Form.Label>
			<Select.Root
				selected={{ value: $formData.status, label: $formData.status }}
				onSelectedChange={(s) => s && ($formData.status = s.value)}
			>
				<Select.Input name={attrs.name} />
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a status" />
				</Select.Trigger>
				<Select.Content>
					{#each userStatuses as status}
						<Select.Item value={status} label={status} />
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Button type="submit">Save preferences</Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
