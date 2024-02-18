<script>
    import { preferredLocations, editMode } from "$lib/index.js";
    import { X, Plus, Trash2 } from "lucide-svelte";
    import * as Popover from "$lib/components/ui/popover";
    import { fly } from "svelte/transition";

    let taginput;

    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Input } from "$lib/components/ui/input";
</script>
{#if $preferredLocations.length > 0}
    {#each $preferredLocations as city}
        <div transition:fly={{ y: 5 }}>
            <Badge variant="outline" class="h-12 flex flex-row justify-between">
                <div class="flex flex-row items-center gap-2 mr-2">
                    <p>{city[0]}</p>
                    {#each city[1] as tag}
                        <div transition:fly={{ y: 3 }}>
                            <Badge variant="primary" class="flex flex-row gap-2 h-5">
                                {tag}
                                {#if $editMode}
                                    <Button variant="icon" on:click={() => $preferredLocations = [...$preferredLocations.map(e => {
                                        if(e[0] === city[0]) e[1] = e[1].filter(t => t !== tag);
                                        return e;
                                    })]}>
                                        <X class="w-3 h-3" />
                                    </Button>
                                {/if}
                            </Badge>
                        </div>
                    {/each}
                    {#if $editMode}
                        <Popover.Root>
                            <Popover.Trigger>
                                <Button variant="icon">
                                    <Plus class="w-3 h-3" />
                                </Button>
                            </Popover.Trigger>
                            <Popover.Content class="transition-all">
                                <form class="flex flex-row items-center justify-around">
                                    <Input placeholder="הוסף תאג למיקום" class="w-fit" bind:value={taginput} />
                                    <Button disabled={taginput && !$preferredLocations.flatMap(() => city[1]).includes(taginput) ? "" : "true"} type="submit" size="icon" on:click={() => { $preferredLocations = [...$preferredLocations.map(e => {
                                        if(e[0] === city[0] && !e[1].includes(taginput)) e[1].push(taginput);
                                        return e;
                                    })]; taginput = null }}>
                                        <Plus class="h-4 w-4" />
                                    </Button>
                                </form>
                            </Popover.Content>
                        </Popover.Root>
                    {/if}
                </div>
                {#if $editMode}
                    <Button variant="icon" class="ml-2" on:click={() => $preferredLocations = [...$preferredLocations.filter(e => e[0] !== city[0])]}>
                        <Trash2 class="w-3 h-3" />
                    </Button>
                {/if}
            </Badge>
        </div>
    {/each}
{:else if $preferredLocations.length === 0}
    <Badge variant="outline" class="flex flex-row justify-between">
        <p class="mr-2">כל הארץ</p>
        <Button variant="ghost" class="pointer-events-none p-0 ml-2"><Trash2 class="w-3 h-3 opacity-30" /></Button>
    </Badge>
{/if}