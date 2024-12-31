// src/routes/dashboard/experimental/ai-agent/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// import { AIService } from '$lib/ai/agent';
// import { OPENAI_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	if (!supabase) throw error(500, 'Supabase client not initialized');

	try {
		// const aiService = new AIService(supabase, OPENAI_API_KEY);
		return {
			roomId: crypto.randomUUID()
		};
	} catch (e) {
		console.error('Failed to initialize AI service:', e);
		return {};
	}
};
