<script>
    import LocationChooser from "$lib/components/ui/settings/location-chooser.svelte";
    import EditModeSwitch from "$lib/components/ui/settings/edit-mode-switch.svelte";
	import Alert from "$lib/components/ui/alert.svelte";
</script>
<div class="flex flex-col items-center mt-28 mb-10">
    <div class="flex items-center gap-3 p-3">
        <EditModeSwitch />
    </div>
    <LocationChooser />
</div>
<div class="fixed bottom-5">
    <Alert />
</div>