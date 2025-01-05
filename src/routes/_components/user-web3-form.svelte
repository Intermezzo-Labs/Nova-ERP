<script lang="ts" module>
	const signMessage = async () => {
		const nonceResponse = await fetch('/auth/web3/nonce?platform=solana');
		const nonceData = await nonceResponse.json();

		alert(nonceData.nonce);

		const message = `Sign this message to log in to stillearly.io // ${nonceData.nonce}`;
		const data = new TextEncoder().encode(message);
		// const signature = await this.adapter.signMessage(data, 'hex');
		const verified = await fetch('/auth/web3/verify', {
			method: 'POST',
			body: JSON.stringify({
				// publicKey: this.adapter.publicKey.toBase58(),
				nonce: nonceData.nonce
				// signature: base58.encode(signature)
			})
		});
		console.log(verified);
		//   if (verified.accessToken) {
		//     this.accessToken = verified.accessToken
		//   }
	};
</script>

<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { LoaderPinwheel, Wallet } from 'lucide-svelte';

	let { loading } = $props();
</script>

<Tooltip.Provider delayDuration={0}>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button
				variant="outline"
				class="w-full bg-pink-600 disabled:opacity-50"
				type="button"
				onclick={signMessage}
				disabled
			>
				{#if loading}
					<LoaderPinwheel class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					<Wallet class="mr-2 h-4 w-4" />
				{/if}
				Connect Wallet
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content sideOffset={24}>Coming soon...</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
