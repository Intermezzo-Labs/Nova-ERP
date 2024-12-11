<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";
    import { createEventDispatcher } from "svelte";

    export let open = false;
    export let title: string;
    export let message: string;
    export let confirmText = "Confirm";
    export let cancelText = "Cancel";

    const dispatch = createEventDispatcher();

    function handleConfirm() {
        dispatch('confirm');
        open = false;
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>
                {message}
            </Dialog.Description>
        </Dialog.Header>
        
        <div class="flex justify-end gap-2">
            <Button 
                variant="outline" 
                on:click={() => open = false}
            >
                {cancelText}
            </Button>
            <Button 
                variant="destructive" 
                on:click={handleConfirm}
            >
                {confirmText}
            </Button>
        </div>
    </Dialog.Content>
</Dialog.Root>
