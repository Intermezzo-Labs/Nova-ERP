export const userRoles = ['Admin', 'Manager', 'User'] as const;
type UserRole = (typeof userRoles)[number];

export const userStatuses = ['Active', 'Inactive'] as const;
type UserStatus = (typeof userStatuses)[number];

export interface NovaUserPreferences {
	firstName: string;
	lastName: string;
	email: string;
	company?: string;
	phone?: string;
	address?: string;
	role: UserRole;
	status: UserStatus;
	logoUrl?: string;
}
