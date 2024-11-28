export type UserRole = 'Admin' | 'Manager' | 'User';
export type UserStatus = 'Active' | 'Inactive';

export interface NovaUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    phone?: string;
    address?: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}

// Helper type for creating a new user (without id and timestamps)
export type CreateNovaUser = Omit<NovaUser, 'id' | 'createdAt' | 'updatedAt'>;

// Helper type for updating a user (all fields optional except id)
export type UpdateNovaUser = Partial<Omit<NovaUser, 'id'>> & { id: string };
