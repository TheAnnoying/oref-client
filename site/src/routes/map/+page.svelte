<script lang="ts">
    import "leaflet/dist/leaflet.css";
	import locationList from "/src/locations.json";
    import { onMount, tick } from "svelte";
    import { alert } from "$lib/index.ts";
    import { fly } from "svelte/transition";
    let locationsFound = [];

    onMount(async() => {
		const L = await import("leaflet");

		const markerIcon = L.icon({
			iconUrl: "/marker-icon.svg",
			iconSize: [30, 42]
		});

        const map = L.map("map", { zoomControl: false }).setView([31.0461, 34.8516], 13);
        map.setZoom(8);
        
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 13,
            minZoom: 6,
            attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        }).addTo(map);

		alert.subscribe(data => {
			tick().then(() => {
				const location = data.locations ?? [];

				location.forEach(location => {
					if(locationList[location]) locationsFound.push(location);
				});

                locationsFound.forEach(location => {
                    const marker = L.marker([
                        parseFloat(locationList[location].centerY),
                        parseFloat(locationList[location].centerX)
                    ], { icon: markerIcon }).addTo(map);

                    marker.bindPopup(`
                    <div style="text-align: center">
                        <p style="margin: 0;">${location}</p>
                        <p style="margin: 0;">זמן למיגון: ${locationList[location]["shelter_time"].text}</p>
                    </div>
                    `)
                });
			});
		});
	});
</script>
<div id="map" in:fly={{ y: 5, opacity: 0, duration: 350 }} class="absolute inset-0 bg-muted flex items-center justify-center !z-0">
    {#if locationsFound.length < $alert?.locations?.length}
        <p class="top-0 absolute transition-all text-md text-foreground bg-muted py-1 mt-1 px-3 rounded-md tracking-tight z-999 flex items-center gap-1">
            לא היה ניתן להציג על המפה את כל המיקומים
        </p>
    {/if}
</div>