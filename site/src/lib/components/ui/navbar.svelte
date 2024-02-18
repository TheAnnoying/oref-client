<script>
    import { toggleMode } from "mode-watcher";
    import { usercount } from "$lib/index.js";
    import { Sun, Moon, Settings2, BarChart } from "lucide-svelte";

    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
</script>
<div class="fixed top-0 flex items-center backdrop-blur-md p-4 w-full border-b z-10">
    <div class="flex flex-[1]">
        <Badge variant="outline">
            <BarChart class="h-4 w-4 ml-1" />
            <p class="md:block hidden ml-1">משתמשים:</p>
            <p>{$usercount ?? "0"}</p>
        </Badge>
        <p class="sr-only">כמות האנשים המחוברים לאתר כרגע</p>
    </div>
    <a href="/" class="text-xl lowercase select-none" aria-label="עמוד הבית של האתר">Oref Client</a>
    <p class="sr-only">עמוד הבית של האתר</p>
    <div class="flex flex-[1] justify-end gap-1">
        <Button variant="outline" size="icon" href="/settings" aria-label="עמוד ההגדרות של האתר"><Settings2 /></Button>
        <p class="sr-only">הגדרות האתר</p>
        <Button on:click={toggleMode} variant="outline" size="icon" aria-label="כפתור לשינוי נראות האתר - בהיר או כהה">
            <Sun class="dark:hidden" />
            <Moon class="hidden dark:block" />
        </Button>
    </div>
</div>