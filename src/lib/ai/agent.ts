// src/lib/services/ai/agent.ts
import type { AgentRuntime, IMemoryManager } from '@elizaos/core';
import type { Memory, State } from '@elizaos/core';
import type { Database } from '$lib/types/database.types';

export class AIService {
    private runtime: AgentRuntime;
    private memoryManager: IMemoryManager;

    constructor(supabaseClient: Database) {
        this.runtime = new AgentRuntime({
            databaseAdapter: this.createDatabaseAdapter(supabaseClient),
            modelProvider: 'OPENAI',
            character: {
                name: 'Nova Assistant',
                bio: 'AI assistant for Nova ERP',
            },
            conversationLength: 32
        });

        this.memoryManager = this.runtime.getMemoryManager();
    }

    private createDatabaseAdapter(supabase: Database) {
        return {
            createMemory: async (memory: Memory) => {
                await supabase.from('ai_memories').insert({
                    content: memory.content,
                    embedding: memory.embedding,
                    room_id: memory.roomId
                });
            },
            
            searchMemories: async ({ embedding, match_threshold }) => {
                const { data } = await supabase.rpc('match_memories', {
                    query_embedding: embedding,
                    match_threshold
                });
                return data;
            }
        };
    }

    async processMessage(message: string, roomId: string): Promise<string> {
        const memory: Memory = {
            content: { text: message },
            roomId
        };

        await this.memoryManager.createMemory(memory);
        const state = await this.runtime.composeState(memory);
        const response = await this.runtime.generateResponse(state);
        
        return response;
    }
}