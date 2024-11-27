import { writable } from 'svelte/store'
import type { User } from '@supabase/supabase-js'
import { supabase } from '$lib/supabaseClient'

export const user = writable<User | null>(null)

supabase.auth.onAuthStateChange((_, session) => {
  user.set(session?.user ?? null)
})
