<script>
    import { editMode, localStorage } from "$lib/index.js";
    editMode.subscribe(value => localStorage.set("editMode", JSON.stringify(value)));

    import { Switch } from "$lib/components/ui/switch";
</script>
<div class="flex items-center gap-2">
    <Switch id="edit-mode" style="direction: ltr;" bind:checked={$editMode} />
    <p for="edit-mode">מצב עריכה</p>
</div>