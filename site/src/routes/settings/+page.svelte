<script>
    import { fly } from "svelte/transition";

    import LocationSettings from "$lib/components/ui/settings/preferred-locations/add-location.svelte";
    import PreferredLocationList from "$lib/components/ui/settings/preferred-locations/preferred-location-list.svelte";
	import Alert from "$lib/components/ui/alert.svelte";
    import AlertSound from "$lib/components/ui/settings/alert-sound.svelte";
</script>
<div class="flex flex-col items-center mt-28 mb-10 gap-3 max-w-7xl">
    <h1 class="scroll-m-20 text-3xl font-semibold tracking-tight" in:fly={{ y: -5, opacity: 0 }}>הגדרות</h1>
    <div>
        <div class="flex md:flex-row flex-col justify-between !border-t-border border-t-2 p-8">
            <div in:fly={{ y: -5, opacity: 0 }}>
                <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">התרעות קוליות</h3>
                <p>כאשר יש התרעה באחד מהמיקומים הללו, ישמע קול.<br>אם אף מיקום לא צויין, כל התרעה תשמיע קול.</p>
                <div class="mt-5 ml-5">
                    <LocationSettings />
                </div>
            </div>
            <div class="flex flex-col items-center max-h-56 my-2 overflow-auto" in:fly={{ y: 10, duration: 350, opacity: 0, delay: 100 }}>
                <PreferredLocationList />
            </div>
        </div>
        <div class="flex md:flex-row flex-col justify-between !border-y-border border-y-2 p-8">
            <div in:fly={{ y: -5, opacity: 0 }}>
                <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">קול התרעה</h3>
                <p>ניתן לבחור איזה קול ישמיע האתר בעת התרעה.</p>
            </div>
            <div>
                <AlertSound />
            </div>
        </div>
    </div>
</div>
<div class="fixed bottom-5">
    <Alert />
</div>