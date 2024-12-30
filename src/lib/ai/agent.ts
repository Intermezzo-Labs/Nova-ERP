// src/lib/services/ai/agent.ts
import { AgentRuntime } from '@elizaos/core';
import type { 
   IDatabaseAdapter, 
   IMemoryManager, 
   Memory, 
   State,
   UUID,
   Character,
   ModelProviderName,
   ICacheManager
} from '@elizaos/core';
import type { SupabaseClient } from '@supabase/supabase-js';
import { chatStore } from '$lib/stores/ai';

export class AIService {
   private runtime: AgentRuntime;
   private messageManager: IMemoryManager;

   constructor(supabaseClient: SupabaseClient, openAIToken: string) {
       const databaseAdapter = this.createDatabaseAdapter(supabaseClient);
       
       const character: Character = {
           name: 'Nova Assistant',
           modelProvider: 'openai' as ModelProviderName,
           bio: 'AI assistant for Nova ERP',
           clients: ['direct'],
           plugins: [],
           lore: [],
           messageExamples: [],
           postExamples: [],
           topics: [],
           adjectives: [],
           style: {
               all: [],
               chat: [],
               post: []
           },
           settings: {
               model: 'gpt-4',
               modelConfig: {
                   temperature: 0.7,
                   maxInputTokens: 8000,
                   max_response_length: 1000
               },
               secrets: {
                   OPENAI_API_KEY: openAIToken
               }
           }
       };

       const cacheManager: ICacheManager = {
           get: async () => undefined,
           set: async () => {},
           delete: async () => {}
       };

       this.runtime = new AgentRuntime({
           agentId: crypto.randomUUID() as UUID,
           serverUrl: 'http://localhost:7998',
           token: openAIToken,
           character,
           modelProvider: 'openai' as ModelProviderName,
           databaseAdapter,
           cacheManager,
           clients: {},
           conversationLength: 32,
           actions: [],
           evaluators: [],
           providers: [],
           services: new Map()
       });

       const manager = this.runtime.getMemoryManager("messages");
       if (!manager) throw new Error('Message manager not initialized');
       this.messageManager = manager;
   }

   async processMessage(message: string, roomId: string): Promise<string> {
       try {
           const memory: Memory = {
               id: crypto.randomUUID() as UUID,
               content: { 
                   text: message,
                   type: 'user_message',
                   timestamp: new Date().toISOString()
               },
               roomId: roomId as UUID,
               userId: crypto.randomUUID() as UUID,
               agentId: this.runtime.agentId
           };

           await this.messageManager.createMemory(memory);
           const state = await this.runtime.composeState(memory);
           
           const responses: string[] = [];
           await this.runtime.processActions(memory, responses, state, async (newMessages) => {
               return [memory];
           });

           await this.runtime.evaluate(memory, state, true);

           if (responses.length === 0) {
               throw new Error('No response generated');
           }

           const response = responses[0];
           
           await this.messageManager.createMemory({
               id: crypto.randomUUID() as UUID,
               content: { 
                   text: response,
                   type: 'assistant_response',
                   timestamp: new Date().toISOString()
               },
               roomId: roomId as UUID,
               userId: crypto.randomUUID() as UUID,
               agentId: this.runtime.agentId
           });

           return response;
       } catch (error) {
           console.error('Error processing message:', error);
           throw new Error('Failed to process message');
       }
   }

   async clearConversation(roomId: string): Promise<void> {
       try {
           await this.messageManager.removeAllMemories(roomId as UUID);
           chatStore.reset();
       } catch (error) {
           console.error('Error clearing conversation:', error);
           throw new Error('Failed to clear conversation');
       }
   }

   private createDatabaseAdapter(supabase: SupabaseClient): IDatabaseAdapter {
       return {
           db: supabase,
           init: async () => {},
           close: async () => {},
           getAccountById: async () => null,
           createAccount: async () => false,
           getMemories: async (params) => {
               const { data } = await supabase
                   .from('ai_memories')
                   .select('*')
                   .eq('room_id', params.roomId)
                   .order('created_at', { ascending: true })
                   .limit(params.count || 10);
               return data || [];
           },
           getMemoryById: async () => null,
           getMemoriesByRoomIds: async () => [],
           getCachedEmbeddings: async () => [],
           log: async () => {},
           getActorDetails: async () => [],
           searchMemories: async () => [],
           updateGoalStatus: async () => {},
           searchMemoriesByEmbedding: async () => [],
           createMemory: async (memory) => {
               await supabase.from('ai_memories').insert({
                   id: memory.id,
                   content: memory.content,
                   embedding: memory.embedding,
                   room_id: memory.roomId,
                   user_id: memory.userId,
                   agent_id: memory.agentId,
                   created_at: new Date().toISOString()
               });
           },
           removeMemory: async () => {},
           removeAllMemories: async (roomId) => {
               await supabase
                   .from('ai_memories')
                   .delete()
                   .eq('room_id', roomId); 
           },
           countMemories: async () => 0,
           getGoals: async () => [],
           updateGoal: async () => {},
           createGoal: async () => {},
           removeGoal: async () => {},
           removeAllGoals: async () => {},
           getRoom: async (roomId) => {
               const { data } = await supabase
                   .from('ai_rooms')
                   .select('*')
                   .eq('id', roomId)
                   .single();
               return data?.id || null;
           },
           createRoom: async (roomId) => {
               const id = roomId || crypto.randomUUID() as UUID;
               await supabase.from('ai_rooms').insert({ id });
               return id;
           },
           removeRoom: async () => {},
           getRoomsForParticipant: async () => [],
           getRoomsForParticipants: async () => [],
           addParticipant: async () => false,
           removeParticipant: async () => false,
           getParticipantsForAccount: async () => [],
           getParticipantsForRoom: async () => [],
           getParticipantUserState: async () => null,
           setParticipantUserState: async () => {},
           createRelationship: async () => false,
           getRelationship: async () => null,
           getRelationships: async () => []
       };
   }
}
