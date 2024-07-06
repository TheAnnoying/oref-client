<script>
    import { toggleMode } from "mode-watcher";
    import { usercount } from "$lib/index.js";
    import { Sun, Moon, Settings2, BarChart } from "lucide-svelte";

    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { fly } from "svelte/transition";

    export let title;
</script>
<div id="navbar" class="sticky top-0 flex items-center backdrop-blur-md p-4 w-full !border-b !border-b-border z-10">
    <div class="flex flex-[1]">
        <Badge variant="outline">
            <BarChart class="h-4 w-4 ml-1" />
            <p class="md:block hidden ml-1">משתמשים:</p>
            <p>{$usercount ?? "0"}</p>
        </Badge>
        <p class="sr-only">כמות האנשים המחוברים לאתר כרגע</p>
    </div>
    <div>
        <a href="/" class="text-xl lowercase select-none" aria-label="עמוד הבית של האתר">Oref Client</a>
        <Badge class="grid place-items-center !border-t-transparent !border-b-transparent">
            {#key title}<span style="grid-row: 1; grid-column: 1;" in:fly={{ y: -12 }} out:fly={{ y: 12 }}>{title}</span>{/key}
        </Badge>
    </div>
    <div class="flex flex-[1] justify-end gap-1">
        <Button variant="outline" size="icon" href="/settings" aria-label="עמוד ההגדרות של האתר"><Settings2 /></Button>
        <Button on:click={toggleMode} variant="outline" size="icon" aria-label="כפתור לשינוי נראות האתר - בהיר או כהה">
            <Sun class="dark:hidden" />
            <Moon class="hidden dark:block" />
        </Button>
    </div>
</div>