<script>
    import { toggleMode } from "mode-watcher";
    import { usercount } from "$lib/index.js";
    import { Sun, Moon, Settings2, BarChart } from "lucide-svelte";

    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import * as Tooltip from "$lib/components/ui/tooltip";
</script>
<div class="fixed top-0 flex items-center backdrop-blur-md p-4 w-full border-b z-10">
    <div class="flex flex-[1]">
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Badge variant="outline">
                    <BarChart class="h-4 w-4 ml-1" />
                    <p class="md:block hidden ml-1">משתמשים:</p>
                    <p>{$usercount ?? "0"}</p>
                </Badge>
            </Tooltip.Trigger>
            <Tooltip.Content>כמות האנשים המחוברים לאתר כרגע</Tooltip.Content>
        </Tooltip.Root>
    </div>
    <Tooltip.Root>
        <Tooltip.Trigger><a href="/" class="text-xl lowercase select-none">Oref Client</a></Tooltip.Trigger>
        <Tooltip.Content>עמוד הבית של האתר</Tooltip.Content>
    </Tooltip.Root>
    <div class="flex flex-[1] justify-end gap-1">
        <Tooltip.Root>
            <Tooltip.Trigger><Button variant="outline" size="icon" href="/settings"><Settings2 /></Button></Tooltip.Trigger>
            <Tooltip.Content>הגדרות האתר</Tooltip.Content>
        </Tooltip.Root>
        <Button on:click={toggleMode} variant="outline" size="icon">
            <Sun class="dark:hidden" />
            <Moon class="hidden dark:block" />
        </Button>
    </div>
</div>