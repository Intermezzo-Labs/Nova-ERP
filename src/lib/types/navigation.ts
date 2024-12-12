export interface MenuItem {
	id: string;
	name: string;
	route: string;
	icon?: string; // For future icon support
	badge?: number; // For notification counts
}

export const BUSINESS_DOCUMENTS_MENU_ITEMS: MenuItem[] = [
	{
		id: 'business-card',
		name: 'Business Cards',
		route: '/dashboard/business-card',
		icon: 'card' // We'll need to ensure this icon exists in your icon system
	},
	{
		id: 'invoices',
		name: 'Invoices',
		route: '/dashboard/invoices',
		icon: 'file-text' // We'll need to ensure this icon exists in your icon system
	}
];
