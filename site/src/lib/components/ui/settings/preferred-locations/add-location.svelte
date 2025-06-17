<script>
    import { localStorage, preferredLocations, cities } from "$lib/index.js";
    import { Plus, CheckCheck } from "lucide-svelte";
    import { fly } from "svelte/transition";
    
    preferredLocations.subscribe(value => localStorage.set("preferredLocations", JSON.stringify(value)));
    let open = false, input, filteredCities = [];
    $: { filteredCities = $cities.filter(city => city.includes(input)).slice(0, 25); }

    import { Button } from "$lib/components/ui/button";
    import * as Command from "$lib/components/ui/command";
</script>
<div class="flex flex-col items-center w-96">
    <div in:fly={{ y: -5, opacity: 0, delay: 200 }}>
        <Button on:click={() => open = true} variant="ghost" class="transition-all sm:w-96 w-80 h-12 !border-foreground border-2 border-dashed rounded-3xl">
            <Plus class="w-4 h-4" />
        </Button>
        <Command.Dialog label="חיפוש מיקום" shouldFilter={false} bind:open>
            <Command.Input placeholder="חפש מיקום" class="mr-1" bind:value={input} />
            <Command.List>
                {#if $cities.length === 0}
                    <Command.Loading class="text-lg text-center font-semibold p-5">נטען...</Command.Loading>
                {/if}
                <Command.Empty>לא נמצאה תוצאה.</Command.Empty>
                <Command.Group>
                    {#each filteredCities as city}
                        <Command.Item class="flex flex-row justify-between" value={city} disabled="{$preferredLocations.some(e => e[0] === city)}" onSelect={value => $preferredLocations.some(e => e[0] === value) ? null : $preferredLocations = [...$preferredLocations, [value, []]]}>
                            {city}
                            {#if $preferredLocations.some(e => e[0] === city)}
                                <CheckCheck class="!w-4 !h-4" />
                            {/if}
                        </Command.Item>
                    {/each}
                </Command.Group>
            </Command.List>
        </Command.Dialog>
    </div>
</div>