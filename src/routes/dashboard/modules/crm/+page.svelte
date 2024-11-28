<script lang="ts">
    import { page } from '$app/stores';
    import type { PageData } from './$types';
    import type { Contact, TableColumn } from '$lib/types/crm';
	import { Button } from '$lib/components/ui/button';
    
    export let data: PageData;
    
    let selectedContacts: Set<string> = new Set();
    let search = '';
    let columns: TableColumn[] = [
        { key: 'name', label: 'Name', visible: true, sortable: true },
        { key: 'email', label: 'Email', visible: true, sortable: true },
        { key: 'phoneNumber', label: 'Phone Number', visible: true, sortable: true },
        { key: 'companyName', label: 'Company Name', visible: true, sortable: true },
        { key: 'status', label: 'Status', visible: true, sortable: true }
    ];
    
    $: visibleColumns = columns.filter(col => col.visible);

    function handleSort(key: keyof Contact) {
        // Implement sorting logic here
        console.log('Sorting by:', key);
    }

    function handleEdit(contact: Contact) {
        // Implement edit logic here
        console.log('Editing contact:', contact);
    }

    function handlePageChange(newPage: number) {
        // Implement page change logic here
        console.log('Changing to page:', newPage);
    }
</script>

<div class="container mx-auto px-4 py-8">
    <div class="mb-8 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-500">Contacts</h1>
        <div class="flex gap-4">
            <Button type="button" size="lg" class="mt-2">
                Create Contact
            </Button>
            <Button type="button" size="lg" class="mt-2">
                Import Contacts
            </Button>
        </div>
    </div>
    
    <div class="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <!-- Search and filters will go here -->
        <div class="relative">
            <input
                type="search"
                bind:value={search}
                placeholder="Search contacts..."
                class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10"
            />
            <!-- Search icon -->
        </div>
    </div>

    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                    <th scope="col" class="w-12 px-6 py-3">
                        <input
                            type="checkbox"
                            class="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                            on:change={(e) => {
                                if (e.currentTarget.checked) {
                                    selectedContacts = new Set(data.contacts.map(contact => contact.id));
                                } else {
                                    selectedContacts.clear();
                                }
                                selectedContacts = selectedContacts;
                            }}
                            checked={selectedContacts.size === data.contacts.length && data.contacts.length > 0}
                        />
                    </th>
                    {#each visibleColumns as column}
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                        >
                            <button
                                class="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
                                on:click={() => handleSort(column.key)}
                            >
                                {column.label}
                                <!-- Add sort indicators here if needed -->
                            </button>
                        </th>
                    {/each}
                    <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-300 bg-white dark:bg-gray-800">
                {#each data.contacts as contact}
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <input
                                type="checkbox"
                                class="rounded border-gray-300"
                                checked={selectedContacts.has(contact.id)}
                                on:change={(e) => {
                                    if (e.currentTarget.checked) {
                                        selectedContacts.add(contact.id);
                                    } else {
                                        selectedContacts.delete(contact.id);
                                    }
                                    selectedContacts = selectedContacts;
                                }}
                            />
                        </td>
                        {#each visibleColumns as column}
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                {#if column.key === 'status'}
                                    <span
                                        class="inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 shadow-sm ring-1 ring-inset transition-colors duration-200"
                                        class:bg-green-100={contact.status === 'active'}
                                        class:text-green-800={contact.status === 'active'}
                                        class:ring-green-600={contact.status === 'active'}
                                        class:dark:bg-green-900={contact.status === 'active'}
                                        class:dark:text-green-400={contact.status === 'active'}
                                        class:bg-yellow-100={contact.status === 'opportunity'}
                                        class:text-yellow-800={contact.status === 'opportunity'}
                                        class:ring-yellow-600={contact.status === 'opportunity'}
                                        class:dark:bg-yellow-900={contact.status === 'opportunity'}
                                        class:dark:text-yellow-400={contact.status === 'opportunity'}
                                        class:bg-blue-100={contact.status === 'follow-up'}
                                        class:text-blue-800={contact.status === 'follow-up'}
                                        class:ring-blue-600={contact.status === 'follow-up'}
                                        class:dark:bg-blue-900={contact.status === 'follow-up'}
                                        class:dark:text-blue-400={contact.status === 'follow-up'}
                                        class:bg-purple-100={contact.status === 'in-progress'}
                                        class:text-purple-800={contact.status === 'in-progress'}
                                        class:ring-purple-600={contact.status === 'in-progress'}
                                        class:dark:bg-purple-900={contact.status === 'in-progress'}
                                        class:dark:text-purple-400={contact.status === 'in-progress'}
                                    >
                                        {contact[column.key]}
                                    </span>
                                {:else}
                                    {contact[column.key]}
                                {/if}
                            </td>
                        {/each}
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                                class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                                on:click={() => handleEdit(contact)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <!-- Add pagination controls below the table -->
    <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <span class="text-sm text-gray-700 dark:text-gray-300">
                Showing {(data.page - 1) * data.perPage + 1} to {Math.min(data.page * data.perPage, data.total)} of {data.total} results
            </span>
        </div>
        <div class="flex items-center gap-2">
            <button
                class="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm 
                       text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={data.page === 1}
                on:click={() => handlePageChange(data.page - 1)}
            >
                Previous
            </button>
            <button
                class="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:opacity-50"
                disabled={data.page * data.perPage >= data.total}
                on:click={() => handlePageChange(data.page + 1)}
            >
                Next
            </button>
        </div>
    </div>
</div>

<style lang="postcss">
    /* Add any custom styles here */
</style>
