<script>
    import { cn } from "$lib/utils";
    import { editMode, localStorage } from "$lib/index.js";

    editMode.subscribe(value => localStorage.set("editMode", JSON.stringify(value)));
    let className;

    import * as Tooltip from "$lib/components/ui/tooltip";
    import { Pencil } from "lucide-svelte";
    import { Toggle } from "$lib/components/ui/toggle";
    export { className as class };
</script>
<Tooltip.Root>
    <Tooltip.Trigger>
        <Toggle id="edit-mode" bind:pressed={$editMode} class={cn("m-1", className)} aria-label="מצב עריכה">
            <Pencil class="w-4 h-4" />
        </Toggle>
    </Tooltip.Trigger>
    <Tooltip.Content>מצב עריכה</Tooltip.Content>
</Tooltip.Root>