<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="container mx-auto p-6">
    <h1 class="mb-6 text-3xl font-bold">Templates</h1>
    <div class="grid gap-6 md:grid-cols-3">
        <a 
            href="/dashboard/modules/business-card"
            class="rounded-lg border p-6 hover:bg-slate-50 dark:border-gray-700 dark:hover:bg-slate-800"
        >
            <h2 class="text-xl font-semibold">Business Cards</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-300">Manage and create business card templates</p>
        </a>
        <a 
            href="/dashboard/modules/invoices"
            class="rounded-lg border p-6 hover:bg-slate-50 dark:border-gray-700 dark:hover:bg-slate-800"
        >
            <h2 class="text-xl font-semibold">Invoices</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-300">Create and manage invoice templates</p>
        </a>
        <a 
            href="/dashboard/modules/websites"
            class="rounded-lg border p-6 hover:bg-slate-50 dark:border-gray-700 dark:hover:bg-slate-800"
        >
            <h2 class="text-xl font-semibold">Websites</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-300">Design and manage website templates</p>
        </a>
    </div>
</div>
