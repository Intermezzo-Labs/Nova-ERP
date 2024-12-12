import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CRMenu from '../Menu.svelte';

describe('CRMenu', () => {
	const mockMenuItems = [
		{ id: '1', name: 'Contacts', route: '/crm/contacts' },
		{ id: '2', name: 'Companies', route: '/crm/companies' }
	];

	it('renders all menu items', () => {
		render(CRMenu, { props: { menuItems: mockMenuItems } });

		mockMenuItems.forEach((item) => {
			expect(screen.getByText(item.name)).toBeDefined();
		});
	});

	it('applies active styles to current route', () => {
		// Note: You'll need to mock $page store for this test
		render(CRMenu, { props: { menuItems: mockMenuItems } });

		const activeLink = screen.getByText('Contacts').closest('a');
		expect(activeLink).toHaveAttribute('aria-current', 'page');
	});
});
