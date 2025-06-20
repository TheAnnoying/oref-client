<script lang="ts">
    import { toggleMode } from "mode-watcher";
    import { usercount, muted, localStorage } from "$lib/index.ts";
    import { Sun, Moon, Settings2, ChartNoAxesColumnIncreasing, MapPin, Volume2, VolumeX, House } from "@lucide/svelte";

    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator/index.js";

    /**
     * @typedef {Object} Props
     * @property {any} title
     */

    /** @type {Props} */
    let { route } = $props();

    muted.subscribe(value => {
        localStorage.set("muted", value.toString());
    });
</script>
<div class="bg-accent/[var(--bg-opacity)] [--bg-opacity:40%] sticky top-2 flex items-center rounded-2xl backdrop-blur-lg p-2 gap-6 z-10">
    <div class="flex flex-1 gap-1">
        <Badge variant="outline">
            <ChartNoAxesColumnIncreasing size="16" />
            <p>{$usercount ?? "0"}</p>
        </Badge>
        <p class="sr-only">כמות האנשים המחוברים לאתר כרגע</p>
        <Button onclick={() => $muted = !$muted} class="bg-transparent hover:bg-border size-auto p-1" variant="outline" size="icon" aria-label="השתקה">
            {#if $muted}
                <VolumeX size="16" />
            {:else}
                <Volume2 size="16" />
            {/if}
        </Button>
        <Button onclick={toggleMode} class="bg-transparent hover:bg-border size-auto p-1" variant="outline" size="icon" aria-label="בהיר או כהה">
            <Sun class="hidden dark:block" />
            <Moon class="dark:hidden" />
        </Button>
    </div>
    <Separator orientation="vertical" class="h-7" />
    <Tabs.Root value={route}>
    <Tabs.List>
        <a href="/"><Tabs.Trigger value="/" class="flex items-center gap-1">
            <House size="20" />
            <span class="hidden sm:block">בית</span>
        </Tabs.Trigger></a>
        <a href="/map"><Tabs.Trigger value="/map" class="flex items-center gap-1">
            <MapPin size="20" />
            <span class="hidden sm:block">מפה</span>
        </Tabs.Trigger></a>
        <a href="/settings"><Tabs.Trigger value="/settings" class="flex items-center gap-1">
            <Settings2 size="20" />
            <span class="hidden sm:block">הגדרות</span>
        </Tabs.Trigger></a>
    </Tabs.List>
    </Tabs.Root>
</div>