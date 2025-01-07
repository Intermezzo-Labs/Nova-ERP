<script lang="ts">
	import { toPng } from 'html-to-image';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import type { NovaUserProfile } from '$lib/schemas/nova-user';
	import { Clock, Download } from 'lucide-svelte';

	export let data: PageData;
	let userData =
		data.userData ||
		({
			firstName: '',
			lastName: '',
			email: '',
			company: '',
			phone: '',
			address: '',
			logoUrl: ''
		} satisfies NovaUserProfile);
	let cardRef: HTMLDivElement;
	$: browser = typeof window !== 'undefined';

	// Initialize with a default scale
	let cardScale = 1;
	let initialRender = true;

	// Only update scale after initial client-side render
	$: if (browser && !initialRender) {
		cardScale = Math.min(1, (window.innerWidth - 64) / 600);
	}

	// Setup resize listener after mount
	onMount(() => {
		initialRender = false;
		if (browser) {
			const handleResize = () => {
				cardScale = Math.min(1, (window.innerWidth - 64) / 600);
			};

			window.addEventListener('resize', handleResize);
			handleResize(); // Initial calculation

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	// Add placeholder logo if none provided
	const placeholderLogo =
		"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='80' rx='40' fill='%23E2E8F0'/%3E%3Cpath d='M40 38.5C44.1421 38.5 47.5 35.1421 47.5 31C47.5 26.8579 44.1421 23.5 40 23.5C35.8579 23.5 32.5 26.8579 32.5 31C32.5 35.1421 35.8579 38.5 40 38.5Z' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M54.5 56.5C54.5 50.9772 47.9558 46.5 40 46.5C32.0442 46.5 25.5 50.9772 25.5 56.5' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

	async function downloadBusinessCard() {
		if (!browser || !cardRef) return;

		try {
			const dataUrl = await toPng(cardRef, {
				quality: 1.0,
				pixelRatio: 2,
				cacheBust: true,
				filter: (node) => {
					if (node instanceof HTMLImageElement) {
						const src = node.getAttribute('src');
						return !src?.includes('data:image');
					}
					return true;
				}
			});

			const link = document.createElement('a');
			const fileName =
				`business-card-${userData.firstName || 'user'}-${userData.lastName || 'card'}`
					.toLowerCase()
					.replace(/\s+/g, '-');
			link.download = `${fileName}.png`;
			link.href = dataUrl;
			link.click();
		} catch (err) {
			console.error('Error generating business card:', err);
		}
	}
</script>

<div class="flex h-full gap-4 p-4">
	<div class="flex-1 flex-col space-y-4 sm:flex md:order-2">
		<h1 class="mb-4 font-bold sm:mb-0">Business Card Generator</h1>
		<!-- Edit Form -->
		<div class="mx-auto mt-4 w-full space-y-4 sm:mt-6 sm:space-y-6">
			<!-- Reduced spacing for mobile -->
			<form class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
				<Input type="text" placeholder="First Name" bind:value={userData.firstName} />
				<Input type="text" placeholder="Last Name" bind:value={userData.lastName} />
				<Input type="text" placeholder="Company" bind:value={userData.company} />
				<Input type="tel" placeholder="Phone" bind:value={userData.phone} />
				<Input
					type="text"
					placeholder="Address"
					bind:value={userData.address}
					class="w-full sm:col-span-2"
				/>
				<Input
					type="url"
					placeholder="Logo URL"
					bind:value={userData.logoUrl}
					class="w-full sm:col-span-2"
				/>
			</form>
		</div>
		<!-- <ModelSelector {types} {models} />
			<TemperatureSelector value={[0.56]} />
			<MaxLengthSelector value={[256]} />
			<TopPSelector value={[0.9]} /> -->
	</div>
	<div class="max-w-xl flex-1 md:order-1">
		<div class="mt-0 h-full border-0 p-0">
			<div class="flex h-full flex-col space-y-4">
				<!-- Business Card Preview -->
				<div class="flex justify-center">
					<div class="flex w-full justify-center">
						<div
							bind:this={cardRef}
							class="relative h-auto w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-2xl sm:p-8"
						>
							<!-- Decorative Elements -->
							<div
								class="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 transform rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl sm:h-64 sm:w-64 sm:-translate-y-24 sm:translate-x-24"
							></div>
							<div
								class="absolute bottom-0 left-0 h-24 w-24 -translate-x-8 translate-y-8 transform rounded-full bg-gradient-to-tr from-emerald-500/10 to-sky-500/10 blur-3xl sm:h-64 sm:w-64 sm:-translate-x-24 sm:translate-y-24"
							></div>

							<!-- Content Container -->
							<div class="relative z-10 flex h-full flex-col justify-between">
								<!-- Left Side: Contact Information -->
								<div class="mb-4 flex flex-col justify-between">
									<div>
										<h2 class="mb-1 text-lg font-bold text-white sm:text-3xl">
											{userData.firstName || 'John'}
											{userData.lastName || 'Doe'}
										</h2>
										{#if userData.company}
											<p class="mb-2 text-sm font-medium text-emerald-400 sm:mb-4 sm:text-lg">
												{userData.company}
											</p>
										{/if}
									</div>
									<div class="space-y-2 text-xs text-slate-300 sm:text-base">
										{#if userData.email}
											<p class="flex items-center gap-2 break-all">
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
													/></svg
												>
												{userData.email}
											</p>
										{/if}
										{#if userData.phone}
											<p class="flex items-center gap-2">
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
													/></svg
												>
												{userData.phone}
											</p>
										{/if}
										{#if userData.address}
											<p class="flex items-center gap-2">
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
													/><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
													/></svg
												>
												{userData.address}
											</p>
										{/if}
									</div>
								</div>

								<!-- Right Side: Logo -->
								<div class="flex items-start justify-end">
									<img
										src={userData.logoUrl || placeholderLogo}
										alt="Company Logo"
										class="h-12 w-12 rounded-lg bg-white/10 object-contain p-2 sm:h-24 sm:w-24"
										on:error={(e) => {
											if (browser) {
												(e.currentTarget as HTMLImageElement).src = placeholderLogo;
											}
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex items-center space-x-2">
					<Button onclick={downloadBusinessCard} disabled={!browser}>
						<Download class="mr-2 size-4" /> Download Business Card
					</Button>
					<Button disabled>Save</Button>
					<Button disabled variant="secondary">
						<span class="sr-only">Show history</span>
						<Clock class="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
