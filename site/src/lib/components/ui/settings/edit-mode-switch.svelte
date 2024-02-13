<script>
    import { editMode } from "$lib/index.js";
    import { Switch } from "$lib/components/ui/switch";
    let checked = $editMode;
</script>
<div class="flex items-center gap-2">
    <Switch id="edit-mode" style="direction: ltr;" bind:checked onCheckedChange={() => $editMode = !checked} />
    <p for="edit-mode">מצב עריכה</p>
</div>
