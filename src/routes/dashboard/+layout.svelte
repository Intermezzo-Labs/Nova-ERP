<script lang="ts">
	import TeamSwitcher from './_components/team-switcher.svelte';
	import Search from './_components/search.svelte';
	import UserNav from './_components/user-nav.svelte';
	import MainNav from './_components/main-nav.svelte';
	import ThemeSwitcher from './_components/theme-switcher.svelte';
	// import DatePickerWithRange from "$lib/registry/new-york/example/date-picker-with-range.svelte";

	let { data, children } = $props();
</script>

<div class="flex h-screen flex-col overflow-hidden">
	<header class="border-b">
		<div class="flex h-16 items-center px-4">
			<TeamSwitcher />
			<MainNav class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				<Search />
				<ThemeSwitcher />
				<UserNav username={data.user?.email ?? 'N/A'} />
			</div>
		</div>
	</header>
	<main class="flex-1 overflow-auto">
		{@render children()}
	</main>
</div>
