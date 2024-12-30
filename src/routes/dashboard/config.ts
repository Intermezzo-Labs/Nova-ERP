import {
	ChartColumnIncreasing,
	CircleHelp,
	FileText,
	FlaskConical,
	Megaphone,
	MessageSquare,
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
};

export const primaryRoutes: Route[] = [
	{
		title: 'Experimental Agent',
		path: '/dashboard/experimental/ai-agent',
		label: '',
		icon: FlaskConical
	},
	{
		title: 'Dashboard',
		path: '/dashboard',
		label: '128',
		icon: ChartColumnIncreasing
	},
	{
		title: 'Customers',
		path: '/dashboard/customers',
		label: '9',
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
		label: '23',
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
		label: '',
		path: '/dashboard/help',
		icon: CircleHelp
	},
	{
		title: 'Join our Discord',
		label: '',
		icon: MessageSquare
	}
];
