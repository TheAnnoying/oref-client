<script>
    import { toggleMode } from "mode-watcher";
    import { usercount, muted, localStorage } from "$lib/index.js";
    import { Sun, Moon, Settings2, BarChart, MapPin, Volume2, VolumeX } from "lucide-svelte";

    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { fly } from "svelte/transition";

    export let forceFloating = false;
    export let title;

    muted.subscribe(value => {
        localStorage.set("muted", value.toString());
    });
</script>
<div id="navbar" class="{forceFloating ? '' : 'sm:top-0 sm:rounded-none sm:w-full sm:!border-b-border'} transition-all sticky bg-background bg-opacity-40 top-2 flex items-center rounded-md backdrop-blur-lg p-4 w-3/4 !border-b !border-b-destructive z-10">
    <div class="flex flex-[1] gap-1">
        <Badge variant="outline">
            <BarChart class="h-4 w-4 ml-1" />
            <p class="{forceFloating ? '' : 'md:block'} hidden ml-1">משתמשים:</p>
            <p>{$usercount ?? "0"}</p>
        </Badge>
        <p class="sr-only">כמות האנשים המחוברים לאתר כרגע</p>
        <Button on:click={() => $muted = !$muted} class="bg-transparent h-auto w-auto p-1" variant="outline" size="icon" aria-label="השתקה">
            {#if $muted}
                <VolumeX size="16" />
            {:else}
                <Volume2 size="16" />
            {/if}
        </Button>
    </div>
    <div>
        <a href="/" class="text-center text-xl lowercase select-none" aria-label="עמוד הבית של האתר">Oref Client</a>
        <Badge class="{forceFloating ? '' : 'sm:grid'} hidden place-items-center !border-t-transparent !border-b-transparent">
            {#key title}<span style="grid-row: 1; grid-column: 1;" in:fly={{ y: -12 }} out:fly={{ y: 12 }}>{title}</span>{/key}
        </Badge>
    </div>
    <div class="flex flex-[1] justify-end gap-1">
        <Button class="bg-opacity-30" variant="outline" size="icon" href="/map" aria-label="עמוד המפה של האתר"><MapPin /></Button>
        <Button class="bg-opacity-30" variant="outline" size="icon" href="/settings" aria-label="עמוד ההגדרות של האתר"><Settings2 /></Button>
        <Button class="bg-opacity-30" on:click={toggleMode} variant="outline" size="icon" aria-label="כפתור לשינוי נראות האתר - בהיר או כהה">
            <Sun class="hidden dark:block" />
            <Moon class="dark:hidden" />
        </Button>
    </div>
</div>