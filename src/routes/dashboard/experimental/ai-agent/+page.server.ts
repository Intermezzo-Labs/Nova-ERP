// src/routes/dashboard/experimental/ai-agent/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AIService } from '$lib/ai/agent';
import { OPENAI_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	if (!supabase) throw error(500, 'Supabase client not initialized');
	if (!OPENAI_API_KEY) throw error(500, 'OpenAI API key not configured');

	try {
		const aiService = new AIService(supabase, OPENAI_API_KEY);
		return {
			aiService,
			roomId: crypto.randomUUID()
		};
	} catch (e) {
		console.error('Failed to initialize AI service:', e);
		throw error(500, 'Failed to initialize AI service');
	}
};
