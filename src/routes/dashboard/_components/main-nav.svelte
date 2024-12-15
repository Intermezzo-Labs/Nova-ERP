<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';

	let className: string | undefined | null = undefined;
	export { className as class };

	const buildItem = (slug: string, label: string) => ({
		path: slug ? `/dashboard/${slug}` : '/dashboard',
		label
	});
	const menuItems = [
		buildItem('', 'Overview'),
		buildItem('customers', 'Customers'),
		buildItem('products', 'Products'),
		buildItem('orders', 'Orders'),
		buildItem('marketing', 'Marketing')
	];

	$: activeRoute = $page.url.pathname;
	const isActive = (path: string) => (activeRoute.startsWith(path) ? 'page' : undefined);
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
	{#each menuItems as item}
		<a
			class={cn(
				'text-sm font-medium transition-colors hover:text-primary',
				!isActive(item.path) && 'text-muted-foreground'
			)}
			href={item.path}
			role="menuitem"
			aria-current={isActive(item.path) ? 'page' : undefined}
		>
			{item.label}
		</a>
	{/each}
</nav>
