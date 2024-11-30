<script lang="ts">
    import { Button } from "$lib/components/ui/button";
</script>

<div class="container mx-auto p-6">
    <div class="mb-6 flex items-center justify-between">
        <h1 class="text-3xl font-bold">Invoice Templates</h1>
        <Button>Create Template</Button>
    </div>
    
    <div class="grid gap-6 md:grid-cols-2">
        <!-- Template cards will go here -->
        <div class="rounded-lg border p-4 dark:border-gray-700">
            <div class="aspect-[1.414] w-full rounded bg-slate-100 dark:bg-slate-800"></div>
            <h3 class="mt-4 font-semibold">Standard Invoice</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Professional invoice layout</p>
        </div>
    </div>
</div>
