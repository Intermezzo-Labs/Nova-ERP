import { supabase } from '$lib/supabaseClient';
import type { CreateNovaUser, NovaUser, UpdateNovaUser } from '$lib/types/user';

export async function createNovaUser(userData: CreateNovaUser): Promise<NovaUser> {
    try {
        const { data, error } = await supabase
            .from('nova_users')
            .insert([{
                id: userData.id,
                first_name: userData.firstName,
                last_name: userData.lastName,
                email: userData.email,
                company: userData.company,
                phone: userData.phone,
                address: userData.address,
                role: userData.role || 'User',
                status: userData.status || 'Active'
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating nova user:', error);
            throw new Error(`Failed to create user: ${error.message}`);
        }

        if (!data) {
            throw new Error('No data returned after creating user');
        }

        return transformNovaUser(data);
    } catch (error) {
        console.error('Error in createNovaUser:', error);
        throw error;
    }
}

export async function getNovaUser(id: string): Promise<NovaUser | null> {
    const { data, error } = await supabase
        .from('nova_users')
        .select()
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data ? transformNovaUser(data) : null;
}

export async function updateNovaUser(userData: UpdateNovaUser): Promise<NovaUser> {
    const { data, error } = await supabase
        .from('nova_users')
        .update({
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            company: userData.company,
            phone: userData.phone,
            address: userData.address,
            role: userData.role,
            status: userData.status
        })
        .eq('id', userData.id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return transformNovaUser(data);
}

export async function deleteNovaUser(id: string): Promise<void> {
    const { error } = await supabase
        .from('nova_users')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
}

// Helper function to transform database response to NovaUser type
function transformNovaUser(data: any): NovaUser {
    return {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        address: data.address,
        role: data.role,
        status: data.status,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
    };
}
