import { z } from 'zod';

export const userRoleEnum = z.enum(['Admin', 'Manager', 'User']);
export type UserRoleEnum = z.infer<typeof userRoleEnum>;

export const userStatusEnum = z.enum(['Active', 'Inactive']);
export type UserStatusEnum = z.infer<typeof userStatusEnum>;

export const novaUserProfileSchema = z.object({
	firstName: z.string().min(2, 'First name must be at least 2 characters.'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters.'),
	email: z.string().email('Please enter a valid email address'),
	company: z.string().optional(),
	phone: z.string().optional(),
	address: z.string().optional(),
	role: userRoleEnum.optional(),
	status: userStatusEnum.optional(),
	logoUrl: z.string().optional()
});
export type NovaUserProfile = z.infer<typeof novaUserProfileSchema>;

const withLogoFile = z.object({
	logoFile: z.custom<File>().optional()
});
export const novaUserProfileFormSchema = novaUserProfileSchema
	.omit({ logoUrl: true })
	.merge(withLogoFile);
export type NovaUserProfileForm = z.infer<typeof novaUserProfileFormSchema>;
