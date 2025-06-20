<script>
    import { preferredLocations } from "$lib/index.ts";
    import { X, Plus, Trash2 } from "@lucide/svelte";
    let tagInput = $state();

    import * as Popover from "$lib/components/ui/popover";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Input } from "$lib/components/ui/input";
</script>
{#if $preferredLocations.length > 0}
    {#each $preferredLocations as city}
        <div>
            <Badge variant="outline" class="transition-all mb-2 sm:w-96 w-80 flex flex-row justify-between overflow-auto overflow-y-hidden">
                <div class="flex flex-row items-center gap-2 mr-2">
                    <p>{city[0]}</p>
                    {#each city[1] as tag}
                        <Badge variant="outline" class="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-400 dark:border-yellow-500/30 border-t-yellow-500/30! dark:border-b-yellow-500/30! border-b-yellow-400!">
                            {tag}
                            <Button class="bg-transparent hover:bg-yellow-500/20 size-auto" variant="destructive" size="icon" onclick={() => $preferredLocations = [...$preferredLocations.map(e => {
                                if(e[0] === city[0]) e[1] = e[1].filter(t => t !== tag);
                                return e;
                            })]}>
                                <X size="10" />
                            </Button>
                        </Badge>
                    {/each}
                    <Popover.Root>
                        <Popover.Trigger>
                            <Button class="bg-transparent hover:bg-border size-auto p-1 my-1" variant="outline" size="icon">
                                <Plus size="12" />
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content class="transition-all w-fit">
                            <form class="flex flex-row items-center justify-between gap-3" style="direction: rtl;">
                                <Input placeholder="הוסף תג למיקום" class="w-fit" bind:value={tagInput} />
                                <Button disabled={tagInput && !$preferredLocations.flatMap(() => city[1]).includes(tagInput) ? false : true} type="submit" size="icon" onclick={() => { $preferredLocations = [...$preferredLocations.map(e => {
                                    if(e[0] === city[0] && !e[1].includes(tagInput)) e[1].push(tagInput);
                                    return e;
                                })]; tagInput = null }}>
                                    <Plus size="16" />
                                </Button>
                            </form>
                        </Popover.Content>
                    </Popover.Root>
                </div>
                <Button class="bg-transparent hover:bg-border size-auto p-1 my-1" variant="outline" size="icon" onclick={() => $preferredLocations = [...$preferredLocations.filter(e => e[0] !== city[0])]}>
                    <Trash2 size="12" />
                </Button>
            </Badge>
        </div>
    {/each}
{:else if $preferredLocations.length === 0}
    <Badge variant="outline" class="transition-all sm:w-96 w-80 h-10 flex flex-row justify-center">כל הארץ</Badge>
{/if}