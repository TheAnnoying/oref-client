<script>
    import * as Dialog from "$lib/components/ui/dialog";
    import { buttonVariants } from "$lib/components/ui/button";
    import { MapPin } from "lucide-svelte";

    let latitude, longitude, accuracy;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            accuracy = position.coords.accuracy;
        },
        () => { alert('Please enable your GPS position feature.') },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
    } else {
        alert("Geolocation API is not supported in your browser.");
    }
</script>

<Dialog.Root>
    <Dialog.Trigger class="{buttonVariants({ variant: "outline" })} flex w-full !p-10 gap-2 select-none" disabled=true>
        <MapPin class="w-5 h-5" />
        מיקום נוכחי
    </Dialog.Trigger>
    <Dialog.Content>
        <p>latitude: {latitude}, longitude: {longitude}, accuracy: {accuracy}</p>
    </Dialog.Content>
</Dialog.Root>