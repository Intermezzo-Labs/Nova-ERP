// src/routes/dashboard/experimental/ai-agent/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AIService } from '$lib/services/ai/agent';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    try {
        const aiService = new AIService(supabase);
        return { 
            aiService,
            roomId: crypto.randomUUID()
        };
    } catch (e) {
        throw error(500, "Failed to initialize AI service");
    }
};