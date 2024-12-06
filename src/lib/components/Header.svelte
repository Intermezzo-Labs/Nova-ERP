<script lang="ts">
	import { Sun, Moon, User, Bell } from 'lucide-svelte';
	import { resetMode, setMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Label from './ui/label/label.svelte';

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
				<Button variant="outline" class="relative" size="icon" disabled>
					<Bell class="size-5" />
					<span
						class="absolute right-0 top-0 h-2 w-2 rounded-full bg-secondary ring-2 ring-background"
					></span>
				</Button>

				<!-- Avatar -->

				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} variant="outline" size="icon">
							<User class="size-5" />
							<span class="sr-only">User</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item href="/dashboard/settings">Profile</DropdownMenu.Item>
							<DropdownMenu.Item disabled>Billing</DropdownMenu.Item>
							<DropdownMenu.Item disabled>Settings</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item href="https://discord.gg/ASUcadTx" target="_blank">
								Support
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item href="/auth/logout">Logout</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	</div>
</header>
