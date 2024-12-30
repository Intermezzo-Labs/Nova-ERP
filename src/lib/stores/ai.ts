// src/lib/stores/ai.ts
import { writable } from 'svelte/store';

export type Message = {
    id: string;
    role: 'assistant' | 'user';
    content: string;
    timestamp: string;
    attachments?: {
        type: 'image' | 'file';
        url: string;
        name: string;
    }[];
};

export type ChatState = {
    messages: Message[];
    loading: boolean;
    error: string | null;
};

function createChatStore() {
    const { subscribe, set, update } = writable<ChatState>({
        messages: [],
        loading: false,
        error: null
    });

    return {
        subscribe,
        addMessage: (message: Message) => update(state => ({
            ...state,
            messages: [...state.messages, message]
        })),
        setLoading: (loading: boolean) => update(state => ({
            ...state,
            loading
        })),
        setError: (error: string | null) => update(state => ({
            ...state,
            error
        })),
        reset: () => set({
            messages: [],
            loading: false,
            error: null
        })
    };
}

export const chatStore = createChatStore();