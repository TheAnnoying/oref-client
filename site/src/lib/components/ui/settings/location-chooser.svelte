<script>
    import { cities, localStorage, preferredLocations } from "$lib/index.js";
    import { fly } from "svelte/transition";
    import { X, Plus } from "lucide-svelte";

    preferredLocations.subscribe(value => localStorage.set("preferredLocations", JSON.stringify(value)));
    let input, taginput, open = false;

    import * as Command from "$lib/components/ui/command";
    import * as Popover from "$lib/components/ui/popover";

    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Input } from "$lib/components/ui/input";
</script>
<div class="flex {input ? "flex-row" : "flex-col"} md:w-[500px] w-[350px] gap-2" transition:fly={{ y: 10, duration: 350 }}>
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
                            <Command.Item onSelect={value => $preferredLocations.some(e => e[0] === value) ? null : $preferredLocations = [...$preferredLocations, [value, []]]}>{city}</Command.Item>
                        {/each}
                    </Command.Group>
                {/if}
            </Command.List>
        {/if}
    </Command.Root>
    <div class="{input ? "w-1/2" : null} duration-150 rounded-lg flex flex-col gap-1 mb-2" transition:fly={{ y: 5, duration: 350, opacity: 0.5, delay: 100 }}>
        {#if $preferredLocations.length > 0}
            {#each $preferredLocations as city}
                <div transition:fly={{ y: 5 }}>
                    <Badge variant="outline" class="flex flex-row justify-between">
                        <div class="flex flex-row gap-1 items-center">
                            <p class="mr-2">{city[0]}</p>
                            {#each city[1] as tag}
                                <div transition:fly={{ y: 3 }}>
                                    <Badge variant="primary" class="h-5">
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
                        </div>
                        <div class="flex flex-row gap-1 ml-2">
                            <Button variant="icon" on:click={() => $preferredLocations = [...$preferredLocations.filter(e => e[0] !== city[0])]}>
                                <X class="w-3 h-3" />
                            </Button>
                            <Popover.Root>
                                <Popover.Trigger>
                                    <Button variant="icon">
                                        <Plus class="w-3 h-3" />
                                    </Button>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <form class="flex flex-row items-center justify-around">
                                        <Input placeholder="הוסף תאג למיקום" class="w-fit" bind:value={taginput} />
                                        <Button disabled={taginput ? "" : "true"} type="submit" size="icon" on:click={() => { $preferredLocations = [...$preferredLocations.map(e => {
                                            if(e[0] === city[0] && !e[1].includes(taginput)) e[1].push(taginput);
                                            return e;
                                        })]; taginput = null }}>
                                            <Plus class="h-4 w-4" />
                                        </Button>
                                    </form>
                                </Popover.Content>
                            </Popover.Root>
                        </div>
                    </Badge>
                </div>
            {/each}
        {:else if $preferredLocations.length === 0}
            <Badge variant="outline" class="flex flex-row justify-between">
                <p class="mr-2">כל הארץ</p>
                <div class="flex flex-row gap-1 ml-2">
                    <Button variant="ghost" class="pointer-events-none p-0"><X class="w-3 h-3 opacity-30" /></Button>
                    <Button variant="ghost" class="pointer-events-none p-0"><Plus class="w-3 h-3 opacity-30" /></Button>
                </div>
            </Badge>
        {/if}
    </div>
</div>