<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types.js';
	import PreferencesForm from './preferences-form.svelte';
	export let data: PageData;

	let logoUrl: string | null = null;
	const downloadImage = async (path: string) => {
		try {
			const { data: logoBlob, error } = await data.supabase.storage.from('logos').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(logoBlob);
			logoUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	$: if (data.logoUrl) downloadImage(data.logoUrl);
</script>

{#snippet logo()}
	{#if logoUrl}
		<img src={logoUrl} alt="logo" class="h-48 object-contain" />
	{/if}
{/snippet}

<div class="space-y-6">
	<PreferencesForm data={data.form} {logo} />
</div>
