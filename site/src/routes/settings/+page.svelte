<script>
    import { fly } from "svelte/transition";

    import LocationSettings from "$lib/components/ui/settings/preferred-locations/add-location.svelte";
	import Alert from "$lib/components/ui/alert.svelte";
    import AlertSound from "$lib/components/ui/settings/alert-sound.svelte";
</script>
<div class="flex flex-col items-center mt-28 mb-10 gap-3 max-w-7xl">
    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight" in:fly={{ y: -5, opacity: 0 }}>מיקומים אשר ישמיעו התרעות קוליות:</h3>
    <LocationSettings />
    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight" in:fly={{ y: -5, opacity: 0 }}>קול התרעה:</h3>
    <AlertSound />
</div>
<div class="fixed bottom-5">
    <Alert />
</div>