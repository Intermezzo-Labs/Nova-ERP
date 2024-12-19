import { writable } from 'svelte/store';

type ToastMessage = {
	message: string;
	type: 'success' | 'error' | 'info';
	id: number;
};

function createToastStore() {
	const { subscribe, update } = writable<ToastMessage[]>([]);
	let counter = 0;

	function show(message: string, type: ToastMessage['type'] = 'info') {
		const id = ++counter;
		update((toasts) => [...toasts, { message, type, id }]);
		setTimeout(() => {
			dismiss(id);
		}, 3000);
	}

	function dismiss(id: number) {
		update((toasts) => toasts.filter((t) => t.id !== id));
	}

	return {
		subscribe,
		show,
		dismiss,
		error: (message: string) => show(message, 'error'),
		success: (message: string) => show(message, 'success'),
		info: (message: string) => show(message, 'info')
	};
}

export const toast = createToastStore();
