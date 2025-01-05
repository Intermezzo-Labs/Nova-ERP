<script lang="ts">
	import type { ActionData, SubmitFunction } from './$types.js';
	import UserAuthForm from './_components/user-auth-form.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { LucideOctagonMinus, Mail } from 'lucide-svelte';
	import UserWeb3Form from './_components/user-web3-form.svelte';

	export let form: ActionData;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			update();
			loading = false;
		};
	};
</script>

<div
	class="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div class="absolute inset-0 bg-cover"></div>
		<div class="relative z-20 flex items-center text-lg font-medium">Nova ERP</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-4xl font-light">Your Business, Simplified.</p>
				<p class="text-lg">
					Powered by cutting-edge AI and LLM technology, Nova ERP simplifies inventory management
					and customer relationships, freeing you to focus on growth
				</p>
			</blockquote>
		</div>
	</div>
	<div class="flex h-full items-center lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			{#if form?.success}
				<Alert.Root>
					<Mail class="h-4 w-4" />
					<Alert.Title>Heads up!</Alert.Title>
					<Alert.Description>
						{form?.message}
					</Alert.Description>
				</Alert.Root>
			{:else}
				<div class="flex flex-col space-y-2 text-center">
					<h1 class="text-2xl font-semibold tracking-tight">Login to Nova (demo)</h1>
					<p class="text-sm text-muted-foreground">Sign in via magic link with your email below</p>
				</div>
				<UserAuthForm isLoading={loading} onSubmit={handleSubmit} />
				{#if form?.errors?.email}
					<Alert.Root variant="destructive">
						<LucideOctagonMinus class="size-5" />
						<Alert.Title>Error</Alert.Title>
						<Alert.Description>{form.errors.email}</Alert.Description>
					</Alert.Root>
					<span class="error flex items-center text-sm">
						{form?.errors?.email}
					</span>
				{/if}
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t"></span>
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
					</div>
				</div>
				<UserWeb3Form {loading} />
				<p class="px-8 text-center text-sm text-muted-foreground">
					By clicking continue, you agree to our
					<a href="/terms" class="underline underline-offset-4 hover:text-primary">
						Terms of Service
					</a>
					and
					<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
						Privacy Policy
					</a>
					.
				</p>
			{/if}
		</div>
	</div>
</div>
