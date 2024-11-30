<script lang="ts">
	import type { PageData } from './$types.js';
	import ProfileForm from './profile-form.svelte';
	export let data: PageData;
</script>

<div class="space-y-6">
	<ProfileForm data={data.form} />
</div>
