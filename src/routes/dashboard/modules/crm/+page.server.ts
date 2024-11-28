import type { PageServerLoad } from './$types';
import type { Contact } from '$lib/types/crm';

// Mock data - Replace with actual database calls
const mockContacts: Contact[] = Array.from({ length: 50 }, (_, i) => ({
    id: `contact-${i}`,
    name: `Contact ${i}`,
    email: `contact${i}@example.com`,
    phoneNumber: `+1 555-000-${i.toString().padStart(4, '0')}`,
    companyName: `Company ${i}`,
    status: ['active', 'opportunity', 'follow-up', 'in-progress'][i % 4] as Contact['status'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}));

export const load: PageServerLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page')) || 1;
    const perPage = Number(url.searchParams.get('perPage')) || 25;
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || 'all';
    
    // Filter and paginate contacts
    let filtered = [...mockContacts];
    if (search) {
        filtered = filtered.filter(contact => 
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase()) ||
            contact.phoneNumber.includes(search) ||
            contact.companyName.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    if (status !== 'all') {
        filtered = filtered.filter(contact => contact.status === status);
    }
    
    const total = filtered.length;
    const contacts = filtered.slice((page - 1) * perPage, page * perPage);
    
    return {
        contacts,
        total,
        page,
        perPage
    };
};
