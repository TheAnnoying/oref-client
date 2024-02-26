<script>
    import { cities, localStorage, preferredLocations } from "$lib/index.js";
    import { fly } from "svelte/transition";

    preferredLocations.subscribe(value => localStorage.set("preferredLocations", JSON.stringify(value)));
    let input;

    import EditModeSwitch from "$lib/components/ui/settings/edit-mode-switch.svelte";
    import PreferredLocationList from "./preferred-location-list.svelte";
    import * as Command from "$lib/components/ui/command";
</script>
<div class="flex {input ? "flex-row" : "flex-col"} md:w-[500px] w-[350px] gap-2" in:fly={{ y: 10, duration: 350 }}>
    <div class="flex flex-row justify-center items-center gap-2 duration-150 {input ? "w-1/2" : ""}">
        <Command.Root class="rounded-lg border shadow-md " loop>
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
        <EditModeSwitch class={input ? "hidden" : ""} />
    </div>
    <div class="{input ? "w-1/2" : ""} duration-150 rounded-lg flex flex-col gap-1 mb-2" in:fly={{ y: 5, duration: 350, opacity: 0.5, delay: 100 }}>
        <PreferredLocationList />
    </div>
</div>