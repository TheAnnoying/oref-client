<script>
    import { preferredLocations } from "$lib/index.js";
    import { X, Plus, Trash2 } from "lucide-svelte";
    import { fly } from "svelte/transition";
    let taginput;

    import * as Popover from "$lib/components/ui/popover";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Input } from "$lib/components/ui/input";
</script>
{#if $preferredLocations.length > 0}
    {#each $preferredLocations as city}
        <div transition:fly={{ y: 5 }}>
            <Badge variant="outline" class="mb-2 sm:w-96 w-80 h-12 flex flex-row justify-between overflow-auto overflow-y-hidden">
                <div class="flex flex-row items-center gap-2 mr-2">
                    <p>{city[0]}</p>
                    {#each city[1] as tag}
                        <div transition:fly={{ y: 3 }}>
                            <Badge variant="primary" class="flex flex-row gap-2 h-5">
                                {tag}
                                <Button variant="icon" on:click={() => $preferredLocations = [...$preferredLocations.map(e => {
                                    if(e[0] === city[0]) e[1] = e[1].filter(t => t !== tag);
                                    return e;
                                })]}>
                                    <X class="w-3 h-3" />
                                </Button>
                            </Badge>
                        </div>
                    {/each}
                    <Popover.Root>
                        <Popover.Trigger>
                            <Button variant="icon">
                                <Plus class="w-3 h-3" />
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content class="transition-all">
                            <form class="flex flex-row items-center justify-between gap-5">
                                <Input placeholder="הוסף תג למיקום" class="w-fit" bind:value={taginput} />
                                <Button disabled={taginput && !$preferredLocations.flatMap(() => city[1]).includes(taginput) ? "" : "true"} type="submit" size="icon" on:click={() => { $preferredLocations = [...$preferredLocations.map(e => {
                                    if(e[0] === city[0] && !e[1].includes(taginput)) e[1].push(taginput);
                                    return e;
                                })]; taginput = null }}>
                                    <Plus class="h-4 w-4" />
                                </Button>
                            </form>
                        </Popover.Content>
                    </Popover.Root>
                </div>
                <Button variant="icon" class="ml-2" on:click={() => $preferredLocations = [...$preferredLocations.filter(e => e[0] !== city[0])]}>
                    <Trash2 class="w-3 h-3" />
                </Button>
            </Badge>
        </div>
    {/each}
{:else if $preferredLocations.length === 0}
    <Badge variant="outline" class="sm:w-96 w-80 h-12 flex flex-row justify-center">כל הארץ</Badge>
{/if}