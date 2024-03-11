<script>
    import { cities, preferredLocations } from "$lib/index.js";
    import { CheckCheck, Earth } from "lucide-svelte";
    let input, open;

    import * as Command from "$lib/components/ui/command";
    import { Button } from "$lib/components/ui/button";
</script>

<Button on:click={() => open = true} class="flex w-full p-10 gap-2" variant="outline">
    <Earth class="w-5 h-5" />
    מיקום אחר
</Button>
<Command.Dialog bind:open>
    <Command.Input placeholder="חפש מיקום" class="mr-1" bind:value={input} />
    <Command.List>
        {#if $cities.length === 0}
            <Command.Loading class="text-lg text-center font-semibold p-5">נטען...</Command.Loading>
        {:else}
            <Command.Empty>לא נמצאה תוצאה.</Command.Empty>
            <Command.Group heading="אזורים">
                {#each $cities.slice(0, 100) as city}
                    <Command.Item class="flex flex-row justify-between" disabled="{$preferredLocations.some(e => e[0] === city)}" onSelect={value => $preferredLocations.some(e => e[0] === value) ? null : $preferredLocations = [...$preferredLocations, [value, []]]}>
                        {city}
                        {#if $preferredLocations.some(e => e[0] === city)}
                            <CheckCheck class="!w-4 !h-4" />
                        {/if}
                    </Command.Item>
                {/each}
            </Command.Group>
        {/if}
    </Command.List>
</Command.Dialog>