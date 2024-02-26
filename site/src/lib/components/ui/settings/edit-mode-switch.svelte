<script>
    import { cn } from "$lib/utils";
    import { editMode, localStorage } from "$lib/index.js";

    editMode.subscribe(value => localStorage.set("editMode", JSON.stringify(value)));
    let className;

    import { Pencil } from "lucide-svelte";
    import { Toggle } from "$lib/components/ui/toggle";
    export { className as class };
</script>
<Toggle id="edit-mode" bind:pressed={$editMode} class={cn(className)}>
    <Pencil class="w-4 h-4" />
</Toggle>