export interface Contact {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	companyName: string;
	status: 'active' | 'opportunity' | 'follow-up' | 'in-progress';
	createdAt: string;
	updatedAt: string;
}

export interface TableColumn {
	key: keyof Contact;
	label: string;
	visible: boolean;
	sortable: boolean;
}

export interface FilterOptions {
	search: string;
	status: Contact['status'] | 'all';
	sortBy: keyof Contact | null;
	sortDirection: 'asc' | 'desc';
	page: number;
	perPage: number;
}
