<script>
    import LocationChooser from "$lib/components/ui/settings/location-chooser.svelte";
	import Alert from "$lib/components/ui/alert.svelte";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { fade } from "svelte/transition";

    let checked;
</script>
<div class="flex flex-col items-center mt-28 mb-10">
    <div class="flex items-center gap-3 p-3">
        <Checkbox id="only_show_selected_location_alerts_in_history" bind:checked />
        <p>ההיסטוריה תראה רק התרעות מהמיקומים המוגדרים</p>
    </div>
    <LocationChooser />
</div>
<div class="fixed bottom-5" transition:fade={{ duration: 350 }}>
    <Alert />
</div>