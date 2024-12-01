<script lang="ts">
    import { toPng } from 'html-to-image';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import type { PageData } from './$types';
    
    export let data: PageData;
    let userData = data.userData || {
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        phone: '',
        address: '',
        website: '',
        logo_url: ''
    };
    let cardRef: HTMLDivElement;
    $: browser = typeof window !== 'undefined';
    
    // Add placeholder logo if none provided
    const placeholderLogo = "data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='80' rx='40' fill='%23E2E8F0'/%3E%3Cpath d='M40 38.5C44.1421 38.5 47.5 35.1421 47.5 31C47.5 26.8579 44.1421 23.5 40 23.5C35.8579 23.5 32.5 26.8579 32.5 31C32.5 35.1421 35.8579 38.5 40 38.5Z' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M54.5 56.5C54.5 50.9772 47.9558 46.5 40 46.5C32.0442 46.5 25.5 50.9772 25.5 56.5' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
    
    // Add function to handle responsive card scaling
    function getCardScale() {
        if (browser) {
            return Math.min(1, (window.innerWidth - 64) / 600);
        }
        return 1;
    }

    let cardScale = 1; // default value

    $: if (browser) {
        cardScale = getCardScale();
        window.addEventListener('resize', () => {
            cardScale = getCardScale();
        });
    }
    
    async function downloadBusinessCard() {
        if (!cardRef) return;
        
        try {
            const dataUrl = await toPng(cardRef, {
                quality: 1.0,
                pixelRatio: 2
            });
            
            const link = document.createElement('a');
            const fileName = `business-card-${userData.first_name || 'user'}-${userData.last_name || 'card'}`.toLowerCase().replace(/\s+/g, '-');
            link.download = `${fileName}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Error generating business card:', err);
        }
    }
</script>

<div class="container mx-auto p-4 sm:p-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 class="text-2xl font-bold mb-4 sm:mb-0">Business Card Generator</h1>
        <Button 
            on:click={downloadBusinessCard}
            class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
            Download Business Card
        </Button>
    </div>
    
    <!-- Business Card Preview -->
    <div class="mb-4 sm:mb-8 flex justify-center sm:justify-start">
        <div class="overflow-x-auto w-full flex justify-center sm:justify-start">
            <div 
                style="transform: scale({cardScale}); transform-origin: {browser && window.innerWidth <= 640 ? 'center' : 'left'} top;"
                class="min-w-[600px]"
            >
                <div
                    bind:this={cardRef}
                    class="w-[600px] h-[336px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg shadow-2xl p-12 relative overflow-hidden"
                >
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl rounded-full transform translate-x-24 -translate-y-24"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-sky-500/10 blur-3xl rounded-full transform -translate-x-24 translate-y-24"></div>
            
            <!-- Content Container -->
            <div class="relative z-10 h-full flex flex-col sm:flex-row justify-between">
                <!-- Left Side: Contact Information -->
                <div class="flex flex-col justify-between mb-6 sm:mb-0">
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-1">
                            {userData.first_name || 'John'} {userData.last_name || 'Doe'}
                        </h2>
                        {#if userData.company}
                            <p class="text-emerald-400 font-medium text-base sm:text-lg mb-4 sm:mb-6">{userData.company}</p>
                        {/if}
                    </div>
                    
                    <div class="space-y-2 text-slate-300 text-sm sm:text-base">
                        {#if userData.email}
                            <p class="flex items-center gap-2 break-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                {userData.email}
                            </p>
                        {/if}
                        {#if userData.phone}
                            <p class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                {userData.phone}
                            </p>
                        {/if}
                        {#if userData.website}
                            <p class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                                {userData.website}
                            </p>
                        {/if}
                        {#if userData.address}
                            <p class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                {userData.address}
                            </p>
                        {/if}
                    </div>
                </div>
                
                <!-- Right Side: Logo -->
                <div class="flex items-start justify-end">
                    <img
                        src={userData.logo_url || placeholderLogo}
                        alt="Company Logo"
                        class="w-16 h-16 sm:w-24 sm:h-24 object-contain rounded-lg bg-white/10 p-2"
                    />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Add smooth transitions for scaling */
    div[style*="transform: scale"] {
        transition: transform 0.2s ease-out;
    }
</style>
    </div>

    <!-- Edit Form -->
    <div class="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-8">
            <Input
                type="text"
                placeholder="First Name"
                bind:value={userData.first_name}
            />
            <Input
                type="text"
                placeholder="Last Name"
                bind:value={userData.last_name}
            />
            <Input
                type="text"
                placeholder="Company"
                bind:value={userData.company}
            />
            <Input
                type="tel"
                placeholder="Phone"
                bind:value={userData.phone}
            />
            <Input
                type="text"
                placeholder="Address"
                bind:value={userData.address}
                class="w-full sm:col-span-2"
            />
            <Input
                type="url"
                placeholder="Website"
                bind:value={userData.website}
                class="w-full sm:col-span-2"
            />
            <Input
                type="url"
                placeholder="Logo URL"
                bind:value={userData.logo_url}
                class="w-full sm:col-span-2"
            />
        </div>

    </div>
</div>
