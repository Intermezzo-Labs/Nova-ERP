<script lang="ts">
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { Snippet } from 'svelte';
	import { novaUserProfileFormSchema, userRoleEnum, userStatusEnum } from '$lib/schemas/nova-user';

	interface Props {
		data: SuperValidated<Infer<typeof novaUserProfileFormSchema>>;
		logo: Snippet;
	}
	let { data, logo }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(novaUserProfileFormSchema)
	});

	const { form: formData, enhance } = form;

	let logoUrl: string | null = $state(null);
	const selectLogoFile = async (event: any) => {
		if (!event.currentTarget.files) return;
		const [file] = event.currentTarget.files;
		logoUrl = URL.createObjectURL(file);
	};

	const selectedRole = $derived(
		userRoleEnum.options.find((f) => f === $formData.role) ?? 'Select a fruit'
	);
	const selectedStatus = $derived(
		userStatusEnum.options.find((f) => f === $formData.status) ?? 'Select a status'
	);
</script>

<form method="POST" class="space-y-8" use:enhance enctype="multipart/form-data">
	<Form.Field {form} name="firstName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>First Name</Form.Label>
				<Input {...props} bind:value={$formData.firstName} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="lastName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Last Name</Form.Label>
				<Input {...props} bind:value={$formData.lastName} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input type="email" {...props} bind:value={$formData.email} />
			{/snippet}
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
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Company Logo</Form.Label>
					<Input
						{...props}
						bind:value={$formData.logoFile}
						type="file"
						accept="image/*"
						onchange={selectLogoFile}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</fieldset>

	<Form.Field {form} name="company">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Company</Form.Label>
				<Input {...props} bind:value={$formData.company} />
			{/snippet}
		</Form.Control>
		<Form.Description>Optional: Enter your company name</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="phone">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Phone</Form.Label>
				<Input type="tel" {...props} bind:value={$formData.phone} />
			{/snippet}
		</Form.Control>
		<Form.Description>Optional: Enter your phone number</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="address">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Address</Form.Label>
				<Textarea {...props} bind:value={$formData.address} />
			{/snippet}
		</Form.Control>
		<Form.Description>Optional: Enter your address</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="role">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Role</Form.Label>
				<Select.Root type="single" bind:value={$formData.role}>
					<Select.Trigger {...props}>
						{selectedRole}
					</Select.Trigger>
					<Select.Content>
						{#each userRoleEnum.options as role}
							<Select.Item value={role} label={role} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="status">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Status</Form.Label>
				<Select.Root type="single" value={$formData.status}>
					<Select.Trigger {...props}>{selectedStatus}</Select.Trigger>
					<Select.Content>
						{#each userStatusEnum.options as status}
							<Select.Item value={status} label={status} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Button type="submit">Save preferences</Button>
</form>
