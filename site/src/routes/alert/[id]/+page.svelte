<script>
	import "leaflet/dist/leaflet.css";
	import locationList from "/src/locations.json";
	import { history } from "$lib/index.js";

	import { page } from "$app/stores";
	import { onMount, tick } from "svelte";
	import { browser } from "$app/environment";
	import { relativeDate } from "$lib/components/util/relativeDate";

	import { Button } from "$lib/components/ui/button";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import AlertTags from "$lib/components/ui/alert-tags.svelte";

	import { fly, fade } from "svelte/transition";
	import { Clock, HelpCircle, ExternalLink, GripHorizontal } from "lucide-svelte";
	import { alertIcons } from "$lib/utils";
	let locationsFound = [], mapSetup = false;

	onMount(async() => {
		const L = await import("leaflet");
		
		const markerIcon = L.icon({
			iconUrl: "/marker-icon.svg",
			iconSize: [30, 42]
		});

		history.subscribe(() => {
			tick().then(() => {
				const location = $history?.find(e => e.id === +$page.params.id)?.location ?? [];

				location.forEach(location => {
					if(locationList[location]) locationsFound.push(location);
				});

				if(locationsFound.length !== 0) {
					const map = L.map("map", { zoomControl: false }).setView([
						(locationsFound.map(e => parseFloat(locationList[e].centerY)).reduce((total, num) => total + num))/locationsFound.length,
						(locationsFound.map(e => parseFloat(locationList[e].centerX)).reduce((total, num) => total + num))/locationsFound.length
					], 13);
					map.setZoom(8);

					L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
						maxZoom: 13,
						minZoom: 6,
						attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
					}).addTo(map);

					mapSetup = true;

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
				}
			});
		});
	});

	function sharePage() {
		const data = {
			url: document.location.href,
			text: "מקליינט פיקוד העורף",
			title: locationsFound[0].type
		}

		if(browser && navigator?.canShare(data)) navigator.share(data);
	}
</script>
<div class="fixed inset-0 -z-10 bg-gradient-to-t dark:from-[#2e1212] from-[#ffe1e1] to-transparent" in:fade={{ duration: 350 }}></div>
<div class="flex flex-col items-center mt-7 mb-10 gap-3 max-w-7xl text-center" in:fly={{ y: 5, opacity: 0, duration: 350 }}>
	{#if $history?.length > 0}
		{#if $history.some(e => e.id === parseInt($page.params.id))}
			{@const data = $history.find(e => e.id === +$page.params.id)}
			<div class="center row gap-5">
				<Tooltip.Root>
					<Tooltip.Trigger class="center row gap-2 text-muted-foreground">
						<Clock />
						{relativeDate(data.date, data.time)}
					</Tooltip.Trigger>
					<Tooltip.Content>
						{relativeDate(data.date, data.time, true)}
					</Tooltip.Content>
				</Tooltip.Root>
				{#if navigator?.canShare()}
					<Button on:click={sharePage} variant="ghost" class="font-normal center row gap-2 text-muted-foreground">
						<ExternalLink />
						שיתוף
					</Button>
				{/if}
			</div>
			<div class="flex flex-row items-center text-4xl font-semibold tracking-tight gap-5">
				<svelte:component this={alertIcons[data.type] ?? HelpCircle} class="h-11 w-11 text-destructive" />
				{data.type}
			</div>
			<div class="flex flex-col justify-center items-center">
				<div class="w-3/4 flex flex-wrap flex-row justify-center gap-1">
					<AlertTags alertLocations={data.location} />
				</div>
				{data.location.join(", ")}
			</div>
			<div id="map" in:fly={{ y: 10, opacity: 0, delay: 100 }} class="transition-all mt-10 lg:w-[900px] lg:aspect-video lg:h-auto w-[350px] h-96 rounded-2xl bg-muted flex items-center justify-center border-border border-2 !z-0">
				{#if !mapSetup && locationsFound.length === 0}
					<p class="text-xl text-muted-foreground tracking-tight">לא ניתן להציג מפה למיקום המבוקש</p>
				{:else if mapSetup && locationsFound.length < data.location.length}
					<p class="absolute -top-[60px] lg:-top-[30px] hover:top-0 transition-all text-lg text-white bg-destructive py-1 px-12 rounded-b-md tracking-tight z-[400] grid place-items-center">
						לא היה ניתן להציג על המפה את כל המיקומים
						<GripHorizontal />
					</p>
				{/if}
			</div>
		{:else}
			<p class="text-4xl font-semibold tracking-tight mb-2">התרעה לא נמצאה</p>
			<Button href="/" variant="outline">חזרה לעמוד הבית</Button>
		{/if}
	{/if}
</div>