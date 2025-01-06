import { writable, get } from 'svelte/store';
import base58 from 'bs58';
import {
	BaseWalletAdapter,
	WalletAdapterNetwork,
	WalletNotConnectedError
} from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, PublicKey, Transaction } from '@solana/web3.js';
import { browser } from '$app/environment';

const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);
const connection = new Connection(endpoint, 'processed');

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

interface WalletState {
	adapter: BaseWalletAdapter | null;
	publicKey: PublicKey | null;
	connected: boolean;
	connecting: boolean;
	disconnecting: boolean;
	autoConnect: boolean;
	error: string | null;
}

const initialWalletState: WalletState = {
	adapter: null,
	publicKey: null,
	connected: false,
	connecting: false,
	disconnecting: false,
	autoConnect: true,
	error: null
};

const walletStore = writable<WalletState>(initialWalletState);

export const wallet = {
	subscribe: walletStore.subscribe,
	connect: async (walletName: string) => {
		walletStore.update((s) => ({ ...s, connecting: true, error: null }));
		try {
			const adapter = wallets.find((w) => w.name === walletName);
			if (!adapter) throw new Error('Wallet not found');

			await adapter.connect();

			walletStore.update((s) => ({
				...s,
				adapter,
				publicKey: adapter.publicKey,
				connected: adapter.connected,
				connecting: false
			}));
		} catch (error) {
			walletStore.update((s) => ({
				...s,
				connecting: false,
				error: (error as unknown as Error).message
			}));
		}
	},
	disconnect: async () => {
		walletStore.update((s) => ({ ...s, disconnecting: true, error: null }));
		try {
			if (get(walletStore).adapter) {
				await get(walletStore).adapter?.disconnect();
			}
			walletStore.set(initialWalletState);
		} catch (error) {
			walletStore.update((s) => ({
				...s,
				disconnecting: false,
				error: (error as unknown as Error).message
			}));
		}
	},
	signMessage: async (message: string) => {
		try {
			const adapter = get(walletStore).adapter;

			if (!adapter || !get(walletStore).connected || !get(walletStore).publicKey) {
				throw new WalletNotConnectedError();
			}

			if (!('signMessage' in adapter) || typeof adapter.signMessage !== 'function') {
				throw new Error('Wallet adapter does not support message signing.');
			}

			const encodedMessage = new TextEncoder().encode(message);
			const signature = await adapter.signMessage(encodedMessage);
			return base58.encode(signature);
		} catch (error) {
			console.error('Error signing message:', error);
			throw error; // Re-throw the error to be handled by the component
		}
	},
	sendTransaction: async (transaction: Transaction) => {
		if (!browser) return;
		try {
			if (!get(walletStore).adapter || !get(walletStore).connected || !get(walletStore).publicKey) {
				throw new WalletNotConnectedError();
			}

			return await get(walletStore).adapter?.sendTransaction(transaction, connection, {
				preflightCommitment: 'processed'
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	autoConnect: async () => {
		if (!browser) return;
		if (!get(walletStore).autoConnect) return;
		const localStorageKey = 'walletName';
		const walletName = localStorage.getItem(localStorageKey);
		if (walletName) {
			try {
				await wallet.connect(walletName);
			} catch (error) {
				localStorage.removeItem(localStorageKey);
				console.error('error auto connecting', error);
			}
		}
	},
	setWallet: (walletName: string) => {
		localStorage.setItem('walletName', walletName);
	}
};

wallet.autoConnect();
