import { redirect } from '@sveltejs/kit';
import { createNovaUser, getNovaUser } from '$lib/server/user';

export const GET = async ({ url, locals: { supabase } }) => {
    const code = url.searchParams.get('code');

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    // Get the authenticated user securely
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user?.email) {
        console.error('Auth error:', error);
        throw redirect(303, '/auth/signin?error=auth_failed');
    }

    try {
        // Check if user already exists in NovaUser table
        const existingUser = await getNovaUser(user.id);
        
        if (!existingUser) {
            // Create new NovaUser with email and default values
            const newUser = {
                id: user.id,
                email: user.email,
                firstName: '', // These can be updated later via profile
                lastName: '',
                role: 'User', // Default role
                status: 'Active' // Default status
            };
           
            await createNovaUser(newUser);
        }
    } catch (error) {
        console.error('Error managing NovaUser record:', error);
        // Redirect to an error page or show error message
        throw redirect(303, '/?error=profile_creation_failed');
    }

    throw redirect(303, '/dashboard');
};
