<script>
    import { localStorage, preferredLocations } from "$lib/index.js";
    import { Plus } from "lucide-svelte";
    import { fly } from "svelte/transition";

    preferredLocations.subscribe(value => localStorage.set("preferredLocations", JSON.stringify(value)));
    let open = false;

    import { buttonVariants } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";

    import PreferredLocationList from "./preferred-location-list.svelte";
    import FullLocationList from "./full-location-list.svelte";
    import DynamicGeolocation from "./dynamic-geolocation.svelte";
</script>
<div class="flex flex-col items-center w-96">
    <div class="duration-150 grid gap-2 mb-2" in:fly={{ y: 10, duration: 350, opacity: 0, delay: 100 }}>
        <PreferredLocationList />
    </div>
    <div in:fly={{ y: -5, opacity: 0, delay: 200 }}>
        <Dialog.Root bind:open={open}>
            <Dialog.Trigger class="{buttonVariants({ variant: "ghost" })} sm:w-96 w-80 h-12 !border-foreground border-2 border-dashed rounded-3xl">
                <Plus class="w-4 h-4" />
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header><Dialog.Title>הוסף מיקום</Dialog.Title></Dialog.Header>
                <div class="flex flex-row gap-2">
                    <DynamicGeolocation />
                    <FullLocationList />
                </div>
            </Dialog.Content>
        </Dialog.Root>
    </div>
</div>