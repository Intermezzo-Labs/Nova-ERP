<script lang="ts">
	import { PlusCircle } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Tabs from '$lib/components/ui/tabs';
	import EmptyPlaceholder from '$lib/components/empty-placeholder.svelte';
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	import Sidebar from './_components/sidebar.svelte';
</script>

{#snippet actions()}
	<Button>
		<PlusCircle class="mr-2 h-4 w-4" />
		Add music
	</Button>
{/snippet}

<MainContainerLayout title="Products" {actions}>
	<div class="flex h-full">
		<Sidebar class="w-64" />
		<div class="flex-1 border-l">
			<div class="px-4 py-6 lg:px-8">
				<Tabs.Root value="music" class="h-full space-y-6">
					<div class="space-between flex items-center">
						<Tabs.List>
							<Tabs.Trigger value="music" class="relative">Music</Tabs.Trigger>
							<Tabs.Trigger value="podcasts">Podcasts</Tabs.Trigger>
							<Tabs.Trigger value="live" disabled>Live</Tabs.Trigger>
						</Tabs.List>
					</div>
					<Tabs.Content value="music" class="border-none p-0 outline-none">
						<div class="flex items-center justify-between">
							<div class="space-y-1">
								<h2 class="text-2xl font-semibold tracking-tight">Listen Now</h2>
								<p class="text-sm text-muted-foreground">Top picks for you. Updated daily.</p>
							</div>
						</div>
						<Separator class="my-4" />
						<div class="relative">
							<!-- <ScrollArea orientation="both">
							<div class="flex space-x-4 pb-4">
								{#each listenNowAlbums as album}
												<AlbumArtwork
													{album}
													class="w-[250px]"
													aspectRatio="portrait"
													width={250}
													height={330}
												/>
											{/each}
							</div>
						</ScrollArea> -->
						</div>
						<div class="mt-6 space-y-1">
							<h2 class="text-2xl font-semibold tracking-tight">Made for You</h2>
							<p class="text-sm text-muted-foreground">Your personal playlists. Updated daily.</p>
						</div>
						<Separator class="my-4" />
						<div class="relative">
							<!-- <ScrollArea orientation="both">
							<div class="flex space-x-4 pb-4">
								{#each madeForYouAlbums as album}
												<AlbumArtwork
													{album}
													class="w-[150px]"
													aspectRatio="square"
													width={150}
													height={150}
												/>
											{/each}
							</div>
						</ScrollArea> -->
						</div>
					</Tabs.Content>
					<Tabs.Content
						value="podcasts"
						class="h-full flex-col border-none p-0 data-[state=active]:flex"
					>
						<div class="flex items-center justify-between">
							<div class="space-y-1">
								<h2 class="text-2xl font-semibold tracking-tight">New Episodes</h2>
								<p class="text-sm text-muted-foreground">Your favorite podcasts. Updated daily.</p>
							</div>
						</div>
						<Separator class="my-4" />
						<EmptyPlaceholder />
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	</div>
</MainContainerLayout>
