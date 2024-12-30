<script lang="ts">
    import { chatStore, type Message } from '$lib/stores/ai';
    import MainContainerLayout from '$lib/components/layouts/main-container-layout.svelte';
    import * as Card from '$lib/components/ui/card';
    import * as Avatar from '$lib/components/ui/avatar';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { cn } from '$lib/utils';
    import { Bot, SendHorizonal, MessagesSquare, FileImage, Paperclip, RefreshCw } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import type { PageData } from './$types';

    export let data: PageData;

    let messageContainer: HTMLDivElement;
    let inputMessage = '';
    
    async function handleSubmit() {
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: inputMessage,
            timestamp: new Date().toLocaleTimeString()
        };

        chatStore.addMessage(userMessage);
        chatStore.setLoading(true);
        inputMessage = '';

        try {
            const response = await data.aiService.processMessage(userMessage.content, data.roomId);
            
            const aiMessage: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: response,
                timestamp: new Date().toLocaleTimeString()
            };

            chatStore.addMessage(aiMessage);
        } catch (err) {
            chatStore.setError('Failed to get AI response');
        } finally {
            chatStore.setLoading(false);
        }
    }

    function scrollToBottom() {
        if (!messageContainer) return;
        messageContainer.scrollTo({
            top: messageContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    function handleReset() {
        chatStore.reset();
    }

    $: if ($chatStore.messages.length) {
        setTimeout(scrollToBottom, 100);
    }
</script>
  
  {#snippet actions()}
	<div class="flex items-center space-x-2">
	  <Button variant="outline" size="sm">
		<Bot class="mr-2 size-4" />
		New Chat
	  </Button>
	</div>
  {/snippet}
  
  <MainContainerLayout title="Nova Agent" {actions}>
	<div class="flex h-full flex-col divide-y">
	  <div class="flex-1 overflow-auto">
		<Card.Root class="h-full rounded-none border-0">
		  <div class="flex h-full flex-col">
			<div class="flex-1 overflow-auto p-0">
			  {#each messages as message}
				<div class={cn(
				  "flex gap-3 p-4",
				  message.role === 'agent' ? 'hover:bg-muted/50' : 'hover:bg-accent/50'
				)}>
				  <Avatar.Root class="h-8 w-8">
					{#if message.role === 'agent'}
					  <div class="flex h-full w-full items-center justify-center rounded-full bg-primary">
						<Bot class="h-4 w-4 text-primary-foreground" />
					  </div>
					{:else}
					  <div class="flex h-full w-full items-center justify-center rounded-full bg-muted">
						<User class="h-4 w-4" />
					  </div>
					{/if}
				  </Avatar.Root>
				  <div class="flex-1 space-y-2">
					<div class="flex items-end justify-between gap-2">
					  <p class="text-sm font-medium">
						{message.role === 'agent' ? 'AI Agent' : 'You'}
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
		<form class="flex items-center gap-2" on:submit|preventDefault>
		  <!-- <Button
			type="button"
			size="icon"
			variant="ghost"
			class="h-9 w-9"
		  >
			<Paperclip class="h-4 w-4" />
		  </Button>
		  <Button
			type="button"
			size="icon"
			variant="ghost"
			class="h-9 w-9"
		  >
			<Image class="h-4 w-4" />
		  </Button> -->
		  <div class="relative flex-1">
			<Input
			  placeholder="Message AI Agent..."
			  bind:value={input}
			  class="pr-12"
			/>
			<Button
			  type="button"
			  size="icon"
			  variant="ghost"
			  class="absolute right-0 top-0 h-full px-3"
			>
			</Button>
		  </div>
		  <Button type="submit" size="icon" class="h-9 w-9">
			<SendHorizontal class="h-4 w-4" />
		  </Button>
		</form>
	  </div>
	</div>
  </MainContainerLayout>