<script>
    import { Howl, Howler } from "howler";
    import { localStorage } from "$lib/index.js";
    import { sounds } from "$lib/utils";

    import { Volume2 } from "lucide-svelte";
    import { fly } from "svelte/transition";

    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Button } from "$lib/components/ui/button";
</script>
<div in:fly={{ y: -10, opacity: 0, delay: 400 }}>
    <RadioGroup.Root value={localStorage.get("sound") ?? "beep"} onValueChange={value => localStorage.set("sound", value)}>
        {#each sounds as sound}
            <div class="flex flex-row items-center gap-2">
                <Button variant="icon" on:click={() => {
                    Howler.stop();
                    new Howl({ src: sound.path }).play()
                }}>
                    <Volume2 />
                </Button>
                <RadioGroup.Item class="!border-t-current" value={sound.id} id={sound.id} />
                <label for="beep">{sound.name}</label>
            </div>
        {/each}
    </RadioGroup.Root>
</div>