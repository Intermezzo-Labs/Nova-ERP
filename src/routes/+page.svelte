<script lang="ts">
	import type { ActionData, SubmitFunction } from './$types.js';
	import UserAuthForm from '$lib/components/UserAuthForm.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Mail } from 'lucide-svelte';

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
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
		></div>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			Nova ERP
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;This library has saved me countless hours of work and helped me deliver stunning
					designs to my clients faster than ever before. Highly recommended!&rdquo;
				</p>
				<footer class="text-sm">Sofia Davis</footer>
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
					<h1 class="text-2xl font-semibold tracking-tight">Login to Nova</h1>
					<p class="text-sm text-muted-foreground">Sign in via magic link with your email below</p>
				</div>
				<UserAuthForm isLoading={loading} onSubmit={handleSubmit} />
				{#if form?.errors?.email}
					<span class="error flex items-center text-sm">
						{form?.errors?.email}
					</span>
				{/if}
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
