import { writable } from 'svelte/store'
import type { User } from '@supabase/supabase-js'
import { supabase } from '$lib/supabaseClient'

export const user = writable<User | null>(null)

// Initialize user state
supabase.auth.getUser().then(({ data: { user: initialUser }, error }) => {
  if (!error) {
    user.set(initialUser)
  }
})

// Still need to listen for auth changes, but verify with getUser
supabase.auth.onAuthStateChange(async (_, session) => {
  if (session) {
    const { data: { user: verifiedUser }, error } = await supabase.auth.getUser()
    user.set(error ? null : verifiedUser)
  } else {
    user.set(null)
  }
})
