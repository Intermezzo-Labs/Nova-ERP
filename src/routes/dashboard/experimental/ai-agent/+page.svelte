<script lang="ts">
	// import { chatStore, type Message } from '$lib/stores/ai';
	import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
	// import * as Card from '$lib/components/ui/card';
	// import * as Avatar from '$lib/components/ui/avatar';
	// import { Button } from '$lib/components/ui/button';
	// import { Input } from '$lib/components/ui/input';
	// import { cn } from '$lib/utils';
	// import { Bot, SendHorizonal, User } from 'lucide-svelte';
	// import type { PageData } from './$types';
	import ComingSoon from '$lib/components/ui/coming-soon/coming-soon.svelte';

</script>

<MainContainerLayout title="Nova Agent">
	<div class="p-4">
		<ComingSoon />
	</div>
	<!-- <div class="flex h-full flex-col divide-y">
		<div bind:this={messageContainer} class="flex-1 overflow-auto">
			<Card.Root class="h-full rounded-none border-0">
				<div class="flex h-full flex-col">
					<div class="flex-1 overflow-auto p-0">
						{#each messages as message}
							<div
								class={cn(
									'flex gap-3 p-4',
									message.role === 'assistant' ? 'hover:bg-muted/50' : 'hover:bg-accent/50'
								)}
							>
								<Avatar.Root class="h-8 w-8">
									{#if message.role === 'assistant'}
										<div
											class="flex h-full w-full items-center justify-center rounded-full bg-primary"
										>
											<Bot class="h-4 w-4 text-primary-foreground" />
										</div>
									{:else}
										<div
											class="flex h-full w-full items-center justify-center rounded-full bg-muted"
										>
											<User class="h-4 w-4" />
										</div>
									{/if}
								</Avatar.Root>
								<div class="flex-1 space-y-2">
									<div class="flex items-end justify-between gap-2">
										<p class="text-sm font-medium">
											{message.role === 'assistant' ? 'AI Agent' : 'You'}
										</p>
										<span class="text-xs text-muted-foreground">{message.timestamp}</span>
									</div>
									<div class="text-sm text-muted-foreground">
										{message.content}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</Card.Root>
		</div>

		<div class="border-t bg-background p-4">
			<form class="flex items-center gap-2" on:submit|preventDefault={handleSubmit}>
				<div class="relative flex-1">
					<Input placeholder="Message AI Agent..." bind:value={inputMessage} class="pr-12" />
				</div>
				<Button type="submit" size="icon" class="h-9 w-9">
					<SendHorizonal class="h-4 w-4" />
				</Button>
			</form>
		</div>
	</div> -->
</MainContainerLayout>
