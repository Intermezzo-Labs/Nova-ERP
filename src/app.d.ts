// See https://svelte.dev/docs/kit/types#app.d.ts
/// <reference types="@supabase/supabase-js" />

declare global {
	namespace App {
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>;
		}
		interface PageData {
			session: Session | null;
			user: User | null;
		}
	}
}

export {};
