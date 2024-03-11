<script>
	import { history } from "$lib/index.js";
	import { page } from "$app/stores";
	import { relativeDate } from "$lib/components/util/relativeDate";

	import { Button } from "$lib/components/ui/button";
	import * as Tooltip from "$lib/components/ui/tooltip";

	import { fly, fade } from "svelte/transition";
	import { Clock, HelpCircle } from "lucide-svelte";
	import { alertIcons } from "$lib/utils";
</script>
<div class="fixed inset-0 -z-10 bg-gradient-to-t dark:from-[#2e1212] from-[#ffe1e1] to-transparent" in:fade={{ duration: 350 }}></div>
<div class="flex flex-col items-center mt-28 mb-10 gap-3 max-w-7xl text-center" in:fly={{ y: 5, opacity: 0, duration: 350 }}>
	{#if $history?.length > 0}
		{#if $history.some(e => e.id === parseInt($page.params.id))}
			{@const data = $history.find(e => e.id === +$page.params.id)}
			<Tooltip.Root side="bottom">
				<Tooltip.Trigger class="flex flex-row gap-2 text-muted-foreground">
					<Clock />
					{relativeDate(data.date, data.time)}
				</Tooltip.Trigger>
				<Tooltip.Content>
					{relativeDate(data.date, data.time, true)}
				</Tooltip.Content>
			</Tooltip.Root>
			<div class="flex flex-row items-center text-4xl font-semibold tracking-tight gap-7">
				<svelte:component this={alertIcons[data.type] ?? HelpCircle} class="h-11 w-11 text-destructive" />
				{data.type}
			</div>
			{data.location}
		{:else}
			<p class="text-4xl font-semibold tracking-tight mb-2">התרעה לא נמצאה</p>
			<Button href="/" variant="outline">חזרה לעמוד הבית</Button>
		{/if}
	{/if}
	<div id="map"></div>
</div>