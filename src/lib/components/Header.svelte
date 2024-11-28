<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { resetMode, setMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import * as Avatar from '$lib/components/ui/avatar';

	let searchQuery = '';
	export let email;
</script>

<header
	class="sticky top-0 z-10 border-b border-border/5 bg-gradient-to-r from-background/30 via-background/60 to-background/30 backdrop-blur-xl"
>
	<div class="mx-auto max-w-7xl">
		<div class="flex items-center justify-between p-4 sm:p-6 lg:p-8">
			<!-- Mobile search button -->
			<span class="rounded-xl p-2 hover:bg-muted/50 md:hidden">
				<svg
					class="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</span>

			<div class="mx-4 flex flex-1 items-center space-x-4">
				<div class="relative hidden w-full max-w-md md:block">
					<input
						bind:value={searchQuery}
						type="text"
						placeholder="Search anything..."
						class="w-full rounded-xl border border-border/10 bg-muted/30 py-2.5 pl-10 pr-4
                 transition-all duration-300 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2
                 focus:ring-primary/10"
					/>
					<svg
						class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
			</div>

			<div class="flex items-center space-x-2">
				<!-- Theme Toggle -->

				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} variant="outline" size="icon">
							<Sun
								class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
							/>
							<Moon
								class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
							/>
							<span class="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<!-- Notifications -->
				<button
					class="relative rounded-xl p-2.5 transition-all duration-300 hover:scale-105 hover:bg-muted/50"
					aria-label="Notifications"
				>
					<svg
						class="h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
					<span
						class="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background"
					></span>
				</button>

				<!-- Avatar -->

				<Avatar.Root class="h-8 w-8">
					<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
					<Avatar.Fallback>{email}</Avatar.Fallback>
				</Avatar.Root>
			</div>
		</div>
	</div>
</header>
