import { PUBLIC_DISCORD_URL } from '$env/static/public';
import {
	ChartColumnIncreasing,
	CircleHelp,
	FileText,
	Hammer,
	Megaphone,
	Package,
	Receipt,
	User,
	type Icon
} from 'lucide-svelte';

export type Route = {
	title: string;
	path?: string;
	label: string;
	icon: typeof Icon;
	disabled?: boolean;
};

export const primaryRoutes: Route[] = [
	{
		title: 'Agent Builder',
		path: '/dashboard/experimental/ai-agent',
		label: '🚀',
		icon: Hammer,
		disabled: true
	},
	{
		title: 'Dashboard',
		path: '/dashboard',
		label: '',
		icon: ChartColumnIncreasing
	},
	{
		title: 'Customers',
		path: '/dashboard/customers',
		label: '',
		icon: User
	},
	{
		title: 'Invoices',
		path: '/dashboard/invoices',
		label: '',
		icon: FileText
	},
	{
		title: 'Orders',
		path: '/dashboard/orders',
		label: '',
		icon: Receipt
	},
	{
		title: 'Products',
		path: '/dashboard/products',
		label: '',
		icon: Package
	},
	{
		title: 'Marketing',
		path: '/dashboard/marketing',
		label: '',
		icon: Megaphone
	}
];

export const secondaryRoutes: Route[] = [
	{
		title: 'Help',
		label: 'Join our Discord',
		path: PUBLIC_DISCORD_URL,
		icon: CircleHelp
	}
];
