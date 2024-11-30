// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from './lib/types/database.types';

declare global {
	namespace App {
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>;
		}
		interface PageData {
			session: Session | null;
			user: User | null;
		}
	}
}

export {};
