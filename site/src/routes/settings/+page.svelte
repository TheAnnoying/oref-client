<script>
    import LocationChooser from "$lib/components/ui/settings/location-chooser.svelte";
	import Alert from "$lib/components/ui/alert.svelte";
</script>
<div class="flex flex-col items-center mt-28 mb-10 gap-3">
    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">מיקומים אשר ישמיעו התרעות קוליות:</h3>
    <LocationChooser />
</div>
<div class="fixed bottom-5">
    <Alert />
</div>