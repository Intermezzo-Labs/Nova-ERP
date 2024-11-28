import { describe, it, expect, beforeEach } from 'vitest';
import { createNovaUser, getNovaUser, updateNovaUser, deleteNovaUser } from '../user';
import type { CreateNovaUser } from '$lib/types/user';

describe('NovaUser API', () => {
    let testUserId: string;

    const testUser: CreateNovaUser = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        role: 'User',
        status: 'Active'
    };

    beforeEach(async () => {
        // Clean up any existing test user
        try {
            if (testUserId) {
                await deleteNovaUser(testUserId);
            }
        } catch (error) {
            // Ignore cleanup errors
        }
    });

    it('should create a new user', async () => {
        const user = await createNovaUser(testUser);
        testUserId = user.id;

        expect(user).toMatchObject({
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email
        });
    });

    it('should retrieve a user', async () => {
        const created = await createNovaUser(testUser);
        testUserId = created.id;

        const user = await getNovaUser(testUserId);
        expect(user).toMatchObject({
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email
        });
    });

    it('should update a user', async () => {
        const created = await createNovaUser(testUser);
        testUserId = created.id;

        const updated = await updateNovaUser({
            id: testUserId,
            firstName: 'Updated'
        });

        expect(updated.firstName).toBe('Updated');
    });

    it('should delete a user', async () => {
        const created = await createNovaUser(testUser);
        testUserId = created.id;

        await deleteNovaUser(testUserId);
        const user = await getNovaUser(testUserId);
        expect(user).toBeNull();
    });
});
