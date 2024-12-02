import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit(), myErrorFilterPlugin()],
	optimizeDeps: {
		exclude: ['html-to-image']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

// myErrorFilterPlugin.ts
import type { Plugin } from 'vite';

export function myErrorFilterPlugin(): Plugin {
	return {
		name: 'error-filter-plugin',
		configureServer() {
			const filterMessage =
				'Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.';

			// Intercept console.warn
			const originalWarn = console.warn;
			console.warn = (...args: unknown[]) => {
				if (args[0] && typeof args[0] === 'string' && args[0].includes(filterMessage)) {
					return;
				}
				originalWarn(...args);
			};

			// Intercept console.log
			const originalLog = console.log;
			console.log = (...args: unknown[]) => {
				if (args[0] && typeof args[0] === 'string' && args[0].includes(filterMessage)) {
					return;
				}
				originalLog(...args);
			};
		}
	};
}
