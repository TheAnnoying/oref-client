<script>
    import { onMount } from "svelte";
    import { localStorage } from "$lib/index.ts";
    import { sounds } from "$lib/utils.ts";

    import { Volume2 } from "@lucide/svelte";
    import { fly } from "svelte/transition";

    import * as Select from "$lib/components/ui/select/index.js";
    import { Button } from "$lib/components/ui/button";

    let Howl = $state(), Howler = $state(), currentSound = $state(localStorage.get("sound") ?? "beep");
    $effect(() => {
        localStorage.set("sound", currentSound);
    });

    onMount(async() => {
        const howler = await import("howler");

        Howl = howler.Howl;
        Howler = howler.Howler;
    });
</script>
<div in:fly={{ y: -10, opacity: 0, delay: 400 }}>
    <Select.Root value={currentSound} type="single" onValueChange={value => currentSound = value}>
    <Select.Trigger>{sounds.find(sound => sound.id === currentSound)?.name}</Select.Trigger>
    <Select.Content>
        {#each sounds as sound}
            <div class="flex flex-row gap-1">
            <Button class="bg-transparent hover:bg-border size-auto p-1" variant="outline" size="icon" onclick={() => {
                Howler.stop();
                new Howl({ src: sound.path }).play()
            }}>
                <Volume2 />
            </Button>
            <Select.Item value={sound.id}>
                {sound.name}
            </Select.Item>
            </div>
        {/each}
    </Select.Content>
    </Select.Root>
</div>