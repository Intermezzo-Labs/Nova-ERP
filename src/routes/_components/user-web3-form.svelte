<script lang="ts">
	import { wallet } from '$lib/stores/wallet';
	import Button from '$lib/components/ui/button/button.svelte';
	import { FileSignature, LoaderPinwheel } from 'lucide-svelte';
	import { PUBLIC_NONCE_MESSAGE } from '$env/static/public';
	import { goto } from '$app/navigation';

	let loading = $state(false);
	let availableWallets = ['Phantom', 'Solflare'];

	const shortener = (str?: string) => {
		const start = str?.substring(0, 4);
		const end = str?.substring(str.length - 4, str.length);
		if (!start || !end) return '';
		return [start, end].join('...');
	};
	let publicKeyShort = $derived(shortener($wallet.publicKey?.toBase58()));

	async function signMessage() {
		if (!$wallet.adapter || !$wallet.connected) {
			alert('Please connect your wallet first.');
			return;
		}

		try {
			loading = true;
			const nonceResponse = await fetch('/auth/web3/nonce?platform=solana');
			const nonceData = await nonceResponse.json();

			const message = `${PUBLIC_NONCE_MESSAGE} // ${nonceData.nonce}`;

			const signature = await wallet.signMessage(message); // Use the adapter's signMessage

			const verified = await fetch('/auth/web3/verify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					publicKey: $wallet.publicKey?.toBase58(),
					nonce: nonceData.nonce,
					signature
				})
			});
			const verifiedData = await verified.json();
			if (verified.ok) {
				console.log('verification successful', verifiedData);
				goto('/dashboard');
			} else {
				console.error('verification error', verifiedData);
			}
		} catch (error) {
			console.error('Signing error:', error);
		} finally {
			loading = false;
		}
	}

	async function connectWallet(walletName: string) {
		wallet.setWallet(walletName);
		await wallet.connect(walletName);
	}

	async function disconnectWallet() {
		await wallet.disconnect();
	}
</script>

<div class="flex flex-col gap-2">
	{#if $wallet.error}
		<p style="color: red;">{$wallet.error}</p>
	{/if}

	{#if $wallet.connecting}
		<p class=" text-center text-sm text-muted-foreground">Connecting...</p>
	{:else if $wallet.connected}
		<p class=" text-center text-sm">Connected address: <code>{publicKeyShort}</code></p>
		<Button variant="outline" onclick={disconnectWallet}>Disconnect</Button>
		<Button
			variant="outline"
			class="w-full bg-pink-600 disabled:opacity-50"
			type="button"
			onclick={signMessage}
			disabled={loading}
		>
			{#if loading}
				<LoaderPinwheel class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				<FileSignature /> Sign Message
			{/if}
		</Button>
	{:else}
		{#each availableWallets as walletName}
			<Button variant="secondary" onclick={() => connectWallet(walletName)}>{walletName}</Button>
		{/each}
	{/if}
</div>
