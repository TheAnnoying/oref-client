<script>
    import { cities, localStorage, preferredLocations } from "$lib/index.js";
    import { fly } from "svelte/transition";

    preferredLocations.subscribe(value => localStorage.set("preferredLocations", value));

    import * as Command from "$lib/components/ui/command";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { X, Plus } from "lucide-svelte";

    let input;
</script>
<div class="flex {input ? "flex-row" : "flex-col"} md:w-[500px] w-[400px] gap-2">
    <Command.Root class="{input ? "w-1/2" : null} duration-150 rounded-lg border shadow-md" loop>
        <Command.Input placeholder="חפש מיקום" class="mr-1" bind:value={input} />
        {#if input}
            <Command.List>
                {#if $cities.length === 0}
                    <Command.Loading class="text-lg text-center font-semibold p-5">נטען...</Command.Loading>
                {:else}
                    <Command.Empty>לא נמצאה תוצאה.</Command.Empty>
                    <Command.Group heading="אזורים">
                        {#each $cities.slice(0, 100) as city}
                            <Command.Item onSelect={value => !$preferredLocations.includes(value) ? $preferredLocations = [...$preferredLocations, value] : null}>{city}</Command.Item>
                        {/each}
                    </Command.Group>
                {/if}
            </Command.List>
        {/if}
    </Command.Root>
    <div class="{input ? "w-1/2" : null} duration-150 rounded-lg flex flex-col gap-1 mb-2">
        {#if $preferredLocations.length > 0}
            {#each $preferredLocations as city}
                <div transition:fly={{ y: 5 }}>
                    <Badge variant="outline" class="flex flex-row justify-between">
                        <p class="mr-2">{city}</p>
                        <div class="flex flex-row gap-1 ml-2">
                            <Button variant="ghost" class="hover:bg-transparent p-0" on:click={() => $preferredLocations = [...$preferredLocations.filter(e => e !== city)]}>
                                <X class="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" class="hover:bg-transparent p-0">
                                <Plus class="w-3 h-3" />
                            </Button>
                        </div>
                    </Badge>
                </div>
            {/each}
        {:else if $preferredLocations.length === 0}
            <p class="border text-center p-5 rounded-lg">כל הארץ</p>
        {/if}
    </div>
</div>