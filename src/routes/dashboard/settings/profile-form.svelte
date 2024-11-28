<script lang="ts" context="module">
    import { z } from 'zod';
    import type { UserRole, UserStatus } from '$lib/types/user';

    export const profileFormSchema = z.object({
        firstName: z.string().min(2, 'First name must be at least 2 characters.'),
        lastName: z.string().min(2, 'Last name must be at least 2 characters.'),
        email: z.string().email('Please enter a valid email address'),
        company: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        role: z.enum(['Admin', 'Manager', 'User'] as const),
        status: z.enum(['Active', 'Inactive'] as const)
    });
    export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
    import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { browser } from '$app/environment';
    import * as Form from '$lib/components/ui/form';
    import * as Select from '$lib/components/ui/select';
    import Input from '$lib/components/ui/input/input.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import Textarea from '$lib/components/ui/textarea/textarea.svelte';

    export let data: SuperValidated<Infer<ProfileFormSchema>>;

    const form = superForm(data, {
        validators: zodClient(profileFormSchema)
    });

    const { form: formData, enhance } = form;

    const roles: UserRole[] = ['Admin', 'Manager', 'User'];
    const statuses: UserStatus[] = ['Active', 'Inactive'];
</script>

<form method="POST" class="space-y-8" use:enhance>
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
                onSelectedChange={(s) => s && ($formData.role = s.value as UserRole)}
            >
                <Select.Trigger {...attrs}>
                    <Select.Value placeholder="Select a role" />
                </Select.Trigger>
                <Select.Content>
                    {#each roles as role}
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
                onSelectedChange={(s) => s && ($formData.status = s.value as UserStatus)}
            >
                <Select.Trigger {...attrs}>
                    <Select.Value placeholder="Select a status" />
                </Select.Trigger>
                <Select.Content>
                    {#each statuses as status}
                        <Select.Item value={status} label={status} />
                    {/each}
                </Select.Content>
            </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Button type="submit">Save Profile</Button>
</form>
